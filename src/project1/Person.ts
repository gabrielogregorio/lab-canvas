import { Canvas } from "./Canvas";
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

export class Person {
  antiTankSprite: HTMLImageElement;
  canvas: Canvas;
  keyboardState: keyboardStateType;
  speed: number;
  stoppedSprite: number;
  drawPosX: number;
  drawPosY: number;
  totalSpriteRows: number;
  totalSpriteCols: number;
  drawWidth: number;
  drawHeight: number;
  spriteStartCol: number;

  constructor(canvas: Canvas, keyboardState: keyboardStateType) {
    this.antiTankSprite = undefined;
    this.canvas = canvas;
    this.keyboardState = keyboardState;
    this.speed = 3;
    this.stoppedSprite = 0;
    this.drawPosX = 150;
    this.drawPosY = 150;
    this.totalSpriteRows = 4;
    this.totalSpriteCols = 4;
    this.drawWidth = 100;
    this.drawHeight = 100;
    this.spriteStartCol = directionColWalkSprite.Top;
  }

  async loadFiles() {
    return new Promise((resolve, reject) => {
      let antiTankSprite = new Image();
      antiTankSprite.src = "http://localhost:8080/sprites.jpg";

      antiTankSprite.onload = () => {
        this.antiTankSprite = antiTankSprite;
        resolve(antiTankSprite);
      };

      antiTankSprite.onerror = (error) => {
        reject(error);
      };
    });
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
    const exceedsRightBoundary = this.drawPosX + this.drawWidth >= this.canvas.width;
    if (exceedsLeftBoundary) {
      this.drawPosX = 0;
    } else if (exceedsRightBoundary) {
      this.drawPosX = this.canvas.width - this.drawWidth;
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
    if (this.keyboardState.top) this.spriteStartCol = directionColWalkSprite.Top;
    if (this.keyboardState.bottom) this.spriteStartCol = directionColWalkSprite.Bottom;
    if (this.keyboardState.left) this.spriteStartCol = directionColWalkSprite.Left;
    if (this.keyboardState.right) this.spriteStartCol = directionColWalkSprite.Right;

    const playerIsStopped = !this.keyboardState.bottom && !this.keyboardState.left && !this.keyboardState.right && !this.keyboardState.top;
    let spriteStartRow = playerIsStopped ? this.stoppedSprite : spriteActive;

    const spriteWidth = this.antiTankSprite.width / this.totalSpriteRows;
    const spriteHeight = this.antiTankSprite.height / this.totalSpriteCols;

    const startSprite = spriteStartRow * spriteWidth;
    const endSprite = this.spriteStartCol * spriteHeight;

    this.handleWalking();

    this.canvas.canvasContext.drawImage(this.antiTankSprite, startSprite, endSprite, spriteWidth, spriteHeight, this.drawPosX, this.drawPosY, this.drawWidth, this.drawHeight);
  }
}
