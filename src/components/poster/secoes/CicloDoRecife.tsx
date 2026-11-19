import conteudo from "../content.json";
import { Paragrafos, type LayoutParagrafo } from "./Paragrafos.tsx";

const { titulo, paragrafos } = conteudo.cicloDoRecife;

/** Posição de cada parágrafo no frame do Figma, na mesma ordem de `paragrafos`. */
const LAYOUT: readonly LayoutParagrafo[] = [
  { nodeId: "46:301", className: "left-[calc(30%-184px)] top-[calc(16%+41.08px)] w-[501px]" },
  { nodeId: "46:307", className: "left-[calc(70%-265px)] top-[calc(16%+41.08px)] w-[453px]" },
];

/** Ciclo do Recife (1923–1931), período da linha do tempo (US-2.3): título e texto do protótipo. */
export function CicloDoRecife() {
  return (
    <section aria-labelledby="titulo-ciclo-do-recife" className="contents">
      <h2
        id="titulo-ciclo-do-recife"
        className="-translate-x-1/2 [word-break:break-word] absolute font-titulo leading-[normal] left-1/2 not-italic text-[120px] text-center text-white top-[calc(15%+77.2px)] w-[1158px]"
        data-node-id="129:3"
      >
        {titulo}
      </h2>
      <Paragrafos textos={paragrafos} layout={LAYOUT} />
    </section>
  );
}
