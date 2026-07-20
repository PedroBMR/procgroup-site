// Canais de contato da Proc, centralizados.
export const WHATSAPP_NUMBER = "5546991411324";

/** Monta um link de WhatsApp com mensagem pré-preenchida. */
export function whatsapp(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** CTA padrão "Solicitar Demonstração" — usado nos botões do site. */
export const WHATSAPP_DEMO = whatsapp(
  "Olá! Gostaria de solicitar uma demonstração das soluções da Proc."
);
