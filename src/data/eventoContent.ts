// Conteúdo trilíngue da landing de evento (/evento), acessada via chaveiro NFC.
// A landing tem seletor de idioma PT/EN/ES na própria página (não usa rotas /en /es,
// pois o chaveiro aponta sempre para /evento). O PT dos cards de solução vem de
// businessUnits.ts; aqui ficam apenas as traduções EN/ES e toda a UI da landing.
import type { Locale } from "../i18n/config";

/** Textos da interface da landing (hero + seções + formulário), por idioma. */
export interface EventoUI {
  langName: string;
  /** <title> do documento quando events.ts não define cidade (o caso com cidade é montado em evento.astro). */
  docTitle: string;
  /** meta[name=description]; também é a og:description do SSR (PT). */
  metaDescription: string;
  /** Texto do skip link (acessibilidade). */
  skipLink: string;
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  waBtn: string;
  ghostBtn: string;
  /** Mensagem já preenchida no WhatsApp. */
  waMsg: string;
  solutionsKicker: string;
  /** Rótulos das provas sociais, na ordem: clientes, anos. */
  proofLabels: [string, string];
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
    docTitle: "Proc: Soluções de IA, Segurança e Infraestrutura",
    metaDescription: "Conheça as soluções da Proc e fale com um especialista.",
    skipLink: "Pular para o conteúdo",
    eyebrow: "Proc no evento",
    titulo: "Tecnologia inteligente para proteger, conectar e transformar",
    subtitulo:
      "IA, Visão Computacional, Segurança e Infraestrutura de TI com engenharia própria. Conheça as soluções da Proc e fale com um especialista.",
    waBtn: "Falar no WhatsApp",
    ghostBtn: "Deixar meu contato",
    waMsg: "Olá! Conheci a Proc num evento e quero saber mais sobre as soluções de vocês.",
    solutionsKicker: "O que a Proc traz para você",
    proofLabels: ["Clientes atendidos", "Anos de experiência"],
    why: [
      "IA própria: LPR e analytics desenvolvidos pela Proc.",
      "Equipes especializadas por segmento, não generalistas.",
      "Plataforma de alta disponibilidade, operando 24/7.",
    ],
    formKicker: "Quer que a gente te chame?",
    formTitle: "Deixe seu contato. Retornamos rapidinho.",
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
    docTitle: "Proc: AI, Security and IT Infrastructure Solutions",
    metaDescription: "Explore Proc's solutions and talk to a specialist.",
    skipLink: "Skip to content",
    eyebrow: "Proc at the event",
    titulo: "Intelligent technology to protect, connect, and transform",
    subtitulo:
      "AI, Computer Vision, Security and IT Infrastructure built by our own engineering. Explore Proc's solutions and talk to a specialist.",
    waBtn: "Chat on WhatsApp",
    ghostBtn: "Leave my contact",
    waMsg: "Hi! I met Proc at an event and I'd like to know more about your solutions.",
    solutionsKicker: "What Proc brings to you",
    proofLabels: ["Clients served", "Years of experience"],
    why: [
      "In-house AI: LPR and analytics built by Proc.",
      "Specialist teams per segment, not generalists.",
      "A high-availability platform, running 24/7.",
    ],
    formKicker: "Want us to reach out?",
    formTitle: "Leave your contact. We'll get back quickly.",
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
    docTitle: "Proc: Soluciones de IA, Seguridad e Infraestructura",
    metaDescription: "Conoce las soluciones de Proc y habla con un especialista.",
    skipLink: "Saltar al contenido",
    eyebrow: "Proc en el evento",
    titulo: "Tecnología inteligente para proteger, conectar y transformar",
    subtitulo:
      "IA, Visión Artificial, Seguridad e Infraestructura de TI con ingeniería propia. Conoce las soluciones de Proc y habla con un especialista.",
    waBtn: "Hablar por WhatsApp",
    ghostBtn: "Dejar mi contacto",
    waMsg: "¡Hola! Conocí a Proc en un evento y quiero saber más sobre sus soluciones.",
    solutionsKicker: "Lo que Proc trae para ti",
    proofLabels: ["Clientes atendidos", "Años de experiencia"],
    why: [
      "IA propia: LPR y analytics desarrollados por Proc.",
      "Equipos especializados por segmento, no generalistas.",
      "Plataforma de alta disponibilidad, operando 24/7.",
    ],
    formKicker: "¿Quieres que te contactemos?",
    formTitle: "Deja tu contacto. Te respondemos enseguida.",
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
    "ambientes-inteligentes": "Ambientes",
    "infraestrutura-de-ti": "Infra TI",
    "ia-industrial": "Indústria",
  },
  en: {
    "ambientes-inteligentes": "Environments",
    "infraestrutura-de-ti": "IT Infra",
    "ia-industrial": "Industry",
  },
  es: {
    "ambientes-inteligentes": "Ambientes",
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
    "ambientes-inteligentes": {
      name: "Smart Environments",
      tagline: "Intelligent protection for businesses and industries",
      description:
        "AI-powered video surveillance, access control and alarm management to protect assets, people and corporate operations, with the platform running 24x7 and alerting your team.",
      solutions: [
        "AI Video Surveillance",
        "Contactless Access Control",
        "Visitor Management",
        "Perimeter Monitoring",
        "Alarm Management",
        "Access Audit",
        "Parking LPR",
        "Analytics",
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
    "ambientes-inteligentes": {
      name: "Ambientes Inteligentes",
      tagline: "Protección inteligente para empresas e industrias",
      description:
        "Soluciones de videovigilancia con IA, control de acceso y gestión de alarmas para proteger patrimonio, personas y operaciones corporativas, con la plataforma operando 24x7 y alertando a tu equipo.",
      solutions: [
        "Videovigilancia con IA",
        "Control de Acceso sin Contacto",
        "Control de Visitantes",
        "Monitoreo Perimetral",
        "Gestión de Alarmas",
        "Auditoría de Acceso",
        "LPR para Estacionamientos",
        "Analytics",
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
