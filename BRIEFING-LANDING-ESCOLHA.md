# Briefing — página de escolha de público (Governo × Empresa)

Documento de trabalho. Traz (1) o prompt pronto para o Claude Designer, (2) uma alternativa à
ideia original, e (3) o que falta para conseguir medir a escolha.

**Decidido em 2026-08-24:** são **duas URLs diferentes do mesmo site** — não dois domínios, não
dois projetos. Isso simplifica tudo: mesma marca, mesmo build, mesmo deploy, e o SEO continua
concentrado num domínio só.

**Fonte da marca:** `C:\Users\Pedro_ProcGroup\PROC\Branding\Brand ProcGroup.html` — manual
consolidado com design system, 23 componentes prontos e `tokens.css` normativo. Os valores abaixo
foram extraídos de lá, não aproximados.

---

## 1. Prompt para o Claude Designer

> Copie do `---` de abertura até o `---` de fechamento.

---

Desenhe uma página de entrada para a **PROC GROUP**, empresa de tecnologia de Pato Branco/PR que
entrega IA, visão computacional, segurança eletrônica e infraestrutura de TI numa plataforma única.

**O trabalho:** a página tem uma função só — o visitante escolhe qual dos dois mundos é o dele, e
segue para a área certa do site. Nada mais compete por atenção.

### As duas portas

| Porta | Para quem | Leva para |
|---|---|---|
| **Governo e cidades** | Prefeituras, guardas municipais, órgãos públicos | `/solucoes/cidades-inteligentes` |
| **Empresas e indústrias** | Indústria, empresa, condomínio, campus | `/solucoes/ambientes-inteligentes` |

Duas URLs do **mesmo** site — mesma marca, mesmo cabeçalho, mesmo rodapé. Não são dois sites.

Cada porta precisa de: um rótulo curto, uma frase de reconhecimento ("é isso que eu sou") e um
sinal visual que diferencie as duas **sem hierarquizar** — nenhuma das duas é a principal.
Precisa existir uma saída para quem não se encaixa (link discreto "ver tudo o que a Proc faz").

### O que a Proc faz, para você escrever certo

- **Governo:** videomonitoramento inteligente, reconhecimento facial, leitura de placas (LPR),
  analytics e o Centro Integrado de Operações do município.
- **Empresas:** controle e liberação de acesso, controle de acesso facial, auditoria de acesso,
  videomonitoramento com IA, proteção perimetral, e soluções fora do mercado convencional
  brasileiro (drones de segurança, robôs).

Promessa: **"Tecnologia inteligente para um mundo mais seguro, conectado e eficiente."**
Posicionamento: **"Inteligência que age antes do problema — para governos, empresas e indústrias."**

### ⛔ Regras que não se negociam

1. **A Proc FORNECE a tecnologia, NÃO opera a vigilância.** Quem assiste às telas e responde ao
   incidente é o cliente. Nunca escreva "monitoramos", "nossa central acompanha", "vigiamos".
   O sujeito de qualquer verbo de vigiar é a plataforma ou o cliente — nunca "nós".
   Certo: *"A plataforma opera 24/7 e alerta sua equipe."*
2. **Zero superlativo.** Nada de "nº 1", "líder", "referência nacional", "o único", "o melhor",
   "revolucione", "o poder mágico da IA". Peça para órgão público precisa ser defensável em edital.
3. **Nunca cite concorrente nem programa de governo de terceiro**, nem por comparação ou
   trocadilho. Já custou caro uma vez.
4. **Nenhum número.** Não invente métrica e não use "99% de satisfação", "−38% de ocorrências"
   nem "200+ clientes" — nenhum tem metodologia rastreável.
5. **Sem case, depoimento ou logo de cliente na porta corporativa:** essa unidade ainda não tem
   nenhum cliente fechado. Escreva no presente da **capacidade** ("a plataforma faz X"), nunca do
   histórico ("já implantamos X").
6. **A IA amplia a equipe humana, não substitui.** "A IA não substitui pessoas: amplia sua
   capacidade de agir, decidir e proteger."
7. **A unidade corporativa chama-se Ambientes Inteligentes.** "Segurança Corporativa" é nome
   morto — não use, mesmo se aparecer em material antigo.

### Sistema visual — valores normativos, reproduza com exatidão

**Cor — dark-first.** Fundo padrão navy `#060A14`.

| Papel | Hex |
|---|---|
| Navy base (fundo institucional) | `#060A14` |
| Navy alternativo | `#0C1220` |
| Navy texto / logo sobre claro | `#0B1730` |
| Card (tema escuro) | `#111A2E` |
| Card hover | `#182338` |
| Branco / claro alternativo | `#FFFFFF` / `#F3F5FA` |
| Texto escuro: principal / secundário / discreto | `#E6EEF8` / `#94A3B8` / `#7688A3` |
| Texto claro: principal / secundário | `#0B1730` / `#4B5568` |

