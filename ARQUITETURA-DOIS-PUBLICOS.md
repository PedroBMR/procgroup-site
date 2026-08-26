# Arquitetura — site dividido em dois públicos

Decidido com o Pedro em 2026-08-26. Este documento é a referência da divisão: o que
existe em cada lado, por quê, e em que ordem construir. `src/data/audiencia.ts` é a
implementação em código da tabela de visibilidade daqui.

## A regra

**Não existe ambiente comum de conteúdo.** Quem entra por governo nunca vê conteúdo
corporativo; quem entra por empresas nunca vê conteúdo de setor público. A raiz `/` é
só o seletor. O único ponto de contato é a **escotilha**: um link discreto no rodapé
para o outro lado, para quem clicou errado — sem ela o visitante perdido sai do site.

## Árvore de URLs

```
/                                   seletor (landing) + bloco institucional curto p/ SEO
/governo/                           home do setor público
/governo/solucoes/cidades-inteligentes
/governo/cases                      só o case Pato 360°
/governo/empresa                    institucional, ênfase CPSI/edital/Córtex
/governo/plataforma-proc-ai         hero e CTA próprios do lado
/governo/contato                    CTA "falar sobre CPSI"

/empresas/                          home corporativa
/empresas/solucoes/                 índice das 3 unidades
/empresas/solucoes/ambientes-inteligentes
/empresas/solucoes/ia-industrial
/empresas/solucoes/infraestrutura-de-ti
/empresas/cases                     as 3 aplicações da plataforma
/empresas/empresa                   institucional, ênfase IA própria/engenharia
/empresas/plataforma-proc-ai
/empresas/contato                   CTA WhatsApp/demonstração

/blog · /blog/[slug] · /blog/categoria/[slug]   URL fica, chrome vira o de empresas
/eventos                            idem — é categoria do blog, segue o blog
/politica-de-privacidade · /suporte · /trabalhe-conosco   utilidade, fora dos lados
/evento                             NFC, standalone — intocada
```

Tudo × 3 idiomas (`/en/governo/...`, `/es/empresas/...`). ~110 páginas (hoje 67).

## Tabela de decisões

| # | Decisão | Motivo | Quem decidiu |
|---|---|---|---|
| 1 | Governo = Cidades Inteligentes; Empresas = Ambientes Inteligentes + IA Industrial + Infra de TI | Infra de TI **não vende para governo** | Pedro, 2026-08-26 |
| 2 | Institucional duplicado com ênfase diferente | Mesma história, ângulo por público | Pedro aprovou |
| 3 | Blog só no corporativo | — | Pedro |
| 4 | **Consequência do 3:** `/eventos` vai junto — é categoria do blog no WordPress, sem tag de público por post | Descoberto na implementação | assumido; reversível |
| 5 | Escotilha no rodapé dos dois lados | Saída para quem errou a porta | Pedro confirmou |
| 6 | Landing carrega bloco institucional curto | Raiz sem conteúdo = domínio sem nada indexável | Pedro acatou |
| 7 | `/comecar` morre; raiz assume o papel | Duas páginas-seletor = conteúdo duplicado | assumido |
| 8 | `plataforma-proc-ai` nos dois lados, com hero/CTA diferentes por lado | É a camada transversal; copy diferenciada evita duplicate content | assumido |
| 9 | Utilidade (privacidade, suporte, trabalhe-conosco) na raiz, linkada só pelos rodapés | Não é venda; duplicar política de privacidade = risco jurídico | assumido |
| 10 | Blog mantém URL `/blog` (não vira `/empresas/blog`) | PT-only vindo do WordPress, já tem tratamento especial no i18n; mover quebraria `SINGLE_VERSION_PREFIXES` sem ganho | assumido |

## Estratégia de código — por que não copiar e colar páginas

**Uma página = um componente compartilhado + dois wrappers finos.**

```
src/components/paginas/PaginaCases.astro      ← todo o conteúdo, recebe `publico`
src/pages/[...lang]/governo/cases.astro       ← 5 linhas: instancia com publico="governo"
src/pages/[...lang]/empresas/cases.astro      ← 5 linhas: instancia com publico="empresas"
```

