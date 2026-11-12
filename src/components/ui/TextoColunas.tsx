const COLUNAS = {
  1: "",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
} as const;

interface Props {
  paragrafos: readonly string[];
  colunas?: keyof typeof COLUNAS;
  className?: string;
}

/** Bloco de texto em 1, 2 ou 3 colunas; no mobile sempre uma coluna. */
export function TextoColunas({ paragrafos, colunas = 2, className = "" }: Props) {
  return (
    <div
      className={`mx-auto grid w-full max-w-5xl grid-cols-1 gap-x-16 gap-y-8 px-6 font-corpo text-sm font-semibold leading-relaxed text-white sm:text-base ${COLUNAS[colunas]} ${className}`}
    >
      {paragrafos.map((paragrafo) => (
        <p key={paragrafo} className="whitespace-pre-line">
          {paragrafo}
        </p>
      ))}
    </div>
  );
}
