// renderSync, não render: o `render` do ultrahtml devolve Promise, e manter
// esta função síncrona evita propagar async por todo o loader.
import { ELEMENT_NODE, parse, renderSync, walkSync } from "ultrahtml";

/**
 * Sanitiza o HTML que vem do WordPress antes de virar HTML estático.
 *
 * O conteúdo é próprio, então isto não é defesa contra um autor anônimo — é
 * contenção de raio de explosão. Hoje o corpo dos posts entra inteiro no site
 * via `<Content />`; se o WordPress for comprometido (plugin, credencial
 * vazada, autor com `unfiltered_html`), qualquer `<script>` injetado lá passa
 * a rodar em www.procgroup.com.br, na mesma origem do site institucional.
 *
 * Verificado no conteúdo atual: os 16 posts e a página de privacidade usam
 * apenas p, strong, li, br, h1–h5, ul, ol, div, a, em — nenhum script, iframe,
 * form, handler `on*` ou `javascript:`. A lista abaixo cobre isso com folga,
 * incluindo marcação que um post ainda pode vir a usar (tabelas, imagens,
 * citações, código), então sanitizar não muda nada do que está publicado.
 */

/** Tags que podem sobreviver. O que não está aqui é removido com o conteúdo. */
const ALLOWED_TAGS = new Set([
  // texto
  "p", "br", "hr", "span", "div", "blockquote", "pre", "code",
  "strong", "b", "em", "i", "u", "s", "small", "sup", "sub", "mark", "abbr", "time",
  // títulos
  "h1", "h2", "h3", "h4", "h5", "h6",
  // listas
  "ul", "ol", "li", "dl", "dt", "dd",
  // links e mídia
  "a", "img", "figure", "figcaption", "picture", "source",
  // tabelas
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "colgroup", "col",
]);

/**
 * Removidas junto com o conteúdo — não basta desembrulhar. `script` é óbvio;
 * `style` e `link` permitem exfiltrar dados via CSS; `iframe`, `object` e
 * `embed` carregam origem externa; `form`, `input` e `button` permitiriam
 * montar um phishing dentro de uma página legítima do domínio; `base`
 * sequestraria todos os caminhos relativos da página.
 */
const DROPPED_TAGS = new Set([
  "script", "style", "link", "meta", "base", "title",
  "iframe", "object", "embed", "applet", "frame", "frameset",
  "form", "input", "button", "select", "textarea", "option", "label",
  "svg", "math", "template", "slot", "noscript",
]);

/** Esquemas de URL aceitos em href/src. */
const SAFE_SCHEME = /^(https?:|mailto:|tel:|#|\/|\.\/|\.\.\/)/i;

function isSafeUrl(value: string): boolean {
  const v = value.trim();
  if (v === "") return false;
  // `javascript:`, `data:` e `vbscript:` são os vetores clássicos aqui. Aceitar
  // só o que se reconhece é mais seguro que tentar listar o que se recusa.
  return SAFE_SCHEME.test(v);
}

export function sanitizeWpHtml(html: string): string {
  if (!html) return html;

  const doc = parse(html);

  // A remoção é adiada: mexer em `children` durante a travessia embaralha o
  // percurso e faz o walk pular nós irmãos.
  const dropNodes: Array<{ parent: any; node: any }> = [];
  const unwrapNodes: Array<{ parent: any; node: any }> = [];
  const headings: any[] = [];

  walkSync(doc, (node: any, parent: any) => {
    if (node.type !== ELEMENT_NODE) return;
    const name = String(node.name || "").toLowerCase();

    if (/^h[1-6]$/.test(name)) headings.push(node);

    if (DROPPED_TAGS.has(name)) {
      if (parent) dropNodes.push({ parent, node });
      return;
    }
    if (!ALLOWED_TAGS.has(name)) {
      // Tag desconhecida (custom element, resto de plugin): descarta a tag mas
      // preserva o texto, para não sumir com conteúdo legítimo por engano.
      if (parent) unwrapNodes.push({ parent, node });
      return;
    }

    // Atributos: apagar durante a travessia é seguro, não altera a árvore.
    for (const key of Object.keys(node.attributes ?? {})) {
      const lower = key.toLowerCase();
      // Qualquer handler de evento. Testar o prefixo cobre eventos que ainda
      // nem existem — uma lista de nomes (onclick, onerror…) nasce incompleta.
      if (lower.startsWith("on")) {
        delete node.attributes[key];
        continue;
      }
      if (lower === "style") {
        delete node.attributes[key];
        continue;
      }
      if ((lower === "href" || lower === "src" || lower === "srcset" || lower === "action" || lower === "formaction")
        && !isSafeUrl(String(node.attributes[key] ?? ""))) {
        delete node.attributes[key];
      }
    }
  });

  // A página já tem um <h1>: o título do post. Se o corpo vindo do WordPress
  // trouxer outro, o documento passa a ter vários h1 e o outline quebra — um
  // post publicado hoje tem SETE. Nesse caso todos os níveis descem um degrau
  // (h1→h2, h2→h3…), preservando a hierarquia relativa que o autor escreveu.
  //
  // O rebaixamento é condicional de propósito: os posts corretos já começam em
  // h2, e descê-los criaria um salto h1→h3 — trocaria um defeito por outro.
  if (headings.some((h) => String(h.name).toLowerCase() === "h1")) {
    for (const h of headings) {
      const nivel = Number(String(h.name).slice(1));
      h.name = `h${Math.min(nivel + 1, 6)}`;
    }
  }

  for (const { parent, node } of dropNodes) {
    parent.children = parent.children.filter((c: any) => c !== node);
  }
  for (const { parent, node } of unwrapNodes) {
    const i = parent.children.indexOf(node);
    if (i >= 0) parent.children.splice(i, 1, ...(node.children ?? []));
  }

  return renderSync(doc);
}
