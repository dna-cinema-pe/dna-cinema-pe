-- CreateTable
CREATE TABLE "filme" (
    "id_filme" SERIAL NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "ano" SMALLINT NOT NULL,
    "genero" VARCHAR(100),
    "poster_url" VARCHAR(500),
    "poster_alt" VARCHAR(255),
    "sinopse" TEXT,
    "classificacao_indicativa" VARCHAR(3),
    "cidade_filmagem" VARCHAR(100),

    CONSTRAINT "filme_pkey" PRIMARY KEY ("id_filme")
);

-- CreateTable
CREATE TABLE "premiacao" (
    "id_premiacao" SERIAL NOT NULL,
    "nome_premiacao" VARCHAR(150) NOT NULL,
    "descricao_premiacao" TEXT,
    "nivel_importancia_premiacao" SMALLINT NOT NULL,
    "flag_nacional" BOOLEAN NOT NULL,

    CONSTRAINT "premiacao_pkey" PRIMARY KEY ("id_premiacao")
);

-- CreateTable
CREATE TABLE "edital" (
    "id_edital" SERIAL NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "ano" SMALLINT NOT NULL,
    "valor_total_brl" DECIMAL(15,2) NOT NULL,

    CONSTRAINT "edital_pkey" PRIMARY KEY ("id_edital")
);

-- CreateTable
CREATE TABLE "pessoa" (
    "id_pessoa" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "idade" SMALLINT NOT NULL DEFAULT -1,
    "genero" VARCHAR(20),
    "flag_eh_nordestino" BOOLEAN,

    CONSTRAINT "pessoa_pkey" PRIMARY KEY ("id_pessoa")
);

-- CreateTable
CREATE TABLE "filme_premiacao" (
    "id_filme_premiacao" SERIAL NOT NULL,
    "id_filme" INTEGER NOT NULL,
    "id_premiacao" INTEGER NOT NULL,
    "edicao_ano" SMALLINT NOT NULL,
    "categoria_premiacao" VARCHAR(150),
    "resultado" VARCHAR(10) NOT NULL,

    CONSTRAINT "filme_premiacao_pkey" PRIMARY KEY ("id_filme_premiacao")
);

-- CreateTable
CREATE TABLE "filme_edital" (
    "id_filme" INTEGER NOT NULL,
    "id_edital" INTEGER NOT NULL,
    "valor_investido_filme_brl" DECIMAL(15,2) NOT NULL,

    CONSTRAINT "filme_edital_pkey" PRIMARY KEY ("id_filme","id_edital")
);

-- CreateTable
CREATE TABLE "filme_pessoa" (
    "id_filme_pessoa" SERIAL NOT NULL,
    "id_filme" INTEGER NOT NULL,
    "id_pessoa" INTEGER NOT NULL,
    "funcao_pessoa" VARCHAR(50) NOT NULL,
    "flag_eh_cineasta" BOOLEAN NOT NULL,

    CONSTRAINT "filme_pessoa_pkey" PRIMARY KEY ("id_filme_pessoa")
);

-- CreateIndex
CREATE UNIQUE INDEX "premiacao_nome_premiacao_key" ON "premiacao"("nome_premiacao");

-- CreateIndex
CREATE UNIQUE INDEX "filme_premiacao_id_filme_id_premiacao_edicao_ano_categoria__key" ON "filme_premiacao"("id_filme", "id_premiacao", "edicao_ano", "categoria_premiacao");

-- CreateIndex
CREATE UNIQUE INDEX "filme_pessoa_id_filme_id_pessoa_funcao_pessoa_key" ON "filme_pessoa"("id_filme", "id_pessoa", "funcao_pessoa");

-- AddForeignKey
ALTER TABLE "filme_premiacao" ADD CONSTRAINT "filme_premiacao_id_filme_fkey" FOREIGN KEY ("id_filme") REFERENCES "filme"("id_filme") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filme_premiacao" ADD CONSTRAINT "filme_premiacao_id_premiacao_fkey" FOREIGN KEY ("id_premiacao") REFERENCES "premiacao"("id_premiacao") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filme_edital" ADD CONSTRAINT "filme_edital_id_filme_fkey" FOREIGN KEY ("id_filme") REFERENCES "filme"("id_filme") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filme_edital" ADD CONSTRAINT "filme_edital_id_edital_fkey" FOREIGN KEY ("id_edital") REFERENCES "edital"("id_edital") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filme_pessoa" ADD CONSTRAINT "filme_pessoa_id_filme_fkey" FOREIGN KEY ("id_filme") REFERENCES "filme"("id_filme") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filme_pessoa" ADD CONSTRAINT "filme_pessoa_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id_pessoa") ON DELETE CASCADE ON UPDATE CASCADE;
