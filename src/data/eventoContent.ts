// Conteúdo trilíngue da landing de evento (/evento), acessada via chaveiro NFC.
// A landing tem seletor de idioma PT/EN/ES na própria página (não usa rotas /en /es,
// pois o chaveiro aponta sempre para /evento). O PT dos cards de solução vem de
// businessUnits.ts; aqui ficam apenas as traduções EN/ES e toda a UI da landing.
import type { Locale } from "../i18n/config";

/** Textos da interface da landing (hero + seções + formulário), por idioma. */
export interface EventoUI {
  langName: string;
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  waBtn: string;
  ghostBtn: string;
  /** Mensagem já preenchida no WhatsApp. */
  waMsg: string;
  solutionsKicker: string;
  /** Rótulos das 4 provas sociais, na ordem: clientes, anos, satisfação, monitoramento. */
  proofLabels: [string, string, string, string];
  why: [string, string, string];
  formKicker: string;
  formTitle: string;
  fName: string;
  fPhone: string;
  fCity: string;
  fNamePh: string;
  fPhonePh: string;
  fCityPh: string;
  submit: string;
  submitting: string;
  sentOk: string;
  sentFail: string;
  sentBtn: string;
  footerFine: string;
}

// Hero PT: o texto genérico atual do evento. Para um evento específico, o PT
// continua editável em src/data/events.ts; ajuste aqui os equivalentes EN/ES.
export const eventoUI: Record<Locale, EventoUI> = {
  pt: {
    langName: "Português",
    eyebrow: "Proc no evento",
    titulo: "Tecnologia inteligente para proteger, conectar e transformar",
    subtitulo:
      "IA, Visão Computacional, Segurança e Infraestrutura de TI numa única plataforma. Conheça as soluções da Proc e fale com um especialista.",
    waBtn: "Falar no WhatsApp",
    ghostBtn: "Deixar meu contato",
    waMsg: "Olá! Conheci a Proc num evento e quero saber mais sobre as soluções de vocês.",
    solutionsKicker: "O que a Proc traz para você",
    proofLabels: ["Clientes atendidos", "Anos de experiência", "Satisfação dos clientes", "Monitoramento contínuo"],
    why: [
      "IA própria: reconhecimento facial, LPR e analytics desenvolvidos pela Proc.",
      "Equipes especializadas por segmento — não generalistas.",
      "Alta disponibilidade e monitoramento contínuo 24/7.",
    ],
    formKicker: "Quer que a gente te chame?",
    formTitle: "Deixe seu contato — retornamos rapidinho.",
    fName: "Nome",
    fPhone: "Telefone / WhatsApp",
    fCity: "Cidade",
    fNamePh: "Seu nome",
    fPhonePh: "(00) 00000-0000",
    fCityPh: "Sua cidade",
    submit: "Quero ser contatado",
    submitting: "Enviando...",
    sentOk: "Recebido! Vamos te chamar em breve.",
    sentFail: "Não deu para enviar. Fale pelo WhatsApp.",
    sentBtn: "Enviado ✓",
    footerFine: "Pato Branco · PR",
  },
  en: {
    langName: "English",
    eyebrow: "Proc at the event",
    titulo: "Intelligent technology to protect, connect, and transform",
    subtitulo:
      "AI, Computer Vision, Security, and IT Infrastructure on a single platform. Explore Proc's solutions and talk to a specialist.",
    waBtn: "Chat on WhatsApp",
    ghostBtn: "Leave my contact",
    waMsg: "Hi! I met Proc at an event and I'd like to know more about your solutions.",
    solutionsKicker: "What Proc brings to you",
    proofLabels: ["Clients served", "Years of experience", "Customer satisfaction", "Continuous monitoring"],
    why: [
      "In-house AI: facial recognition, LPR and analytics built by Proc.",
      "Specialist teams per segment — not generalists.",
      "High availability and 24/7 continuous monitoring.",
    ],
    formKicker: "Want us to reach out?",
    formTitle: "Leave your contact — we'll get back quickly.",
    fName: "Name",
    fPhone: "Phone / WhatsApp",
    fCity: "City",
    fNamePh: "Your name",
    fPhonePh: "(00) 00000-0000",
    fCityPh: "Your city",
    submit: "Contact me",
    submitting: "Sending...",
    sentOk: "Got it! We'll reach out soon.",
    sentFail: "Couldn't send. Reach us on WhatsApp.",
    sentBtn: "Sent ✓",
    footerFine: "Pato Branco · PR · Brazil",
  },
  es: {
    langName: "Español",
    eyebrow: "Proc en el evento",
    titulo: "Tecnología inteligente para proteger, conectar y transformar",
    subtitulo:
      "IA, Visión Artificial, Seguridad e Infraestructura de TI en una única plataforma. Conoce las soluciones de Proc y habla con un especialista.",
    waBtn: "Hablar por WhatsApp",
    ghostBtn: "Dejar mi contacto",
    waMsg: "¡Hola! Conocí a Proc en un evento y quiero saber más sobre sus soluciones.",
    solutionsKicker: "Lo que Proc trae para ti",
    proofLabels: ["Clientes atendidos", "Años de experiencia", "Satisfacción de clientes", "Monitoreo continuo"],
    why: [
      "IA propia: reconocimiento facial, LPR y analytics desarrollados por Proc.",
      "Equipos especializados por segmento — no generalistas.",
      "Alta disponibilidad y monitoreo continuo 24/7.",
    ],
    formKicker: "¿Quieres que te contactemos?",
    formTitle: "Deja tu contacto — te respondemos enseguida.",
    fName: "Nombre",
    fPhone: "Teléfono / WhatsApp",
    fCity: "Ciudad",
    fNamePh: "Tu nombre",
    fPhonePh: "(00) 00000-0000",
    fCityPh: "Tu ciudad",
    submit: "Quiero que me contacten",
    submitting: "Enviando...",
    sentOk: "¡Recibido! Te contactaremos pronto.",
    sentFail: "No se pudo enviar. Escríbenos por WhatsApp.",
    sentBtn: "Enviado ✓",
    footerFine: "Pato Branco · PR · Brasil",
  },
};

/** Tag curta (badge) de cada unidade, por idioma. */
export const unitTags: Record<Locale, Record<string, string>> = {
  pt: {
    "cidades-inteligentes": "Cidades",
    "seguranca-corporativa": "Corporativo",
    "infraestrutura-de-ti": "Infra TI",
    "ia-industrial": "Indústria",
  },
  en: {
    "cidades-inteligentes": "Smart Cities",
    "seguranca-corporativa": "Corporate",
    "infraestrutura-de-ti": "IT Infra",
    "ia-industrial": "Industry",
  },
  es: {
    "cidades-inteligentes": "Ciudades",
    "seguranca-corporativa": "Corporativo",
    "infraestrutura-de-ti": "Infra TI",
    "ia-industrial": "Industria",
  },
};

/** Copy EN/ES dos cards de solução (o PT vem de businessUnits.ts). */
export interface UnitI18n {
  name: string;
  tagline: string;
  description: string;
  solutions: string[];
}

export const eventoUnitsI18n: Record<"en" | "es", Record<string, UnitI18n>> = {
  en: {
    "cidades-inteligentes": {
      name: "Smart Cities",
      tagline: "Public safety and urban mobility powered by AI",
      description:
        "An intelligent video-surveillance, facial-recognition and analytics platform for integrated operations centers — named Pato 360°, a national benchmark in smart public safety, helping governments protect cities and fight crime.",
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
