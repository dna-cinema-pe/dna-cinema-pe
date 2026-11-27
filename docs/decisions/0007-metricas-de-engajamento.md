# 0007 - Métricas de engajamento (US-4.4)

## Contexto

A US-4.4 pede para saber como os leitores usam a Home, para melhorar os tutoriais (tour de boas-vindas, hotspots e navegação por capítulos). Os critérios de aceite exigem:

- instrumentar tour iniciado, concluído e pulado, capítulo alcançado, hotspot usado, modal de filme aberto e gráfico consultado;
- não coletar dados pessoais;
- definir e documentar a ferramenta antes da implementação.

O site é hospedado na Vercel, no plano gratuito ([0001](0001-stack.md)), e a Home acabou de passar pelo trabalho de desempenho da [0006](0006-desempenho-e-assets.md). Qualquer script novo precisa ser leve e não pode atrasar o hero.

## Opções avaliadas

| Ferramenta | Custo | Eventos personalizados | Dados pessoais |
| --- | --- | --- | --- |
| **Umami Cloud** | Plano Hobby gratuito (cerca de 100 mil eventos por mês) | Sim | Sem cookies e sem identificar o leitor |
| Plausible | Pago (a partir de cerca de US$ 9 por mês) | Sim, contam no limite do plano | Sem cookies e sem identificar o leitor |
| Vercel Web Analytics | No plano Hobby, só visualizações de página | Só nos planos Pro e Enterprise | Sem cookies |
| Google Analytics 4 | Gratuito | Sim | Usa cookies e identificadores; pela LGPD, exige banner de consentimento |

Os limites e preços foram consultados em novembro de 2026 e podem mudar.

## Decisão

### 1. Ferramenta: Umami Cloud

O Umami Cloud é gratuito no volume do projeto e tem eventos personalizados. Como não usa cookies nem identifica quem visita, atende ao critério de não coletar dados pessoais sem precisar de banner de consentimento. O script tem cerca de 2 KB, é carregado depois que a página fica ociosa (`lazyOnload`) e não concorre com o hero.

A conta é independente da Vercel. Qualquer integrante pode criá-la e cadastrar o domínio de produção. O plano gratuito não permite convidar outras pessoas para a conta. Para o time consultar os dados, o site tem o link de compartilhamento do Umami ativado: um painel público, só de leitura, sem dados pessoais, com visão geral, eventos, tempo real, funis e detalhamento por propriedade. Por ser público, ele não mostra as sessões uma a uma.

**Painel (somente leitura):** https://cloud.umami.is/share/dnxNV6QJSVDYRRa3 A conta fica com uma pessoa do time; se ela sair do projeto, outra pessoa precisa assumir o acesso, ou criar uma conta nova e trocar o Website ID.

### 2. Configuração

O Website ID e o domínio de produção ficam em `src/lib/metricas.ts` (`UMAMI_WEBSITE_ID` e `DOMINIO_PRODUCAO`). O Website ID não é segredo: aparece no HTML público de qualquer site que use o Umami. O script só é carregado se os dois estiverem preenchidos.

O script recebe:

- `data-domains`: conta só as visitas no domínio de produção, deixando de fora o ambiente local e os previews da Vercel;
- `data-do-not-track`: respeita a opção "Do Not Track" do navegador;
- `data-exclude-search`: não envia a query string da URL.

### 3. Eventos

Todos os eventos passam por `registrarEvento` e `registrarUmaVez` (`src/lib/metricas.ts`), que isolam a ferramenta: trocar o Umami por outra muda só esse arquivo. Os nomes e os dados de cada evento são tipados.

| Evento | Quando | Dados | Contagem |
| --- | --- | --- | --- |
| `tour-iniciado` | O tour de boas-vindas abre | `origem`: `automatico` (primeira visita) ou `botao` (botão "?") | Toda vez |
| `tour-concluido` | O leitor clica em "Concluir" no último passo | (nenhum) | Toda vez |
| `tour-pulado` | O leitor clica em "Pular tour" ou aperta Esc | `passo`: em que passo pulou (1 a 3) | Toda vez |
| `capitulo-alcancado` | Um capítulo passa a ser o ativo na rolagem | `capitulo`: id do capítulo (`cap-contexto`, …) | Uma vez por visita à página |
| `hotspot-usado` | O leitor usa um hotspot (postal ou dica de gráfico) | `hotspot`: id do hotspot | Uma vez por visita à página |
| `modal-filme-aberto` | O leitor abre a ficha de um filme num postal | `filme`: id do postal (`baile-perfumado`, …) | Toda vez |
| `grafico-consultado` | O leitor abre a dica de um gráfico, um degrau do pódio ou um pino da rota internacional | `grafico`: `genero`, `raca`, `podio` ou `rota-internacional`; `item`: degrau ou festival, quando houver | Uma vez por visita à página, por gráfico e item |

Os eventos marcados como "uma vez por visita à página" disparam com o passar do mouse ou com a rolagem, que se repetem muito. Contar uma vez responde à pergunta útil (quantas visitas chegaram a usar aquilo) sem inflar os números.

O evento `capitulo-alcancado` só começa depois que as posições dos capítulos são medidas, para a abertura não registrar capítulos que o leitor não viu.

### 4. Privacidade

- **Só identificadores fixos:** os dados dos eventos são ids definidos no código (capítulo, hotspot, filme, gráfico). Nenhum texto digitado, nome, e-mail ou identificador do leitor é enviado.
- **O que o Umami guarda:** dados agregados (páginas, país, navegador, sistema), sem cookies e sem armazenar o IP.
- **Sem perfil do leitor:** nada é guardado no navegador para métricas. O controle de "uma vez por visita" fica só na memória da página.

### 5. Desempenho

- **Carregamento tardio:** o script é carregado com `lazyOnload`, depois do carregamento da página.
- **Fila de eventos:** os eventos disparados antes disso (como o `tour-iniciado` automático) ficam numa fila e são enviados quando o script chega. A fila tem no máximo 50 eventos, para não crescer se o script não carregar (bloqueador de anúncios, por exemplo).
- **Depuração:** em desenvolvimento, cada evento aparece no console (`[métricas]`), para conferir a instrumentação sem enviar nada.

## Consequências

- **Ativação:** os eventos só são enviados depois que alguém criar a conta no Umami Cloud e preencher `UMAMI_WEBSITE_ID` e `DOMINIO_PRODUCAO`. Até lá, a instrumentação fica ativa, mas sem destino.
- **Bloqueadores:** bloqueadores de anúncios podem barrar o script do Umami. Os números são uma amostra, não o total de leitores.
- **Limite do plano gratuito:** cerca de 100 mil eventos por mês, somando visualizações de página e eventos. Se o volume passar disso, é preciso rever o plano.
- **Eventos novos:** qualquer evento novo deve ser adicionado ao tipo `Eventos` em `src/lib/metricas.ts` e à tabela acima, sem dados pessoais.
