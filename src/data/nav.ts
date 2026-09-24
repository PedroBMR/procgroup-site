import { whatsappDemo } from "./contact";
import { useTranslations, localizePath } from "../i18n/utils";
import type { Locale } from "../i18n/config";

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
 * Entre 2026-08-26 e 2026-08-27 esta função servia dois menus — um por público
 * — e recebia o lado como argumento. Cidade e governo saíram para um site
 * próprio; sobrou um menu só, e o argumento perdeu o sentido.
 */
export function getMainNav(lang: Locale): NavItem[] {
  const t = useTranslations(lang).nav;
  const L = (path: string) => localizePath(path, lang);

  return [
    { id: "home", label: t.home, href: L("/") },
    { id: "empresa", label: t.empresa, href: L("/empresa") },
    {
      id: "solucoes",
      label: t.solucoes,
      href: L("/solucoes"),
      children: [
        { label: t.sol.seguranca.label, href: L("/solucoes/ambientes-inteligentes"), description: t.sol.seguranca.desc },
        { label: t.sol.ia.label, href: L("/solucoes/ia-industrial"), description: t.sol.ia.desc },
        { label: t.sol.ti.label, href: L("/solucoes/infraestrutura-de-ti"), description: t.sol.ti.desc },
      ],
    },
    { id: "cases", label: t.cases, href: L("/cases") },
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
    { id: "contato", label: t.contato, href: L("/contato") },
  ];
}

/** Home do site — para onde o logo e o breadcrumb apontam. */
export function getHomeHref(lang: Locale): string {
  return localizePath("/", lang);
}

/** CTA principal ("Solicitar Demonstração") — link de WhatsApp (externo). */
export function getCtaNav(lang: Locale) {
  return { label: useTranslations(lang).nav.cta, href: whatsappDemo(lang) };
}
