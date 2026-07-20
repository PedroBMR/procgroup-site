// Sistema de motion do site (GSAP + ScrollTrigger). Substitui o antigo
// IntersectionObserver de reveal por animações orquestradas — reveals com
// stagger e easing físico, intro do hero, paralaxe no scroll e botões
// magnéticos. Progressivo e seguro: respeita prefers-reduced-motion e, se
// algo falhar, revela todo o conteúdo (nada fica preso invisível).
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const root = document.documentElement;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Socorro: revela tudo que o reveal escondeu. Escreve direto no style inline e
// não usa o GSAP — duas razões. (1) A linha `gsap.set("[data-reveal]", …)` abaixo
// esconde com estilo inline, e a classe .is-visible do base.css não vence inline;
// marcar só a classe deixaria a página em branco. (2) Se quem falhou foi o próprio
// GSAP, chamar gsap.set aqui falharia junto.
function showAll() {
  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
    el.classList.add("is-visible");
  });
}

if (reduce) {
  showAll();
} else {
  try {
    gsap.registerPlugin(ScrollTrigger);
    root.classList.add("gsap-ready");

    // 1) Reveals orquestrados — entram em grupos, com stagger e easing físico.
    const revealTo = (els: Element | Element[]) =>
      gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.09, overwrite: true });
    gsap.set("[data-reveal]", { opacity: 0, y: 26 });
    ScrollTrigger.batch("[data-reveal]", { start: "top 88%", once: true, onEnter: revealTo });
    // Rede de segurança: o que já está na dobra (ou acima) entra no load — o batch
    // não dispara para elementos já visíveis, e sem isso hero/stats ficam invisíveis.
    const vh = window.innerHeight;
    const aboveFold = gsap.utils
      .toArray<HTMLElement>("[data-reveal]")
      .filter((el) => el.getBoundingClientRect().top < vh);
    if (aboveFold.length) revealTo(aboveFold);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    // 2) Intro do hero — título/subtítulo/CTAs entram em sequência caprichada.
    const hero = document.querySelector("[data-hero-intro]");
    if (hero) {
      const kids = hero.querySelectorAll(":scope > *");
      gsap.from(kids, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
        clearProps: "transform",
      });
    }

    // 3) Paralaxe no scroll — [data-parallax] (força e início opcionais por atributo).
    gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
      const strength = parseFloat(el.dataset.parallax || "0.15");
      const start = el.dataset.parallaxStart || "top bottom";
      gsap.to(el, {
        yPercent: strength * 100,
        ease: "none",
        scrollTrigger: { trigger: el, start, end: "bottom top", scrub: 0.6 },
      });
    });

    // 4) Micro-interação (só ponteiro fino): botões magnéticos.
    if (window.matchMedia("(pointer: fine)").matches) {
      gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((btn) => {
        const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3" });
        btn.addEventListener("pointermove", (e) => {
          const r = btn.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.5);
        });
        btn.addEventListener("pointerleave", () => {
          xTo(0);
          yTo(0);
        });
      });
    }
  } catch (e) {
    showAll();
  }
}
