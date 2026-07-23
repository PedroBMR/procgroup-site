# Plano de arte — procgroup-site

Direção de arte para deixar o site **mais rico visualmente** e cobrir os assets
descritos pelo comercial. Serve de handoff para designer, banco de imagens ou IA
de imagem. Onde já existe placeholder no site, está marcado.

**Identidade:** paleta **navy** (`#0b1730` / `#060a14`) + **vermelho**
(`#e2081d`) de destaque. Tom sóbrio, tecnológico, profissional. **Sem roxo/violeta.**
Preferir **16:9**. Ao substituir um placeholder, trocar `<MediaPlaceholder />`
por `<Image />` (`astro:assets`) ou `<video>`.

**Prioridade sugerida:** 1) heros das soluções · 2) sistema de ícones das 4
áreas · 3) foto/hero da Home e da Empresa · 4) cases · 5) logos de credibilidade.

---

## 1. Home

### 1.1 Vídeo do hero (Banner 1) — *evolução opcional*
Hoje o hero usa um fundo animado próprio (campo neural em canvas) que **funciona
bem** — por isso não virou placeholder. Vídeo cinematográfico ~15–20s em loop:
visão aérea de cidade inteligente ao amanhecer → central de monitoramento (CIOp)
→ recepção com acesso facial → linha de produção automatizada → data center.
Cenas conectadas por **fluxo de dados** convergindo num dashboard da Proc AI
Platform. Navy + vermelho, movimento suave. 16:9.

### 1.2 Seção "O que a Proc faz?"
Hoje usa a **foto da fachada** (ver seção 6 — precisa melhorar). Alternativa mais
"empresa de tecnologia": foto **interna** da equipe trabalhando ou da sala de
monitoramento (NOC/CIOp), que comunica melhor do que o prédio.

### 1.3 Prints da Plataforma (seção das 6 capacidades)
Capturas reais da Proc AI Platform — dashboards, mapa de operações, busca
inteligente — como *mockups* em tela/laptop sobre navy. Referência: kabatone.com.

### 1.4 Cards das 4 áreas ("Escolha a solução ideal")
O comercial pediu "ícone ou imagem ilustrativa em cada card". Ver **sistema de
ícones** (seção 5). Opcional: uma foto/ilustração de cabeçalho por card.

### 1.5 Faixa de Cases (teaser)
Hoje é uma faixa navy com números. Enriquecer com uma **foto real** de fundo
(operação Pato 360°, sala de monitoramento) em baixa opacidade sob o texto.

---

## 2. Empresa (A Proc)

### 2.1 Hero
Hoje é só texto. Ganha muito com uma **imagem de marca** no topo: vista aérea
(drone) de Pato Branco/PR, ou a equipe, ou a sala de operações. 16:9, com espaço
"negativo" à esquerda para o título respirar.

### 2.2 Foto da fachada — **melhorar** (ver seção 6 detalhada)

### 2.3 Linha do tempo (2014 → hoje)
Opcional: uma miniatura por marco (foto de época / projeto). Baixa prioridade.

### 2.4 Credibilidade
Hoje são cards de texto (Embarque+Seguro, LATAM, órgãos de segurança). Ganha
autoridade com **logos reais** dos parceiros/clientes (grayscale, altura
uniforme) — sujeito a autorização de uso de cada marca.

---

## 3. Páginas de Solução — hero (placeholders ATIVOS)

Já aparecem como placeholder logo abaixo do hero, com o briefing embutido.

- **IA Industrial** (`/solucoes/ia-industrial`, vídeo): linha de produção com
  câmeras industriais, overlays de visão computacional (bounding boxes),
  contagem automática e dashboards de qualidade. Navy + vermelho. 16:9.
- **Segurança Corporativa** (`/solucoes/seguranca-corporativa`, vídeo): recepção
  com acesso facial em catraca/terminal, câmeras com overlays de detecção e, ao
  fundo, central de monitoramento. 16:9.
- **Infraestrutura de TI** (`/solucoes/infraestrutura-de-ti`, imagem): data
  center com racks (corredor frio) e equipe de NOC diante de dashboards; ícones
  de cloud/backup/uptime 24×7. Iluminação azulada. 16:9.
- **Cidades Inteligentes** (`/solucoes/cidades-inteligentes`, vídeo): Centro
  Integrado de Operações com video wall (mapas, alertas, reconhecimento facial,
  LPR) e cidade à noite. Referência ao **Pato 360°**. 16:9.

