# Dados de Carga e Ingestão (`data/`)

Esta pasta armazena os arquivos JSON que alimentam o banco de dados PostgreSQL (Supabase) por meio do script [`prisma/seed.ts`](../prisma/seed.ts) (`npm run seed`).

Cada arquivo corresponde diretamente a uma tabela do modelo relacional definido em [`prisma/schema.prisma`](../prisma/schema.prisma). Para garantir legibilidade em Pull Requests e independência de IDs sequenciais do banco, os relacionamentos utilizam **chaves naturais** (`chave` do filme, `nome` da pessoa, `nomePremiacao` e `chave` do edital), que são resolvidas em tempo de execução pelo seed via *upsert* idempotente.

---

## 1. Evolução da Carga: Carga Inicial vs. Carga Atual

Na primeira extração realizada a partir do board FigJam (*TOPICOS PARA PESQUISAR*), diversos campos estavam ausentes (`null` ou `-1`) porque os post-its originais continham apenas anotações parciais ou imagens estáticas sem texto extraível.

Na revisão e expansão atual da base, todas as lacunas foram preenchidas com dados históricos verificados (Cinemateca Pernambucana, Cinemateca Brasileira, ANCINE/FSA, Fundarpe/Funcultura e catálogos oficiais de festivais), além da inclusão de 13 novas obras fundamentais **exclusivamente do Cinema Pernambucano**.

### Comparativo Quantitativo e Qualitativo

| Arquivo | Tabela | Carga Inicial | Carga Atual | Evolução | Principais Mudanças |
| :--- | :--- | :---: | :---: | :---: | :--- |
| [`filmes.json`](./filmes.json) | `filme` | 21 | **34** | **+13** (+62%) | Preenchimento de 100% dos campos `genero`, `cidadeFilmagem`, `classificacaoIndicativa`, `posterUrl` e `posterAlt` + adição de 13 obras do cinema pernambucano. |
| [`pessoas.json`](./pessoas.json) | `pessoa` | 15 | **64** | **+49** (+327%) | Preenchimento de `idade`, `genero` e `flagEhNordestino` (antes 100% nulos/`-1`) + inclusão de diretoras mulheres, elenco, roteiristas, produtores e fotógrafos. |
| [`premiacoes.json`](./premiacoes.json) | `premiacao` | 48 | **50** | **+2** (+4%) | Preenchimento das 31 descrições que estavam `null` + inclusão do *Festival de San Sebastián* e do *Festival de Guadalajara*. |
| [`editais.json`](./editais.json) | `edital` | 0 | **12** | **+12** (Novo) | Criação de 12 editais estaduais (Funcultura PE) e federais (FSA/ANCINE, Petrobras Cultural, Lei do Audiovisual e Prêmio Resgate MinC). |
| [`filme_pessoa.json`](./filme_pessoa.json) | `filme_pessoa` | 26 | **152** | **+126** (+485%) | Expansão de vínculos: antes restrito apenas a `DIRECAO`; agora contempla `DIRECAO`, `ELENCO`, `ROTEIRO`, `PRODUCAO` e `FOTOGRAFIA`. |
| [`filme_premiacao.json`](./filme_premiacao.json) | `filme_premiacao` | 112 | **191** | **+79** (+71%) | Substituição de todos os `edicaoAno: -1` pelos anos reais, correção de categorias nulas, inclusão de prêmios omitidos e atualização da temporada 2025/2026. |
| [`filme_edital.json`](./filme_edital.json) | `filme_edital` | 0 | **46** | **+46** (Novo) | Mapeamento de 46 aportes financeiros públicos vinculados aos filmes pernambucanos do acervo, respeitando o teto orçamentário de cada edital. |

---

## 2. O que foi corrigido nos registros originais

1. **Filmes sem gênero, cidade de filmagem, classificação ou pôster (`filmes.json`):**
   - **Antes:** 8 dos 21 filmes estavam com `genero: null`; 18 dos 21 estavam com `cidadeFilmagem: null`; e todos os 21 estavam com `classificacaoIndicativa: null`, `posterUrl: null` e `posterAlt: null`.
   - **Depois:** Todos os filmes originais tiveram seu gênero catalogado (ex.: *Baile Perfumado* como `Drama / Histórico`, *O Som ao Redor* como `Drama / Suspense`, *O Agente Secreto* como `Thriller político / Drama`), sua principal cidade de filmagem identificada em Pernambuco (Recife, Camaragibe, Arcoverde, Petrolina, Toritama, Sertânia), classificação indicativa oficial (`L`, `12`, `14`, `16`, `18`) e texto alternativo descritivo (`posterAlt`).

2. **Pessoas sem dados demográficos e ausência de elenco (`pessoas.json` e `filme_pessoa.json`):**
   - **Antes:** Todos os 15 registros tinham `idade: -1`, `genero: null` e `flagEhNordestino: null`, e só havia diretores homens listados.
   - **Depois:** Os dados biográficos de todos os profissionais foram preenchidos com base em suas biografias públicas e locais de nascimento documentados (diferenciando naturais do Nordeste, como *Kleber Mendonça Filho*, *Cláudio Assis*, *Gabriel Mascaro*, *Renata Pinheiro*, *Irandhir Santos*, *Hermila Guedes* e *Jesuíta Barbosa*, de profissionais nascidos em outras regiões que atuaram no cinema pernambucano, como *Alberto Cavalcanti*, *Sonia Braga*, *Maeve Jinkings* e *Matheus Nachtergaele*).

