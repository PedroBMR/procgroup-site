/**
 * Copy e arquitetura do documento "Ajustes no site.pdf", de 2026-10-05.
 *
 * TEMPORÁRIO, e fora do site que está no ar. Existe para o Pedro ver como a
 * reestruturação ficaria antes de decidir as sete questões abertas da
 * AUDITORIA-AJUSTES-SITE.md. Nada aqui é lido pelas páginas de produção.
 *
 * DUAS COISAS QUE EU MUDEI EM RELAÇÃO AO PDF, de propósito:
 *
 * 1. Travessão. O PDF usa travessão em várias frases. A regra de escrita da
 *    Proc, de 2026-08-27, proíbe o caractere em qualquer texto. Converti para
 *    vírgula, dois-pontos ou ponto, conforme a frase pedia.
 *
 * 2. Os três blocos de risco de LGPD (R1 da auditoria). Estão marcados com
 *    `revisado`, trazem o texto que eu escreveria no lugar e dizem o que saiu.
 *    O preview mostra o aviso na tela, para a decisão ser visível e não
 *    silenciosa.
 */

import { withBase } from "../../utils/url";
import type { NavItem } from "../nav";
import type { BusinessUnit } from "../businessUnits";
import type { SolutionRich } from "../solutionContent";

export interface Solucao {
  n: string;
  titulo: string;
  resumo: string;
  intro?: string;
  itens?: string[];
  /** Quando preenchido, este bloco foi reescrito por causa de regra de LGPD. */
  revisado?: { saiu: string; porque: string };
}

export interface Area {
  slug: string;
  nome: string;
  menuNome: string;
  tituloPagina: string;
  chamada: string;
  subchamada: string;
  intro: string[];
  solucoes: Solucao[];
  fecho: { titulo: string; texto: string };
}

/* ══════════════════ MENU ══════════════════ */

