# Dados de Carga e Ingestão (`data/`)

Esta pasta armazena os arquivos JSON que alimentam o banco de dados PostgreSQL (Supabase) por meio do script [`prisma/seed.ts`](../prisma/seed.ts) (`npm run seed`).

Cada arquivo corresponde diretamente a uma tabela do modelo relacional definido em [`prisma/schema.prisma`](../prisma/schema.prisma). Para garantir legibilidade em Pull Requests e independência de IDs sequenciais do banco, os relacionamentos utilizam **chaves naturais** (`chave` do filme, `nome` da pessoa, `nomePremiacao` e `chave` do edital), que são resolvidas em tempo de execução pelo seed via *upsert* idempotente.

---

## 1. Evolução da Carga: Carga Inicial vs. Carga Atual

Na primeira extração realizada a partir do board FigJam (*TOPICOS PARA PESQUISAR*), diversos campos estavam ausentes (`null` ou `-1`) porque os post-its originais continham apenas anotações parciais ou imagens estáticas sem texto extraível.

Na revisão e expansão atual da base, todas as lacunas foram preenchidas com dados históricos verificados (Cinemateca Brasileira, ANCINE/FSA, Fundarpe/Funcultura e catálogos oficiais de festivais), além da inclusão de novas obras fundamentais de Pernambuco e do Nordeste.

### Comparativo Quantitativo e Qualitativo

| Arquivo | Tabela | Carga Inicial | Carga Atual | Evolução | Principais Mudanças |
| :--- | :--- | :---: | :---: | :---: | :--- |
| [`filmes.json`](./filmes.json) | `filme` | 21 | **38** | **+17** (+81%) | Preenchimento de 100% dos campos `genero`, `cidadeFilmagem`, `classificacaoIndicativa`, `posterUrl` e `posterAlt` + adição de 17 clássicos de PE e do Nordeste. |
| [`pessoas.json`](./pessoas.json) | `pessoa` | 15 | **60** | **+45** (+300%) | Preenchimento de `idade`, `genero` e `flagEhNordestino` (antes 100% nulos/`-1`) + inclusão de diretoras mulheres, elenco, roteiristas, produtores e fotógrafos. |
| [`premiacoes.json`](./premiacoes.json) | `premiacao` | 48 | **50** | **+2** (+4%) | Preenchimento das 31 descrições que estavam `null` + inclusão do *Festival de San Sebastián* e do *Festival de Guadalajara*. |
| [`editais.json`](./editais.json) | `edital` | 0 | **12** | **+12** (Novo) | Criação de 12 editais estaduais (Funcultura PE) e federais (FSA/ANCINE, Petrobras Cultural, Lei do Audiovisual e Prêmio Resgate MinC). |
| [`filme_pessoa.json`](./filme_pessoa.json) | `filme_pessoa` | 26 | **174** | **+148** (+569%) | Expansão de vínculos: antes restrito apenas a `DIRECAO`; agora contempla `DIRECAO`, `ELENCO`, `ROTEIRO`, `PRODUCAO` e `FOTOGRAFIA`. |
| [`filme_premiacao.json`](./filme_premiacao.json) | `filme_premiacao` | 112 | **207** | **+95** (+85%) | Substituição de todos os `edicaoAno: -1` pelos anos reais, correção de categorias nulas, inclusão de prêmios omitidos e atualização da temporada 2025/2026. |
| [`filme_edital.json`](./filme_edital.json) | `filme_edital` | 0 | **43** | **+43** (Novo) | Mapeamento de 43 aportes financeiros públicos vinculados aos filmes do acervo, respeitando o teto orçamentário de cada edital. |

---

## 2. O que foi corrigido nos registros originais

1. **Filmes sem gênero, cidade de filmagem, classificação ou pôster (`filmes.json`):**
   - **Antes:** 8 dos 21 filmes estavam com `genero: null`; 18 dos 21 estavam com `cidadeFilmagem: null`; e todos os 21 estavam com `classificacaoIndicativa: null`, `posterUrl: null` e `posterAlt: null`.
   - **Depois:** Todos os filmes originais tiveram seu gênero catalogado (ex.: *Baile Perfumado* como `Drama / Histórico`, *O Som ao Redor* como `Drama / Suspense`, *O Agente Secreto* como `Thriller político / Drama`), sua principal cidade de filmagem identificada (Recife, Camaragibe, Arcoverde, Petrolina, Toritama, Sertânia, Patos-PB), classificação indicativa oficial (`L`, `12`, `14`, `16`, `18`) e texto alternativo descritivo (`posterAlt`).

