// Perfis oficiais da Proc nas redes — fonte única, usada na TopBar (ícones
// clicáveis) e no JSON-LD Organization do BaseLayout (sameAs).
//
// URLs sem parâmetro de rastreamento: o `?trk=` do LinkedIn e o `?locale=pt_BR`
// do Facebook vêm de copiar o endereço logado. O locale fixo é especialmente
// indesejado num site trilíngue.
export interface SocialProfile {
  label: string;
  href: string;
  /** Chave do ícone SVG correspondente na TopBar. */
  icon: "facebook" | "instagram" | "linkedin";
}

export const socialProfiles: SocialProfile[] = [
  { label: "Facebook", href: "https://www.facebook.com/procgroupbrasil/", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/procgroup/", icon: "instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/procgroupti", icon: "linkedin" },
];
