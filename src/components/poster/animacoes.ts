/** Classes e seletores das animações do poster (definidas em globals.css). */
const CLASSE_POSTER = "falling-poster";
const CLASSE_POSTER_CAIDO = "falling-poster--fallen";
const CLASSE_POSTER_POUSADO = "falling-poster--pousado";
const CLASSE_BOTAO_REPOR = "falling-poster__repor";
const CLASSE_CORTINAS = "super8-cortinas";
const CLASSE_CORTINAS_ABERTAS = "super8-cortinas--abertas";
const CLASSE_TITULO_SUPER8 = "super8-titulo";
const CLASSE_TITULO_SUPER8_OCULTO = "super8-titulo--oculto";
const CLASSE_HOLOFOTE = "super8-holofote";
const CLASSE_HOLOFOTE_APAGADO = "super8-holofote--apagado";

/** Quanto tempo o holofote varre as cortinas fechadas antes de elas abrirem. */
export const VARREDURA_ANTES_DE_ABRIR_MS = 3000;
const CLASSE_ARCO = "arco-frevo";
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

export function obterArco(): HTMLElement | null {
  return document.querySelector<HTMLElement>(`.${CLASSE_ARCO}`);
}

/**
 * Abre o arco de guarda-chuva de frevo conforme a rolagem: fechado quando o topo dele entra pela
 * base da janela, aberto por inteiro quando o topo chega a 35% da altura. Volta a fechar se a
 * pessoa rolar para cima. O ângulo vai para `--abertura-arco`, usado pela máscara em globals.css.
 */
export function atualizarArco(arco: HTMLElement) {
  const inicio = window.innerHeight;
  const fim = window.innerHeight * 0.35;
  const progresso = (inicio - arco.getBoundingClientRect().top) / (inicio - fim);
  const angulo = Math.min(1, Math.max(0, progresso)) * 95;
  arco.style.setProperty("--abertura-arco", `${angulo.toFixed(1)}deg`);
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
 * Fim da cena do Super-8: título e holofote somem juntos e as cortinas abrem, revelando a foto.
 * As três classes entram ao mesmo tempo; a espera das cortinas (`--sumir-titulo`) está em globals.css.
 */
export function abrirCortinas() {
  document.querySelector(`.${CLASSE_TITULO_SUPER8}`)?.classList.add(CLASSE_TITULO_SUPER8_OCULTO);
  document.querySelector(`.${CLASSE_HOLOFOTE}`)?.classList.add(CLASSE_HOLOFOTE_APAGADO);
  obterCortinas()?.classList.add(CLASSE_CORTINAS_ABERTAS);
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
