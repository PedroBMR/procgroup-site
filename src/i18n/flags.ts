import type { Locale } from "./config";

// Bandeiras em SVG inline (não emoji — emoji de bandeira não renderiza no Windows).
// PT = Brasil, EN = EUA, ES = Espanha. viewBox 24x16, sem tamanho fixo (o CSS dimensiona).
export const flagSvg: Record<Locale, string> = {
  pt: `<svg aria-hidden="true" focusable="false" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" fill="#009c3b"/><path d="M12 2 22 8 12 14 2 8Z" fill="#ffdf00"/><circle cx="12" cy="8" r="3" fill="#002776"/></svg>`,
  en: `<svg aria-hidden="true" focusable="false" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" fill="#b22234"/><g fill="#fff"><rect y="1.23" width="24" height="1.23"/><rect y="3.69" width="24" height="1.23"/><rect y="6.15" width="24" height="1.23"/><rect y="8.62" width="24" height="1.23"/><rect y="11.08" width="24" height="1.23"/><rect y="13.54" width="24" height="1.23"/></g><rect width="10.5" height="8.62" fill="#3c3b6e"/><g fill="#fff"><circle cx="1.8" cy="1.7" r=".42"/><circle cx="4.3" cy="1.7" r=".42"/><circle cx="6.8" cy="1.7" r=".42"/><circle cx="9.3" cy="1.7" r=".42"/><circle cx="3" cy="3.2" r=".42"/><circle cx="5.5" cy="3.2" r=".42"/><circle cx="8" cy="3.2" r=".42"/><circle cx="1.8" cy="4.7" r=".42"/><circle cx="4.3" cy="4.7" r=".42"/><circle cx="6.8" cy="4.7" r=".42"/><circle cx="9.3" cy="4.7" r=".42"/><circle cx="3" cy="6.2" r=".42"/><circle cx="5.5" cy="6.2" r=".42"/><circle cx="8" cy="6.2" r=".42"/></g></svg>`,
  es: `<svg aria-hidden="true" focusable="false" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" fill="#aa151b"/><rect y="4" width="24" height="8" fill="#f1bf00"/></svg>`,
};
