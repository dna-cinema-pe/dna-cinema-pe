import { Suspense } from "react";
import { DesignPoster } from "@/components/poster/DesignPoster.tsx";
import { PosterViewport } from "@/components/poster/PosterViewport.tsx";
import { obterRecorteGenero, obterRecorteOrigem } from "@/server/panorama.ts";
import { OnboardingProvider } from "@/components/onboarding/OnboardingProvider.tsx";
import { WelcomeTour, BotaoReabrirTour } from "@/components/onboarding/WelcomeTour.tsx";
import { ScrollHint } from "@/components/onboarding/ScrollHint.tsx";
import { Navigator } from "@/components/onboarding/Navigator.tsx";
import { CompletionSummary } from "@/components/onboarding/CompletionSummary.tsx";

/**
 * Home: o frame do Figma Make, sem animações.
 * Gênero e origem (pernambucanos x outros, dentro do próprio acervo) vêm do banco;
 * classe social continua placeholder fixo porque o schema não tem esse dado
 * (ver analise-design-vs-banco.md).
 */
async function PosterComDados() {
  // Banco fora do ar não derruba a Home: os gráficos caem para o placeholder.
  const [genero, origem] = await Promise.all([
    obterRecorteGenero().catch(() => null),
    obterRecorteOrigem().catch(() => null),
  ]);

  return (
    <PosterViewport>
      <DesignPoster genero={genero} origem={origem} />
    </PosterViewport>
  );
}

export default function HomePage() {
  return (
    <main className="flex-1 bg-fundo">
      <OnboardingProvider>
        <Suspense
          fallback={
            <PosterViewport>
              <DesignPoster />
            </PosterViewport>
          }
        >
          <PosterComDados />
        </Suspense>
        <ScrollHint />
        <Navigator />
        <CompletionSummary />
        <WelcomeTour />
        <BotaoReabrirTour />
      </OnboardingProvider>
    </main>
  );
}
