import { Canvas } from "../scenario/index";
import { KeyBoardHandler } from "../KeyBoardHandler";
import helicopterR1 from "./helicopter_r1.png";
import helicopterR2 from "./helicopter_r2.png";
import helicopterR3 from "./helicopter_r3.png";
import { loadImageCanvas } from "../utils";

const ACCELERATION_FACTOR = 0.2;
import helicopter from "../military-rotor-loop.wav";

export class Obstacle {
  canvas: Canvas;
  x: number;
  y: number;
  width: number;
  height: number;
  keyboard: KeyBoardHandler;
  xSpeed: number;
  ySpeed: number;

  image1: HTMLImageElement;
  image2: HTMLImageElement;
  image3: HTMLImageElement;

  audio: HTMLAudioElement;

  currentImage: number;

  constructor(canvas: Canvas, keyboardHandler: KeyBoardHandler) {
    this.keyboard = keyboardHandler;
    this.canvas = canvas;
    this.x = 500;
    this.y = 300;
    this.width = 45;
    this.height = 26;

    this.xSpeed = 0;
    this.ySpeed = 0;
    this.currentImage = 0;

    this.audio = new Audio();
    this.audio.src = helicopter;
    this.audio.volume = 0.5;
    this.audio.loop = true;

    this.canvas.element.addEventListener("click", () => {
      this.audio.play();
    });

    loadImageCanvas(helicopterR1, (imageLoaded) => {
      this.image1 = imageLoaded;
    });

    loadImageCanvas(helicopterR2, (imageLoaded) => {
      this.image2 = imageLoaded;
    });

    loadImageCanvas(helicopterR3, (imageLoaded) => {
      this.image3 = imageLoaded;
    });
  }

  updateSpeed() {
    if (this.keyboard.keyboardState.top) {
      this.ySpeed -= ACCELERATION_FACTOR;
    }

    if (this.keyboard.keyboardState.bottom) {
      this.ySpeed += ACCELERATION_FACTOR;
    }

    if (this.keyboard.keyboardState.left) {
      this.xSpeed -= ACCELERATION_FACTOR;
    }

    if (this.keyboard.keyboardState.right) {
      this.xSpeed += ACCELERATION_FACTOR;
    }
  }

  updateLocation() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  private drawObstacleInfo() {
    this.canvas.ctx.beginPath();

    this.canvas.ctx.fillStyle = "#ffffff";
    this.canvas.ctx.font = "16px Arial";
    this.canvas.ctx.textAlign = "center";

    const floorX = Math.floor(this.x);
    const floorY = Math.floor(this.y);
    const fixedVelocityX = Number(this.xSpeed.toFixed(1));
    const fixedVelocityY = Number(this.ySpeed.toFixed(1));

    this.canvas.ctx.fillText(`xy=(${floorX}, ${floorY}) vxy=(${fixedVelocityX}, ${fixedVelocityY})`, this.x, this.y - 10);
    this.canvas.ctx.closePath();
  }

  private drawImageObstacle() {
    this.canvas.ctx.beginPath();

    this.currentImage += 1;
    if (this.currentImage >= 3) {
      this.currentImage = 0;
    }

    if (this.image1 && this.image2 && this.image3) {
      const currentImageMap = {
        0: this.image1,
        1: this.image2,
        2: this.image3,
      };

      this.canvas.ctx.drawImage(currentImageMap[this.currentImage], this.x, this.y);
    }

    this.canvas.ctx.closePath();
  }

  drawObstacle() {
    this.drawObstacleInfo();
    this.drawImageObstacle();
  }

  render() {
    this.updateSpeed();
    this.updateLocation();
    this.drawObstacle();
  }
}
