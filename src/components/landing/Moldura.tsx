import type { ReactNode } from "react";

/**
 * Moldura dourada que envolve a página inteira.
 * TODO(figma): trocar as bordas por SVG da moldura rústica quando o design entregar o asset.
 */
export function Moldura({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1920px] p-2 sm:p-4 lg:p-6">
      <div className="border-[6px] border-ouro p-1.5 sm:border-8 sm:p-2">
        <div className="overflow-hidden border-[3px] border-ouro">{children}</div>
      </div>
    </div>
  );
}
