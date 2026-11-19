import type { ReactNode } from "react";
import { RevelarTexto } from "../RevelarTexto.tsx";

/** Estilo comum dos parágrafos do pôster; a posição de cada um vem do layout. */
const BASE =
  "revelar-texto [word-break:break-word] absolute font-corpo font-medium leading-[normal] not-italic text-[24px] text-white";

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
