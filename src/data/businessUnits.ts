export interface BusinessUnit {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  href: string;
  color: string;
  team: string;
  solutions: string[];
}

export const businessUnits: BusinessUnit[] = [
  {
    slug: "cidades-inteligentes",
    name: "Cidades Inteligentes",
    shortName: "Smart Cities",
    tagline: "Segurança pública e mobilidade urbana com IA",
    description:
      "Plataforma de videomonitoramento inteligente, reconhecimento facial e analytics para centros de operações integrados — batizada de Pato 360°, referência nacional em segurança pública inteligente, apoiando governos na proteção de cidades e no combate à criminalidade.",
    href: "/solucoes/cidades-inteligentes",
    color: "var(--red-500)",
    team: "Equipe especializada em Segurança Pública",
    solutions: [
      "Reconhecimento Facial",
      "Leitura de Placas (LPR)",
      "Videomonitoramento Inteligente",
      "Muralha Digital",
      "Centro Integrado de Operações",
      "Analytics",
      "Botão de Segurança",
      "Mobilidade Urbana",
      "Monitoramento Escolar",
    ],
  },
  {
    slug: "seguranca-corporativa",
    name: "Segurança Corporativa",
    shortName: "Corporate Security",
    tagline: "Proteção inteligente para empresas e indústrias",
    description:
      "Soluções de videomonitoramento com IA, controle de acesso facial e gestão de alarmes para proteger patrimônio, pessoas e operações corporativas com monitoramento remoto 24x7.",
    href: "/solucoes/seguranca-corporativa",
    color: "var(--navy-900)",
    team: "Equipe especializada em Segurança Eletrônica",
    solutions: [
      "Videomonitoramento com IA",
      "Controle de Acesso Facial",
      "Controle de Visitantes",
      "Monitoramento Perimetral",
      "Gestão de Alarmes",
      "Reconhecimento Facial",
      "LPR para Estacionamentos",
      "Analytics",
      "Monitoramento Remoto",
    ],
  },
  {
    slug: "infraestrutura-de-ti",
    name: "Infraestrutura de TI",
    shortName: "IT Infrastructure",
    tagline: "Alta disponibilidade para operações críticas",
    description:
      "Cloud, backup, NOC e governança de infraestrutura para empresas que precisam de continuidade operacional, segurança de dados e performance em escala.",
    href: "/solucoes/infraestrutura-de-ti",
    color: "var(--red-600)",
    team: "Equipe especializada em Infraestrutura Crítica",
    solutions: [
      "Cloud",
      "Backup",
      "NOC",
      "Monitoramento",
      "Firewall",
      "Service Desk",
      "Governança",
      "Infraestrutura",
      "Banco de Dados",
      "Virtualização",
    ],
  },
  {
    slug: "ia-industrial",
    name: "IA Industrial",
    shortName: "Industrial AI",
    tagline: "Visão computacional para a indústria 4.0",
    description:
      "Inspeção visual automatizada, controle de qualidade e rastreabilidade com Edge AI, reduzindo perdas e aumentando a eficiência de linhas de produção.",
    href: "/solucoes/ia-industrial",
    color: "var(--navy-700)",
    team: "Equipe especializada em Visão Computacional Industrial",
    solutions: [
      "Controle de Qualidade",
      "Inspeção Visual",
      "Contagem",
      "OCR",
      "Rastreabilidade",
      "Analytics",
      "Edge AI",
      "Detecção de Defeitos",
    ],
  },
];

export function getBusinessUnit(slug: string) {
  return businessUnits.find((u) => u.slug === slug);
}
