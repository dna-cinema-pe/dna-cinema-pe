import { TextoColunas } from "@/components/ui/TextoColunas.tsx";
import { TituloSecao } from "@/components/ui/TituloSecao.tsx";
import { Ilustracao } from "../Ilustracao.tsx";
import { polaroidsDeFilmes } from "../itensVaral.tsx";
import { Polaroid } from "../Polaroid.tsx";
import { Varal } from "../Varal.tsx";
import { ANOS_2000 } from "../conteudo.ts";
import type { FilmeLanding } from "../tipos.ts";

const QUANTIDADE_CINEASTAS = 3;

interface Props {
  /** Filmes da Consolidação. Sem eles, mostra placeholders. */
  filmesConsolidacao?: readonly FilmeLanding[];
}

export function Anos2000({ filmesConsolidacao }: Props) {
  // TODO(figma): `Pessoa` não tem foto no schema; as fotos de cineastas ficam como placeholder.
  const cineastas = Array.from({ length: QUANTIDADE_CINEASTAS }, (_, i) => ({
    id: i,
    conteudo: <Polaroid formato="retrato" papel="cinza" rotulo="foto" legenda="descrição" />,
  }));

  return (
    <section aria-labelledby="anos-2000" className="py-16">
      <div className="relative">
        <Ilustracao id="fogos" className="absolute left-[12%] top-0 size-16 sm:size-28" />
        <Ilustracao id="fogos" className="absolute right-[14%] top-8 size-12 sm:size-20" />
        <TituloSecao id="anos-2000" tamanho="grande" className="px-6 py-10">
          {ANOS_2000.titulo}
        </TituloSecao>
      </div>

      <TextoColunas paragrafos={ANOS_2000.paragrafos} className="mt-10" />

      <div className="mt-16 flex flex-col items-center">
        <Ilustracao id="ancora" className="h-14 w-12 sm:h-16 sm:w-14" />
        <TituloSecao id="consolidacao" nivel={3} tamanho="pequeno" className="mt-2 px-6">
          {ANOS_2000.consolidacao.titulo}
        </TituloSecao>
      </div>

      <TextoColunas paragrafos={ANOS_2000.consolidacao.paragrafos} className="mt-10" />

      <Varal
        rotulo="Filmes da Consolidação"
        formato="curvo"
        balanco
        itens={polaroidsDeFilmes(filmesConsolidacao, 5)}
        className="mt-10"
      />

      <Varal rotulo="Cineastas" formato="curvo" balanco itens={cineastas} />
    </section>
  );
}
