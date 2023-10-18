import { loadImageCanvas } from "../utils";
import warShipImage from "./warShip.png";

export class Canvas {
  x: number;
  y: number;
  width: number;
  height: number;

  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  warShip: HTMLImageElement;

  constructor() {
    this.element = document.getElementById("canvas") as HTMLCanvasElement;
    this.ctx = this.element.getContext("2d") as CanvasRenderingContext2D;

    this.x = 0;
    this.y = 0;
    this.width = 1000;
    this.height = 500;

    loadImageCanvas(warShipImage, (loadedImage) => {
      this.warShip = loadedImage;
    });
  }

  drawOcean() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "#4baff2";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.closePath();
  }

  drawWarShip() {
    this.ctx.beginPath();
    this.ctx.drawImage(this.warShip, -2, 248, 120, 120);
    this.ctx.closePath();
  }

  render() {
    this.drawOcean();
    this.drawWarShip();
  }
}
