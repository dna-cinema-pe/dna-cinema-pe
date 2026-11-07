import type { ReactNode } from "react";

const TONS = {
  claro: "text-white",
  ouro: "text-ouro",
} as const;

const TAMANHOS = {
  pequeno: "text-3xl sm:text-4xl lg:text-5xl",
  medio: "text-4xl sm:text-6xl lg:text-7xl",
  grande: "text-5xl sm:text-7xl lg:text-8xl",
} as const;

interface Props {
  children: ReactNode;
  id?: string;
  nivel?: 1 | 2 | 3;
  tom?: keyof typeof TONS;
  tamanho?: keyof typeof TAMANHOS;
  className?: string;
}

/** Título em slab, caixa alta, usado em todas as seções da landing. */
export function TituloSecao({
  children,
  id,
  nivel = 2,
  tom = "claro",
  tamanho = "medio",
  className = "",
}: Props) {
  const Tag = `h${nivel}` as const;

  return (
    <Tag
      id={id}
      className={`text-balance text-center font-titulo uppercase leading-[1.05] tracking-tight ${TONS[tom]} ${TAMANHOS[tamanho]} ${className}`}
    >
      {children}
    </Tag>
  );
}
