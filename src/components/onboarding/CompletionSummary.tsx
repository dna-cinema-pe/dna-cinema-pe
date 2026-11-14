"use client";

import { useState } from "react";
import { CAPITULOS } from "./capitulos.ts";
import { useOnboarding } from "./OnboardingProvider.tsx";

function Anel({ valor, total, rotulo }: { valor: number; total: number; rotulo: string }) {
  const percentual = total > 0 ? Math.round((valor / total) * 100) : 0;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="flex size-14 items-center justify-center rounded-full"
        style={{
          background: `conic-gradient(var(--color-ouro) ${percentual}%, rgba(255,255,255,0.12) 0)`,
        }}
      >
        <div className="flex size-11 items-center justify-center rounded-full bg-fundo text-xs font-bold text-white">
          {valor}/{total}
        </div>
      </div>
      <span className="text-[11px] text-white/55">{rotulo}</span>
    </div>
  );
}

/** Resumo exibido ao chegar na Conclusão: capítulos lidos e descobertas (US-1.5). */
export function CompletionSummary() {
  const { capituloAtivo, capitulosVisitados, totalHotspots, hotspotsVistos, irParaCapitulo } =
    useOnboarding();
  const [dispensado, setDispensado] = useState(false);

  const chegouNaConclusao = capituloAtivo === "cap-conclusao" || capituloAtivo === "cap-rodape";

  // Reseta o "dispensado" ao sair e voltar para a conclusão (ajuste de estado durante a renderização).
  const [chegouAnterior, setChegouAnterior] = useState(chegouNaConclusao);
  if (chegouNaConclusao !== chegouAnterior) {
    setChegouAnterior(chegouNaConclusao);
    if (!chegouNaConclusao) setDispensado(false);
  }

  if (!chegouNaConclusao || dispensado) return null;

  return (
    <div
      role="status"
      className="font-corpo fixed inset-x-0 bottom-20 z-40 flex justify-center px-4"
    >
      <div className="relative flex w-full max-w-sm items-center gap-4 rounded-2xl border border-white/10 bg-fundo/80 p-4 text-white shadow-2xl backdrop-blur-xl">
        <button
          type="button"
          aria-label="Fechar resumo"
          onClick={() => setDispensado(true)}
          className="absolute right-2.5 top-2.5 text-base leading-none text-white/50 hover:text-white"
        >
          ×
        </button>

        <div className="flex gap-3">
          <Anel valor={capitulosVisitados.size} total={CAPITULOS.length} rotulo="capítulos" />
          {totalHotspots > 0 && (
            <Anel valor={hotspotsVistos.size} total={totalHotspots} rotulo="descobertas" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="mb-2 text-xs font-semibold leading-snug text-white/85">
            Você chegou ao fim da reportagem
          </p>
          <button
            type="button"
            onClick={() => irParaCapitulo("cap-hero")}
            className="font-corpo flex items-center gap-1.5 rounded-full bg-ouro px-3 py-1.5 text-[11px] font-bold text-fundo hover:brightness-110"
          >
            <span aria-hidden="true">↑</span>
            Voltar ao início
          </button>
        </div>
      </div>
    </div>
  );
}
