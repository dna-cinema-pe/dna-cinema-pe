import type { ReactNode } from "react";
import { RevelarTexto } from "../RevelarTexto.tsx";

/** Estilo comum dos parágrafos do pôster; a posição de cada um vem do layout. */
const BASE =
  "revelar-texto [word-break:break-word] absolute font-corpo font-medium leading-[normal] not-italic text-[24px] text-white";

/**
 * Responsivo (US-4.1), abaixo de 1280 px, no mesmo padrão do subtítulo da Abertura: o texto fica
 * com 14 px reais na tela (`--inv` = 1 / escala do frame, ver PosterViewport), nunca menor que os
 * 24 px do Figma, com o mesmo peso e o mesmo alinhamento centralizado do subtítulo, e o parágrafo
 * sai da posição absoluta para entrar numa COLUNA_RESPONSIVA. Vai no `className` do layout.
 */
export const TEXTO_RESPONSIVO =
  "max-xl:text-[length:max(24px,calc(14px*var(--inv,1)))] max-xl:font-normal max-xl:text-center max-xl:static max-xl:w-full";

/**
 * Coluna em que os parágrafos de uma linha ficam um embaixo do outro abaixo de 1280 px,
 * centralizada e com a largura do subtítulo da Abertura (1300 px do frame no tablet, 1400 px no
 * celular). Falta só o `max-xl:top-…` de cada seção. No desktop é `contents` e não muda nada.
 *
 * Usa `xl:contents`, e não a classe `contents`, para a regra `.poster-deslocar` (globals.css)
 * descer a coluna inteira, e não cada parágrafo. Leva `data-medir` para o PosterViewport medir a
 * altura e descer o que vem depois sem sobreposição.
 */
export const COLUNA_RESPONSIVA =
  "xl:contents max-xl:absolute max-xl:flex max-xl:flex-col max-xl:gap-[calc(24px*var(--inv,1))] max-xl:left-[310px] max-xl:w-[1300px] max-md:left-[260px] max-md:w-[1400px]";

export interface LayoutParagrafo {
  /** Nó do Figma, mantido para achar o elemento no design. */
  nodeId: string;
  /** Posição e tamanho no frame de 1920 px. */
  className: string;
  /** Atraso da revelação em ms; por padrão, 150 ms entre parágrafos seguidos. */
  atraso?: number;
}

/**
 * Envolve os números do texto para o RevelarTexto contá-los de 0 até o valor. Só números com dois
 * dígitos ou mais e fora de nomes como "Super-8", para não contar o que não é dado.
 */
function comNumerosContaveis(texto: string): ReactNode[] {
  return texto.split(/(?<![\w-])(\d{2,})(?![\w-])/).map((parte, i) =>
    i % 2 === 1 ? (
      <span key={i} data-contar={parte} className="tabular-nums">
        {parte}
      </span>
    ) : (
      parte
    ),
  );
}

interface ParagrafosProps {
  textos: readonly string[];
  /** Mesma ordem de `textos`. */
  layout: readonly LayoutParagrafo[];
}

/**
 * Parágrafos de uma seção do pôster, revelados ao entrar na tela (fade, subida de 24 px e
 * escalonamento). Precisa ficar direto dentro do elemento da seção, que o RevelarTexto observa.
 */
export function Paragrafos({ textos, layout }: ParagrafosProps) {
  return (
    <>
      {textos.map((texto, i) => (
        <p
          key={layout[i].nodeId}
          className={`${BASE} ${layout[i].className}`}
          style={{ transitionDelay: `${layout[i].atraso ?? i * 150}ms` }}
          data-node-id={layout[i].nodeId}
        >
          {comNumerosContaveis(texto)}
        </p>
      ))}
      <RevelarTexto />
    </>
  );
}
