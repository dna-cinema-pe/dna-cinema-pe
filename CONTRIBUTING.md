# Contribuindo

Siga as instruções de instalação e execução do README.

## Branches

Estratégia completa em [docs/decisions/0002-estrategia-de-branches.md](docs/decisions/0002-estrategia-de-branches.md).

- `main`: produção. `develop`: integração. Nenhuma recebe push direto; tudo entra por Pull Request com o `CI` passando.
- Crie sua branch a partir de `develop`, curta e descritiva, como `feat/busca` ou `docs/arquitetura`.
- Abra o PR para `develop` (squash merge). Releases vão de `develop` para `main` (merge commit).

## Antes do pull request

- Rode `npm run lint`, `npx prisma validate` e `npm run build`.
- Use o modelo de pull request em `.github/pull_request_template.md`.
- Não envie `.env`, `node_modules` ou `.next` para o repositório.