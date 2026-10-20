/**
 * Página VISÃO COMPUTACIONAL E VÍDEO ANALYTICS, transcrita do documento
 * "Ajustes no site" (páginas 22 a 32 do PDF), na ordem do documento e sem
 * resumir.
 *
 * Mudanças em relação ao PDF, todas listadas em AUDITORIA-AJUSTES-SITE.md:
 *
 *   - pontuação: travessão vira vírgula, pela regra de escrita da Proc;
 *   - "relacionados à veículos" vira "relacionados a veículos" (crase);
 *   - CINCO itens saíram por regra de LGPD (R1 da auditoria). Todos identificam
 *     a mesma pessoa ou o mesmo veículo de cliente em momentos diferentes, ou
 *     medem o funcionário individualmente:
 *       fluxo de pessoas:  "Taxa de frequência", "Taxa de retorno",
 *                          "Análise de perfil", "Dados demográficos, quando
 *                          tecnicamente aplicáveis"
 *       fluxo de veículos: "Frequência e retorno"
 *       segurança operac.: "Permanência em postos de trabalho",
 *                          "Permanência em áreas comuns"
 *       pesquisa de pessoas: "Reconhecimento facial" como critério de busca
 *
 *     "Reconhecimento facial" FICA na lista geral do que a plataforma faz: é
 *     vocabulário público da Proc (contexto-proc lista Controle de Acesso
 *     Facial e Reconhecimento Facial entre as soluções). O que saiu é usar a
 *     face para procurar uma pessoa, que é marcação por biometria.
 */
import type { Pagina } from "../blocos";

