/**
 * Prova de que a Política de Privacidade traduzida ainda bate com a original.
 *
 * O português vem do WordPress e é a versão que vale. Inglês e espanhol são
 * tradução local (src/data/politicaPrivacidade.ts), autorizada em 2026-09-25.
 * Duas fontes diferentes para o mesmo documento criam um risco silencioso: o
 * marketing edita a política no WordPress, o build publica o PT novo ao lado
 * do EN/ES velho, e ninguém percebe — são páginas que quase ninguém abre.
 *
 * Este script roda sobre o dist/ e falha (exit 1) se:
 *
 *   1. As três versões não tiverem a MESMA ESTRUTURA — mesma sequência de
 *      blocos, mesmo número de seções, mesmo número de itens em cada lista.
 *      É o sinal mais barato de que um parágrafo entrou ou saiu de um lado só.
 *   2. Faltar em alguma tradução um dado que não se traduz: CNPJ, razão
 *      social, número da lei, telefone, e-mail, domínio.
 *   3. Sobrar português cru dentro de /en ou /es — palavra que o tradutor
 *      esqueceu.
 *
 * O que ele NÃO faz: julgar a qualidade da tradução. Isso é leitura humana, e
 * sendo documento jurídico convém que seja de quem responde por ele.
 *
 * Uso: node scripts/checa-politica.mjs   (depois de `astro build`)
 */
import { readFile } from "node:fs/promises";

const DIST = new URL("../dist/", import.meta.url);
const VERSOES = [
  { lang: "pt", arquivo: "politica-de-privacidade/index.html", canonica: true },
  { lang: "en", arquivo: "en/politica-de-privacidade/index.html", canonica: false },
  { lang: "es", arquivo: "es/politica-de-privacidade/index.html", canonica: false },
];

/** Dados que atravessam a tradução sem mudar: se sumirem, a tradução perdeu informação. */
const INVARIANTES = [
  ["CNPJ", "10.381.377/0001-91"],
  ["razão social", "Proc Solucoes em Informatica"],
  ["número da lei", "13.709/2018"],
  ["telefone", "3224-3532"],
  ["e-mail", "comercial@procgroup.com.br"],
  ["domínio", "procgroup.com.br"],
];

/**
 * Palavras que só existem em português. Acusam tradução esquecida.
 * Só entram termos SEM colisão: "informações" não serve como pista em ES
 * ("información" é diferente, mas "informação" não aparece lá), e nada que
 * também seja espanhol ou inglês válido.
 */
const PISTAS_PT = [
  "dados pessoais", "você", "não ", "são ", "seus ", "nosso ", "através",
  "conforme a Lei Geral", "navegação", "usuário", "solicitação",
];

