import { Canvas } from "./Canvas";
import { Orquestrer } from "./Orquestrer";

type movementType = {
  top: boolean;
  left: boolean;
  right: boolean;
  bottom: boolean;
  turbo: boolean;
};

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
  keyboardState: movementType;
  speed: number;
  drawPosX: number;
  drawPosY: number;
  drawWidth: number;
  drawHeight: number;
  spriteStartCol: number;
  orquestrer: Orquestrer;
  finalSpeed: number;
  finalDrawHeight: number;
  side: "Left" | "Right";

  constructor(canvas: Canvas, orquestrer: Orquestrer, side: "Left" | "Right") {
    this.orquestrer = orquestrer;
    this.canvas = canvas;
    this.speed = 8;
    this.side = side;
    this.finalSpeed = this.speed;
    this.drawWidth = 10;
    this.drawHeight = 70;

    const centralPosition = this.canvas.height / 2 - this.drawHeight / 2;
    if (side === "Left") {
      this.drawPosX = this.canvas.width / 10;
      this.drawPosY = centralPosition;
    } else {
      this.drawPosX = this.canvas.width - this.canvas.width / 10;
      this.drawPosY = centralPosition;
    }

    this.finalDrawHeight = this.drawHeight;
    this.spriteStartCol = directionColWalkSprite.Top;
  }

  setKeyboardState(keyboardState: movementType) {
    this.keyboardState = keyboardState;
  }

  handleWalking() {
    if (this.keyboardState.turbo && this.finalSpeed <= this.speed * 4 && this.finalDrawHeight >= this.drawHeight / 10) {
      this.finalSpeed++;
      this.finalDrawHeight -= 4;
    }

    if (!this.keyboardState.turbo) {
      if (this.finalSpeed > this.speed) {
        this.finalSpeed--;
      }

      if (this.finalDrawHeight < this.drawHeight) {
        this.finalDrawHeight += 0.5;
      }
    }

    if (this.keyboardState.right) {
      this.drawPosX += this.finalSpeed;
    } else if (this.keyboardState.left) {
      this.drawPosX += this.finalSpeed * -1;
    }

    if (this.keyboardState.top) {
      this.drawPosY += this.finalSpeed * -1;
    } else if (this.keyboardState.bottom) {
      this.drawPosY += this.finalSpeed;
    }

    if (this.side === "Left") {
      const exceedsLeftBoundary = this.drawPosX <= 0;
      const exceedsRightBoundary = this.drawPosX + this.drawWidth >= this.canvas.width / 2;
      if (exceedsLeftBoundary) {
        this.drawPosX = 0;
      } else if (exceedsRightBoundary) {
        this.drawPosX = this.canvas.width / 2 - this.drawWidth;
      }
    } else {
      const exceedsLeftBoundary = this.canvas.width / 2 >= this.drawPosX;
      const exceedsRightBoundary = this.drawPosX + this.drawWidth >= this.canvas.width;
      if (exceedsLeftBoundary) {
        this.drawPosX = this.canvas.width / 2;
      } else if (exceedsRightBoundary) {
        this.drawPosX = this.canvas.width - this.drawWidth;
      }
    }

    const exceedsTopBoundary = this.drawPosY <= 0;
    const exceedsBottomBoundary = this.drawPosY + this.finalDrawHeight >= this.canvas.height;
    if (exceedsTopBoundary) {
      this.drawPosY = 0;
    } else if (exceedsBottomBoundary) {
      this.drawPosY = this.canvas.height - this.finalDrawHeight;
    }
  }

  render() {
    if (this.orquestrer.isPlaying) {
      this.handleWalking();
    }

    this.canvas.canvasContext.beginPath();
    this.canvas.canvasContext.fillStyle = "#FCEE09";
    this.canvas.canvasContext.fillRect(this.drawPosX, this.drawPosY, this.drawWidth, this.finalDrawHeight);
    this.canvas.canvasContext.closePath();
  }
}
