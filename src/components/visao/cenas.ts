/**
 * Desenhos da página de Visão Computacional, em linha, montados com os ícones
 * do mega-menu (src/data/iconesMenu.ts). Todos em viewBox 0 0 320 200 e sem
 * palavra nenhuma: o texto da página fica fora do SVG, onde o leitor de tela
 * alcança. As classes (tr, fl, surge, pisca, esteira...) estão em Cena.astro.
 *
 *   --o     atraso da entrada, em segundos
 *   --k     índice para escalonar um loop
 */
import { ICONES_MENU, type NomeIconeMenu } from "../../data/iconesMenu";

const ic = (nome: NomeIconeMenu, x: number, y: number, s = 2, cls = "") =>
  `<g class="${cls}" transform="translate(${x} ${y}) scale(${s})">${ICONES_MENU[nome]}</g>`;
const tr = (d: string, cls = "", o = 0) => `<path class="tr ${cls}" pathLength="1" d="${d}" style="--o:${o}"/>`;
const fl = (d: string, k = 0) => `<path class="fl" pathLength="1" d="${d}" style="--k:${k}"/>`;
// Quadro de detecção: só os quatro cantos, como nas câmeras com analytics.
const quadro = (x: number, y: number, w: number, h: number, cls = "destaque", o = 0, c = 9) =>
  tr(
    `M${x} ${y + c}V${y}H${x + c}M${x + w - c} ${y}H${x + w}V${y + c}M${x + w} ${y + h - c}V${y + h}H${x + w - c}M${x + c} ${y + h}H${x}V${y + h - c}`,
    cls,
    o,
  );

