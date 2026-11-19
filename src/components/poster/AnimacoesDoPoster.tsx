"use client";

import { useEffect } from "react";
import {
  abrirCortinas,
  atualizarArco,
  derrubarPoster,
  iniciarVoo,
  obterArco,
  obterAviao,
  obterBotaoReporPoster,
  obterCortinas,
  obterPoster,
  pousarPoster,
  reporPoster,
  SELETOR_LOOPS,
  VARREDURA_ANTES_DE_ABRIR_MS,
} from "./animacoes.ts";

/**
 * Liga os gatilhos das animações do poster, que é renderizado no servidor:
 * - o avião voa uma vez quando 30% dele aparece na tela;
 * - o arco de guarda-chuva de frevo do Ciclo do Recife abre e fecha acompanhando a rolagem;
 * - o holofote do Super-8 varre as cortinas fechadas; quando o palco chega à faixa central da
 *   tela, ele varre por mais alguns segundos, as cortinas abrem uma vez, ele para e o título surge;
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

    const arco = obterArco();
    if (arco) {
      // Um cálculo por quadro, no máximo, mesmo com muitos eventos de rolagem.
      let quadro = 0;
      const agendar = () => {
        if (quadro) return;
        quadro = requestAnimationFrame(() => {
          quadro = 0;
          atualizarArco(arco);
        });
      };
      atualizarArco(arco);
      window.addEventListener("scroll", agendar, { passive: true });
      window.addEventListener("resize", agendar);
      limpezas.push(() => {
        cancelAnimationFrame(quadro);
        window.removeEventListener("scroll", agendar);
        window.removeEventListener("resize", agendar);
      });
    }

    const cortinas = obterCortinas();
    if (cortinas) {
      const observador = new IntersectionObserver(
        ([entrada]) => {
          if (entrada.isIntersecting) {
            const espera = window.setTimeout(abrirCortinas, VARREDURA_ANTES_DE_ABRIR_MS);
            limpezas.push(() => window.clearTimeout(espera));
            observador.disconnect();
          }
        },
        // Faixa central da janela, e não uma fração do palco: o palco (959 px na escala cheia)
        // pode ser mais alto que a tela, e aí nunca ficaria 60% visível.
        { rootMargin: "-35% 0px -35% 0px" },
      );
      observador.observe(cortinas);
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
        .filter((classe) => !/^(cloud-float|red-cloud-loop|gold-cloud-loop|cross-sway|bird-flap|wind-sway|super8-holofote)/.test(classe))
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
