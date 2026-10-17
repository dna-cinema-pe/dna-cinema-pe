import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>DNA Cinema PE</h1>
      <p>
        Plataforma para consulta e preservação da história do cinema pernambucano.
      </p>

      <div style={{ marginTop: "1.5rem" }}>
        <h2>Navegação</h2>
        <ul>
          <li>
            <Link href="/filmes">
              <strong>/filmes</strong> - Lista de filmes (US06)
            </Link>
          </li>
          <li>
            <a href="/api/filmes" target="_blank" rel="noreferrer">
              <code>/api/filmes</code> - Endpoint JSON da listagem
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
}
