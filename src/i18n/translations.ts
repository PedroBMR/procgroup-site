import type { Locale } from "./config";

export const translations = {
  pt: {
    common: {
      skipLink: "Pular para o conteúdo",
      langMenuLabel: "Idioma",
      /** Aviso de que o blog só existe em português (vem do WordPress, que é
          PT-only). Vazio em PT: lá o conteúdo já está no idioma da página. */
      blogLangNote: "",
      // Rótulos de landmark: eram fixos em português dentro dos componentes,
      // então as páginas /en e /es anunciavam "Navegação principal" ao lado de
      // "Skip to content" (WCAG 3.1.2).
      navMain: "Navegação principal",
      navFooter: "Navegação do rodapé",
      social: "Redes sociais",
      breadcrumb: "Trilha de navegação",
    },
    notFound: {
      metaTitle: "Página não encontrada",
      eyebrow: "Erro 404",
      title: "Esta página não existe",
      lead: "O endereço pode ter mudado, ou o link que você seguiu está desatualizado.",
      ctaHome: "Ir para a home",
      ctaContato: "Falar com a Proc",
    },
    nav: {
      home: "Home",
      empresa: "Empresa",
      plataforma: "Plataforma Proc AI",
      solucoes: "Soluções",
      segmentos: "Segmentos",
      cases: "Cases",
      blog: "Blog",
      contato: "Contato",
      cta: "Solicitar Demonstração",
      sol: {
        cidades: { label: "Cidades Inteligentes", desc: "Segurança pública e mobilidade urbana com IA" },
        seguranca: { label: "Segurança Corporativa", desc: "Videomonitoramento e controle de acesso para empresas" },
        ti: { label: "Infraestrutura de TI", desc: "Cloud, NOC, backup e governança de TI" },
        ia: { label: "IA Industrial", desc: "Visão computacional para indústria 4.0" },
      },
      seg: {
        governo: { label: "Governo e Segurança Pública", desc: "Prefeituras, secretarias e órgãos de segurança" },
        empresas: { label: "Empresas", desc: "Segurança corporativa, cloud e infraestrutura de TI" },
        industria: { label: "Indústria", desc: "Visão computacional para linhas de produção" },
      },
      blogMenu: {
        todo: { label: "Todo o conteúdo", desc: "Novidades, eventos e artigos técnicos" },
        novidades: { label: "Novidades", desc: "Lançamentos, projetos e institucional" },
        agenda: { label: "Agenda de Eventos", desc: "Feiras e encontros com a Proc Group" },
      },
    },
    topbar: {
      whatsapp: "WhatsApp Vendas",
      suporte: "Suporte Técnico",
      /** Mensagem já preenchida ao abrir o WhatsApp do suporte. */
      suporteMsg: "Olá! Preciso de suporte técnico.",
      trabalhe: "Trabalhe conosco",
    },
    ticker: {
      items: ["Câmeras", "Sensores", "Centros de Operação", "Cidades", "Empresas", "Indústrias"],
      highlight: "Uma plataforma. Tudo conectado.",
    },
    footer: {
      tagline: "Uma plataforma. Múltiplas soluções. Inteligência para um mundo mais seguro, conectado e eficiente.",
      navHeading: "Navegação",
      solucoesHeading: "Soluções",
      contatoHeading: "Contato",
      demoLink: "Solicitar demonstração",
      rights: "Todos os direitos reservados.",
      privacy: "Política de Privacidade",
      address: "Caetano Munhoz da Rocha, 480 — Pato Branco / PR",
      lgpdNote: "Dados tratados em conformidade com a LGPD",
      staticNote: "Site com tecnologia estática, otimizado para velocidade e segurança",
    },
    home: {
      metaTitle: "Proc Group — IA, Visão Computacional e Infraestrutura de TI",
      metaDescription:
        "A Proc desenvolve uma plataforma própria de Inteligência Artificial, Visão Computacional e Infraestrutura de TI para tornar cidades, empresas e indústrias mais seguras, eficientes e inteligentes.",
      heroEyebrow: "Plataforma Proc AI",
      heroTitle: "Tecnologia inteligente para um mundo mais seguro, conectado e eficiente.",
      heroSubtitle:
        "A Proc desenvolve soluções de Inteligência Artificial, Visão Computacional, Segurança Corporativa e Infraestrutura de TI que transformam dados em decisões inteligentes, protegendo pessoas e conectando cidades, empresas e indústrias em um único ecossistema tecnológico.",
      heroCtaPrimary: "Conheça a Plataforma Proc AI",
      heroCtaSecondary: "Solicite uma Demonstração",
      statsLabels: ["Clientes atendidos", "Anos de experiência", "Satisfação dos clientes"],
      supportLabel: "Monitoramento contínuo",
      aboutEyebrow: "O que a Proc faz?",
      aboutTitle:
        "Tecnologia que conecta Inteligência Artificial, Visão Computacional e Infraestrutura de TI para transformar operações.",
      aboutText:
        "A Proc desenvolve soluções tecnológicas que unem Inteligência Artificial, Visão Computacional, Analytics e Infraestrutura de TI para atender governos, empresas e indústrias. Nossa plataforma integra dados, equipamentos e sistemas em um único ecossistema, permitindo automatizar processos, fortalecer a segurança, aumentar a produtividade e apoiar decisões estratégicas com informações em tempo real.",
      aboutCta: "Conheça a Proc",
      aboutPhotoAlt: "Sede da Proc Group em Pato Branco",
      platformEyebrow: "Plataforma Proc AI",
      platformTitle: "Uma plataforma unificada, quatro áreas de negócio, um só ecossistema",
      platformText:
        "Plataforma unificada e integrada de IA, Analytics e Visão Computacional, para centralização e gestão inteligente de todas as operações — com equipes especializadas dedicadas a cada área de atuação.",
      platformCta: "Ver a Plataforma Proc AI",
      // Bloco "Uma Plataforma. Múltiplas Soluções." — as 6 capacidades da
      // plataforma (recorte do comercial). Só em PT por enquanto; a home guarda
      // a seção, então EN/ES seguem sem ela até traduzir.
      capEyebrow: "Plataforma Proc AI",
      capTitle: "Uma plataforma. Múltiplas soluções.",
      capLead:
        "Tecnologia desenvolvida para conectar todo o seu ecossistema. A Proc AI Platform reúne Inteligência Artificial, Visão Computacional, Analytics e Infraestrutura de TI em uma plataforma única, preparada para integrar diferentes tecnologias, automatizar processos e transformar dados em inteligência para apoiar decisões estratégicas.",
      capabilities: [
        {
          icon: "ai",
          name: "Inteligência Artificial",
          desc: "Algoritmos avançados para automação, criação de modelos, alertas inteligentes, análise de dados e tomada de decisões estratégicas.",
        },
        {
          icon: "vision",
          name: "Visão Computacional",
          desc: "Reconhecimento facial, leitura de placas, inspeção industrial, contagem e separação de produtos, controle de qualidade e análise inteligente de imagens.",
        },
        {
          icon: "integration",
          name: "Integração Total 4.0",
          desc: "Conecte câmeras, cancelas, balanças, catracas, portas, sensores, ERPs, CRMs, sistemas legados e dispositivos IoT em um único ambiente automatizado.",
        },
        {
          icon: "analytics",
          name: "Analytics em Tempo Real",
          desc: "Dashboards inteligentes com indicadores, alertas e informações para decisões rápidas e precisas.",
        },
        {
          icon: "infra",
          name: "Infraestrutura Robusta",
          desc: "Cloud, backup, firewall e antivírus corporativos, gestão de ambientes locais ou em nuvem, suporte e monitoramento 24×7 e alta disponibilidade para operações críticas.",
        },
        {
          icon: "scale",
          name: "Plataforma Escalável",
          desc: "Comece com uma solução e expanda para novas aplicações utilizando a mesma plataforma tecnológica.",
        },
      ],
      unitLink: "Ver soluções →",
      cards: {
        "cidades-inteligentes": {
          name: "Cidades Inteligentes",
          desc: "Soluções inteligentes para melhorar a vida da população na segurança pública e na mobilidade urbana das cidades.",
        },
        "seguranca-corporativa": {
          name: "Segurança Corporativa",
          desc: "Videomonitoramento e controle de acesso com IA para pessoas e veículos, com alertas para ações suspeitas.",
        },
        "infraestrutura-de-ti": {
          name: "Infraestrutura de TI",
          desc: "Gestão, monitoramento e sustentação de ambientes de TI — cloud, backup, firewall e antivírus para garantir performance e disponibilidade.",
        },
        "ia-industrial": {
          name: "IA Industrial",
          desc: "Visão Computacional Industrial com IA para automatizar inspeções de qualidade e aumentar a produtividade na indústria.",
        },
      },
      diffEyebrow: "Diferenciais",
      diffTitle: "Por que empresas e governos confiam na Proc",
      differentiators: [
        { title: "Arquitetura Escalável", desc: "Plataforma modular pronta para crescer com a operação do cliente." },
        { title: "IA Própria", desc: "Modelos de reconhecimento facial, LPR e analytics desenvolvidos internamente." },
        { title: "Alta Disponibilidade", desc: "Infraestrutura redundante com SLA de disponibilidade contínua." },
        { title: "Integração Aberta", desc: "APIs para conectar sistemas legados, sensores e plataformas de terceiros." },
        { title: "Especialistas Certificados", desc: "Equipes dedicadas por segmento, não generalistas." },
        { title: "Edge AI", desc: "Processamento de IA na borda para respostas em tempo real." },
      ],
      // Teaser de Cases na home (guardado — só PT por enquanto). Destaques vêm
      // do case real Pato 360°, já registrado em cases.astro.
      casesEyebrow: "Cases de sucesso",
      casesTitle: "Resultados reais em operações críticas",
      casesText:
        "Do Pato 360° — rede de videomonitoramento inteligente levada a cinco municípios via CPSI — à inspeção industrial automatizada, veja como a Proc AI Platform resolve desafios concretos de segurança pública, empresas e indústria.",
      casesCta: "Ver cases de sucesso",
      casesStats: [
        { value: "700+", label: "câmeras com IA em Pato Branco" },
        { value: "5", label: "municípios atendidos via CPSI" },
        { value: "24×7", label: "monitoramento em tempo real" },
      ],
      blogEyebrow: "Do nosso blog",
      blogTitle: "Ideias e bastidores da Proc AI Platform",
      blogCta: "Ver todos os posts",
      finalCtaTitle: "Pronto para transformar sua operação com inteligência artificial?",
      finalCtaText: "Fale com um especialista Proc e descubra a solução ideal para o seu contexto.",
      finalCtaButton: "Solicitar Demonstração",
    },
    solutions: {
      indexEyebrow: "Soluções",
      indexTitle: "Quatro unidades de negócio. Uma única plataforma.",
      ctaDemo: "Solicitar Demonstração",
      ctaPlatform: "Ver a Plataforma Proc AI",
      solutionsEyebrow: "Soluções",
      teamEyebrow: "Time dedicado",
      faqEyebrow: "Perguntas frequentes",
      faqTitlePrefix: "Dúvidas sobre",
      otherEyebrow: "Outras unidades de negócio",
      otherTitle: "Explore outras soluções da Proc AI Platform",
      pages: {
        "ia-industrial": {
          metaTitle: "IA Industrial — Visão Computacional",
          metaDescription:
            "Inspeção visual automatizada, controle de qualidade, contagem e rastreabilidade com Edge AI para reduzir perdas e aumentar a eficiência de linhas de produção.",
          heroTitle: "IA Industrial para aumentar a produtividade, a inspeção de qualidade e reduzir perdas na produção.",
          heroLead:
            "Automatize inspeções, controle de qualidade, contagem de peças e rastreabilidade com soluções de Visão Computacional com IA, que identificam falhas em tempo real e tornam sua produção mais eficiente.",
          solutionsHeading: "Tecnologias para controle de qualidade e inspeção industrial",
          teamDescription:
            "Profissionais dedicados a visão computacional industrial, com experiência em inspeção automatizada, edge AI e integração com linhas de produção.",
          finalCtaTitle: "Pronto para reduzir perdas com visão computacional?",
          finalCtaText: "Fale com um especialista em IA Industrial da Proc.",
          faqs: [
            {
              q: "A visão computacional industrial funciona em linhas de produção já existentes?",
              a: "Sim. As câmeras e sensores de Edge AI são instalados diretamente nas linhas existentes, sem necessidade de parar a produção para integração.",
            },
            {
              q: "Quais tipos de defeitos o sistema consegue detectar?",
              a: "Depende do treinamento do modelo para cada linha, mas cobrimos desde defeitos visuais superficiais até desvios dimensionais e de posicionamento de componentes.",
            },
            {
              q: "É possível rastrear peças ao longo de toda a linha de produção?",
              a: "Sim, a rastreabilidade via OCR e analytics permite acompanhar cada peça desde a entrada até a expedição, com histórico completo de inspeções.",
            },
          ],
        },
        "seguranca-corporativa": {
          metaTitle: "Segurança Corporativa — Proteção Inteligente",
          metaDescription:
            "Videomonitoramento com IA, controle de acesso facial, gestão de alarmes e monitoramento remoto para proteger patrimônio, pessoas e operações.",
          heroTitle: "Protegemos pessoas, patrimônios e operações com Inteligência Artificial.",
          heroLead:
            "Integre videomonitoramento inteligente com IA, controle de acesso facial, monitoramento perimetral com alertas e analytics em uma única plataforma, para elevar o nível do controle de acesso, da segurança e da eficiência da sua empresa.",
          solutionsHeading: "Tecnologias aplicadas à proteção de empresas e indústrias",
          teamDescription:
            "Profissionais dedicados a projetos de segurança eletrônica corporativa, com experiência em controle de acesso, videomonitoramento com IA e resposta a incidentes em tempo real.",
          finalCtaTitle: "Pronto para proteger sua operação com inteligência artificial?",
          finalCtaText: "Fale com um especialista em Segurança Corporativa da Proc.",
          faqs: [
            {
              q: "A solução funciona para condomínios, indústrias e escritórios?",
              a: "Sim. A plataforma se adapta a diferentes perfis de operação — de condomínios residenciais a plantas industriais — com controle de acesso, videomonitoramento e gestão de alarmes configuráveis para cada contexto.",
            },
            {
              q: "É possível integrar com câmeras e catracas já instaladas?",
              a: "Sim, a Proc AI Platform possui APIs abertas para integração com equipamentos de terceiros já instalados, evitando troca completa de infraestrutura.",
            },
            {
              q: "Como funciona o monitoramento remoto?",
              a: "Uma equipe especializada acompanha eventos e alarmes em tempo real a partir do Centro de Operações da Proc, acionando protocolos de resposta conforme a criticidade.",
            },
          ],
        },
        "infraestrutura-de-ti": {
          metaTitle: "Infraestrutura de TI — Alta Disponibilidade",
          metaDescription:
            "Cloud, backup, NOC, firewall, service desk e governança de infraestrutura para empresas que precisam de continuidade operacional e performance em escala.",
          heroTitle: "Infraestrutura preparada para operações críticas que não podem parar.",
          heroLead:
            "Garantimos disponibilidade, segurança e alta performance da sua infraestrutura de TI com monitoramento e suporte técnico 24×7, serviços especializados de cloud, backup, firewall e antivírus corporativos, segurança da informação e serviços gerenciados.",
          solutionsHeading: "Tecnologias para infraestrutura crítica e alta disponibilidade",
          teamDescription:
            "Profissionais dedicados a infraestrutura crítica, com experiência em cloud, redes, virtualização e governança de TI para operações de missão crítica.",
          finalCtaTitle: "Pronto para uma infraestrutura de TI mais confiável?",
          finalCtaText: "Fale com um especialista em Infraestrutura de TI da Proc.",
          faqs: [
            {
              q: "A Proc atende empresas que já têm infraestrutura própria?",
              a: "Sim. Atuamos tanto em migrações completas para cloud quanto em modelos híbridos, integrando infraestrutura própria do cliente com serviços gerenciados da Proc.",
            },
            {
              q: "Como funciona o NOC (Centro de Operações de Rede)?",
              a: "Nosso NOC monitora infraestrutura, rede e aplicações 24x7, identificando e respondendo a incidentes antes que afetem a operação do cliente.",
            },
            {
              q: "Quais SLAs de disponibilidade vocês oferecem?",
              a: "Os SLAs são definidos conforme a criticidade da operação do cliente, com contratos que preveem disponibilidade contínua para ambientes de missão crítica.",
            },
          ],
        },
        "cidades-inteligentes": {
          metaTitle: "Cidades Inteligentes — Segurança Pública com IA",
          metaDescription:
            "Soluções de reconhecimento facial, leitura de placas, videomonitoramento inteligente e centro integrado de operações para governos e municípios.",
          heroTitle: "Tecnologia para cidades mais seguras, conectadas e inteligentes.",
          heroLead:
            "Transforme o videomonitoramento em inteligência operacional com reconhecimento facial, leitura de placas, analytics e Centros Integrados de Operações — para apoiar decisões em tempo real, aumentar a segurança da população e a eficiência da mobilidade urbana.",
          solutionsHeading: "Tecnologias aplicadas à segurança pública e mobilidade urbana",
          teamDescription:
            "Profissionais dedicados a projetos de segurança pública, com experiência em centros de operações, videomonitoramento inteligente e integração com forças de segurança.",
          finalCtaTitle: "Vamos tornar sua cidade mais segura e inteligente?",
          finalCtaText: "Fale com um especialista em Cidades Inteligentes da Proc.",
          faqs: [
            {
              q: "Como a Proc apoia a segurança pública das cidades?",
              a: "Com uma plataforma integrada de videomonitoramento, reconhecimento facial, leitura de placas e analytics, conectada a um Centro Integrado de Operações operado por equipe especializada em segurança pública.",
            },
            {
              q: "As soluções se integram a sistemas já existentes no município?",
              a: "Sim. A Proc AI Platform possui APIs abertas para integração com câmeras, sensores e sistemas de gestão já utilizados pelo município.",
            },
            {
              q: "É possível monitorar escolas e mobilidade urbana na mesma plataforma?",
              a: "Sim, o monitoramento escolar e a mobilidade urbana fazem parte do mesmo ecossistema de Cidades Inteligentes, com dashboards unificados.",
            },
          ],
        },
      },
    },
  },

  en: {
    common: {
      skipLink: "Skip to content",
      langMenuLabel: "Language",
      blogLangNote: "Articles are published in Portuguese.",
      navMain: "Main navigation",
      navFooter: "Footer navigation",
      social: "Social media",
      breadcrumb: "Breadcrumb",
    },
    notFound: {
      metaTitle: "Page not found",
      eyebrow: "Error 404",
      title: "This page doesn't exist",
      lead: "The address may have changed, or the link you followed is out of date.",
      ctaHome: "Go to the homepage",
      ctaContato: "Talk to Proc",
    },
    nav: {
      home: "Home",
      empresa: "Company",
      plataforma: "Proc AI Platform",
      solucoes: "Solutions",
      segmentos: "Industries",
      cases: "Cases",
      blog: "Blog",
      contato: "Contact",
      cta: "Request a Demo",
      sol: {
        cidades: { label: "Smart Cities", desc: "Public safety and urban mobility powered by AI" },
        seguranca: { label: "Corporate Security", desc: "Video surveillance and access control for businesses" },
        ti: { label: "IT Infrastructure", desc: "Cloud, NOC, backup and IT governance" },
        ia: { label: "Industrial AI", desc: "Computer vision for Industry 4.0" },
      },
      seg: {
        governo: { label: "Government & Public Safety", desc: "City halls, agencies and security forces" },
        empresas: { label: "Enterprises", desc: "Corporate security, cloud and IT infrastructure" },
        industria: { label: "Industry", desc: "Computer vision for production lines" },
      },
      blogMenu: {
        todo: { label: "All content", desc: "News, events and technical articles" },
        novidades: { label: "News", desc: "Launches, projects and company updates" },
        agenda: { label: "Events Calendar", desc: "Trade shows and meetups with Proc Group" },
      },
    },
    topbar: {
      whatsapp: "WhatsApp Sales",
      suporte: "Technical Support",
      suporteMsg: "Hi! I need technical support.",
      trabalhe: "Careers",
    },
    ticker: {
      items: ["Cameras", "Sensors", "Operations Centers", "Cities", "Businesses", "Industries"],
      highlight: "One platform. Everything connected.",
    },
    footer: {
      tagline: "One platform. Multiple solutions. Intelligence for a safer, more connected, more efficient world.",
      navHeading: "Navigation",
      solucoesHeading: "Solutions",
      contatoHeading: "Contact",
      demoLink: "Request a demo",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      address: "Caetano Munhoz da Rocha, 480 — Pato Branco / PR — Brazil",
      lgpdNote: "Data processed in compliance with Brazil's LGPD",
      staticNote: "Static-tech site, optimized for speed and security",
    },
    home: {
      metaTitle: "Proc Group — AI, Computer Vision and IT Infrastructure",
      metaDescription:
        "Proc builds its own Artificial Intelligence, Computer Vision and IT Infrastructure platform to make cities, companies and industries safer, more efficient and smarter.",
      heroEyebrow: "Proc AI Platform",
      heroTitle: "Intelligent technology for a safer, more connected, more efficient world.",
      heroSubtitle:
        "Proc builds Artificial Intelligence, Computer Vision, Corporate Security and IT Infrastructure solutions that turn data into smart decisions — protecting people and connecting cities, companies and industries in a single technology ecosystem.",
      heroCtaPrimary: "Explore the Proc AI Platform",
      heroCtaSecondary: "Request a Demo",
      statsLabels: ["Clients served", "Years of experience", "Customer satisfaction"],
      supportLabel: "Continuous monitoring",
      aboutEyebrow: "What does Proc do?",
      aboutTitle:
        "Technology that connects Artificial Intelligence, Computer Vision and IT Infrastructure to transform operations.",
      aboutText:
        "Proc develops technology solutions that combine Artificial Intelligence, Computer Vision, Analytics and IT Infrastructure to serve governments, companies and industries. Our platform integrates data, equipment and systems into a single ecosystem — automating processes, strengthening security, boosting productivity and supporting strategic decisions with real-time information.",
      aboutCta: "About Proc",
      aboutPhotoAlt: "Proc Group headquarters in Pato Branco, Brazil",
      platformEyebrow: "Proc AI Platform",
      platformTitle: "One unified platform, four business units, a single ecosystem",
      platformText:
        "A unified, integrated platform of AI, Analytics and Computer Vision for centralizing and intelligently managing every operation — with dedicated specialist teams for each area.",
      platformCta: "See the Proc AI Platform",
      capEyebrow: "Proc AI Platform",
      capTitle: "One platform. Multiple solutions.",
      capLead:
        "Technology built to connect your entire ecosystem. The Proc AI Platform brings together Artificial Intelligence, Computer Vision, Analytics and IT Infrastructure in a single platform — ready to integrate different technologies, automate processes and turn data into intelligence to support strategic decisions.",
      capabilities: [
        {
          icon: "ai",
          name: "Artificial Intelligence",
          desc: "Advanced algorithms for automation, model building, smart alerts, data analysis and strategic decision-making.",
        },
        {
          icon: "vision",
          name: "Computer Vision",
          desc: "Facial recognition, license-plate reading, industrial inspection, product counting and sorting, quality control and intelligent image analysis.",
        },
        {
          icon: "integration",
          name: "Full 4.0 Integration",
          desc: "Connect cameras, barriers, scales, turnstiles, doors, sensors, ERPs, CRMs, legacy systems and IoT devices in a single automated environment.",
        },
        {
          icon: "analytics",
          name: "Real-Time Analytics",
          desc: "Smart dashboards with indicators, alerts and information for fast, accurate decisions.",
        },
        {
          icon: "infra",
          name: "Robust Infrastructure",
          desc: "Cloud, backup, corporate firewall and antivirus, management of on-premises or cloud environments, 24×7 support and monitoring, and high availability for mission-critical operations.",
        },
        {
          icon: "scale",
          name: "Scalable Platform",
          desc: "Start with one solution and expand to new applications using the same technology platform.",
        },
      ],
      unitLink: "See solutions →",
      cards: {
        "cidades-inteligentes": {
          name: "Smart Cities",
          desc: "Intelligent solutions to improve people's lives through public safety and urban mobility in cities.",
        },
        "seguranca-corporativa": {
          name: "Corporate Security",
          desc: "AI video surveillance and access control for people and vehicles, with alerts for suspicious activity.",
        },
        "infraestrutura-de-ti": {
          name: "IT Infrastructure",
          desc: "Management, monitoring and support of IT environments — cloud, backup, firewall and antivirus to ensure performance and availability.",
        },
        "ia-industrial": {
          name: "Industrial AI",
          desc: "Industrial computer vision with AI to automate quality inspections and boost productivity in industry.",
        },
      },
      diffEyebrow: "Why Proc",
      diffTitle: "Why businesses and governments trust Proc",
      differentiators: [
        { title: "Scalable Architecture", desc: "A modular platform ready to grow alongside the customer's operation." },
        { title: "Proprietary AI", desc: "Facial recognition, LPR and analytics models built in-house." },
        { title: "High Availability", desc: "Redundant infrastructure with continuous-uptime SLAs." },
        { title: "Open Integration", desc: "APIs to connect legacy systems, sensors and third-party platforms." },
        { title: "Certified Specialists", desc: "Dedicated teams per segment, not generalists." },
        { title: "Edge AI", desc: "On-the-edge AI processing for real-time responses." },
      ],
      casesEyebrow: "Success cases",
      casesTitle: "Real results in mission-critical operations",
      casesText:
        "From Pato 360° — an intelligent video-surveillance network rolled out to five municipalities via CPSI — to automated industrial inspection, see how the Proc AI Platform solves concrete challenges in public safety, business and industry.",
      casesCta: "See success cases",
      casesStats: [
        { value: "700+", label: "AI cameras in Pato Branco" },
        { value: "5", label: "municipalities served via CPSI" },
        { value: "24×7", label: "real-time monitoring" },
      ],
      blogEyebrow: "From our blog",
      blogTitle: "Ideas and behind-the-scenes of the Proc AI Platform",
      blogCta: "See all posts",
      finalCtaTitle: "Ready to transform your operation with artificial intelligence?",
      finalCtaText: "Talk to a Proc specialist and find the right solution for your context.",
      finalCtaButton: "Request a Demo",
    },
    solutions: {
      indexEyebrow: "Solutions",
      indexTitle: "Four business units. One single platform.",
      ctaDemo: "Request a Demo",
      ctaPlatform: "See the Proc AI Platform",
      solutionsEyebrow: "Solutions",
      teamEyebrow: "Dedicated team",
      faqEyebrow: "FAQ",
      faqTitlePrefix: "Questions about",
      otherEyebrow: "Other business units",
      otherTitle: "Explore other Proc AI Platform solutions",
      pages: {
        "ia-industrial": {
          metaTitle: "Industrial AI — Computer Vision",
          metaDescription:
            "Automated visual inspection, quality control, counting and traceability with Edge AI to reduce losses and boost production-line efficiency.",
          heroTitle: "Industrial AI to boost productivity, quality inspection and cut production losses.",
          heroLead:
            "Automate inspections, quality control, part counting and traceability with AI computer-vision solutions that spot defects in real time and make your production more efficient.",
          solutionsHeading: "Technologies for quality control and industrial inspection",
          teamDescription:
            "Specialists dedicated to industrial computer vision, experienced in automated inspection, edge AI and production-line integration.",
          finalCtaTitle: "Ready to cut losses with computer vision?",
          finalCtaText: "Talk to a Proc Industrial AI specialist.",
          faqs: [
            {
              q: "Does industrial computer vision work on existing production lines?",
              a: "Yes. The Edge AI cameras and sensors are installed directly on your existing lines, with no need to stop production for integration.",
            },
            {
              q: "What kinds of defects can the system detect?",
              a: "It depends on the model training for each line, but we cover everything from surface visual defects to dimensional and component-placement deviations.",
            },
            {
              q: "Can parts be traced across the whole production line?",
              a: "Yes — traceability via OCR and analytics follows each part from entry to shipping, with a full inspection history.",
            },
          ],
        },
        "seguranca-corporativa": {
          metaTitle: "Corporate Security — Intelligent Protection",
          metaDescription:
            "AI video surveillance, facial access control, alarm management and remote monitoring to protect assets, people and operations.",
          heroTitle: "We protect people, assets and operations with Artificial Intelligence.",
          heroLead:
            "Bring intelligent AI video surveillance, facial access control, alerted perimeter monitoring and analytics together on a single platform to raise the bar for your company's access control, security and efficiency.",
          solutionsHeading: "Technologies applied to protecting businesses and industries",
          teamDescription:
            "Specialists dedicated to corporate electronic-security projects, experienced in access control, AI video surveillance and real-time incident response.",
          finalCtaTitle: "Ready to protect your operation with artificial intelligence?",
          finalCtaText: "Talk to a Proc Corporate Security specialist.",
          faqs: [
            {
              q: "Does the solution work for residential complexes, industries and offices?",
              a: "Yes. The platform adapts to different operation profiles — from residential complexes to industrial plants — with access control, video surveillance and alarm management configurable for each context.",
            },
            {
              q: "Can it integrate with cameras and turnstiles already installed?",
              a: "Yes, the Proc AI Platform has open APIs to integrate with third-party equipment already installed, avoiding a full infrastructure replacement.",
            },
            {
              q: "How does remote monitoring work?",
              a: "A specialist team follows events and alarms in real time from Proc's Operations Center, triggering response protocols according to criticality.",
            },
          ],
        },
        "infraestrutura-de-ti": {
          metaTitle: "IT Infrastructure — High Availability",
          metaDescription:
            "Cloud, backup, NOC, firewall, service desk and infrastructure governance for companies that need operational continuity and performance at scale.",
          heroTitle: "Infrastructure built for mission-critical operations that can't stop.",
          heroLead:
            "We ensure the availability, security and high performance of your IT infrastructure with 24×7 monitoring and technical support, specialized cloud, backup, firewall and corporate antivirus services, information security and managed services.",
          solutionsHeading: "Technologies for critical infrastructure and high availability",
          teamDescription:
            "Specialists dedicated to critical infrastructure, experienced in cloud, networking, virtualization and IT governance for mission-critical operations.",
          finalCtaTitle: "Ready for more reliable IT infrastructure?",
          finalCtaText: "Talk to a Proc IT Infrastructure specialist.",
          faqs: [
            {
              q: "Does Proc serve companies that already have their own infrastructure?",
              a: "Yes. We handle both full cloud migrations and hybrid models, integrating the client's own infrastructure with Proc managed services.",
            },
            {
              q: "How does the NOC (Network Operations Center) work?",
              a: "Our NOC monitors infrastructure, network and applications 24x7, identifying and responding to incidents before they affect the client's operation.",
            },
            {
              q: "What availability SLAs do you offer?",
              a: "SLAs are defined according to the criticality of the client's operation, with contracts providing continuous availability for mission-critical environments.",
            },
          ],
        },
        "cidades-inteligentes": {
          metaTitle: "Smart Cities — Public Safety with AI",
          metaDescription:
            "Facial recognition, license-plate reading, intelligent video surveillance and integrated operations center solutions for governments and municipalities.",
          heroTitle: "Technology for safer, more connected, smarter cities.",
          heroLead:
            "Turn video surveillance into operational intelligence with facial recognition, license-plate reading, analytics and Integrated Operations Centers — to support real-time decisions, improve public safety and make urban mobility more efficient.",
          solutionsHeading: "Technologies applied to public safety and urban mobility",
          teamDescription:
            "Specialists dedicated to public-safety projects, experienced in operations centers, intelligent video surveillance and integration with security forces.",
          finalCtaTitle: "Shall we make your city safer and smarter?",
          finalCtaText: "Talk to a Proc Smart Cities specialist.",
          faqs: [
            {
              q: "How does Proc support cities' public safety?",
              a: "With an integrated platform of video surveillance, facial recognition, license-plate reading and analytics, connected to an Integrated Operations Center run by a public-safety specialist team.",
            },
            {
              q: "Do the solutions integrate with systems the municipality already has?",
              a: "Yes. The Proc AI Platform has open APIs to integrate with cameras, sensors and management systems already used by the municipality.",
            },
            {
              q: "Can schools and urban mobility be monitored on the same platform?",
              a: "Yes — school monitoring and urban mobility are part of the same Smart Cities ecosystem, with unified dashboards.",
            },
          ],
        },
      },
    },
  },

  es: {
    common: {
      skipLink: "Saltar al contenido",
      langMenuLabel: "Idioma",
      blogLangNote: "Los artículos se publican en portugués.",
      navMain: "Navegación principal",
      navFooter: "Navegación del pie de página",
      social: "Redes sociales",
      breadcrumb: "Ruta de navegación",
    },
    notFound: {
      metaTitle: "Página no encontrada",
      eyebrow: "Error 404",
      title: "Esta página no existe",
      lead: "La dirección puede haber cambiado, o el enlace que seguiste está desactualizado.",
      ctaHome: "Ir al inicio",
      ctaContato: "Hablar con Proc",
    },
    nav: {
      home: "Inicio",
      empresa: "Empresa",
      plataforma: "Plataforma Proc AI",
      solucoes: "Soluciones",
      segmentos: "Segmentos",
      cases: "Casos",
      blog: "Blog",
      contato: "Contacto",
      cta: "Solicitar Demostración",
      sol: {
        cidades: { label: "Ciudades Inteligentes", desc: "Seguridad pública y movilidad urbana con IA" },
        seguranca: { label: "Seguridad Corporativa", desc: "Videovigilancia y control de acceso para empresas" },
        ti: { label: "Infraestructura de TI", desc: "Cloud, NOC, backup y gobernanza de TI" },
        ia: { label: "IA Industrial", desc: "Visión artificial para la industria 4.0" },
      },
      seg: {
        governo: { label: "Gobierno y Seguridad Pública", desc: "Municipios, secretarías y órganos de seguridad" },
        empresas: { label: "Empresas", desc: "Seguridad corporativa, cloud e infraestructura de TI" },
        industria: { label: "Industria", desc: "Visión artificial para líneas de producción" },
      },
      blogMenu: {
        todo: { label: "Todo el contenido", desc: "Novedades, eventos y artículos técnicos" },
        novidades: { label: "Novedades", desc: "Lanzamientos, proyectos e institucional" },
        agenda: { label: "Agenda de Eventos", desc: "Ferias y encuentros con Proc Group" },
      },
    },
    topbar: {
      whatsapp: "WhatsApp Ventas",
      suporte: "Soporte Técnico",
      suporteMsg: "¡Hola! Necesito soporte técnico.",
      trabalhe: "Trabaja con Nosotros",
    },
    ticker: {
      items: ["Cámaras", "Sensores", "Centros de Operación", "Ciudades", "Empresas", "Industrias"],
      highlight: "Una plataforma. Todo conectado.",
    },
    footer: {
      tagline: "Una plataforma. Múltiples soluciones. Inteligencia para un mundo más seguro, conectado y eficiente.",
      navHeading: "Navegación",
      solucoesHeading: "Soluciones",
      contatoHeading: "Contacto",
      demoLink: "Solicitar demostración",
      rights: "Todos los derechos reservados.",
      privacy: "Política de Privacidad",
      address: "Caetano Munhoz da Rocha, 480 — Pato Branco / PR — Brasil",
      lgpdNote: "Datos tratados conforme a la LGPD de Brasil",
      staticNote: "Sitio con tecnología estática, optimizado para velocidad y seguridad",
    },
    home: {
      metaTitle: "Proc Group — IA, Visión Artificial e Infraestructura de TI",
      metaDescription:
        "Proc desarrolla su propia plataforma de Inteligencia Artificial, Visión Artificial e Infraestructura de TI para hacer que ciudades, empresas e industrias sean más seguras, eficientes e inteligentes.",
      heroEyebrow: "Plataforma Proc AI",
      heroTitle: "Tecnología inteligente para un mundo más seguro, conectado y eficiente.",
      heroSubtitle:
        "Proc desarrolla soluciones de Inteligencia Artificial, Visión Artificial, Seguridad Corporativa e Infraestructura de TI que transforman datos en decisiones inteligentes, protegiendo personas y conectando ciudades, empresas e industrias en un único ecosistema tecnológico.",
      heroCtaPrimary: "Conoce la Plataforma Proc AI",
      heroCtaSecondary: "Solicita una Demostración",
      statsLabels: ["Clientes atendidos", "Años de experiencia", "Satisfacción de clientes"],
      supportLabel: "Monitoreo continuo",
      aboutEyebrow: "¿Qué hace Proc?",
      aboutTitle:
        "Tecnología que conecta Inteligencia Artificial, Visión Artificial e Infraestructura de TI para transformar operaciones.",
      aboutText:
        "Proc desarrolla soluciones tecnológicas que unen Inteligencia Artificial, Visión Artificial, Analytics e Infraestructura de TI para atender a gobiernos, empresas e industrias. Nuestra plataforma integra datos, equipos y sistemas en un único ecosistema, permitiendo automatizar procesos, fortalecer la seguridad, aumentar la productividad y apoyar decisiones estratégicas con información en tiempo real.",
      aboutCta: "Conoce Proc",
      aboutPhotoAlt: "Sede de Proc Group en Pato Branco, Brasil",
      platformEyebrow: "Plataforma Proc AI",
      platformTitle: "Una plataforma unificada, cuatro áreas de negocio, un solo ecosistema",
      platformText:
        "Plataforma unificada e integrada de IA, Analytics y Visión Artificial, para la centralización y gestión inteligente de todas las operaciones — con equipos especializados dedicados a cada área.",
      platformCta: "Ver la Plataforma Proc AI",
      capEyebrow: "Plataforma Proc AI",
      capTitle: "Una plataforma. Múltiples soluciones.",
      capLead:
        "Tecnología desarrollada para conectar todo tu ecosistema. La Proc AI Platform reúne Inteligencia Artificial, Visión Artificial, Analytics e Infraestructura de TI en una plataforma única — preparada para integrar diferentes tecnologías, automatizar procesos y transformar datos en inteligencia para apoyar decisiones estratégicas.",
      capabilities: [
        {
          icon: "ai",
          name: "Inteligencia Artificial",
          desc: "Algoritmos avanzados para automatización, creación de modelos, alertas inteligentes, análisis de datos y toma de decisiones estratégicas.",
        },
        {
          icon: "vision",
          name: "Visión Artificial",
          desc: "Reconocimiento facial, lectura de placas, inspección industrial, conteo y separación de productos, control de calidad y análisis inteligente de imágenes.",
        },
        {
          icon: "integration",
          name: "Integración Total 4.0",
          desc: "Conecta cámaras, barreras, balanzas, torniquetes, puertas, sensores, ERPs, CRMs, sistemas heredados y dispositivos IoT en un único entorno automatizado.",
        },
        {
          icon: "analytics",
          name: "Analytics en Tiempo Real",
          desc: "Dashboards inteligentes con indicadores, alertas e información para decisiones rápidas y precisas.",
        },
        {
          icon: "infra",
          name: "Infraestructura Robusta",
          desc: "Cloud, backup, firewall y antivirus corporativos, gestión de entornos locales o en la nube, soporte y monitoreo 24×7 y alta disponibilidad para operaciones críticas.",
        },
        {
          icon: "scale",
          name: "Plataforma Escalable",
          desc: "Comienza con una solución y expande a nuevas aplicaciones utilizando la misma plataforma tecnológica.",
        },
      ],
      unitLink: "Ver soluciones →",
      cards: {
        "cidades-inteligentes": {
          name: "Ciudades Inteligentes",
          desc: "Soluciones inteligentes para mejorar la vida de la población en la seguridad pública y la movilidad urbana de las ciudades.",
        },
        "seguranca-corporativa": {
          name: "Seguridad Corporativa",
          desc: "Videovigilancia y control de acceso con IA para personas y vehículos, con alertas para acciones sospechosas.",
        },
        "infraestrutura-de-ti": {
          name: "Infraestructura de TI",
          desc: "Gestión, monitoreo y soporte de entornos de TI — cloud, backup, firewall y antivirus para garantizar rendimiento y disponibilidad.",
        },
        "ia-industrial": {
          name: "IA Industrial",
          desc: "Visión artificial industrial con IA para automatizar inspecciones de calidad y aumentar la productividad en la industria.",
        },
      },
      diffEyebrow: "Diferenciales",
      diffTitle: "Por qué empresas y gobiernos confían en Proc",
      differentiators: [
        { title: "Arquitectura Escalable", desc: "Plataforma modular lista para crecer junto a la operación del cliente." },
        { title: "IA Propia", desc: "Modelos de reconocimiento facial, LPR y analytics desarrollados internamente." },
        { title: "Alta Disponibilidad", desc: "Infraestructura redundante con SLA de disponibilidad continua." },
        { title: "Integración Abierta", desc: "APIs para conectar sistemas heredados, sensores y plataformas de terceros." },
        { title: "Especialistas Certificados", desc: "Equipos dedicados por segmento, no generalistas." },
        { title: "Edge AI", desc: "Procesamiento de IA en el borde para respuestas en tiempo real." },
      ],
      casesEyebrow: "Casos de éxito",
      casesTitle: "Resultados reales en operaciones críticas",
      casesText:
        "Del Pato 360° — red de videovigilancia inteligente llevada a cinco municipios vía CPSI — a la inspección industrial automatizada, mira cómo la Proc AI Platform resuelve desafíos concretos de seguridad pública, empresas e industria.",
      casesCta: "Ver casos de éxito",
      casesStats: [
        { value: "700+", label: "cámaras con IA en Pato Branco" },
        { value: "5", label: "municipios atendidos vía CPSI" },
        { value: "24×7", label: "monitoreo en tiempo real" },
      ],
      blogEyebrow: "De nuestro blog",
      blogTitle: "Ideas y detrás de escena de la Proc AI Platform",
      blogCta: "Ver todas las publicaciones",
      finalCtaTitle: "¿Listo para transformar tu operación con inteligencia artificial?",
      finalCtaText: "Habla con un especialista Proc y descubre la solución ideal para tu contexto.",
      finalCtaButton: "Solicitar Demostración",
    },
    solutions: {
      indexEyebrow: "Soluciones",
      indexTitle: "Cuatro unidades de negocio. Una sola plataforma.",
      ctaDemo: "Solicitar Demostración",
      ctaPlatform: "Ver la Plataforma Proc AI",
      solutionsEyebrow: "Soluciones",
      teamEyebrow: "Equipo dedicado",
      faqEyebrow: "Preguntas frecuentes",
      faqTitlePrefix: "Dudas sobre",
      otherEyebrow: "Otras unidades de negocio",
      otherTitle: "Explora otras soluciones de la Proc AI Platform",
      pages: {
        "ia-industrial": {
          metaTitle: "IA Industrial — Visión Artificial",
          metaDescription:
            "Inspección visual automatizada, control de calidad, conteo y trazabilidad con Edge AI para reducir pérdidas y aumentar la eficiencia de las líneas de producción.",
          heroTitle: "IA Industrial para aumentar la productividad, la inspección de calidad y reducir pérdidas en la producción.",
          heroLead:
            "Automatiza inspecciones, control de calidad, conteo de piezas y trazabilidad con soluciones de visión artificial con IA que identifican fallas en tiempo real y hacen tu producción más eficiente.",
          solutionsHeading: "Tecnologías para control de calidad e inspección industrial",
          teamDescription:
            "Profesionales dedicados a la visión artificial industrial, con experiencia en inspección automatizada, edge AI e integración con líneas de producción.",
          finalCtaTitle: "¿Listo para reducir pérdidas con visión artificial?",
          finalCtaText: "Habla con un especialista en IA Industrial de Proc.",
          faqs: [
            {
              q: "¿La visión artificial industrial funciona en líneas de producción ya existentes?",
              a: "Sí. Las cámaras y sensores de Edge AI se instalan directamente en las líneas existentes, sin necesidad de parar la producción para la integración.",
            },
            {
              q: "¿Qué tipos de defectos puede detectar el sistema?",
              a: "Depende del entrenamiento del modelo para cada línea, pero cubrimos desde defectos visuales superficiales hasta desviaciones dimensionales y de posicionamiento de componentes.",
            },
            {
              q: "¿Es posible rastrear piezas a lo largo de toda la línea de producción?",
              a: "Sí, la trazabilidad vía OCR y analytics permite seguir cada pieza desde la entrada hasta la expedición, con un historial completo de inspecciones.",
            },
          ],
        },
        "seguranca-corporativa": {
          metaTitle: "Seguridad Corporativa — Protección Inteligente",
          metaDescription:
            "Videovigilancia con IA, control de acceso facial, gestión de alarmas y monitoreo remoto para proteger patrimonio, personas y operaciones.",
          heroTitle: "Protegemos personas, patrimonios y operaciones con Inteligencia Artificial.",
          heroLead:
            "Integra videovigilancia inteligente con IA, control de acceso facial, monitoreo perimetral con alertas y analytics en una única plataforma, para elevar el nivel del control de acceso, la seguridad y la eficiencia de tu empresa.",
          solutionsHeading: "Tecnologías aplicadas a la protección de empresas e industrias",
          teamDescription:
            "Profesionales dedicados a proyectos de seguridad electrónica corporativa, con experiencia en control de acceso, videovigilancia con IA y respuesta a incidentes en tiempo real.",
          finalCtaTitle: "¿Listo para proteger tu operación con inteligencia artificial?",
          finalCtaText: "Habla con un especialista en Seguridad Corporativa de Proc.",
          faqs: [
            {
              q: "¿La solución funciona para condominios, industrias y oficinas?",
              a: "Sí. La plataforma se adapta a diferentes perfiles de operación — de condominios residenciales a plantas industriales — con control de acceso, videovigilancia y gestión de alarmas configurables para cada contexto.",
            },
            {
              q: "¿Es posible integrar con cámaras y torniquetes ya instalados?",
              a: "Sí, la Proc AI Platform tiene APIs abiertas para integrar con equipos de terceros ya instalados, evitando el cambio completo de infraestructura.",
            },
            {
              q: "¿Cómo funciona el monitoreo remoto?",
              a: "Un equipo especializado sigue eventos y alarmas en tiempo real desde el Centro de Operaciones de Proc, activando protocolos de respuesta según la criticidad.",
            },
          ],
        },
        "infraestrutura-de-ti": {
          metaTitle: "Infraestructura de TI — Alta Disponibilidad",
          metaDescription:
            "Cloud, backup, NOC, firewall, service desk y gobernanza de infraestructura para empresas que necesitan continuidad operativa y rendimiento a escala.",
          heroTitle: "Infraestructura preparada para operaciones críticas que no pueden parar.",
          heroLead:
            "Garantizamos la disponibilidad, seguridad y alto rendimiento de tu infraestructura de TI con monitoreo y soporte técnico 24×7, servicios especializados de cloud, backup, firewall y antivirus corporativos, seguridad de la información y servicios gestionados.",
          solutionsHeading: "Tecnologías para infraestructura crítica y alta disponibilidad",
          teamDescription:
            "Profesionales dedicados a infraestructura crítica, con experiencia en cloud, redes, virtualización y gobernanza de TI para operaciones de misión crítica.",
          finalCtaTitle: "¿Listo para una infraestructura de TI más confiable?",
          finalCtaText: "Habla con un especialista en Infraestructura de TI de Proc.",
          faqs: [
            {
              q: "¿Proc atiende a empresas que ya tienen infraestructura propia?",
              a: "Sí. Actuamos tanto en migraciones completas a la nube como en modelos híbridos, integrando la infraestructura propia del cliente con servicios gestionados de Proc.",
            },
            {
              q: "¿Cómo funciona el NOC (Centro de Operaciones de Red)?",
              a: "Nuestro NOC monitorea infraestructura, red y aplicaciones 24x7, identificando y respondiendo a incidentes antes de que afecten la operación del cliente.",
            },
            {
              q: "¿Qué SLAs de disponibilidad ofrecen?",
              a: "Los SLAs se definen según la criticidad de la operación del cliente, con contratos que prevén disponibilidad continua para entornos de misión crítica.",
            },
          ],
        },
        "cidades-inteligentes": {
          metaTitle: "Ciudades Inteligentes — Seguridad Pública con IA",
          metaDescription:
            "Soluciones de reconocimiento facial, lectura de placas, videovigilancia inteligente y centro integrado de operaciones para gobiernos y municipios.",
          heroTitle: "Tecnología para ciudades más seguras, conectadas e inteligentes.",
          heroLead:
            "Transforma la videovigilancia en inteligencia operativa con reconocimiento facial, lectura de placas, analytics y Centros Integrados de Operaciones — para apoyar decisiones en tiempo real, aumentar la seguridad de la población y la eficiencia de la movilidad urbana.",
          solutionsHeading: "Tecnologías aplicadas a la seguridad pública y la movilidad urbana",
          teamDescription:
            "Profesionales dedicados a proyectos de seguridad pública, con experiencia en centros de operaciones, videovigilancia inteligente e integración con fuerzas de seguridad.",
          finalCtaTitle: "¿Hacemos tu ciudad más segura e inteligente?",
          finalCtaText: "Habla con un especialista en Ciudades Inteligentes de Proc.",
          faqs: [
            {
              q: "¿Cómo apoya Proc la seguridad pública de las ciudades?",
              a: "Con una plataforma integrada de videovigilancia, reconocimiento facial, lectura de placas y analytics, conectada a un Centro Integrado de Operaciones operado por un equipo especializado en seguridad pública.",
            },
            {
              q: "¿Las soluciones se integran con sistemas ya existentes en el municipio?",
              a: "Sí. La Proc AI Platform tiene APIs abiertas para integrar con cámaras, sensores y sistemas de gestión ya utilizados por el municipio.",
            },
            {
              q: "¿Es posible monitorear escuelas y movilidad urbana en la misma plataforma?",
              a: "Sí, el monitoreo escolar y la movilidad urbana forman parte del mismo ecosistema de Ciudades Inteligentes, con dashboards unificados.",
            },
          ],
        },
      },
    },
  },
} satisfies Record<Locale, unknown>;
