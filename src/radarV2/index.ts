import { KeyBoardHandler } from "./KeyBoardHandler";
import { Obstacle } from "./obstacle/index";
import { Performance } from "./Performance";
import { Radar } from "./radar/index";
import { RadarScreen } from "./radarScreen/index";
import { Canvas } from "./scenario/index";

(function () {
  const mainCanvas = new Canvas();
  const keyboard = new KeyBoardHandler();

  const obstacle = new Obstacle(mainCanvas, keyboard);
  const radarSystem = new Radar(mainCanvas, obstacle);
  const RadarDisplay = new RadarScreen(radarSystem);

  new Performance().render(() => {
    mainCanvas.ctx.clearRect(mainCanvas.x, mainCanvas.y, mainCanvas.width, mainCanvas.height);
    mainCanvas.render();

    obstacle.render();

    radarSystem.render();
    RadarDisplay.render();
  });
})();
