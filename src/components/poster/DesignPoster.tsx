/* eslint-disable @next/next/no-img-element */
import type {
  PodioPremios,
  PremiosInternacionais,
  RecorteGenero,
  RecorteRaca,
} from "@/server/panorama.ts";
import { Hotspot } from "@/components/onboarding/Hotspot.tsx";
import { Abertura } from "./secoes/Abertura.tsx";
import { Conclusao } from "./secoes/Conclusao.tsx";
import { Contexto } from "./secoes/Contexto.tsx";
import { Creditos } from "./secoes/Creditos.tsx";
import { CicloDoRecife } from "./secoes/CicloDoRecife.tsx";
import { Super8 } from "./secoes/Super8.tsx";
import { RetomadaManguebeat } from "./secoes/RetomadaManguebeat.tsx";
import { Anos2000 } from "./secoes/Anos2000.tsx";
import { Consolidacao } from "./secoes/Consolidacao.tsx";
import { Podio } from "./secoes/Podio.tsx";
import { ReconhecimentoInternacional } from "./secoes/ReconhecimentoInternacional.tsx";
import { PostalPendurado } from "./PostalPendurado.tsx";

const assetPathPrefix = "/poster";
const imgImage2 = `${assetPathPrefix}/6cfd1.png`;
const imgImage1 = `${assetPathPrefix}/4f3e8.png`;
const imgImage15 = `${assetPathPrefix}/a239c.png`;
const imgRectangle15 = `${assetPathPrefix}/bb5e0.png`;
const imgRectangle16 = `${assetPathPrefix}/1764f.png`;
const imgRectangle17 = `${assetPathPrefix}/51870.png`;
const imgRectangle19 = `${assetPathPrefix}/a6ff2.png`;
const imgRectangle25 = `${assetPathPrefix}/cfa07.png`;
const imgRectangle27 = `${assetPathPrefix}/04a8f.png`;
const imgRectangle26 = `${assetPathPrefix}/14c87.png`;
const imgRectangle21 = `${assetPathPrefix}/7dabb.png`;
const imgRectangle22 = `${assetPathPrefix}/1124d.png`;
const imgRectangle23 = `${assetPathPrefix}/50445.png`;
const imgRectangle24 = `${assetPathPrefix}/f00b8.png`;
const imgChatGptImage25DeSetDe20261458301 = `${assetPathPrefix}/0e24a.png`;
const imgCamada1 = `${assetPathPrefix}/052eb.svg`;
const imgCamada2 = `${assetPathPrefix}/0a233.svg`;
const imgCamada3 = `${assetPathPrefix}/a1863.svg`;
const imgCamada4 = `${assetPathPrefix}/82523.svg`;
const imgBandeira = `${assetPathPrefix}/dfc92.svg`;
const imgVector10 = `${assetPathPrefix}/95194.svg`;
const imgVector13 = `${assetPathPrefix}/84431.svg`;
const imgVector14 = `${assetPathPrefix}/529d0.svg`;
const imgVector15 = `${assetPathPrefix}/27564.svg`;
const imgVector16 = `${assetPathPrefix}/e0a91.svg`;
const imgVector17 = `${assetPathPrefix}/0b80f.svg`;
const imgVector18 = `${assetPathPrefix}/3ca9e.svg`;
const imgVector19 = `${assetPathPrefix}/c6e73.svg`;
const imgVector20 = `${assetPathPrefix}/ce3aa.svg`;
const imgVector21 = `${assetPathPrefix}/518be.svg`;
const imgVector22 = `${assetPathPrefix}/e44aa.svg`;
const imgVector23 = `${assetPathPrefix}/abd73.svg`;
const imgVector24 = `${assetPathPrefix}/7a13f.svg`;
const imgVector25 = `${assetPathPrefix}/c2e92.svg`;
const imgVector26 = `${assetPathPrefix}/f9158.svg`;
const imgVector27 = `${assetPathPrefix}/85111.svg`;
const imgVector28 = `${assetPathPrefix}/e5812.svg`;
const imgVector29 = `${assetPathPrefix}/834db.svg`;
const imgVector30 = `${assetPathPrefix}/f9c81.svg`;
const imgVector31 = `${assetPathPrefix}/1397b.svg`;
const imgVector32 = `${assetPathPrefix}/0e400.svg`;
const imgVector33 = `${assetPathPrefix}/91ea5.svg`;
const imgVector34 = `${assetPathPrefix}/d9430.svg`;
const imgVector35 = `${assetPathPrefix}/6205c.svg`;
const imgVector36 = `${assetPathPrefix}/8cb4a.svg`;
const imgVector37 = `${assetPathPrefix}/2a629.svg`;
const imgVector38 = `${assetPathPrefix}/c3972.svg`;
const imgVector39 = `${assetPathPrefix}/badc5.svg`;
const imgVector40 = `${assetPathPrefix}/767c6.svg`;
const imgVector41 = `${assetPathPrefix}/1e033.svg`;
const imgVector42 = `${assetPathPrefix}/31dd0.svg`;
const imgVector43 = `${assetPathPrefix}/c161a.svg`;
const imgVector44 = `${assetPathPrefix}/a232d.svg`;
const imgVector45 = `${assetPathPrefix}/8c28c.svg`;
const imgVector46 = `${assetPathPrefix}/e9934.svg`;
const imgVector47 = `${assetPathPrefix}/2fc2c.svg`;
const imgVector48 = `${assetPathPrefix}/f74f8.svg`;
const imgVector49 = `${assetPathPrefix}/8aba2.svg`;
const imgVector50 = `${assetPathPrefix}/cd21c.svg`;
const imgVector51 = `${assetPathPrefix}/cf0c8.svg`;
const imgVector52 = `${assetPathPrefix}/13643.svg`;
const imgGroup9 = `${assetPathPrefix}/6e384.svg`;
const imgGroup32 = `${assetPathPrefix}/88159.svg`;
const imgVector53 = `${assetPathPrefix}/a19ac.svg`;
const imgArcoCiclo = `${assetPathPrefix}/90d88.svg`;
const imgCicloRecife1 = `${assetPathPrefix}/ciclo-recife-1.png`;
const imgCicloRecife2 = `${assetPathPrefix}/ciclo-recife-2.png`;
const imgCicloRecife3 = `${assetPathPrefix}/ciclo-recife-3.png`;
const imgEllipse2 = `${assetPathPrefix}/ea310.svg`;
const imgGroup14 = `${assetPathPrefix}/5f164.svg`;
const imgGroup15 = `${assetPathPrefix}/b0c58.svg`;
const imgGroup20 = `${assetPathPrefix}/291ef.svg`;
const imgGroup21 = `${assetPathPrefix}/24d68.svg`;
const imgVector54 = `${assetPathPrefix}/c916d.svg`;
const imgVector55 = `${assetPathPrefix}/f972f.svg`;
const imgGroup42 = `${assetPathPrefix}/19879.svg`;
const imgGroup43 = `${assetPathPrefix}/29b3f.svg`;
const imgVector56 = `${assetPathPrefix}/912fd.svg`;
const imgVector57 = `${assetPathPrefix}/28f91.svg`;
const imgGroup44 = `${assetPathPrefix}/710c4.svg`;
const imgGroup6 = `${assetPathPrefix}/f0eaf.svg`;
const imgGroup10 = `${assetPathPrefix}/b6ff1.svg`;
const imgVector58 = `${assetPathPrefix}/25fd4.svg`;
const imgVector59 = `${assetPathPrefix}/a18d5.svg`;
const imgVector60 = `${assetPathPrefix}/617c3.svg`;
const imgVector61 = `${assetPathPrefix}/2af07.svg`;
const imgVector62 = `${assetPathPrefix}/45173.svg`;
const imgImage20Traced = `${assetPathPrefix}/a5f1a.svg`;
const imgGroup25 = `${assetPathPrefix}/56de0.svg`;
const imgGroup26 = `${assetPathPrefix}/aeee3.svg`;
const imgGroup27 = `${assetPathPrefix}/81692.svg`;
const imgGroup28 = `${assetPathPrefix}/47a79.svg`;
const imgGroup30 = `${assetPathPrefix}/e955b.svg`;
const imgGroup31 = `${assetPathPrefix}/fdbe6.svg`;
const imgGroup29 = `${assetPathPrefix}/49f3a.svg`;
const imgGroup33 = `${assetPathPrefix}/d2127.svg`;
const imgGroup16 = `${assetPathPrefix}/b24f7.svg`;
const imgVector63 = `${assetPathPrefix}/03b15.svg`;
const imgCamada10 = `${assetPathPrefix}/58770.svg`;
const imgCamada11 = `${assetPathPrefix}/60557.svg`;
const imgCamada12 = `${assetPathPrefix}/6dd0f.svg`;
const imgCamada13 = `${assetPathPrefix}/4587d.svg`;
const imgCamada14 = `${assetPathPrefix}/a7446.svg`;
const imgCamada15 = `${assetPathPrefix}/86372.svg`;
const imgCamada16 = `${assetPathPrefix}/eb2a3.svg`;
const imgGroup40 = `${assetPathPrefix}/2e0ba.svg`;
const imgVector64 = `${assetPathPrefix}/b0aea.svg`;
const imgGroup37 = `${assetPathPrefix}/040d6.svg`;
const imgGroup41 = `${assetPathPrefix}/daa55.svg`;
const imgCamada17 = `${assetPathPrefix}/c40ac.svg`;
const imgCamada18 = `${assetPathPrefix}/41897.svg`;
const imgCamada19 = `${assetPathPrefix}/04868.svg`;
const imgGroup11 = `${assetPathPrefix}/1eda5.svg`;
const imgCamada20 = `${assetPathPrefix}/16a49.svg`;
const imgCamada21 = `${assetPathPrefix}/71ff0.svg`;
const imgCamada22 = `${assetPathPrefix}/25415.svg`;
const imgCamada23 = `${assetPathPrefix}/b91b9.svg`;
const imgCamada24 = `${assetPathPrefix}/75971.svg`;
const imgCamada25 = `${assetPathPrefix}/b1704.svg`;
const imgCamada26 = `${assetPathPrefix}/9b157.svg`;
const imgCamada27 = `${assetPathPrefix}/7188f.svg`;

