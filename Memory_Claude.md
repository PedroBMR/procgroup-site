# Proc Group — Reformulação do Site — Memória de Progresso

> Arquivo de acompanhamento do projeto. Atualizado pelo Claude a cada marco importante.
> Local do projeto: `C:\Users\Efapi\Desktop\ProcGroup Novo Site`
> Repositório GitHub: https://github.com/PedroBMR/procgroup-site (público)
> Stack: Astro 7 (estático), sem framework de UI adicional.

## 🔴 PRÓXIMA SESSÃO — COMECE AQUI

**Atualizado em 2026-07-17, fim de uma sessão longa (a mesma sessão que fez o blog headless,
formulário de contato, etc. — ver seções abaixo, na ordem cronológica em que aconteceram).** Esta
foi a última atualização antes do usuário encerrar o chat de propósito. Tudo abaixo está
implementado e testado localmente (`npm run build`/`npm run preview`), mas **o GitHub Pages
publicado ainda está na versão antiga** — nada do que está documentado neste arquivo foi publicado
ainda. O usuário decidiu **NÃO publicar agora**, só daqui ~1 mês.

**➡️ `PUBLICACAO.md` na raiz do repo tem o checklist completo do que fazer no dia de publicar**
(troca de domínio no `astro.config.mjs`, estratégia de deploy, teste do formulário com e-mail
real, DNS). Comece por lá quando o usuário disser que quer seguir com a publicação — não repita a
investigação de hosting, já está documentada lá.

**Estado do ambiente local (importante para retomar):** esta máquina não tem Node.js instalado
globalmente. Um Node 22.12.0 portátil foi baixado para a pasta scratchpad **desta sessão**
(`AppData\Local\Temp\claude\...\952582b8-.../scratchpad\node-v22.12.0-win-x64`) — **não vai existir
numa sessão nova**, precisa baixar de novo (ver seção 6 do `PUBLICACAO.md` para o comando). O
servidor de preview (`npm run preview`, porta 4321) foi encerrado ao fim desta sessão.

**O que fazer na próxima sessão, em ordem de prioridade:**

1. **Pendência mais concreta em aberto:** confirmar os dados de CPSI (Contrato Público para
   Solução Inovadora) dos 4 municípios além de Pato Branco — Marmeleiro, Sulina, Chopinzinho,
   Coronel Vivida. O usuário confirmou que a Proc atende os 5 via CPSI e que a informação está nos
   portais de transparência de cada município, mas a pesquisa desta sessão não conseguiu abrir
   esses portais (domínios tipo `*.govbr.cloud` foram bloqueados pela ferramenta de browser, e o
   Google não indexa bem os PDFs de resultado/homologação desses sistemas — só os editais de
   abertura). Confirmei publicamente apenas Sulina (edital nº 016/2024, mesmo tipo de projeto) e a
   existência real da empresa (CNPJ 10.381.377/0001-91, associada à ACEPB). **Se o usuário mandar
   o link direto de um documento de resultado/homologação de qualquer um dos 4, isso desbloqueia.**
   Ver seção "Case real do Pato 360°" abaixo para o que já está no site.
2. Publicar de fato as mudanças (quando o usuário decidir a data). Ver `PUBLICACAO.md`.
3. Ainda faltam **3 dos 4 cases de `/cases`** com dado fictício (Segurança Corporativa,
   Infraestrutura de TI, IA Industrial) — só o de Cidades Inteligentes (Pato 360°) virou real nesta
   sessão. Marcados com selo "Exemplo ilustrativo" para não serem confundidos com dado real.
4. **Vídeo real de produto** para o hero — ainda não existe (a animação atual é decorativa/abstrata
   por design, ver seção "Hero" abaixo). Se o usuário conseguir filmagem real do Pato 360° ou de um
   centro de operações, vale reconsiderar.
5. Criar todas as páginas em inglês e espanhol (infraestrutura pronta em `src/i18n/`, não aplicada).
6. Página de Eventos — **já implementada** como `/eventos` (filtra categoria "Eventos" do
   WordPress). Só retomar se o usuário quiser algo diferente disso.

### Achados do QA (2026-07-17) — pendentes de decisão do usuário

**🔴 Crítico — formulário de contato não envia nada a lugar nenhum.**
`src/pages/contato.astro` tem um `<form class="contact-form">` sem `action`, sem `method` (usa o
default do HTML, que é GET pra própria URL) e sem nenhum handler JS. Confirmei em runtime: `form.action`
resolve pra própria URL da página, `form.method` é "get", `hasSubmitListener` é `false`. Não existe
nenhuma rota de API no projeto (`src/pages/api/**` não existe, site é 100% estático). Ou seja: quando
alguém preenche e clica em "Enviar solicitação" (ou em qualquer CTA "Solicitar Demonstração" do site,
que leva pra essa página), a página só recarrega com os dados na query string e **nada é enviado** —
sem e-mail, sem webhook, sem confirmação de erro. Esse é o principal caminho de conversão do site
inteiro (CTA primário em Home, Header, todas as unidades de negócio). Precisa decidir com o usuário: qual
serviço usar pra receber os leads (ex.: Formspree, Netlify Forms, um serverless function que manda
e-mail, ou simplesmente trocar por um `mailto:` direto) antes de implementar.

