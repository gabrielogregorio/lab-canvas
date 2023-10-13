export class Canvas {
  canvasElement: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor() {
    this.canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    this.canvasContext = this.canvasElement.getContext("2d") as CanvasRenderingContext2D;

    this.x = 0;
    this.y = 0;
    this.width = 500;
    this.height = 500;
  }
}
