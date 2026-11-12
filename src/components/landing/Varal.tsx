"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Pregador } from "@/components/ui/Pregador.tsx";
import { prefereMenosMovimento } from "./movimento.ts";

const FIOS = {
  diagonal: "M0,12 L100,88",
  curvo: "M0,30 Q50,70 100,30",
  reto: "M0,40 L100,40",
} as const;

/** Inclinação base (em graus) de cada item, em ciclo. */
const INCLINACOES = [-6, 3, 6, -3, 4] as const;

/** Amplitude máxima do balanço causado pela rolagem, em graus. */
const AMPLITUDE_BALANCO = 3;

interface ItemVaral {
  id: string | number;
  conteudo: ReactNode;
}

interface Props {
  itens: readonly ItemVaral[];
  /** Descrição do grupo para leitores de tela. */
  rotulo: string;
  formato?: keyof typeof FIOS;
  /** As fotos balançam conforme a pessoa rola a página (nota do Figma). */
  balanco?: boolean;
  className?: string;
}

/** Fio vermelho com itens pendurados por pregadores, levemente inclinados. */
export function Varal({ itens, rotulo, formato = "curvo", balanco = false, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!balanco || !el || prefereMenosMovimento()) return;

    let quadro = 0;
    const atualizar = () => {
      quadro = 0;
      const graus = Math.sin(window.scrollY / 140) * AMPLITUDE_BALANCO;
      el.style.setProperty("--balanco", `${graus}deg`);
    };
    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(atualizar);
    };

    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      window.removeEventListener("scroll", aoRolar);
      cancelAnimationFrame(quadro);
    };
  }, [balanco]);

  return (
    <div ref={ref} role="group" aria-label={rotulo} className={`relative ${className}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 hidden size-full md:block"
      >
        <path
          d={FIOS[formato]}
          fill="none"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
          className="stroke-vermelho"
        />
      </svg>

      <ul className="relative flex flex-col items-center gap-14 py-10 md:flex-row md:items-start md:justify-center md:gap-0 md:py-16 md:-space-x-4">
        {itens.map((item, i) => (
          <li
            key={item.id}
            className="relative origin-top transition-transform duration-150 ease-out motion-reduce:transition-none"
            style={{
              transform: `rotate(calc(${INCLINACOES[i % INCLINACOES.length]}deg + var(--balanco, 0deg)))`,
            }}
          >
            <Pregador className="absolute -top-6 left-1/2 z-10 -translate-x-1/2" />
            {item.conteudo}
          </li>
        ))}
      </ul>
    </div>
  );
}
