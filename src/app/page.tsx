import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem" }}>
      <header>
        <h1>DNA Cinema PE</h1>
        <p>
          Uma investigação sobre a história, os recursos e as pessoas por trás do
          cinema feito em Pernambuco.
        </p>
        <p style={{ marginTop: "1rem" }}>
          <Link href="/filmes">
            <strong>Explorar o catálogo de filmes</strong>
          </Link>
        </p>
      </header>

      <section aria-labelledby="o-que-voce-encontra" style={{ marginTop: "2rem" }}>
        <h2 id="o-que-voce-encontra">O que você encontra em cada filme</h2>
        <ul>
          <li>
            <strong>Ficha da obra:</strong> sinopse, classificação indicativa, ano,
            cidade de filmagem e pôster.
          </li>
          <li>
            <strong>Recursos públicos:</strong> o valor investido e o edital que
            apoiou a produção.
          </li>
          <li>
            <strong>Pessoas:</strong> elenco, atrizes, participação de pessoas
            nordestinas e cineastas mulheres.
          </li>
          <li>
            <strong>Reconhecimento:</strong> premiações ganhas e indicações, com os
            principais prêmios em destaque.
          </li>
        </ul>
      </section>

      <section aria-labelledby="para-desenvolvedores" style={{ marginTop: "2rem" }}>
        <h2 id="para-desenvolvedores">Para desenvolvedores</h2>
        <p>
          Os mesmos dados do catálogo estão disponíveis em JSON:{" "}
          <a href="/api/filmes" target="_blank" rel="noreferrer">
            <code>/api/filmes</code>
          </a>
          .
        </p>
      </section>
    </main>
  );
}
