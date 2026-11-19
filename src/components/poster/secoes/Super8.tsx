import conteudo from "../content.json";
import { Paragrafos, type LayoutParagrafo } from "./Paragrafos.tsx";

const { titulo, paragrafos } = conteudo.super8;

/** Posição de cada parágrafo no frame do Figma, na mesma ordem de `paragrafos`. */
const LAYOUT: readonly LayoutParagrafo[] = [
  { nodeId: "149:12", className: "left-[160px] top-[calc(27%+36.76px)] w-[477px]" },
  { nodeId: "149:13", className: "left-[calc(50%-239px)] top-[calc(27%+36.76px)] w-[477px]" },
  { nodeId: "149:17", className: "left-[calc(60%+130px)] top-[calc(27%+36.76px)] w-[455px]" },
];

/** Super-8, período da linha do tempo (US-2.3): título e texto do protótipo. */
export function Super8() {
  return (
    <section aria-labelledby="titulo-super-8" className="contents">
      <h2
        id="titulo-super-8"
        className="super8-titulo -translate-x-1/2 [word-break:break-word] absolute font-titulo leading-[normal] left-1/2 not-italic text-[120px] text-center text-white top-[calc(24%+24.12px)] whitespace-nowrap"
        data-node-id="149:9"
      >
        {titulo}
      </h2>
      <Paragrafos textos={paragrafos} layout={LAYOUT} />
    </section>
  );
}
