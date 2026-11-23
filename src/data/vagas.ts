// Vagas da página Trabalhe Conosco (só em português).
// Abrir ou fechar uma vaga é trocar `aberta`. Sem nenhuma aberta, a página
// volta ao convite geral de currículo.

export const EMAIL_VAGAS = "relacoespublicas@procgroup.com.br";

export interface Vaga {
  /** Vira a âncora do link de divulgação: /trabalhe-conosco#id */
  id: string;
  aberta: boolean;
  titulo: string;
  assunto: string;
  atividades: string[];
  requisitos: string[];
  condicoes: { rotulo: string; valor: string }[];
}

const condicoesEstagio: Vaga["condicoes"] = [
  { rotulo: "Vaga", valor: "1 vaga, presencial" },
  { rotulo: "Horário", valor: "Segunda a sexta, 8h30 às 12h e 13h30 às 16h (30h semanais)" },
  { rotulo: "Bolsa", valor: "R$ 9,60 por hora" },
  { rotulo: "Benefícios", valor: "Seguro contra acidentes pessoais" },
  { rotulo: "Local", valor: "Rua Caetano Munhoz da Rocha, 480, Pato Branco/PR" },
];

export const vagas: Vaga[] = [
  {
    id: "estagio-administrativo",
    aberta: true,
    titulo: "Estágio Administrativo e Financeiro",
    assunto: "Estágio Administrativo",
    atividades: [
      "Apoiar o financeiro em lançamentos, conferências e controle de vencimentos",
      "Organizar documentos, contratos, notas e planilhas",
      "Apoiar o atendimento por telefone, e-mail e WhatsApp",
      "Acompanhar agenda, reuniões e pendências do setor",
    ],
    requisitos: [
      "Cursar Ciências Contábeis, Direito ou área de sociais aplicadas",
      "Conhecimento básico de Excel e Word",
      "Organização, boa comunicação e discrição com informações internas",
    ],
    condicoes: condicoesEstagio,
  },
  {
    id: "estagio-marketing",
    aberta: false,
    titulo: "Estágio em Marketing",
    assunto: "Estágio Marketing",
    atividades: [
      "Criar artes, legendas e vídeos curtos para as redes sociais",
      "Apoiar o calendário de publicações",
      "Registrar fotos e vídeos do dia a dia e de eventos",
      "Apoiar materiais de divulgação e a organização de eventos",
    ],
    requisitos: [
      "Cursar Marketing, Publicidade, Comunicação, Design ou área de sociais aplicadas",
      "Noções de Canva ou programas similares",
      "Boa escrita, criatividade e familiaridade com Instagram e LinkedIn",
      "Portfólio ou exemplos de trabalhos são um diferencial",
    ],
    condicoes: condicoesEstagio,
  },
];
