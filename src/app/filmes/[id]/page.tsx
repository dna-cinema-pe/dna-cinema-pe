import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  obterFilme,
  listarIncentivos,
  obterEstatisticasElenco,
  listarCineastasFemininas,
  listarPremiacoes,
} from "@/server/filmes.ts";
import { NAO_DISPONIVEL } from "@/lib/utils.ts";

// Convenção do schema: -1 em campo numérico significa "sem informação".
const formatarAno = (ano: number) => (ano > 0 ? ano : NAO_DISPONIVEL);

const formatarBrl =(valor: string | number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(valor));

interface Props {
  params: Promise<{ id: string }>;
}

// Em telas estreitas a tabela rola dentro da própria área, sem alargar a página.
// A região é focável para quem navega por teclado.
function TabelaRolavel({ descricao, children }: { descricao: string; children: ReactNode }) {
  return (
    <div role="region" aria-label={descricao} tabIndex={0} style={{ overflowX: "auto" }}>
      {children}
    </div>
  );
}

async function FichaFilmeSection({ id }: { id: number }) {
  const filme = await obterFilme(id);
  if (!filme) return notFound();

  return (
    <>
      <h1>{filme.titulo}</h1>

      <section
        aria-labelledby="ficha-do-filme"
        style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}
      >
        <h2 id="ficha-do-filme">Ficha do filme</h2>
        <TabelaRolavel descricao="Ficha do filme">
          <table border={1} cellPadding={6} style={{ borderCollapse: "collapse", width: "100%" }}>
            <tbody>
              <tr><th scope="row" style={{ width: "200px" }}>Título</th><td><strong>{filme.titulo}</strong></td></tr>
              <tr><th scope="row">Ano</th><td>{filme.ano}</td></tr>
              <tr><th scope="row">Gênero</th><td>{filme.genero ?? NAO_DISPONIVEL}</td></tr>
              <tr><th scope="row">Classificação indicativa</th><td>{filme.classificacaoIndicativa ?? NAO_DISPONIVEL}</td></tr>
              <tr><th scope="row">Cidade de filmagem</th><td>{filme.cidadeFilmagem ?? NAO_DISPONIVEL}</td></tr>
              <tr><th scope="row">Sinopse</th><td>{filme.sinopse ?? NAO_DISPONIVEL}</td></tr>
              <tr>
                <th scope="row">Pôster</th>
                <td>
                  {filme.posterUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={filme.posterUrl}
                      alt={filme.posterAlt ?? `Pôster do filme ${filme.titulo}`}
                      style={{ width: "200px", maxWidth: "100%", height: "auto" }}
                    />
                  ) : (
                    NAO_DISPONIVEL
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </TabelaRolavel>
      </section>
    </>
  );
}