2. **Pessoas sem dados demográficos e ausência de elenco (`pessoas.json` e `filme_pessoa.json`):**
   - **Antes:** Todos os 15 registros tinham `idade: -1`, `genero: null` e `flagEhNordestino: null`, e só havia diretores homens listados.
   - **Depois:** Os dados biográficos de todos os profissionais foram preenchidos com base em suas biografias públicas e locais de nascimento documentados (diferenciando naturais do Nordeste, como *Kleber Mendonça Filho*, *Cláudio Assis*, *Karim Aïnouz*, *Irandhir Santos*, *Wagner Moura* e *Marcélia Cartaxo*, de profissionais nascidos em outras regiões que atuaram no cinema nordestino, como *Alberto Cavalcanti*, *Sonia Braga*, *Maeve Jinkings* e *Matheus Nachtergaele*).

3. **Filmes históricos sem prêmios registrados e anos `-1` (`filme_premiacao.json`):**
   - **Antes:** Obras consagradas como *Baile Perfumado* (1996), *O Rap do Pequeno Príncipe Contra as Almas Sebosas* (2000), *Amarelo Manga* (2002), *O Som ao Redor* (2012) e *Era Uma Vez Eu, Verônica* (2012) não possuíam nenhum prêmio vinculado no JSON, e quase todas as demais linhas traziam `edicaoAno: -1`.
   - **Depois:** Foram adicionadas as conquistas históricas dessas obras (Festival de Brasília, Festival de Rotterdam, Festival do Rio, Festival de Gramado, Cine Ceará, San Sebastián, etc.), todos os `edicaoAno` receberam o ano exato da cerimônia, e os registros de *O Agente Secreto* foram atualizados com os resultados de Cannes 2025 e da temporada de premiações de 2026 (incluindo as vitórias no Globo de Ouro 2026).

---

## 3. Novos Filmes Adicionados ao Acervo (+17 Obras)

Para tornar o banco mais robusto e representativo da produção pernambucana e nordestina (do Cinema Novo à produção contemporânea), foram incorporados 17 filmes:

| Chave | Título | Ano | Direção | Cidade / UF de Filmagem | Destaque Histórico |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `o-pagador-de-promessas-1962` | *O Pagador de Promessas* | 1962 | Anselmo Duarte | Salvador (BA) | Único filme brasileiro vencedor da Palma de Ouro em Cannes e indicado ao Oscar. |
| `vidas-secas-1963` | *Vidas Secas* | 1963 | Nelson Pereira dos Santos | Palmeira dos Índios (AL) | Marco inaugural do Cinema Novo no sertão alagoano, premiado em Cannes. |
| `deus-e-o-diabo-na-terra-do-sol-1964` | *Deus e o Diabo na Terra do Sol* | 1964 | Glauber Rocha | Monte Santo (BA) | Obra-prima do Cinema Novo baiano, indicado à Palma de Ouro em Cannes (1964). |
| `o-dragao-da-maldade-1969` | *O Dragão da Maldade contra o Santo Guerreiro* | 1969 | Glauber Rocha | Milagres (BA) | Rendeu a Glauber Rocha o prêmio de Melhor Diretor no Festival de Cannes (1969). |
| `o-auto-da-compadecida-2000` | *O Auto da Compadecida* | 2000 | Guel Arraes | Cabaceiras (PB) | Adaptação da obra de Ariano Suassuna dirigida pelo pernambucano Guel Arraes. |
| `lisbela-e-o-prisioneiro-2003` | *Lisbela e o Prisioneiro* | 2003 | Guel Arraes | Igarassu (PE) | Fenômeno de público rodado em Pernambuco, vencedor de 2 Grandes Otelo. |
| `o-ceu-de-suely-2006` | *O Céu de Suely* | 2006 | Karim Aïnouz | Iguatu (CE) | Grande vencedor do Festival do Rio e de Havana, estrelado pela pernambucana Hermila Guedes. |
| `deserto-feliz-2007` | *Deserto Feliz* | 2007 | Paulo Caldas | Recife (PE) | Premiado em Gramado e Guadalajara, selecionado para o Festival de Berlim. |
| `amor-plastico-e-barulho-2013` | *Amor, Plástico e Barulho* | 2013 | Renata Pinheiro | Recife (PE) | Retrato da cena brega recifense dirigido por Renata Pinheiro, premiado em Brasília. |
| `a-historia-da-eternidade-2014` | *A História da Eternidade* | 2014 | Camilo Cavalcante | Floresta (PE) | Rodado no Sertão do São Francisco, consagrado no Festival de Paulínia e em Rotterdam. |
| `azougue-nazare-2018` | *Azougue Nazaré* | 2018 | Tiago Melo | Nazaré da Mata (PE) | Destaque do Maracatu Rural da Zona da Mata Norte, premiado em Rotterdam e no Rio. |
| `pacarrete-2019` | *Pacarrete* | 2019 | Allan Deberton | Russas (CE) | Vencedor de 8 Kikitos no Festival de Gramado, incluindo Melhor Filme e Melhor Atriz. |
| `piedade-2019` | *Piedade* | 2019 | Cláudio Assis | Jaboatão dos Guararapes (PE) | Premiado no Festival de Brasília, abordando impactos socioambientais no litoral sul de PE. |
| `carro-rei-2021` | *Carro Rei* | 2021 | Renata Pinheiro | Caruaru (PE) | Ficção científica agrestina vencedora de Melhor Filme no Festival de Gramado (2021). |
| `paloma-2022` | *Paloma* | 2022 | Marcelo Gomes | Ilha de Itamaracá (PE) | Vencedor de Melhor Filme e Melhor Atriz (Kika Sena) no Festival do Rio (2022). |
| `sem-coracao-2023` | *Sem Coração* | 2023 | Nara Normande e Tião | Maceió (AL) | Coprodução alagoana-pernambucana selecionada para a Mostra Horizontes do Festival de Veneza. |
| `motel-destino-2024` | *Motel Destino* | 2024 | Karim Aïnouz | Beberibe (CE) | Thriller neonatal nordestino selecionado para a competição principal da Palma de Ouro em Cannes (2024). |

