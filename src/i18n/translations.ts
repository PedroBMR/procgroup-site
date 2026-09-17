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
        seguranca: { label: "Ambientes Inteligentes", desc: "Videomonitoramento e controle de acesso para empresas" },
        ti: { label: "Infraestrutura de TI", desc: "Cloud, NOC, backup e governança de TI" },
        ia: { label: "IA Industrial", desc: "Visão computacional para indústria 4.0" },
      },
      seg: {
        empresas: { label: "Empresas", desc: "Ambientes Inteligentes, cloud e infraestrutura de TI" },
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
      items: ["Câmeras", "Sensores", "Centros de Operação", "Empresas", "Indústrias"],
      highlight: "Engenharia própria. Tudo conectado.",
    },
    footer: {
      tagline: "Engenharia própria em IA e Visão Computacional. Inteligência para um mundo mais seguro, conectado e eficiente.",
      navHeading: "Navegação",
      solucoesHeading: "Soluções",
      contatoHeading: "Contato",
      demoLink: "Solicitar demonstração",
      suporteLink: "Suporte técnico",
      rights: "Todos os direitos reservados.",
      privacy: "Política de Privacidade",
      address: "Caetano Munhoz da Rocha, 480, Pato Branco / PR",
      mapLink: "Ver no mapa",
      lgpdNote: "Dados tratados em conformidade com a LGPD",
      staticNote: "Site com tecnologia estática, otimizado para velocidade e segurança",
    },
    home: {
      metaTitle: "Proc Group, IA, Visão Computacional e Infraestrutura de TI",
      metaDescription:
        "Plataforma própria de IA, Visão Computacional e Infraestrutura de TI que torna empresas e indústrias mais seguras, eficientes e inteligentes.",
      heroEyebrow: "Plataforma Proc AI",
      heroTitle: "Tecnologia inteligente para um mundo mais seguro, conectado e eficiente.",
      heroSubtitle:
        "A Proc desenvolve soluções de Inteligência Artificial, Visão Computacional, Ambientes Inteligentes e Infraestrutura de TI que transformam dados em decisões inteligentes, protegendo pessoas e apoiando empresas e indústrias, cada operação com a sua solução.",
      /** Versao curta, usada so abaixo de 640px. A longa ocupa sete linhas
          num celular de 375px e empurra a faixa do ticker para fora da
          primeira tela. Mesma promessa, sem a enumeracao completa. */
      heroSubtitleCurto:
        "IA, visão computacional, ambientes inteligentes e infraestrutura de TI que transformam os dados da sua operação em decisão.",
      heroCtaPrimary: "Conheça a Plataforma Proc AI",
      heroCtaSecondary: "Solicite uma Demonstração",
      statsLabels: ["Clientes atendidos", "Anos de experiência"],
      aboutEyebrow: "O que a Proc faz?",
      aboutTitle:
        "Tecnologia que conecta Inteligência Artificial, Visão Computacional e Infraestrutura de TI para transformar operações.",
      aboutText:
        "A Proc desenvolve soluções tecnológicas que unem Inteligência Artificial, Visão Computacional, Analytics e Infraestrutura de TI para atender empresas e indústrias, cada uma com a sua solução e a sua equipe. Cada solução integra dados, equipamentos e sistemas da operação que atende, permitindo automatizar processos, fortalecer a segurança, aumentar a produtividade e apoiar decisões estratégicas com informações em tempo real.",
      aboutCta: "Conheça a Proc",
      aboutPhotoAlt: "Sede da Proc Group em Pato Branco",
      platformEyebrow: "Plataforma Proc AI",
      platformTitle: "Tecnologia própria, com equipe especializada em cada operação",
      platformText:
        "IA, Analytics e Visão Computacional desenvolvidos pela nossa engenharia, aplicados à gestão inteligente da sua operação, com equipe especializada dedicada a ela.",
      platformCta: "Ver a Plataforma Proc AI",
      // Bloco das 6 capacidades da
      // plataforma (recorte do comercial). Só em PT por enquanto; a home guarda
      // a seção, então EN/ES seguem sem ela até traduzir.
      capEyebrow: "Plataforma Proc AI",
      capTitle: "Tecnologia própria. Especializada por operação.",
      capLead:
        "Tecnologia desenvolvida para conectar o ecossistema da sua operação. Inteligência Artificial, Visão Computacional, Analytics e Infraestrutura de TI da nossa engenharia, preparada para integrar diferentes tecnologias, automatizar processos e transformar dados em inteligência para apoiar decisões estratégicas.",
      capabilities: [
        {
          icon: "ai",
          name: "Inteligência Artificial",
          desc: "Algoritmos avançados para automação, criação de modelos, alertas inteligentes, análise de dados e tomada de decisões estratégicas.",
        },
        {
          icon: "vision",
          name: "Visão Computacional",
          desc: "Leitura de placas, inspeção industrial, contagem e separação de produtos, controle de qualidade e análise inteligente de imagens.",
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
          desc: "Comece com uma solução e expanda para novas aplicações dentro da mesma operação.",
        },
      ],
      unitLink: "Ver soluções →",
      cards: {
        "ambientes-inteligentes": {
          name: "Ambientes Inteligentes",
          desc: "Videomonitoramento e controle de acesso com IA para pessoas e veículos, com alertas para ações suspeitas.",
        },
        "infraestrutura-de-ti": {
          name: "Infraestrutura de TI",
          desc: "Gestão, monitoramento e sustentação de ambientes de TI, cloud, backup, firewall e antivírus para garantir performance e disponibilidade.",
        },
        "ia-industrial": {
          name: "IA Industrial",
          desc: "Visão Computacional Industrial com IA para automatizar inspeções de qualidade e aumentar a produtividade na indústria.",
        },
      },
      diffEyebrow: "Diferenciais",
      diffTitle: "Por que empresas e indústrias confiam na Proc",
      differentiators: [
        { title: "Arquitetura Escalável", desc: "Plataforma modular pronta para crescer com a operação do cliente." },
        { title: "IA Própria", desc: "Modelos de LPR e analytics desenvolvidos internamente." },
        { title: "Alta Disponibilidade", desc: "Infraestrutura redundante com SLA de disponibilidade contínua." },
        { title: "Integração Aberta", desc: "APIs para conectar sistemas legados, sensores e plataformas de terceiros." },
        { title: "Especialistas Certificados", desc: "Equipes dedicadas por segmento, não generalistas." },
        { title: "Edge AI", desc: "Processamento de IA na borda para respostas em tempo real." },
      ],
      // Teaser da pagina /cases. Era "Cases de sucesso / Resultados reais em
      // operacoes criticas", herdado de quando o Pato 360 estava no site. Depois
      // de 2026-08-27 nao ha nenhum case com cliente nomeado nem resultado
      // apurado aqui: a pagina mostra aplicacoes da plataforma e os tres
      // projetos de visao computacional entregues. O teaser diz isso.
      casesEyebrow: "Aplicações e projetos",
      casesTitle: "O que a plataforma resolve em operações críticas",
      casesText:
        "Do controle de acesso que não troca as catracas à inspeção de produto no chão de fábrica, veja o que a Proc AI Platform resolve em empresas e indústrias, incluindo os projetos de visão computacional que já entregamos.",
      casesCta: "Ver aplicações e projetos",
      blogEyebrow: "Do nosso blog",
      blogTitle: "Ideias e bastidores da Proc AI Platform",
      blogCta: "Ver todos os posts",
      finalCtaTitle: "Pronto para transformar sua operação com inteligência artificial?",
      finalCtaText: "Fale com um especialista Proc e descubra a solução ideal para o seu contexto.",
      finalCtaButton: "Solicitar Demonstração",
    },
    solutions: {
      indexEyebrow: "Soluções",
      indexTitle: "Especialistas em cada operação.",
      indexLead:
        "Três unidades, cada uma com engenharia e equipe próprias. A escolha começa pelo problema: liberar o acesso com controle, manter a operação de pé, ou enxergar o que a linha de produção não mostra.",
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
          metaTitle: "IA Industrial: Visão Computacional",
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
        "ambientes-inteligentes": {
          // "Seguranca Corporativa" era o nome antigo da unidade, aposentado em
          // 2026-08-20. Nome morto nao volta nem como palavra de titulo.
          metaTitle: "Ambientes Inteligentes: Acesso e Segurança",
          metaDescription:
            "Videomonitoramento com IA, controle e liberação de acesso e gestão de alarmes para proteger patrimônio, pessoas e operações.",
          // Era "Protegemos pessoas, patrimonios e operacoes". A Proc fornece a
          // tecnologia; quem protege e quem vigia e o cliente (fornece != opera).
          heroTitle: "Tecnologia para proteger pessoas, patrimônio e operações com Inteligência Artificial.",
          heroLead:
            "Integre videomonitoramento inteligente com IA, controle e liberação de acesso, monitoramento perimetral com alertas e analytics em uma única plataforma, para elevar o nível do controle de acesso, da segurança e da eficiência da sua empresa.",
          solutionsHeading: "Tecnologias aplicadas à proteção de empresas e indústrias",
          teamDescription:
            "Profissionais dedicados a projetos de segurança eletrônica corporativa, com experiência em controle de acesso, videomonitoramento com IA e geração de alertas em tempo real.",
          finalCtaTitle: "Pronto para proteger sua operação com inteligência artificial?",
          finalCtaText: "Fale com um especialista em Ambientes Inteligentes da Proc.",
          faqs: [
            {
              q: "A solução funciona para condomínios, indústrias e escritórios?",
              a: "Sim. A plataforma se adapta a diferentes perfis de operação, de condomínios residenciais a plantas industriais, com controle de acesso, videomonitoramento e gestão de alarmes configuráveis para cada contexto.",
            },
            {
              q: "É possível integrar com câmeras e catracas já instaladas?",
              a: "Sim, a Proc AI Platform possui APIs abertas para integração com equipamentos de terceiros já instalados, evitando troca completa de infraestrutura.",
            },
          ],
        },
        "infraestrutura-de-ti": {
          metaTitle: "Infraestrutura de TI: Alta Disponibilidade",
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
        seguranca: { label: "Smart Environments", desc: "Video surveillance and access control for businesses" },
        ti: { label: "IT Infrastructure", desc: "Cloud, NOC, backup and IT governance" },
        ia: { label: "Industrial AI", desc: "Computer vision for Industry 4.0" },
      },
      seg: {
        empresas: { label: "Enterprises", desc: "Smart Environments, cloud and IT infrastructure" },
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
      items: ["Cameras", "Sensors", "Operations Centers", "Businesses", "Industries"],
      highlight: "In-house engineering. Everything connected.",
    },
    footer: {
      tagline: "In-house AI and Computer Vision engineering. Intelligence for a safer, more connected, more efficient world.",
      navHeading: "Navigation",
      solucoesHeading: "Solutions",
      contatoHeading: "Contact",
      demoLink: "Request a demo",
      suporteLink: "Technical support",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      address: "Caetano Munhoz da Rocha, 480, Pato Branco / PR, Brazil",
      mapLink: "View on map",
      lgpdNote: "Data processed in compliance with Brazil's LGPD",
      staticNote: "Static-tech site, optimized for speed and security",
    },
    home: {
      metaTitle: "Proc Group, AI, Computer Vision and IT Infrastructure",
      metaDescription:
        "Proc's own AI, Computer Vision and IT Infrastructure platform makes companies and industries safer, smarter and more efficient.",
      heroEyebrow: "Proc AI Platform",
      heroTitle: "Intelligent technology for a safer, more connected, more efficient world.",
      heroSubtitle:
        "Proc builds Artificial Intelligence, Computer Vision, Smart Environments and IT Infrastructure solutions that turn data into smart decisions, protecting people and supporting companies and industries, each operation with its own solution.",
      /** Versao curta, usada so abaixo de 640px. A longa ocupa sete linhas
          num celular de 375px e empurra a faixa do ticker para fora da
          primeira tela. Mesma promessa, sem a enumeracao completa. */
      heroSubtitleCurto:
        "AI, computer vision, smart environments and IT infrastructure that turn your operation’s data into decisions.",
      heroCtaPrimary: "Explore the Proc AI Platform",
      heroCtaSecondary: "Request a Demo",
      statsLabels: ["Clients served", "Years of experience"],
      aboutEyebrow: "What does Proc do?",
      aboutTitle:
        "Technology that connects Artificial Intelligence, Computer Vision and IT Infrastructure to transform operations.",
      aboutText:
        "Proc develops technology solutions that combine Artificial Intelligence, Computer Vision, Analytics and IT Infrastructure to serve companies and industries, each with its own solution and its own team. Each solution integrates the data, equipment and systems of the operation it serves, automating processes, strengthening security, boosting productivity and supporting strategic decisions with real-time information.",
      aboutCta: "About Proc",
      aboutPhotoAlt: "Proc Group headquarters in Pato Branco, Brazil",
      platformEyebrow: "Proc AI Platform",
      platformTitle: "In-house technology, with a specialist team for each operation",
      // Era "A unified, integrated platform ... for ... every operation": a
      // unica sobra, so em EN, da construcao "uma plataforma para tudo" que PT e
      // ES ja tinham perdido em 2026-08-26. Alinhado aos outros dois idiomas.
      platformText:
        "AI, Analytics and Computer Vision built by our own engineering, applied to the intelligent management of your operation, with a specialist team dedicated to it.",
      platformCta: "See the Proc AI Platform",
      capEyebrow: "Proc AI Platform",
      capTitle: "In-house technology. Specialized by operation.",
      capLead:
        "Technology built to connect your operation's ecosystem. Artificial Intelligence, Computer Vision, Analytics and IT Infrastructure from our own engineering, ready to integrate different technologies, automate processes and turn data into intelligence to support strategic decisions.",
      capabilities: [
        {
          icon: "ai",
          name: "Artificial Intelligence",
          desc: "Advanced algorithms for automation, model building, smart alerts, data analysis and strategic decision-making.",
        },
        {
          icon: "vision",
          name: "Computer Vision",
          desc: "License-plate reading, industrial inspection, product counting and sorting, quality control and intelligent image analysis.",
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
        "ambientes-inteligentes": {
          name: "Smart Environments",
          desc: "AI video surveillance and access control for people and vehicles, with alerts for suspicious activity.",
        },
        "infraestrutura-de-ti": {
          name: "IT Infrastructure",
          desc: "Management, monitoring and support of IT environments, cloud, backup, firewall and antivirus to ensure performance and availability.",
        },
        "ia-industrial": {
          name: "Industrial AI",
          desc: "Industrial computer vision with AI to automate quality inspections and boost productivity in industry.",
        },
      },
      diffEyebrow: "Why Proc",
      diffTitle: "Why businesses and industries trust Proc",
      differentiators: [
        { title: "Scalable Architecture", desc: "A modular platform ready to grow alongside the customer's operation." },
        { title: "Proprietary AI", desc: "Automatic access release, LPR and analytics models built in-house." },
        { title: "High Availability", desc: "Redundant infrastructure with continuous-uptime SLAs." },
        { title: "Open Integration", desc: "APIs to connect legacy systems, sensors and third-party platforms." },
        { title: "Certified Specialists", desc: "Dedicated teams per segment, not generalists." },
        { title: "Edge AI", desc: "On-the-edge AI processing for real-time responses." },
      ],
      casesEyebrow: "Applications and projects",
      casesTitle: "What the platform solves in mission-critical operations",
      casesText:
        "From access control that keeps the turnstiles you already have to product inspection on the factory floor, see what the Proc AI Platform solves for business and industry, including the computer vision projects we have already delivered.",
      casesCta: "See applications and projects",
      blogEyebrow: "From our blog",
      blogTitle: "Ideas and behind-the-scenes of the Proc AI Platform",
      blogCta: "See all posts",
      finalCtaTitle: "Ready to transform your operation with artificial intelligence?",
      finalCtaText: "Talk to a Proc specialist and find the right solution for your context.",
      finalCtaButton: "Request a Demo",
    },
    solutions: {
      indexEyebrow: "Solutions",
      indexTitle: "Specialists in each operation.",
      indexLead:
        "Three units, each with its own engineering and team. Start from the problem: releasing access under control, keeping the operation running, or seeing what the production line does not show.",
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
          metaTitle: "Industrial AI: Computer Vision",
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
              a: "Yes, traceability via OCR and analytics follows each part from entry to shipping, with a full inspection history.",
            },
          ],
        },
        "ambientes-inteligentes": {
          metaTitle: "Smart Environments: Access and Security",
          metaDescription:
            "AI video surveillance, access control and release and alarm management to protect assets, people and operations.",
          heroTitle: "Technology to protect people, assets and operations with Artificial Intelligence.",
          heroLead:
            "Bring intelligent AI video surveillance, access control and release, alerted perimeter monitoring and analytics together on a single platform to raise the bar for your company's access control, security and efficiency.",
          solutionsHeading: "Technologies applied to protecting businesses and industries",
          teamDescription:
            "Specialists dedicated to corporate electronic-security projects, experienced in access control, AI video surveillance and real-time alerting.",
          finalCtaTitle: "Ready to protect your operation with artificial intelligence?",
          finalCtaText: "Talk to a Proc Smart Environments specialist.",
          faqs: [
            {
              q: "Does the solution work for residential complexes, industries and offices?",
              a: "Yes. The platform adapts to different operation profiles, from residential complexes to industrial plants, with access control, video surveillance and alarm management configurable for each context.",
            },
            {
              q: "Can it integrate with cameras and turnstiles already installed?",
              a: "Yes, the Proc AI Platform has open APIs to integrate with third-party equipment already installed, avoiding a full infrastructure replacement.",
            },
          ],
        },
        "infraestrutura-de-ti": {
          metaTitle: "IT Infrastructure: High Availability",
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
        seguranca: { label: "Ambientes Inteligentes", desc: "Videovigilancia y control de acceso para empresas" },
        ti: { label: "Infraestructura de TI", desc: "Cloud, NOC, backup y gobernanza de TI" },
        ia: { label: "IA Industrial", desc: "Visión artificial para la industria 4.0" },
      },
      seg: {
        empresas: { label: "Empresas", desc: "Ambientes Inteligentes, cloud e infraestructura de TI" },
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
      items: ["Cámaras", "Sensores", "Centros de Operación", "Empresas", "Industrias"],
      highlight: "Ingeniería propia. Todo conectado.",
    },
    footer: {
      tagline: "Ingeniería propia en IA y Visión Artificial. Inteligencia para un mundo más seguro, conectado y eficiente.",
      navHeading: "Navegación",
      solucoesHeading: "Soluciones",
      contatoHeading: "Contacto",
      demoLink: "Solicitar demostración",
      suporteLink: "Soporte técnico",
      rights: "Todos los derechos reservados.",
      privacy: "Política de Privacidad",
      address: "Caetano Munhoz da Rocha, 480, Pato Branco / PR, Brasil",
      mapLink: "Ver en el mapa",
      lgpdNote: "Datos tratados conforme a la LGPD de Brasil",
      staticNote: "Sitio con tecnología estática, optimizado para velocidad y seguridad",
    },
    home: {
      metaTitle: "Proc Group, IA, Visión Artificial e Infraestructura de TI",
      metaDescription:
        "Plataforma propia de IA, Visión Artificial e Infraestructura de TI que hace más seguras, eficientes e inteligentes a empresas e industrias.",
      heroEyebrow: "Plataforma Proc AI",
      heroTitle: "Tecnología inteligente para un mundo más seguro, conectado y eficiente.",
      heroSubtitle:
        "Proc desarrolla soluciones de Inteligencia Artificial, Visión Artificial, Ambientes Inteligentes e Infraestructura de TI que transforman datos en decisiones inteligentes, protegiendo personas y apoyando a empresas e industrias, cada operación con su solución.",
      /** Versao curta, usada so abaixo de 640px. A longa ocupa sete linhas
          num celular de 375px e empurra a faixa do ticker para fora da
          primeira tela. Mesma promessa, sem a enumeracao completa. */
      heroSubtitleCurto:
        "IA, visión artificial, ambientes inteligentes e infraestructura de TI que convierten los datos de tu operación en decisiones.",
      heroCtaPrimary: "Conoce la Plataforma Proc AI",
      heroCtaSecondary: "Solicita una Demostración",
      statsLabels: ["Clientes atendidos", "Años de experiencia"],
      aboutEyebrow: "¿Qué hace Proc?",
      aboutTitle:
        "Tecnología que conecta Inteligencia Artificial, Visión Artificial e Infraestructura de TI para transformar operaciones.",
      aboutText:
        "Proc desarrolla soluciones tecnológicas que unen Inteligencia Artificial, Visión Artificial, Analytics e Infraestructura de TI para atender a empresas e industrias, cada una con su solución y su equipo. Cada solución integra los datos, equipos y sistemas de la operación que atiende, permitiendo automatizar procesos, fortalecer la seguridad, aumentar la productividad y apoyar decisiones estratégicas con información en tiempo real.",
      aboutCta: "Conoce Proc",
      aboutPhotoAlt: "Sede de Proc Group en Pato Branco, Brasil",
      platformEyebrow: "Plataforma Proc AI",
      platformTitle: "Tecnología propia, con equipo especializado en cada operación",
      platformText:
        "IA, Analytics y Visión Artificial desarrollados por nuestra ingeniería, aplicados a la gestión inteligente de tu operación, con equipo especializado dedicado a ella.",
      platformCta: "Ver la Plataforma Proc AI",
      capEyebrow: "Plataforma Proc AI",
      capTitle: "Tecnología propia. Especializada por operación.",
      capLead:
        "Tecnología desarrollada para conectar el ecosistema de tu operación. Inteligencia Artificial, Visión Artificial, Analytics e Infraestructura de TI de nuestra ingeniería, preparada para integrar diferentes tecnologías, automatizar procesos y transformar datos en inteligencia para apoyar decisiones estratégicas.",
      capabilities: [
        {
          icon: "ai",
          name: "Inteligencia Artificial",
          desc: "Algoritmos avanzados para automatización, creación de modelos, alertas inteligentes, análisis de datos y toma de decisiones estratégicas.",
        },
        {
          icon: "vision",
          name: "Visión Artificial",
          desc: "Lectura de placas, inspección industrial, conteo y separación de productos, control de calidad y análisis inteligente de imágenes.",
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
          desc: "Comienza con una solución y expande a nuevas aplicaciones dentro de la misma operación.",
        },
      ],
      unitLink: "Ver soluciones →",
      cards: {
        "ambientes-inteligentes": {
          name: "Ambientes Inteligentes",
          desc: "Videovigilancia y control de acceso con IA para personas y vehículos, con alertas para acciones sospechosas.",
        },
        "infraestrutura-de-ti": {
          name: "Infraestructura de TI",
          desc: "Gestión, monitoreo y soporte de entornos de TI, cloud, backup, firewall y antivirus para garantizar rendimiento y disponibilidad.",
        },
        "ia-industrial": {
          name: "IA Industrial",
          desc: "Visión artificial industrial con IA para automatizar inspecciones de calidad y aumentar la productividad en la industria.",
        },
      },
      diffEyebrow: "Diferenciales",
      diffTitle: "Por qué empresas e industrias confían en Proc",
      differentiators: [
        { title: "Arquitectura Escalable", desc: "Plataforma modular lista para crecer junto a la operación del cliente." },
        { title: "IA Propia", desc: "Modelos de LPR y analytics desarrollados internamente." },
        { title: "Alta Disponibilidad", desc: "Infraestructura redundante con SLA de disponibilidad continua." },
        { title: "Integración Abierta", desc: "APIs para conectar sistemas heredados, sensores y plataformas de terceros." },
        { title: "Especialistas Certificados", desc: "Equipos dedicados por segmento, no generalistas." },
        { title: "Edge AI", desc: "Procesamiento de IA en el borde para respuestas en tiempo real." },
      ],
      casesEyebrow: "Aplicaciones y proyectos",
      casesTitle: "Lo que la plataforma resuelve en operaciones críticas",
      casesText:
        "Del control de acceso que no cambia los torniquetes a la inspección de producto en planta, mira lo que la Proc AI Platform resuelve en empresas e industrias, incluidos los proyectos de visión artificial que ya entregamos.",
      casesCta: "Ver aplicaciones y proyectos",
      blogEyebrow: "De nuestro blog",
      blogTitle: "Ideas y detrás de escena de la Proc AI Platform",
      blogCta: "Ver todas las publicaciones",
      finalCtaTitle: "¿Listo para transformar tu operación con inteligencia artificial?",
      finalCtaText: "Habla con un especialista Proc y descubre la solución ideal para tu contexto.",
      finalCtaButton: "Solicitar Demostración",
    },
    solutions: {
      indexEyebrow: "Soluciones",
      indexTitle: "Especialistas en cada operación.",
      indexLead:
        "Tres unidades, cada una con ingeniería y equipo propios. Empieza por el problema: liberar el acceso con control, mantener la operación en pie, o ver lo que la línea de producción no muestra.",
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
          metaTitle: "IA Industrial: Visión Artificial",
          metaDescription:
            "Inspección visual, control de calidad, conteo y trazabilidad con Edge AI para reducir pérdidas y aumentar la eficiencia de las líneas de producción.",
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
        "ambientes-inteligentes": {
          metaTitle: "Ambientes Inteligentes: Acceso y Seguridad",
          metaDescription:
            "Videovigilancia con IA, control y liberación de acceso y gestión de alarmas para proteger patrimonio, personas y operaciones.",
          heroTitle: "Tecnología para proteger personas, patrimonio y operaciones con Inteligencia Artificial.",
          heroLead:
            "Integra videovigilancia inteligente con IA, control y liberación de acceso, monitoreo perimetral con alertas y analytics en una única plataforma, para elevar el nivel del control de acceso, la seguridad y la eficiencia de tu empresa.",
          solutionsHeading: "Tecnologías aplicadas a la protección de empresas e industrias",
          teamDescription:
            "Profesionales dedicados a proyectos de seguridad electrónica corporativa, con experiencia en control de acceso, videovigilancia con IA y generación de alertas en tiempo real.",
          finalCtaTitle: "¿Listo para proteger tu operación con inteligencia artificial?",
          finalCtaText: "Habla con un especialista en Ambientes Inteligentes de Proc.",
          faqs: [
            {
              q: "¿La solución funciona para condominios, industrias y oficinas?",
              a: "Sí. La plataforma se adapta a diferentes perfiles de operación, de condominios residenciales a plantas industriales, con control de acceso, videovigilancia y gestión de alarmas configurables para cada contexto.",
            },
            {
              q: "¿Es posible integrar con cámaras y torniquetes ya instalados?",
              a: "Sí, la Proc AI Platform tiene APIs abiertas para integrar con equipos de terceros ya instalados, evitando el cambio completo de infraestructura.",
            },
          ],
        },
        "infraestrutura-de-ti": {
          metaTitle: "Infraestructura de TI: Alta Disponibilidad",
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
      },
    },
  },
} satisfies Record<Locale, unknown>;
