"use client";

import { repetirVoo, reporPoster } from "./animacoes.ts";

const BOTAO =
  "hotspot rounded-full border border-ouro bg-fundo/90 px-4 py-2 font-corpo text-sm font-semibold text-ouro hover:bg-ouro hover:text-fundo";

/**
 * Painel fixo no canto da tela. As animações de uma vez só (voo do avião e queda do pôster)
 * oferecem uma ação para repetir.
 */
export function ControlesDeMovimento() {
  return (
    <div
      role="group"
      aria-label="Controles de animação"
      className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2"
    >
      <button type="button" onClick={repetirVoo} className={BOTAO}>
        Repetir voo do avião
      </button>
      <button type="button" onClick={reporPoster} className={BOTAO}>
        Repor pôster
      </button>
    </div>
  );
}
