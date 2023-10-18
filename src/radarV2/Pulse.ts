import { Canvas } from "./Canvas";

export class Pulse {
  canvas: Canvas;

  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  sizeWidth: number;
  sizeHeight: number;

  isActive: boolean;

  maxLifeInRender: number;
  lifeRender: number;

  isInInitialDirection: boolean;
  publicFrequency: number;

  constructor(canvas: Canvas, angle: number, speed: number, x: number, y: number, frequency: number) {
    this.canvas = canvas;
    this.isInInitialDirection = true;
    this.publicFrequency = frequency;

    this.isActive = true;

    this.x = x;
    this.y = y;

    this.velocityX = Math.cos(angle) * speed;
    this.velocityY = Math.sin(angle) * speed;
    this.maxLifeInRender = 500;
    this.lifeRender = 0;
    this.sizeWidth = 2;
    this.sizeHeight = 2;
  }

  deactivate() {
    this.isActive = false;
  }

  returnDirection() {
    this.velocityX = this.velocityX * -1;
    this.velocityY = this.velocityY * -1;
    this.isInInitialDirection = false;
  }

  render() {
    if (!this.isActive) return;

    this.x += this.velocityX;
    this.y += this.velocityY;

    if (this.isInInitialDirection) {
      this.sizeWidth += 1;
      this.sizeHeight += 1;
    } else {
      if (this.sizeWidth >= 0) {
        this.sizeWidth -= 1;
        this.sizeHeight -= 1;
      } else {
        this.deactivate();
      }
    }

    this.canvas.ctx.beginPath();
    this.canvas.ctx.fillStyle = "#ffffff";
    this.canvas.ctx.fillRect(this.x, this.y, this.sizeWidth, this.sizeHeight);
    this.canvas.ctx.closePath();

    this.lifeRender += 1;

    if (this.lifeRender >= this.maxLifeInRender) {
      this.deactivate();
    }
  }
}
