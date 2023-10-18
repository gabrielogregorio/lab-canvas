import { InteractionHandler } from "../InteractionHandler";
import { Radar, targetInformationType } from "../radar/index";
import { isColliding } from "../utils";

const TIME_IN_MS_TO_IGNORE_RECEIVED_DETECTIONS = 2000;
const MAX_RADAR_SCALE = 4;
const TIME_IN_MS_TO_IGNORE_KEYBOARD_ACTION = 500;

export class RadarScreen {
  x: number;
  y: number;
  width: number;
  height: number;

  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  radar: Radar;

  scale: number;

  interactionHandler: InteractionHandler;
  isInPreventMode: boolean;

  constructor(radar: Radar) {
    this.radar = radar;

    this.scale = 1;

    this.element = document.getElementById("canvas2") as HTMLCanvasElement;
    this.ctx = this.element.getContext("2d") as CanvasRenderingContext2D;
    this.isInPreventMode = false;
    this.x = 0;
    this.y = 0;
    this.width = 500;
    this.height = 500;
  }

  setInteractionHandler(interactionHandler: InteractionHandler) {
    this.interactionHandler = interactionHandler;
  }

  changeScale() {
    this.scale = this.scale * 2;
    if (this.scale > MAX_RADAR_SCALE) {
      this.scale = 1;
    }
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
      this.ctx.lineWidth = 1;
      this.ctx.arc(x, y, Math.floor(radius - factorEachArc * arc), startDegree, endDegree);
      this.ctx.closePath();
      this.ctx.stroke();
    });
  }

  getDetections() {
    return this.radar.getDetectTargets();
  }

  normalizeWithOnRadarCenter(x: number, y: number): { x: number; y: number } {
    return {
      x: x / this.scale + this.width / 2,
      y: y / this.scale + this.height / 2,
    };
  }

  removeNormalizationRadarCenter(x: number, y: number): { x: number; y: number } {
    return {
      x: x / this.scale - this.width / 2,
      y: y / this.scale - this.height / 2,
    };
  }

  isOutsideClusterZone(detection: targetInformationType, lastDetection: targetInformationType["targetPosition"]) {
    return !isColliding(
      {
        x: detection.targetPosition.x,
        y: detection.targetPosition.y,
        width: 50,
        height: 50,
      },
      {
        x: lastDetection.x,
        y: lastDetection.y,
        width: 50,
        height: 50,
      }
    );
  }

  drawInformationCluster(detection: targetInformationType) {
    this.ctx.fillStyle = "#44de3c";
    this.ctx.font = "bold 16px Verdana";
    this.ctx.textAlign = "center";

    const sizesUnNormalized = this.removeNormalizationRadarCenter(detection.targetPosition.x, detection.targetPosition.y);

    const targetXFloor = Math.floor(sizesUnNormalized.x);
    const targetYFloor = Math.floor(sizesUnNormalized.y);

    const radialSpeedTargetFixed = Number(detection.radialSpeed.toFixed(2)) || 0;

    const x = Math.floor(detection.targetPosition.x);
    const y = Math.floor(detection.targetPosition.y);

    const yNormalized = y > 0 ? y - 10 : y + 10;
    this.ctx.fillText(`xy(${targetXFloor}, ${targetYFloor}) rv=${radialSpeedTargetFixed}`, x, yNormalized);
  }

  drawClusterItem(detection: targetInformationType) {
    this.ctx.fillStyle = "#44de3c";
    this.ctx.fillRect(detection.targetPosition.x, detection.targetPosition.y, 10, 10);
  }

  drawDetections(detections: targetInformationType[]) {
    let lastDetection = { x: 0, y: 0 };

    this.ctx.beginPath();

    detections.forEach((detectionToIgnore) => {
      const targetNormalized = this.normalizeWithOnRadarCenter(detectionToIgnore.targetPosition.x, detectionToIgnore.targetPosition.y);
      const detectionNormalized: targetInformationType = { ...detectionToIgnore, targetPosition: targetNormalized };

      const detectionIsVeryOld = new Date().getTime() - detectionNormalized.timeReceived > TIME_IN_MS_TO_IGNORE_RECEIVED_DETECTIONS;
      if (detectionIsVeryOld) {
        return;
      }

      if (this.isOutsideClusterZone(detectionNormalized, lastDetection)) {
        lastDetection = {
          x: detectionNormalized.targetPosition.x,
          y: detectionNormalized.targetPosition.y,
        };

        this.drawInformationCluster(detectionNormalized);
      }

      this.drawClusterItem(detectionNormalized);
    });

    this.ctx.closePath();
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.interactionHandler.keyboardState.KeyQ && !this.isInPreventMode) {
      this.isInPreventMode = true;

      this.changeScale();

      setTimeout(() => {
        this.isInPreventMode = false;
      }, TIME_IN_MS_TO_IGNORE_KEYBOARD_ACTION);
    }

    this.drawRadarCircle();
    this.drawDetections(this.getDetections());
    this.ctx.closePath();
  }
}
