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
