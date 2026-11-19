"use client";

import { useEffect, useRef } from "react";
import { useOnboarding } from "./OnboardingProvider.tsx";

const PASSOS = [
  { texto: "Role para viajar no tempo", alvoIds: ["onboarding-alvo-rolar"] },
  { texto: "Elementos com ✨ reagem ao mouse ou toque", alvoIds: [] },
  {
    texto: "Use o menu de capítulos para pular etapas",
    alvoIds: ["onboarding-alvo-capitulos-desktop", "onboarding-alvo-capitulos-mobile"],
  },
] as const;

/** Entre os candidatos, acha o primeiro que está de fato visível (não escondido por lg:hidden etc.). */
function acharAlvoVisivel(ids: readonly string[]): HTMLElement | null {
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el && el.offsetParent !== null) return el;
  }
  return null;
}

/** Botão fixo "?" que reabre o tour a qualquer momento (US-1.1). */
export function BotaoReabrirTour() {
  const { abrirTour } = useOnboarding();
  return (
    <button
      type="button"
      onClick={(e) => abrirTour(e.currentTarget)}
      aria-label="Reabrir tour de boas-vindas"
      className="font-corpo fixed bottom-5 right-5 z-[60] flex size-11 items-center justify-center rounded-full bg-vermelho text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      ?
    </button>
  );
}

/** Tour de 3 passos com spotlight (US-1.1). */
export function WelcomeTour() {
  const { tourAberto, passoTour, irParaPasso, fecharTour } = useOnboarding();
  const cartaoRef = useRef<HTMLDivElement>(null);
  const passo = PASSOS[passoTour];

  // Foco inicial no cartão ao abrir/trocar de passo.
  useEffect(() => {
    if (tourAberto) cartaoRef.current?.focus();
  }, [tourAberto, passoTour]);

  // "Punça" o alvo do passo atual para fora do véu escuro (spotlight real, sem medir coordenadas).
  useEffect(() => {
    if (!tourAberto || passo.alvoIds.length === 0) return;
    const alvo = acharAlvoVisivel(passo.alvoIds);
    if (!alvo) return;
    const anterior = alvo.style.boxShadow;
    const anteriorZ = alvo.style.zIndex;
    alvo.style.boxShadow = "0 0 0 9999px rgba(0,0,0,0.7)";
    alvo.style.zIndex = "55";
    alvo.style.position = alvo.style.position || "relative";
    return () => {
      alvo.style.boxShadow = anterior;
      alvo.style.zIndex = anteriorZ;
    };
  }, [tourAberto, passo.alvoIds]);

  if (!tourAberto) return null;

  const ultimo = passoTour === PASSOS.length - 1;

  function avancar() {
    if (ultimo) fecharTour();
    else irParaPasso(passoTour + 1);
  }

  function voltar() {
    if (passoTour > 0) irParaPasso(passoTour - 1);
  }

  function aoTeclar(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      fecharTour();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      avancar();
      return;
    }
    if (e.key === "Tab") {
      // Trava o foco dentro do cartão do tour.
      const focaveis = cartaoRef.current?.querySelectorAll<HTMLElement>(
        "button, [tabindex]:not([tabindex='-1'])",
      );
      if (!focaveis || focaveis.length === 0) return;
      const primeiro = focaveis[0];
      const ultimoFocavel = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimoFocavel.focus();
      } else if (!e.shiftKey && document.activeElement === ultimoFocavel) {
        e.preventDefault();
        primeiro.focus();
      }
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      role="presentation"
    >
      <div
        ref={cartaoRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Tour de boas-vindas, passo ${passoTour + 1} de ${PASSOS.length}`}
        tabIndex={-1}
        onKeyDown={aoTeclar}
        className="font-corpo relative z-[56] mx-4 w-full max-w-md rounded-2xl bg-fundo border border-ouro/40 p-6 text-white shadow-2xl"
      >
        <p className="mb-3 text-xs font-semibold tracking-wide text-ouro">
          {passoTour + 1} de {PASSOS.length}
        </p>
        <p className="mb-6 text-lg font-semibold leading-snug">{passo.texto}</p>
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => fecharTour()}
            className="font-corpo text-sm text-white/70 underline-offset-2 hover:underline"
          >
            Pular tour
          </button>
          <div className="flex gap-2">
            {passoTour > 0 && (
              <button
                type="button"
                onClick={voltar}
                className="font-corpo rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Voltar
              </button>
            )}
            <button
              type="button"
              onClick={avancar}
              className="font-corpo rounded-full bg-ouro px-4 py-2 text-sm font-bold text-fundo hover:brightness-110"
            >
              {ultimo ? "Concluir" : "Próximo"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
