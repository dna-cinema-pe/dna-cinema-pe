/** Classes e seletores das animações do poster (definidas em globals.css). */
const CLASSE_POSTER = "falling-poster";
const CLASSE_POSTER_CAIDO = "falling-poster--fallen";
const CLASSE_AVIAO = "plane-flight";
const CLASSE_AVIAO_ATIVO = "plane-flight--active";

/** Elementos com animação em loop; pausam fora da tela. */
export const SELETOR_LOOPS =
  ".cloud-float, .red-cloud-loop, .gold-cloud-loop, .sun-spin, .bird-flap, .wind-sway";

export function obterPoster(): HTMLElement | null {
  return document.querySelector<HTMLElement>(`.${CLASSE_POSTER}`);
}

export function obterAviao(): HTMLElement | null {
  return document.querySelector<HTMLElement>(`.${CLASSE_AVIAO}`);
}

export function derrubarPoster() {
  obterPoster()?.classList.add(CLASSE_POSTER_CAIDO);
}

/** Volta o pôster ao pendurado, para a pessoa poder derrubá-lo de novo. */
export function reporPoster() {
  obterPoster()?.classList.remove(CLASSE_POSTER_CAIDO);
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