**🟡 Importante — 3 páginas são stubs "coming soon", não conteúdo final.**
`src/pages/suporte.astro`, `src/pages/trabalhe-conosco.astro` e `src/pages/politica-de-privacidade.astro`
usam o componente `src/components/ComingSoon.astro`, que renderiza só um título + descrição +
"Esta página faz parte da próxima fase da reformulação do site." Isso **contradiz uma entrada antiga
desta mesma memória** que dizia "todas em PT, completas — sem stubs coming soon restantes" — aquela
entrada estava desatualizada/incorreta. Politica de Privacidade é particularmente sensível (página legal
referenciada no footer, e o site já está publicado ao vivo no GitHub Pages com esse placeholder). Precisa
perguntar ao usuário se: (a) essas 3 páginas devem ficar assim por enquanto (aceitável pra uma fase
inicial), ou (b) precisam de conteúdo real antes de considerar o QA fechado — especialmente a de
privacidade, por ser página legal/LGPD.

**Verificações que passaram limpas:** 14 páginas sem erros de console, sem 404 de imagem/asset, sem
overflow horizontal em mobile (375px) nem desktop (~1265px), menu mobile abre/fecha corretamente
(verificado via toggle programático), todos os links internos (nav, footer, breadcrumb, cards de unidade
de negócio, blog) resolvem para rotas válidas com o base-path correto.

**Limitação desta sessão de QA:** a captura de screenshot (`computer` tool) e simulação de clique/hover
por coordenada travaram com timeout a sessão inteira — `document.hasFocus()` retornava `false` e
`document.hidden` retornava `true`, indicando que a aba do Browser pane não estava com foco no nível do
SO nesta automação. Por isso o QA visual foi feito via inspeção estrutural de DOM/CSS computado
(overflow, classes, seletores) em vez de screenshots pixel-a-pixel — não é uma garantia equivalente a
uma revisão visual completa. Se isso for importante, vale repetir com uma sessão de browser saudável
numa próxima conversa.

### Blog headless via WordPress, formulário de contato e páginas "coming soon" resolvidas — 2026-07-17 (sessão separada)

Sessão seguinte à publicação no GitHub Pages, focada em resolver os 2 achados críticos do QA
anterior e avaliar se Astro estático era mesmo a escolha certa dado que o site atual
(`procgroup.com.br`, WordPress) tem blog ativo com 15 posts reais.

**Decisão de arquitetura: WordPress headless.** Em vez de migrar o conteúdo do blog para
Markdown/content collections, o Astro busca os posts/páginas direto da REST API pública do
WordPress (`procgroup.com.br/wp-json`) **em tempo de build**, gerando HTML estático. O marketing
continua publicando no mesmo painel WordPress de sempre — zero retreinamento, zero migração de
conteúdo, zero risco de regressão no blog atual. Implementado em `src/content.config.ts` (duas
collections: `blog` para posts, `pages` para páginas como Política de Privacidade). Testado com
build real: 15 posts + 7 páginas carregados corretamente. **Limitação conhecida:** isso só
funciona se algo rodar o build depois que o WordPress publica algo novo — a automação disso
("publicar → rebuild → deploy sozinho") ainda não está implementada, só planejada (ver
`PUBLICACAO.md`).

**Páginas novas:** `/blog/[slug]` (artigo — não existia antes), `/blog/categoria/[slug]`,
`/eventos` (Agenda de Eventos, filtrando a categoria "Eventos" do WP). `/blog/index.astro`
reescrito para mostrar os posts reais em vez dos 8 fictícios antigos.

**Formulário de contato:** `public/contact.php`, autocontido (sem serviço terceiro tipo Formspree
— o usuário não pode criar conta em serviço externo por política, e o destino real é Hostinger,
que roda PHP nativamente). Formulário no Astro envia via `fetch` com fallback nativo (POST direto,
funciona sem JS). Achado e corrigido no caminho: a abordagem inicial de mostrar a confirmação via
`Astro.url.searchParams` **não funciona** neste projeto porque é `output: 'static'` — o HTML é
fixo desde o build, sem servidor por trás para reagir à query string real do visitante. Corrigido
lendo a URL pelo lado do cliente (JS) em vez do servidor.

