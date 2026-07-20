// Conteúdo da landing page de evento (/evento), acessada via chaveiro NFC/RFID.
// É UMA URL fixa: todos os chaveiros apontam para /evento. A cada evento, basta
// editar o bloco `evento` abaixo — o conteúdo da página muda junto.
import { WHATSAPP_NUMBER } from "./contact";
export { WHATSAPP_NUMBER };

export interface EventConfig {
  /** Cidade/local do evento (opcional; pré-preenche o formulário). Deixe "" para não citar. */
  cidade: string;
  /** Rótulo pequeno acima do título. */
  eyebrow: string;
  /** Título principal (H1). */
  titulo: string;
  /** Subtítulo curto. */
  subtitulo: string;
  /** Áreas a destacar — slugs de businessUnits.ts, na ordem. */
  unidades: string[];
  /** Mensagem já preenchida no WhatsApp (senão, uma genérica). */
  whatsappMsg?: string;
}

// ▼▼▼ EDITE AQUI A CADA EVENTO ▼▼▼
// Para destacar só algumas áreas, deixe em `unidades` apenas os slugs desejados:
//   "cidades-inteligentes" · "seguranca-corporativa" · "infraestrutura-de-ti" · "ia-industrial"
export const evento: EventConfig = {
  cidade: "",
  eyebrow: "Proc no evento",
  titulo: "Tecnologia inteligente para proteger, conectar e transformar",
  subtitulo:
    "IA, Visão Computacional, Segurança e Infraestrutura de TI numa única plataforma. Conheça as soluções da Proc e fale com um especialista.",
  unidades: ["cidades-inteligentes", "seguranca-corporativa", "infraestrutura-de-ti", "ia-industrial"],
  whatsappMsg: "Olá! Conheci a Proc num evento e quero saber mais sobre as soluções de vocês.",
};
