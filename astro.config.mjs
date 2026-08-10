// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://pedrobmr.github.io',
  base: '/procgroup-site',
  integrations: [
    sitemap({
      // Páginas noindex ficam fora do sitemap (sinal contraditório): a 404 e
      // a landing /evento (chaveiro NFC, acesso direto). O endsWith preserva
      // /eventos/, que é a agenda pública e deve continuar no sitemap.
      filter: (page) => !page.includes('/404') && !page.endsWith('/evento/'),
    }),
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
