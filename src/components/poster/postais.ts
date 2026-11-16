/**
 * Filmes por trás dos 11 postais pendurados no poster (Retomada a Consolidação e Créditos).
 * Título, ano, diretor e pôster vêm do acervo (data/*.json, public/posters); a importância é
 * texto editorial. Postais com retrato de cineasta apontam para um filme dele que não tem
 * postal próprio.
 */
export interface FilmeDoPostal {
  titulo: string;
  ano: number;
  diretor: string;
  poster: string;
  posterAlt: string;
  importancia: string;
}

export const POSTAIS = {
  "valente-e-o-galo": {
    titulo: "Valente é o Galo",
    ano: 1974,
    diretor: "Fernando Spencer",
    poster: "/posters/valente-e-o-galo-1974.jpg",
    posterAlt:
      "Cartaz do documentário em Super-8 Valente é o Galo (1974), de Fernando Spencer, retratando uma rinha tradicional.",
    importancia:
      "Melhor Super-8 da Jornada Brasileira de Curta-Metragem de 1974, é exemplo da geração que filmou com pouco recurso e manteve o cinema pernambucano vivo entre o Ciclo do Recife e a Retomada.",
  },
  "baile-perfumado": {
    titulo: "Baile Perfumado",
    ano: 1996,
    diretor: "Lírio Ferreira e Paulo Caldas",
    poster: "/posters/baile-perfumado-1996.jpg",
    posterAlt:
      "Pôster de Baile Perfumado com o mascate Benjamin Abrahão segurando uma câmera cinematográfica ao lado de Lampião e Maria Bonita.",
    importancia:
      "Marco da Retomada: Melhor Filme no Festival de Brasília de 1996, levou o cangaço para uma linguagem contemporânea, com trilha ligada ao manguebeat.",
  },
  "o-rap-do-pequeno-principe": {
    titulo: "O Rap do Pequeno Príncipe Contra as Almas Sebosas",
    ano: 2000,
    diretor: "Paulo Caldas e Marcelo Luna",
    poster: "/posters/o-rap-do-pequeno-principe-2000.jpg",
    posterAlt:
      "Pôster de O Rap do Pequeno Príncipe Contra as Almas Sebosas dividindo os rostos de Helinho e do músico Garnizé em Camaragibe.",
    importancia:
      "Documentário que une música da periferia e cinema, como o manguebeat propunha. Venceu como Melhor Documentário no Festival de Havana de 2000.",
  },
  "amarelo-manga": {
    titulo: "Amarelo Manga",
    ano: 2002,
    diretor: "Cláudio Assis",
    poster: "/posters/amarelo-manga-2002.jpg",
    posterAlt:
      "Pôster vibrante em tons de amarelo de Amarelo Manga retratando os personagens do centro do Recife e do Hotel Texas.",
    importancia:
      "Melhor Filme no Festival de Brasília de 2002, abriu os anos 2000 com um retrato cru do centro do Recife e consolidou uma nova geração de realizadores.",
  },
  "o-som-ao-redor": {
    titulo: "O Som ao Redor",
    ano: 2012,
    diretor: "Kleber Mendonça Filho",
    poster: "/posters/o-som-ao-redor-2012.jpg",
    posterAlt:
      "Pôster de O Som ao Redor com vista dos edifícios residenciais do bairro de Setúbal, no Recife, cercados por grades.",
    importancia:
      "Prêmio da crítica em Roterdã e Melhor Filme no Festival do Rio, expôs as tensões de classe de um bairro do Recife e projetou o cinema pernambucano no exterior.",
  },
  aquarius: {
    titulo: "Aquarius",
    ano: 2016,
    diretor: "Kleber Mendonça Filho",
    poster: "/posters/aquarius-2016.jpg",
    posterAlt:
      "Pôster de Aquarius com Sonia Braga como Clara em seu apartamento repleto de discos de vinil na Praia de Boa Viagem.",
    importancia:
      "Exibido em competição em Cannes e Melhor Filme no Grande Prêmio do Cinema Brasileiro, discute memória e especulação imobiliária na orla do Recife.",
  },
  "retratos-fantasmas": {
    titulo: "Retratos Fantasmas",
    ano: 2023,
    diretor: "Kleber Mendonça Filho",
    poster: "/posters/retratos-fantasmas-2023.jpg",
    posterAlt:
      "Pôster de Retratos Fantasmas destacando a fachada iluminada do histórico Cinema São Luiz às margens do Rio Capibaribe no Recife.",
    importancia:
      "Documentário sobre as salas de cinema do centro do Recife, Melhor Filme no Prêmio APCA. Faz da própria história do cinema na cidade o seu tema.",
  },
  "febre-do-rato": {
    titulo: "Febre do Rato",
    ano: 2011,
    diretor: "Cláudio Assis",
    poster: "/posters/febre-do-rato-2011.jpg",
    posterAlt:
      "Pôster em preto e branco com detalhes em amarelo de Febre do Rato mostrando Irandhir Santos como o poeta Zizo no Recife.",
    importancia:
      "Melhor Filme em Paulínia e no Prêmio APCA, reafirmou o cinema de Cláudio Assis como voz da periferia e da poesia marginal do Recife.",
  },
  "cinema-aspirinas-e-urubus": {
    titulo: "Cinema, Aspirinas e Urubus",
    ano: 2005,
    diretor: "Marcelo Gomes",
    poster: "/posters/cinema-aspirinas-e-urubus-2005.jpg",
    posterAlt:
      "Pôster de Cinema, Aspirinas e Urubus mostrando Johann e Ranulpho ao lado do caminhão de aspirinas na caatinga em 1942.",
    importancia:
      "Premiado na mostra Un Certain Regard, em Cannes, levou o sertão pernambucano a um dos maiores festivais do mundo e firmou Marcelo Gomes como cineasta.",
  },
  "o-agente-secreto": {
    titulo: "O Agente Secreto",
    ano: 2025,
    diretor: "Kleber Mendonça Filho",
    poster: "/posters/o-agente-secreto-2025.jpg",
    posterAlt:
      "Pôster de O Agente Secreto com Wagner Moura caracterizado como o professor Marcelo no Recife de 1977.",
    importancia:
      "Melhor Direção e Melhor Ator em Cannes e Globo de Ouro de Melhor Filme em Língua Não Inglesa: o auge do reconhecimento internacional do cinema pernambucano.",
  },
  "recife-frio": {
    titulo: "Recife Frio",
    ano: 2009,
    diretor: "Kleber Mendonça Filho",
    poster: "/posters/recife-frio-2009.jpg",
    posterAlt:
      "Pôster de Recife Frio com a orla de Boa Viagem sob céu cinzento e moradores agasalhados com roupas de inverno.",
    importancia:
      "Curta premiado em Brasília que imagina um Recife de inverno: um cartão-postal às avessas da cidade que é personagem de todo este cinema.",
  },
} satisfies Record<string, FilmeDoPostal>;

export type IdPostal = keyof typeof POSTAIS;
