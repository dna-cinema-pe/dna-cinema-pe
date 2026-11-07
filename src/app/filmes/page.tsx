import Link from "next/link";
import { listarFilmes } from "@/server/filmes.ts";

const NAO_DISPONIVEL = "Informação não disponível";

export default async function FilmesPage() {
  const filmes = await listarFilmes();

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <p>
        <Link href="/">← Voltar para a Home</Link>
      </p>

      <h1>Catálogo de Filmes (US06)</h1>
      <p>Total de registros no banco: {filmes.length}</p>

      {filmes.length === 0 ? (
        <p>Nenhum filme cadastrado.</p>
      ) : (
        <table
          border={1}
          cellPadding={8}
          cellSpacing={0}
          style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}
        >
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th>ID</th>
              <th>Pôster</th>
              <th>Título</th>
              <th>Ano</th>
              <th>Gênero</th>
              <th>Cidade Filmagem</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filmes.map((filme) => (
              <tr key={filme.idFilme}>
                <td>{filme.idFilme}</td>
                <td style={{ textAlign: "center" }}>
                  {filme.posterUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={filme.posterUrl}
                      alt={filme.posterAlt ?? "Pôster do filme"}
                      style={{ width: "45px", height: "auto" }}
                    />
                  ) : (
                    <span>{NAO_DISPONIVEL}</span>
                  )}
                </td>
                <td>
                  <Link href={`/filmes/${filme.idFilme}`}>
                    <strong>{filme.titulo}</strong>
                  </Link>
                </td>
                <td>{filme.ano}</td>
                <td>{filme.genero ?? NAO_DISPONIVEL}</td>
                <td>{filme.cidadeFilmagem ?? NAO_DISPONIVEL}</td>
                <td>
                  <Link href={`/filmes/${filme.idFilme}`}>Ver detalhes</Link> |{" "}
                  <a
                    href={`/api/filmes/${filme.idFilme}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    JSON
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
