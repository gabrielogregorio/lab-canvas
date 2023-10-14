import { Canvas } from "./Canvas";
import { DefenseMissiles } from "./DefenseMissiles";
import { HostileArtifact } from "./HostileArtifact";
const minHeightToFlight = 30;
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

  launchDefensibleMissile(hostileArtifact: HostileArtifact) {
    this.defenseMissilesByIdHostileArtifacts[hostileArtifact.id] = new DefenseMissiles(this.canvas, hostileArtifact);
  }

  findDefensibleMissileDestroyedAndFix() {
    this.hostileArtifacts.forEach((hostileArtifact) => {
      if (hostileArtifact.isGoing && hostileArtifact.y > minHeightToFlight) {
        if (this.defenseMissilesByIdHostileArtifacts[hostileArtifact.id].missionIsDone) {
          this.launchDefensibleMissile(hostileArtifact);
        }
      }
    });
  }

  render() {
    this.hostileArtifacts.forEach((hostileArtifact) => {
      const artifactAreDetected = this.hostileArtifactsDetected.includes(hostileArtifact.id);

      if (!artifactAreDetected) {
        this.launchDefensibleMissile(hostileArtifact);
        this.hostileArtifactsDetected.push(hostileArtifact.id);
      }
    });

    this.hostileArtifactsDetected.forEach((hostileArtifactsId) => {
      this.defenseMissilesByIdHostileArtifacts?.[hostileArtifactsId]?.render();
    });

    this.findDefensibleMissileDestroyedAndFix();
  }
}
