import { Placeholder } from "@/components/ui/Placeholder.tsx";
import { TituloSecao } from "@/components/ui/TituloSecao.tsx";
import { Grafico } from "../Grafico.tsx";
import { RECORTE } from "../conteudo.ts";
import type { ItemGrafico } from "../tipos.ts";

type IdGrafico = Exclude<(typeof RECORTE.blocos)[number]["grafico"], null>;

const TITULOS_GRAFICO: Record<IdGrafico, string> = {
  genero: "Proporção entre mulheres e homens no cinema pernambucano",
  origem: "Proporção entre pernambucanos e outros no cinema nacional",
  classe: "Distribuição por classe social no cinema pernambucano",
};

interface Props {
  /** Dados de cada gráfico. Os ausentes aparecem como placeholder. */
  graficos?: Partial<Record<IdGrafico, readonly ItemGrafico[]>>;
}

export function RecorteGeneroRacaOrigem({ graficos }: Props) {
  return (
    <section aria-labelledby="recorte-genero-raca-origem" className="py-16">
      <TituloSecao id="recorte-genero-raca-origem" tamanho="medio" className="px-6 py-10">
        {RECORTE.titulo[0]}
        <br />
        {RECORTE.titulo[1]}
      </TituloSecao>

      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 items-center gap-x-16 gap-y-10 px-6 font-corpo text-sm font-semibold leading-relaxed text-white sm:text-base md:grid-cols-2">
        {RECORTE.blocos.map(({ texto, grafico }) => {
          const itens = grafico ? graficos?.[grafico] : undefined;

          return (
            <div key={texto} className="contents">
              <p className="whitespace-pre-line">{texto}</p>
              {grafico && itens ? (
                <Grafico titulo={TITULOS_GRAFICO[grafico]} itens={itens} />
              ) : grafico ? (
                <Placeholder rotulo={`gráfico: ${grafico}`} className="h-32 w-full" />
              ) : (
                <span aria-hidden="true" className="hidden md:block" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
