import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db.ts";

// O loading.tsx inicia o streaming (status 200) antes de o notFound() da página
// rodar. Por isso o 404 de /filmes/[id] é decidido aqui, antes da renderização.
export const config = {
  matcher: "/filmes/:id",
};

export async function proxy(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/")[2];

  const idValido = /^[1-9]\d{0,8}$/.test(id);
  const existe =
    idValido &&
    (await prisma.filme.count({ where: { idFilme: Number(id) } })) > 0;

  if (!existe) {
    // Rota inexistente: o Next responde 404 real com a página not-found raiz.
    return NextResponse.rewrite(new URL("/filme-nao-encontrado", request.url));
  }
}
