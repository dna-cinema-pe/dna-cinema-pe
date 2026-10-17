"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Erro capturado no GlobalError:", error);
  }, [error]);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Ocorreu um erro inesperado</h1>
      <p>{error.message || "Não foi possível processar a requisição."}</p>
      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={() => reset()}
          style={{
            padding: "0.5rem 1rem",
            cursor: "pointer",
            marginRight: "1rem",
          }}
        >
          Tentar novamente
        </button>
        <Link href="/filmes">Ir para o catálogo</Link>
      </div>
    </main>
  );
}

