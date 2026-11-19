/* eslint-disable @next/next/no-img-element */
import conteudo from "../content.json";

const assetPathPrefix = "/poster";
const imgCamada5 = `${assetPathPrefix}/d5aa9.svg`;
const imgVector = `${assetPathPrefix}/38156.svg`;
const imgGroup45 = `${assetPathPrefix}/979c9.svg`;
const imgVector1 = `${assetPathPrefix}/55984.svg`;
const imgVector2 = `${assetPathPrefix}/1255e.svg`;
const imgVector3 = `${assetPathPrefix}/2e947.svg`;
const imgVector4 = `${assetPathPrefix}/862b2.svg`;
const imgVector5 = `${assetPathPrefix}/e99cb.svg`;
const imgGroup = `${assetPathPrefix}/5bb7f.svg`;
const imgGroup1 = `${assetPathPrefix}/610c5.svg`;
const imgVector6 = `${assetPathPrefix}/4ece6.svg`;
const imgVector7 = `${assetPathPrefix}/b81a3.svg`;
const imgVector8 = `${assetPathPrefix}/6b6ce.svg`;
const imgVector9 = `${assetPathPrefix}/d21b5.svg`;
const imgVector10 = `${assetPathPrefix}/95194.svg`;
const imgVector11 = `${assetPathPrefix}/8f319.svg`;
const imgVector12 = `${assetPathPrefix}/39a9b.svg`;
const imgVector13 = `${assetPathPrefix}/84431.svg`;
const imgCamada6 = `${assetPathPrefix}/b1011.svg`;
const imgCamada7 = `${assetPathPrefix}/eeb70.svg`;
const imgGroup2 = `${assetPathPrefix}/7e9c9.svg`;
const imgGroup3 = `${assetPathPrefix}/27f6e.svg`;
const imgGroup4 = `${assetPathPrefix}/61f8a.svg`;
const imgGroup5 = `${assetPathPrefix}/68463.svg`;
const imgGroup7 = `${assetPathPrefix}/e0dcb.svg`;
const imgGroup13 = `${assetPathPrefix}/e710d.svg`;
const imgGroup8 = `${assetPathPrefix}/35f9c.svg`;
const imgCamada8 = `${assetPathPrefix}/13379.svg`;
const imgCamada9 = `${assetPathPrefix}/c29bf.svg`;

const { titulo, subtitulo } = conteudo.abertura;

/** Elementos só visuais: fora da árvore de acessibilidade e sem capturar o ponteiro. */
const DECORATIVO = { "aria-hidden": true, className: "contents pointer-events-none" } as const;

/**
 * Abertura (US-2.1): título, subtítulo e a cena animada do topo do pôster.
 *
 * Fica dentro do frame de 1920 px do Figma, então as posições em px e % continuam relativas a
 * ele. Os wrappers usam `contents` para não criar uma nova caixa de posicionamento nem mudar o
 * empilhamento (z-10/z-20) em relação ao resto do pôster.
 *
 * Os tamanhos do título (64 px e 128 px) são os do frame, que o PosterViewport reduz por inteiro;
 * por isso `clamp()` não teria efeito aqui. O tamanho legível no mobile fica para a US-4.1.
 */
