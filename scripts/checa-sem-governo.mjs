/**
 * Prova de que o site não vende mais para cidade e governo.
 *
 * O CEO tirou o setor público daqui em 2026-08-27: cidade e governo ganham
 * site próprio, e este passa a ser só corporativo. A remoção mexeu em 30
 * arquivos e 3 idiomas — o risco não é o que foi apagado, é o que volta
 * depois, numa copy nova, num menu, num case.
 *
 * Este script substitui o antigo checa-divisao.mjs (que provava a divisão em
 * dois públicos, e não existe mais). Roda sobre o dist/ e falha (exit 1) se:
 *
 *   1. Alguma página publicada citar setor público — prefeitura, município,
 *      guarda municipal, CPSI, segurança pública, Pato 360 e afins.
 *   2. Sobrar rota ou link para /governo, /empresas ou cidades-inteligentes.
 *   3. A raiz não for a home corporativa.
 *
 * "Pato Branco" NÃO entra na lista: é a cidade-sede da Proc e continua no
 * endereço, na história da empresa e no rodapé. O que saiu foi o cliente
 * municipal, não a origem da empresa.
 *
 * Uso:  npm run build && node scripts/checa-sem-governo.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const falhas = [];
// O blog vem do WordPress: o texto dos posts nao esta neste repositorio e nao
// se corrige daqui. Metade deles (8 de 18, em 2026-08-27) e sobre seguranca
// publica e cidades. Some como AVISO, nao como falha — senao o portao vive
// vermelho por algo que so o WordPress resolve.
const alertasBlog = [];
const ehBlog = (caminho) => caminho.includes("blog");

/** Termos que só existem quando o site volta a falar com o setor público. */
const PROIBIDOS = [
  "prefeitura", "prefeituras", "município", "municípios", "municipal",
  "municipality", "municipalities", "city hall", "city halls",
  "guarda municipal", "guardas municipais",
  "cpsi", "segurança pública", "seguridad pública", "public safety",
  "setor público", "sector público", "public sector",
  "pato 360", "cidades inteligentes", "smart cities", "ciudades inteligentes",
  "córtex", "polícia militar", "polícia rodoviária",
];

/** Caminhos que morreram com a remoção. */
const ROTAS_MORTAS = ["/governo", "/empresas", "cidades-inteligentes"];

function htmls(dir) {
  const saida = [];
  for (const nome of readdirSync(dir)) {
    const p = join(dir, nome);
    if (statSync(p).isDirectory()) saida.push(...htmls(p));
    else if (nome.endsWith(".html")) saida.push(p);
  }
  return saida;
}

if (!existsSync(DIST)) {
  console.error(`✗ ${DIST}/ não existe — rode "npm run build" antes.`);
  process.exit(1);
}

const paginas = htmls(DIST);
if (paginas.length === 0) {
  console.error(`✗ nenhum HTML em ${DIST}/`);
  process.exit(1);
}

for (const arquivo of paginas) {
  const html = readFileSync(arquivo, "utf8");
  // Só o texto visível e os atributos de conteúdo: comentários de código
  // fonte podem citar a história sem que a página diga isso ao visitante.
  const semComentarios = html.replace(/<!--[\s\S]*?-->/g, "");
  const minusculo = semComentarios.toLowerCase();

  for (const termo of PROIBIDOS) {
    if (minusculo.includes(termo)) {
      (ehBlog(arquivo) ? alertasBlog : falhas).push(`${arquivo}: cita "${termo}"`);
    }
  }

  // Redirecionamentos são páginas geradas: elas PRECISAM citar a rota morta
  // para mandar o visitante ao lugar certo.
  const ehRedirect = minusculo.includes('http-equiv="refresh"');
  if (!ehRedirect) {
    for (const rota of ROTAS_MORTAS) {
      const alvo = rota.startsWith("/") ? `href="/procgroup-site${rota}` : rota;
      if (semComentarios.includes(alvo)) {
        falhas.push(`${arquivo}: linka rota morta ${rota}`);
      }
    }
  }
}

// A raiz precisa ser a home, não um seletor nem um redirecionamento.
const raiz = join(DIST, "index.html");
if (!existsSync(raiz)) {
  falhas.push("dist/index.html não existe — a raiz não é uma página");
} else {
  const html = readFileSync(raiz, "utf8");
  if (html.toLowerCase().includes('http-equiv="refresh"')) {
    falhas.push("dist/index.html é um redirecionamento — a raiz deve ser a home");
  }
}

if (falhas.length) {
  console.error(`✗ ${falhas.length} problema(s):\n`);
  for (const f of falhas.slice(0, 40)) console.error("  " + f);
  if (falhas.length > 40) console.error(`  … e mais ${falhas.length - 40}`);
  process.exit(1);
}

if (alertasBlog.length) {
  const posts = new Set(alertasBlog.map((a) => a.split(":")[0]));
  console.warn(
    `⚠ ${posts.size} página(s) do blog ainda falam de cidade/setor público ` +
      `(${alertasBlog.length} menções). O texto vem do WordPress e se resolve lá, ` +
      `não neste repositório.`
  );
}

console.log(
  `✓ páginas do site sem setor público: ${paginas.length} páginas no total, ` +
    `nenhuma rota morta linkada, raiz é a home.`
);
