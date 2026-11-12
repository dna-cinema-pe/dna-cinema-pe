import { Placeholder } from "@/components/ui/Placeholder.tsx";
import { TituloSecao } from "@/components/ui/TituloSecao.tsx";
import { Ilustracao } from "../Ilustracao.tsx";
import { FINANCIAMENTO } from "../conteudo.ts";

const CANTOS = [
  "left-4 top-0",
  "right-4 top-0",
  "left-0 top-14 sm:top-20",
  "right-0 top-14 sm:top-20",
] as const;

export function Financiamento() {
  return (
    <section aria-labelledby="financiamento" className="py-16">
      <div className="relative px-6 py-16">
        {CANTOS.map((posicao) => (
          <Ilustracao
            key={posicao}
            id="dinheiroCordel"
            className={`absolute h-10 w-20 sm:h-14 sm:w-32 ${posicao}`}
          />
        ))}
        <TituloSecao id="financiamento" tamanho="grande">
          {FINANCIAMENTO.titulo}
        </TituloSecao>
      </div>

      {/* TODO(figma): os gráficos ainda são blocos cinza; falta definir o formato de cada um. */}
      <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 items-center gap-x-16 gap-y-10 px-6 font-corpo text-sm font-semibold leading-relaxed text-white sm:text-base md:grid-cols-2">
        {FINANCIAMENTO.paragrafos.map((paragrafo, i) => (
          <div key={paragrafo} className="contents">
            <p>{paragrafo}</p>
            <Placeholder rotulo={`gráfico ${i + 1}`} className="h-36 w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
