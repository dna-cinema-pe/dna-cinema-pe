import conteudo from "../content.json";
import { COLUNA_RESPONSIVA, Paragrafos, TEXTO_RESPONSIVO, type LayoutParagrafo } from "./Paragrafos.tsx";

const { titulo, paragrafos } = conteudo.contexto;

/**
 * Responsivo (US-4.1), abaixo de 1280 px: os parágrafos de cada linha ficam um embaixo do outro,
 * no padrão de TEXTO_RESPONSIVO e COLUNA_RESPONSIVA (Paragrafos.tsx).
 *
 * Primeira linha, acima do varal. O PosterViewport mede a altura desta coluna
 * (`data-medir="contexto-primeira-linha"`) para descer o varal e o que vem depois
 * (`--espaco-contexto`) sem sobreposição.
 */
const PRIMEIRA_LINHA = `${COLUNA_RESPONSIVA} max-xl:top-[calc(8%+35.04px)]`;

/**
 * Posição de cada parágrafo no frame do Figma, na mesma ordem de `paragrafos`.
 * São duas linhas de duas colunas; o atraso escalona a revelação dentro de cada linha.
 */
const LAYOUT_PRIMEIRA_LINHA: readonly LayoutParagrafo[] = [
  {
    nodeId: "46:273",
    className: `left-[calc(20%+4px)] top-[calc(8%+35.04px)] w-[470px] ${TEXTO_RESPONSIVO}`,
    atraso: 0,
  },
  {
    nodeId: "46:275",
    className: `left-[calc(40%+266px)] top-[calc(8%+35.04px)] w-[498px] ${TEXTO_RESPONSIVO}`,
    atraso: 150,
  },
];

/**
 * Os dois parágrafos abaixo do varal: mesma coluna da primeira linha, a partir da posição do Figma
 * (12% + 60,56 px), descendo junto com o varal (`--espaco-contexto`).
 *
 * O PosterViewport mede a altura desta coluna (`data-medir="contexto-segunda-linha"`) para descer
 * o Ciclo do Recife e o que vem depois (`--espaco-ciclo`) sem sobreposição.
 */
const SEGUNDA_LINHA = `${COLUNA_RESPONSIVA} max-xl:top-[calc(12%+60.56px)] max-xl:[--extra:var(--espaco-contexto)]`;

const LAYOUT_SEGUNDA_LINHA: readonly LayoutParagrafo[] = [
  {
    nodeId: "46:276",
    className: `left-[calc(20%+4px)] top-[calc(12%+60.56px)] w-[500px] ${TEXTO_RESPONSIVO}`,
    atraso: 0,
  },
  {
    nodeId: "132:713",
    className: `left-[calc(40%+252px)] top-[calc(12%+60.56px)] w-[512px] ${TEXTO_RESPONSIVO}`,
    atraso: 150,
  },
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
      <div className={PRIMEIRA_LINHA} data-medir="contexto-primeira-linha">
        <Paragrafos textos={paragrafos.slice(0, 2)} layout={LAYOUT_PRIMEIRA_LINHA} />
      </div>
      <div className={SEGUNDA_LINHA} data-medir="contexto-segunda-linha">
        <Paragrafos textos={paragrafos.slice(2)} layout={LAYOUT_SEGUNDA_LINHA} />
      </div>
    </section>
  );
}
