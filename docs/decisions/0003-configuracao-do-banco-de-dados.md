# 0003 - Configuração e modelagem do banco de dados

## Contexto

A plataforma DNA Cinema PE necessita persistir e correlacionar dados do cinema pernambucano (filmes, pessoas, premiações e editais), atendendo aos requisitos e regras de negócio das histórias de usuário (US01 a US06). Era necessário formalizar a escolha do SGBD, o arranjo de conexões com o Supabase via Prisma 7, as convenções do modelo de dados e a estratégia de carga inicial (seed) baseada nas pesquisas documentais do projeto.

## Decisão

### SGBD e Provedor

- **PostgreSQL**: SGBD relacional para suporte a integridade referencial, consultas analíticas e filtros estruturados.
- **Desenvolvimento local**: Container PostgreSQL via `docker-compose.yml`, com porta parametrizada (`${POSTGRES_PORT:-5432}`) para evitar conflitos em máquinas com instâncias locais ativas.
- **Ambientes em nuvem (Produção e Preview)**: PostgreSQL gerenciado no **Supabase**.

### Estratégia de Conexões (Prisma 7 e Supabase)

No Prisma 7, o parâmetro `directUrl` foi descontinuado no `schema.prisma` e a CLI passa a ler a URL diretamente de `prisma7.config.ts`. Para compatibilidade com o pooler do Supabase e garantia de execução correta de DDL e rotinas em lote, foram estabelecidas duas variáveis:

| Variável | Conexão / Modo | Finalidade |
| --- | --- | --- |
| `DATABASE_URL` | Pooler Supabase em *Transaction Mode* (porta `6543`) com `?pgbouncer=true` | Runtime da aplicação Next.js (queries de leitura e escrita web). |
| `DIRECT_URL` | Pooler Supabase em *Session Mode* (porta `5432`, host IPv4) ou conexão direta | Migrations (`prisma migrate`) e scripts (`prisma/seed.ts`), que exigem suporte a *prepared statements* e comandos DDL. |

### Modelagem de Dados e Convenções

Foram criados 7 models no Prisma (`schema.prisma`), em PascalCase com mapeamento explícito (`@map` / `@@map`) para tabelas e colunas em snake_case:

- **Entidades centrais**:
  - `Filme` (`filme`): obras pernambucanas e metadados (título, ano, gênero, classificação indicativa, cidade de filmagem).
  - `Pessoa` (`pessoa`): profissionais do audiovisual.
  - `Premiacao` (`premiacao`): festivais e prêmios (com relevância de 1 a 3 e indicador de premiação nacional).
  - `Edital` (`edital`): editais públicos e incentivos culturais.
- **Tabelas associativas com contexto de negócio**:
  - `FilmePremiacao` (`filme_premiacao`): armazena `edicao_ano`, `categoria_premiacao` e `resultado` (`VENCEDOR` ou `INDICADO`), atendendo à US05.
  - `FilmePessoa` (`filme_pessoa`): vincula pessoas aos filmes por `funcao_pessoa`, contendo a flag `flag_eh_cineasta` para diferenciar diretores de elenco/equipe técnica (US04).
  - `FilmeEdital` (`filme_edital`): armazena `valor_investido_filme_brl` na própria associativa (US02), evitando duplicar o valor global do edital entre diferentes produções.

#### Tratamento de Valores Ausentes e Integridade

- **Valores numéricos desconhecidos**: Padronizados com o sentinela `-1`.
- **Textos e booleanos desconhecidos**: Armazenados como `NULL`, permitindo ao frontend renderizar "Informação não disponível" e evitando distorções estatísticas.
- **Autodeclaração**: Os campos `pessoa.genero` e `flag_eh_nordestino` são estritamente `nullable` e **nunca** inferidos (US03).
- **Integridade referencial**: Chaves estrangeiras configuradas com `onDelete: Cascade`.

### Client Prisma e Pipeline de CI

- Client gerado em `src/generated/prisma` com `moduleFormat = "esm"` e `importFileExtension = "ts"`, permitindo importação e execução direta pelo Node nativo sem bundlers adicionais.
- A pasta `src/generated/` é ignorada no Git (`.gitignore`) e no linter (`eslint.config.mjs`).
- O workflow de CI (`ci.yml`) executa `npx prisma generate` antes da validação de build e tipagem.

### Carga Inicial (Seed)

- **Desacoplamento de dados**: Os dados coletados na pesquisa histórica residem em arquivos JSON versionados em `data/` (`filmes.json`, `pessoas.json`, `premiacoes.json`, etc.).
- **Idempotência**: O script `prisma/seed.ts` valida as regras de negócio previamente e utiliza `upsert` com chaves naturais/lógicas, permitindo reexecuções seguras sem duplicidade.

## Consequências

- Separação resiliente entre o pooler transacional da aplicação e a conexão direta para migrações/seed.
- Schema normalizado, aderente às US01–US06 e com integridade referencial protegida.
- Pipeline de CI estável e scripts de banco executáveis com suporte nativo do Node.js.
- Exigência de configuração e manutenção de duas variáveis de ambiente (`DATABASE_URL` e `DIRECT_URL`) em todos os ambientes de deploy.

