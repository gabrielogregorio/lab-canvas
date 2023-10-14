import { Canvas } from "./Canvas";
import { HostileArtifact } from "./HostileArtifact";
import bomb from "./bomb.wav";
const defaultSpeed = 0.06;
const minHeightToFlight = 30;
const TIME_IN_MS_TO_FINISH_ANIMATE_EXPLOSION = 2000;

export class DefenseMissiles {
  missionIsDone: boolean;
  isGoing: boolean;
  canvas: Canvas;
  target: HostileArtifact;
  explosionFinished: boolean;
  hasAlreadyTakenOffAboveMinimumHeight: boolean;
  velocityX: number;
  velocityY: number;
  color: string;
  x: number;
  y: number;
  id: number;
  audio: HTMLAudioElement;
  constructor(canvas: Canvas, HostileArtifacts: HostileArtifact) {
    this.canvas = canvas;
    this.audio = new Audio();
    this.audio.src = bomb;
    this.audio.volume = 0.5;
    this.explosionFinished = false;
    this.target = HostileArtifacts;
    this.velocityX = 0;
    this.velocityY = 1;
    this.missionIsDone = false;
    this.color = "#ddff33";
    this.hasAlreadyTakenOffAboveMinimumHeight = false;
    this.isGoing = true;

    this.x = this.canvas.width - this.canvas.width / 4 + Math.random() * 10;
    this.y = 0;
    this.id = new Date().getTime();
  }

  explode() {
    this.missionIsDone = true;
    this.target.explode();
    const timeToAudioInMs = 900;

    setTimeout(() => {
      this.audio.play();
    }, timeToAudioInMs);
  }

  renderDefenseMissile() {
    this.canvas.contextCanvas.beginPath();
    this.canvas.contextCanvas.fillStyle = this.color;
    this.canvas.contextCanvas.fillRect(this.x, this.canvas.height - this.y, 2, 2);
    this.canvas.contextCanvas.closePath();
  }

  renderExplosion() {
    this.canvas.contextCanvas.beginPath();
    this.canvas.contextCanvas.fillStyle = "#ffffff";
    this.canvas.contextCanvas.fillRect(this.x, this.canvas.height - this.y, 8, 8);
    this.canvas.contextCanvas.closePath();
  }

  updateVelocityX(newVelocity) {
    this.velocityX += newVelocity;
    if (this.velocityX > 1.65) {
      this.velocityX = 1.65;
    } else if (this.velocityX < -1.65) {
      this.velocityX = -1.65;
    }
  }

  updateVelocityY(newVelocity) {
    this.velocityY += newVelocity;
    if (this.velocityY > 1.65) {
      this.velocityY = 1.65;
    } else if (this.velocityY < -1.65) {
      this.velocityY = -1.65;
    }
  }

  trackArtefact() {
    if (!this.target.isGoing) {
      return;
    }

    const deltaX = this.target.x - this.x;
    const deltaY = this.target.y - this.y;
    const distanceToAttachInHorizontal = 700;
  
    if (deltaX > 0) {
      this.updateVelocityX(deltaX > distanceToAttachInHorizontal ? defaultSpeed / 20 : defaultSpeed);
    } else if (deltaX < 0) {
      this.updateVelocityX(deltaX < distanceToAttachInHorizontal ? (defaultSpeed / 20) * -1 : defaultSpeed * -1);
    }

    if (deltaY > 0) {
      this.updateVelocityY(defaultSpeed);
    } else if (deltaY < 0) {
      this.updateVelocityY(defaultSpeed * -1);
    }

    this.y += this.velocityY;
    this.x += this.velocityX;
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
