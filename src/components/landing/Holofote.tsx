"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { prefereMenosMovimento } from "./movimento.ts";

interface Props {
  /** Fica dentro do círculo de luz e acompanha o movimento dele. */
  children: ReactNode;
  /** Deve definir a altura mínima da área. */
  className?: string;
}

/** Círculo de luz que segue o ponteiro, como um holofote (nota do Figma). */
export function Holofote({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function seguir(evento: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || prefereMenosMovimento()) return;

    const area = el.getBoundingClientRect();
    el.style.setProperty("--x", `${evento.clientX - area.left}px`);
    el.style.setProperty("--y", `${evento.clientY - area.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={seguir}
      className={`relative w-full touch-pan-y overflow-hidden ${className}`}
    >
      <div
        className="absolute flex aspect-square w-[min(85%,26rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/45 transition-[left,top] duration-300 ease-out motion-reduce:transition-none"
        style={{ left: "var(--x, 50%)", top: "var(--y, 50%)" }}
      >
        {children}
      </div>
    </div>
  );
}
