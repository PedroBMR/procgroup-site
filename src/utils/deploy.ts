/**
 * Onde o build está sendo publicado — teste ou produção.
 *
 * Fonte única para tudo que precisa se comportar diferente enquanto o site
 * ainda é preview. Todo mundo decide pelo `site` do astro.config.mjs, e não
 * por uma flag que alguém tem que lembrar de virar:
 *
 *   - `src/pages/robots.txt.ts`   — Disallow em teste, Allow + sitemap em produção
 *   - `src/layouts/BaseLayout.astro` — meta noindex em teste
 *   - `astro.config.mjs`          — sitemap só é gerado em produção
 *
 * Na virada de domínio (PUBLICACAO.md, seção 3.1) basta trocar `site` e `base`:
 * os três se corrigem sozinhos. Isso é de propósito — um `noindex` esquecido em
 * produção faz o site oficial nascer invisível no Google, e o erro não quebra
 * nada visualmente, então costuma levar meses até alguém notar.
 *
 * ⚠️ O astro.config.mjs NÃO importa este arquivo (config .mjs não carrega .ts).
 * Ele repete a checagem inline, com um comentário apontando para cá. Se a lista
 * abaixo mudar, mude lá também.
 */
export const HOSTS_DE_PRODUCAO = ["www.procgroup.com.br", "procgroup.com.br"];

/** `true` só quando o build está saindo no domínio real da Proc. */
export function ehProducao(host: string | undefined | null): boolean {
  return HOSTS_DE_PRODUCAO.includes(host ?? "");
}
