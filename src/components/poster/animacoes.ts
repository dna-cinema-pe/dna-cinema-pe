/** Classes e seletores das animações do poster (definidas em globals.css). */
const CLASSE_POSTER = "falling-poster";
const CLASSE_POSTER_CAIDO = "falling-poster--fallen";
const CLASSE_POSTER_POUSADO = "falling-poster--pousado";
const CLASSE_BOTAO_REPOR = "falling-poster__repor";
const CLASSE_CORTINAS = "super8-cortinas";
const CLASSE_CORTINAS_ABERTAS = "super8-cortinas--abertas";
const CLASSE_TITULO_SUPER8 = "super8-titulo";
const CLASSE_TITULO_SUPER8_REVELADO = "super8-titulo--revelado";
const CLASSE_HOLOFOTE = "super8-holofote";
const CLASSE_HOLOFOTE_PARADO = "super8-holofote--parado";

/** Quanto tempo o holofote varre as cortinas fechadas antes de elas abrirem. */
export const VARREDURA_ANTES_DE_ABRIR_MS = 3000;
const CLASSE_AVIAO = "plane-flight";
const CLASSE_AVIAO_ATIVO = "plane-flight--active";

/** Elementos com animação em loop; pausam fora da tela. */
export const SELETOR_LOOPS =
  ".cloud-float, .red-cloud-loop, .gold-cloud-loop, .sun-spin, .cross-sway, .bird-flap, .wind-sway, .super8-holofote";

export function obterPoster(): HTMLElement | null {
  return document.querySelector<HTMLElement>(`.${CLASSE_POSTER}`);
}

export function obterBotaoReporPoster(): HTMLButtonElement | null {
  return document.querySelector<HTMLButtonElement>(`.${CLASSE_BOTAO_REPOR}`);
}

export function obterAviao(): HTMLElement | null {
  return document.querySelector<HTMLElement>(`.${CLASSE_AVIAO}`);
}

export function derrubarPoster() {
  obterPoster()?.classList.add(CLASSE_POSTER_CAIDO);
}

/** Fim da queda: revela "↺ Pendurar de novo". Chamado no `animationend` do corpo do pôster. */
export function pousarPoster() {
  const poster = obterPoster();
  if (poster?.classList.contains(CLASSE_POSTER_CAIDO)) poster.classList.add(CLASSE_POSTER_POUSADO);
}

/** Volta o pôster ao pendurado, para a pessoa poder derrubá-lo de novo. */
export function reporPoster() {
  obterPoster()?.classList.remove(CLASSE_POSTER_CAIDO, CLASSE_POSTER_POUSADO);
}

export function obterCortinas(): HTMLElement | null {
  return document.querySelector<HTMLElement>(`.${CLASSE_CORTINAS}`);
}

/**
 * Abre as cortinas do Super-8 e para o holofote: o loop é cortado na posição em que está e uma
 * transição o leva de volta ao centro. O título surge depois, pelo delay em globals.css.
 */
export function abrirCortinas() {
  obterCortinas()?.classList.add(CLASSE_CORTINAS_ABERTAS);
  document.querySelector(`.${CLASSE_TITULO_SUPER8}`)?.classList.add(CLASSE_TITULO_SUPER8_REVELADO);

  const holofote = document.querySelector<HTMLElement>(`.${CLASSE_HOLOFOTE}`);
  if (!holofote) return;
  holofote.style.transform = getComputedStyle(holofote).transform;
  holofote.classList.add(CLASSE_HOLOFOTE_PARADO);
  void holofote.offsetWidth;
  holofote.style.transform = "";
}

export function iniciarVoo() {
  obterAviao()?.classList.add(CLASSE_AVIAO_ATIVO);
}

/** Reinicia o voo do início: tira a classe, força o reflow e recoloca. */
export function repetirVoo() {
  const aviao = obterAviao();
  if (!aviao) return;
  aviao.classList.remove(CLASSE_AVIAO_ATIVO);
  void aviao.offsetWidth;
  aviao.classList.add(CLASSE_AVIAO_ATIVO);
}
