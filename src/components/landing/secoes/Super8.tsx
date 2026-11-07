import { Legenda } from "@/components/ui/Legenda.tsx";
import { TextoColunas } from "@/components/ui/TextoColunas.tsx";
import { TituloSecao } from "@/components/ui/TituloSecao.tsx";
import { Cortina } from "../Cortina.tsx";
import { Holofote } from "../Holofote.tsx";
import { SUPER_8 } from "../conteudo.ts";

export function Super8() {
  return (
    <section aria-labelledby="super-8" className="py-16">
      {/* TODO(figma): o Super-8 "aparece atrás" da cortina; falta a imagem de fundo. */}
      <div className="px-4 sm:px-8">
        <Cortina>
          <Holofote className="min-h-[24rem] md:min-h-[36rem]">
            <TituloSecao id="super-8" tom="claro">
              {SUPER_8.titulo}
            </TituloSecao>
          </Holofote>
        </Cortina>
      </div>

      <Legenda className="mt-10 text-center">{SUPER_8.creditos}</Legenda>

      <TextoColunas colunas={3} paragrafos={SUPER_8.paragrafos} className="mt-10 max-w-6xl" />
    </section>
  );
}
