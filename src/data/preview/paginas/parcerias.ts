/**
 * Página SEJA UM PARCEIRO DA PROC, transcrita do documento "Ajustes no site"
 * (páginas 32 a 40 do PDF), na ordem do documento e sem resumir.
 *
 * Mudança de texto em relação ao PDF: pontuação. Travessão vira dois-pontos
 * no título dos formulários, pela regra de escrita da Proc.
 *
 * O programa de Indicação está completo aqui para o comercial avaliar, mas NÃO
 * pode ir ao ar como está (AUDITORIA-AJUSTES-SITE.md): o formulário 1 coleta
 * dado pessoal da empresa indicada sem base legal declarada (R2) e a regra 12
 * cita um regulamento completo que ainda não existe (R4). Os formulários desta
 * cópia não enviam nada.
 */
import type { Pagina } from "../blocos";

export const parcerias: Pagina = {
  hero: {
    eyebrow: "Seja um Parceiro da Proc",
    titulo: "Vamos crescer juntos.",
    lead: "Boas oportunidades podem surgir em qualquer lugar.",
  },
  blocos: [
    {
      paragrafos: [
        "A Proc acredita que grandes resultados também são construídos por meio de boas parcerias.",
        "Por isso, criamos diferentes modelos para que profissionais, empresas de tecnologia e parceiros técnicos possam trabalhar junto com a Proc, gerar novas oportunidades e ampliar seus negócios.",
      ],
      fecho: ["Encontre o modelo de parceria que mais combina com você."],
      colunas: 3,
      cards: [
        { titulo: "Indique oportunidades.", href: "#indicacao" },
        { titulo: "Hospede suas soluções.", href: "#software" },
        { titulo: "Seja um parceiro técnico.", href: "#tecnicos" },
      ],
    },
    {
      id: "indicacao",
      titulo: "Indicação de Oportunidades",
      paragrafos: [
        "O Programa de Indicação de Oportunidades de Negócios foi criado para ser simples, rápido e acessível a qualquer pessoa.",
        "Se você identificou uma empresa que pode se beneficiar de alguma das soluções da Proc, basta realizar a indicação pelo formulário disponível em nosso site.",
        "A partir daí, nossa equipe comercial assume o processo.",
        "E se a oportunidade resultar em um contrato, você recebe um bônus pela venda.",
      ],
      fecho: ["Você identifica a oportunidade. A Proc conduz o negócio. Se fechar, você ganha."],
    },
    {
      titulo: "Como funciona?",
      itensEstilo: "numerada",
      itens: [
        "Você identifica uma oportunidade",
        "Faça o cadastro da indicação",
        "A Proc valida a oportunidade",
        "Entramos em contato e definimos com você como vamos trabalhar a oportunidade",
        "Você pode participar junto, ou",
        "A Proc conduz a negociação.",
        "Mantemos você informado durante toda negociação",
        "Negócio fechado! Você ganha!",
      ],
      depois: [
        "Se a empresa indicada fechar o contrato dentro das regras do programa e cumprir as condições de pagamento, o parceiro recebe o bônus correspondente à indicação.",
      ],
    },
    {
      titulo: "Quem pode participar?",
      paragrafos: [
        "O programa é aberto a qualquer pessoa, profissional ou empresa que identifique uma oportunidade comercial para a Proc.",
        "Você pode participar mesmo sem atuar diretamente com tecnologia.",
      ],
      itensTitulo: "Pode ser:",
      itensEstilo: "check",
      itens: [
        "Profissional de TI",
        "Consultor",
        "Empresário",
        "Representante comercial",
        "Prestador de serviços",
        "Parceiro de negócios",
        "Cliente",
        "Profissional de outra área",
        "Ou qualquer pessoa que conheça uma empresa que possa se beneficiar das soluções Proc",
      ],
    },
    {
      titulo: "Regras para validar uma indicação",
      paragrafos: [
        "Para garantir transparência e evitar conflitos entre oportunidades, algumas regras precisam ser observadas.",
        "A indicação será considerada válida quando:",
      ],
      colunas: 3,
      cards: [
        {
          n: "01",
          titulo: "Dados completos e válidos",
          itensTitulo: "A empresa indicada deve possuir dados cadastrais válidos, incluindo:",
          itens: ["CNPJ", "Razão Social", "Nome completo da pessoa responsável", "Telefone ou outro contato válido"],
        },
        { n: "02", titulo: "Novo relacionamento comercial", paragrafos: ["A empresa indicada não pode ser cliente ativo da Proc."] },
        {
          n: "03",
          titulo: "Empresas do mesmo grupo",
          paragrafos: ["A empresa indicada não pode pertencer a um grupo econômico que já possua empresas clientes ativas da Proc."],
        },
        {
          n: "04",
          titulo: "Não pode ser parceira Proc",
          paragrafos: ["A empresa indicada não pode já possuir uma relação de parceria comercial ou técnica formalizada com a Proc."],
        },
        {
          n: "05",
          titulo: "Não pode ter sido indicada anteriormente",
          paragrafos: [
            "A oportunidade não pode já ter sido cadastrada por outro parceiro.",
            "Quando houver mais de uma indicação da mesma empresa, será considerada a primeira indicação válida registrada e aceita pela Proc.",
          ],
        },
        {
          n: "06",
          titulo: "Não pode já estar em negociação com a Proc",
          paragrafos: [
            "A empresa indicada não pode já estar cadastrada no processo comercial da Proc ou possuir uma negociação em andamento com nossa equipe.",
          ],
        },
        {
          n: "07",
          titulo: "Prazo para fechamento",
          paragrafos: [
            "Para gerar direito ao bônus, a oportunidade indicada deverá resultar em contratação em até 90 dias a partir da data da indicação formalizada e validada pela Proc, salvo condições específicas previamente acordadas.",
          ],
        },
        {
          n: "08",
          titulo: "Pagamento do contrato",
          paragrafos: [
            "O bônus será devido somente após o recebimento pela Proc dos valores correspondentes à venda realizada.",
            "Contratos inadimplentes ou valores ainda não recebidos não geram direito ao pagamento do bônus até que a situação seja regularizada.",
          ],
        },
        {
          n: "09",
          titulo: "Informações verdadeiras",
          paragrafos: [
            "As informações fornecidas no cadastro devem ser verdadeiras e obtidas de forma legítima.",
            "A indicação não deve envolver dados obtidos de maneira irregular ou qualquer prática que possa violar direitos de terceiros ou a legislação aplicável.",
          ],
        },
        {
          n: "10",
          titulo: "Aprovação da oportunidade",
          paragrafos: [
            "O simples preenchimento do formulário não garante a validação da indicação.",
            "A oportunidade precisa ser analisada e formalmente aceita pela gestão comercial da Proc.",
          ],
        },
        {
          n: "11",
          titulo: "Uma oportunidade por indicação",
          paragrafos: [
            "Cada indicação deve representar uma oportunidade comercial identificável, evitando cadastros genéricos ou indicações sem potencial de contato comercial.",
          ],
        },
        {
          n: "12",
          titulo: "Conflitos comerciais",
          paragrafos: [
            "A Proc poderá não aceitar uma indicação quando houver conflito comercial, negociação prévia, relacionamento existente ou outra condição que impeça a participação da oportunidade no programa.",
          ],
        },
      ],
      depois: [
        "O regulamento completo do programa poderá estabelecer outras condições, critérios e procedimentos aplicáveis ao pagamento dos bônus.",
      ],
    },
    {
      titulo: "Como acompanhamos sua indicação",
      paragrafos: ["Depois que a indicação for validada, nossa equipe mantém o parceiro informado sobre a evolução da oportunidade."],
      fluxo: ["Indicação", "Validação", "Contato", "Reunião", "Proposta", "Negociação", "Fechamento"],
      depois: [
        "Em cada etapa relevante, o parceiro recebe as informações necessárias para acompanhar o andamento da oportunidade, respeitando os limites de confidencialidade comercial e as informações que possam ser compartilhadas. Sempre que preferir, o parceiro pode participar junto com a Proc, durante todas as reuniões com a oportunidade indicada.",
      ],
    },
    {
      id: "software",
      titulo: "Parceria com desenvolvedores de software",
      subtitulo: "Sua solução. Nossa infraestrutura.",
      paragrafos: [
        "Você desenvolveu um ERP, aplicativo, sistema de gestão, BI, site ou outra aplicação?",
        "Então podemos ajudar você a entregar uma solução ainda mais completa aos seus clientes.",
        "A Proc possui mais de 10 anos de experiência em hospedagem e gerenciamento de ambientes para aplicações corporativas, atuando no provisionamento, configuração, monitoramento e sustentação da infraestrutura necessária para que sua solução funcione.",
        "Muitas software houses enfrentam um problema comum:",
        "O cliente quer contratar o sistema, mas também precisa de servidor, banco de dados, armazenamento, backup, segurança, conectividade e suporte de infraestrutura.",
        "Em vez de assumir toda essa complexidade, você pode contar com a Proc.",
        "Estruturamos o ambiente necessário para sua aplicação e cuidamos da infraestrutura durante a operação.",
        "Assim, sua software house pode oferecer uma solução mais completa ao cliente.",
      ],
    },
    {
      titulo: "O que a Proc faz pela sua software house?",
      colunas: 4,
      cards: [
        { titulo: "Dimensionamento", paragrafos: ["Definimos os recursos de infraestrutura necessários para sua aplicação, considerando usuários, processamento, armazenamento e demais requisitos."] },
        { titulo: "Provisionamento", paragrafos: ["Criamos e configuramos o ambiente necessário para instalação e operação da sua solução."] },
        { titulo: "Gerenciamento", paragrafos: ["Administramos a infraestrutura e os recursos contratados."] },
        { titulo: "Monitoramento", paragrafos: ["Acompanhamos continuamente os principais indicadores do ambiente."] },
        { titulo: "Escalabilidade", paragrafos: ["A infraestrutura pode evoluir conforme sua aplicação e sua base de clientes crescem."] },
        { titulo: "Segurança", paragrafos: ["Podemos estruturar recursos de proteção e controle de acesso de acordo com os requisitos do projeto."] },
        { titulo: "Backup", paragrafos: ["Estruturamos políticas de proteção dos dados conforme a necessidade da aplicação."] },
        { titulo: "Suporte técnico 24/7", paragrafos: ["Contamos com equipe especializada para monitoramento e suporte técnico contínuo, de acordo com o ambiente contratado."] },
      ],
    },
    {
      titulo: "Você agrega valor. Seu cliente ganha tranquilidade.",
      paragrafos: ["Ao incluir a infraestrutura da Proc na sua proposta, sua software house pode oferecer ao cliente uma solução ainda mais completa."],
    },
    {
      titulo: "Ambiente escalável com rapidez e segurança",
      paragrafos: [
        "Projetamos ambientes preparados para acompanhar a evolução da sua solução.",
        "Se sua software house conquistar novos clientes, aumentar a quantidade de usuários ou precisar de mais capacidade de processamento e armazenamento, podemos ajustar a infraestrutura conforme a necessidade.",
      ],
      fecho: ["Você concentra seus esforços no desenvolvimento e evolução do seu software.", "A Proc cuida da infraestrutura necessária para fazê-lo funcionar."],
    },
    {
      id: "tecnicos",
      titulo: "Parceria com Profissionais Técnicos",
      paragrafos: [
        "A Proc também trabalha parcerias com profissionais e empresas que prestam serviços de infraestrutura de TI e desejam atuar como parceiros técnicos.",
        "Esse modelo foi criado principalmente para ampliar nossa capacidade de atendimento em diferentes regiões e, ao mesmo tempo, criar uma rede de profissionais que possa contar com a Proc quando precisar de apoio técnico.",
      ],
    },
    {
      titulo: "Seja um parceiro técnico da Proc",
      paragrafos: [
        "Se você presta serviços de infraestrutura, pode se cadastrar como um parceiro técnico da Proc.",
        "Quando surgir uma demanda na sua região de atuação, a Proc poderá entrar em contato para verificar sua disponibilidade e contratar sua atuação para execução do serviço.",
      ],
      itensTitulo: "Podemos trabalhar com demandas como:",
      itensEstilo: "check",
      itens: [
        "Instalação e configuração de equipamentos",
        "Servidores",
        "Redes",
        "Wi-Fi",
        "Switches",
        "Roteadores",
        "Firewall",
        "Infraestrutura local",
        "Instalação de hardware",
        "Manutenção",
        "Visitas técnicas",
        "Implantação de soluções",
        "Suporte presencial",
        "Outros serviços relacionados às soluções Proc",
      ],
    },
    {
      eyebrow: "E a parceria também funciona no sentido contrário.",
      titulo: "Precisou de apoio em um projeto?",
      subtitulo: "A Proc também pode ser seu parceiro técnico.",
      paragrafos: [
        "Se você possui muitos projetos, uma demanda maior do que sua equipe consegue absorver ou precisa de especialistas em alguma das áreas que atendemos, pode contar com a Proc para apoiar sua operação.",
      ],
      itensTitulo: "Você pode nos acionar para serviços relacionados às nossas soluções de:",
      itensEstilo: "chips",
      itens: ["Infraestrutura de TI", "Hospedagem em Nuvem", "Visão Computacional e Vídeo Analytics"],
      depois: [
        "Assim, você não precisa recusar uma oportunidade simplesmente porque não possui estrutura suficiente para executá-la naquele momento.",
        "Nossa estratégia é construir uma rede de parceiros confiáveis, com relacionamento de longo prazo e capacidade técnica.",
        "Quando trabalhamos juntos, podemos ampliar nossa presença, atender clientes em mais regiões e executar projetos com mais agilidade.",
      ],
      fecho: ["Mais alcance para a Proc. Mais oportunidades para o parceiro.", "Mais capacidade de atendimento para o cliente."],
    },
    {
      titulo: "Bonificação e condições comerciais",
      paragrafos: [
        "Nos modelos de parceria que envolvem geração de negócios, o bônus é definido como um percentual sobre o valor da venda, considerando as características de cada projeto e demanda.",
      ],
      itensTitulo: "O percentual e as condições aplicáveis serão analisados individualmente pela Proc, de acordo com:",
      itensEstilo: "check",
      itens: [
        "Tipo de solução",
        "Valor do projeto",
        "Complexidade",
        "Participação do parceiro",
        "Modelo de contratação",
        "Margem e condições comerciais",
        "Demais características da oportunidade",
      ],
      depois: ["As condições de cada parceria serão formalizadas antes da contratação ou execução do projeto, conforme o modelo aplicável."],
    },
    {
      estilo: "manifesto",
      eyebrow: "Proc Group",
      titulo: "A tecnologia funciona melhor quando pessoas e empresas trabalham juntas.",
      subtitulo: "Vamos crescer juntos.",
      paragrafos: ["Fale com nossa equipe sobre a parceria ideal para seu negócio."],
    },
    {
      id: "formularios",
      titulo: "Fale com nossa equipe",
      formularios: [
        {
          titulo: "Formulário 1: Indique uma oportunidade",
          campos: [
            "Dados do parceiro",
            "CNPJ/Razão Social da empresa indicada",
            "Nome e contato do responsável",
            "Solução/necessidade identificada",
            "Breve descrição da oportunidade",
            "Como o parceiro conhece a empresa",
          ],
          longos: ["Breve descrição da oportunidade"],
          opcoes: ["Quero apenas indicar", "Quero participar da negociação"],
        },
        {
          titulo: "Formulário 2: Parceiro Software House",
          campos: [
            "Empresa",
            "CNPJ",
            "Contato",
            "Tipo de software",
            "Quantidade aproximada de clientes",
            "Infraestrutura atual",
            "Necessidade de hospedagem",
            "ERP/aplicação utilizada",
            "Volume estimado de usuários",
          ],
        },
        {
          titulo: "Formulário 3: Parceiro Técnico",
          campos: [
            "Dados profissionais/empresa",
            "Região de atuação",
            "Cidades atendidas",
            "Especialidades técnicas",
            "Experiência",
            "Serviços que executa",
            "Disponibilidade para atendimento",
            "Dados fiscais/comerciais",
          ],
          longos: ["Serviços que executa"],
        },
      ],
    },
  ],
};
