import { Canvas } from "./Canvas";
import { KeyBoardHandler } from "./KeyBoardHandler";
import { Rocket } from "./Rocket";

function randomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

(function () {
  const canvas = new Canvas();
  const keyboard = new KeyBoardHandler();
  let windSpeed = 0;

  const misslebles: Rocket[] = [];

  function drawMissile() {
    canvas.contextCanvas.clearRect(0, 0, canvas.width, canvas.height);
    canvas.render();
    windSpeed += Math.random() * 10;
    if (windSpeed > 50) {
      windSpeed = 50;
    }

    if (windSpeed < -50) {
      windSpeed = -50;
    }

    if (keyboard.keyboardState.space) {
      const misseble = new Rocket(canvas, {
        color: randomRGB(),
        horizontalSpeedInitial: 200 + (Math.random() - 0.5) * 100,
        verticalSpeedInitial: 500 + (Math.random() - 0.5) * 100,
      });
      misseble.launch();
      misslebles.push(misseble);
    }

    misslebles.forEach((missible) => {
      missible.render(windSpeed);
    });

    requestAnimationFrame(drawMissile);
  }

  requestAnimationFrame(drawMissile);
})();
