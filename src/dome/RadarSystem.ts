import { Canvas } from "./Canvas";
import { DefenseMissiles } from "./DefenseMissiles";
import { HostileArtifact } from "./HostileArtifact";

const MIN_HEIGHT_IN_PX_TO_DETECT_HOSTILE_ARTIFACTS = 200;

export class RadarSystem {
  canvas: Canvas;

  hostileArtifacts: HostileArtifact[];
  hostileArtifactsDetected: number[];
  defenseMissilesByIdHostileArtifacts: { [key: string]: DefenseMissiles };

  constructor(hostileArtifacts: HostileArtifact[], canvas: Canvas) {
    this.canvas = canvas;
    this.defenseMissilesByIdHostileArtifacts = {};
    this.hostileArtifacts = hostileArtifacts;
    this.hostileArtifactsDetected = [];
  }

  render() {
    this.hostileArtifacts.forEach((hostileArtifact) => {
      const artifactAreDetected = this.hostileArtifactsDetected.includes(hostileArtifact.id);

      if (!artifactAreDetected && hostileArtifact.y > MIN_HEIGHT_IN_PX_TO_DETECT_HOSTILE_ARTIFACTS) {
        this.defenseMissilesByIdHostileArtifacts[hostileArtifact.id] = new DefenseMissiles(this.canvas, hostileArtifact);

        this.hostileArtifactsDetected.push(hostileArtifact.id);
      }
    });

    this.hostileArtifactsDetected.forEach((hostileArtifactsId) => {
      this.defenseMissilesByIdHostileArtifacts?.[hostileArtifactsId]?.render();
    });
  }
}
