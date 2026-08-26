/**
 * Prova da divisão do site em dois públicos (ARQUITETURA-DOIS-PUBLICOS.md).
 *
 * Roda sobre o dist/ e falha (exit 1) se qualquer regra for violada:
 *
 *   1. Nenhuma página linka rota morta do recorte comum
 *      (/solucoes, /cases, /empresa, /contato, /plataforma-proc-ai, /comecar).
 *   2. Nenhuma página de um lado linka o outro além da escotilha do rodapé
 *      (exatamente 1 link por página). Blog e agenda contam como lado
 *      empresas — o chrome deles é corporativo.
 *   3. A raiz é o seletor: as duas portas apontam para /governo e /empresas.
 *
 * Uso:  npm run build && node scripts/checa-divisao.mjs
 * A regra vira teste em vez de promessa: qualquer link novo que fure a
 * divisão derruba o script, não espera alguém notar navegando.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, sep } from "node:path";

const DIST = "dist";
const falhas = [];

function htmls(dir) {
  const saida = [];
  for (const nome of readdirSync(dir)) {
    const p = join(dir, nome);
    if (statSync(p).isDirectory()) saida.push(...htmls(p));
    else if (nome.endsWith(".html")) saida.push(p);
  }
  return saida;
}

const paginas = htmls(DIST)
  .map((p) => ({ path: p.split(sep).join("/"), html: readFileSync(p, "utf-8") }))
  // páginas de redirect (meta refresh) apontam para onde quiserem
  .filter((p) => !p.html.includes('http-equiv="refresh"'));

// ── 1. rota morta ──────────────────────────────────────────────────────────
const MORTAS =
  /href="\/procgroup-site\/(?:en\/|es\/)?(?:solucoes|cases|empresa|contato|plataforma-proc-ai|comecar)(?:\/[a-z-]+)?\/?"/g;
for (const p of paginas) {
  const m = p.html.match(MORTAS);
  if (m) falhas.push(`rota morta em ${p.path}: ${m[0]}`);
}

// ── 2. link cruzado ────────────────────────────────────────────────────────
// blog e agenda pertencem ao lado empresas (audiencia.ts, publicoDaUrl)
function ladoDa(path) {
  const rel = path.replace(/^dist\//, "").replace(/^(en|es)\//, "");
  if (rel.startsWith("governo/")) return "governo";
  if (rel.startsWith("empresas/") || rel.startsWith("blog/") || rel.startsWith("eventos/")) return "empresas";
  if (rel === "blog.html" || rel === "eventos.html") return "empresas";
  return null;
}
for (const p of paginas) {
  const lado = ladoDa(p.path);
  if (!lado) continue;
  const outro = lado === "governo" ? "empresas" : "governo";
  const n = (p.html.match(new RegExp(`href="/procgroup-site/(?:en/|es/)?${outro}`, "g")) ?? []).length;
  if (n !== 1) falhas.push(`${p.path}: ${n} links para /${outro} (esperado 1, a escotilha)`);
}

// ── 3. raiz é o seletor ────────────────────────────────────────────────────
for (const raiz of ["dist/index.html", "dist/en/index.html", "dist/es/index.html"]) {
  const html = readFileSync(raiz, "utf-8");
  const portas = [...html.matchAll(/data-escolha="(\w+)"/g)].map((m) => m[1]);
  if (portas.sort().join(",") !== "empresa,governo")
    falhas.push(`${raiz}: portas do seletor erradas (${portas.join(",") || "nenhuma"})`);
}

if (falhas.length) {
  console.error(`✗ divisão furada — ${falhas.length} problema(s):`);
  for (const f of falhas) console.error("  " + f);
  process.exit(1);
}
console.log(`✓ divisão íntegra: ${paginas.length} páginas, zero rota morta, zero link cruzado fora da escotilha, seletor na raiz.`);
