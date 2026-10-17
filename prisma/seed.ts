import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.ts";

const DATA_DIR = join(import.meta.dirname, "..", "data");

function carregar<T>(arquivo: string): T[] {
  return JSON.parse(readFileSync(join(DATA_DIR, arquivo), "utf8")) as T[];
}

type FilmeJson = {
  chave: string;
  titulo: string;
  ano: number;
  genero: string | null;
  sinopse: string | null;
  cidadeFilmagem: string | null;
  posterUrl: string | null;
  posterAlt: string | null;
  classificacaoIndicativa: string | null;
};
type PessoaJson = {
  nome: string;
  idade: number;
  genero: string | null;
  flagEhNordestino: boolean | null;
};
type PremiacaoJson = {
  nomePremiacao: string;
  descricaoPremiacao: string | null;
  nivelImportanciaPremiacao: number;
  flagNacional: boolean;
};
type EditalJson = { chave: string; titulo: string; ano: number; valorTotalBrl: string };
type FilmePessoaJson = {
  filme: string;
  pessoa: string;
  funcaoPessoa: string;
  flagEhCineasta: boolean;
};
type FilmePremiacaoJson = {
  filme: string;
  premiacao: string;
  edicaoAno: number;
  categoriaPremiacao: string | null;
  resultado: string;
};
type FilmeEditalJson = { filme: string; edital: string; valorInvestidoFilmeBrl: string };

// A connection string da DIRECT_URL é a direta/session mode. O pooler em transaction
// mode (porta 6543) desabilita prepared statements e não serve para carga em lote.
const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Defina DIRECT_URL (ou DATABASE_URL) no .env antes de rodar o seed.");
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

