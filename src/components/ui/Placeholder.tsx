interface Props {
  rotulo: string;
  className?: string;
}

/**
 * Caixa cinza que marca o que o Figma ainda não definiu (imagens e gráficos).
 * Procure por `<Placeholder` para listar o que falta.
 */
export function Placeholder({ rotulo, className = "" }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center bg-[#d9d9d9] p-4 text-center font-corpo text-sm font-semibold text-fundo ${className}`}
    >
      {rotulo}
    </div>
  );
}
