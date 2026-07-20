// Constelação neural do hero da Home — campo de partículas com profundidade,
// ligadas por linhas finas que reagem ao mouse, nas cores da marca.
//
// Mora num módulo separado, e não no <script> do HeroBackground.astro, por
// causa do tamanho do three.js. Aqui os símbolos são importados **nomeados**,
// o que deixa o bundler podar o resto da biblioteca; o HeroBackground carrega
// este módulo com import() dinâmico, então quem tem prefers-reduced-motion ou
// não tem WebGL não baixa nada disso. Um import() direto de "three" lá também
// adiaria o download, mas traria a biblioteca inteira: a fronteira dinâmica
// impede a poda, e o pacote saltava de 129 KB para 178 KB gzip.
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  DynamicDrawUsage,
  Group,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer,
} from "three";

function makeDotTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.35, "rgba(255,255,255,0.65)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}

export function initNeural(canvas: HTMLCanvasElement) {
  const wrap = canvas.parentElement as HTMLElement;
  let W = wrap.clientWidth || window.innerWidth;
  let H = wrap.clientHeight || window.innerHeight;

  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(W, H, false);

  const scene = new Scene();
  const camera = new PerspectiveCamera(60, W / H, 1, 2000);
  camera.position.z = 260;

  const group = new Group();
  scene.add(group);

  const isSmall = W < 700;
  const COUNT = isSmall ? 68 : 150;
  const BOX = { x: 320, y: 200, z: 150 };
  const LINK = 46;
  const LINK2 = LINK * LINK;

  const COOL = new Color("#9db4d8");
  const RED = new Color("#e2081d");

  const pos = new Float32Array(COUNT * 3);
  const vel = new Float32Array(COUNT * 3);
  const col = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const i3 = i * 3;
    pos[i3] = (Math.random() - 0.5) * BOX.x;
    pos[i3 + 1] = (Math.random() - 0.5) * BOX.y;
    pos[i3 + 2] = (Math.random() - 0.5) * BOX.z;
    vel[i3] = (Math.random() - 0.5) * 0.14;
    vel[i3 + 1] = (Math.random() - 0.5) * 0.14;
    vel[i3 + 2] = (Math.random() - 0.5) * 0.14;
    const c = Math.random() < 0.18 ? RED : COOL;
    col[i3] = c.r;
    col[i3 + 1] = c.g;
    col[i3 + 2] = c.b;
  }

  const pGeo = new BufferGeometry();
  pGeo.setAttribute("position", new BufferAttribute(pos, 3));
  pGeo.setAttribute("color", new BufferAttribute(col, 3));
  const pMat = new PointsMaterial({
    size: 4.4,
    map: makeDotTexture(),
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    sizeAttenuation: true,
  });
  group.add(new Points(pGeo, pMat));

  const MAXSEG = COUNT * 8;
  const lPos = new Float32Array(MAXSEG * 2 * 3);
  const lCol = new Float32Array(MAXSEG * 2 * 3);
  const lGeo = new BufferGeometry();
  lGeo.setAttribute("position", new BufferAttribute(lPos, 3).setUsage(DynamicDrawUsage));
  lGeo.setAttribute("color", new BufferAttribute(lCol, 3).setUsage(DynamicDrawUsage));
  const lMat = new LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.55,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  group.add(new LineSegments(lGeo, lMat));

  const target = { x: 0, y: 0 };
  const cur = { x: 0, y: 0 };
  window.addEventListener("pointermove", (e) => {
    target.x = e.clientX / window.innerWidth - 0.5;
    target.y = e.clientY / window.innerHeight - 0.5;
  });

  function step() {
    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      pos[ix] += vel[ix];
      pos[ix + 1] += vel[ix + 1];
      pos[ix + 2] += vel[ix + 2];
      if (pos[ix] > BOX.x / 2 || pos[ix] < -BOX.x / 2) vel[ix] *= -1;
      if (pos[ix + 1] > BOX.y / 2 || pos[ix + 1] < -BOX.y / 2) vel[ix + 1] *= -1;
      if (pos[ix + 2] > BOX.z / 2 || pos[ix + 2] < -BOX.z / 2) vel[ix + 2] *= -1;
    }
    pGeo.attributes.position.needsUpdate = true;

    let s = 0;
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < LINK2 && s < MAXSEG) {
          const f = 1 - Math.sqrt(d2) / LINK;
          const o = s * 6;
          lPos[o] = pos[i * 3]; lPos[o + 1] = pos[i * 3 + 1]; lPos[o + 2] = pos[i * 3 + 2];
          lPos[o + 3] = pos[j * 3]; lPos[o + 4] = pos[j * 3 + 1]; lPos[o + 5] = pos[j * 3 + 2];
          const r = (col[i * 3] + col[j * 3]) * 0.5 * f;
          const g = (col[i * 3 + 1] + col[j * 3 + 1]) * 0.5 * f;
          const b = (col[i * 3 + 2] + col[j * 3 + 2]) * 0.5 * f;
          lCol[o] = r; lCol[o + 1] = g; lCol[o + 2] = b;
          lCol[o + 3] = r; lCol[o + 4] = g; lCol[o + 5] = b;
          s++;
        }
      }
    }
    lGeo.setDrawRange(0, s * 2);
    lGeo.attributes.position.needsUpdate = true;
    lGeo.attributes.color.needsUpdate = true;

    cur.x += (target.x - cur.x) * 0.05;
    cur.y += (target.y - cur.y) * 0.05;
    group.rotation.y += 0.0006;
    group.rotation.x = cur.y * 0.3;
    camera.position.x = cur.x * 64;
    camera.position.y = -cur.y * 42;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  let rafId: number | null = null;
  const loop = () => {
    step();
    rafId = requestAnimationFrame(loop);
  };
  const start = () => {
    if (rafId == null) loop();
  };
  const stop = () => {
    if (rafId != null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  // Pausa quando o hero sai da tela — não gasta CPU/GPU rolando o resto do site.
  const io = new IntersectionObserver((ents) => (ents[0].isIntersecting ? start() : stop()), { threshold: 0 });
  io.observe(wrap);
  start();

  // O tamanho lido na inicialização é anterior ao layout assentar (fontes,
  // imagens), então o buffer saía com proporção diferente da caixa CSS — 785x1058
  // contra 785x944 medidos, ~12% de distorção vertical. E `window.resize` só
  // dispara quando a JANELA muda: se o hero muda de altura sozinho, nada corrigia.
  // O ResizeObserver resolve os dois — ele também dispara uma vez ao observar,
  // já com a medida final.
  const applySize = () => {
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    if (!w || !h || (w === W && h === H)) return;
    W = w;
    H = h;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H, false);
  };

  if ("ResizeObserver" in window) {
    new ResizeObserver(applySize).observe(wrap);
  } else {
    window.addEventListener("resize", applySize);
  }
  // COUNT continua fixo depois de criado: refazer os buffers de partículas a
  // cada resize seria custo à toa num fundo decorativo.
}
