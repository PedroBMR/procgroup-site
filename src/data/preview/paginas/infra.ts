/**
 * Página INFRAESTRUTURA DE TI, transcrita do documento "Ajustes no site"
 * (páginas 10 a 15 do PDF), na ordem do documento e sem resumir.
 *
 * Mudança de texto em relação ao PDF: só a pontuação. Travessão vira vírgula,
 * pela regra de escrita da Proc.
 */
import type { Pagina } from "../blocos";

export const infra: Pagina = {
  hero: {
    eyebrow: "Infraestrutura de TI",
    titulo: "Infraestrutura preparada para operações críticas que não podem parar.",
    lead: "A base tecnológica para sua empresa operar com segurança, estabilidade e performance.",
  },
  blocos: [
    {
      paragrafos: [
        "Uma infraestrutura de TI bem administrada não deve apenas funcionar. Ela precisa estar disponível, segura, atualizada, monitorada e preparada para acompanhar o crescimento da empresa.",
        "A Proc atua na sustentação e governança de ambientes de tecnologia, locais ou em nuvem, cuidando da infraestrutura que mantém sistemas, dados, usuários e operações funcionando.",
        "Com uma equipe especializada, monitoramento proativo e atendimento contínuo, trabalhamos de forma personalizada de acordo com a realidade de cada empresa.",
      ],
      fecho: ["Você cuida do seu negócio. A Proc cuida da base tecnológica que faz tudo acontecer."],
    },
    {
      colunas: 2,
      cards: [
        {
          titulo: "Sua empresa já tem equipe de TI?",
          subtitulo: "Não tem problema. A Proc trabalha junto com o seu time.",
          paragrafos: [
            "Nossa atuação não substitui sua equipe interna. Ela agrega e amplifica!",
            "Podemos funcionar como uma extensão do seu departamento de TI, assumindo as demandas operacionais de sustentação, infraestrutura, monitoramento e suporte que consomem tempo da equipe.",
            "Assim, seu TI pode dedicar mais energia a ações estratégicas exclusivas do seu negócio: ferramentas de tomada de decisão, novos projetos, inovação, estratégia, sistemas e transformação digital.",
          ],
          fecho: ["A Proc cuida da base.", "Seu time cuida daquilo que realmente importa para a empresa."],
        },
        {
          titulo: "Sua empresa não tem equipe de TI?",
          subtitulo: "Fique tranquilo. Nós cuidamos de todo o seu ambiente.",
          paragrafos: [
            "Da administração dos servidores ao gerenciamento da rede, da segurança ao backup, do suporte aos usuários, ao monitoramento da infraestrutura.",
            "A Proc pode assumir a gestão da infraestrutura de ponta a ponta, proporcionando à empresa acesso a uma equipe especializada.",
          ],
        },
      ],
    },
    {
      titulo: "Nossas soluções em Infraestrutura de TI",
      colunas: 2,
      cards: [
        {
          id: "sustentacao",
          n: "01",
          titulo: "Sustentação e governança de ambientes",
          subtitulo: "Infraestrutura funcionando e monitorada. Operação protegida.",
          paragrafos: [
            "Cuidamos da sustentação e governança dos ambientes de TI da sua empresa, sejam eles locais, em nuvem ou híbridos.",
            "Nosso trabalho envolve acompanhamento contínuo da infraestrutura, manutenção, atualizações, correções, monitoramento e atuação preventiva para garantir disponibilidade, estabilidade, segurança e performance.",
            "A contratação é personalizada: sua empresa define a quantidade de horas necessária de acordo com sua demanda e pode ampliar ou ajustar o atendimento conforme a operação evolui.",
          ],
          itensTitulo: "Inclui, entre outras atividades:",
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
          id: "backup",
          n: "02",
          titulo: "Backup em nuvem",
          subtitulo: "Seus dados ficam protegidos mesmo quando algo dá errado.",
          paragrafos: [
            "Falhas de hardware, exclusões acidentais, corrupção de arquivos, incidentes de segurança ou ataques de ransomware podem comprometer informações importantes para a operação.",
            "Com o backup em nuvem, os dados são armazenados automaticamente em uma infraestrutura robusta e segura, mantendo uma cópia protegida fora do ambiente principal.",
            "A Proc também apoia o processo de restauração dos dados quando necessário, ajudando sua empresa a recuperar informações e retomar suas operações.",
          ],
        },
        {
          id: "checklist",
          n: "03",
          titulo: "Checklist Inteligente para abertura de lojas",
          subtitulo: "Antes da loja abrir, a tecnologia já foi verificada.",
          paragrafos: [
            "Uma loja não pode descobrir que existe um problema de TI depois que os primeiros clientes chegaram.",
            "Por isso, desenvolvemos o Checklist Inteligente Proc, uma solução criada para verificar automaticamente a infraestrutura tecnológica da loja antes do início das operações.",
            "Todos os dias, normalmente entre 6h e 7h, o sistema realiza uma série de verificações para identificar possíveis problemas antes que a equipe inicie o atendimento.",
          ],
          itensTitulo: "Entre os itens que podem ser monitorados:",
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
          depois: ["Quando algum problema é identificado, a equipe recebe o alerta para atuar antes que a falha chegue ao cliente."],
          fecho: ["A loja abre. A operação começa. A tecnologia já foi conferida."],
        },
        {
          id: "antivirus",
          n: "04",
          titulo: "Antivírus corporativo",
          subtitulo: "Proteção para os dispositivos e informações do seu negócio.",
          paragrafos: [
            "Computadores e servidores estão constantemente expostos a ameaças digitais.",
            "Por isso, oferecemos licenciamento e gerenciamento de soluções corporativas de proteção contra vírus, malware, ransomware, invasões e outras ameaças.",
            "Além do licenciamento, acompanhamos o ambiente para garantir que os dispositivos estejam protegidos e com as políticas de segurança adequadamente aplicadas.",
          ],
          fecho: ["Mais proteção para os dispositivos. Mais segurança para as informações da empresa."],
        },
        {
          id: "firewall",
          n: "05",
          titulo: "Firewall corporativo",
          subtitulo: "Controle e proteção para a rede da sua empresa.",
          paragrafos: [
            "Gerenciamos o firewall corporativo para proteger a infraestrutura de rede e controlar os acessos à internet.",
            "A solução permite estabelecer políticas de segurança, controlar o tráfego, restringir acessos inadequados e identificar comportamentos que possam representar riscos para o ambiente.",
            "Cuidamos do licenciamento, configuração, gerenciamento e acompanhamento do firewall, mantendo a proteção alinhada às necessidades da empresa.",
          ],
        },
        {
          id: "recuperacao",
          n: "06",
          titulo: "Recuperação de arquivos e dados corrompidos ou criptografados",
          subtitulo: "Quando um incidente acontece, recuperar os dados pode ser a prioridade.",
          paragrafos: [
            "Contamos com especialistas para atuar na recuperação de arquivos corrompidos, inacessíveis ou criptografados em situações de incidentes de segurança e sequestro de dados.",
            "Cada ocorrência é analisada individualmente para identificar as possibilidades de recuperação e definir a estratégia técnica adequada.",
          ],
          fecho: ["Quando a informação é crítica, cada arquivo importa."],
        },
      ],
    },
    {
      titulo: "Outros serviços que a Proc oferece",
      itensEstilo: "check",
      itens: [
        "Administração de servidores",
        "Gestão de ativos e inventário",
        "Gerenciamento de redes e conectividade",
        "Consultoria para projetos de aquisição ou evolução da infraestrutura",
        "Venda de computadores, servidores e equipamentos",
        "Licenciamento Original Microsoft",
      ],
    },
    {
      titulo: "Nosso suporte técnico 24/7",
      paragrafos: [
        "Nossa equipe atua de forma preventiva e proativa, acompanhando os principais indicadores da infraestrutura e identificando situações que possam comprometer a operação.",
        "O ambiente é acompanhado por meio de nosso painel de gestão, que permite visualizar indicadores, eventos e alertas em tempo real.",
        "Quando uma anomalia é identificada, a equipe recebe o alerta e pode iniciar a análise e as ações necessárias.",
      ],
      colunas: 3,
      cards: [
        { titulo: "Monitoramento contínuo", paragrafos: ["Acompanhamento dos principais indicadores do ambiente para identificar alterações e possíveis problemas."] },
        { titulo: "Alertas em tempo real", paragrafos: ["Quando um evento relevante é identificado, a equipe é notificada para que possa atuar rapidamente."] },
        { titulo: "Atendimento técnico", paragrafos: ["Suporte técnico remoto por telefone, chat e WhatsApp, 24 horas por dia, 7 dias por semana, de acordo com o modelo contratado."] },
        { titulo: "Relatórios e indicadores", paragrafos: ["Informações sobre o ambiente e seus principais eventos para apoiar a gestão e a tomada de decisões."] },
        {
          titulo: "Atuação preventiva",
          paragrafos: [
            "Nosso objetivo não é apenas resolver o problema depois que ele acontece. É identificar sinais de que algo pode dar errado e agir antes que isso afete a operação.",
          ],
        },
      ],
    },
    {
      titulo: "Uma infraestrutura. Uma equipe. Uma visão completa.",
      paragrafos: [
        "Sua empresa não precisa administrar diferentes fornecedores para cada parte da infraestrutura.",
        "A Proc reúne sustentação, segurança, conectividade, servidores, backup, licenciamento, equipamentos, monitoramento e suporte técnico em uma estrutura integrada.",
        "Isso significa menos complexidade para sua empresa e mais controle sobre a tecnologia que sustenta sua operação.",
      ],
    },
    {
      estilo: "manifesto",
      titulo: "Tecnologia para quem não pode parar.",
      paragrafos: [
        "A infraestrutura de TI é a base de tudo.",
        "É ela que mantém sistemas funcionando, pessoas conectadas, dados protegidos e operações disponíveis.",
      ],
    },
    {
      eyebrow: "Proc Group",
      titulo: "Infraestrutura de TI para empresas que precisam de disponibilidade, segurança e continuidade.",
      fecho: ["Sua equipe cuida do negócio.", "A Proc cuida da infraestrutura que faz o negócio acontecer."],
      ctas: [{ label: "Fale com um especialista", href: "/contato" }],
    },
  ],
};
