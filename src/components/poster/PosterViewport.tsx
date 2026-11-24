"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/** Dimensões do frame no Figma (desktop). O mobile não tem design: o frame só é reduzido. */
const LARGURA = 1920;
const ALTURA = 25712;

/**
 * Espaço, em px do frame, que o pôster abre depois do subtítulo da Abertura abaixo de 1280 px
 * (US-4.1), para o subtítulo (16 px reais) não passar por cima da cena da cidade.
 *
 * No Figma, o subtítulo começa em y = 1005 e a cidade em y = 1142. A conta estima a altura do
 * subtítulo pelo tamanho e pela largura dele (~100 letras, ~0,55 em por letra, linha de 1,5 em)
 * e soma um respiro mínimo de 16 px reais antes da cidade; o espaço é o quanto isso passa de 1142
 * (nunca negativo).
 *
 * ATENÇÃO: os valores abaixo precisam ser iguais às classes do subtítulo em Abertura.tsx
 * (`max-xl:text-…`, `max-xl:top-…`, `max-xl:w-…` e `max-md:w-…`).
 */
const SUBTITULO = {
  /** `max-xl:text-[length:max(32px,calc(14px*var(--inv,1)))]` */
  fonteMinima: 32,
  fonteReal: 14,
  /** `max-xl:top-[calc(3%+233.64px+15px*var(--inv,1))]` */
  descidaReal: 15,
  /** `max-xl:w-[1300px]` e `max-md:w-[1600px]` */
  larguraTablet: 1300,
  larguraCelular: 1400,
};

function espacoDaAbertura(inv: number): number {
  if (!window.matchMedia("(width < 80rem)").matches) return 0;
  const celular = window.matchMedia("(width < 48rem)").matches;
  const fonte = Math.max(SUBTITULO.fonteMinima, SUBTITULO.fonteReal * inv);
  const largura = celular ? SUBTITULO.larguraCelular : SUBTITULO.larguraTablet;
  const linhas = (100 * 0.55 * fonte) / largura + 1;
  const fimDoSubtitulo = 1005 + SUBTITULO.descidaReal * inv + linhas * 1.5 * fonte;
  return Math.max(0, fimDoSubtitulo + 16 * inv - 1142);
}

/** Colunas de parágrafos do Contexto (Contexto.tsx), acima e abaixo do varal. */
const SELETOR_CONTEXTO_1 = '[data-medir="contexto-primeira-linha"]';
const SELETOR_CONTEXTO_2 = '[data-medir="contexto-segunda-linha"]';

/** Coluna com os dois parágrafos do Ciclo do Recife (CicloDoRecife.tsx). */
const SELETOR_CICLO = '[data-medir="ciclo-texto"]';

/** Texto abaixo do varal com as fotos do Ciclo do Recife (46:308, no DesignPoster). */
const SELETOR_CICLO_FINAL = '[data-medir="ciclo-final"]';

/** Legenda (132:732, no DesignPoster) e coluna de parágrafos do Super-8 (Super8.tsx). */
const SELETOR_SUPER8_LEGENDA = '[data-medir="super8-legenda"]';
const SELETOR_SUPER8 = '[data-medir="super8-texto"]';

/**
 * Os três cartões da Retomada e Manguebeat (DesignPoster), cada um com o topo (no Figma) dos fogos
 * do Anos 2000 que ficam embaixo dele: à esquerda (221:109, 37,6%), no centro (221:110, 37,54%) e
 * à direita (221:113, 38,19%). Comparar cada cartão só com os fogos da mesma coluna deixa o Anos
 * 2000 o mais alto possível sem sobreposição.
 */
/** Coluna de parágrafos do Anos 2000 (Anos2000.tsx). */
const SELETOR_ANOS2000 = '[data-medir="anos2000-texto"]';

/**
 * Topo da estrela à direita dos parágrafos do Anos 2000 (304:668, 40,42%), o primeiro desenho que
 * desce depois deles: no celular ela ficaria dentro da coluna de texto. Logo abaixo vêm a âncora e
 * o título da Consolidação.
 */
const TOPO_DA_ESTRELA_ANOS2000 = 10393;

