/** Prefixes an absolute internal path with the site's configured base path (e.g. GitHub Pages project subpath). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (!path.startsWith("/")) return path;
  return path === "/" ? base + "/" : base + path;
}
