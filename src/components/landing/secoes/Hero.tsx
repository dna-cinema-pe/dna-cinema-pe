import { Ilustracao } from "../Ilustracao.tsx";
import { HERO } from "../conteudo.ts";

export function Hero() {
  return (
    <header className="relative overflow-hidden px-6 pb-8 pt-24 text-center sm:pt-32">
      {/* Pinceladas e enfeites do topo, atrás do título (ordem do DOM = ordem de empilhamento). */}
      <Ilustracao id="manchaEsquerda" className="absolute left-0 top-3 w-[32%]" />
      <Ilustracao id="manchaDireita" className="absolute right-0 top-3 w-[48%]" />
      <Ilustracao id="passaroOuro" className="absolute left-[23%] top-[5%] w-[16%]" />
      <Ilustracao id="bandeirinhas" className="absolute right-0 top-3 w-[32%]" />

      <div className="relative z-10">
        <Ilustracao id="sol" className="mx-auto mb-4 size-14 sm:size-20" />

        <h1 className="font-titulo uppercase leading-none tracking-tight text-ouro">
          <span className="block text-2xl sm:text-5xl">{HERO.prefixo}</span>
          <span className="block text-6xl sm:text-8xl lg:text-9xl">{HERO.linhas[0]}</span>
          <span className="mt-2 flex items-center justify-center gap-3 text-3xl sm:gap-6 sm:text-7xl lg:text-8xl">
            <Ilustracao id="estrela" className="size-8 shrink-0 sm:size-14" />
            {HERO.linhas[1]}
            <Ilustracao id="estrela" className="size-8 shrink-0 sm:size-14" />
          </span>
        </h1>

        <Ilustracao id="cruz" className="mx-auto mt-8 h-12 w-8 sm:h-16 sm:w-10" />

        <p className="mx-auto mt-8 max-w-md font-corpo text-sm text-white sm:max-w-xl sm:text-lg">
          {HERO.subtitulo}
        </p>

        {/* Proporção 3:1 e larguras em %, como no Figma, para a cena escalar inteira. */}
        <div className="relative mt-12 aspect-[3/1] w-full">
          <Ilustracao id="ponteRecife" className="absolute left-0 top-0 w-[75%]" />
          <Ilustracao id="veleiro" className="absolute bottom-0 right-[3%] w-[28%]" />
          <Ilustracao id="passaroFerrugem" className="absolute bottom-0 left-[22%] w-[11%]" />
        </div>
      </div>
    </header>
  );
}
