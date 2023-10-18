import { InteractionHandler } from "./InteractionHandler";
import { KeyBoardHandler } from "./KeyBoardHandler";
import { Obstacle } from "./obstacle/index";
import { Performance } from "./Performance";
import { Radar } from "./radar/index";
import { RadarScreen } from "./radarScreen/index";
import { Canvas } from "./scenario/index";
import { Ui } from "./Ui";

(function () {
  const mainCanvas = new Canvas();
  const keyboard = new KeyBoardHandler();
  const obstacle = new Obstacle(mainCanvas, keyboard);
  const radarSystem = new Radar(mainCanvas, obstacle);
  const radarDisplay = new RadarScreen(radarSystem);
  const interactionHandler = new InteractionHandler(radarDisplay, keyboard);
  const ui = new Ui(radarDisplay, interactionHandler);

  radarDisplay.setInteractionHandler(interactionHandler);
  interactionHandler.setUi(ui);

  new Performance().render(() => {
    mainCanvas.render();
    obstacle.render();
    radarSystem.render();
    interactionHandler.render();
    radarDisplay.render();
    ui.render();
  });
})();
