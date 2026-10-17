import Link from "next/link";

export default function FilmeNotFound() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>404 - Filme não encontrado</h1>
      <p>
        O identificador informado não corresponde a nenhum filme existente em nosso catálogo ou é inválido.
      </p>
      <p style={{ marginTop: "1rem" }}>
        <Link href="/filmes">← Voltar para a lista de filmes</Link>
      </p>
    </main>
  );
}

