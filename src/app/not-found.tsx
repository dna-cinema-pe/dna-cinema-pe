import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>404 - Página não encontrada</h1>
      <p>A página que você está procurando não existe.</p>
      <p style={{ marginTop: "1rem" }}>
        <Link href="/">← Voltar para a página inicial</Link> |{" "}
        <Link href="/filmes">Ir para o catálogo de filmes</Link>
      </p>
    </main>
  );
}

