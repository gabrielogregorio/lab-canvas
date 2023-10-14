import { Canvas } from "./Canvas";
import { InteractionHandler } from "./InteractionHandler";

const TIME_IN_MS_TO_FINISH_ANIMATE_EXPLOSION = 2000;
const velocityBase = 0.1;

type hostileArtifactControlledType = {
  keyState: InteractionHandler;
  color: string;
  horizontalSpeedInitial: number;
  verticalSpeedInitial: number;
  startX: number;
};

export class HostileArtifactControlled {
  horizontalSpeedInitial: number;
  verticalSpeedInitial: number;
  canvas: Canvas;
  color: string;
  elapsedTime: number;
  isGoing: boolean;
  finishExplosion: boolean;

  keyState: InteractionHandler;

  x: number;
  y: number;
  startX: number;
  startY: number;
  velocityX: number;
  velocityY: number;
  id: number;

  constructor(canvas, { color, keyState, horizontalSpeedInitial, verticalSpeedInitial, startX }: hostileArtifactControlledType) {
    this.canvas = canvas;
    this.color = color;
    this.keyState = keyState;
    this.horizontalSpeedInitial = horizontalSpeedInitial;
    this.verticalSpeedInitial = verticalSpeedInitial;
    this.elapsedTime = 0;
    this.isGoing = true;
    this.finishExplosion = false;
    this.velocityX = velocityBase;
    this.velocityY = velocityBase;

    this.startX = startX;
    this.startY = 0;
    this.x = 0;
    this.y = 0;
    this.id = new Date().getTime();
  }

  explode() {
    this.isGoing = false;
    this.velocityX = 0;
    this.velocityY = 0;

    setTimeout(() => {
      this.finishExplosion = true;
    }, TIME_IN_MS_TO_FINISH_ANIMATE_EXPLOSION);
  }

  renderPosition() {
    this.elapsedTime += 0.01;

    this.canvas.contextCanvas.beginPath();
    this.canvas.contextCanvas.fillStyle = "#ffffff";
    this.canvas.contextCanvas.fillRect(this.x, this.canvas.height - this.y, 2, 2);
    this.canvas.contextCanvas.closePath();
  }

  renderExplosion() {
    this.canvas.contextCanvas.beginPath();
    this.canvas.contextCanvas.fillStyle = "#ff7722";
    this.canvas.contextCanvas.fillRect(this.x, this.canvas.height - this.y, 8, 8);
    this.canvas.contextCanvas.closePath();
  }

  updateVelocity() {
    if (!this.isGoing) {
      return;
    }
    if (this.keyState.keyboardState.KeyD) {
      this.velocityX += velocityBase;
    }

    if (this.keyState.keyboardState.KeyA) {
      this.velocityX -= velocityBase;
    }

    if (this.keyState.keyboardState.KeyW) {
      this.velocityY += velocityBase;
    }

    if (this.keyState.keyboardState.KeyS) {
      this.velocityY -= velocityBase;
    }

    if (this.velocityX > 1.4) {
      this.velocityX = 1.4;
    } else if (this.velocityX < -1.4) {
      this.velocityX = -1.4;
    }

    if (this.velocityY > 1.4) {
      this.velocityY = 1.4;
    } else if (this.velocityY < -1.4) {
      this.velocityY = -1.4;
    }
  }

  render() {
    if (this.finishExplosion) {
      return;
    }

    this.updateVelocity();

    this.x += this.velocityX;
    this.y += this.velocityY;

    if (this.isGoing) {
      this.renderPosition();
      return;
    }

    const HostileArtifactsAsLaunched = this.elapsedTime !== 0;
    if (HostileArtifactsAsLaunched && !this.finishExplosion) {
      this.renderExplosion();
    }
  }
}