export const visao: Pagina = {
  hero: {
    eyebrow: "Visão Computacional e Vídeo Analytics",
    titulo: "Transformamos imagens em dados para ajudar sua empresa a tomar decisões precisas e assertivas.",
    lead: "Desenvolvemos uma plataforma própria para criar sistemas avançados de videomonitoramento para apoio a decisões precisas e assertivas em ambientes corporativos e industriais.",
  },
  blocos: [
    {
      paragrafos: [
        "A Plataforma Proc utiliza algoritmos de visão computacional e inteligência artificial, analisa as imagens capturadas pelas câmeras e transforma eventos visuais em dados, indicadores, alertas e informações inteligentes para apoiar a gestão.",
        "De imagens que registram o passado para dados que ajudam a entender o presente e melhorar o futuro.",
        "A mesma tecnologia pode ser aplicada para entender o comportamento dos clientes em uma loja, monitorar a segurança de uma operação, acompanhar uma linha de produção ou automatizar um processo visual industrial.",
      ],
      fecho: ["Em uma única plataforma tecnológica. Soluções especializadas para cada realidade."],
    },
    {
      titulo: "O que a Plataforma Proc pode fazer na sua operação?",
      paragrafos: [
        "A Plataforma Proc pode analisar pessoas, veículos, objetos, produtos, processos e eventos a partir das imagens capturadas pelas câmeras.",
      ],
      itensTitulo: "Dependendo da aplicação e das tecnologias disponíveis nos equipamentos, é possível gerar informações como:",
      itensEstilo: "chips",
      itens: [
        "Contagem de pessoas",
        "Contagem e identificação de veículos",
        "Reconhecimento facial",
        "Reconhecimento de placas",
        "Características de pessoas",
        "Características de veículos",
        "Movimentação e fluxo",
        "Tempo de permanência",
        "Entrada e saída",
        "Áreas acessadas",
        "Comportamentos e eventos",
        "Produtos e objetos",
        "Defeitos e anomalias",
        "Processos produtivos",
        "Indicadores visuais",
        "Níveis, temperaturas e mostradores",
        "Movimentação de mercadorias",
        "Eventos pré-configurados",
        "Alertas em tempo real",
      ],
      depois: [
        "Os recursos disponíveis dependem das características das câmeras, da infraestrutura existente e dos objetivos definidos para cada projeto.",
      ],
    },
    {
      id: "inteligencia-comercial",
      eyebrow: "Principais aplicações para o seu negócio",
      titulo: "Inteligência Comercial e de Marketing",
      subtitulo: "Entenda o comportamento da sua operação a partir dos dados.",
      paragrafos: [
        "No varejo e em operações comerciais, as câmeras podem deixar de ser apenas ferramentas de segurança e passar a gerar informações relevantes para a gestão.",
        "A análise do fluxo de pessoas e veículos permite entender melhor como os clientes utilizam os espaços, quais períodos concentram maior movimento e como as pessoas se comportam dentro da operação.",
        "Com esses dados, gestores podem tomar decisões mais fundamentadas sobre operação, atendimento, layout, campanhas, equipes e utilização dos espaços.",
      ],
    },
    {
      colunas: 2,
      cards: [
        {
          id: "fluxo-de-pessoas",
          titulo: "Analytics do fluxo de pessoas",
          subtitulo: "Transforme circulação em indicadores de negócio.",
          paragrafos: [
            "A Plataforma Proc analisa o fluxo de pessoas dentro dos ambientes e gera indicadores que ajudam a compreender a movimentação dos clientes.",
          ],
          itensTitulo: "Entre as possibilidades:",
          itens: [
            "Contagem de pessoas",
            "Fluxo de entrada e saída",
            "Horários de maior movimentação",
            "Dias e períodos de maior fluxo",
            "Tempo de permanência",
            "Análise de circulação por áreas",
            "Identificação de pontos de maior concentração",
            "Mapas de calor",
            "Análise de comportamento",
            "Comparação entre períodos",
            "Indicadores personalizados para cada operação",
          ],
          fecho: ["Transforme a pergunta “quantas pessoas passaram por aqui?” em dados que ajudam a entender o comportamento da operação."],
        },
        {
          id: "fluxo-de-veiculos",
          titulo: "Analytics do fluxo de veículos",
          subtitulo: "Transforme o movimento de veículos em informação.",
          paragrafos: [
            "A análise de veículos permite gerar indicadores sobre o fluxo nas áreas internas, estacionamentos e acessos da empresa.",
          ],
          itensTitulo: "A Plataforma Proc pode identificar e analisar:",
          itens: [
            "Volume de veículos",
            "Horários de maior movimentação",
            "Dias de maior fluxo",
            "Tempo de permanência",
            "Placas",
            "Veículos cadastrados",
            "Características do veículo",
            "Entrada e saída",
            "Ocupação do estacionamento",
            "Veículos estacionados",
            "Eventos relacionados a veículos",
            "Acessos autorizados ou não autorizados",
          ],
        },
      ],
    },
    {
      id: "estacionamentos",
      titulo: "Gestão inteligente de estacionamentos",
      subtitulo: "Saiba quais veículos estão no estacionamento e há quanto tempo.",
      paragrafos: [
        "A plataforma pode acompanhar a movimentação dos veículos no estacionamento e utilizar regras pré-configuradas para identificar situações específicas.",
      ],
      fluxoTitulo: "Por exemplo:",
      fluxo: ["Veículo entrou", "Vaga ocupada", "Tempo de permanência monitorado", "Limite ultrapassado", "Alerta enviado"],
      depois: ["Isso permite criar processos de gestão mais automatizados e reduzir a necessidade de acompanhamento manual."],
    },
    {
      id: "visao-corporativa-industrial",
      titulo: "Visão Computacional Corporativa e Industrial",
      subtitulo: "Processos e operações de empresas e indústrias também podem ser monitorados por dados.",
      paragrafos: [
        "Processos que dependem de observação visual podem ser acompanhados de forma automatizada por visão computacional e Inteligência Artificial.",
        "A Plataforma Proc transforma imagens dos processos corporativos e industriais em informações que apoiam a gestão da produção, qualidade, logística, segurança e gestão operacional.",
      ],
      colunas: 3,
      cards: [
        {
          id: "controle-de-producao",
          titulo: "Controle de produção",
          itens: ["Contagem de produtos", "Identificação por modelo", "Rastreabilidade", "Tempo de permanência em processos", "Acompanhamento da produção"],
        },
        {
          id: "inspecoes-de-qualidade",
          titulo: "Inspeções de qualidade",
          itens: ["Inspeção visual", "Identificação de defeitos", "Dimensões e medidas", "Acabamento", "Pintura", "Características específicas do produto"],
        },
        {
          id: "estoque-e-logistica",
          titulo: "Controle de estoque e logística",
          itens: ["Contagem de produtos", "Movimentação", "Produtos fora do local correto", "Estoque mínimo", "Expedição", "Carga e descarga", "Montagem de pallets"],
        },
        {
          id: "equipamentos-e-processos",
          titulo: "Monitoramento de equipamentos e processos",
          itens: ["Painéis", "Relógios", "Termômetros", "Indicadores", "Níveis de tanques", "Temperatura", "Máquinas e equipamentos", "Integração com IoT", "Integração com ERPs"],
        },
        {
          id: "seguranca-operacional",
          titulo: "Segurança operacional",
          itens: ["Uso de EPIs", "Controle de acesso", "Acesso a áreas restritas", "Controle de visitantes", "Circulação de pessoas e veículos"],
        },
      ],
    },
    {
      titulo: "Acompanhamento da produção",
      subtitulo: "Mais dados sobre o que realmente acontece na linha.",
      paragrafos: ["A Plataforma Proc pode acompanhar diferentes etapas da produção e gerar informações para apoiar a gestão."],
      itensTitulo: "Entre as aplicações:",
      itensEstilo: "check",
      itens: [
        "Contagem de produtos",
        "Separação por modelo ou característica",
        "Identificação de produtos",
        "Controle de produção",
        "Acompanhamento das etapas",
        "Tempo de permanência em cada processo",
        "Detecção de paradas",
        "Rastreabilidade",
        "Controle de movimentação",
        "Monitoramento de áreas produtivas",
      ],
      depois: ["Isso permite transformar a linha de produção em uma fonte contínua de dados operacionais."],
    },
    {
      titulo: "Inspeção e controle de qualidade",
      subtitulo: "Automatize inspeções visuais e reduza falhas.",
      paragrafos: ["A visão computacional pode ser utilizada para identificar características, padrões e possíveis anomalias em produtos e processos."],
      itensTitulo: "Dependendo do projeto, podemos trabalhar com:",
      itensEstilo: "check",
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
      depois: ["A tecnologia pode atuar como uma camada adicional de controle, apoiando as equipes responsáveis pela qualidade e produção."],
    },
    {
      titulo: "Rastreabilidade dos produtos",
      subtitulo: "Saiba onde o produto está e por onde ele passou.",
      paragrafos: ["A combinação de visão computacional, identificação visual, QR Codes, códigos e outros recursos permite criar processos de rastreabilidade ao longo da operação."],
      fluxoTitulo: "É possível acompanhar eventos como:",
      fluxo: ["Entrada", "Produção", "Processamento", "Inspeção", "Armazenamento", "Expedição"],
      depois: ["A estrutura é definida de acordo com o processo de cada empresa."],
    },
    {
      titulo: "Monitoramento de máquinas e equipamentos",
      subtitulo: "Transforme indicadores visuais em dados.",
      paragrafos: [
        "Muitos equipamentos possuem informações importantes apresentadas em displays, painéis, relógios, indicadores e instrumentos.",
        "A Plataforma Proc pode ser utilizada para interpretar essas informações e gerar dados para acompanhamento.",
      ],
      itensTitulo: "Entre as possibilidades:",
      itensEstilo: "check",
      itens: [
        "Leitura de indicadores",
        "Termômetros",
        "Relógios",
        "Painéis",
        "Displays",
        "Níveis de tanques",
        "Indicadores luminosos",
        "Estados de equipamentos",
        "Controle de temperatura",
        "Outras informações visuais",
      ],
      depois: ["Quando aplicável, esses dados também podem ser integrados a sistemas e processos de gestão."],
    },
    {
      id: "integracao-iot",
      titulo: "Integração com IoT e sistemas corporativos",
      subtitulo: "A inteligência visual não precisa ficar isolada.",
      paragrafos: [
        "A Plataforma Proc pode ser integrada a outros sistemas e dispositivos para transformar os dados gerados pela visão computacional em parte do fluxo operacional da empresa.",
      ],
      itensTitulo: "Podemos trabalhar com integrações envolvendo:",
      itensEstilo: "check",
      itens: [
        "Dispositivos IoT",
        "Sensores",
        "ERPs",
        "Bancos de dados",
        "Sistemas corporativos",
        "APIs",
        "Equipamentos industriais",
        "Sistemas de automação",
      ],
      fluxoTitulo: "Assim, a informação capturada pela câmera pode seguir para onde ela realmente é necessária.",
      fluxo: ["Imagem", "Inteligência", "Dado", "Sistema", "Decisão"],
    },
    {
      titulo: "Controle de expedição, carga e descarga de veículos",
      subtitulo: "Mais controle sobre os processos que acontecem antes do produto sair da empresa.",
      paragrafos: [
        "A Plataforma Proc pode apoiar operações de expedição, carregamento e recebimento, permitindo automatizar verificações e registrar eventos.",
      ],
      itensTitulo: "Aplicações possíveis:",
      itensEstilo: "check",
      itens: [
        "Identificação de veículos",
        "Controle de entrada e saída",
        "Conferência visual",
        "Registro de carregamentos",
        "Identificação de produtos",
        "Controle de docas",
        "Tempo de permanência",
        "Acompanhamento de operações",
        "Alertas sobre situações específicas",
      ],
    },
    {
      titulo: "Controle de estoque e movimentação",
      subtitulo: "Mais visibilidade sobre produtos e materiais.",
      paragrafos: ["A Plataforma Proc pode acompanhar a movimentação de produtos, materiais e equipamentos em áreas definidas da empresa."],
      itensTitulo: "Isso permite criar indicadores e alertas para situações como:",
      itensEstilo: "check",
      itens: [
        "Produto entrando ou saindo de determinada área",
        "Movimentação não prevista",
        "Produto permanecendo por tempo excessivo",
        "Equipamento ou material deixado em local indevido",
        "Ocupação de áreas",
        "Fluxo de materiais",
      ],
    },
    {
      titulo: "Automatize processos que dependem da visão humana.",
      paragrafos: [
        "Muitos controles importantes são realizados manualmente porque precisam “ser vistos”.",
        "O problema é que as pessoas não conseguem observar tudo, durante todo o tempo, com o mesmo nível de atenção.",
        "A Plataforma Proc cria uma camada tecnológica capaz de acompanhar continuamente determinados eventos visuais e transformar essas ocorrências em dados.",
      ],
      itensTitulo: "Isso pode ajudar a empresa a:",
      itensEstilo: "check",
      itens: [
        "Reduzir retrabalho",
        "Reduzir perdas",
        "Identificar desperdícios",
        "Diminuir falhas operacionais",
        "Reduzir riscos",
        "Economizar tempo",
        "Aumentar a rastreabilidade",
        "Melhorar controles",
        "Automatizar tarefas repetitivas",
        "Apoiar decisões com dados concretos",
      ],
      fecho: ["O objetivo não é substituir pessoas.", "É permitir que as pessoas tenham informações melhores para trabalhar e tomar decisões."],
    },
    {
      id: "videomonitoramento",
      titulo: "Segurança e Videomonitoramento Inteligente",
      subtitulo: "Mais inteligência para as câmeras que sua empresa já possui.",
      paragrafos: [
        "O videomonitoramento tradicional registra tudo. O problema é encontrar rapidamente aquilo que realmente importa.",
        "A Plataforma Proc adiciona inteligência ao sistema de câmeras, permitindo pesquisar eventos, pessoas e veículos de forma muito mais precisa e automatizar alertas a partir de situações previamente definidas.",
        "Em vez de procurar horas de gravação manualmente, a equipe pode utilizar filtros e características para chegar mais rapidamente ao evento desejado.",
      ],
      colunas: 3,
      cards: [
        {
          titulo: "Pesquisa inteligente de pessoas",
          subtitulo: "Encontre uma pessoa sem precisar assistir a horas de gravação.",
          paragrafos: [
            "Dependendo das tecnologias disponíveis nas câmeras e da configuração do projeto, a plataforma pode utilizar diferentes características para facilitar a pesquisa.",
          ],
          itensTitulo: "É possível pesquisar, por exemplo, por:",
          itens: [
            "Período de circulação",
            "Local",
            "Cor de roupa",
            "Tipo de vestimenta",
            "Boné",
            "Mochila",
            "Sacola",
            "Objetos carregados",
            "Outras características visuais disponíveis",
          ],
          depois: ["Isso transforma uma busca manual e demorada em uma pesquisa estruturada."],
        },
        {
          titulo: "Pesquisa inteligente de veículos",
          subtitulo: "Encontre um veículo pela placa ou pelas suas características.",
          paragrafos: ["A análise de veículos pode utilizar reconhecimento de placas e características visuais para facilitar a localização de eventos."],
          itensTitulo: "A pesquisa pode considerar:",
          itens: ["Placa", "Marca", "Modelo", "Cor", "Características visuais", "Emblemas", "Logomarcas", "Local", "Período", "Sentido de circulação"],
          depois: ["Assim, a equipe de segurança consegue localizar eventos específicos com muito mais agilidade."],
        },
        {
          titulo: "Alertas inteligentes",
          subtitulo: "A segurança não precisa esperar o incidente acontecer.",
          paragrafos: [
            "A Plataforma Proc permite configurar regras para que determinados eventos gerem alertas automaticamente.",
            "Quando uma situação previamente definida é identificada, a equipe responsável pode receber uma notificação para iniciar a análise ou acompanhar o evento em tempo real.",
          ],
          itensTitulo: "Exemplos de aplicações:",
          itens: [
            "Pessoa em área restrita",
            "Veículo não autorizado",
            "Acesso fora do horário permitido",
            "Permanência acima do limite",
            "Entrada ou saída em áreas específicas",
            "Eventos relacionados a pessoas ou veículos",
            "Situações operacionais previamente definidas",
          ],
        },
      ],
      depois: ["O objetivo é transformar o videomonitoramento de uma atividade reativa em uma ferramenta de acompanhamento mais inteligente e preventiva."],
    },
    {
      titulo: "Você não precisa começar tudo do zero.",
      paragrafos: [
        "A implantação da Plataforma Proc não significa necessariamente substituir todas as câmeras e equipamentos que sua empresa já possui.",
        "Primeiro avaliamos a infraestrutura existente.",
        "Se as câmeras, DVRs e NVRs forem compatíveis e possuírem os recursos tecnológicos necessários para a aplicação desejada, podemos aproveitar a estrutura existente.",
        "Isso pode reduzir significativamente o investimento inicial e acelerar a implantação.",
      ],
    },
    {
      titulo: "Tecnologia própria para projetos mais flexíveis.",
      paragrafos: [
        "A Plataforma Proc é desenvolvida sobre tecnologia própria de visão computacional e inteligência artificial.",
        "Isso nos permite adaptar a aplicação às necessidades específicas de cada projeto, sem depender exclusivamente das limitações de uma plataforma global padronizada.",
        "Essa flexibilidade também permite construir projetos com uma estrutura de investimento mais competitiva, especialmente em aplicações que exigem customização.",
      ],
      fecho: ["Não entregamos apenas uma tecnologia.", "Construímos a aplicação da tecnologia para o processo do cliente."],
    },
    {
      estilo: "manifesto",
      eyebrow: "Proc Group",
      titulo: "Visão Computacional e Vídeo Analytics para transformar imagens em inteligência.",
      paragrafos: [
        "Com a Plataforma Proc, as câmeras deixam de ser apenas dispositivos de registro e passam a fazer parte de uma estrutura de dados, automação e inteligência operacional.",
      ],
      fecho: ["Veja. Analise. Entenda. Decida."],
      ctas: [{ label: "Fale com um especialista e monte o seu projeto ideal", href: "/contato" }],
    },
  ],
};
