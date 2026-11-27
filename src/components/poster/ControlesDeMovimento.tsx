"use client";

import { useEffect, useRef, useState } from "react";
import { acompanharPreferenciaDoSistema, definirAnimacoes } from "@/components/landing/movimento.ts";
import { repetirVoo, reporPoster } from "./animacoes.ts";
import { useAnimacoesDesligadas } from "./useAnimacoesDesligadas.ts";

const ITEM =
  "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ouro disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent";

/**
 * Configurações de animação, guardadas atrás de uma engrenagem discreta no canto inferior direito,
 * ao lado do "?". O interruptor liga e desliga todas as animações e sobrepõe a preferência do
 * sistema; as animações de uma vez só (voo do avião e queda do pôster) oferecem uma ação para
 * repetir. O menu fecha com Esc (o foco volta à engrenagem) ou com um clique fora dele.
 */
export function ControlesDeMovimento() {
  const desligadas = useAnimacoesDesligadas();
  const [aberto, setAberto] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const engrenagem = useRef<HTMLButtonElement>(null);

  useEffect(() => acompanharPreferenciaDoSistema(), []);

  useEffect(() => {
    if (!aberto) return;
    const aoApertarFora = (evento: PointerEvent) => {
      if (raiz.current && !raiz.current.contains(evento.target as Node)) setAberto(false);
    };
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key !== "Escape") return;
      setAberto(false);
      engrenagem.current?.focus();
    };
    document.addEventListener("pointerdown", aoApertarFora);
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.removeEventListener("pointerdown", aoApertarFora);
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto]);

  return (
    <div ref={raiz} className="font-corpo fixed bottom-5 right-[4.5rem] z-[60]">
      {aberto && (
        <div
          id="configuracoes-animacao"
          role="group"
          aria-label="Configurações de animação"
          className="absolute bottom-full right-0 mb-2 w-60 rounded-2xl border border-white/10 bg-fundo/95 p-2 shadow-xl backdrop-blur-sm"
        >
          <p className="px-3 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/50">
            Configurações
          </p>
          <button
            type="button"
            role="switch"
            aria-checked={!desligadas}
            onClick={() => definirAnimacoes(desligadas)}
            className={ITEM}
          >
            Animações
            <span className={`text-xs font-semibold ${desligadas ? "text-white/50" : "text-ouro"}`}>
              {desligadas ? "desligadas" : "ligadas"}
            </span>
          </button>
          <button type="button" onClick={repetirVoo} disabled={desligadas} className={ITEM}>
            Repetir voo do avião
          </button>
          <button type="button" onClick={reporPoster} disabled={desligadas} className={ITEM}>
            Repor pôster
          </button>
        </div>
      )}
      <button
        ref={engrenagem}
        type="button"
        onClick={() => setAberto((valor) => !valor)}
        aria-expanded={aberto}
        aria-controls="configuracoes-animacao"
        aria-label="Configurações de animação"
        className="flex size-9 items-center justify-center rounded-full bg-black/40 text-white/60 backdrop-blur-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </button>
    </div>
  );
}
