import conteudo from "../content.json";
import { Paragrafos, type LayoutParagrafo } from "./Paragrafos.tsx";

const { titulo, paragrafos } = conteudo.anos2000;

/** Posição de cada parágrafo no frame do Figma, na mesma ordem de `paragrafos`. */
const LAYOUT: readonly LayoutParagrafo[] = [
  { nodeId: "163:123", className: "h-[211px] left-[calc(20%+25px)] top-[calc(39%+219.32px)] w-[477px]" },
  { nodeId: "163:125", className: "h-[246px] left-[calc(40%+240px)] top-[calc(39%+219.32px)] w-[477px]" },
];

/** Anos 2000, período da linha do tempo (US-2.3): título e texto do protótipo. */
export function Anos2000() {
  return (
    <section aria-labelledby="titulo-anos-2000" className="contents">
      <h2
        id="titulo-anos-2000"
        className="-translate-x-1/2 [word-break:break-word] absolute font-titulo leading-[normal] left-[calc(20%+576px)] not-italic text-[120px] text-center text-white top-[calc(38%+133.44px)] whitespace-nowrap"
        data-node-id="163:120"
      >
        {titulo}
      </h2>
      <Paragrafos textos={paragrafos} layout={LAYOUT} />
    </section>
  );
}
