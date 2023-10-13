export class Canvas {
  contextCanvas: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    this.contextCanvas = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.width = 1600;
    this.height = 800;
  }

  renderCity() {
    this.contextCanvas.beginPath();
    this.contextCanvas.fillStyle = "#22ffff";
    this.contextCanvas.fillRect(this.width - this.width / 3.5, this.height - 3, 300, 3);
    this.contextCanvas.closePath();
  }

  render() {
    this.renderCity();
  }
}
