/**
 * Cenas em Canvas 2D do seletor de público — o ciclo de vida e as três cenas.
 *
 * Monta qualquer elemento com [data-cena]:
 *
 *   fundo     o painel inteiro. Grade em perspectiva correndo até um horizonte,
 *             campo de pontos com profundidade e paralaxe do mouse, dois focos
 *             de luz à deriva e, de vez em quando, um pulso subindo a grade.
 *   governo   cidade de cima à noite; uma caixa de detecção trava num veículo.
 *   empresas  perímetro em corte; varredura descendo e nós liberando.
 *
 * Canvas 2D e não three.js: são três por página, e esta é a página de entrada —
 * tem que abrir instantânea. O fundo roda a ~30 fps porque seu movimento é
 * lento e ninguém distingue; as portas rodam cheias.
 *
 * Sem JS, sem canvas ou com prefers-reduced-motion, o CSS de cada host entrega
 * a composição estática e a página continua inteira. Tudo aqui é decorativo.
 *
 * Manual de marca: "um a dois focos de luz por composição" e glow vermelho é
 * pontual. Por isso o vermelho só aparece no instante da detecção, do pulso ou
 * da varredura — aceso o tempo todo viraria decoração e perderia a força.
 */
type Ctx = CanvasRenderingContext2D;

const RED = "255, 74, 84";
const CLARO = "190, 214, 246";

interface Cena {
  criar(w: number, h: number): any;
  desenhar(ctx: Ctx, s: any, w: number, h: number, t: number, ativo: number, px: number, py: number): void;
  redimensionar?(s: any, w: number, h: number): void;
  /** Quadros por segundo. Ausente = sem limite (o rAF manda). */
  fps?: number;
}

