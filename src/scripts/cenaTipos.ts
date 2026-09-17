/**
 * Contrato comum das cenas do herói.
 *
 * Vive em arquivo próprio porque o motor (cenas.ts) e cada cena precisam do
 * mesmo tipo: se ele morasse no motor, toda cena nova importaria o motor de
 * volta e o ciclo de import ficaria dando voltas.
 */
export type Ctx = CanvasRenderingContext2D;

export interface Cena {
  /** `host` traz os rótulos traduzidos em data-attributes. Cena que não usa texto ignora. */
  criar(w: number, h: number, host: HTMLElement): any;
  desenhar(ctx: Ctx, s: any, w: number, h: number, t: number, ativo: number, px: number, py: number): void;
  redimensionar?(s: any, w: number, h: number): void;
  /** Quadros por segundo. Ausente = sem limite (o rAF manda). */
  fps?: number;
}
