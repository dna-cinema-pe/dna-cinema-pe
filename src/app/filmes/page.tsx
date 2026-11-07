import Link from "next/link";
import { listarFilmes } from "@/server/filmes.ts";
import { NAO_DISPONIVEL } from "@/lib/utils.ts";

export default async function FilmesPage() {
  const filmes = await listarFilmes();

  return (
    <main className="min-h-screen bg-black text-zinc-100 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5">
          <div>
            <Link
              href="/"
              className="text-xs text-zinc-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1 mb-2"
            >
              ← Voltar para a Home
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Catálogo de Filmes
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Acervo histórico do cinema pernambucano (US06)
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300">
              Total no acervo: <strong className="ml-1 text-white">{filmes.length}</strong>
            </span>
            <a
              href="/api/filmes"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 transition-colors"
            >
              Exportar JSON
            </a>
          </div>
        </div>

        {/* Tabela de Filmes */}
        {filmes.length === 0 ? (
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-12 text-center text-zinc-500">
            Nenhum filme cadastrado no banco de dados.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/70 shadow-2xl">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-zinc-900/90 border-b border-zinc-800 text-zinc-300 text-xs uppercase tracking-wider font-semibold">
                  <th scope="col" className="py-3.5 px-4 w-28 text-center">
                    Pôster
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    Título
                  </th>
                  <th scope="col" className="py-3.5 px-4 w-20 text-center">
                    Ano
                  </th>
                  <th scope="col" className="py-3.5 px-4 w-44">
                    Gênero
                  </th>
                  <th scope="col" className="py-3.5 px-4 w-40">
                    Cidade Filmagem
                  </th>
                  <th scope="col" className="py-3.5 px-4 w-32 text-center">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filmes.map((filme) => (
                  <tr
                    key={filme.idFilme}
                    className="hover:bg-zinc-900/50 transition-colors group"
                  >
                    {/* Pôster com container uniforme e sem distorcer proporção */}
                    <td className="py-3 px-4">
                      <div className="w-20 h-28 mx-auto bg-zinc-900/90 rounded border border-zinc-800/80 flex items-center justify-center p-1 overflow-hidden shadow-inner">
                        {filme.posterUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={filme.posterUrl}
                            alt={filme.posterAlt ?? `Pôster do filme ${filme.titulo}`}
                            className="w-full h-full object-contain rounded-sm"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-[10px] text-zinc-500 text-center leading-tight">
                            <span className="text-base mb-0.5">🎬</span>
                            <span>Sem cartaz</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Título */}
                    <td className="py-3 px-4">
                      <Link
                        href={`/filmes/${filme.idFilme}`}
                        className="font-medium text-white group-hover:text-amber-400 transition-colors text-base"
                      >
                        {filme.titulo}
                      </Link>
                    </td>

                    {/* Ano */}
                    <td className="py-3 px-4 text-center">
                      <span className="inline-block px-2 py-0.5 rounded font-mono text-xs bg-zinc-900 text-zinc-300 border border-zinc-800">
                        {filme.ano}
                      </span>
                    </td>

                    {/* Gênero */}
                    <td className="py-3 px-4 text-zinc-300">
                      {filme.genero ? (
                        <span>{filme.genero}</span>
                      ) : (
                        <span className="text-zinc-600 italic">{NAO_DISPONIVEL}</span>
                      )}
                    </td>

                    {/* Cidade Filmagem */}
                    <td className="py-3 px-4 text-zinc-300">
                      {filme.cidadeFilmagem ? (
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                          {filme.cidadeFilmagem}
                        </span>
                      ) : (
                        <span className="text-zinc-600 italic">{NAO_DISPONIVEL}</span>
                      )}
                    </td>

                    {/* Ações */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/filmes/${filme.idFilme}`}
                          className="px-2.5 py-1.5 rounded bg-zinc-800 hover:bg-amber-500 hover:text-black font-medium text-xs text-zinc-200 transition-colors shadow-sm"
                        >
                          Detalhes
                        </Link>
                        <a
                          href={`/api/filmes/${filme.idFilme}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 font-mono text-xs text-zinc-400 hover:text-zinc-200 transition-colors border border-zinc-800"
                          title="Ver resposta JSON da API"
                        >
                          JSON
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
