# Guia de Publicação — procgroup-site

> Checklist prático para o dia em que este site for de fato publicar em `procgroup.com.br`,
> substituindo o WordPress atual. Escrito em 2026-07-17 pensando numa pausa de ~1 mês antes da
> publicação — o objetivo é que qualquer pessoa (ou uma sessão futura do Claude) consiga seguir
> isso do zero sem precisar reconstruir o raciocínio.
>
> Para o histórico de decisões de design/arquitetura e o "diário" sessão a sessão, ver
> `Memory_Claude.md`. Este arquivo é só o "o que fazer no dia de publicar".

## 1. O que já está pronto (não precisa refazer)

Tudo abaixo foi implementado e testado localmente (`npm run build` + `npm run preview`), mas
**nunca foi publicado** — o repositório GitHub Pages ainda está na versão anterior até isso ser
mesclado/deployado de propósito.

- **Blog headless via WordPress.** `src/content.config.ts` busca posts e páginas reais do
  `procgroup.com.br/wp-json` em tempo de build (não em runtime — o WordPress nunca fica exposto ao
  público). Testado com os 15 posts reais existentes. O marketing continua publicando pelo mesmo
  painel WordPress de sempre, sem treinamento novo.
- **Páginas de artigo** (`/blog/[slug]`), **listagem** (`/blog`), **categorias**
  (`/blog/categoria/[slug]`) e **Agenda de Eventos** (`/eventos`) — antes só existiam 8 posts
  fictícios sem página própria.
- **Política de Privacidade** (`/politica-de-privacidade`) — agora puxa o texto legal real do
  WordPress (mesmo mecanismo do blog, collection `pages`), não é mais um placeholder.
- **Suporte e Trabalhe Conosco** — não existiam de verdade no site atual (confirmei: ambos
  retornam 404 em `procgroup.com.br`). Não inventei sistema de chamados nem portal de vagas — as
  duas páginas mostram canais de contato reais + link de e-mail para currículo. Se decidirem que
  querem uma dessas coisas de verdade, é um projeto à parte (ver seção 4).
- **Formulário de contato funcional** (`public/contact.php` + JS em `src/pages/contato.astro`) —
  antes não enviava nada a lugar nenhum. Ver seção 3.4 para o que falta testar.
- **Bugs de contraste de cor corrigidos** — o texto do corpo de todo post do blog e da Política de
  Privacidade estava praticamente invisível (texto escuro sobre fundo escuro, ~1.1:1 de
  contraste). Corrigido e verificado com medição real (WCAG), não só visualmente.
- **Esquema de cores das categorias do blog refinado** — cada categoria tem cor própria
  (Novidades = vermelho da marca, Eventos = âmbar, Tudo sobre tecnologia = teal) em vez de tons
  quase idênticos de vermelho.
- **Navegação em dois eixos** — item "Segmentos" no menu (Governo/Empresas/Indústria), além do
  "Soluções" já existente por unidade de negócio.
- **Formulário de contato segmentado** — campo "Você é" (Governo/Empresa/Indústria/Outro), incluído
  no e-mail e no assunto para triagem mais rápida.
- **Seção "Do nosso blog" na Home** — 3 posts mais recentes reais.
- **Fundo animado do hero** (`src/components/HeroBackground.astro`) — overlay estilo visão
  computacional (caixas de detecção com % de confiança), escolhido entre 4 opções comparadas ao
  vivo com o usuário.
- **Diagrama animado "Como funciona a Proc AI Platform"** (`/plataforma-proc-ai`) e **ticker "Uma
  plataforma, tudo conectado"** (Home) — elementos animados inspirados em pesquisa de concorrente
  (aiquimist.com), com conteúdo e visual próprios da Proc.
- **Case real do Pato 360°** — em `/solucoes/cidades-inteligentes` e como o 1º case de `/cases`
  (selo "Case real"). Dados verificados via fontes públicas oficiais (prefeitura/câmara de Pato
  Branco) + confirmação direta do usuário sobre os 5 municípios atendidos via CPSI (Pato Branco,
  Marmeleiro, Sulina, Chopinzinho, Coronel Vivida). **Números podem estar desatualizados —
  confirmar com o time antes de publicar** (nota já deixada no código e na página).
- **3 dos 4 cases de `/cases` continuam fictícios**, marcados com selo "Exemplo ilustrativo" —
  substituir por dados reais é trabalho futuro, não um bloqueio para publicar (mas idealmente
  resolver antes, dado que "exemplo ilustrativo" fica visível ao público).

## 2. Ambiente de hospedagem confirmado (Hostinger)

Levantado direto no painel em 2026-07-17. Conta Hostinger já hospeda o WordPress atual — o plano
suporta a arquitetura toda, sem precisar trocar de hospedagem nem fazer upgrade.

| Item | Valor |
|---|---|
| WordPress | 7.0.1, tema Hello Elementor 3.4.5 |
| PHP | 8.2 (compatível com `contact.php`, que usa recursos de PHP 8.1+) |
| Disco | 100 GB no plano, ~1.3 GB em uso |
| Backups | Semanais, automáticos |
| SSH | Disponível, **status inativo** — ativar em hPanel → Sites → procgroup.com.br → Avançado → Acesso SSH |
| Git | Disponível em Avançado → GIT — **não testado ainda se roda build command (`npm run build`) automaticamente ou só faz pull dos arquivos como estão.** Testar isso antes de depender disso para deploy. |
| Cron Jobs | Disponível em Avançado → Cron Jobs |
| Editor de zona DNS | Disponível em Avançado → Editor de zona DNS (necessário para o cutover final) |

## 3. Checklist do dia de publicar (nesta ordem)

### 3.1 Trocar o destino do build

`astro.config.mjs` ainda aponta para o GitHub Pages:

