import conteudo from "../content.json";
import { COLUNA_RESPONSIVA, Paragrafos, TEXTO_RESPONSIVO, type LayoutParagrafo } from "./Paragrafos.tsx";

const { titulo, paragrafos } = conteudo.super8;

/** Posição de cada parágrafo no frame do Figma, na mesma ordem de `paragrafos`. */
const LAYOUT: readonly LayoutParagrafo[] = [
  { nodeId: "149:12", className: `left-[160px] top-[calc(27%+36.76px)] w-[477px] ${TEXTO_RESPONSIVO}` },
  { nodeId: "149:13", className: `left-[calc(50%-239px)] top-[calc(27%+36.76px)] w-[477px] ${TEXTO_RESPONSIVO}` },
  { nodeId: "149:17", className: `left-[calc(60%+130px)] top-[calc(27%+36.76px)] w-[455px] ${TEXTO_RESPONSIVO}` },
];

/**
 * Responsivo (US-4.1), abaixo de 1280 px: os três parágrafos ficam um embaixo do outro, no padrão
 * de TEXTO_RESPONSIVO e COLUNA_RESPONSIVA (Paragrafos.tsx). O PosterViewport mede a altura desta
 * coluna (`data-medir="super8-texto"`) para descer os caranguejos e o que vem depois
 * (`--espaco-super8`) sem sobreposição.
 *
 * O título e a coluna ficam no grupo `.poster-deslocar` do DesignPoster, que desce tudo o que vem
 * depois deles; os níveis (globals.css) fazem cada um descer só até o próprio ponto.
 */
const COLUNA = `${COLUNA_RESPONSIVA} max-xl:top-[calc(27%+36.76px)] poster-nivel-super8-legenda`;

/** Super-8, período da linha do tempo (US-2.3): título e texto do protótipo. */
export function Super8() {
  return (
    <section aria-labelledby="titulo-super-8" className="contents">
      <h2
        id="titulo-super-8"
        className="super8-titulo -translate-x-1/2 [word-break:break-word] absolute font-titulo leading-[normal] left-1/2 not-italic text-[120px] text-center text-white top-[calc(24%+24.12px)] whitespace-nowrap poster-nivel-ciclo-final"
        data-node-id="149:9"
      >
        {titulo}
      </h2>
      <div className={COLUNA} data-medir="super8-texto">
        <Paragrafos textos={paragrafos} layout={LAYOUT} />
      </div>
    </section>
  );
}
