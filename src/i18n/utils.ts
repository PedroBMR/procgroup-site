import { defaultLocale, locales, type Locale } from "./config";
import { translations } from "./translations";
import { withBase } from "../utils/url";

function basePath(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, "");
}

/** Locale a partir da URL, considerando o base path do projeto (ex.: /procgroup-site). */
export function getLangFromUrl(url: URL): Locale {
  let path = url.pathname;
  const b = basePath();
  if (b && path.startsWith(b)) path = path.slice(b.length);
  const seg = path.split("/")[1];
  return locales.includes(seg as Locale) ? (seg as Locale) : defaultLocale;
}

export function useTranslations(lang: Locale) {
  return translations[lang];
}

/**
 * Caminhos que existem numa única versão, sem variante por idioma:
 *  - `/404` — página de erro única, servida pelo host para qualquer URL inexistente.
 *
 * Prefixá-los com o idioma gerava 404 em massa (menu, rodapé, hreflang e seletor
 * de idioma apontavam para /es/404 etc., que nunca são gerados), então eles nunca
 * recebem prefixo.
 *
 * `/blog` esteve aqui até 2026-09-25, pelo mesmo motivo: as rotas traduzidas não
 * existiam. O preço era alto e invisível — entrar no blog vindo de /en derrubava
 * o idioma (o site descobre o idioma lendo a URL, e ali não havia nenhum), e o
 * visitante não tinha como voltar: o menu inteiro já apontava para o português.
 * Hoje /en/blog e /es/blog são gerados, em pages/[...lang]/blog/, e o caminho
 * recebe prefixo como qualquer outro.
 */
const SINGLE_VERSION_PREFIXES = ["/404"];

export function isSingleVersionPath(path: string): boolean {
  return SINGLE_VERSION_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
}

/**
 * Caminhos cujo CONTEÚDO só existe em português, embora a casca — menu, rodapé,
 * links, seletor de idioma — seja traduzida. O blog vem do WordPress, que é
 * PT-only por decisão de projeto.
 *
 * As três URLs servem o mesmo texto português. Não são versões de idioma uma da
 * outra: são a mesma página com o menu traduzido. Declarar hreflang seria mentir
 * para o buscador, então as traduzidas não emitem nenhum e apontam canonical
 * para a versão PT — o Google indexa um post só, e o visitante segue navegando
 * no idioma que escolheu. Ver BaseLayout.
 */
const PT_ONLY_CONTENT_PREFIXES = ["/blog"];

export function isPtOnlyContentPath(path: string): boolean {
  return PT_ONLY_CONTENT_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
}

/**
 * Caminho lógico com prefixo de locale, SEM base path. Use com componentes que
 * já aplicam withBase() internamente (ex.: Button.astro).
 */
export function localePath(path: string, lang: Locale): string {
  const clean = path === "/" ? "" : path;
  // Sem versão traduzida: mantém o caminho único em vez de apontar para uma
  // rota que não existe.
  if (isSingleVersionPath(path)) return path;
  return lang === defaultLocale ? path || "/" : `/${lang}${clean}`;
}

/** Caminho com prefixo de locale E base path — para href diretos (`<a href>`). */
export function localizePath(path: string, lang: Locale): string {
  return withBase(localePath(path, lang));
}

/** Caminho lógico da URL atual: sem base path e sem prefixo de locale. */
export function logicalPath(url: URL): string {
  let p = url.pathname;
  const b = basePath();
  if (b && p.startsWith(b)) p = p.slice(b.length);
  const parts = p.split("/");
  if (locales.includes(parts[1] as Locale) && parts[1] !== defaultLocale) parts.splice(1, 1);
  const out = parts.join("/");
  return out === "" ? "/" : out;
}

/** Hrefs (com base) equivalentes à página atual em cada idioma — para o seletor de idioma. */
export function localeAlternates(url: URL): { lang: Locale; href: string }[] {
  const path = logicalPath(url);
  // Numa página de versão única (blog, 404), os outros idiomas não têm
  // equivalente. Levar para a home do idioma escolhido é melhor que 404 e melhor
  // que um link que não faz nada — o visitante chega a uma página que existe, no
  // idioma que pediu.
  if (isSingleVersionPath(path)) {
    return locales.map((lang) => ({
      lang,
      href: lang === defaultLocale ? withBase(path) : localizePath("/", lang),
    }));
  }
  return locales.map((lang) => ({ lang, href: localizePath(path, lang) }));
}
