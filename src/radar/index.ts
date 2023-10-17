import { Canvas } from "./Canvas";
import { KeyBoardHandler } from "./KeyBoardHandler";
import { Performance } from "./Performanc";
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

class RadarHandler {
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
        // delete this.frequencySendList[key];
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

class Obstacle {
  canvas: Canvas;
  x: number;
  y: number;
  width: number;
  height: number;
  keyboard: KeyBoardHandler;

  constructor(canvas: Canvas, keyboardHandler: KeyBoardHandler) {
    this.keyboard = keyboardHandler;
    this.canvas = canvas;
    this.x = 300;
    this.y = 200;
    this.width = 10;
    this.height = 10;
  }

  render() {
    console.log(this.keyboard.keyboardState, this.y);
    if (this.keyboard.keyboardState.top) {
      this.y -= 1;
    }

    if (this.keyboard.keyboardState.bottom) {
      this.y += 1;
    }

    if (this.keyboard.keyboardState.left) {
      this.x -= 1;
    }

    if (this.keyboard.keyboardState.right) {
      this.x += 1;
    }

    if (this.keyboard.keyboardState.KeyQ) {
      this.width -= 5;
      this.height -= 5;
    }

    if (this.keyboard.keyboardState.KeyE) {
      this.width += 5;
      this.height += 5;
    }

    this.canvas.ctx.beginPath();
    this.canvas.ctx.fillStyle = "#ff2222";
    this.canvas.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.canvas.ctx.closePath();
  }
}

(function () {
  const canvas = new Canvas("canvas");
  const canvas2 = new Canvas("canvas2");
  const keyboard = new KeyBoardHandler();

  const obstacle = new Obstacle(canvas, keyboard);
  const radar = new RadarHandler(canvas, obstacle);
  new Performance().render(() => {
    canvas.ctx.clearRect(canvas.x, canvas.y, canvas.width, canvas.height);
    radar.render();
    obstacle.render();

    const objects = radar.mapObjects();
    canvas2.ctx.clearRect(0, 0, 500, 500);

    canvas2.ctx.arc(250, 250, 250, 0, 2 * Math.PI);
    canvas2.ctx.strokeStyle = "#44de3c";
    canvas2.ctx.stroke();

    objects.forEach((item) => {
      console.log(new Date().getTime(), item.timeRecieved);
      if (new Date().getTime() - item.timeRecieved <= 3000) {
        canvas2.ctx.beginPath();

        canvas2.ctx.fillStyle = "#44de3c";
        canvas2.ctx.fillRect(item.targetX, item.targetY, 10, 10);
        canvas2.ctx.closePath();
      }
    });
  });
})();
