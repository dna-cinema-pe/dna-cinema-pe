import Link from "next/link";

/** Fora do Figma: mantém o catálogo e a API acessíveis enquanto o destino deles não é decidido (0005). */
export function Rodape() {
  return (
    <footer className="px-6 pb-12 pt-4">
      <nav
        aria-label="Dados do projeto"
        className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-corpo text-sm text-papel"
      >
        <Link href="/filmes" className="underline-offset-4 hover:text-ouro hover:underline">
          Catálogo de filmes
        </Link>
        <a
          href="/api/filmes"
          target="_blank"
          rel="noreferrer"
          className="underline-offset-4 hover:text-ouro hover:underline"
        >
          Dados em JSON
        </a>
      </nav>
    </footer>
  );
}
