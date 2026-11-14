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
