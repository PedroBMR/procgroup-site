/**
 * Formato do mega-menu de Soluções (SolutionsMegaMenu).
 *
 * Briefing de 2026-10-08. A hierarquia é a regra principal:
 *
 *   businessAreas  as três áreas de negócio e as soluções de cada uma
 *   external       Proc City, outra marca, link externo. NÃO é área de negócio
 *   ctas           Conheça a Proc, Fale com Vendas, Parcerias. Atalhos de
 *                  navegação e conversão, NÃO são área de negócio
 *
 * Os dados ficam fora do componente: quem monta o menu decide o conteúdo, o
 * componente só apresenta. Os títulos de área e de solução são nomenclatura
 * comercial padronizada pela Proc e não podem ser trocados por sinônimo.
 */
import type { ImageMetadata } from "astro";
import type { NomeIconeMenu } from "./iconesMenu";

export interface SolucaoMenu {
  titulo: string;
  /** Uma linha, tirada do texto da própria página da solução. */
  descricao: string;
  href: string;
  icone: NomeIconeMenu;
}

export interface AreaMenu {
  /** Chave estável, também usada nos ids do HTML. */
  id: string;
  titulo: string;
  href: string;
  /** Slug do UnitIcon. */
  icone: string;
  /** Frase curta da área visual. */
  conceito: string;
  imagem: ImageMetadata;
  solucoes: SolucaoMenu[];
}

export interface ExternoMenu {
  titulo: string;
  /** null enquanto o endereço oficial não for confirmado. Não inventar. */
  url: string | null;
  icone: string;
  conceito: string;
  descricao: string;
  temas: string[];
  imagem: ImageMetadata;
}

export interface AcessoMenu {
  titulo: string;
  descricao: string;
  href: string;
  icone: NomeIconeMenu;
}

export interface SolutionsMenu {
  businessAreas: AreaMenu[];
  external?: ExternoMenu;
  ctas: AcessoMenu[];
  footer?: { texto: string; cta: string; href: string };
}
