import { WHATSAPP_DEMO } from "./contact";
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

/** Navegação principal, com rótulos e hrefs no idioma informado (hrefs já com base path). */
export function getMainNav(lang: Locale): NavItem[] {
  const t = useTranslations(lang).nav;
  const L = (path: string) => localizePath(path, lang);
  return [
    { id: "home", label: t.home, href: L("/") },
    { id: "empresa", label: t.empresa, href: L("/empresa") },
    { id: "plataforma", label: t.plataforma, href: L("/plataforma-proc-ai") },
    {
      id: "solucoes",
      label: t.solucoes,
      href: L("/solucoes"),
      children: [
        { label: t.sol.cidades.label, href: L("/solucoes/cidades-inteligentes"), description: t.sol.cidades.desc },
        { label: t.sol.seguranca.label, href: L("/solucoes/seguranca-corporativa"), description: t.sol.seguranca.desc },
        { label: t.sol.ti.label, href: L("/solucoes/infraestrutura-de-ti"), description: t.sol.ti.desc },
        { label: t.sol.ia.label, href: L("/solucoes/ia-industrial"), description: t.sol.ia.desc },
      ],
    },
    // Segundo eixo de navegação (por segmento de comprador, não por linha de produto).
    {
      id: "segmentos",
      label: t.segmentos,
      href: L("/solucoes"),
      children: [
        { label: t.seg.governo.label, href: L("/solucoes/cidades-inteligentes"), description: t.seg.governo.desc },
        { label: t.seg.empresas.label, href: L("/solucoes/seguranca-corporativa"), description: t.seg.empresas.desc },
        { label: t.seg.industria.label, href: L("/solucoes/ia-industrial"), description: t.seg.industria.desc },
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

/** CTA principal ("Solicitar Demonstração") — link de WhatsApp (externo). */
export function getCtaNav(lang: Locale) {
  return { label: useTranslations(lang).nav.cta, href: WHATSAPP_DEMO };
}
