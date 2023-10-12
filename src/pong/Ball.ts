import { Ai } from "./Ai";
import { Canvas } from "./Canvas";
import { Orquestrer } from "./Orquestrer";
import { Pad } from "./Pad";
import { Sound } from "./Sound";

export class Ball {
  canvas: Canvas;
  positionX: number;
  positionY: number;
  speed: number;
  width: number;
  height: number;

  directionX: number;
  directionY: number;

  pad: Pad;
  ai: Ai;
  sound: Sound;
  private colorBall: string;

  orquestrer: Orquestrer;
  constructor(canvas: Canvas, pad: Pad, ai: Ai, sound: Sound, orquestrer: Orquestrer) {
    this.canvas = canvas;
    this.sound = sound;
    this.pad = pad;
    this.ai = ai;
    this.positionX = 450;
    this.positionY = 300;
    this.speed = 5;
    this.directionX = Math.random() * 10 > 5 ? 1 : -1;
    this.directionY = Math.random() * 10 > 5 ? 1 : -1;

    this.width = 10;
    this.height = 10;

    this.colorBall = "#FAFAFA";
    this.orquestrer = orquestrer;
  }
  updateColorBall(newHexValue: string) {
    this.colorBall = newHexValue;
  }

  handleMovement() {
    const playerPassRightBall = this.pad.drawPosX + this.pad.drawWidth >= this.positionX;
    const playerInsideTopBoundaryBall = this.positionY >= this.pad.drawPosY;
    const playerInsideBottonBoundaryBall = this.positionY <= this.pad.drawPosY + this.pad.drawHeight;

    const playerColision = playerPassRightBall && playerInsideTopBoundaryBall && playerInsideBottonBoundaryBall;
    if (playerColision) {
      this.updateColorBall("#FCEE09");
    }
    if (this.positionX <= 0 || playerColision) {
      this.sound.play();
      this.directionX = 1;
    }

    const aiPassRightBall = this.positionX >= this.ai.drawPosX;
    const aiInsideTopBoundaryBall = this.positionY >= this.ai.drawPosY;
    const aiInsideBottonBoundaryBall = this.positionY <= this.ai.drawPosY + this.ai.drawHeight;

    const aiColision = aiPassRightBall && aiInsideTopBoundaryBall && aiInsideBottonBoundaryBall;
    if (aiColision) {
      this.updateColorBall("#00F0FF");
    }
    if (this.positionX + this.width >= this.canvas.width || aiColision) {
      this.sound.play();
      this.directionX = -1;
    }

    if (this.positionY <= 0) {
      this.sound.play();
      this.directionY = 1;
    }

    if (this.positionY + this.height >= this.canvas.height) {
      this.sound.play();
      this.directionY = -1;
    }
  }

  render() {
    if (this.orquestrer.isPlaying) {
      this.positionX += this.speed * this.directionX;
      this.positionY += this.speed * this.directionY;

      this.handleMovement();
    }

    this.canvas.canvasContext.beginPath();
    this.canvas.canvasContext.fillStyle = this.colorBall;
    this.canvas.canvasContext.fillRect(this.positionX, this.positionY, this.width, this.height);
    this.canvas.canvasContext.closePath();
  }
}