**O vermelho é contextual — escolha pelo fundo, e nunca misture os quatro no mesmo bloco:**

| Vermelho | Hex | Onde |
|---|---|---|
| Claro | `#FF4A54` | labels e ênfase **sobre navy** |
| De marca | `#E2081D` | CTA e ação, nos dois temas |
| Hover | `#B8081A` | hover/pressionado, e eyebrow sobre claro |
| Texto longo | `#7A0511` | links e texto corrido **sobre branco** |

Vermelho é **ação, nunca decoração** — não use como fundo amplo. Vermelho de marca ≠ vermelho de
erro. Cores de sistema (WhatsApp `#25D366`, sucesso `#16A34A`, avaliação `#FFC800`) só na função
original, nunca como cor institucional.

**Tipografia.**

- **Barlow Condensed 800, CAIXA ALTA, tracking `0.01em`, entrelinha `1.02`** — H1 e H2.
  H1 `4.25rem` (mobile 44px) · H2 `3rem`.
- **Space Grotesk 700, caixa normal, `1.5rem`** — H3/H4.
- **Space Grotesk 400, 17px, entrelinha 1.6** — corpo. Nunca caixa alta em texto corrido.
- **Label / eyebrow — a assinatura recorrente da marca.** Space Grotesk 600 · 13px · CAIXA ALTA ·
  tracking `0.22em`, **sempre precedido de um marcador circular vermelho de 7px com leve glow**.
  Cor: `#FF4A54` sobre escuro, `#E2081D` sobre claro. Vai acima dos títulos.
- Escala: 13 · 15 · 17 · 20 · 24 · 36 · 48 · 68px.

**Forma, luz e layout.**

- Raios: `8px` · `14px` · `24px` · pill `999px`.
- Espaçamento **múltiplo de 4px**: 4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 64 · 96 · 128.
- Container `1280px`. Cortes estruturais em **640 / 900 / 1200px**.
- Sombras sempre **navy translúcido, nunca preto puro**: sutil `0 2px 10px rgba(11,23,48,.06)` ·
  elevada `0 10px 30px rgba(11,23,48,.12)`.
- **Glow vermelho** `0 0 40px rgba(226,8,29,.35)` — assinatura de destaque, uso **pontual**:
  perde força se repetido.
- **Gradiente radial de atmosfera:** halos suaves de vermelho e navy partindo dos cantos.
  Sutil e escuro — nunca um degradê vibrante de ponta a ponta. **Um a dois focos de luz por
  composição, no máximo.**
- Botões: primary vermelho pill, hover `#B8081A` com elevação · secondary superfície com borda
  `rgba(...,.36)` (contraste ≥3:1) · ghost com borda `currentColor`.
- Movimento: curva **ease-out**, elevação no hover.

**Logo.** Símbolo (engrenagem + ondas de sinal) + lettering. Branca sobre escuro, navy `#0B1730`
sobre claro — a escolha é ditada pelo **contraste com o fundo, nunca por preferência**. As ondas
são sempre vermelhas. Área de proteção = altura das ondas de sinal, em todos os lados.
**Proibido:** distorcer, rotacionar, recolorir, sombra, brilho, contorno, transparência, ou navy
sobre fundo escuro.

**Fotografia.** Imagens reais de operação — centro de operações, câmeras urbanas, racks, chão de
fábrica, equipe em campo. **Nunca banco de imagem genérico.** Base escura em tons frios navy com
um ponto de vermelho (LED, câmera). Espaço negativo escuro para receber o texto. Sem foto real,
prefira tratamento gráfico abstrato a stock.

### Requisitos técnicos

- **Trilíngue:** PT (padrão), EN, ES. O seletor de idioma precisa caber no layout.
- **Mobile primeiro.** Boa parte do tráfego de prefeitura chega por WhatsApp, no celular. As duas
  portas empilham bem em tela estreita, ambas alcançáveis com o polegar, sem scroll para descobrir
  que existem duas.
- Acessível: contraste AA, alvos de toque ≥44px, navegável por teclado, foco visível.
- Leve: a página é um pedágio, tem que abrir instantânea.

### Entregue

Três direções visualmente distintas para a mesma estrutura — não três variações da mesma ideia.
Para cada uma: versão desktop e mobile, e a copy das duas portas em PT.

---

## 2. A alternativa — bifurcação na home, sem página de pedágio

A ideia original tem um custo que só aparece depois. Registro aqui para a decisão ser consciente.

### O problema da página de escolha

| Custo | Por quê |
|---|---|
| **SEO** | Uma página de entrada sem conteúdo, ocupando a raiz do domínio, é a página que o Google mais vê e a que menos tem o que indexar. A home hoje carrega o texto institucional que posiciona a Proc |
| **Só pega quem entra pela porta da frente** | Busca orgânica, link de proposta e QR code de evento levam direto a páginas internas. Esse visitante **nunca vê** o splash — e é justamente ele que você mais quer segmentar |
| **Um clique antes de qualquer valor** | O visitante paga um pedágio antes de ver a primeira prova de que a Proc resolve o problema dele |
| **Quem não sabe se encaixar trava** | Uma prefeitura contratando infraestrutura de TI é governo ou empresa? Um condomínio? Uma diretoria de indústria que quer botão de pânico? |

