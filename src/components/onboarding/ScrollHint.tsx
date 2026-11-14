"use client";

import { useEffect, useState } from "react";
import { useOnboarding } from "./OnboardingProvider.tsx";

const CHAVE_SESSAO = "scroll_hint_visto";

/** Dica "role para começar" no hero (US-1.2). */
export function ScrollHint() {
  const { irParaCapitulo, tourAberto, passoTour } = useOnboarding();
  const [mostrarPorTimer, setMostrarPorTimer] = useState(false);
  const [escondidoPermanente, setEscondidoPermanente] = useState(false);

  useEffect(() => {
    function inicializar() {
      try {
        if (window.sessionStorage.getItem(CHAVE_SESSAO) === "true") setEscondidoPermanente(true);
      } catch {
        // sessionStorage indisponível — segue sem persistir.
      }
    }
    inicializar();
  }, []);

  useEffect(() => {
    const temporizador = window.setTimeout(() => setMostrarPorTimer(true), 3000);
    return () => window.clearTimeout(temporizador);
  }, []);

  useEffect(() => {
    function aoRolar() {
      if (window.scrollY > 100) {
        setEscondidoPermanente(true);
        try {
          window.sessionStorage.setItem(CHAVE_SESSAO, "true");
        } catch {
          // sessionStorage indisponível — segue sem persistir.
        }
      }
    }
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Durante o passo 1 do tour, mostra a dica de verdade em vez de um alvo vazio.
  const destacadoPeloTour = tourAberto && passoTour === 0;
  const visivel = !escondidoPermanente && (mostrarPorTimer || destacadoPeloTour);

  return (
    <div
      id="onboarding-alvo-rolar"
      className={`fixed inset-x-0 bottom-6 z-40 flex flex-col items-center gap-2 transition-opacity duration-300 ${
        visivel ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <span aria-hidden="true" className="animate-bounce text-3xl text-ouro">
        ↓
      </span>
      <p className="font-corpo text-sm font-semibold text-white drop-shadow">
        Role para começar
      </p>
      <button
        type="button"
        onClick={() => irParaCapitulo("cap-contexto")}
        className="font-corpo mt-1 rounded-full bg-ouro px-4 py-2 text-xs font-bold text-fundo hover:brightness-110"
      >
        Começar a viagem
      </button>
    </div>
  );
}
