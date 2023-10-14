import { Canvas } from "./Canvas";
import { RadarSystem } from "./RadarSystem";
import { KeyBoardHandler } from "./KeyBoardHandler";
import { HostileArtifact } from "./HostileArtifact";
import { randomizeWindSpeed } from "./utils";
import { buildHostileArtifact } from "./buildHostileArtifact";

let windSpeed = 0;

(function () {
  const canvas = new Canvas();
  const keyboard = new KeyBoardHandler();

  const hostileArtifacts: HostileArtifact[] = [];
  const radarSystem = new RadarSystem(hostileArtifacts, canvas);

  function bootstrap() {
    canvas.contextCanvas.clearRect(0, 0, canvas.width, canvas.height);

    canvas.render();
    radarSystem.render();

    windSpeed = randomizeWindSpeed(windSpeed);

    if (keyboard.keyboardState.space) {
      hostileArtifacts.push(buildHostileArtifact(canvas, Math.random() * 350));
    }

    hostileArtifacts.forEach((hostileArtifact) => {
      hostileArtifact.render(windSpeed);
    });

    requestAnimationFrame(bootstrap);
  }

  requestAnimationFrame(bootstrap);
})();
