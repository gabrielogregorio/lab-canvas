import { Obstacle } from "../obstacle/index";
import { Canvas } from "../scenario/index";
import { isColliding } from "../utils";
import { PulseColor } from "./PulseColor";
import { calculateNewFrequency } from "./math/calculateNewFrequency";
import { calculateRadialVelocity } from "./math/calculateRadialVelocity";

const MAX_LIFE_RENDER = 600;
const SPEED_WAVE = 12345;
const FACTOR_RESIZE_PULSE = 2;

type startPositionLaunch = {
  x: number;
  y: number;
};

export class Pulse {
  private speedX: number;
  private speedY: number;
  private lifeRender: number;
  private color: PulseColor;
  private canvas: Canvas;
  private obstacle: Obstacle;
  private startPositionLaunch: startPositionLaunch;

  x: number;
  y: number;
  width: number;
  height: number;
  isActive: boolean;
  isInInitialDirection: boolean;
  frequency: number;

  constructor(canvas: Canvas, angle: number, speed: number, x: number, y: number, frequency: number, obstacle: Obstacle, startPositionLaunch: startPositionLaunch) {
    this.x = x;
    this.y = y;
    this.width = 2;
    this.height = 2;
    this.lifeRender = 0;
    this.isInInitialDirection = true;
    this.canvas = canvas;
    this.obstacle = obstacle;
    this.frequency = frequency;
    this.isActive = true;
    this.speedX = Math.cos(angle) * speed;
    this.speedY = Math.sin(angle) * speed;
    this.startPositionLaunch = startPositionLaunch;

    this.color = new PulseColor();

    this.color.generateRgbByFrequency(frequency);
  }

  destroyPulse() {
    this.isActive = false;
  }

  applyBlueShift(newFrequency: number) {
    this.color.applyBlueShift(newFrequency);
  }

  applyRedShift(newFrequency: number) {
    this.color.applyRedShift(newFrequency);
  }

  updateLocation() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  updateScale() {
    if (this.isInInitialDirection) {
      this.width += FACTOR_RESIZE_PULSE;
      this.height += FACTOR_RESIZE_PULSE;
    } else if (this.width >= 0) {
      this.width -= FACTOR_RESIZE_PULSE;
      this.height -= FACTOR_RESIZE_PULSE;
    } else {
      this.destroyPulse();
    }
  }

  drawPulse() {
    this.canvas.ctx.beginPath();
    this.canvas.ctx.fillStyle = this.color.toRgb();
    this.canvas.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.canvas.ctx.closePath();
  }

  handleLifeRender() {
    this.lifeRender += 1;

    if (this.lifeRender >= MAX_LIFE_RENDER) {
      this.destroyPulse();
    }
  }

  invertDirection() {
    this.speedX = this.speedX * -1;
    this.speedY = this.speedY * -1;
    this.isInInitialDirection = false;
  }

  handleCollisionWithObstacle() {
    const collisionWithObstacle = isColliding(this, this.obstacle);

    if (this.isInInitialDirection === false || collisionWithObstacle === false) {
      return;
    }

    const radialVelocity = calculateRadialVelocity(this.startPositionLaunch, this.obstacle, {
      x: this.obstacle.xSpeed,
      y: this.obstacle.ySpeed,
    });

    const newFrequency = calculateNewFrequency(radialVelocity, this.frequency, SPEED_WAVE);

    if (newFrequency > this.frequency) {
      this.applyBlueShift(newFrequency);
    }

    if (newFrequency < this.frequency) {
      this.applyRedShift(newFrequency);
    }

    this.invertDirection();
    this.frequency = newFrequency;
  }

  render() {
    if (!this.isActive) return;

    this.updateLocation();
    this.updateScale();
    this.drawPulse();
    this.handleLifeRender();

    this.handleCollisionWithObstacle();
  }
}
