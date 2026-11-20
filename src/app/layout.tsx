import type { Metadata } from "next";
import { Alfa_Slab_One, Geist, Geist_Mono, Poppins } from "next/font/google";
import { SCRIPT_ANIMACOES } from "@/components/landing/movimento.ts";
import "./globals.css";

const alfaSlabOne = Alfa_Slab_One({
  variable: "--font-alfa",
  weight: "400",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        <a
          href="#conteudo"
          className="font-corpo sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ouro focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-fundo focus:shadow-2xl"
        >
          Pular para o conteúdo
        </a>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_ANIMACOES }} />
        {children}
      </body>
    </html>
  );
}
