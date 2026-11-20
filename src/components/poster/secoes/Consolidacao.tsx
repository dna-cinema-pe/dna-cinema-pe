import conteudo from "../content.json";
import { COLUNA_RESPONSIVA, Paragrafos, TEXTO_RESPONSIVO, type LayoutParagrafo } from "./Paragrafos.tsx";

const { titulo, paragrafos } = conteudo.consolidacao;

/** Posição de cada parágrafo no frame do Figma, na mesma ordem de `paragrafos`. */
const LAYOUT: readonly LayoutParagrafo[] = [
  { nodeId: "163:149", className: `h-[340px] left-[calc(20%+25px)] top-[calc(41%+228.08px)] w-[477px] max-xl:h-auto ${TEXTO_RESPONSIVO}` },
  { nodeId: "163:150", className: `h-[246px] left-[calc(40%+240px)] top-[calc(41%+228.08px)] w-[477px] max-xl:h-auto ${TEXTO_RESPONSIVO}` },
];

/**
 * Responsivo (US-4.1), abaixo de 1280 px: os dois parágrafos ficam um embaixo do outro, no padrão
 * de TEXTO_RESPONSIVO e COLUNA_RESPONSIVA (Paragrafos.tsx). O PosterViewport mede a altura desta
 * coluna (`data-medir="consolidacao-texto"`) para descer os varais e o que vem depois
 * (`--espaco-consolidacao`) sem sobreposição.
 *
 * O título e a coluna ficam no grupo `.poster-deslocar` do DesignPoster, que desce tudo o que vem
 * depois deles; `poster-nivel-anos2000` (globals.css) faz os dois descerem só até o próprio ponto.
 */
const COLUNA = `${COLUNA_RESPONSIVA} max-xl:top-[calc(41%+228.08px)] poster-nivel-anos2000`;

/** Consolidação, período da linha do tempo (US-2.3): título e texto do protótipo. */
export function Consolidacao() {
  return (
    <section aria-labelledby="titulo-consolidacao" className="contents">
      <h2
        id="titulo-consolidacao"
        className="-translate-x-1/2 poster-nivel-anos2000 [word-break:break-word] absolute font-titulo leading-[normal] left-[calc(20%+547px)] not-italic text-[64px] text-center text-white top-[calc(41%+71.08px)] whitespace-nowrap"
        data-node-id="180:3"
      >
        {titulo}
      </h2>
      <div className={COLUNA} data-medir="consolidacao-texto">
        <Paragrafos textos={paragrafos} layout={LAYOUT} />
      </div>
    </section>
  );
}
