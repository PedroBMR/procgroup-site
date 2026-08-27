/**
 * Cinco cenas de fundo para o comparador de landing pages (/labs/landings).
 *
 * TEMPORÁRIO: existe para o Pedro escolher uma direção visual. Quando a
 * escolha estiver feita, a vencedora vai para src/scripts/ e este arquivo sai
 * junto com a página do comparador.
 *
 * As cinco são deliberadamente diferentes em composição, movimento e
 * temperatura — não são cinco versões da mesma ideia. O que elas têm em comum
 * é o sistema: navy da marca, vermelho PONTUAL (só no evento, nunca aceso o
 * tempo todo) e um a dois focos de luz por composição.
 *
 * Todas são decorativas (aria-hidden) e param com prefers-reduced-motion,
 * desenhando um quadro único.
 */
type Ctx = CanvasRenderingContext2D;

const RED = "255, 74, 84";
const CLARO = "190, 214, 246";

interface Cena {
  criar(w: number, h: number): any;
  desenhar(ctx: Ctx, s: any, w: number, h: number, t: number, px: number, py: number): void;
  fps?: number;
}

/* ═══════════ 1 · SALA DE CONTROLE ═══════════
   O painel de monitores visto de frente. Uma varredura passa pelos quadros e,
   de vez em quando, um deles trava uma detecção. É a cena mais literal: o
   cliente se reconhece na hora. */
const controle: Cena = {
  criar(w, h) {
    const cols = 6, linhas = 3;
    return {
      cols, linhas,
      tiles: Array.from({ length: cols * linhas }, (_, i) => ({
        brilho: 0.05 + Math.random() * 0.05,
        fase: Math.random() * 6.28,
        ruido: Math.random(),
        i,
      })),
      alvo: 4,
      tAlvo: 0,
    };
  },
  desenhar(ctx, s, w, h, t, px, py) {
    const marg = w * 0.06;
    const gap = w * 0.008;
    const cw = (w - marg * 2 - gap * (s.cols - 1)) / s.cols;
    const ch = cw * 0.62;
    const topo = h * 0.5 - (ch * s.linhas + gap * (s.linhas - 1)) / 2;

    // A cada 4,5 s um quadro novo assume a detecção.
    s.tAlvo += 0.016;
    if (s.tAlvo > 4.5) { s.tAlvo = 0; s.alvo = Math.floor(Math.random() * s.tiles.length); }

    const desl = px * w * 0.008;
    const varredura = ((t * 0.16) % 1.3) - 0.15;

    for (const tile of s.tiles) {
      const cx = tile.i % s.cols, cy = Math.floor(tile.i / s.cols);
      const x = marg + cx * (cw + gap) + desl;
      const y = topo + cy * (ch + gap) + py * h * 0.004;

      // Vidro do monitor: mais claro perto da varredura.
      const dist = Math.abs((x + cw / 2) / w - varredura);
      const perto = Math.max(0, 1 - dist * 5);
      ctx.fillStyle = `rgba(${CLARO}, ${tile.brilho + perto * 0.05 + Math.sin(t * 1.2 + tile.fase) * 0.012})`;
      ctx.fillRect(x, y, cw, ch);
      ctx.strokeStyle = `rgba(${CLARO}, 0.1)`;
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, cw, ch);

      // Conteúdo abstrato: duas ou três faixas, como uma cena parada.
      ctx.fillStyle = `rgba(${CLARO}, 0.07)`;
      ctx.fillRect(x + cw * 0.1, y + ch * (0.55 + tile.ruido * 0.1), cw * 0.8, ch * 0.06);
      ctx.fillRect(x + cw * 0.1, y + ch * 0.72, cw * (0.3 + tile.ruido * 0.4), ch * 0.05);

      if (tile.i === s.alvo && s.tAlvo > 0.6) {
        const a = Math.min(1, (s.tAlvo - 0.6) * 3) * (s.tAlvo > 3.6 ? Math.max(0, (4.5 - s.tAlvo) / 0.9) : 1);
        const bx = x + cw * 0.34, by = y + ch * 0.3, bw = cw * 0.3, bh = ch * 0.45;
        ctx.strokeStyle = `rgba(${RED}, ${a * 0.9})`;
        ctx.lineWidth = 1.4;
        ctx.strokeRect(bx, by, bw, bh);
        const q = Math.min(bw, bh) * 0.3;
        ctx.lineWidth = 2.6;
        for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]] as const) {
          const px2 = sx < 0 ? bx : bx + bw, py2 = sy < 0 ? by : by + bh;
          ctx.beginPath();
          ctx.moveTo(px2, py2 + sy * -q); ctx.lineTo(px2, py2); ctx.lineTo(px2 + sx * -q, py2);
          ctx.stroke();
        }
      }
    }
  },
};

