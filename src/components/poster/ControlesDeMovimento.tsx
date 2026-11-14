"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  acompanharPreferenciaDoSistema,
  definirAnimacoes,
  prefereMenosMovimento,
} from "@/components/landing/movimento.ts";
import { repetirVoo, reporPoster } from "./animacoes.ts";

const BOTAO =
  "hotspot rounded-full border border-ouro bg-fundo/90 px-4 py-2 font-corpo text-sm font-semibold text-ouro hover:bg-ouro hover:text-fundo disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-fundo/90 disabled:hover:text-ouro";

/** Observa o atributo data-animacoes do <html>, que vem do script do layout e do interruptor. */
function assinar(aoMudar: () => void) {
  const observador = new MutationObserver(aoMudar);
  observador.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-animacoes"],
  });
  return () => observador.disconnect();
}

/**
 * Painel fixo no canto da tela. O interruptor liga e desliga todas as animações e sobrepõe a
 * preferência do sistema; as animações de uma vez só (voo do avião e queda do pôster) oferecem
 * uma ação para repetir.
 */
export function ControlesDeMovimento() {
  // No servidor as animações contam como ligadas; o cliente corrige logo após a hidratação.
  const desligadas = useSyncExternalStore(assinar, prefereMenosMovimento, () => false);

  useEffect(() => acompanharPreferenciaDoSistema(), []);

  return (
    <div
      role="group"
      aria-label="Controles de animação"
      className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2"
    >
      <button
        type="button"
        role="switch"
        aria-checked={!desligadas}
        onClick={() => definirAnimacoes(desligadas)}
        className={BOTAO}
      >
        Animações: {desligadas ? "desligadas" : "ligadas"}
      </button>
      <button type="button" onClick={repetirVoo} disabled={desligadas} className={BOTAO}>
        Repetir voo do avião
      </button>
      <button type="button" onClick={reporPoster} disabled={desligadas} className={BOTAO}>
        Repor pôster
      </button>
    </div>
  );
}
