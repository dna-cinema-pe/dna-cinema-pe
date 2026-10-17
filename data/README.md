# Dados de carga inicial

Arquivos JSON lidos por `prisma/seed.ts` (`npm run seed`). Cada arquivo corresponde a uma
tabela; os vínculos usam chaves naturais (`chave` do filme, `nome` da pessoa,
`nomePremiacao`) em vez de IDs, que são atribuídos pelo banco.

| Arquivo | Tabela | Registros |
| --- | --- | --- |
| `filmes.json` | `filme` | 21 |
| `pessoas.json` | `pessoa` | 15 |
| `premiacoes.json` | `premiacao` | 48 |
| `filme_pessoa.json` | `filme_pessoa` | 26 |
| `filme_premiacao.json` | `filme_premiacao` | 112 |
| `editais.json` | `edital` | 0 |
| `filme_edital.json` | `filme_edital` | 0 |

## Procedência

**Fonte primária** — board FigJam *TOPICOS PARA PESQUISAR*, seção "Filmes para a narrativa"
(`figma.com/board/c27gdkgwrXxWSJ2mGajIxu`). A linha do tempo traz 21 filmes numerados, de
1923 a 2025, cada um com Ano, Gênero, Direção, Descrição/sinopse, Principais prêmios,
Indicações e Festivais.

**Fonte secundária** — documento *O DNA do Cinema Pernambucano – Filmes importantes*,
usado apenas para o campo `cidade_filmagem`, que o board não registra, e somente onde o
documento é explícito: `A Filha do Advogado` e `O Agente Secreto` (ambos Recife).
`Retratos Fantasmas` recebeu Recife a partir do próprio board, que descreve o documentário
sobre os cinemas do centro do Recife.

## Convenções

Conforme a modelagem aprovada: campo numérico sem informação recebe `-1`; campo de texto ou
booleano sem informação fica `null`. **Nada é inferido** — em especial `genero`, `idade` e
`flag_eh_nordestino` das pessoas, que o board não informa e que a US03 proíbe estimar.

`resultado` em `filme_premiacao` segue a origem no board: o que estava sob *Principais
prêmios* virou `VENCEDOR`; o que estava sob *Indicações e Festivais* virou `INDICADO`.
Participação em festival sem prêmio foi registrada como `INDICADO` com
`categoria_premiacao = "Seleção oficial"`, por ser o valor mais próximo permitido pelo
domínio de duas opções.

`edicao_ano` recebe `-1` quando o board não informa o ano da edição — a maior parte dos
casos, já que os post-its em geral citam o prêmio sem o ano.

## Lacunas conhecidas

- **`edital` e `filme_edital` estão vazios.** A seção "PESQUISA - RECORTE DA NARRATIVA /
  Recursos públicos" do board é composta de imagens coladas (prints de planilhas e
  gráficos), das quais não há texto extraível. A **US02 fica sem dados** até que os valores
  sejam levantados na Ancine, no OCA ou no Portal da Transparência PE.
- **`poster_url`, `poster_alt` e `classificacao_indicativa` são `null` em todos os filmes** —
  o board não traz esses dados. A US01 exige pôster com texto alternativo descritivo.
- **Elenco não registrado.** `filme_pessoa` contém apenas direção, única função que o board
  informa. As **US03 e US04 ficam sem dados de elenco**; a US04 só consegue contar cineastas
  depois que `pessoa.genero` for preenchido.
- `Árido Movie` aparece no board como "2005/2006"; registrado como `2005`.
- `Cinema, Aspirinas e Urubus` foi filmado no sertão e no Cariri **da Paraíba**, não em
  Pernambuco — o board e o documento complementar destacam isso. Está no acervo por ser de
  um cineasta pernambucano, mas `cidade_filmagem` ficou `null` por não ser município de PE.
- As premiações de `O Agente Secreto` foram transcritas como estão no board, incluindo a
  categoria "Melhor Elenco" do Oscar, que não corresponde a uma categoria existente.