### A alternativa

**A home continua sendo a home** — indexável, com o conteúdo institucional. E logo no topo, acima
da dobra, as duas portas aparecem como o primeiro elemento clicável: dois blocos grandes, lado a
lado no desktop, empilhados no celular.

1. **Mesma segmentação, sem página extra.** A escolha continua explícita e medível — o clique é o
   mesmo evento de analytics.
2. **Zero custo de SEO.** Nada escondido atrás de um gate; a raiz continua com conteúdo real.
3. **Quem não escolhe não fica preso.** Rola e vê o site normal. Não escolher é resposta válida.
4. **O ganho de verdade: memória.** A escolha grava uma preferência no navegador. Na visita
   seguinte a home já entra com o conteúdo daquele público em destaque — e a segmentação passa a
   valer para **todas** as páginas, não só para quem entrou pela raiz.
5. **Funciona para quem chegou por dentro.** Quem cai numa página interna vinda do Google recebe a
   mesma bifurcação, discreta, no fim do conteúdo.

### Comparação direta

| | Página de escolha | Bifurcação na home |
|---|---|---|
| Segmenta explicitamente | ✅ | ✅ |
| Mede a escolha | ✅ | ✅ |
| Preserva SEO da raiz | ❌ | ✅ |
| Alcança quem entra por página interna | ❌ | ✅ |
| Visitante indeciso | trava | rola e segue |
| Lembra da escolha na próxima visita | precisa construir | é o próprio mecanismo |
| Esforço | página nova + rota + i18n ×3 | bloco novo na home + i18n ×3 |

**Recomendação:** bifurcação na home. Mas se a intenção for justamente **forçar** a declaração de
perfil antes de qualquer coisa (por exemplo, para qualificar lead de evento), a página de escolha
faz sentido e o prompt acima entrega ela.

> **Meio-termo, se quiser os dois:** bifurcação na home **e** uma rota dedicada tipo `/comecar`
> com `noindex`, usada só em QR code de evento e link de proposta. O pedágio existe onde ajuda e
> não existe onde atrapalha.

---

## 3. Para medir a escolha: o que falta

⚠️ **`sitemap.xml` não faz isso.** Ele é uma lista de URLs para o buscador — não registra
visitante, não registra clique, não diz de onde ninguém veio.

E hoje **o site não tem analytics nenhum** — nem Google Analytics, nem Plausible, nada.
Confirmado por varredura no código em 2026-08-24.

### O que precisa existir

1. **Uma ferramenta de analytics.** Vale considerar uma **sem cookie** (Plausible, Umami,
   Cloudflare Web Analytics): não exige banner de consentimento, não coleta dado pessoal, e evita
   discussão de LGPD numa empresa que já é operadora de dado de município. Google Analytics
   resolve, mas traz cookie e banner junto — e o design system já tem componente de consentimento
   pronto, caso seja esse o caminho.
2. **Um evento no clique de cada porta**, com o destino como propriedade. Dois números por
   período: quantos foram para governo, quantos para empresa.
3. **Onde está o valor comercial:** carregar a escolha até o formulário de contato, como campo
   oculto. O lead chega já com o segmento marcado, e dá para cruzar "escolheu governo" com
   "virou proposta".

---

## 4. ⚠️ Achado: o próprio manual de marca ainda usa o nome morto

O `Brand ProcGroup.html` tem uma seção **"Correções vigentes → Nomes mortos e provisórios"**, mas
dois arquivos embutidos nele ainda listam **"Segurança Corporativa"** como uma das quatro unidades:

| Arquivo embutido | Onde |
|---|---|
| `guidelines.md` | "Quatro unidades (Cidades Inteligentes · **Segurança Corporativa** · Infraestrutura de TI · IA Industrial)" |
| `KIT-CANAL.md` | descrição do canal do YouTube: "**Segurança corporativa** com IA" |
| componente `cards.html` | card de unidade intitulado "Segurança Corporativa" |

O `guidelines.md` é justamente o arquivo escrito para orientar geração por IA — então qualquer
peça gerada a partir dele nasce com o nome errado. O prompt acima corrige explicitamente (regra 7),
mas **o manual precisa ser atualizado na fonte**.

Dois outros pontos do mesmo arquivo que colidem com as regras vigentes:

- componente `modal.html` traz o exemplo **"Encerrar monitoramento?"** — sugere que a Proc opera
- componente `tags-chips.html` traz **"Como a Pato 360° reduziu 30% dos incidentes urbanos"** —
  número sem metodologia, exatamente o tipo que está bloqueado
