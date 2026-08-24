import type { APIRoute } from "astro";
import { ehProducao } from "../utils/deploy";

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
 *
 * ⚠️ ISOLADO, ESTE ARQUIVO NÃO PROTEGE NADA HOJE. Robô lê robots.txt só na raiz
 * da origem. Com `base: '/procgroup-site'`, ele é servido em
 * pedrobmr.github.io/procgroup-site/robots.txt, e o que vale para o domínio é
 * pedrobmr.github.io/robots.txt — que pertence a outro repositório. Quem tira o
 * preview da busca de verdade é a meta noindex do BaseLayout.astro. Este arquivo
 * fica porque passa a valer sozinho na virada, quando o site servir da raiz.
 */
export const GET: APIRoute = ({ site }) => {
  const host = site?.host ?? "";

  const corpo = ehProducao(host)
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
