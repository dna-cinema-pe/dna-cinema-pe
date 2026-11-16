"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { MarcaDeHotspot, useEstadoHotspot } from "./MarcaDeHotspot.tsx";

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
  const { visto, reduzirMovimento, podeApontar, marcarVisto } = useEstadoHotspot(id);
  const [emFoco, setEmFoco] = useState(false);

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
      {!visto && <MarcaDeHotspot podeApontar={podeApontar} reduzirMovimento={reduzirMovimento} />}
      {emFoco && (
        <span className="absolute left-0 top-full z-40 mt-2 w-64 rounded-lg bg-black/90 p-3 font-corpo text-sm leading-snug text-white shadow-lg">
          {tooltip}
        </span>
      )}
    </div>
  );
}
