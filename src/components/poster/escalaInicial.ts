/**
 * Estado inicial do pôster (US-4.3), calculado antes da primeira pintura.
 *
 * O PosterViewport só mede depois de hidratar. Esperar por ele deixava o pôster inteiro invisível
 * até o JavaScript rodar, e o hero (o LCP) demorava segundos para aparecer em 4G. Este script,
 * executado no <body> antes do conteúdo (ver layout.tsx), define no <html>:
 * - `--escala-poster` e `--inv-poster`: a escala do frame de 1920 px e o inverso dela;
 * - `--espaco-abertura-poster`: o espaço depois do subtítulo da Abertura (`espacoDaAbertura`),
 *   que só depende da largura da janela, para a cidade do hero já aparecer abaixo do subtítulo;
 * - `data-poster-medindo`: abaixo de 1280 px, esconde os grupos `.poster-deslocar` (globals.css),
 *   cujas posições dependem das medições do PosterViewport, até ele terminar de medir. Assim nada
 *   aparece no lugar errado e depois pula (CLS). Sem JavaScript o atributo não existe e nada fica
 *   escondido.
 * O PosterViewport usa esses valores até medir.
 *
 * O `scrollbar-gutter: stable` do globals.css garante que a largura medida aqui não muda quando
 * a barra de rolagem aparece.
 */
export const LARGURA_POSTER = 1920;

export const ATRIBUTO_MEDINDO = "data-poster-medindo";

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
 *
 * A função precisa ser autocontida (sem referências de fora dela): o texto dela também roda no
 * script de antes da pintura (SCRIPT_ESCALA_POSTER).
 */
export function espacoDaAbertura(inv: number): number {
  const subtitulo = {
    /** `max-xl:text-[length:max(32px,calc(14px*var(--inv,1)))]` */
    fonteMinima: 32,
    fonteReal: 14,
    /** `max-xl:top-[calc(3%+233.64px+15px*var(--inv,1))]` */
    descidaReal: 15,
    /** `max-xl:w-[1300px]` e `max-md:w-[1600px]` */
    larguraTablet: 1300,
    larguraCelular: 1400,
  };
  if (!window.matchMedia("(width < 80rem)").matches) return 0;
  const celular = window.matchMedia("(width < 48rem)").matches;
  const fonte = Math.max(subtitulo.fonteMinima, subtitulo.fonteReal * inv);
  const largura = celular ? subtitulo.larguraCelular : subtitulo.larguraTablet;
  const linhas = (100 * 0.55 * fonte) / largura + 1;
  const fimDoSubtitulo = 1005 + subtitulo.descidaReal * inv + linhas * 1.5 * fonte;
  return Math.max(0, fimDoSubtitulo + 16 * inv - 1142);
}

export const SCRIPT_ESCALA_POSTER = `try{var h=document.documentElement,s=Math.min(Math.min(h.clientWidth,${LARGURA_POSTER})/${LARGURA_POSTER},1),i=1/s;h.style.setProperty("--escala-poster",String(s));h.style.setProperty("--inv-poster",String(i));h.style.setProperty("--espaco-abertura-poster",(${espacoDaAbertura.toString()})(i)+"px");h.setAttribute("${ATRIBUTO_MEDINDO}","")}catch(_){}`;