/* ═══════════ 2 · CORTE DE LUZ ═══════════
   Quase preto. Um único facho horizontal atravessa o quadro e respira; poeira
   passa na luz. É a cena de menos elementos e mais drama — o tipo de abertura
   que deixa a tipografia ser a estrela. */
const corte: Cena = {
  criar(w, h) {
    return {
      poeira: Array.from({ length: 90 }, () => ({
        x: Math.random(), y: Math.random(), v: 0.1 + Math.random() * 0.5,
        r: 0.4 + Math.random() * 1.1, o: 0.1 + Math.random() * 0.4,
      })),
    };
  },
  desenhar(ctx, s, w, h, t, px, py) {
    const y = h * (0.52 + py * 0.02);
    const respira = 0.85 + Math.sin(t * 0.5) * 0.15;

    // O facho: um gradiente longo e baixo, com o miolo quente.
    const alt = h * 0.16 * respira;
    const g = ctx.createLinearGradient(0, y - alt, 0, y + alt);
    g.addColorStop(0, "rgba(120, 160, 230, 0)");
    g.addColorStop(0.5, `rgba(150, 190, 255, ${0.16 * respira})`);
    g.addColorStop(1, "rgba(120, 160, 230, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, y - alt, w, alt * 2);

    // Núcleo, fino e brilhante.
    const nuc = ctx.createLinearGradient(0, 0, w, 0);
    nuc.addColorStop(0, "rgba(200, 220, 255, 0)");
    nuc.addColorStop(0.42 + px * 0.04, `rgba(220, 235, 255, ${0.5 * respira})`);
    nuc.addColorStop(1, "rgba(200, 220, 255, 0)");
    ctx.fillStyle = nuc;
    ctx.fillRect(0, y - 1, w, 2);

    // Um ponto vermelho atravessa o facho de tempos em tempos: o evento.
    const ciclo = (t * 0.09) % 1;
    if (ciclo < 0.5) {
      const ex = ciclo * 2 * w;
      const halo = ctx.createRadialGradient(ex, y, 0, ex, y, h * 0.09);
      halo.addColorStop(0, `rgba(${RED}, 0.5)`);
      halo.addColorStop(1, `rgba(${RED}, 0)`);
      ctx.fillStyle = halo;
      ctx.beginPath(); ctx.arc(ex, y, h * 0.09, 0, 6.2832); ctx.fill();
    }

    // Poeira: só existe onde há luz.
    for (const p of s.poeira) {
      const yy = ((p.y + t * 0.008 * p.v) % 1) * h;
      const dist = Math.abs(yy - y) / (alt * 1.4);
      if (dist > 1) continue;
      const xx = ((p.x + t * 0.004 * p.v + px * 0.01) % 1) * w;
      ctx.fillStyle = `rgba(220, 235, 255, ${p.o * (1 - dist) * respira})`;
      ctx.beginPath(); ctx.arc(xx, yy, p.r, 0, 6.2832); ctx.fill();
    }
  },
};

/* ═══════════ 3 · VARREDURA ═══════════
   Uma planta em wireframe isométrico que só existe onde a linha de varredura
   já passou. A imagem se constrói na frente do visitante — é a cena que
   melhor conta "visão computacional" sem desenhar um olho. */
const varredura: Cena = {
  criar(w, h) {
    return {
      blocos: Array.from({ length: 16 }, () => ({
        x: Math.random(), z: Math.random(), l: 0.04 + Math.random() * 0.09,
        p: 0.03 + Math.random() * 0.06, alt: 0.04 + Math.random() * 0.14,
      })),
    };
  },
  desenhar(ctx, s, w, h, t, px, py) {
    const cx = w * (0.5 + px * 0.02), cy = h * (0.62 + py * 0.02);
    const esc = Math.min(w, h * 1.7);
    // Projeção isométrica simples.
    const proj = (x: number, z: number, y = 0) => [
      cx + (x - z) * esc * 0.42,
      cy + (x + z) * esc * 0.21 - y * esc * 0.42,
    ];

    // Adianta o relógio: sem isso a linha começa fora do quadro e quem chega
    // na página vê uma tela vazia até ela entrar. Abre com a cena meio
    // construída, que é justamente o instante que conta a ideia.
    const linha = (((t + 5.6) * 0.11) % 1.35) - 0.2;

    // Grade do piso.
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const f = i / 10 - 0.5;
      const revelado = Math.max(0, Math.min(1, (linha - (f + 0.5)) * 4));
      if (revelado <= 0) continue;
      ctx.strokeStyle = `rgba(${CLARO}, ${0.07 * revelado})`;
      let [x1, y1] = proj(f, -0.5), [x2, y2] = proj(f, 0.5);
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      [x1, y1] = proj(-0.5, f); [x2, y2] = proj(0.5, f);
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    }

    // Volumes: nascem quando a linha passa por eles.
    for (const b of s.blocos) {
      const fx = b.x - 0.5, fz = b.z - 0.5;
      const revelado = Math.max(0, Math.min(1, (linha - (fx + 0.5)) * 3.5));
      if (revelado <= 0) continue;
      const alt = b.alt * revelado;
      const cantos = [
        proj(fx, fz), proj(fx + b.l, fz), proj(fx + b.l, fz + b.p), proj(fx, fz + b.p),
      ];
      const topos = cantos.map(([x, y]) => [x, y - alt * esc * 0.42]);
      ctx.strokeStyle = `rgba(${CLARO}, ${0.3 * revelado})`;
      ctx.fillStyle = `rgba(37, 56, 102, ${0.35 * revelado})`;
      ctx.beginPath();
      ctx.moveTo(topos[0][0], topos[0][1]);
      for (const p of topos.slice(1)) ctx.lineTo(p[0], p[1]);
      ctx.closePath(); ctx.fill(); ctx.stroke();
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(cantos[i][0], cantos[i][1]);
        ctx.lineTo(topos[i][0], topos[i][1]);
        ctx.stroke();
      }
    }

    // A linha em si: vermelha, fina, e é o único vermelho da cena.
    if (linha > 0 && linha < 1) {
      const f = linha - 0.5;
      const [x1, y1] = proj(f, -0.6), [x2, y2] = proj(f, 0.6);
      const g = ctx.createLinearGradient(x1, y1, x2, y2);
      g.addColorStop(0, `rgba(${RED}, 0)`);
      g.addColorStop(0.5, `rgba(${RED}, 0.8)`);
      g.addColorStop(1, `rgba(${RED}, 0)`);
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    }
  },
};

