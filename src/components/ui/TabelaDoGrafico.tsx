interface LinhaDoGrafico {
  rotulo: string;
  valor: string;
}

interface Props {
  /** Título do gráfico; vira a legenda da figura e da tabela. */
  titulo: string;
  /** Explicação em texto do que o gráfico mostra, inclusive as ressalvas dos dados. */
  descricao: string;
  /** Nome da coluna de categorias (ex.: "Gênero", "Cor/raça"). */
  colunaRotulo: string;
  /** Nome da coluna de valores (ex.: "Percentual"). */
  colunaValor: string;
  linhas: readonly LinhaDoGrafico[];
}

/**
 * Alternativa textual para os gráficos (WCAG 2.2 AA / 1.1.1): descrição + tabela com os mesmos
 * dados. Fica visualmente oculta para não alterar o layout do pôster, mas é lida por leitores de
 * tela e permanece navegável por teclado.
 */
export function TabelaDoGrafico({
  titulo,
  descricao,
  colunaRotulo,
  colunaValor,
  linhas,
}: Props) {
  return (
    <figure className="sr-only">
      <figcaption>{titulo}</figcaption>
      <p>{descricao}</p>
      <table>
        <caption>{titulo}</caption>
        <thead>
          <tr>
            <th scope="col">{colunaRotulo}</th>
            <th scope="col">{colunaValor}</th>
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha) => (
            <tr key={linha.rotulo}>
              <th scope="row">{linha.rotulo}</th>
              <td>{linha.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