/** Coluna de parágrafos da Consolidação (Consolidacao.tsx). */
const SELETOR_CONSOLIDACAO = '[data-medir="consolidacao-texto"]';

/** Topo do primeiro prendedor do varal da Consolidação (297:263, 42,81%). */
const TOPO_DO_VARAL_CONSOLIDACAO = 11007;

/**
 * Financiamento (DesignPoster): os 7 parágrafos (`data-fin`) e, para cada um, o fim (no Figma) do
 * gráfico ao lado dele, que desce junto. Abaixo de 768 px os parágrafos ficam mais altos; cada um
 * desce o necessário para começar a 24 px reais do anterior (`--fin-desloc-N`, nunca menor que o
 * do parágrafo anterior, para os gráficos não se sobreporem; o primeiro desce
 * FINANCIAMENTO_AFASTAMENTO), e a rota do Reconhecimento Internacional desce o necessário para
 * começar a FINANCIAMENTO_RESPIRO px reais do texto e dos gráficos (`--espaco-financiamento`).
 */
const FIM_DOS_GRAFICOS_FINANCIAMENTO = [13551, 13872, 14185, 14512, 14835, 15155, 0];

/** Topo do pino mais alto da rota do Reconhecimento Internacional (Cannes, RotaInternacional.tsx). */
const TOPO_DA_ROTA = 15293;

/** No celular, quanto o Financiamento inteiro desce para se afastar do varal acima (px reais). */
const FINANCIAMENTO_AFASTAMENTO = 40;

/** Folga entre o fim do Financiamento e a rota do avião, em px reais. */
const FINANCIAMENTO_RESPIRO = 48;

/** Coluna de parágrafos do Reconhecimento Internacional (ReconhecimentoInternacional.tsx). */
const SELETOR_RECONHECIMENTO = '[data-medir="reconhecimento-texto"]';

/** Topo do pódio no Figma (Podio.tsx, 66% + 48,08 px). */
const TOPO_DO_PODIO = 17018;

/**
 * Pódio, em todas as larguras: a fileira de filmes (DegrausDoPodio, topo 17990, só aparece ao
 * tocar num degrau) desce `--podio-fileira-desloc` para ficar PODIO_RESPIRO px reais abaixo do
 * pódio e dos rótulos dos degraus (`data-podio-rotulo`, que no celular ficam maiores), e o Recorte
 * de Gênero e Raça (topo 18330) desce para começar PODIO_RESPIRO px reais depois dela
 * (`--espaco-podio`). O espaço fica reservado mesmo com a fileira fechada, para ela não cobrir o
 * título ao abrir. No desktop, com o pódio a 70%, os dois valores ficam negativos: a fileira e o
 * resto da página sobem.
 *
 * Altura da fileira: 355 px no desktop; no celular, foto (240) + espaço (12) + nome com até 3
 * linhas de 10 px reais (`line-clamp-3`, linha de 1,25) + margem de baixo (20).
 */
const PODIO_RESPIRO = 40;
const TOPO_DA_FILEIRA = 17990;
const TOPO_DO_RECORTE = 18330;

/** No desktop o pódio é menor e a fileira fica mais perto dos rótulos (px reais). */
const PODIO_RESPIRO_DESKTOP = 12;

function espacosDoPodio(container: HTMLElement, inv: number, celular: boolean) {
  const desktop = window.matchMedia("(width >= 80rem)").matches;
  const respiroDosRotulos = desktop ? PODIO_RESPIRO_DESKTOP : PODIO_RESPIRO;
  let fimDosRotulos = 0;
  for (const rotulo of container.querySelectorAll<HTMLElement>("[data-podio-rotulo]")) {
    const topo = parseFloat(getComputedStyle(rotulo).top);
    if (Number.isFinite(topo)) fimDosRotulos = Math.max(fimDosRotulos, topo + rotulo.offsetHeight);
  }
  // Sem mínimo: no desktop o pódio fica menor (Podio.tsx), e a fileira e o Recorte sobem com ele
  // (deslocamento e espaço negativos).
  const desloc = fimDosRotulos + respiroDosRotulos * inv - TOPO_DA_FILEIRA;
  const alturaDaFileira = celular ? 240 + 12 + 3 * 1.25 * 10 * inv + 20 : 355;
  const espaco = TOPO_DA_FILEIRA + desloc + alturaDaFileira + PODIO_RESPIRO * inv - TOPO_DO_RECORTE;
  return { desloc, espaco };
}

