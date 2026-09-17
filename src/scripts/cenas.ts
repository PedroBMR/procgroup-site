/**
 * Motor das cenas do heroi: mede o canvas, cuida do ciclo de vida e chama a
 * cena registrada em data-cena.
 *
 * O que ele resolve, e que toda cena ganha de graca:
 *   DPR travado em 2      acima disso o custo sobe e ninguem ve diferenca
 *   um quadro sempre      aba em segundo plano nao deixa o rAF rodar, e a cena
 *                         ficaria em branco ate o visitante voltar
 *   menos movimento       prefers-reduced-motion para no primeiro quadro
 *   fora de vista         IntersectionObserver e visibilitychange pausam o laco
 *   paralaxe              um unico listener de ponteiro para todas as cenas
 *
 * Sem JS, sem canvas ou com movimento reduzido, o CSS do host entrega o
 * gradiente e a pagina continua inteira. Tudo aqui e decorativo (aria-hidden).
 *
 * A cena da operacao (as tres estacoes vistas por camera) foi removida em
 * 2026-09-17 junto com o comparador de /labs/landings: as cinco direcoes de
 * camera foram reprovadas e a home passou a montar a telemetria. O historico
 * esta no git, e o motivo em Projeto - Site institucional, no cofre.
 */
import type { Cena } from "./cenaTipos";
import { telemetria } from "./cenaTelemetria";

const CENAS: Record<string, Cena> = { telemetria };

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
  const cena = CENAS[host.dataset.cena ?? ""];
  // Host com data-cena que nao existe mais nao ganha cena nenhuma, e o
  // gradiente do CSS assume. Melhor que montar a cena errada em silencio.
  if (!cena) return;

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

  // O host vai junto: é dele que a cena tira os rótulos já traduzidos.
  const estado = cena.criar(w, h, host);
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