/* ══ fundo: profundidade do painel ══ */
const fundo: Cena = {
  fps: 30,
  criar(w, h) {
    // z alto = longe. Guardado por ponto para paralaxe e tamanho.
    const pontos = Array.from({ length: 78 }, () => ({
      x: Math.random(), y: Math.random() * 0.62,
      z: 0.25 + Math.random() * 0.75,
      f: 0.3 + Math.random() * 1.4, p: Math.random() * 6.28,
    }));
    // Dois focos, como manda o manual — e o vermelho e o MENOR e o mais fraco.
    // Medido: com r .42 / i .10 ele cobria 54% do painel, que e o vermelho
    // virando decoracao em vez de acao. Aqui ele e so uma insinuacao de calor
    // num canto; quem carrega a luz e o foco frio.
    const focos = [
      { fx: 0.3, fy: 0.12, ax: 0.1, ay: 0.06, vel: 0.055, cor: RED, r: 0.2, i: 0.055 },
      { fx: 0.05, fy: 0.24, ax: 0.22, ay: 0.13, vel: 0.037, cor: CLARO, r: 0.52, i: 0.042 },
    ];
    return { pontos, focos, desloc: 0, pulso: -1, proxPulso: 3, w, h };
  },
  redimensionar(s, w, h) { s.w = w; s.h = h; },
  desenhar(ctx, s, w, h, t, ativo, px, py) {
    const horizonte = h * 0.52;
    const prof = h * 0.48;
    const cx = w / 2;

    // ── focos de luz à deriva (lissajous lento) ──
    for (const f of s.focos) {
      const x = (f.fx + Math.sin(t * f.vel) * f.ax + 0.5) * w + px * 26 * f.r;
      const y = (f.fy + Math.cos(t * f.vel * 0.83) * f.ay) * h + py * 18 * f.r;
      const raio = Math.max(w, h) * f.r;
      const g = ctx.createRadialGradient(x, y, 0, x, y, raio);
      g.addColorStop(0, `rgba(${f.cor}, ${f.i})`);
      g.addColorStop(0.55, `rgba(${f.cor}, ${f.i * 0.22})`);
      g.addColorStop(1, `rgba(${f.cor}, 0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }

    // ── campo de pontos: quanto mais longe, menor, mais fraco, menos paralaxe ──
    for (const pt of s.pontos) {
      const e = 1 - pt.z;                       // 0 = longe, 1 = perto
      const x = pt.x * w + px * 34 * e;
      const y = pt.y * h + py * 22 * e;
      const brilho = (0.06 + 0.3 * e) * (0.65 + 0.35 * Math.sin(t * pt.f + pt.p));
      ctx.fillStyle = `rgba(${CLARO}, ${brilho})`;
      ctx.beginPath();
      ctx.arc(x, y, 0.5 + e * 1.5, 0, 6.2832);
      ctx.fill();
    }

    // ── grade em perspectiva correndo até o horizonte ──
    s.desloc = (s.desloc + 0.00085 * ativo) % 1;
    const py2 = py * 10;

    ctx.lineWidth = 1;
    // transversais: p² comprime perto do horizonte, como perspectiva de verdade
    for (let i = 0; i < 15; i++) {
      const p = ((i / 15) + s.desloc) % 1;
      const y = horizonte + prof * p * p + py2;
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * p + 0.006})`;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    // longitudinais convergindo ao ponto de fuga
    const fuga = cx + px * 30;
    for (let i = -8; i <= 8; i++) {
      if (i === 0) continue;
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.035 - Math.abs(i) * 0.0025})`;
      ctx.beginPath();
      ctx.moveTo(fuga, horizonte + py2);
      ctx.lineTo(cx + i * (w * 0.19), h + py2);
      ctx.stroke();
    }

    // ── pulso: sobe uma longitudinal até o horizonte, raro e curto ──
    s.proxPulso -= 0.033 * ativo;
    if (s.proxPulso <= 0 && s.pulso < 0) {
      s.pulso = 0;
      s.pulsoLinha = (Math.floor(Math.random() * 16) - 8) || 3;
      s.proxPulso = 5 + Math.random() * 5;
    }
    if (s.pulso >= 0) {
      s.pulso += 0.014 * ativo;
      if (s.pulso > 1) { s.pulso = -1; }
      else {
        const p = 1 - s.pulso;                 // 1 perto -> 0 no horizonte
        const y = horizonte + prof * p * p + py2;
        const x = fuga + (cx + s.pulsoLinha * (w * 0.19) - fuga) * p;
        const a = Math.sin(s.pulso * Math.PI) * 0.85;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 26 * p + 6);
        g.addColorStop(0, `rgba(${RED}, ${a * 0.5})`);
        g.addColorStop(1, `rgba(${RED}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, 26 * p + 6, 0, 6.2832); ctx.fill();
        ctx.fillStyle = `rgba(255, 226, 228, ${a})`;
        ctx.beginPath(); ctx.arc(x, y, 1.1 + p * 1.4, 0, 6.2832); ctx.fill();
      }
    }
  },
};

