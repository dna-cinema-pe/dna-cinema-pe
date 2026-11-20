import conteudo from "../content.json";

/**
 * Posição de cada parte do título no frame do Figma: "RETOMADA", "E" e "MANGUEBEAT".
 * `poster-nivel-super8` (globals.css): abaixo de 1280 px, o título não desce o espaço aberto
 * depois dos cartões (`--espaco-retomada`), só os de antes dele.
 */
const PARTES = [
  { nodeId: "67:25", className: "-translate-x-1/2 poster-nivel-super8 [word-break:break-word] absolute font-titulo leading-[normal] left-[calc(20%+574px)] not-italic text-[90px] text-center text-white top-[calc(29%+70.52px)] whitespace-nowrap" },
  { nodeId: "67:26", className: "-translate-x-1/2 poster-nivel-super8 [word-break:break-word] absolute font-titulo leading-[normal] left-[calc(40%+190px)] not-italic text-[80px] text-center text-white top-[calc(29%+201.52px)] whitespace-nowrap" },
  { nodeId: "67:29", className: "-translate-x-1/2 poster-nivel-super8 [word-break:break-word] absolute font-titulo leading-[normal] left-[calc(20%+573.5px)] not-italic text-[120px] text-center text-white top-[calc(30%+64.4px)] whitespace-nowrap" },
] as const;

/**
 * Retomada e Manguebeat, período da linha do tempo (US-2.3). O texto do período fica nos postais
 * pendurados (US-2.4), que continuam no DesignPoster; aqui fica só o título, um único `<h2>`.
 */
export function RetomadaManguebeat() {
  return (
    <section aria-labelledby="titulo-retomada-e-manguebeat" className="contents">
      <h2 id="titulo-retomada-e-manguebeat" className="contents">
        {conteudo.retomadaManguebeat.titulo.map((parte, i) => (
          <span key={PARTES[i].nodeId} className={`block ${PARTES[i].className}`} data-node-id={PARTES[i].nodeId}>
            {parte}{" "}
          </span>
        ))}
      </h2>
    </section>
  );
}
