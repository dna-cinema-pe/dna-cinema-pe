# 0005 - Landing page única a partir do Figma

## Contexto

Até aqui o front foi construído como visualizador de dados (ver [0004](0004-rotas-e-camada-server.md)): Home com texto simples, catálogo em tabela e ficha por filme, atendendo às histórias de usuário US01 a US06. O design, por outro lado, foi pensado como **uma única página narrativa e agregada**, sobre o cinema pernambucano como um todo, e não sobre um filme por vez.

A equipe de design ainda não concluiu o Figma. O mesmo, diverge em parte do projeto atual. Mesmo incompleto, ele já define identidade visual, estrutura de seções e quais dados serão exibidos. Decidimos **adiantar tudo o que não depende das definições pendentes**, isolando o que pode mudar para que o retrabalho seja barato.

## Decisão

### 1. A landing substitui a Home e o app passa a ter página única

A rota `/` passa a ser a landing narrativa. O texto atual da Home (lista "O que você encontra em cada filme" e "Para desenvolvedores") deixa de existir. A decisão sobre `/filmes`, `/filmes/[id]` e `/api/filmes` fica pendente (ver Pendências). **Nesta etapa essas rotas não são alteradas nem removidas.**

### 2. Identidade visual (tokens)

Extraída do SVG e centralizada em `src/app/globals.css`, via `@theme`, para que uma mudança no Figma seja ajustada em um só lugar. O tema escuro vale **só para a landing** (`bg-fundo`, `text-papel`, `font-corpo` aplicados em `src/app/page.tsx`). O `body` e o tema claro e escuro automático seguem como estão, porque `/filmes` e a ficha do filme ainda não foram estilizados e dependem deles para ficarem legíveis.

| Token | Valor | Uso |
| --- | --- | --- |
| `--color-fundo` | `#0B0909` | Fundo da página. |
| `--color-ouro` | `#E3A54F` | Cor principal: títulos, moldura e ilustrações. |
| `--color-ferrugem` | `#AC3215` | Detalhes e ilustrações em vermelho escuro. |
| `--color-ferrugem-claro` | `#B83E24` | Variação da ferrugem. |
| `--color-vermelho` | `#E2200F` | Destaques e elementos de acento. |
| `--color-laranja` | `#FF9F3F` | Destaque secundário. |
| `--color-papel` | `#CECCC8` | Texto de apoio sobre o fundo escuro. |

Fontes, carregadas com `next/font/google` (autohospedadas no build, sem arquivo no repo), além da Geist, que segue como padrão do restante do app:

- **Alfa Slab One** nos títulos (equivalente à slab pesada do Figma).
- **Poppins** no corpo do texto.

### 3. Componentes base

Nenhum componente consulta o banco: recebem dados por props e, sem dados, mostram placeholders. Arquivos em PascalCase, com imports explícitos de extensão como no restante do repo.

**Primitivas genéricas (`src/components/ui/`)**

| Componente | Função |
| --- | --- |
| `TituloSecao` | Título em slab, caixa alta, em três tamanhos e dois tons. |
| `TextoColunas` | Texto em 1, 2 ou 3 colunas; no mobile, uma coluna. |
| `Pregador` | Pregador dourado do varal e da cortina. |
| `Barra` | Barra horizontal de proporção, com estado de dado ausente. |
| `Legenda` | Texto pequeno de apoio e créditos. |
| `Placeholder` | Caixa cinza que marca o que o Figma ainda não definiu. |

**Composições do design (`src/components/landing/`)**

| Componente | Função |
| --- | --- |
| `Moldura` | Borda dourada que envolve a página. |
| `Varal` | Fio vermelho com itens pendurados; opcionalmente balança com a rolagem (client). |
| `Polaroid` | Foto ou pôster com legenda. |
| `Podio` | Pódio 1º, 2º e 3º; ao passar o mouse, os demais filmes do degrau aparecem em fileira. |
| `Grafico` | Barras de proporção com legenda de cores. |
| `Cortina` | Cortina que escurece e abre com a rolagem (client). |
| `Holofote` | Círculo de luz que segue o ponteiro (client). |
| `Ilustracao` | Imagem decorativa lida de `ilustracoes.ts`; sem `src`, vira placeholder. |

