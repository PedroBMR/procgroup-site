import type { SolutionRich } from "./solutionContent";

/**
 * Página "Visão computacional", dentro de Ambientes Inteligentes.
 *
 * ⚠️ RASCUNHO para o comercial revisar. Pedido de 2026-09-28: a Proc quer ser
 * encontrada por "visão computacional". A página está desligada em
 * src/data/secoes.ts até o texto ser aprovado.
 *
 * Todo o texto da página mora aqui, para a revisão acontecer num lugar só.
 *
 * POR QUE UMA PÁGINA PRÓPRIA: quem busca só "visão computacional" quer aprender
 * (o resultado é Wikipédia, Alura, cursos), e quem busca "visão computacional"
 * com empresa ou indústria encontra empresas especializadas, cada uma com uma
 * página dedicada ao tema. Um título não basta para competir por isso.
 *
 * O ÂNGULO: a página de Ambientes Inteligentes já lista os recursos (busca em
 * vídeo, alertas, estacionamento, fluxo). Esta não repete aquela lista: explica
 * o que é visão computacional na prática, com as câmeras que a empresa já tem.
 *
 * O QUE O TEXTO RESPEITA (skill contexto-proc e cofre, Limites):
 *   - só as aplicações liberadas para peça pública em 2026-09-17
 *   - sem nomear técnica biométrica (redação branda de 2026-09-17)
 *   - leitura de placas só na área do cliente, nunca na rua do entorno
 *   - indicadores de circulação sempre agregados, sem identificação individual
 *   - quem responde ao alerta é a equipe do cliente (fornece != opera)
 *   - capacidade da plataforma, nunca resultado obtido; nenhum número
 *   - sem "plataforma própria": a plataforma não é da Proc
 *   - fecha com o enquadramento de LGPD: o cliente é o controlador
 *
 * Conteúdo só em português, como o blog: as URLs em EN e ES mostram este mesmo
 * texto com o menu traduzido, sem hreflang e com canonical para a versão PT.
 */