**Suporte e Trabalhe Conosco:** descobri que **nenhuma das duas existe no site atual**
(`procgroup.com.br/suporte` e `/trabalhe-conosco` retornam 404) — são páginas inteiramente novas
da reformulação, não conteúdo real para migrar. Não inventei sistema de chamados nem portal de
vagas (decisão de processo de negócio, não técnica) — troquei os stubs "coming soon" por canais de
contato reais (Suporte) e um link de e-mail para currículo (Trabalhe Conosco).

**Política de Privacidade:** ao contrário das duas acima, **existe de verdade** no WordPress (id
703, conteúdo Elementor Pro). Puxada via o mesmo mecanismo headless (collection `pages`).

**Bug de contraste sério encontrado e corrigido:** o usuário reportou "os textos do blog têm a
mesma cor do fundo". Investigação achou a causa: seções com `data-theme="light"` (que flipa a
variável `--color-text` para escura, correta em fundo claro) **sem `background` correspondente
definido** — o fundo escuro do `<body>` aparecia por trás, resultando em texto escuro sobre fundo
escuro. Afetava **o corpo inteiro de todo post do blog** (~1.1:1 de contraste, praticamente
invisível) e a Política de Privacidade inteira, mais um caso menor na seção "Leia também". Todos
corrigidos (`.prose-section`/`.section` ganharam `background: var(--color-bg)` explícito) e
reverificados com medição real de contraste WCAG — zero elementos abaixo de 4.5:1 depois do fix.

**Esquema de cores revisado (color theory pass):** usuário pediu para melhorar o esquema de cores
usando teoria de cores + a logo real (que é só vermelho + branco — a navy é escolha de fundo
institucional, não vem do símbolo). Mudanças, mantendo o vermelho/navy de marca intactos:
- Token `--color-eyebrow` teoricamente-correto por tema (`red-400` no escuro, `red-600` no claro)
  substituindo `--red-500` fixo no `.eyebrow` global — que falhava contraste em um dos dois
  contextos dependendo de onde aparecia (a maioria das instâncias `.eyebrow` do site está em
  cabeçalhos escuros; só descobri isso testando, não presumindo).
- Categorias do blog ganharam hues distintos em vez de tons quase idênticos de vermelho: Novidades
  = `red-600` (mantido), Eventos = novo `--tag-amber`, Tudo sobre tecnologia = novo `--tag-teal`.
- Tokens semânticos formais `--color-success`/`--color-danger` (antes eram hex ad-hoc inline no
  banner do formulário de contato).
- **Não mexi** nas cores das 4 unidades de negócio (`businessUnits.ts`) nem em páginas
  pré-existentes fora do escopo desta sessão (ex. `empresa.astro` tinha 2 casos bem marginais,
  4.49 e 4.90 de contraste — deixados de lado por severidade baixa e por serem página não testada
  nesta sessão).

**Investigação de hosting real (Hostinger):** ver `PUBLICACAO.md` seção 2 para os detalhes
completos — resumo: o plano atual suporta SSH, Git e Cron Jobs, então a arquitetura headless
planejada é viável sem trocar de hospedagem.

**Ambiente desta sessão:** máquina sem Node.js instalado — usado um Node 22.12.0 portátil baixado
para a pasta scratchpad temporária da sessão (não vai existir em sessões futuras). Testes visuais
no browser tiveram a mesma limitação de foco de SO já registrada abaixo (screenshot/scroll não
funcionam de forma confiável) — verificação feita via inspeção de DOM/CSS computado e um script de
auditoria de contraste WCAG real, não por comparação pixel-a-pixel.

### Pesquisa de concorrentes → melhorias na landing page — 2026-07-17 (mesma sessão, continuação)

Usuário pediu para olhar concorrentes globais (Genetec, Verkada, Axon — pesquisados via 3 agentes em
paralelo) e sugerir melhorias visuais + outras. Depois de apresentar as ideias, usuário disse "vamos
implementar" — implementado o que dava para fazer sem material novo (vídeo real e cases reais
ficaram marcados como pendência, ver abaixo):

- **Navegação em dois eixos**: novo item "Segmentos" no menu (`src/data/nav.ts`) com Governo e
  Segurança Pública / Empresas / Indústria, cada um linkando para a página de solução mais próxima —
  inspirado no padrão Genetec (Products × Industries) e Axon (Public Safety/Federal/Enterprise).
- **Seção "Do nosso blog" na Home** (`index.astro`) — 3 posts mais recentes reais via
  `getCollection("blog")`, reutilizando `PostCard.astro`.
- **Formulário de contato segmentado**: campo novo "Você é" (Governo/Prefeitura, Empresa, Indústria,
  Outro) em `contato.astro` + `contact.php`, incluído no assunto do e-mail para triagem mais rápida
  do time comercial.
- **Auditoria de disciplina de cor**: achado principal foi o `.solution-dot` (ponto decorativo antes
  de cada item de solução em `BusinessUnitTemplate.astro`) que era vermelho fixo em toda unidade,
  mesmo nas navy — trocado para usar `--unit-color` da própria unidade. Resto do site já estava
  disciplinado, não achei mais nada para mexer.
