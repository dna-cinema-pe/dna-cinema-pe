import { Moldura } from "@/components/landing/Moldura.tsx";
import { Anos2000 } from "@/components/landing/secoes/Anos2000.tsx";
import { CicloDoRecife } from "@/components/landing/secoes/CicloDoRecife.tsx";
import { Conclusao } from "@/components/landing/secoes/Conclusao.tsx";
import { Contexto } from "@/components/landing/secoes/Contexto.tsx";
import { Financiamento } from "@/components/landing/secoes/Financiamento.tsx";
import { Hero } from "@/components/landing/secoes/Hero.tsx";
import { ReconhecimentoInternacional } from "@/components/landing/secoes/ReconhecimentoInternacional.tsx";
import { RecorteGeneroRacaOrigem } from "@/components/landing/secoes/RecorteGeneroRacaOrigem.tsx";
import { RetomadaManguebeat } from "@/components/landing/secoes/RetomadaManguebeat.tsx";
import { Rodape } from "@/components/landing/secoes/Rodape.tsx";
import { Super8 } from "@/components/landing/secoes/Super8.tsx";

// Sem dados, cada seção mostra seus placeholders.
export default function HomePage() {
  return (
    <main className="flex-1 bg-fundo font-corpo text-papel">
      <Moldura>
        <Hero />
        <Contexto />
        <CicloDoRecife />
        <Super8 />
        <RetomadaManguebeat />
        <Anos2000 />
        <Financiamento />
        <ReconhecimentoInternacional />
        <RecorteGeneroRacaOrigem />
        <Conclusao />
      </Moldura>
      <Rodape />
    </main>
  );
}
