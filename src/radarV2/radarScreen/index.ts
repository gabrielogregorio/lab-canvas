import { Radar, targetInformationType } from "../radar/index";
import { isColliding } from "../utils";

const TIME_IN_MS_TO_IGNORE_RECEIVED_DETECTIONS = 2000;

export class RadarScreen {
  x: number;
  y: number;
  width: number;
  height: number;

  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  radar: Radar;

  constructor(radar: Radar) {
    this.radar = radar;

    this.element = document.getElementById("canvas2") as HTMLCanvasElement;
    this.ctx = this.element.getContext("2d") as CanvasRenderingContext2D;

    this.x = 0;
    this.y = 0;
    this.width = 500;
    this.height = 500;
  }

  drawRadarCircle() {
    const startDegree = 0;
    const endDegree = 2 * Math.PI;

    const x = this.width / 2;
    const y = this.height / 2;

    const factorEachArc = 50;
    const radius = x;

    const arcs = [0, 1, 2, 3, 4];

    arcs.forEach((arc) => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = "#44de3c";
      this.ctx.arc(x, y, Math.floor(radius - factorEachArc * arc), startDegree, endDegree);
      this.ctx.stroke();
      this.ctx.closePath();
    });
  }

  getDetections() {
    return this.radar.getDetectTargets();
  }

  isOutsideClusterZone(detection: targetInformationType, lastDetection) {
    return !isColliding(
      {
        x: detection.targetPosition.x / 3,
        y: detection.targetPosition.y / 3,
        width: 30,
        height: 30,
      },
      {
        x: lastDetection.x,
        y: lastDetection.y,
        width: 30,
        height: 30,
      }
    );
  }

  drawInformationCluster(detection: targetInformationType) {
    this.ctx.fillStyle = "#44de3c";
    this.ctx.font = "16px Arial";
    this.ctx.textAlign = "center";

    const targetXFloor = Math.floor(detection.targetPosition.x);
    const targetYFloor = Math.floor(detection.targetPosition.y);

    const radialSpeedTargetFixed = Number(detection.radialSpeed.toFixed(2));

    const x = Math.floor(detection.targetPosition.x / 3);
    const y = Math.floor(detection.targetPosition.y / 3) - 10;
    this.ctx.fillText(`xy=(${targetXFloor}, ${targetYFloor}) radialV=${radialSpeedTargetFixed}`, x, y);
  }

  drawClusterItem(detection: targetInformationType) {
    this.ctx.fillStyle = "#44de3c";
    this.ctx.fillRect(detection.targetPosition.x / 3, detection.targetPosition.y / 3, 10, 10);
  }

  drawDetections(detections: targetInformationType[]) {
    let lastDetection = { x: 0, y: 0 };

    this.ctx.beginPath();

    detections.forEach((detection) => {
      const detectionIsVeryOld = new Date().getTime() - detection.timeReceived > TIME_IN_MS_TO_IGNORE_RECEIVED_DETECTIONS;
      if (detectionIsVeryOld) {
        return;
      }

      if (this.isOutsideClusterZone(detection, lastDetection)) {
        this.drawInformationCluster(detection);

        lastDetection = {
          x: detection.targetPosition.x / 3,
          y: detection.targetPosition.y / 3,
        };
      }

      this.drawClusterItem(detection);
    });

    this.ctx.closePath();
  }

  render() {
    this.ctx.clearRect(0, 0, 500, 500);

    this.drawRadarCircle();
    this.drawDetections(this.getDetections());
  }
}