- **Rodapé**: duas linhas discretas — menção de conformidade LGPD e nota sobre a stack técnica do
  site (não confundir com "diferencial de produto" — é sobre o site em si, mantido modesto de
  propósito, ver `Footer.astro`).

**Bug real encontrado e corrigido no processo**: ao adicionar a seção de blog na Home, esqueci de
marcar a seção como `data-theme="light"` — os selos de categoria (que assumem fundo claro) ficaram
com contraste ruim em fundo escuro. Mesma classe de bug já documentada abaixo, resolvido do mesmo
jeito.

### Fundo animado do hero — exploração e escolha final — 2026-07-17 (mesma sessão)

Usuário achou a animação de fundo original do hero (`HeroScenes.astro` — grid + scanline + tags
rotativas) "meio ruim" e pediu opções. Processo:

1. **Rodada 1 — 3 conceitos diferentes**: radar de segurança (varredura + blips pulsando), rede de
   nós conectados (canvas com partículas se conectando), detecção estilo visão computacional (caixas
   com cantos + % de confiança, mantido abstrato de propósito — retângulos genéricos, não rostos, para
   não parecer vigilância real de pessoas). Implementados como variantes reais numa página temporária
   `/dev-hero-options` para comparação ao vivo.
2. **Usuário escolheu a opção 3 (Detecção)** e pediu 3 variações dela: Refinada (transições mais
   suaves + linha de varredura sutil), Rastreamento (caixas se movem e deixam rastro, tipo seguindo um
   veículo), Painel de Operações (mais denso, 6 detecções simultâneas + mini-painel de barras
   animadas "atividade em tempo real").
3. **Usuário escolheu a variação "Painel de Operações" com as porcentagens de confiança visíveis** —
   oficializada como `src/components/HeroBackground.astro`, usada na Home real.
4. **Limpeza**: deletados `HeroScenes.astro` (o original, não usado em mais nenhum lugar — confirmado
   via grep antes de apagar), os 5 componentes de variação não escolhidos
   (`src/components/hero-variants/*`), e a página temporária `/dev-hero-options.astro`. Sem código
   morto sobrando.

**Detalhe técnico que vale lembrar**: `requestAnimationFrame` não avança de forma confiável nesta
ferramenta de browser de teste (aba sem foco de SO — mesma limitação documentada na sessão anterior
para os `StatCounter`). O componente de rede de nós (canvas, já removido) tinha esse problema — sem
querer aumentou a robustez do componente adicionando um `drawFrame()` síncrono antes do primeiro
tick de `requestAnimationFrame`, evitando flash em branco em qualquer navegador, não só neste de
teste. Animação via SVG `<animateMotion>` (SMIL) já usada no `HeroBackground` final **não** tem esse
problema — roda no motor de animação nativo do navegador, independente de rAF/JS.

### Elementos animados inspirados em concorrente (aiquimist.com) — 2026-07-17 (mesma sessão)

Usuário pediu para olhar https://aiquimist.com/ (concorrente direto — plataforma de IA para
segurança pública/cidades inteligentes, nicho quase idêntico ao da Proc) e reinterpretar elementos
animados que explicam a plataforma. Padrão central identificado: eles mostram um evento/busca
*fluindo* pelo sistema com diagramas animados e passos numerados, em vez de só listar features
estáticas.

Reinterpretado (conteúdo e visual próprios da Proc, técnica inspirada, não copiado):

- **`src/components/AnimatedFlow.astro`** — diagrama SVG com hub central "PROC AI" e pulsos animados
  (via `<animateMotion>`) percorrendo conexões até as 4 unidades de negócio reais, sincronizado com 4
  passos numerados (Captura → Análise → Direcionamento → Ação). Colocado em `/plataforma-proc-ai`,
  antes do `PlatformMandala.astro` existente (que virou o "mapa completo" depois do "como funciona").
- **`src/components/ConnectedTicker.astro`** — faixa de scroll infinito reforçando integração,
  reaproveitando o tagline que a Proc já usa ("Uma plataforma. Múltiplas soluções.") em vez de copiar
  o texto do concorrente. Colocado na Home, logo após o hero.

Ambos testados com contraste WCAG e confirmação de que a animação SVG realmente se move (amostrando
a posição do elemento duas vezes com delay) — SMIL funciona neste ambiente de teste mesmo com a
limitação de rAF documentada acima.

### Case real do Pato 360° — pesquisa online + implementação — 2026-07-17 (mesma sessão, fim)

Usuário pediu para pesquisar o Pato 360° (produto real da Proc, mencionado no topo deste arquivo)
online e ver se dava para enriquecer a página de Cidades Inteligentes com isso.

