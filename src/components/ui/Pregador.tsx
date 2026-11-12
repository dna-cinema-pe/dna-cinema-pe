interface Props {
  /** Posicionamento e rotação ficam por conta de quem usa. */
  className?: string;
}

/** Pregador dourado do varal e da cortina. Puramente decorativo. */
export function Pregador({ className = "" }: Props) {
  return (
    <span
      aria-hidden="true"
      className={`block h-12 w-4 rounded-[2px] bg-ouro shadow-md ${className}`}
    >
      <span className="mt-6 block h-1 w-full bg-papel/70" />
    </span>
  );
}