```js
// atual (dev):
site: 'https://pedrobmr.github.io',
base: '/procgroup-site',

// trocar para (produção):
site: 'https://www.procgroup.com.br',
base: '/',
```

Sem isso, todos os links internos (`withBase()` em `src/utils/url.ts`) continuam prefixando
`/procgroup-site/` nas URLs, e o canonical/og:image (`BaseLayout.astro`) vai gerar links errados.

### 3.2 Decidir e testar a estratégia de deploy

Ainda não decidido — depende do que a investigação do Git da Hostinger mostrar (ver seção 2):

- **Se o Git da Hostinger rodar o build sozinho:** conectar o repositório direto lá, mais simples.
- **Se só fizer pull dos arquivos como estão (mais provável em hospedagem compartilhada):** usar
  GitHub Actions para buildar (`npm run build`, puxando do WordPress) e mandar o conteúdo de
  `dist/` para a Hostinger via SSH/rsync. Os Cron Jobs do Hostinger entram como gatilho periódico
  (ou um webhook do WordPress ao publicar, se quiserem automação mais imediata).

Ativar o SSH (hPanel) é pré-requisito para qualquer uma das duas rotas que envolva transferência
de arquivo.

### 3.3 Ajustar a variável do WordPress (se ele mudar de endereço)

`src/content.config.ts` já lê a URL do WordPress de uma variável de ambiente:

```js
const WP_BASE = (import.meta.env.WP_API_URL ?? "https://procgroup.com.br")...
```

Se decidirem mover o WordPress para um subdomínio tipo `cms.procgroup.com.br` (recomendado, para
ele parar de ser a superfície pública — ver seção 4), só precisa definir `WP_API_URL` no ambiente
de build. Se o WordPress continuar em `procgroup.com.br`, não precisa mexer em nada aqui.

### 3.4 Testar o formulário de contato de verdade

`public/contact.php` já está com os valores de produção certos (`comercial@procgroup.com.br`,
`SITE_DOMAIN = 'procgroup.com.br'`) — não precisa editar nada ali a princípio. Mas **nunca foi
testado com um servidor de e-mail real** (o preview local não executa PHP). No dia:

1. Publicar o site com o `contact.php` no ar.
2. Preencher o formulário de verdade em `/contato` e confirmar que o e-mail chega em
   `comercial@procgroup.com.br` (checar também a caixa de spam).
3. Se não chegar: o `mail()` nativo do PHP às vezes é bloqueado/filtrado por falta de registro
   SPF/DKIM do domínio remetente (`no-reply@procgroup.com.br`) — pode ser necessário configurar
   esses registros DNS, ou trocar para SMTP autenticado em vez do `mail()` nativo.

### 3.5 Configurar o DNS

Usar o Editor de zona DNS (Avançado, hPanel) para apontar `procgroup.com.br` para o novo site
estático em vez do WordPress, no momento do cutover — e decidir para onde o WordPress vai (ver
seção 4).

### 3.6 QA final pós-deploy

Repetir a varredura que já foi feita localmente, mas no ambiente real: navegar pelas páginas
principais, checar console do navegador, testar o formulário de contato, conferir que os posts do
blog aparecem certos, verificar em mobile.

## 4. Decisões que ainda não são técnicas — são de vocês

- **Onde o WordPress vai morar depois do cutover.** Recomendado: mover para um subdomínio tipo
  `cms.procgroup.com.br` com o admin travado (IP/senha) e o frontend público desligado, já que
  ninguém mais vai navegar nele diretamente — só o build do Astro vai ler a API dele. Isso reduz a
  superfície de ataque do site (WordPress é o alvo mais comum de invasão de sites institucionais).
- **Suporte com sistema de chamados de verdade / Trabalhe Conosco com vagas reais.** Hoje as duas
  páginas mostram canais de contato honestos, não uma funcionalidade fake. Se quiserem isso de
  verdade, é decisão de processo de negócio (não só técnica) — avisar quando quiserem levar adiante.
- **i18n (inglês/espanhol).** Infraestrutura pronta (`src/i18n/`) mas não aplicada nas páginas —
  ver `Memory_Claude.md` para o que falta.

## 5. Referência rápida — onde encontrar cada coisa no código

| O quê | Arquivo |
|---|---|
| Loader do WordPress (posts + páginas) | `src/content.config.ts` |
| Handler do formulário de contato | `public/contact.php` |
| Formulário + JS de envio | `src/pages/contato.astro` |
| Helpers de categoria/data do blog | `src/utils/blog.ts` |
| Menu de navegação | `src/data/nav.ts` |
| Tokens de cor (paleta, incl. cores de categoria e semânticas) | `src/styles/tokens.css` |
| Estilos globais (inclui `.prose` do conteúdo do blog) | `src/styles/base.css` |
| Configuração de domínio/base-path | `astro.config.mjs` |
| Fundo animado do hero (Home) | `src/components/HeroBackground.astro` |
| Diagrama animado da plataforma (`/plataforma-proc-ai`) | `src/components/AnimatedFlow.astro` |
| Ticker de scroll infinito (Home) | `src/components/ConnectedTicker.astro` |
| Case do Pato 360° | `src/pages/solucoes/cidades-inteligentes.astro` e `src/pages/cases.astro` |

## 6. Como rodar localmente para revisar antes de publicar

Esta máquina não tem Node.js instalado globalmente. Um Node portátil foi usado nesta sessão em
`AppData\Local\Temp\claude\...\scratchpad\node-v22.12.0-win-x64` (pasta temporária, pode não
existir mais numa sessão futura). Se precisar rodar de novo:

```
npm install
npm run build     # gera dist/ com os posts reais do WordPress
npm run preview   # sobe um servidor local em localhost:4321
```
