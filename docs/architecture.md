# Estrutura do projeto

```text
dna-cinema-pe/
├── .github/                         # Configurações do repositório no GitHub
│   ├── pull_request_template.md     # Modelo de PR (a preencher)
│   └── workflows/
│       └── ci.yml                   # Instala dependências e valida lint, Prisma e build
├── data/                            # Espaço reservado para dados de entrada (CSV/planilhas)
│   └── README.md
├── docs/                            # Documentação de arquitetura, dados e decisões
│   ├── decisions/
│   │   └── 0001-stack.md            # Registro da decisão de stack
│   ├── architecture.md             # Este documento
│   └── data-model.md                # A preencher quando o modelo de dados for definido
├── prisma/                          # Configuração do Prisma e banco de dados
│   ├── schema.prisma                # Schema PostgreSQL; ainda sem modelos
│   └── seed.ts                      # Espaço reservado para carga inicial de dados
├── public/                          # Arquivos estáticos servidos diretamente
│   ├── file.svg                     # Ativos padrão do scaffold Next.js
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/                         # Next.js App Router: páginas, layout e estilos
│   │   ├── api/                     # Espaço reservado para Route Handlers da API
│   │   │   └── .gitkeep
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx                 # Página inicial padrão do Next.js
│   ├── components/
│   │   └── ui/                      # Espaço reservado para componentes de interface
│   │       └── .gitkeep
│   ├── lib/                         # Espaço reservado para utilitários e acesso ao banco
│   │   ├── db.ts
│   │   └── utils.ts
│   └── server/                      # Placeholder; não há backend separado configurado
│       └── README.md
├── .env.example                     # Exemplo de variáveis locais
├── .gitignore                       # Ignora dependências, build e arquivos secretos
├── .nvmrc                           # Versão principal do Node.js: 24
├── docker-compose.yml               # PostgreSQL local com volume persistente
├── eslint.config.mjs                # Configuração do ESLint
├── next.config.ts                   # Configuração do Next.js
├── package.json                     # Dependências e comandos npm
├── package-lock.json                # Versões travadas das dependências
├── prisma7.config.ts                # Configuração de conexão e migrations do Prisma 7
├── README.md                        # Pré-requisitos e comandos para rodar localmente
├── tsconfig.json                    # Configuração do TypeScript
├── CONTRIBUTING.md                  # Placeholder para orientações de contribuição
└── LICENSE                          # Licença do projeto
```

O PostgreSQL roda localmente pelo Docker Compose. O Next.js concentra as páginas e futuras rotas de API. O acesso à base, os modelos Prisma, as migrations, os dados de seed e os componentes específicos do projeto serão definidos nas próximas etapas.