export const menu = [
  { label: "A PROC", href: "/preview/a-proc" },
  {
    label: "Soluções",
    href: "/preview/solucoes",
    blocos: [
      {
        area: "Infraestrutura de TI",
        href: "/preview/infraestrutura-de-ti",
        itens: [
          "Sustentação e governança de ambientes",
          "Backup em nuvem",
          "Checklist para abertura de loja",
          "Licenciamento de antivírus corporativo",
          "Licenciamento de firewall corporativo",
          "Recuperação de arquivos corrompidos ou criptografados",
        ],
      },
      {
        area: "Hospedagem em nuvem",
        href: "/preview/hospedagem-em-nuvem",
        itens: [
          "Proc Cloud",
          "Oracle Cloud Infrastructure",
          "Hospedagem de ERP",
          "Hospedagem de outros projetos",
        ],
      },
      {
        area: "Visão Computacional e Vídeo Analytics",
        href: "/preview/visao-computacional",
        itens: [
          "Inteligência comercial e de marketing",
          "Analytics do fluxo de pessoas",
          "Analytics do fluxo de veículos",
          "Gestão inteligente de estacionamentos",
          "Visão computacional corporativa e industrial",
          "Controle de produção",
          "Inspeções de qualidade",
          "Controle de estoque e logística",
          "Monitoramento de equipamentos e processos",
          "Segurança operacional",
          "Integração com IoT e sistemas corporativos",
          "Segurança e videomonitoramento inteligente",
        ],
      },
    ],
  },
  { label: "Parcerias", href: "/preview/parcerias" },
  { label: "Proc City", href: "#proc-city", externo: true },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
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
    cta2: { label: "Fale com um especialista", href: "/contato" },
  },
  {
    id: "infra",
    rotulo: "Infraestrutura de TI",
    titulo: "Infraestrutura de TI para operações críticas que não podem parar.",
    sub: "Sustentação, segurança e governança para manter seus ambientes de TI estáveis, disponíveis e com alta performance.",
    texto:
      "Cuidamos e protegemos a infraestrutura que sustenta o seu negócio, de ambientes locais e em nuvem a redes, servidores, bancos de dados, segurança, backup e suporte especializado.",
    cta: { label: "Conheça Infraestrutura de TI", href: "/preview/infraestrutura-de-ti" },
    cta2: { label: "Fale com um especialista", href: "/contato" },
  },
  {
    id: "nuvem",
    rotulo: "Hospedagem em Nuvem",
    titulo: "Seu ambiente na nuvem. Seguro, disponível e sob gestão especializada.",
    sub: "Hospedagem de aplicações, arquivos e bancos de dados em ambientes preparados para garantir segurança, estabilidade e performance.",
    texto: "Conte com uma infraestrutura robusta e segura, gerenciamento especializado e suporte 24/7.",
    cta: { label: "Conheça a Hospedagem em Nuvem", href: "/preview/hospedagem-em-nuvem" },
    cta2: { label: "Fale com um especialista", href: "/contato" },
  },
  {
    id: "visao",
    rotulo: "Visão Computacional",
    titulo: "Transforme imagens em dados. Transforme dados em decisões.",
    sub: "Visão computacional e Inteligência Artificial aplicadas às câmeras da sua empresa para gerar informações inteligentes sobre pessoas, veículos, produtos e processos.",
    texto:
      "A Plataforma Proc transforma imagens capturadas pelas câmeras em dados analíticos que apoiam segurança, gestão, produtividade e tomada de decisão.",
    cta: { label: "Conheça a Plataforma Proc", href: "/preview/visao-computacional" },
    cta2: { label: "Fale com um especialista", href: "/contato" },
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

export const areas: Area[] = [
  {
    slug: "infraestrutura-de-ti",
    nome: "Infraestrutura de TI",
    menuNome: "Infraestrutura de TI",
    tituloPagina: "INFRAESTRUTURA DE TI",
    chamada: "Infraestrutura preparada para operações críticas que não podem parar.",
    subchamada: "A base tecnológica para sua empresa operar com segurança, estabilidade e performance.",
    intro: [
      "Uma infraestrutura de TI bem administrada não deve apenas funcionar. Ela precisa estar disponível, segura, atualizada, monitorada e preparada para acompanhar o crescimento da empresa.",
      "A Proc atua na sustentação e governança de ambientes de tecnologia, locais ou em nuvem, cuidando da infraestrutura que mantém sistemas, dados, usuários e operações funcionando.",
      "Com uma equipe especializada, monitoramento proativo e atendimento contínuo, trabalhamos de forma personalizada de acordo com a realidade de cada empresa.",
      "Você cuida do seu negócio. A Proc cuida da base tecnológica que faz tudo acontecer.",
    ],
    solucoes: [
      {
        n: "01",
        titulo: "Sustentação e governança de ambientes",
        resumo: "Infraestrutura funcionando e monitorada. Operação protegida.",
        intro:
          "Cuidamos da sustentação e governança dos ambientes de TI da sua empresa, sejam eles locais, em nuvem ou híbridos. Nosso trabalho envolve acompanhamento contínuo da infraestrutura, manutenção, atualizações, correções, monitoramento e atuação preventiva para garantir disponibilidade, estabilidade, segurança e performance.",
        itens: [
          "Sustentação de ambientes locais, em nuvem e híbridos",
          "Manutenção preventiva e corretiva",
          "Monitoramento de infraestrutura",
          "Atualizações de sistemas e servidores",
          "Gestão de usuários e permissões",
          "Análise de desempenho",
          "Identificação e correção de problemas",
          "Apoio técnico ao time interno de TI",
          "Documentação do ambiente",
          "Planejamento de melhorias e evolução da infraestrutura",
        ],
      },
      {
        n: "02",
        titulo: "Backup em nuvem",
        resumo: "Seus dados ficam protegidos mesmo quando algo dá errado.",
        intro:
          "Falhas de hardware, exclusões acidentais, corrupção de arquivos, incidentes de segurança ou ataques de ransomware podem comprometer informações importantes para a operação. Com o backup em nuvem, os dados são armazenados automaticamente em uma infraestrutura robusta e segura, mantendo uma cópia protegida fora do ambiente principal.",
        itens: ["Cópia automática fora do ambiente principal", "Apoio no processo de restauração dos dados"],
      },
      {
        n: "03",
        titulo: "Checklist Inteligente para abertura de lojas",
        resumo: "Antes da loja abrir, a tecnologia já foi verificada.",
        intro:
          "Uma loja não pode descobrir que existe um problema de TI depois que os primeiros clientes chegaram. Todos os dias, normalmente entre 6h e 7h, o sistema realiza uma série de verificações para identificar possíveis problemas antes que a equipe inicie o atendimento.",
        itens: [
          "PDVs",
          "Recebimento de cargas",
          "Conexão com a internet",
          "Conexão com banco de dados",
          "Comunicação com servidores",
          "Transmissor de notas fiscais",
          "Aplicações essenciais",
          "Serviços de rede",
          "Outros sistemas críticos para a operação",
        ],
      },
      {
        n: "04",
        titulo: "Antivírus corporativo",
        resumo: "Proteção para os dispositivos e informações do seu negócio.",
        intro:
          "Computadores e servidores estão constantemente expostos a ameaças digitais. Oferecemos licenciamento e gerenciamento de soluções corporativas de proteção contra vírus, malware, ransomware, invasões e outras ameaças. Além do licenciamento, acompanhamos o ambiente para garantir que os dispositivos estejam protegidos e com as políticas de segurança adequadamente aplicadas.",
      },
      {
        n: "05",
        titulo: "Firewall corporativo",
        resumo: "Controle e proteção para a rede da sua empresa.",
        intro:
          "Gerenciamos o firewall corporativo para proteger a infraestrutura de rede e controlar os acessos à internet. A solução permite estabelecer políticas de segurança, controlar o tráfego, restringir acessos inadequados e identificar comportamentos que possam representar riscos para o ambiente.",
      },
      {
        n: "06",
        titulo: "Recuperação de arquivos e dados corrompidos ou criptografados",
        resumo: "Quando um incidente acontece, recuperar os dados pode ser a prioridade.",
        intro:
          "Contamos com especialistas para atuar na recuperação de arquivos corrompidos, inacessíveis ou criptografados em situações de incidentes de segurança e sequestro de dados. Cada ocorrência é analisada individualmente para identificar as possibilidades de recuperação e definir a estratégia técnica adequada.",
      },
    ],
    fecho: {
      titulo: "Tecnologia para quem não pode parar.",
      texto:
        "A infraestrutura de TI é a base de tudo. É ela que mantém sistemas funcionando, pessoas conectadas, dados protegidos e operações disponíveis. Sua equipe cuida do negócio. A Proc cuida da infraestrutura que faz o negócio acontecer.",
    },
  },

  {
    slug: "hospedagem-em-nuvem",
    nome: "Hospedagem em Nuvem",
    menuNome: "Hospedagem em nuvem",
    tituloPagina: "HOSPEDAGEM EM NUVEM",
    chamada: "Hospede seu ambiente na nuvem. Mantenha sua operação mais segura, disponível e escalável.",
    subchamada: "Infraestrutura dimensionada para suportar sua operação, monitorada continuamente e preparada para crescer.",
    intro: [
      "Hospedar um sistema em nuvem é muito mais do que apenas disponibilizar um servidor. É contar com uma infraestrutura dimensionada para suportar sua operação, monitorada continuamente, protegida contra ameaças e preparada para acompanhar o crescimento do negócio de forma escalável e rápida.",
      "A Proc oferece hospedagem e gerenciamento de ambientes em nuvem, com mais de 10 anos de experiência na operação de infraestrutura para empresas de diferentes portes e segmentos.",
      "Contamos com uma estrutura de datacenter próprio e também com infraestrutura na Oracle Cloud Infrastructure, combinando diferentes arquiteturas para construir o ambiente mais adequado às necessidades de cada projeto.",
    ],
    solucoes: [
      {
        n: "01",
        titulo: "Proc Cloud",
        resumo: "Estrutura própria, com controle sobre a infraestrutura e os recursos de cada projeto.",
        intro:
          "Nossa estrutura própria permite hospedar ambientes corporativos com controle sobre a infraestrutura e os recursos necessários para cada projeto. É uma alternativa para empresas que buscam uma estrutura gerenciada, com acompanhamento técnico especializado e ambiente dimensionado de acordo com suas necessidades.",
      },
      {
        n: "02",
        titulo: "Oracle Cloud Infrastructure",
        resumo: "Para projetos que demandam infraestrutura de cloud de grande escala.",
        intro:
          "Para projetos que demandam uma infraestrutura de cloud de grande escala, também contamos com ambientes hospedados na Oracle Cloud Infrastructure. A Proc assume a gestão técnica do ambiente, enquanto o projeto utiliza a infraestrutura de cloud da Oracle.",
      },
      {
        n: "03",
        titulo: "Hospedagem de ERP",
        resumo: "Seu ERP funcionando, sem a complexidade e os custos para manter toda a infraestrutura.",
        intro:
          "O ERP é uma das aplicações mais críticas de uma empresa. Quando o sistema está indisponível ou apresenta baixo desempenho, toda a operação pode ser afetada. Oferecemos ambientes de hospedagem especialmente dimensionados para sistemas ERP.",
        itens: [
          "Quantidade de usuários",
          "Número de empresas e filiais",
          "Volume de dados",
          "Necessidade de processamento",
          "Banco de dados",
          "Aplicações complementares",
          "Acessos simultâneos",
          "Armazenamento",
          "Rotinas de backup",
          "Requisitos de segurança",
          "Necessidades de crescimento",
        ],
      },
      {
        n: "04",
        titulo: "Hospedagem de outros projetos",
        resumo: "A infraestrutura da Proc pode hospedar diferentes tipos de projetos e aplicações.",
        itens: [
          "Sites e portais",
          "Aplicações corporativas",
          "Arquivos e documentos",
          "Ambientes de trabalho compartilhado",
          "Serviços de e-mail",
          "Aplicativos",
          "Projetos personalizados",
        ],
      },
    ],
    fecho: {
      titulo: "A nuvem que sustenta sua operação.",
      texto:
        "Hospedagem em nuvem para empresas que precisam de estabilidade, segurança e performance. Conte com uma infraestrutura preparada para o presente e pronta para acompanhar o futuro da sua empresa.",
    },
  },

  {
    slug: "visao-computacional",
    nome: "Visão Computacional e Vídeo Analytics",
    menuNome: "Visão Computacional e Vídeo Analytics",
    tituloPagina: "VISÃO COMPUTACIONAL E VÍDEO ANALYTICS",
    chamada: "Transformamos imagens em dados para ajudar sua empresa a tomar decisões precisas e assertivas.",
    subchamada: "De imagens que registram o passado para dados que ajudam a entender o presente e melhorar o futuro.",
    intro: [
      "Desenvolvemos uma plataforma própria para criar sistemas avançados de videomonitoramento para apoio a decisões precisas e assertivas em ambientes corporativos e industriais.",
      "A Plataforma Proc utiliza algoritmos de visão computacional e inteligência artificial, analisa as imagens capturadas pelas câmeras e transforma eventos visuais em dados, indicadores, alertas e informações inteligentes para apoiar a gestão.",
      "A mesma tecnologia pode ser aplicada para entender o comportamento de uma loja, acompanhar a segurança de uma operação, acompanhar uma linha de produção ou automatizar um processo visual industrial.",
    ],
    solucoes: [
      {
        n: "01",
        titulo: "Inteligência comercial e de marketing",
        resumo: "Entenda o comportamento da sua operação a partir dos dados.",
        intro:
          "No varejo e em operações comerciais, as câmeras podem deixar de ser apenas ferramentas de segurança e passar a gerar informações relevantes para a gestão. A análise do fluxo permite entender melhor como os espaços são utilizados, quais períodos concentram maior movimento e como a circulação se distribui dentro da operação.",
      },
      {
        n: "02",
        titulo: "Analytics do fluxo de pessoas",
        resumo: "Transforme circulação em indicadores de negócio.",
        intro:
          "A Plataforma Proc analisa o fluxo de pessoas dentro dos ambientes e gera indicadores agregados que ajudam a compreender a movimentação.",
        itens: [
          "Contagem de pessoas",
          "Fluxo de entrada e saída",
          "Horários de maior movimentação",
          "Dias e períodos de maior fluxo",
          "Tempo médio de permanência",
          "Análise de circulação por áreas",
          "Identificação de pontos de maior concentração",
          "Mapas de calor",
          "Comparação entre períodos",
          "Indicadores personalizados para cada operação",
        ],
        revisado: {
          saiu: "Taxa de frequência, taxa de retorno, análise de perfil e dados demográficos",
          porque:
            "Esses quatro dependem de identificar a mesma pessoa em visitas diferentes, o que é biometria de cliente de loja sem cadastro e sem consentimento. A skill contexto-proc lista isso como algo que existe, funciona e não vai para peça pública. O que ficou é agregado e anônimo, que a mesma skill libera.",
        },
      },
      {
        n: "03",
        titulo: "Analytics do fluxo de veículos",
        resumo: "Transforme o movimento de veículos em informação.",
        intro:
          "A análise de veículos permite gerar indicadores sobre o fluxo nas áreas internas, estacionamentos e acessos da empresa.",
        itens: [
          "Volume de veículos",
          "Horários de maior movimentação",
          "Dias de maior fluxo",
          "Tempo de permanência",
          "Placas e veículos cadastrados",
          "Entrada e saída",
          "Ocupação do estacionamento",
          "Acessos autorizados ou não autorizados",
        ],
      },
      {
        n: "04",
        titulo: "Gestão inteligente de estacionamentos",
        resumo: "Saiba quais veículos estão no estacionamento e há quanto tempo.",
        intro:
          "A plataforma pode acompanhar a movimentação dos veículos no estacionamento e utilizar regras pré-configuradas para identificar situações específicas. Veículo entrou, vaga ocupada, tempo de permanência monitorado, limite ultrapassado, alerta enviado.",
      },
      {
        n: "05",
        titulo: "Visão computacional corporativa e industrial",
        resumo: "Processos que dependem de observação visual podem ser acompanhados de forma automatizada.",
        intro:
          "A Plataforma Proc transforma imagens dos processos corporativos e industriais em informações que apoiam a gestão da produção, qualidade, logística e gestão operacional.",
      },
      {
        n: "06",
        titulo: "Controle de produção",
        resumo: "Mais dados sobre o que realmente acontece na linha.",
        itens: [
          "Contagem de produtos",
          "Separação por modelo ou característica",
          "Identificação de produtos",
          "Acompanhamento das etapas",
          "Tempo de permanência em cada processo",
          "Detecção de paradas",
          "Rastreabilidade",
          "Monitoramento de áreas produtivas",
        ],
      },
      {
        n: "07",
        titulo: "Inspeções de qualidade",
        resumo: "Automatize inspeções visuais e reduza falhas.",
        itens: [
          "Identificação de defeitos",
          "Inspeção visual",
          "Comparação com padrões",
          "Identificação de peças",
          "Controle dimensional por imagem",
          "Classificação de produtos",
          "Separação automática",
          "Identificação de anomalias",
        ],
      },
      {
        n: "08",
        titulo: "Controle de estoque e logística",
        resumo: "Mais visibilidade sobre produtos e materiais.",
        itens: [
          "Contagem de produtos",
          "Movimentação",
          "Produtos fora do local correto",
          "Estoque mínimo",
          "Expedição",
          "Carga e descarga",
          "Montagem de pallets",
        ],
      },
      {
        n: "09",
        titulo: "Monitoramento de equipamentos e processos",
        resumo: "Transforme indicadores visuais em dados.",
        intro:
          "Muitos equipamentos possuem informações importantes apresentadas em displays, painéis, relógios, indicadores e instrumentos. A Plataforma Proc pode ser utilizada para interpretar essas informações e gerar dados para acompanhamento.",
        itens: [
          "Leitura de indicadores",
          "Termômetros, relógios e painéis",
          "Níveis de tanques",
          "Indicadores luminosos",
          "Estados de equipamentos",
          "Controle de temperatura",
        ],
      },
      {
        n: "10",
        titulo: "Segurança operacional",
        resumo: "Apoio ao controle de acesso e à proteção de áreas restritas.",
        itens: [
          "Uso de EPIs",
          "Controle de acesso",
          "Acesso a áreas restritas",
          "Controle de visitantes",
          "Circulação de pessoas e veículos",
        ],
        revisado: {
          saiu: "Permanência em postos de trabalho e permanência em áreas comuns",
          porque:
            "Medir quanto tempo o funcionário fica no posto é vigilância de trabalhador, que a skill contexto-proc classifica como tema sindical e trabalhista. É o tipo de linha que alguém recorta de um site público.",
        },
      },
      {
        n: "11",
        titulo: "Integração com IoT e sistemas corporativos",
        resumo: "A inteligência visual não precisa ficar isolada.",
        intro: "Imagem, inteligência, dado, sistema, decisão. A informação capturada pela câmera segue para onde ela realmente é necessária.",
        itens: [
          "Dispositivos IoT e sensores",
          "ERPs",
          "Bancos de dados",
          "Sistemas corporativos",
          "APIs",
          "Equipamentos industriais",
          "Sistemas de automação",
        ],
      },
      {
        n: "12",
        titulo: "Segurança e videomonitoramento inteligente",
        resumo: "Mais inteligência para as câmeras que sua empresa já possui.",
        intro:
          "O videomonitoramento tradicional registra tudo. O problema é encontrar rapidamente aquilo que realmente importa. A Plataforma Proc adiciona inteligência ao sistema de câmeras, permitindo que a sua equipe pesquise eventos por característica objetiva da cena, em vez de revisar horas de gravação.",
        itens: [
          "Busca por período, local e sentido de circulação",
          "Busca por características visuais objetivas: cor de roupa, tipo de vestimenta, objetos carregados",
          "Busca de veículos por placa, marca, modelo e cor",
          "Alertas configuráveis: pessoa em área restrita, veículo não autorizado, acesso fora do horário",
        ],
        revisado: {
          saiu: "Reconhecimento facial como forma de pesquisar pessoas",
          porque:
            "Pesquisar pessoa por face numa peça pública é marcação por biometria sem base legal declarada. A busca por característica objetiva da cena, que ficou, está na lista do que a skill libera para peça pública. O recurso continua existindo e continua sendo assunto de conversa comercial.",
        },
      },
    ],
    fecho: {
      titulo: "Veja. Analise. Entenda. Decida.",
      texto:
        "Com a Plataforma Proc, as câmeras deixam de ser apenas dispositivos de registro e passam a fazer parte de uma estrutura de dados, automação e inteligência operacional. A implantação não significa necessariamente substituir todas as câmeras e equipamentos que sua empresa já possui: primeiro avaliamos a infraestrutura existente.",
    },
  },
];

/* ══════════════════ PÁGINA A PROC ══════════════════ */

export const aProc = {
  titulo: "A Proc",
  chamada: "Tecnologia especializada para operações críticas que não podem parar. E que precisam evoluir.",
  intro: [
    "Desde 2014, a Proc Group desenvolve e sustenta tecnologias para empresas que dependem de seus ambientes para operar, crescer e evoluir.",
    "Com equipes especializadas e dedicadas em cada área de negócio, tecnologia própria e parcerias com grandes marcas do mercado, desenvolvemos soluções para diferentes níveis de complexidade e exigência.",
    "Mais de uma década transformando desafios tecnológicos em soluções reais para empresas de qualquer porte e segmento.",
  ],
  linhaDoTempo: [
    {
      ano: "2014",
      titulo: "O início",
      texto:
        "A Proc inicia sua trajetória atuando em Infraestrutura de TI e Hospedagem em Nuvem, apoiando empresas na sustentação de seus ambientes tecnológicos e na continuidade de suas operações.",
    },
    {
      ano: "2019",
      titulo: "Uma nova fronteira",
      texto:
        "Iniciamos nossos primeiros projetos em Visão Computacional, explorando o potencial da análise inteligente de imagens para solucionar desafios reais das empresas.",
    },
    {
      ano: "Hoje",
      titulo: "A evolução",
      texto:
        "A Proc combina infraestrutura, cloud e inteligência artificial para criar soluções tecnológicas alinhadas às necessidades específicas de cada operação.",
    },
  ],
  diferenciais: [
    {
      titulo: "Equipes especializadas",
      texto:
        "Cada área de atuação possui profissionais com conhecimento específico, permitindo que cada projeto seja conduzido por especialistas que compreendem profundamente os desafios técnicos e operacionais envolvidos.",
    },
    {
      titulo: "Experiência prática",
      texto:
        "Mais de uma década de projetos, implantações e operações reais nos permite aplicar conhecimento acumulado para antecipar riscos, definir arquiteturas adequadas e encontrar soluções eficientes.",
    },
    {
      titulo: "Tecnologia própria",
      texto:
        "Nossa plataforma de Visão Computacional e Inteligência Artificial é desenvolvida pela própria Proc. Isso nos proporciona flexibilidade para adaptar a tecnologia às características de cada projeto e evoluir a solução conforme as necessidades do cliente.",
    },
    {
      titulo: "Monitoramento e suporte técnico 24/7",
      texto:
        "Operações críticas não escolhem horário para apresentar problemas. Mantemos estrutura de monitoramento e suporte técnico 24 horas por dia, 7 dias por semana, acompanhando a infraestrutura e atuando de forma preventiva sempre que necessário.",
    },
  ],
  alcance: {
    titulo: "Uma empresa brasileira com atuação internacional.",
    texto:
      "Hoje atendemos empresas em todo o Brasil e iniciamos uma trajetória de expansão internacional, com projetos e clientes no Paraguai, Argentina e Bolívia.",
    alerta:
      "Esta afirmação é nova e não consta no cofre nem na skill contexto-proc. Precisa de confirmação antes de publicar. Ver R3 da auditoria.",
  },
  missao:
    "Utilizar a tecnologia para proteger pessoas, conectar operações e transformar realidades, desenvolvendo soluções inovadoras que promovam segurança, eficiência e inteligência operacional para empresas e indústrias, gerando valor à sociedade e contribuindo para um futuro mais seguro, sustentável e conectado.",
  visao:
    "Ser referência nacional em plataformas inteligentes para empresas e indústrias, reconhecida pela excelência técnica, inovação contínua e capacidade de transformar desafios complexos em soluções que impactam positivamente a vida das pessoas e a evolução das organizações.",
  proposito: "Usar a tecnologia para tornar empresas mais seguras, eficientes e preparadas para o futuro.",
  pilares: [
    { titulo: "Sustentar", texto: "Operações através de uma infraestrutura de TI confiável." },
    { titulo: "Proteger", texto: "Dados, sistemas e ambientes críticos através de tecnologia e conhecimento especializado." },
    { titulo: "Transformar", texto: "Processos e informações através da Inteligência Artificial e da Visão Computacional." },
  ],
};

/* ══════════════════ PÁGINA PARCERIAS ══════════════════ */

export const parcerias = {
  titulo: "Seja um Parceiro da Proc",
  chamada: "Vamos crescer juntos.",
  intro:
    "Boas oportunidades podem surgir em qualquer lugar. Criamos diferentes modelos para que profissionais, empresas de tecnologia e parceiros técnicos possam trabalhar junto com a Proc, gerar novas oportunidades e ampliar seus negócios.",
  modelos: [
    {
      titulo: "Indicação de Oportunidades",
      chamada: "Você identifica a oportunidade. A Proc conduz o negócio. Se fechar, você ganha.",
      texto:
        "Se você identificou uma empresa que pode se beneficiar de alguma das soluções da Proc, basta realizar a indicação pelo formulário disponível em nosso site. A partir daí, nossa equipe comercial assume o processo.",
      passos: [
        "Você identifica uma oportunidade",
        "Faz o cadastro da indicação",
        "A Proc valida a oportunidade",
        "Definimos juntos como vamos trabalhar a oportunidade",
        "Você pode participar junto, ou a Proc conduz a negociação",
        "Mantemos você informado durante toda a negociação",
        "Negócio fechado",
      ],
      bloqueio:
        "Bloqueado para publicação. As 12 regras do programa citam um regulamento completo que ainda não existe, e o formulário coleta dado pessoal de terceiro. Ver R2 e R4 da auditoria.",
    },
    {
      titulo: "Parceria com desenvolvedores de software",
      chamada: "Sua solução. Nossa infraestrutura.",
      texto:
        "Você desenvolveu um ERP, aplicativo, sistema de gestão, BI, site ou outra aplicação? A Proc estrutura o ambiente necessário para sua aplicação e cuida da infraestrutura durante a operação, para que sua software house possa oferecer uma solução mais completa ao cliente.",
      passos: [
        "Dimensionamento dos recursos necessários",
        "Provisionamento e configuração do ambiente",
        "Gerenciamento da infraestrutura",
        "Monitoramento contínuo",
        "Escalabilidade conforme sua base cresce",
        "Segurança e backup conforme o projeto",
        "Suporte técnico 24/7",
      ],
    },
    {
      titulo: "Parceria com profissionais técnicos",
      chamada: "Mais alcance para a Proc. Mais oportunidades para o parceiro.",
      texto:
        "Se você presta serviços de infraestrutura, pode se cadastrar como parceiro técnico. Quando surgir uma demanda na sua região, a Proc poderá entrar em contato para verificar sua disponibilidade. E a parceria também funciona no sentido contrário: se você precisa de apoio em um projeto, a Proc também pode ser seu parceiro técnico.",
      passos: [
        "Instalação e configuração de equipamentos",
        "Servidores, redes, Wi-Fi, switches e roteadores",
        "Firewall e infraestrutura local",
        "Manutenção e visitas técnicas",
        "Implantação de soluções",
        "Suporte presencial",
      ],
    },
  ],
};

/* ══════════════════ PONTES PARA OS COMPONENTES DO SITE ══════════════════ */

/*
 * As três funções abaixo existem para o preview usar os MESMOS componentes do
 * site (Header, BusinessUnitTemplate) em vez de uma página paralela com CSS
 * próprio. Foi o que deixou o preview anterior com cara de outro site.
 */

/** O menu do documento no formato que o Header de produção entende. */
export function navPreview(): NavItem[] {
  const L = (href: string) => (href.startsWith("#") ? href : withBase(href));

  return menu.map((item) => ({
    id: item.href.replace(/[^a-z]/g, "") || "item",
    label: item.label,
    href: L(item.href),
    ...("blocos" in item && item.blocos
      ? {
          colunas: item.blocos.map((bloco) => ({
            titulo: bloco.area,
            href: L(bloco.href),
            itens: bloco.itens.map((rotulo) => ({ label: rotulo, href: L(bloco.href) })),
          })),
        }
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

/** Uma área do documento vestida de unidade de negócio. */
export function unidadeDaArea(area: Area): BusinessUnit {
  return {
    slug: area.slug,
    name: area.nome,
    shortName: area.menuNome,
    tagline: area.subchamada,
    description: area.intro[0],
    href: `/preview/${area.slug}`,
    color: corDaArea[area.slug] ?? "var(--navy-700)",
    team: area.fecho.titulo,
    solutions: area.solucoes.map((s) => s.titulo),
  };
}

export const unidades: BusinessUnit[] = areas.map(unidadeDaArea);

/** As soluções da área no formato de conteúdo longo das páginas de solução. */
export function richDaArea(area: Area): SolutionRich {
  return {
    challengesTitle: `O que a Proc faz em ${area.nome}`,
    challengesIntro: area.intro,
    featuresTitle: `Nossas soluções em ${area.nome}`,
    featuresIntro: `${area.solucoes.length} soluções, na ordem em que o documento apresenta.`,
    featureGroups: area.solucoes.map((s) => ({
      title: `${s.n}. ${s.titulo}`,
      intro: [s.resumo, s.intro].filter(Boolean).join(" "),
      items: s.itens ?? [],
      aviso: s.revisado
        ? `Reescrito em relação ao documento. Saiu: ${s.revisado.saiu}. Por quê: ${s.revisado.porque}`
        : undefined,
    })),
  };
}
