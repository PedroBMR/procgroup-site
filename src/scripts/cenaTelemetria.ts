/**
 * Cena do herói da home: TELEMETRIA.
 *
 * Faixas de dados vivos atravessando o quadro. Cada faixa é uma grandeza que a
 * plataforma acompanha em alguma das três unidades do site:
 *
 *   disponibilidade   Infraestrutura de TI (NOC, cloud, backup)
 *   peças por hora    IA Industrial (linha de produção)
 *   acessos           Ambientes Inteligentes (portaria, perímetro)
 *   temperatura       o ambiente de qualquer uma das três
 *   fluxo             idem
 *
 * O evento da cena é um só: numa das faixas o sinal começa a fugir do padrão,
 * a plataforma MARCA o desvio enquanto ele ainda sobe, e a curva volta ao
 * normal sem encostar na linha de limite. É o posicionamento da empresa
 * desenhado ("inteligência que age antes do problema"), não ilustrado.
 *
 * POR QUE NÃO É MAIS UMA CENA DE CÂMERA: as cinco direções anteriores eram
 * variações de "o que a câmera vê", e a home deixou de falar com governo em
 * 2026-08-27. Das três unidades que sobraram, Infraestrutura de TI (a que
 * sustenta a empresa) não tem câmera nenhuma. O que as três compartilham é o
 * sinal virando decisão, e é isso que esta cena mostra.
 *
 * ZERO NÚMERO NA TELA, de propósito. Qualquer valor desenhado aqui seria uma
 * métrica inventada, e métrica sem metodologia rastreável não entra em peça da
 * Proc. A cena mostra forma e ritmo do dado, nunca um valor.
 *
 * Vermelho PONTUAL, como manda o manual: só no instante da marcação. Passados
 * alguns segundos o carimbo se apaga e o que segue viajando com o trecho é um
 * risco tênue, a memória do evento.
 *
 * Decorativa e aria-hidden: a mensagem está no texto do herói.
 */
import type { Cena, Ctx } from "./cenaTipos";

const CLARO = "190, 214, 246";
const RED = "255, 74, 84";

/** Segundos de dados que cabem na largura do quadro. Mais que isso vira ruído. */
const JANELA = 14;

/* Envelope do desvio, em segundos de dados. */
const SUBIDA = 3.8;
const PLATO = 1.2;
const QUEDA = 4.6;
const TOTAL = SUBIDA + PLATO + QUEDA;
/** Ponto da subida em que a plataforma marca. Menor que 1 de propósito: a
 *  marcação acontece ENQUANTO a curva sobe, que é a frase inteira da cena. */
const GATILHO = 0.44;
/** Quanto tempo o carimbo vermelho fica aceso depois da marcação, em segundos. */
const CARIMBO_VIVO = 5.5;
/** Altura do pico do desvio, em fração da faixa. O limite fica mais acima: a
 *  curva chega perto e não encosta. */
const PICO = 0.72;
const LIMITE = 0.9;

const suave = (x: number) => x * x * (3 - 2 * x);
const hash = (n: number) => { const x = Math.sin(n * 127.1) * 43758.5453; return x - Math.floor(x); };

/** Picos esparsos e determinísticos: a assinatura de "acessos". */
function picos(u: number) {
  let v = -0.12;
  const base = Math.floor(u / 3.1);
  for (let k = base - 1; k <= base + 1; k++) {
    const centro = k * 3.1 + hash(k) * 2.2;
    const d = (u - centro) / 0.3;
    v += (0.3 + hash(k + 99) * 0.4) * Math.exp(-d * d);
  }
  return v;
}

/**
 * A forma de cada faixa. Soma de senos com frequências que não fecham ciclo
 * juntas: o olho não acha repetição, e não custa nada guardar histórico.
 */
const ASSINATURAS: Array<(u: number, f: number) => number> = [
  // disponibilidade: quase reta. É o que se espera de quem vende alta disponibilidade.
  (u, f) => 0.05 * Math.sin(u * 0.8 + f) + 0.02 * Math.sin(u * 2.3 + f * 2),
  // peças por hora: patamares curtos, o ritmo de uma linha de produção.
  (u, f) => 0.26 * Math.tanh(Math.sin(u * 0.55 + f) * 2.4) + 0.04 * Math.sin(u * 3.3 + f),
  // acessos: picos esparsos, cada um é uma passagem.
  (u, f) => picos(u + f * 3),
  // temperatura: onda longa e preguiçosa.
  (u, f) => 0.3 * Math.sin(u * 0.32 + f) + 0.1 * Math.sin(u * 0.87 + f * 1.7),
  // fluxo: ondulação de ritmo médio.
  (u, f) => 0.22 * Math.sin(u * 0.9 + f) + 0.12 * Math.sin(u * 2.1 + f * 0.6),
];

