# 0004 - Estrutura de rotas e camada server

## Contexto

Com a modelagem de dados e a carga inicial (seed) configuradas, era necessário estabelecer a camada de backend e as rotas de acesso para atender às histórias de usuário (US01 a US06). Em uma arquitetura monolítica com Next.js App Router, as consultas ao banco podem ser feitas diretamente pelos Server Components sem a obrigatoriedade de APIs intermediárias, ao mesmo tempo em que a criação de Route Handlers REST facilita a extensibilidade e integrações externas.

## Decisão

### 1. Camada de Consultas ao Banco (`src/server/`)

Todas as operações de acesso a dados via Prisma foram centralizadas em `src/server/filmes.ts`, desacoplando a lógica de banco das páginas e APIs:

| Função | US | Descrição |
| --- | --- | --- |
| `listarFilmes()` | US06 | Retorna catálogo ordenado por título com id, título, ano e pôster. |
| `obterFilme(id)` | US01 | Retorna a ficha essencial (sinopse, classificação, cidade de filmagem, etc.). |
| `listarIncentivos(id)` | US02 | Retorna editais vinculados e calcula total investido em reais. |
| `obterEstatisticasElenco(id)` | US03 | Retorna total do elenco, atrizes e integrantes nordestinos. |
| `listarCineastasFemininas(id)` | US04 | Retorna total e lista nominal com função das cineastas mulheres. |
| `listarPremiacoes(id)` | US05 | Retorna premiações ganhas (`VENCEDOR`), indicações (`INDICADO`) e principais reconhecimentos. |
| `obterDetalhesCompletosFilme(id)` | US01–US05 | Agregador em paralelo (`Promise.all`) para consumo do endpoint de detalhe. |

### 2. Estrutura de Páginas (`src/app/`)

Implementação de páginas cruas (estilo visualizador de queries) para conferência direta do banco e do seed:

```text
src/app/
├─ page.tsx                  # Home com atalhos de navegação para o catálogo e a API
├─ loading.tsx / error.tsx   # Tratamento de carregamento e erro global
├─ not-found.tsx             # 404 global
└─ filmes/
   ├─ page.tsx               # US06: listagem em tabela com dados reais
   ├─ loading.tsx            # Fallback de carregamento da listagem
   └─ [id]/
      ├─ page.tsx            # US01 a US05: detalhe completo dividido em seções com Suspense
      ├─ loading.tsx         # Fallback de carregamento do detalhe
      └─ not-found.tsx       # 404 específico para filme não localizado ou ID inválido
```

### 3. Route Handlers (`src/app/api/`)

Endpoints REST leves que envelopam as mesmas funções de consulta para eventuais consumidores client-side ou externos:

- `GET /api/filmes`: Devolve a lista de filmes em formato JSON (US06).
- `GET /api/filmes/[id]`: Devolve o conjunto completo de dados do filme (US01 a US05).
  - Validação de parâmetro numérico (retorna `400` para ID inválido).
  - Verificação de existência (retorna `404` para filme não encontrado).

## Consequências

- **Acesso direto e performático**: Server Components acessam o PostgreSQL diretamente sem sobrecarga de requisições HTTP internas.
- **Validação imediata do seed**: As páginas cruas permitem verificar se os dados e regras de negócio estão refletidos corretamente antes do início da estilização e design system.
- **Flexibilidade e desacoplamento**: Caso o frontend migre para componentes client-side (com filtros, busca dinâmica ou gráficos), a API REST já está disponível e alinhada à camada server.