**Pesquisado e confirmado via fontes públicas oficiais** (prefeitura e câmara municipal de Pato
Branco, imprensa local — Diário do Sudoeste):
- Proc Group é a empresa responsável pela infraestrutura de software do Pato 360°, confirmado em
  múltiplas fontes independentes.
- Achado interessante: uma matéria do Diário do Sudoeste cita "Aldo Arendt, representante da Proc
  Group" como responsável pela instalação — possivelmente o próprio usuário.
- Expansão de 240 para 700+ câmeras com IA; reconhecimento facial e LPR operacionais desde 2022;
  análise de áudio (detecta gritos, vidro quebrado) com alerta automático; integração com Sistema
  Córtex (Ministério da Justiça) e PRF.
- **CPSI = "Contrato Público para Solução Inovadora"** (não é nome de central de segurança — é o
  modelo jurídico de contratação, Lei Complementar Federal 182/2021, Marco Legal das Startups).
  Confirmado via edital real da licitação de Pato Branco (nº 01/2024) publicado no site da
  prefeitura.

**Usuário confirmou diretamente** (informação de primeira mão, não pesquisada) que a Proc atende 5
municípios com projeto similar via CPSI: Pato Branco, Marmeleiro, Sulina, Chopinzinho, Coronel
Vivida. Tentei verificar os 4 além de Pato Branco nos portais de transparência de cada um — só
consegui confirmar a **existência** do edital em Sulina (nº 016/2024, mesmo tipo de projeto), não o
vencedor. Portais tipo `*.govbr.cloud/pronimtb` foram bloqueados pela ferramenta de browser; Google
não indexa bem os documentos de resultado/homologação desses sistemas. **Ver item 1 da seção
"PRÓXIMA SESSÃO" no topo deste arquivo** — fica pendente até o usuário mandar o link direto de um
documento, ou até uma sessão futura conseguir acessar esses portais de outra forma.

**Implementado:**
- Novo slot `case-study` em `BusinessUnitTemplate.astro` (só usado por Cidades Inteligentes até
  agora — os outros 3 templates de unidade não passam nada nesse slot, ficam iguais).
- Bloco de case real em `src/pages/solucoes/cidades-inteligentes.astro`: estatísticas (5 municípios,
  700+ câmeras, Lei 182/2021), lista dos 5 municípios, e um mini-diagrama animado linear (mesma
  técnica SVG `<animateMotion>`) mostrando o fluxo real de detecção: Captura → Análise por IA →
  Correlação → Alerta.
- `src/pages/cases.astro`: o 1º case (antes fictício) virou o Pato 360° real, com selo verde "Case
  real" em vez de "Exemplo ilustrativo" — os outros 3 cases continuam fictícios/marcados.
- Fontes citadas em comentário no código de ambos os arquivos, com nota explícita "números podem
  estar desatualizados — confirmar com o time antes de publicar".

**Bug real encontrado e corrigido**: o parágrafo `.lead` da nova seção estava com contraste 1.17
(quase invisível) — mesma causa raiz já documentada nesta sessão e na anterior (`<p>` sem `color`
próprio herda o valor escuro já resolvido do `<body>` em vez de reavaliar `--color-text` dentro da
seção clara). Corrigido com `color` explícito.

**Token corrigido preventivamente**: `--color-success` (usado no banner de sucesso do formulário de
contato, calibrado só para fundo escuro) ganhou uma variante clara em `[data-theme="light"]` antes
mesmo de causar um bug visível — usado no selo "Case real" que fica em seção clara. Mesmo padrão já
aplicado ao `--color-eyebrow` antes.

### Auditoria e correção de contraste de cores — concluído em 2026-07-17

O usuário pediu explicitamente pra verificar texto ilegível/invisível por combinação de cores em todo o
site. Rodei uma auditoria automatizada (script JS injetado via browser, calcula razão de contraste WCAG
real entre `color` computado e o `background-color` efetivo do ancestral mais próximo) nas 14 páginas.
Achei e corrigi 2 bugs sistêmicos reais (não é achismo visual, são números de contraste):

**Bug 1 (corrigido):** `--unit-color` (cor de cada unidade de negócio, definida em
`src/data/businessUnits.ts`) era usada como cor de TEXTO em badges/chips (`.unit-badge`, `.chip`) que às
vezes caem sobre fundo escuro. Pra Segurança Corporativa (`var(--navy-900)`) e IA Industrial
(`var(--navy-700)`) isso dava contraste ~1.0–1.5:1 (praticamente invisível) sempre que o badge aparecia
fora de uma seção `data-theme="light"`. **Fix aplicado** (decisão do usuário: manter a cor da unidade só
como acento em borda/tarja, texto do badge sempre branco em fundo escuro): troquei
`color: var(--unit-color)` → `color: var(--white)` em `.unit-badge` de `src/pages/index.astro`,
`src/pages/solucoes/index.astro`, `src/components/BusinessUnitTemplate.astro`, e em `.chip` de
`src/pages/blog/index.astro`. **Não toquei** nas instâncias que já estavam em seção `data-theme="light"`
(`.unit-badge` de `src/pages/empresa.astro` dentro de `.units-recap`, `.case-badge` de
`src/pages/cases.astro`, `.post-category` de `src/pages/blog/index.astro`) — essas já tinham bom
contraste (navy/vermelho sobre branco) e trocar quebraria.

