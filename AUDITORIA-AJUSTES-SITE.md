# Auditoria: "Ajustes no site" contra o site atual

Documento recebido: `Ajustes no site.pdf`, 40 páginas, lido em 2026-10-05.
Repositório auditado: `C:\Users\Pedro_ProcGroup\Repos\ProcGroup\procgroup-site`, branch `master`.

**O documento não é uma lista de ajustes. É uma reorganização da arquitetura de negócio do site.**
Duas das três unidades atuais deixam de existir como área, e duas áreas novas nascem de partes
que hoje são solução ou subpágina.

---

## 1. A mudança estrutural

| Hoje no site | No documento | O que acontece |
|---|---|---|
| Ambientes Inteligentes | não existe | Dissolvida. O conteúdo vai para Visão Computacional e Vídeo Analytics |
| IA Industrial | não existe | Dissolvida. O conteúdo vai para Visão Computacional e Vídeo Analytics |
| Infraestrutura de TI | 1ª área | Continua, perde Proc Cloud para a área nova |
| Proc Cloud (solução dentro de Infra TI) | 2ª área: **Hospedagem em nuvem** | Promovida a área |
| Visão computacional (subpágina rascunho, desligada) | 3ª área: **Visão Computacional e Vídeo Analytics** | Promovida a área |

Ordem e grafia exigidas pelo documento, nesta sequência:
**Infraestrutura de TI · Hospedagem em nuvem · Visão Computacional e Vídeo Analytics**

### Menu

| Hoje | No documento |
|---|---|
| Home · A Proc · Soluções · Blog · Contato | Logo (home) · A PROC · Soluções · **Parcerias** · **Proc City** · Blog · Contato |

O item "Home" sai (a logo já leva para a raiz). Entram dois itens novos. O menu de Soluções vira
mega-menu com três blocos e 22 subitens no total: 6 em Infraestrutura, 4 em Hospedagem, 12 em
Visão Computacional. Referência de estilo citada no documento: viasoft.com.br.

**Cases não aparece no menu final.** Isso confirma a decisão de 2026-09-25, que já desligou a
seção em `src/data/secoes.ts`. Nada a fazer.

---

## 2. Inventário: o que existe, o que muda de lugar, o que é novo

### Já existe e só muda de lugar ou de nome

| Item | Onde está hoje |
|---|---|
| Backup em nuvem | `solutionContent.ts`, Infra TI |
| Checklist Inteligente de Abertura de Lojas | `solutionContent.ts`, Infra TI |
| Gestão Completa da Infraestrutura | Infra TI, vira "Sustentação e governança de ambientes" |
| Segurança da Informação | Infra TI, o documento separa em dois itens: antivírus e firewall |
| Proc Cloud | Infra TI, migra inteiro para a área de Hospedagem |
| Videomonitoramento com IA, acesso, LPR, estacionamento, fluxo de pessoas | Ambientes Inteligentes, migram para Visão Computacional |
| Inspeção, contagem, rastreabilidade, Edge AI | IA Industrial, migram para Visão Computacional |
| Página de visão computacional (texto pronto) | `src/data/visaoComputacional.ts`, hoje desligada |

### Conteúdo novo, não existe nada no repositório

| Item | Tamanho |
|---|---|
| Página **Hospedagem em Nuvem** | 7 páginas de PDF, 4 soluções |
| Página **Visão Computacional e Vídeo Analytics** | 10 páginas de PDF, 12 subitens |
| Página **Seja um Parceiro da Proc** | 7 páginas de PDF, 3 modelos, 12 regras de programa |
| 3 formulários novos | indicação, software house, parceiro técnico |
| Recuperação de arquivos corrompidos ou criptografados | solução nova em Infra TI |
| Hospedagem de ERP e de outros projetos | soluções novas |
| 4 heróis alternados na home | copy pronta no documento |
| Página A Proc reescrita | 6 páginas de PDF, história, expertise, missão, visão, propósito |

---

## 3. Riscos. Isto é o que a auditoria existe para encontrar

### 🔴 R1. A página de Visão Computacional entra em rota de colisão com as regras de LGPD já registradas

A skill `contexto-proc` tem uma tabela explícita do que **existe, funciona e não vai para peça
pública**. O documento coloca três desses itens no site:

| Trecho do documento | Página | Regra que colide |
|---|---|---|
| "Taxa de frequência; Taxa de retorno; Análise de perfil; Dados demográficos" no analytics de fluxo de pessoas | 24 | "Identificação facial de cliente de loja para medir frequência, permanência e visitante único" |
| "Permanência em postos de trabalho" dentro de Segurança operacional | 26 | "Vigilância de trabalhador, tema sindical e trabalhista" |
| "Pesquisa inteligente de pessoas: reconhecimento facial, cor de roupa, boné, mochila, objetos carregados" | 30 e 31 | Marcação de pessoa por biometria sem base legal declarada |

O que **pode** ficar, porque está na tabela verde da mesma skill: busca assistida em vídeo por
característica objetiva da cena, indicadores de circulação **agregados e anônimos**, ocupação de
estacionamento, controle de acesso por cadastro prévio com LPR.

A linha divisória é essa: agregado e anônimo pode, identificação biométrica de indivíduo sem
consentimento não pode. Não é caso de apagar a página. É caso de reescrever três blocos.

### 🔴 R2. Os formulários de parceria coletam dado pessoal de terceiro

O Formulário 1 pede **CNPJ, razão social, nome completo e contato do responsável da empresa
indicada** (páginas 34 e 39). Quem preenche não é o titular desse dado, e o titular não
consentiu, nem sabe.

Isso precisa de base legal declarada e de atualização da política de privacidade antes de o
formulário entrar no ar. A política atual está em `src/data/politicaPrivacidade.ts` e não
cobre essa hipótese.

