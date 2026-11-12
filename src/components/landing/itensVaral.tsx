import { Polaroid } from "./Polaroid.tsx";
import type { FilmeLanding } from "./tipos.ts";

/**
 * Itens de varal com polaroids. Usa os filmes recebidos quando houver;
 * sem eles, devolve `quantidadePlaceholder` cartões vazios, como no Figma.
 */
export function polaroidsDeFilmes(
  filmes: readonly FilmeLanding[] | undefined,
  quantidadePlaceholder: number,
) {
  if (filmes && filmes.length > 0) {
    return filmes.map((filme) => ({
      id: filme.id,
      conteudo: (
        <Polaroid
          formato="retrato"
          imagem={filme.poster}
          rotulo={filme.titulo}
          legenda={filme.ano > 0 ? `${filme.titulo} (${filme.ano})` : filme.titulo}
        />
      ),
    }));
  }

  return Array.from({ length: quantidadePlaceholder }, (_, i) => ({
    id: `placeholder-${i}`,
    conteudo: <Polaroid rotulo="imagem filmes" />,
  }));
}
