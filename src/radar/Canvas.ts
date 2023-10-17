export class Canvas {
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(id: string) {
    this.element = document.getElementById(id) as HTMLCanvasElement;
    this.ctx = this.element.getContext("2d") as CanvasRenderingContext2D;

    this.x = 0;
    this.y = 0;
    this.width = 1000;
    this.height = 500;
  }
}
