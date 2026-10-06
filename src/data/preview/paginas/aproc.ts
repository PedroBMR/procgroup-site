/**
 * Página A PROC, transcrita do documento "Ajustes no site" (páginas 5 a 10 do
 * PDF), na ordem do documento e sem resumir.
 *
 * Mudanças de texto em relação ao PDF: pontuação (travessão vira vírgula, pela
 * regra de escrita da Proc) e "ORACLE" em caixa alta vira "Oracle".
 *
 * Dois trechos estão aqui como o documento escreveu, mas dependem de decisão
 * (AUDITORIA-AJUSTES-SITE.md): Paraguai, Argentina e Bolívia (R3) e
 * "referência nacional" na Visão.
 */
import type { Pagina } from "../blocos";

export const aProc: Pagina = {
  hero: {
    eyebrow: "A Proc",
    titulo: "Tecnologia especializada para operações críticas que não podem parar. E que precisam evoluir.",
    lead: "Desde 2014, a Proc Group desenvolve e sustenta tecnologias para empresas que dependem de seus ambientes para operar, crescer e evoluir.",
  },
  blocos: [
    {
      subtitulo: "Nossa experiência reúne três áreas de atuação:",
      itensEstilo: "chips",
      itens: ["Infraestrutura de TI", "Hospedagem em nuvem", "Visão Computacional e Vídeo Analytics"],
      depois: [
        "Com equipes especializadas e dedicadas em cada área de negócio, tecnologia própria e parcerias com grandes marcas do mercado, desenvolvemos soluções para diferentes níveis de complexidade e exigência.",
      ],
      fecho: ["Mais de uma década transformando desafios tecnológicos em soluções reais para empresas de qualquer porte e segmento."],
    },
    {
      eyebrow: "Nossa história",
      titulo: "Uma trajetória construída sobre tecnologia, experiência e especialização.",
      paragrafos: [
        "A Proc nasceu em 2014 com um propósito muito claro: oferecer tecnologia e conhecimento especializado para sustentar operações empresariais que não podem parar.",
        "Desde o início, nossa atuação esteve concentrada em infraestrutura de TI e hospedagem em nuvem, construindo uma base sólida de conhecimento em servidores, redes, segurança, ambientes críticos, bancos de dados, virtualização e gestão de ambientes corporativos.",
        "Ao longo dos anos, fomos ampliando nossa estrutura, nossa equipe e nossa capacidade de atender projetos cada vez mais complexos, acompanhando a transformação dos ambientes de TI e a crescente dependência das empresas em relação à tecnologia.",
      ],
      colunas: 3,
      cards: [
        {
          n: "2014",
          titulo: "O início",
          paragrafos: [
            "A Proc inicia sua trajetória atuando em Infraestrutura de TI e Hospedagem em Nuvem, apoiando empresas na sustentação de seus ambientes tecnológicos e na continuidade de suas operações.",
          ],
        },
        {
          n: "2019",
          titulo: "Uma nova fronteira",
          paragrafos: [
            "Iniciamos nossos primeiros projetos em Visão Computacional, explorando o potencial da análise inteligente de imagens para solucionar desafios reais das empresas.",
            "A partir daí, começamos a desenvolver conhecimento e experiência em Inteligência Artificial aplicada a imagens, reconhecimento de pessoas e veículos, análise de comportamentos, rastreabilidade e inteligência operacional.",
          ],
        },
        {
          n: "Hoje",
          titulo: "A evolução",
          paragrafos: [
            "A experiência acumulada ao longo dos anos nos permitiu transformar essas competências em soluções cada vez mais especializadas.",
            "Hoje, a Proc combina infraestrutura, cloud e inteligência artificial para criar soluções tecnológicas alinhadas às necessidades específicas de cada operação.",
          ],
        },
      ],
    },
    {
      eyebrow: "Nossa expertise",
      titulo: "Experiência que vai além da tecnologia.",
      paragrafos: ["Ao longo de nossa trajetória, desenvolvemos conhecimento profundo nas áreas em que atuamos."],
      colunas: 3,
      cards: [
        {
          titulo: "Infraestrutura de TI",
          paragrafos: [
            "Projetamos, implantamos, monitoramos e sustentamos ambientes de TI para empresas que dependem de alta disponibilidade, segurança e desempenho.",
          ],
        },
        {
          titulo: "Hospedagem em nuvem",
          paragrafos: [
            "Oferecemos ambientes de hospedagem em nuvem dimensionados de acordo com as necessidades de cada operação, desde empresas que precisam de uma infraestrutura eficiente e segura até projetos corporativos de maior complexidade.",
            "Contamos com um datacenter próprio na cidade de Pato Branco e com datacenter em parceria com a Oracle (Oracle Cloud Infrastructure).",
          ],
        },
        {
          titulo: "Visão Computacional e Vídeo Analytics",
          paragrafos: [
            "Desenvolvemos tecnologia própria para transformar imagens em informações, automatizando processos, aumentando a capacidade de análise e criando novas possibilidades para diferentes operações empresariais.",
          ],
        },
      ],
    },
    {
      eyebrow: "Nosso diferencial",
      titulo: "Especialização construída em projetos reais.",
      subtitulo: "Tecnologia pode ser adquirida. Experiência precisa ser construída.",
      paragrafos: [
        "Nosso diferencial é resultado de anos trabalhando diretamente em ambientes reais, resolvendo problemas concretos e acompanhando a evolução das necessidades de nossos clientes.",
      ],
      colunas: 3,
      cards: [
        {
          titulo: "Equipes especializadas",
          paragrafos: [
            "Cada área de atuação possui profissionais com conhecimento específico, permitindo que cada projeto seja conduzido por especialistas que compreendem profundamente os desafios técnicos e operacionais envolvidos.",
          ],
        },
        {
          titulo: "Experiência prática",
          paragrafos: [
            "Mais de uma década de projetos, implantações e operações reais nos permite aplicar conhecimento acumulado para antecipar riscos, definir arquiteturas adequadas e encontrar soluções eficientes.",
          ],
        },
        {
          titulo: "Tecnologia própria",
          paragrafos: [
            "Nossa plataforma de Visão Computacional e Inteligência Artificial é desenvolvida pela própria Proc.",
            "Isso nos proporciona maior flexibilidade para adaptar a tecnologia às características de cada projeto, desenvolver funcionalidades específicas e evoluir a solução de acordo com as necessidades de nossos clientes.",
            "Além disso, nosso modelo permite oferecer soluções altamente especializadas com uma estrutura de investimento mais competitiva em comparação com plataformas globais de propósito mais amplo.",
          ],
        },
        {
          titulo: "Parcerias estratégicas",
          paragrafos: [
            "Trabalhamos com algumas das principais e mais robustas marcas de tecnologia do mercado, combinando nossa expertise com equipamentos, softwares e infraestrutura de fabricantes reconhecidos mundialmente.",
            "O resultado é uma arquitetura tecnológica construída com componentes confiáveis e dimensionados de acordo com cada projeto.",
          ],
        },
        {
          titulo: "Monitoramento e suporte técnico especializado 24/7",
          paragrafos: [
            "Operações críticas não escolhem horário para apresentar problemas.",
            "Por isso, mantemos estrutura de monitoramento e suporte técnico 24 horas por dia, 7 dias por semana, acompanhando a infraestrutura e atuando de forma preventiva sempre que necessário.",
          ],
        },
      ],
    },
    {
      titulo: "Tecnologia que se adapta à operação",
      subtitulo: "Não acreditamos em soluções genéricas para problemas específicos.",
      paragrafos: [
        "Cada empresa possui uma realidade, uma infraestrutura, processos e necessidades diferentes.",
        "Por isso, nossa abordagem parte da compreensão da operação para então definir a tecnologia mais adequada.",
        "Na infraestrutura e no Cloud, dimensionamos ambientes de acordo com requisitos de desempenho, segurança, disponibilidade e crescimento.",
        "Na Visão Computacional, nossa tecnologia própria permite adaptar modelos, funcionalidades e fluxos às particularidades de cada projeto.",
      ],
      fecho: ["O resultado é uma solução dimensionada para a realidade do cliente, e não uma operação obrigada a se adaptar às limitações de uma plataforma."],
    },
    {
      eyebrow: "Proc Group hoje",
      titulo: "Uma empresa brasileira com atuação internacional.",
      paragrafos: [
        "Mais de uma década depois de sua fundação, a Proc Group ampliou sua atuação para além de suas origens.",
        "Hoje, atendemos empresas em todo o Brasil e iniciamos uma trajetória de expansão internacional, com projetos e clientes no Paraguai, Argentina e Bolívia.",
        "Nossa experiência nesses mercados representa o início de uma nova etapa: levar a expertise construída ao longo dos anos para novos países e novos desafios.",
      ],
      colunas: 3,
      cards: [
        { titulo: "Brasil", paragrafos: ["Atuação nacional em projetos de infraestrutura, cloud e visão computacional."] },
        { titulo: "América Latina", paragrafos: ["Presença internacional com clientes e projetos no Paraguai, Argentina e Bolívia."] },
        { titulo: "Expansão", paragrafos: ["Em desenvolvimento, novos mercados internacionais para ampliar nossa presença e levar nossas soluções a empresas de diferentes países."] },
      ],
    },
    {
      colunas: 3,
      cards: [
        {
          titulo: "Nossa Missão",
          paragrafos: [
            "Utilizar a tecnologia para proteger pessoas, conectar operações e transformar realidades, desenvolvendo soluções inovadoras que promovam segurança, eficiência e inteligência operacional para empresas e indústrias, gerando valor à sociedade e contribuindo para um futuro mais seguro, sustentável e conectado.",
          ],
        },
        {
          titulo: "Nossa Visão",
          paragrafos: [
            "Ser referência nacional em plataformas inteligentes para empresas e indústrias, reconhecida pela excelência técnica, inovação contínua e capacidade de transformar desafios complexos em soluções que impactam positivamente a vida das pessoas e a evolução das organizações.",
          ],
        },
        {
          titulo: "Nosso Propósito",
          paragrafos: ["Usar a tecnologia para tornar empresas mais seguras, eficientes e preparadas para o futuro."],
        },
      ],
    },
    {
      estilo: "manifesto",
      titulo: "Acreditamos que tecnologia não deve existir apenas pela tecnologia.",
      paragrafos: [
        "Ela precisa resolver problemas.",
        "Precisa proteger informações.",
        "Precisa manter as operações funcionando.",
        "Precisa eliminar desperdícios.",
        "Precisa aumentar a eficiência.",
        "Precisa transformar dados em conhecimento.",
        "E precisa criar novas possibilidades para as pessoas e para os negócios.",
      ],
    },
    {
      paragrafos: ["É por isso que desenvolvemos nossa trajetória em torno de três pilares: sustentar, proteger e transformar."],
      colunas: 3,
      cards: [
        { titulo: "Sustentar", paragrafos: ["Sustentar operações através de uma infraestrutura de TI confiável."] },
        { titulo: "Proteger", paragrafos: ["Proteger dados, sistemas e ambientes críticos através de tecnologia e conhecimento especializado."] },
        { titulo: "Transformar", paragrafos: ["Transformar processos e informações através da Inteligência Artificial e da Visão Computacional."] },
      ],
    },
    {
      estilo: "manifesto",
      titulo: "Mais de uma década de experiência. Uma visão voltada para o futuro.",
      paragrafos: [
        "Desde 2014, evoluímos junto com a tecnologia e, principalmente, junto com as necessidades de nossos clientes.",
        "Hoje, continuamos fazendo o que sempre nos trouxe até aqui: combinar conhecimento, tecnologia e experiência para resolver problemas reais.",
        "E seguimos preparados para os próximos desafios.",
      ],
      fecho: ["Proc Group. Tecnologia especializada para empresas que não podem parar."],
      ctas: [
        { label: "Conheça nossas soluções", href: "/preview/solucoes" },
        { label: "Fale com um especialista", href: "/preview/contato" },
      ],
    },
  ],
};