/**
 * Parágrafos posicionados um a um, com gráficos ao lado (Financiamento e Recorte), no celular:
 * cada parágrafo (`[atributo="N"]`) desce o necessário para começar a 24 px reais do anterior,
 * nunca menos que o anterior (para os gráficos não se sobreporem) nem menos que `inicio` px reais;
 * o gráfico ao lado de cada um termina, no Figma, em `fimDosGraficos[N - 1]` (0 se não houver).
 * Devolve os deslocamentos e quanto o que vem depois precisa descer para começar a `respiro` px
 * reais do texto e dos gráficos (pode ser negativo, se `podeSubir`).
 */
function deslocamentosEmColuna(
  container: HTMLElement,
  inv: number,
  atributo: string,
  fimDosGraficos: readonly number[],
  topoDoSeguinte: number,
  { inicio = 0, respiro = 24, podeSubir = false } = {},
) {
  const desloc = fimDosGraficos.map(() => 0);
  if (!window.matchMedia("(width < 48rem)").matches) return { desloc, espaco: 0 };
  let fimAnterior = -Infinity;
  let deslocAnterior = inicio * inv;
  let fim = 0;
  for (let i = 0; i < desloc.length; i++) {
    const p = container.querySelector<HTMLElement>(`[${atributo}="${i + 1}"]`);
    if (!p) return { desloc: desloc.map(() => 0), espaco: 0 };
    const topo = parseFloat(getComputedStyle(p).top);
    const novo = Math.max(deslocAnterior, fimAnterior + 24 * inv - topo);
    desloc[i] = novo;
    fimAnterior = topo + novo + p.offsetHeight;
    deslocAnterior = novo;
    fim = Math.max(fim, fimAnterior, fimDosGraficos[i] ? fimDosGraficos[i] + novo : 0);
  }
  const espaco = fim + respiro * inv - topoDoSeguinte;
  return { desloc, espaco: podeSubir ? espaco : Math.max(0, espaco) };
}

const deslocamentosDoFinanciamento = (container: HTMLElement, inv: number) =>
  deslocamentosEmColuna(container, inv, "data-fin", FIM_DOS_GRAFICOS_FINANCIAMENTO, TOPO_DA_ROTA, {
    inicio: FINANCIAMENTO_AFASTAMENTO,
    respiro: FINANCIAMENTO_RESPIRO,
  });

/** Título da Conclusão no Figma (82% + 151,16 px). */
const TOPO_DA_CONCLUSAO = 21235;

/** Recorte de Gênero e Raça no celular: coluna única em fluxo (RECORTE_CELULAR no DesignPoster). */
const SELETOR_RECORTE = '[data-medir="recorte-celular"]';

/** Gráfico de raça da versão do Figma (tablet e desktop) e o fim da área da dica dele (76% + 288 px). */
const SELETOR_RECORTE_RACA = '[data-medir="recorte-raca"]';
const FIM_DA_DICA_DE_RACA = 19830;

/** Fim da jornada (FimDaJornada.tsx) e título dos Créditos (89% + 240,32 px), no celular. */
const SELETOR_FIM_DA_JORNADA = '[data-medir="fim-jornada"]';
const TOPO_DOS_CREDITOS = 23124;

/** Conclusão (Conclusao.tsx) e Créditos (Creditos.tsx), no celular. */
const SELETOR_CONCLUSAO = '[data-medir="conclusao-texto"]';
const TOPO_DO_FIM_DA_JORNADA = 22959;
const SELETOR_CREDITOS = '[data-medir="creditos"]';
const TOPO_DO_RODAPE = 24005;

/** Quanto o varal com os cartões da Retomada desce no celular, em px reais (DesignPoster). */
const CARTOES_DESCIDA = 40;