Motivo: toda correção de copy até hoje precisou de 2–3 passadas porque o mesmo texto
vivia em mais de um lugar ("Segurança Corporativa" caiu em três commits diferentes).
Duplicar páginas inteiras dobraria esse custo para sempre. O conteúdo mora **uma vez**
no componente; o que varia por lado sai de `audiencia.ts` ou de um bloco
`Record<Publico, ...>` dentro do próprio componente.

**Por que não rota dinâmica `[publico]`:** testado em 2026-08-26 — `[...lang]/[publico]/`
não gera rota nenhuma (o rest param engole o segmento). Pastas explícitas.

### O chrome (Header / Footer / BaseLayout)

- `nav.ts` → `getMainNav(lang, publico)`: monta o menu só com o que o lado vê.
  Governo: home do lado · empresa · plataforma · solução · cases · contato.
  Empresas: home do lado · empresa · plataforma · soluções (3) · cases · blog · contato.
- `Header`/`Footer` recebem `publico` (via `BaseLayout` ou detectado por `publicoDaUrl`).
- Rodapé: linhas de utilidade + **escotilha** (`audiencia.ts` já tem os textos).
- Na landing e nas páginas de utilidade (`publico === null`): header mínimo
  (logo + idioma), rodapé neutro sem menu de lado.
- Breadcrumb: "Home" passa a apontar para a home **do lado**, não para `/`.

## O que acontece com cada rota atual

| Rota hoje | Destino |
|---|---|
| `/` (home institucional) | conteúdo migra para as duas homes de lado; raiz vira seletor |
| `/comecar` | morre; redirect → `/` |
| `/solucoes/cidades-inteligentes` | redirect → `/governo/solucoes/cidades-inteligentes` |
| `/solucoes/{ambientes,ia,infra}` | redirect → `/empresas/solucoes/...` |
| `/solucoes` (índice 4 unidades) | morre — cada lado tem o seu recorte |
| `/cases` | divide: case real → governo, aplicações → empresas; redirect → `/` |
| `/empresa`, `/contato`, `/plataforma-proc-ai` | viram componente + wrapper nos 2 lados; redirect → `/` |
| `/blog/*`, `/eventos` | ficam na URL; chrome de empresas |
| `/evento`, `/suporte`, `/politica-de-privacidade`, `/trabalhe-conosco`, `/404` | intocadas |

Redirects via `redirects` do `astro.config.mjs` (gera páginas de meta-refresh — é
build estático). O site não está no ar, então só protegem links internos já trocados.

## SEO e i18n

- **hreflang/canonical:** nada muda de mecânica — `/governo/...` é caminho lógico comum,
  cada página existe nos 3 idiomas. `logicalPath()` já funciona.
- **Duplicate content:** os pares institucional/contato/plataforma dos dois lados
  precisam de copy **realmente diferente** (títulos, meta, ênfase). Não é clonar.
- **Sitemap:** continua automático (só em produção). `/evento` segue fora.
- **Landing:** indexável, com o bloco institucional. As duas portas são `<a>` normais —
  rastreáveis.

## Medição (fase posterior — depende de analytics, que o site não tem)

O clique em cada porta é o evento a medir. Sem analytics instalado, a divisão funciona
mas não mede. Decisão de ferramenta pendente com o Pedro (recomendada: sem cookie).

## Ordem de construção

| Fase | Entrega | Verificação |
|---|---|---|
| 1 | `nav.ts` + Header/Footer/BaseLayout cientes de `publico`, escotilha no rodapé | build verde; menu certo em página de teste |
| 2 | Extrair componentes de página (home, empresa, contato, plataforma, cases, solução) | build verde, zero mudança visual nas rotas atuais |
| 3 | Pastas `governo/` e `empresas/` com os wrappers; recortes por lado | as ~110 páginas geradas |
| 4 | Raiz vira seletor; `/comecar` e rotas antigas viram redirect | grep no dist |
| 5 | Chrome de empresas no blog/eventos | visual |
| 6 | **Prova da regra:** nenhum HTML de `/governo` linka `/empresas` (e vice-versa) além da escotilha — grep automatizado no dist | contagem = 1 por página |

Copy nova necessária (aprovação do Pedro antes de ir ao ar): as duas homes, os dois
institucionais, heros da plataforma por lado. Escrevo rascunho seguindo o
`contexto-proc`; ele revisa.