/* ═══════════ 4 · MESA DE OPERAÇÃO ═══════════
   Planta baixa vista de cima, com os cones de visão das câmeras varrendo o
   pátio. É a cena mais "tática" — parece a mesa de quem coordena, não a tela
   de quem assiste. */
const mesa: Cena = {
  criar(w, h) {
    return {
      predios: [
        { x: 0.12, y: 0.18, w: 0.2, h: 0.26 },
        { x: 0.4, y: 0.12, w: 0.26, h: 0.18 },
        { x: 0.72, y: 0.22, w: 0.16, h: 0.34 },
        { x: 0.16, y: 0.58, w: 0.3, h: 0.2 },
        { x: 0.56, y: 0.62, w: 0.22, h: 0.22 },
      ],
      cams: [
        { x: 0.34, y: 0.46, a: 0.3, v: 0.22, alc: 0.26 },
        { x: 0.68, y: 0.2, a: 2.4, v: -0.17, alc: 0.22 },
        { x: 0.5, y: 0.86, a: 4.2, v: 0.13, alc: 0.3 },
      ],
      ping: { x: 0.62, y: 0.5, t: 0 },
    };
  },
  desenhar(ctx, s, w, h, t, px, py) {
    const dx = px * w * 0.006, dy = py * h * 0.006;

    // Vias: duas faixas cruzando, bem discretas.
    ctx.strokeStyle = `rgba(${CLARO}, 0.06)`;
    ctx.lineWidth = Math.max(8, w * 0.012);
    ctx.beginPath(); ctx.moveTo(0, h * 0.5 + dy); ctx.lineTo(w, h * 0.5 + dy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w * 0.52 + dx, 0); ctx.lineTo(w * 0.52 + dx, h); ctx.stroke();

    for (const p of s.predios) {
      ctx.fillStyle = `rgba(${CLARO}, 0.05)`;
      ctx.strokeStyle = `rgba(${CLARO}, 0.16)`;
      ctx.lineWidth = 1;
      ctx.fillRect(p.x * w + dx, p.y * h + dy, p.w * w, p.h * h);
      ctx.strokeRect(p.x * w + dx, p.y * h + dy, p.w * w, p.h * h);
    }

    // Cones de visão varrendo.
    for (const c of s.cams) {
      const ang = c.a + Math.sin(t * c.v) * 0.5;
      const x = c.x * w + dx, y = c.y * h + dy, r = c.alc * Math.min(w, h) * 1.6;
      const meio = 0.32;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${CLARO}, 0.16)`);
      g.addColorStop(1, `rgba(${CLARO}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x, y, r, ang - meio, ang + meio);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = `rgba(${CLARO}, 0.5)`;
      ctx.beginPath(); ctx.arc(x, y, 2.4, 0, 6.2832); ctx.fill();
    }

    // Um ping vermelho: um evento no pátio, a cada 6 s.
    s.ping.t += 0.016;
    if (s.ping.t > 6) { s.ping.t = 0; s.ping.x = 0.2 + Math.random() * 0.6; s.ping.y = 0.2 + Math.random() * 0.6; }
    if (s.ping.t < 2) {
      const p = s.ping.t / 2;
      const x = s.ping.x * w + dx, y = s.ping.y * h + dy;
      const r = p * Math.min(w, h) * 0.09;
      ctx.strokeStyle = `rgba(${RED}, ${(1 - p) * 0.8})`;
      ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.stroke();
      ctx.fillStyle = `rgba(${RED}, ${(1 - p) * 0.9})`;
      ctx.beginPath(); ctx.arc(x, y, 3, 0, 6.2832); ctx.fill();
    }
  },
};