### 3.1 Cards "outras unidades" (rodapé das soluções)
Mesmo **sistema de ícones** das 4 áreas (seção 5).

---

## 4. Cases — placeholders ATIVOS

Cada card de case já mostra um **placeholder de foto** (topo do card, 16:9) com o
briefing por segmento embutido. Prioridade para o case real **Pato 360°**: foto
da sala de operações / video wall / viatura integrada (com autorização). Nos
ilustrativos, foto genérica do segmento (indústria, recepção corporativa, data
center) até haver case real.

---

## 5. Sistema de ícones das 4 áreas de negócio — ✅ FEITO

Implementado em `src/components/UnitIcon.astro` e plugado nos cards de área da
Home, das Soluções e da Empresa (herda a cor da unidade). Conjunto **coeso**
(linha, mesmo traço/peso), no estilo dos 6 ícones das capacidades. Ícones atuais:

- **Cidades Inteligentes / Proc City** — câmera urbana + mapa/pino, ou skyline
  com sinal.
- **Segurança Corporativa** — escudo + rosto (reconhecimento facial) ou câmera
  dome.
- **Infraestrutura de TI** — servidor/rack + nuvem.
- **IA Industrial** — engrenagem/braço robótico + olho (visão computacional).

> Já existe um set de 6 ícones para as **capacidades da plataforma** na Home
> (`index.astro`, mapa `capIcons`) — seguir o mesmo estilo para manter unidade.

---

## 6. A foto da frente da Proc — como melhorar

A foto atual (`src/assets/images/hq-pato-branco.webp`) é um registro de celular
em **luz dura de meio-dia**. Funciona, mas não transmite "empresa de tecnologia".
Problemas observados e como resolver:

| Problema na foto atual | Correção |
|---|---|
| **Faixa superior arroxeada/vinho** — conflita com a marca (navy, "não violeta") | Regravar depois de pintar em navy, **ou** ajustar a cor no tratamento para puxar ao azul-marinho / neutralizar o roxo |
| **Luz de meio-dia dura** — sombras fortes, branco estourado, sem clima | **Regravar no fim de tarde (blue hour)** com as luzes internas acesas — deixa premium na hora e disfarça reflexos |
| **Reflexos poluídos no vidro** — o fotógrafo (pessoa de vermelho), carros, fiação, placa e casas vizinhas aparecem | Ângulo/horário que evite reflexo; ou **retoque** removendo os reflexos e a fiação |
| **Móveis de varanda** (cadeiras/almofadas) no piso superior — ar doméstico | Retirar da cena antes da foto |
| **Logo PROC pequeno** na parede branca | **Letreiro maior e iluminado** na fachada dá presença de marca |
| **Muito calçamento** no primeiro plano | Enquadrar mais alto / cortar; ângulo levemente baixo deixa o prédio imponente |
| **Qualidade de celular**, verticais tortas | Câmera profissional, corrigir verticais, resolução maior e proporção wide para hero |

**Recomendação em ordem de esforço:**

1. **Melhor (regravar):** ensaio no **blue hour** com luzes acesas, letreiro
   iluminado, varanda limpa, ângulo 3/4 levemente baixo, câmera profissional.
   Um take **aéreo/drone** 3/4 do prédio no contexto também fica excelente.
2. **Sem regravar (só tratamento) — ✅ FEITO:** já existe
   `hq-pato-branco-enhanced.webp` (em uso na Home e na Empresa) com corte mais
   fechado, **faixa vinho neutralizada** (sem o roxo), grade navy, mais
   contraste, vinheta e gradiente navy na base. **Ainda falta** (exige retoque
   manual ou reshoot): remover os **reflexos** no vidro (fotógrafo, carros,
   fiação, placa) e corrigir verticais.
3. **Alternativa de mensagem:** para "empresa de tecnologia", uma foto **interna**
   (equipe / sala de monitoramento / NOC) comunica mais do que a fachada. Vale
   considerar trocar o papel principal do prédio por uma cena de operação.

---

## Já resolvido (não precisa produzir)

- **Cases** — o case Pato 360° usa dados reais; capas do blog via WordPress/`astro:assets`.
- **og:image / favicon** — imagens sociais e ícone já gerados e no ar.
- **Ícones das 6 capacidades** da Home — já desenhados (SVG inline).