const CARTOES_RETOMADA = [
  { seletor: '[data-medir="retomada-cartao-1"]', topoDosFogos: 9668 },
  { seletor: '[data-medir="retomada-cartao-2"]', topoDosFogos: 9652 },
  { seletor: '[data-medir="retomada-cartao-3"]', topoDosFogos: 9819 },
];

/** Topo do varal do Contexto no Figma (o prendedor, 9,14% de 25712 px). */
const TOPO_DO_VARAL = 2350;

/** Topo do primeiro elemento do Ciclo do Recife no Figma (as nuvens, 12,99% de 25712 px). */
const TOPO_DO_CICLO = 3340;

/**
 * Topo da primeira imagem que desce depois dos parágrafos do Ciclo do Recife no Figma: a folha
 * (288:172), logo acima do varal com as fotos. O prédio à direita (288:131) desce junto com o
 * varal, na mesma posição relativa a ele, e pode encostar no canto direito do texto.
 */
const TOPO_DAS_FOTOS_DO_CICLO = 4369;

/** Topo da ponte (294:204) no Figma, o primeiro desenho depois do texto abaixo das fotos do Ciclo. */
const TOPO_DA_PONTE = 5359;

/** Topo dos parágrafos do Super-8 no Figma (27% + 36,76 px). */
const TOPO_DOS_PARAGRAFOS_SUPER8 = 6979;

/** Topo do primeiro caranguejo (301:541, 28% + 102,64 px), o primeiro desenho depois do Super-8. */
const TOPO_DOS_CARANGUEJOS = 7302;

/**
 * Quanto o que vem depois de uma coluna de parágrafos precisa descer abaixo de 1280 px, em px do
 * frame, para começar a `respiro` px reais (24 por padrão) do fim do texto (`topoDoSeguinte` é a
 * posição no Figma).
 * Mede a altura da coluna em vez de estimar (`offsetHeight` ignora o `scale()`). O topo vem do
 * `top` calculado pelo CSS (a posição do Figma, como `16% + 41,08px`), que não inclui a margem de
 * `.poster-deslocar` nem o `translate`. Não usar `offsetTop`: ele inclui essa margem, que no Ciclo
 * depende do próprio resultado, e o arredondamento para px inteiros fazia o cálculo oscilar sem
 * parar (60 vezes por segundo), o que derrubava o Safari do iPhone.
 *
 * - Contexto, primeira linha → varal: `--espaco-contexto`.
 * - Contexto, segunda linha → Ciclo do Recife: `--espaco-ciclo`. A segunda linha e o Ciclo
 *   descem os dois `--espaco-contexto`, que por isso não entra na conta.
 * - Ciclo do Recife, parágrafos → varal com as fotos e o resto: `--espaco-ciclo-texto`.
 * - Ciclo do Recife, texto abaixo das fotos → ponte e o resto: `--espaco-ciclo-final`.
 * - Super-8, legenda → parágrafos e o resto: `--espaco-super8-legenda` (respiro de 40 px).
 * - Super-8, parágrafos → caranguejos, "Retomada e Manguebeat" e o resto: `--espaco-super8`
 *   (respiro de 40 px).
 * - Retomada, cartões → fogos do Anos 2000 embaixo de cada um, e o resto: `--espaco-retomada`
 *   (respiro de 16 px; vale o cartão que pede mais espaço).
 * - Anos 2000, parágrafos → estrela, Consolidação e o resto: `--espaco-anos2000`.
 * - Consolidação, parágrafos → varais e o resto: `--espaco-consolidacao`.
 * - Financiamento: ver `deslocamentosDoFinanciamento`.
 * - Reconhecimento Internacional, parágrafos → pódio e o resto: `--espaco-reconhecimento`
 *   (respiro de 48 px).
 * - Pódio, fileira de filmes → Recorte de Gênero e Raça e o resto: `--espaco-podio`.
 */
