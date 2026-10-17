import { prisma } from "@/lib/db";

/**
 * US06: Listagem geral de filmes
 */
export async function listarFilmes() {
  return await prisma.filme.findMany({
    select: {
      idFilme: true,
      titulo: true,
      ano: true,
      posterUrl: true,
      posterAlt: true,
      genero: true,
      cidadeFilmagem: true,
    },
    orderBy: {
      titulo: "asc",
    },
  });
}

/**
 * US01: Ficha essencial do filme
 */
export async function obterFilme(id: number) {
  return await prisma.filme.findUnique({
    where: { idFilme: id },
  });
}

/**
 * US02: Incentivo público e editais
 */
export async function listarIncentivos(idFilme: number) {
  const incentivos = await prisma.filmeEdital.findMany({
    where: { idFilme },
    include: {
      edital: true,
    },
    orderBy: {
      edital: {
        ano: "desc",
      },
    },
  });

  const totalInvestido = incentivos.reduce((acc, curr) => {
    const valor = Number(curr.valorInvestidoFilmeBrl);
    return valor > 0 ? acc + valor : acc;
  }, 0);

  return {
    temIncentivo: incentivos.length > 0,
    totalInvestido,
    itens: incentivos.map((item) => ({
      idEdital: item.idEdital,
      tituloEdital: item.edital.titulo,
      anoEdital: item.edital.ano,
      valorTotalEditalBrl: item.edital.valorTotalBrl.toString(),
      valorInvestidoFilmeBrl: item.valorInvestidoFilmeBrl.toString(),
    })),
  };
}

/**
 * US03: Estatísticas de elenco (atores, atrizes e nordestinos)
 */
export async function obterEstatisticasElenco(idFilme: number) {
  const vinculos = await prisma.filmePessoa.findMany({
    where: {
      idFilme,
      flagEhCineasta: false,
    },
    include: {
      pessoa: true,
    },
  });

  const totalElenco = vinculos.length;
  const atrizes = vinculos.filter(
    (v) => v.pessoa.genero?.toUpperCase() === "FEMININO"
  ).length;

  const nordestinos = vinculos.filter(
    (v) => v.pessoa.flagEhNordestino === true
  ).length;

  return {
    temDadosElenco: totalElenco > 0,
    totalElenco,
    atrizes,
    nordestinos,
    elenco: vinculos.map((v) => ({
      idPessoa: v.idPessoa,
      nome: v.pessoa.nome,
      funcao: v.funcaoPessoa,
      genero: v.pessoa.genero,
      flagEhNordestino: v.pessoa.flagEhNordestino,
    })),
  };
}

/**
 * US04: Cineastas femininas associadas ao filme
 */
export async function listarCineastasFemininas(idFilme: number) {
  const cineastasFemininas = await prisma.filmePessoa.findMany({
    where: {
      idFilme,
      flagEhCineasta: true,
      pessoa: {
        genero: {
          equals: "FEMININO",
          mode: "insensitive",
        },
      },
    },
    include: {
      pessoa: true,
    },
    orderBy: {
      pessoa: {
        nome: "asc",
      },
    },
  });

  return {
    total: cineastasFemininas.length,
    temCineastasFemininas: cineastasFemininas.length > 0,
    cineastas: cineastasFemininas.map((c) => ({
      idPessoa: c.idPessoa,
      nome: c.pessoa.nome,
      funcao: c.funcaoPessoa,
    })),
  };
}

/**
 * US05: Premiações ganhas e principais reconhecimentos
 */
export async function listarPremiacoes(idFilme: number) {
  const premiacoes = await prisma.filmePremiacao.findMany({
    where: { idFilme },
    include: {
      premiacao: true,
    },
    orderBy: [
      { edicaoAno: "desc" },
      { premiacao: { nivelImportanciaPremiacao: "asc" } },
    ],
  });

  const premiacoesGanhas = premiacoes.filter(
    (p) => p.resultado.toUpperCase() === "VENCEDOR"
  );
  const indicacoes = premiacoes.filter(
    (p) => p.resultado.toUpperCase() === "INDICADO"
  );

  const principais = premiacoes.filter(
    (p) =>
      p.premiacao.nivelImportanciaPremiacao === 1 ||
      (p.premiacao.flagNacional && p.premiacao.nivelImportanciaPremiacao <= 2)
  );

  return {
    temPremiacoes: premiacoes.length > 0,
    totalGanhas: premiacoesGanhas.length,
    totalIndicacoes: indicacoes.length,
    principais: principais.map((p) => ({
      idFilmePremiacao: p.idFilmePremiacao,
      nomePremiacao: p.premiacao.nomePremiacao,
      edicaoAno: p.edicaoAno,
      categoriaPremiacao: p.categoriaPremiacao,
      resultado: p.resultado,
      nivelImportancia: p.premiacao.nivelImportanciaPremiacao,
      flagNacional: p.premiacao.flagNacional,
    })),
    todas: premiacoes.map((p) => ({
      idFilmePremiacao: p.idFilmePremiacao,
      nomePremiacao: p.premiacao.nomePremiacao,
      edicaoAno: p.edicaoAno,
      categoriaPremiacao: p.categoriaPremiacao,
      resultado: p.resultado,
      nivelImportancia: p.premiacao.nivelImportanciaPremiacao,
      flagNacional: p.premiacao.flagNacional,
    })),
  };
}

/**
 * Agregador completo para detalhe do filme (usado em API e páginas)
 */
export async function obterDetalhesCompletosFilme(id: number) {
  const filme = await obterFilme(id);
  if (!filme) return null;

  const [incentivos, estatisticasElenco, cineastasFemininas, premiacoes] =
    await Promise.all([
      listarIncentivos(id),
      obterEstatisticasElenco(id),
      listarCineastasFemininas(id),
      listarPremiacoes(id),
    ]);

  return {
    filme,
    incentivos,
    estatisticasElenco,
    cineastasFemininas,
    premiacoes,
  };
}