interface DesignPosterProps {
  /** Vem de `obterRecorteGenero()`. Sem dado, o gráfico de gênero vira placeholder. */
  genero?: RecorteGenero | null;
  /** Vem de `obterRecorteRaca()`. Sem dado, o gráfico de raça vira placeholder. */
  raca?: RecorteRaca | null;
  /** Vem de `obterPremiosInternacionais()`. Sem dado, os pinos da rota avisam que não carregou. */
  premios?: PremiosInternacionais | null;
  /** Vem de `obterPodioPremios()`. Sem dado, os degraus mostram placeholders. */
  podio?: PodioPremios | null;
}

const BARRA_MAX = 382;
const BARRA_BORDA_DIREITA = 402;
const CINZA_PLACEHOLDER = "#d9d9d9";

export function DesignPoster({
  genero = null,
  raca = null,
  premios = null,
  podio = null,
}: DesignPosterProps) {
  const maior = genero ? Math.max(genero.mulheres, genero.homens, 1) : 0;
  const larguraMulheres = genero ? Math.round((BARRA_MAX * genero.mulheres) / maior) : 253;
  const larguraHomens = genero ? Math.round((BARRA_MAX * genero.homens) / maior) : BARRA_MAX;
  const corMulheres = genero ? "red" : CINZA_PLACEHOLDER;
  const corHomens = genero ? "#e3a54f" : CINZA_PLACEHOLDER;
  const textoMulheres = genero ? `${genero.mulheres}%` : "--%";
  const textoHomens = genero ? `${genero.homens}%` : "--%";

  const maiorPercentualRaca = raca
    ? Math.max(...raca.itens.map((item) => item.percentual), 1)
    : 1;
  return (
    <div
      className="bg-[#0b0909] relative h-[25712px] w-[1920px] overflow-hidden"
      data-node-id="46:2"
      data-name="Frame 2 teste"
    >
      {/* Âncoras de capítulo (US-1.4): posição casada com o título de cada seção, sem alterar o layout do Figma. */}
      <span id="cap-hero" aria-hidden="true" className="absolute left-0 top-0 h-px w-px" />
      <span aria-hidden="true" className="absolute left-0 h-px w-px" style={{ top: "calc(7% + 60.16px)" }} id="cap-contexto" />
      <span aria-hidden="true" className="absolute left-0 h-px w-px" style={{ top: "calc(15% + 77.2px)" }} id="cap-ciclo-do-recife" />
      <span aria-hidden="true" className="absolute left-0 h-px w-px" style={{ top: "calc(24% + 24.12px)" }} id="cap-super-8" />
      <span aria-hidden="true" className="absolute left-0 h-px w-px" style={{ top: "calc(29% + 70.52px)" }} id="cap-retomada-e-manguebeat" />
      <span aria-hidden="true" className="absolute left-0 h-px w-px" style={{ top: "calc(38% + 133.44px)" }} id="cap-anos-2000" />
      <span aria-hidden="true" className="absolute left-0 h-px w-px" style={{ top: "calc(41% + 71.08px)" }} id="cap-consolidacao" />
      <span aria-hidden="true" className="absolute left-0 h-px w-px" style={{ top: "calc(50% + 199px)" }} id="cap-financiamento" />
      <span aria-hidden="true" className="absolute left-0 h-px w-px" style={{ top: "calc(60% + 237.8px)" }} id="cap-reconhecimento-internacional" />
      <span aria-hidden="true" className="absolute left-0 h-px w-px" style={{ top: "calc(71% + 74.48px)" }} id="cap-recorte-genero-raca" />
      <span aria-hidden="true" className="absolute left-0 h-px w-px" style={{ top: "calc(82% + 151.16px)" }} id="cap-conclusao" />
      <span aria-hidden="true" className="absolute left-0 h-px w-px" style={{ top: "calc(89% + 240.32px)" }} id="cap-rodape" />
      <div
        className="absolute flex h-[450.879px] items-center justify-center left-[calc(40%+301px)] top-[calc(17%-2.04px)] w-[445.039px]"
        data-node-id="288:172"
      >
        <div className="flex-none rotate-[17.69deg]">
          <div className="h-[361px] relative w-[352px]" data-name="Camada_1">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada1} />
          </div>
        </div>
      </div>
      <div
        className="absolute flex h-[262.057px] items-center justify-center left-[57px] top-[calc(16%+6.08px)] w-[189.439px]"
        data-node-id="283:114"
      >
        <div className="flex-none rotate-[8.43deg]">
          <div className="h-[241.845px] relative w-[155.656px]" data-name="Camada_1">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada2} />
          </div>
        </div>
      </div>
      <div
        className="cloud-float cloud-float--slow absolute inset-[12.99%_76.56%_86.46%_4.27%]"
        data-node-id="283:117"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada3} />
      </div>
      <div
        className="cloud-float cloud-float--slow absolute inset-[12.99%_76.56%_86.46%_4.27%]"
        data-node-id="288:144"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada3} />
      </div>
      <div
        className="cloud-float cloud-float--reverse absolute inset-[13.76%_4.86%_85.73%_71.46%]"
        data-node-id="288:147"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada4} />
      </div>
      <div
        className="absolute h-[1576px] left-[70px] overflow-clip top-[calc(93%+153.84px)] w-[1780px]"
        data-node-id="256:100"
      >
        <div
          className="absolute inset-[-14.02%_-11.51%_5.17%_-11.48%]"
          data-node-id="256:99"
          data-name="bandeira"
        >
          <div className="absolute inset-[0_-1.49%]">
            <img alt="" className="block max-w-none size-full" src={imgBandeira} />
          </div>
        </div>
      </div>
      <Abertura />
      <Contexto />
      <div
        className="absolute aspect-[85/81] left-[85.73%] right-[9.84%] top-[calc(2%+130.76px)]"
        data-node-id="46:277"
        data-name="image 2"
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgImage2}
        />
      </div>
      <div
        className="absolute aspect-[85/81] left-[9.9%] right-[85.68%] top-[calc(2%+130.76px)]"
        data-node-id="46:278"
        data-name="image 3"
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgImage2}
        />
      </div>
      <div
        className="absolute inset-[6.24%_88.44%_93.72%_7.34%]"
        data-node-id="46:291"
        data-name="Vector"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector14} />
      </div>
      <div
        className="absolute inset-[5.98%_88.85%_93.99%_7.71%]"
        data-node-id="46:297"
        data-name="Vector"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector15} />
      </div>
      <div
        className="absolute contents left-[calc(60%+77px)] top-[calc(5%+139.28px)]"
        data-node-id="51:70"
      >
        <div
          className="absolute inset-[5.7%_12.67%_94.21%_80.99%]"
          data-node-id="46:207"
          data-name="Vector"
        >
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector16} />
        </div>
        <div
          className="absolute inset-[6.47%_7.55%_93.48%_88.75%]"
          data-node-id="46:293"
          data-name="Vector"
        >
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector17} />
        </div>
        <div
          className="absolute contents left-[calc(60%+77px)] top-[calc(5%+139.28px)]"
          data-node-id="51:68"
        >
          <div
            className="absolute h-[29px] left-[calc(60%+96px)] overflow-clip top-[calc(6%+8.28px)] w-[131px]"
            data-node-id="46:218"
            data-name="Camada_1"
          >
            <div
              className="absolute inset-[4.71%_8.05%_62.1%_55.15%]"
              data-node-id="46:219"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector18}
              />
            </div>
            <div
              className="absolute inset-[9.58%_7.75%_75.26%_83.49%]"
              data-node-id="46:220"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector19}
              />
            </div>
            <div
              className="absolute inset-[0_7.74%_90.42%_89.39%]"
              data-node-id="46:221"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector20}
              />
            </div>
            <div
              className="absolute inset-[45.82%_0_0.03%_54.62%]"
              data-node-id="46:222"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector21}
              />
            </div>
            <div
              className="absolute inset-[72.75%_0_6.05%_84.36%]"
              data-node-id="46:223"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector22}
              />
            </div>
            <div
              className="absolute inset-[58.7%_5.73%_30.82%_85.05%]"
              data-node-id="46:224"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector23}
              />
            </div>
            <div
              className="absolute inset-[15.72%_54.31%_61.54%_0]"
              data-node-id="46:225"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector24}
              />
            </div>
            <div
              className="absolute inset-[79.94%_55.88%_12.18%_22.32%]"
              data-node-id="46:226"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector25}
              />
            </div>
            <div
              className="absolute aspect-[86/10] left-[11.51%] right-[12.37%] top-[8px]"
              data-node-id="46:227"
              data-name="image 1"
            >
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={imgImage1}
              />
            </div>
          </div>
          <div
            className="absolute h-[29px] left-[calc(60%+77px)] overflow-clip top-[calc(6%+70.28px)] w-[131px]"
            data-node-id="46:228"
            data-name="Camada_1"
          >
            <div
              className="absolute inset-[4.71%_8.05%_62.1%_55.15%]"
              data-node-id="46:229"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector18}
              />
            </div>
            <div
              className="absolute inset-[9.58%_7.75%_75.26%_83.49%]"
              data-node-id="46:230"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector19}
              />
            </div>
            <div
              className="absolute inset-[0_7.74%_90.42%_89.39%]"
              data-node-id="46:231"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector20}
              />
            </div>
            <div
              className="absolute inset-[45.82%_0_0.03%_54.62%]"
              data-node-id="46:232"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector21}
              />
            </div>
            <div
              className="absolute inset-[72.75%_0_6.05%_84.36%]"
              data-node-id="46:233"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector22}
              />
            </div>
            <div
              className="absolute inset-[58.7%_5.73%_30.82%_85.05%]"
              data-node-id="46:234"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector23}
              />
            </div>
            <div
              className="absolute inset-[15.72%_54.31%_61.54%_0]"
              data-node-id="46:235"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector24}
              />
            </div>
            <div
              className="absolute inset-[79.94%_55.88%_12.18%_22.32%]"
              data-node-id="46:236"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector25}
              />
            </div>
            <div
              className="absolute aspect-[86/10] left-[11.51%] right-[12.37%] top-[8px]"
              data-node-id="46:237"
              data-name="image 1"
            >
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={imgImage1}
              />
            </div>
          </div>
          <div
            className="absolute contents left-[calc(60%+206px)] top-[calc(5%+139.28px)]"
            data-node-id="51:67"
          >
            <div
              className="absolute h-[30px] left-[calc(80%+60px)] overflow-clip top-[calc(6%+9.28px)] w-[131px]"
              data-node-id="46:208"
              data-name="Camada_1"
            >
              <div
                className="absolute inset-[4.71%_8.05%_62.1%_55.15%]"
                data-node-id="46:209"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector26}
                />
              </div>
              <div
                className="absolute inset-[9.58%_7.75%_75.26%_83.49%]"
                data-node-id="46:210"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector27}
                />
              </div>
              <div
                className="absolute inset-[0_7.74%_90.42%_89.39%]"
                data-node-id="46:211"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector28}
                />
              </div>
              <div
                className="absolute inset-[45.82%_0_0.03%_54.62%]"
                data-node-id="46:212"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector29}
                />
              </div>
              <div
                className="absolute inset-[72.75%_0_6.05%_84.36%]"
                data-node-id="46:213"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector30}
                />
              </div>
              <div
                className="absolute inset-[58.7%_5.73%_30.82%_85.05%]"
                data-node-id="46:214"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector31}
                />
              </div>
              <div
                className="absolute inset-[15.72%_54.31%_61.54%_0]"
                data-node-id="46:215"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector32}
                />
              </div>
              <div
                className="absolute inset-[79.94%_55.88%_12.18%_22.32%]"
                data-node-id="46:216"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector33}
                />
              </div>
              <div
                className="absolute aspect-[86/10] left-[11.51%] right-[12.37%] top-[8px]"
                data-node-id="46:217"
                data-name="image 1"
              >
                <img
                  alt=""
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                  src={imgImage1}
                />
              </div>
            </div>
            <div
              className="absolute inset-[5.54%_21.09%_93.61%_76.04%]"
              data-node-id="46:279"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector34}
              />
            </div>
            <div
              className="absolute inset-[6.53%_15.63%_93.26%_72.92%]"
              data-node-id="46:280"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector35}
              />
            </div>
            <div
              className="absolute inset-[5.95%_16.88%_93.58%_76.2%]"
              data-node-id="46:281"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector36}
              />
            </div>
            <div
              className="absolute inset-[6.84%_12.66%_93.07%_77.92%]"
              data-node-id="46:282"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector37}
              />
            </div>
            <div
              className="absolute inset-[6.18%_7.14%_93.78%_82.97%]"
              data-node-id="46:283"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector38}
              />
            </div>
            <div
              className="absolute inset-[5.68%_24.38%_93.58%_72.14%]"
              data-node-id="46:284"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector39}
              />
            </div>
            <div
              className="absolute inset-[6.75%_8.91%_93.19%_84.48%]"
              data-node-id="46:285"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector40}
              />
            </div>
            <div
              className="absolute inset-[6.39%_24.38%_93.3%_70.73%]"
              data-node-id="46:286"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector41}
              />
            </div>
            <div
              className="absolute inset-[6.47%_20.73%_93.45%_76.25%]"
              data-node-id="46:287"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector42}
              />
            </div>
            <div
              className="absolute inset-[6.33%_8.02%_93.63%_86.51%]"
              data-node-id="46:288"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector43}
              />
            </div>
            <div
              className="absolute inset-[6.57%_9.32%_93.38%_85.63%]"
              data-node-id="46:289"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector44}
              />
            </div>
            <div
              className="absolute inset-[6.86%_23.8%_93.11%_71.04%]"
              data-node-id="46:290"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector45}
              />
            </div>
            <div
              className="absolute inset-[6.42%_10.52%_93.54%_84.95%]"
              data-node-id="46:292"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector46}
              />
            </div>
            <div
              className="absolute inset-[6.29%_10.57%_93.68%_84.84%]"
              data-node-id="46:294"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector47}
              />
            </div>
            <div
              className="absolute inset-[6.47%_24.32%_93.47%_73.85%]"
              data-node-id="46:295"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector48}
              />
            </div>
            <div
              className="absolute inset-[6.78%_18.75%_93.2%_76.77%]"
              data-node-id="46:296"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector49}
              />
            </div>
            <div
              className="absolute inset-[6.72%_23.7%_93.24%_73.96%]"
              data-node-id="46:298"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector50}
              />
            </div>
            <div
              className="absolute inset-[6.25%_10.94%_93.75%_86.51%]"
              data-node-id="46:299"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector51}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="postal-ciclo absolute h-[439.493px] left-[151.87px] top-[calc(17%+93.37px)] w-[621.574px]"
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          data-node-id="46:302"
        >
          <div className="flex-none rotate-[9.49deg]">
            <img
              alt="Ponte sobre o rio Capibaribe no Recife, em cena dos anos 1920"
              className="h-[350px] object-cover relative w-[571.677px]"
              src={imgCicloRecife1}
            />
          </div>
        </div>
      </div>
      <div
        className="postal-ciclo absolute h-[482.247px] left-[calc(20%+265.2px)] top-[calc(17%+236.18px)] w-[639.564px]"
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          data-node-id="51:78"
        >
          <div className="flex-none rotate-[14.59deg]">
            <img
              alt="Público em frente a um cinema do Recife com cartazes de filmes"
              className="h-[350px] object-cover relative w-[569.769px]"
              src={imgCicloRecife2}
            />
          </div>
        </div>
      </div>
      <div
        className="postal-ciclo absolute h-[549.416px] left-[calc(60%+7px)] top-[calc(18%+152.84px)] w-[640.713px]"
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          data-node-id="51:81"
        >
          <div className="flex-none rotate-[25.46deg]">
            <img
              alt="Ator em cena de filme do Ciclo do Recife"
              className="h-[350px] object-cover relative w-[542.991px]"
              src={imgCicloRecife3}
            />
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute h-[603px] left-[82px] top-[calc(17%+36.96px)] w-[1810px]"
        data-node-id="129:2"
      >
        <div className="absolute inset-[-0.47%_0_-0.63%_-0.15%]">
          <img alt="" className="block max-w-none size-full" src={imgVector52} />
        </div>
      </div>
      <div
        className="[word-break:break-word] absolute font-corpo font-medium h-[246px] leading-[0] left-[calc(20%+4px)] not-italic text-[24px] text-white top-[calc(19%+170.72px)] w-[495px] whitespace-pre-wrap"
        data-node-id="46:308"
      >
        <p className="leading-[normal] mb-0">{`Mas o que existe por trás `}</p>
        <p className="leading-[normal] mb-0">
          de um cinema que ganhou projeção? Como se formou essa trajetória,
        </p>
        <p className="leading-[normal] mb-0">{`quem construiu essa produção e o que os dados nos revelam `}</p>
        <p className="leading-[normal]">sobre as suas condições?</p>
      </div>
      <div className="absolute inset-[29.33%_1.21%_64.46%_95.73%]" data-node-id="46:340">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup9} />
      </div>
      <div
        className="pointer-events-none absolute flex inset-[18.57%_13.67%_80.72%_78.91%] items-center justify-center"
        data-node-id="222:155"
        style={{ containerType: "size" }}
      >
        <div className="flex-none h-[hypot(-52.0135cqw,81.064cqh)] rotate-[26.71deg] w-[hypot(47.9865cqw,18.936cqh)]">
          <div className="relative size-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup32} />
          </div>
        </div>
      </div>
      <div className="absolute inset-[29.33%_1.21%_64.46%_95.73%]" data-node-id="163:94">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup9} />
      </div>
      <div
        className="absolute h-[959px] left-[122px] top-[calc(22%+94.36px)] w-[1678px]"
        data-node-id="61:3"
        data-name="image 15"
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgImage15}
        />
      </div>
      <div
        className="absolute h-[334.844px] left-[77px] top-[calc(21%+73.48px)] w-[1767.946px]"
        data-node-id="61:18"
      >
        <div className="absolute inset-[-0.9%_-0.17%]">
          <img alt="" className="block max-w-none size-full" src={imgVector53} />
        </div>
      </div>
      <p
        className="-translate-x-full [word-break:break-word] absolute font-corpo font-semibold leading-[normal] left-[calc(50%+549px)] not-italic text-[24px] text-right text-white top-[calc(26%+140.88px)] whitespace-nowrap"
        data-node-id="132:732"
      >
        Celso Marconi, Jomard Muniz de Brito e Aristides Guimarães, realizadores do Ciclo Super 8
      </p>
      <RetomadaManguebeat />
      <CicloDoRecife />
      <div
        className="arco-frevo absolute h-[373.177px] left-[calc(20%+204px)] top-[calc(13%+184.61px)] w-[743.277px]"
        data-node-id="288:159"
        data-name="ARCO CICLO"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArcoCiclo} />
      </div>
      <div
        className="-translate-x-1/2 absolute z-30 h-[916px] left-1/2 top-[calc(22%+138.36px)] w-[940px]"
        data-node-id="149:10"
      >
        <img
          alt=""
          className="super8-holofote absolute block inset-0 max-w-none size-full"
          src={imgEllipse2}
        />
      </div>
      {/* Cortinas do Super-8: cobrem o palco (mesma caixa da "image 15") até abrirem. */}
      <div
        aria-hidden="true"
        className="super8-cortinas pointer-events-none absolute z-20 h-[959px] left-[122px] overflow-hidden top-[calc(22%+94.36px)] w-[1678px]"
      >
        <div className="super8-cortina super8-cortina--esquerda" />
        <div className="super8-cortina super8-cortina--direita" />
      </div>
      <p
        className="[word-break:break-word] absolute font-corpo font-medium leading-[normal] left-[calc(20%+4px)] not-italic text-[24px] text-white top-[calc(52%+0.76px)] w-[477px]"
        data-node-id="163:197"
      >
        Um filme nasce de uma ideia, mas precisa de contribuição. Tem roteiro, equipe e equipamento,
        tem trabalho e preparação. Para chegar até as telas, também precisa de condição.
      </p>
      <Super8 />
      <PostalPendurado
        id="valente-e-o-galo"
        comDica
        className="absolute h-[781.76px] left-[90px] top-[calc(32%+230.37px)] w-[576.791px]"
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          data-node-id="156:60"
        >
          <div className="flex-none rotate-[3.94deg]">
            <div className="bg-[#d9d9d9] h-[747.369px] relative w-[526.736px]" />
          </div>
        </div>
        <div
          className="absolute flex h-[429.632px] items-center justify-center left-[52.82px] top-[31.42px] w-[486.301px]"
          data-node-id="156:61"
        >
          <div className="flex-none rotate-[3.94deg]">
            <div className="h-[399px] relative w-[460px]">
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={imgRectangle16}
              />
            </div>
          </div>
        </div>
        <div
          className="absolute flex h-[248.23px] items-center justify-center left-[28.47px] top-[467.92px] w-[490.701px]"
          data-node-id="156:63"
        >
          <div className="flex-none rotate-[3.94deg]">
            <p className="[word-break:break-word] font-corpo font-medium leading-[normal] not-italic relative text-[24px] text-black w-[477px]">
              Mas fazer cinema exige recursos, equipamento e condição. Mas nem sempre quem tem
              histórias consegue trazê-las à exibição. Décadas depois, outras gerações buscaram
              formas de experimentação.
            </p>
          </div>
        </div>
      </PostalPendurado>
      <PostalPendurado
        id="baile-perfumado"
        className="absolute bg-[#d9d9d9] h-[747.369px] left-[calc(20%+313px)] top-[calc(33%+232.04px)] w-[526.736px]"
      >
        <div
          className="absolute h-[393px] left-[38px] top-[44px] w-[449px]"
          data-node-id="156:54"
        >
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[#a8a8a8] inset-0" />
            <img
              alt=""
              className="absolute max-w-none object-cover size-full"
              src={imgRectangle15}
            />
          </div>
        </div>
        <p
          className="[word-break:break-word] absolute font-corpo font-medium leading-[normal] left-[47px] not-italic text-[24px] text-black top-[504px] w-[431px]"
          data-node-id="156:56"
        >
          Na trajetória do cinema, um marco veio se firmar: Baile Perfumado, de 1996, fez o público
          olhar para uma produção pernambucana que voltava a se destacar
        </p>
      </PostalPendurado>
      <PostalPendurado
        id="o-rap-do-pequeno-principe"
        className="absolute h-[807.888px] left-[calc(60%+79px)] top-[calc(34%+184.87px)] w-[616.874px]"
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          data-node-id="196:9"
        >
          <div className="flex-none rotate-[-7.25deg]">
            <div className="bg-white h-[747.369px] relative w-[526.736px]" />
          </div>
        </div>
        <div
          className="absolute flex h-[458.07px] items-center justify-center left-[36px] top-[50.05px] w-[508.938px]"
          data-node-id="83:43"
        >
          <div className="flex-none rotate-[-7.25deg]">
            <div className="h-[403px] relative w-[461.756px]">
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={imgRectangle17}
              />
            </div>
          </div>
        </div>
        <div
          className="absolute flex h-[268.684px] items-center justify-center left-[103.9px] top-[499.84px] w-[454.821px]"
          data-node-id="156:46"
        >
          <div className="flex-none rotate-[-7.25deg]">
            <p className="[word-break:break-word] font-corpo font-medium leading-[normal] not-italic relative text-[24px] text-black w-[431px]">
              Entre Science e musicalidade, novas histórias ganharam lugar. Mas não foi uma força
              apenas que fez o cinema avançar: cultura, Nação e trabalho também ajudaram a
              transformar.
            </p>
          </div>
        </div>
      </PostalPendurado>
      <Anos2000 />
      <p
        className="-translate-x-1/2 [word-break:break-word] absolute font-titulo leading-[normal] left-[calc(20%+586.5px)] not-italic text-[115px] text-center text-white top-[calc(50%+199px)] whitespace-nowrap"
        data-node-id="163:188"
      >
        FINANCIAMENTO
      </p>
      <div
        className="-translate-x-1/2 [word-break:break-word] absolute font-titulo leading-[0] left-[982px] not-italic text-[120px] text-center text-white top-[calc(71%+74.48px)] whitespace-nowrap"
        data-node-id="163:271"
      >
        <p className="leading-[normal] mb-0">RECORTE DE GÊNERO</p>
        <p className="leading-[normal]">E RAÇA</p>
      </div>
      <PostalPendurado
        id="amarelo-manga"
        comDica
        className="absolute z-10 flex h-[313.969px] items-center justify-center left-[162px] top-[calc(43%+194.87px)] w-[267.621px]"
        data-node-id="163:142"
      >
        <div className="flex-none rotate-[1.28deg]">
          <div className="h-[308.221px] relative w-[260.803px]">
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgRectangle19}
            />
          </div>
        </div>
      </PostalPendurado>
      <PostalPendurado
        id="cinema-aspirinas-e-urubus"
        className="absolute flex h-[520.207px] items-center justify-center left-[calc(20%+371px)] top-[calc(47%-8.64px)] w-[464.88px]"
        data-node-id="163:176"
      >
        <div className="flex-none rotate-[11.02deg]">
          <div className="h-[455px] relative w-[385px]">
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgRectangle25}
            />
          </div>
        </div>
      </PostalPendurado>
      <PostalPendurado
        id="o-agente-secreto"
        className="absolute flex h-[467.094px] items-center justify-center left-[calc(60%+162px)] top-[calc(47%+39.36px)] w-[399.371px]"
        data-node-id="163:182"
      >
        <div className="flex-none rotate-[-1.83deg]">
          <div className="h-[455px] relative w-[385px]">
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgRectangle27}
            />
          </div>
        </div>
      </PostalPendurado>
      <PostalPendurado
        id="febre-do-rato"
        className="absolute flex h-[521.214px] items-center justify-center left-[236px] top-[calc(46%+144.48px)] w-[466.172px]"
        data-node-id="163:179"
      >
        <div className="flex-none rotate-[11.22deg]">
          <div className="h-[455px] relative w-[385px]">
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgRectangle26}
            />
          </div>
        </div>
      </PostalPendurado>
      <div
        className="absolute flex inset-[35.55%_95.33%_52.05%_1.35%] items-center justify-center"
        data-node-id="162:66"
        style={{ containerType: "size" }}
      >
        <div className="-scale-x-100 flex-none h-[100cqh] w-[100cqw]">
          <div className="relative size-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup14} />
          </div>
        </div>
      </div>
      <div className="absolute inset-[47.95%_95.38%_21.06%_1.25%]" data-node-id="162:74">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup15} />
      </div>
      <div
        className="absolute flex inset-[35.53%_1.21%_52.07%_95.47%] items-center justify-center"
        data-node-id="163:98"
        style={{ containerType: "size" }}
      >
        <div className="-scale-x-100 flex-none h-[100cqh] w-[100cqw]">
          <div className="relative size-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup20} />
          </div>
        </div>
      </div>
      <div
        className="absolute flex inset-[47.93%_1.16%_21.07%_95.47%] items-center justify-center"
        data-node-id="163:104"
        style={{ containerType: "size" }}
      >
        <div className="-scale-x-100 flex-none h-[100cqh] w-[100cqw]">
          <div className="relative size-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup21} />
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute h-[687.459px] left-[73px] top-[calc(32%+82.66px)] w-[1779px]"
        data-node-id="163:152"
      >
        <div className="absolute inset-[-0.44%_-0.17%]">
          <img alt="" className="block max-w-none size-full" src={imgVector54} />
        </div>
      </div>
      <div
        className="pointer-events-none absolute h-[217.018px] left-[85.29px] top-[calc(43%-7.76px)] w-[1764.837px]"
        data-node-id="163:156"
      >
        <div className="absolute inset-[-1.84%_-0.23%]">
          <img alt="" className="block max-w-none size-full" src={imgVector55} />
        </div>
      </div>
      <PostalPendurado
        id="o-som-ao-redor"
        className="absolute flex h-[376.553px] items-center justify-center left-[calc(20%+107px)] top-[calc(43%+112.84px)] w-[330.067px]"
        data-node-id="163:161"
      >
        <div className="flex-none rotate-[-6.71deg]">
          <div className="h-[344.818px] relative w-[291.769px]">
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgRectangle21}
            />
          </div>
        </div>
      </PostalPendurado>
      <PostalPendurado
        id="aquarius"
        className="absolute flex h-[368.416px] items-center justify-center left-[calc(40%+73px)] top-[calc(43%+85.84px)] w-[315px]"
        data-node-id="163:162"
      >
        <div className="flex-none rotate-[-1.83deg]">
          <div className="h-[358.877px] relative w-[303.665px]">
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgRectangle22}
            />
          </div>
        </div>
      </PostalPendurado>
      <div
        className="absolute flex inset-[42.93%_46.95%_56.55%_50.89%] items-center justify-center"
        data-node-id="297:253"
        style={{ containerType: "size" }}
      >
        <div className="flex-none h-[hypot(22.5385cqw,98.251cqh)] rotate-[-4.12deg] w-[hypot(77.4615cqw,-1.74897cqh)]">
          <div className="relative size-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup42} />
          </div>
        </div>
      </div>
      <PostalPendurado
        id="retratos-fantasmas"
        className="absolute flex h-[368.416px] items-center justify-center left-[calc(60%+333px)] top-[calc(43%+43.84px)] w-[315px]"
        data-node-id="163:169"
      >
        <div className="flex-none rotate-[-1.83deg]">
          <div className="h-[358.877px] relative w-[303.665px]">
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgRectangle23}
            />
          </div>
        </div>
      </PostalPendurado>
      <div
        className="absolute flex inset-[42.85%_13.91%_56.64%_84.15%] items-center justify-center"
        data-node-id="297:258"
        style={{ containerType: "size" }}
      >
        <div className="flex-none h-[hypot(12.9846cqw,99.0954cqh)] rotate-[-2.11deg] w-[hypot(87.0154cqw,-0.90464cqh)]">
          <div className="relative size-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup43} />
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute h-[265.599px] left-[85.29px] top-[calc(46%+28.59px)] w-[1775.598px]"
        data-node-id="163:160"
      >
        <div className="absolute inset-[-1.51%_-0.23%]">
          <img alt="" className="block max-w-none size-full" src={imgVector56} />
        </div>
      </div>
      <Consolidacao />
      <p
        className="[word-break:break-word] absolute font-corpo font-medium leading-[normal] left-[calc(20%+4px)] not-italic text-[24px] text-white top-[calc(58%+146.04px)] w-[477px]"
        data-node-id="163:199"
      >
        Os dados podem mostrar concentrações e diferenças, mas precisam de contexto para sustentar
        conclusões. Investigar quem recebe recursos também exige olhar as condições.
      </p>
      <Conclusao />
      <ReconhecimentoInternacional premios={premios} />
      <p
        className="[word-break:break-word] absolute font-corpo font-medium leading-[normal] left-[calc(20%+4px)] not-italic text-[24px] text-white top-[calc(57%+98.16px)] w-[477px]"
        data-node-id="163:201"
      >
        O dinheiro não conta tudo quando aparece em um total. Também importa saber como se distribui
        o capital, quais projetos são contemplados e quem consegue chegar ao edital.
      </p>
      <p
        className="[word-break:break-word] absolute font-corpo font-medium leading-[normal] left-[calc(20%+4px)] not-italic text-[24px] text-white top-[calc(56%+87.28px)] w-[477px]"
        data-node-id="163:203"
      >
        Um edital publicado não garante o mesmo alcance em cada edição. Cada um tem suas regras,
        seus critérios e seu teto. Para entender o investimento, cada dado deve ser verificado
      </p>
      <p
        className="[word-break:break-word] absolute font-corpo font-medium leading-[normal] left-[calc(20%+4px)] not-italic text-[24px] text-white top-[calc(55%+38.4px)] w-[477px]"
        data-node-id="163:205"
      >
        Mas, quanto se investe em filmes? Como os recursos vão mudar? Quem consegue financiamento?
        Quem pode se inscrever e acessar? São perguntas necessárias para entender quem consegue
        filmar.
      </p>
      <p
        className="[word-break:break-word] absolute font-corpo font-medium leading-[normal] left-[calc(20%+4px)] not-italic text-[24px] text-white top-[calc(54%+25.52px)] w-[477px]"
        data-node-id="163:207"
      >
        Criado em 2002, ganhou um marco importante: o audiovisual passou a ter edital próprio
        adiante dentro do Funcultura.
      </p>
      <p
        className="[word-break:break-word] absolute font-corpo font-medium leading-[normal] left-[calc(20%+4px)] not-italic text-[24px] text-white top-[calc(53%+12.64px)] w-[477px]"
        data-node-id="163:209"
      >
        Em Pernambuco, há caminhos para incentivar a criação. O Funcultura é um mecanismo de fomento
        à produção, com editais que destinam recursos para a cultura da nação.
      </p>
      <p
        className="[word-break:break-word] absolute font-corpo font-semibold leading-[normal] left-[calc(60%+185px)] not-italic text-[24px] text-white top-[calc(51%+220.88px)] whitespace-nowrap"
        data-node-id="163:212"
      >
        GRAFICOS
      </p>
      <div
        className="absolute bg-[#d9d9d9] h-[45px] left-[calc(40%+352px)] top-[calc(52%+135.76px)] w-[94px]"
        data-node-id="163:213"
      />
      <div
        className="absolute bg-[#d9d9d9] h-[132px] left-[calc(60%+174px)] top-[calc(52%+48.76px)] w-[77px]"
        data-node-id="163:214"
      />
      <div
        className="absolute bg-[#d9d9d9] h-[215px] left-[calc(80%+18px)] top-[calc(51%+220.88px)] w-[79px]"
        data-node-id="163:215"
      />
      <div
        className="absolute bg-[#d9d9d9] h-[205px] left-[calc(40%+352px)] top-[calc(53%+39.64px)] w-[513px]"
        data-node-id="163:216"
      />
      <div
        className="absolute bg-[#d9d9d9] h-[30px] left-[calc(40%+353px)] top-[calc(55%+13.4px)] w-[512px]"
        data-node-id="163:217"
      />
      <div
        className="absolute bg-[#d9d9d9] h-[25px] left-[calc(40%+353px)] top-[calc(54%+209.52px)] w-[326px]"
        data-node-id="163:218"
      />
      <div
        className="absolute bg-[#d9d9d9] h-[41px] left-[calc(40%+356px)] top-[calc(54%+137.52px)] w-[253px]"
        data-node-id="163:219"
      />
      <div
        className="absolute bg-[#d9d9d9] h-[45px] left-[calc(40%+369px)] top-[calc(57%+134.16px)] w-[94px]"
        data-node-id="163:220"
      />
      <div
        className="absolute bg-[#d9d9d9] h-[132px] left-[calc(60%+203px)] top-[calc(57%+47.16px)] w-[77px]"
        data-node-id="163:221"
      />
      <div
        className="absolute bg-[#d9d9d9] h-[215px] left-[calc(80%+35px)] top-[calc(56%+220.28px)] w-[79px]"
        data-node-id="163:222"
      />
      <div
        className="absolute bg-[#d9d9d9] h-[205px] left-[calc(40%+369px)] top-[calc(58%+37.04px)] w-[513px]"
        data-node-id="163:223"
      />
      <div
        className="absolute bg-[#d9d9d9] h-[205px] left-[calc(40%+352px)] top-[calc(55%+165.4px)] w-[513px]"
        data-node-id="163:228"
      />
      <div
        className="[word-break:break-word] absolute font-corpo font-medium leading-[0] left-[calc(20%+26px)] not-italic text-[24px] text-white top-[calc(73%+27.24px)] w-[477px] whitespace-pre-wrap"
        data-node-id="163:273"
      >
        <p className="leading-[normal] mb-0">{`Um filme tem muitas mãos, muito mais que direção. `}</p>
        <p className="leading-[normal] mb-0">{`Tem roteiro, som e fotografia, montagem e produção. `}</p>
        <p className="leading-[normal]">Conhecer quem faz o cinema é olhar toda a criação.</p>
      </div>
      <div
        className="[word-break:break-word] absolute font-corpo font-medium leading-[0] left-[calc(20%+24px)] not-italic text-[24px] text-white top-[calc(74%+52.12px)] w-[477px] whitespace-pre-wrap"
        data-node-id="163:274"
      >
        <p className="leading-[normal] mb-0">{`Mas será que as oportunidades alcançam todos por igual? `}</p>
        <p className="leading-[normal] mb-0">{`Quem ocupa cada função? `}</p>
        <p className="leading-[normal]">
          Quem encontra espaço profissional? Os dados podem revelar diferenças no audiovisual.
        </p>
      </div>
      <p
        className="[word-break:break-word] absolute font-corpo font-medium leading-[normal] left-[calc(20%+26px)] not-italic text-[24px] text-white top-[calc(76%+75.88px)] w-[477px]"
        data-node-id="163:275"
      >
        Os dados do audiovisual podem apontar diferenças, mas é preciso compreender o alcance de
        cada pesquisa. O que vale para o Brasil não descreve todo o estado.
      </p>
      <p
        className="[word-break:break-word] absolute font-corpo font-medium leading-[normal] left-[calc(20%+26px)] not-italic text-[24px] text-white top-[calc(77%+79.76px)] w-[477px]"
        data-node-id="163:277"
      >
        Também precisamos saber quem consegue participar, quais grupos têm oportunidades e quem pode
        se destacar. Mas, para falar de raça e cor, é preciso saber como contar.
      </p>
      <p
        className="[word-break:break-word] absolute font-corpo font-medium leading-[normal] left-[calc(20%+26px)] not-italic text-[24px] text-white top-[calc(78%+87.64px)] w-[477px]"
        data-node-id="163:278"
      >
        Se os dados são incompletos, não se deve imaginar o perfil de cada pessoa nem suas histórias
        inventar. Uma lacuna na pesquisa também precisa se registrar.
      </p>
      <p
        className="[word-break:break-word] absolute font-corpo font-medium leading-[normal] left-[calc(20%+26px)] not-italic text-[24px] text-white top-[calc(75%+82px)] w-[477px]"
        data-node-id="163:276"
      >
        As mulheres fazem cinema, mas precisamos investigar como ocupam cada função e onde podem
        trabalhar. O total de profissionais não explica tudo no olhar.
      </p>
      <div
        className="absolute h-[106px] left-[calc(20%+26px)] top-[calc(60%+5.8px)] w-[892px]"
        data-node-id="196:11"
      >
        <div className="absolute inset-[-4.25%_0_-18.34%_-0.5%]">
          <img alt="" className="block max-w-none size-full" src={imgVector57} />
        </div>
      </div>
      <div
        className="falling-poster hotspot absolute z-10 flex h-[380.488px] items-center justify-center left-[calc(60%+3px)] top-[calc(43%+44.84px)] w-[329.539px]"
        role="button"
        tabIndex={0}
        aria-label="Derrubar o pôster"
        data-node-id="163:174"
      >
        <div className="falling-poster__body">
          <div className="flex-none rotate-[-4.27deg]">
            <div className="h-[358.877px] relative w-[303.665px]">
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={imgRectangle24}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Área de pouso: centrado sobre onde o pôster cai (top + --queda-poster), acima dele. */}
      <button
        type="button"
        className="falling-poster__repor hotspot absolute z-20 -translate-x-1/2 rounded-full border-2 border-ouro bg-fundo/90 px-6 py-3 font-corpo text-[28px] font-semibold text-ouro whitespace-nowrap hover:bg-ouro hover:text-fundo left-[calc(60%+167.77px)] top-[calc(43%+44.84px+var(--queda-poster)-96px)]"
      >
        ↺ Pendurar de novo
      </button>
      <div
        className="absolute flex inset-[42.81%_28.85%_56.67%_67.66%] items-center justify-center"
        data-node-id="297:263"
        style={{ containerType: "size" }}
      >
        <div className="flex-none h-[hypot(-53.6546cqw,93.3857cqh)] rotate-[15.98deg] w-[hypot(46.3454cqw,6.61433cqh)]">
          <div className="relative size-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup44} />
          </div>
        </div>
      </div>
      <Podio colocacoes={podio} />
      <Hotspot
        id="hotspot-genero"
        style={{ top: "calc(73% + 16px)", left: "calc(60% - 10px)", width: 460, height: 240 }}
        tooltip={
          genero
            ? `Dado real do acervo cadastrado: ${genero.mulheres}% mulheres e ${genero.homens}% homens entre as pessoas com gênero informado.`
            : "Sem pessoas com gênero informado no acervo ainda — por isso o gráfico aparece em cinza."
        }
      />
      <div
        className="absolute contents left-[calc(40%+301px)] top-[calc(73%+16.24px)]"
        data-node-id="223:160"
      >
        <div
          className="absolute h-[41px] top-[calc(73%+25.24px)]"
          style={{ left: `calc(60% + ${BARRA_BORDA_DIREITA - larguraMulheres}px)`, width: larguraMulheres, backgroundColor: corMulheres }}
          data-node-id="163:287"
        />
        <div
          className="absolute h-[41px] top-[calc(73%+85.24px)]"
          style={{ left: `calc(60% + ${BARRA_BORDA_DIREITA - larguraHomens}px)`, width: larguraHomens, backgroundColor: corHomens }}
          data-node-id="196:34"
        />
        <p
          className="[word-break:break-word] absolute font-corpo font-semibold leading-[normal] left-[calc(60%-2px)] not-italic text-[20px] text-white top-[calc(73%+177.24px)] whitespace-nowrap"
          data-node-id="196:36"
        >
          Mulheres no cinema pernambucano
        </p>
        <p
          className="[word-break:break-word] absolute font-corpo font-semibold leading-[normal] left-[calc(60%+7px)] not-italic text-[20px] text-white top-[calc(73%+225.24px)] whitespace-nowrap"
          data-node-id="196:37"
        >
          Homens no cinema pernambucano
        </p>
        <div
          className="absolute bg-[red] left-[calc(60%+379px)] size-[23px] top-[calc(73%+181.24px)]"
          data-node-id="196:38"
        />
        <div
          className="absolute bg-[#e3a54f] left-[calc(60%+379px)] size-[23px] top-[calc(73%+229.24px)]"
          data-node-id="196:40"
        />
        <p
          className="[word-break:break-word] absolute font-corpo font-semibold leading-[normal] left-[calc(60%+55px)] not-italic text-[40px] text-white top-[calc(73%+16.24px)] whitespace-nowrap"
          data-node-id="196:41"
        >{textoMulheres}</p>
        <p
          className="[word-break:break-word] absolute font-corpo font-semibold leading-[normal] left-[calc(40%+301px)] not-italic text-[40px] text-white top-[calc(73%+82.24px)] whitespace-nowrap"
          data-node-id="196:42"
        >{textoHomens}</p>
      </div>
      <Hotspot
        id="hotspot-raca"
        style={{ top: "calc(76% + 28px)", left: "calc(60% - 10px)", width: 460, height: 260 }}
        tooltip={
          raca
            ? `Recorte baseado em ${raca.totalInformado} autodeclarações de cor/raça. ${raca.totalSemInformacao} pessoas sem autodeclaração registrada não entram no percentual.`
            : "Sem autodeclarações de cor/raça registradas no acervo."
        }
      />
      <div className="absolute left-[calc(60%-10px)] top-[calc(76%+28.88px)] w-[460px] space-y-6">
        {(raca?.itens ?? [{ categoria: "Raça/cor sem dados", percentual: 0 }]).map(
          (item, indice) => {
            const cor = ["red", "#e3a54f", "#8c8888", "#f2e8d5", "#a34a32"][indice % 5];
            const largura = raca
              ? Math.round((BARRA_MAX * item.percentual) / maiorPercentualRaca)
              : BARRA_MAX;

            return (
              <div key={item.categoria}>
                <div className="flex items-center gap-5">
                  <span className="w-[82px] font-corpo text-[40px] font-semibold text-white">
                    {raca ? `${item.percentual}%` : "--%"}
                  </span>
                  <div className="flex h-[41px] flex-1 justify-end">
                    <div
                      className="h-full"
                      style={{
                        width: largura,
                        backgroundColor: raca ? cor : CINZA_PLACEHOLDER,
                      }}
                    />
                  </div>
                </div>
                <p className="mt-2 text-right font-corpo text-[20px] font-semibold text-white">
                  {item.categoria}
                </p>
              </div>
            );
          },
        )}
      </div>
      <div
        className="plane-flight absolute z-10 flex inset-[59.91%_15.97%_39.56%_68.75%] items-center justify-center"
        data-node-id="202:244"
        style={{ containerType: "size" }}
      >
        <div className="-scale-x-100 flex-none h-[100cqh] w-[100cqw]">
          <div className="relative size-full" data-name="Group">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup6} />
          </div>
        </div>
      </div>
      <div
        className="absolute contents inset-[60.47%_78.39%_38.79%_7.14%]"
        data-node-id="202:147"
        data-name="Group"
      >
        <div
          className="absolute z-20 inset-[60.47%_78.39%_38.79%_7.14%]"
          data-node-id="202:148"
          data-name="Group"
        >
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup10} />
        </div>
      </div>
      <div
        className="absolute inset-[37.6%_71.82%_61.25%_11.04%]"
        data-node-id="221:109"
        data-name="Vector"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector58} />
      </div>
      <div
        className="absolute inset-[38.19%_25.1%_61.58%_71.56%]"
        data-node-id="221:113"
        data-name="Vector"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector59} />
      </div>
      <div
        className="absolute inset-[37.54%_51.3%_61.76%_38.28%]"
        data-node-id="221:110"
        data-name="Vector"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector60} />
      </div>
      <div
        className="absolute inset-[38.9%_19.84%_60.55%_71.98%]"
        data-node-id="221:111"
        data-name="Vector"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector61} />
      </div>
      <div
        className="absolute inset-[39.15%_53.85%_60.33%_38.28%]"
        data-node-id="221:112"
        data-name="Vector"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector62} />
      </div>
      <div
        className="absolute flex inset-[40.78%_47.54%_58.68%_45.68%] items-center justify-center"
        data-node-id="221:124"
        style={{ containerType: "size" }}
      >
        <div className="flex-none h-[hypot(-41.4897cqw,67.9907cqh)] rotate-[30.22deg] skew-x-[0.4deg] w-[hypot(58.5103cqw,32.0093cqh)]">
          <div className="relative size-full" data-name="image 20 (Traced)">
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgImage20Traced}
            />
          </div>
        </div>
      </div>
      <div
        className="absolute flex inset-[34.16%_13.92%_64.78%_79.81%] items-center justify-center"
        data-node-id="220:12"
        style={{ containerType: "size" }}
      >
        <div className="flex-none h-[hypot(-46.8715cqw,94.877cqh)] rotate-[12.31deg] w-[hypot(53.1285cqw,5.12304cqh)]">
          <div className="relative size-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup25} />
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute flex inset-[33.33%_46.65%_65.61%_46.69%] items-center justify-center"
        data-node-id="221:125"
        style={{ containerType: "size" }}
      >
        <div className="flex-none h-[hypot(50.3294cqw,94.1628cqh)] rotate-[-14.07deg] w-[hypot(49.6706cqw,-5.83724cqh)]">
          <div className="relative size-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup26} />
          </div>
        </div>
      </div>
      <div
        className="absolute flex inset-[32.31%_77.02%_66.63%_17.28%] items-center justify-center"
        data-node-id="221:129"
        style={{ containerType: "size" }}
      >
        <div className="flex-none h-[hypot(-41.0157cqw,95.9271cqh)] rotate-[9.75deg] w-[hypot(58.9843cqw,4.07292cqh)]">
          <div className="relative size-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup27} />
          </div>
        </div>
      </div>
      <div className="absolute inset-[21.83%_83.79%_77.23%_10.42%]" data-node-id="222:138">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup28} />
      </div>
      <div className="pointer-events-none absolute inset-[17.06%_82.66%_82.29%_13.39%]" data-node-id="222:149">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup30} />
      </div>
      <div
        className="pointer-events-none absolute flex inset-[17.81%_41.35%_81.52%_49.95%] items-center justify-center"
        data-node-id="222:152"
        style={{ containerType: "size" }}
      >
        <div className="flex-none h-[hypot(-66.1992cqw,70.71cqh)] rotate-[42.01deg] w-[hypot(33.8008cqw,29.29cqh)]">
          <div className="relative size-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup31} />
          </div>
        </div>
      </div>
      <div
        className="absolute flex inset-[21.76%_6.19%_77.23%_81.52%] items-center justify-center"
        data-node-id="222:139"
        style={{ containerType: "size" }}
      >
        <div className="flex-none h-[hypot(-62.2207cqw,73.6519cqh)] rotate-[37.51deg] w-[hypot(37.7793cqw,26.3481cqh)]">
          <div className="relative size-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup29} />
          </div>
        </div>
      </div>
      <div
        className="absolute flex inset-[95.41%_3.19%_0.32%_3.22%] items-center justify-center"
        data-node-id="253:32"
        style={{ containerType: "size" }}
      >
        <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
          <div className="relative size-full" data-name="Vector">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector10} />
          </div>
        </div>
      </div>
      <div
        className="absolute flex inset-[99.56%_1.37%_0.18%_1.41%] items-center justify-center"
        data-node-id="253:33"
        style={{ containerType: "size" }}
      >
        <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
          <div className="relative size-full" data-name="Vector">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector13} />
          </div>
        </div>
      </div>
      <div className="absolute inset-[78.93%_1.16%_0.44%_1.42%]" data-node-id="251:17">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup33} />
      </div>
      <div
        className="absolute flex inset-[78.95%_95.43%_3.7%_1.25%] items-center justify-center"
        data-node-id="250:2"
        style={{ containerType: "size" }}
      >
        <div className="-scale-x-100 flex-none h-[100cqh] w-[100cqw]">
          <div className="relative size-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup16} />
          </div>
        </div>
      </div>
      <Creditos />
      <div
        className="absolute flex inset-[93.36%_97.7%_0.44%_1.46%] items-center justify-center"
        data-node-id="262:107"
        style={{ containerType: "size" }}
      >
        <div className="-scale-x-100 flex-none h-[100cqh] w-[100cqw]">
          <div className="relative size-full" data-name="Vector">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector63} />
          </div>
        </div>
      </div>
      <div
        className="absolute h-[701px] left-[calc(80%-4px)] top-[calc(15%+55.2px)] w-[295px]"
        data-node-id="288:131"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada10} />
      </div>
      <div
        className="-translate-x-1/2 absolute h-[125.26px] left-[calc(50%+0.25px)] top-[calc(13%+43.44px)] w-[106.51px]"
        data-node-id="288:155"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada11} />
      </div>
      <div
        className="absolute h-[54.14px] left-[324px] top-[calc(14%+157.32px)] w-[45.88px]"
        data-node-id="288:160"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada12} />
      </div>
      <div
        className="absolute inset-[14.9%_26.68%_84.92%_71.46%]"
        data-node-id="288:163"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada13} />
      </div>
      <div
        className="pointer-events-none absolute h-[82.15px] left-[calc(40%+158px)] top-[calc(17%+26.96px)] w-[68.66px]"
        data-node-id="288:166"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada14} />
      </div>
      <div
        className="absolute h-[55.61px] left-[calc(80%+41px)] top-[calc(18%+47.84px)] w-[45.22px]"
        data-node-id="288:169"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada15} />
      </div>
      <PostalPendurado
        id="recife-frio"
        comDica
        className="absolute h-[621px] left-[calc(20%+120px)] top-[calc(9%+138.92px)] w-[920px]"
        data-node-id="292:176"
        data-name="ChatGPT Image 25 de set. de 2026, 14_58_30 1"
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgChatGptImage25DeSetDe20261458301}
        />
      </PostalPendurado>
      <div
        className="absolute h-[282px] left-[89px] top-[calc(20%+216.6px)] w-[1741px]"
        data-node-id="294:204"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada16} />
      </div>
      <div
        className="absolute flex inset-[46.37%_70.88%_53.11%_25.63%] items-center justify-center"
        data-node-id="297:228"
        style={{ containerType: "size" }}
      >
        <div className="flex-none h-[hypot(-53.6546cqw,93.3857cqh)] rotate-[15.98deg] w-[hypot(46.3454cqw,6.61433cqh)]">
          <div className="relative size-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup44} />
          </div>
        </div>
      </div>
      <div
        className="absolute flex inset-[46.76%_43.85%_52.71%_52.66%] items-center justify-center"
        data-node-id="297:233"
        style={{ containerType: "size" }}
      >
        <div className="flex-none h-[hypot(-53.6546cqw,93.3857cqh)] rotate-[15.98deg] w-[hypot(46.3454cqw,6.61433cqh)]">
          <div className="relative size-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup44} />
          </div>
        </div>
      </div>
      <div
        className="absolute flex inset-[46.86%_20.73%_52.62%_76.67%] items-center justify-center"
        data-node-id="297:238"
        style={{ containerType: "size" }}
      >
        <div className="flex-none h-[hypot(35.9309cqw,96.683cqh)] rotate-[-7.9deg] w-[hypot(64.0691cqw,-3.31705cqh)]">
          <div className="relative size-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup40} />
          </div>
        </div>
      </div>
      <div
        className="absolute h-[121.118px] left-[79px] top-[calc(9%+52.92px)] w-[1760px]"
        data-node-id="292:181"
      >
        <div className="absolute inset-[-2.94%_0_-3.3%_-0.23%]">
          <img alt="" className="block max-w-none size-full" src={imgVector64} />
        </div>
      </div>
      <div className="absolute inset-[9.14%_48.44%_90.21%_47.6%]" data-node-id="292:177">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup37} />
      </div>
      <div
        className="pointer-events-none absolute flex inset-[42.87%_64.11%_55.74%_14.48%] items-center justify-center"
        data-node-id="297:243"
        style={{ containerType: "size" }}
      >
        <div className="flex-none h-[hypot(-18.0637cqw,72.8895cqh)] rotate-[15.98deg] w-[hypot(81.9363cqw,27.1105cqh)]">
          <div className="relative size-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup41} />
          </div>
        </div>
      </div>
      <div
        className="absolute h-[249.29px] left-[261px] top-[calc(13%+121.44px)] w-[347.02px]"
        data-node-id="299:509"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada17} />
      </div>
      <div
        className="absolute flex h-[226.369px] items-center justify-center left-[calc(60%+276.26px)] top-[calc(28%+142.29px)] w-[241.157px]"
        data-node-id="301:515"
      >
        <div className="flex-none rotate-[-18.36deg]">
          <div className="h-[173.261px] relative w-[196.585px]" data-name="Camada_1">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada18} />
          </div>
        </div>
      </div>
      <div
        className="absolute flex h-[356.346px] items-center justify-center left-[227px] top-[calc(28%+102.64px)] w-[366.636px]"
        data-node-id="301:541"
      >
        <div className="flex-none rotate-[32.28deg]">
          <div className="h-[245.516px] relative w-[278.566px]" data-name="Camada_1">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada19} />
          </div>
        </div>
      </div>
      <div
        className="absolute inset-[30.43%_4.73%_67.67%_4.74%]"
        data-node-id="200:44"
        data-name="Group"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup11} />
      </div>
      <div
        className="absolute flex h-[226.369px] items-center justify-center left-[calc(20%+84px)] top-[calc(31%+68.28px)] w-[241.157px]"
        data-node-id="301:554"
      >
        <div className="flex-none rotate-[-18.36deg]">
          <div className="h-[173.261px] relative w-[196.585px]" data-name="Camada_1">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada18} />
          </div>
        </div>
      </div>
      <div
        className="absolute flex h-[118.963px] items-center justify-center left-[calc(60%+225.07px)] top-[calc(31%+159.25px)] w-[134.875px]"
        data-node-id="301:567"
      >
        <div className="flex-none rotate-[0.17deg]">
          <div className="h-[118.561px] relative w-[134.521px]" data-name="Camada_1">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada20} />
          </div>
        </div>
      </div>
      <div
        className="absolute flex h-[167.534px] items-center justify-center left-[162px] top-[calc(50%+75px)] w-[229.888px]"
        data-node-id="301:580"
      >
        <div className="flex-none rotate-[-12.02deg]">
          <div className="h-[127px] relative w-[208px]" data-name="Camada_1">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada21} />
          </div>
        </div>
      </div>
      <div
        className="absolute h-[178px] left-[calc(80%+44px)] top-[calc(50%+51px)] w-[176px]"
        data-node-id="301:607"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada22} />
      </div>
      <div
        className="absolute h-[151px] left-[calc(60%+195px)] top-[calc(49%+185.12px)] w-[167px]"
        data-node-id="301:629"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada23} />
      </div>
      <div
        className="absolute h-[144px] left-[calc(20%-3px)] top-[calc(49%+161.12px)] w-[175px]"
        data-node-id="301:642"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada24} />
      </div>
      <div
        className="absolute flex h-[251.104px] items-center justify-center left-[calc(40%+12.5px)] top-[calc(49%+143.07px)] w-[358.998px]"
        data-node-id="301:656"
      >
        <div className="flex-none rotate-[8.74deg]">
          <div className="h-[203px] relative w-[332px]" data-name="Camada_1">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada25} />
          </div>
        </div>
      </div>
      <div
        className="absolute inset-[40.42%_14.91%_59.4%_83.23%]"
        data-node-id="304:668"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada13} />
      </div>
      <div
        className="absolute h-[82.15px] left-[222px] top-[calc(41%+172.08px)] w-[68.66px]"
        data-node-id="304:670"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada14} />
      </div>
      <div
        className="pointer-events-none absolute h-[55.61px] left-[calc(80%+98px)] top-[calc(43%+218.84px)] w-[45.22px]"
        data-node-id="304:672"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada15} />
      </div>
      <div
        className="absolute inset-[61.1%_14.86%_38.72%_83.28%]"
        data-node-id="304:675"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada13} />
      </div>
      <div
        className="absolute h-[82.15px] left-[calc(40%+214px)] top-[calc(60%+112.8px)] w-[68.66px]"
        data-node-id="304:677"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada14} />
      </div>
      <div
        className="absolute h-[55.61px] left-[calc(20%-7px)] top-[calc(61%+178.68px)] w-[45.22px]"
        data-node-id="304:679"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada15} />
      </div>
      <div
        className="absolute inset-[66.37%_62.56%_33.45%_35.57%]"
        data-node-id="304:682"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada13} />
      </div>
      <div
        className="absolute h-[82.15px] left-[calc(20%+223px)] top-[calc(69%+185.72px)] w-[68.66px]"
        data-node-id="304:684"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada14} />
      </div>
      <div
        className="absolute h-[136px] left-[calc(40%+339px)] top-[calc(69%+226.72px)] w-[114px]"
        data-node-id="304:689"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada26} />
      </div>
      <div
        className="absolute h-[55.61px] left-[calc(60%+226px)] top-[calc(70%+49.6px)] w-[45.22px]"
        data-node-id="304:686"
        data-name="Camada_1"
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada15} />
      </div>
      <div
        className="absolute flex h-[507.901px] items-center justify-center left-[calc(60%+45.7px)] top-[calc(32%+104.22px)] w-[433.575px]"
        data-node-id="304:692"
      >
        <div className="flex-none rotate-[-19.27deg]">
          <div className="h-[430.03px] relative w-[308.98px]" data-name="Camada_1">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada27} />
          </div>
        </div>
      </div>
    </div>
  );
}