function espacoDepois(
  container: HTMLElement,
  seletor: string,
  topoDoSeguinte: number,
  inv: number,
  respiro = 24,
): number {
  if (!window.matchMedia("(width < 80rem)").matches) return 0;
  const coluna = container.querySelector<HTMLElement>(seletor);
  if (!coluna || !coluna.offsetHeight) return 0;
  const topo = parseFloat(getComputedStyle(coluna).top);
  if (!Number.isFinite(topo)) return 0;
  const fimDoTexto = topo + coluna.offsetHeight;
  return Math.max(0, fimDoTexto + respiro * inv - topoDoSeguinte);
}


/**
 * Reduz o frame de 1920 px para caber na largura da janela, mantendo as proporções.
 * Fica invisível até medir a largura, para não piscar em tamanho cheio.
 *
 * Expõe `--inv` (1 / escala): `calc(16px * var(--inv))` dentro do frame aparece com 16 px
 * reais na tela, em qualquer largura. Usado nos ajustes de texto abaixo de 1280 px (US-4.1).
 * Expõe também `--espaco-abertura` (ver `espacoDaAbertura`), `--espaco-contexto` e
 * `--espaco-ciclo`, `--espaco-ciclo-texto`, `--espaco-ciclo-final`, `--espaco-super8-legenda` e
 * `--espaco-super8`, `--espaco-retomada`, `--espaco-anos2000`, `--espaco-consolidacao`,
 * `--espaco-financiamento`, `--espaco-reconhecimento`, `--espaco-podio`, `--espaco-recorte`,
 * `--espaco-conclusao`, `--espaco-jornada` e `--espaco-creditos` (ver `espacoDepois` e
 * `deslocamentosEmColuna`), as somas `--ate-podio`, `--ate-recorte`, `--ate-conclusao` e
 * `--ate-jornada`, e os deslocamentos `--fin-desloc-N` e `--podio-fileira-desloc`; a página cresce
 * na soma dos espaços.
 */
