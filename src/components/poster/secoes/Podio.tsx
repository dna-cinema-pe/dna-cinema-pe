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

/**
 * Rótulo sob cada degrau, na mesma ordem de `degraus` (1º, 2º e 3º). No celular (US-4.1) fica com
 * 10 px reais, centralizado na largura do degrau e quebrando linha; o PosterViewport mede os três
 * (`data-podio-rotulo`) para descer a fileira de filmes abaixo deles.
 */
const ROTULO_CELULAR =
  "max-md:whitespace-normal max-md:text-center max-md:text-[length:calc(10px*var(--inv,1))]";
const ROTULOS = [
  { nodeId: "163:262", className: `[word-break:break-word] absolute font-corpo font-semibold leading-[0] left-[calc(40%+81px)] not-italic text-[24px] text-white top-[calc(69%+133.72px)] whitespace-nowrap max-md:left-[807px] max-md:w-[352px] ${ROTULO_CELULAR} xl:left-[882.3px] xl:top-[17617.9px]` },
  { nodeId: "163:263", className: `[word-break:break-word] absolute font-corpo font-semibold leading-[0] left-[337px] not-italic text-[24px] text-white top-[calc(69%+123.72px)] w-[265px] max-md:left-[293px] max-md:w-[358px] ${ROTULO_CELULAR} xl:left-[523.9px] xl:top-[17610.9px]` },
  { nodeId: "163:268", className: `[word-break:break-word] absolute font-corpo font-semibold leading-[0] left-[calc(60%+199px)] not-italic text-[24px] text-white top-[calc(69%+113.72px)] whitespace-nowrap max-md:left-[1351px] max-md:w-[281px] ${ROTULO_CELULAR} xl:left-[1233.7px] xl:top-[17603.9px]` },
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
 *
 * Desktop (US-4.1): a partir de 1280 px, o pódio fica com 70% do tamanho do Figma em relação ao
 * topo central dele (x = 960, y = 17018; classes `xl:`), para a fileira de filmes aparecer na
 * mesma tela ao passar o mouse num degrau. As áreas de hover acompanham (DegrausDoPodio).
 *
 * Responsivo (US-4.1): `poster-nivel-reconhecimento` na seção define `--deslocar` para todos os
 * elementos do pódio (a variável é herdada através do `contents`): eles descem com o pôster até o
 * espaço do Reconhecimento Internacional, mas não o espaço aberto depois da fileira de filmes
 * (`--espaco-podio`), que fica abaixo deles.
 */
export function Podio({ colocacoes }: { colocacoes?: PodioPremios | null }) {
  const degraus = degrausBase.map((degrau) => ({
    ...degrau,
    filmes:
      colocacoes?.find((colocacao) => colocacao.posicao === degrau.posicao)?.filmes ??
      degrau.filmes,
  }));

  return (
    <section aria-label="Pódio de prêmios" className="contents poster-nivel-reconhecimento">
      {/*
        Dica fixa no lugar da nota "*ao passar o mouse os filmes se mostram em fileira" do Figma.
        Tamanho do Figma (24 px do frame), exceto no celular, onde fica com 7 px reais e sobe
        24 px reais para se afastar do pódio. No desktop acompanha o pódio reduzido e fica um
        pouco mais acima (y = 16990), longe do pôster do 3º lugar.
      */}
      <p
        className="[word-break:break-word] absolute font-corpo font-semibold leading-[normal] left-[calc(60%+78px)] text-[24px] max-md:text-[length:calc(7px*var(--inv,1))] text-ouro top-[calc(66%+119.08px)] max-md:top-[calc(66%+119.08px-24px*var(--inv,1))] w-[423px] xl:left-[1149px] xl:top-[16990px]"
        data-node-id="200:17"
      >
        {dica}
      </p>

      {/* Degraus, números e pôsteres do Figma: só visuais, a interação fica nos botões. */}
      <div aria-hidden="true" className="contents pointer-events-none">
        <div
          className="absolute bg-[#d9d9d9] h-[167px] left-[299px] top-[calc(68%+170.84px)] w-[352px] xl:left-[497.3px] xl:top-[17463.9px] xl:w-[246.4px] xl:h-[116.9px]"
          data-node-id="163:254"
        />
        <div
          className="absolute bg-[#d9d9d9] h-[317px] left-[calc(40%+39px)] top-[calc(68%+18.84px)] w-[352px] xl:left-[852.9px] xl:top-[17357.5px] xl:w-[246.4px] xl:h-[221.9px]"
          data-node-id="196:13"
        />
        <p
          className="[word-break:break-word] absolute font-corpo font-semibold leading-[normal] left-[calc(40%+172px)] not-italic text-[120px] text-black top-[calc(68%+87.84px)] whitespace-nowrap xl:left-[946.0px] xl:top-[17405.8px] xl:text-[84px]"
          data-node-id="196:15"
        >
          1º
        </p>
        <p
          className="[word-break:break-word] absolute font-corpo font-semibold leading-[normal] left-[calc(20%+42px)] not-italic text-[120px] text-black top-[calc(68%+155.84px)] whitespace-nowrap xl:left-[586.2px] xl:top-[17453.4px] xl:text-[84px]"
          data-node-id="196:16"
        >
          2º
        </p>
        <div
          className="absolute bg-[#d9d9d9] h-[110px] left-[calc(60%+199px)] top-[calc(68%+227.84px)] w-[281px] xl:left-[1233.7px] xl:top-[17503.8px] xl:w-[196.7px] xl:h-[77.0px]"
          data-node-id="163:255"
        />
        <PosterDoPodio
          filme={degraus[0]?.filmes[1]}
          className="h-[243px] left-[calc(40%-8px)] top-[calc(67%-1.04px)] w-[169px] xl:left-[820.0px] xl:top-[17163.6px] xl:w-[118.3px] xl:h-[170.1px]"
        />
        <PosterDoPodio
          filme={degraus[1]?.filmes[1]}
          className="h-[220px] left-[293px] top-[calc(67%+147.96px)] w-[153px] xl:left-[493.1px] xl:top-[17267.9px] xl:w-[107.1px] xl:h-[154.0px]"
        />
        <PosterDoPodio
          filme={degraus[2]?.filmes[1]}
          className="h-[213px] left-[calc(60%+169px)] top-[calc(67%+232.96px)] w-[138px] xl:left-[1212.7px] xl:top-[17327.4px] xl:w-[96.6px] xl:h-[149.1px]"
        />
        <PosterDoPodio
          filme={degraus[0]?.filmes[2]}
          className="h-[243px] left-[calc(40%+254px)] top-[calc(67%-1.04px)] w-[169px] xl:left-[1003.4px] xl:top-[17163.6px] xl:w-[118.3px] xl:h-[170.1px]"
        />
        <PosterDoPodio
          filme={degraus[1]?.filmes[2]}
          className="h-[220px] left-[calc(20%+146px)] top-[calc(67%+147.96px)] w-[153px] xl:left-[659.0px] xl:top-[17267.9px] xl:w-[107.1px] xl:h-[154.0px]"
        />
        <PosterDoPodio
          filme={degraus[2]?.filmes[2]}
          className="h-[213px] left-[calc(80%-1px)] top-[calc(67%+232.96px)] w-[138px] xl:left-[1362.5px] xl:top-[17327.4px] xl:w-[96.6px] xl:h-[149.1px]"
        />
        <PosterDoPodio
          filme={degraus[0]?.filmes[0]}
          className="h-[412px] left-[calc(40%+62px)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[calc(66%+48.08px)] w-[286px] xl:left-[869.0px] xl:top-[17018.0px] xl:w-[200.2px] xl:h-[288.4px]"
        />
        <PosterDoPodio
          filme={degraus[1]?.filmes[0]}
          className="h-[373px] left-[356px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[calc(66%+219.08px)] w-[259px] xl:left-[537.2px] xl:top-[17137.7px] xl:w-[181.3px] xl:h-[261.1px]"
        />
        <PosterDoPodio
          filme={degraus[2]?.filmes[0]}
          className="h-[361px] left-[calc(60%+226px)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[calc(67%+50.96px)] w-[234px] xl:left-[1252.6px] xl:top-[17200.0px] xl:w-[163.8px] xl:h-[252.7px]"
        />
        <p
          className="[word-break:break-word] absolute font-corpo font-semibold leading-[normal] left-[calc(60%+282px)] not-italic text-[120px] text-black top-[calc(68%+190.84px)] whitespace-nowrap xl:left-[1291.8px] xl:top-[17477.9px] xl:text-[84px]"
          data-node-id="196:17"
        >
          3º
        </p>
      </div>

      {degraus.map((degrau, i) => (
        <div
          key={ROTULOS[i].nodeId}
          className={ROTULOS[i].className}
          data-node-id={ROTULOS[i].nodeId}
          data-podio-rotulo
        >
          <p className="leading-[normal] mb-0">{degrau.posicao}º lugar</p>
          <p className="leading-[normal]">{degrau.rotulo}</p>
        </div>
      ))}

      <DegrausDoPodio degraus={degraus} />
    </section>
  );
}
