import { Canvas } from "./Canvas";
import { Obstacle } from "./Obstacle";
import { Pulse } from "./Pulse";
import { calculateNewFrequency, calculateRadialVelocity, calculateTargetVelocity } from "./dopplerUtils";
import { calculatePositionXYTarget, isColliding, normalizeToClosestThousand } from "./utils";

const maxNumberToExcedsHex = 100000;
const max2Frequencty = 10000000;
type sendFrequencyMapType = {
  timeStart: number;
  angle0360: number;
  xStart: number;
  yStart: number;
  timeRecievid?: number;
  frequencyRecieved?: number;
};

export class Radar {
  pulses: Pulse[] = [];
  angle0360: number;
  angle0360V2: number;
  canvas: Canvas;
  obstacle: Obstacle;
  xSendPulses: number;
  ySendPulses: number;
  width: number;
  height: number;
  frequency: number;
  frequency2: number;
  frequencyGapToDoppler: number;
  frequencySendList: { [frequency: number]: sendFrequencyMapType };

  constructor(canvas: Canvas, obstacle: Obstacle) {
    this.obstacle = obstacle;
    this.canvas = canvas;
    this.angle0360 = 0;
    this.angle0360V2 = 180;
    this.xSendPulses = 100;
    this.ySendPulses = 300;
    this.width = 20;
    this.height = 20;
    this.frequency = 0;
    this.frequency2 = maxNumberToExcedsHex;

    this.frequencyGapToDoppler = 1000;
    this.frequencySendList = {};
  }

  detectReport() {
    this.pulses.forEach((pulse) => {
      if (
        pulse.isActive &&
        !pulse.isInInitialDirection &&
        isColliding(
          { x: pulse.x, y: pulse.y, width: pulse.sizeWidth, height: pulse.sizeHeight },
          { x: this.xSendPulses, y: this.ySendPulses, width: this.width, height: this.height }
        )
      ) {
        const probablyRealFrequency = normalizeToClosestThousand(pulse.publicFrequency);
        this.frequencySendList[probablyRealFrequency] = {
          ...this.frequencySendList[probablyRealFrequency],
          timeRecievid: new Date().getTime(),
          frequencyRecieved: pulse.publicFrequency,
        };

        pulse.deactivate();
      }
    });
  }

  mapObjects() {
    const returnItems: { targetX: number; targetY: number; timeRecieved: number; RadialVelocityTarget: number }[] = [];
    const keys = Object.keys(this.frequencySendList);

    keys.forEach((key) => {
      if (this.frequencySendList[key].timeRecievid) {
        const deltaTime = this.frequencySendList[key].timeRecievid - this.frequencySendList[key].timeStart;
        const estimatedDistance = (deltaTime * 800) / 2817;

        const data = calculatePositionXYTarget(this.xSendPulses, this.ySendPulses, estimatedDistance, this.frequencySendList[key].angle0360);

        const RadialVelocityTarget = calculateTargetVelocity(this.frequencySendList[key].frequencyRecieved, Number(key), 12345);
        returnItems.push({ ...data, timeRecieved: this.frequencySendList[key].timeRecievid, RadialVelocityTarget });
      }
    });
    return returnItems;
  }

  deactivatePulse(pulse: Pulse) {
    pulse.deactivate();
  }

  cleanup() {
    this.pulses = this.pulses.filter((pulse) => pulse.isActive);
  }

  renderPulses() {
    this.pulses.forEach((pulse) => {
      pulse.render();

      if (pulse.isInInitialDirection && isColliding({ x: pulse.x, y: pulse.y, width: pulse.sizeWidth, height: pulse.sizeHeight }, this.obstacle)) {
        pulse.returnDirection();

        const radialVelocity = calculateRadialVelocity(
          { x: this.xSendPulses, y: this.ySendPulses },

          {
            x: this.obstacle.x,
            y: this.obstacle.y,
          },
          {
            x: this.obstacle.xVelocity,
            y: this.obstacle.yVelocity,
          }
        );

        Math.sqrt(this.obstacle.xVelocity * this.obstacle.xVelocity + this.obstacle.yVelocity * this.obstacle.yVelocity);
        pulse.publicFrequency = calculateNewFrequency(radialVelocity, pulse.publicFrequency, 12345);
      }
    });
  }

  render() {
    this.canvas.ctx.beginPath();
    this.canvas.ctx.fillStyle = "#222222";
    this.canvas.ctx.fillRect(this.xSendPulses, this.ySendPulses, this.width, this.height);
    this.canvas.ctx.closePath();

    this.frequency += this.frequencyGapToDoppler;
    this.frequency2 += this.frequencyGapToDoppler;

    if (this.frequency > maxNumberToExcedsHex) {
      this.frequency = 0;
    }

    if (this.frequency2 > max2Frequencty) {
      this.frequency2 = maxNumberToExcedsHex + this.frequencyGapToDoppler;
    }

    this.angle0360 += 3;
    if (this.angle0360 >= 360) {
      this.angle0360 = 0;
    }

    this.angle0360V2 += 3;
    if (this.angle0360V2 >= 360) {
      this.angle0360V2 = 0;
    }

    const angleInRadians = this.angle0360 * (Math.PI / 180);
    const pulseSpeed = 20;
    this.frequencySendList[this.frequency] = {
      timeStart: new Date().getTime(),
      angle0360: this.angle0360,
      xStart: this.xSendPulses,
      yStart: this.ySendPulses,
      timeRecievid: undefined,
      frequencyRecieved: undefined,
    };
    this.pulses.push(new Pulse(this.canvas, angleInRadians, pulseSpeed, this.xSendPulses, this.ySendPulses, this.frequency));

    //

    const angleInRadiansV2 = this.angle0360V2 * (Math.PI / 180);
    const pulseSpeedV2 = 15;
    this.frequencySendList[this.frequency2] = {
      timeStart: new Date().getTime(),
      angle0360: this.angle0360V2,
      xStart: this.xSendPulses,
      yStart: this.ySendPulses,
      timeRecievid: undefined,
      frequencyRecieved: undefined,
    };
    this.pulses.push(new Pulse(this.canvas, angleInRadiansV2, pulseSpeedV2, this.xSendPulses, this.ySendPulses, this.frequency2));

    this.renderPulses();

    this.cleanup();

    this.detectReport();
  }
}
