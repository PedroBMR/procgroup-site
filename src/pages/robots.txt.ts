import type { APIRoute } from "astro";

/**
 * robots.txt gerado a partir do `site` configurado, e não escrito à mão.
 *
 * O motivo é concreto: enquanto o site roda em pedrobmr.github.io como
 * ambiente de teste, ele publica `canonical` e `hreflang` apontando para
 * www.procgroup.com.br — que hoje serve o WordPress antigo. Indexado, esse
 * preview canonicaliza para outro site. Um robots.txt fixo resolveria só um
 * dos dois estados e alguém teria que lembrar de trocá-lo na virada.
 *
 * Assim: qualquer host que não seja o de produção sai bloqueado; ao mudar
 * `site` em astro.config.mjs para o domínio real, o arquivo passa a liberar a
 * indexação e a apontar o sitemap, sem ninguém precisar lembrar de nada.
 */
const HOSTS_DE_PRODUCAO = ["www.procgroup.com.br", "procgroup.com.br"];

export const GET: APIRoute = ({ site }) => {
  const host = site?.host ?? "";
  const ehProducao = HOSTS_DE_PRODUCAO.includes(host);

  const corpo = ehProducao
    ? [
        "User-agent: *",
        "Allow: /",
        "",
        `Sitemap: ${new URL("sitemap-index.xml", site).href}`,
        "",
      ].join("\n")
    : [
        `# Ambiente de teste (${host || "host não configurado"}).`,
        "# Não indexar: o canonical destas páginas aponta para o domínio de",
        "# produção, que hoje serve outro site.",
        "User-agent: *",
        "Disallow: /",
        "",
      ].join("\n");

  return new Response(corpo, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
