import { InteractionHandler } from "./InteractionHandler";
import { KeyBoardHandler } from "./KeyBoardHandler";
import { Obstacle } from "./obstacle/index";
import { Performance } from "./Performance";
import { Radar } from "./radar/index";
import { RadarScreen } from "./radarScreen/index";
import { Canvas } from "./scenario/index";
import { Ui } from "./Ui";
import { UiCanvas } from "./UiMainCanvas";

(function () {
  const mainCanvas = new Canvas();
  const keyboard = new KeyBoardHandler();

  const interactionMainScreen = new InteractionHandler(mainCanvas, keyboard);
  const uiCanvas = new UiCanvas(mainCanvas, interactionMainScreen);
  const obstacle = new Obstacle(mainCanvas, interactionMainScreen);

  const radarSystem = new Radar(mainCanvas, obstacle);
  const radarDisplay = new RadarScreen(radarSystem);

  const interactionRadarScreen = new InteractionHandler(radarDisplay, keyboard);
  const ui = new Ui(radarDisplay, interactionRadarScreen);
  radarDisplay.setInteractionHandler(interactionRadarScreen);
  interactionRadarScreen.setUi(ui);
  interactionMainScreen.setUi(uiCanvas);

  new Performance().render(() => {
    mainCanvas.render();
    obstacle.render();
    uiCanvas.render();
    radarSystem.render();
    interactionRadarScreen.render();
    interactionMainScreen.render();
    radarDisplay.render();
    ui.render();
  });
})();
