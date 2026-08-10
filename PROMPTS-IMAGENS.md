# Prompts de geração — heros das páginas de Solução

Prompts prontos para **Google AI Studio** (Nano Banana / Gemini Image) ou qualquer
gerador equivalente. Derivados do `BRIEFING-IMAGENS.md`, seção 3.

**Por que em inglês:** os modelos de imagem foram treinados majoritariamente em
inglês e seguem o prompt com muito mais fidelidade nesse idioma. O rótulo em
português acima de cada bloco é só para você saber qual é qual.

## Como usar

1. Abra o Google AI Studio (já incluso no seu plano Pro) e escolha o modelo de imagem.
2. Cole **um** prompt por vez. Gere 3–4 variações e escolha a melhor.
3. Baixe em PNG na maior resolução disponível.
4. Salve em `src/assets/images/solucoes/` com o nome indicado em cada bloco.
5. Me avise — eu converto para WebP/AVIF otimizado e troco o `<MediaPlaceholder />`
   pela `<Image />` em cada página.

## Regras que valem para os 4

- **Sem texto legível.** Todo gerador de imagem escreve texto quebrado. Os prompts
  já pedem que dashboards e telas apareçam como formas/gráficos abstratos, sem
  palavras. Se aparecer texto tortinho, gere de novo.
- **Sem logos.** Nada de marcas reais ou inventadas na cena.
- **Sem roxo/violeta.** É a regra da marca — navy `#0b1730` / `#060a14` com
  vermelho `#e2081d` só como acento pontual.
- **16:9** e espaço "respirável" à esquerda ou embaixo, porque o site sobrepõe texto.
- Se o resultado vier com "cara de stock photo colorida demais", acrescente ao
  final: `desaturated except for the red accent, moody, cinematic color grade`.

---

## 1. Cidades Inteligentes → `hero-cidades-inteligentes.png`

> Prioridade: é a página do **Pato 360°**, o carro-chefe.

```
Wide cinematic 16:9 photograph of a modern integrated public safety operations
center at night, seen from behind the operators. A massive curved video wall
fills the background, showing an abstract city map with glowing route lines,
several live camera feeds, and geometric detection overlays — all rendered as
abstract shapes, charts and grids with no readable text or letters. Three
silhouetted operators in dark clothing sit at sleek desks with multiple monitors,
faces not visible. The entire room is bathed in deep navy blue darkness
(#0b1730), lit only by the screens; a few small red accent lights (#e2081d) glow
on the wall edges and on one alert marker. Through a large window on the right,
a night city skyline with warm street lights is faintly visible. Cinematic
depth of field, subtle volumetric haze, sharp modern architecture, professional
corporate technology photography, high detail, moody and sophisticated.
No text, no logos, no purple or violet tones.
```

---

## 2. Segurança Corporativa → `hero-seguranca-corporativa.png`

```
Wide cinematic 16:9 photograph of a modern corporate building lobby at dusk,
focused on a sleek facial recognition access terminal beside a glass speed gate.
A blurred professional in business attire approaches the gate, seen from behind
and out of focus. The terminal screen shows an abstract geometric face-detection
frame — thin bracket shapes and dots, no readable text or letters. A discreet
dome security camera is visible on the ceiling. Far in the background, softly
out of focus, a glass-walled monitoring room glows with screens. The palette is
deep navy blue (#0b1730) and dark graphite with polished concrete and glass; a
single red accent light (#e2081d) marks the terminal status. Cinematic lighting,
shallow depth of field, clean minimal architecture, professional corporate
technology photography, high detail.
No text, no logos, no purple or violet tones.
```

---

## 3. Infraestrutura de TI → `hero-infraestrutura-de-ti.png`

```
Wide cinematic 16:9 photograph inside a modern data center cold aisle, looking
down a long corridor of black server racks receding into the distance. Hundreds
of small status LEDs glow along the racks — mostly cool white and blue, with a
few red ones (#e2081d) standing out. The floor is polished and reflects the
lights. At the far end of the corridor, a technician silhouette stands in front
of a wall of monitoring dashboards rendered as abstract line charts and graphs
with no readable text or letters. Deep navy blue ambient lighting (#0b1730),
subtle atmospheric haze catching the light, strong one-point perspective,
cinematic depth of field, cold clean industrial aesthetic, professional
corporate technology photography, high detail.
No text, no logos, no purple or violet tones.
```

---

## 4. IA Industrial → `hero-ia-industrial.png`

```
Wide cinematic 16:9 photograph of an automated factory production line at night
shift, with a robotic arm and an industrial inspection camera mounted above a
conveyor belt carrying metal parts. Thin glowing geometric bounding boxes and
corner brackets float over the parts, suggesting computer vision inspection —
pure shapes and outlines, no readable text or letters or numbers. A blurred
operator in the background watches an abstract quality dashboard of bars and
gauges. The scene is lit in deep navy blue industrial darkness (#0b1730) with
cool machine lighting; the detection overlays and one warning light glow in red
(#e2081d). Cinematic depth of field, precise mechanical detail, subtle haze,
professional industrial technology photography, high detail, sophisticated
and clean — not futuristic sci-fi.
No text, no logos, no purple or violet tones.
```

---

## Sobre os vídeos do briefing

O `BRIEFING-IMAGENS.md` pedia **vídeo** em 3 dos 4 heros. Recomendação: começar
com **imagem nos quatro**.

Motivo concreto: o site acabou de ganhar fontes locais, JS enxuto e imagens
otimizadas justamente para carregar rápido. Quatro páginas com vídeo em autoplay
no topo desfazem boa parte disso — e vídeo bem-feito custa muito mais tempo de
produção do que ganha em conversão numa página de solução.

Se depois quiser vídeo em **uma** página como destaque (a de Cidades, pelo
Pato 360°), o Veo 3 do seu AI Studio dá conta — e aí a gente trata carregamento
sob demanda, `poster` e `prefers-reduced-motion`, como já foi feito no hero da Home.
