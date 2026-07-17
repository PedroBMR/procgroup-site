# Proc Group — Reformulação do Site — Memória de Progresso

> Arquivo de acompanhamento do projeto. Atualizado pelo Claude a cada marco importante.
> Local do projeto: `C:\Users\Efapi\Desktop\ProcGroup Novo Site`
> Repositório GitHub: https://github.com/PedroBMR/procgroup-site (público)
> Stack: Astro 7 (estático), sem framework de UI adicional.

## 🔴 PRÓXIMA SESSÃO — COMECE AQUI

**Passo 1 (base-path fix) está 100% completo** (ver checklist abaixo com o resultado final). Mudanças
feitas mas **ainda não commitadas nem enviadas ao GitHub** — pedir confirmação ao usuário antes de
`git add`/`commit`/`push`, já que é uma ação que afeta o repositório remoto (público).

Ordem de execução combinada com o usuário, **nesta sequência**:

1. ~~Terminar a correção de base-path para o GitHub Pages~~ ✅ **concluído em 2026-07-16**
2. **PRÓXIMO PASSO**: publicar de fato no GitHub Pages (commit+push do fix, workflow do Actions,
   habilitar Pages no repo) — ver seção abaixo
3. Terminar o QA de todas as páginas
4. Criar todas as páginas em inglês e espanhol
5. Só depois disso, conversar sobre a nova página de **Eventos** (atualizada com frequência conforme o
   evento que a Proc estiver participando) — feature ainda não especificada, precisa levantar requisitos
   com o usuário antes de implementar.

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
