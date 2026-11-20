"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useId, useState } from "react";

export interface FilmeDoPodio {
  id: number;
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
const ITENS_POR_PAGINA = 7;

/**
 * No celular (abaixo de 768 px, US-4.1) o nome do filme fica com 10 px reais e cada cartão mais
 * largo (300 px do frame, a foto continua com 180), então cabem menos por página.
 */
const ITENS_POR_PAGINA_CELULAR = 4;

/** Se a consulta de mídia vale agora (e acompanha as mudanças). */
function useMidia(consulta: string) {
  const [vale, setVale] = useState(false);
  useEffect(() => {
    const midia = window.matchMedia(consulta);
    const atualizar = () => setVale(midia.matches);
    atualizar();
    midia.addEventListener("change", atualizar);
    return () => midia.removeEventListener("change", atualizar);
  }, [consulta]);
  return vale;
}

/**
 * A partir de 1280 px o pódio fica com 70% do tamanho, em torno do topo central (Podio.tsx); as
 * áreas de hover acompanham.
 */
const ESCALA_DESKTOP = 0.7;
const ORIGEM_DESKTOP = { x: 960, y: 17018 };

function areaNoDesktop(area: (typeof AREAS)[number]) {
  return {
    left: ORIGEM_DESKTOP.x + (area.left - ORIGEM_DESKTOP.x) * ESCALA_DESKTOP,
    top: ORIGEM_DESKTOP.y + (area.top - ORIGEM_DESKTOP.y) * ESCALA_DESKTOP,
    width: area.width * ESCALA_DESKTOP,
    height: area.height * ESCALA_DESKTOP,
  };
}

/**
 * Interação do pódio (US-2.8). Passar o mouse, focar ou tocar um degrau mostra, logo abaixo do
 * pódio, a fileira de filmes daquele nível, que desliza com 80 ms entre um cartão e o próximo
 * (`podio-item` em globals.css). Esc fecha a fileira.
 */
export function DegrausDoPodio({ degraus }: { degraus: DegrauDoPodio[] }) {
  const [ativo, setAtivo] = useState<number | null>(null);
  const [pagina, setPagina] = useState(0);
  const fileiraId = useId();
  const itensPorPagina = useMidia("(width < 48rem)") ? ITENS_POR_PAGINA_CELULAR : ITENS_POR_PAGINA;
  const desktop = useMidia("(width >= 80rem)");

  const degrauAtivo = ativo === null ? null : degraus[ativo];
  const cartoes: Array<FilmeDoPodio | null> = degrauAtivo
    ? degrauAtivo.filmes.length > 0
      ? degrauAtivo.filmes
      : Array.from({ length: QUANTIDADE_PLACEHOLDER }, () => null)
    : [];
  const totalPaginas = Math.max(1, Math.ceil(cartoes.length / itensPorPagina));
  const paginaAtual = Math.min(pagina, totalPaginas - 1);
  const cartoesVisiveis = cartoes.slice(
    paginaAtual * itensPorPagina,
    (paginaAtual + 1) * itensPorPagina,
  );

  useEffect(() => {
    if (ativo === null) return;
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setAtivo(null);
      if (evento.key === "ArrowLeft") {
        setPagina((atual) => Math.max(0, atual - 1));
      }
      if (evento.key === "ArrowRight") {
        setPagina((atual) => Math.min(totalPaginas - 1, atual + 1));
      }
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [ativo, totalPaginas]);

  const ativarDegrau = (indice: number) => {
    if (ativo !== indice) setPagina(0);
    setAtivo(indice);
  };

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
            if (evento.pointerType === "mouse") ativarDegrau(i);
          }}
          onFocus={() => ativarDegrau(i)}
          onClick={() => ativarDegrau(i)}
          className="hotspot absolute z-20 rounded-lg bg-transparent outline-offset-8 hover:bg-white/5 aria-expanded:bg-white/5"
          style={desktop ? areaNoDesktop(AREAS[i]) : AREAS[i]}
        />
      ))}

      {degrauAtivo && (
        <div
          key={ativo}
          id={fileiraId}
          role="region"
          aria-label={`Filmes do ${degrauAtivo.posicao}º lugar`}
          // Desce `--podio-fileira-desloc` (PosterViewport): 40 px reais, ou mais no celular, para
          // ficar 40 px abaixo dos rótulos dos degraus, que lá ficam maiores.
          className="absolute left-[160px] top-[17990px] z-30 w-[1600px] overflow-hidden [--extra:var(--podio-fileira-desloc)]"
        >
          <div className="mx-[70px] flex w-[1460px] justify-center gap-8 pb-5">
            {cartoesVisiveis.map((filme, i) => (
              <figure
                key={filme?.id ?? i}
                className="podio-item flex w-[180px] shrink-0 flex-col items-center gap-3 max-md:w-[300px]"
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
                <figcaption className="text-center font-corpo text-[22px] font-semibold leading-tight text-white max-md:line-clamp-3 max-md:text-[length:calc(10px*var(--inv,1))]">
                  {filme?.titulo ?? "Filme a definir"}
                </figcaption>
              </figure>
            ))}
          </div>

          {totalPaginas > 1 && (
            <>
              <button
                type="button"
                aria-label="Página anterior de filmes"
                disabled={paginaAtual === 0}
                onClick={() => setPagina((atual) => Math.max(0, atual - 1))}
                className="absolute left-1 top-[92px] flex size-14 items-center justify-center rounded-full border-2 border-ouro bg-fundo/90 font-corpo text-4xl text-ouro shadow-lg disabled:cursor-not-allowed disabled:opacity-30"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Próxima página de filmes"
                disabled={paginaAtual === totalPaginas - 1}
                onClick={() => setPagina((atual) => Math.min(totalPaginas - 1, atual + 1))}
                className="absolute right-1 top-[92px] flex size-14 items-center justify-center rounded-full border-2 border-ouro bg-fundo/90 font-corpo text-4xl text-ouro shadow-lg disabled:cursor-not-allowed disabled:opacity-30"
              >
                ›
              </button>
              <span className="sr-only" aria-live="polite">
                Página {paginaAtual + 1} de {totalPaginas}
              </span>
            </>
          )}
        </div>
      )}
    </>
  );
}
