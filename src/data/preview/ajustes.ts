/**
 * Arquitetura do documento "Ajustes no site.pdf", de 2026-10-05: menu, heróis
 * da home, bloco O QUE FAZEMOS e os metadados das três áreas.
 *
 * Fora do site que está no ar. Nada aqui é lido pelas páginas de produção.
 *
 * O CONTEÚDO das páginas internas não mora mais aqui. Até 2026-10-06 este
 * arquivo trazia uma versão resumida de cada página, e o comercial apontou, com
 * razão, que faltava muita coisa: só 27% das palavras do PDF chegavam à tela.
 * A transcrição integral, bloco a bloco, está em src/data/preview/paginas/.
 *
 * Mudança de texto em relação ao PDF: só a pontuação. Travessão vira vírgula,
 * dois-pontos ou ponto, pela regra de escrita da Proc de 2026-08-27.
 */

import { withBase } from "../../utils/url";
import type { NavItem } from "../nav";
import type { BusinessUnit } from "../businessUnits";
import { infra } from "./paginas/infra";
import { nuvem } from "./paginas/nuvem";
import { visao } from "./paginas/visao";

/* ══════════════════ MENU ══════════════════ */

interface ItemMenu {
  label: string;
  /** Âncora do bloco ou card na página de destino, sem o "#". */
  ancora: string;
}

interface EntradaMenu {
  label: string;
  href: string;
  /** Mega-menu de Soluções: uma coluna por área. */
  blocos?: { area: string; href: string; itens: ItemMenu[] }[];
  /** Submenu simples, como o de Parcerias. */
  filhos?: ItemMenu[];
  externo?: boolean;
}

// Composição pedida na página 2 do PDF:
// Logo (HOME) > A PROC > Soluções > Parcerias > Proc City > Blog > Contato.
// Cada subitem leva direto ao bloco da solução, que é o que o documento pede:
// o visitante "já ir direto na solução desejada".
export const menu: EntradaMenu[] = [
  { label: "A PROC", href: "/preview/a-proc" },
  {
    label: "Soluções",
    href: "/preview/solucoes",
    blocos: [
      {
        area: "Infraestrutura de TI",
        href: "/preview/infraestrutura-de-ti",
        itens: [
          { label: "Sustentação e governança de ambientes", ancora: "sustentacao" },
          { label: "Backup em nuvem", ancora: "backup" },
          { label: "Checklist para abertura de loja", ancora: "checklist" },
          { label: "Licenciamento de antivírus corporativo", ancora: "antivirus" },
          { label: "Licenciamento de firewall corporativo", ancora: "firewall" },
          { label: "Recuperação de arquivos corrompidos ou criptografados", ancora: "recuperacao" },
        ],
      },
      {
        area: "Hospedagem em nuvem",
        href: "/preview/hospedagem-em-nuvem",
        itens: [
          { label: "Proc Cloud", ancora: "proc-cloud" },
          { label: "Oracle Cloud Infrastructure", ancora: "oci" },
          { label: "Hospedagem de ERP", ancora: "erp" },
          { label: "Hospedagem de outros projetos", ancora: "outros-projetos" },
        ],
      },
      {
        area: "Visão Computacional e Vídeo Analytics",
        href: "/preview/visao-computacional",
        itens: [
          { label: "Inteligência comercial e de marketing", ancora: "inteligencia-comercial" },
          { label: "Analytics do fluxo de pessoas", ancora: "fluxo-de-pessoas" },
          { label: "Analytics do fluxo de veículos", ancora: "fluxo-de-veiculos" },
          { label: "Gestão inteligente de estacionamentos", ancora: "estacionamentos" },
          { label: "Visão computacional corporativa e industrial", ancora: "visao-corporativa-industrial" },
          { label: "Controle de produção", ancora: "controle-de-producao" },
          { label: "Inspeções de qualidade", ancora: "inspecoes-de-qualidade" },
          { label: "Controle de estoque e logística", ancora: "estoque-e-logistica" },
          { label: "Monitoramento de equipamentos e processos", ancora: "equipamentos-e-processos" },
          { label: "Segurança operacional", ancora: "seguranca-operacional" },
          { label: "Integração com IoT e sistemas corporativos", ancora: "integracao-iot" },
          { label: "Segurança e videomonitoramento inteligente", ancora: "videomonitoramento" },
        ],
      },
    ],
  },
  {
    label: "Parcerias",
    href: "/preview/parcerias",
    filhos: [
      { label: "Indicação de oportunidades", ancora: "indicacao" },
      { label: "Parceria com desenvolvedores de software", ancora: "software" },
      { label: "Parceria com profissionais técnicos", ancora: "tecnicos" },
    ],
  },
  // O PDF não traz o endereço da Proc City (R9 da auditoria).
  { label: "Proc City", href: "#proc-city", externo: true },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/preview/contato" },
];

