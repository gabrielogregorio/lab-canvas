import { Canvas } from "./Canvas";
import { KeyBoardHandler } from "./KeyBoardHandler";
import { Obstacle } from "./Obstacle";
import { Performance } from "./Performance";
import { Radar } from "./Radar";
import { RadarScreen } from "./RadarScreen";

(function () {
  const mainCanvas = new Canvas();
  const keyboard = new KeyBoardHandler();
  const obstacle = new Obstacle(mainCanvas, keyboard);
  const radar = new Radar(mainCanvas, obstacle);
  const RadarCanvas = new RadarScreen(radar);

  new Performance().render(() => {
    mainCanvas.ctx.clearRect(mainCanvas.x, mainCanvas.y, mainCanvas.width, mainCanvas.height);

    obstacle.render();
    radar.render();

    RadarCanvas.render();
  });
})();
