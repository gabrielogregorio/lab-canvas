import { Canvas } from "./Canvas";
import { calculateEllipseHostileArtifact } from "./utils";

const TIME_IN_MS_TO_FINISH_ANIMATE_EXPLOSION = 2000;
const FACTOR_TO_UPPER_MOVEMENT_TIME = 10;

export class HostileArtifact {
  horizontalSpeedInitial: number;
  verticalSpeedInitial: number;
  canvas: Canvas;
  color: string;
  elapsedTime: number;
  isGoing: boolean;
  finishExplosion: boolean;

  x: number;
  y: number;
  id: number;

  constructor(canvas, { color, horizontalSpeedInitial, verticalSpeedInitial }: { color: string; horizontalSpeedInitial: number; verticalSpeedInitial: number }) {
    this.canvas = canvas;
    this.color = color;
    this.horizontalSpeedInitial = horizontalSpeedInitial;
    this.verticalSpeedInitial = verticalSpeedInitial;
    this.elapsedTime = 0;
    this.isGoing = true;
    this.finishExplosion = false;

    this.x = 0;
    this.y = 0;
    this.id = new Date().getTime();
  }

  explode() {
    this.isGoing = false;

    setTimeout(() => {
      this.finishExplosion = true;
    }, TIME_IN_MS_TO_FINISH_ANIMATE_EXPLOSION);
  }

  renderPosition() {
    this.elapsedTime += 0.01;

    this.canvas.contextCanvas.beginPath();
    this.canvas.contextCanvas.fillStyle = this.color;
    this.canvas.contextCanvas.fillRect(this.x, this.canvas.height - this.y, 4, 4);
    this.canvas.contextCanvas.closePath();
  }

  renderExplosion() {
    this.canvas.contextCanvas.beginPath();
    this.canvas.contextCanvas.fillStyle = "#ff7722";
    this.canvas.contextCanvas.fillRect(this.x, this.canvas.height - this.y, 10, 10);
    this.canvas.contextCanvas.closePath();
  }

  render(windSpeed) {
    if (this.finishExplosion) {
      return;
    }

    const position = calculateEllipseHostileArtifact(this.elapsedTime * FACTOR_TO_UPPER_MOVEMENT_TIME, this.horizontalSpeedInitial, this.verticalSpeedInitial, windSpeed);

    this.y = position.y;
    this.x = position.x;

    const timeToConsiderAreStarted = 2;
    const minHeightToExplode = 5;
    if (this.isGoing && this.elapsedTime > timeToConsiderAreStarted && position.y <= minHeightToExplode) {
      this.explode();
    }

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
