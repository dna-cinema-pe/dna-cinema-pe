import { Placeholder } from "@/components/ui/Placeholder.tsx";
import { TextoColunas } from "@/components/ui/TextoColunas.tsx";
import { TituloSecao } from "@/components/ui/TituloSecao.tsx";
import { Ilustracao } from "../Ilustracao.tsx";
import { CONTEXTO } from "../conteudo.ts";

export function Contexto() {
  return (
    <section aria-labelledby="contexto" className="py-16">
      <TituloSecao id="contexto" tamanho="grande">
        {CONTEXTO.titulo}
      </TituloSecao>

      <TextoColunas paragrafos={CONTEXTO.abertura} className="mt-12" />

      {/* Os fios vão de borda a borda; as pontas caem nos cantos de cima do postal (23% e 77% da largura). */}
      <div className="relative mb-12 mt-16">
        <Ilustracao id="fiosPostal" className="absolute bottom-full left-0 w-full translate-y-[15%]" />
        {/* TODO(figma): trocar pelo postal (o Figma ainda marca "postcard?"). */}
        <Placeholder rotulo="postcard?" className="relative mx-auto h-64 w-full md:w-[60%] sm:h-96" />
      </div>

      <TextoColunas paragrafos={CONTEXTO.desdobramento} />
    </section>
  );
}
