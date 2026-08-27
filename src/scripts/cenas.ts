/**
 * A cena do herói da home: a operação do cliente, vista de dentro.
 *
 * Um plano só, composto — não um laço de partículas. Da esquerda para a
 * direita, três estações que são as três unidades de negócio:
 *
 *   acesso   portaria com catraca; uma pessoa passa e a caixa de detecção
 *            trava nela, confirma e solta.
 *   linha    esteira com peças correndo sob uma câmera de inspeção; de vez em
 *            quando uma peça é REPROVADA.
 *   racks    corredor de data center em perspectiva, LEDs piscando; um deles
 *            entra em atenção e volta.
 *
 * E embaixo de tudo, a espinha de dados: cada evento das três estações emite um
 * pulso que corre pela linha até a borda esquerda. É a narrativa inteira do
 * site em movimento — o que acontece na operação chega à plataforma.
 *
 * POR QUE ISTO E NÃO O CAMPO DE PARTÍCULAS: o herói rodava uma "constelação
 * neural" em three.js — 509 KB de JavaScript para dizer "inteligência
 * artificial" do jeito que todo site de IA diz. Esta cena pesa uma fração
 * disso e mostra o que a Proc realmente entrega. (A cena nasceu do motor das
 * portas do antigo seletor de público, aposentado em 2026-08-27.)
 *
 * Manual de marca: "um a dois focos de luz por composição" e glow vermelho é
 * PONTUAL. Por isso o vermelho só existe no instante da reprovação e no pulso
 * que ela dispara — aceso o tempo todo viraria decoração e perderia a força.
 * O resto da cena é luz fria.
 *
 * Sem JS, sem canvas ou com prefers-reduced-motion, o CSS do host entrega o
 * gradiente e a página continua inteira. Tudo aqui é decorativo (aria-hidden).
 */
type Ctx = CanvasRenderingContext2D;

const RED = "255, 74, 84";
const CLARO = "190, 214, 246";
const AMBAR = "255, 200, 0";

interface Cena {
  criar(w: number, h: number): any;
  desenhar(ctx: Ctx, s: any, w: number, h: number, t: number, ativo: number, px: number, py: number): void;
  redimensionar?(s: any, w: number, h: number): void;
  /** Quadros por segundo. Ausente = sem limite (o rAF manda). */
  fps?: number;
}

/** Pulso que sobe a espinha de dados depois de um evento. */
interface Pulso {
  /** 0 = onde nasceu, 1 = chegou na borda esquerda. */
  p: number;
  x0: number;
  quente: boolean;
}

/* ── linhas de piso: onde cada camada assenta, em fração da altura ── */
const Y_HORIZONTE = 0.46;
const Y_PISO = 0.74;
const Y_ESPINHA = 0.9;

