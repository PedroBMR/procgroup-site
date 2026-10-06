/**
 * Formato dos blocos de conteúdo das páginas do preview.
 *
 * Existe porque a primeira versão do preview encaixava o documento "Ajustes no
 * site" nos moldes que o site já tinha (BusinessUnitTemplate), e o que não
 * cabia no molde ficou de fora: o comercial apontou, com razão, que faltava
 * muita coisa. Aqui o molde segue o documento, e não o contrário. Cada campo é
 * opcional, e o componente Secoes desenha só o que vier preenchido, nesta
 * ordem:
 *
 *   eyebrow, titulo, subtitulo, paragrafos, itens, fluxo, cards,
 *   formularios, depois, fecho, ctas
 */

export interface Card {
  /** Âncora, para o mega-menu levar direto a este card. */
  id?: string;
  n?: string;
  titulo: string;
  subtitulo?: string;
  paragrafos?: string[];
  itensTitulo?: string;
  itens?: string[];
  depois?: string[];
  fecho?: string[];
  /** Card que leva a outro lugar da página ou do site. */
  href?: string;
}

export interface Formulario {
  titulo: string;
  campos: string[];
  /** Campos de texto longo, pelo rótulo. */
  longos?: string[];
  /** Escolha única no fim do formulário. */
  opcoes?: string[];
}

export interface Bloco {
  /** Âncora, para o mega-menu levar direto a este bloco. */
  id?: string;
  eyebrow?: string;
  titulo?: string;
  subtitulo?: string;
  paragrafos?: string[];
  itensTitulo?: string;
  itens?: string[];
  /** "check" é lista com marcador em duas colunas; "chips" é etiqueta. */
  itensEstilo?: "check" | "chips" | "numerada";
  fluxoTitulo?: string;
  fluxo?: string[];
  cards?: Card[];
  /** Colunas dos cards no desktop. */
  colunas?: 2 | 3 | 4;
  formularios?: Formulario[];
  depois?: string[];
  fecho?: string[];
  ctas?: { label: string; href: string }[];
  /** "manifesto" é a faixa escura centrada, para fechos e declarações. */
  estilo?: "padrao" | "manifesto";
}

export interface Pagina {
  hero: { eyebrow: string; titulo: string; lead?: string };
  blocos: Bloco[];
}
