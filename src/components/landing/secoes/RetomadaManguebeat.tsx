import { TituloSecao } from "@/components/ui/TituloSecao.tsx";
import { Ilustracao } from "../Ilustracao.tsx";
import { Polaroid } from "../Polaroid.tsx";
import { Varal } from "../Varal.tsx";
import { RETOMADA } from "../conteudo.ts";

const PAPEIS = ["cinza", "cinza", "claro"] as const;

export function RetomadaManguebeat() {
  const itens = RETOMADA.polaroids.map((legenda, i) => ({
    id: i,
    // TODO(figma): trocar o placeholder pelas fotos (Recife, Baile Perfumado, Chico Science).
    conteudo: <Polaroid papel={PAPEIS[i]} rotulo="imagem" legenda={legenda} />,
  }));

  return (
    <section aria-labelledby="retomada-e-manguebeat" className="py-16">
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pb-40 pt-24 sm:pb-56 sm:pt-40">
        <Ilustracao id="caranguejo" className="absolute inset-x-0 top-0 mx-auto h-full w-full" />
        <Ilustracao
          id="ilhaPalmeiras"
          className="absolute inset-x-0 bottom-0 mx-auto h-28 w-full sm:h-44"
        />

        <TituloSecao
          id="retomada-e-manguebeat"
          tamanho="medio"
          className="relative flex flex-col items-center"
        >
          <span>{RETOMADA.titulo[0]}</span>
          <span className="text-3xl sm:text-5xl">{RETOMADA.titulo[1]}</span>
          <span className="text-5xl sm:text-8xl">{RETOMADA.titulo[2]}</span>
        </TituloSecao>
      </div>

      <Varal rotulo="Marcos da Retomada e do Manguebeat" formato="curvo" itens={itens} />
    </section>
  );
}
