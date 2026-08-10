import type { Locale } from "../i18n/config";
import heroIaIndustrial from "../assets/images/solucoes/hero-ia-industrial.jpg";
import heroSegurancaCorporativa from "../assets/images/solucoes/hero-seguranca-corporativa.jpg";
import heroInfraestruturaDeTi from "../assets/images/solucoes/hero-infraestrutura-de-ti.jpg";
import heroCidadesInteligentes from "../assets/images/solucoes/hero-cidades-inteligentes.jpg";

// Briefings de arte dos assets de cada página de solução.
// Com `asset` preenchido, o BusinessUnitTemplate renderiza a imagem real; sem
// ele, cai no MediaPlaceholder com o briefing embutido (é o estado da página de
// Cases, que ainda espera fotos). `caption` é o texto visível por idioma e
// também o alt da imagem; `prompt` é a direção de arte (PT), a mesma
// consolidada em BRIEFING-IMAGENS.md.
//
// Os 4 assets atuais foram gerados em 2026-08-10 (Nano Banana 2, 1376x768) a
// partir dos prompts de PROMPTS-IMAGENS.md. `kind` continua descrevendo o que o
// comercial pediu — os três "video" foram atendidos com imagem de propósito,
// para não pôr autoplay no topo de quatro páginas (ver PROMPTS-IMAGENS.md).
export interface MediaBrief {
  kind: "video" | "image";
  caption: Record<Locale, string>;
  prompt: string;
  /** Asset real. Quando ausente, a página mostra o placeholder com o briefing. */
  asset?: ImageMetadata;
}

export const solutionMedia: Record<string, MediaBrief> = {
  "ia-industrial": {
    kind: "video",
    caption: {
      pt: "Linha de produção com câmeras industriais, detecção de defeitos por IA e dashboards de qualidade em tempo real.",
      en: "Production line with industrial cameras, AI defect detection and real-time quality dashboards.",
      es: "Línea de producción con cámaras industriales, detección de defectos por IA y dashboards de calidad en tiempo real.",
    },
    prompt:
      "Vídeo/imagem de uma linha de produção industrial moderna e limpa, com câmeras industriais monitorando o processo. Overlays de visão computacional destacando peças e defeitos (bounding boxes), contagem automática e indicadores de qualidade em dashboards ao lado. Iluminação fria e tecnológica; paleta navy (#0b1730) + vermelho (#e2081d) como cor de destaque; tom sóbrio e profissional. Proporção 16:9. Se vídeo: 10–15s em loop, com movimento sutil de câmera.",
    asset: heroIaIndustrial,
  },
  "seguranca-corporativa": {
    kind: "video",
    caption: {
      pt: "Recepção corporativa com controle de acesso facial, câmeras inteligentes e central de monitoramento ao fundo.",
      en: "Corporate reception with facial access control, smart cameras and a monitoring center in the background.",
      es: "Recepción corporativa con control de acceso facial, cámaras inteligentes y central de monitoreo al fondo.",
    },
    prompt:
      "Recepção corporativa moderna; pessoas passando por controle de acesso facial em catraca/terminal; câmeras inteligentes com overlays de detecção de pessoas e objetos; ao fundo, uma central de monitoramento com operador acompanhando várias unidades em telas. Tom seguro e sóbrio; paleta navy + vermelho de destaque. Proporção 16:9. Se vídeo: passagem fluida de uma pessoa pelo acesso facial e corte para a central.",
    asset: heroSegurancaCorporativa,
  },
  "infraestrutura-de-ti": {
    kind: "image",
    caption: {
      pt: "Data center moderno, racks de servidores e equipe de NOC monitorando dashboards 24×7.",
      en: "Modern data center, server racks and a NOC team monitoring dashboards 24/7.",
      es: "Data center moderno, racks de servidores y equipo de NOC monitoreando dashboards 24/7.",
    },
    prompt:
      "Data center moderno com corredor de racks de servidores (corredor frio) e luzes de status; em primeiro plano ou ao lado, equipe técnica (NOC) monitorando um grande painel de dashboards de disponibilidade, uso de CPU/rede e status de backup. Ícones sutis de cloud, backup e uptime 24×7. Iluminação azulada; paleta navy + vermelho. Proporção 16:9.",
    asset: heroInfraestruturaDeTi,
  },
  "cidades-inteligentes": {
    kind: "video",
    caption: {
      pt: "Centro Integrado de Operações monitorando a cidade: mapas, alertas, reconhecimento facial e leitura de placas.",
      en: "Integrated Operations Center monitoring the city: maps, alerts, facial recognition and license-plate reading.",
      es: "Centro Integrado de Operaciones monitoreando la ciudad: mapas, alertas, reconocimiento facial y lectura de placas.",
    },
    prompt:
      "Centro Integrado de Operações (CIOp) monitorando a cidade em tempo real: paredão de telas (video wall) com mapas digitais, alertas ativos, reconhecimento facial e leitura automática de placas (LPR). Ao fundo ou intercalado, cidade à noite com câmeras inteligentes e fluxo de veículos. Referência ao Pato 360°. Tom de segurança pública, sério e tecnológico; paleta navy + vermelho. Proporção 16:9.",
    asset: heroCidadesInteligentes,
  },
};
