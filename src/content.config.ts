import { defineCollection, z } from "astro:content";
import type { Loader } from "astro/loaders";
import { sanitizeWpHtml } from "./utils/sanitizeWp";

/**
 * Headless-WordPress blog source.
 *
 * The public site is static Astro, but content is still authored in the
 * existing WordPress admin (marketing keeps the tool it already knows). At
 * build time we pull posts from the WP REST API and Astro renders them to
 * static HTML — so WordPress never faces the public and, if it is ever down,
 * only the *next* build is affected, never the live site.
 *
 * Point at a different WordPress with WP_API_URL (e.g. a staging or future
 * cms.procgroup.com.br) without touching any page code.
 */
const WP_BASE = (import.meta.env.WP_API_URL ?? "https://procgroup.com.br").replace(/\/+$/, "");
const PER_PAGE = 100;

interface WpRendered {
  rendered: string;
}
interface WpPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  link: string;
  title: WpRendered;
  excerpt: WpRendered;
  content: WpRendered;
  _embedded?: {
    author?: { name?: string }[];
    "wp:featuredmedia"?: {
      source_url?: string;
      alt_text?: string;
      media_details?: { width?: number; height?: number };
    }[];
    "wp:term"?: { taxonomy: string; slug: string; name: string }[][];
  };
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  laquo: "«", raquo: "»", hellip: "…", mdash: "—", ndash: "–",
  rsquo: "’", lsquo: "‘", ldquo: "“", rdquo: "”",
};

/** WP REST returns titles/excerpts with HTML entities (&#8211;, &amp;, …). */
function decodeEntities(input: string): string {
  return input.replace(/&(#\d+|#x[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, code: string) => {
    if (code[0] === "#") {
      const cp = code[1] === "x" || code[1] === "X" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(cp) ? String.fromCodePoint(cp) : match;
    }
    return NAMED_ENTITIES[code] ?? match;
  });
}

function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();
}

/**
 * Motivo da falha, para o loader decidir entre falhar alto ou manter o cache.
 * `configuracao` = o endpoint não existe (WordPress mudou de domínio, WP_API_URL
 * errado). `rede` = indisponibilidade momentânea. Os dois davam zero item e
 * eram tratados igual, então uma migração do WP passava como "instabilidade" e
 * o build seguia verde com o blog congelado.
 */
type FalhaWp = null | "rede" | "configuracao";

interface ResultadoWp<T> {
  itens: T[];
  falha: FalhaWp;
}

/** Paginates through a WP REST collection endpoint, collecting every item. */
async function fetchAllWpItems<T>(
  endpoint: string,
  logger: { info(msg: string): void; error(msg: string): void },
): Promise<ResultadoWp<T>> {
  const all: T[] = [];
  for (let page = 1; ; page++) {
    const url = `${endpoint}${endpoint.includes("?") ? "&" : "?"}per_page=${PER_PAGE}&page=${page}`;
    let response: Response;
    try {
      response = await fetch(url);
    } catch (error) {
      logger.error(`Falha de rede ao buscar o WordPress: ${(error as Error).message}`);
      return { itens: all, falha: "rede" };
    }
    if (response.status === 400 && page > 1) break; // WP returns 400 past the last page
    if (!response.ok) {
      logger.error(`WordPress respondeu ${response.status} para ${url}`);
      // 404 na primeira página quer dizer que não há API REST nesse endereço —
      // é configuração, não instabilidade.
      const ehConfiguracao = page === 1 && (response.status === 404 || response.status === 401 || response.status === 403);
      return { itens: all, falha: ehConfiguracao ? "configuracao" : "rede" };
    }
    const batch = (await response.json()) as T[];
    all.push(...batch);
    const totalPages = Number(response.headers.get("x-wp-totalpages") ?? "1");
    if (page >= totalPages || batch.length === 0) break;
  }
  return { itens: all, falha: null };
}

/**
 * Decide o que fazer quando não veio nada. Manter o cache é certo para uma
 * queda momentânea, mas mascara erro de configuração permanente — e, se nem
 * cache existe, o build sai com o blog vazio sem ninguém perceber.
 */
function abortarSeNaoForTransitorio(
  falha: FalhaWp,
  temCache: boolean,
  logger: { warn(msg: string): void },
  oQue: string,
): void {
  if (falha === "configuracao") {
    throw new Error(
      `Não há API REST do WordPress em ${WP_BASE} (${oQue}). Se o WordPress mudou de endereço, ` +
        `defina WP_API_URL apontando para o novo host. O build foi interrompido de propósito: ` +
        `seguir adiante publicaria o site com o blog congelado ou vazio.`,
    );
  }
  if (!temCache) {
    throw new Error(
      `Nenhum ${oQue} veio do WordPress (${WP_BASE}) e não há cache de build anterior. ` +
        `O build foi interrompido para não publicar o site sem esse conteúdo.`,
    );
  }
  logger.warn(`Nenhum ${oQue} retornado; mantendo o conteúdo em cache do build anterior.`);
}

