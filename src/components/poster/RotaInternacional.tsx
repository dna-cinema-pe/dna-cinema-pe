"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { FestivalDaRota, PremiosInternacionais } from "@/server/panorama.ts";
import { repetirVoo } from "./animacoes.ts";
import { useAnimacoesDesligadas } from "./useAnimacoesDesligadas.ts";

/**
 * Abaixo de 1280 px (US-4.1), os pinos e o botão "Voar de novo" usam `poster-nivel-financiamento`
 * (globals.css): descem com o pôster até o espaço do Financiamento, mas não o do texto do
 * Reconhecimento Internacional, que fica abaixo deles.
 *
 * Pinos ao longo da rota do avião (`M 0 0 C -360 -20 -850 55 -1200 170`, a partir do centro do
 * avião em 1467 × 15472 no frame). Cada pino fica um pouco acima do ponto da curva em t = 0,12,
 * 0,37, 0,62 e 0,87, na ordem do voo, da direita para a esquerda.
 */
const PINOS: ReadonlyArray<{ id: FestivalDaRota; nome: string; left: number; top: number }> = [
  { id: "cannes", nome: "Cannes", left: 1332, top: 15389 },
  { id: "toronto", nome: "Toronto", left: 1027, top: 15406 },
  { id: "berlim", nome: "Berlim", left: 712, top: 15451 },
  { id: "oscar", nome: "Oscar", left: 410, top: 15519 },
];

function formatarPremio(premio: PremiosInternacionais[FestivalDaRota][number]) {
  const ano = premio.ano ? ` (${premio.ano})` : "";
  return { titulo: `${premio.filme}${ano}`, detalhe: premio.categoria };
}

interface PainelProps {
  festival: (typeof PINOS)[number];
  premios: PremiosInternacionais | null;
  aoFechar: () => void;
}

/**
 * Cartão com os filmes do festival escolhido. Fica fora do frame (portal no body) para manter o
 * texto legível, já que o frame é reduzido para caber na tela.
 */
function Painel({ festival, premios, aoFechar }: PainelProps) {
  const tituloId = useId();
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const lista = premios?.[festival.id] ?? null;
  const vencedores = lista?.filter((p) => p.resultado === "VENCEDOR") ?? [];
  const indicados = lista?.filter((p) => p.resultado === "INDICADO") ?? [];

  useEffect(() => {
    tituloRef.current?.focus();
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") aoFechar();
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aoFechar]);

  return (
    <div
      role="dialog"
      aria-labelledby={tituloId}
      className="font-corpo fixed inset-x-0 bottom-20 z-50 flex justify-center px-4"
    >
      <div className="relative max-h-[60vh] w-full max-w-md overflow-y-auto rounded-2xl border border-ouro/40 bg-fundo/95 p-5 text-white shadow-2xl backdrop-blur-xl">
        <button
          type="button"
          aria-label="Fechar"
          onClick={aoFechar}
          className="absolute right-3 top-3 text-xl leading-none text-white/60 hover:text-white"
        >
          ×
        </button>
        <h3 id={tituloId} ref={tituloRef} tabIndex={-1} className="mb-3 text-lg font-bold text-ouro outline-none">
          {festival.nome}
        </h3>

        {lista === null ? (
          <p className="text-sm text-white/70">Não foi possível carregar os prêmios agora.</p>
        ) : lista.length === 0 ? (
          <p className="text-sm text-white/70">Nenhum filme do acervo registrado neste festival.</p>
        ) : (
          <>
            {vencedores.length > 0 && (
              <section className="mb-4">
                <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-white/60">Premiados</h4>
                <ul className="space-y-1.5">
                  {vencedores.map((premio, i) => {
                    const { titulo, detalhe } = formatarPremio(premio);
                    return (
                      <li key={i} className="text-sm">
                        <span className="font-semibold">{titulo}</span>
                        {detalhe && <span className="block text-white/70">{detalhe}</span>}
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
            {indicados.length > 0 && (
              <section>
                <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-white/60">
                  Indicações e seleções
                </h4>
                <ul className="space-y-1.5">
                  {indicados.map((premio, i) => {
                    const { titulo, detalhe } = formatarPremio(premio);
                    return (
                      <li key={i} className="text-sm">
                        <span className="font-semibold">{titulo}</span>
                        {detalhe && <span className="block text-white/70">{detalhe}</span>}
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Rota internacional (US-2.7): pinos de Cannes, Toronto, Berlim e Oscar ao longo do voo do avião
 * e o botão para voar de novo. O voo em si é disparado por AnimacoesDoPoster (threshold 0.3).
 */
export function RotaInternacional({ premios }: { premios: PremiosInternacionais | null }) {
  const [aberto, setAberto] = useState<FestivalDaRota | null>(null);
  const pinosRef = useRef<Partial<Record<FestivalDaRota, HTMLButtonElement | null>>>({});
  const animacoesDesligadas = useAnimacoesDesligadas();
  const painelId = useId();

  // Estável enquanto o mesmo festival está aberto, para o painel não refocar a cada render.
  const fechar = useCallback(() => {
    if (aberto) pinosRef.current[aberto]?.focus();
    setAberto(null);
  }, [aberto]);

  const festivalAberto = PINOS.find((pino) => pino.id === aberto);

  return (
    <>
      {PINOS.map((pino) => (
        <button
          key={pino.id}
          ref={(elemento) => {
            pinosRef.current[pino.id] = elemento;
          }}
          type="button"
          onClick={() => setAberto((atual) => (atual === pino.id ? null : pino.id))}
          aria-expanded={aberto === pino.id}
          aria-controls={aberto === pino.id ? painelId : undefined}
          aria-label={`${pino.nome}: ver filmes premiados`}
          className="hotspot group absolute z-20 flex -translate-x-1/2 -translate-y-full flex-col items-center poster-nivel-financiamento"
          style={{ left: pino.left, top: pino.top }}
        >
          <span className="rounded-full border-2 border-ouro bg-fundo px-5 py-2 font-corpo text-[24px] font-semibold text-ouro transition-colors group-hover:bg-ouro group-hover:text-fundo group-aria-expanded:bg-ouro group-aria-expanded:text-fundo">
            {pino.nome}
          </span>
          <span aria-hidden="true" className="h-6 w-1 bg-ouro" />
          <span aria-hidden="true" className="size-4 rounded-full bg-vermelho" />
        </button>
      ))}

      <button
        type="button"
        onClick={repetirVoo}
        disabled={animacoesDesligadas}
        aria-label="Voar de novo"
        className="hotspot absolute left-[1390px] top-[15560px] z-20 poster-nivel-financiamento rounded-full border-2 border-ouro bg-fundo px-6 py-3 font-corpo text-[24px] font-semibold text-ouro hover:bg-ouro hover:text-fundo disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-fundo disabled:hover:text-ouro"
      >
        <span aria-hidden="true">✈ </span>Voar de novo
      </button>

      {/* Só abre depois de um clique, então document já existe. */}
      {festivalAberto &&
        createPortal(
          <div id={painelId}>
            <Painel festival={festivalAberto} premios={premios} aoFechar={fechar} />
          </div>,
          document.body,
        )}
    </>
  );
}
