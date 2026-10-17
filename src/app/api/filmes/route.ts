import { NextResponse } from "next/server";
import { listarFilmes } from "@/server/filmes.ts";

export async function GET() {
  try {
    const filmes = await listarFilmes();
    return NextResponse.json(filmes);
  } catch (error) {
    console.error("Erro ao listar filmes:", error);
    return NextResponse.json(
      { error: "Erro interno ao listar os filmes." },
      { status: 500 }
    );
  }
}

