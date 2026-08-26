import type { Locale } from "../i18n/config";
import type { Publico } from "./audiencia";

/**
 * Título e meta description por lado do site.
 *
 * Existe porque os dois lados instanciam os MESMOS componentes de página: sem
 * isto, `/governo/empresa` e `/empresas/empresa` saem com título e descrição
 * idênticos, e o Google escolhe uma das duas para indexar — sem que a Proc
 * controle qual. Medido em 2026-08-26, antes desta correção: empresa 98% de
 * texto igual, plataforma 98%, contato 96%, e `<title>` idêntico em TODOS os
 * pares, inclusive entre a raiz e a home do governo.
 *
 * O corpo das páginas ainda é o mesmo texto filtrado — a copy por público está
 * em revisão (COPY-DOIS-PUBLICOS.md). Título e descrição vêm antes porque são
 * o sinal mais forte de duplicata e o mais barato de corrigir.
 *
 * O título NÃO leva "Proc Group": o BaseLayout acrescenta.
 */
export type ChaveMeta = "home" | "empresa" | "contato" | "plataforma" | "cases";

interface Meta {
  title: string;
  description: string;
}

const meta: Record<Publico, Record<Locale, Record<ChaveMeta, Meta>>> = {
  governo: {
    pt: {
      home: {
        title: "Tecnologia para Governos e Cidades",
        description:
          "Videomonitoramento inteligente, reconhecimento facial, leitura de placas e centro integrado de operações para municípios — com contratação via CPSI, Lei Complementar 182/2021.",
      },
      empresa: {
        title: "A Proc para o Setor Público",
        description:
          "Engenharia própria de IA e visão computacional aplicada à segurança pública, com solução municipal entregue via CPSI e integrada a sistemas estaduais e federais.",
      },
      contato: {
        title: "Falar com a Proc — Governo e Cidades",
        description:
          "Fale com a Proc sobre videomonitoramento inteligente para o seu município e sobre o caminho da contratação via CPSI, do diagnóstico à implantação.",
      },
      plataforma: {
        title: "Proc AI Platform para Cidades",
        description:
          "A plataforma de IA, visão computacional e analytics que equipa o centro integrado de operações do município e alerta as equipes de segurança em tempo real.",
      },
      cases: {
        title: "Cases em Segurança Pública",
        description:
          "O Pato 360° em operação: reconhecimento facial, leitura de placas e análise de eventos integrados ao centro de operações de Pato Branco.",
      },
    },
    en: {
      home: {
        title: "Technology for Governments and Cities",
        description:
          "Intelligent video surveillance, facial recognition, license-plate reading and an integrated operations center for municipalities — contracted via CPSI, Brazil's Complementary Law 182/2021.",
      },
      empresa: {
        title: "Proc for the Public Sector",
        description:
          "In-house AI and computer vision engineering applied to public safety, with municipal solutions delivered via CPSI and integrated with state and federal systems.",
      },
      contato: {
        title: "Talk to Proc — Government and Cities",
        description:
          "Talk to Proc about intelligent video surveillance for your municipality and about the CPSI contracting path, from assessment to deployment.",
      },
      plataforma: {
        title: "Proc AI Platform for Cities",
        description:
          "The AI, computer vision and analytics platform behind the municipal integrated operations center, alerting security teams in real time.",
      },
      cases: {
        title: "Public Safety Cases",
        description:
          "Pato 360° in operation: facial recognition, license-plate reading and event analysis integrated into the Pato Branco operations center.",
      },
    },
    es: {
      home: {
        title: "Tecnología para Gobiernos y Ciudades",
        description:
          "Videovigilancia inteligente, reconocimiento facial, lectura de placas y centro integrado de operaciones para municipios — con contratación vía CPSI, Ley Complementaria 182/2021.",
      },
      empresa: {
        title: "Proc para el Sector Público",
        description:
          "Ingeniería propia de IA y visión artificial aplicada a la seguridad pública, con solución municipal entregada vía CPSI e integrada a sistemas estatales y federales.",
      },
      contato: {
        title: "Hablar con Proc — Gobierno y Ciudades",
        description:
          "Habla con Proc sobre videovigilancia inteligente para tu municipio y sobre el camino de la contratación vía CPSI, del diagnóstico a la implementación.",
      },
      plataforma: {
        title: "Proc AI Platform para Ciudades",
        description:
          "La plataforma de IA, visión artificial y analytics que equipa el centro integrado de operaciones del municipio y alerta a los equipos de seguridad en tiempo real.",
      },
      cases: {
        title: "Casos en Seguridad Pública",
        description:
          "Pato 360° en operación: reconocimiento facial, lectura de placas y análisis de eventos integrados al centro de operaciones de Pato Branco.",
      },
    },
  },
  empresas: {
    pt: {
      home: {
        title: "Tecnologia para Empresas e Indústrias",
        description:
          "Controle de acesso facial, videomonitoramento com IA, inspeção visual automatizada e infraestrutura de TI gerenciada — integrados aos equipamentos e sistemas que sua empresa já usa.",
      },
      empresa: {
        title: "A Proc para Empresas e Indústrias",
        description:
          "Plataforma própria de IA e visão computacional, com engenharia, NOC e Service Desk da própria casa — para que a operação do cliente não pare.",
      },
      contato: {
        title: "Falar com a Proc — Empresas e Indústrias",
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
          "O que a Proc AI Platform entrega em ambientes corporativos, indústrias e infraestrutura crítica — do acesso facial à inspeção visual na linha.",
      },
    },
    en: {
      home: {
        title: "Technology for Business and Industry",
        description:
          "Facial access control, AI video surveillance, automated visual inspection and managed IT infrastructure — integrated with the equipment and systems your company already uses.",
      },
      empresa: {
        title: "Proc for Business and Industry",
        description:
          "An in-house AI and computer vision platform, with our own engineering, NOC and Service Desk — so the client's operation does not stop.",
      },
      contato: {
        title: "Talk to Proc — Business and Industry",
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
          "What the Proc AI Platform delivers across corporate environments, industry and critical infrastructure — from facial access to visual inspection on the line.",
      },
    },
    es: {
      home: {
        title: "Tecnología para Empresas e Industrias",
        description:
          "Control de acceso facial, videovigilancia con IA, inspección visual automatizada e infraestructura de TI gestionada — integrados a los equipos y sistemas que tu empresa ya usa.",
      },
      empresa: {
        title: "Proc para Empresas e Industrias",
        description:
          "Plataforma propia de IA y visión artificial, con ingeniería, NOC y Service Desk de la propia casa — para que la operación del cliente no se detenga.",
      },
      contato: {
        title: "Hablar con Proc — Empresas e Industrias",
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
          "Lo que la Proc AI Platform entrega en entornos corporativos, industrias e infraestructura crítica — del acceso facial a la inspección visual en la línea.",
      },
    },
  },
};

/**
 * Meta do lado atual, ou `null` fora dos dois lados (raiz e páginas de
 * utilidade), onde a página mantém o que já tinha.
 */
export function metaDoLado(
  publico: Publico | null | undefined,
  chave: ChaveMeta,
  lang: Locale
): Meta | null {
  return publico ? meta[publico][lang][chave] : null;
}
