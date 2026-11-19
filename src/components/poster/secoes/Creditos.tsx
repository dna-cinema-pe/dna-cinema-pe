import conteudo from "../content.json";

const { titulo, grupos } = conteudo.creditos;

/** Posição de cada grupo no frame do Figma, na mesma ordem de `grupos`. */
const LAYOUT = [
  { nodeId: "262:102", className: "top-[calc(90%+130.2px)]" },
  { nodeId: "262:103", className: "top-[calc(91%+98.08px)]" },
  { nodeId: "262:104", className: "top-[calc(92%+245.96px)]" },
] as const;

/** Créditos (US-2.10): quem fez o trabalho, por área, como no Figma. */
export function Creditos() {
  return (
    <section aria-labelledby="titulo-creditos" className="contents">
      <h2
        id="titulo-creditos"
        className="[word-break:break-word] absolute font-corpo font-black leading-[normal] left-[calc(50%-207px)] not-italic text-[36px] text-white top-[calc(89%+240.32px)] whitespace-nowrap"
        data-node-id="262:101"
      >
        {titulo}:
      </h2>
      {grupos.map((grupo, i) => (
        <div
          key={grupo.titulo}
          className={`-translate-x-1/2 [word-break:break-word] absolute font-corpo leading-[normal] left-1/2 not-italic text-[24px] text-center text-white whitespace-nowrap ${LAYOUT[i].className}`}
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
    </section>
  );
}
