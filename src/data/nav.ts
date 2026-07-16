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
  { label: "Cases", href: "/cases" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];

export const ctaNav = { label: "Solicitar Demonstração", href: "/contato?intent=demo" };
