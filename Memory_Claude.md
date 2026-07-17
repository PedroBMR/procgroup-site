# Proc Group — Reformulação do Site — Memória de Progresso

> Arquivo de acompanhamento do projeto. Atualizado pelo Claude a cada marco importante.
> Local do projeto: `C:\Users\Efapi\Desktop\ProcGroup Novo Site`
> Repositório GitHub: https://github.com/PedroBMR/procgroup-site (público)
> Stack: Astro 7 (estático), sem framework de UI adicional.

## 🔴 PRÓXIMA SESSÃO — COMECE AQUI

**Passos 1 e 2 concluídos e verificados ao vivo.** Site publicado e funcionando em
**https://pedrobmr.github.io/procgroup-site/** (testado no browser: home e `/blog/` carregam com
status 200, sem erros de console, CSS/logo corretos).

Ordem de execução combinada com o usuário, **nesta sequência**:

1. ~~Terminar a correção de base-path para o GitHub Pages~~ ✅ **concluído em 2026-07-16**
2. ~~Publicar de fato no GitHub Pages~~ ✅ **concluído em 2026-07-17** — ver detalhes abaixo
3. ~~Terminar o QA de todas as páginas~~ ✅ **rodado em 2026-07-17** — achou 2 problemas que precisam de
   decisão do usuário antes de seguir (ver "Achados do QA" abaixo). **Aguardando decisão do usuário
   sobre esses 2 pontos antes de considerar o QA "fechado".**
4. Criar todas as páginas em inglês e espanhol
5. Só depois disso, conversar sobre a nova página de **Eventos** (atualizada com frequência conforme o
   evento que a Proc estiver participando) — feature ainda não especificada, precisa levantar requisitos
   com o usuário antes de implementar.

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
as instâncias que já estavam corretas continuam intactas, `npm run build` sem erros/warnings.
**Ainda não commitado nem enviado ao GitHub nesta sessão** até o usuário confirmar.

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

## Estrutura de páginas (todas em PT, completas — sem stubs "coming soon" restantes)

- `/` Home, `/empresa`, `/plataforma-proc-ai`
- `/solucoes`, `/solucoes/cidades-inteligentes`, `/solucoes/seguranca-corporativa`,
  `/solucoes/infraestrutura-de-ti`, `/solucoes/ia-industrial` (as 4 últimas usam o template
  compartilhado `src/components/BusinessUnitTemplate.astro`)
- `/cases` (4 cases fictícios estruturados Problema/Desafio/Solução/Resultados)
- `/blog` (8 posts de exemplo, usando **imagens de capa reais** recuperadas do clone antigo em
  `src/assets/images/blog/`)
- `/contato`, `/suporte`, `/trabalhe-conosco`, `/politica-de-privacidade`

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
