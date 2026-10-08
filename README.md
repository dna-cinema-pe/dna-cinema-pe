# DNA Cinema PE

## Pré-requisitos

- [Git](https://git-scm.com/downloads)
- [Node.js 24 LTS](https://nodejs.org/en/download/) com npm
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) com Docker Compose

## Preparar o ambiente

```powershell
git clone https://github.com/SunIord/dna-cinema-pe.git
cd dna-cinema-pe
npm ci
Copy-Item .env.example .env
docker compose up -d
```

No macOS ou Linux, use `cp .env.example .env` no lugar de `Copy-Item`.

## Executar

```powershell
npm run dev
```

Abra http://localhost:3000 no navegador.

## Variáveis de ambiente

O modelo está em `.env.example`. O `.env` real nunca deve ser commitado.

| Variável | Obrigatória | Onde | Descrição |
| --- | --- | --- | --- |
| `DATABASE_URL` | Sim | Local, CI, Preview, Produção | Conexão PostgreSQL usada pelo Prisma (`prisma7.config.ts`) e pela aplicação. |
| `POSTGRES_USER` | Não | Só local | Usuário do Postgres do Docker Compose (default `cinema`). |
| `POSTGRES_PASSWORD` | Não | Só local | Senha do Postgres do Docker Compose (default `cinema_dev_password`). |
| `POSTGRES_DB` | Não | Só local | Nome do banco do Docker Compose (default `dna_cinema`). |

### Desenvolvimento

`DATABASE_URL` aponta para o Postgres do `docker compose up -d`, em `localhost:5432`. Se mudar as variáveis `POSTGRES_*`, ajuste também a `DATABASE_URL`.

### CI

O workflow define uma `DATABASE_URL` fictícia no próprio `ci.yml`; `prisma validate` e `build` não conectam ao banco.

### Produção e Preview (Vercel)

Defina `DATABASE_URL` em *Project Settings → Environment Variables*, separadamente para **Production** (branch `main`) e **Preview** (`develop` e PRs), apontando para um Postgres hospedado com `sslmode=require`. Use bancos distintos para cada ambiente. As variáveis `POSTGRES_*` não são usadas na Vercel.