const ROTULOS_PADRAO = ["DISPONIBILIDADE", "PEÇAS/HORA", "ACESSOS", "TEMPERATURA", "FLUXO"];

/** Envelope do desvio: sobe, segura, volta. */
function envelope(d: number) {
  if (d <= 0) return 0;
  if (d < SUBIDA) return suave(d / SUBIDA);
  if (d < SUBIDA + PLATO) return 1;
  if (d < TOTAL) return 1 - suave((d - SUBIDA - PLATO) / QUEDA);
  return 0;
}

interface Anomalia { trilha: number; u0: number; }

/** Quantas faixas cabem. Abaixo de 700px de largura três já lotam o quadro. */
const quantas = (w: number) => (w >= 1040 ? 5 : w >= 700 ? 4 : 3);

function sortear(s: any, t: number, w: number) {
  const n = quantas(w);
  let k = Math.floor(hash(t * 7.3) * n);
  if (k === s.anom?.trilha) k = (k + 1 + Math.floor(hash(t * 13.7) * (n - 1))) % n;
  // Nasce à frente do "agora": entra em cena pela borda direita, não do nada.
  s.anom = { trilha: k, u0: t + JANELA * 0.1 } as Anomalia;
}

export const telemetria: Cena = {
  // 30 quadros por segundo dão curva lisa numa cena que se move devagar, pela
  // metade do custo de um rAF solto.
  fps: 30,

  criar(_w, _h, host) {
    let rotulos = ROTULOS_PADRAO;
    try {
      const bruto = JSON.parse(host?.dataset.rotulos ?? "[]");
      if (Array.isArray(bruto) && bruto.length === 5) rotulos = bruto;
    } catch { /* rótulo é enfeite: se vier torto, usa o padrão e a cena segue */ }

    return {
      rotulos,
      carimbo: host?.dataset.carimbo || "DESVIO MARCADO",
      fases: ASSINATURAS.map((_, i) => hash(i * 4.7) * 6.28),
      // O desvio de estreia é posicionado pelo modo de exibição, e é a única
      // coisa nesta cena que precisa saber dele:
      //   menos movimento → um quadro só, então ele já nasce MARCADO, no meio
      //                     do quadro. Parada, a cena ainda conta a história.
      //   normal          → nasce subindo, e a marcação acontece na frente de
      //                     quem chega, logo depois da abertura da home.
      anom: {
        trilha: 3,
        u0: matchMedia("(prefers-reduced-motion: reduce)").matches ? -6 : -1.2,
      } as Anomalia,
    };
  },

  desenhar(ctx, s, w, h, t, _ativo, px, py) {
    const n = quantas(w);
    const estreito = w < 700;
    // No desktop a banda mora na metade de baixo: o topo do herói é do h1 e o
    // rodapé é do bloco de estatísticas, então ela fica entre os dois.
    //
    // No celular o herói passa de 1200px de altura e o texto ocupa quase tudo:
    // ancorar a banda no rodapé jogaria a cena para fora da primeira tela, e
    // ela simplesmente não existiria para quem chega pelo telefone. Ali ela se
    // ancora no que cabe na tela e passa POR TRÁS do texto, atenuada logo
    // abaixo até virar textura.
    const visivel = Math.min(h, window.innerHeight);
    const alturaBanda = estreito
      ? Math.min(280, visivel * 0.34)
      : Math.min(h * 0.5, Math.max(220, w * 0.28));
    const topo = estreito ? visivel * 0.5 : h * 0.8 - alturaBanda;
    const passo = alturaBanda / n;
    const x0 = -4;
    const largura = w - x0;
    const uNoX = (x: number) => t - ((w - x) / largura) * JANELA;
    const xNoU = (u: number) => w - ((t - u) / JANELA) * largura;

    // Paralaxe curta: a cena responde ao ponteiro sem sair do lugar.
    ctx.save();
    ctx.translate(px * w * 0.006, py * h * 0.004);
    // Na tela estreita a cena divide espaço com o texto, então recua.
    if (estreito) ctx.globalAlpha = 0.55;

    if (s.anom && s.anom.u0 + TOTAL < t - JANELA) sortear(s, t, w);
    // Faixa que saiu do recorte (a tela encolheu) herda o desvio da última
    // visível: sem isso, redimensionar para o celular congelaria a cena.
    if (s.anom && s.anom.trilha >= n) s.anom.trilha = n - 1;

    desenharGradeDeTempo(ctx, w, topo, alturaBanda, t, largura);

    for (let i = 0; i < n; i++) {
      const yBase = topo + passo * (i + 0.5);
      const amp = passo * 0.38;
      const emDesvio = s.anom?.trilha === i;
      desenharTrilha(ctx, s, i, yBase, amp, x0, w, uNoX, emDesvio);
      desenharRotulo(ctx, s.rotulos[i] ?? "", w, yBase - amp - 9, emDesvio);
    }

    if (s.anom) {
      const yBase = topo + passo * (s.anom.trilha + 0.5);
      desenharMarcador(ctx, s, yBase, passo * 0.38, t, xNoU, w);
    }

    desenharAgora(ctx, s, w, topo, alturaBanda, passo, n, t);
    ctx.restore();

    // O lado esquerdo é do texto: as faixas se dissolvem antes de chegar nele.
    // Isso é feito no canvas, e não só no véu do host, porque o véu escurece
    // por igual e a curva ainda aparecia por baixo do subtítulo. Aqui ela some
    // de vez, e de quebra o dado parece vir do escuro.
    const fim = w < 700 ? w * 0.18 : w * 0.56;
    const apagar = ctx.createLinearGradient(0, 0, fim, 0);
    apagar.addColorStop(0, "rgba(0, 0, 0, 1)");
    apagar.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = apagar;
    ctx.fillRect(0, 0, fim, h);
    ctx.globalCompositeOperation = "source-over";
  },
};

