import conteudo from "../content.json";
import { FimDaJornada } from "../FimDaJornada.tsx";
import { Paragrafos, type LayoutParagrafo } from "./Paragrafos.tsx";

const { titulo, paragrafos } = conteudo.conclusao;

/**
 * Os parágrafos ficam numa coluna em fluxo em todas as larguras (US-4.1). Do tablet para cima,
 * na posição e largura do Figma, com 95 px entre eles, o mesmo espaço dos outros textos do pôster
 * (no Figma eram ~220). Abaixo de 768 px: texto com 14 px reais, centralizado, numa coluna com a
 * largura dos outros textos (1400 px do frame). A coluna começa na posição do Figma ou, se for mais
 * baixo, 24 px reais depois do título (82% + 151,16 px de topo, 233,75 px de altura). O
 * PosterViewport mede a coluna (`data-medir="conclusao-texto"`) para descer o fim da jornada, os
 * Créditos e o resto (`--espaco-conclusao`).
 */
const TEXTO_CELULAR =
  "md:static md:w-full max-md:static max-md:w-full max-md:font-normal max-md:text-center max-md:text-[length:calc(14px*var(--inv,1))]";
const COLUNA =
  "absolute flex flex-col gap-[95px] left-[calc(20%+348px)] w-[477px] top-[calc(83%+221.04px)] max-md:gap-[calc(24px*var(--inv,1))] max-md:left-[260px] max-md:w-[1400px] max-md:top-[max(calc(83%+221.04px),calc(82%+384.91px+24px*var(--inv,1)))] poster-nivel-recorte";

/** Posição de cada parágrafo no frame do Figma: uma coluna, um parágrafo por linha. */
const LAYOUT: readonly LayoutParagrafo[] = [
  { nodeId: "163:298", className: `left-[calc(20%+348px)] top-[calc(83%+221.04px)] w-[477px] ${TEXTO_CELULAR}`, atraso: 0 },
  { nodeId: "163:299", className: `left-[calc(20%+348px)] top-[calc(85%+117.8px)] w-[477px] ${TEXTO_CELULAR}`, atraso: 0 },
  { nodeId: "163:300", className: `left-[calc(20%+348px)] top-[calc(87%+5.56px)] w-[477px] ${TEXTO_CELULAR}`, atraso: 0 },
  { nodeId: "163:301", className: `left-[calc(20%+348px)] top-[calc(88%+135.44px)] w-[477px] ${TEXTO_CELULAR}`, atraso: 0 },
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
        className="-translate-x-1/2 poster-nivel-recorte [word-break:break-word] absolute font-titulo leading-[normal] left-1/2 not-italic text-[170px] text-center text-white top-[calc(82%+151.16px)] whitespace-nowrap"
        data-node-id="163:297"
      >
        {titulo}
      </h2>
      <div className={COLUNA} data-medir="conclusao-texto">
        <Paragrafos textos={paragrafos} layout={LAYOUT} />
      </div>
      <FimDaJornada />
    </section>
  );
}
