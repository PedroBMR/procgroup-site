# Briefing de imagens e vídeos — procgroup-site

Assets descritos pelo comercial que **ainda faltam ser produzidos**. Até lá, os
pontos das **páginas de solução** mostram um *placeholder* on-brand com o resumo
do briefing embutido (`src/components/MediaPlaceholder.astro` +
`src/data/mediaBriefs.ts`). Este documento é a direção de arte completa para
quem for gerar/produzir os assets (designer, banco de imagens ou IA de imagem).

**Identidade visual:** paleta **navy** (`#0b1730` / `#060a14`) + **vermelho**
(`#e2081d`) de destaque. Tom sóbrio, tecnológico e profissional. Nada de roxo.
Sempre que possível, **16:9**.

Quando o asset real existir, trocar o `<MediaPlaceholder />` por `<Image />`
(imagem, via `astro:assets`) ou `<video>` no arquivo correspondente.

---

## 1. Home — vídeo do hero (Banner 1)

> **Onde:** topo da home. Hoje o hero usa um fundo animado próprio (campo neural
> em canvas) que **funciona bem** — por isso não virou placeholder. Este vídeo é
> uma evolução opcional; se adotado, entra como fundo/painel do hero.

**Prompt:** Vídeo cinematográfico, ~15–20s em loop. Sequência: visão aérea de
uma cidade inteligente ao amanhecer → central de monitoramento (CIOp) com
operadores e paredão de telas → recepção corporativa com controle de acesso
facial → linha de produção automatizada com câmeras industriais → data center
moderno. As cenas são conectadas por animações de **fluxo de dados** que
convergem para um **dashboard central da Proc AI Platform**. Paleta navy +
vermelho, movimento suave, tom tecnológico e sóbrio. 16:9.

**Indicador das 4 áreas** (rodapé do banner): IA Industrial · Cidades
Inteligentes · Segurança Corporativa · Infraestrutura de TI.

---

## 2. Home — prints da Plataforma Proc AI

> **Onde:** seção "Uma plataforma. Múltiplas soluções." (as 6 capacidades) ou a
> seção da Plataforma. Referência de layout: kabatone.com.

**Prompt:** Capturas de tela reais da **Proc AI Platform** — dashboards com
indicadores, mapa/centro de operações, busca inteligente por pessoas e veículos.
Apresentar como *mockups* em telas/laptop sobre fundo navy, com leve
profundidade e sombra. Se não houver prints reais, criar telas fiéis ao produto
(não inventar métricas sensíveis).

---

## 3. Páginas de Solução — mídia do hero (placeholders ativos)

Cada uma já aparece como placeholder na respectiva página, logo abaixo do hero.

### 3.1 IA Industrial — `/solucoes/ia-industrial` (vídeo)
Linha de produção industrial moderna e limpa, com câmeras industriais
monitorando o processo. Overlays de visão computacional destacando peças e
defeitos (*bounding boxes*), contagem automática e indicadores de qualidade em
dashboards ao lado. Iluminação fria e tecnológica; navy + vermelho de destaque.
16:9. Se vídeo: 10–15s em loop, movimento sutil de câmera.

### 3.2 Segurança Corporativa — `/solucoes/seguranca-corporativa` (vídeo)
Recepção corporativa moderna; pessoas passando por controle de acesso facial em
catraca/terminal; câmeras inteligentes com overlays de detecção de pessoas e
objetos; ao fundo, uma central de monitoramento com operador acompanhando várias
unidades em telas. Tom seguro e sóbrio; navy + vermelho. 16:9. Se vídeo:
passagem fluida pelo acesso facial e corte para a central.

### 3.3 Infraestrutura de TI — `/solucoes/infraestrutura-de-ti` (imagem)
Data center moderno com corredor de racks de servidores (corredor frio) e luzes
de status; em primeiro plano ou ao lado, equipe técnica (NOC) monitorando um
grande painel de dashboards de disponibilidade, uso de CPU/rede e status de
backup. Ícones sutis de cloud, backup e uptime 24×7. Iluminação azulada; navy +
vermelho. 16:9.

### 3.4 Cidades Inteligentes — `/solucoes/cidades-inteligentes` (vídeo)
Centro Integrado de Operações (CIOp) monitorando a cidade em tempo real: paredão
de telas (*video wall*) com mapas digitais, alertas ativos, reconhecimento
facial e leitura automática de placas (LPR). Ao fundo ou intercalado, cidade à
noite com câmeras inteligentes e fluxo de veículos. Referência ao **Pato 360°**.
Tom de segurança pública, sério e tecnológico; navy + vermelho. 16:9.

---

## Já resolvido (não precisa produzir)

- **Empresa** — foto real da sede em Pato Branco (`hq-pato-branco.webp`), já em uso.
- **Cases** — o case Pato 360° já usa dados reais; capas via WordPress/`astro:assets`.
- **og:image / favicon** — imagens sociais e ícone já gerados e no ar.
