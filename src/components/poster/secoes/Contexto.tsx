import conteudo from "../content.json";
import { Paragrafos, type LayoutParagrafo } from "./Paragrafos.tsx";

const { titulo, paragrafos } = conteudo.contexto;

/**
 * Posição de cada parágrafo no frame do Figma, na mesma ordem de `paragrafos`.
 * São duas linhas de duas colunas; o atraso escalona a revelação dentro de cada linha.
 */
const LAYOUT: readonly LayoutParagrafo[] = [
  { nodeId: "46:273", className: "left-[calc(20%+4px)] top-[calc(8%+35.04px)] w-[470px]", atraso: 0 },
  { nodeId: "46:275", className: "left-[calc(40%+266px)] top-[calc(8%+35.04px)] w-[498px]", atraso: 150 },
  { nodeId: "46:276", className: "left-[calc(20%+4px)] top-[calc(12%+60.56px)] w-[500px]", atraso: 0 },
  { nodeId: "132:713", className: "left-[calc(40%+252px)] top-[calc(12%+60.56px)] w-[512px]", atraso: 150 },
];

/**
 * Contexto (US-2.2): título e os quatro parágrafos do protótipo.
 *
 * Fica dentro do frame de 1920 px do Figma; o `contents` da seção mantém as posições relativas
 * a ele. O varal e o postal desta faixa continuam no DesignPoster, com os postais (US-2.4).
 * Os parágrafos sobem 24 px e aparecem quando entram na tela (ver RevelarTexto).
 */
export function Contexto() {
  return (
    <section aria-labelledby="titulo-contexto" className="contents">
      <h2
        id="titulo-contexto"
        className="-translate-x-full [word-break:break-word] absolute font-titulo leading-[normal] left-[calc(20%+979px)] not-italic text-[128px] text-right text-white top-[calc(7%+60.16px)] whitespace-nowrap"
        data-node-id="46:272"
      >
        {titulo}
      </h2>
      <Paragrafos textos={paragrafos} layout={LAYOUT} />
    </section>
  );
}
