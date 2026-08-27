// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://pedrobmr.github.io';

// Espelha src/utils/deploy.ts — config .mjs nao consegue importar .ts, entao a
// checagem esta repetida aqui. Se a lista de hosts mudar la, mude aqui tambem.
const EH_PRODUCAO = ['www.procgroup.com.br', 'procgroup.com.br'].includes(new URL(SITE).host);

// Enderecos mortos, todos apontando para onde a coisa esta hoje.
//
// Duas mudancas se acumulam aqui:
//   1. 2026-08-26 o site foi dividido em /governo e /empresas;
//   2. 2026-08-27 o CEO tirou cidade e governo daqui — eles ganham site
//      proprio — e o lado corporativo subiu de /empresas para a raiz.
//
// Ou seja: /empresas/* virou /*, e /governo/* nao tem equivalente neste site.
// O que era do lado publico vai para a home; mandar para uma 404 castigaria
// quem clicou num link que a propria Proc divulgou.
const CORPORATIVAS = ['', '/empresa', '/contato', '/cases', '/plataforma-proc-ai',
  '/solucoes', '/solucoes/ambientes-inteligentes', '/solucoes/ia-industrial',
  '/solucoes/infraestrutura-de-ti'];
const PUBLICAS = ['', '/empresa', '/contato', '/cases', '/plataforma-proc-ai',
  '/solucoes', '/solucoes/cidades-inteligentes'];

// O destino do redirect e uma URL que o navegador vai seguir: precisa do base
// path, senao na GitHub Pages ele sai de /procgroup-site/empresas/cases para
// /cases e cai numa 404 do dominio. (Os enderecos de ORIGEM nao levam base: o
// Astro ja gera o arquivo dentro do base.) Quando o site for para o dominio da
// Proc, BASE vira '' e os destinos ficam certos sozinhos.
const BASE = '/procgroup-site';
const REDIRECTS = {};
for (const pref of ['', '/en', '/es']) {
  const raiz = pref || '/';
  for (const rota of CORPORATIVAS) {
    REDIRECTS[`${pref}/empresas${rota}`] = `${BASE}${pref}${rota}` || '/';
  }
  for (const rota of PUBLICAS) {
    REDIRECTS[`${pref}/governo${rota}`] = `${BASE}${raiz}`;
  }
  // A pagina de escolha entre os dois publicos e a solucao de cidades nunca
  // mais existem: a raiz e a home, e cidades foi embora com o setor publico.
  REDIRECTS[`${pref}/comecar`] = `${BASE}${raiz}`;
  REDIRECTS[`${pref}/solucoes/cidades-inteligentes`] = `${BASE}${raiz}`;
}


// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  redirects: REDIRECTS,
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
