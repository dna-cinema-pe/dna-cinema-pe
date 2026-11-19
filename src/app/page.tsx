import { Suspense } from "react";
import { connection } from "next/server";
import { AnimacoesDoPoster } from "@/components/poster/AnimacoesDoPoster.tsx";
import { ControlesDeMovimento } from "@/components/poster/ControlesDeMovimento.tsx";
import { DesignPoster } from "@/components/poster/DesignPoster.tsx";
import { PosterViewport } from "@/components/poster/PosterViewport.tsx";
import { TrilhaDaLinhaDoTempo } from "@/components/poster/TrilhaDaLinhaDoTempo.tsx";
import {
  obterPremiosInternacionais,
  obterPodioPremios,
  obterRecorteGenero,
  obterRecorteRaca,
} from "@/server/panorama.ts";
import { OnboardingProvider } from "@/components/onboarding/OnboardingProvider.tsx";
import { WelcomeTour, BotaoReabrirTour } from "@/components/onboarding/WelcomeTour.tsx";
import { ScrollHint } from "@/components/onboarding/ScrollHint.tsx";
import { Navigator } from "@/components/onboarding/Navigator.tsx";
import { CompletionSummary } from "@/components/onboarding/CompletionSummary.tsx";

/**
 * Home: o frame do Figma Make, com as animações do protótipo (ver globals.css).
 * Os recortes de gênero e raça vêm do banco.
 */
async function PosterComDados() {
  await connection();

  // Banco fora do ar não derruba a Home: os gráficos caem para o placeholder.
  const [genero, raca, premios, podio] = await Promise.all([
    obterRecorteGenero().catch(() => null),
    obterRecorteRaca().catch(() => null),
    obterPremiosInternacionais().catch(() => null),
    obterPodioPremios().catch(() => null),
  ]);

  return (
    <PosterViewport>
      <DesignPoster genero={genero} raca={raca} premios={premios} podio={podio} />
      <AnimacoesDoPoster />
    </PosterViewport>
  );
}

export default function HomePage() {
  return (
    <main className="flex-1 bg-fundo">
      <OnboardingProvider>
        <ControlesDeMovimento />
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
        <TrilhaDaLinhaDoTempo />
        <CompletionSummary />
        <WelcomeTour />
        <BotaoReabrirTour />
      </OnboardingProvider>
    </main>
  );
}