---

## 4. Cobertura das User Stories (US01 a US06)

Com a reformulação dos dados, todas as histórias de usuário do sistema contam agora com massa de dados completa para consultas, filtros e visualizações gráficas:

- **US01 (Acervo, Linha do Tempo e Acessibilidade):** 38 filmes de 1923 a 2025 com sinopse, gênero, classificação indicativa, `posterUrl` e texto alternativo descritivo (`posterAlt`).
- **US02 (Fomento Público e Editais):** 12 editais estaduais (**Funcultura Audiovisual PE**) e federais (**FSA/ANCINE**, **Petrobras Cultural**, **Lei do Audiovisual**, **Prêmio Resgate**) somando 43 aportes em filmes.
- **US03 (Participação de Atores e Profissionais Nordestinos):** 60 pessoas cadastradas com `flagEhNordestino` verificado e 174 vínculos em `filme_pessoa.json` cobrindo elenco e equipe criativa.
- **US04 (Participação Feminina na Direção e no Elenco):** Presença de mulheres cineastas (*Renata Pinheiro*, *Nara Normande*), produtoras (*Emilie Lesclaux*) e amplo elenco feminino (*Hermila Guedes*, *Maeve Jinkings*, *Marcélia Cartaxo*, *Sonia Braga*, *Fernanda Montenegro*, *Dira Paes*, *Kika Sena*, *Nash Laila*, *Bárbara Colen*, *Nataly Rocha*), com `genero` 100% preenchido.
- **US05 (Premiações e Reconhecimento Nacional/Internacional):** 50 premiações categorizadas por nível de importância (`1` = principal, `2` = relevante, `3` = demais) e 207 registros em `filme_premiacao.json` diferenciando `VENCEDOR` e `INDICADO`.
- **US06 (Distribuição Geográfica e Locações):** Locações mapeadas na Capital (`Recife`), Região Metropolitana (`Camaragibe`, `Jaboatão dos Guararapes`, `Igarassu`, `Ilha de Itamaracá`), Zona da Mata (`Nazaré da Mata`), Agreste (`Caruaru`, `Toritama`), Sertão (`Arcoverde`, `Petrolina`, `Floresta`, `Sertânia`) e demais estados do Nordeste (`BA`, `CE`, `PB`, `AL`).

---

## 5. Regras de Integridade Garantidas pelo Seed

Ao executar `npm run seed`, o script [`prisma/seed.ts`](../prisma/seed.ts) valida automaticamente:
1. **Teto Orçamentário de Editais (US02):** A soma de `valorInvestidoFilmeBrl` em `filme_edital.json` para cada edital nunca ultrapassa o `valorTotalBrl` definido em `editais.json`.
2. **Integridade Referencial:** Todos os vínculos exigem correspondência exata das chaves naturais em `filmes.json`, `pessoas.json`, `premiacoes.json` e `editais.json`.
3. **Unicidade e Idempotência:** O seed utiliza *upserts* baseados nas constraints únicas do banco, permitindo rodar `npm run seed` múltiplas vezes sem duplicar registros.