/* ═══════════ 5 · LENTE ═══════════
   Macro do próprio instrumento: a íris, o anel de foco, as marcas. Não mostra
   o que a câmera vê — mostra a câmera. É a mais abstrata e a mais "produto". */
const lente: Cena = {
  criar() { return { foco: 0, tFoco: 0 }; },
  desenhar(ctx, s, w, h, t, px, py) {
    const cx = w * (0.5 + px * 0.015), cy = h * (0.5 + py * 0.015);
    const R = Math.min(w, h) * 0.34;

    // Respiro de foco: a íris abre e fecha devagar, como uma lente buscando.
    s.tFoco += 0.016;
    const busca = s.tFoco % 7 < 1.2;
    s.foco += ((busca ? 1 : 0) - s.foco) * 0.05;
    const abertura = R * (0.42 + Math.sin(t * 0.35) * 0.05 + s.foco * 0.06);

    // Corpo: anéis concêntricos.
    for (let i = 0; i < 5; i++) {
      const r = R * (0.62 + i * 0.11);
      ctx.strokeStyle = `rgba(${CLARO}, ${0.16 - i * 0.025})`;
      ctx.lineWidth = i === 0 ? 1.6 : 1;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.2832); ctx.stroke();
    }

    // Marcas do anel de foco, girando lentamente.
    const giro = t * 0.06;
    ctx.strokeStyle = `rgba(${CLARO}, 0.3)`;
    ctx.lineWidth = 1;
    for (let i = 0; i < 60; i++) {
      const a = giro + (i / 60) * 6.2832;
      const longa = i % 5 === 0;
      const r1 = R * 1.02, r2 = R * (longa ? 1.1 : 1.06);
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
      ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
      ctx.stroke();
    }

    // Lâminas da íris.
    const laminas = 9;
    ctx.fillStyle = "rgba(10, 16, 32, 0.85)";
    ctx.strokeStyle = `rgba(${CLARO}, 0.22)`;
    ctx.lineWidth = 1;
    for (let i = 0; i < laminas; i++) {
      const a = (i / laminas) * 6.2832 + giro * 0.4;
      const a2 = a + 6.2832 / laminas;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * abertura, cy + Math.sin(a) * abertura);
      ctx.lineTo(cx + Math.cos(a2) * abertura, cy + Math.sin(a2) * abertura);
      ctx.lineTo(cx + Math.cos(a2) * R * 0.62, cy + Math.sin(a2) * R * 0.62);
      ctx.lineTo(cx + Math.cos(a) * R * 0.62, cy + Math.sin(a) * R * 0.62);
      ctx.closePath();
      ctx.fill(); ctx.stroke();
    }

    // O miolo: escuro, com um brilho frio e — no instante do foco — o ponto vermelho.
    const g = ctx.createRadialGradient(cx - abertura * 0.3, cy - abertura * 0.3, 0, cx, cy, abertura);
    g.addColorStop(0, "rgba(60, 90, 160, 0.5)");
    g.addColorStop(1, "rgba(6, 10, 20, 0.9)");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(cx, cy, abertura, 0, 6.2832); ctx.fill();

    if (s.foco > 0.02) {
      ctx.fillStyle = `rgba(${RED}, ${s.foco * 0.9})`;
      ctx.beginPath(); ctx.arc(cx, cy, 3.4, 0, 6.2832); ctx.fill();
      ctx.strokeStyle = `rgba(${RED}, ${s.foco * 0.5})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(cx, cy, abertura * 0.55, 0, 6.2832); ctx.stroke();
    }
  },
};

const CENAS: Record<string, Cena> = { controle, corte, varredura, mesa, lente };

let mx = 0, my = 0, ax = 0, ay = 0, ouvindo = false;
function ouvirMouse() {
  if (ouvindo || !window.matchMedia("(pointer: fine)").matches) return;
  ouvindo = true;
  window.addEventListener("pointermove", (e) => {
    ax = (e.clientX / window.innerWidth - 0.5) * 2;
    ay = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });
}

function montar(host: HTMLElement) {
  const canvas = host.querySelector("canvas");
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const cena = CENAS[host.dataset.lab ?? ""];
  if (!cena) return;

  let w = 0, h = 0;
  const medir = () => {
    const r = host.getBoundingClientRect();
    if (!r.width || !r.height) return false;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return true;
  };
  if (!medir()) return;

  const estado = cena.criar(w, h);
  let t = 0, raf = 0, visivel = true;

  const quadro = (dt: number) => {
    t += dt;
    mx += (ax - mx) * 0.05;
    my += (ay - my) * 0.05;
    ctx.clearRect(0, 0, w, h);
    cena.desenhar(ctx, estado, w, h, t, mx, my);
  };

  quadro(0);
  host.setAttribute("data-pronta", "");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  ouvirMouse();

  let ultimo = performance.now();
  const laco = (agora: number) => {
    const dt = Math.min((agora - ultimo) / 1000, 0.05);
    ultimo = agora;
    quadro(dt);
    raf = requestAnimationFrame(laco);
  };
  const tocar = () => { if (!raf && visivel && !document.hidden) { ultimo = performance.now(); raf = requestAnimationFrame(laco); } };
  const parar = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };

  // Só a landing visível anima: cinco canvas rodando juntos derrubariam a página.
  new IntersectionObserver(([e]) => { visivel = e.isIntersecting; visivel ? tocar() : parar(); }, { threshold: 0.2 }).observe(host);
  document.addEventListener("visibilitychange", () => (document.hidden ? parar() : tocar()));
  new ResizeObserver(() => medir()).observe(host);
  tocar();
}

export function montarLab() {
  document.querySelectorAll<HTMLElement>("[data-lab]").forEach(montar);
}
