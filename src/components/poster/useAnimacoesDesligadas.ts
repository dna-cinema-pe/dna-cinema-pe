"use client";

import { useSyncExternalStore } from "react";
import { prefereMenosMovimento } from "@/components/landing/movimento.ts";

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
 * `true` quando as animações estão desligadas (sistema ou interruptor). No servidor contam como
 * ligadas; o cliente corrige logo após a hidratação.
 */
export function useAnimacoesDesligadas(): boolean {
  return useSyncExternalStore(assinar, prefereMenosMovimento, () => false);
}