/* ══════════════════ HOME: OS QUATRO HERÓIS ══════════════════ */

export const herois = [
  {
    id: "principal",
    rotulo: "Principal",
    titulo: "Tecnologia para manter sua operação segura, estável e inteligente.",
    sub: "Mais segurança e previsibilidade para operações críticas que não podem parar.",
    texto:
      "Infraestrutura de TI, hospedagem em nuvem e inteligência aplicada às operações através de visão computacional e IA. A Proc Group combina tecnologia, experiência e suporte especializado para proteger dados, sustentar ambientes críticos e transformar informações em inteligência para a gestão.",
    cta: { label: "Conheça nossas soluções", href: "/preview/solucoes" },
    cta2: { label: "Fale com um especialista", href: "/preview/contato" },
  },
  {
    id: "infra",
    rotulo: "Infraestrutura de TI",
    titulo: "Infraestrutura de TI para operações críticas que não podem parar.",
    sub: "Sustentação, segurança e governança para manter seus ambientes de TI estáveis, disponíveis e com alta performance.",
    texto:
      "Cuidamos e protegemos a infraestrutura que sustenta o seu negócio, de ambientes locais e em nuvem a redes, servidores, bancos de dados, segurança, backup e suporte especializado.",
    cta: { label: "Conheça Infraestrutura de TI", href: "/preview/infraestrutura-de-ti" },
    cta2: { label: "Fale com um especialista", href: "/preview/contato" },
  },
  {
    id: "nuvem",
    rotulo: "Hospedagem em Nuvem",
    titulo: "Seu ambiente na nuvem. Seguro, disponível e sob gestão especializada.",
    sub: "Hospedagem de aplicações, arquivos e bancos de dados em ambientes preparados para garantir segurança, estabilidade e performance.",
    texto: "Conte com uma infraestrutura robusta e segura, gerenciamento especializado e suporte 24/7.",
    cta: { label: "Conheça a Hospedagem em Nuvem", href: "/preview/hospedagem-em-nuvem" },
    cta2: { label: "Fale com um especialista", href: "/preview/contato" },
  },
  {
    id: "visao",
    rotulo: "Visão Computacional",
    titulo: "Transforme imagens em dados. Transforme dados em decisões.",
    sub: "Visão computacional e Inteligência Artificial aplicadas às câmeras da sua empresa para gerar informações inteligentes sobre pessoas, veículos, produtos e processos.",
    texto:
      "A Plataforma Proc transforma imagens capturadas pelas câmeras em dados analíticos que apoiam segurança, gestão, produtividade e tomada de decisão.",
    cta: { label: "Conheça a Plataforma Proc", href: "/preview/visao-computacional" },
    cta2: { label: "Fale com um especialista", href: "/preview/contato" },
  },
];

/* ══════════════════ HOME: O QUE FAZEMOS ══════════════════ */

export const oQueFazemos = {
  eyebrow: "O QUE FAZEMOS",
  titulo: "Tecnologia inteligente para um mundo mais seguro, conectado e eficiente.",
  texto:
    "Desde 2014, a Proc está preparada para cuidar da área de tecnologia do seu negócio. Times de especialistas em cada área, atuam dedicados em diferentes pontos da infraestrutura e da operação das empresas, oferecendo tecnologia, consultoria, suporte especializado e soluções inteligentes para aumentar a segurança, disponibilidade e eficiência do negócio.",
  cards: [
    {
      titulo: "Infraestrutura de TI",
      chamada: "Mantenha sua operação funcionando.",
      texto:
        "Sustentação e governança de ambientes de TI, segurança cibernética, backup, hardware, software e suporte especializado.",
      cta: { label: "Conheça Infraestrutura de TI", href: "/preview/infraestrutura-de-ti" },
    },
    {
      titulo: "Hospedagem em Nuvem",
      chamada: "Leve seus sistemas para uma infraestrutura preparada e segura para o seu negócio.",
      texto:
        "Hospedagem de aplicações, arquivos e bancos de dados com segurança, disponibilidade, performance e gerenciamento especializado.",
      cta: { label: "Conheça a Hospedagem em Nuvem", href: "/preview/hospedagem-em-nuvem" },
    },
    {
      titulo: "Visão Computacional e Vídeo Analytics",
      chamada: "Transforme as imagens capturadas pelas câmeras em informação estratégica para tomada de decisão precisa e assertiva.",
      texto:
        "Inteligência Artificial e visão computacional aplicadas para transformar imagens em dados para análise de pessoas, veículos, produtos e processos, apoiando a gestão com informações de inteligência comercial e de marketing, dados sobre a eficiência da produção e demais processos críticos do negócio.",
      cta: { label: "Conheça a Plataforma Proc", href: "/preview/visao-computacional" },
    },
  ],
  fecho: {
    titulo: "Tecnologia que trabalha para o seu negócio.",
    texto:
      "Da infraestrutura que mantém sua operação funcionando à Inteligência Artificial que transforma imagens em informações, a Proc Group combina tecnologia, experiência e suporte especializado para ajudar empresas a operar com mais segurança, estabilidade e inteligência.",
    cta: "Fale com um especialista Proc e descubra a solução ideal para o seu contexto",
  },
};