**Bug 2 (corrigido) — causa raiz mais interessante:** `--color-text` é uma custom property CSS
redefinida dentro de `[data-theme="light"]` (ver `src/styles/tokens.css`). Ela só é recalculada em
elementos que **declaram `color: var(--color-text)` explicitamente na própria regra**. Elementos sem
nenhuma declaração de `color` própria herdam o valor já resolvido lá em `<body>` (sempre escuro) — a
herança de CSS propaga o valor computado, não reavalia `var()` a cada geração. Isso deixava:
- `.solution-card p` (lista de soluções tipo "Reconhecimento Facial") em `BusinessUnitTemplate.astro`,
  dentro da seção clara `.solutions-section` — contraste ~1.07:1
- `.result-pill` (selos de resultado tipo "-32% tempo médio...") em `src/pages/cases.astro`, dentro da
  seção clara `.cases-section` — contraste ~1.17:1

**Fix aplicado:** adicionei `color: var(--color-text);` explicitamente nas duas regras. Correção
mecânica, sem decisão de design envolvida.

**Achado menor, não corrigido (baixa prioridade):** o texto pequeno `.eyebrow` (ex: "Empresa",
"Soluções" — vermelho `--red-500` em maiúsculas) aparece em quase toda página com contraste 3.6–4.5:1,
ligeiramente abaixo do padrão WCAG AA estrito de 4.5:1 pra texto pequeno — ainda legível, não é "texto
invisível", só não passa no critério mais rígido. Não mexi nisso, é um padrão de marca usado no site
inteiro (`.eyebrow` em `src/styles/base.css`); se quiser corrigir, precisa aprovação do usuário porque
mexe na cor de marca.

**Verificado:** re-rodei a auditoria em todas as páginas afetadas depois do fix — os dois bugs sumiram,
as instâncias que já estavam corretas continuam intactas, `npm run build` sem erros/warnings. Commitado
e enviado (`6144b39`).

### Detalhes do passo 2 (publicação) — concluído em 2026-07-17

- Commits enviados a `master` (`origin/master`, repo público `PedroBMR/procgroup-site`): fix de
  base-path (`0f7b0b7`), workflow de deploy (`092c6fa`), fix de versão do Node no workflow (`6d1759e`).
- `.github/workflows/deploy.yml` criado usando `withastro/action@v3` + `actions/deploy-pages@v4`.
  **Importante:** precisou fixar `node-version: 22` explicitamente no input do `withastro/action`,
  porque o Astro 7 exige Node `>=22.12.0` e a action usa Node 20 por padrão — sem isso o build falha
  com "Node.js v20.20.2 is not supported by Astro!". Se algum dia mexer nesse workflow de novo, manter
  esse pin.
- GitHub Pages habilitado via `gh api repos/PedroBMR/procgroup-site/pages -X POST -f build_type=workflow`
  (fonte = GitHub Actions, branch `master`).
- Verificado ao vivo no browser: `/` e `/blog/` retornam 200, título correto, sem erros de console,
  CSS e o logo do header (`/procgroup-site/brand/logo-white.png`) carregando certo.

### Checklist do passo 1 (base-path fix) — CONCLUÍDO em 2026-07-16

Contexto: sem domínio próprio, o GitHub Pages serve em `pedrobmr.github.io/procgroup-site/` (sub-caminho).
`astro.config.mjs` já tem `site: 'https://pedrobmr.github.io'` e `base: '/procgroup-site'` configurados.
`src/utils/url.ts` tem `withBase(path)` que prefixa qualquer caminho absoluto (`/algo`) com o base,
e deixa URLs externas (`mailto:`, `tel:`, `https://`) intactas.

**✅ Todos os `<a href>` internos corrigidos com `withBase()`:**
Button.astro, Header.astro, Footer.astro, Breadcrumb.astro (`<a>` renderizado — o schema JSON-LD
continua usando a URL de produção real, ver nota do canonical abaixo), TopBar.astro (só `/suporte` e
`/trabalhe-conosco`; WhatsApp e ícones sociais ficaram externos, sem tocar), BusinessUnitTemplate.astro
(link "outras unidades"), e os `<a href={unit.href}>`/`<a href={`/solucoes/...`}>` soltos em
`src/pages/index.astro`, `src/pages/empresa.astro`, `src/pages/plataforma-proc-ai.astro`,
`src/pages/blog/index.astro`, `src/pages/solucoes/index.astro`.

