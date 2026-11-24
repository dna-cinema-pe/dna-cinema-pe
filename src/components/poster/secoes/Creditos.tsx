import conteudo from "../content.json";

const { titulo, grupos } = conteudo.creditos;

/** Posição de cada grupo no frame do Figma, na mesma ordem de `grupos`. */
const LAYOUT = [
  { nodeId: "262:102", className: "top-[calc(90%+130.2px)]" },
  { nodeId: "262:103", className: "top-[calc(91%+98.08px)]" },
  { nodeId: "262:104", className: "top-[calc(92%+245.96px)]" },
] as const;

/**
 * Créditos (US-2.10): quem fez o trabalho, por área, como no Figma.
 *
 * Abaixo de 768 px (US-4.1): título com 14 px reais, centralizado, e nomes com 11 px reais; os
 * grupos ficam numa coluna em fluxo, centralizada, começando na posição do Figma ou 16 px reais
 * depois do título. O PosterViewport mede a coluna (`data-medir="creditos"`) para descer a
 * bandeira e o rodapé (`--espaco-creditos`). Título e coluna usam `poster-nivel-jornada`: descem
 * também o espaço aberto depois do fim da jornada (FimDaJornada).
 */
const COLUNA =
  "poster-coluna-md md:contents max-md:absolute max-md:left-0 max-md:w-full max-md:flex max-md:flex-col max-md:items-center max-md:gap-[calc(16px*var(--inv,1))] max-md:top-[max(calc(90%+130.2px),calc(89%+240.32px+37px*var(--inv,1)))] poster-nivel-jornada";
export function Creditos() {
  return (
    <section aria-labelledby="titulo-creditos" className="contents">
      <h2
        id="titulo-creditos"
        className="[word-break:break-word] absolute font-corpo font-black leading-[normal] left-[calc(50%-207px)] not-italic text-[36px] text-white top-[calc(89%+240.32px)] whitespace-nowrap poster-nivel-jornada max-md:left-1/2 max-md:-translate-x-1/2 max-md:text-[length:calc(14px*var(--inv,1))]"
        data-node-id="262:101"
      >
        {titulo}:
      </h2>
      <div className={COLUNA} data-medir="creditos">
      {grupos.map((grupo, i) => (
        <div
          key={grupo.titulo}
          className={`-translate-x-1/2 [word-break:break-word] absolute font-corpo leading-[normal] left-1/2 not-italic text-[24px] text-center text-white whitespace-nowrap ${LAYOUT[i].className} max-md:static max-md:translate-x-0 max-md:text-[length:calc(11px*var(--inv,1))]`}
          data-node-id={LAYOUT[i].nodeId}
        >
          <h3 className="font-extrabold">{grupo.titulo}:</h3>
          <ul className="font-medium">
            {grupo.nomes.map((nome) => (
              <li key={nome}>{nome}</li>
            ))}
          </ul>
        </div>
      ))}
      </div>
    </section>
  );
}
