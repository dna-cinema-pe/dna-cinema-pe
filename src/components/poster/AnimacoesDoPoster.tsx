"use client";

import { useEffect } from "react";
import {
  derrubarPoster,
  iniciarVoo,
  obterAviao,
  obterBotaoReporPoster,
  obterPoster,
  pousarPoster,
  reporPoster,
  SELETOR_LOOPS,
} from "./animacoes.ts";

/**
 * Liga os gatilhos das animações do poster, que é renderizado no servidor:
 * - o avião voa uma vez quando 30% dele aparece na tela;
 * - o pôster cai ao receber o ponteiro, mouse ou toque (ou Enter/Espaço no foco), fica caído e,
 *   ao pousar, mostra "↺ Pendurar de novo", que o repõe;
 * - os loops (nuvens, cruz, pássaro, bandeirinhas) pausam quando saem da tela.
 * Não renderiza nada.
 */
export function AnimacoesDoPoster() {
  useEffect(() => {
    const limpezas: Array<() => void> = [];

    const aviao = obterAviao();
    if (aviao) {
      const observador = new IntersectionObserver(
        ([entrada]) => {
          if (entrada.isIntersecting) {
            iniciarVoo();
            observador.disconnect();
          }
        },
        { threshold: 0.3 },
      );
      observador.observe(aviao);
      limpezas.push(() => observador.disconnect());
    }

    const poster = obterPoster();
    if (poster) {
      const aoTeclar = (evento: KeyboardEvent) => {
        if (evento.key !== "Enter" && evento.key !== " ") return;
        evento.preventDefault();
        derrubarPoster();
      };
      // `click` cobre navegadores de toque que não disparam `pointerenter` no toque.
      poster.addEventListener("pointerenter", derrubarPoster);
      poster.addEventListener("click", derrubarPoster);
      poster.addEventListener("keydown", aoTeclar);
      poster.addEventListener("animationend", pousarPoster);
      limpezas.push(() => {
        poster.removeEventListener("pointerenter", derrubarPoster);
        poster.removeEventListener("click", derrubarPoster);
        poster.removeEventListener("keydown", aoTeclar);
        poster.removeEventListener("animationend", pousarPoster);
      });

      const botaoRepor = obterBotaoReporPoster();
      if (botaoRepor) {
        // O botão some ao repor; o foco volta para o pôster em vez de cair no <body>.
        const aoRepor = () => {
          reporPoster();
          poster.focus({ preventScroll: true });
        };
        botaoRepor.addEventListener("click", aoRepor);
        limpezas.push(() => botaoRepor.removeEventListener("click", aoRepor));
      }
    }

    // Os loops se movem horizontalmente (a nuvem vermelha anda 2400 px), então observar o próprio
    // elemento o pausaria ao sair de cena e ele nunca voltaria. Cada loop é observado por um
    // marcador parado, com a mesma caixa, que fica ao lado dele.
    const marcadores = new Map<Element, HTMLElement>();
    const observadorLoops = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          marcadores
            .get(entrada.target)
            ?.classList.toggle("loop-pausado", !entrada.isIntersecting);
        }
      },
      { rootMargin: "200px 0px" },
    );
    for (const loop of document.querySelectorAll<HTMLElement>(SELETOR_LOOPS)) {
      const marcador = document.createElement("div");
      marcador.setAttribute("aria-hidden", "true");
      marcador.style.visibility = "hidden";
      marcador.style.pointerEvents = "none";
      marcador.className = loop.className
        .split(/\s+/)
        .filter((classe) => !/^(cloud-float|red-cloud-loop|gold-cloud-loop|cross-sway|bird-flap|wind-sway)/.test(classe))
        .filter((classe) => classe !== "block")
        .join(" ");
      loop.parentElement?.insertBefore(marcador, loop);
      marcadores.set(marcador, loop);
      observadorLoops.observe(marcador);
    }
    limpezas.push(() => {
      observadorLoops.disconnect();
      for (const marcador of marcadores.keys()) marcador.remove();
    });

    return () => limpezas.forEach((limpar) => limpar());
  }, []);

  return null;
}
