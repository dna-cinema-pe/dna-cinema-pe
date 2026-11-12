import { TextoColunas } from "@/components/ui/TextoColunas.tsx";
import { TituloSecao } from "@/components/ui/TituloSecao.tsx";
import { Ilustracao } from "../Ilustracao.tsx";
import { Podio } from "../Podio.tsx";
import { RECONHECIMENTO } from "../conteudo.ts";
import type { ColocadoPodio } from "../tipos.ts";

interface Props {
  /** Sem dados, o pódio mostra os três degraus com placeholders. */
  colocados?: readonly ColocadoPodio[];
}

export function ReconhecimentoInternacional({ colocados }: Props) {
  return (
    <section aria-labelledby="reconhecimento-internacional" className="py-16">
      <div className="relative px-6 pb-8 pt-28 sm:pt-36">
        <Ilustracao id="trofeu" className="absolute left-4 top-16 size-20 sm:left-10 sm:size-32" />
        <Ilustracao id="aviao" className="absolute right-4 top-4 h-14 w-28 sm:right-10 sm:h-24 sm:w-48" />
        <Ilustracao
          id="setaCurva"
          className="absolute left-24 right-40 top-8 hidden h-14 sm:block"
        />

        <TituloSecao id="reconhecimento-internacional" tamanho="medio" className="relative">
          {RECONHECIMENTO.titulo[0]}
          <br />
          {RECONHECIMENTO.titulo[1]}
        </TituloSecao>
      </div>

      <TextoColunas paragrafos={RECONHECIMENTO.paragrafos} className="mt-8" />

      <div className="mt-20">
        <Podio colocados={colocados} />
      </div>
    </section>
  );
}
