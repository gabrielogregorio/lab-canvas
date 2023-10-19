import { InteractionHandler } from "./InteractionHandler";
import { keyboardStateType } from "./KeyBoardHandler";
import { Canvas } from "./scenario/index";

type partialKeys = keyof keyboardStateType;

export class UiCanvas {
  canvas: Canvas;
  keyboardState: InteractionHandler;
  preventMultiplesActions: boolean;
  positions: {
    [key in Partial<partialKeys>]?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  };

  constructor(canvas: Canvas, keyboardState: InteractionHandler) {
    this.canvas = canvas;
    this.keyboardState = keyboardState;

    this.preventMultiplesActions = false;
    this.positions = {};
  }

  renderButton({ text, x, y, xText, yText, isActive }: { text: string; x: number; y: number; xText: number; yText: number; isActive: boolean }) {
    if (isActive) {
      this.canvas.ctx.fillStyle = "#ffffff";
      this.canvas.ctx.fillRect(x, y, 40, 40);
    } else {
      this.canvas.ctx.strokeStyle = "#ffffff";
      this.canvas.ctx.lineWidth = 3;
      this.canvas.ctx.rect(x, y, 40, 40);
      this.canvas.ctx.stroke();
    }

    this.canvas.ctx.fillStyle = isActive ? "#000000" : "#ffffff";
    this.canvas.ctx.font = "bold 18px Verdana";
    this.canvas.ctx.textAlign = "center";
    this.canvas.ctx.fillText(text, xText, yText);
  }

  optionShowUi(height: number) {
    const x = this.canvas.width - 50;
    const y = height - 50;

    this.positions.top = {
      x: x - 50,
      y,
      height: 40,
      width: 40,
    };

    this.renderButton({
      text: `w`,
      isActive: false,
      x: this.positions.top.x,
      y: this.positions.top.y,
      xText: this.canvas.width - 30 - 50,
      yText: height - 23,
    });

    this.positions.bottom = {
      x: x - 50,
      y: y + 50,
      height: 40,
      width: 40,
    };

    this.renderButton({
      text: `s`,
      isActive: false,
      x: this.positions.bottom.x,
      y: this.positions.bottom.y,
      xText: this.canvas.width - 30 - 50, // FIX THIS FILE
      yText: height - 23 + 50,
    });

    this.positions.left = {
      x: x - 100,
      y: y + 50,
      height: 40,
      width: 40,
    };

    this.renderButton({
      text: `a`,
      isActive: false,
      x: this.positions.left.x,
      y: this.positions.left.y,
      xText: this.canvas.width - 30 - 100,
      yText: height - 23 + 50,
    });

    this.positions.right = {
      x,
      y: y + 50,
      height: 40,
      width: 40,
    };

    this.renderButton({
      text: `d`,
      isActive: false,
      x: this.positions.right.x,
      y: this.positions.right.y,
      xText: this.canvas.width - 30,
      yText: height - 23 + 50,
    });
  }

  render() {
    this.canvas.ctx.beginPath();
    this.optionShowUi(this.canvas.height / 8);
    this.canvas.ctx.closePath();
  }
}
