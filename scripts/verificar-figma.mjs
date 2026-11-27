/**
 * Garante que a produção não depende de assets hospedados pelo Figma (US-4.3). Exports do Figma
 * e do Figma Make costumam apontar para static.figma.com, s3-figma ou figma.com/api/mcp/asset,
 * URLs temporárias que expiram e deixam a página sem imagens.
 *
 * Procura essas URLs no código, nos dados, na configuração e em `public/` (os SVGs são texto).
 * Falha se encontrar alguma. Rodar com `npm run verificar:assets` (ainda não roda no CI).
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ALVOS = ["src", "public", "data", "prisma", "next.config.ts"];
const IGNORAR = new Set(["node_modules", ".next", "generated"]);
const EXTENSOES = /\.(tsx?|mjs|cjs|jsx?|json|css|svg|html|md)$/i;
const FIGMA =
  /(?:static|s3-alpha|s3-figma|figma-alpha-api)[\w.-]*\.figma\.com|figma\.com\/api\/mcp\/asset|s3[\w.-]*amazonaws\.com\/figma/i;

async function* arquivos(alvo) {
  let entradas;
  try {
    entradas = await readdir(alvo, { withFileTypes: true });
  } catch {
    yield alvo; // é um arquivo
    return;
  }
  for (const entrada of entradas) {
    if (IGNORAR.has(entrada.name)) continue;
    const caminho = path.join(alvo, entrada.name);
    if (entrada.isDirectory()) yield* arquivos(caminho);
    else yield caminho;
  }
}

const encontrados = [];
for (const alvo of ALVOS) {
  for await (const arquivo of arquivos(alvo)) {
    if (!EXTENSOES.test(arquivo)) continue;
    let texto;
    try {
      texto = await readFile(arquivo, "utf8");
    } catch {
      continue;
    }
    texto.split("\n").forEach((linha, i) => {
      const achado = linha.match(FIGMA);
      if (achado) encontrados.push(`${arquivo}:${i + 1}  ${achado[0]}`);
    });
  }
}

if (encontrados.length > 0) {
  console.error("Assets hospedados pelo Figma (baixe para public/ e troque a URL):");
  for (const linha of encontrados) console.error(`  ${linha}`);
  process.exit(1);
}
console.log("Nenhuma dependência de assets do Figma.");
