import { Ball } from "./Ball";
import { Canvas } from "./Canvas";
import { Orquestrer } from "./Orquestrer";
import { keyboardStateType } from "./types";

const directionColWalkSprite = {
  Bottom: 0,
  Left: 1,
  Right: 2,
  Top: 3,
};

export class Ai {
  canvas: Canvas;
  keyboardState: keyboardStateType;
  speed: number;
  drawPosX: number;
  drawPosY: number;
  drawWidth: number;
  drawHeight: number;
  spriteStartCol: number;
  ball: Ball;
  orquestrer: Orquestrer;

  constructor(canvas: Canvas, orquestrer: Orquestrer) {
    this.orquestrer = orquestrer;
    this.canvas = canvas;
    this.ball = undefined;
    this.keyboardState = { bottom: false, top: false, left: false, right: false, space: false };
    this.speed = 4;
    this.drawPosX = 800;
    this.drawPosY = 150;
    this.drawWidth = 10;
    this.drawHeight = 70;
    this.spriteStartCol = directionColWalkSprite.Top;
  }

  setBall(ball: Ball) {
    this.ball = ball;
  }

  handleCollisionBoundaries() {
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

    const exceedsLeftBoundary = this.drawPosX <= this.canvas.width - this.canvas.width / 3;
    if (exceedsLeftBoundary) {
      this.drawPosX = this.canvas.width - this.canvas.width / 3;
    }

    const exceedsRightBoundary = this.drawPosX >= this.canvas.width;
    if (exceedsRightBoundary) {
      this.drawPosX = this.canvas.width - this.drawWidth;
    }
    const exceedsTopBoundary = this.drawPosY <= 0;
    if (exceedsTopBoundary) {
      this.drawPosY = 0;
    }

    const exceedsBottomBoundary = this.drawPosY + this.drawHeight >= this.canvas.height;

    if (exceedsBottomBoundary) {
      this.drawPosY = this.canvas.height - this.drawHeight;
    }
  }

  handleMovementAi() {
    const startAiMovements = this.ball.positionX >= this.canvas.width / 2;
    const centerPosition = this.drawPosY + this.drawHeight / 3;
    if (this.ball.positionY < centerPosition && startAiMovements) {
      this.keyboardState.top = true;
      this.keyboardState.bottom = false;
    } else if (this.ball.positionY > centerPosition && startAiMovements) {
      this.keyboardState.bottom = true;
      this.keyboardState.top = false;
    }

    if (this.ball.positionX > this.drawPosX && startAiMovements) {
      this.keyboardState.left = false;
      this.keyboardState.right = true;
    } else if (this.ball.positionX < this.drawPosX && startAiMovements) {
      this.keyboardState.left = true;
      this.keyboardState.right = false;
    }
  }

  render() {
    if (this.orquestrer.isPlaying) {
      this.handleCollisionBoundaries();
      this.handleMovementAi();
    }

    this.canvas.canvasContext.beginPath();
    this.canvas.canvasContext.fillStyle = "#00F0FF";
    this.canvas.canvasContext.fillRect(this.drawPosX, this.drawPosY, this.drawWidth, this.drawHeight);
    this.canvas.canvasContext.closePath();
  }
}
