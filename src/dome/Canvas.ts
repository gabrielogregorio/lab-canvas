export class Canvas {
  contextCanvas: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    this.contextCanvas = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.width = 3600;
    this.height = 3600;
  }
}
