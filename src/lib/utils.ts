/** Texto único exibido quando um dado não está disponível (issue #27). */
export const NAO_DISPONIVEL = "Informação não disponível";

/**
 * Os pôsteres locais (`/posters/…`) passaram a ser WebP (US-4.3). Bancos populados antes disso
 * ainda guardam `.jpg`/`.png`; aqui a URL é corrigida na leitura, para não depender de rodar o
 * seed de novo. URLs externas ficam como estão.
 */
export function urlDoPoster<T extends string | null | undefined>(url: T): T {
  if (!url || !url.startsWith("/posters/")) return url;
  return url.replace(/\.(png|jpe?g)$/i, ".webp") as T;
}
