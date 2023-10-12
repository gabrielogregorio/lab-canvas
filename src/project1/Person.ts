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
  canvasContext: CanvasRenderingContext2D;
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

  constructor(canvasContext: CanvasRenderingContext2D, keyboardState: keyboardStateType) {
    this.antiTankSprite = undefined;
    this.canvasContext = canvasContext;
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
    this.drawPosX += this.keyboardState.right ? this.speed : this.keyboardState.left ? this.speed * -1 : 0;
    this.drawPosY += this.keyboardState.top ? this.speed * -1 : this.keyboardState.bottom ? this.speed : 0;
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

    this.canvasContext.drawImage(this.antiTankSprite, startSprite, endSprite, spriteWidth, spriteHeight, this.drawPosX, this.drawPosY, this.drawWidth, this.drawHeight);
  }
}
