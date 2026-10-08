/**
 * Conteúdo do mega-menu de Soluções do preview (briefing de 2026-10-08).
 *
 * Os TÍTULOS de área e de solução não moram aqui: vêm do `menu` de ajustes.ts,
 * que é a nomenclatura comercial padronizada. Este arquivo só acrescenta o que
 * o mega-menu precisa a mais: ícone, imagem, conceito e uma linha de descrição.
 *
 * As descrições saem do próprio texto de cada página (src/data/preview/
 * paginas/), quase sempre o subtítulo da solução. Onde o documento não tem
 * subtítulo, a linha resume os itens que ele lista, sem afirmar nada novo.
 * Os conceitos das áreas são os do briefing.
 */
import type { ImageMetadata } from "astro";
import type { AreaMenu, SolutionsMenu } from "../megaMenu";
import type { NomeIconeMenu } from "../iconesMenu";
import imgInfra from "../../assets/images/solucoes/hero-infraestrutura-de-ti.jpg";
import imgNuvem from "../../assets/images/corredor-datacenter-ilustracao.png";
import imgVisao from "../../assets/images/solucoes/hero-ia-industrial.jpg";
import imgCidade from "../../assets/images/solucoes/hero-cidades-inteligentes.jpg";

/** Endereço oficial da Proc City. null até ser confirmado: não inventar. */
export const PROC_CITY_URL: string | null = null;

interface BlocoMenu {
  area: string;
  href: string;
  itens: { label: string; ancora: string }[];
}

const DETALHE: Record<string, { descricao: string; icone: NomeIconeMenu }> = {
  // Infraestrutura de TI
  sustentacao: { descricao: "Infraestrutura funcionando e monitorada. Operação protegida.", icone: "servidores" },
  backup: { descricao: "Seus dados ficam protegidos mesmo quando algo dá errado.", icone: "nuvemBackup" },
  checklist: { descricao: "Antes da loja abrir, a tecnologia já foi verificada.", icone: "carrinho" },
  antivirus: { descricao: "Proteção para os dispositivos e informações do seu negócio.", icone: "escudo" },
  firewall: { descricao: "Controle e proteção para a rede da sua empresa.", icone: "cadeado" },
  recuperacao: { descricao: "Quando um incidente acontece, recuperar os dados pode ser a prioridade.", icone: "arquivo" },
  // Hospedagem em nuvem
  "proc-cloud": { descricao: "Estrutura própria, gerenciada e dimensionada para cada projeto.", icone: "nuvem" },
  oci: { descricao: "A robustez da infraestrutura Oracle com a experiência da Proc.", icone: "globo" },
  erp: { descricao: "Seu ERP funcionando, sem a complexidade de manter a infraestrutura.", icone: "erp" },
  "outros-projetos": { descricao: "Sites, portais, aplicações, e-mail e projetos personalizados.", icone: "camadas" },
  // Visão Computacional e Vídeo Analytics
  "inteligencia-comercial": { descricao: "Entenda o comportamento da sua operação a partir dos dados.", icone: "grafico" },
  "fluxo-de-pessoas": { descricao: "Transforme circulação em indicadores de negócio.", icone: "pessoas" },
  "fluxo-de-veiculos": { descricao: "Transforme o movimento de veículos em informação.", icone: "carro" },
  estacionamentos: { descricao: "Saiba quais veículos estão no estacionamento e há quanto tempo.", icone: "estacionamento" },
  "visao-corporativa-industrial": { descricao: "Processos de empresas e indústrias monitorados por dados.", icone: "fabrica" },
  "controle-de-producao": { descricao: "Mais dados sobre o que realmente acontece na linha.", icone: "engrenagem" },
  "inspecoes-de-qualidade": { descricao: "Automatize inspeções visuais e reduza falhas.", icone: "selo" },
  "estoque-e-logistica": { descricao: "Mais visibilidade sobre produtos e materiais.", icone: "caixas" },
  "equipamentos-e-processos": { descricao: "Transforme indicadores visuais em dados.", icone: "medidor" },
  "seguranca-operacional": { descricao: "Uso de EPIs, controle de acesso e áreas restritas.", icone: "capacete" },
  "integracao-iot": { descricao: "A inteligência visual não precisa ficar isolada.", icone: "chip" },
  videomonitoramento: { descricao: "Mais inteligência para as câmeras que sua empresa já possui.", icone: "camera" },
};

const VISUAL: Record<string, { id: string; icone: string; conceito: string; imagem: ImageMetadata }> = {
  "/preview/infraestrutura-de-ti": {
    id: "infraestrutura",
    icone: "infraestrutura-de-ti",
    conceito: "A tecnologia que sustenta sua operação.",
    imagem: imgInfra,
  },
  "/preview/hospedagem-em-nuvem": {
    id: "nuvem",
    icone: "hospedagem-em-nuvem",
    conceito: "Seus sistemas disponíveis e protegidos.",
    imagem: imgNuvem,
  },
  "/preview/visao-computacional": {
    id: "visao",
    icone: "visao-computacional",
    conceito: "Imagens transformadas em inteligência.",
    imagem: imgVisao,
  },
};

/**
 * Monta o mega-menu a partir dos blocos de Soluções do `menu`. Recebe a função
 * que põe o base path, para os hrefs já saírem prontos para o Header.
 */
export function montarMenuSolucoes(blocos: BlocoMenu[], L: (href: string) => string): SolutionsMenu {
  const businessAreas: AreaMenu[] = blocos.map((b) => {
    const v = VISUAL[b.href];
    if (!v) throw new Error(`Área sem visual no mega-menu: ${b.href}`);
    return {
      id: v.id,
      // O título vem do menu, não do VISUAL: é a nomenclatura comercial.
      titulo: b.area,
      href: L(b.href),
      icone: v.icone,
      conceito: v.conceito,
      imagem: v.imagem,
      solucoes: b.itens.map((i) => {
        const d = DETALHE[i.ancora];
        if (!d) throw new Error(`Solução sem descrição no mega-menu: ${i.ancora}`);
        return { titulo: i.label, descricao: d.descricao, icone: d.icone, href: `${L(b.href)}#${i.ancora}` };
      }),
    };
  });

  return {
    businessAreas,
    external: {
      titulo: "Proc City",
      url: PROC_CITY_URL,
      icone: "cidades-inteligentes",
      conceito: "Tecnologia para cidades mais inteligentes.",
      descricao: "Site próprio da Proc para quem procura soluções para cidades:",
      temas: ["Cidades inteligentes", "Gestão pública", "Segurança urbana", "Mobilidade", "Tecnologia para cidades"],
      imagem: imgCidade,
    },
    ctas: [
      { titulo: "Conheça a Proc", descricao: "Nossa experiência", href: L("/preview/a-proc"), icone: "predio" },
      { titulo: "Fale com Vendas", descricao: "Converse com nossa equipe", href: L("/preview/contato"), icone: "conversa" },
      { titulo: "Parcerias", descricao: "Cresça junto com a Proc", href: L("/preview/parcerias"), icone: "parceria" },
    ],
    footer: {
      texto: "Precisa de uma solução para sua operação?",
      cta: "Fale com a Proc",
      href: L("/preview/contato"),
    },
  };
}
