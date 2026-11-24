import conteudo from "../content.json";
import { COLUNA_RESPONSIVA, Paragrafos, TEXTO_RESPONSIVO, type LayoutParagrafo } from "./Paragrafos.tsx";

const { titulo, paragrafos } = conteudo.cicloDoRecife;

/** Posição de cada parágrafo no frame do Figma, na mesma ordem de `paragrafos`. */
const LAYOUT: readonly LayoutParagrafo[] = [
  {
    nodeId: "46:301",
    className: `left-[calc(30%-184px)] top-[calc(16%+41.08px)] w-[501px] ${TEXTO_RESPONSIVO}`,
  },
  {
    nodeId: "46:307",
    className: `left-[calc(70%-265px)] top-[calc(16%+41.08px)] w-[453px] ${TEXTO_RESPONSIVO}`,
  },
];

/**
 * Responsivo (US-4.1), abaixo de 1280 px: os dois parágrafos ficam um embaixo do outro, no padrão
 * de TEXTO_RESPONSIVO e COLUNA_RESPONSIVA (Paragrafos.tsx). O PosterViewport mede a altura desta
 * coluna (`data-medir="ciclo-texto"`) para descer o varal com as fotos e o que vem depois
 * (`--espaco-ciclo-texto`) sem sobreposição. O prédio à direita desce junto com o varal.
 *
 * O título e a coluna ficam no grupo `.poster-deslocar` do DesignPoster, que desce tudo o que vem
 * depois deles; `poster-nivel-ciclo` (globals.css) faz os dois descerem só até o espaço do Ciclo.
 */
const COLUNA = `${COLUNA_RESPONSIVA} max-xl:top-[calc(16%+41.08px)] poster-nivel-ciclo`;

/** Ciclo do Recife (1923–1931), período da linha do tempo (US-2.3): título e texto do protótipo. */
export function CicloDoRecife() {
  return (
    <section aria-labelledby="titulo-ciclo-do-recife" className="contents">
      <h2
        id="titulo-ciclo-do-recife"
        className="-translate-x-1/2 poster-nivel-ciclo [word-break:break-word] absolute font-titulo leading-[normal] left-1/2 not-italic text-[120px] text-center text-white top-[calc(15%+77.2px)] w-[1158px]"
        data-node-id="129:3"
      >
        {titulo}
      </h2>
      <div className={COLUNA} data-medir="ciclo-texto">
        <Paragrafos textos={paragrafos} layout={LAYOUT} />
      </div>
    </section>
  );
}
