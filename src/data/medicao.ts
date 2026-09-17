/**
 * Medição de audiência do site.
 *
 * Hoje existe uma só: o pixel da **Metricool**, a ferramenta que a agência usa
 * para a gestão das redes da Proc. Ela pediu a tag em 2026-09-17 para ver o
 * tráfego do site no mesmo painel das redes.
 *
 * ⛔ ESTÁ DESLIGADO DE PROPÓSITO, e o interruptor é o `ativo` abaixo.
 *
 * O QUE PRECISA ACONTECER PARA LIGAR: a Política de Privacidade precisa citar
 * a medição de audiência pela Metricool. O pixel envia o IP do visitante para
 * um terceiro, o que é tratamento de dado pessoal, e a Proc não pode fazer
 * isso sem dizer. O texto da política vive no WordPress, não neste
 * repositório: se corrige lá, e só então este `ativo` vira true.
 *
 * COMO O PIXEL FUNCIONA: `c3po.jpg` é uma imagem de 1x1. O navegador do
 * visitante a pede ao servidor da Metricool, e é esse pedido que conta a
 * visita. Não é script e não grava cookie. O `hash` identifica a conta da
 * Proc, e por isso vive no HTML público: não é segredo, é um identificador.
 *
 * ONDE ELE ENTRA: no começo do <body>, não na <head> como veio no pedido.
 * `<img>` não é elemento válido dentro da <head>, e o navegador o empurra
 * para o body sozinho. O resultado é o mesmo, o HTML é que fica válido.
 */
export const metricool = {
  ativo: false,
  hash: "f849040cf3447e6aecba5176dffcb533",
} as const;

export const pixelMetricool = `https://tracker.metricool.com/c3po.jpg?hash=${metricool.hash}`;
