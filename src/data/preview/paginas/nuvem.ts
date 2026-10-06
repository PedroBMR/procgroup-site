/**
 * Página HOSPEDAGEM EM NUVEM, transcrita do documento "Ajustes no site"
 * (páginas 15 a 22 do PDF), na ordem do documento e sem resumir.
 *
 * Mudanças de texto em relação ao PDF: só a pontuação (travessão vira
 * vírgula, pela regra de escrita da Proc) e a seta dos fluxos, que vira o
 * desenho de fluxo da página.
 */
import type { Pagina } from "../blocos";

export const nuvem: Pagina = {
  hero: {
    eyebrow: "Hospedagem em Nuvem",
    titulo: "Hospede seu ambiente na nuvem. Mantenha sua operação mais segura, disponível e escalável.",
    lead: "Hospedar um sistema em nuvem é muito mais do que apenas disponibilizar um servidor.",
  },
  blocos: [
    {
      paragrafos: [
        "É contar com uma infraestrutura dimensionada para suportar sua operação, monitorada continuamente, protegida contra ameaças e preparada para acompanhar o crescimento do negócio de forma escalável e rápida.",
        "A Proc oferece hospedagem e gerenciamento de ambientes em nuvem, com mais de 10 anos de experiência na operação de infraestrutura para empresas de diferentes portes e segmentos, para diversos tipos de projetos e aplicações.",
        "Contamos com uma estrutura de datacenter próprio e também temos uma infraestrutura na Oracle Cloud Infrastructure (OCI), combinando diferentes arquiteturas para construir o ambiente mais adequado às necessidades de cada projeto.",
      ],
    },
    {
      colunas: 2,
      cards: [
        {
          id: "proc-cloud",
          n: "01",
          titulo: "Proc Cloud",
          paragrafos: [
            "Nossa estrutura própria permite hospedar ambientes corporativos com controle sobre a infraestrutura e os recursos necessários para cada projeto.",
            "É uma alternativa para empresas que buscam uma estrutura gerenciada, com acompanhamento técnico especializado e ambiente dimensionado de acordo com suas necessidades.",
          ],
        },
        {
          id: "oci",
          n: "02",
          titulo: "Oracle Cloud Infrastructure",
          paragrafos: [
            "Para projetos que demandam uma infraestrutura de cloud de grande escala, também contamos com ambientes hospedados na Oracle Cloud Infrastructure (OCI).",
            "A OCI oferece a infraestrutura global da Oracle, combinando recursos de computação, armazenamento, rede e segurança para aplicações corporativas.",
            "A Proc assume a gestão técnica do ambiente, enquanto o projeto utiliza a infraestrutura de cloud da Oracle.",
          ],
          fecho: ["A robustez da infraestrutura Oracle com a experiência da Proc na operação do ambiente."],
        },
      ],
    },
    {
      titulo: "Uma nuvem preparada para o seu negócio",
      subtitulo: "Cada empresa possui uma realidade diferente.",
      paragrafos: [
        "Quantidade de usuários, volume de dados, aplicações utilizadas, necessidade de processamento, armazenamento, disponibilidade e requisitos de segurança são fatores que precisam ser considerados antes de definir uma infraestrutura.",
        "Por isso, nossos ambientes são dimensionados e configurados de acordo com a necessidade de cada cliente.",
      ],
      fluxoTitulo: "A Proc cuida de todo o ciclo:",
      fluxo: ["Dimensionar", "Configurar", "Hospedar", "Monitorar", "Suportar", "Evoluir"],
      depois: ["Assim, sua empresa não precisa se preocupar com a complexidade por trás da infraestrutura."],
    },
    {
      titulo: "Mais de 10 anos hospedando ambientes em nuvem",
      paragrafos: [
        "A Proc atua há mais de uma década com infraestrutura e hospedagem de ambientes corporativos.",
        "Ao longo desse período, desenvolvemos experiência na implantação e gerenciamento de diferentes arquiteturas, aplicações e necessidades de negócio.",
        "Essa experiência nos permite entender que cada ambiente possui requisitos próprios.",
        "Por isso, não trabalhamos com uma infraestrutura genérica.",
      ],
      fecho: ["Construímos o ambiente de acordo com a operação que ele precisa sustentar."],
    },
    {
      colunas: 2,
      cards: [
        {
          id: "erp",
          n: "03",
          titulo: "Hospedagem de ERP",
          subtitulo: "Seu ERP funcionando. Sem a complexidade e os custos para manter toda a infraestrutura.",
          paragrafos: [
            "O ERP é uma das aplicações mais críticas de uma empresa.",
            "Quando o sistema está indisponível ou apresenta baixo desempenho, toda a operação pode ser afetada.",
          ],
          itensTitulo: "Por isso, oferecemos ambientes de hospedagem especialmente dimensionados para sistemas ERP, considerando:",
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
          depois: [
            "A Proc cuida da infraestrutura para que a empresa possa concentrar seus esforços na utilização e evolução do ERP.",
            "Temos parceria consolidada com software house no fornecimento e gerenciamento de nuvem para hospedagem de seus ERPs. Venda seu ERP junto com o serviço de hospedagem, facilitando a contratação e vendendo maior valor agregado ao seu cliente.",
          ],
        },
        {
          id: "outros-projetos",
          n: "04",
          titulo: "Hospedagem de outros projetos",
          paragrafos: ["A infraestrutura da Proc pode hospedar diferentes tipos de projetos e aplicações."],
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
    },
    {
      titulo: "Infraestrutura escalável com a rapidez que acompanha o crescimento da sua empresa",
      subtitulo: "Sua operação cresce. A infraestrutura acompanha junto.",
      paragrafos: [
        "Uma das grandes vantagens da computação em nuvem é a capacidade de ajustar os recursos de infraestrutura de acordo com a necessidade da operação.",
        "A arquitetura dos ambientes é dimensionada para permitir evolução e expansão conforme os requisitos do projeto.",
      ],
      itensEstilo: "chips",
      itens: ["Mais usuários?", "Mais processamento?", "Mais armazenamento?", "Novas aplicações?"],
      depois: [
        "A infraestrutura pode ser ajustada para acompanhar essas mudanças, reduzindo a necessidade de grandes investimentos antecipados em equipamentos físicos.",
      ],
      fecho: ["Sua empresa cresce. A infraestrutura evolui junto."],
    },
    {
      titulo: "Performance para aplicações críticas",
      paragrafos: [
        "Um ambiente de hospedagem precisa entregar mais do que disponibilidade.",
        "Ele precisa oferecer recursos adequados para que os sistemas funcionem com estabilidade e performance.",
        "Por isso, acompanhamos continuamente os principais indicadores do ambiente e avaliamos a necessidade de ajustes de recursos.",
      ],
      itensTitulo: "Monitoramos aspectos como:",
      itensEstilo: "check",
      itens: [
        "Processamento",
        "Memória",
        "Armazenamento",
        "Rede",
        "Disponibilidade",
        "Desempenho das máquinas",
        "Utilização dos recursos",
        "Eventos e alertas",
      ],
      depois: ["Quando necessário, nossa equipe pode atuar na configuração e evolução da infraestrutura."],
    },
    {
      titulo: "Segurança como parte da arquitetura",
      subtitulo: "Se os sistemas estão na nuvem, os dados também precisam estar protegidos.",
      paragrafos: [
        "Nossos ambientes são projetados considerando diferentes camadas de proteção e controle, de acordo com os requisitos de cada projeto.",
      ],
      itensTitulo: "Podemos trabalhar com recursos como:",
      itensEstilo: "check",
      itens: [
        "Controle de acesso",
        "Firewall",
        "Segmentação de rede",
        "Monitoramento",
        "Backup",
        "Gestão de usuários",
        "Políticas de segurança",
        "Atualizações",
        "Controle de permissões",
        "Monitoramento de eventos",
      ],
      depois: ["A arquitetura é definida de acordo com a criticidade e as necessidades específicas de cada ambiente."],
    },
    {
      titulo: "Backup e proteção dos seus dados",
      paragrafos: [
        "Disponibilidade e proteção dos dados são requisitos fundamentais para qualquer ambiente corporativo.",
        "Por isso, os projetos podem contar com políticas de backup dimensionadas de acordo com a criticidade das informações e os requisitos de cada aplicação.",
        "Em caso de falha, exclusão ou incidente, a Proc também pode apoiar o processo de recuperação e restauração do ambiente.",
      ],
      fecho: ["Porque hospedar seus sistemas também significa proteger aquilo que sua empresa não pode perder."],
    },
    {
      titulo: "Gestão completa do ambiente",
      subtitulo: "Você não precisa administrar a nuvem sozinho.",
      paragrafos: [
        "Ao contratar a Proc, sua empresa conta com uma equipe especializada para cuidar da infraestrutura hospedada.",
        "Nossa atuação pode envolver:",
      ],
      colunas: 4,
      cards: [
        { titulo: "Dimensionamento", paragrafos: ["Definição dos recursos necessários para atender à operação atual e às projeções de crescimento."] },
        { titulo: "Implantação", paragrafos: ["Configuração da infraestrutura e preparação do ambiente para receber as aplicações."] },
        { titulo: "Gerenciamento", paragrafos: ["Administração dos recursos computacionais, sistemas e serviços do ambiente."] },
        { titulo: "Monitoramento", paragrafos: ["Acompanhamento contínuo da infraestrutura e seus principais indicadores."] },
        { titulo: "Segurança", paragrafos: ["Gestão dos recursos de proteção e controle de acesso."] },
        { titulo: "Backup", paragrafos: ["Configuração e acompanhamento das rotinas de proteção dos dados."] },
        { titulo: "Suporte técnico 24/7", paragrafos: ["Atendimento técnico para situações relacionadas à infraestrutura hospedada."] },
        { titulo: "Evolução", paragrafos: ["Ajustes e upgrades conforme a operação e os requisitos do negócio mudam."] },
      ],
    },
    {
      titulo: "Monitoramento contínuo",
      subtitulo: "A infraestrutura está trabalhando. Nossa equipe também.",
      paragrafos: [
        "Ambientes corporativos não funcionam apenas durante o horário comercial.",
        "Por isso, contamos com uma equipe especializada para monitoramento e suporte técnico 24 horas por dia, 7 dias por semana, de acordo com o ambiente e o modelo contratado.",
        "O monitoramento contínuo permite identificar eventos e alterações relevantes na infraestrutura para que a equipe possa atuar de forma preventiva ou corretiva.",
      ],
      fecho: ["Mais acompanhamento. Menos surpresas."],
    },
    {
      titulo: "Escalabilidade sem grandes investimentos em infraestrutura",
      paragrafos: ["Manter uma infraestrutura própria exige muito mais do que comprar servidores."],
      itensTitulo: "É necessário considerar:",
      itensEstilo: "check",
      itens: [
        "Aquisição e atualização de hardware",
        "Espaço físico",
        "Energia elétrica",
        "Climatização",
        "Conectividade",
        "Licenciamentos",
        "Segurança",
        "Manutenção",
        "Monitoramento",
        "Backup",
        "Equipe técnica",
        "Substituição e expansão de equipamentos",
      ],
      depois: [
        "Ao hospedar seu ambiente com a Proc, sua empresa transforma grande parte dessa estrutura em um serviço gerenciado.",
        "Isso permite reduzir a necessidade de investimentos diretos em infraestrutura física e facilita a expansão dos recursos conforme a necessidade.",
      ],
      fecho: ["Mais agilidade para evoluir. Menos complexidade e custos para administrar."],
    },
    {
      titulo: "Por que hospedar com a Proc?",
      colunas: 4,
      cards: [
        { titulo: "Experiência", paragrafos: ["Mais de 10 anos trabalhando com infraestrutura e ambientes em nuvem."] },
        { titulo: "Estrutura própria", paragrafos: ["Datacenter próprio para hospedagem de ambientes corporativos."] },
        { titulo: "Oracle Cloud Infrastructure", paragrafos: ["Possibilidade de utilizar a infraestrutura Oracle para projetos que demandam recursos de cloud de grande escala."] },
        { titulo: "Equipe especializada", paragrafos: ["Profissionais dedicados ao dimensionamento, implantação, gerenciamento e monitoramento dos ambientes."] },
        { titulo: "Monitoramento contínuo", paragrafos: ["Acompanhamento da infraestrutura para identificar eventos e atuar preventivamente."] },
        { titulo: "Suporte 24/7", paragrafos: ["Equipe técnica disponível continuamente, de acordo com o modelo contratado."] },
        { titulo: "Escalabilidade", paragrafos: ["Ambientes preparados para acompanhar o crescimento e as mudanças da operação."] },
        { titulo: "Projeto personalizado", paragrafos: ["Recursos dimensionados de acordo com usuários, aplicações, processamento, armazenamento e demais requisitos."] },
      ],
    },
    {
      estilo: "manifesto",
      paragrafos: [
        "Sua empresa não precisa investir em uma infraestrutura que pode ser mais um serviço para você administrar.",
        "A tecnologia necessária para operar um ERP, uma aplicação ou um sistema corporativo não precisa estar fisicamente dentro da sua empresa.",
        "Com a hospedagem em nuvem da Proc, sua organização conta com uma infraestrutura profissional, monitorada e gerenciada por especialistas, sem precisar assumir toda a complexidade de manter esse ambiente internamente.",
      ],
      fecho: ["Ganhe agilidade para crescer. A nuvem que sustenta sua operação."],
    },
    {
      eyebrow: "Proc Group",
      titulo: "Hospedagem em nuvem para empresas que precisam de estabilidade, segurança e performance.",
      paragrafos: ["Conte com uma infraestrutura preparada para o presente e pronta para acompanhar o futuro da sua empresa."],
      ctas: [{ label: "Fale com um especialista", href: "/preview/contato" }],
    },
  ],
};
