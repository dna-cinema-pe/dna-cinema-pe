/**
 * Métricas de engajamento (US-4.4), com o Umami Cloud. Decisão, catálogo de eventos e regras de
 * privacidade em docs/decisions/0007-metricas-de-engajamento.md.
 *
 * Todo evento passa por `registrarEvento` ou `registrarUmaVez`: trocar de ferramenta muda só
 * este arquivo. Os dados são sempre identificadores fixos do código, nunca dados pessoais.
 */

/**
 * Website ID do site no Umami Cloud. Não é segredo (aparece no HTML público). Vazio, o script
 * não é carregado e os eventos não saem do navegador.
 */
export const UMAMI_WEBSITE_ID: string = "42b1181a-ec90-4871-87a4-7d19f74841c1";

/** Domínio de produção (sem protocolo). Só as visitas nele são contadas. */
export const DOMINIO_PRODUCAO: string = "dna-cinema-pe.vercel.app";

export const URL_SCRIPT_UMAMI = "https://cloud.umami.is/script.js";

/** Eventos instrumentados e os dados de cada um (ver a tabela na ADR 0007). */
export interface Eventos {
  "tour-iniciado": { origem: "automatico" | "botao" };
  "tour-concluido": undefined;
  "tour-pulado": { passo: number };
  "capitulo-alcancado": { capitulo: string };
  "hotspot-usado": { hotspot: string };
  "modal-filme-aberto": { filme: string };
  "grafico-consultado": {
    grafico: "genero" | "raca" | "podio" | "rota-internacional";
    item?: string;
  };
}

export type NomeEvento = keyof Eventos;

type Dados = Record<string, string | number>;

declare global {
  interface Window {
    umami?: { track: (nome: string, dados?: Dados) => void };
  }
}

/** Eventos disparados antes de o script carregar (ele chega com `lazyOnload`). */
const fila: Array<[string, Dados | undefined]> = [];
const LIMITE_DA_FILA = 50;

/** Eventos já registrados nesta visita à página (só em memória; nada fica no navegador). */
const registrados = new Set<string>();

function enviar(nome: string, dados: Dados | undefined) {
  if (process.env.NODE_ENV !== "production") {
    console.debug("[métricas]", nome, dados ?? "");
  }
  if (typeof window === "undefined") return;
  if (window.umami) {
    window.umami.track(nome, dados);
  } else if (fila.length < LIMITE_DA_FILA) {
    fila.push([nome, dados]);
  }
}

/** Registra o evento toda vez que é chamado. */
export function registrarEvento<N extends NomeEvento>(
  nome: N,
  ...[dados]: Eventos[N] extends undefined ? [] : [Eventos[N]]
) {
  enviar(nome, dados as Dados | undefined);
}

/**
 * Registra o evento só na primeira vez em que aparece com esses dados nesta visita à página.
 * Para interações que se repetem muito (passar o mouse, rolar).
 */
export function registrarUmaVez<N extends NomeEvento>(
  nome: N,
  ...[dados]: Eventos[N] extends undefined ? [] : [Eventos[N]]
) {
  const chave = `${nome}:${JSON.stringify(dados ?? {})}`;
  if (registrados.has(chave)) return;
  registrados.add(chave);
  enviar(nome, dados as Dados | undefined);
}

/** Envia os eventos da fila; chamado quando o script do Umami termina de carregar. */
export function esvaziarFilaDeMetricas() {
  if (!window.umami) return;
  for (const [nome, dados] of fila.splice(0)) window.umami.track(nome, dados);
}
