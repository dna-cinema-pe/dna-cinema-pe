/** Chave do localStorage com a escolha da pessoa: "ligadas" ou "desligadas". */
export const CHAVE_ANIMACOES = "dna-animacoes";

/**
 * Script executado antes da pintura (ver layout.tsx) para definir `data-animacoes` no `<html>`.
 * A escolha salva sobrepõe a preferência do sistema (`prefers-reduced-motion`).
 */
export const SCRIPT_ANIMACOES = `try{var e=localStorage.getItem("${CHAVE_ANIMACOES}");var d=e?e==="desligadas":matchMedia("(prefers-reduced-motion: reduce)").matches;document.documentElement.dataset.animacoes=d?"desligadas":"ligadas"}catch(_){}`;

/** Lê o estado efetivo; só chamar no cliente (efeitos e handlers). */
export function prefereMenosMovimento(): boolean {
  const atual = document.documentElement.dataset.animacoes;
  if (atual) return atual === "desligadas";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Liga ou desliga as animações e guarda a escolha, que sobrepõe a do sistema. */
export function definirAnimacoes(ligadas: boolean) {
  const valor = ligadas ? "ligadas" : "desligadas";
  document.documentElement.dataset.animacoes = valor;
  try {
    localStorage.setItem(CHAVE_ANIMACOES, valor);
  } catch {
    // Armazenamento bloqueado: a escolha vale só até recarregar a página.
  }
}

/** Acompanha mudanças da preferência do sistema enquanto não houver escolha salva. */
export function acompanharPreferenciaDoSistema(): () => void {
  const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
  const aoMudar = () => {
    try {
      if (localStorage.getItem(CHAVE_ANIMACOES)) return;
    } catch {
      return;
    }
    document.documentElement.dataset.animacoes = consulta.matches ? "desligadas" : "ligadas";
  };
  consulta.addEventListener("change", aoMudar);
  return () => consulta.removeEventListener("change", aoMudar);
}