const operacao: Cena = {
  criar(w, h) {
    return {
      w, h,
      pulsos: [] as Pulso[],
      // Cada estação tem seu próprio relógio: os eventos não podem cair
      // sincronizados, senão a cena pisca inteira de uma vez.
      tAcesso: 1.2,
      tLinha: 3.4,
      tRack: 5.1,
      travado: 0,      // 0→1: quanto a caixa de detecção está fechada
      reprovada: -1,   // índice da peça reprovada na esteira; -1 = nenhuma
      alerta: 0,       // brilho do LED em atenção
      // Estrutura de fundo, sorteada uma vez: refazer por quadro faria a
      // silhueta tremer.
      torres: Array.from({ length: 22 }, (_, i) => ({
        x: (i + 0.5) / 22 + (Math.random() - 0.5) * 0.02,
        alt: 0.05 + Math.random() * 0.16,
        larg: 0.006 + Math.random() * 0.014,
        o: 0.03 + Math.random() * 0.05,
      })),
      leds: Array.from({ length: 26 }, () => ({
        f: Math.random(),          // posição na fileira (0 perto, 1 longe)
        lado: Math.random() < 0.5 ? -1 : 1,
        alt: Math.random(),
        fase: Math.random() * 6.28,
      })),
    };
  },

  redimensionar(s, w, h) { s.w = w; s.h = h; },

  desenhar(ctx, s, w, h, t, ativo, px, py) {
    // A composição tem proporção própria. Numa tela alta e estreita — o herói
    // do celular tem 1251px de altura — esticá-la pela altura da moldura
    // deformaria tudo: piso lá embaixo, estações espremidas. Então ela vive
    // numa BANDA de altura derivada da LARGURA, ancorada no rodapé do quadro.
    const B = Math.min(h, w * 0.62);
    const topo = h - B;
    const piso = topo + B * Y_PISO;
    const horiz = topo + B * Y_HORIZONTE;
    // Abaixo de ~640px não cabem três estações lado a lado: o que fica é a
    // atmosfera (horizonte, silhueta e a espinha de dados).
    const compacto = w < 640;
    // Paralaxe: cada camada anda um tanto. É o que dá profundidade de câmera.
    const par = (fator: number) => px * fator * w * 0.012;
    const parY = (fator: number) => py * fator * h * 0.008;

    /* ══ camada 1: horizonte e estrutura distante ══ */
    ctx.save();
    ctx.translate(par(0.3), parY(0.3));

    const brilho = ctx.createLinearGradient(0, horiz - B * 0.22, 0, piso);
    brilho.addColorStop(0, "rgba(37, 56, 102, 0)");
    brilho.addColorStop(0.6, "rgba(37, 56, 102, 0.34)");
    brilho.addColorStop(1, "rgba(37, 56, 102, 0)");
    ctx.fillStyle = brilho;
    ctx.fillRect(-w * 0.1, horiz - B * 0.22, w * 1.2, B * 0.5);

    for (const b of s.torres) {
      ctx.fillStyle = `rgba(255, 255, 255, ${b.o})`;
      const alt = B * b.alt;
      ctx.fillRect(b.x * w, horiz - alt, w * b.larg, alt);
    }
    ctx.restore();

    /* ══ camada 2: o piso e as três estações ══ */
    ctx.save();
    ctx.translate(par(0.9), parY(0.6));

    ctx.strokeStyle = `rgba(${CLARO}, 0.16)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, piso);
    ctx.lineTo(w, piso);
    ctx.stroke();

    // As funções recebem a BANDA no lugar da altura: para elas, "h" é a
    // altura da composição, não a da moldura.
    if (!compacto) {
      desenharAcesso(ctx, s, w, B, t, ativo, piso);
      desenharLinha(ctx, s, w, B, t, ativo, piso);
    }
    desenharRacks(ctx, s, w, B, t, ativo, piso, compacto);
    ctx.restore();

    /* ══ camada 3: a espinha de dados, na frente ══ */
    ctx.save();
    ctx.translate(par(1.6), parY(1.1));
    desenharEspinha(ctx, s, w, B, t, ativo, topo + B * Y_ESPINHA);
    ctx.restore();
  },
};

/* ══════════ estação 1 · portaria ══════════ */
function desenharAcesso(ctx: Ctx, s: any, w: number, h: number, t: number, ativo: number, piso: number) {
  const x = w * 0.27;
  const altP = h * 0.15;

  // Relógio próprio: uma pessoa a cada ~5,5 s.
  s.tAcesso += 0.016 * ativo;
  const ciclo = 5.5;
  const fase = (s.tAcesso % ciclo) / ciclo;

  // Postes da catraca.
  ctx.fillStyle = `rgba(${CLARO}, 0.2)`;
  ctx.fillRect(x - w * 0.035, piso - altP, 2, altP);
  ctx.fillRect(x + w * 0.035, piso - altP, 2, altP);
  // Braço da catraca.
  ctx.fillStyle = `rgba(${CLARO}, 0.12)`;
  ctx.fillRect(x - w * 0.035, piso - altP * 0.55, w * 0.07, 1.5);

  // Terminal de leitura facial, no poste da direita.
  ctx.fillStyle = `rgba(${CLARO}, 0.26)`;
  ctx.fillRect(x + w * 0.035 - 3, piso - altP * 0.92, 8, altP * 0.2);

  // A pessoa atravessa da esquerda para a direita entre 0.15 e 0.75 do ciclo.
  const andando = fase > 0.15 && fase < 0.75;
  if (!andando) {
    s.travado += (0 - s.travado) * 0.08;
    return;
  }
  const avanco = (fase - 0.15) / 0.6;
  const pxPessoa = x - w * 0.08 + avanco * w * 0.16;
  const alturaPessoa = h * 0.11;

  // Silhueta: cabeça e corpo. Sem rosto — não é uma pessoa, é uma passagem.
  ctx.fillStyle = `rgba(${CLARO}, 0.34)`;
  ctx.beginPath();
  ctx.arc(pxPessoa, piso - alturaPessoa, alturaPessoa * 0.13, 0, 6.2832);
  ctx.fill();
  ctx.fillRect(pxPessoa - alturaPessoa * 0.1, piso - alturaPessoa * 0.82, alturaPessoa * 0.2, alturaPessoa * 0.82);

  // A caixa fecha no meio da passagem e solta na saída.
  const alvo = avanco > 0.3 && avanco < 0.8 ? 1 : 0;
  s.travado += (alvo - s.travado) * 0.12;
  if (s.travado < 0.02) return;

  const a = s.travado;
  const cx = pxPessoa, cy = piso - alturaPessoa * 0.62;
  const lx = alturaPessoa * 0.3, ly = alturaPessoa * 0.62;
  ctx.strokeStyle = `rgba(${CLARO}, ${a * 0.75})`;
  ctx.lineWidth = 1.2;
  ctx.strokeRect(cx - lx, cy - ly, lx * 2, ly * 2);
  // Cantos: o traço grosso só nas quinas, como visor de câmera.
  ctx.lineWidth = 2.4;
  const q = Math.min(lx, ly) * 0.42;
  for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]] as const) {
    ctx.beginPath();
    ctx.moveTo(cx + sx * lx, cy + sy * ly - sy * q);
    ctx.lineTo(cx + sx * lx, cy + sy * ly);
    ctx.lineTo(cx + sx * lx - sx * q, cy + sy * ly);
    ctx.stroke();
  }

  // Confirmação: dispara o pulso uma vez por passagem.
  if (avanco > 0.74 && !s.acessoEmitido) {
    s.acessoEmitido = true;
    s.pulsos.push({ p: 0, x0: cx, quente: false });
  }
  if (avanco < 0.3) s.acessoEmitido = false;
}

/* ══════════ estação 2 · linha de inspeção ══════════ */
function desenharLinha(ctx: Ctx, s: any, w: number, h: number, t: number, ativo: number, piso: number) {
  const x0 = w * 0.46, x1 = w * 0.7;
  const yEsteira = piso - h * 0.04;

  // Esteira.
  ctx.fillStyle = `rgba(${CLARO}, 0.1)`;
  ctx.fillRect(x0, yEsteira, x1 - x0, 3);

  // Câmera de inspeção, suspensa no meio do vão.
  const xc = (x0 + x1) / 2;
  const yc = yEsteira - h * 0.17;
  ctx.fillStyle = `rgba(${CLARO}, 0.22)`;
  ctx.fillRect(xc - w * 0.014, yc, w * 0.028, h * 0.032);
  ctx.fillRect(xc - 1, yc - h * 0.05, 2, h * 0.05);
  // Cone de visão, tracejado: é inspeção, não iluminação.
  ctx.strokeStyle = `rgba(${CLARO}, 0.14)`;
  ctx.setLineDash([4, 5]);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(xc, yc + h * 0.032);
  ctx.lineTo(xc - w * 0.05, yEsteira);
  ctx.moveTo(xc, yc + h * 0.032);
  ctx.lineTo(xc + w * 0.05, yEsteira);
  ctx.stroke();
  ctx.setLineDash([]);

  // Peças correndo. Espaçamento fixo, uma reprovada a cada volta completa.
  s.tLinha += 0.016 * ativo;
  const passo = w * 0.052;
  const desloc = (s.tLinha * w * 0.026) % passo;
  const lado = h * 0.026;
  const quantas = Math.ceil((x1 - x0) / passo) + 1;

  for (let i = 0; i < quantas; i++) {
    const x = x0 + i * passo - desloc;
    if (x < x0 - lado || x > x1) continue;

    // Índice estável da peça no mundo: é ele que decide quem é reprovada.
    const idx = Math.floor((s.tLinha * w * 0.026) / passo) + (quantas - i);
    const ruim = idx % 7 === 0;
    const sobCamera = Math.abs(x - xc) < passo * 0.5;

    ctx.fillStyle = `rgba(${CLARO}, 0.2)`;
    ctx.fillRect(x, yEsteira - lado, lado * 1.5, lado);

    if (ruim && sobCamera) {
      // A reprovação é o único vermelho do quadro — e dura um instante.
      ctx.strokeStyle = `rgba(${RED}, 0.85)`;
      ctx.lineWidth = 1.6;
      ctx.strokeRect(x - 3, yEsteira - lado - 3, lado * 1.5 + 6, lado + 6);
      const halo = ctx.createRadialGradient(x + lado * 0.75, yEsteira - lado / 2, 0, x + lado * 0.75, yEsteira - lado / 2, lado * 2.4);
      halo.addColorStop(0, `rgba(${RED}, 0.2)`);
      halo.addColorStop(1, `rgba(${RED}, 0)`);
      ctx.fillStyle = halo;
      ctx.fillRect(x - lado * 2, yEsteira - lado * 3, lado * 5, lado * 5);

      if (s.reprovada !== idx) {
        s.reprovada = idx;
        s.pulsos.push({ p: 0, x0: x, quente: true });
      }
    }
  }
}

/* ══════════ estação 3 · corredor de racks ══════════ */
function desenharRacks(ctx: Ctx, s: any, w: number, h: number, t: number, ativo: number, piso: number, compacto = false) {
  // No compacto o corredor vai para o centro: é a única estação que sobra.
  const xf = compacto ? w * 0.5 : w * 0.88;   // ponto de fuga do corredor
  const yf = piso - h * 0.1;
  const alt = h * 0.2;

  // Duas fileiras convergindo: o corredor frio, visto de frente.
  ctx.strokeStyle = `rgba(${CLARO}, 0.12)`;
  ctx.lineWidth = 1;
  for (const lado of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(xf + lado * w * 0.13, piso);
    ctx.lineTo(xf + lado * w * 0.012, yf);
    ctx.moveTo(xf + lado * w * 0.13, piso - alt);
    ctx.lineTo(xf + lado * w * 0.012, yf);
    ctx.stroke();
  }

  s.tRack += 0.016 * ativo;
  // Um LED entra em atenção a cada ~9 s e volta sozinho: operação viva, não
  // operação em pane.
  const emAtencao = s.tRack % 9 < 1.6;
  s.alerta += ((emAtencao ? 1 : 0) - s.alerta) * 0.06;
  if (emAtencao && !s.rackEmitido) {
    s.rackEmitido = true;
    s.pulsos.push({ p: 0, x0: xf, quente: false });
  }
  if (!emAtencao) s.rackEmitido = false;

  s.leds.forEach((l: any, i: number) => {
    // f=0 perto (grande), f=1 no fundo (pequeno).
    const k = 1 - l.f;
    const x = xf + l.lado * (w * 0.012 + k * w * 0.118);
    const y = piso - alt * 0.12 - l.alt * alt * (0.35 + k * 0.55);
    const r = 0.9 + k * 1.5;
    const pisca = 0.28 + 0.22 * Math.sin(t * 2.4 + l.fase);
    const esteAlerta = i === 3 && s.alerta > 0.02;
    ctx.fillStyle = esteAlerta
      ? `rgba(${AMBAR}, ${0.35 + s.alerta * 0.55})`
      : `rgba(${CLARO}, ${pisca * (0.5 + k * 0.5)})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 6.2832);
    ctx.fill();
  });
}

