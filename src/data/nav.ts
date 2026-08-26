import { WHATSAPP_DEMO } from "./contact";
import { useTranslations, localizePath } from "../i18n/utils";
import type { Locale } from "../i18n/config";
import { caminho, publicoDefs, type Publico } from "./audiencia";

export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  /** Chave estável (independe do idioma) para filtros no Header/Footer. */
  id: string;
  label: string;
  href: string;
  children?: NavChild[];
}

/**
 * Navegação principal, com rótulos e hrefs no idioma informado (hrefs já com
 * base path).
 *
 * `publico` decide qual menu sai:
 *  - "governo" / "empresas" → o menu daquele lado, só com o que o lado vê
 *    (a tabela de visibilidade é src/data/audiencia.ts).
 *  - null/omitido → vazio: fora dos lados só existem páginas de utilidade,
 *    que rodam com header mínimo (ver ARQUITETURA-DOIS-PUBLICOS.md, fase 4).
 */
export function getMainNav(lang: Locale, publico?: Publico | null): NavItem[] {
  const t = useTranslations(lang).nav;
  const L = (path: string) => localizePath(path, lang);

  if (publico === "governo") {
    const b = publicoDefs.governo.base;
    return [
      { id: "home", label: t.home, href: L(b) },
      { id: "empresa", label: t.empresa, href: L(`${b}/empresa`) },
      { id: "plataforma", label: t.plataforma, href: L(`${b}/plataforma-proc-ai`) },
      // Uma unidade só — link direto, sem dropdown de item único.
      { id: "solucoes", label: t.sol.cidades.label, href: L(`${b}/solucoes/cidades-inteligentes`) },
      { id: "cases", label: t.cases, href: L(`${b}/cases`) },
      { id: "contato", label: t.contato, href: L(`${b}/contato`) },
    ];
  }

  if (publico === "empresas") {
    const b = publicoDefs.empresas.base;
    return [
      { id: "home", label: t.home, href: L(b) },
      { id: "empresa", label: t.empresa, href: L(`${b}/empresa`) },
      { id: "plataforma", label: t.plataforma, href: L(`${b}/plataforma-proc-ai`) },
      {
        id: "solucoes",
        label: t.solucoes,
        href: L(`${b}/solucoes`),
        children: [
          { label: t.sol.seguranca.label, href: L(`${b}/solucoes/ambientes-inteligentes`), description: t.sol.seguranca.desc },
          { label: t.sol.ia.label, href: L(`${b}/solucoes/ia-industrial`), description: t.sol.ia.desc },
          { label: t.sol.ti.label, href: L(`${b}/solucoes/infraestrutura-de-ti`), description: t.sol.ti.desc },
        ],
      },
      { id: "cases", label: t.cases, href: L(`${b}/cases`) },
      // Blog e agenda são exclusivos deste lado (decisão de 2026-08-26; a
      // agenda é uma categoria do blog no WordPress e segue o blog).
      {
        id: "blog",
        label: t.blog,
        href: L("/blog"),
        children: [
          { label: t.blogMenu.todo.label, href: L("/blog"), description: t.blogMenu.todo.desc },
          { label: t.blogMenu.novidades.label, href: L("/blog/categoria/novidades"), description: t.blogMenu.novidades.desc },
          { label: t.blogMenu.agenda.label, href: L("/eventos"), description: t.blogMenu.agenda.desc },
        ],
      },
      { id: "contato", label: t.contato, href: L(`${b}/contato`) },
    ];
  }

  // Fora dos dois lados sobraram so paginas de utilidade (suporte, politica,
  // trabalhe-conosco, 404): header minimo, sem menu. As rotas de conteudo
  // comuns morreram na fase 4 — o menu que apontava para elas foi junto.
  return [];
}

/** Home do lado atual — logo e breadcrumb apontam para cá dentro de um lado. */
export function getHomeHref(lang: Locale, publico?: Publico | null): string {
  return localizePath(publico ? caminho(publico) : "/", lang);
}

/** CTA principal ("Solicitar Demonstração") — link de WhatsApp (externo). */
export function getCtaNav(lang: Locale) {
  return { label: useTranslations(lang).nav.cta, href: WHATSAPP_DEMO };
}
