import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  obterFilme,
  listarIncentivos,
  obterEstatisticasElenco,
  listarCineastasFemininas,
  listarPremiacoes,
} from "@/server/filmes.ts";

interface Props {
  params: Promise<{ id: string }>;
}

async function FichaFilmeSection({ id }: { id: number }) {
  const filme = await obterFilme(id);
  if (!filme) return notFound();

  return (
    <section style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <h2>US01: Ficha Essencial do Filme</h2>
      <table border={1} cellPadding={6} style={{ borderCollapse: "collapse", width: "100%" }}>
        <tbody>
          <tr><th style={{ width: "200px" }}>ID</th><td>{filme.idFilme}</td></tr>
          <tr><th>Título</th><td><strong>{filme.titulo}</strong></td></tr>
          <tr><th>Ano</th><td>{filme.ano}</td></tr>
          <tr><th>Gênero</th><td>{filme.genero ?? "[null]"}</td></tr>
          <tr><th>Sinopse</th><td>{filme.sinopse ?? "[null]"}</td></tr>
          <tr><th>Classificação Indicativa</th><td>{filme.classificacaoIndicativa ?? "[null]"}</td></tr>
          <tr><th>Cidade de Filmagem</th><td>{filme.cidadeFilmagem ?? "[null]"}</td></tr>
          <tr><th>Pôster URL</th><td>{filme.posterUrl ?? "[null]"}</td></tr>
          <tr><th>Pôster Alt</th><td>{filme.posterAlt ?? "[null]"}</td></tr>
        </tbody>
      </table>
    </section>
  );
}

