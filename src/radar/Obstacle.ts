import { Canvas } from "./Canvas";
import { KeyBoardHandler } from "./KeyBoardHandler";

export class Obstacle {
  canvas: Canvas;
  x: number;
  y: number;
  width: number;
  height: number;
  keyboard: KeyBoardHandler;

  constructor(canvas: Canvas, keyboardHandler: KeyBoardHandler) {
    this.keyboard = keyboardHandler;
    this.canvas = canvas;
    this.x = 300;
    this.y = 200;
    this.width = 10;
    this.height = 10;
  }

  render() {
    console.log(this.keyboard.keyboardState, this.y);
    if (this.keyboard.keyboardState.top) {
      this.y -= 1;
    }

    if (this.keyboard.keyboardState.bottom) {
      this.y += 1;
    }

    if (this.keyboard.keyboardState.left) {
      this.x -= 1;
    }

    if (this.keyboard.keyboardState.right) {
      this.x += 1;
    }

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
