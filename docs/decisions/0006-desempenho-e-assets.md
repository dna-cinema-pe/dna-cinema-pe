# 0006 - Desempenho e assets (US-4.3)

## Contexto

A US-4.3 pede que a Home carregue rápido em internet móvel: LCP ≤ 2,5 s em 4G, CLS ≤ 0,1, animações a 60 fps só com `transform` e `opacity`, imagens fora do hero em WebP/AVIF com `loading="lazy"`, SVGs otimizados, Alfa Slab One e Poppins hospedadas localmente com `font-display: swap` e nenhuma dependência de `static.figma.com` em produção.

Medição inicial (Lighthouse, perfil mobile, build de produção):

| Métrica | Valor |
| --- | --- |
| LCP | 4,9 s (81% era "render delay") |
| CLS | 0,084 |
| Peso da página | 17 MB, 156 imagens |

Três causas principais:

1. **Pôster invisível até hidratar.** O `PosterViewport` só conhece a escala (e os espaços do layout responsivo da US-4.1) depois do JavaScript, e escondia o frame inteiro até lá. O SVG do hero (o LCP) baixava em ~30 ms e esperava segundos para aparecer.
2. **Imagens enormes.** PNG/JPG de até 9 MB (7795 × 11280 px) exibidos com ~300 px, todos baixados de uma vez, sem `loading="lazy"`.
3. **Fontes trocadas depois da medição.** Quando a Poppins chegava depois da primeira medição, os textos mudavam de altura, o `PosterViewport` media de novo e as seções desciam já visíveis (o CLS de 0,084).

## Decisão

### 1. Escala antes da pintura

Um script inline (`SCRIPT_ESCALA_POSTER`, em `src/components/poster/escalaInicial.ts`, executado no `layout.tsx` junto com o de `data-animacoes`) calcula pela largura da janela a escala, o inverso dela e o espaço depois do subtítulo da Abertura (`espacoDaAbertura`, a mesma função usada pelo `PosterViewport`, cujo texto entra no script). Ele define no `<html>` `--escala-poster`, `--inv-poster`, `--espaco-abertura-poster` e o atributo `data-poster-medindo`. O `PosterViewport` usa essas variáveis até medir, então o hero aparece direto do HTML do servidor já na posição final, com a cidade abaixo do subtítulo.

Abaixo de 1280 px, os grupos `.poster-deslocar`, cujas posições dependem das medições, ficam ocultos enquanto `data-poster-medindo` existir (regra no `globals.css`). Ficam de fora os grupos que só descem o espaço da Abertura (`.poster-deslocar--abertura`: título e primeira linha do Contexto, barco e vetores da cidade), que já aparecem no primeiro quadro. Dentro deles, o que depende de medição leva `.poster-depende-da-medicao` (a segunda linha do Contexto). No desktop nada fica oculto: até o pódio, longe da primeira tela, os espaços medidos são 0. O `PosterViewport` remove o atributo depois de medir com as fontes carregadas (`document.fonts.ready`, com limite de 3 s), no mesmo commit em que os espaços medidos entram no estilo. As medições passaram de `useEffect` para `useLayoutEffect`, para que uma nova instância (o `Suspense` troca o fallback pelo pôster com dados) já pinte com os espaços certos. Sem JavaScript o atributo não existe e nada fica oculto.

`html { scrollbar-gutter: stable }` garante que a largura medida antes da pintura não muda quando a barra de rolagem aparece.

As contas do layout responsivo (US-4.1) não mudaram, e os deslocamentos continuam por `margin`, sem novas camadas (ver os comentários sobre o Safari do iPhone no `globals.css`).

### 2. Imagens

- `npm run otimizar:assets` (`scripts/otimizar-assets.mjs`) converte PNG/JPG de `public/` para WebP (qualidade 80) e reduz para no máximo 1600 px (pôster) ou 1000 px (pôsteres de filmes) no maior lado, cerca do dobro do maior tamanho exibido no desktop. Também passa os SVGs pelo svgo. As referências (código e `data/filmes.json`) apontam para `.webp`.
- Os originais `04a8f.png` e `50445.png`, substituídos pelas versões `-reduzida` na US-4.1, foram removidos.
- Bancos populados antes da troca guardam `posterUrl` com `.jpg`. `urlDoPoster()` (`src/lib/utils.ts`) corrige na leitura, em `src/server/`. Rodar `npm run seed` atualiza o banco.
- Todas as imagens fora do hero (`Abertura`) têm `loading="lazy"` e `decoding="async"`. O SVG do hero que é o LCP (`95194.svg`) tem `fetchPriority="high"`, e o pôster da ficha do filme também (é o conteúdo principal dela).
- Os SVGs otimizados foram comparados pixel a pixel com os originais: a maior diferença média foi 1,3/255 (anti-aliasing do arredondamento de coordenadas).

