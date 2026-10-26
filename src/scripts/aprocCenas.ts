// Gatilho de cena da página A Proc: cada [data-cena] ganha .em-cena uma vez,
// quando entra na tela, e dispara o evento "cena" para quem precisa de JS
// (timeline, tabs, lista sequencial). Nada reinicia depois: a leitura não é
// interrompida por animação repetida. Ver src/styles/aproc.css.

const parado = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function entrar(el: Element) {
  if (el.classList.contains("em-cena")) return;
  el.classList.add("em-cena");
  el.dispatchEvent(new CustomEvent("cena"));
}

export function montarCenas() {
  const cenas = document.querySelectorAll("[data-cena]");
  if (parado || !("IntersectionObserver" in window)) {
    cenas.forEach(entrar);
    return;
  }
  const io = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        entrar(e.target);
        io.unobserve(e.target);
      }
    },
    // Entra quando o topo passa de 75% da tela. threshold: 0.25 deixava
    // invisível no celular toda seção com mais de 4 telas de altura.
    { rootMargin: "0px 0px -25% 0px" },
  );
  cenas.forEach((c) => io.observe(c));
}

/** Para quem precisa saber se a página pediu menos movimento. */
export const semMovimento = parado;
