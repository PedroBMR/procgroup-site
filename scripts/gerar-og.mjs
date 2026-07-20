// Gera public/og-default.png a partir de src/assets/og-default.svg + o logo real.
//
// Por que existe: Facebook, LinkedIn e WhatsApp não renderizam SVG em
// og:image — o card sai sem imagem. O SVG é só o fundo e o texto; o LOGO é
// sobreposto aqui a partir de public/brand/logo-white.png, o arquivo real da
// marca. Redesenhar o logo em SVG produziria uma marca "parecida", não a marca.
//
// Uso:  node scripts/gerar-og.mjs
//
// sharp já vem instalado como dependência do astro:assets.
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const fundoSvg = join(raiz, "src/assets/og-default.svg");
// Lockup empilhado (marca em cima, PROC, GROUP), 511x351 de conteúdo real —
// bem mais resolução que o public/brand/logo-white.png horizontal (234x74),
// que continua sendo o certo para o header e o rodapé, onde o slot é baixo e
// largo demais para um lockup empilhado.
//
// Fica em src/assets/ e não em public/: só é usado aqui, no build da imagem
// social. Em public/ ele seria copiado para o site e serviria 62 KB que
// nenhuma página pede.
const logo = join(raiz, "src/assets/logo-stacked-white.png");
const saida = join(raiz, "public/og-default.png");

// 230 de largura a partir de 511 é REDUÇÃO, não ampliação: a marca sai nítida.
// O espaço reservado no SVG (y de 72 a 230) comporta a altura resultante.
const LARGURA_LOGO = 230;
const X_LOGO = 80;
const Y_LOGO = 72;

const fundo = await sharp(readFileSync(fundoSvg), { density: 144 })
  .resize(1200, 630, { fit: "fill" })
  .toBuffer();

// O arquivo vem num canvas 550x550 com muita margem transparente; trim() recorta
// para o conteúdo, senão o posicionamento herdaria essa folga invisível.
const logoRedimensionado = await sharp(logo)
  .trim({ threshold: 1 })
  .resize({ width: LARGURA_LOGO })
  .toBuffer();

const png = await sharp(fundo)
  .composite([{ input: logoRedimensionado, top: Y_LOGO, left: X_LOGO }])
  .png({ compressionLevel: 9 })
  .toBuffer();

writeFileSync(saida, png);

const meta = await sharp(png).metadata();
const metaLogo = await sharp(logoRedimensionado).metadata();
console.log(`logo:            ${metaLogo.width}x${metaLogo.height} em (${X_LOGO}, ${Y_LOGO})`);
console.log(`og-default.png:  ${meta.width}x${meta.height}  ${(png.length / 1024).toFixed(0)} KB`);
