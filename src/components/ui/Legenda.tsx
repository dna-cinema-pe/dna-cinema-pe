import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

/** Texto pequeno de apoio: créditos, legendas e notas. */
export function Legenda({ children, className = "" }: Props) {
  return (
    <p className={`px-6 font-corpo text-xs font-medium text-papel sm:text-sm ${className}`}>
      {children}
    </p>
  );
}
