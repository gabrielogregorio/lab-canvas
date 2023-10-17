import { Canvas } from "./Canvas";
import { KeyBoardHandler } from "./KeyBoardHandler";

export class Obstacle {
  canvas: Canvas;
  x: number;
  y: number;
  width: number;
  height: number;
  keyboard: KeyBoardHandler;
  xVelocity: number;
  yVelocity: number;

  constructor(canvas: Canvas, keyboardHandler: KeyBoardHandler) {
    this.keyboard = keyboardHandler;
    this.canvas = canvas;
    this.x = 300;
    this.y = 200;
    this.width = 10;
    this.height = 10;
    this.xVelocity = 0;
    this.yVelocity = 0;
  }

  render() {
    if (this.keyboard.keyboardState.top) {
      this.yVelocity -= 0.2;
    }

    if (this.keyboard.keyboardState.bottom) {
      this.yVelocity += 0.2;
    }

    if (this.keyboard.keyboardState.left) {
      this.xVelocity -= 0.2;
    }

    if (this.keyboard.keyboardState.right) {
      this.xVelocity += 0.2;
    }

    this.x += this.xVelocity;
    this.y += this.yVelocity;
    if (this.keyboard.keyboardState.KeyQ) {
      this.width -= 5;
      this.height -= 5;
    }

    if (this.keyboard.keyboardState.KeyE) {
      this.width += 5;
      this.height += 5;
    }

    this.canvas.ctx.beginPath();
    this.canvas.ctx.fillStyle = "#ff2222";
    this.canvas.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.canvas.ctx.closePath();
  }
}
