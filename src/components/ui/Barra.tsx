import { NAO_DISPONIVEL } from "@/lib/utils.ts";

export const COR_BARRA = {
  vermelho: "bg-vermelho",
  ouro: "bg-ouro",
  ferrugem: "bg-ferrugem",
  branco: "bg-white",
} as const;

export type CorBarra = keyof typeof COR_BARRA;

interface Props {
  rotulo: string;
  /** De 0 a 100. `null` indica dado ausente (convenção do schema). */
  percentual: number | null;
  /** Texto ao lado da barra; por padrão, o percentual arredondado. */
  valorTexto?: string;
  cor: CorBarra;
}

/** Barra horizontal de proporção, alinhada à direita como no Figma. */
export function Barra({ rotulo, percentual, valorTexto, cor }: Props) {
  if (percentual === null) {
    return (
      <p className="text-right font-corpo text-sm italic text-papel">
        {rotulo}: {NAO_DISPONIVEL}
      </p>
    );
  }

  const largura = Math.min(100, Math.max(0, percentual));

  return (
    <div className="flex items-center gap-3">
      <span className="font-corpo text-lg font-semibold tabular-nums text-white sm:text-2xl">
        {valorTexto ?? `${Math.round(largura)}%`}
      </span>
      <div
        role="meter"
        aria-label={rotulo}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={largura}
        className="flex h-7 flex-1 justify-end"
      >
        <div className={`h-full ${COR_BARRA[cor]}`} style={{ width: `${largura}%` }} />
      </div>
    </div>
  );
}
