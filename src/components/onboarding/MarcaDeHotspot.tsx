"use client";

import { useEffect, useState } from "react";
import { useOnboarding } from "./OnboardingProvider.tsx";

/**
 * Estado de descoberta de um hotspot (US-1.3): registra o id no provider, diz se ele já foi
 * usado nesta sessão e se o dispositivo aponta com mouse (`(hover: hover)`) ou toque.
 */
export function useEstadoHotspot(id: string) {
  const { reduzirMovimento, registrarHotspot, marcarHotspotVisto, hotspotsVistos } =
    useOnboarding();
  const [podeApontar, setPodeApontar] = useState(true);
  // Força a 1ª renderização no cliente a bater com o HTML do servidor (sempre "não visto"),
  // mesmo que a sessionStorage já tenha esse hotspot marcado de uma visita anterior.
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    function inicializar() {
      registrarHotspot(id);
      setPodeApontar(window.matchMedia("(hover: hover)").matches);
      setHidratado(true);
    }
    inicializar();
  }, [id, registrarHotspot]);

  return {
    visto: hidratado && hotspotsVistos.has(id),
    reduzirMovimento: hidratado && reduzirMovimento,
    podeApontar,
    marcarVisto: () => marcarHotspotVisto(id),
  };
}

interface Props {
  podeApontar: boolean;
  reduzirMovimento: boolean;
}

/**
 * Pulso dourado (anel `#e3a54f`, 2 s, infinito) + dica "Passe o mouse"/"Toque" de um hotspot
 * ainda não usado. Com `prefers-reduced-motion`, o pulso vira contorno estático.
 * Fica posicionado no canto superior direito do pai, que precisa ser `relative`/`absolute`.
 */
export function MarcaDeHotspot({ podeApontar, reduzirMovimento }: Props) {
  return (
    <>
      <span className="pointer-events-none absolute -right-3 -top-3 flex size-7">
        {reduzirMovimento ? (
          <span className="size-7 rounded-full border-2 border-ouro" />
        ) : (
          <>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-ouro opacity-75 [animation-duration:2s]" />
            <span className="relative inline-flex size-4 rounded-full bg-ouro m-auto" />
          </>
        )}
      </span>
      <span className="pointer-events-none absolute -top-9 left-0 whitespace-nowrap rounded-md bg-black/85 px-2 py-1 font-corpo text-xs font-semibold text-white">
        {podeApontar ? "✨ Passe o mouse" : "✨ Toque"}
      </span>
    </>
  );
}