Apoio: `conteudo.ts` (todos os textos, transcritos do Figma sem correção), `ilustracoes.ts` (registro único dos assets), `tipos.ts`, `movimento.ts` (`prefers-reduced-motion`) e `itensVaral.tsx`. Cada seção fica em `src/components/landing/secoes/`.

As três interações vêm de notas escritas no próprio Figma ("a cortina escurece e abre quando a pessoa scrolla", "mexe igual holofote", "as fotos balançam quando scrolla a tela", "ao passar o mouse os filmes se mostram em fileira"). Todas respeitam `prefers-reduced-motion`; sem JavaScript, a cortina fica aberta.

### 4. Esqueleto da landing

`src/app/page.tsx` compõe as seções na ordem do Figma, com os textos já definidos nele:

1. Hero ("DNA do Cinema Pernambucano" e subtítulo)
2. Contexto
3. Ciclo do Recife
4. Super-8
5. Retomada e Manguebeat
6. Anos 2000 e Consolidação
7. Financiamento
8. Reconhecimento Internacional
9. Recorte de Gênero, Raça e Origem
10. Conclusão

Onde o Figma ainda tem placeholder ("postcard?", "Imagem escolhida depois", gráficos em blocos cinza), a página usa o mesmo placeholder, sinalizado no código com `TODO(figma)`. Os textos que o Figma ainda não traz ficam vazios, e **não são inventados**.

### 5. Dados agregados (`src/server/panorama.ts`)

A camada atual só tem consultas por filme. Para alimentar a landing, criaremos (**ainda não implementadas**: a página ainda renderiza placeholders) funções agregadas na mesma convenção de [0004](0004-rotas-e-camada-server.md) (Prisma centralizado em `src/server/`, reexportadas por `index.ts`):

| Função | Seção | Descrição |
| --- | --- | --- |
| `listarFilmesPorPeriodo()` | Ciclo do Recife a Anos 2000 | Filmes (título, ano, pôster) agrupados por período. |
| `obterPanoramaFinanciamento()` | Financiamento | Total investido por edital e por ano, a partir de `Edital` e `FilmeEdital`. |
| `obterRankingInternacional()` | Reconhecimento Internacional | Filmes com mais prêmios (`VENCEDOR`) em premiações com `flagNacional = false`. |
| `obterRecortePessoas()` | Gênero, Raça e Origem | Percentuais por `Pessoa.genero`, `flagEhNordestino` e `flagEhCineasta`, sem o recorte de raça. |

Valem as convenções do schema: `-1` e `NULL` significam "sem informação" e **nunca entram em percentuais como se fossem uma categoria**; o total exibido indica quantos registros foram considerados.

Os cortes de período ficam em **uma única constante**, para ajustar quando o design e a pesquisa definirem. Valores provisórios, deduzidos dos filmes do seed e dos nomes das seções:

| Período | Intervalo provisório |
| --- | --- |
| Ciclo do Recife | 1923 a 1931 (intervalo citado no texto do Figma) |
| Super-8 | 1970 a 1989 |
| Retomada e Manguebeat | 1990 a 1999 |
| Anos 2000 | 2000 em diante |

### 6. Ilustrações e responsividade

- As ilustrações (xilogravuras, pássaros, bandeirinhas, ponte do Recife) estão dentro de um SVG de 33 MB. **Não são extraídas dele**: entram em `public/ilustracoes/` conforme a equipe de design entrega os arquivos separados, e são ligadas em `src/components/landing/ilustracoes.ts`. Até lá, cada uma aparece como placeholder. Já entregues e ligadas, todas do Hero: sol, estrela, cruz, pássaros dourado e ferrugem, bandeirinhas, as duas manchas de pincelada, ponte do Recife e veleiro.
- O Figma só tem a tela desktop (1920 px). O mobile é construído por inferência, com layout em coluna única e a moldura reduzida, e será revisado quando houver design.

### 7. Fluxo de trabalho

Tudo em uma branch `feat/landing-figma` a partir de `develop`, conforme [0002](0002-estrategia-de-branches.md), em PRs pequenos: tokens e fontes, componentes, esqueleto, consultas agregadas.

## Pendências e disparidades

### Disparidades entre o Figma e o projeto atual

