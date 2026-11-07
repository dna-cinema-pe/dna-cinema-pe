/** Lê a preferência do sistema; só chamar no cliente (efeitos e handlers). */
export function prefereMenosMovimento(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