3. **Filmes históricos sem prêmios registrados e anos `-1` (`filme_premiacao.json`):**
   - **Antes:** Obras consagradas como *Baile Perfumado* (1996), *O Rap do Pequeno Príncipe Contra as Almas Sebosas* (2000), *Amarelo Manga* (2002), *O Som ao Redor* (2012) e *Era Uma Vez Eu, Verônica* (2012) não possuíam nenhum prêmio vinculado no JSON, e quase todas as demais linhas traziam `edicaoAno: -1`.
   - **Depois:** Foram adicionadas as conquistas históricas dessas obras (Festival de Brasília, Festival de Rotterdam, Festival do Rio, Festival de Gramado, Cine Ceará, San Sebastián, etc.), todos os `edicaoAno` receberam o ano exato da cerimônia, e os registros de *O Agente Secreto* foram atualizados com os resultados de Cannes 2025 e da temporada de premiações de 2026 (incluindo as vitórias no Globo de Ouro 2026).

---

## 3. Novos Filmes do Cinema Pernambucano Adicionados ao Acervo (+13 Obras)

Para tornar o banco mais robusto e representativo de todas as mesorregiões de Pernambuco (Metropolitana, Zona da Mata, Agreste e Sertão), foram incorporados 13 filmes pernambucanos:

| Chave | Título | Ano | Direção | Município de Filmagem (PE) | Destaque no Cinema Pernambucano |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `lisbela-e-o-prisioneiro-2003` | *Lisbela e o Prisioneiro* | 2003 | Guel Arraes | Igarassu | Baseado na obra do pernambucano Osman Lins e dirigido pelo recifense Guel Arraes; vencedor de 2 Grandes Otelo. |
| `deserto-feliz-2007` | *Deserto Feliz* | 2007 | Paulo Caldas | Recife | Produzido em Pernambuco, vencedor de 5 Kikitos em Gramado, premiado em Guadalajara e exibido em Berlim. |
| `amor-plastico-e-barulho-2013` | *Amor, Plástico e Barulho* | 2013 | Renata Pinheiro | Recife | Retrato da cena brega recifense dirigido pela cineasta pernambucana Renata Pinheiro; 3 prêmios no Festival de Brasília. |
| `a-historia-da-eternidade-2014` | *A História da Eternidade* | 2014 | Camilo Cavalcante | Floresta | Rodado no Sertão de Pernambuco, consagrado no Festival de Paulínia, Grande Prêmio do Cinema Brasileiro e Rotterdam. |
| `ventos-de-agosto-2014` | *Ventos de Agosto* | 2014 | Gabriel Mascaro | Tamandaré | Filmado no litoral sul de Pernambuco, premiado nos festivais de Locarno, Gramado e Brasília. |
| `a-luneta-do-tempo-2014` | *A Luneta do Tempo* | 2014 | Alceu Valença | Paudalho | Dirigido pelo pernambucano Alceu Valença na Zona da Mata de PE; vencedor de 2 Kikitos no Festival de Gramado. |
| `big-jato-2015` | *Big Jato* | 2015 | Cláudio Assis | Pesqueira | Rodado no Agreste pernambucano; grande vencedor do Festival de Brasília (Melhor Filme, Ator e Roteiro). |
| `azougue-nazare-2018` | *Azougue Nazaré* | 2018 | Tiago Melo | Nazaré da Mata | Protagonizado pelo Maracatu de Baque Solto da Zona da Mata Norte; vencedor em Rotterdam (Bright Future) e no Festival do Rio. |
| `divino-amor-2019` | *Divino Amor* | 2019 | Gabriel Mascaro | Recife | Ficção científica distópica ambientada e filmada no Recife; selecionada para Sundance, Berlim e premiada em Guadalajara. |
| `piedade-2019` | *Piedade* | 2019 | Cláudio Assis | Jaboatão dos Guararapes | Aborda os impactos socioambientais no litoral sul pernambucano; vencedor de 3 prêmios no Festival de Brasília. |
| `carro-rei-2021` | *Carro Rei* | 2021 | Renata Pinheiro | Caruaru | Ficção científica agrestina vencedora de 4 Kikitos no Festival de Gramado (incluindo Melhor Filme) e selecionada em Rotterdam. |
| `paloma-2022` | *Paloma* | 2022 | Marcelo Gomes | Ilha de Itamaracá | Produzido pela Carnaval Filmes (Recife); vencedor de Melhor Filme e Melhor Atriz (Kika Sena) no Festival do Rio. |
| `propriedade-2022` | *Propriedade* | 2022 | Daniel Bandeira | São José da Coroa Grande | Thriller social pernambucano selecionado para o Festival de Berlim e premiado no Festival do Rio. |

---

## 4. Cobertura das User Stories (US01 a US06)

