import type { Locale } from "../i18n/config";

/**
 * Título e meta description de cada página, nos três idiomas.
 *
 * Nasceu em 2026-08-26 como `metaPorPublico.ts`, para impedir que os dois
 * lados do site — governo e corporativo — saíssem com títulos idênticos e o
 * Google escolhesse sozinho qual indexar. Em 2026-08-27 o lado público saiu
 * para um site próprio e sobrou um público só, então o eixo "público"
 * desapareceu e ficou o que sempre importou: cada página com o seu título.
 *
 * O título NÃO leva "Proc Group": o BaseLayout acrescenta.
 */
export type ChaveMeta = "home" | "empresa" | "contato" | "plataforma" | "cases";

interface Meta {
  title: string;
  description: string;
}

const meta: Record<Locale, Record<ChaveMeta, Meta>> = {
  pt: {
    home: {
      title: "Tecnologia para Empresas e Indústrias",
      description:
        "Controle de acesso facial, videomonitoramento com IA, inspeção visual e infraestrutura de TI gerenciada, integrados aos sistemas que sua empresa já usa.",
    },
    empresa: {
      title: "A Proc para Empresas e Indústrias",
      description:
        "Plataforma própria de IA e visão computacional, com engenharia, NOC e Service Desk da própria casa, para que a operação do cliente não pare.",
    },
    contato: {
      title: "Falar com a Proc: Empresas e Indústrias",
      description:
        "Fale com um especialista da Proc sobre controle de acesso, videomonitoramento com IA, inspeção industrial ou infraestrutura de TI gerenciada.",
    },
    plataforma: {
      title: "Proc AI Platform para Operações",
      description:
        "A plataforma de IA, visão computacional e analytics que conecta acesso, segurança, qualidade e infraestrutura numa operação só, por APIs abertas.",
    },
    cases: {
      title: "Aplicações da Plataforma",
      description:
        "O que a Proc AI Platform entrega em ambientes corporativos, indústrias e infraestrutura crítica, do acesso facial à inspeção visual na linha.",
    },
  },
  en: {
    home: {
      title: "Technology for Business and Industry",
      description:
        "Facial access control, AI video surveillance, visual inspection and managed IT infrastructure, integrated with the systems your company already uses.",
    },
    empresa: {
      title: "Proc for Business and Industry",
      description:
        "An in-house AI and computer vision platform, with our own engineering, NOC and Service Desk, so the client's operation does not stop.",
    },
    contato: {
      title: "Talk to Proc: Business and Industry",
      description:
        "Talk to a Proc specialist about access control, AI video surveillance, industrial inspection or managed IT infrastructure.",
    },
    plataforma: {
      title: "Proc AI Platform for Operations",
      description:
        "The AI, computer vision and analytics platform that connects access, security, quality and infrastructure into a single operation, through open APIs.",
    },
    cases: {
      title: "Platform Applications",
      description:
        "What the Proc AI Platform delivers across corporate environments, industry and critical infrastructure, from facial access to visual inspection on the line.",
    },
  },
  es: {
    home: {
      title: "Tecnología para Empresas e Industrias",
      description:
        "Control de acceso facial, videovigilancia con IA, inspección visual e infraestructura de TI gestionada, integrados a los sistemas que tu empresa ya usa.",
    },
    empresa: {
      title: "Proc para Empresas e Industrias",
      description:
        "Plataforma propia de IA y visión artificial, con ingeniería, NOC y Service Desk de la propia casa, para que la operación del cliente no se detenga.",
    },
    contato: {
      title: "Hablar con Proc: Empresas e Industrias",
      description:
        "Habla con un especialista de Proc sobre control de acceso, videovigilancia con IA, inspección industrial o infraestructura de TI gestionada.",
    },
    plataforma: {
      title: "Proc AI Platform para Operaciones",
      description:
        "La plataforma de IA, visión artificial y analytics que conecta acceso, seguridad, calidad e infraestructura en una sola operación, mediante APIs abiertas.",
    },
    cases: {
      title: "Aplicaciones de la Plataforma",
      description:
        "Lo que la Proc AI Platform entrega en entornos corporativos, industrias e infraestructura crítica, del acceso facial a la inspección visual en la línea.",
    },
  },
};

/** Meta da página, ou `null` fora das chaves conhecidas (páginas de utilidade). */
export function metaDaPagina(chave: ChaveMeta, lang: Locale): Meta | null {
  return meta[lang][chave] ?? null;
}