**⚠️ Duas correções extras que a checklist original não previa** (achadas rodando `npm run build` e
inspecionando o `dist/` gerado):
- `src/components/Logo.astro` — `<img src="/brand/logo-white.png">` (variant "white", usado no Header)
  não recebia o prefixo de base (diferente do `mask: url(...)` em CSS, que o Vite já prefixa sozinho).
  Corrigido com `withBase()`. Isso quebraria o logo do header em produção no GitHub Pages se não fosse
  pego.
- `src/layouts/BaseLayout.astro` — `<link rel="icon" href="/favicon.svg">` também não tinha `withBase()`.

**Sobre o canonical/og:image do `BaseLayout.astro` (a memória antiga estava desatualizada aqui):**
O código real usa `siteUrl = "https://www.procgroup.com.br"` (o domínio de produção final, não o
`pedrobmr.github.io` que a memória antiga assumia) — decisão de SEO já existente no código para as tags
canonical/og apontarem pro domínio definitivo mesmo enquanto o site está temporariamente no GitHub
Pages. O bug real era que `Astro.url.pathname` (usado como `path` default) já vem com o prefixo
`/procgroup-site` embutido, e ao combinar com `siteUrl` gerava canonical quebrado tipo
`https://www.procgroup.com.br/procgroup-site/blog/`. Corrigido removendo o prefixo de base do `path`
antes de montar a URL canônica — agora gera `https://www.procgroup.com.br/blog/` corretamente. **Não
mudei a decisão de qual domínio usar no canonical** (isso é decisão de escopo/SEO, não bug técnico) —
só corrigi o path duplicado.

**Verificação feita:** `npm run build` local sem warnings; inspecionei o `dist/` gerado e confirmei que
nenhum `href=`/`src=` interno escapa do prefixo `/procgroup-site`, que externos (wa.me, tel:, mailto:)
ficaram intocados, e que o `aria-current="page"` do nav continua funcionando. `dist/` removido depois do
teste (não commitado).

### Depois do base-path fix: publicar no GitHub Pages

- Criar `.github/workflows/deploy.yml` (workflow padrão do Astro pra GitHub Pages, usando
  `withastro/action` ou `actions/configure-pages` + `actions/upload-pages-artifact` +
  `actions/deploy-pages`)
- Habilitar Pages no repo via `gh api repos/PedroBMR/procgroup-site/pages -X POST` com
  `source: {branch: ..., path: ...}` ou configurar pra usar GitHub Actions como fonte
  (`build_type: workflow`)
- Confirmar que `https://pedrobmr.github.io/procgroup-site/` carrega corretamente com CSS/imagens/links
  funcionando (esse é o motivo de termos corrigido o base-path antes)

## Contexto do projeto

Reformulação completa do site institucional da Proc Group (procgroup.com.br), reposicionando a
empresa como uma plataforma de Inteligência Artificial, Visão Computacional e Infraestrutura de TI —
não mais apenas uma integradora. O site antigo (clone estático em `Desktop\ProcGroup Clone`) foi usado
só como referência de conteúdo/imagens reais, não como base de código.

**Importante:** a empresa real hoje só tem 2 frentes oficiais no site ao vivo (Infraestrutura de TI e
Segurança Pública, marca "Pato 360°"). As 4 unidades de negócio do novo site (Cidades Inteligentes,
Segurança Corporativa, Infraestrutura de TI, IA Industrial) são o reposicionamento aspiracional pedido
explicitamente pelo usuário no briefing original — não uma cópia da realidade atual da empresa.

## Decisões de arquitetura já tomadas

- **Stack:** Astro estático (não Next/Nuxt), escolhido no início da conversa via pergunta ao usuário.
- **Tema:** dark-first, mas com alternância de seções claras/escuras via `[data-theme="light"]` escopado
  em `src/styles/tokens.css` — qualquer `<section data-theme="light">` flipa automaticamente porque todos
  os componentes consomem tokens semânticos (`--color-bg`, `--color-text` etc.), não cores cruas.
- **Cores da marca:** navy azul-preto neutro `#060a14` (não roxo/violeta) + vermelho puro `#e2081d`
  (extraído por amostragem de pixel do logo real) — paleta ajustada 3 vezes até o usuário aprovar.
- **Fontes:** Space Grotesk (corpo) + Barlow Condensed peso 800 uppercase (H1/H2), copiando a estrutura
  exata do kabatone.com (referência visual aprovada pelo usuário), mas com nossas cores.
- **Logo:** arquivo real do logo (`public/brand/logo-white.png`) recolorido via técnica de CSS
  `mask-image` no componente `Logo.astro` — evita ter que recriar o logo à mão em SVG.
- **Diagrama mandala:** `src/components/PlatformMandala.astro` — SVG puro com geometria de donut/sunburst
  calculada em tempo de build no frontmatter (sem JS no cliente), substituindo o diagrama linear antigo.
  Inspirado numa imagem de referência estilo Atos que o usuário enviou.