/* ══════════ a espinha de dados ══════════ */
function desenharEspinha(ctx: Ctx, s: any, w: number, h: number, t: number, ativo: number, y: number) {

  ctx.strokeStyle = `rgba(${CLARO}, 0.14)`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(w, y);
  ctx.stroke();

  // Cada pulso corre da estação até a borda esquerda — onde o texto do herói
  // está. O evento chega à plataforma; é essa a frase da cena.
  for (const pulso of s.pulsos) {
    pulso.p += 0.011 * ativo;
    const x = pulso.x0 * (1 - pulso.p);
    const cor = pulso.quente ? RED : CLARO;
    const forca = Math.min(1, pulso.p * 4) * (1 - pulso.p * 0.5);

    const rastro = ctx.createLinearGradient(x, 0, x + w * 0.1, 0);
    rastro.addColorStop(0, `rgba(${cor}, ${forca * 0.5})`);
    rastro.addColorStop(1, `rgba(${cor}, 0)`);
    ctx.strokeStyle = rastro;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + w * 0.1, y);
    ctx.stroke();

    ctx.fillStyle = `rgba(${cor}, ${forca * 0.85})`;
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 6.2832);
    ctx.fill();
  }
  // Pulsos que chegaram somem — a lista não pode crescer para sempre.
  s.pulsos = s.pulsos.filter((p: Pulso) => p.p < 1);
}

