# procgroup-site

Site institucional da **Proc Group** — Astro estático, trilíngue (PT/EN/ES), com o blog vindo de um
WordPress headless.

> Antes de mexer, leia o **[ROADMAP.md](ROADMAP.md)**: ele traz o que já foi corrigido, o que está
> pendente, e três configurações que **parecem bugs mas são intencionais** enquanto o site está em
> teste (base path, workflow de deploy e o banner de placeholder na página de Cases).

## Rodando

Requer **Node >= 22.12**.

```sh
npm install
npm run dev      # http://localhost:4321/procgroup-site/
npm run build    # gera dist/
npm run preview  # serve o dist/
```

O build busca os posts e as páginas do WordPress em tempo de build. Aponte para outro WordPress com
a variável `WP_API_URL`; sem ela, usa `https://procgroup.com.br`.

## Estrutura

```
src/
  pages/
    [...lang]/        rotas trilíngues — PT na raiz (/), EN em /en, ES em /es
    blog/             blog, só em português (conteúdo vem do WordPress)
    evento.astro      landing de evento (chaveiro NFC), fora do menu, noindex
    404.astro         página de erro
    robots.txt.ts     gerado a partir do `site` configurado
  components/         componentes .astro
  layouts/            BaseLayout (chrome, SEO, hreflang)
  i18n/               traduções e utilitários de idioma
  data/               conteúdo estruturado (unidades de negócio, contato, eventos)
  styles/             tokens.css (design tokens) + base.css (global)
  utils/              helpers, incluindo a sanitização do HTML do WordPress
  scripts/            motion.ts (GSAP) e neuralField.ts (three.js do hero)
public/               copiado como está para a raiz do build
scripts/gerar-og.mjs  gera a imagem social a partir de src/assets/og-default.svg
```

## Pontos que costumam surpreender

- **`/blog` e `/404` não têm versão por idioma.** Estão em `SINGLE_VERSION_PREFIXES`
  (`src/i18n/utils.ts`); links e `hreflang` para elas nunca recebem prefixo de idioma.
- **O HTML do WordPress é sanitizado na entrada** (`src/utils/sanitizeWp.ts`): allow-list de tags,
  remoção de handlers `on*` e de URLs inseguras, e rebaixamento de headings quando o corpo traz `h1`.
- **O three.js carrega sob demanda.** Os imports precisam continuar **nomeados** em
  `src/scripts/neuralField.ts` — movê-los de volta para dentro do `.astro` quebra o tree-shaking e
  o pacote cresce ~40%.
- **As capas do blog passam pelo `astro:assets`** via `src/components/BlogImage.astro`. Sem isso,
  voltam a ser hot-link de PNGs de vários MB no domínio do WordPress.
- **Imagem social:** editar `src/assets/og-default.svg` e rodar `node scripts/gerar-og.mjs`.

## Publicação

Destino real: **Hostinger (cPanel)**, servindo de `www.procgroup.com.br`. Ver
[PUBLICACAO.md](PUBLICACAO.md) para o procedimento e o ROADMAP para o checklist da virada.
