"use client";

import { useEffect, useState } from "react";
import { CAPITULOS } from "@/components/onboarding/capitulos.ts";
import { useOnboarding } from "@/components/onboarding/OnboardingProvider.tsx";
import conteudo from "./content.json";

const { voltarAoInicio, compartilhar, linkCopiado } = conteudo.conclusao;
const { titulo, subtitulo } = conteudo.abertura;

const BOTAO =
  "hotspot flex items-center gap-3 rounded-full border-2 border-ouro px-8 py-4 font-corpo text-[28px] font-bold";

type EstadoCompartilhar = "parado" | "copiado" | "manual";

/** Endereço da reportagem, sem âncora de capítulo nem parâmetros. */
function enderecoDaPagina() {
  return `${window.location.origin}${window.location.pathname}`;
}

/**
 * Fim da Conclusão (US-2.10): resumo da jornada (capítulos lidos e descobertas, os mesmos números
 * da US-1.5), "Voltar ao início" e "Compartilhar". Compartilhar usa a Web Share API; sem ela, ou
 * se ela falhar, copia o link, e se nem isso der, mostra o link para copiar à mão.
 */
export function FimDaJornada() {
  const { capitulosVisitados, totalHotspots, hotspotsVistos, irParaCapitulo } = useOnboarding();
  const [estado, setEstado] = useState<EstadoCompartilhar>("parado");
  // Os números vêm da rolagem: só existem no cliente. A 1ª renderização mostra 0 para bater com
  // o HTML do servidor (e com a hidratação tardia de um subtree que já vê o progresso medido).
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => setHidratado(true), []);

  const capitulosLidos = hidratado ? capitulosVisitados.size : 0;
  const descobertas = hidratado ? hotspotsVistos.size : 0;
  const totalDescobertas = hidratado ? totalHotspots : 0;

  async function aoCompartilhar() {
    const url = enderecoDaPagina();
    const dados = {
      title: `${titulo.prefixo} ${titulo.linhas.join(" ")}`,
      text: subtitulo,
      url,
    };
    if (typeof navigator.share === "function" && (!navigator.canShare || navigator.canShare(dados))) {
      try {
        await navigator.share(dados);
        return;
      } catch (erro) {
        // A pessoa fechou a folha de compartilhamento: nada a fazer.
        if (erro instanceof DOMException && erro.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setEstado("copiado");
    } catch {
      setEstado("manual");
    }
  }

  return (
    // Entre o último parágrafo da Conclusão (termina perto de 89% + 50 px) e o título dos créditos
    // (89% + 240 px): resumo e botões numa linha só, para caber nesse intervalo.
    <div className="-translate-x-1/2 absolute left-1/2 top-[calc(89%+75px)] z-20 flex w-[1700px] flex-col items-center gap-3 font-corpo text-white">
      <div className="flex items-center gap-8">
        <p className="text-[28px] font-semibold">
          Você leu {capitulosLidos} de {CAPITULOS.length} capítulos
          {totalDescobertas > 0 && (
            <>
              {" "}
              e fez {descobertas} de {totalDescobertas} descobertas
            </>
          )}
          .
        </p>
        <button
          type="button"
          onClick={() => irParaCapitulo("cap-hero")}
          className={`${BOTAO} bg-ouro text-fundo hover:brightness-110`}
        >
          <span aria-hidden="true">↑</span>
          {voltarAoInicio}
        </button>
        <button
          type="button"
          onClick={aoCompartilhar}
          className={`${BOTAO} bg-fundo text-ouro hover:bg-ouro hover:text-fundo`}
        >
          <span aria-hidden="true">↗</span>
          {compartilhar}
        </button>
      </div>

      <div aria-live="polite" className="min-h-[32px] text-[24px]">
        {estado === "copiado" && <p className="text-ouro">{linkCopiado}</p>}
        {estado === "manual" && (
          <label className="flex items-center gap-3">
            Copie o link:
            <input
              readOnly
              value={enderecoDaPagina()}
              onFocus={(evento) => evento.currentTarget.select()}
              className="w-[560px] rounded-md bg-white/10 px-3 py-1 text-white"
            />
          </label>
        )}
      </div>
    </div>
  );
}
