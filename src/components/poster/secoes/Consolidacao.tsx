import conteudo from "../content.json";
import { Paragrafos, type LayoutParagrafo } from "./Paragrafos.tsx";

const { titulo, paragrafos } = conteudo.consolidacao;

/** Posição de cada parágrafo no frame do Figma, na mesma ordem de `paragrafos`. */
const LAYOUT: readonly LayoutParagrafo[] = [
  { nodeId: "163:149", className: "h-[340px] left-[calc(20%+25px)] top-[calc(41%+228.08px)] w-[477px]" },
  { nodeId: "163:150", className: "h-[246px] left-[calc(40%+240px)] top-[calc(41%+228.08px)] w-[477px]" },
];

/** Consolidação, período da linha do tempo (US-2.3): título e texto do protótipo. */
export function Consolidacao() {
  return (
    <section aria-labelledby="titulo-consolidacao" className="contents">
      <h2
        id="titulo-consolidacao"
        className="-translate-x-1/2 [word-break:break-word] absolute font-titulo leading-[normal] left-[calc(20%+547px)] not-italic text-[64px] text-center text-white top-[calc(41%+71.08px)] whitespace-nowrap"
        data-node-id="180:3"
      >
        {titulo}
      </h2>
      <Paragrafos textos={paragrafos} layout={LAYOUT} />
    </section>
  );
}
