import { Ai } from "./Ai";
import { Canvas } from "./Canvas";
import { Orquestrer } from "./Orquestrer";
import { Pad } from "./Pad";
import { Sound } from "./Sound";

const getRandomDirection = () => {
  return Math.random() > 0.5 ? 1 : -1;
};

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
    this.directionX = getRandomDirection();
    this.directionY = getRandomDirection();

    this.width = 10;
    this.height = 10;

    this.colorBall = "#FAFAFA";
    this.orquestrer = orquestrer;
  }

  updateColorBall(newHexValue: string) {
    this.colorBall = newHexValue;
  }

  handleMovement() {
    const playerPassRightBall = this.pad.drawPosX + this.pad.drawWidth >= this.positionX && this.positionX <= this.pad.drawPosX;
    const playerInsideTopBoundaryBall = this.positionY >= this.pad.drawPosY;
    const playerInsideBottomBoundaryBall = this.positionY <= this.pad.drawPosY + this.pad.drawHeight;
    const playerCollision = playerPassRightBall && playerInsideTopBoundaryBall && playerInsideBottomBoundaryBall;
    if (this.positionX <= 0 || playerCollision) {
      this.sound.play();
      this.directionX = 1;
    }

    if (this.positionX <= 0) {
      this.orquestrer.player2Points += 1;
      this.orquestrer.stop();
    }

    const aiPassRightBall = this.positionX + this.width >= this.ai.drawPosX && this.positionX + this.width <= this.ai.drawPosX + this.ai.drawWidth;
    const aiInsideTopBoundaryBall = this.positionY >= this.ai.drawPosY;
    const aiInsideBottomBoundaryBall = this.positionY <= this.ai.drawPosY + this.ai.drawHeight;

    if (this.positionX + this.width >= this.canvas.width) {
      this.orquestrer.player1Points += 1;
      this.orquestrer.stop();
    }

    const aiCollision = aiPassRightBall && aiInsideTopBoundaryBall && aiInsideBottomBoundaryBall;
    if (this.positionX + this.width >= this.canvas.width || aiCollision) {
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
