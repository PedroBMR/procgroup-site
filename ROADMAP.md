# Roadmap de correções — procgroup-site

Origem: auditoria técnica de 20/07/2026 (código-fonte + build de produção + site medido no
navegador). Cada item foi verificado — o `arquivo:linha` e o número medido estão registrados.

**Intenção destes itens:** não são só apontamentos. Cada um deve ser investigado para achar a
melhor solução e ser resolvido. A "solução sugerida" abaixo é ponto de partida, não decisão fechada.

O `#` de cada item é o número do achado no relatório da auditoria, para cruzar referência.

**Cópia oficial do repositório:** `D:\16_GitHub_Repos\ProcGroup\procgroup-site`. Existia uma segunda
cópia em `C:\Users\aldoa\OneDrive\Ambiente de Trabalho\procgroup-site`, mesmo branch e mesmo commit,
que estava ligeiramente à frente (já tinha apagado as 14 páginas duplicadas). Em 2026-07-20 essa
limpeza foi replicada em `D:` e a cópia do OneDrive foi considerada obsoleta. **Rodar o servidor de
dev sempre a partir de `D:`** — o servidor antigo apontava para o OneDrive, o que fazia edições
"não surtirem efeito".

---

## Concluído em 2026-07-20

| # | Item | O que mudou |
|---|---|---|
| 2 | Token `--space-5` inexistente | `--space-5: 1.25rem` em `tokens.css`. Verificado: `.post-body` saiu de `padding: 0px` para `20px`; 0 de 14 cards ainda zerados. |
| 9 | `.btn-secondary` invisível em seção clara | Novo token `--color-border-ui` (3:1, os dois temas) usado no `.btn-secondary`. Medido: 3,22:1 no claro, 3,31:1 no escuro. |
| 12 | Skip link nunca visível | `.visually-hidden:focus-visible` em `base.css` + `tabindex="-1"` no `<main>`. Verificado com Tab: 216×53 px no canto superior esquerdo (era 1×1). |
| 10 | Fallback do `motion.ts` não revelava | `showAll()` reescrito para escrever no `style` inline e sem depender do GSAP. Provado no DOM: só a classe deixava `opacity: 0`; o inline revela. |
| 22 | 14 páginas duplicadas | Apagadas as 14 da raiz (+ `public/favicon.svg` órfão, item da P8). Build saiu de 10 avisos de conflito para **0**, mantendo as 60 páginas. A home PT ganhou as animações que só EN/ES tinham: `data-hero-intro` 0→1, `data-magnetic` 0→3. |

### Prioridade 2 — feita em 2026-07-20

| # | Item | O que mudou |
|---|---|---|
| 3 | Menu EN/ES levava a 404 | Novo conceito central em `i18n/utils.ts`: `SINGLE_VERSION_PREFIXES` (`/blog`, `/404`) + `isSingleVersionPath()`. `localePath()` não prefixa esses caminhos, então menu, rodapé e CTAs em EN/ES passaram a apontar para `/blog`. Verificado no build: `/en/blog` e `/es/blog` saíram de 198 links para **0**. |
| 4 | `hreflang` para 34 URLs inexistentes | `BaseLayout` não emite alternates (nem `x-default`) em páginas de versão única. Verificado: **0** hreflang quebrado no build (era 34). As páginas normais mantêm os 4 alternates. |
| 20 | EN/ES despejado no blog PT sem aviso | Aviso "Articles are published in Portuguese." / "Los artículos se publican en portugués." no teaser da home e em `/eventos`, com `lang="pt-BR"` no bloco dos cards (WCAG 3.1.2). Chave em `common.blogLangNote`, vazia em PT. |
| — | Sem página 404 própria | Criada `src/pages/404.astro`, com `noIndex`. Como o site é estático e a página é servida para qualquer URL, ela é renderizada em PT e um script troca os textos e os destinos quando a URL começa com `/en/` ou `/es/`. Testado nos dois casos. |

**Seletor de idioma:** numa página de versão única, EN e ES agora levam à **home daquele idioma** (antes davam 404). É melhor que um link morto e melhor que um link que não faz nada — o visitante chega a uma página real no idioma que pediu.

