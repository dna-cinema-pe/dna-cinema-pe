"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CAPITULOS, type CapituloId } from "./capitulos.ts";

const CHAVE_TOUR_VISTO = "tour_visto";
const CHAVE_HOTSPOTS_VISTOS = "hotspots_vistos";

function lerHotspotsVistos(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const bruto = window.sessionStorage.getItem(CHAVE_HOTSPOTS_VISTOS);
    return new Set(bruto ? (JSON.parse(bruto) as string[]) : []);
  } catch {
    return new Set();
  }
}

/** Posição de cada âncora de capítulo, em % da altura total rolável — a mesma régua do `progresso`. */
function medirPercentuaisCapitulos(): Record<CapituloId, number> {
  const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
  const resultado = {} as Record<CapituloId, number>;
  for (const capitulo of CAPITULOS) {
    const elemento = document.getElementById(capitulo.id);
    if (!elemento || alturaTotal <= 0) {
      resultado[capitulo.id] = 0;
      continue;
    }
    const topoAbsoluto = elemento.getBoundingClientRect().top + window.scrollY;
    resultado[capitulo.id] = Math.min(100, Math.max(0, (topoAbsoluto / alturaTotal) * 100));
  }
  return resultado;
}

interface OnboardingState {
  /** Tour de boas-vindas (US-1.1). */
  tourAberto: boolean;
  passoTour: number;
  abrirTour: (origem?: HTMLElement | null) => void;
  fecharTour: () => void;
  irParaPasso: (passo: number) => void;

  /** Redução de movimento (US-1.3). */
  reduzirMovimento: boolean;

  /** Hotspots descobertos (US-1.3 e US-1.5). */
  totalHotspots: number;
  hotspotsVistos: Set<string>;
  registrarHotspot: (id: string) => void;
  marcarHotspotVisto: (id: string) => void;

  /** Navegação por capítulos (US-1.4) — tudo derivado do mesmo `progresso` contínuo. */
  progresso: number;
  percentuaisCapitulos: Record<CapituloId, number>;
  capituloAtivo: CapituloId;
  capitulosVisitados: Set<CapituloId>;
  irParaCapitulo: (id: CapituloId, atualizarUrl?: boolean) => void;
}

const OnboardingContext = createContext<OnboardingState | null>(null);

