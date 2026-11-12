import { TextoColunas } from "@/components/ui/TextoColunas.tsx";
import { TituloSecao } from "@/components/ui/TituloSecao.tsx";
import { Ilustracao } from "../Ilustracao.tsx";
import { polaroidsDeFilmes } from "../itensVaral.tsx";
import { Varal } from "../Varal.tsx";
import { CICLO_DO_RECIFE } from "../conteudo.ts";
import type { FilmeLanding } from "../tipos.ts";

interface Props {
  /** Filmes do período (provisório: 1923 a 1931). Sem eles, mostra placeholders. */
  filmes?: readonly FilmeLanding[];
}

export function CicloDoRecife({ filmes }: Props) {
  return (
    <section aria-labelledby="ciclo-do-recife" className="py-16">
      <Ilustracao id="guardaChuvaFrevo" className="mx-auto h-28 w-52 sm:h-40 sm:w-72" />

      <TituloSecao id="ciclo-do-recife" tamanho="grande" className="mt-4 px-6">
        {CICLO_DO_RECIFE.titulo}
      </TituloSecao>

      <TextoColunas paragrafos={CICLO_DO_RECIFE.paragrafos} className="mt-10" />

      <Varal
        rotulo="Filmes do Ciclo do Recife"
        formato="diagonal"
        itens={polaroidsDeFilmes(filmes, 3)}
        className="mt-8"
      />
    </section>
  );
}