const CENAS: Record<string, Cena> = { operacao };

/* ── paralaxe: um só listener para todas as cenas ── */
let mouseX = 0, mouseY = 0, alvoX = 0, alvoY = 0;
let ouvindo = false;
function ouvirMouse() {
  if (ouvindo) return;
  ouvindo = true;
  // Ponteiro grosso (toque) não tem hover: paralaxe fica em zero e a cena
  // vive do movimento próprio.
  if (!window.matchMedia("(pointer: fine)").matches) return;
  window.addEventListener("pointermove", (e) => {
    alvoX = (e.clientX / window.innerWidth - 0.5) * 2;
    alvoY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });
}

function montar(host: HTMLElement) {
  const canvas = host.querySelector("canvas");
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const cena = CENAS[host.dataset.cena ?? ""] ?? operacao;

  let w = 0, h = 0;
  const medir = () => {
    const r = host.getBoundingClientRect();
    if (!r.width || !r.height) return false;
    // DPR travado em 2: acima disso o custo sobe e ninguém vê diferença.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return true;
  };
  if (!medir()) return;

  const estado = cena.criar(w, h);
  let t = 0, raf = 0, visivel = true, acumulado = 0;
  const intervalo = cena.fps ? 1 / cena.fps : 0;

  const quadro = (dt: number) => {
    t += dt;
    mouseX += (alvoX - mouseX) * 0.045;
    mouseY += (alvoY - mouseY) * 0.045;
    ctx.clearRect(0, 0, w, h);
    cena.desenhar(ctx, estado, w, h, t, 1, mouseX, mouseY);
  };

  // Um quadro sempre: se a página carrega em aba de segundo plano o rAF não
  // roda, e a cena ficaria em branco até o visitante voltar. Também é o quadro
  // único de quem pediu menos movimento.
  quadro(0);
  host.setAttribute("data-cena-pronta", "");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  ouvirMouse();

  let ultimo = performance.now();
  const laco = (agora: number) => {
    // Clamp: aba em segundo plano acumula delta e a cena saltaria ao voltar.
    const dt = Math.min((agora - ultimo) / 1000, 0.05);
    ultimo = agora;
    if (intervalo) {
      acumulado += dt;
      if (acumulado >= intervalo) { quadro(acumulado); acumulado = 0; }
    } else {
      quadro(dt);
    }
    raf = requestAnimationFrame(laco);
  };

  const tocar = () => {
    if (raf || !visivel || document.hidden) return;
    ultimo = performance.now();
    raf = requestAnimationFrame(laco);
  };
  const parar = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };

  new IntersectionObserver(([e]) => { visivel = e.isIntersecting; visivel ? tocar() : parar(); }).observe(host);
  document.addEventListener("visibilitychange", () => (document.hidden ? parar() : tocar()));
  new ResizeObserver(() => { if (medir()) cena.redimensionar?.(estado, w, h); }).observe(host);
  tocar();
}

export function montarCenas() {
  document.querySelectorAll<HTMLElement>("[data-cena]").forEach(montar);
}
