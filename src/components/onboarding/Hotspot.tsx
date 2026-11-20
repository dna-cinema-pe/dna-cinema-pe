"use client";

import { useId, useState } from "react";
import type { CSSProperties } from "react";
import { MarcaDeHotspot, useEstadoHotspot } from "./MarcaDeHotspot.tsx";

interface Props {
  /** Identificador único e estável do hotspot (persistido na sessão). */
  id: string;
  /** Posição/tamanho da área sensível, no mesmo sistema de coordenadas do poster. */
  style: CSSProperties;
  /** Nome acessível do botão (o que ele revela), anunciado ao focar. */
  rotulo: string;
  /** Texto revelado ao interagir — o "dado escondido" que o hotspot entrega (US-1.3). */
  tooltip: string;
}

/**
 * Marca um elemento interativo do poster (US-1.3): pulso dourado + dica até a
 * primeira interação, substituído por contorno estático quando
 * `prefers-reduced-motion` está ativo. Guarda o estado "visto" por sessão.
 */
export function Hotspot({ id, style, rotulo, tooltip }: Props) {
  const { visto, reduzirMovimento, podeApontar, marcarVisto } = useEstadoHotspot(id);
  const [emFoco, setEmFoco] = useState(false);
  const dicaId = useId();

  return (
    <button
      type="button"
      className="hotspot absolute z-30 cursor-pointer border-0 bg-transparent p-0 text-left"
      style={style}
      data-node-id={`hotspot-${id}`}
      aria-label={rotulo}
      aria-describedby={dicaId}
      onMouseEnter={() => {
        setEmFoco(true);
        marcarVisto();
      }}
      onMouseLeave={() => setEmFoco(false)}
      onTouchStart={marcarVisto}
      onClick={() => {
        setEmFoco(true);
        marcarVisto();
      }}
      onFocus={() => {
        setEmFoco(true);
        marcarVisto();
      }}
      onBlur={() => setEmFoco(false)}
    >
      {!visto && <MarcaDeHotspot podeApontar={podeApontar} reduzirMovimento={reduzirMovimento} />}
      <span
        id={dicaId}
        className={
          emFoco
            ? "absolute left-0 top-full z-40 mt-2 block w-64 rounded-lg bg-black/90 p-3 font-corpo text-sm leading-snug text-white shadow-lg"
            : "sr-only"
        }
      >
        {tooltip}
      </span>
    </button>
  );
}
