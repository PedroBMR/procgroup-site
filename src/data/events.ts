// Conteúdo da landing page de evento (/evento), acessada via chaveiro NFC/RFID.
// É UMA URL fixa: todos os chaveiros apontam para /evento. A cada evento, basta
// editar o bloco `evento` abaixo (nos três idiomas): o conteúdo da página muda junto.
import type { ImageMetadata } from "astro";
import type { Locale } from "../i18n/config";
import { WHATSAPP_NUMBER } from "./contact";
import estandeInventum from "../assets/images/evento-inventum-estande.jpg";
export { WHATSAPP_NUMBER };

/** Textos do evento num idioma. */
export interface EventoTexto {
  /** <title> e og:title. */
  docTitle: string;
  /** meta description e og:description. */
  metaDescription: string;
  /** Rótulo pequeno acima do título. */
  eyebrow: string;
  /** Título principal (H1). */
  titulo: string;
  /** Subtítulo curto. */
  subtitulo: string;
  /** Datas, já escritas no idioma. */
  quando: string;
  /** Local, já escrito no idioma. */
  onde: string;
  /** Destaque do estande (atração). Deixe "" nos dois para esconder o bloco. */
  destaqueTitulo: string;
  destaqueTexto: string;
  /** Legenda da imagem do estande. */
  imagemLegenda: string;
  /** Mensagem já preenchida no WhatsApp. */
  waMsg: string;
}

export interface EventConfig {
  /** Nome do evento: vai no assunto do e-mail de lead. */
  nome: string;
  /** Número do estande. "" esconde a célula. */
  estande: string;
  /** Link "como chegar". "" esconde o botão. */
  mapsUrl: string;
  /** Foto ou render do estande (opcional). */
  imagem?: ImageMetadata;
  texto: Record<Locale, EventoTexto>;
}

// ▼▼▼ EDITE AQUI A CADA EVENTO ▼▼▼
export const evento: EventConfig = {
  nome: "Inventum 2026",
  // Mapa oficial DP R12 (2026-10-26): B5 = PROC, área interna.
  estande: "B5",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=-26.2035738,-52.6842772",
  imagem: estandeInventum,
  texto: {
    pt: {
      docTitle: "PROC GROUP na Inventum 2026",
      metaDescription: "Estande B5 da PROC GROUP na Inventum 2026, de 04 a 08 de novembro em Pato Branco. Conheça as soluções e fale com um especialista.",
      eyebrow: "Inventum 2026 · Estande B5",
      titulo: "Bem-vindo ao estande da PROC GROUP",
      subtitulo:
        "Infraestrutura de TI, Hospedagem em Nuvem e Visão Computacional para empresas que não podem parar. Conheça as soluções e fale com um especialista.",
      quando: "04 a 08 de novembro",
      onde: "Centro Regional de Eventos, Pato Branco / PR",
      destaqueTitulo: "Assuma o cockpit",
      destaqueTexto: "Teste suas habilidades de piloto no simulador do nosso estande.",
      imagemLegenda: "Projeto do estande",
      waMsg: "Olá! Visitei o estande da PROC GROUP na Inventum 2026 e quero saber mais sobre as soluções de vocês.",
    },
    en: {
      docTitle: "PROC GROUP at Inventum 2026",
      metaDescription: "PROC GROUP booth B5 at Inventum 2026, November 4 to 8 in Pato Branco, Brazil. Explore our solutions and talk to a specialist.",
      eyebrow: "Inventum 2026 · Booth B5",
      titulo: "Welcome to the PROC GROUP booth",
      subtitulo:
        "IT Infrastructure, Cloud Hosting and Computer Vision for companies that can't stop. Explore our solutions and talk to a specialist.",
      quando: "November 4 to 8",
      onde: "Centro Regional de Eventos, Pato Branco / PR",
      destaqueTitulo: "Take the cockpit",
      destaqueTexto: "Test your driving skills on the simulator at our booth.",
      imagemLegenda: "Booth design",
      waMsg: "Hi! I visited the PROC GROUP booth at Inventum 2026 and I'd like to know more about your solutions.",
    },
    es: {
      docTitle: "PROC GROUP en Inventum 2026",
      metaDescription: "Stand B5 de PROC GROUP en Inventum 2026, del 4 al 8 de noviembre en Pato Branco, Brasil. Conoce nuestras soluciones y habla con un especialista.",
      eyebrow: "Inventum 2026 · Stand B5",
      titulo: "Bienvenido al stand de PROC GROUP",
      subtitulo:
        "Infraestructura de TI, Hosting en la Nube y Visión Artificial para empresas que no pueden parar. Conoce nuestras soluciones y habla con un especialista.",
      quando: "4 al 8 de noviembre",
      onde: "Centro Regional de Eventos, Pato Branco / PR",
      destaqueTitulo: "Toma el cockpit",
      destaqueTexto: "Pon a prueba tus habilidades de piloto en el simulador de nuestro stand.",
      imagemLegenda: "Proyecto del stand",
      waMsg: "¡Hola! Visité el stand de PROC GROUP en Inventum 2026 y quiero saber más sobre sus soluciones.",
    },
  },
};
