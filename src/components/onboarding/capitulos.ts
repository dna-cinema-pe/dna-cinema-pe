/** Os 12 capítulos da reportagem, na ordem em que aparecem no poster (US-1.4). */
export const CAPITULOS = [
  { id: "cap-hero", titulo: "Abertura" },
  { id: "cap-contexto", titulo: "Contexto" },
  { id: "cap-ciclo-do-recife", titulo: "Ciclo do Recife" },
  { id: "cap-super-8", titulo: "Super-8" },
  { id: "cap-retomada-e-manguebeat", titulo: "Retomada e Manguebeat" },
  { id: "cap-anos-2000", titulo: "Anos 2000" },
  { id: "cap-consolidacao", titulo: "Consolidação" },
  { id: "cap-financiamento", titulo: "Financiamento" },
  { id: "cap-reconhecimento-internacional", titulo: "Reconhecimento Internacional" },
  { id: "cap-recorte-genero-raca-origem", titulo: "Recorte de Gênero, Raça e Origem" },
  { id: "cap-conclusao", titulo: "Conclusão" },
  { id: "cap-rodape", titulo: "Créditos" },
] as const;

export type CapituloId = (typeof CAPITULOS)[number]["id"];
