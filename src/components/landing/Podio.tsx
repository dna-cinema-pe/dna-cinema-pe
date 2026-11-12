import { Placeholder } from "@/components/ui/Placeholder.tsx";
import type { ColocadoPodio } from "./tipos.ts";

const ORDEM_VISUAL = { 1: "md:order-2", 2: "md:order-1", 3: "md:order-3" } as const;
const ALTURA_DEGRAU = { 1: "h-40 md:h-56", 2: "h-32 md:h-44", 3: "h-24 md:h-32" } as const;

const POSICOES_VAZIAS: readonly ColocadoPodio[] = [
  { posicao: 1, filmes: [] },
  { posicao: 2, filmes: [] },
  { posicao: 3, filmes: [] },
];

interface Props {
  /** Sem dados, mostra os três degraus com placeholders. */
  colocados?: readonly ColocadoPodio[];
}

/**
 * Pódio 1º, 2º e 3º. No DOM a ordem é 1, 2, 3 (leitura); visualmente o 1º fica no meio.
 * Ao passar o mouse (ou focar), os demais filmes do degrau aparecem em fileira (nota do Figma).
 */
export function Podio({ colocados }: Props) {
  const posicoes = colocados && colocados.length > 0 ? colocados : POSICOES_VAZIAS;

  return (
    <ol
      aria-label="Filmes com maior reconhecimento internacional"
      className="mx-auto grid w-full max-w-4xl grid-cols-1 items-end gap-12 px-6 md:grid-cols-3"
    >
      {posicoes.map(({ posicao, filmes }) => {
        const principal = filmes[0];

        return (
          <li
            key={posicao}
            tabIndex={0}
            className={`group flex flex-col items-center outline-offset-8 ${ORDEM_VISUAL[posicao]}`}
          >
            <div className="relative z-10 -mb-6 aspect-[2/3] w-36 shadow-lg sm:w-44">
              {principal?.poster ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={principal.poster.src}
                  alt={principal.poster.alt}
                  loading="lazy"
                  className="size-full object-cover"
                />
              ) : (
                <Placeholder rotulo="imagem filme" className="size-full" />
              )}
            </div>

            <div
              className={`flex w-48 items-center justify-center bg-[#d9d9d9] pt-6 sm:w-56 ${ALTURA_DEGRAU[posicao]}`}
            >
              <span className="font-corpo text-6xl font-bold text-fundo sm:text-7xl">
                {posicao}º
                <span className="sr-only">
                  {principal ? `: ${principal.titulo}` : ": sem dados"}
                </span>
              </span>
            </div>

            {filmes.length > 1 && (
              <ul className="mt-4 flex flex-wrap justify-center gap-2 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 pointer-coarse:opacity-100">
                {filmes.map((filme) => (
                  <li key={filme.id} className="h-20 w-14 overflow-hidden bg-neutral-700">
                    {filme.poster ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={filme.poster.src}
                        alt={filme.poster.alt}
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    ) : (
                      <span className="block p-1 font-corpo text-[9px] leading-tight text-white">
                        {filme.titulo}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ol>
  );
}
