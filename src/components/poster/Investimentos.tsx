"use client";

import { useId, useState } from "react";
import type { InvestimentoPorAno, Investimentos as DadosInvestimentos } from "@/server/investimentos.ts";

/** Orientação pedida na US-2.6; também é o `aria-describedby` de cada ano. */
const DICA = "Toque em um ano para ver detalhes";

const TIPOS = [
  { valor: "anunciado", rotulo: "Anunciado" },
  { valor: "pago", rotulo: "Pago" },
] as const;

type Tipo = (typeof TIPOS)[number]["valor"];

/**
 * Reais sem centavos, no formato do pôster (R$ 12.950.000). Formata na mão para o HTML do
 * servidor e o do cliente saírem iguais, sem depender do ICU do runtime.
 */
function formatarReais(valor: number): string {
  return `R$ ${String(Math.round(valor)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

function contarProjetos(total: number): string {
  return total === 1 ? "1 projeto" : `${total} projetos`;
}

const CELULA = "border-b border-white/15 py-1.5 pr-2 align-top text-left";

/**
 * Financiamento no audiovisual pernambucano (US-2.6), no lugar dos placeholders "GRAFICOS".
 *
 * Só existe série de valores registrados por filme no edital: a base não tem valor pago, então
 * "Pago" declara a lacuna em vez de repetir (ou inventar) números. O tooltip e a tabela trazem o
 * valor em reais, o número de projetos e a fonte de cada ano.
 */
export function Investimentos({ dados }: { dados?: DadosInvestimentos | null }) {
  const [tipo, setTipo] = useState<Tipo>("anunciado");
  const [ativo, setAtivo] = useState<number | null>(null);
  const id = useId();
  const idDica = `${id}-dica`;
  const idGrafico = `${id}-grafico`;

  const anunciado = tipo === "anunciado";
  const anos = dados?.porAno ?? [];
  const selecionado: InvestimentoPorAno | null = anos.find((item) => item.ano === ativo) ?? null;
  const maior = Math.max(...anos.map((item) => item.valorRegistradoBrl), 1);
  const rotuloTipo = anunciado ? "anunciado" : "pago";

  if (!dados || anos.length === 0) {
    return (
      <figure className="font-corpo text-white">
        <figcaption className="font-titulo text-[38px] uppercase leading-[1.05] text-ouro">
          Financiamento
        </figcaption>
        <p className="mt-4 text-[16px] leading-snug text-papel">
          Os aportes por ano não carregaram. O gráfico de financiamento volta a aparecer quando a
          base responder.
        </p>
      </figure>
    );
  }

  return (
    <figure
      className="font-corpo text-white"
      onKeyDown={(evento) => {
        if (evento.key === "Escape") setAtivo(null);
      }}
    >
      <figcaption className="font-titulo text-[38px] uppercase leading-[1.05] text-ouro">
        Financiamento
      </figcaption>
      <p className="mt-1 text-[19px] font-medium leading-snug">
        no audiovisual pernambucano, por ano do edital
      </p>

      <div
        role="group"
        aria-label="Tipo de valor"
        className="mt-5 flex overflow-hidden rounded-full border border-ouro/50"
      >
        {TIPOS.map(({ valor, rotulo }) => (
          <button
            key={valor}
            type="button"
            aria-pressed={tipo === valor}
            aria-controls={idGrafico}
            onClick={() => setTipo(valor)}
            className={`hotspot min-h-11 flex-1 px-3 py-2 text-[19px] font-semibold transition-colors ${
              tipo === valor ? "bg-ouro text-fundo" : "text-ouro hover:bg-ouro/15"
            }`}
          >
            {rotulo}
          </button>
        ))}
      </div>

      <p className="mt-4 min-h-[66px] text-[15px] leading-[1.35] text-papel">
        {anunciado
          ? "Anunciado: valor destinado a cada filme no edital, como está registrado na base. Não indica a data nem o ritmo do desembolso."
          : "Pago: quanto foi de fato desembolsado por ano. A base do projeto não tem esse registro — só o valor destinado a cada filme."}
      </p>

      <div
        id={idGrafico}
        role="group"
        aria-label={`Financiamento ${rotuloTipo} por ano`}
        className="mt-5"
      >
        {anunciado ? (
          <ul className="flex flex-col gap-[22px]">
            {anos.map((item) => (
              <li key={item.ano}>
                <button
                  type="button"
                  aria-pressed={ativo === item.ano}
                  aria-describedby={idDica}
                  onPointerEnter={(evento) => {
                    if (evento.pointerType === "mouse") setAtivo(item.ano);
                  }}
                  onFocus={() => setAtivo(item.ano)}
                  onClick={() => setAtivo(item.ano)}
                  className="hotspot block w-full text-left"
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-titulo text-[26px] leading-none tabular-nums">
                      {item.ano}
                    </span>
                    <span className="text-[19px] font-semibold tabular-nums text-ouro">
                      {formatarReais(item.valorRegistradoBrl)}
                    </span>
                  </span>
                  <span aria-hidden="true" className="mt-1.5 flex h-[14px] w-full">
                    <span
                      className="block h-full bg-ouro"
                      style={{
                        width: `${Math.max(Math.round((item.valorRegistradoBrl / maior) * 100), 2)}%`,
                      }}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          // Sem campo de valor pago na base: em vez de uma lista de "sem registro", a lacuna
          // vira uma frase só, e a comparação ano a ano fica na tabela.
          <div className="border-t-2 border-ouro/70 pt-4">
            <p className="text-[20px] font-semibold leading-snug">
              A base não registra valores pagos.
            </p>
            <p className="mt-2 text-[16px] leading-snug text-papel">
              O que existe é o valor destinado a cada filme no edital. Não há valor pago nem data
              de desembolso, então não há série por ano para desenhar.
            </p>
            <p className="mt-2 text-[16px] leading-snug text-papel">
              Registrado na base:{" "}
              <span className="font-semibold text-ouro">
                {formatarReais(dados.totalRegistradoBrl)}
              </span>{" "}
              em {dados.totalAportes} aportes ({dados.totalEditais} editais), de {anos[0].ano} a{" "}
              {anos[anos.length - 1].ano}. Veja a comparação na tabela abaixo.
            </p>
          </div>
        )}
      </div>

      {anunciado && (
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="mt-6 min-h-[150px] border-t-2 border-ouro/70 pt-3"
        >
          {selecionado ? (
            <>
              <p className="text-[18px] font-semibold leading-snug">
                {selecionado.ano} — {formatarReais(selecionado.valorRegistradoBrl)}
              </p>
              <p className="mt-1 text-[16px] leading-snug text-papel">
                {contarProjetos(selecionado.projetos)} com aporte registrado
              </p>
              <p className="mt-1 text-[15px] leading-snug text-papel">
                <span className="font-semibold text-white">Fonte:</span>{" "}
                {selecionado.fontes.join("; ")}
              </p>
            </>
          ) : (
            <p className="text-[16px] leading-snug text-papel">
              Passe o mouse, toque ou navegue pelo teclado para escolher um ano e ver o valor, os
              projetos e a fonte.
            </p>
          )}
        </div>
      )}

      {anunciado && (
        <p id={idDica} className="mt-3 text-[15px] italic leading-snug text-papel">
          {DICA}
        </p>
      )}

      {anunciado && (
        <p className="mt-4 text-[16px] leading-snug">
          Total registrado:{" "}
          <span className="font-semibold text-ouro">
            {formatarReais(dados.totalRegistradoBrl)}
          </span>{" "}
          em {dados.totalAportes} aportes ({dados.totalEditais} editais).
        </p>
      )}

      <details className="mt-4">
        <summary className="hotspot inline-block cursor-pointer text-[15px] font-semibold text-ouro underline decoration-ouro/60 underline-offset-4">
          Ver dados em tabela
        </summary>
        <div
          role="region"
          aria-label="Tabela de financiamento por ano"
          tabIndex={0}
          className="mt-3 max-h-[300px] overflow-y-auto"
        >
          <table className="w-full border-collapse text-[13px]">
            <caption className="sr-only">
              Financiamento por ano do edital: valor anunciado, valor pago, número de projetos e
              fonte.
            </caption>
            <thead>
              <tr className="text-papel">
                <th scope="col" className={CELULA}>
                  Ano
                </th>
                <th scope="col" className={CELULA}>
                  Anunciado
                </th>
                <th scope="col" className={CELULA}>
                  Pago
                </th>
                <th scope="col" className={CELULA}>
                  Projetos
                </th>
                <th scope="col" className={CELULA}>
                  Fonte
                </th>
              </tr>
            </thead>
            <tbody>
              {anos.map((item) => (
                <tr key={item.ano}>
                  <th scope="row" className={`${CELULA} font-semibold tabular-nums`}>
                    {item.ano}
                  </th>
                  <td className={`${CELULA} tabular-nums`}>
                    {formatarReais(item.valorRegistradoBrl)}
                  </td>
                  <td className={`${CELULA} tabular-nums`}>Não registrado</td>
                  <td className={`${CELULA} tabular-nums`}>{item.projetos}</td>
                  <td className={CELULA}>{item.fontes.join("; ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <p className="mt-4 text-[14px] leading-snug text-papel">
        Fonte: editais e aportes por filme da base do projeto. O ano é o do edital, não a data do
        pagamento.
      </p>
    </figure>
  );
}
