import { Canvas } from "./Canvas";
import { Obstacle } from "./Obstacle";
import { Pulse } from "./Pulse";
import { calculatePositionXYTarget, isColliding } from "./utils";

const maxNumberToExcedsHex = 100000;

type sendFrequencyMapType = {
  timeStart: number;
  angle0360: number;
  xStart: number;
  yStart: number;
  timeRecievid?: number;
  frequencyRecieved?: number;
};

export class RadarHandler {
  pulses: Pulse[] = [];
  angle0360: number;
  canvas: Canvas;
  obstacle: Obstacle;
  xSendPulses: number;
  ySendPulses: number;
  width: number;
  height: number;
  frequency: number;
  frequencyGapToDoppler: number;
  frequencySendList: { [frequency: number]: sendFrequencyMapType };

  constructor(canvas: Canvas, obstacle: Obstacle) {
    this.obstacle = obstacle;
    this.canvas = canvas;
    this.angle0360 = 0;
    this.xSendPulses = 100;
    this.ySendPulses = 300;
    this.width = 20;
    this.height = 20;
    this.frequency = 0;
    this.frequencyGapToDoppler = 100;
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
        this.frequencySendList[pulse.publicFrequency] = {
          ...this.frequencySendList[pulse.publicFrequency],
          timeRecievid: new Date().getTime(),
          frequencyRecieved: pulse.publicFrequency,
        };

        pulse.deactivate();
      }
    });
  }

  mapObjects() {
    const returnItems: { targetX: number; targetY: number; timeRecieved: number }[] = [];
    const keys = Object.keys(this.frequencySendList);
    keys.forEach((key) => {
      if (this.frequencySendList[key].timeRecievid) {
        const deltaTime = this.frequencySendList[key].timeRecievid - this.frequencySendList[key].timeStart;
        const estimatedDistance = (deltaTime * 200) / 3117;

        const data = calculatePositionXYTarget(this.xSendPulses, this.ySendPulses, estimatedDistance, this.frequencySendList[key].angle0360);
        returnItems.push({ ...data, timeRecieved: this.frequencySendList[key].timeRecievid });
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
      }
    });
  }

  render() {
    this.canvas.ctx.beginPath();
    this.canvas.ctx.fillStyle = "#4411ff";
    this.canvas.ctx.fillRect(this.xSendPulses, this.ySendPulses, this.width, this.height);
    this.canvas.ctx.closePath();

    this.frequency += this.frequencyGapToDoppler;
    if (this.frequency > maxNumberToExcedsHex) {
      this.frequency = 0;
    }

    this.angle0360 += 5;
    if (this.angle0360 >= 360) {
      this.angle0360 = 0;
    }
    const angleInRadians = this.angle0360 * (Math.PI / 180);
    const pulseSpeed = 10;
    this.frequencySendList[this.frequency] = {
      timeStart: new Date().getTime(),
      angle0360: this.angle0360,
      xStart: this.xSendPulses,
      yStart: this.ySendPulses,
      timeRecievid: undefined,
      frequencyRecieved: undefined,
    };

    this.pulses.push(new Pulse(this.canvas, angleInRadians, pulseSpeed, this.xSendPulses, this.ySendPulses, this.frequency));

    this.renderPulses();

    this.cleanup();

    this.detectReport();
  }
}
