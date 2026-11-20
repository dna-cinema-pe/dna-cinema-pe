"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { MarcaDeHotspot, useEstadoHotspot } from "./MarcaDeHotspot.tsx";

interface Props {
  /** Identificador único e estável do hotspot (persistido na sessão). */
  id: string;
  /** Posição/tamanho da área sensível, no mesmo sistema de coordenadas do poster. */
  style: CSSProperties;
  /** Texto revelado ao interagir — o "dado escondido" que o hotspot entrega (US-1.3). */
  tooltip: string;
  /**
   * Dica em tamanho real de tela (16 px de texto, via `--inv` do PosterViewport), em vez de
   * encolher junto com o pôster. Usado nos gráficos de gênero e raça.
   */
  dicaGrande?: boolean;
}

const DICA_PADRAO =
  "absolute left-0 top-full z-40 mt-2 w-64 rounded-lg bg-black/90 p-3 font-corpo text-sm leading-snug text-white shadow-lg";
const DICA_GRANDE =
  "absolute left-0 top-full z-40 mt-[calc(8px*var(--inv,1))] w-[calc(340px*var(--inv,1))] max-w-full rounded-[calc(8px*var(--inv,1))] bg-black/90 p-[calc(14px*var(--inv,1))] font-corpo text-[length:max(16px,calc(16px*var(--inv,1)))] leading-snug text-white shadow-lg";

/**
 * Marca um elemento interativo do poster (US-1.3): pulso dourado + dica até a
 * primeira interação, substituído por contorno estático quando
 * `prefers-reduced-motion` está ativo. Guarda o estado "visto" por sessão.
 *
 * Mouse: a dica abre ao passar por cima e fecha ao sair. Toque: abre ao tocar, fecha ao tocar de
 * novo (ou ao tocar fora). Teclado: abre com o foco.
 */
export function Hotspot({ id, style, tooltip, dicaGrande = false }: Props) {
  const { visto, reduzirMovimento, podeApontar, marcarVisto } = useEstadoHotspot(id);
  const [emFoco, setEmFoco] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  /** O último ponteiro que apertou aqui foi toque/caneta (não mouse). */
  const porToque = useRef(false);

  // No toque, tocar fora fecha a dica (o iOS nem sempre tira o foco ao tocar em área sem foco).
  useEffect(() => {
    if (!emFoco) return;
    const aoTocarFora = (evento: PointerEvent) => {
      if (evento.pointerType === "mouse") return;
      if (raiz.current && !raiz.current.contains(evento.target as Node)) setEmFoco(false);
    };
    document.addEventListener("pointerdown", aoTocarFora);
    return () => document.removeEventListener("pointerdown", aoTocarFora);
  }, [emFoco]);

  return (
    <div
      ref={raiz}
      className="absolute z-30 cursor-pointer"
      style={style}
      data-node-id={`hotspot-${id}`}
      onPointerDown={(evento) => {
        porToque.current = evento.pointerType !== "mouse";
      }}
      onPointerEnter={(evento) => {
        if (evento.pointerType !== "mouse") return;
        setEmFoco(true);
        marcarVisto();
      }}
      onPointerLeave={(evento) => {
        if (evento.pointerType === "mouse") setEmFoco(false);
      }}
      onClick={() => {
        if (!porToque.current) return;
        setEmFoco((aberto) => !aberto);
        marcarVisto();
      }}
      onFocus={() => {
        // Foco vindo de toque é tratado no clique (abre/fecha); aqui só o do teclado.
        if (porToque.current) return;
        setEmFoco(true);
        marcarVisto();
      }}
      onBlur={() => {
        if (!porToque.current) setEmFoco(false);
      }}
      onKeyDown={(evento) => {
        porToque.current = false;
        if (evento.key === "Escape") setEmFoco(false);
      }}
      tabIndex={0}
      role="button"
      aria-label={tooltip}
      aria-expanded={emFoco}
    >
      {!visto && <MarcaDeHotspot podeApontar={podeApontar} reduzirMovimento={reduzirMovimento} />}
      {emFoco && <span className={dicaGrande ? DICA_GRANDE : DICA_PADRAO}>{tooltip}</span>}
    </div>
  );
}
