import { Radar } from "./Radar";
import { isColliding } from "./utils";

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

    let lastDetection: { x: number; y: number } = { x: 0, y: 0 };

    detections.forEach((item) => {
      if (new Date().getTime() - item.timeRecieved <= 2000) {
        this.ctx.beginPath();

        if (
          !isColliding(
            {
              x: item.targetX / 3,
              y: item.targetY / 3,
              width: 30,
              height: 30,
            },
            {
              x: lastDetection.x,
              y: lastDetection.y,
              width: 30,
              height: 30,
            }
          )
        ) {
          this.ctx.fillStyle = "#44de3c";
          this.ctx.font = "16px Arial";
          this.ctx.textAlign = "center";
          this.ctx.fillText(
            `X=${Math.floor(item.targetX)} Y=${Math.floor(item.targetY)} RV=${Number(item.RadialVelocityTarget.toFixed(2))}`,
            Math.floor(item.targetX / 3),
            Math.floor(item.targetY / 3) - 10
          );

          lastDetection = {
            x: item.targetX / 3,
            y: item.targetY / 3,
          };
        }

        this.ctx.fillStyle = "#44de3c";
        this.ctx.fillRect(item.targetX / 3, item.targetY / 3, 10, 10);
        this.ctx.closePath();
      }
    });
  }
}
