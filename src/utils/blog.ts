import type { CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;
export type BlogCategory = BlogPost["data"]["categories"][number];

/** WordPress' default category. Marketing leaves it on every post, so it never
    identifies what a post is about and its archive would just duplicate /blog. */
export const CATCH_ALL_CATEGORY = "tudo-sobre-tecnologia";

/** Published as the standalone "Agenda de Eventos" page, not a category archive. */
export const EVENTS_CATEGORY = "eventos";

// Each category gets its own hue rather than a shade of the brand red, so
// chips/tags are told apart at a glance instead of all reading as "red."
// Brand red stays reserved for CTAs and the "Novidades" category, which
// benefits from reading as the most attention-grabbing one.
const CATEGORY_COLORS: Record<string, string> = {
  [EVENTS_CATEGORY]: "var(--tag-amber)",
  novidades: "var(--red-600)",
  [CATCH_ALL_CATEGORY]: "var(--tag-teal)",
};

export function categoryColor(slug?: string): string {
  return (slug ? CATEGORY_COLORS[slug] : undefined) ?? "var(--tag-teal)";
}

export function categoryHref(slug: string): string {
  if (slug === EVENTS_CATEGORY) return "/eventos";
  if (slug === CATCH_ALL_CATEGORY) return "/blog";
  return `/blog/categoria/${slug}`;
}

export function byNewest(a: BlogPost, b: BlogPost): number {
  return b.data.date.valueOf() - a.data.date.valueOf();
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

/** Machine-readable date for <time datetime> and schema.org. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function collectCategories(posts: BlogPost[]): BlogCategory[] {
  const seen = new Map<string, BlogCategory>();
  for (const post of posts) {
    for (const category of post.data.categories) seen.set(category.slug, category);
  }
  return [...seen.values()];
}

export function postsInCategory(posts: BlogPost[], slug: string): BlogPost[] {
  return posts.filter((post) => post.data.categories.some((c) => c.slug === slug)).sort(byNewest);
}
