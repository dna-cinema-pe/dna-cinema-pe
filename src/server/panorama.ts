import { prisma } from "@/lib/db";

export interface RecorteGenero {
  mulheres: number;
  homens: number;
  totalInformado: number;
  totalPessoas: number;
  totalForaDoRecorte: number;
}

/**
 * Proporção de mulheres e homens entre as pessoas cadastradas.
 * Valores `NULL` ou `OUTRO` ficam fora do denominador; a interface informa essa limitação.
 */
export async function obterRecorteGenero(): Promise<RecorteGenero> {
  const [grupos, totalPessoas] = await Promise.all([
    prisma.pessoa.groupBy({
      by: ["genero"],
      _count: { _all: true },
    }),
    prisma.pessoa.count(),
  ]);

  const contar = (genero: string) => grupos.find((g) => g.genero === genero)?._count._all ?? 0;
  const mulheres = contar("FEMININO");
  const homens = contar("MASCULINO");
  const totalInformado = mulheres + homens;

  return {
    mulheres,
    homens,
    totalInformado,
    totalPessoas,
    totalForaDoRecorte: totalPessoas - totalInformado,
  };
}

export interface RecorteOrigem {
  pernambucanos: number;
  outros: number;
  totalInformado: number;
  totalPessoas: number;
  totalSemNaturalidade: number;
}

/**
 * Origem pelo estado/código de naturalidade documentado no acervo.
 * Naturalidades ausentes ou vazias não são classificadas como "outros".
 */
export async function obterRecorteOrigem(): Promise<RecorteOrigem> {
  const [grupos, totalPessoas] = await Promise.all([
    prisma.pessoa.groupBy({
      by: ["naturalidade"],
      where: { naturalidade: { not: null } },
      _count: { _all: true },
    }),
    prisma.pessoa.count(),
  ]);

  const validos = grupos.filter((grupo) => grupo.naturalidade?.trim());
  const pernambucanos =
    validos.find((grupo) => grupo.naturalidade === "PE")?._count._all ?? 0;
  const totalInformado = validos.reduce((total, grupo) => total + grupo._count._all, 0);
  const outros = totalInformado - pernambucanos;

  return {
    pernambucanos,
    outros,
    totalInformado,
    totalPessoas,
    totalSemNaturalidade: totalPessoas - totalInformado,
  };
}

export interface ItemRecorteRaca {
  categoria: string;
  percentual: number;
}

export interface RecorteRaca {
  totalInformado: number;
  totalSemInformacao: number;
  itens: ItemRecorteRaca[];
}

/**
 * Landing: distribuição de cor/raça entre as pessoas com autodeclaração registrada.
 * Registros sem autodeclaração não entram no percentual e são informados separadamente.
 */
export async function obterRecorteRaca(): Promise<RecorteRaca | null> {
  const [grupos, totalPessoas] = await Promise.all([
    prisma.pessoa.groupBy({
      by: ["corRaca"],
      where: { corRaca: { not: null } },
      _count: { _all: true },
    }),
    prisma.pessoa.count(),
  ]);

  const informados = grupos
    .filter((grupo): grupo is typeof grupo & { corRaca: string } => grupo.corRaca !== null)
    .sort(
      (a, b) =>
        b._count._all - a._count._all || a.corRaca.localeCompare(b.corRaca, "pt-BR"),
    );
  const totalInformado = informados.reduce((total, grupo) => total + grupo._count._all, 0);
  if (totalInformado === 0) return null;

  return {
    totalInformado,
    totalSemInformacao: totalPessoas - totalInformado,
    itens: informados.map((grupo) => ({
      categoria: grupo.corRaca,
      percentual: Math.round((grupo._count._all / totalInformado) * 100),
    })),
  };
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
