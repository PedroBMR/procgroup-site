// Canais de contato da Proc, centralizados.

/** Comercial / vendas — usado nos CTAs de demonstração e na TopBar. */
export const WHATSAPP_NUMBER = "5546991411324";

/** Suporte técnico — número DIFERENTE do comercial. */
export const WHATSAPP_SUPORTE = "5546991230911";

/** Monta um link de WhatsApp com mensagem pré-preenchida. */
export function whatsapp(message: string, numero: string = WHATSAPP_NUMBER): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
}

/** CTA padrão "Solicitar Demonstração" — usado nos botões do site. */
export const WHATSAPP_DEMO = whatsapp(
  "Olá! Gostaria de solicitar uma demonstração das soluções da Proc."
);
