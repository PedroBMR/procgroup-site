# Auditoria do site — 2026-09-24

Checagem de ponta a ponta: formulários, idiomas, build e links (crawler + navegador headless em 24 páginas, 1366px e 390px) e coerência de conteúdo. Build passou sem erros; nenhum erro de JS; nenhum overflow horizontal.

## Feito nesta sessão (as mudanças no site foram conferidas no build)

- [x] **Repositório no GitLab interno.** https://gitlab.proc.local/desenvolvimento-interno/site-proc (privado), com o histórico do GitHub mais os commits desta sessão. O GitHub virou o remote `github` e ficou parado em 2026-09-17; ver a nota nova em `PUBLICACAO.md` §3.2.

- [x] **WhatsApp segue o idioma da página.** O "Solicitar demonstração" era fixo em PT. Agora `whatsappDemo(lang)` em `src/data/contact.ts`, texto em `translations.ts` → `topbar.demoMsg`.
- [x] **Faixa (ticker) sem salto.** Tinha 2 cópias; em telas > ~1.200px o texto acabava e voltava do começo. Agora 4 cópias (`ConnectedTicker.astro`).
- [x] **Página `/plataforma-proc-ai` removida.** Rota, componentes (`Plataforma`, `PlatformMandala`, `AnimatedFlow`), item do menu, textos e meta. Botão principal da home virou "Conheça nossas soluções" → `/solucoes`; saíram os botões "Ver a Plataforma Proc AI" da home e das páginas de solução. Endereços antigos (`/plataforma-proc-ai` e `/empresas/plataforma-proc-ai`, nos 3 idiomas) redirecionam para `/solucoes`.

## Pendente — código

### Alta
- [ ] **Formulário perde perfil e área de interesse.** `public/contact.php:24-36` aceita só uma lista antiga (com "Cidades Inteligentes", "Governo / Prefeitura"). O form envia "Ambientes Inteligentes", "Condomínio ou campus" e, em EN/ES, tudo traduzido → o e-mail chega com "-". Correção: `value` = slug fixo nas `<option>`, PHP valida o slug e escreve em PT no e-mail. Trocar também o rótulo "Empresa / Município / Cidade" (`:197`).
- [ ] **Imagem de compartilhamento cita "Cidades Inteligentes".** `src/assets/og-default.svg:41` → regerar `public/og-default.png` com `scripts/gerar-og.mjs`. Aparece em todo link compartilhado.

### Média
- [ ] **Menu não marca a página atual** (só a home PT). `Header.astro:29` compara com/sem barra final.
- [ ] **Botões de WhatsApp abrem na mesma aba** e tiram o visitante do site. `Button.astro:14` — pôr `target="_blank" rel="noopener"` em links externos.
- [ ] **`/evento` em EN/ES mostra a resposta do servidor em PT.** `evento.astro:438` — usar `v.sentOk/sentFail` fora do PT (como `Contato.astro:103` já faz).
- [ ] **404:** "Falar com a Proc" leva a `/suporte` em vez de `/contato` (`404.astro:32,47`); em EN/ES título, menu e rodapé ficam em PT; o link "PT" do seletor aponta para `/404/`, que não existe.
- [ ] **Restos de cidades/governo no código:** JSON-LD da empresa "para cidades, empresas e indústrias", fixo em PT (`BaseLayout.astro:122`); descrição do blog "segurança pública" (`blog/index.astro:33,45`).
- [ ] **E-mail do formulário pode cair em spam:** assunto sem `mb_encode_mimeheader`, sem `MIME-Version`, `mail()` sem `-f` (`contact.php:209-221`).
- [ ] **Formulários sem link para a Política de Privacidade** (`Contato.astro`, `evento.astro`), enquanto o rodapé afirma conformidade com a LGPD.
- [ ] **Data da política sempre em PT** em /en e /es (`utils/blog.ts:38`).
- [ ] **Dependências:** `astro` 7.1.0 tem alerta crítico (GHSA-26w7-cxv4-gfx2) + 7 outros → atualizar / `npm audit fix`.