const PERCENTUAIS_INICIAIS = Object.fromEntries(
  CAPITULOS.map((c) => [c.id, 0]),
) as Record<CapituloId, number>;

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [tourAberto, setTourAberto] = useState(false);
  const [passoTour, setPassoTour] = useState(0);
  const [reduzirMovimento, setReduzirMovimento] = useState(false);

  const [idsHotspots, setIdsHotspots] = useState<Set<string>>(new Set());
  const [hotspotsVistos, setHotspotsVistos] = useState<Set<string>>(new Set());

  const [progresso, setProgresso] = useState(0);
  const [percentuaisCapitulos, setPercentuaisCapitulos] =
    useState<Record<CapituloId, number>>(PERCENTUAIS_INICIAIS);

  const origemTourRef = useRef<HTMLElement | null>(null);

  // Abre o tour sozinho na primeira visita (sem tour_visto no localStorage).
  useEffect(() => {
    function inicializar() {
      let visto = false;
      try {
        visto = window.localStorage.getItem(CHAVE_TOUR_VISTO) === "true";
      } catch {
        visto = false;
      }
      setHotspotsVistos(lerHotspotsVistos());
      if (!visto) setTourAberto(true);

      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReduzirMovimento(media.matches);
      return media;
    }
    const media = inicializar();
    const ouvir = (e: MediaQueryListEvent) => setReduzirMovimento(e.matches);
    media.addEventListener("change", ouvir);
    return () => media.removeEventListener("change", ouvir);
  }, []);

  // Progresso de leitura (barra do topo) via scroll da página — fonte única de verdade.
  useEffect(() => {
    function atualizarProgresso() {
      const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
      const percentual = alturaTotal > 0 ? (window.scrollY / alturaTotal) * 100 : 0;
      setProgresso(Math.min(100, Math.max(0, percentual)));
    }
    atualizarProgresso();
    window.addEventListener("scroll", atualizarProgresso, { passive: true });
    return () => window.removeEventListener("scroll", atualizarProgresso);
  }, []);

  // Posição (%) de cada capítulo na mesma régua — remedida no mount e ao redimensionar.
  useEffect(() => {
    function atualizarPercentuais() {
      setPercentuaisCapitulos(medirPercentuaisCapitulos());
    }
    atualizarPercentuais();
    window.addEventListener("resize", atualizarPercentuais);
    return () => window.removeEventListener("resize", atualizarPercentuais);
  }, []);

  // Capítulo ativo e visitados: derivados ao vivo do próprio `progresso`, sem passos intermediários.
  const indiceAtivo = useMemo(() => {
    let indice = 0;
    for (let i = 0; i < CAPITULOS.length; i++) {
      if (percentuaisCapitulos[CAPITULOS[i].id] <= progresso + 0.5) indice = i;
    }
    return indice;
  }, [progresso, percentuaisCapitulos]);

  const capituloAtivo = CAPITULOS[indiceAtivo].id;
  const capitulosVisitados = useMemo(
    () => new Set(CAPITULOS.slice(0, indiceAtivo + 1).map((c) => c.id)),
    [indiceAtivo],
  );

  const abrirTour = useCallback((origem?: HTMLElement | null) => {
    origemTourRef.current = origem ?? null;
    setPassoTour(0);
    setTourAberto(true);
  }, []);

  const fecharTour = useCallback(() => {
    setTourAberto(false);
    try {
      window.localStorage.setItem(CHAVE_TOUR_VISTO, "true");
    } catch {
      // localStorage indisponível (modo privado, etc.) — segue sem persistir.
    }
    origemTourRef.current?.focus();
    origemTourRef.current = null;
  }, []);

  const irParaPasso = useCallback((passo: number) => setPassoTour(passo), []);

  const registrarHotspot = useCallback((id: string) => {
    setIdsHotspots((anterior) => {
      if (anterior.has(id)) return anterior;
      const novo = new Set(anterior);
      novo.add(id);
      return novo;
    });
  }, []);

  const marcarHotspotVisto = useCallback((id: string) => {
    setHotspotsVistos((anterior) => {
      if (anterior.has(id)) return anterior;
      const novo = new Set(anterior);
      novo.add(id);
      try {
        window.sessionStorage.setItem(CHAVE_HOTSPOTS_VISTOS, JSON.stringify([...novo]));
      } catch {
        // sessionStorage indisponível — segue sem persistir.
      }
      return novo;
    });
  }, []);

  const irParaCapitulo = useCallback((id: CapituloId, atualizarUrl = true) => {
    const alvo = document.getElementById(id);
    if (!alvo) return;
    alvo.scrollIntoView({ behavior: "smooth", block: "start" });
    if (atualizarUrl) {
      window.history.pushState(null, "", `#${id.replace(/^cap-/, "")}`);
    }
  }, []);

  const valor = useMemo<OnboardingState>(
    () => ({
      tourAberto,
      passoTour,
      abrirTour,
      fecharTour,
      irParaPasso,
      reduzirMovimento,
      totalHotspots: idsHotspots.size,
      hotspotsVistos,
      registrarHotspot,
      marcarHotspotVisto,
      progresso,
      percentuaisCapitulos,
      capituloAtivo,
      capitulosVisitados,
      irParaCapitulo,
    }),
    [
      tourAberto,
      passoTour,
      abrirTour,
      fecharTour,
      irParaPasso,
      reduzirMovimento,
      idsHotspots,
      hotspotsVistos,
      registrarHotspot,
      marcarHotspotVisto,
      progresso,
      percentuaisCapitulos,
      capituloAtivo,
      capitulosVisitados,
      irParaCapitulo,
    ],
  );

  return <OnboardingContext.Provider value={valor}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding(): OnboardingState {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding precisa estar dentro de <OnboardingProvider>.");
  return ctx;
}
