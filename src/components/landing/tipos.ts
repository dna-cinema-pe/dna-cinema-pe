import type { CorBarra } from "@/components/ui/Barra.tsx";

export interface ImagemFilme {
  src: string;
  alt: string;
}

/** O que a landing precisa saber de um filme; independe do formato do Prisma. */
export interface FilmeLanding {
  id: number;
  titulo: string;
  ano: number;
  poster: ImagemFilme | null;
}

export interface ItemGrafico {
  rotulo: string;
  /** Valor absoluto; `null` indica dado ausente. */
  valor: number | null;
  valorTexto?: string;
  cor: CorBarra;
}

export interface ColocadoPodio {
  posicao: 1 | 2 | 3;
  filmes: readonly FilmeLanding[];
}