/* ══════════════════ AS TRÊS ÁREAS ══════════════════ */

export interface Area {
  slug: string;
  nome: string;
  menuNome: string;
  /** Primeira frase da página da área, usada nos cards do índice. */
  tagline: string;
  /** Títulos das soluções, na ordem do menu. */
  solucoes: string[];
}

const blocosSolucoes = menu.find((m) => m.blocos)?.blocos ?? [];
const titulosDe = (href: string): string[] =>
  blocosSolucoes.find((b) => b.href === href)?.itens.map((i) => i.label) ?? [];

export const areas: Area[] = [
  {
    slug: "infraestrutura-de-ti",
    nome: "Infraestrutura de TI",
    menuNome: "Infraestrutura de TI",
    tagline: infra.hero.lead ?? infra.hero.titulo,
    solucoes: titulosDe("/preview/infraestrutura-de-ti"),
  },
  {
    slug: "hospedagem-em-nuvem",
    nome: "Hospedagem em Nuvem",
    menuNome: "Hospedagem em nuvem",
    tagline: nuvem.hero.titulo,
    solucoes: titulosDe("/preview/hospedagem-em-nuvem"),
  },
  {
    slug: "visao-computacional",
    nome: "Visão Computacional e Vídeo Analytics",
    menuNome: "Visão Computacional e Vídeo Analytics",
    tagline: visao.hero.titulo,
    solucoes: titulosDe("/preview/visao-computacional"),
  },
];

/* ══════════════════ PONTES PARA OS COMPONENTES DO SITE ══════════════════ */

const L = (href: string): string => (href.startsWith("#") ? href : withBase(href));

/** O menu do documento no formato que o Header de produção entende. */
export function navPreview(): NavItem[] {
  return menu.map((item) => ({
    id: item.href.replace(/[^a-z]/g, "") || "item",
    label: item.label,
    href: L(item.href),
    ...(item.blocos
      ? {
          colunas: item.blocos.map((bloco) => ({
            titulo: bloco.area,
            href: L(bloco.href),
            itens: bloco.itens.map((i) => ({ label: i.label, href: `${L(bloco.href)}#${i.ancora}` })),
          })),
        }
      : {}),
    ...(item.filhos
      ? { children: item.filhos.map((f) => ({ label: f.label, href: `${L(item.href)}#${f.ancora}` })) }
      : {}),
    ...(item.externo ? { externo: true } : {}),
  }));
}

/** Cor de cada área, no mesmo papel que a cor das unidades de hoje. */
const corDaArea: Record<string, string> = {
  "infraestrutura-de-ti": "var(--red-600)",
  "hospedagem-em-nuvem": "var(--navy-700)",
  "visao-computacional": "var(--navy-900)",
};

/** Uma área do documento vestida de unidade de negócio, para os cards. */
export function unidadeDaArea(area: Area): BusinessUnit {
  return {
    slug: area.slug,
    name: area.nome,
    shortName: area.menuNome,
    tagline: area.tagline,
    description: area.tagline,
    href: `/preview/${area.slug}`,
    color: corDaArea[area.slug] ?? "var(--navy-700)",
    team: area.nome,
    solutions: area.solucoes,
  };
}

export const unidades: BusinessUnit[] = areas.map(unidadeDaArea);
