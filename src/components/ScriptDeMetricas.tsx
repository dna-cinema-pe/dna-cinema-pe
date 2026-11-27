"use client";

import Script from "next/script";
import {
  DOMINIO_PRODUCAO,
  UMAMI_WEBSITE_ID,
  URL_SCRIPT_UMAMI,
  esvaziarFilaDeMetricas,
} from "@/lib/metricas.ts";

/**
 * Script do Umami Cloud (US-4.4, ADR 0007). Carregado depois que a página fica ociosa
 * (`lazyOnload`), para não competir com o hero. Ao chegar, envia os eventos que ficaram na fila.
 * Sem Website ID ou domínio configurados, não renderiza nada.
 */
export function ScriptDeMetricas() {
  if (!UMAMI_WEBSITE_ID || !DOMINIO_PRODUCAO) return null;

  return (
    <Script
      src={URL_SCRIPT_UMAMI}
      strategy="lazyOnload"
      data-website-id={UMAMI_WEBSITE_ID}
      data-domains={DOMINIO_PRODUCAO}
      data-do-not-track="true"
      data-exclude-search="true"
      onLoad={esvaziarFilaDeMetricas}
    />
  );
}
