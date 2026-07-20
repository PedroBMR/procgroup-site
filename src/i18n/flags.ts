import type { Locale } from "./config";

// Bandeiras em SVG inline (não emoji — emoji de bandeira não renderiza no Windows).
// PT = Brasil, EN = EUA, ES = Paraguai (idioma espanhol, mas usamos a bandeira do
// Paraguai em alusão à expansão da ProcGroup para lá). viewBox 24x16, sem tamanho
// fixo (o CSS dimensiona).
export const flagSvg: Record<Locale, string> = {
  pt: `<svg aria-hidden="true" focusable="false" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" fill="#009c3b"/><path d="M12 2 22 8 12 14 2 8Z" fill="#ffdf00"/><circle cx="12" cy="8" r="3" fill="#002776"/></svg>`,
  en: `<svg aria-hidden="true" focusable="false" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" fill="#b22234"/><g fill="#fff"><rect y="1.23" width="24" height="1.23"/><rect y="3.69" width="24" height="1.23"/><rect y="6.15" width="24" height="1.23"/><rect y="8.62" width="24" height="1.23"/><rect y="11.08" width="24" height="1.23"/><rect y="13.54" width="24" height="1.23"/></g><rect width="10.5" height="8.62" fill="#3c3b6e"/><g fill="#fff"><circle cx="1.8" cy="1.7" r=".42"/><circle cx="4.3" cy="1.7" r=".42"/><circle cx="6.8" cy="1.7" r=".42"/><circle cx="9.3" cy="1.7" r=".42"/><circle cx="3" cy="3.2" r=".42"/><circle cx="5.5" cy="3.2" r=".42"/><circle cx="8" cy="3.2" r=".42"/><circle cx="1.8" cy="4.7" r=".42"/><circle cx="4.3" cy="4.7" r=".42"/><circle cx="6.8" cy="4.7" r=".42"/><circle cx="9.3" cy="4.7" r=".42"/><circle cx="3" cy="6.2" r=".42"/><circle cx="5.5" cy="6.2" r=".42"/><circle cx="8" cy="6.2" r=".42"/></g></svg>`,
  es: `<svg aria-hidden="true" focusable="false" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" fill="#d52b1e"/><rect y="5.33" width="24" height="5.34" fill="#fff"/><rect y="10.67" width="24" height="5.33" fill="#0038a8"/><circle cx="12" cy="8" r="2.3" fill="#fff" stroke="#009b3a" stroke-width=".5"/><path d="M12 6.15l.53 1.09 1.2.17-.87.85.2 1.19L12 8.88l-1.06.57.2-1.19-.87-.85 1.2-.17Z" fill="#fedf00"/></svg>`,
};
