import { defineCollection, z } from "astro:content";
import type { Loader } from "astro/loaders";

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

/** Paginates through a WP REST collection endpoint, collecting every item. */
async function fetchAllWpItems<T>(
  endpoint: string,
  logger: { info(msg: string): void; error(msg: string): void },
): Promise<T[]> {
  const all: T[] = [];
  for (let page = 1; ; page++) {
    const url = `${endpoint}${endpoint.includes("?") ? "&" : "?"}per_page=${PER_PAGE}&page=${page}`;
    let response: Response;
    try {
      response = await fetch(url);
    } catch (error) {
      logger.error(`Falha de rede ao buscar o WordPress: ${(error as Error).message}`);
      break;
    }
    if (response.status === 400 && page > 1) break; // WP returns 400 past the last page
    if (!response.ok) {
      logger.error(`WordPress respondeu ${response.status} para ${url}`);
      break;
    }
    const batch = (await response.json()) as T[];
    all.push(...batch);
    const totalPages = Number(response.headers.get("x-wp-totalpages") ?? "1");
    if (page >= totalPages || batch.length === 0) break;
  }
  return all;
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
    content: post.content.rendered,
    author: embedded.author?.[0]?.name ?? "Proc Group",
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
      const all = await fetchAllWpItems<WpPost>(endpoint, logger);

      if (all.length === 0) {
        // Keep whatever was cached from a previous successful build rather than
        // wiping the blog when WordPress is briefly unreachable.
        logger.warn("Nenhum post retornado; mantendo o conteúdo em cache do build anterior.");
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
      const all = await fetchAllWpItems<WpPage>(endpoint, logger);

      if (all.length === 0) {
        logger.warn("Nenhuma página retornada; mantendo o conteúdo em cache do build anterior.");
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
          content: raw.content.rendered,
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
