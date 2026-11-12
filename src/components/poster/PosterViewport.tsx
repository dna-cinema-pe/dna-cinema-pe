"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Dimensões do frame no Figma (desktop). O mobile não tem design: o frame só é reduzido. */
const LARGURA = 1920;
const ALTURA = 25712;

/**
 * Reduz o frame de 1920 px para caber na largura da janela, mantendo as proporções.
 * Fica invisível até medir a largura, para não piscar em tamanho cheio.
 */
export function PosterViewport({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [escala, setEscala] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const atualizar = () => setEscala(Math.min(container.clientWidth / LARGURA, 1));
    atualizar();

    const observer = new ResizeObserver(atualizar);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const escalaAtual = escala ?? 1;

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-[1920px] overflow-hidden bg-fundo"
      style={{ height: ALTURA * escalaAtual }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: LARGURA,
          height: ALTURA,
          transform: `scale(${escalaAtual})`,
          visibility: escala === null ? "hidden" : "visible",
        }}
      >
        {children}
      </div>
    </div>
  );
}