async function IncentivoPublicoSection({ id }: { id: number }) {
  const dados = await listarIncentivos(id);
  return (
    <section
      aria-labelledby="incentivo-publico"
      style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}
    >
      <h2 id="incentivo-publico">Incentivo público e editais</h2>
      <p>
        <strong>Status:</strong>{" "}
        {dados.temIncentivo
          ? "Possui incentivo público registrado"
          : "Não há registro de incentivo financeiro público"}
      </p>
      <p>
        <strong>Total investido:</strong> {formatarBrl(dados.totalInvestido)}
      </p>
      {dados.itens.length > 0 && (
        <TabelaRolavel descricao="Editais que apoiaram o filme">
          <table border={1} cellPadding={6} style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr style={{ background: "#f9f9f9" }}>
                <th scope="col">Edital</th>
                <th scope="col">Ano</th>
                <th scope="col">Total do edital</th>
                <th scope="col">Investido no filme</th>
              </tr>
            </thead>
            <tbody>
              {dados.itens.map((item) => (
                <tr key={item.idEdital}>
                  <td>{item.tituloEdital}</td>
                  <td>{item.anoEdital}</td>
                  <td>{formatarBrl(item.valorTotalEditalBrl)}</td>
                  <td>{formatarBrl(item.valorInvestidoFilmeBrl)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabelaRolavel>
      )}
    </section>
  );
}

async function EstatisticasElencoSection({ id }: { id: number }) {
  const dados = await obterEstatisticasElenco(id);
  return (
    <section
      aria-labelledby="estatisticas-do-elenco"
      style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}
    >
      <h2 id="estatisticas-do-elenco">Estatísticas do elenco</h2>
      <p>
        <strong>Total do elenco:</strong>{" "}
        {dados.temDadosElenco ? dados.totalElenco : NAO_DISPONIVEL}
      </p>
      <p>
        <strong>Atrizes:</strong>{" "}
        {dados.temDadosElenco ? dados.atrizes : NAO_DISPONIVEL}
      </p>
      <p>
        <strong>Nordestinos no elenco:</strong>{" "}
        {dados.temDadosElenco ? dados.nordestinos : NAO_DISPONIVEL}
      </p>
      {dados.elenco.length > 0 && (
        <TabelaRolavel descricao="Pessoas do elenco">
          <table border={1} cellPadding={6} style={{ borderCollapse: "collapse", width: "100%", marginTop: "0.5rem" }}>
            <thead>
              <tr style={{ background: "#f9f9f9" }}>
                <th scope="col">Nome</th>
                <th scope="col">Função</th>
                <th scope="col">Gênero</th>
                <th scope="col">Nordestino?</th>
              </tr>
            </thead>
            <tbody>
              {dados.elenco.map((m) => (
                <tr key={m.idPessoa}>
                  <td>{m.nome}</td>
                  <td>{m.funcao}</td>
                  <td>{m.genero ?? NAO_DISPONIVEL}</td>
                  <td>{m.flagEhNordestino === null ? NAO_DISPONIVEL : m.flagEhNordestino ? "Sim" : "Não"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabelaRolavel>
      )}
    </section>
  );
}

async function CineastasFemininasSection({ id }: { id: number }) {
  const dados = await listarCineastasFemininas(id);
  return (
    <section
      aria-labelledby="cineastas-femininas"
      style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}
    >
      <h2 id="cineastas-femininas">Cineastas femininas</h2>
      <p>
        <strong>Total de cineastas femininas:</strong> {dados.total}
      </p>
      {!dados.temCineastasFemininas ? (
        <p>Nenhuma cineasta feminina registrada.</p>
      ) : (
        <TabelaRolavel descricao="Cineastas femininas do filme">
          <table border={1} cellPadding={6} style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr style={{ background: "#f9f9f9" }}>
                <th scope="col">Nome</th>
                <th scope="col">Função</th>
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
        </TabelaRolavel>
      )}
    </section>
  );
}

async function PremiacoesSection({ id }: { id: number }) {
  const dados = await listarPremiacoes(id);
  return (
    <section
      aria-labelledby="premiacoes-e-reconhecimento"
      style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}
    >
      <h2 id="premiacoes-e-reconhecimento">Premiações e reconhecimento</h2>
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
          <h3>Principais premiações</h3>
          {dados.principais.length === 0 ? (
            <p>Nenhuma premiação classificada como principal registrada.</p>
          ) : (
            <TabelaRolavel descricao="Principais premiações do filme">
              <table border={1} cellPadding={6} style={{ borderCollapse: "collapse", width: "100%", marginBottom: "1rem" }}>
                <thead>
                  <tr style={{ background: "#f9f9f9" }}>
                    <th scope="col">Prêmio</th>
                    <th scope="col">Ano / Edição</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Resultado</th>
                    <th scope="col">Nível</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.principais.map((p) => (
                    <tr key={p.idFilmePremiacao}>
                      <td>{p.nomePremiacao}</td>
                      <td>{formatarAno(p.edicaoAno)}</td>
                      <td>{p.categoriaPremiacao ?? NAO_DISPONIVEL}</td>
                      <td><strong>{p.resultado}</strong></td>
                      <td>
                        Nível {p.nivelImportancia} {p.flagNacional ? "(Nacional)" : "(Internacional)"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabelaRolavel>
          )}

          <h3>Todas as premiações ({dados.todas.length})</h3>
          <TabelaRolavel descricao="Todas as premiações do filme">
            <table border={1} cellPadding={6} style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr style={{ background: "#f9f9f9" }}>
                  <th scope="col">Prêmio</th>
                  <th scope="col">Ano / Edição</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Resultado</th>
                </tr>
              </thead>
              <tbody>
                {dados.todas.map((p) => (
                  <tr key={p.idFilmePremiacao}>
                    <td>{p.nomePremiacao}</td>
                    <td>{formatarAno(p.edicaoAno)}</td>
                    <td>{p.categoriaPremiacao ?? NAO_DISPONIVEL}</td>
                    <td>{p.resultado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabelaRolavel>
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
    <main style={{ padding: "2rem" }}>
      <nav aria-label="Atalhos da página">
        <p>
          <Link href="/filmes">← Voltar para o catálogo de filmes</Link> |{" "}
          <a
            href={`/api/filmes/${numId}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Dados em JSON deste filme (abre em nova aba)"
          >
            Dados em JSON deste filme
          </a>
        </p>
      </nav>

      <Suspense fallback={<p>Carregando a ficha do filme...</p>}>
        <FichaFilmeSection id={numId} />
      </Suspense>

      <Suspense fallback={<p>Carregando o incentivo público...</p>}>
        <IncentivoPublicoSection id={numId} />
      </Suspense>

      <Suspense fallback={<p>Carregando as estatísticas do elenco...</p>}>
        <EstatisticasElencoSection id={numId} />
      </Suspense>

      <Suspense fallback={<p>Carregando as cineastas femininas...</p>}>
        <CineastasFemininasSection id={numId} />
      </Suspense>

      <Suspense fallback={<p>Carregando as premiações...</p>}>
        <PremiacoesSection id={numId} />
      </Suspense>
    </main>
  );
}