export const CENAS = {
  /* Imagem que vira dado: o quadro da câmera com pessoas e veículo
     detectados, e o gráfico que nasce dele. */
  imagemDado:
    tr("M16 40h140v110H16z", "fraco") +
    ic("pessoas", 30, 66, 2.1) +
    ic("carro", 94, 86, 2) +
    quadro(26, 60, 58, 58, "destaque", 0.6) +
    quadro(90, 80, 56, 54, "destaque", 0.8) +
    tr("M166 95H204M196 88l8 7-8 7", "fraco", 1) +
    fl("M166 95H204") +
    tr("M216 40V150H308", "", 0.4) +
    '<rect class="barra" x="228" y="110" width="16" height="40" style="--o:1.2"/>' +
    '<rect class="barra" x="254" y="86" width="16" height="64" style="--o:1.35"/>' +
    '<rect class="barra" x="280" y="62" width="16" height="88" style="--o:1.5"/>' +
    tr("M226 100L262 76L288 52L304 44", "destaque", 1.6) +
    fl("M226 100L262 76L288 52L304 44", 1),

  /* Linha de produção: peças passando na esteira, sob a câmera. */
  producao:
    ic("camera", 140, 10, 1.7) +
    tr("M154 36L118 132M166 36L202 132", "fraco tracejado", 0.3) +
    tr("M8 150H312", "", 0.2) +
    [30, 80, 130, 180, 230, 280].map((x) => `<circle class="rolo" cx="${x}" cy="160" r="6"/>`).join("") +
    `<g class="esteira" style="--passo:80px; --dur:3.2s">${[-70, 10, 90, 170, 250].map((x) => ic("caixas", x, 112, 1.5)).join("")}</g>` +
    quadro(114, 102, 92, 48, "destaque", 0.8) +
    '<circle class="pisca" cx="160" cy="96" r="3"/>' +
    tr("M248 26V74H308", "fraco", 0.5) +
    '<rect class="barra" x="256" y="56" width="10" height="18" style="--o:1"/>' +
    '<rect class="barra" x="272" y="46" width="10" height="28" style="--o:1.15"/>' +
    '<rect class="barra" x="288" y="36" width="10" height="38" style="--o:1.3"/>',

  /* Inspeção: o feixe varre as peças e marca a que está fora do padrão. */
  inspecao:
    tr("M8 140H312", "fraco", 0.2) +
    [24, 98, 172, 246].map((x, k) => ic("engrenagem", x, 74, 2.1, k === 2 ? "falha" : "")).join("") +
    [24, 98, 246].map((x, k) => tr(`M${x + 16} 160l6 6 12-12`, "ok", 1 + k * 0.2)).join("") +
    quadro(164, 66, 66, 66, "destaque pisca-traco", 1.4, 12) +
    '<rect class="feixe" x="0" y="40" width="6" height="110" rx="3"/>',

  /* Rastreabilidade: o produto identificado por código passa por pontos de
     leitura ao longo da operação, e cada passagem fica registrada. */
  rastreabilidade:
    tr("M30 60H290C310 60 310 140 290 140H30", "fraco", 0.2) +
    [[60, 60], [160, 60], [260, 60], [260, 140], [160, 140], [60, 140]]
      .map(([x, y], k) => `<circle class="evento visto" cx="${x}" cy="${y}" r="7" style="--k:${k}"/>`)
      .join("") +
    fl("M30 60H290C310 60 310 140 290 140H30") +
    ic("qrcode", 136, 80, 2) +
    quadro(126, 72, 68, 56, "destaque pisca-traco", 0.6),

  /* Máquinas: mostrador, termômetro e nível de tanque lidos pela câmera,
     cada leitura indo para o mesmo painel de dados. */
  maquinas:
    tr("M28 96a40 40 0 0 1 80 0", "", 0.2) +
    '<path class="ponteiro" d="M68 96L68 66" style="--ox:68px; --oy:96px"/>' +
    '<circle class="eixo" cx="68" cy="96" r="4"/>' +
    quadro(18, 46, 100, 66, "destaque", 0.8) +
    ic("termometro", 132, 46, 2.6) +
    quadro(128, 42, 70, 70, "destaque", 0.95) +
    tr("M226 46h44v66h-44z", "", 0.3) +
    '<rect class="nivel" x="230" y="50" width="36" height="58"/>' +
    quadro(216, 38, 64, 82, "destaque", 1.1) +
    tr("M68 112V150H248M160 112V150M248 120V150", "fraco", 1.2) +
    fl("M68 150H248", 0) +
    ic("grafico", 250, 138, 1.8),

  /* Estacionamento: vagas vistas de cima, um veículo estacionando, o tempo
     correndo em volta da vaga e o alerta quando passa do limite. */
  estacionamento:
    tr("M16 24H200M16 176H200M16 24V176M62 24V88M108 24V88M154 24V88M62 112V176M108 112V176M154 112V176", "fraco", 0.2) +
    ic("carro", 22, 40, 1.6) +
    ic("carro", 114, 40, 1.6) +
    ic("carro", 22, 124, 1.6) +
    `<g class="anda" style="--dx:-40px; --dy:0px">${ic("carro", 154, 124, 1.6)}</g>` +
    quadro(108, 112, 46, 64, "destaque", 0.6) +
    '<circle class="relogio-fundo" cx="262" cy="70" r="34"/>' +
    '<circle class="tr destaque relogio" cx="262" cy="70" r="34" pathLength="1" style="--o:0.8"/>' +
    ic("relogio", 250, 58, 1) +
    tr("M262 104V128", "fraco", 1.2) +
    '<circle class="onda" cx="262" cy="150" r="20"/>' +
    ic("sino", 250, 138, 1),

  /* Expedição: caixas saem do prédio para o caminhão na doca. */
  expedicao:
    ic("predio", 8, 64, 3.4) +
    tr("M90 140H196", "fraco", 0.2) +
    `<g class="esteira" style="--passo:36px; --dur:1.6s">${[56, 92, 128, 164].map((x) => ic("caixas", x, 118, 0.9)).join("")}</g>` +
    ic("caminhao", 196, 60, 4.6) +
    quadro(190, 66, 122, 102, "destaque", 0.8, 12) +
    ic("camera", 132, 14, 1.6) +
    tr("M146 40L120 110M158 40L190 110", "fraco tracejado", 0.4),

  /* Estoque: prateleiras com áreas definidas e um item fora do lugar. */
  estoque:
    tr("M20 30H210M20 90H210M20 150H210M20 30V150M83 30V150M146 30V150M210 30V150", "", 0.2) +
    [[30, 40], [94, 40], [30, 100], [158, 100], [94, 100]].map(([x, y]) => ic("caixas", x, y, 1.7)).join("") +
    tr("M150 36h56v48h-56z", "fraco tracejado", 0.6) +
    `<g class="anda" style="--dx:-4px; --dy:-2px">${ic("caixas", 246, 112, 1.9)}</g>` +
    quadro(236, 100, 66, 66, "destaque pisca-traco", 1) +
    tr("M206 60C240 60 262 76 268 100", "destaque tracejado", 1.2),

  /* Automatizar o que depende de ver: o olho humano pega parte dos
     eventos ao longo do tempo; a câmera pega todos, o tempo todo. */
  automatize:
    ic("olho", 10, 44, 1.8) +
    ic("camera", 10, 124, 1.8) +
    tr("M66 66H312", "fraco", 0.2) +
    tr("M66 146H312", "", 0.3) +
    [80, 112, 144, 176, 208, 240, 272, 304]
      .map((x, k) => `<circle class="evento ${k % 3 === 0 ? "visto" : ""}" cx="${x - 6}" cy="66" r="5" style="--k:${k}"/>`)
      .join("") +
    [80, 112, 144, 176, 208, 240, 272, 304]
      .map((x, k) => `<circle class="evento visto" cx="${x - 6}" cy="146" r="5" style="--k:${k}"/>`)
      .join("") +
    fl("M66 146H312", 0),

  /* Câmeras, DVR e NVR que já existem, ligados à plataforma. */
  aproveitamento:
    [20, 92, 164].map((x) => ic("camera", x, 22, 2)).join("") +
    [20, 92, 164].map((x, k) => tr(`M${x + 34} 30l5 5 10-10`, "ok", 1 + k * 0.2)).join("") +
    tr("M44 70V96H188V70M116 70V120", "fraco", 0.4) +
    ic("dvr", 88, 112, 2.4) +
    tr("M172 142H232", "fraco", 0.8) +
    fl("M172 142H232") +
    '<circle class="nucleo" cx="268" cy="142" r="34"/>' +
    ic("chip", 250, 124, 1.5),

  /* Tecnologia própria: módulos que se encaixam ao redor do núcleo. */
  tecnologia:
    '<circle class="nucleo" cx="160" cy="100" r="36"/>' +
    ic("olho", 142, 82, 1.5) +
    [[56, 40], [264, 40], [56, 160], [264, 160]]
      .map(([x, y], k) => tr(`M${x} ${y}L${x < 160 ? 128 : 192} ${y < 100 ? 78 : 122}`, "fraco", 0.4 + k * 0.1) + fl(`M${x} ${y}L${x < 160 ? 128 : 192} ${y < 100 ? 78 : 122}`, k))
      .join("") +
    [["engrenagem", 36, 20], ["codigo", 244, 20], ["modulos", 36, 140], ["fabrica", 244, 140]]
      .map(([n, x, y]) => ic(n as NomeIconeMenu, x as number, y as number, 1.7))
      .join(""),

  /* Abas de Visão Corporativa e Industrial. */
  "controle-de-producao":
    tr("M8 116H312", "", 0.2) +
    `<g class="esteira" style="--passo:64px; --dur:2.4s">${[-56, 8, 72, 136, 200, 264].map((x) => ic("caixas", x, 82, 1.3)).join("")}</g>` +
    ic("camera", 142, 20, 1.5) +
    quadro(128, 74, 64, 44, "destaque", 0.6),
  "inspecoes-de-qualidade":
    [40, 128, 216].map((x, k) => ic("selo", x, 50, 2.6, k === 1 ? "falha" : "")).join("") +
    quadro(120, 42, 78, 78, "destaque pisca-traco", 0.8, 12) +
    '<rect class="feixe" x="0" y="34" width="5" height="96" rx="2.5"/>',
  "estoque-e-logistica":
    ic("caixas", 30, 50, 2.6) +
    tr("M104 82H200", "fraco", 0.3) +
    fl("M104 82H200") +
    ic("caminhao", 210, 44, 3.2),
  "equipamentos-e-processos":
    tr("M60 110a50 50 0 0 1 100 0", "", 0.2) +
    '<path class="ponteiro" d="M110 110L110 72" style="--ox:110px; --oy:110px"/>' +
    '<circle class="eixo" cx="110" cy="110" r="4"/>' +
    tr("M170 90H220", "fraco", 0.6) +
    fl("M170 90H220") +
    ic("erp", 226, 60, 2.6),
  "seguranca-operacional":
    ic("capacete", 70, 34, 2.4) +
    ic("pessoas", 70, 70, 2.4) +
    quadro(60, 28, 78, 108, "destaque", 0.6, 12) +
    tr("M160 82H200", "fraco", 0.8) +
    ic("escudo", 212, 52, 2.6),

  /* Cards de Segurança e Videomonitoramento. */
  pesquisaPessoas:
    [0, 1, 2].flatMap((c) => [0, 1].map((l) => tr(`M${24 + c * 96}  ${30 + l * 74}h80v60h-80z`, "fraco", 0.2 + (c + l) * 0.08))).join("") +
    ic("pessoas", 132, 110, 1.8) +
    quadro(120, 104, 80, 60, "destaque pisca-traco", 1) +
    `<g class="anda" style="--dx:96px; --dy:0px">${ic("lupa", 40, 40, 1.8)}</g>`,
  pesquisaVeiculos:
    ic("carro", 40, 36, 4.4) +
    tr("M72 158h80v22h-80z", "destaque", 0.6) +
    tr("M84 169h56", "fraco tracejado", 0.8) +
    tr("M190 100H240", "fraco", 0.8) +
    `<g class="anda" style="--dx:-6px; --dy:4px">${ic("lupa", 240, 66, 2.6)}</g>`,
  alertas:
    tr("M24 30h160v140h-160z", "destaque tracejado", 0.2) +
    ic("pessoas", 80, 76, 2) +
    quadro(70, 66, 68, 66, "destaque", 0.6) +
    tr("M190 100H226", "fraco", 0.8) +
    fl("M190 100H226") +
    '<circle class="onda" cx="262" cy="100" r="30"/>' +
    '<circle class="onda" cx="262" cy="100" r="30" style="--k:1"/>' +
    ic("sino", 240, 78, 1.8),

  /* Analytics do fluxo de pessoas: planta da loja com mapa de calor. */
  fluxoPessoas:
    tr("M14 20h292v160h-292zM14 120H120V180M200 20V80H306", "fraco", 0.2) +
    '<circle class="calor" cx="80" cy="64" r="42" style="--k:0"/>' +
    '<circle class="calor" cx="236" cy="134" r="36" style="--k:1"/>' +
    '<circle class="calor fraco" cx="166" cy="100" r="26" style="--k:2"/>' +
    [[60, 150, 70, -60], [160, 40, 70, 70], [250, 110, -80, 40], [120, 90, 90, -30], [40, 60, 60, 50]]
      .map(([x, y, dx, dy], k) => `<circle class="pessoa anda" cx="${x}" cy="${y}" r="4" style="--dx:${dx}px; --dy:${dy}px; --k:${k}"/>`)
      .join("") +
    tr("M14 150V180", "destaque", 0.5),

  /* Analytics do fluxo de veículos: pista com a linha de contagem. */
  fluxoVeiculos:
    tr("M0 60H320M0 140H320", "", 0.2) +
    tr("M0 100H320", "fraco tracejado", 0.3) +
    `<g class="esteira" style="--passo:120px; --dur:3s">${[-130, -10, 110, 230].map((x) => ic("carro", x, 66, 1.4)).join("")}</g>` +
    `<g class="esteira volta" style="--passo:120px; --dur:3.6s">${[-70, 50, 170, 290].map((x) => ic("carro", x, 106, 1.4)).join("")}</g>` +
    tr("M200 50V150", "destaque", 0.6) +
    '<circle class="pisca" cx="200" cy="44" r="4"/>',
} as const;

export type NomeCena = keyof typeof CENAS;
