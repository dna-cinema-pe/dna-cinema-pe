"use client";

import { useEffect, useRef } from "react";

const CLASSE_VISIVEL = "revelar-texto--visivel";

/**
 * Revela os elementos `.revelar-texto` do mesmo pai (a seção) quando cada um passa de 30% da
 * altura da tela, uma vez só. O fade, a subida de 24 px e o atraso ficam no CSS
 * (globals.css e `transition-delay` em cada elemento).
 *
 * Sem JavaScript ou com animações desligadas, o texto já aparece visível: o estado escondido só
 * vale com `html[data-animacoes="ligadas"]`. Não renderiza nada visível.
 */
export function RevelarTexto() {
  const marcadorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const secao = marcadorRef.current?.parentElement;
    if (!secao) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          entrada.target.classList.add(CLASSE_VISIVEL);
          observador.unobserve(entrada.target);
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
