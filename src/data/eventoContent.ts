// Conteúdo trilíngue da landing de evento (/evento), acessada via chaveiro NFC.
// A landing tem seletor de idioma PT/EN/ES na própria página (não usa rotas /en /es,
// pois o chaveiro aponta sempre para /evento). O que muda a cada evento fica em
// src/data/events.ts; aqui ficam a UI fixa da landing e as 3 áreas de negócio.
import type { Locale } from "../i18n/config";

/** Textos fixos da interface da landing, por idioma. */
export interface EventoUI {
  langName: string;
  /** Texto do skip link (acessibilidade). */
  skipLink: string;
  waBtn: string;
  ghostBtn: string;
  lblQuando: string;
  lblOnde: string;
  lblEstande: string;
  comoChegar: string;
  solutionsKicker: string;
  /** Link de cada card de área para a página dela no site (só em PT). */
  areaLink: string;
  diagKicker: string;
  diagTitle: string;
  diagText: string;
  diagBtn: string;
  mapaBtn: string;
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

export const eventoUI: Record<Locale, EventoUI> = {
  pt: {
    langName: "Português",
    skipLink: "Pular para o conteúdo",
    waBtn: "Falar no WhatsApp",
    ghostBtn: "Deixar meu contato",
    lblQuando: "Quando",
    lblOnde: "Onde",
    lblEstande: "Estande",
    comoChegar: "Como chegar",
    solutionsKicker: "O que a PROC GROUP traz para você",
    areaLink: "Ver no site",
    diagKicker: "Diagnóstico gratuito",
    diagTitle: "Conte o seu desafio",
    diagText: "Se a PROC conseguir ajudar, você ganha 2 horas de consultoria gratuita com a nossa equipe.",
    diagBtn: "Quero meu diagnóstico",
    mapaBtn: "Explorar o mapa interativo",
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
    skipLink: "Skip to content",
    waBtn: "Chat on WhatsApp",
    ghostBtn: "Leave my contact",
    lblQuando: "When",
    lblOnde: "Where",
    lblEstande: "Booth",
    comoChegar: "Get directions",
    solutionsKicker: "What PROC GROUP brings to you",
    areaLink: "See on our site (PT)",
    diagKicker: "Free assessment",
    diagTitle: "Tell us your challenge",
    diagText: "If PROC can help, you get 2 hours of free consulting with our team.",
    diagBtn: "Get my assessment",
    mapaBtn: "Explore the interactive map",
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
    skipLink: "Saltar al contenido",
    waBtn: "Hablar por WhatsApp",
    ghostBtn: "Dejar mi contacto",
    lblQuando: "Cuándo",
    lblOnde: "Dónde",
    lblEstande: "Stand",
    comoChegar: "Cómo llegar",
    solutionsKicker: "Lo que PROC GROUP trae para ti",
    areaLink: "Ver en el sitio (PT)",
    diagKicker: "Diagnóstico gratuito",
    diagTitle: "Cuéntanos tu desafío",
    diagText: "Si PROC puede ayudar, recibes 2 horas de consultoría gratuita con nuestro equipo.",
    diagBtn: "Quiero mi diagnóstico",
    mapaBtn: "Explorar el mapa interactivo",
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

/** Card de área de negócio na landing. */
export interface EventoArea {
  tag: string;
  name: string;
  tagline: string;
  solutions: string[];
  /** Página da área no site (as três só existem em PT). */
  href: string;
}

// As 3 áreas do site publicado (2026-10-21). Vocabulário tirado das páginas de cada área.
const HREF = {
  infra: "/infraestrutura-de-ti/",
  nuvem: "/hospedagem-em-nuvem/",
  visao: "/visao-computacional/",
};

export const eventoAreas: Record<Locale, EventoArea[]> = {
  pt: [
    {
      tag: "Infra TI",
      name: "Infraestrutura de TI",
      tagline: "Sustentação e governança para empresas que não podem parar",
      solutions: ["Sustentação de ambientes", "Backup em nuvem", "Firewall corporativo", "Antivírus corporativo", "Suporte técnico 24/7", "Checklist de abertura de lojas"],
      href: HREF.infra,
    },
    {
      tag: "Nuvem",
      name: "Hospedagem em Nuvem",
      tagline: "Sistemas, ERPs e aplicações hospedados com gestão completa",
      solutions: ["Proc Cloud em Pato Branco", "Oracle Cloud Infrastructure", "Hospedagem de ERP", "Escalabilidade", "Monitoramento e suporte 24/7"],
      href: HREF.nuvem,
    },
    {
      tag: "Visão",
      name: "Visão Computacional e Vídeo Analytics",
      tagline: "A Plataforma Proc transforma imagens de câmera em dados, indicadores e alertas",
      solutions: ["Fluxo de pessoas e veículos", "Controle de produção", "Inspeção de qualidade", "Estoque e expedição", "Alertas inteligentes"],
      href: HREF.visao,
    },
  ],
  en: [
    {
      tag: "IT Infra",
      name: "IT Infrastructure",
      tagline: "Support and governance for companies that can't stop",
      solutions: ["Environment support", "Cloud backup", "Corporate firewall", "Corporate antivirus", "24/7 technical support", "Store opening checklist"],
      href: HREF.infra,
    },
    {
      tag: "Cloud",
      name: "Cloud Hosting",
      tagline: "Systems, ERPs and applications hosted with full management",
      solutions: ["Proc Cloud in Pato Branco", "Oracle Cloud Infrastructure", "ERP hosting", "Scalability", "24/7 monitoring and support"],
      href: HREF.nuvem,
    },
    {
      tag: "Vision",
      name: "Computer Vision and Video Analytics",
      tagline: "The Proc Platform turns camera images into data, metrics and alerts",
      solutions: ["People and vehicle flow", "Production control", "Quality inspection", "Inventory and shipping", "Smart alerts"],
      href: HREF.visao,
    },
  ],
  es: [
    {
      tag: "Infra TI",
      name: "Infraestructura de TI",
      tagline: "Soporte y gobernanza para empresas que no pueden parar",
      solutions: ["Soporte de entornos", "Backup en la nube", "Firewall corporativo", "Antivirus corporativo", "Soporte técnico 24/7", "Checklist de apertura de tiendas"],
      href: HREF.infra,
    },
    {
      tag: "Nube",
      name: "Hosting en la Nube",
      tagline: "Sistemas, ERPs y aplicaciones alojados con gestión completa",
      solutions: ["Proc Cloud en Pato Branco", "Oracle Cloud Infrastructure", "Hosting de ERP", "Escalabilidad", "Monitoreo y soporte 24/7"],
      href: HREF.nuvem,
    },
    {
      tag: "Visión",
      name: "Visión Artificial y Video Analytics",
      tagline: "La Plataforma Proc transforma imágenes de cámara en datos, indicadores y alertas",
      solutions: ["Flujo de personas y vehículos", "Control de producción", "Inspección de calidad", "Inventario y expedición", "Alertas inteligentes"],
      href: HREF.visao,
    },
  ],
};
