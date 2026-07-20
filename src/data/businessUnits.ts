import { defaultLocale, type Locale } from "../i18n/config";

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

// Estrutura estável (independe do idioma): slug, cor, href e o badge curto.
interface UnitBase {
  slug: string;
  href: string;
  color: string;
  shortName: string;
}

const unitsBase: UnitBase[] = [
  { slug: "cidades-inteligentes", href: "/solucoes/cidades-inteligentes", color: "var(--red-500)", shortName: "Smart Cities" },
  { slug: "seguranca-corporativa", href: "/solucoes/seguranca-corporativa", color: "var(--navy-900)", shortName: "Corporate Security" },
  { slug: "infraestrutura-de-ti", href: "/solucoes/infraestrutura-de-ti", color: "var(--red-600)", shortName: "IT Infrastructure" },
  { slug: "ia-industrial", href: "/solucoes/ia-industrial", color: "var(--navy-700)", shortName: "Industrial AI" },
];

interface UnitCopy {
  name: string;
  tagline: string;
  description: string;
  team: string;
  solutions: string[];
}

// Cópia traduzível de cada unidade, por idioma. Fonte única — consumida pela
// home, páginas de solução, cases, evento, mandala e diagrama de fluxo.
const unitsCopy: Record<Locale, Record<string, UnitCopy>> = {
  pt: {
    "cidades-inteligentes": {
      name: "Cidades Inteligentes",
      tagline: "Segurança pública e mobilidade urbana com IA",
      description:
        "Plataforma de videomonitoramento inteligente, reconhecimento facial e analytics para centros de operações integrados — batizada de Pato 360°, referência nacional em segurança pública inteligente, apoiando governos na proteção de cidades e no combate à criminalidade.",
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
    "seguranca-corporativa": {
      name: "Segurança Corporativa",
      tagline: "Proteção inteligente para empresas e indústrias",
      description:
        "Soluções de videomonitoramento com IA, controle de acesso facial e gestão de alarmes para proteger patrimônio, pessoas e operações corporativas com monitoramento remoto 24x7.",
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
    "infraestrutura-de-ti": {
      name: "Infraestrutura de TI",
      tagline: "Alta disponibilidade para operações críticas",
      description:
        "Cloud, backup, NOC e governança de infraestrutura para empresas que precisam de continuidade operacional, segurança de dados e performance em escala.",
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
    "ia-industrial": {
      name: "IA Industrial",
      tagline: "Visão computacional para a indústria 4.0",
      description:
        "Inspeção visual automatizada, controle de qualidade e rastreabilidade com Edge AI, reduzindo perdas e aumentando a eficiência de linhas de produção.",
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
  },
  en: {
    "cidades-inteligentes": {
      name: "Smart Cities",
      tagline: "Public safety and urban mobility powered by AI",
      description:
        "An intelligent video-surveillance, facial-recognition and analytics platform for integrated operations centers — named Pato 360°, a national benchmark in smart public safety, helping governments protect cities and fight crime.",
      team: "Public Safety specialist team",
      solutions: [
        "Facial Recognition",
        "License Plate Reading (LPR)",
        "Intelligent Video Surveillance",
        "Digital Wall",
        "Integrated Operations Center",
        "Analytics",
        "Panic Button",
        "Urban Mobility",
        "School Monitoring",
      ],
    },
    "seguranca-corporativa": {
      name: "Corporate Security",
      tagline: "Intelligent protection for businesses and industries",
      description:
        "AI-powered video surveillance, facial access control and alarm management to protect assets, people and corporate operations with 24x7 remote monitoring.",
      team: "Electronic Security specialist team",
      solutions: [
        "AI Video Surveillance",
        "Facial Access Control",
        "Visitor Management",
        "Perimeter Monitoring",
        "Alarm Management",
        "Facial Recognition",
        "Parking LPR",
        "Analytics",
        "Remote Monitoring",
      ],
    },
    "infraestrutura-de-ti": {
      name: "IT Infrastructure",
      tagline: "High availability for mission-critical operations",
      description:
        "Cloud, backup, NOC and infrastructure governance for companies that need operational continuity, data security and performance at scale.",
      team: "Critical Infrastructure specialist team",
      solutions: [
        "Cloud",
        "Backup",
        "NOC",
        "Monitoring",
        "Firewall",
        "Service Desk",
        "Governance",
        "Infrastructure",
        "Database",
        "Virtualization",
      ],
    },
    "ia-industrial": {
      name: "Industrial AI",
      tagline: "Computer vision for Industry 4.0",
      description:
        "Automated visual inspection, quality control and traceability with Edge AI, reducing losses and boosting production-line efficiency.",
      team: "Industrial Computer Vision specialist team",
      solutions: [
        "Quality Control",
        "Visual Inspection",
        "Counting",
        "OCR",
        "Traceability",
        "Analytics",
        "Edge AI",
        "Defect Detection",
      ],
    },
  },
  es: {
    "cidades-inteligentes": {
      name: "Ciudades Inteligentes",
      tagline: "Seguridad pública y movilidad urbana con IA",
      description:
        "Plataforma de videovigilancia inteligente, reconocimiento facial y analytics para centros de operaciones integrados — llamada Pato 360°, referencia nacional en seguridad pública inteligente, que apoya a los gobiernos en la protección de ciudades y el combate a la criminalidad.",
      team: "Equipo especializado en Seguridad Pública",
      solutions: [
        "Reconocimiento Facial",
        "Lectura de Placas (LPR)",
        "Videovigilancia Inteligente",
        "Muralla Digital",
        "Centro Integrado de Operaciones",
        "Analytics",
        "Botón de Seguridad",
        "Movilidad Urbana",
        "Monitoreo Escolar",
      ],
    },
    "seguranca-corporativa": {
      name: "Seguridad Corporativa",
      tagline: "Protección inteligente para empresas e industrias",
      description:
        "Soluciones de videovigilancia con IA, control de acceso facial y gestión de alarmas para proteger patrimonio, personas y operaciones corporativas con monitoreo remoto 24x7.",
      team: "Equipo especializado en Seguridad Electrónica",
      solutions: [
        "Videovigilancia con IA",
        "Control de Acceso Facial",
        "Control de Visitantes",
        "Monitoreo Perimetral",
        "Gestión de Alarmas",
        "Reconocimiento Facial",
        "LPR para Estacionamientos",
        "Analytics",
        "Monitoreo Remoto",
      ],
    },
    "infraestrutura-de-ti": {
      name: "Infraestructura de TI",
      tagline: "Alta disponibilidad para operaciones críticas",
      description:
        "Cloud, backup, NOC y gobernanza de infraestructura para empresas que necesitan continuidad operativa, seguridad de datos y rendimiento a escala.",
      team: "Equipo especializado en Infraestructura Crítica",
      solutions: [
        "Cloud",
        "Backup",
        "NOC",
        "Monitoreo",
        "Firewall",
        "Service Desk",
        "Gobernanza",
        "Infraestructura",
        "Base de Datos",
        "Virtualización",
      ],
    },
    "ia-industrial": {
      name: "IA Industrial",
      tagline: "Visión artificial para la industria 4.0",
      description:
        "Inspección visual automatizada, control de calidad y trazabilidad con Edge AI, reduciendo pérdidas y aumentando la eficiencia de las líneas de producción.",
      team: "Equipo especializado en Visión Artificial Industrial",
      solutions: [
        "Control de Calidad",
        "Inspección Visual",
        "Conteo",
        "OCR",
        "Trazabilidad",
        "Analytics",
        "Edge AI",
        "Detección de Defectos",
      ],
    },
  },
};

/** Unidades de negócio no idioma informado. */
export function getBusinessUnits(lang: Locale): BusinessUnit[] {
  return unitsBase.map((base) => {
    const copy = unitsCopy[lang][base.slug];
    return { ...base, ...copy };
  });
}

/** Uma unidade de negócio pelo slug, no idioma informado. */
export function getBusinessUnit(slug: string, lang: Locale = defaultLocale): BusinessUnit | undefined {
  return getBusinessUnits(lang).find((u) => u.slug === slug);
}

// Compat: consumidores que ainda não passam idioma recebem PT.
export const businessUnits: BusinessUnit[] = getBusinessUnits(defaultLocale);
