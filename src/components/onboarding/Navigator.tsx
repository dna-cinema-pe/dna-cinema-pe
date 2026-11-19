"use client";

import { useEffect, useState } from "react";
import { CAPITULOS, type CapituloId } from "./capitulos.ts";
import { useOnboarding } from "./OnboardingProvider.tsx";

interface ListaProps {
  aoNavegar: (id: CapituloId) => void;
}

function ListaCapitulos({ aoNavegar }: ListaProps) {
  const { capituloAtivo, capitulosVisitados } = useOnboarding();

  return (
    <ol className="space-y-0.5">
      {CAPITULOS.map((capitulo) => {
        const ativo = capituloAtivo === capitulo.id;
        const visitado = capitulosVisitados.has(capitulo.id);
        return (
          <li key={capitulo.id}>
            <button
              type="button"
              onClick={() => aoNavegar(capitulo.id)}
              aria-current={ativo ? "true" : undefined}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                ativo ? "text-vermelho font-semibold" : visitado ? "text-white" : "text-white/45"
              } hover:bg-white/10`}
            >
              <span
                aria-hidden="true"
                className={`size-1.5 shrink-0 rounded-full ${
                  ativo ? "bg-vermelho" : visitado ? "bg-vermelho/50" : "bg-white/30"
                }`}
              />
              {capitulo.titulo}
            </button>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Barra de progresso com marcas de capítulo embutidas: tudo deriva ao vivo do
 * mesmo `progresso` de rolagem, sem estado "em saltos" separado (US-1.4).
 */
function BarraDeProgresso({ aoNavegar }: ListaProps) {
  const { progresso, percentuaisCapitulos } = useOnboarding();

  return (
    <div
      id="onboarding-alvo-capitulos-desktop"
      className="font-corpo fixed inset-x-0 top-0 z-40 flex h-4 items-center"
    >
      <div className="relative h-[3px] w-full bg-white/10">
        <div
          className="h-full bg-vermelho transition-[width] duration-150"
          style={{ width: `${progresso}%` }}
        />
        {CAPITULOS.slice(1).map((capitulo) => {
          const posicao = percentuaisCapitulos[capitulo.id] ?? 0;
          const passou = posicao <= progresso + 0.5;
          return (
            <button
              key={capitulo.id}
              type="button"
              aria-hidden="false"
              aria-label={capitulo.titulo}
              onClick={() => aoNavegar(capitulo.id)}
              className="group absolute top-1/2 -translate-x-1/2 -translate-y-1/2 p-2"
              style={{ left: `${posicao}%` }}
            >
              <span
                className={`block h-2 w-0.5 rounded-full transition-colors ${
                  passou ? "bg-vermelho" : "bg-white/40 group-hover:bg-white/70"
                }`}
              />
              <span className="pointer-events-none absolute left-1/2 top-3 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[11px] font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100 lg:block">
                {capitulo.titulo}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Trilha de pontos, gaveta de capítulos e dica de próxima seção (US-1.4). */
export function Navigator() {
  const { capituloAtivo, irParaCapitulo, totalHotspots, hotspotsVistos } = useOnboarding();
  const [abertoMobile, setAbertoMobile] = useState(false);
  const [pertoDoFim, setPertoDoFim] = useState(false);

  const indiceAtivo = CAPITULOS.findIndex((c) => c.id === capituloAtivo);
  const proximo = indiceAtivo >= 0 ? CAPITULOS[indiceAtivo + 1] : undefined;
  const capituloAtual = CAPITULOS[indiceAtivo];

  useEffect(() => {
    function verificar() {
      const alvo = proximo && document.getElementById(proximo.id);
      if (!alvo) {
        setPertoDoFim(false);
        return;
      }
      const { top } = alvo.getBoundingClientRect();
      setPertoDoFim(top > -200 && top < window.innerHeight + 400);
    }
    verificar();
    if (!proximo) return;
    window.addEventListener("scroll", verificar, { passive: true });
    return () => window.removeEventListener("scroll", verificar);
  }, [proximo]);

  function navegar(id: CapituloId) {
    irParaCapitulo(id);
    setAbertoMobile(false);
  }

  return (
    <>
      <BarraDeProgresso aoNavegar={navegar} />

      {/* Indicador discreto de descobertas, só se houver algum hotspot na página */}
      {totalHotspots > 0 && (
        <div
          aria-hidden="true"
          className="font-corpo fixed right-4 top-5 z-40 hidden items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-medium text-vermelho backdrop-blur-sm lg:flex"
        >
          ✨ {hotspotsVistos.size}/{totalHotspots}
        </div>
      )}

      {/* Botão compacto no mobile: capítulo atual + abre a lista completa (canto oposto ao "?") */}
      <button
        id="onboarding-alvo-capitulos-mobile"
        type="button"
        onClick={() => setAbertoMobile((v) => !v)}
        aria-expanded={abertoMobile}
        aria-label="Abrir menu de capítulos"
        className="font-corpo fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full bg-black/50 px-3 py-2 text-[11px] font-medium text-white shadow-lg backdrop-blur-sm lg:hidden"
      >
        <span className="text-vermelho">
          {indiceAtivo + 1}/{CAPITULOS.length}
        </span>
        <span className="max-w-24 truncate">{capituloAtual?.titulo}</span>
      </button>

      {/* Gaveta no mobile */}
      {abertoMobile && (
        <div className="fixed inset-0 z-[46] lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Fechar menu de capítulos"
            className="absolute inset-0 bg-black/60"
            onClick={() => setAbertoMobile(false)}
          />
          <nav
            aria-label="Capítulos da reportagem"
            className="font-corpo absolute inset-x-0 bottom-0 max-h-[70vh] overflow-y-auto rounded-t-3xl bg-fundo/95 p-5 pt-3 backdrop-blur-xl"
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20" aria-hidden="true" />
            <ListaCapitulos aoNavegar={navegar} />
          </nav>
        </div>
      )}

      {/* Dica de próxima seção no mobile (no desktop as marcas já estão na barra) */}
      {proximo && pertoDoFim && (
        <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center lg:hidden">
          <button
            type="button"
            onClick={() => navegar(proximo.id)}
            className="font-corpo pointer-events-auto flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-2 text-[11px] font-medium text-white shadow-lg backdrop-blur-sm"
          >
            <span aria-hidden="true" className="animate-bounce text-vermelho">
              ⌄
            </span>
            {proximo.titulo}
          </button>
        </div>
      )}
    </>
  );
}