async function main() {
  const filmes = carregar<FilmeJson>("filmes.json");
  const pessoas = carregar<PessoaJson>("pessoas.json");
  const premiacoes = carregar<PremiacaoJson>("premiacoes.json");
  const editais = carregar<EditalJson>("editais.json");
  const filmePessoa = carregar<FilmePessoaJson>("filme_pessoa.json");
  const filmePremiacao = carregar<FilmePremiacaoJson>("filme_premiacao.json");
  const filmeEdital = carregar<FilmeEditalJson>("filme_edital.json");

  // Regra da US02: a soma investida por edital não pode ultrapassar seu valor total.
  const totalPorEdital = new Map<string, number>();
  for (const vinculo of filmeEdital) {
    const acumulado = totalPorEdital.get(vinculo.edital) ?? 0;
    totalPorEdital.set(vinculo.edital, acumulado + Number(vinculo.valorInvestidoFilmeBrl));
  }
  for (const edital of editais) {
    const investido = totalPorEdital.get(edital.chave) ?? 0;
    const total = Number(edital.valorTotalBrl);
    if (total >= 0 && investido > total) {
      throw new Error(
        `Edital "${edital.titulo}": soma investida (${investido}) excede o valor total (${total}).`,
      );
    }
  }

  // Chaves naturais → ids atribuídos pelo banco. O upsert torna o seed idempotente.
  const idFilmePorChave = new Map<string, number>();
  for (const filme of filmes) {
    const { chave, ...dados } = filme;
    const existente = await prisma.filme.findFirst({
      where: { titulo: dados.titulo, ano: dados.ano },
      select: { idFilme: true },
    });
    const gravado = existente
      ? await prisma.filme.update({ where: { idFilme: existente.idFilme }, data: dados })
      : await prisma.filme.create({ data: dados });
    idFilmePorChave.set(chave, gravado.idFilme);
  }

  const idPessoaPorNome = new Map<string, number>();
  for (const pessoa of pessoas) {
    const existente = await prisma.pessoa.findFirst({
      where: { nome: pessoa.nome },
      select: { idPessoa: true },
    });
    const gravada = existente
      ? await prisma.pessoa.update({ where: { idPessoa: existente.idPessoa }, data: pessoa })
      : await prisma.pessoa.create({ data: pessoa });
    idPessoaPorNome.set(pessoa.nome, gravada.idPessoa);
  }

  const idPremiacaoPorNome = new Map<string, number>();
  for (const premiacao of premiacoes) {
    const gravada = await prisma.premiacao.upsert({
      where: { nomePremiacao: premiacao.nomePremiacao },
      update: premiacao,
      create: premiacao,
    });
    idPremiacaoPorNome.set(premiacao.nomePremiacao, gravada.idPremiacao);
  }

  const idEditalPorChave = new Map<string, number>();
  for (const edital of editais) {
    const { chave, ...dados } = edital;
    const existente = await prisma.edital.findFirst({
      where: { titulo: dados.titulo, ano: dados.ano },
      select: { idEdital: true },
    });
    const gravado = existente
      ? await prisma.edital.update({ where: { idEdital: existente.idEdital }, data: dados })
      : await prisma.edital.create({ data: dados });
    idEditalPorChave.set(chave, gravado.idEdital);
  }

  function exigir(mapa: Map<string, number>, chave: string, rotulo: string): number {
    const id = mapa.get(chave);
    if (id === undefined) throw new Error(`${rotulo} não encontrado(a) nos dados: "${chave}".`);
    return id;
  }

  for (const vinculo of filmePessoa) {
    const idFilme = exigir(idFilmePorChave, vinculo.filme, "Filme");
    const idPessoa = exigir(idPessoaPorNome, vinculo.pessoa, "Pessoa");
    const dados = {
      idFilme,
      idPessoa,
      funcaoPessoa: vinculo.funcaoPessoa,
      flagEhCineasta: vinculo.flagEhCineasta,
    };
    await prisma.filmePessoa.upsert({
      where: {
        idFilme_idPessoa_funcaoPessoa: {
          idFilme,
          idPessoa,
          funcaoPessoa: vinculo.funcaoPessoa,
        },
      },
      update: dados,
      create: dados,
    });
  }

  for (const vinculo of filmePremiacao) {
    const idFilme = exigir(idFilmePorChave, vinculo.filme, "Filme");
    const idPremiacao = exigir(idPremiacaoPorNome, vinculo.premiacao, "Premiação");
    const dados = {
      idFilme,
      idPremiacao,
      edicaoAno: vinculo.edicaoAno,
      categoriaPremiacao: vinculo.categoriaPremiacao,
      resultado: vinculo.resultado,
    };
    // categoria_premiacao é nullable, e no Postgres NULL nunca é igual a NULL: a
    // @@unique não dedupe essas linhas, então a busca prévia faz esse papel.
    const existente = await prisma.filmePremiacao.findFirst({
      where: {
        idFilme,
        idPremiacao,
        edicaoAno: vinculo.edicaoAno,
        categoriaPremiacao: vinculo.categoriaPremiacao,
      },
      select: { idFilmePremiacao: true },
    });
    if (existente) {
      await prisma.filmePremiacao.update({
        where: { idFilmePremiacao: existente.idFilmePremiacao },
        data: dados,
      });
    } else {
      await prisma.filmePremiacao.create({ data: dados });
    }
  }

  for (const vinculo of filmeEdital) {
    const idFilme = exigir(idFilmePorChave, vinculo.filme, "Filme");
    const idEdital = exigir(idEditalPorChave, vinculo.edital, "Edital");
    const dados = {
      idFilme,
      idEdital,
      valorInvestidoFilmeBrl: vinculo.valorInvestidoFilmeBrl,
    };
    await prisma.filmeEdital.upsert({
      where: { idFilme_idEdital: { idFilme, idEdital } },
      update: dados,
      create: dados,
    });
  }

  const contagens = {
    filme: await prisma.filme.count(),
    pessoa: await prisma.pessoa.count(),
    premiacao: await prisma.premiacao.count(),
    edital: await prisma.edital.count(),
    filme_pessoa: await prisma.filmePessoa.count(),
    filme_premiacao: await prisma.filmePremiacao.count(),
    filme_edital: await prisma.filmeEdital.count(),
  };
  console.log("Carga concluída:");
  for (const [tabela, total] of Object.entries(contagens)) {
    console.log(`  ${tabela.padEnd(16)} ${String(total).padStart(4)}`);
  }
}

main()
  .catch((erro) => {
    console.error(erro);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
