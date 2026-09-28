/**
 * Medição de audiência do site.
 *
 * Hoje existe uma só: o pixel da **Metricool**, a ferramenta que a agência usa
 * para a gestão das redes da Proc. Ela pediu a tag em 2026-09-17 para ver o
 * tráfego do site no mesmo painel das redes.
 *
 * ✅ LIGADO em 2026-09-25, depois que a condição foi cumprida.
 *
 * A condição era a Política de Privacidade citar esta medição, porque o pixel
 * envia o IP do visitante para um terceiro e isso é tratamento de dado pessoal.
 * O texto entrou na seção "Medição de audiência", nos três idiomas, em
 * src/data/politicaPrivacidade.ts (que no mesmo dia deixou de depender do
 * WordPress). Desligar é trocar o `ativo` abaixo para false.
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
  ativo: true,
  hash: "f849040cf3447e6aecba5176dffcb533",
} as const;

export const pixelMetricool = `https://tracker.metricool.com/c3po.jpg?hash=${metricool.hash}`;

/**
 * Google Analytics 4, ligado em 2026-09-28.
 *
 * A propriedade `procgroup.com.br`, na conta [PROC], já existia e tem histórico
 * da época do WordPress. A tag morava lá, então desde a virada de 2026-09-25 o
 * GA não recebia nada. O ID abaixo é o do mesmo fluxo, para o histórico seguir.
 *
 * A DIFERENÇA PARA O METRICOOL: o GA grava cookies (`_ga` e `_ga_<sufixo>`,
 * até 2 anos) e manda os dados para o Google, fora do Brasil. Por isso ele só
 * carrega DEPOIS que a pessoa aceita o aviso de coleta (AvisoColeta.astro), e a
 * base legal é o consentimento. Decisão do Pedro em 2026-09-28, depois de ver as
 * duas opções que o Guia de Cookies da ANPD (out/2022) admite:
 *
 *   - consentimento: GA só depois do "Aceitar"  ← escolhida
 *   - legítimo interesse: GA desde o início, com opção de recusar
 *
 * O Metricool continua contando TODA visita, sem cookie. É ele que responde
 * "quantas visitas o site teve". O GA detalha o comportamento de quem aceitou.
 *
 * Por que não o "modo avançado" do Google, que manda um sinal anônimo antes do
 * aceite: esse sinal só aparece nos relatórios de propriedades com mais de
 * 1.000 usuários por dia que aceitaram. Abaixo disso, o relatório mostra só
 * quem aceitou, e o sinal seria dado mandado ao Google sem nada em troca.
 *
 * Desligar é trocar o `ativo` para false: o aviso e o link do rodapé somem
 * junto, porque sem GA não há o que pedir.
 */
export const googleAnalytics = {
  ativo: true,
  id: "G-8G2YCBFVJ3",
} as const;