export const visaoComputacional = {
  metaTitle: "Visão Computacional para Empresas e Varejo",
  metaDescription:
    "Visão computacional com as câmeras que sua empresa já tem: alertas de área restrita, busca em vídeo, ocupação de estacionamento e indicadores de fluxo.",
  // Para o schema.org: o serviço desta página, e não a unidade inteira.
  serviceType: "Visão computacional",
  heroTitle: "Visão computacional que transforma as câmeras da sua empresa em alertas e indicadores.",
  heroLead:
    "A plataforma analisa as imagens em tempo real, alerta sua equipe quando uma situação exige atenção e transforma o movimento do dia a dia em indicadores para dimensionar equipe, layout e operação.",
  faqAssunto: "visão computacional",
  faqs: [
    {
      q: "A visão computacional funciona com as câmeras que já tenho?",
      a: "Na maioria dos casos, sim. A análise roda sobre câmeras IP e analógicas já instaladas. Quando alguma não atende à aplicação, por posição ou resolução, o projeto aponta onde ajustar.",
    },
    {
      q: "Quem acompanha os alertas?",
      a: "A sua equipe. A plataforma analisa as imagens continuamente e avisa quando uma situação exige atenção; a decisão e a resposta ficam com quem opera o ambiente.",
    },
    {
      q: "Qual a diferença para a IA Industrial?",
      a: "Ambientes Inteligentes aplica visão computacional à segurança, ao acesso e à circulação de pessoas e veículos. Na linha de produção, a inspeção de qualidade e a contagem de peças ficam com a IA Industrial.",
    },
    {
      q: "Como ficam a privacidade e a LGPD?",
      a: "A sua empresa define a finalidade e as regras de tratamento das imagens, como controladora dos dados. Os indicadores de circulação são agregados, sem identificação individual.",
    },
  ],
  finalCtaTitle: "Quer ver a visão computacional nas câmeras da sua empresa?",
  finalCtaText: "Fale com um especialista em Ambientes Inteligentes da Proc.",
  // O template exige estes dois, mas com conteúdo longo ele não os mostra.
  solutionsHeading: "Visão computacional para empresas",
  teamDescription: "Profissionais dedicados a projetos de visão computacional para empresas.",

  rich: {
    whyTitle: "O que é visão computacional, na prática",
    whyIntro: [
      "Visão computacional é a parte da inteligência artificial que interpreta imagens. É o que faz uma câmera deixar de apenas gravar e passar a reconhecer o que acontece na cena: alguém numa área restrita, uma vaga que ficou livre, uma fila que começa a crescer.",
      "Em vez de alguém assistir a horas de vídeo, a plataforma analisa as imagens continuamente e chama a atenção da sua equipe só quando existe algo a fazer.",
    ],
    comparisonLeftHead: "Câmera que só grava",
    comparisonRightHead: "Câmera com visão computacional",
    comparison: [
      { without: "Horas revendo gravação para achar um momento", with: "Busca assistida por características objetivas da cena" },
      { without: "A equipe precisa estar olhando a tela certa na hora certa", with: "Alerta automático de área restrita e de acesso fora do horário" },
      { without: "Vagas do estacionamento conferidas no olho", with: "Ocupação e fluxo de veículos em tempo real" },
      { without: "Equipe e layout decididos por impressão", with: "Indicadores agregados de fluxo por dia e horário" },
    ],

    howTitle: "Como funciona",
    how: [
      {
        title: "Aproveita as câmeras instaladas",
        desc: "A análise roda sobre câmeras IP e analógicas que a sua empresa já tem. O projeto começa conferindo posição, iluminação e resolução de cada uma.",
      },
      {
        title: "Define o que importa",
        desc: "Junto com a sua equipe, definimos as áreas, os horários e as situações que devem gerar alerta ou virar indicador.",
      },
      {
        title: "Alerta e mede",
        desc: "A plataforma avisa sua equipe em tempo real e consolida os indicadores em painéis de gestão.",
      },
      {
        title: "Sua equipe decide",
        desc: "Quem responde ao alerta é a sua equipe. A tecnologia amplia a capacidade dela de agir, sem substituí-la.",
      },
    ],

    // As quatro aplicações são as liberadas para peça pública em 2026-09-17,
    // na redação do cofre. Mexer aqui é mexer em afirmação pública da Proc.
    applicationsTitle: "Onde a visão computacional entra",
    applicationsIntro: "As aplicações funcionam sobre a mesma plataforma e podem ser combinadas.",
    applications: [
      {
        name: "Segurança da operação",
        desc: "Alerta de acesso a área restrita e de intrusão fora do horário. Busca assistida em vídeo por característica objetiva da cena, no lugar da revisão manual da gravação.",
      },
      {
        name: "Controle de acesso",
        desc: "Liberação de pessoas e de veículos por cadastro prévio, com leitura de placas (LPR) na entrada de veículos.",
      },
      {
        name: "Estacionamento",
        desc: "Ocupação e fluxo de veículos na área da empresa: vagas livres, tempo médio de permanência e horários de pico.",
      },
      {
        name: "Circulação no varejo",
        desc: "Volume e fluxo de pessoas por período, dia e horário, mapa de calor e áreas de maior aglomeração, para dimensionar equipe, layout e operação. Indicadores agregados, sem identificação individual.",
      },
    ],

    kpisTitle: "Indicadores que saem das imagens",
    kpisIntro: "Dados agregados, prontos para a gestão decidir equipe, layout e operação.",
    kpis: [
      "Fluxo de pessoas por dia e horário",
      "Horários de pico",
      "Mapa de calor por área",
      "Áreas de maior aglomeração",
      "Ocupação do estacionamento",
      "Alertas por área e período",
    ],

    // Fecha com o enquadramento de LGPD, como a skill contexto-proc manda
    // fazer com qualquer projeto de visão computacional: vira prova de
    // maturidade em vez de passivo. "Operadora" aqui é no sentido da LGPD.
    whyProcTitle: "Privacidade desde o projeto",
    whyProc: [
      "Quem define a finalidade, a base legal e as regras de tratamento das imagens é a sua empresa, que é a controladora dos dados. A Proc atua como operadora: implanta e sustenta a tecnologia nos termos que você define.",
      "Os indicadores de circulação são agregados: mostram quantas pessoas passaram e quando, nunca quem. E cada aplicação é configurada para a finalidade que a justifica, sem coletar além do necessário.",
    ],
  } satisfies SolutionRich,
};
