import { Canvas } from "./Canvas";
import { HostileArtifact } from "./HostileArtifact";
import { generateRgbCss } from "./utils";

export const buildHostileArtifact = (canvas: Canvas): HostileArtifact => {
  const hostileArtifact = new HostileArtifact(canvas, {
    color: generateRgbCss(),
    horizontalSpeedInitial: 200 + (Math.random() - 0.5) * 100 + (Math.random() > 0.9 ? Math.random() * 80 : 0),
    verticalSpeedInitial: 500 + (Math.random() - 0.5) * 100 + (Math.random() > 0.9 ? Math.random() * 80 : 0),
  });

  return hostileArtifact;
};
