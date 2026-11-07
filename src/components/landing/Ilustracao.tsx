import { obterIlustracao, type IdIlustracao } from "./ilustracoes.ts";

interface Props {
  id: IdIlustracao;
  /** Define o tamanho e a posição; o asset e o placeholder o respeitam. */
  className?: string;
}

/** Ilustração decorativa do Figma. Sem `src` no registro, mostra um placeholder. */
export function Ilustracao({ id, className = "" }: Props) {
  const { rotulo, src } = obterIlustracao(id);

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className={`pointer-events-none select-none object-contain ${className}`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center border border-dashed border-ouro/40 p-2 text-center font-corpo text-[10px] uppercase tracking-wide text-ouro/60 ${className}`}
    >
      {rotulo}
    </span>
  );
}
