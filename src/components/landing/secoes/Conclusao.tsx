import { TextoColunas } from "@/components/ui/TextoColunas.tsx";
import { TituloSecao } from "@/components/ui/TituloSecao.tsx";
import { CONCLUSAO } from "../conteudo.ts";

export function Conclusao() {
  return (
    <section aria-labelledby="conclusao" className="py-20">
      <TituloSecao id="conclusao" tamanho="grande">
        {CONCLUSAO.titulo}
      </TituloSecao>

      <TextoColunas paragrafos={CONCLUSAO.paragrafos} className="mt-12" />
    </section>
  );
}
