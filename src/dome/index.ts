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
    windSpeed += Math.random() * 2;
    if (windSpeed > 20) {
      windSpeed = 20;
    }

    if (windSpeed < -20) {
      windSpeed = -20;
    }

    if (keyboard.keyboardState.space) {
      const misseble = new Rocket(canvas, { color: randomRGB(), horizontalSpeedInitial: 100 + (Math.random() - 0.5) * 20, verticalSpeedInitial: 500 + (Math.random() - 0.5) * 20 });
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
