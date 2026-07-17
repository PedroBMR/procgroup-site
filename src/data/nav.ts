import { WHATSAPP_DEMO } from "./contact";

export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Empresa", href: "/empresa" },
  { label: "Plataforma Proc AI", href: "/plataforma-proc-ai" },
  {
    label: "Soluções",
    href: "/solucoes",
    children: [
      {
        label: "Cidades Inteligentes",
        href: "/solucoes/cidades-inteligentes",
        description: "Segurança pública e mobilidade urbana com IA",
      },
      {
        label: "Segurança Corporativa",
        href: "/solucoes/seguranca-corporativa",
        description: "Videomonitoramento e controle de acesso para empresas",
      },
      {
        label: "Infraestrutura de TI",
        href: "/solucoes/infraestrutura-de-ti",
        description: "Cloud, NOC, backup e governança de TI",
      },
      {
        label: "IA Industrial",
        href: "/solucoes/ia-industrial",
        description: "Visão computacional para indústria 4.0",
      },
    ],
  },
  // Second navigation axis (by buyer segment, not by product line) — lets a
  // visitor find themselves ("eu sou prefeitura") instead of first having to
  // learn Proc's internal business-unit names. Same pattern as Genetec's
  // Products/Industries split and Axon's Public Safety/Federal/Enterprise nav.
  {
    label: "Segmentos",
    href: "/solucoes",
    children: [
      {
        label: "Governo e Segurança Pública",
        href: "/solucoes/cidades-inteligentes",
        description: "Prefeituras, secretarias e órgãos de segurança",
      },
      {
        label: "Empresas",
        href: "/solucoes/seguranca-corporativa",
        description: "Segurança corporativa, cloud e infraestrutura de TI",
      },
      {
        label: "Indústria",
        href: "/solucoes/ia-industrial",
        description: "Visão computacional para linhas de produção",
      },
    ],
  },
  { label: "Cases", href: "/cases" },
  {
    label: "Blog",
    href: "/blog",
    children: [
      { label: "Todo o conteúdo", href: "/blog", description: "Novidades, eventos e artigos técnicos" },
      { label: "Novidades", href: "/blog/categoria/novidades", description: "Lançamentos, projetos e institucional" },
      { label: "Agenda de Eventos", href: "/eventos", description: "Feiras e encontros com a Proc Group" },
    ],
  },
  { label: "Contato", href: "/contato" },
];

export const ctaNav = { label: "Solicitar Demonstração", href: WHATSAPP_DEMO };
