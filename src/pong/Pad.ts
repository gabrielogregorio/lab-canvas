import { Canvas } from "./Canvas";
import { Orquestrer } from "./Orquestrer";
import { keyboardStateType } from "./types";

let timeInMsToUpdateSprite = 150;
let spriteActive = 0;

setInterval(() => {
  spriteActive += 1;

  if (spriteActive >= 4) {
    spriteActive = 0;
  }
}, timeInMsToUpdateSprite);

const directionColWalkSprite = {
  Bottom: 0,
  Left: 1,
  Right: 2,
  Top: 3,
};

export class Pad {
  canvas: Canvas;
  keyboardState: keyboardStateType;
  speed: number;
  drawPosX: number;
  drawPosY: number;
  drawWidth: number;
  drawHeight: number;
  spriteStartCol: number;
  orquestrer: Orquestrer;

  constructor(canvas: Canvas, keyboardState: keyboardStateType, orquestrer: Orquestrer) {
    this.orquestrer = orquestrer;
    this.canvas = canvas;
    this.keyboardState = keyboardState;
    this.speed = 4;
    this.drawPosX = 150;
    this.drawPosY = 150;
    this.drawWidth = 10;
    this.drawHeight = 70;
    this.spriteStartCol = directionColWalkSprite.Top;
  }

  handleWalking() {
    if (this.keyboardState.right) {
      this.drawPosX += this.speed;
    } else if (this.keyboardState.left) {
      this.drawPosX += this.speed * -1;
    }

    if (this.keyboardState.top) {
      this.drawPosY += this.speed * -1;
    } else if (this.keyboardState.bottom) {
      this.drawPosY += this.speed;
    }

    const exceedsLeftBoundary = this.drawPosX <= 0;
    const exceedsRightBoundary = this.drawPosX + this.drawWidth >= this.canvas.width / 3;
    if (exceedsLeftBoundary) {
      this.drawPosX = 0;
    } else if (exceedsRightBoundary) {
      this.drawPosX = this.canvas.width / 3 - this.drawWidth;
    }

    const exceedsTopBoundary = this.drawPosY <= 0;
    const exceedsBottomBoundary = this.drawPosY + this.drawHeight >= this.canvas.height;
    if (exceedsTopBoundary) {
      this.drawPosY = 0;
    } else if (exceedsBottomBoundary) {
      this.drawPosY = this.canvas.height - this.drawHeight;
    }
  }

  render() {
    if (this.orquestrer.isPlaying) {
      this.handleWalking();
    }

    this.canvas.canvasContext.beginPath();
    this.canvas.canvasContext.fillStyle = "#FCEE09";
    this.canvas.canvasContext.fillRect(this.drawPosX, this.drawPosY, this.drawWidth, this.drawHeight);
    this.canvas.canvasContext.closePath();
  }
}
