"use client";

import { useEffect, useRef } from "react";
import { prefereMenosMovimento } from "@/components/landing/movimento.ts";

const CLASSE_VISIVEL = "revelar-texto--visivel";
const DURACAO_CONTAGEM = 1200;

/** Conta de 0 até `data-contar`, com desaceleração no fim. */
function contar(elemento: HTMLElement) {
  const alvo = Number(elemento.dataset.contar);
  if (!Number.isFinite(alvo)) return;
  const inicio = performance.now();
  const passo = (agora: number) => {
    const t = Math.min(1, (agora - inicio) / DURACAO_CONTAGEM);
    const suavizado = 1 - (1 - t) ** 3;
    elemento.textContent = String(Math.round(alvo * suavizado));
    if (t < 1) requestAnimationFrame(passo);
  };
  elemento.textContent = "0";
  requestAnimationFrame(passo);
}

/**
 * Revela os elementos `.revelar-texto` do mesmo pai (a seção) quando cada um passa de 30% da
 * altura da tela, uma vez só, e conta de 0 até o valor os números marcados com `data-contar`.
 * O fade, a subida de 24 px e o atraso ficam no CSS (globals.css e `transition-delay`).
 *
 * Sem JavaScript ou com animações desligadas, o texto já aparece visível e os números ficam no
 * valor final: o estado escondido só vale com `html[data-animacoes="ligadas"]`.
 */
export function RevelarTexto() {
  const marcadorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const secao = marcadorRef.current?.parentElement;
    if (!secao) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        const animar = !prefereMenosMovimento();
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          const elemento = entrada.target as HTMLElement;
          elemento.classList.add(CLASSE_VISIVEL);
          observador.unobserve(elemento);
          if (animar && entrada.boundingClientRect.top >= 0) {
            elemento.querySelectorAll<HTMLElement>("[data-contar]").forEach(contar);
          }
        }
      },
      // A margem de baixo exige que o texto passe de 30% da tela. A de cima, enorme, conta como
      // "na tela" tudo o que já ficou para trás: um salto (navegador de capítulos, Home/End) não
      // cruza o texto, e sem ela ele ficaria escondido para sempre.
      { rootMargin: "1000000px 0px -30% 0px" },
    );
    for (const elemento of secao.querySelectorAll(".revelar-texto")) observador.observe(elemento);

    return () => observador.disconnect();
  }, []);

  return <span ref={marcadorRef} hidden />;
}
