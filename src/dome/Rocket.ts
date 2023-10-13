import { Canvas } from "./Canvas";

const GRAVITY = 9.81;
const factorShowInsideCanvas = 20;

function rocketTrajectory(t, horizontalSpeedInitial, verticalSpeedInitial, windSpeed) {
  let horizontalSpeedCorrected = horizontalSpeedInitial + windSpeed;

  let x = horizontalSpeedCorrected * t;
  let y = verticalSpeedInitial * t - 0.5 * GRAVITY * t * t;

  return {
    x: Math.floor(x / factorShowInsideCanvas),
    y: Math.floor(y / factorShowInsideCanvas),
  };
}

export class Rocket {
  horizontalSpeedInitial: number;
  verticalSpeedInitial: number;
  canvas: Canvas;
  color: string;
  x: number;
  y: number;
  elapsedTime: number;
  isGoing: boolean;
  finishExplosion: boolean;
  id: number;
  constructor(canvas, { color, horizontalSpeedInitial, verticalSpeedInitial }: { color: string; horizontalSpeedInitial: number; verticalSpeedInitial: number }) {
    this.canvas = canvas;
    this.color = color;
    this.horizontalSpeedInitial = horizontalSpeedInitial;
    this.verticalSpeedInitial = verticalSpeedInitial;
    this.elapsedTime = 0;
    this.isGoing = false;
    this.x = 0;
    this.y = 0;
    this.id = new Date().getTime();
    this.finishExplosion = false;
  }

  launch() {
    this.isGoing = true;
  }

  explode() {
    this.isGoing = false;
  }

  render(windSpeed) {
    if (this.finishExplosion) {
      return;
    }
    let position = rocketTrajectory(this.elapsedTime * 10, this.horizontalSpeedInitial, this.verticalSpeedInitial, windSpeed);

    this.y = position.y;
    this.x = position.x;

    if (position.y <= 0 && this.isGoing && this.elapsedTime > 2) {
      this.explode();
      console.log("explode");

      setTimeout(() => {
        this.finishExplosion = true;
      }, 2000);
    }

    if (this.isGoing) {
      this.elapsedTime += 0.01;

      this.canvas.contextCanvas.beginPath();
      this.canvas.contextCanvas.fillStyle = this.color;
      this.canvas.contextCanvas.fillRect(position.x, this.canvas.height - position.y, 4, 4);
      this.canvas.contextCanvas.closePath();
      return;
    }

    const rocketAsLaunched = this.elapsedTime !== 0;
    if (rocketAsLaunched) {
      this.canvas.contextCanvas.beginPath();
      this.canvas.contextCanvas.fillStyle = "#ff7722";
      this.canvas.contextCanvas.fillRect(position.x, this.canvas.height - 10, 10, 10);
      this.canvas.contextCanvas.closePath();
    }
  }
}
