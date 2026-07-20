# Resumo da Sessão — 17/07/2026

Trabalho feito no site **Proc Group** (projeto Astro em `procgroup-site`).
Dev server: `npm run dev` → `http://localhost:4321/procgroup-site/`.

---

## ✅ O que foi feito

### Ambiente
- **Node instalado** (v22.23.1 portátil, adicionado ao PATH do usuário) — a máquina não tinha Node. Local: `%LOCALAPPDATA%\node-portable`.

### Correções visuais (varredura completa do site)
- **FAQ** — eliminada a "caixa preta" do foco no site inteiro (`:focus-visible` global em `src/styles/base.css`) + acordeão repaginado com chevron animado (`src/components/BusinessUnitTemplate.astro`).
- **Imagens no mobile** — corrigido o estouro da imagem em destaque do blog (conflito `aspect-ratio` × `min-height`) e adicionada a rede de segurança global `img { height: auto }`.
- **Contraste / temas** — botão *ghost* adaptável ao tema; `.team-visual` e barras de acento das unidades navy corrigidas (`color-mix`); hover do breadcrumb; vermelhos em fundo claro (empresa) → red-600; eyebrow da categoria do blog; fundo do header (navy em vez de arroxeado).
- **Robustez** — `scroll-padding-top` (âncoras não ficam atrás do header fixo); fallback `<noscript>` para o scroll-reveal; StatCounter mostra o valor real sem JS; `.prose` com tratamento de overflow; `textarea { resize: vertical }`.
- **Hero no mobile** — as "caixas de detecção" do fundo somem no celular (evitava poluir o título). `src/components/HeroBackground.astro`.

### Redesenhos
- **Mapa "Todas as soluções" (Proc AI)** — `src/components/PlatformMandala.astro` refeito para **núcleo + colunas** (mais legível; empilha no mobile).
- **AnimatedFlow** (página Plataforma) — hub estava minúsculo (SVG renderizava a 300px) → agora 900px; rótulos das unidades **abaixo** dos nós (não estouram); pulso maior e visível. `src/components/AnimatedFlow.astro`.
- **Logo do Proc AI** — novo símbolo (**anel aberto + ondas de sinal**, direção "C") no núcleo do mapa e no hub, no lugar do "P". A logo da **Proc Group** (header/footer) segue a **original**.
- **Favicon** — recriado a partir da logo original (engrenagem + ondas), theme-aware, em `public/favicon.svg`.

### Novidades
- **Landing page de evento** (`/evento`) — mobile-first, `noindex`, fora do menu/sitemap. **URL fixa** para os chaveiros NFC/RFID; o conteúdo é **editável num único bloco** em `src/data/events.ts`. Traz WhatsApp em destaque + formulário rápido (nome / telefone / cidade) e barra fixa de WhatsApp. Backend `public/contact.php` estendido para aceitar telefone + cidade + evento (e-mail opcional).
- **Botões de demonstração → WhatsApp** — todos os "Solicitar/Solicite Demonstração" (home, plataforma, soluções, cases, empresa e o CTA do header) abrem o WhatsApp Vendas com mensagem pronta. Centralizado em `src/data/contact.ts`.
- **Conteúdo do Google Doc → site**:
  - **HOME** atualizada (hero/Banner 1, seção "O que a Proc faz?", cabeçalho da Plataforma, descrições dos cards).
  - **Páginas de solução** com as intros dos **Banners 2–5** do doc (novos props `heroTitle` / `heroLead` no `BusinessUnitTemplate`).

---

## ⏳ O que falta / decisões pendentes

- **Cloud RP** — falta a informação do que é (o Aldo vai passar) para virar destaque na Plataforma.
- **Logo/favicon do Proc AI** — falta o Aldo revisar e dizer se ajusta algo (espessura do anel/ondas, tamanho, abertura). *Obs.: os arquivos de preview temporários (`public/_brand.html`, `public/_logos.html`) foram removidos antes de salvar — dá pra recriar quando voltarmos.*
- **Resto do doc** — por enquanto o Google Doc só tinha a HOME escrita. Quando tiver as outras páginas (A Proc, Cases, Blog, Contato), popular.
- **Publicar** — o trabalho foi **commitado localmente** (ver "Git" abaixo). **Não** houve `git push` para o GitHub nem deploy para a Hostinger. Fazer quando decidido.
- **Carrossel de banners** — optamos por usar os Banners 2–5 como intro das páginas de solução (opção a). Um carrossel no hero da home fica como possibilidade futura, se desejado.

---

## 📌 Notas importantes

- **Trocar o conteúdo de um evento**: editar o bloco `evento` em `src/data/events.ts` e republicar. Todos os chaveiros apontam sempre para `/evento`. Slugs de áreas: `cidades-inteligentes`, `seguranca-corporativa`, `infraestrutura-de-ti`, `ia-industrial`.
- **Dev server**: roda como daemon do Astro. Parar com `astro dev stop` (ou deixar rodando).
- **Hospedagem**: GitHub Pages é só ambiente de dev; o destino final é a **Hostinger** (cPanel/PHP) — o `contact.php` já está preparado para PHP compartilhado.

### Git
- O commit desta sessão ficou na branch **`melhorias-visuais-e-evento`**, com base no commit `b3f80a7` ("Revamp") que já estava no GitHub.
- A branch `master` local ficou igual ao GitHub (sem alterações não commitadas perdidas).
- Para levar o trabalho para a `master`:
  ```
  git checkout master
  git merge melhorias-visuais-e-evento
  ```
- Para publicar no GitHub depois: `git push`.