Com a reformulação dos dados, todas as histórias de usuário do sistema contam agora com massa de dados completa para consultas, filtros e visualizações gráficas:

- **US01 (Acervo, Linha do Tempo e Acessibilidade):** 34 filmes do cinema pernambucano (de 1923 a 2025) com sinopse, gênero, classificação indicativa, `posterUrl` e texto alternativo descritivo (`posterAlt`).
- **US02 (Fomento Público e Editais):** 12 editais estaduais (**Funcultura Audiovisual PE**) e federais (**FSA/ANCINE**, **Petrobras Cultural**, **Lei do Audiovisual**, **Prêmio Resgate**) somando 46 aportes em filmes pernambucanos.
- **US03 (Participação de Atores e Profissionais Nordestinos):** 64 pessoas cadastradas com `flagEhNordestino` verificado e 152 vínculos em `filme_pessoa.json` cobrindo elenco e equipe criativa.
- **US04 (Participação Feminina na Direção e no Elenco):** Presença de mulheres cineastas (*Renata Pinheiro*, *Nara Normande*), produtoras (*Emilie Lesclaux*) e amplo elenco feminino (*Hermila Guedes*, *Maeve Jinkings*, *Marcélia Cartaxo*, *Sonia Braga*, *Fernanda Montenegro*, *Dira Paes*, *Kika Sena*, *Nash Laila*, *Bárbara Colen*, *Dandara de Morais*, *Malu Galli*), com `genero` 100% preenchido.
- **US05 (Premiações e Reconhecimento Nacional/Internacional):** 50 premiações categorizadas por nível de importância (`1` = principal, `2` = relevante, `3` = demais) e 191 registros em `filme_premiacao.json` diferenciando `VENCEDOR` e `INDICADO`.
- **US06 (Distribuição Geográfica e Locações em Pernambuco):** Locações mapeadas em todas as regiões de Pernambuco: Capital (`Recife`), Região Metropolitana (`Camaragibe`, `Jaboatão dos Guararapes`, `Igarassu`, `Ilha de Itamaracá`), Zona da Mata (`Nazaré da Mata`, `Paudalho`, `São José da Coroa Grande`), Agreste (`Caruaru`, `Toritama`, `Pesqueira`) e Sertão (`Arcoverde`, `Petrolina`, `Floresta`, `Sertânia`).

---

## 5. Regras de Integridade Garantidas pelo Seed

Ao executar `npm run seed`, o script [`prisma/seed.ts`](../prisma/seed.ts) valida automaticamente:
1. **Teto Orçamentário de Editais (US02):** A soma de `valorInvestidoFilmeBrl` em `filme_edital.json` para cada edital nunca ultrapassa o `valorTotalBrl` definido em `editais.json`.
2. **Integridade Referencial:** Todos os vínculos exigem correspondência exata das chaves naturais em `filmes.json`, `pessoas.json`, `premiacoes.json` e `editais.json`.
3. **Unicidade e Idempotência:** O seed utiliza *upserts* baseados nas constraints únicas do banco, permitindo rodar `npm run seed` múltiplas vezes sem duplicar registros.

---

## 6. Atualização a partir de `analise-design-vs-banco.md`

Rodada de ajustes motivada pelo documento `analise-design-vs-banco.md` (raiz do repositório), que compara o protótipo do design com o banco:

- **Novas colunas em `pessoa`:** `naturalidade` (UF, "EX" para nascidos fora do Brasil) e `flagEhPernambucano` (nordestino não é sinônimo de pernambucano — item 3 da análise). Habilitam o gráfico real de "pernambucanos x outros" no acervo, no lugar do placeholder fixo.
- **Novos filmes:** *O Último Azul* (2024, dir. Gabriel Mascaro, Urso de Prata — Grande Prêmio do Júri na Berlinale 2025) e *Manas* (2024, dir. Marianna Brennand, filmado no Marajó/PA, indicado a Melhor Filme Ibero-Americano no Goya 2026 como representante do Brasil). Nenhum dos dois foi filmado em Pernambuco nem foi submissão oficial do Brasil ao Oscar — ver nota abaixo.
- **Funções SOM e MONTAGEM:** adicionados vínculos reais de montagem (*Baile Perfumado*, *Aquarius*, *Bacurau*, *O Agente Secreto*) e som (*O Agente Secreto*), que antes só cobriam direção, elenco, roteiro, produção e fotografia (item 10 da análise).
- **Não cadastrado (fontes insuficientes):** os ~10 longas adicionais do Ciclo do Recife (1923–1931) que o design cita como "treze longas" não têm fonte cruzada e confiável o bastante para entrar no banco com segurança — ficaram só 3 (os já existentes). Ver item 6 da análise.
- **Conferido (item 9 da análise):** a afirmação de que "Pernambuco representou o Brasil três vezes nos sonhos do Oscar" via *O Último Azul* e *Manas* não se confirma — nenhum dos dois foi submissão oficial brasileira; *Manas* disputou a vaga internamente e perdeu para *O Agente Secreto*, a única submissão real entre os filmes recentes do acervo. O texto da landing (design) mantém a afirmação original e precisa de revisão por quem edita esse conteúdo.
