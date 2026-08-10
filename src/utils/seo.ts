/** Corta um texto para uso em meta description (~155 chars), em limite de
    palavra e com reticências. A SERP trunca por volta de 160; excerpts do
    WordPress chegam a 400+ chars e iam inteiros para a tag. */
export function clampDescription(text: string, max = 155): string {
  const t = text.trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.!?…]+$/, "") + "…";
}