### 🟠 R3. Afirmações novas sem fonte rastreável

| Afirmação | Página | Situação |
|---|---|---|
| Atuação internacional com clientes e projetos no **Paraguai, Argentina e Bolívia** | 9 | Não consta em lugar nenhum do cofre nem da skill. Precisa de confirmação antes de publicar |
| "Parceria com a ORACLE" | 7 | Uso de marca de terceiro junto à da Proc exige aprovação prévia por escrito (regra 5 da skill) |
| "Ser referência nacional" na Visão | 9 | A skill proíbe construções de superioridade, incluindo "referência nacional". Já está no site hoje, dentro da declaração de Visão. Decisão: mantém como aspiração declarada ou sai |
| "Mais de 10 anos" e "mais de uma década" | várias | Liberado. É um dos dois números utilizáveis |

### 🟠 R4. O programa de indicação é um instrumento comercial, não copy

As páginas 33 a 36 trazem 12 regras de validação, prazo de 90 dias, condição de pagamento
atrelada ao recebimento, e a frase "o regulamento completo do programa poderá estabelecer outras
condições". Publicado no site, isso vira oferta pública.

O regulamento completo não existe ainda. Publicar as 12 regras sem ele cria a pior combinação:
promessa de bônus com condições incompletas.

### 🟠 R5. O e-mail muda para vendas@procgroup.com.br

O documento define `vendas@procgroup.com.br` como destino do formulário (página 5). Hoje o site
usa `comercial@procgroup.com.br` em 6 arquivos, **inclusive na política de privacidade**, que é
documento legal.

Confirmar que a caixa existe e quem a lê antes de trocar. A troca na política de privacidade é
alteração de documento legal, não de copy.

### 🟡 R6. Heróis aleatórios na home custam SEO e medição

O documento pede 4 heróis alternando aleatoriamente (página 2), cada um com H1 próprio.

Um H1 que muda a cada carregamento é ruim para três coisas: o Google vê títulos diferentes para
a mesma URL, o teste A/B fica impossível de ler, e a medição de conversão por herói não se
sustenta sem analytics configurado para isso.

Alternativa que entrega a mesma intenção: H1 fixo, com a cena visual e o bloco de apoio
alternando. Decisão sua.

### 🟡 R7. Três idiomas

O site é PT, EN e ES. O documento entrega copy só em português, e são cerca de 25 páginas de
texto novo. Traduzir tudo é um projeto à parte.

Três caminhos: traduzir tudo, publicar as páginas novas só em PT como o blog já faz, ou reduzir
o site a português. Precisa de decisão antes do começo, porque muda a estrutura das rotas.

### 🟡 R8. URLs antigas e o SEO recente

Renomear as áreas mata `/solucoes/ambientes-inteligentes` e `/solucoes/ia-industrial`, que
receberam trabalho de SEO nos commits `b03f561` e `335ab17`, de poucos dias atrás.

Precisa de redirecionamento de cada URL antiga para a nova, com o base path correto. Já existe
o mecanismo em `astro.config.mjs`, usado na saída de cidade e governo.

### 🟢 R9. Proc City não existe no repositório

O menu pede um item apontando para o site da Proc City. Não há nenhuma URL no projeto. Preciso
do endereço para criar o link.

### 🟢 R10. O que o documento acerta e vale registrar

- A regra "fornece, não opera" é respeitada no texto de Visão Computacional: o sujeito de quem
  pesquisa e recebe alerta é sempre a equipe do cliente.
- O 24/7 aparece só em infraestrutura e hospedagem, que é a exceção legítima confirmada.
- Não há número inventado. O "99% de satisfação" e a queda de 38% não voltaram.
- "Em uma única plataforma tecnológica" (página 23) é seguro hoje, porque o site tem um público
  só desde 2026-08-27.

---

## 4. Decisões que dependem de você antes de eu começar

1. **Os três blocos do R1** saem, ficam como estão, ou eu reescrevo na forma agregada e anônima?
2. **Paraguai, Argentina e Bolívia**: confirmado? Pode publicar?
3. **Programa de indicação**: publico as 12 regras agora ou espero o regulamento completo?
4. **vendas@procgroup.com.br**: a caixa existe? Troco na política de privacidade também?
5. **EN e ES**: traduzir tudo, só PT nas páginas novas, ou encerrar os outros idiomas?
6. **Heróis aleatórios**: aleatório mesmo, ou H1 fixo com a cena alternando?
7. **URL da Proc City.**

---

## 5. Ordem sugerida de execução

A ordem importa, porque a arquitetura de dados do site é a base de tudo o que vem depois.

| Fase | O que entra | Por que nesta ordem |
|---|---|---|
| 1 | Reescrever `businessUnits.ts` com as três áreas novas, criar as rotas, redirecionar as antigas | Todo o resto lê este arquivo |
| 2 | Menu novo, com o mega-menu de 22 subitens, Parcerias e Proc City | Depende das rotas existirem |
| 3 | Página Infraestrutura de TI, que é a que mais aproveita o que já existe | Menor risco, valida o padrão das outras duas |
| 4 | Página Hospedagem em Nuvem | Move Proc Cloud e cria ERP e outros projetos |
| 5 | Página Visão Computacional e Vídeo Analytics | A maior, e a que depende das decisões do R1 |
| 6 | Home com os heróis e o bloco O QUE FAZEMOS | Depende de todas as páginas de destino existirem |
| 7 | Página A Proc | Independente, pode entrar a qualquer momento depois da fase 1 |
| 8 | Parcerias e os 3 formulários | Bloqueada pelos riscos R2 e R4 |

---

*Auditoria gerada em 2026-10-05. O PDF original está em `C:\Users\Pedro_ProcGroup\Downloads\Ajustes no site.pdf`.*
