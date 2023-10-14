import { Canvas } from "./Canvas";
import { HostileArtifact } from "./HostileArtifact";
import { generateRgbCss } from "./utils";

export const buildHostileArtifact = (canvas: Canvas, startX: number): HostileArtifact => {
  const hostileArtifact = new HostileArtifact(canvas, {
    color: generateRgbCss(),
    horizontalSpeedInitial: 150 + (Math.random() - 0.5 * 30),
    verticalSpeedInitial: 500 + (Math.random() - 0.5) + (Math.random() > 0.7 ? Math.random() * 150 : 0),
    startX: startX,
  });

  return hostileArtifact;
};