/**
 * Contas administrativas cujo "nome" é só o login, porque ninguém preencheu o
 * nome de exibição no WordPress. Hoje 7 dos 15 posts saem assinados por
 * "Root_", o que aparece publicamente no site.
 *
 * Esta é uma REDE DE SEGURANÇA, não a correção: o certo é preencher o nome de
 * exibição no WordPress. Mas até lá é melhor assinar com a marca do que expor
 * o login de uma conta de administração — e, se aparecer outra conta assim, o
 * site não passa a publicá-la.
 */
const LOGINS_NAO_PUBLICAVEIS = new Set(["root", "root_", "admin", "administrator", "wordpress", "user"]);

function nomeDeAutorPublicavel(nome: string | undefined): string {
  const limpo = (nome ?? "").trim();
  if (!limpo) return "Proc Group";
  return LOGINS_NAO_PUBLICAVEIS.has(limpo.toLowerCase()) ? "Proc Group" : limpo;
}

function mapPost(post: WpPost) {
  const embedded = post._embedded ?? {};
  const media = embedded["wp:featuredmedia"]?.[0];
  const categories = (embedded["wp:term"] ?? [])
    .flat()
    .filter((term) => term?.taxonomy === "category")
    .map((term) => ({ slug: term.slug, name: decodeEntities(term.name) }));

  return {
    id: post.slug,
    wpId: post.id,
    slug: post.slug,
    title: decodeEntities(post.title.rendered),
    date: post.date,
    modified: post.modified,
    excerpt: stripTags(post.excerpt.rendered),
    // Sanitizado aqui, na entrada: o corpo do post é renderizado com
    // `<Content />` e vira HTML estático no mesmo domínio do site. Ver
    // utils/sanitizeWp.ts para o que passa e o que é removido.
    content: sanitizeWpHtml(post.content.rendered),
    author: nomeDeAutorPublicavel(embedded.author?.[0]?.name),
    image: media?.source_url
      ? {
          src: media.source_url,
          alt: media.alt_text ? decodeEntities(media.alt_text) : decodeEntities(post.title.rendered),
          width: media.media_details?.width,
          height: media.media_details?.height,
        }
      : undefined,
    categories,
  };
}

function wordpressLoader(): Loader {
  return {
    name: "wordpress-blog",
    async load({ store, logger, parseData }) {
      logger.info(`Buscando posts do WordPress em ${WP_BASE}`);
      const endpoint = `${WP_BASE}/wp-json/wp/v2/posts?_embed=1&orderby=date&order=desc`;
      const { itens: all, falha } = await fetchAllWpItems<WpPost>(endpoint, logger);

      if (all.length === 0) {
        abortarSeNaoForTransitorio(falha, Array.from(store.keys()).length > 0, logger, "post");
        return;
      }

      store.clear();
      for (const raw of all) {
        const mapped = mapPost(raw);
        const data = await parseData({ id: mapped.id, data: mapped });
        store.set({ id: mapped.id, data, rendered: { html: mapped.content } });
      }
      logger.info(`${all.length} posts carregados do WordPress.`);
    },
  };
}

interface WpPage {
  id: number;
  slug: string;
  modified: string;
  title: WpRendered;
  content: WpRendered;
}

/**
 * Static WordPress pages (Política de Privacidade, etc — authored with
 * Elementor rather than the block editor posts use, but the REST payload
 * shape is the same). Separate collection from `blog` since pages have no
 * categories/author/featured-image concept.
 */
function wordpressPagesLoader(): Loader {
  return {
    name: "wordpress-pages",
    async load({ store, logger, parseData }) {
      logger.info(`Buscando páginas do WordPress em ${WP_BASE}`);
      const endpoint = `${WP_BASE}/wp-json/wp/v2/pages`;
      const { itens: all, falha } = await fetchAllWpItems<WpPage>(endpoint, logger);

      if (all.length === 0) {
        abortarSeNaoForTransitorio(falha, Array.from(store.keys()).length > 0, logger, "página");
        return;
      }

      store.clear();
      for (const raw of all) {
        const mapped = {
          id: raw.slug,
          wpId: raw.id,
          slug: raw.slug,
          title: decodeEntities(raw.title.rendered),
          modified: raw.modified,
          // Mesmo tratamento do blog — a Política de Privacidade também entra
          // como HTML bruto do WordPress.
          content: sanitizeWpHtml(raw.content.rendered),
        };
        const data = await parseData({ id: mapped.id, data: mapped });
        store.set({ id: mapped.id, data, rendered: { html: mapped.content } });
      }
      logger.info(`${all.length} páginas carregadas do WordPress.`);
    },
  };
}

const blog = defineCollection({
  loader: wordpressLoader(),
  schema: z.object({
    wpId: z.number(),
    slug: z.string(),
    title: z.string(),
    date: z.coerce.date(),
    modified: z.coerce.date(),
    excerpt: z.string(),
    content: z.string(),
    author: z.string(),
    image: z
      .object({
        src: z.string().url(),
        alt: z.string(),
        width: z.number().optional(),
        height: z.number().optional(),
      })
      .optional(),
    categories: z.array(z.object({ slug: z.string(), name: z.string() })),
  }),
});

const pages = defineCollection({
  loader: wordpressPagesLoader(),
  schema: z.object({
    wpId: z.number(),
    slug: z.string(),
    title: z.string(),
    modified: z.coerce.date(),
    content: z.string(),
  }),
});

export const collections = { blog, pages };
