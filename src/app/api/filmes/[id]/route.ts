import { NextResponse, type NextRequest } from "next/server";
import { obterDetalhesCompletosFilme } from "@/server/filmes.ts";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numId = Number.parseInt(id, 10);

    if (Number.isNaN(numId) || numId <= 0) {
      return NextResponse.json(
        { error: "ID inválido. Deve ser um número inteiro positivo." },
        { status: 400 }
      );
    }

    const detalhes = await obterDetalhesCompletosFilme(numId);

    if (!detalhes) {
      return NextResponse.json(
        { error: "Filme não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(detalhes);
  } catch (error) {
    console.error("Erro ao obter detalhes do filme:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar detalhes do filme." },
      { status: 500 }
    );
  }
}

