// Canais de contato da Proc, centralizados.

import type { Locale } from "../i18n/config";
import { translations } from "../i18n/translations";

/** Comercial / vendas — usado nos CTAs de demonstração e na TopBar. */
export const WHATSAPP_NUMBER = "5546991411324";

/** Suporte técnico — número DIFERENTE do comercial. */
export const WHATSAPP_SUPORTE = "5546991230911";

/** Monta um link de WhatsApp com mensagem pré-preenchida. */
export function whatsapp(message: string, numero: string = WHATSAPP_NUMBER): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
}

/** Link "como chegar" no Google Maps. É um <a> comum: nenhum request externo
    acontece antes do clique, então o site segue sem chamadas de terceiros. */
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Proc Group, Caetano Munhoz da Rocha, 480, Pato Branco, PR, Brasil");

/** Formata um número armazenado ("5546991230911") para exibição ("+55 46 99123-0911"). */
export function whatsappDisplay(numero: string): string {
  const ddd = numero.slice(2, 4);
  const rest = numero.slice(4);
  return `+55 ${ddd} ${rest.slice(0, -4)}-${rest.slice(-4)}`;
}

/** CTA padrão "Solicitar Demonstração" — usado nos botões do site. A mensagem
    pré-preenchida segue o idioma da página (antes era fixa em PT). */
export function whatsappDemo(lang: Locale): string {
  return whatsapp(translations[lang].topbar.demoMsg);
}