### Baixa
- [ ] Contato: selects sem opção vazia (lead vira "Empresa" por padrão), sem `autocomplete`, mensagem de status fora da tela no celular (`Contato.astro:49-78`).
- [ ] Evento: sem JS não mostra retorno; telefone aceita qualquer texto; botão volta a "Enviar" se trocar idioma depois de enviar.
- [ ] `contact.php`: rate limit conta envios inválidos e pode pegar IP de proxy; sem checagem de `Origin`; `FALLBACK_REDIRECT` sem idioma/base.
- [ ] Aviso GSAP "[data-reveal] not found" no console em contato, suporte, trabalhe-conosco, política e 404 (`motion.ts:35`).
- [ ] Código morto: `HeroBackground`, `StatCounter`, `CenaPorta`, `neuralField.ts` (+ dependência `three`), ícone e imagem de cidades-inteligentes.
- [ ] Acessibilidade: nav mobile com `aria-label="Abrir menu"`; dropdown não fecha com Esc; ticker sem pausa (WCAG 2.2.2); seletor de idioma sem atributo `lang`.
- [ ] Miúdos de texto: placeholder de telefone BR em EN/ES no evento; alt EN "a access" → "an access" (`CaseIllustration.astro:41`); título ES "Agenda de Eventos" sem tradução; nome do schema fixo em PT (`Empresa.astro:39`); falta `og:locale:alternate`.
- [ ] Telefone/e-mail/endereço escritos à mão em `Footer`, `ContactChannels`, `evento`, `BaseLayout` — centralizar em `contact.ts`.

## Pendente — conteúdo (equipe / WordPress)

- [ ] **LinkedIn do rodapé dá 404** (`linkedin.com/company/procgroupti`, em todas as páginas). Atenção: `/company/procgroup` é **outra empresa** (agência de marketing). Precisa da URL certa.
- [ ] **Política de Privacidade** (vem do WordPress) é modelo de e-commerce — fala de cartão, carrinho, newsletter — e não cobre o que o site coleta: formulário de contato, lead do evento, currículos por e-mail, IP em hash para limitar tentativas.
- [ ] **"Proc AI Platform" ainda aparece em ~60 textos** (home, cases, soluções). Se a plataforma saiu como produto, reescrever.
- [ ] **Blog:** 18 posts com 48 menções a cidade/setor público; assinatura "empresas e cidades / segurança pública" em todo post.
- [ ] **"Agenda de Eventos"** lista 2 artigos, não eventos.
- [ ] **Suporte "Seg a Sex, 8h às 18h"** contradiz "suporte 24×7" das páginas de infraestrutura.
- [ ] **Planejamento interno à vista:** "próxima fase" em `/suporte`, `/trabalhe-conosco` (3 idiomas) e no texto reserva da política.
- [ ] **Afirmações sem lastro:** "Especialistas Certificados", "Grandes players", "operando 24/7" (evento).
- [ ] **Currículos vão para `comercial@`** (`trabalhe-conosco.astro:15`).
- [ ] **EN/ES têm menos da metade do texto do PT** (mediana 408/456 vs 915 palavras).

## Infra / deploy

- O preview em `pedrobmr.github.io` não recebe mais as mudanças: o GitHub parou em 2026-09-17 e o deploy dele é GitHub Actions.
- Formulários não funcionam no preview do GitHub Pages (não roda PHP). Esperado até a migração, mas quem testar vai achar que está quebrado.
- `.htaccess`: `ErrorDocument 404 /404.html` só vale com `base: '/'`.
- O build depende do WordPress no ar: CI sem cache quebra se procgroup.com.br cair.
- `robots.txt` gerado em `/procgroup-site/robots.txt` é ignorado pelos robôs; o `noindex` por meta tag já cobre o preview.