/* ══ governo: cidade de cima, veículos como luz, LPR travando ══ */
const governo: Cena = {
  criar(w, h) {
    const vias = [0.3, 0.46, 0.62, 0.78].map((y, i) => ({ y, dir: i % 2 ? -1 : 1 }));
    const carros = Array.from({ length: 22 }, () => ({
      via: Math.floor(Math.random() * vias.length),
      x: Math.random(),
      v: 0.012 + Math.random() * 0.026,
      b: 0.35 + Math.random() * 0.65,
    }));
    const luzes = Array.from({ length: 46 }, () => ({
      x: Math.random(), y: Math.random() * 0.86,
      r: 0.4 + Math.random() * 1.5, f: 0.4 + Math.random() * 1.8, p: Math.random() * 6.28,
    }));
    return { vias, carros, luzes, alvo: -1, trava: 0, proxima: 2.5, w, h };
  },
  redimensionar(s, w, h) { s.w = w; s.h = h; },
  desenhar(ctx, s, w, h, t, ativo) {
    const persp = (y: number) => 0.18 + y * 0.82;

    for (const l of s.luzes) {
      const brilho = 0.16 + 0.12 * Math.sin(t * l.f + l.p);
      ctx.fillStyle = `rgba(${CLARO}, ${brilho})`;
      ctx.beginPath();
      ctx.arc(l.x * w, l.y * h, l.r * persp(l.y), 0, 6.2832);
      ctx.fill();
    }

    for (const via of s.vias) {
      const y = via.y * h, e = persp(via.y);
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + e * 0.05})`;
      ctx.lineWidth = e * 1.4;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    s.proxima -= 0.016 * ativo;
    if (s.proxima <= 0 && s.trava <= 0) {
      s.alvo = Math.floor(Math.random() * s.carros.length);
      s.trava = 1; s.proxima = 3.4 + Math.random() * 2.6;
    }
    if (s.trava > 0) s.trava -= 0.006 * ativo;

    s.carros.forEach((c: any, i: number) => {
      const via = s.vias[c.via];
      c.x += c.v * via.dir * ativo * 0.016 * 60;
      if (c.x > 1.1) c.x = -0.1;
      if (c.x < -0.1) c.x = 1.1;
      const x = c.x * w, y = via.y * h, e = persp(via.y);
      const eAlvo = i === s.alvo && s.trava > 0;

      const g = ctx.createLinearGradient(x - via.dir * 34 * e, y, x, y);
      g.addColorStop(0, `rgba(${CLARO}, 0)`);
      g.addColorStop(1, `rgba(${CLARO}, ${0.3 * c.b})`);
      ctx.strokeStyle = g; ctx.lineWidth = 1.6 * e; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(x - via.dir * 34 * e, y); ctx.lineTo(x, y); ctx.stroke();

      ctx.fillStyle = eAlvo ? `rgba(${RED}, 0.95)` : `rgba(214, 231, 250, ${0.5 + c.b * 0.4})`;
      ctx.beginPath(); ctx.arc(x, y, 1.5 * e + (eAlvo ? 1 : 0), 0, 6.2832); ctx.fill();

      if (eAlvo) {
        const a = Math.min(1, s.trava * 2.2) * Math.min(1, (1 - s.trava) * 5);
        const r = 13 * e + 3;
        ctx.strokeStyle = `rgba(${RED}, ${a * 0.9})`;
        ctx.lineWidth = 1.2;
        ctx.strokeRect(x - r, y - r * 0.72, r * 2, r * 1.44);
        const q = r * 0.42;
        ctx.beginPath();
        ctx.moveTo(x - r, y - r * 0.72 + q); ctx.lineTo(x - r, y - r * 0.72); ctx.lineTo(x - r + q, y - r * 0.72);
        ctx.moveTo(x + r - q, y + r * 0.72); ctx.lineTo(x + r, y + r * 0.72); ctx.lineTo(x + r, y + r * 0.72 - q);
        ctx.strokeStyle = `rgba(${RED}, ${a})`; ctx.lineWidth = 2; ctx.stroke();
      }
    });
  },
};

/* ══ empresas: perímetro em corte, varredura descendo, nós liberando ══ */
const empresas: Cena = {
  criar(w, h) {
    const colunas = Array.from({ length: 9 }, (_, i) => ({
      x: 0.06 + i * 0.11, alt: 0.3 + Math.random() * 0.55, o: 0.05 + Math.random() * 0.06,
    }));
    const nos = Array.from({ length: 13 }, () => ({
      x: 0.08 + Math.random() * 0.86, y: 0.16 + Math.random() * 0.7, acesa: 0,
    }));
    return { colunas, nos, varredura: -0.15, w, h };
  },
  redimensionar(s, w, h) { s.w = w; s.h = h; },
  desenhar(ctx, s, w, h, t, ativo) {
    for (const c of s.colunas) {
      ctx.fillStyle = `rgba(255, 255, 255, ${c.o})`;
      ctx.fillRect(c.x * w, h * (1 - c.alt), Math.max(1, w * 0.008), h * c.alt);
    }
    ctx.strokeStyle = "rgba(255, 255, 255, 0.07)";
    ctx.lineWidth = 1;
    for (const y of [0.28, 0.52, 0.76]) {
      ctx.beginPath(); ctx.moveTo(0, y * h); ctx.lineTo(w, y * h); ctx.stroke();
    }

    s.varredura += 0.0022 * ativo * 60 * 0.016;
    if (s.varredura > 1.15) s.varredura = -0.15;
    const vy = s.varredura * h;
    const faixa = ctx.createLinearGradient(0, vy - 46, 0, vy + 8);
    faixa.addColorStop(0, `rgba(${RED}, 0)`);
    faixa.addColorStop(1, `rgba(${RED}, 0.16)`);
    ctx.fillStyle = faixa;
    ctx.fillRect(0, vy - 46, w, 54);
    ctx.strokeStyle = `rgba(${RED}, 0.5)`;
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(0, vy); ctx.lineTo(w, vy); ctx.stroke();

    for (const n of s.nos) {
      const y = n.y * h, x = n.x * w;
      if (Math.abs(vy - y) < 5) n.acesa = 1;
      if (n.acesa > 0) n.acesa -= 0.008 * ativo;

      const base = 0.2 + 0.1 * Math.sin(t * 1.6 + n.x * 9);
      if (n.acesa > 0) {
        const a = Math.max(0, n.acesa);
        const halo = ctx.createRadialGradient(x, y, 0, x, y, 16);
        halo.addColorStop(0, `rgba(${RED}, ${a * 0.32})`);
        halo.addColorStop(1, `rgba(${RED}, 0)`);
        ctx.fillStyle = halo;
        ctx.beginPath(); ctx.arc(x, y, 16, 0, 6.2832); ctx.fill();
        ctx.strokeStyle = `rgba(${RED}, ${a * 0.75})`;
        ctx.lineWidth = 1.2;
        ctx.strokeRect(x - 7, y - 7, 14, 14);
      }
      ctx.fillStyle = n.acesa > 0
        ? `rgba(${RED}, ${0.55 + n.acesa * 0.4})`
        : `rgba(${CLARO}, ${base})`;
      ctx.beginPath(); ctx.arc(x, y, 2.1, 0, 6.2832); ctx.fill();
    }
  },
};

const CENAS: Record<string, Cena> = { fundo, governo, empresas };

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
  const cena = CENAS[host.dataset.cena ?? ""] ?? governo;
  const cartao = host.closest(".canal") as HTMLElement | null;

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
  let t = 0, raf = 0, visivel = true, ativo = 1, acumulado = 0;
  const intervalo = cena.fps ? 1 / cena.fps : 0;

  const quadro = (dt: number) => {
    // Só as portas aceleram no hover; o fundo mantém o ritmo.
    const alvo = cartao?.matches(":hover, :focus-visible") ? 2.1 : 1;
    ativo += (alvo - ativo) * 0.06;
    t += dt * ativo;
    mouseX += (alvoX - mouseX) * 0.045;
    mouseY += (alvoY - mouseY) * 0.045;
    ctx.clearRect(0, 0, w, h);
    cena.desenhar(ctx, estado, w, h, t, ativo, mouseX, mouseY);
  };

  // Um quadro sempre: se a página carrega em aba de segundo plano o rAF não
  // roda, e a cena ficaria em branco até o visitante voltar.
  quadro(0);
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
  // Marca o painel: o CSS esconde a grade estática, que é o fallback sem JS e
  // ficaria brigando com a grade em perspectiva do canvas.
  document.querySelector("[data-entrada]")?.setAttribute("data-cena-ativa", "");
}
