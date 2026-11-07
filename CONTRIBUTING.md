# Contribuindo

Siga as instruções de instalação e execução do README.

## Fluxo de trabalho

```text
feat/* · fix/* · docs/* · chore/* · refactor/*  ──PR──▶  develop  ──PR de release──▶  main
```

- `main`: produção, sempre estável. `develop`: integração das tarefas concluídas.
- Nenhuma das duas recebe push direto; tudo entra por Pull Request com o `CI` passando.
- Estratégia completa e relação com o deploy: [docs/decisions/0002-estrategia-de-branches.md](docs/decisions/0002-estrategia-de-branches.md).

### Passo a passo

1. Atualize a `develop` (`git switch develop` e `git pull`) e crie a branch a partir dela.
2. Faça a tarefa, **uma por branch**, e commite em partes pequenas.
3. Rode as verificações da seção [Antes do pull request](#antes-do-pull-request).
4. Envie a branch e abra o PR **para `develop`**, preenchendo o modelo em `.github/pull_request_template.md`.
5. Com os [critérios mínimos de merge](#critérios-mínimos-de-merge) cumpridos, faça o merge por **squash** e apague a branch.
6. Para publicar, abra um PR de `develop` para `main` (veja [Release](#release)).

### Nome das branches

`tipo/descricao-curta`, em minúsculas e com hífens. O tipo diz a natureza do trabalho:

| Tipo | Uso | Exemplo |
| --- | --- | --- |
| `feat/` | Funcionalidade nova | `feat/busca-por-genero` |
| `fix/` | Correção de defeito | `fix/status-http-404` |
| `docs/` | Documentação | `docs/workflow-branches-e-pr` |
| `chore/` | Manutenção sem efeito no comportamento | `chore/atualizar-dependencias` |
| `refactor/` | Reorganização de código sem mudar o comportamento | `refactor/camada-server` |

### Mensagens de commit e título do PR

Use [Conventional Commits](https://www.conventionalcommits.org/pt-br/) em português: `tipo(escopo opcional): descrição no imperativo`. Os tipos são os mesmos das branches, mais `ci` para mudanças no workflow.

```text
fix(app): responder HTTP 404 real para filme inexistente
docs: documentar workflow de branches e PR
```

Como o merge em `develop` é por squash, **o título do PR vira a mensagem do commit** na `develop`. Escreva-o no mesmo formato.

## Antes do pull request

- Rode `npm run lint`, `npx prisma validate` e `npm run build`. São as mesmas verificações do `CI`.
- Use o modelo de pull request em `.github/pull_request_template.md`.
- Não envie `.env`, `node_modules` ou `.next` para o repositório.

## Critérios mínimos de merge

Um PR só entra quando **todos** os itens abaixo estiverem cumpridos:

- [ ] O check `checks` do workflow `CI` (lint, `prisma validate` e `build`) está verde.
- [ ] O PR segue o modelo, com "O que mudou?" e "Como conferir?" preenchidos.
- [ ] Ao menos 1 pessoa do time aprovou o PR.
- [ ] Não há conflito com a branch de destino, e a branch foi atualizada com ela antes do merge.
- [ ] O PR não inclui `.env`, arquivos gerados ou código sem relação com a tarefa.

> **Importante:** esses critérios hoje valem por acordo do time. A proteção de branch nas settings do GitHub, que bloquearia o merge automaticamente, exige plano pago ou repositório público (resposta da API do GitHub) e está acompanhada em [#24](https://github.com/dna-cinema-pe/dna-cinema-pe/issues/24). Até lá, ninguém deve fazer push direto em `main` ou `develop` nem mesclar com o `CI` vermelho.

## Release

1. Abra um PR de `develop` para `main`, com o `CI` verde.
2. O título descreve o que a release **realmente contém**, e não só a última tarefa mesclada.
3. Faça o merge com **merge commit** (não squash), para preservar o histórico da release.
4. O merge na `main` dispara o deploy de produção na Vercel.

## Hotfix

Para um problema urgente em produção:

1. Crie `fix/descricao-curta` a partir da **`main`**.
2. Abra o PR para `main`, com o `CI` verde.
3. Depois do merge, abra um PR de `main` para `develop` para sincronizar a correção.
