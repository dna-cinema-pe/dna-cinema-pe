import { prisma } from "@/lib/db";

/** Aportes de um ano, como estão registrados no edital (não é cronograma de desembolso). */
export interface InvestimentoPorAno {
  ano: number;
  /** Soma de `FilmeEdital.valorInvestidoFilmeBrl` dos aportes do ano, em reais. */
  valorRegistradoBrl: number;
  /** Filmes distintos com aporte em editais do ano. */
  projetos: number;
  /** Títulos dos editais que registram aporte no ano; é a fonte citada no tooltip. */
  fontes: string[];
}

export interface Investimentos {
  /** Um item por ano de edital com aporte, em ordem cronológica. */
  porAno: InvestimentoPorAno[];
  totalRegistradoBrl: number;
  totalAportes: number;
  totalEditais: number;
}

/**
 * Pôster, seção de financiamento (US-2.6): valor destinado aos filmes por ano do edital.
 *
 * A base só registra o valor aportado por filme em cada edital — não há campo de valor pago,
 * contratado ou previsto, e o ano é o do edital, não o do desembolso. Por isso a série é uma só:
 * `valorRegistradoBrl`. Sem nenhum aporte registrado, devolve `null` e o pôster mostra o aviso.
 */
export async function obterInvestimentos(): Promise<Investimentos | null> {
  const editais = await prisma.edital.findMany({
    select: {
      ano: true,
      titulo: true,
      filmes: { select: { idFilme: true, valorInvestidoFilmeBrl: true } },
    },
    orderBy: [{ ano: "asc" }, { titulo: "asc" }],
  });

  const porAno = new Map<
    number,
    { centavos: number; filmes: Set<number>; fontes: Set<string> }
  >();
  let totalAportes = 0;

  for (const edital of editais) {
    if (edital.filmes.length === 0) continue;

    const acumulado = porAno.get(edital.ano) ?? {
      centavos: 0,
      filmes: new Set<number>(),
      fontes: new Set<string>(),
    };

    for (const aporte of edital.filmes) {
      acumulado.centavos += Math.round(Number(aporte.valorInvestidoFilmeBrl) * 100);
      acumulado.filmes.add(aporte.idFilme);
      totalAportes += 1;
    }

    acumulado.fontes.add(edital.titulo);
    porAno.set(edital.ano, acumulado);
  }

  if (porAno.size === 0) return null;

  const anos = [...porAno.entries()]
    .sort(([a], [b]) => a - b)
    .map(([ano, acumulado]) => ({
      ano,
      valorRegistradoBrl: acumulado.centavos / 100,
      projetos: acumulado.filmes.size,
      fontes: [...acumulado.fontes],
    }));

  return {
    porAno: anos,
    totalRegistradoBrl: anos.reduce((soma, item) => soma + item.valorRegistradoBrl, 0),
    totalAportes,
    totalEditais: editais.filter((edital) => edital.filmes.length > 0).length,
  };
}
