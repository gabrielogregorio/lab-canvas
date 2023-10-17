import { Radar } from "./Radar";

type radarDetectionsType = {
  targetX: number;
  targetY: number;
  timeRecieved: number;
};

export class RadarScreen {
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  radar: Radar;

  constructor(radar: Radar) {
    this.radar = radar;

    this.element = document.getElementById("canvas2") as HTMLCanvasElement;
    this.ctx = this.element.getContext("2d") as CanvasRenderingContext2D;

    this.x = 0;
    this.y = 0;
    this.width = 1000;
    this.height = 500;
  }

  render() {
    const detections = this.radar.mapObjects();

    this.ctx.clearRect(0, 0, 500, 500);

    this.ctx.arc(250, 250, 250, 0, 2 * Math.PI);
    this.ctx.strokeStyle = "#44de3c";
    this.ctx.stroke();

    detections.forEach((item) => {
      if (new Date().getTime() - item.timeRecieved <= 3000) {
        this.ctx.beginPath();

        this.ctx.fillStyle = "#44de3c";
        this.ctx.font = "16px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(` Radial velocity ${Number(item.RadialVelocityTarget.toFixed(2))}`, item.targetX, item.targetY - 10);

        this.ctx.fillStyle = "#44de3c";
        this.ctx.fillRect(item.targetX, item.targetY, 10, 10);
        this.ctx.closePath();
      }
    });
  }
}
