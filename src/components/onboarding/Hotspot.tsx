"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useOnboarding } from "./OnboardingProvider.tsx";

interface Props {
  /** Identificador único e estável do hotspot (persistido na sessão). */
  id: string;
  /** Posição/tamanho da área sensível, no mesmo sistema de coordenadas do poster. */
  style: CSSProperties;
  /** Texto revelado ao interagir — o "dado escondido" que o hotspot entrega (US-1.3). */
  tooltip: string;
}

/**
 * Marca um elemento interativo do poster (US-1.3): pulso dourado + dica até a
 * primeira interação, substituído por contorno estático quando
 * `prefers-reduced-motion` está ativo. Guarda o estado "visto" por sessão.
 */
export function Hotspot({ id, style, tooltip }: Props) {
  const { reduzirMovimento, registrarHotspot, marcarHotspotVisto, hotspotsVistos } =
    useOnboarding();
  const [emFoco, setEmFoco] = useState(false);
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

  const visto = hidratado && hotspotsVistos.has(id);
  const reduzirMovimentoSeguro = hidratado && reduzirMovimento;

  const marcarVisto = () => marcarHotspotVisto(id);

  return (
    <div
      className="absolute z-30 cursor-pointer"
      style={style}
      data-node-id={`hotspot-${id}`}
      onMouseEnter={() => {
        setEmFoco(true);
        marcarVisto();
      }}
      onMouseLeave={() => setEmFoco(false)}
      onTouchStart={marcarVisto}
      onFocus={() => {
        setEmFoco(true);
        marcarVisto();
      }}
      onBlur={() => setEmFoco(false)}
      tabIndex={0}
      role="button"
      aria-label={tooltip}
    >
      {!visto && (
        <span className="pointer-events-none absolute -right-3 -top-3 flex size-7">
          {reduzirMovimentoSeguro ? (
            <span className="size-7 rounded-full border-2 border-ouro" />
          ) : (
            <>
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ouro opacity-75 [animation-duration:2s]" />
              <span className="relative inline-flex size-4 rounded-full bg-ouro m-auto" />
            </>
          )}
        </span>
      )}
      {!visto && (
        <span className="pointer-events-none absolute -top-9 left-0 whitespace-nowrap rounded-md bg-black/85 px-2 py-1 font-corpo text-xs font-semibold text-white">
          {podeApontar ? "✨ Passe o mouse" : "✨ Toque"}
        </span>
      )}
      {emFoco && (
        <span className="absolute left-0 top-full z-40 mt-2 w-64 rounded-lg bg-black/90 p-3 font-corpo text-sm leading-snug text-white shadow-lg">
          {tooltip}
        </span>
      )}
    </div>
  );
}