### 3. Fontes

Alfa Slab One e Poppins (400 a 900) passam a ser arquivos do repositório (`src/app/fonts/`, subset latin, licença OFL junto), carregados com `next/font/local` e `display: "swap"`. O build não depende mais do Google Fonts para elas. Isso substitui o trecho sobre fontes da [0005](0005-landing-page-figma.md). A Geist, usada em `/filmes`, segue no `next/font/google`, mas sem preload, para não disputar banda com o hero da Home.

### 4. Animações

- As barras de progresso de leitura (`Navigator`) e da linha do tempo (`TrilhaDaLinhaDoTempo`) animavam `width` e `height`, com layout a cada rolagem. Agora usam `scaleX`/`scaleY`.
- O progresso de leitura (`OnboardingProvider`) é lido no máximo uma vez por quadro (`requestAnimationFrame`).
- Exceções mantidas, por serem efeitos de design: o arco de frevo atualiza uma `mask-image` na rolagem (repintura de uma área pequena), e o avião usa `offset-distance` (caminho de movimento, aplicado como transform, sem layout).

### 5. Primeiro quadro

Comparando o primeiro quadro (com o JavaScript do Next bloqueado) com o estado final em larguras de 360 a 1440 px, nenhum elemento visível muda de lugar por layout; só os animados se movem. Duas correções vieram dessa comparação:

- Antes de medir as posições dos capítulos, o `OnboardingProvider` considerava ativo o último capítulo (todas as posições valiam 0). O HTML do servidor saía com o resumo "Você chegou ao fim" e "12 de 12 capítulos", que piscava na abertura e causava o erro de hidratação (React #418) no `FimDaJornada`. Até medir, o capítulo ativo é o primeiro.
- As cortinas do Super-8 e o botão "Pendurar de novo" não tinham classe de nível (`poster-nivel-*`) e, abaixo de 1280 px, desciam a soma de todos os espaços, longe do palco e do pôster. Ganharam o nível do elemento a que pertencem.

### 6. Verificação de assets

`npm run verificar:assets` falha se houver PNG/JPG em `public/` ou URL de asset do Figma (`static.figma.com`, `s3-figma`, `figma.com/api/mcp/asset`) no código, nos dados ou em `public/`. Por enquanto roda à mão, antes do PR (ver CONTRIBUTING). Incluí-la no CI fica como pendência.

## Resultado

Lighthouse no build de produção (`next start`), mesma máquina:

| Perfil | LCP | CLS |
| --- | --- | --- |
| 4G (9 Mbps, 170 ms de RTT, CPU 4× mais lenta), throttling real | 0,8 s | 0,006 |
| Slow 4G (padrão do Lighthouse, 1,6 Mbps), throttling real | 2,4 s | 0,006 |
| Slow 4G, simulado (padrão do Lighthouse) | 3,6 a 4,2 s | 0,006 |
| Desktop | 0,7 s | 0,003 |

Peso total: de 17 MB para 2,1 MB. `public/poster` e `public/posters`: de 42 MB para 3,8 MB.

O valor simulado do Slow 4G fica acima da meta porque o modelo penaliza tudo o que é pedido antes do LCP, inclusive o HTML.

## Pendências

- **HTML duplicado:** o pôster vai duas vezes no HTML (757 KB, 114 KB com gzip), como fallback do `Suspense` e como versão com dados. Separar no `DesignPoster` só as partes que dependem do banco (gráficos, rota e pódio) em `Suspense` próprios reduziria o HTML pela metade.
- **Verificação de assets no CI:** acrescentar `- run: npm run verificar:assets` ao `.github/workflows/ci.yml`, depois do `npm run lint`, para impedir que PNG/JPG ou URLs do Figma voltem. Exige um token com permissão de workflow para enviar a alteração.
- **Compressão e cache de `public/`:** o `next start` serve os arquivos de `public/` sem gzip e com `max-age=0`. A hospedagem (CDN) deve comprimir SVGs e definir cache.

## Como medir

```bash
npm run build && npx next start -p 3100
npx lighthouse http://localhost:3100/ --only-categories=performance --throttling-method=devtools
```
