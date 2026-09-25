/**
 * Interruptores de seção do site.
 *
 * Aqui ficam as partes que existem no projeto mas estão fora do ar. A regra é
 * uma só: nada é apagado, o código continua no repositório, e o que decide se
 * a página existe é o booleano desta lista.
 *
 * Quem lê o valor: `src/data/nav.ts` (o item de menu), a página de rota (que
 * deixa de gerar caminho nenhum) e o teaser na home, quando houver. Ligar de
 * volta é trocar `false` por `true` num lugar só.
 */
export const secoes = {
  /**
   * Cases. Desativada em 2026-09-25 a pedido do Pedro, temporariamente.
   *
   * O que a página tem hoje, para a decisão de religar: aplicações da
   * plataforma, sem nenhum case com cliente nomeado. A prova de campo que ela
   * tinha saiu junto com o Pato 360 em 2026-08-27, quando cidade e governo
   * deixaram este site, e os três projetos de visão computacional entregues
   * ficaram de fora por decisão de 2026-09-17 (valem para proposta e edital,
   * não para o site público).
   *
   * Enquanto estiver desligada, `/cases` e os endereços em EN e ES redirecionam
   * para `/solucoes`, que é a página que responde à mesma pergunta.
   */
  cases: false,
} as const;
