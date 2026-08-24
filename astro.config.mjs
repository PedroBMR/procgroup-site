// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://pedrobmr.github.io';

// Espelha src/utils/deploy.ts — config .mjs nao consegue importar .ts, entao a
// checagem esta repetida aqui. Se a lista de hosts mudar la, mude aqui tambem.
const EH_PRODUCAO = ['www.procgroup.com.br', 'procgroup.com.br'].includes(new URL(SITE).host);

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: '/procgroup-site',
  integrations: [
    // Sitemap so em producao. Enquanto o site e preview no github.io, todas as
    // paginas saem com meta noindex (BaseLayout.astro) — publicar um sitemap
    // junto seria um convite explicito ao rastreamento, contradizendo a meta.
    // Volta sozinho quando `site` virar o dominio da Proc; nada a reverter.
    ...(EH_PRODUCAO ? [sitemap({
      // Páginas noindex ficam fora do sitemap (sinal contraditório): a 404 e
      // a landing /evento (chaveiro NFC, acesso direto). O endsWith preserva
      // /eventos/, que é a agenda pública e deve continuar no sitemap.
      filter: (page) => !page.includes('/404') && !page.endsWith('/evento/'),
    })] : []),
  ],
  image: {
    // As capas do blog vêm do WordPress. Autorizar o domínio permite que o
    // astro:assets baixe no build e gere WebP redimensionado local — sem isso
    // as imagens iam para o HTML como <img> remoto, em tamanho original
    // (PNGs de até 2,5 MB num card de 480px).
    remotePatterns: [{ protocol: 'https', hostname: 'procgroup.com.br' }],
  },
  i18n: {
    locales: ['pt', 'en', 'es'],
    defaultLocale: 'pt',
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
