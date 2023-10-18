import { Canvas } from "../scenario/index";
import { Obstacle } from "../obstacle/index";
import { Pulse } from "./Pulse";
import { degreesToRadians, isColliding, loadImageCanvas, normalizeToClosestThousand, renderAndRotateImage } from "../utils";
import radarImageExternal from "./radar.png";
import { calculateTargetVelocity } from "./math/calculateTargetVelocity";

const MAX_FREQUENCY = 100000;
const SPEED_WAVE = 12345;
const FACTOR_UPDATE_NEW_FREQUENCY = 1000;

type sendFrequencyMapType = {
  timeLaunched: number;
  degree: number;
  xLaunch: number;
  yLaunch: number;
  timeReceived?: number;
  frequencyReceived?: number;
};

export type targetInformationType = {
  timeReceived: number;
  targetPosition: { x: number; y: number };
  estimatedDistance: number;
  radialSpeed: number;
};

export class Radar {
  private pulses: Pulse[] = [];
  private currentDegree: number;
  private canvas: Canvas;
  private obstacle: Obstacle;
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private frequency: number;

  private databasePulses: { [frequency: number]: sendFrequencyMapType };

  private radarImage: HTMLImageElement;

  constructor(canvas: Canvas, obstacle: Obstacle) {
    this.obstacle = obstacle;
    this.canvas = canvas;

    this.currentDegree = 0;
    this.x = 100;
    this.y = 300;
    this.width = 20;
    this.height = 20;
    this.frequency = 0;
    this.databasePulses = {};

    loadImageCanvas(radarImageExternal, (loadedImage) => {
      this.radarImage = loadedImage;
    });
  }

  private calculatePositionXYTarget = (radarOriginX: number, radarOriginY: number, distanceFromRadarHypotenuse: number, angleInDegrees: number) => {
    let angleInRadians = degreesToRadians(angleInDegrees);

    let adjacentLeg = distanceFromRadarHypotenuse * Math.cos(angleInRadians);
    let oppositeLeg = distanceFromRadarHypotenuse * Math.sin(angleInRadians);

    let x = adjacentLeg;
    let y = oppositeLeg;

    return {
      x,
      y,
    };
  };

  private handleReturnedPulses() {
    this.pulses.forEach((pulse) => {
      const pulseTouchedInRadar = isColliding(pulse, { x: this.x, y: this.y, width: this.width, height: this.height });

      if (!pulse.isActive || pulse.isInInitialDirection || !pulseTouchedInRadar) {
        return;
      }

      const realFrequency = normalizeToClosestThousand(pulse.frequency);
      if (!this.databasePulses[realFrequency]) {
        pulse.destroyPulse();
      }

      this.databasePulses[realFrequency] = {
        ...this.databasePulses[realFrequency],
        timeReceived: new Date().getTime(),
        frequencyReceived: pulse.frequency,
      };

      pulse.destroyPulse();
    });
  }

  calculateDistanceByLaunchAndReceivedTime(pulse: sendFrequencyMapType) {
    const deltaTime = pulse.timeReceived - pulse.timeLaunched;
    return (deltaTime * 800) / 2817;
  }

  calculateTargetInformation(pulse: sendFrequencyMapType, frequencyLaunched: number): targetInformationType {
    const estimatedDistance = this.calculateDistanceByLaunchAndReceivedTime(pulse);
    const targetPosition = this.calculatePositionXYTarget(this.x, this.y, estimatedDistance, pulse.degree);
    const radialSpeed = calculateTargetVelocity(pulse.frequencyReceived, frequencyLaunched, SPEED_WAVE);

    return {
      timeReceived: pulse.timeReceived,
      targetPosition,
      estimatedDistance,
      radialSpeed,
    };
  }

  getDetectTargets(): targetInformationType[] {
    const targets: targetInformationType[] = [];
    const frequenciesLaunched = Object.keys(this.databasePulses);

    frequenciesLaunched.forEach((frequencyLaunched) => {
      const pulse = this.databasePulses[frequencyLaunched] as sendFrequencyMapType;
      if (!pulse.timeReceived) {
        return;
      }

      targets.push(this.calculateTargetInformation(pulse, Number(frequencyLaunched)));
    });

    return targets;
  }

  private cleanup() {
    this.pulses = this.pulses.filter((pulse) => pulse.isActive);
  }

  private renderPulses() {
    this.pulses.forEach((pulse) => {
      pulse.render();
    });
  }

  updateFrequency() {
    this.frequency += FACTOR_UPDATE_NEW_FREQUENCY;
    if (this.frequency > MAX_FREQUENCY) {
      this.frequency = 0;
    }
  }

  updateDegree() {
    this.currentDegree += 3;
    if (this.currentDegree >= 360) {
      this.currentDegree = 0;
    }
  }

  drawRadarImage() {
    if (this.radarImage) {
      const x = this.x - 20;
      const y = this.y - 20;
      const width = this.width * 2;
      const height = this.height * 2;

      renderAndRotateImage(this.canvas.ctx, this.radarImage, this.currentDegree, x, y, width, height);
    }
  }

  launchPulse() {
    const angleInRadians = degreesToRadians(this.currentDegree);
    const pulseSpeed = 20;

    this.databasePulses[this.frequency] = {
      timeLaunched: new Date().getTime(),
      degree: this.currentDegree,
      xLaunch: this.x,
      yLaunch: this.y,
      timeReceived: undefined,
      frequencyReceived: undefined,
    };

    this.pulses.push(new Pulse(this.canvas, angleInRadians, pulseSpeed, this.x, this.y, this.frequency, this.obstacle, { x: this.x, y: this.y }));
  }

  render() {
    this.updateFrequency();
    this.updateDegree();
    this.drawRadarImage();
    this.launchPulse();
    this.renderPulses();
    this.cleanup();
    this.handleReturnedPulses();
  }
}
