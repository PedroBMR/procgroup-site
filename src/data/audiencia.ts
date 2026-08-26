import type { Locale } from "../i18n/config";

/**
 * Os dois públicos do site, e a fonte única de quem vê o quê.
 *
 * O site é dividido: quem entra por `/governo` nunca encontra conteúdo
 * corporativo, e quem entra por `/empresas` nunca encontra conteúdo de setor
 * público. Não existe área comum de conteúdo — a raiz `/` é só o seletor.
 *
 * Tudo que muda entre os dois lados sai daqui: as unidades de negócio que
 * aparecem, o caminho-base das rotas, os rótulos e a escotilha do rodapé.
 * Nenhum componente deve decidir isso por conta própria, senão os dois lados
 * saem de sincronia — foi assim que o nome morto "Segurança Corporativa"
 * sobreviveu em três lugares diferentes.
 *
 * Único ponto onde os dois se encostam: o rodapé traz um link discreto para o
 * outro lado ("escotilha"). Não é área comum — é a saída para quem clicou
 * errado na porta de entrada e, sem ela, sairia do site.
 */
export const publicos = ["governo", "empresas"] as const;
export type Publico = (typeof publicos)[number];

export interface PublicoCopy {
  /** Nome do público, como aparece na escotilha e no seletor. */
  nome: string;
  /** Frase de reconhecimento: "é isso que eu sou". */
  paraQuem: string;
  /** Texto do link de saída no rodapé, apontando para o OUTRO lado. */
  escotilha: string;
}

export interface PublicoDef {
  slug: Publico;
  /** Prefixo de todas as rotas deste lado, sem locale e sem base path. */
  base: string;
  /** Slugs de unidade de negócio visíveis neste lado, na ordem de exibição. */
  unidades: string[];
  /** O outro lado — destino da escotilha do rodapé. */
  oposto: Publico;
  /** O blog existe só no corporativo (decisão de 2026-08-26). */
  temBlog: boolean;
}

/**
 * Infraestrutura de TI fica no corporativo, NÃO nos dois lados.
 * Confirmado pelo Pedro em 2026-08-26, corrigindo suposição minha: ela não
 * vende para prefeitura. Bate com a própria descrição da unidade em
 * businessUnits.ts, que diz "para empresas que precisam de continuidade
 * operacional".
 */
export const publicoDefs: Record<Publico, PublicoDef> = {
  governo: {
    slug: "governo",
    base: "/governo",
    unidades: ["cidades-inteligentes"],
    oposto: "empresas",
    temBlog: false,
  },
  empresas: {
    slug: "empresas",
    base: "/empresas",
    unidades: ["ambientes-inteligentes", "ia-industrial", "infraestrutura-de-ti"],
    oposto: "governo",
    temBlog: true,
  },
};

export const publicoCopy: Record<Locale, Record<Publico, PublicoCopy>> = {
  pt: {
    governo: {
      nome: "Governo e cidades",
      paraQuem: "Prefeituras, guardas municipais e órgãos públicos",
      escotilha: "Procura soluções para empresas e indústrias?",
    },
    empresas: {
      nome: "Empresas e indústrias",
      paraQuem: "Indústria, empresa, condomínio e campus",
      escotilha: "Procura soluções para governo e cidades?",
    },
  },
  en: {
    governo: {
      nome: "Government and cities",
      paraQuem: "City halls, municipal guards and public agencies",
      escotilha: "Looking for solutions for business and industry?",
    },
    empresas: {
      nome: "Business and industry",
      paraQuem: "Industry, business, residential complexes and campuses",
      escotilha: "Looking for solutions for government and cities?",
    },
  },
  es: {
    governo: {
      nome: "Gobierno y ciudades",
      paraQuem: "Alcaldías, guardias municipales y organismos públicos",
      escotilha: "¿Busca soluciones para empresas e industrias?",
    },
    empresas: {
      nome: "Empresas e industrias",
      paraQuem: "Industria, empresa, condominio y campus",
      escotilha: "¿Busca soluciones para gobierno y ciudades?",
    },
  },
};

/** Caminho lógico dentro de um público. `caminho("governo", "/cases")` → `/governo/cases`. */
export function caminho(publico: Publico, sub = ""): string {
  return `${publicoDefs[publico].base}${sub}`;
}

/**
 * Descobre o público a partir da URL. Devolve `null` na raiz (o seletor) e nas
 * páginas de utilidade que vivem fora dos dois lados — política de privacidade,
 * suporte e trabalhe conosco. Essas não são "área comum de conteúdo": não têm
 * solução nem venda, e duplicar a política de privacidade criaria risco
 * jurídico à toa.
 */
export function publicoDaUrl(caminhoLogico: string): Publico | null {
  for (const p of publicos) {
    const b = publicoDefs[p].base;
    if (caminhoLogico === b || caminhoLogico.startsWith(`${b}/`)) return p;
  }
  // Blog e agenda de eventos vivem fora do prefixo /empresas (o blog e
  // PT-only vindo do WordPress e ja tem tratamento especial no i18n), mas
  // PERTENCEM ao lado corporativo — decisao de 2026-08-26: o blog e so dele,
  // e a agenda e uma categoria do blog. O chrome (menu, rodape, escotilha,
  // logo) segue o dono, nao o prefixo da URL.
  for (const prefixo of ["/blog", "/eventos"]) {
    if (caminhoLogico === prefixo || caminhoLogico.startsWith(`${prefixo}/`)) return "empresas";
  }
  return null;
}
