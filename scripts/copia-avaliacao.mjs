// Prepara o dist/ para a COPIA DE AVALIACAO no Cloudflare Pages
// (proc-site-ajustes.pages.dev), nunca para o site da Proc.
//
// Por que existe: na copia, a raiz e as paginas de hoje (/empresa, /solucoes,
// /contato) continuavam sendo o site antigo. Quem clicava na logo, ou em
// qualquer link do rodape, caia fora da proposta sem perceber. Aqui o
// Cloudflare manda esses enderecos para as paginas novas, entao a copia
// inteira se comporta como o site reestruturado.
//
// Escreve dist/_redirects, arquivo que so o Cloudflare Pages le. Nao fica em
// public/ de proposito: assim ele nunca chega na hospedagem da Proc.
//
// Uso: SITE_URL=https://proc-site-ajustes.pages.dev npm run build
//      node scripts/copia-avaliacao.mjs

import { writeFileSync, existsSync } from "node:fs";

const DESTINOS = {
  "/": "/preview/",
  "/empresa": "/preview/a-proc/",
  "/solucoes": "/preview/solucoes/",
  "/solucoes/infraestrutura-de-ti": "/preview/infraestrutura-de-ti/",
  "/solucoes/ambientes-inteligentes": "/preview/visao-computacional/",
  "/solucoes/ambientes-inteligentes/visao-computacional": "/preview/visao-computacional/",
  "/solucoes/ia-industrial": "/preview/visao-computacional/",
  "/contato": "/preview/contato/",
};

if (!existsSync("dist/index.html")) {
  console.error("dist/ vazio. Rode o build antes.");
  process.exit(1);
}

// 302: e uma copia de avaliacao, nada aqui deve ser lembrado pelo navegador.
const linhas = [];
for (const [de, para] of Object.entries(DESTINOS)) {
  linhas.push(`${de} ${para} 302`);
  if (de !== "/") linhas.push(`${de}/ ${para} 302`);
}
writeFileSync("dist/_redirects", linhas.join("\n") + "\n");
console.log(`dist/_redirects com ${linhas.length} regras.`);
