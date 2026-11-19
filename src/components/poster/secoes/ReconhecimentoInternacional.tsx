import type { PremiosInternacionais } from "@/server/panorama.ts";
import conteudo from "../content.json";
import { RotaInternacional } from "../RotaInternacional.tsx";
import { Paragrafos, type LayoutParagrafo } from "./Paragrafos.tsx";

const { titulo, paragrafos } = conteudo.reconhecimentoInternacional;

/** Posição de cada parágrafo no frame do Figma: três linhas de duas colunas. */
const LAYOUT: readonly LayoutParagrafo[] = [
  { nodeId: "163:233", className: "left-[calc(20%+26px)] top-[calc(62%+69.56px)] w-[477px]", atraso: 0 },
  { nodeId: "163:235", className: "left-[calc(40%+368px)] top-[calc(62%+69.56px)] w-[477px]", atraso: 150 },
  { nodeId: "163:237", className: "left-[calc(20%+26px)] top-[calc(63%+114.44px)] w-[477px]", atraso: 0 },
  { nodeId: "163:238", className: "left-[calc(40%+368px)] top-[calc(63%+114.44px)] w-[477px]", atraso: 150 },
  { nodeId: "163:240", className: "left-[calc(20%+26px)] top-[calc(64%+165.32px)] w-[477px]", atraso: 0 },
  { nodeId: "163:241", className: "left-[calc(40%+368px)] top-[calc(64%+165.32px)] w-[477px]", atraso: 150 },
];

interface Props {
  /** Vem de `obterPremiosInternacionais()`; sem dado, os pinos avisam que não carregou. */
  premios?: PremiosInternacionais | null;
}

/**
 * Reconhecimento Internacional (US-2.7): título, texto do protótipo e a rota do avião com os
 * pinos dos festivais. O avião continua no DesignPoster, com a classe `plane-flight`.
 */
export function ReconhecimentoInternacional({ premios = null }: Props) {
  return (
    <section aria-labelledby="titulo-reconhecimento-internacional" className="contents">
      <h2
        id="titulo-reconhecimento-internacional"
        className="-translate-x-1/2 [word-break:break-word] absolute font-titulo leading-[0] left-[calc(20%+598px)] not-italic text-[100px] text-center text-white top-[calc(60%+237.8px)] whitespace-nowrap"
        data-node-id="163:185"
      >
        {titulo.map((linha) => (
          <span key={linha} className="block leading-[normal] whitespace-pre">
            {linha}{" "}
          </span>
        ))}
      </h2>
      <Paragrafos textos={paragrafos} layout={LAYOUT} />
      <RotaInternacional premios={premios} />
    </section>
  );
}
