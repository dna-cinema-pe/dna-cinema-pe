/* eslint-disable @next/next/no-img-element */
import conteudo from "../content.json";
import {
  DegrausDoPodio,
  type DegrauDoPodio,
  type FilmeDoPodio,
} from "../DegrausDoPodio.tsx";
import type { PodioPremios } from "@/server/panorama.ts";

const { dica, degraus: degrausBase } = conteudo.podio as {
  dica: string;
  degraus: DegrauDoPodio[];
};

/** Rótulo sob cada degrau, na mesma ordem de `degraus` (1º, 2º e 3º). */
const ROTULOS = [
  { nodeId: "163:262", className: "[word-break:break-word] absolute font-corpo font-semibold leading-[0] left-[calc(40%+81px)] not-italic text-[24px] text-white top-[calc(69%+133.72px)] whitespace-nowrap" },
  { nodeId: "163:263", className: "[word-break:break-word] absolute font-corpo font-semibold leading-[0] left-[337px] not-italic text-[24px] text-white top-[calc(69%+123.72px)] w-[265px]" },
  { nodeId: "163:268", className: "[word-break:break-word] absolute font-corpo font-semibold leading-[0] left-[calc(60%+199px)] not-italic text-[24px] text-white top-[calc(69%+113.72px)] whitespace-nowrap" },
] as const;

function PosterDoPodio({
  filme,
  className,
}: {
  filme?: FilmeDoPodio;
  className: string;
}) {
  return (
    <div className={`absolute overflow-hidden bg-[#8c8888] ${className}`}>
      {filme?.poster && (
        <img
          src={filme.poster}
          alt={filme.alt ?? `Pôster de ${filme.titulo}`}
          className="size-full object-cover"
        />
      )}
    </div>
  );
}

/**
 * Pódio de prêmios (US-2.8): três degraus por nível de reconhecimento. Passar o mouse, tocar ou
 * focar um degrau mostra a fileira de filmes daquele nível (DegrausDoPodio).
 */
export function Podio({ colocacoes }: { colocacoes?: PodioPremios | null }) {
  const degraus = degrausBase.map((degrau) => ({
    ...degrau,
    filmes:
      colocacoes?.find((colocacao) => colocacao.posicao === degrau.posicao)?.filmes ??
      degrau.filmes,
  }));

  return (
    <section aria-labelledby="titulo-podio" className="contents">
      <h2 id="titulo-podio" className="sr-only">
        Pódio de prêmios
      </h2>
      {/* Dica fixa no lugar da nota "*ao passar o mouse os filmes se mostram em fileira" do Figma. */}
      <p
        className="[word-break:break-word] absolute font-corpo font-semibold leading-[normal] left-[calc(60%+78px)] text-[24px] text-ouro top-[calc(66%+119.08px)] w-[423px]"
        data-node-id="200:17"
      >
        {dica}
      </p>

      {/* Degraus, números e pôsteres do Figma: só visuais, a interação fica nos botões. */}
      <div aria-hidden="true" className="contents pointer-events-none">
        <div
          className="absolute bg-[#d9d9d9] h-[167px] left-[299px] top-[calc(68%+170.84px)] w-[352px]"
          data-node-id="163:254"
        />
        <div
          className="absolute bg-[#d9d9d9] h-[317px] left-[calc(40%+39px)] top-[calc(68%+18.84px)] w-[352px]"
          data-node-id="196:13"
        />
        <p
          className="[word-break:break-word] absolute font-corpo font-semibold leading-[normal] left-[calc(40%+172px)] not-italic text-[120px] text-black top-[calc(68%+87.84px)] whitespace-nowrap"
          data-node-id="196:15"
        >
          1º
        </p>
        <p
          className="[word-break:break-word] absolute font-corpo font-semibold leading-[normal] left-[calc(20%+42px)] not-italic text-[120px] text-black top-[calc(68%+155.84px)] whitespace-nowrap"
          data-node-id="196:16"
        >
          2º
        </p>
        <div
          className="absolute bg-[#d9d9d9] h-[110px] left-[calc(60%+199px)] top-[calc(68%+227.84px)] w-[281px]"
          data-node-id="163:255"
        />
        <PosterDoPodio
          filme={degraus[0]?.filmes[1]}
          className="h-[243px] left-[calc(40%-8px)] top-[calc(67%-1.04px)] w-[169px]"
        />
        <PosterDoPodio
          filme={degraus[1]?.filmes[1]}
          className="h-[220px] left-[293px] top-[calc(67%+147.96px)] w-[153px]"
        />
        <PosterDoPodio
          filme={degraus[2]?.filmes[1]}
          className="h-[213px] left-[calc(60%+169px)] top-[calc(67%+232.96px)] w-[138px]"
        />
        <PosterDoPodio
          filme={degraus[0]?.filmes[2]}
          className="h-[243px] left-[calc(40%+254px)] top-[calc(67%-1.04px)] w-[169px]"
        />
        <PosterDoPodio
          filme={degraus[1]?.filmes[2]}
          className="h-[220px] left-[calc(20%+146px)] top-[calc(67%+147.96px)] w-[153px]"
        />
        <PosterDoPodio
          filme={degraus[2]?.filmes[2]}
          className="h-[213px] left-[calc(80%-1px)] top-[calc(67%+232.96px)] w-[138px]"
        />
        <PosterDoPodio
          filme={degraus[0]?.filmes[0]}
          className="h-[412px] left-[calc(40%+62px)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[calc(66%+48.08px)] w-[286px]"
        />
        <PosterDoPodio
          filme={degraus[1]?.filmes[0]}
          className="h-[373px] left-[356px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[calc(66%+219.08px)] w-[259px]"
        />
        <PosterDoPodio
          filme={degraus[2]?.filmes[0]}
          className="h-[361px] left-[calc(60%+226px)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[calc(67%+50.96px)] w-[234px]"
        />
        <p
          className="[word-break:break-word] absolute font-corpo font-semibold leading-[normal] left-[calc(60%+282px)] not-italic text-[120px] text-black top-[calc(68%+190.84px)] whitespace-nowrap"
          data-node-id="196:17"
        >
          3º
        </p>
      </div>

      {degraus.map((degrau, i) => (
        <div key={ROTULOS[i].nodeId} className={ROTULOS[i].className} data-node-id={ROTULOS[i].nodeId}>
          <p className="leading-[normal] mb-0">{degrau.posicao}º lugar</p>
          <p className="leading-[normal]">{degrau.rotulo}</p>
        </div>
      ))}

      <DegrausDoPodio degraus={degraus} />
    </section>
  );
}
