import type { ReactNode } from "react";
import { Placeholder } from "@/components/ui/Placeholder.tsx";
import type { ImagemFilme } from "./tipos.ts";

const FORMATOS = {
  paisagem: "aspect-[4/3]",
  retrato: "aspect-[2/3]",
} as const;

const PAPEIS = {
  claro: "bg-[#eeeeee]",
  cinza: "bg-[#d9d9d9]",
} as const;

interface Props {
  imagem?: ImagemFilme | null;
  /** Texto do placeholder quando ainda não há imagem. */
  rotulo?: string;
  legenda?: ReactNode;
  formato?: keyof typeof FORMATOS;
  papel?: keyof typeof PAPEIS;
  className?: string;
}

/** Cartão de foto ou pôster. O pregador e a inclinação ficam a cargo do `Varal`. */
export function Polaroid({
  imagem,
  rotulo = "imagem",
  legenda,
  formato = "paisagem",
  papel = "claro",
  className = "",
}: Props) {
  return (
    <figure className={`w-64 p-3 shadow-lg sm:w-72 ${PAPEIS[papel]} ${className}`}>
      <div className={`relative overflow-hidden ${FORMATOS[formato]}`}>
        {imagem ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imagem.src}
            alt={imagem.alt}
            loading="lazy"
            className="size-full object-cover"
          />
        ) : (
          <Placeholder rotulo={rotulo} className="size-full bg-neutral-300" />
        )}
      </div>
      {legenda && (
        <figcaption className="mt-3 font-corpo text-sm font-semibold leading-snug text-fundo">
          {legenda}
        </figcaption>
      )}
    </figure>
  );
}
