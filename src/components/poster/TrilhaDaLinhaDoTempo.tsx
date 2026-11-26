"use client";

import type { CapituloId } from "@/components/onboarding/capitulos.ts";
import { useOnboarding } from "@/components/onboarding/OnboardingProvider.tsx";

/** Períodos da linha do tempo (US-2.3), na ordem do pôster, ligados às âncoras de capítulo. */
const PERIODOS: ReadonlyArray<{ id: CapituloId; titulo: string; detalhe?: string }> = [
  { id: "cap-ciclo-do-recife", titulo: "Ciclo do Recife", detalhe: "1923–1931" },
  { id: "cap-super-8", titulo: "Super-8" },
  { id: "cap-retomada-e-manguebeat", titulo: "Retomada e Manguebeat" },
  { id: "cap-anos-2000", titulo: "Anos 2000" },
  { id: "cap-consolidacao", titulo: "Consolidação" },
];

/** Capítulo que encerra a linha do tempo: a trilha chega a 100% quando ele começa. */
const FIM: CapituloId = "cap-financiamento";

/**
 * Trilha vertical fixa que liga os períodos da linha do tempo. Aparece só enquanto um deles está
 * na tela, se preenche com a rolagem e deixa o período atual em dourado. Clicar num marcador rola
 * até o período pelo mesmo caminho do menu de capítulos, que se atualiza junto.
 *
 * Tudo deriva do `progresso` e das posições de capítulo do OnboardingProvider (US-1.4).
 */
export function TrilhaDaLinhaDoTempo() {
  const { progresso, percentuaisCapitulos, capituloAtivo, irParaCapitulo } = useOnboarding();

  const inicio = percentuaisCapitulos[PERIODOS[0].id];
  const fim = percentuaisCapitulos[FIM];
  const extensao = fim - inicio;
  const relativo = (valor: number) =>
    extensao > 0 ? Math.min(100, Math.max(0, ((valor - inicio) / extensao) * 100)) : 0;

  const indiceAtual = PERIODOS.findIndex((periodo) => periodo.id === capituloAtivo);
  const visivel = indiceAtual >= 0;

  return (
    <nav
      aria-label="Linha do tempo"
      aria-hidden={!visivel}
      inert={!visivel}
      className={`font-corpo fixed left-3 top-1/2 z-30 h-[min(56vh,420px)] -translate-y-1/2 transition-opacity duration-300 lg:left-24 ${
        visivel ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* Trilho e preenchimento, centrados nos marcadores (que têm 12 px). */}
      <div aria-hidden="true" className="absolute left-[11px] top-0 h-full w-0.5 rounded-full bg-white/15">
        <div
          className="h-full w-full origin-top rounded-full bg-ouro transition-transform duration-150"
          style={{ transform: `scaleY(${relativo(progresso) / 100})` }}
        />
      </div>

      <ol className="relative h-full">
        {PERIODOS.map((periodo, i) => {
          const atual = i === indiceAtual;
          const passou = i < indiceAtual;
          return (
            <li
              key={periodo.id}
              className="absolute left-0 -translate-y-1/2"
              style={{ top: `${relativo(percentuaisCapitulos[periodo.id])}%` }}
            >
              <button
                type="button"
                onClick={() => irParaCapitulo(periodo.id)}
                aria-current={atual ? "step" : undefined}
                aria-label={periodo.detalhe ? `${periodo.titulo}, ${periodo.detalhe}` : periodo.titulo}
                className="hotspot group flex items-center gap-2 rounded-full p-1.5"
              >
                <span
                  aria-hidden="true"
                  className={`block size-3 shrink-0 rounded-full border-2 transition-colors ${
                    atual
                      ? "border-ouro bg-ouro shadow-[0_0_0_4px_rgba(227,165,79,0.25)]"
                      : passou
                        ? "border-ouro bg-ouro/60"
                        : "border-white/50 bg-fundo group-hover:border-white"
                  }`}
                />
                {/* Só o rótulo do período atual fica sempre à mostra, para não cobrir o texto do
                    pôster; os outros aparecem no hover ou no foco do teclado. */}
                <span
                  aria-hidden="true"
                  className={`hidden whitespace-nowrap rounded-md bg-fundo/85 px-2 py-0.5 text-xs backdrop-blur-sm ${
                    atual
                      ? "font-semibold text-ouro lg:block"
                      : "text-white lg:group-hover:block lg:group-focus-visible:block"
                  }`}
                >
                  {periodo.titulo}
                  {periodo.detalhe && <span className="ml-1 text-white/50">{periodo.detalhe}</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
