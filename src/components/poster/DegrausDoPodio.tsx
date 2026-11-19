"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useId, useState } from "react";

export interface FilmeDoPodio {
  titulo: string;
  /** Caminho em /public; sem ele, o cartão mostra o cinza de placeholder do Figma. */
  poster?: string;
  alt?: string;
}

export interface DegrauDoPodio {
  posicao: number;
  rotulo: string;
  filmes: FilmeDoPodio[];
}

/** Área clicável de cada degrau no frame (pôster principal + bloco do degrau), em px. */
const AREAS = [
  { left: 807, top: 17018, width: 352, height: 802 },
  { left: 293, top: 17189, width: 358, height: 633 },
  { left: 1351, top: 17278, width: 281, height: 544 },
] as const;

/** Cartões cinza mostrados enquanto o jornalismo não define os filmes do degrau. */
const QUANTIDADE_PLACEHOLDER = 4;

/**
 * Interação do pódio (US-2.8). Passar o mouse, focar ou tocar um degrau mostra, logo abaixo do
 * pódio, a fileira de filmes daquele nível, que desliza com 80 ms entre um cartão e o próximo
 * (`podio-item` em globals.css). Esc fecha a fileira.
 */
export function DegrausDoPodio({ degraus }: { degraus: DegrauDoPodio[] }) {
  const [ativo, setAtivo] = useState<number | null>(null);
  const fileiraId = useId();

  useEffect(() => {
    if (ativo === null) return;
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setAtivo(null);
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [ativo]);

  const degrauAtivo = ativo === null ? null : degraus[ativo];
  const cartoes: Array<FilmeDoPodio | null> = degrauAtivo
    ? degrauAtivo.filmes.length > 0
      ? degrauAtivo.filmes
      : Array.from({ length: QUANTIDADE_PLACEHOLDER }, () => null)
    : [];

  return (
    <>
      {degraus.map((degrau, i) => (
        <button
          key={degrau.posicao}
          type="button"
          aria-label={`${degrau.posicao}º lugar: ${degrau.rotulo}. Ver filmes`}
          aria-expanded={ativo === i}
          aria-controls={ativo === i ? fileiraId : undefined}
          onPointerEnter={(evento) => {
            if (evento.pointerType === "mouse") setAtivo(i);
          }}
          onFocus={() => setAtivo(i)}
          onClick={() => setAtivo(i)}
          className="hotspot absolute z-20 rounded-lg bg-transparent outline-offset-8 hover:bg-white/5 aria-expanded:bg-white/5"
          style={AREAS[i]}
        />
      ))}

      {degrauAtivo && (
        <div
          key={ativo}
          id={fileiraId}
          role="region"
          aria-label={`Filmes do ${degrauAtivo.posicao}º lugar`}
          className="absolute left-[160px] top-[17990px] z-30 flex w-[1600px] justify-center gap-10"
        >
          {cartoes.map((filme, i) => (
            <figure
              key={filme?.titulo ?? i}
              className="podio-item flex w-[180px] flex-col items-center gap-3"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {filme?.poster ? (
                <img
                  src={filme.poster}
                  alt={filme.alt ?? `Pôster de ${filme.titulo}`}
                  className="h-[240px] w-[180px] object-cover shadow-lg"
                />
              ) : (
                <div aria-hidden="true" className="h-[240px] w-[180px] bg-[#8c8888] shadow-lg" />
              )}
              <figcaption className="text-center font-corpo text-[22px] font-semibold leading-tight text-white">
                {filme?.titulo ?? "Filme a definir"}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </>
  );
}
