import { InteractionHandler } from "./InteractionHandler";
import { keyboardStateType } from "./KeyBoardHandler";
import { RadarScreen } from "./radarScreen/index";

type partialKeys = keyof keyboardStateType;

export class Ui {
  radarScreen: RadarScreen;
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

  constructor(radarScreen: RadarScreen, keyboardState: InteractionHandler) {
    this.radarScreen = radarScreen;
    this.keyboardState = keyboardState;

    this.preventMultiplesActions = false;
    this.positions = {};
  }

  renderButton({ text, x, y, xText, yText, isActive }: { text: string; x: number; y: number; xText: number; yText: number; isActive: boolean }) {
    if (isActive) {
      this.radarScreen.ctx.fillStyle = "#44de3c";
      this.radarScreen.ctx.fillRect(x, y, 40, 40);
    } else {
      this.radarScreen.ctx.strokeStyle = "#44de3c";
      this.radarScreen.ctx.lineWidth = 3;
      this.radarScreen.ctx.rect(x, y, 40, 40);
      this.radarScreen.ctx.stroke();
    }

    this.radarScreen.ctx.fillStyle = isActive ? "#000000" : "#44de3c";
    this.radarScreen.ctx.font = "bold 18px Verdana";
    this.radarScreen.ctx.textAlign = "center";
    this.radarScreen.ctx.fillText(text, xText, yText);
  }

  optionShowUi(height: number) {
    const x = this.radarScreen.width - 50;
    const y = height - 50;

    this.positions.KeyQ = {
      x: 10,
      y,
      height: 40,
      width: 40,
    };

    this.renderButton({
      text: `${this.radarScreen.timeToReset / 1000}s`,
      isActive: false,
      x: 10,
      y: y,
      xText: 30,
      yText: height - 23,
    });

    this.positions.KeyE = {
      x,
      y,
      height: 40,
      width: 40,
    };

    this.renderButton({
      text: `${this.radarScreen.scale}x`,
      isActive: false,
      x: x,
      y: y,
      xText: this.radarScreen.width - 30,
      yText: height - 23,
    });
  }

  render() {
    this.radarScreen.ctx.beginPath();
    this.optionShowUi(this.radarScreen.height / 8);
    this.radarScreen.ctx.closePath();
  }
}