## Dados reais incorporados (puxados de procgroup.com.br ao vivo)

- Stats: 200+ clientes, 10+ anos, 99% satisfação
- Contato: comercial@procgroup.com.br, +55 46 3224-3532, Caetano Munhoz da Rocha 480, Pato Branco/PR,
  Seg-Sex 8h-18h, também em Curitiba/PR
- WhatsApp Vendas: **+55 46 99141-1324** — este número foi passado diretamente pelo usuário e é
  DIFERENTE do que está publicado no site ao vivo (+55 46 99123-0911). O usuário confirmou que o dele
  é a atualização correta e para manter.
- História real: fundada 2014 em Pato Branco (TI para varejo alimentar), consolidação cloud/backup
  2016-2018, expansão para setor público em 2019, produto de segurança pública real chamado "Pato 360°"
- Credibilidade real: parceiro oficial "Embarque + Seguro" (programa do Governo Federal), cliente
  Latam Linhas Aéreas, atende órgãos de segurança de diversas cidades

## Estrutura de páginas (atualizado 2026-07-17, sessão do blog headless)

- `/` Home, `/empresa`, `/plataforma-proc-ai`
- `/solucoes`, `/solucoes/cidades-inteligentes`, `/solucoes/seguranca-corporativa`,
  `/solucoes/infraestrutura-de-ti`, `/solucoes/ia-industrial` (as 4 últimas usam o template
  compartilhado `src/components/BusinessUnitTemplate.astro`)
- `/cases` (4 cases fictícios estruturados Problema/Desafio/Solução/Resultados)
- `/blog`, `/blog/[slug]`, `/blog/categoria/[slug]`, `/eventos` — **conteúdo real do WordPress**
  via `src/content.config.ts` (headless), não mais os 8 posts fictícios originais. Ver seção
  "Blog headless via WordPress..." acima para detalhes.
- `/contato` (formulário funcional via `public/contact.php`), `/suporte`, `/trabalhe-conosco`
  (canais de contato reais, não sistema de chamados/portal de vagas — ver seção acima),
  `/politica-de-privacidade` (conteúdo real do WordPress)

## Assets reais reaproveitados

Copiados de `Desktop\ProcGroup Clone\wp-content\uploads\...` para o novo projeto:
- Logo (branco transparente + versão sobre navy) em `public/brand/`
- Foto real da sede em Pato Branco → `src/assets/images/hq-pato-branco.webp` (usada na Home e Empresa)
- 8 imagens de capa de blog reais → `src/assets/images/blog/`

## Ordem de trabalho combinada com o usuário (2026-07-16)

Ver seção "🔴 PRÓXIMA SESSÃO" no topo deste arquivo para o estado exato e checklist do que falta.
Resumo da ordem: (1) terminar fix de base-path → (2) publicar no GitHub Pages → (3) terminar QA de
todas as páginas → (4) criar páginas em inglês e espanhol → (5) conversar sobre a página de Eventos.

### Sobre o item 4 (i18n) quando chegar a vez

Infraestrutura já iniciada, ainda não aplicada nas páginas:
- `src/i18n/config.ts` — locales `pt`/`en`/`es`, padrão `pt` sem prefixo de URL
- `src/i18n/translations.ts` — dicionário com nav/topbar/footer/Home completos nas 3 línguas
- `src/i18n/utils.ts` — `useTranslations(lang)`, `localizePath(path, lang)` (já aplica `withBase`
  internamente, então localizePath já resolve base-path + locale-path juntos)
- **Falta**: aplicar isso de fato no `Header.astro`, `Footer.astro`, `TopBar.astro`,
  `BaseLayout.astro` (prop `lang`, seletor de idioma no header, tags `hreflang`), criar
  `src/pages/en/index.astro` e `src/pages/es/index.astro`, e depois expandir a tradução para as
  páginas internas (unidades de negócio, cases, blog) conforme o escopo combinado
  (usuário escolheu: infraestrutura completa + Home primeiro, resto depois).
- Obs: nomes das unidades de negócio (ex. "Cidades Inteligentes") foram deixados em português mesmo
  nas versões EN/ES — só as taglines/descrições são traduzidas (ver `unitTaglines` em `translations.ts`).

## Notas de comportamento/preferência do usuário

- Prefere que eu pergunte sobre decisões de escopo grande (ex: i18n completo vs. faseado) em vez de
  assumir — mas depois de decidido, quer que eu execute sem pausar de novo pra confirmar detalhes menores.
- Confirmou explicitamente: manter o WhatsApp que ele passou mesmo divergindo do site ao vivo.
- Pediu QA de UI/UX separado do QA técnico (achou que tinha esquecido de pedir isso antes de seguir).
- Repo GitHub: público, nome `procgroup-site`, conta `PedroBMR`.
