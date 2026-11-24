import conteudo from "../content.json";
import { COLUNA_RESPONSIVA, Paragrafos, TEXTO_RESPONSIVO, type LayoutParagrafo } from "./Paragrafos.tsx";

const { titulo, paragrafos } = conteudo.anos2000;

/** Posição de cada parágrafo no frame do Figma, na mesma ordem de `paragrafos`. */
const LAYOUT: readonly LayoutParagrafo[] = [
  { nodeId: "163:123", className: `h-[211px] left-[calc(20%+25px)] top-[calc(39%+219.32px)] w-[477px] max-xl:h-auto ${TEXTO_RESPONSIVO}` },
  { nodeId: "163:125", className: `h-[246px] left-[calc(40%+240px)] top-[calc(39%+219.32px)] w-[477px] max-xl:h-auto ${TEXTO_RESPONSIVO}` },
];

/**
 * Responsivo (US-4.1), abaixo de 1280 px: os dois parágrafos ficam um embaixo do outro, no padrão
 * de TEXTO_RESPONSIVO e COLUNA_RESPONSIVA (Paragrafos.tsx). O PosterViewport mede a altura desta
 * coluna (`data-medir="anos2000-texto"`) para descer a Consolidação e o que vem depois
 * (`--espaco-anos2000`) sem sobreposição.
 *
 * O título e a coluna ficam no grupo `.poster-deslocar` do DesignPoster, que desce tudo o que vem
 * depois deles; `poster-nivel-retomada` (globals.css) faz os dois descerem só até o próprio ponto.
 */
const COLUNA = `${COLUNA_RESPONSIVA} max-xl:top-[calc(39%+219.32px)] poster-nivel-retomada`;

/** Anos 2000, período da linha do tempo (US-2.3): título e texto do protótipo. */
export function Anos2000() {
  return (
    <section aria-labelledby="titulo-anos-2000" className="contents">
      <h2
        id="titulo-anos-2000"
        className="-translate-x-1/2 poster-nivel-retomada [word-break:break-word] absolute font-titulo leading-[normal] left-[calc(20%+576px)] not-italic text-[120px] text-center text-white top-[calc(38%+133.44px)] whitespace-nowrap"
        data-node-id="163:120"
      >
        {titulo}
      </h2>
      <div className={COLUNA} data-medir="anos2000-texto">
        <Paragrafos textos={paragrafos} layout={LAYOUT} />
      </div>
    </section>
  );
}