/** Marcas de tempo correndo para a esquerda: é o que dá a sensação de fluxo. */
function desenharGradeDeTempo(ctx: Ctx, w: number, topo: number, altura: number, t: number, largura: number) {
  const passoU = 2.5;
  const passoX = (passoU / JANELA) * largura;
  const desloc = ((t % passoU) / JANELA) * largura;
  ctx.strokeStyle = `rgba(${CLARO}, 0.05)`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = w - desloc; x > 0; x -= passoX) {
    ctx.moveTo(Math.round(x) + 0.5, topo);
    ctx.lineTo(Math.round(x) + 0.5, topo + altura);
  }
  ctx.stroke();
}

function desenharTrilha(
  ctx: Ctx, s: any, i: number, yBase: number, amp: number,
  x0: number, w: number, uNoX: (x: number) => number, emDesvio: boolean,
) {
  const assinatura = ASSINATURAS[i];
  const fase = s.fases[i];
  const valor = (u: number) => {
    let v = assinatura(u, fase);
    if (emDesvio && s.anom) v += PICO * envelope(u - s.anom.u0);
    return Math.max(-1.1, Math.min(1.1, v));
  };

  // Linha de repouso: dá eixo à faixa sem competir com a curva.
  ctx.strokeStyle = `rgba(${CLARO}, 0.09)`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x0, Math.round(yBase) + 0.5);
  ctx.lineTo(w, Math.round(yBase) + 0.5);
  ctx.stroke();

  // A curva, em passos de 2px: mais fino que isso ninguém vê, e custa o dobro.
  const pontos: Array<[number, number]> = [];
  for (let x = x0; x <= w; x += 2) pontos.push([x, yBase - valor(uNoX(x)) * amp]);

  const tracar = () => {
    ctx.beginPath();
    ctx.moveTo(pontos[0][0], pontos[0][1]);
    for (const [x, y] of pontos) ctx.lineTo(x, y);
  };

  // Corpo: gradiente fraquinho até a linha de repouso. Sem ele a faixa fica
  // seca, um fio solto no escuro.
  const corpo = ctx.createLinearGradient(0, yBase - amp, 0, yBase + amp * 0.4);
  corpo.addColorStop(0, `rgba(${CLARO}, ${emDesvio ? 0.1 : 0.06})`);
  corpo.addColorStop(1, `rgba(${CLARO}, 0)`);
  tracar();
  ctx.lineTo(w, yBase);
  ctx.lineTo(x0, yBase);
  ctx.closePath();
  ctx.fillStyle = corpo;
  ctx.fill();

  // Duas passadas fazem o brilho: uma larga e translúcida, uma fina e nítida.
  // Sai muito mais barato que shadowBlur, que refaz o traço a cada quadro.
  ctx.lineJoin = "round";
  ctx.strokeStyle = `rgba(${CLARO}, ${emDesvio ? 0.2 : 0.13})`;
  ctx.lineWidth = 4;
  tracar();
  ctx.stroke();
  ctx.strokeStyle = `rgba(${CLARO}, ${emDesvio ? 0.88 : 0.62})`;
  ctx.lineWidth = 1.5;
  tracar();
  ctx.stroke();
}

