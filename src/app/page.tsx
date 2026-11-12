import { Suspense } from "react";
import { DesignPoster } from "@/components/poster/DesignPoster.tsx";
import { PosterViewport } from "@/components/poster/PosterViewport.tsx";
import { obterRecorteGenero } from "@/server/panorama.ts";

/**
 * Home: o frame do Figma Make, sem animações.
 * Só o gráfico de gênero vem do banco; os de origem e classe social são placeholders
 * fixos porque o schema não tem esses dados (ver docs/analise-design-vs-banco.md).
 */
async function PosterComDados() {
  // Banco fora do ar não derruba a Home: o gráfico cai para o placeholder.
  const genero = await obterRecorteGenero().catch(() => null);

  return (
    <PosterViewport>
      <DesignPoster genero={genero} />
    </PosterViewport>
  );
}

export default function HomePage() {
  return (
    <main className="flex-1 bg-fundo">
      <Suspense
        fallback={
          <PosterViewport>
            <DesignPoster />
          </PosterViewport>
        }
      >
        <PosterComDados />
      </Suspense>
    </main>
  );
}
