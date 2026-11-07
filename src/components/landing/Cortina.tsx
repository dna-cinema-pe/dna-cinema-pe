"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Pregador } from "@/components/ui/Pregador.tsx";
import { prefereMenosMovimento } from "./movimento.ts";

const FUNDO_CORTINA =
  "repeating-linear-gradient(90deg, #4a0000 0px, #e2200f 14px, #8a0a05 28px, #4a0000 40px)";

interface Props {
  /** O que aparece atrás da cortina quando ela abre. */
  children: ReactNode;
  className?: string;
}

/**
 * Cortina que escurece e abre conforme a pessoa rola a página, revelando o conteúdo atrás
 * (nota do Figma). Sem JavaScript ou com movimento reduzido, a cortina fica aberta.
 */
export function Cortina({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefereMenosMovimento()) return;

    let quadro = 0;
    const atualizar = () => {
      quadro = 0;
      const { top } = el.getBoundingClientRect();
      const altura = window.innerHeight;
      // Fechada com o topo no pé da tela; aberta quando ele sobe a ~30% dela.
      const abertura = Math.min(1, Math.max(0, (altura * 0.9 - top) / (altura * 0.6)));
      el.style.setProperty("--abertura", String(abertura));
    };
    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(atualizar);
    };

    atualizar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
      cancelAnimationFrame(quadro);
    };
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-fundo ${className}`}>
      <div className="relative z-0">{children}</div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 will-change-transform"
        style={{
          background: FUNDO_CORTINA,
          transform: "translateX(calc(var(--abertura, 1) * -100%))",
          filter: "brightness(calc(0.45 + var(--abertura, 1) * 0.55))",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/2 will-change-transform"
        style={{
          background: FUNDO_CORTINA,
          transform: "translateX(calc(var(--abertura, 1) * 100%))",
          filter: "brightness(calc(0.45 + var(--abertura, 1) * 0.55))",
        }}
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-3 z-20 h-0.5 bg-vermelho" />
      <Pregador className="absolute left-4 top-0 z-20 -rotate-12 sm:left-10" />
      <Pregador className="absolute right-4 top-0 z-20 rotate-12 sm:right-10" />
    </div>
  );
}