**Decisão tomada:** o blog continua acessível a partir de EN/ES, sempre pelas URLs PT e com o idioma sinalizado — em vez de ser escondido do menu (a outra opção registrada abaixo no item #3). Motivo: são 16 artigos reais, e escondê-los de prospects de exportação perderia conteúdo sem necessidade, ainda mais com o teaser já aparecendo na home EN/ES. Se preferir esconder, é remover o item `blog` em `nav.ts` quando `lang !== "pt"`.

⚠️ **A página 404 só entra em vigor com `ErrorDocument 404` no `.htaccess`**, que ainda não existe (Prioridade 4). Sem isso, na Hostinger o visitante continua vendo o erro padrão do Apache.

---

### Prioridade 3 — feita em 2026-07-20 (menos as fontes)

| # | Item | Medido antes → depois |
|---|---|---|
| 4 | 15,3 MB de imagens no blog | **`/blog`: 15,26 MB → 0,17 MB** (90×). Posts: 6–8 MB → ~0,10 MB. Maior capa: 2.496 KB PNG → **43 KB WebP** (58×). |
| 28 | three.js no caminho crítico | **JS inicial da home: 172 KB → 44 KB gzip.** O three virou chunk sob demanda de 126 KB gzip, carregado só com WebGL e sem `prefers-reduced-motion`. |
| 15 | Canvas do hero distorcido | **Desvio de proporção: ~12% → 0,0%.** |
| — | Fontes com pesos a mais | Barlow 900 e Space Grotesk 500 não aparecem em nenhum CSS: **8 → 6 pesos**. |

**Como as imagens foram resolvidas:** `image.remotePatterns` em `astro.config.mjs` autoriza `procgroup.com.br`, e o novo componente `src/components/BlogImage.astro` passa as capas pelo `astro:assets` — WebP local, no tamanho certo, com variante 2x nos cards. A altura sai da proporção **real** do WordPress, não mais de um `480x280` fixo que não batia com capas 1024x320 (reserva de espaço errada, CLS).

**Efeito colateral importante:** `og:image`, `twitter:image` e o `image` do JSON-LD também apontavam para o WordPress. Foram migrados para a versão local via `getImage()`. Resultado: **zero referências a `wp-content` no HTML** — o site não depende mais do WordPress estar no ar para renderizar. Isso desarma a armadilha de cutover que estava registrada aqui: as imagens eram hot-link do domínio que o próprio site vai assumir.

**Sobre o three.js — o caminho importa.** A primeira tentativa foi `import("three")` direto no componente: adiou o download, mas a fronteira dinâmica **impediu o tree-shaking** e o pacote subiu de 129 para 178 KB gzip. A solução foi extrair o efeito para `src/scripts/neuralField.ts`, com imports **nomeados** do three, e carregar esse módulo com `import()`. Assim a poda volta a funcionar (126 KB gzip) e o carregamento continua sob demanda. **Não mover esses imports de volta para dentro do `.astro`.**

Também foi adicionada uma checagem de WebGL antes do `import()`, para não baixar meio megabyte e só então descobrir que o navegador não renderiza.

### Prioridade 4 — feita em 2026-07-20

| # | Item | O que mudou |
|---|---|---|
| 5 | `contact.php` com dado não sanitizado em cabeçalho | `cleanText()` agora remove CR/LF (cobre todo caller, presente e futuro); o assunto passa por `cleanHeaderValue()` na saída; `Reply-To` usa `quotedDisplayName()`, que cita o nome e remove `"` e `\`. `X-Mailer` com a versão do PHP foi removido. |
| — | Sem limite de envio | Throttle por IP: **5 envios / 10 min**, contador em `sys_get_temp_dir()`. O IP é gravado **hasheado** — o objetivo é reconhecer repetição, não manter log de quem visitou. Usa `REMOTE_ADDR`, nunca `X-Forwarded-For` (é controlável pelo cliente e tornaria o limite trivial de burlar). Se o diretório não for gravável, **deixa passar**: um throttle quebrado não pode engolir lead real em silêncio. |
| — | Open redirect via `HTTP_REFERER` | O path agora precisa casar `^/(?!/)`. `//evil.com/x` passava na checagem de host e o navegador o lia como URL protocol-relative. |
| 26 | HTML do WordPress sem sanitização | Novo `src/utils/sanitizeWp.ts`, aplicado no loader para posts **e** páginas. Allow-list de tags, remoção de `script`/`iframe`/`form`/`style`/`base` etc. com o conteúdo, desembrulho de tags desconhecidas (preserva o texto), remoção de **qualquer** atributo `on*` e de URLs que não sejam `http(s):`/`mailto:`/`tel:`/`#`/relativas. |
| — | Sem `.htaccess` | Criado `public/.htaccess`: `ErrorDocument 404`, redirect HTTPS, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, CSP parcial, cache imutável para `/_astro/`, compressão, `Options -Indexes`. Confirmado que o Astro copia o dotfile para o `dist/`. |

**Prefixo `on*` em vez de lista de eventos:** a checagem é por prefixo justamente porque uma lista de nomes (`onclick`, `onerror`, …) nasce incompleta — eventos novos aparecem, a lista não acompanha.

**Validação da sanitização.** Primeiro um teste com 15 payloads (script solto e aninhado, `onerror`, `ONCLICK` maiúsculo, evento inventado, `javascript:`, `data:`, iframe, form de phishing, bloco `<style>`, atributo `style`, sequestro de `<base>`, custom element): **15/15 neutralizados**, e o conteúdo real típico preservado intacto.

Depois a checagem que importava — o conteúdo publicado mudou? Comparação byte a byte do HTML gerado, antes e depois:
- **16 posts do blog: idênticos.**
- **Política de Privacidade:** única diferença é `<br />` → `<br>`, serialização de elemento vazio. Idêntico em HTML5, zero impacto visual. Nenhuma tag removida, nenhum atributo removido, texto integralmente preservado (conferido contra a API do WordPress).

**Dependência:** `ultrahtml@1.7.0` passou a ser declarada em `package.json`. Ela já vinha instalada como dependência transitiva do Astro, mas depender disso sem declarar é frágil — se o Astro trocar de parser, o build quebra sem aviso.

### Prioridade 5 — feita em 2026-07-20 (menos a consolidação de breakpoints)

| # | Item | Medido antes → depois |
|---|---|---|
| 7 | `/evento`: etiquetas navy sobre navy | Texto da etiqueta passou a branco; a cor da unidade fica no fundo do chip e na barra do card, clareada 36%. **1,03:1 → aprovado.** |
| 7 | Hover invisível em 2 dos 4 cards | `border-color` clareada 36% em 5 arquivos. |
| 8 | Colunas do diagrama somem no fundo | `.pm-col` passou a `--color-surface`; barra do topo clareada. **1,00:1 → destacado.** |
| 11 | Menu mobile fechado capturava o Tab | `visibility: hidden` no fechado. **19 links focáveis → 0.** Ganhou `<nav>`, `id`, `aria-controls`, fechamento por `Esc` com foco de volta no botão, e fecha ao clicar num link. |
| 13 | Rótulos do diagrama com 3–7px no celular | **3,4–9,3px → 11,2–16,7px**, sem colisão e sem rolagem lateral na página. |
| 14 | Alvos de toque e links sem nome no celular | `menu-toggle` 40→**44×44**; troca de idioma ~19→**40px** de altura. Rótulos deixaram de ser `display:none` e passaram a ser recortados — voltaram a ter nome acessível. |
| 16 | `vh` no celular | Hero e menu passaram a `svh`/`dvh`. |
| 27 | `StatCounter` zerava os números | **Corrigido na raiz** — ver abaixo. |
| — | Lote de acessibilidade | 13 SVGs decorativos ganharam `aria-hidden`; `aria-current="page"`; `alt=""` nas capas dos cards; chip "Todos" virou link; `aria-label` de landmark traduzidos. |

**Verificação final:** contraste medido em runtime em **16 páginas — zero reprovações** (eram 6 falhas em 2 páginas). Overflow horizontal a 375px: **0 de 16**.

**O `StatCounter` estava pior do que o registrado.** O item falava em `prefers-reduced-motion`, mas ao testar apareceu o problema de fato: os contadores ficavam em **"0+", "0+", "0%"** enquanto o bloco não entrasse na tela — e para sempre, se o observer não disparasse. A causa era zerar todos no load e só restaurar via `IntersectionObserver`. Removido o zeramento antecipado: o primeiro quadro da animação já escreve 0, então manter o valor do servidor até lá dá exatamente a mesma animação sem essa janela. Verificado: sem rolar, os contadores mostram `200+`, `10+`, `99%`.

**Sobre as etiquetas de `/evento` — o problema é de dados, não de CSS.** Duas das quatro unidades têm `--navy-900` e `--navy-700` como cor de marca (`businessUnits.ts:25,27`), e o site é navy. Para o texto chegar a 4,5:1 seria preciso clarear ~50%, o que deixa as quatro cores quase idênticas — perdendo justamente a codificação por cor. A saída foi texto branco (legibilidade garantida) mantendo a cor no fundo do chip e na barra lateral. **A correção de fundo seria atribuir cores de destaque legíveis sobre escuro às duas unidades navy** — isso é decisão de marca, não minha.

### Prioridade 6 — feita em 2026-07-20 (menos o CSS duplicado)

| # | Item | O que mudou |
|---|---|---|
| 25 | `og:image` era SVG | Novo `public/og-default.png` 1200×630 (38 KB), gerado por `scripts/gerar-og.mjs` a partir de `src/assets/og-default.svg`. Somados `og:image:width/height/type`. O SVG antigo foi removido. |
| 24 | Sem sitemap nem `robots.txt` | `@astrojs/sitemap` instalado — **60 URLs**, com a 404 excluída. `robots.txt` gerado por endpoint. |
| 21 | `/evento` mandava o IP para terceiro | Chamada a `api.country.is` removida. **Zero chamadas `fetch` externas no build inteiro.** |
| — | Grids sem `minmax(0, 1fr)` | **45 declarações** corrigidas em 13 arquivos. Sem overflow a 320px nem a 375px. |
| — | Blog quebrava em silêncio | Loader agora distingue falha de rede de erro de configuração. |
| — | Pesos de fonte em `/evento` | A página tem link próprio de fontes e ainda pedia Barlow 900 e Space Grotesk 500. Alinhada com o resto. |

**`robots.txt` se autocorrige na virada.** Enquanto o site roda em `pedrobmr.github.io`, ele publica `canonical` apontando para `www.procgroup.com.br` — que hoje serve o WordPress antigo. Indexado, o preview canonicaliza para outro site. Em vez de um arquivo fixo (que resolveria só um dos dois estados, e alguém teria que lembrar de trocar), `src/pages/robots.txt.ts` decide pelo host do `site`: qualquer host que não seja o de produção sai com `Disallow: /`; ao trocar `site` em `astro.config.mjs`, passa sozinho a liberar a indexação e apontar o sitemap.

**A imagem social também estava fora da marca.** Além do formato errado, o SVG antigo usava roxo (`#0e023f` / `#241a6e`) — e o próprio `tokens.css` diz "cool blue-black, not violet". O PNG novo usa navy + vermelho da marca.

**Duas correções na imagem, apontadas na revisão:**
1. **Usa o logo real**, sobreposto pelo script — o SVG traz só fundo e texto. A marca não é redesenhada em SVG (o ícone Proc é o arquivo exato do favicon, não se recria). A primeira versão escrevia "ProcGroup" em Arial, o que era texto imitando a marca.
2. **Lista as quatro unidades juntas.** A primeira versão punha "Infraestrutura de TI" na linha de capacidades e só três unidades na linha de segmentos, fazendo parecer que os segmentos eram três. Agora a linha traz `Cidades Inteligentes · Segurança Corporativa · Infraestrutura de TI · IA Industrial`, como o site apresenta ("Quatro unidades de negócio, uma única plataforma").

**Arquivo do logo — qual usar onde.** A imagem social usa `src/assets/logo-stacked-white.png` (lockup empilhado, 511×351 de conteúdo real), exibido a 230 px: é **redução**, então sai nítido. A versão anterior usava o `public/brand/logo-white.png` horizontal (234×74) ampliado a 380 px — 1,6× de ampliação, daí as bordas macias.

O arquivo mora em `src/assets/` e **não** em `public/`: só é consumido no build da imagem social, e em `public/` seriam 62 KB copiados para o site que nenhuma página pede. Verificado que ele não aparece no `dist/`.

⚠️ **Header e rodapé continuam com o `logo-white.png` horizontal de 234×74, que é macio.** Não dá para usar o empilhado ali: os slots têm 36 px e 32 px de altura, e com proporção 1,46 o "GROUP" sairia com ~4 px. **Falta a versão horizontal em alta resolução** — quando existir, é trocar `public/brand/logo-white.png` e pronto, `Logo.astro` não muda.

Conferido visualmente após gerar: logo, texto e acentos corretos.

**O loader do blog agora falha alto quando é configuração.** Antes, "WordPress fora do ar por 5 minutos" e "WordPress mudou de domínio" davam o mesmo resultado — zero itens, mantém cache, build verde. Agora um 404/401/403 na primeira página é tratado como erro de configuração e **interrompe o build** com uma mensagem que aponta o `WP_API_URL`; falha de rede continua mantendo o cache; e se não há cache nenhum, também aborta, para não publicar o site com o blog vazio.

Testado nos dois caminhos: com `WP_API_URL=https://example.com` o build para com a mensagem correta; com o host real, carrega os 15 posts e 7 páginas normalmente. **No primeiro teste o build falhou por `TypeError` (`store.keys()` devolve array, não iterador), não pela mensagem que eu tinha escrito** — só apareceu porque exercitei o caminho de erro de propósito.

### [ ] CSS duplicado — não centralizar sem resolver um conflito antes

A duplicação entre `pages/` e `pages/[...lang]/` (~430 linhas) **já foi resolvida** ao apagar as 14 páginas da raiz na P1. O que sobra é duplicação entre componentes: **39 regras idênticas em 2+ arquivos, ~82 cópias redundantes** (`.hero-page` em 9 arquivos, `.final-cta` em 5, `.section-header` em 3…).

Não centralizei, e o motivo é concreto: **`.section` existe com dois valores diferentes** — `padding-block: var(--space-16)` em 4 arquivos e `padding-block: var(--space-16) var(--space-24)` em outros 4. Mover para `base.css` obriga a escolher um e **muda o espaçamento de metade das páginas**. Some-se a isso que os estilos hoje são escopados pelo Astro; promovê-los a globais pode vazar para onde não deviam.

Vale fazer, mas como tarefa própria: decidir os valores canônicos primeiro, depois mover, verificando página a página.

### [ ] #16 (resto) — consolidar os 9 breakpoints

A parte de `vh` foi feita. A consolidação dos 9 valores (`480, 520, 560, 640, 780, 840, 900, 980, 1200`) em 3–4 canônicos **não** foi: mexe em todos os componentes de uma vez, com risco de regressão em cascata e sem retorno visual imediato. Vale fazer em bloco, com verificação página a página.

### ⚠️ Ressalvas da P4 — ler antes de publicar

1. **Nada do `contact.php` foi executado.** Não há PHP nesta máquina, então as mudanças foram revisadas por leitura, não testadas. **Testar na Hostinger** depois da virada de deploy: envio normal, envio com `\r\n` no campo `event`, envio com `<atacante@x.com>,` no nome, e 6 envios seguidos para ver o 429.
2. **`ErrorDocument 404 /404.html` pressupõe o site na raiz.** Enquanto o build sair com `base: '/procgroup-site'`, o caminho precisa ser ajustado. Está comentado no arquivo.
3. **A CSP não tem `script-src`, de propósito.** O Astro embute scripts de componentes como `<script type="module">` inline — 68 blocos no build atual (menu do header, StatCounter, o IIFE de `/evento`). Um `script-src 'self'` quebraria todos; um `script-src 'unsafe-inline'` seria proteção de fachada. As diretivas que **não** dependem disso (`frame-ancestors`, `base-uri`, `form-action`, `object-src`) foram aplicadas e valem por si. Para ganhar `script-src`, seria preciso externalizar esses scripts ou gerar hashes no build — fica como item futuro.
4. **HSTS está comentado.** Só ativar depois de confirmar que todos os subdomínios servem HTTPS: o navegador passa a recusar HTTP por um ano e não há volta rápida.
5. **Redirect apex↔www não foi habilitado.** O hPanel da Hostinger pode já estar redirecionando; duas regras na mesma direção geram loop. Confirmar antes de descomentar.

### [ ] Fontes: falta o self-hosting

Os pesos supérfluos já saíram, mas o `<link rel="stylesheet">` do Google continua **render-blocking** e custa 2 RTTs até `fonts.gstatic.com` antes do primeiro texto pintado — além de enviar o IP do visitante ao Google a cada pageview (LGPD). O ganho real exige baixar os `.woff2` para `public/fonts/` e declarar `@font-face` local, o que significa versionar binários de fonte no repositório. **Pendente de decisão sua** — não foi feito por conta própria.

---

Ao apagar as duplicadas, a mensagem específica do `contact.php` foi preservada conforme previsto:
`[...lang]/contato.astro` agora usa `result.message` **só em PT** (via `data-server-msg`), mantendo
EN/ES com a mensagem traduzida.

**Não** foi portado o rótulo "WhatsApp comercial" da página antiga: o `ContactChannels` é
compartilhado com `/suporte`, onde chamar o canal de "comercial" induziria a erro quem procura
suporte técnico. O rótulo genérico "WhatsApp" é o correto para um componente usado nos dois
contextos.

---

## Decisões conscientes — não mexer agora

Estes apareceram na auditoria como problemas, mas são estado intencional do projeto. Ficam
registrados para não serem "corrigidos" por engano, e para não sumirem na hora da publicação.

| # | Item | Situação |
|---|---|---|
| 1 | `base: '/procgroup-site'` e `site: 'https://pedrobmr.github.io'` em `astro.config.mjs:6-7` | **Proposital enquanto está em teste.** Trocar para `base: '/'` e `site: 'https://www.procgroup.com.br'` na virada para produção. Procedimento em `PUBLICACAO.md:78-92`. Lembrar que `siteUrl` está duplicado em `BaseLayout.astro:30` e `blog/[slug].astro:36` — os dois precisam mudar juntos. |
| 23 | Workflow publica em GitHub Pages (`.github/workflows/deploy.yml`) | **Proposital enquanto está em teste.** Substituir por deploy para Hostinger/cPanel na virada. Atenção: `contact.php` não executa no GitHub Pages, então o formulário só pode ser testado de verdade depois dessa troca. |
| 6 | Banner "⚠️ PLACEHOLDER" na página de Cases (`[...lang]/cases.astro:51`) | **Aguardando conteúdo.** Sai quando houver detalhe e aprovação de cada case real. Enquanto o banner estiver lá, a página não deve ir ao ar em produção. |

> ⚠️ **Checklist de virada para produção:** os três itens acima precisam ser resolvidos no mesmo
> momento em que o site sair de teste. Nenhum deles é opcional na publicação.

---

## Prioridade 1 — Correção pontual, impacto alto

Itens de baixo esforço e efeito imediato e visível. Bons candidatos para a próxima sessão.

### [x] #2 — Token `--space-5` não existe e zera padding em 13 lugares — FEITO (2026-07-20)

`tokens.css` define a escala `--space-1,2,3,4,6,8,12,16,24,32`. Não há `--space-5`, mas ele é
usado 13 vezes. Um `var()` sem fallback para propriedade inexistente invalida a declaração inteira,
e `padding` cai para o valor inicial: `0`.

**Confirmado em runtime, em `/blog`:**
```
getComputedStyle(':root')['--space-5']  →  ""  (vazio)
.post-body → padding                    →  0px
distância do título até a borda do card →  0px
```

Atinge:
- `PostCard.astro:51` — todo card de blog do site
- `BusinessUnitTemplate.astro:179, 218, 232` — cards de solução e o FAQ
- `PlatformMandala.astro:89` — colunas do diagrama da plataforma
- `cases.astro:132`, `[...lang]/cases.astro:289`
- `blog/index.astro:179`, `blog/[slug].astro:175`
- `evento.astro:457, 465, 469`

**Solução sugerida:** adicionar `--space-5: 1.25rem;` em `tokens.css`. A escala pula de `1rem`
(`--space-4`) para `1.5rem` (`--space-6`), então 1,25rem é o valor coerente.
Alternativa: trocar as 13 ocorrências por `--space-4`/`--space-6` — mais trabalhoso e perde a
intenção original do autor.

**Verificar depois:** conferir visualmente os cards de blog e o FAQ, que hoje estão com texto
colado na borda.

---

### [x] #9 — `.btn-secondary` desaparece em seções claras — FEITO (2026-07-20)

`Button.astro:39-43` usa fundo `--color-surface` (branco no tema claro) e borda
`rgba(11,23,48,.12)`. Dentro de `.about-teaser` (`index.astro:217`), que também é branco:

| Par | Contraste | Mínimo |
|---|---|---|
| botão vs. seção | **1,00:1** | 3:1 |
| borda vs. fundo | **1,28:1** | 3:1 |

O botão vira texto solto. Afeta "Conheça a Proc" e "Ver todos os posts", ambos na home.

**Solução sugerida:** usar `--color-border-strong` no `.btn-secondary`, ou criar um token dedicado
com ≥3:1 (`rgba(11,23,48,.36)` no claro / `rgba(255,255,255,.3)` no escuro). No tema escuro o mesmo
problema existe em grau menor (1,29:1).

---

### [x] #12 — Skip link nunca fica visível — FEITO (2026-07-20)

`BaseLayout.astro:120` tem o link "pular para o conteúdo" com `.visually-hidden`, mas
`base.css:83-89` não define nenhum estado `:focus`. Quem navega por teclado e enxerga dá Tab, o
foco vai para um alvo de 1×1 px e não vê nada. Falha WCAG 2.4.7.

**Solução sugerida:**
```css
.visually-hidden:focus-visible {
  position: fixed; top: var(--space-2); left: var(--space-2);
  width: auto; height: auto; clip: auto;
  padding: var(--space-2) var(--space-4);
  background: var(--color-surface); border-radius: var(--radius-sm);
  z-index: 200;
}
```
Considerar também `tabindex="-1"` no `<main id="main">` para o foco ir de fato para lá.

---

### [x] #10 — Fallback do `motion.ts` não consegue revelar o conteúdo — FEITO (2026-07-20)

`motion.ts:26` esconde tudo com estilo **inline** (`gsap.set("[data-reveal]", { opacity: 0, y: 26 })`).
O fallback do `catch` (`motion.ts:12-14`) tenta revelar adicionando a **classe** `.is-visible`,
que não vence estilo inline. Se algo falhar depois da linha 26, o conteúdo fica invisível e o
socorro não funciona.

O `<noscript>` de `BaseLayout.astro:85` não cobre este caso — ali o JS existe, ele apenas quebrou.

**Solução sugerida:** no `showAll()`, usar `gsap.set(els, { clearProps: "all" })` ou
`el.style.opacity = "1"; el.style.transform = "none"` — mexer no inline, não na classe.

---

## Prioridade 2 — Rotas, i18n e navegação

### [x] #3 — Menu em EN/ES leva a 404 — FEITO (2026-07-20)

`nav.ts:53-55` gera o item "Blog" para os três idiomas, mas o blog é PT-only por decisão de projeto.

**Status HTTP real:**
```
GET /en/blog                              → 404
GET /es/blog                              → 404
GET /en/blog/categoria/novidades          → 404
GET /en/blog/reconhecimento-facial-lgpd/  → 404
GET /en/cases  (controle)                 → 200
```

Alcance: ~198 links quebrados (menu desktop, menu mobile e rodapé das 14 páginas EN + 14 ES), mais
o CTA "All content" do teaser da home (`[...lang]/index.astro:129`).

O mesmo bug atinge o seletor de idioma: em qualquer post do blog, clicar em EN ou ES dá 404.

**Solução sugerida:** decidir entre —
- **(a)** suprimir o item Blog em `nav.ts` quando `lang !== "pt"` (mais simples, coerente com a
  decisão de blog PT-only); ou
- **(b)** gerar `/en/blog` e `/es/blog` com o conteúdo PT e um aviso explícito de idioma.

Recomendação: **(a)**, e reavaliar se/quando o blog for traduzido.

---

### [x] #4 (parte) — `hreflang` aponta para 34 URLs inexistentes — FEITO (2026-07-20)

`BaseLayout.astro:47-51` emite alternates para os três locales em toda página, sem checar se a
rota existe naquele idioma. As 17 páginas de blog geram 34 alternates mortos:
```html
<link rel="alternate" hreflang="en" href="https://www.procgroup.com.br/en/blog/">
<link rel="alternate" hreflang="es" href="https://www.procgroup.com.br/es/blog/">
```
O Google descarta o cluster inteiro de hreflang quando ele aponta para 404.

**Solução sugerida:** filtrar os alternates por rota realmente existente antes de emitir. Resolver
junto com #3 — mesma raiz.

---

### [x] #20 — Visitante EN/ES é despejado no blog PT sem aviso — FEITO (2026-07-20)

`PostCard.astro:21` usa `withBase()` fixo, sem prefixo de idioma. Em `/en/` e `/en/eventos` os
cards mostram título e resumo em português e apontam para `/blog/<slug>` (PT).

Combinado com #3, o visitante em inglês entra num beco: cai em PT sem aviso e, ao tentar voltar
para EN, recebe 404.

**Solução sugerida:** decidir se EN/ES devem ver o teaser do blog PT. Se sim, rotular
explicitamente o idioma do post no card e marcar `lang="pt-BR"` no bloco.

---

### [x] Sem página 404 própria — FEITO (2026-07-20)

`src/pages/404.astro` não existe. Na Hostinger o visitante cai no erro genérico do Apache, fora da
marca. Criar junto com #3, já que os 404 vão existir de qualquer forma durante a transição.

---

## Prioridade 3 — Desempenho

### [x] #4 — `/blog` carrega 15,3 MB de imagens — FEITO (2026-07-20)

As capas não passam pelo `astro:assets` — o `src` remoto do WordPress vai direto para o `<img>`
(`content.config.ts:109-115`, `PostCard.astro:29`). São PNGs originais, sem redimensionar, exibidos
em slots de 480×280.

**Medido (HEAD real nas 14 imagens):**

| Página | Imgs | Peso |
|---|---|---|
| `/blog` | 14 | **15,26 MB** |
| `/blog/categoria/novidades` | 12 | **10,80 MB** |
| posts individuais | 4 | **6–8 MB** cada |
| maior arquivo único | 1 | **2,50 MB** |

Um PNG de 2,5 MB num slot de 480×280 deveria ser um WebP de ~40 KB — fator de ~60×. É o maior
problema de desempenho do projeto, muito acima do JavaScript.

**⚠️ Armadilha de cutover:** essas imagens são hot-link de `procgroup.com.br`, que é exatamente o
domínio onde o novo site vai entrar. No momento em que o estático substituir o WordPress,
**todas as 14 imagens do blog quebram de uma vez.** Isso amarra este item ao cronograma de
publicação — não é só otimização.

**Solução sugerida:** usar `<Image>`/`getImage` do `astro:assets` com `image.remotePatterns`
liberando `procgroup.com.br`, para o build gerar WebP redimensionado e **local**. Os originais já
estão versionados em `src/assets/images/blog/` (11 MB, hoje órfãos — ver #29) e podem ser
reaproveitados. Alternativa complementar: reprocessar as capas no próprio WordPress.

**Verificar depois:** confirmar que nenhum `<img>` no `dist/` aponta mais para `procgroup.com.br`.

---

### [x] #28 — Peso do JavaScript — FEITO (2026-07-20)

| Bundle | Tamanho | Gzip | Onde carrega |
|---|---|---|---|
| three.js (hero) | 510 KB | **129 KB** | 3 de 60 páginas |
| GSAP + ScrollTrigger | 112 KB | 44 KB | 59 de 60 páginas |

129 KB gzip de three.js para um fundo puramente decorativo (`aria-hidden="true"`) é o maior item
de JS do build. `import * as THREE` (`HeroBackground.astro:52`) impede tree-shaking eficaz.

**Solução sugerida**, em ordem de ganho:
1. Carregar sob demanda com `import()` dentro do `IntersectionObserver` que já existe na linha 221 —
   menor mudança, tira o peso do caminho crítico.
2. Trocar por canvas 2D — o efeito são pontos e linhas, não precisa de WebGL.
3. Importar só os símbolos usados em vez de `import * as THREE`.

**Nota:** o laço O(n²) das partículas foi medido em **0,1 ms/frame** (0,005 ms no perfil mobile).
Não é gargalo — não perder tempo otimizando isso.

---

### [x] #15 — Canvas do hero com proporção distorcida — FEITO (2026-07-20)

`HeroBackground.astro:80-85, 225-231` lê `clientHeight` antes do layout estabilizar e só corrige
no evento `resize` da janela — não há `ResizeObserver`.

**Medido após carga limpa:**
```
buffer de desenho  785 × 1058
caixa CSS          785 × 944
proporção          0,742 vs 0,832  →  ~12% de distorção vertical
```

Também: `isSmall = W < 700` é avaliado só na inicialização (`:94`) — quem redimensiona de desktop
para mobile mantém 150 partículas em vez de 68.

**Solução sugerida:** trocar o listener de `resize` por um `ResizeObserver` no `.hero-background`,
e reavaliar `isSmall` (e a contagem de partículas) quando a largura cruzar o limite.

---

### [~] Fontes do Google bloqueiam a renderização — pesos supérfluos removidos (P3); self-hosting pendente de decisão

`BaseLayout.astro:109-114`. Os `preconnect` estão certos e o `display=swap` está presente, mas o
`<link rel="stylesheet">` continua render-blocking e adiciona 2 RTTs até `fonts.gstatic.com` antes
do primeiro texto pintado — impacto direto no LCP. São 8 pesos carregados, provavelmente mais do
que as páginas usam. Há ainda a questão de LGPD: o IP do visitante vai para o Google a cada pageview.

**Solução sugerida:** self-hospedar os `.woff2` em `public/fonts/` com `@font-face` +
`font-display: swap` + `preload` dos 2 pesos críticos. Resolve bloqueio, RTTs e privacidade de uma vez.

---

## Prioridade 4 — Segurança

### [x] #5 — `contact.php` monta cabeçalho de e-mail com dado não sanitizado

O arquivo tem a função certa — `cleanHeaderValue()` (linha 66) remove CR/LF exatamente para evitar
injeção — e ela é aplicada em `$safeName` e `$safeEmail`. Mas **não** no assunto:

```php
71  function cleanText($v, $max) {
72      $v = trim(strip_tags($v));   // strip_tags NÃO remove \r\n internos
74      return mb_substr($v, 0, $max);
    }
98  $event   = cleanText($_POST['event'] ?? '', 120);
129 $subject = "Lead do evento {$event}" ...;
140 mail(RECIPIENT_EMAIL, $subject, $body, implode("\r\n", $headers));
```

O campo `event` é um `<input type="hidden">` (`evento.astro:221`), trivialmente forjável por POST direto.

**Calibração honesta:** o exploit não foi testado — não há PHP na máquina de auditoria. O quanto o
`mail()` do PHP 8.2 barra CRLF no parâmetro *subject* varia por versão e plataforma, então **não
está confirmado que a injeção funciona**. O que é certo é o defeito: existe uma função de
sanitização e ela não foi aplicada num caminho que chega ao `mail()`.

**Este outro é certo, sem depender de versão** — `contact.php:135`:
```php
$headers[] = 'Reply-To: ' . $safeName . ' <' . $safeEmail . '>';

// name = "Fulano <atacante@evil.com>, Ciclano"
// → Reply-To: Fulano <atacante@evil.com>, Ciclano <real@cliente.com>
```
`cleanHeaderValue` tira quebra de linha, mas não `<`, `>` nem vírgula. Quem responder ao lead
responde também para o atacante.

**Solução sugerida:**
1. Embutir a remoção de CR/LF dentro do próprio `cleanText()` — resolve o assunto e qualquer uso
   futuro em cabeçalho.
2. Citar o nome no Reply-To: `'"' . str_replace('"','',$safeName) . '" <' . $safeEmail . '>'`.
3. Testar de verdade na Hostinger depois da virada de deploy (#23), com um POST via `curl`
   contendo `\r\n` no campo `event`.

---

### [x] Sem limite de envio no formulário — FEITO (2026-07-20)

`contact.php` não tem throttle por IP, sessão, token CSRF nem verificação de `Origin`. O único
freio é o honeypot (linha 83), que um POST direto ignora. Um laço simples esgota a cota de e-mail
do plano compartilhado.

**Solução sugerida:** contador por IP em arquivo ou APCu com janela de tempo, mais um campo de
timestamp assinado no formulário (rejeitar envios com menos de ~3 s).

---

### [x] Open redirect via `HTTP_REFERER` — FEITO (2026-07-20)

`contact.php:54-60` valida o *host* do referer mas usa o *path* extraído sem checagem. Um path
começando com `//` é tratado pelo navegador como URL protocol-relative:
```
Referer: https://www.procgroup.com.br//evil.com/x
  → host = "www.procgroup.com.br"        (passa na validação)
  → path = "//evil.com/x"
  → header('Location: //evil.com/x?enviado=1')  → vai para https://evil.com/x
```
Exploração exige controlar o header `Referer`, o que não acontece em POST de formulário de
navegador — daí a severidade menor.

**Solução sugerida:** rejeitar `$redirectBase` que não case com `#^/[^/]#`.

---

### [x] #26 — HTML do WordPress entra sem sanitização — FEITO (2026-07-20)

`content.config.ts:107,140` guarda `post.content.rendered` cru e `blog/[slug].astro:104` renderiza
com `<Content />`. Vale o mesmo para as páginas (`:185`), usadas na Política de Privacidade.

Qualquer `<script>` no WordPress — autor com `unfiltered_html`, plugin comprometido, invasão — é
assado no HTML estático e executa na mesma origem do site institucional.

**Verificado:** hoje **não há** nenhuma tag de risco nos 16 posts publicados. Os `<script>` que
aparecem na varredura são JSON-LD legítimo do próprio Astro. O risco é de superfície futura, não
de exploração atual.

**Solução sugerida:** sanitizar no loader com allow-list de tags e atributos, antes do `store.set()`.

---

### [x] Sem `.htaccess` — nenhum cabeçalho de segurança — FEITO (2026-07-20)

Não existe `.htaccess` no projeto. Em hospedagem Apache/cPanel o site vai ao ar sem
`Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`,
`Strict-Transport-Security`, `X-Frame-Options`, sem redirect HTTP→HTTPS, sem `Cache-Control` longo
para `/_astro/*` (que é imutável, tem hash no nome) e sem regra de erro 404.

**Solução sugerida:** criar `public/.htaccess` (o Astro copia `public/` para a raiz do build).
Definir junto o redirect canônico apex→www ou www→apex — hoje `hreflang` usa `www.procgroup.com.br`
enquanto as imagens do blog e a API do WP usam `procgroup.com.br` sem www.

---

## Prioridade 5 — Acessibilidade e visual

### [x] #7 — Em `/evento`, quatro etiquetas são navy sobre navy — FEITO (2026-07-20)

`evento.astro` pinta `.ev-sol-tag` com a cor da unidade de negócio (`--u`). Duas das quatro
unidades são navy (`businessUnits.ts:25,27`) — sobre o card escuro, o texto some.

| Etiqueta | Cor do texto | Contraste | Exigido |
|---|---|---|---|
| Corporate | `#0b1730` | **1,03:1** | 4,5:1 |
| Industry | `#1c2d52` | **1,28:1** | 4,5:1 |
| IT Infra | `#b8081a` | **2,55:1** | 4,5:1 |
| Smart Cities | `#e2081d` | **3,54:1** | 4,5:1 |

1,03:1 é texto literalmente invisível. `/evento` é a landing dos chaveiros NFC distribuídos em
feira — é a primeira coisa que um lead vê.

A mesma cor navy quebra o hover de dois dos quatro cards de unidade (`index.astro:254`,
`BusinessUnitTemplate.astro:251`, `plataforma-proc-ai.astro:168`): `border-color` a 1,03:1 e
1,28:1 — o hover simplesmente não aparece.

**Solução sugerida:** `color-mix(in srgb, var(--u), white 24%)`. O código **já usa exatamente essa
técnica** no `::before` desses mesmos cards (`index.astro:251-252`) — só não foi aplicada na borda
nem na etiqueta.

---

### [x] #8 — Colunas do diagrama da plataforma somem no fundo — FEITO (2026-07-20)

`PlatformMandala.astro:85` dá `--color-bg-alt` ao `.pm-col`; `plataforma-proc-ai.astro:143` dá
`--color-bg-alt` à seção que o contém. Contraste card/fundo: **1,00:1**. A única separação é a
borda, a 1,28:1 — abaixo do mínimo de 3:1 para elemento de interface. Mesmo caso em
`[...lang]/plataforma-proc-ai.astro:133`.

**Solução sugerida:** `.pm-col { background: var(--color-surface); }` (branco no tema claro), ou
trocar o fundo da seção para `var(--color-bg)`.

---

### [x] #11 — Menu mobile fechado continua capturando o Tab — FEITO (2026-07-20)

`Header.astro:152-169`: abaixo de 1200px o `.mobile-nav` é `display:block` com
`max-height:0; overflow:hidden`. Isso recorta visualmente mas **não** tira os ~12 links da ordem
de tabulação. Quem navega por teclado atravessa uma dúzia de links invisíveis depois do logo.

A inconsistência está no mesmo arquivo: o dropdown do desktop (`Header.astro:126`) usa
`visibility:hidden`, que é o correto.

**Solução sugerida:** `visibility: hidden` no estado fechado + `visible` em `.is-open`, ou alternar
o atributo `inert` pelo script da linha 175. Aproveitar para adicionar `aria-controls` no botão,
`id` no container, trocar o `<div>` por `<nav aria-label>` e tratar `Escape`.

---

### [x] #13 — Rótulos do diagrama de fluxo com 3 a 7 px no celular — FEITO (2026-07-20)

`AnimatedFlow.astro:57-64` usa `viewBox="0 0 1000 440"` com `width:100%`. Dentro de um SVG, `px`
escala junto com o container. Num viewport de 375 px a escala é 0,343:

```
.hub-sub     font-size: 10px  →  3,4px na tela
.node-label  font-size: 20px  →  6,9px na tela
.hub-label   font-size: 27px  →  9,3px na tela
```

**Solução sugerida:** avaliar entre — trocar os rótulos por `<foreignObject>`/HTML posicionado;
escalar a fonte por breakpoint em relação ao viewBox; ou empilhar o diagrama verticalmente em
mobile com viewBox mais estreito.

---

### [x] #14 — Alvos de toque abaixo de 44 px e links sem nome acessível no celular — FEITO (2026-07-20)

| Arquivo:linha | Elemento | Tamanho |
|---|---|---|
| `Header.astro:144` | `.menu-toggle` | 40×40 px — é o controle principal de navegação no celular |
| `TopBar.astro:134` | troca de idioma | ~19 px de altura |
| `TopBar.astro:159` | ícones sociais | 32×32 px |
| `TopBar.astro:117` | `.utility-links a` | 40 px |

Somado a isso: abaixo de 780 px o `.utility-label` e o `.lang-code` viram `display:none`
(`TopBar.astro:173,175`) e os SVGs não têm rótulo — os links de Suporte, Trabalhe Conosco e idioma
ficam **sem nome acessível nenhum** no celular.

**Solução sugerida:** `min-height/min-width: 44px` nesses seletores dentro do `@media (max-width: 1200px)`;
e trocar `display:none` por `.visually-hidden` nos rótulos (mantém o texto na árvore de
acessibilidade), ou adicionar `aria-label` nos itens de `utilityLinks` e no seletor de idioma.

---

### [~] #16 — Nove breakpoints e `vh` no celular — vh FEITO (2026-07-20); consolidação pendente

Breakpoints em uso: `480, 520, 560, 640, 780, 840, 900, 980, 1200`. Consequência concreta: entre
900 e 980 px a escala tipográfica já encolheu (`tokens.css:103`) mas os grids de 3–4 colunas ainda
não colapsaram; e o `PlatformMandala` quebra em 900/520 enquanto o resto da mesma página quebra em
980/640 — as seções desmontam em momentos diferentes na mesma rolagem.

`min-height: 92vh` no hero (`index.astro:175`) e `max-height: 80vh` no menu (`Header.astro:160`)
usam `vh`, que no celular ignora a barra de endereço. Com 108 px de cromagem fixa, as estatísticas
do hero ficam sempre cortadas.

**Solução sugerida:** definir 3–4 breakpoints canônicos (ex.: 640 / 900 / 1200) e alinhar todos os
componentes; trocar `vh` por `svh`/`dvh` com fallback.

---

### [x] #27 — `StatCounter` zera os números no JavaScript — FEITO (2026-07-20)

`StatCounter.astro:31` sobrescreve o valor renderizado no servidor com `"0"` para depois animar.
Se o `IntersectionObserver` (`threshold: 0.4`) não disparar, os números ficam em zero. É também o
único componente animado do site que não checa `prefers-reduced-motion` — os outros quatro checam.

**Solução sugerida:** envolver a linha 31 em
`if (!matchMedia("(prefers-reduced-motion: reduce)").matches)` e, no ramo reduzido, não mexer no
`textContent`.

---

### [x] Acessibilidade — lote de ajustes menores — FEITO (2026-07-20)

Agrupados por serem rápidos e da mesma natureza:

- **SVGs decorativos sem `aria-hidden="true"`** — 13 na home, nenhum com `aria-hidden` ou `role`
  (`TopBar.astro:12-19,77`, `Header.astro:28`, `flags.ts`).
- **`alt` das imagens do blog duplica o `<h2>`** dentro do mesmo link (`content.config.ts:112` +
  `PostCard.astro:21-40`) — o nome acessível do link sai com o título duas vezes. Usar `alt=""`
  nos cards; manter o `alt` real no hero do post.
- **Formulário de contato sem `autocomplete`** (`contato.astro:28-61`) — falha WCAG 1.3.5. A página
  `/evento` já faz certo (`evento.astro:223,226,229`). Falta também indicação visual de campo
  obrigatório.
- **Região de status escreve o texto antes de remover `hidden`** (`contato.astro:104-118`) — live
  regions só anunciam mutação em nós já visíveis. Inverter a ordem.
- **Dropdown do menu sem `aria-haspopup`/`aria-expanded`** e sem fechamento por `Escape`
  (`Header.astro:25-39`).
- **`aria-current="true"` em vez de `"page"`** no seletor de idioma (`TopBar.astro:74`).
- **Hierarquia de headings** com saltos em `/politica-de-privacidade` (h2→h4), `/trabalhe-conosco`
  (h1→h3) e `/evento` (h1→h3, ordem invertida).
- **`prefers-reduced-motion` não cobre as elevações de hover** — `base.css:108-111` cobre só
  `[data-reveal]` e `scroll-behavior`.
- **`list-style:none` global** (`base.css:40`) faz o VoiceOver/Safari parar de anunciar "lista com
  N itens". Adicionar `role="list"` nas listas semanticamente relevantes.
- **Landmarks em `/evento`**: `<header>` e `<footer>` estão dentro de `<main>`, então não mapeiam
  para `banner`/`contentinfo`. A página também não tem skip-link.

---

## Prioridade 6 — Arquitetura e dívida técnica

### [x] #22 — Catorze páginas duplicadas; a versão PT é a antiga — FEITO (2026-07-20)

Existem `src/pages/X.astro` e `src/pages/[...lang]/X.astro` para as mesmas 14 rotas. O Astro
prioriza a rota estática, então **a raiz vence para PT** e o build emite 10 avisos:
```
[WARN] Could not render `/` from route `/[...lang]`
       as it conflicts with higher priority route `/`
       … e mais 9
```

O **texto** em português é o mesmo nos dois lados (verificado string por string). A divergência
real é de comportamento e arquitetura:

- **A home em português perde as animações.** `data-hero-intro` e `data-magnetic` existem só na
  versão `[...lang]`. Resultado: `dist/en/index.html` e `dist/es/index.html` têm 3 botões
  magnéticos e a entrada escalonada do hero; `dist/index.html` tem **zero**. A página mais vista
  do site é a única sem a animação de entrada.
- **Todo o ramo PT dos arquivos de tradução é código morto.** Editar o português em `pages.ts` ou
  `translations.ts` não muda nada no site — o texto PT real está fixo nos 14 arquivos da raiz.
  Isto é uma armadilha para quem for mexer no conteúdo depois.
- **~430 linhas de CSS duplicadas byte a byte** entre os pares. Em `contato` já divergiram
  (45 vs 40 linhas) — o drift começou.
- **Bug latente** em `empresa.astro:77`: `homeStats.slice(0, 4)` enquanto `[...lang]/empresa.astro:61`
  usa `homeStats.map(...)`. Hoje `stats.ts` tem 3 itens e não faz diferença; ao adicionar um quinto,
  PT mostra 4 e EN/ES mostram 5.

**Solução sugerida:** apagar os 14 arquivos da raiz. **Antes**, preservar duas coisas que só
existem lá:
1. `contato.astro:115` usa `result.message` devolvido pelo PHP — é mais informativo que a versão
   i18n, que usa mensagem local fixa.
2. O rótulo "WhatsApp comercial:" (`contato.astro:68`), que na versão i18n é só "WhatsApp:".

**Verificar depois:** o build deve parar de emitir os 10 avisos de conflito, e `dist/index.html`
deve passar a conter `data-hero-intro` e `data-magnetic`.

---

### [~] Promover CSS repetido para `base.css` — avaliado; bloqueado por conflito no `.section` (ver acima)

Além das ~430 linhas duplicadas do item acima, os mesmos padrões estão reescritos em vários
arquivos e deveriam viver em `base.css`:

- `.section { padding-block: … }` — 12 arquivos
- `.lead`, `.section-header`, `.hero-page` — 8+ arquivos
- `.final-cta` / `.final-cta-inner` — idênticos em `BusinessUnitTemplate.astro:256-263`,
  `index.astro:284-291`, `plataforma-proc-ai.astro:185-192`
- `.unit-card` + `::before` + `.unit-badge` — `BusinessUnitTemplate.astro:235-254` ≈ `index.astro:234-258`
- `.post-card` — `PostCard.astro:43-59` ≈ `blog/index.astro:170-187` ≈ `blog/[slug].astro:166-178`
- `.stat-value` / `.stat-label` — `StatCounter.astro:13-23` reescrito em `index.astro:203-204`

---

### [x] Grids sem `minmax(0, 1fr)` — FEITO (2026-07-20)

Há **uma única** ocorrência de `minmax` em todo o `src/` (`AnimatedFlow.astro:106`, adicionada
justamente para corrigir um estouro). As demais usam `1fr` = `minmax(auto, 1fr)`, cujo piso é o
`min-content` — palavra longa não encolhe.

**Testado:** não há overflow horizontal hoje em nenhuma das 12 páginas principais a 375 px. O risco
é **latente**, não manifesto — mas conteúdo em ES/PT tem tokens longos ("Videomonitoramento",
"Reconocimiento", "Infraestructura") e a margem é pequena.

Afetados: `AnimatedFlow.astro:112`, `BusinessUnitTemplate.astro:176,234`, `PlatformMandala.astro:83`,
`Footer.astro:70`, `index.astro:202,233,263,278`, `plataforma-proc-ai.astro:156,173`.

**Solução sugerida:** `repeat(N, minmax(0, 1fr))` e `min-width: 0` nos filhos flex.

---

### [x] #25 — `og:image` é SVG; nenhuma rede social renderiza — FEITO (2026-07-20)

`BaseLayout.astro:24` define `ogImage = "/og-default.svg"` e o arquivo é mesmo SVG (669 bytes).
Facebook, LinkedIn e WhatsApp não suportam SVG em `og:image` — o card de compartilhamento sai sem
imagem. Atinge as 47 páginas institucionais (os posts sobrescrevem com a imagem do WP).

**Solução sugerida:** PNG ou JPG de 1200×630, mais `og:image:width`, `og:image:height` e
`og:image:type`.

---

### [x] #24 — Sem sitemap nem `robots.txt` — FEITO (2026-07-20)

```
dist/sitemap.xml   → não existe
dist/robots.txt    → não existe
@astrojs/sitemap   → não instalado (confirmado em package.json)
```
Com 43 páginas trilíngues e o hreflang parcialmente quebrado (#3/#4), a indexação depende só de
crawl por links.

**Solução sugerida:** instalar `@astrojs/sitemap` e criar `public/robots.txt` apontando para ele.
Fazer isto **depois** da virada de `base`/`site` (#1), senão o sitemap sai com as URLs erradas.

---

### [x] #21 — `/evento` envia o IP do visitante para serviço externo — FEITO (2026-07-20)

`evento.astro:286` chama `https://api.country.is/` para detectar o país e escolher o idioma. Só
dispara quando o idioma do navegador não é PT/EN/ES (`:378-386`) e tem timeout de 2,5 s — o impacto
é limitado. Ainda assim: é IP de visitante indo para terceiro sem consentimento, numa página de
captação de leads, num site que publica política de LGPD.

**Solução sugerida:** avaliar remover a chamada. O idioma do navegador já resolve o caso real quase
sempre, e o fallback natural (PT) é adequado para uma feira no Brasil.

---

## Revisão da `/evento` (landing dos chaveiros NFC/RFID) — 2026-07-20

Levantamento pedido no fim do dia. **Nada abaixo foi implementado** — está tudo pendente.

### O que já está bom (não regredir)

- Trilíngue com troca instantânea, sem novo request; renderiza PT no servidor, funciona sem JS.
- `noindex,nofollow` correto — a página não deve aparecer em busca.
- Formulário com labels associados, `autocomplete` correto (`name`, `tel`, `address-level2`) e honeypot.
- **Correções da P5 confirmadas em runtime:** etiquetas das unidades a **17,34:1** (eram 1,03 — texto
  invisível) e barras laterais dos cards a **3,22–5,38:1** (eram 1,03 e 1,28).
- Sem overflow horizontal a 375px; CTA fixo do WhatsApp não cobre o rodapé; página leve
  (2 imagens, 5 SVGs).
- Não chama mais serviço externo de geolocalização por IP (removido na P6).

### [ ] `<title>` e `meta description` não acompanham o idioma

Ficam sempre em português, mesmo quando o script troca para `<html lang="en">`. Quem abre em inglês
vê a aba em português. O script mexe no corpo mas não toca no `<head>` — verificado: 0 ocorrências
de `document.title` no HTML publicado.

**Solução sugerida:** incluir `title` e `description` por idioma no JSON já embutido (`#ev-i18n`) e
atualizá-los junto com o resto em `applyLang`.

### [ ] Nenhuma tag `og:` ou `twitter:` — zero

Confirmado no build: a página não tem `og:image`, `og:title` nem equivalentes do Twitter.

**Por que importa mais aqui que no resto do site:** é, por natureza, **a página mais compartilhada**.
A pessoa encosta o celular no chaveiro na feira e manda o link para colegas no WhatsApp — e hoje ele
sai como texto cru, sem card. Para uma página cuja única função é captar lead em evento, é a lacuna
de maior custo da lista.

**Solução sugerida:** reaproveitar `scripts/gerar-og.mjs` para uma imagem social própria da página, e
emitir `og:`/`twitter:` no `<head>` do `evento.astro` — que não usa o `BaseLayout`, então precisa das
tags explicitamente.

### [ ] Salto de heading `h1 → h3`

Os quatro cards de unidade usam `h3` sem um `h2` de seção antes. Outline medido: `h1` → `h3` ×4 → `h2`.

### [ ] `header` e `footer` estão dentro do `main`

Assim não mapeiam para os landmarks `banner` e `contentinfo`. A página também não tem skip link.

### [ ] Configuração está genérica — decisão de conteúdo

`events.ts` tem `cidade: ""` e eyebrow "Proc no evento". Enquanto a cidade estiver vazia, o campo
oculto `event` do formulário vai como **"Evento"**, então o lead que chega no e-mail **não diz de qual
feira veio**.

O arquivo foi feito para ser editado a cada evento: preencher `cidade` faz o título citar a cidade,
pré-preenche o campo de cidade do formulário e identifica a origem no assunto do e-mail.

### [ ] `/evento` usa uma terceira arquitetura de i18n

`evento.astro` não usa `BaseLayout` — tem `<html lang="pt-BR">` próprio (linha 134), sem canonical,
sem hreflang, sem TopBar/Header/Footer. A troca de idioma é 100% client-side via JSON embutido.

É decisão defensável para uma landing de chaveiro NFC, mas convive com as outras duas arquiteturas
i18n do projeto. Registrar como dívida consciente ou unificar quando a página for revisitada.

---

### [x] Blog quebra em silêncio se o WordPress mudar de domínio — FEITO (2026-07-20)

`content.config.ts:16`: `WP_BASE` cai em `https://procgroup.com.br` por padrão. Se o site estático
assumir esse domínio e o WP for para `cms.procgroup.com.br` sem definir `WP_API_URL`, o loader
busca `/wp-json` no próprio site estático → 404 → cai no ramo `all.length === 0` → mantém o cache
e loga só um `warn`. **O build passa verde com o blog congelado.**

O fail-soft é a decisão certa para indisponibilidade momentânea, mas mascara erro de configuração
permanente. Amarrado ao cutover (#1) e ao item #4.

**Solução sugerida:** definir `WP_API_URL` explicitamente no ambiente de build antes da virada, e
fazer o loader falhar alto (não silencioso) quando o endpoint responder 404 em vez de erro de rede.

---

## Prioridade 7 — Conteúdo (WordPress, fora do código)

### Mitigações de código feitas em 2026-07-20

Nenhum destes itens se resolve no repositório — o conteúdo mora no WordPress. O que dava para fazer
foi blindar o site contra o defeito, para que um erro de conteúdo não vire um defeito de página:

| # | Mitigação | Verificado |
|---|---|---|
| 17 | **Rebaixamento condicional de headings** em `utils/sanitizeWp.ts`: se o corpo vindo do WP contém `<h1>`, todos os níveis descem um degrau. | O post problemático saiu de **8 `<h1>` para 1**; agora h1=1, h2=8, h3=16, h4=11. As **15 páginas de blog têm exatamente um `<h1>`**. |
| 18 | **Nomes de login não são publicados** (`content.config.ts`): `root`, `root_`, `admin`, `administrator`, `wordpress`, `user` viram "Proc Group". | **"Root_" não aparece em lugar nenhum do build.** Os 7 posts agora assinam "Proc Group"; os 8 do Lucas seguem iguais. |
| 19 | O `<h1>` passou a usar o título **traduzido** (usava o do WP, sempre PT); o bloco de conteúdo recebeu `lang="pt-BR"` em EN/ES; e um aviso explica que o documento existe só em português. | `/en/politica-de-privacidade`: `<html lang="en">`, `<h1>Privacy Policy</h1>`, conteúdo marcado `pt-BR`, aviso presente. |

**O rebaixamento é condicional de propósito.** Os posts corretos já começam em `h2`; descê-los criaria
um salto `h1→h3` e trocaria um defeito por outro. Só entra quando existe `h1` no corpo.

**O filtro de autor é rede de segurança, não correção.** Ele evita expor o login de uma conta
administrativa e cobre contas futuras no mesmo estado — mas o nome real do autor continua perdido.

### ⚠️ O que só você resolve, no WordPress

1. **Corrigir o corpo do post "Cloud gerenciada vs. servidor local".** O texto publicado é o artigo de
   SRE — confirmado na API em 2026-07-20 (`modified: 2025-12-15`). O site agora renderiza a hierarquia
   certa, mas continua publicando o artigo errado sob esse título, competindo com o
   `sre-observabilidade-varejo`, que é legítimo.
2. **Preencher o nome de exibição das contas.** "Root_" some do site pela mitigação, mas os 7 posts
   passam a assinar "Proc Group" em vez do autor real.
3. **Traduzir a Política de Privacidade** para EN e ES, ou decidir despublicar essas versões. Hoje o
   aviso é honesto, mas o documento continua só em português.

### [~] #17 — Post com título de um assunto e corpo de outro — headings blindados no código; CONTEÚDO pendente no WordPress

O post *"Cloud gerenciada vs. servidor local: o comparativo definitivo…"* abre prometendo comparar
cloud e servidor local. O corpo inteiro é o artigo de **SRE e observabilidade no varejo**:

```
h1  Cloud gerenciada vs. servidor local…          ← título da página
h1  O que é SRE — e por que ele importa para o varejo?
h1  O papel da telemetria: prever antes de remediar
h1  Por que o varejo precisa de SRE e observabilidade?
h1  As principais dores que o SRE resolve no varejo
h1  Como supermercados estão aplicando SRE na prática
h1  O varejo não pode mais operar no escuro
                                    → 8 <h1> na mesma página
```

E compete diretamente com o post legítimo `sre-observabilidade-varejo`, que já existe — conteúdo
quase duplicado, os dois indexáveis.

**Solução:** corrigir o corpo no WordPress. Em paralelo, avaliar normalizar os headings do HTML do
WP no loader (`h1→h2`, `h2→h3`) para que erro de origem não quebre o outline do site.

---

### [~] #18 — Sete posts assinados por "Root_" — não aparece mais no site; nome real pendente no WordPress

O nome de autor vem do WordPress (`content.config.ts:108`) e aparece publicamente em cada post.
```
Lucas   →  8 posts   (só o primeiro nome)
Root_   →  7 posts   ← conta administrativa não configurada
```
**Solução:** preencher o nome de exibição das duas contas no WordPress.

---

### [~] #19 — Política de Privacidade em EN/ES — idioma sinalizado e h1 traduzido; TRADUÇÃO pendente

`dist/en/politica-de-privacidade/index.html` traz `<title>Privacy Policy</title>` e
`<html lang="en">`, mas o `<h1>` e o corpo inteiro são o texto jurídico em português — vem de uma
entrada única do WordPress, sem variante por idioma (`[...lang]/politica-de-privacidade.astro:15`).

Além do problema editorial, o leitor de tela lê português com fonética inglesa.

**Solução sugerida:** traduzir, ou despublicar as versões EN/ES. Paliativo imediato: marcar
`lang="pt-BR"` no bloco de conteúdo quando `lang !== 'pt'` (WCAG 3.1.2).

---

### [x] Quatro pares de `<title>` idênticos entre idiomas — NÃO É DEFEITO (verificado 2026-07-20)

Conferido: **cada idioma tem valor próprio e explícito** em `translations.ts` / `pages.ts`. Os títulos
coincidem porque português e espanhol compartilham as palavras — `Empresa`, `Plataforma Proc AI`,
`Agenda de Eventos` estão corretos nos dois idiomas —, e `Cases` é anglicismo consagrado em PT-BR
(o ES usa `Casos`, que é diferente). Não há tradução faltando.

Com o `hreflang` agora correto (P2), o buscador entende que são variantes de idioma da mesma página.
Forçar diferenças artificiais só pioraria a redação. **Item encerrado sem alteração** — o achado
original superestimou o problema.

`Cases`/EN, `Empresa`/ES, `Agenda de Eventos`/ES, `Plataforma Proc AI`/ES. As `meta description`
estão todas traduzidas e sem duplicatas — o problema é só o `<title>`. Prejudica CTR nos resultados
de busca locais.

---

### [x] `aria-label` de landmarks fixos em português nas páginas EN/ES — FEITO (2026-07-20, na P5)

`Header.astro:22` ("Navegação principal"), `Footer.astro:20` ("Navegação do rodapé"),
`TopBar.astro:83` ("Redes sociais"), `Breadcrumb.astro:21`. Em `dist/en/index.html` convivem
`aria-label="Open menu"` e `aria-label="Navegação principal"`.

**Solução sugerida:** mover para `translations.ts` — já existe `t.common.langMenuLabel` como
precedente correto.

---

## Prioridade 8 — Limpeza

### Feita em 2026-07-20

| Item | O que mudou |
|---|---|
| Tokens mortos | `--color-navy` e `--fs-5xl` removidos (0 usos). **`--color-danger` não foi removido — foi corrigido**: era `--red-600`, escuro demais para texto sobre fundo escuro (2,6:1), por isso o formulário usava `--red-400` na mão e ignorava o token. Agora o token é a cor certa por tema e o formulário o usa, junto com o novo `--color-danger-border`. |
| Tokens que faltavam | `--radius-pill` (13 ocorrências de `999px` trocadas), `--topbar-h` / `--header-h` / `--header-h-mobile`, e escala `--z-sticky` / `--z-topbar` / `--z-overlay`. |
| Números mágicos | `Header` usava `top: 40px` só porque a `TopBar` tem 40px de altura, e `base.css` tinha `scroll-padding-top: 120px` — errado nos dois modos (o real é 116px no desktop e 108px no mobile). Agora tudo deriva dos tokens com `calc()`. |
| Seletores mortos | `.pm-ring` e `.pm-wave` removidos de `PlatformMandala.astro` (sem elemento correspondente). |
| `Logo.astro` | A máscara CSS usava `url("/brand/logo-white.png")` sem `withBase()` — daria 404 sob `/procgroup-site`. A URL agora vem por custom property, montada com `withBase()`. Isso também eliminou o aviso de build sobre esse arquivo. |
| Assets órfãos | `src/assets/images/blog/` (**9,2 MB**, 8 arquivos) e `public/brand/logo-on-navy.webp` (59 KB) removidos — zero referências no código. |
| `contact.php` | `mb_substr` ganhou guarda: se `mbstring` faltar, cai em `substr` em vez de derrubar o formulário com um fatal. |
| `README.md` | Era o template padrão do Astro ("Astro Starter Kit: Minimal"). Reescrito com o que o projeto realmente é, como rodar, a estrutura e os pontos que costumam surpreender. |

`public/brand/` saiu de 5 arquivos (192 KB) para **2 (11 KB)**.

Verificado depois: tokens resolvem em runtime (`--radius-pill: 999px`, header `top: 40px`,
`z-index: 100`, `scroll-padding-top: 116px`), **0 reprovações de contraste e 0 overflow horizontal**
em 10 páginas a 375px.

### ⚠️ Incidente durante esta prioridade — corrompi 9 arquivos e restaurei

Ao aplicar a troca de `999px` por script PowerShell, um array aninhado de um elemento só foi
achatado pela linguagem: em vez de `Replace("border-radius: 999px", "…")`, executou
`Replace('b', 'o')` — **trocou todo caractere "b" por "o"** em 9 arquivos (`background` virou
`oackground`, `.btn` virou `.otn`, e assim por diante).

Recuperado integralmente. Como:

1. O `dist/` do build anterior foi preservado como **referência**, antes de qualquer tentativa de conserto.
2. Os 9 arquivos foram restaurados do estado pré-sessão (4 rastreados no git; os de `[...lang]/` são
   **não rastreados**, e vieram da cópia do OneDrive).
3. Cada edição da sessão foi reaplicada por script, com uma verificação forte: como a corrupção era
   `b→o`, `reconstruído.replace('b','o')` **tem que** dar exatamente o arquivo corrompido. Os 9 conferiram.
4. Prova final: rebuild e comparação com a referência — **61 de 61 HTML idênticos** depois de
   normalizar o hash do CSS (que mudou porque os tokens novos são intencionais). Zero diferença real.

**Lição, para não repetir:** nunca usar `String.Replace` do PowerShell com pares vindos de array
para editar código-fonte. PowerShell achata array de um elemento e o `Replace` cai na sobrecarga de
`char`, que é silenciosa e destrutiva. Edições mecânicas em lote devem ser feitas por script Node
com contagem esperada de ocorrências, ou pelas ferramentas de edição, uma por vez.

### [x] Suporte Técnico da TopBar abre WhatsApp — FEITO (2026-07-20)

Pedido do usuário no fim do dia. O item "Suporte Técnico" da barra superior levava para a página
`/suporte`; agora abre o WhatsApp direto, **num número próprio, diferente do comercial**:
`+55 46 99123-0911`.

- Número centralizado em `data/contact.ts` como `WHATSAPP_SUPORTE` — não ficou solto no componente.
  O helper `whatsapp()` ganhou um segundo parâmetro opcional para o número, mantendo os chamadores
  existentes intactos.
- Mensagem já preenchida, traduzida (`topbar.suporteMsg`): PT "Olá! Preciso de suporte técnico." ·
  EN "Hi! I need technical support." · ES "¡Hola! Necesito soporte técnico."
- Abre em nova aba com `rel="noopener noreferrer"`, igual ao WhatsApp de vendas.

Verificado no build: o link sai correto nos três idiomas.

### ⚠️ [ ] Decorrência: a página `/suporte` ficou órfã e mostra o número errado

**A TopBar era o único link para `/suporte`.** Agora são **zero links**, mas as três versões
(`/suporte`, `/en/suporte`, `/es/suporte`) continuam sendo geradas **e estão no sitemap** — o
buscador vai indexar uma página que ninguém alcança navegando.

Pior: o conteúdo dela lista o WhatsApp **+55 46 99141-1324**, que é o **comercial**. Quem chegar
pela busca procurando suporte recebe o número de vendas.

Três saídas, pendentes de decisão:
1. **Apagar a página** e tirá-la do sitemap, se o WhatsApp a substitui de vez.
2. **Manter e corrigir**: trocar o número exibido para o de suporte e voltar a linká-la de algum
   lugar (rodapé, por exemplo), deixando o WhatsApp como atalho rápido na barra.
3. **Manter só para busca**: corrigir o número e aceitar que só se chega por link direto.

Enquanto não se decide, o site publica uma página invisível com o telefone errado.

### [x] Links de redes sociais — FEITO (2026-07-20)

Apontavam para a home de cada rede enquanto o `aria-label` prometia o perfil da Proc. URLs reais
aplicadas em `TopBar.astro`, sem parâmetro de rastreamento:

| Rede | URL |
|---|---|
| Facebook | `https://www.facebook.com/procgroupbrasil/` |
| Instagram | `https://www.instagram.com/procgroup/` |
| LinkedIn | `https://www.linkedin.com/company/procgroupti` |

Limpezas feitas nas URLs recebidas: removido o `?trk=ppro_cprof` do LinkedIn e o `?locale=pt_BR`
do Facebook — os dois vêm de copiar o endereço logado, e o locale fixo é especialmente indesejado
num site trilíngue. Trocado `br.linkedin.com` por `www.linkedin.com`: o subdomínio regional
devolveu HTTP 999 (anti-bot) enquanto o `www` devolveu 200.

Verificado: as três URLs respondem 200, e não sobrou nenhum link para home de rede social no build.

**⚠️ O YouTube foi REMOVIDO da barra**, por não haver URL do canal — um link rotulado "YouTube"
que leva à home do youtube.com engana mais do que ajuda. O ícone continua no código; para
reativar, é só acrescentar a entrada em `socialLinks` com a URL real.

### [~] #29 — Restos e pontas soltas — FEITO (2026-07-20), menos os links de redes sociais

- **Tokens definidos e nunca usados:** `--color-danger`, `--color-navy`, `--fs-5xl`
- **Seletores sem elemento correspondente:** `.pm-ring`, `.pm-wave` (`PlatformMandala.astro:73-74`)
- **`Logo.astro:38`** monta a URL da máscara CSS sem `withBase()` — hoje é código morto (só
  `variant="white"` é usado), mas quebraria se a variante navy fosse ativada
- **11 MB de imagens órfãs** versionadas em `src/assets/images/blog/`, nunca referenciadas — são as
  originais das capas hoje hot-linkadas. Reaproveitar ao resolver #4, ou remover
- **`public/brand/logo-on-navy.webp`** (60 KB) órfão; `public/favicon.svg` não é referenciado pelo
  `BaseLayout` (que usa `mark-red.webp`)
- **Links de redes sociais** apontam para as home genéricas de Facebook, Instagram, LinkedIn e
  YouTube — não para os perfis da Proc (`TopBar.astro:42-46`). Os `aria-label` prometem o perfil e
  entregam a home da rede
- **`contact.php:138`** expõe a versão exata do PHP no cabeçalho do e-mail
- **`contact.php:74`** usa `mb_substr` sem checar `extension_loaded('mbstring')`
- **Valores hardcoded** que deveriam ser tokens: 8 alfas diferentes de `rgba(255,255,255,x)` sem
  token; `border-radius: 999px` em 4 lugares (falta `--radius-pill`); navy escrito à mão em
  `Header.astro:76` e `HeroBackground.astro:46`; `#9db4d8` e `#e2081d` em `HeroBackground.astro:100-101`
- **Números mágicos acoplando `Header` ↔ `TopBar`:** `Header.astro:74` usa `top: 40px` só porque
  `TopBar.astro:110` tem `height: 40px`; `base.css:2` usa `scroll-padding-top: 120px` enquanto a
  cromagem real é 116px no desktop e 108px em mobile. Derivar com `calc()` a partir de
  `--topbar-h` / `--header-h`
- **`z-index` sem escala:** 100, 101, 50, 2 — a ordem está correta, mas são números mágicos
- **`README.md`** ainda é o template padrão do Astro ("Astro Starter Kit: Minimal")

---

## Não fazer — suspeitas investigadas e descartadas

Registrado para não gastar tempo:

| Suspeita | Veredito |
|---|---|
| "three.js pesa o site inteiro" | **Não.** Carrega em 3 de 60 páginas, só as homes. Verificado cruzando cada bundle com o HTML de todas as páginas. |
| "O laço O(n²) das partículas trava o celular" | **Não.** 11.175 pares por frame no desktop, medido em **0,1 ms/frame** (0,005 ms no perfil mobile). Irrelevante. |
| "Deve haver overflow horizontal no celular" | **Não há.** 12 páginas testadas a 375 px, `scrollWidth` = `clientWidth` = 375 em todas. (Risco latente com grids sem `minmax` — ver Prioridade 6.) |
| "O canvas do hero está com largura zero" | **Artefato de medição.** Após carga limpa renderiza normal. O que sobrou de real foi a distorção de 12% (#15). |

---

## Verificado e correto — não regredir

Base de qualidade que já existe e vale proteger em qualquer refatoração:

- **Paleta de texto sólida** — `--color-text` 16,9:1, `--color-text-muted` 6,8–7,7:1,
  `--color-eyebrow` 5,99:1. Zero reprovação de contraste em 10 das 12 páginas testadas.
- **Estrutura dos três idiomas íntegra** — comparação recursiva PT/EN/ES: nenhuma chave ausente,
  nenhum tipo divergente, nenhum array de tamanho diferente. Sem risco de `undefined` em runtime.
- **Nenhuma tradução esquecida** — varredura por strings idênticas e diacríticos portugueses em
  EN/ES: zero ocorrências reais.
- **Todas as 226 imagens têm `width` e `height`** — reserva de espaço contra CLS feita.
  `loading="lazy"` correto abaixo da dobra.
- **Nenhum `target="_blank"` sem `rel="noopener"`** em 60 páginas.
- **Nenhum segredo, chave ou token** em `src/`, `public/` ou na configuração.
- **`prefers-reduced-motion` respeitado** em 4 dos 5 pontos de animação; o hero tem fallback sem
  WebGL e pausa o loop fora do viewport.
- **Zero artefatos de renderização** no build — nenhum `undefined`, `[object Object]`, `NaN` ou
  `href` vazio nas 60 páginas.
- **Todos os assets referenciados existem** — nenhum 404 de CSS, JS ou imagem local.
- **Meta descriptions** todas presentes, traduzidas e sem duplicatas.
- **Higiene de repositório correta** — `dist/`, `.astro/` e `node_modules/` devidamente ignorados.
- **O loader do WordPress falha suave** — se a API cair, mantém o cache do build anterior em vez de
  apagar o blog.
- **`contact.php` valida `profile` e `interest` por allow-list estrita** e o destinatário é
  constante — não é relay via campo `To`.
- **Labels do formulário** usam associação implícita por envolvimento — válida, não precisa de `for`/`id`.
- **Sem `tabindex` positivo** em lugar nenhum; os 4 `tabindex="-1"` são honeypots, uso correto.
- **FAQ usa `<details>`/`<summary>` nativos** — teclado e estado expandido funcionam sem JS.
