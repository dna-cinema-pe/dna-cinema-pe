import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { SCRIPT_ANIMACOES } from "@/components/landing/movimento.ts";
import { SCRIPT_ESCALA_POSTER } from "@/components/poster/escalaInicial.ts";
import { ScriptDeMetricas } from "@/components/ScriptDeMetricas.tsx";
import "./globals.css";

/*
 * Fontes da Home hospedadas no repositório (US-4.3, arquivos e licenças OFL em ./fonts), só o
 * subset latin, que cobre o português. Com `swap`, o texto aparece na fonte de fallback (com
 * métricas ajustadas pelo next/font) e troca quando o arquivo chega, sem bloquear a pintura.
 * Os caminhos precisam ser literais: o next/font lê os argumentos no build.
 */
const alfaSlabOne = localFont({
  variable: "--font-alfa",
  display: "swap",
  src: [{ path: "./fonts/alfa-slab-one-latin-400-normal.woff2", weight: "400", style: "normal" }],
  fallback: ["Georgia", "serif"],
});

const poppins = localFont({
  variable: "--font-poppins",
  display: "swap",
  src: [
    { path: "./fonts/poppins-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "./fonts/poppins-latin-800-normal.woff2", weight: "800", style: "normal" },
    { path: "./fonts/poppins-latin-900-normal.woff2", weight: "900", style: "normal" },
  ],
  fallback: ["system-ui", "Arial", "sans-serif"],
});

// Geist é a fonte padrão do restante do app (/filmes). Sem preload (US-4.3): a Home usa a
// Poppins e a Alfa Slab One, e o preload disputaria banda com o hero; onde for usada, carrega.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "DNA Cinema PE",
  description:
    "Uma investigação sobre a história, os recursos e as pessoas por trás do cinema feito em Pernambuco.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${alfaSlabOne.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_ANIMACOES + SCRIPT_ESCALA_POSTER }} />
        {children}
        <ScriptDeMetricas />
      </body>
    </html>
  );
}
