import { Canvas } from "./Canvas";
import { HostileArtifact } from "./HostileArtifact";

const defaultSpeed = 1.5;
const minHeightToFlight = 30;
const TIME_IN_MS_TO_FINISH_ANIMATE_EXPLOSION = 2000;

export class DefenseMissiles {
  missionIsDone: boolean;
  isGoing: boolean;
  canvas: Canvas;
  target: HostileArtifact;
  explosionFinished: boolean;
  hasAlreadyTakenOffAboveMinimumHeight: boolean;

  x: number;
  y: number;
  id: number;
  constructor(canvas: Canvas, HostileArtifacts: HostileArtifact) {
    this.canvas = canvas;
    this.explosionFinished = false;
    this.target = HostileArtifacts;
    this.missionIsDone = false;
    this.hasAlreadyTakenOffAboveMinimumHeight = false;
    this.isGoing = true;

    this.x = this.canvas.width - this.canvas.width / 4 + Math.random() * 10;
    this.y = 0;
    this.id = new Date().getTime();
  }

  explode() {
    this.missionIsDone = true;
    this.target.explode();
  }

  renderDefenseMissile() {
    this.canvas.contextCanvas.beginPath();
    this.canvas.contextCanvas.fillStyle = "#ddff33";
    this.canvas.contextCanvas.fillRect(this.x, this.canvas.height - this.y, 5, 5);
    this.canvas.contextCanvas.closePath();
  }

  renderExplosion() {
    this.canvas.contextCanvas.beginPath();
    this.canvas.contextCanvas.fillStyle = "#ffffff";
    this.canvas.contextCanvas.fillRect(this.x, this.canvas.height - this.y, 10, 10);
    this.canvas.contextCanvas.closePath();
  }

  trackArtefact() {
    if (!this.target.isGoing) {
      return;
    }

    const deltaX = this.target.x - this.x;
    const deltaY = this.target.y - this.y;

    const distanceToOnlyUp = 200;
    if (deltaX > distanceToOnlyUp) {
      this.x += defaultSpeed / 4;
    } else if (deltaX < distanceToOnlyUp) {
      this.x -= defaultSpeed / 4;
    }

    if (deltaX > 0 && deltaX < distanceToOnlyUp) {
      this.x += defaultSpeed;
    } else if (deltaX < 0 && deltaX > distanceToOnlyUp) {
      this.x -= defaultSpeed;
    }

    if (deltaY > 0) {
      this.y += defaultSpeed;
    } else if (deltaY < 0) {
      this.y -= defaultSpeed;
    }
  }

  render() {
    if (this.explosionFinished) {
      return;
    }

    if (this.missionIsDone) {
      this.renderExplosion();

      setTimeout(() => {
        this.explosionFinished = true;
      }, TIME_IN_MS_TO_FINISH_ANIMATE_EXPLOSION);
      return;
    }

    if (!this.isGoing) {
      return;
    }

    if (!this.hasAlreadyTakenOffAboveMinimumHeight && this.y > minHeightToFlight) {
      this.hasAlreadyTakenOffAboveMinimumHeight = true;
    }

    this.trackArtefact();
    this.renderDefenseMissile();

    const targetX = Math.abs(this.target.x - this.x);
    const targetY = Math.abs(this.target.y - this.y);
    const itIsCloseToTheArtifact = targetX + targetY <= 10;
    if (itIsCloseToTheArtifact || !this.target.isGoing || (this.hasAlreadyTakenOffAboveMinimumHeight && this.y < minHeightToFlight)) {
      this.explode();
    }
  }
}
