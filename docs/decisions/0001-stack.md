# 0001 - Definição da stack tecnológica

## Contexto

Para o desenvolvimento da plataforma DNA Cinema PE — voltada à preservação, consulta e análise de dados históricos do audiovisual pernambucano —, foi necessário definir a arquitetura e o conjunto de tecnologias do projeto, priorizando simplicidade de manutenção, agilidade de entrega, tipagem fim a fim e deploy simplificado para um time enxuto.

## Decisão

Optou-se por uma arquitetura monolítica baseada no ecossistema TypeScript/React com Next.js, dispensando a complexidade de um backend separado e centralizando a aplicação, banco relacional e rotinas de deploy em serviços gerenciados.

### Tabela de Tecnologias

| Camada / Área | Tecnologia Recomendada | Decisão / Justificativa | Responsabilidade / Ações |
| --- | --- | --- | --- |
| **Frontend** | Next.js (App Router) + React + Tailwind CSS | SSR/SSG de alta performance para acervo cultural; excelente suporte nativo na Vercel. | Setup da estrutura de páginas e layout base |
| **Componentes de UI** | shadcn/ui | Componentes modernos e acessíveis integrados com Tailwind sem overhead de dependências. | Padronização visual e interface de navegação |
| **Visualizações Gráficas** | Recharts (via shadcn/ui charts) | Pronto para React/Next.js com suporte a SSR; gráficos declarativos e responsivos. | Construção dos dashboards de fomento e gênero |
| **Backend / API** | Next.js (Route Handlers & Server Components) | Dispensa backend separado (NestJS), economizando tempo e unificando repositório e deploy. | Criação de rotas agregadoras e queries diretas |
| **Banco de Dados** | PostgreSQL (Supabase ou Neon) | Modelo relacional essencial para cruzar filmes, equipes técnicas e editais públicos. | Modelagem relacional e criação de consultas analíticas |
| **Acesso a Dados / ORM** | Prisma ou Drizzle | Tipagem TypeScript ponta a ponta, facilidade para migrações e scripts de seed. | Configuração do schema e geração de migrações |
| **Ingestão de Dados** | CSV / Google Sheets + Script Seed (`npm run seed`) | Dados estáticos pré-compilados do cinema pernambucano alimentando o Postgres. | Levantamento dos dados de editais/filmes e criação do script |
| **Hospedagem & Deploy** | Vercel | Deploy contínuo e integrado nativamente com Next.js em poucos cliques. | Configuração do repositório no GitHub e integração com Vercel |

## Consequências

- **Produtividade e manutenção simplificada**: Repositório unificado em TypeScript eliminando sobrecarga de sincronização de contratos e duplicação de modelos entre frontend e backend.
- **Performance e SEO**: Renderização no servidor (SSR/SSG) otimizada para consulta pública do catálogo cultural.
- **Infraestrutura gerenciada**: Hospedagem na Vercel combinada a PostgreSQL em nuvem minimiza custos operacionais e esforço de infraestrutura para o time.

