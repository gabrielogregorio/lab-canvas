import { Orquestrer } from "./Orquestrer";

export class Canvas {
  canvasElement: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  orquestrer: Orquestrer;

  constructor(orquestrer: Orquestrer) {
    this.orquestrer = orquestrer;
    this.canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    this.canvasContext = this.canvasElement.getContext("2d") as CanvasRenderingContext2D;

    this.x = 0;
    this.y = 0;
    this.width = 900;
    this.height = 600;
  }

  render() {
    this.canvasContext.beginPath();

    this.canvasContext.fillStyle = "#ffd4e3";
    this.canvasContext.fillRect(this.width / 2 - 1, 0, 2, this.height);

    this.canvasContext.closePath();

    if (!this.orquestrer.isPlaying) {
      this.canvasContext.beginPath();

      this.canvasContext.font = "30px Arial";
      this.canvasContext.fillStyle = "#ffd4e3";
      this.canvasContext.textAlign = "center";
      this.canvasContext.fillText("Pressione Espaço para continuar", this.width / 2, this.height / 2);

      this.canvasContext.fillText("shift para ganhar velocidade", this.width / 2, this.height / 2 + 40);

      this.canvasContext.closePath();
    }

    this.canvasContext.beginPath();

    this.canvasContext.font = "40px Arial";
    this.canvasContext.fillStyle = "#ffd4e3";
    this.canvasContext.textAlign = "center";
    this.canvasContext.fillText(`${this.orquestrer.player1Points}   ${this.orquestrer.player2Points}`, this.width / 2, 50);

    this.canvasContext.closePath();
  }
}
