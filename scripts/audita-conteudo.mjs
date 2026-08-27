/**
 * Levantamento de conteúdo do site construído.
 *
 * Não julga: mede. Percorre o dist/ e imprime, por página, os fatos que
 * costumam esconder problema — título e descrição (e se repetem), quantos h1,
 * quantas palavras no <main>, imagens sem alt, links quebrados, marcas de
 * "em breve" que ficaram no ar.
 *
 * Existe porque o site perdeu metade do conteúdo em 2026-08-27 (cidade e
 * governo saíram) e o risco agora não é o que quebrou — é o que ficou raso
 * sem ninguém notar.
 *
 * Uso:  npm run build && node scripts/audita-conteudo.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const DIST = "dist";
const BASE = "/procgroup-site";

function htmls(dir) {
  const saida = [];
  for (const nome of readdirSync(dir)) {
    const p = join(dir, nome);
    if (statSync(p).isDirectory()) saida.push(...htmls(p));
    else if (nome.endsWith(".html")) saida.push(p);
  }
  return saida;
}

const tag = (html, re) => (html.match(re)?.[1] ?? "").trim();
const limpar = (s) => s.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").trim();

if (!existsSync(DIST)) {
  console.error('dist/ não existe — rode "npm run build".');
  process.exit(1);
}

const paginas = [];
for (const arquivo of htmls(DIST)) {
  const html = readFileSync(arquivo, "utf8");
  if (/http-equiv="refresh"/i.test(html)) continue; // redirect, não é página

  const rota = "/" + relative(DIST, arquivo).split(sep).join("/").replace(/(^|\/)index\.html$/, "$1");
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => limpar(m[1]));
  const imgs = [...main.matchAll(/<img\b[^>]*>/gi)];
  // alt vazio NAO e falha: e como se marca imagem decorativa. O card de post ja
  // e um link com o titulo — repetir no alt faria o leitor de tela dizer a
  // mesma coisa duas vezes. So conta quem nao tem o atributo.
  const semAlt = imgs.filter((m) => !/\salt[\s=>]/.test(m[0]));
  const links = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);

  paginas.push({
    rota,
    lang: rota.startsWith("/en") ? "en" : rota.startsWith("/es") ? "es" : "pt",
    title: tag(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    desc: tag(html, /<meta name="description" content="([^"]*)"/i),
    h1s,
    palavras: limpar(main).split(" ").filter(Boolean).length,
    imgs: imgs.length,
    semAlt: semAlt.length,
    internos: links.filter((h) => h.startsWith(BASE)),
    emBreve: /em breve|coming soon|próximamente|em produção|placeholder/i.test(limpar(main)),
  });
}

/* ── 1. Título e descrição repetidos ── */
const porTitulo = new Map();
const porDesc = new Map();
for (const p of paginas) {
  if (p.title) porTitulo.set(p.title, [...(porTitulo.get(p.title) ?? []), p.rota]);
  if (p.desc) porDesc.set(p.desc, [...(porDesc.get(p.desc) ?? []), p.rota]);
}

console.log(`\n══ ${paginas.length} páginas (sem contar redirecionamentos) ══\n`);

const repetidos = [...porTitulo].filter(([, r]) => r.length > 1);
if (repetidos.length) {
  console.log("▸ TÍTULOS REPETIDOS");
  for (const [t, rotas] of repetidos) console.log(`  "${t}"\n    ${rotas.join("  ")}`);
} else console.log("▸ títulos repetidos: nenhum");

const descRep = [...porDesc].filter(([, r]) => r.length > 1);
if (descRep.length) {
  console.log("\n▸ DESCRIÇÕES REPETIDAS");
  for (const [d, rotas] of descRep) console.log(`  "${d.slice(0, 70)}…"\n    ${rotas.join("  ")}`);
} else console.log("▸ descrições repetidas: nenhuma");

/* ── 2. Problemas por página ── */
console.log("\n▸ POR PÁGINA (só o que destoa)");
for (const p of paginas.sort((a, b) => a.rota.localeCompare(b.rota))) {
  const notas = [];
  if (!p.title) notas.push("SEM TITLE");
  else if (p.title.length > 60) notas.push(`title ${p.title.length} chars`);
  if (!p.desc) notas.push("SEM DESCRIPTION");
  else if (p.desc.length > 160) notas.push(`desc ${p.desc.length} chars`);
  else if (p.desc.length < 70) notas.push(`desc curta (${p.desc.length})`);
  if (p.h1s.length !== 1) notas.push(`${p.h1s.length} h1`);
  if (p.palavras < 120) notas.push(`${p.palavras} palavras`);
  if (p.semAlt) notas.push(`${p.semAlt}/${p.imgs} img sem alt`);
  if (p.emBreve) notas.push("diz 'em breve/produção'");
  if (notas.length) console.log(`  ${p.rota.padEnd(46)} ${notas.join(" · ")}`);
}

/* ── 3. Links internos quebrados ── */
const existe = (href) => {
  const limpo = href.split("#")[0].split("?")[0].replace(BASE, "");
  if (limpo === "" || limpo === "/") return existsSync(join(DIST, "index.html"));
  const semBarra = limpo.replace(/\/$/, "");
  return (
    existsSync(join(DIST, semBarra)) ||
    existsSync(join(DIST, semBarra, "index.html")) ||
    existsSync(join(DIST, semBarra + ".html"))
  );
};
const quebrados = new Map();
for (const p of paginas) {
  for (const href of new Set(p.internos)) {
    if (!existe(href)) quebrados.set(href, [...(quebrados.get(href) ?? []), p.rota]);
  }
}
console.log("\n▸ LINKS INTERNOS QUEBRADOS");
if (quebrados.size === 0) console.log("  nenhum");
for (const [href, rotas] of quebrados) {
  console.log(`  ${href}  ← ${rotas.length} página(s): ${rotas.slice(0, 3).join(" ")}`);
}

/* ── 4. Volume de conteúdo por idioma ── */
console.log("\n▸ VOLUME POR IDIOMA (mediana de palavras)");
for (const lang of ["pt", "en", "es"]) {
  const ns = paginas.filter((p) => p.lang === lang).map((p) => p.palavras).sort((a, b) => a - b);
  const mediana = ns.length ? ns[Math.floor(ns.length / 2)] : 0;
  console.log(`  ${lang}: ${ns.length} páginas, mediana ${mediana} palavras`);
}