export function Abertura() {
  return (
    <header className="contents">
      <div {...DECORATIVO}>
        <div
          className="red-cloud-loop absolute z-10 left-[-94px] top-[130px] h-[314px] w-[778px]"
          data-node-id="299:327"
          data-name="nuvem vermelha"
        >
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector6} />
        </div>
        <div
          className="gold-cloud-loop absolute z-10 left-[1443px] top-[828px] h-[99px] w-[312px]"
          data-node-id="299:508"
          data-name="nuvem dourada"
        >
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup45} />
        </div>
      </div>
      <h1 className="contents font-titulo text-ouro">
        <span
          className="-translate-x-1/2 [word-break:break-word] absolute z-20 block font-titulo leading-[0] left-[calc(50%+0.5px)] not-italic text-ouro text-[0px] text-center top-[calc(1%+40.88px)] whitespace-nowrap"
          data-node-id="46:3"
        >
          <span className="leading-[normal] text-[64px]">{titulo.prefixo}</span>
          {/* O espaço de 96 px vem do Figma e define a altura da linha, que posiciona o "DNA DO". */}
          <span className="leading-[normal] text-[96px]"> </span>
        </span>
        <span
          className="-translate-x-1/2 [word-break:break-word] absolute z-20 block font-titulo leading-[normal] left-[963.5px] not-italic text-ouro text-[128px] text-center top-[calc(1%+167.88px)] whitespace-nowrap"
          data-node-id="51:71"
        >
          {titulo.linhas.map((linha) => (
            <span key={linha} className="block">
              {linha}{" "}
            </span>
          ))}
        </span>
      </h1>
      <div {...DECORATIVO} data-node-id="129:4">
        <div
          className="-translate-x-1/2 absolute z-20 left-1/2 size-[126px] top-[161px]"
          data-node-id="46:4"
          data-name="sol"
        >
          <img
            alt=""
            className="sun-spin absolute block inset-0 max-w-none size-full"
            src={imgCamada5}
          />
        </div>
        <div
          className="absolute inset-[3.21%_48.33%_96.37%_48.39%]"
          data-node-id="46:7"
          data-name="cruz"
        >
          <img alt="" className="cross-sway absolute block inset-0 max-w-none size-full" src={imgVector} />
        </div>
        <div
          className="absolute z-20 h-[1135.39px] left-[23px] overflow-clip top-[40px] w-[1873.95px]"
          data-node-id="46:14"
          data-name="Camada_1"
        >
          <div
            className="absolute inset-[-97.24%_23.74%_-40.57%_-39.01%] overflow-clip"
            data-node-id="299:268"
            data-name="nuvem 1"
          >
            <div
              className="cloud-float absolute inset-[35.01%_148.87%_53.36%_-84.87%]"
              data-node-id="299:269"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector1}
              />
            </div>
            <div
              className="cloud-float cloud-float--slow absolute inset-[24.44%_177.24%_65.37%_-119.21%]"
              data-node-id="299:270"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector2}
              />
            </div>
            <div
              className="cloud-float cloud-float--reverse absolute inset-[24.85%_144.19%_68.39%_-74.38%]"
              data-node-id="299:271"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector3}
              />
            </div>
            <div
              className="cloud-float cloud-float--gentle absolute inset-[39.88%_195.34%_52.84%_-117.3%]"
              data-node-id="299:272"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector4}
              />
            </div>
            <div
              className="absolute inset-[31.28%_151.07%_67.49%_-66.87%]"
              data-node-id="299:273"
              data-name="Vector"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgVector5}
              />
            </div>
            <div
              className="absolute contents inset-[-61.58%_13.9%_140.86%_-5.1%]"
              data-node-id="299:274"
              data-name="Group"
            >
              <div
                className="absolute contents inset-[-61.58%_13.9%_140.86%_-5.1%]"
                data-node-id="299:275"
                data-name="Group"
              >
                <div
                  className="absolute inset-[-61.58%_13.9%_140.86%_-5.1%]"
                  data-node-id="299:276"
                  data-name="Group"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgGroup}
                  />
                </div>
              </div>
            </div>
            <div
              className="absolute contents inset-[86.1%_160.84%_-7.18%_-99.68%]"
              data-node-id="299:316"
              data-name="Group"
            >
              <div
                className="absolute inset-[86.1%_160.84%_-7.18%_-99.68%]"
                data-node-id="299:317"
                data-name="Group"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgGroup1}
                />
              </div>
            </div>
          </div>
          <div
            className="absolute inset-[5.95%_98.85%_0.09%_0]"
            data-node-id="46:15"
            data-name="Vector"
          >
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector7} />
          </div>
          <div
            className="absolute inset-[94.48%_98.98%_5.47%_1.02%]"
            data-node-id="46:16"
            data-name="Vector"
          >
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector8} />
          </div>
          <div
            className="absolute inset-[3.44%_45.97%_96.55%_54%]"
            data-node-id="46:17"
            data-name="Vector"
          >
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector9} />
          </div>
          <div
            className="absolute inset-[3.23%_2.05%_0_2.05%]"
            data-node-id="46:18"
            data-name="Vector"
          >
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector10} />
          </div>
          <div
            className="absolute inset-[94.57%_1.02%_5.38%_98.98%]"
            data-node-id="46:19"
            data-name="Vector"
          >
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector11} />
          </div>
          <div
            className="absolute inset-[6.04%_0_0_98.85%]"
            data-node-id="46:20"
            data-name="Vector"
          >
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector12} />
          </div>
          <div
            className="absolute inset-[0_0.2%_93.96%_0.2%]"
            data-node-id="46:21"
            data-name="Vector"
          >
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector13} />
          </div>
          <div
            className="absolute flex inset-[2.2%_2.85%_63.45%_67.08%] items-center justify-center"
            data-node-id="46:22"
            style={{ containerType: "size" }}
          >
            <div className="flex-none h-[hypot(-13.9049cqw,49.9566cqh)] rotate-[21.91deg] w-[hypot(86.0951cqw,50.0434cqh)]">
              <div className="relative size-full" data-name="Camada_1">
                <img
                  alt=""
                  className="wind-sway absolute block inset-0 max-w-none size-full"
                  src={imgCamada6}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute z-20 inset-[0.65%_62.17%_98.46%_21.82%]"
          data-node-id="46:10"
          data-name="Camada_1"
        >
          <img
            alt=""
            className="bird-flap absolute block inset-0 max-w-none size-full"
            src={imgCamada7}
          />
        </div>
        <div className="absolute inset-[4.57%_1.21%_89.23%_95.73%]" data-node-id="46:32">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup2} />
        </div>
        <div
          className="absolute flex inset-[4.56%_95.74%_89.24%_1.2%] items-center justify-center"
          data-node-id="46:35"
          style={{ containerType: "size" }}
        >
          <div className="-scale-x-100 flex-none h-[100cqh] w-[100cqw]">
            <div className="relative size-full">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup3} />
            </div>
          </div>
        </div>
        <div
          className="absolute flex inset-[10.75%_95.59%_83.05%_1.35%] items-center justify-center"
          data-node-id="46:38"
          style={{ containerType: "size" }}
        >
          <div className="-scale-x-100 flex-none h-[100cqh] w-[100cqw]">
            <div className="relative size-full">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup4} />
            </div>
          </div>
        </div>
        <div className="absolute inset-[16.95%_95.33%_76.85%_1.61%]" data-node-id="46:41">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup5} />
        </div>
        <div
          className="absolute flex inset-[23.15%_95.59%_70.65%_1.35%] items-center justify-center"
          data-node-id="46:44"
          style={{ containerType: "size" }}
        >
          <div className="-scale-x-100 flex-none h-[100cqh] w-[100cqw]">
            <div className="relative size-full">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup7} />
            </div>
          </div>
        </div>
        <div className="absolute inset-[29.35%_95.33%_64.45%_1.61%]" data-node-id="83:39">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup13} />
        </div>
        <div
          className="absolute flex inset-[10.75%_1.47%_83.05%_95.47%] items-center justify-center"
          data-node-id="46:47"
          style={{ containerType: "size" }}
        >
          <div className="-scale-x-100 flex-none h-[100cqh] w-[100cqw]">
            <div className="relative size-full">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup4} />
            </div>
          </div>
        </div>
        <div className="absolute inset-[16.95%_1.21%_76.85%_95.73%]" data-node-id="46:50">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup5} />
        </div>
        <div
          className="absolute flex inset-[23.15%_1.47%_70.65%_95.47%] items-center justify-center"
          data-node-id="46:53"
          style={{ containerType: "size" }}
        >
          <div className="-scale-x-100 flex-none h-[100cqh] w-[100cqw]">
            <div className="relative size-full">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup8} />
            </div>
          </div>
        </div>
        <div className="absolute contents left-[82px] top-[calc(4%+113.52px)]" data-node-id="51:69">
          <div
            className="absolute h-[361px] left-[82px] top-[calc(4%+113.52px)] w-[1472px]"
            data-node-id="46:56"
            data-name="Camada_1"
          >
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada8} />
          </div>
          <div
            className="absolute h-[25.28px] left-[calc(20%+335px)] top-[calc(5%+228.4px)] w-[261.86px]"
            data-node-id="46:238"
            data-name="Camada_1"
          >
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamada9} />
          </div>
        </div>
      </div>
      <p
        className="-translate-x-1/2 [word-break:break-word] absolute font-corpo font-normal leading-[normal] left-[calc(50%+3px)] not-italic text-[#eaeaea] text-[32px] text-center top-[calc(3%+233.64px)] w-[856px]"
        data-node-id="46:271"
      >
        {subtitulo}
      </p>
    </header>
  );
}