/** Texto curto em mono. O canvas não herda a fonte da página, então ela vai aqui. */
function comFonteMono(ctx: Ctx, tamanho: number, desenhar: () => void) {
  ctx.save();
  ctx.font = `600 ${tamanho}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
  if ("letterSpacing" in ctx) (ctx as any).letterSpacing = "0.16em";
  desenhar();
  ctx.restore();
}

function desenharRotulo(ctx: Ctx, texto: string, w: number, y: number, emDesvio: boolean) {
  if (!texto) return;
  comFonteMono(ctx, 10, () => {
    ctx.textAlign = "right";
    ctx.fillStyle = emDesvio ? `rgba(${CLARO}, 0.7)` : `rgba(${CLARO}, 0.34)`;
    ctx.fillText(texto, w - 26, y);
  });
}

/**
 * O marcador do desvio. Três tempos:
 *   1. antes do gatilho: nada, a curva só sobe
 *   2. no gatilho: colchetes vermelhos fecham no trecho e o carimbo acende
 *   3. depois: o carimbo apaga e fica o risco tênue viajando com o trecho
 */
function desenharMarcador(ctx: Ctx, s: any, yBase: number, amp: number, t: number, xNoU: (u: number) => number, w: number) {
  const uGatilho = s.anom.u0 + SUBIDA * GATILHO;
  const desde = t - uGatilho;
  if (desde < 0) return;

  const entrada = Math.min(1, desde / 0.45);
  const vivo = Math.max(0, 1 - Math.max(0, desde - CARIMBO_VIVO) / 1.6);
  const xEsq = xNoU(s.anom.u0);
  const xDir = xNoU(s.anom.u0 + TOTAL);
  const xMarca = xNoU(uGatilho);
  const alto = yBase - amp * 1.5;
  const baixo = yBase + amp * 0.9;

  // Linha de limite: só aparece na faixa em desvio, e só enquanto o evento
  // interessa. Existe para o olho medir que a curva NÃO encostou nela.
  const limite = yBase - amp * LIMITE;
  ctx.save();
  ctx.setLineDash([3, 5]);
  ctx.strokeStyle = `rgba(${RED}, ${0.3 * entrada * Math.max(vivo, 0.35)})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(Math.max(0, xEsq), limite);
  ctx.lineTo(Math.min(w, xDir), limite);
  ctx.stroke();
  ctx.restore();

  // Colchetes: envolvem o trecho sem encaixotá-lo.
  const braco = Math.min(14, Math.max(6, (xDir - xEsq) * 0.14));
  ctx.strokeStyle = `rgba(${RED}, ${(0.28 + 0.5 * vivo) * entrada})`;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  for (const [x, dir] of [[xEsq, 1], [xDir, -1]] as const) {
    ctx.moveTo(x + braco * dir, alto);
    ctx.lineTo(x, alto);
    ctx.lineTo(x, baixo);
    ctx.lineTo(x + braco * dir, baixo);
  }
  ctx.stroke();

  // O instante da marcação: risco vertical no ponto exato em que a plataforma
  // decidiu. Fica depois que o carimbo apaga, mais fraco.
  ctx.strokeStyle = `rgba(${RED}, ${(0.18 + 0.52 * vivo) * entrada})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(Math.round(xMarca) + 0.5, alto);
  ctx.lineTo(Math.round(xMarca) + 0.5, baixo);
  ctx.stroke();

  if (vivo <= 0.02) return;
  comFonteMono(ctx, 10, () => {
    ctx.textAlign = "left";
    const texto = s.carimbo as string;
    const larguraTexto = ctx.measureText(texto).width;
    // Vira para dentro quando o trecho chega perto da borda direita.
    const x = xMarca + larguraTexto + 18 > w ? xMarca - larguraTexto - 10 : xMarca + 10;
    const y = alto - 8;
    ctx.fillStyle = `rgba(${RED}, ${vivo * entrada})`;
    ctx.fillText(texto, x, y);
    ctx.fillRect(x, y + 4, larguraTexto, 1);
  });
}

/** A borda direita é o "agora": onde o dado novo entra. */
function desenharAgora(ctx: Ctx, s: any, w: number, topo: number, altura: number, passo: number, n: number, t: number) {
  const x = w - 26;
  ctx.strokeStyle = `rgba(${CLARO}, 0.12)`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(Math.round(x) + 0.5, topo);
  ctx.lineTo(Math.round(x) + 0.5, topo + altura);
  ctx.stroke();

  for (let i = 0; i < n; i++) {
    const yBase = topo + passo * (i + 0.5);
    const amp = passo * 0.38;
    let v = ASSINATURAS[i](t, s.fases[i]);
    if (s.anom?.trilha === i) v += PICO * envelope(t - s.anom.u0);
    const y = yBase - Math.max(-1.1, Math.min(1.1, v)) * amp;
    const quente = s.anom?.trilha === i && t - s.anom.u0 > SUBIDA * GATILHO && t - s.anom.u0 < TOTAL;
    ctx.fillStyle = quente ? `rgba(${RED}, 0.9)` : `rgba(${CLARO}, 0.55)`;
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 6.2832);
    ctx.fill();
  }
}