| Tema | Projeto atual | Figma |
| --- | --- | --- |
| Unidade da narrativa | Um filme por vez (catálogo e ficha). | Panorama agregado do cinema pernambucano. |
| Estrutura | Home, `/filmes`, `/filmes/[id]` e `/api/filmes`. | Página única, sem catálogo nem ficha. |
| Tema | Claro e escuro automático; catálogo em zinc e âmbar; ficha sem estilo. | Escuro fixo, ouro, ferrugem e vermelho, estilo xilogravura de cordel. |
| Fontes | Geist e Geist Mono. | Alfa Slab One e Poppins. |
| Dados consultados | Funções por filme (US01 a US06). | Agregações do acervo inteiro (financiamento, prêmios, recortes). |
| Cobertura das US | A ficha atende US01 a US06. | A landing não as cobre sozinha. |
| Telas | Responsivo. | Só desktop (1920 px). |
| Recorte "origem" | `Pessoa.flagEhNordestino` (nordestino ou não, dentro de cada filme). | Gráfico "Pernambucanos no cinema nacional" contra "Outros". Nordestino não é o mesmo que pernambucano. |
| Recorte "raça" | Sem campo. | O texto fala de raça e cor, mas o terceiro gráfico é de **classe social** (baixa, média, alta), que também não existe no schema. |
| Pódio | Premiações com `nivelImportanciaPremiacao` e `resultado`. | Anotações de critério nos degraus: 1º vencedores relevantes; 2º indicados relevantes e vencedores; 3º indicados quaisquer. Precisam virar regra. |

### Lacunas nos dados (bloqueiam partes da landing)

- **Raça:** o recorte "Gênero, Raça e Origem" prevê raça, mas não há campo em `Pessoa` nem no seed. É preciso decidir se o dado existe e, se existir, entra no schema (nova migration) e no seed. Até lá a seção exibe só gênero e origem.
- **Fotos de pessoas:** a seção Anos 2000 mostra fotos de cineastas, e `Pessoa` não tem campo de imagem.
- **Cobertura temporal e de editais:** as seções de época e de Financiamento dependem de o seed ter filmes e editais suficientes em cada período. Isso será conferido na implementação e, havendo lacuna, será reportado.

### Decisões em aberto

1. **Destino de `/filmes`, `/filmes/[id]` e `/api/filmes`:** manter como páginas secundárias, ou remover junto com a camada de dados por filme (o que revisaria o [0004](0004-rotas-e-camada-server.md)). Enquanto isso, a landing terá um link discreto para o catálogo no rodapé, para que ele não fique órfão.
2. **Cortes de período** das seções de época (os valores acima são provisórios).
3. **Revisão dos textos** do Figma, transcritos como estão em `conteudo.ts`. Há trechos que parecem erro ou placeholder: o primeiro cartão de Retomada repete o texto do Super-8; "Science" e "Nação" (Chico Science & Nação Zumbi?); maiúsculas no meio de frases e "ia ficar" em Reconhecimento. Um bloco de Ciclo do Recife repete o de Contexto junto de uma nota "*ELEMENTOS", e não foi renderizado.
4. **Ilustrações e imagens finais**, e o formato de entrega (SVG ou PNG separados, em `public/`).
5. **Versão mobile** do design.
6. **Qual das duas versões do Figma** (a de "Cordel 1 a 5" ou a completa) é a oficial. Assumimos a completa.

## Consequências

- **Adiantamento sem risco:** tokens, componentes e consultas agregadas independem das definições pendentes. O que for alterado no Figma tende a exigir ajuste de valores, não reescrita.
- **Retrabalho isolado:** cores, fontes e cortes de período ficam em pontos únicos. Placeholders sinalizados com `TODO(figma)` permitem localizar tudo o que depende do design final.
- **Catálogo sem destaque:** `/filmes` perde a entrada principal no site até a decisão em aberto 1.
- **Seção de raça incompleta** até a decisão sobre o schema, o que pode exigir migration e novo seed.
- **Dois temas convivem** até a decisão sobre `/filmes`: escuro fixo na landing e o tema padrão no resto.
- **Interações no cliente:** `Varal`, `Cortina` e `Holofote` são client components, o que acrescenta JavaScript à Home.
- **Mobile sem referência:** a versão mobile pode ser refeita quando o design chegar.
- **Superseded parcial:** o item "Home com atalhos de navegação" da seção 2 do [0004](0004-rotas-e-camada-server.md) deixa de valer quando a landing entrar.
