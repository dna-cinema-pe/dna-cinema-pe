"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState, type HTMLAttributes, type KeyboardEvent, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import { MarcaDeHotspot, useEstadoHotspot } from "@/components/onboarding/MarcaDeHotspot.tsx";
import { POSTAIS, type FilmeDoPostal, type IdPostal } from "./postais.ts";

interface Props extends HTMLAttributes<HTMLDivElement> {
  id: IdPostal;
  /** Primeiro postal da seção: mostra o pulso e a dica de hotspot (US-1.3) até o primeiro uso. */
  comDica?: boolean;
}

/**
 * Postal pendurado no varal. Balança (`postcard-swing`, pivô no topo) no hover; no toque, o
 * primeiro toque balança e o segundo abre o modal do filme. Clique, Enter ou Espaço abrem direto.
 */
export function PostalPendurado({ id, comDica = false, className, children, ...resto }: Props) {
  const filme: FilmeDoPostal = POSTAIS[id];
  const postalRef = useRef<HTMLDivElement>(null);
  const tipoPonteiro = useRef<string>("mouse");
  const devolverFoco = useRef(false);
  const [balancando, setBalancando] = useState(false);
  const [aberto, setAberto] = useState(false);
  const hotspot = useEstadoHotspot(`postal-${id}`);

  function abrir() {
    hotspot.marcarVisto();
    setBalancando(false);
    setAberto(true);
  }

  function fechar() {
    devolverFoco.current = true;
    setAberto(false);
  }

  // Devolve o foco só depois que o <dialog> desmonta: enquanto ele está aberto, o resto da
  // página fica inerte e `focus()` no postal não tem efeito.
  useEffect(() => {
    if (aberto || !devolverFoco.current) return;
    devolverFoco.current = false;
    postalRef.current?.focus({ preventScroll: true });
  }, [aberto]);

  function aoClicar() {
    if (tipoPonteiro.current === "touch" && !balancando) {
      hotspot.marcarVisto();
      setBalancando(true);
      return;
    }
    abrir();
  }

  function aoTeclar(evento: KeyboardEvent<HTMLDivElement>) {
    if (evento.key !== "Enter" && evento.key !== " ") return;
    evento.preventDefault();
    abrir();
  }

  return (
    <>
      <div
        {...resto}
        ref={postalRef}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={`${filme.titulo} (${filme.ano}): ver detalhes do filme`}
        className={`hanging-postcard${balancando ? " hanging-postcard--balancando" : ""} ${className ?? ""}`}
        onPointerDown={(evento: PointerEvent<HTMLDivElement>) => {
          tipoPonteiro.current = evento.pointerType;
        }}
        onPointerEnter={(evento) => {
          if (evento.pointerType === "mouse") hotspot.marcarVisto();
        }}
        onClick={aoClicar}
        onKeyDown={aoTeclar}
        onBlur={() => setBalancando(false)}
      >
        {children}
        {comDica && !hotspot.visto && (
          // Metade da largura em escala 2x: a marca ocupa o topo do postal inteiro e fica
          // legível com o poster reduzido.
          <span className="pointer-events-none absolute left-0 top-0 z-30 h-0 w-1/2 origin-top-left scale-200">
            <MarcaDeHotspot
              podeApontar={hotspot.podeApontar}
              reduzirMovimento={hotspot.reduzirMovimento}
            />
          </span>
        )}
      </div>
      {aberto && <ModalDoFilme filme={filme} aoFechar={fechar} />}
    </>
  );
}

/**
 * Modal com pôster, título, ano, diretor e importância do filme. Usa `<dialog>` nativo
 * (foco preso, Esc fecha) num portal, fora da escala do poster. Fecha também no × e no fundo.
 */
function ModalDoFilme({ filme, aoFechar }: { filme: FilmeDoPostal; aoFechar: () => void }) {
  const dialogoRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogo = dialogoRef.current;
    if (!dialogo) return;
    // Sem `close()` na limpeza: o evento `close` chamaria `aoFechar` e, no StrictMode, fecharia
    // o modal logo ao abrir. Desmontar o <dialog> já o tira da camada superior.
    if (!dialogo.open) dialogo.showModal();
    const rolagemAnterior = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = rolagemAnterior;
    };
  }, []);

  return createPortal(
    <dialog
      ref={dialogoRef}
      aria-labelledby="modal-filme-titulo"
      className="m-auto w-[min(92vw,720px)] max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-ouro bg-fundo p-0 text-white shadow-2xl backdrop:bg-black/75"
      onCancel={(evento) => {
        evento.preventDefault();
        aoFechar();
      }}
      // Alguns navegadores fecham direto, sem `cancel`, após Esc repetido.
      onClose={aoFechar}
      onClick={(evento) => {
        // Clique no fundo: o alvo é o próprio <dialog>, fora da caixa de conteúdo.
        if (evento.target === evento.currentTarget) aoFechar();
      }}
    >
      <div className="relative flex flex-col gap-6 p-6 sm:flex-row">
        <button
          type="button"
          onClick={aoFechar}
          aria-label="Fechar"
          className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full font-corpo text-3xl leading-none text-white hover:text-ouro focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ouro"
        >
          ×
        </button>
        <img
          src={filme.poster}
          alt={filme.posterAlt}
          className="mx-auto w-48 shrink-0 self-start rounded-md object-cover shadow-lg sm:w-56"
        />
        <div className="flex flex-col gap-3 font-corpo sm:pr-8">
          <h2 id="modal-filme-titulo" className="font-titulo text-3xl leading-tight text-ouro">
            {filme.titulo}
          </h2>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
            <dt className="font-semibold text-white/70">Ano</dt>
            <dd>{filme.ano}</dd>
            <dt className="font-semibold text-white/70">Direção</dt>
            <dd>{filme.diretor}</dd>
          </dl>
          <p className="text-base leading-relaxed">{filme.importancia}</p>
        </div>
      </div>
    </dialog>,
    document.body,
  );
}
