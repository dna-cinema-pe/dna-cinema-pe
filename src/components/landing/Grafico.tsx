import { Barra, COR_BARRA } from "@/components/ui/Barra.tsx";
import type { ItemGrafico } from "./tipos.ts";

interface Props {
  /** Descrição do gráfico para leitores de tela (não é exibida). */
  titulo: string;
  itens: readonly ItemGrafico[];
  /** Valor que corresponde a 100% da barra. */
  maximo?: number;
  className?: string;
}

/** Barras de proporção com legenda de cores à direita, como no Figma. */
export function Grafico({ titulo, itens, maximo = 100, className = "" }: Props) {
  return (
    <figure className={`flex flex-col gap-4 ${className}`}>
      <figcaption className="sr-only">{titulo}</figcaption>

      <div className="flex flex-col gap-2">
        {itens.map((item) => (
          <Barra
            key={item.rotulo}
            rotulo={item.rotulo}
            cor={item.cor}
            valorTexto={item.valorTexto}
            percentual={item.valor === null ? null : (item.valor / maximo) * 100}
          />
        ))}
      </div>

      <ul className="flex flex-col items-end gap-1.5">
        {itens.map((item) => (
          <li
            key={item.rotulo}
            className="flex items-center gap-2 font-corpo text-xs font-semibold text-white sm:text-sm"
          >
            {item.rotulo}
            <span aria-hidden="true" className={`size-3 ${COR_BARRA[item.cor]}`} />
          </li>
        ))}
      </ul>
    </figure>
  );
}
