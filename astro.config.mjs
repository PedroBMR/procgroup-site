// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.procgroup.com.br',
  i18n: {
    locales: ['pt', 'en', 'es'],
    defaultLocale: 'pt',
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
