import { Canvas } from "./Canvas";
import { KeyBoardHandler } from "./KeyBoardHandler";
import { Obstacle } from "./Obstacle";
import { Performance } from "./Performanc";
import { RadarHandler } from "./RadarHandler";
import { RadarScreen } from "./RadarScreen";

(function () {
  const baseScreenCanvas = new Canvas();
  const keyboard = new KeyBoardHandler();
  const obstacle = new Obstacle(baseScreenCanvas, keyboard);
  const radarHandler = new RadarHandler(baseScreenCanvas, obstacle);
  const radarScreenCanvas = new RadarScreen();

  new Performance().render(() => {
    baseScreenCanvas.ctx.clearRect(baseScreenCanvas.x, baseScreenCanvas.y, baseScreenCanvas.width, baseScreenCanvas.height);
    obstacle.render();

    radarHandler.render();

    radarScreenCanvas.render(radarHandler.mapObjects());
  });
})();
