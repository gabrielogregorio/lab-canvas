import { Canvas } from "./Canvas";
import { RadarSystem } from "./RadarSystem";
import { KeyBoardHandler } from "./KeyBoardHandler";
import { HostileArtifact } from "./HostileArtifact";
import { randomizeWindSpeed } from "./utils";
import { buildHostileArtifact } from "./buildHostileArtifact";
import { HostileArtifactControlled } from "./HostileArtifactControlled";
import { InteractionHandler } from "./InteractionHandler";
import { Ui } from "./Ui";

let windSpeed = 0;
let launchControlledMisseble = false;

(function () {
  const canvas = new Canvas();
  const keyboardLocal = new KeyBoardHandler();
  const interactionHandler = new InteractionHandler(canvas, keyboardLocal);
  const hostileArtifacts: HostileArtifact[] = [];
  const radarSystem = new RadarSystem(hostileArtifacts, canvas);
  const ui = new Ui(canvas, interactionHandler);
  const TIME_IN_MS_TO_PREVINE_MULTIPLES_TOUCHS = 200;

  interactionHandler.setUi(ui);
  let previneMultiplesActions = false;
  let hiddenTrace = true;

  function bootstrap() {
    if (hiddenTrace) {
      canvas.contextCanvas.clearRect(0, 0, canvas.width, canvas.height);
    }

    if (interactionHandler.keyboardState.KeyF && !previneMultiplesActions) {
      hiddenTrace = !hiddenTrace;

      previneMultiplesActions = true;

      setTimeout(() => {
        previneMultiplesActions = false;
      }, TIME_IN_MS_TO_PREVINE_MULTIPLES_TOUCHS);
    }

    ui.render();
    canvas.render();
    radarSystem.render();
    interactionHandler.render();

    windSpeed = randomizeWindSpeed(windSpeed);

    if (interactionHandler.keyboardState.KeyQ) {
      if (!launchControlledMisseble) {
        launchControlledMisseble = true;
        hostileArtifacts.push(
          new HostileArtifactControlled(canvas, { color: "#1177ff", keyState: interactionHandler, horizontalSpeedInitial: 0, verticalSpeedInitial: 5, startX: 100 })
        );
        const timeInMsToAllowNewLaunchControlledMissble = 500;
        setTimeout(() => {
          launchControlledMisseble = false;
        }, timeInMsToAllowNewLaunchControlledMissble);
      }
    }
    if (interactionHandler.keyboardState.KeyE) {
      hostileArtifacts.push(buildHostileArtifact(canvas, Math.random() * 350));
    }

    hostileArtifacts.forEach((hostileArtifact) => {
      hostileArtifact.render(windSpeed);
    });

    requestAnimationFrame(bootstrap);
  }

  requestAnimationFrame(bootstrap);
})();
