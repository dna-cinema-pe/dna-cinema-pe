"use client";

import { useEffect, useId, useRef, useState } from "react";
import { COR_BARRA, type CorBarra } from "@/components/ui/Barra.tsx";
import { useAnimacoesDesligadas } from "./useAnimacoesDesligadas.ts";
import type { RecorteGenero, RecorteOrigem, RecorteRaca } from "@/server/panorama.ts";

const DURACAO_ANIMACAO = 600;
const FONTE_PESSOAS = "Acervo do projeto (data/pessoas.json)";
const ANO_REFERENCIA = "não informado na base";

interface ItemGrafico {
  rotulo: string;
  valor: number | null;
  cor: CorBarra;
}

interface GraficoProps {
  titulo: string;
  itens: readonly ItemGrafico[];
  denominador: number;
  nota: string;
  fonte: string;
}

function formatarPercentual(valor: number) {
  return `${(Math.round(valor * 10) / 10).toFixed(1).replace(".", ",")}%`;
}

function Grafico({ titulo, itens, denominador, nota, fonte }: GraficoProps) {
  const id = useId();
  const alvoRef = useRef<HTMLDivElement>(null);
  const ultimoPonteiroRef = useRef("mouse");
  const [entrouNaTela, setEntrouNaTela] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [tooltipAberto, setTooltipAberto] = useState<string | null>(null);
  const animacoesDesligadas = useAnimacoesDesligadas();
  const progressoVisivel = animacoesDesligadas ? 1 : progresso;

  useEffect(() => {
    const alvo = alvoRef.current;
    if (!alvo) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        setEntrouNaTela(true);
        observador.disconnect();
      },
      { threshold: 0.2 },
    );
    observador.observe(alvo);
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    if (!entrouNaTela || animacoesDesligadas) return;

    const inicio = performance.now();
    let quadro = 0;
    const atualizar = (agora: number) => {
      const tempo = Math.min(1, (agora - inicio) / DURACAO_ANIMACAO);
      setProgresso(1 - (1 - tempo) ** 3);
      if (tempo < 1) quadro = requestAnimationFrame(atualizar);
    };
    quadro = requestAnimationFrame(atualizar);
    return () => cancelAnimationFrame(quadro);
  }, [entrouNaTela, animacoesDesligadas]);

  return (
    <div ref={alvoRef}>
      <figure
        aria-labelledby={`${id}-titulo`}
        className="space-y-5 border-l-4 border-ouro/70 pl-6"
      >
        <h3
          id={`${id}-titulo`}
          className="font-corpo text-[38px] font-semibold leading-tight text-white"
        >
          {titulo}
        </h3>

        <div className="space-y-4">
          {itens.map((item, indice) => {
            const percentual =
              item.valor !== null && denominador > 0 ? (item.valor / denominador) * 100 : null;
            const percentualExibido =
              percentual === null ? null : percentual * progressoVisivel;
            const tooltipId = `${id}-tooltip-${indice}`;
            const tooltipVisivel = tooltipAberto === item.rotulo && percentual !== null;

            return (
              <div key={item.rotulo} className="relative">
                {percentual === null ? (
                  <div className="grid grid-cols-[236px_minmax(0,1fr)_96px] items-center gap-4 text-[26px] text-papel">
                    <span>{item.rotulo}</span>
                    <span
                      aria-hidden="true"
                      className="h-8 rounded-sm border border-dashed border-white/40"
                    />
                    <span className="text-right text-[22px]">Sem dados</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    aria-label={`${item.rotulo}: ${item.valor} de ${denominador} pessoas (${formatarPercentual(percentual)}). Mostrar ano e fonte.`}
                    aria-describedby={tooltipVisivel ? tooltipId : undefined}
                    aria-expanded={tooltipVisivel}
                    className="grid w-full grid-cols-[236px_minmax(0,1fr)_96px] items-center gap-4 rounded-sm text-left text-[26px] text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ouro"
                    onMouseEnter={() => setTooltipAberto(item.rotulo)}
                    onMouseLeave={() => setTooltipAberto(null)}
                    onPointerDown={(evento) => {
                      ultimoPonteiroRef.current = evento.pointerType;
                      if (evento.pointerType !== "mouse") setTooltipAberto(item.rotulo);
                    }}
                    onFocus={() => setTooltipAberto(item.rotulo)}
                    onBlur={() => setTooltipAberto(null)}
                    onClick={(evento) => {
                      // Toque e teclado já abrem no pointerdown/focus: um toggle aqui fecharia na hora.
                      if (evento.detail === 0 || ultimoPonteiroRef.current !== "mouse") return;
                      setTooltipAberto((aberto) => (aberto === item.rotulo ? null : item.rotulo));
                    }}
                    onKeyDown={(evento) => {
                      if (evento.key === "Escape") setTooltipAberto(null);
                    }}
                  >
                    <span>{item.rotulo}</span>
                    <span aria-hidden="true" className="h-8 overflow-hidden rounded-sm bg-white/10">
                      <span
                        className={`block h-full ${COR_BARRA[item.cor]}`}
                        style={{ width: `${percentualExibido}%` }}
                      />
                    </span>
                    <span aria-hidden="true" className="text-right text-[30px] tabular-nums">
                      {formatarPercentual(percentualExibido ?? 0)}
                    </span>
                  </button>
                )}

                {tooltipVisivel && (
                  <span
                    id={tooltipId}
                    role="tooltip"
                    className="absolute right-0 top-full z-50 mt-3 w-[min(100%,480px)] rounded-md border border-ouro/60 bg-fundo p-4 text-[19px] font-normal leading-snug text-white shadow-xl"
                  >
                    {item.valor} de {denominador} pessoas ({formatarPercentual(percentual)}).
                    <br />
                    Ano de referência: {ANO_REFERENCIA}.
                    <br />
                    Fonte: {fonte}.
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <figcaption className="space-y-2 text-[19px] leading-relaxed text-papel">
          <p className="break-words">{nota}</p>
          <p className="break-words text-[17px] leading-relaxed text-papel/80">
            Fonte: {fonte}. Ano de referência: {ANO_REFERENCIA}.
          </p>
        </figcaption>

        {/*
          A tabela acessível vai dentro de um <div class="sr-only">: em `display: table` o
          navegador ignora `width`, `height` e `overflow`, então a tabela (com `white-space:
          nowrap`) ficava com ~1800 px de largura e o texto da nota vazava para fora do gráfico.
        */}
        <div className="sr-only">
          <table>
            <caption>
              {titulo}: valores absolutos e percentuais. Base:{" "}
              {denominador > 0 ? `${denominador} pessoas com o dado informado` : "sem dados no acervo"}.
              Fonte: {fonte}. Ano de referência: {ANO_REFERENCIA}.
            </caption>
            <thead>
              <tr>
                <th scope="col">Categoria</th>
                <th scope="col">Valor absoluto</th>
                <th scope="col">Percentual</th>
              </tr>
            </thead>
            <tbody>
              {itens.map((item) => {
                const percentual =
                  item.valor !== null && denominador > 0 ? (item.valor / denominador) * 100 : null;
                return (
                  <tr key={item.rotulo}>
                    <th scope="row">{item.rotulo}</th>
                    <td>{item.valor === null ? "Não disponível" : item.valor}</td>
                    <td>{percentual === null ? "Não calculado" : formatarPercentual(percentual)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </figure>
    </div>
  );
}

interface Props {
  genero: RecorteGenero | null;
  origem: RecorteOrigem | null;
  raca: RecorteRaca | null;
}

/** Três recortes do acervo. Valores ausentes permanecem sem estimativa. */
export function RecorteDemografico({ genero, origem, raca }: Props) {
  const generoItens: ItemGrafico[] = [
    { rotulo: "Mulheres", valor: genero?.mulheres ?? null, cor: "vermelho" },
    { rotulo: "Homens", valor: genero?.homens ?? null, cor: "ouro" },
  ];
  const origemItens: ItemGrafico[] = [
    { rotulo: "Pernambucanos", valor: origem?.pernambucanos ?? null, cor: "ouro" },
    { rotulo: "Outros", valor: origem?.outros ?? null, cor: "branco" },
  ];
  const classeItens: ItemGrafico[] = [
    { rotulo: "Baixa", valor: null, cor: "vermelho" },
    { rotulo: "Média", valor: null, cor: "ouro" },
    { rotulo: "Alta", valor: null, cor: "branco" },
  ];
  const totalPessoas =
    genero?.totalPessoas ??
    origem?.totalPessoas ??
    (raca ? raca.totalInformado + raca.totalSemInformacao : 0);

  return (
    <section
      aria-labelledby="titulo-recorte-demografico"
      className="absolute left-[calc(60%-55px)] top-[calc(73%+150px)] z-20 w-[700px] space-y-10 rounded-xl border border-white/20 bg-[#0b0909] p-8 font-corpo shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
    >
      <Grafico
        titulo="Gênero"
        itens={generoItens}
        denominador={genero?.totalInformado ?? 0}
        fonte={FONTE_PESSOAS}
        nota={
          genero
            ? `O percentual considera apenas FEMININO e MASCULINO; ${genero.totalForaDoRecorte} de ${genero.totalPessoas} cadastros sem dado ou fora dessas categorias ficam fora do denominador. Este acervo não é um censo do setor.`
            : "Dados de gênero indisponíveis para consulta; nenhum percentual foi estimado."
        }
      />
      <Grafico
        titulo="Origem"
        itens={origemItens}
        denominador={origem?.totalInformado ?? 0}
        fonte={FONTE_PESSOAS}
        nota={
          origem
            ? `Naturalidade conhecida: ${origem.totalInformado} de ${origem.totalPessoas} cadastros; ${origem.totalSemNaturalidade} sem naturalidade ficam fora do denominador. “Outros” reúne naturalidades conhecidas fora de PE.`
            : "Dados de naturalidade indisponíveis para consulta; nenhum percentual foi estimado."
        }
      />
      <Grafico
        titulo="Classe social"
        itens={classeItens}
        denominador={0}
        fonte="schema.prisma e data/pessoas.json (variável não coletada)"
        nota="O acervo não registra classe social; não há contagens ou percentuais disponíveis para baixa, média ou alta."
      />
      <p className="break-words border-t border-white/20 pt-6 text-[19px] leading-relaxed text-papel">
        {raca
          ? `Limite de raça/cor: apenas ${raca.totalInformado} autodeclarações entre ${totalPessoas} cadastros; a cobertura é insuficiente para apresentar uma distribuição.`
          : "Limite de raça/cor: não há dados consultáveis suficientes para apresentar uma distribuição."}
      </p>
    </section>
  );
}
