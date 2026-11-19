import { prisma } from "@/lib/db";

export interface RecorteGenero {
  /** Percentuais inteiros que somam 100. */
  mulheres: number;
  homens: number;
}

/**
 * Landing: proporção de mulheres e homens entre as pessoas cadastradas.
 * Gênero `NULL` ou `OUTRO` não entra na conta (ver convenção de dados ausentes no schema);
 * sem nenhum registro de FEMININO ou MASCULINO, devolve `null` e a página mostra placeholder.
 */
export async function obterRecorteGenero(): Promise<RecorteGenero | null> {
  const grupos = await prisma.pessoa.groupBy({
    by: ["genero"],
    _count: { _all: true },
  });

  const contar = (genero: string) => grupos.find((g) => g.genero === genero)?._count._all ?? 0;
  const mulheres = contar("FEMININO");
  const homens = contar("MASCULINO");
  const total = mulheres + homens;
  if (total === 0) return null;

  const percentualMulheres = Math.round((mulheres / total) * 100);
  return { mulheres: percentualMulheres, homens: 100 - percentualMulheres };
}

export interface RecorteOrigem {
  /** Percentuais inteiros que somam 100. */
  pernambucanos: number;
  outros: number;
}

/**
 * Landing: proporção de pessoas nascidas em Pernambuco entre as pessoas cadastradas
 * no acervo (não é uma comparação com o cinema nacional — ver convenção de dados
 * ausentes no schema e analise-design-vs-banco.md, item 4).
 * `flagEhPernambucano` NULL não entra na conta; sem nenhum registro, devolve `null`.
 */
export async function obterRecorteOrigem(): Promise<RecorteOrigem | null> {
  const total = await prisma.pessoa.count({ where: { flagEhPernambucano: { not: null } } });
  if (total === 0) return null;

  const pernambucanos = await prisma.pessoa.count({ where: { flagEhPernambucano: true } });
  const percentualPernambucanos = Math.round((pernambucanos / total) * 100);
  return { pernambucanos: percentualPernambucanos, outros: 100 - percentualPernambucanos };
}

export interface FilmeDoPodio {
  id: number;
  titulo: string;
  poster?: string;
  alt?: string;
}

export interface ColocacaoPodio {
  posicao: 1 | 2 | 3;
  filmes: FilmeDoPodio[];
}

export type PodioPremios = ColocacaoPodio[];

export async function obterPodioPremios(): Promise<PodioPremios> {
  const registros = await prisma.filmePremiacao.findMany({
    where: { resultado: { in: ["VENCEDOR", "INDICADO"] } },
    select: {
      resultado: true,
      filme: {
        select: {
          idFilme: true,
          titulo: true,
          posterUrl: true,
          posterAlt: true,
        },
      },
      premiacao: { select: { nivelImportanciaPremiacao: true } },
    },
  });

  const melhorPosicaoPorFilme = new Map<number, { posicao: 1 | 2 | 3; filme: FilmeDoPodio }>();

  for (const registro of registros) {
    const nivel = registro.premiacao.nivelImportanciaPremiacao;
    const posicao: 1 | 2 | 3 =
      registro.resultado === "VENCEDOR" && nivel === 1
        ? 1
        : (registro.resultado === "INDICADO" && nivel === 1) ||
            (registro.resultado === "VENCEDOR" && nivel === 2)
          ? 2
          : 3;

    const existente = melhorPosicaoPorFilme.get(registro.filme.idFilme);
    if (existente && existente.posicao <= posicao) continue;

    melhorPosicaoPorFilme.set(registro.filme.idFilme, {
      posicao,
      filme: {
        id: registro.filme.idFilme,
        titulo: registro.filme.titulo,
        poster: registro.filme.posterUrl ?? undefined,
        alt: registro.filme.posterAlt ?? undefined,
      },
    });
  }

  const colocacoes: PodioPremios = [
    { posicao: 1, filmes: [] },
    { posicao: 2, filmes: [] },
    { posicao: 3, filmes: [] },
  ];

  for (const { posicao, filme } of melhorPosicaoPorFilme.values()) {
    colocacoes[posicao - 1].filmes.push(filme);
  }

  for (const colocacao of colocacoes) {
    colocacao.filmes.sort((a, b) => a.titulo.localeCompare(b.titulo, "pt-BR"));
  }

  return colocacoes;
}

/** Festivais com pino na rota do avião (US-2.7), pelo `nomePremiacao` do banco. */
export const FESTIVAIS_DA_ROTA = {
  cannes: "Festival de Cannes",
  toronto: "Festival Internacional de Cinema de Toronto (TIFF)",
  berlim: "Festival de Berlim",
  oscar: "Oscar",
} as const;

export type FestivalDaRota = keyof typeof FESTIVAIS_DA_ROTA;

export interface PremioNoFestival {
  filme: string;
  /** Ano da edição; `null` quando o banco não informa (-1). */
  ano: number | null;
  categoria: string | null;
  resultado: "VENCEDOR" | "INDICADO";
}

export type PremiosInternacionais = Record<FestivalDaRota, PremioNoFestival[]>;

/**
 * Landing: prêmios e indicações dos filmes do acervo em cada festival da rota, vencedores
 * primeiro e depois do mais recente ao mais antigo.
 *
 * O seed tem registros repetidos com `edicaoAno = -1` ao lado do mesmo prêmio com o ano
 * informado; nesses casos fica só o que tem ano. Um registro só com -1 aparece sem ano.
 */
export async function obterPremiosInternacionais(): Promise<PremiosInternacionais> {
  const registros = await prisma.filmePremiacao.findMany({
    where: { premiacao: { nomePremiacao: { in: Object.values(FESTIVAIS_DA_ROTA) } } },
    select: {
      edicaoAno: true,
      categoriaPremiacao: true,
      resultado: true,
      filme: { select: { titulo: true } },
      premiacao: { select: { nomePremiacao: true } },
    },
  });

  const chave = (r: (typeof registros)[number]) =>
    [r.premiacao.nomePremiacao, r.filme.titulo, r.categoriaPremiacao ?? "", r.resultado].join("|");
  const comAno = new Set(registros.filter((r) => r.edicaoAno > 0).map(chave));

  const resultado = Object.fromEntries(
    Object.keys(FESTIVAIS_DA_ROTA).map((festival) => [festival, [] as PremioNoFestival[]]),
  ) as PremiosInternacionais;

  for (const r of registros) {
    if (r.edicaoAno <= 0 && comAno.has(chave(r))) continue;
    const festival = (Object.keys(FESTIVAIS_DA_ROTA) as FestivalDaRota[]).find(
      (f) => FESTIVAIS_DA_ROTA[f] === r.premiacao.nomePremiacao,
    );
    if (!festival) continue;
    resultado[festival].push({
      filme: r.filme.titulo,
      ano: r.edicaoAno > 0 ? r.edicaoAno : null,
      categoria: r.categoriaPremiacao,
      resultado: r.resultado === "VENCEDOR" ? "VENCEDOR" : "INDICADO",
    });
  }

  for (const lista of Object.values(resultado)) {
    lista.sort(
      (a, b) =>
        Number(b.resultado === "VENCEDOR") - Number(a.resultado === "VENCEDOR") ||
        (b.ano ?? 0) - (a.ano ?? 0) ||
        a.filme.localeCompare(b.filme, "pt-BR"),
    );
  }
  return resultado;
}
