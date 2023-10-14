import { Canvas } from "./Canvas";
import { InteractionHandler } from "./InteractionHandler";
import { keyboardStateType } from "./types";

type partialKeys = keyof keyboardStateType;

export class Ui {
  canvas: Canvas;
  hidden: boolean;
  keyboardState: InteractionHandler;
  previneMultiplesActions: boolean;
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
    this.hidden = false;
    this.previneMultiplesActions = false;
    this.positions = {
      KeyX: {
        x: 0,
        y: 0,
        height: 40,
        width: 40,
      },
    };
  }

  handleHiddenPartialUi() {
    this.hidden = true;
  }

  handleShowFullUi() {
    this.hidden = false;
  }

  renderButton({ text, x, y, xText, yText, isActive }: { text: string; x: number; y: number; xText: number; yText: number; isActive: boolean }) {
    if (isActive) {
      this.canvas.contextCanvas.fillStyle = "#11ffff";
      this.canvas.contextCanvas.fillRect(x, y, 40, 40);
    } else {
      this.canvas.contextCanvas.strokeStyle = "#11ffff";
      this.canvas.contextCanvas.lineWidth = 3;
      this.canvas.contextCanvas.rect(x, y, 40, 40);
      this.canvas.contextCanvas.stroke();
    }

    this.canvas.contextCanvas.fillStyle = isActive ? "#000000" : "#11ffff";
    this.canvas.contextCanvas.font = "bold 24px Verdana";
    this.canvas.contextCanvas.textAlign = "center";
    this.canvas.contextCanvas.fillText(text, xText, yText);
  }

  renderTextUi(text: string, x: number, y: number) {
    this.canvas.contextCanvas.fillStyle = "#ff2211";
    this.canvas.contextCanvas.font = "medium 24px Verdana";
    this.canvas.contextCanvas.textAlign = "center";
    this.canvas.contextCanvas.fillText(text, x, y);
  }

  optionShowUi(height: number) {
    this.canvas.contextCanvas.beginPath();
    this.renderTextUi("ESCONDER UI", this.canvas.width - 300 - 40, height);

    const startTutorialKey = this.canvas.width - 300 + 90;

    this.positions.KeyX = {
      x: startTutorialKey - 20,
      y: height - 30,
      height: 40,
      width: 40,
    };

    this.renderButton({
      isActive: this.keyboardState.keyboardState.KeyX,
      x: this.positions.KeyX.x,
      y: this.positions.KeyX.y,
      text: "x",
      xText: startTutorialKey,
      yText: height,
    });

    this.canvas.contextCanvas.closePath();
  }

  traceRocket(height: number) {
    this.canvas.contextCanvas.beginPath();

    this.renderTextUi("RASTRO", this.canvas.width - 300, height);

    const startTutorialKey = this.canvas.width - 300 + 90;

    this.positions.KeyF = {
      x: startTutorialKey - 20,
      y: height - 30,
      height: 40,
      width: 40,
    };

    this.renderButton({
      text: "f",
      x: startTutorialKey - 20,
      y: height - 30,
      isActive: false,
      xText: startTutorialKey,
      yText: height,
    });

    this.canvas.contextCanvas.closePath();
  }

  randomArtifact(height: number) {
    this.canvas.contextCanvas.beginPath();

    this.renderTextUi("ARTEFATO ALEATORIO", this.canvas.width - 398, height);

    const startTutorialKey = this.canvas.width - 300 + 90;

    this.positions.KeyE = {
      x: startTutorialKey - 20,
      y: height - 30,
      height: 40,
      width: 40,
    };

    this.renderButton({
      text: "e",
      x: startTutorialKey - 20,
      y: height - 30,
      isActive: this.keyboardState.keyboardState.KeyE,
      xText: startTutorialKey,
      yText: height,
    });

    this.canvas.contextCanvas.closePath();
  }

  controlledArtefact(height: number) {
    this.canvas.contextCanvas.beginPath();

    this.renderTextUi("ARTEFATO CONTROLADO", this.canvas.width - 412, height);

    const startTutorialKey = this.canvas.width - 300 + 90;

    this.positions.KeyQ = {
      x: startTutorialKey - 20,
      y: height - 30,
      height: 40,
      width: 40,
    };

    this.renderButton({
      text: "q",
      x: startTutorialKey - 20,
      y: height - 30,
      isActive: this.keyboardState.keyboardState.KeyQ,
      xText: startTutorialKey,
      yText: height,
    });

    this.canvas.contextCanvas.closePath();
  }

  renderKey(text: string, startTutorialKey: number, height: number, isActive: boolean, action: "KeyA" | "KeyW" | "KeyD" | "KeyS") {
    this.positions[action] = {
      x: startTutorialKey - 20,
      y: height + 50 - 30,
      height: 40,
      width: 40,
    };

    this.renderButton({
      text: text,
      x: startTutorialKey - 20,
      y: height + 50 - 30,
      isActive,
      xText: startTutorialKey,
      yText: height + 50,
    });
  }

  optionControlForControlledArtefact(height: number) {
    this.canvas.contextCanvas.beginPath();

    this.renderTextUi("CONTROLAR ARTEFATO", this.canvas.width - 340, height);

    this.renderKey("W", this.canvas.width - 450 + 100, height, this.keyboardState.keyboardState.KeyW, "KeyW");
    this.renderKey("A", this.canvas.width - 450 + 50, height + 50, this.keyboardState.keyboardState.KeyA, "KeyA");
    this.renderKey("D", this.canvas.width - 450 + 148, height + 50, this.keyboardState.keyboardState.KeyD, "KeyD");
    this.renderKey("S", this.canvas.width - 450 + 100, height + 100, this.keyboardState.keyboardState.KeyS, "KeyS");

    this.canvas.contextCanvas.closePath();
  }
  render() {
    if (this.keyboardState.keyboardState.KeyX && !this.previneMultiplesActions) {
      this.previneMultiplesActions = true;
      this.hidden = !this.hidden;

      const TIME_IN_MS_TO_PREVINE_MULTIPLES_TOUCHS = 200;
      setTimeout(() => {
        this.previneMultiplesActions = false;
      }, TIME_IN_MS_TO_PREVINE_MULTIPLES_TOUCHS);
    }

    this.optionShowUi(this.canvas.height / 4 - 50);
    if (this.hidden) {
      return;
    }
    this.traceRocket(this.canvas.height / 4);
    this.randomArtifact(this.canvas.height / 4 + 100);
    this.controlledArtefact(this.canvas.height / 4 + 150);
    this.optionControlForControlledArtefact(this.canvas.height / 4 + 200);
  }
}
