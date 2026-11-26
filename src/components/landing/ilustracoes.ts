interface DefinicaoIlustracao {
  rotulo: string;
  /** Caminho em `public/`. Preencher quando o design entregar o arquivo. */
  src?: string;
}

/**
 * Registro único das ilustrações do Figma. Hoje todas são placeholders:
 * ao receber um asset, basta preencher `src` aqui (ex.: "/ilustracoes/sol.svg").
 */
export const ILUSTRACOES = {
  sol: { rotulo: "sol", src: "/ilustracoes/sol.webp" },
  passaroOuro: { rotulo: "pássaro dourado", src: "/ilustracoes/passaroOuro.webp" },
  passaroFerrugem: { rotulo: "pássaro ferrugem", src: "/ilustracoes/passaroFerrugem.webp" },
  bandeirinhas: { rotulo: "bandeirinhas", src: "/ilustracoes/bandeirinhas.webp" },
  manchaEsquerda: { rotulo: "mancha ferrugem esquerda", src: "/ilustracoes/manchaEsquerda.webp" },
  manchaDireita: { rotulo: "mancha ferrugem direita", src: "/ilustracoes/manchaDireita.webp" },
  estrela: { rotulo: "estrela", src: "/ilustracoes/estrela.webp" },
  cruz: { rotulo: "cruz", src: "/ilustracoes/cruz.webp" },
  ponteRecife: { rotulo: "ponte do Recife", src: "/ilustracoes/ponteRecife.webp" },
  veleiro: { rotulo: "veleiro", src: "/ilustracoes/veleiro.webp" },
  guardaChuvaFrevo: { rotulo: "guarda-chuva de frevo" },
  caranguejo: { rotulo: "caranguejo" },
  ilhaPalmeiras: { rotulo: "ilha com palmeiras" },
  fogos: { rotulo: "fogos de artifício" },
  ancora: { rotulo: "âncora" },
  dinheiroCordel: { rotulo: "dinheiro de cordel" },
  trofeu: { rotulo: "troféu" },
  aviao: { rotulo: "avião" },
  setaCurva: { rotulo: "seta curva" },
  postal: { rotulo: "postal" },
  fiosPostal: { rotulo: "fios do postal", src: "/ilustracoes/fiosPostal.webp" },
} as const satisfies Record<string, DefinicaoIlustracao>;

export type IdIlustracao = keyof typeof ILUSTRACOES;

export function obterIlustracao(id: IdIlustracao): DefinicaoIlustracao {
  return ILUSTRACOES[id];
}
