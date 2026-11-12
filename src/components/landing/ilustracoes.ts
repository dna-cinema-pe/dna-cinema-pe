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
  sol: { rotulo: "sol", src: "/ilustracoes/sol.png" },
  passaroOuro: { rotulo: "pássaro dourado", src: "/ilustracoes/passaroOuro.png" },
  passaroFerrugem: { rotulo: "pássaro ferrugem", src: "/ilustracoes/passaroFerrugem.png" },
  bandeirinhas: { rotulo: "bandeirinhas", src: "/ilustracoes/bandeirinhas.png" },
  manchaEsquerda: { rotulo: "mancha ferrugem esquerda", src: "/ilustracoes/manchaEsquerda.png" },
  manchaDireita: { rotulo: "mancha ferrugem direita", src: "/ilustracoes/manchaDireita.png" },
  estrela: { rotulo: "estrela", src: "/ilustracoes/estrela.png" },
  cruz: { rotulo: "cruz", src: "/ilustracoes/cruz.png" },
  ponteRecife: { rotulo: "ponte do Recife", src: "/ilustracoes/ponteRecife.png" },
  veleiro: { rotulo: "veleiro", src: "/ilustracoes/veleiro.png" },
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
  fiosPostal: { rotulo: "fios do postal", src: "/ilustracoes/fiosPostal.png" },
} as const satisfies Record<string, DefinicaoIlustracao>;

export type IdIlustracao = keyof typeof ILUSTRACOES;

export function obterIlustracao(id: IdIlustracao): DefinicaoIlustracao {
  return ILUSTRACOES[id];
}