async function IncentivoPublicoSection({ id }: { id: number }) {
  const dados = await listarIncentivos(id);
  return (
    <section style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <h2>US02: Incentivo Público e Editais</h2>
      <p>
        <strong>Status:</strong>{" "}
        {dados.temIncentivo
          ? "Possui incentivo público registrado"
          : "Não há registro de incentivo financeiro público"}
      </p>
      <p>
        <strong>Total investido:</strong> R${" "}
        {dados.totalInvestido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </p>
      {dados.itens.length > 0 && (
        <table border={1} cellPadding={6} style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ background: "#f9f9f9" }}>
              <th>Edital</th>
              <th>Ano</th>
              <th>Total do Edital (R$)</th>
              <th>Investido no Filme (R$)</th>
            </tr>
          </thead>
          <tbody>
            {dados.itens.map((item) => (
              <tr key={item.idEdital}>
                <td>{item.tituloEdital}</td>
                <td>{item.anoEdital}</td>
                <td>{item.valorTotalEditalBrl}</td>
                <td>{item.valorInvestidoFilmeBrl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

async function EstatisticasElencoSection({ id }: { id: number }) {
  const dados = await obterEstatisticasElenco(id);
  return (
    <section style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <h2>US03: Estatísticas do Elenco</h2>
      <p>
        <strong>Total do elenco:</strong>{" "}
        {dados.temDadosElenco ? dados.totalElenco : "Dado não disponível / Não informado"}
      </p>
      <p>
        <strong>Atrizes:</strong>{" "}
        {dados.temDadosElenco ? dados.atrizes : "Dado não disponível / Não informado"}
      </p>
      <p>
        <strong>Nordestinos no elenco:</strong>{" "}
        {dados.temDadosElenco ? dados.nordestinos : "Dado não disponível / Não informado"}
      </p>
      {dados.elenco.length > 0 && (
        <table border={1} cellPadding={6} style={{ borderCollapse: "collapse", width: "100%", marginTop: "0.5rem" }}>
          <thead>
            <tr style={{ background: "#f9f9f9" }}>
              <th>Nome</th>
              <th>Função</th>
              <th>Gênero</th>
              <th>Nordestino?</th>
            </tr>
          </thead>
          <tbody>
            {dados.elenco.map((m) => (
              <tr key={m.idPessoa}>
                <td>{m.nome}</td>
                <td>{m.funcao}</td>
                <td>{m.genero ?? "[null]"}</td>
                <td>{m.flagEhNordestino === null ? "[null]" : m.flagEhNordestino ? "Sim" : "Não"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

async function CineastasFemininasSection({ id }: { id: number }) {
  const dados = await listarCineastasFemininas(id);
  return (
    <section style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <h2>US04: Cineastas Femininas</h2>
      <p>
        <strong>Total de cineastas femininas:</strong> {dados.total}
      </p>
      {!dados.temCineastasFemininas ? (
        <p>Nenhuma cineasta feminina registrada.</p>
      ) : (
        <table border={1} cellPadding={6} style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ background: "#f9f9f9" }}>
              <th>Nome</th>
              <th>Função</th>
            </tr>
          </thead>
          <tbody>
            {dados.cineastas.map((c) => (
              <tr key={c.idPessoa}>
                <td>{c.nome}</td>
                <td>{c.funcao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

async function PremiacoesSection({ id }: { id: number }) {
  const dados = await listarPremiacoes(id);
  return (
    <section style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <h2>US05: Premiações e Reconhecimento</h2>
      <p>
        <strong>Total de premiações ganhas:</strong> {dados.totalGanhas}
      </p>
      <p>
        <strong>Total de indicações:</strong> {dados.totalIndicacoes}
      </p>
      {!dados.temPremiacoes ? (
        <p>Nenhuma premiação registrada.</p>
      ) : (
        <>
          <h3>Principais Premiações (Destaques)</h3>
          {dados.principais.length === 0 ? (
            <p>Nenhuma premiação classificada como principal registrada.</p>
          ) : (
            <table border={1} cellPadding={6} style={{ borderCollapse: "collapse", width: "100%", marginBottom: "1rem" }}>
              <thead>
                <tr style={{ background: "#f9f9f9" }}>
                  <th>Prêmio</th>
                  <th>Ano / Edição</th>
                  <th>Categoria</th>
                  <th>Resultado</th>
                  <th>Nível</th>
                </tr>
              </thead>
              <tbody>
                {dados.principais.map((p) => (
                  <tr key={p.idFilmePremiacao}>
                    <td>{p.nomePremiacao}</td>
                    <td>{p.edicaoAno === -1 ? "-1 (Não informado)" : p.edicaoAno}</td>
                    <td>{p.categoriaPremiacao ?? "[null]"}</td>
                    <td><strong>{p.resultado}</strong></td>
                    <td>
                      Nível {p.nivelImportancia} {p.flagNacional ? "(Nacional)" : "(Internacional)"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <h3>Todas as Premiações ({dados.todas.length})</h3>
          <table border={1} cellPadding={6} style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr style={{ background: "#f9f9f9" }}>
                <th>Prêmio</th>
                <th>Ano / Edição</th>
                <th>Categoria</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {dados.todas.map((p) => (
                <tr key={p.idFilmePremiacao}>
                  <td>{p.nomePremiacao}</td>
                  <td>{p.edicaoAno === -1 ? "-1" : p.edicaoAno}</td>
                  <td>{p.categoriaPremiacao ?? "[null]"}</td>
                  <td>{p.resultado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}

export default async function FilmeDetalhePage({ params }: Props) {
  const { id } = await params;
  const numId = Number.parseInt(id, 10);

  if (Number.isNaN(numId) || numId <= 0) {
    notFound();
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <p>
        <Link href="/filmes">← Voltar para lista de filmes</Link> |{" "}
        <a href={`/api/filmes/${numId}`} target="_blank" rel="noreferrer">
          Ver endpoint JSON (/api/filmes/{numId})
        </a>
      </p>

      <h1>Visualizador de Consultas do Filme #{numId}</h1>

      <Suspense fallback={<p>Carregando US01 (Ficha do Filme)...</p>}>
        <FichaFilmeSection id={numId} />
      </Suspense>

      <Suspense fallback={<p>Carregando US02 (Incentivo Público)...</p>}>
        <IncentivoPublicoSection id={numId} />
      </Suspense>

      <Suspense fallback={<p>Carregando US03 (Estatísticas do Elenco)...</p>}>
        <EstatisticasElencoSection id={numId} />
      </Suspense>

      <Suspense fallback={<p>Carregando US04 (Cineastas Femininas)...</p>}>
        <CineastasFemininasSection id={numId} />
      </Suspense>

      <Suspense fallback={<p>Carregando US05 (Premiações)...</p>}>
        <PremiacoesSection id={numId} />
      </Suspense>
    </main>
  );
}
