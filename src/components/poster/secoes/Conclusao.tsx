import conteudo from "../content.json";
import { FimDaJornada } from "../FimDaJornada.tsx";
import { Paragrafos, type LayoutParagrafo } from "./Paragrafos.tsx";

const { titulo, paragrafos } = conteudo.conclusao;

/** Posição de cada parágrafo no frame do Figma: uma coluna, um parágrafo por linha. */
const LAYOUT: readonly LayoutParagrafo[] = [
  { nodeId: "163:298", className: "left-[calc(20%+348px)] top-[calc(83%+221.04px)] w-[477px]", atraso: 0 },
  { nodeId: "163:299", className: "left-[calc(20%+348px)] top-[calc(85%+117.8px)] w-[477px]", atraso: 0 },
  { nodeId: "163:300", className: "left-[calc(20%+348px)] top-[calc(87%+5.56px)] w-[477px]", atraso: 0 },
  { nodeId: "163:301", className: "left-[calc(20%+348px)] top-[calc(88%+135.44px)] w-[477px]", atraso: 0 },
];

/**
 * Conclusão (US-2.10): título, parágrafos finais do protótipo e, logo depois, o resumo da jornada
 * com "Voltar ao início" e "Compartilhar" (FimDaJornada).
 */
export function Conclusao() {
  return (
    <section aria-labelledby="titulo-conclusao" className="contents">
      <h2
        id="titulo-conclusao"
        className="-translate-x-1/2 [word-break:break-word] absolute font-titulo leading-[normal] left-1/2 not-italic text-[170px] text-center text-white top-[calc(82%+151.16px)] whitespace-nowrap"
        data-node-id="163:297"
      >
        {titulo}
      </h2>
      <Paragrafos textos={paragrafos} layout={LAYOUT} />
      <FimDaJornada />
    </section>
  );
}
