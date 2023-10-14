export class Canvas {
  contextCanvas: CanvasRenderingContext2D;
  width: number;
  height: number;
  startCityX: number;
  startCityY: number;
  canvas: HTMLCanvasElement

  constructor() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.canvas = canvas

    this.contextCanvas = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.width = 1600;
    this.height = 800;

    this.startCityX = this.width - this.width / 3.5;
    this.startCityY = this.height - 3;
  }

  renderCity() {
    this.contextCanvas.beginPath();
    this.contextCanvas.fillStyle = "#22ffff";
    this.contextCanvas.fillRect(this.startCityX, this.startCityY, 300, 3);
    this.contextCanvas.closePath();
  }

  render() {
    this.renderCity();
  }
}