export function PosterViewport({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [escala, setEscala] = useState<number | null>(null);
  const [espaco, setEspaco] = useState(0);
  const [espacoContexto, setEspacoContexto] = useState(0);
  const [espacoCiclo, setEspacoCiclo] = useState(0);
  const [espacoCicloTexto, setEspacoCicloTexto] = useState(0);
  const [espacoCicloFinal, setEspacoCicloFinal] = useState(0);
  const [espacoSuper8Legenda, setEspacoSuper8Legenda] = useState(0);
  const [espacoSuper8, setEspacoSuper8] = useState(0);
  const [espacoRetomada, setEspacoRetomada] = useState(0);
  const [espacoAnos2000, setEspacoAnos2000] = useState(0);
  const [espacoConsolidacao, setEspacoConsolidacao] = useState(0);
  const [espacoFinanciamento, setEspacoFinanciamento] = useState(0);
  const [deslocFinanciamento, setDeslocFinanciamento] = useState<readonly number[]>([]);
  const [espacoReconhecimento, setEspacoReconhecimento] = useState(0);
  const [espacoPodio, setEspacoPodio] = useState(0);
  const [deslocFileira, setDeslocFileira] = useState(0);
  const [espacoRecorte, setEspacoRecorte] = useState(0);
  const [espacoJornada, setEspacoJornada] = useState(0);
  const [espacoConclusao, setEspacoConclusao] = useState(0);
  const [espacoCreditos, setEspacoCreditos] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Só atualiza um espaço quando ele muda mais de meio pixel: variações menores não aparecem e
    // cada atualização muda a altura da página, o que dispara o ResizeObserver de novo.
    const seMudou = (novo: number) => (atual: number) => (Math.abs(novo - atual) > 0.5 ? novo : atual);
    const atualizar = () => {
      const novaEscala = Math.min(container.clientWidth / LARGURA, 1);
      const inv = 1 / novaEscala;
      setEscala(novaEscala);
      setEspaco(seMudou(espacoDaAbertura(inv)));
      setEspacoContexto(seMudou(espacoDepois(container, SELETOR_CONTEXTO_1, TOPO_DO_VARAL, inv)));
      setEspacoCiclo(seMudou(espacoDepois(container, SELETOR_CONTEXTO_2, TOPO_DO_CICLO, inv)));
      setEspacoCicloTexto(seMudou(espacoDepois(container, SELETOR_CICLO, TOPO_DAS_FOTOS_DO_CICLO, inv)));
      setEspacoCicloFinal(seMudou(espacoDepois(container, SELETOR_CICLO_FINAL, TOPO_DA_PONTE, inv)));
      setEspacoSuper8Legenda(
        seMudou(espacoDepois(container, SELETOR_SUPER8_LEGENDA, TOPO_DOS_PARAGRAFOS_SUPER8, inv, 40)),
      );
      setEspacoSuper8(seMudou(espacoDepois(container, SELETOR_SUPER8, TOPO_DOS_CARANGUEJOS, inv, 40)));
      // Os cartões só crescem abaixo de 768 px; no tablet ficam como no Figma, onde o terceiro já
      // termina ao lado dos fogos, sem encostar.
      const celular = window.matchMedia("(width < 48rem)").matches;
      // No celular, o varal com os cartões desce mais 40 px reais (DesignPoster, CARTOES_DESCIDA).
      const retomada = CARTOES_RETOMADA.map((c) =>
        espacoDepois(container, c.seletor, c.topoDosFogos - CARTOES_DESCIDA * inv, inv, 16),
      );
      setEspacoRetomada(seMudou(celular ? Math.max(0, ...retomada) : 0));
      setEspacoAnos2000(seMudou(espacoDepois(container, SELETOR_ANOS2000, TOPO_DA_ESTRELA_ANOS2000, inv)));
      setEspacoConsolidacao(
        seMudou(espacoDepois(container, SELETOR_CONSOLIDACAO, TOPO_DO_VARAL_CONSOLIDACAO, inv)),
      );
      const financiamento = deslocamentosDoFinanciamento(container, inv);
      setEspacoFinanciamento(seMudou(financiamento.espaco));
      setEspacoReconhecimento(
        seMudou(espacoDepois(container, SELETOR_RECONHECIMENTO, TOPO_DO_PODIO, inv, 48)),
      );
      const podio = espacosDoPodio(container, inv, celular);
      setEspacoPodio(seMudou(podio.espaco));
      setDeslocFileira(seMudou(podio.desloc));
      const listaMudou = (nova: readonly number[]) => (atual: readonly number[]) =>
        nova.length !== atual.length || nova.some((d, i) => Math.abs(d - atual[i]) > 0.5) ? nova : atual;
      setDeslocFinanciamento(listaMudou(financiamento.desloc));
      // Fim (topo do CSS + altura, no frame do Figma) dos elementos visíveis que casam com o seletor.
      const fimDe = (seletor: string) =>
        Math.max(
          0,
          ...[...container.querySelectorAll<HTMLElement>(seletor)]
            .filter((el) => el.offsetHeight)
            .map((el) => parseFloat(getComputedStyle(el).top) + el.offsetHeight),
        );
      // A Conclusão sobe para perto do fim do Recorte (espaço negativo): 40 px reais no celular
      // (coluna única) e 64 px do tablet para cima (texto da versão do Figma e gráfico de raça,
      // cuja dica termina em 76% + 288 px).
      const fimDoRecorte = celular
        ? fimDe(SELETOR_RECORTE)
        : Math.max(fimDe("[data-rec]"), fimDe(SELETOR_RECORTE_RACA), FIM_DA_DICA_DE_RACA);
      setEspacoRecorte(
        seMudou(fimDoRecorte ? fimDoRecorte + (celular ? 40 : 64) * inv - TOPO_DA_CONCLUSAO : 0),
      );
      // O fim da jornada fica 24 px reais (celular) ou 48 px (tablet e desktop) depois da Conclusão,
      // que é uma coluna em fluxo em todas as larguras; pode subir.
      const fimDaConclusao = fimDe(SELETOR_CONCLUSAO);
      setEspacoConclusao(
        seMudou(fimDaConclusao ? fimDaConclusao + (celular ? 24 : 48) * inv - TOPO_DO_FIM_DA_JORNADA : 0),
      );
      setEspacoJornada(
        seMudou(celular ? espacoDepois(container, SELETOR_FIM_DA_JORNADA, TOPO_DOS_CREDITOS, inv) : 0),
      );
      setEspacoCreditos(seMudou(celular ? espacoDepois(container, SELETOR_CREDITOS, TOPO_DO_RODAPE, inv, 40) : 0));
    };
    atualizar();

    // As colunas do Contexto mudam de altura com a largura e quando a fonte termina de carregar.
    const observer = new ResizeObserver(atualizar);
    observer.observe(container);
    for (const seletor of [
      SELETOR_CONTEXTO_1,
      SELETOR_CONTEXTO_2,
      SELETOR_CICLO,
      SELETOR_CICLO_FINAL,
      SELETOR_SUPER8_LEGENDA,
      SELETOR_SUPER8,
      ...CARTOES_RETOMADA.map((c) => c.seletor),
      SELETOR_ANOS2000,
      SELETOR_CONSOLIDACAO,
      ...FIM_DOS_GRAFICOS_FINANCIAMENTO.map((_, i) => `[data-fin="${i + 1}"]`),
      SELETOR_RECONHECIMENTO,
      "[data-podio-rotulo]",
      SELETOR_RECORTE,
      SELETOR_FIM_DA_JORNADA,
      SELETOR_CONCLUSAO,
      SELETOR_CREDITOS,
    ]) {
      const coluna = container.querySelector(seletor);
      if (coluna) observer.observe(coluna);
    }
    return () => observer.disconnect();
  }, []);

  const escalaAtual = escala ?? 1;
  // Somas acumuladas, usadas pelos níveis do pódio em diante (globals.css).
  const atePodio =
    espaco +
    espacoContexto +
    espacoCiclo +
    espacoCicloTexto +
    espacoCicloFinal +
    espacoSuper8Legenda +
    espacoSuper8 +
    espacoRetomada +
    espacoAnos2000 +
    espacoConsolidacao +
    espacoFinanciamento +
    espacoReconhecimento +
    espacoPodio;
  const ateRecorte = atePodio + espacoRecorte;
  const ateConclusao = ateRecorte + espacoConclusao;
  const ateJornada = ateConclusao + espacoJornada;
  const total = ateJornada + espacoCreditos;

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-[1920px] overflow-hidden bg-fundo"
      style={{ height: (ALTURA + total) * escalaAtual }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={
          {
            width: LARGURA,
            height: ALTURA,
            transform: `scale(${escalaAtual})`,
            visibility: escala === null ? "hidden" : "visible",
            "--inv": 1 / escalaAtual,
            "--espaco-abertura": `${espaco}px`,
            "--espaco-contexto": `${espacoContexto}px`,
            "--espaco-ciclo": `${espacoCiclo}px`,
            "--espaco-ciclo-texto": `${espacoCicloTexto}px`,
            "--espaco-ciclo-final": `${espacoCicloFinal}px`,
            "--espaco-super8-legenda": `${espacoSuper8Legenda}px`,
            "--espaco-super8": `${espacoSuper8}px`,
            "--espaco-retomada": `${espacoRetomada}px`,
            "--espaco-anos2000": `${espacoAnos2000}px`,
            "--espaco-consolidacao": `${espacoConsolidacao}px`,
            "--espaco-financiamento": `${espacoFinanciamento}px`,
            "--espaco-reconhecimento": `${espacoReconhecimento}px`,
            "--espaco-podio": `${espacoPodio}px`,
            "--podio-fileira-desloc": `${deslocFileira}px`,
            "--espaco-recorte": `${espacoRecorte}px`,
            "--espaco-conclusao": `${espacoConclusao}px`,
            "--espaco-creditos": `${espacoCreditos}px`,
            "--ate-podio": `${atePodio}px`,
            "--ate-recorte": `${ateRecorte}px`,
            "--ate-conclusao": `${ateConclusao}px`,
            "--ate-jornada": `${ateJornada}px`,
            "--espaco-jornada": `${espacoJornada}px`,
            ...Object.fromEntries(deslocFinanciamento.map((d, i) => [`--fin-desloc-${i + 1}`, `${d}px`])),
          } as CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}
