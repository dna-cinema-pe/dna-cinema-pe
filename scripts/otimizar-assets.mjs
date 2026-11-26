/**
 * Otimiza as imagens de `public/` (US-4.3). Rodar depois de adicionar assets:
 * `npm run otimizar:assets`.
 *
 * - PNG e JPG viram WebP e são reduzidos (nunca ampliados) para no máximo `ladoMaximo` px no
 *   maior lado: cerca do dobro do maior tamanho exibido no desktop, que basta para telas 2x e
 *   evita imagens enormes decodificadas na memória do celular. O original é apagado; troque a
 *   extensão nas referências (código e data/filmes.json).
 * - SVG passa pelo svgo (preset padrão, que na v4 mantém o viewBox). Só regrava se ficar menor.
 *
 * Rodar de novo não altera o que já está otimizado.
 * Com `--verificar`, não altera nada e falha se houver PNG/JPG nessas pastas (`npm run verificar:assets`).
 */
import { readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { optimize } from "svgo";

const PASTAS = [
  // Imagens do pôster (frame de 1920 px): a maior aparece com ~1680 px de largura.
  { pasta: "public/poster", ladoMaximo: 1600 },
  // Pôsteres dos filmes (data/filmes.json): aparecem com até ~460 px no frame e 224 px no modal.
  { pasta: "public/posters", ladoMaximo: 1000 },
  // Ilustrações avulsas (src/components/landing/ilustracoes.ts).
  { pasta: "public/ilustracoes", ladoMaximo: 1600 },
  // Arquivos soltos na raiz de public/ (só os arquivos; as subpastas acima são tratadas à parte).
  { pasta: "public", ladoMaximo: 1600 },
];
const QUALIDADE_WEBP = 80;
const RASTER = /\.(png|jpe?g)$/i;

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function listar(pasta) {
  try {
    return (await readdir(pasta)).map((nome) => path.join(pasta, nome));
  } catch {
    return [];
  }
}

async function converterRaster(arquivo, ladoMaximo) {
  const destino = arquivo.replace(RASTER, ".webp");
  const antes = (await stat(arquivo)).size;
  const imagem = sharp(arquivo);
  const { hasAlpha } = await imagem.metadata();
  await imagem
    .resize({ width: ladoMaximo, height: ladoMaximo, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALIDADE_WEBP, alphaQuality: hasAlpha ? 100 : undefined, effort: 6 })
    .toFile(destino);
  await rm(arquivo);
  const depois = (await stat(destino)).size;
  console.log(`${arquivo} → ${path.basename(destino)}  ${kb(antes)} → ${kb(depois)}`);
  return antes - depois;
}

async function otimizarSvg(arquivo) {
  const original = await readFile(arquivo, "utf8");
  const { data } = optimize(original, { path: arquivo, multipass: true });
  if (data.length >= original.length) return 0;
  await writeFile(arquivo, data);
  return original.length - data.length;
}

const grupos = await Promise.all(
  PASTAS.map(async ({ pasta, ladoMaximo }) => ({ ladoMaximo, arquivos: await listar(pasta) })),
);

if (process.argv.includes("--verificar")) {
  const rasters = grupos.flatMap((g) => g.arquivos).filter((a) => RASTER.test(a));
  if (rasters.length > 0) {
    console.error("Há imagens PNG/JPG em public/. Rode `npm run otimizar:assets`:");
    for (const arquivo of rasters) console.error(`  ${arquivo}`);
    process.exit(1);
  }
  console.log("Imagens de public/ em WebP.");
  process.exit(0);
}

let economiaRaster = 0;
let economiaSvg = 0;
for (const { ladoMaximo, arquivos } of grupos) {
  for (const arquivo of arquivos) {
    if (RASTER.test(arquivo)) economiaRaster += await converterRaster(arquivo, ladoMaximo);
    else if (arquivo.endsWith(".svg")) economiaSvg += await otimizarSvg(arquivo);
  }
}

console.log(`\nPNG/JPG → WebP: ${kb(economiaRaster)} a menos. SVG: ${kb(economiaSvg)} a menos.`);