function texto(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Esqueleto do documento: a sequência de blocos, sem o texto.
 *
 * O h2 inicial do WordPress ("Política de Privacidade") é ignorado: repete o
 * h1 que a própria página já imprime acima, é artefato do Elementor, e as
 * traduções não reproduzem o defeito de propósito.
 */
function esqueleto(html) {
  const prose = html.match(/<div class="prose"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/);
  if (!prose) return null;
  const corpo = prose[1].replace(/<div[^>]*>|<\/div>/g, "");
  const blocos = [];
  const re = /<(h2|h4|p|ul|ol)[^>]*>([\s\S]*?)<\/\1>/g;
  let m;
  while ((m = re.exec(corpo))) {
    const [, tag, dentro] = m;
    if (tag === "ul" || tag === "ol") {
      const itens = dentro.match(/<li[\s>]/g)?.length ?? 0;
      blocos.push(`ul(${itens})`);
    } else if (tag === "p" && /<p[^>]*>/.test(dentro) === false) {
      // <p> soltos dentro de <li> já foram contados na lista
      blocos.push("p");
    } else if (tag === "h2" || tag === "h4") {
      blocos.push(tag);
    }
  }
  // descarta o h2 de abertura do WordPress
  return blocos[0] === "h2" ? blocos.slice(1) : blocos;
}

/** <p> dentro de <li> não conta como bloco do documento. */
function esqueletoLimpo(html) {
  const prose = html.match(/<div class="prose"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/);
  if (!prose) return null;
  let corpo = prose[1].replace(/<div[^>]*>|<\/div>/g, "");
  const listas = [];
  corpo = corpo.replace(/<(ul|ol)[^>]*>([\s\S]*?)<\/\1>/g, (_, tag, dentro) => {
    listas.push(dentro.match(/<li[\s>]/g)?.length ?? 0);
    return `\u0000LISTA${listas.length - 1}\u0000`;
  });
  const blocos = [];
  const re = /<(h2|h4|p)[^>]*>([\s\S]*?)<\/\1>|\u0000LISTA(\d+)\u0000/g;
  let m;
  while ((m = re.exec(corpo))) {
    if (m[3] !== undefined) blocos.push(`ul(${listas[Number(m[3])]})`);
    else blocos.push(m[1]);
  }
  return blocos[0] === "h2" ? blocos.slice(1) : blocos;
}

const problemas = [];
const docs = [];

for (const v of VERSOES) {
  let html;
  try {
    html = await readFile(new URL(v.arquivo, DIST), "utf8");
  } catch {
    problemas.push(`[${v.lang}] página não existe no dist: ${v.arquivo}`);
    continue;
  }
  const blocos = esqueletoLimpo(html);
  if (!blocos) {
    problemas.push(`[${v.lang}] não encontrei o corpo da política (div.prose) — o layout mudou?`);
    continue;
  }
  docs.push({ ...v, html, blocos, corpo: texto(html.match(/<div class="prose"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/)[1]) });
}

const canonica = docs.find((d) => d.canonica);
if (!canonica) {
  problemas.push("a versão portuguesa não foi lida — sem ela não há com o que comparar");
}

if (canonica) {
  console.log(`Estrutura da versão canônica (pt): ${canonica.blocos.length} blocos`);
  console.log(`  ${canonica.blocos.join(" ")}\n`);

  for (const d of docs.filter((x) => !x.canonica)) {
    // 1. estrutura
    if (d.blocos.join(" ") !== canonica.blocos.join(" ")) {
      problemas.push(
        `[${d.lang}] estrutura diverge do português.\n` +
          `        pt: ${canonica.blocos.join(" ")}\n` +
          `        ${d.lang}: ${d.blocos.join(" ")}`,
      );
      const seções = (b) => b.filter((x) => x === "h4").length;
      if (seções(d.blocos) !== seções(canonica.blocos)) {
        problemas.push(
          `[${d.lang}] número de seções (h4): ${seções(d.blocos)}, português tem ${seções(canonica.blocos)}`,
        );
      }
    } else {
      console.log(`[${d.lang}] estrutura idêntica à portuguesa (${d.blocos.length} blocos) ✓`);
    }

    // 2. invariantes
    for (const [nome, valor] of INVARIANTES) {
      if (!d.corpo.includes(valor)) problemas.push(`[${d.lang}] perdeu o ${nome} (“${valor}”) na tradução`);
    }

    // 3. português esquecido
    const sobrou = PISTAS_PT.filter((p) => d.corpo.toLowerCase().includes(p.toLowerCase()));
    if (sobrou.length) {
      problemas.push(`[${d.lang}] parece ter português não traduzido: ${sobrou.map((s) => `“${s.trim()}”`).join(", ")}`);
    }
  }
}

console.log("");
if (problemas.length) {
  console.error("A política traduzida NÃO bate com a portuguesa:\n");
  for (const p of problemas) console.error("  ✗ " + p);
  console.error(
    "\nSe o texto português mudou no WordPress, as traduções em " +
      "src/data/politicaPrivacidade.ts precisam ser refeitas na mesma medida.",
  );
  process.exit(1);
}
console.log("A política bate nas três versões: mesma estrutura, mesmos dados, sem português esquecido.");
