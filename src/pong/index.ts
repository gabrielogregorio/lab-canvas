import { Ball } from "./Ball";
import { Canvas } from "./Canvas";
import { KeyBoardHandler } from "./KeyBoardHandler";
import { Orquestrer } from "./Orquestrer";
import { Pad } from "./Pad";
import { Sound } from "./Sound";

(async function () {
  const keyboard = new KeyBoardHandler();
  const orquestrer = new Orquestrer();
  const canvas = new Canvas(orquestrer);
  const player1 = new Pad(canvas, orquestrer, "Left");
  const player2 = new Pad(canvas, orquestrer, "Right");

  const sound = new Sound();
  const ball = new Ball(canvas, player1, player2, sound, orquestrer);

  const draw = () => {
    canvas.canvasContext.clearRect(canvas.x, canvas.y, canvas.width, canvas.height);

    player1.setKeyboardState({
      left: keyboard.keyboardState.KeyA,
      right: keyboard.keyboardState.KeyD,
      top: keyboard.keyboardState.KeyW,
      bottom: keyboard.keyboardState.KeyS,
      turbo: keyboard.keyboardState.ShiftLeft,
    });

    player2.setKeyboardState({
      left: keyboard.keyboardState.ArrowLeft,
      right: keyboard.keyboardState.ArrowRight,
      top: keyboard.keyboardState.ArrowUp,
      bottom: keyboard.keyboardState.ArrowDown,
      turbo: keyboard.keyboardState.Numpad0,
    });

    player1.render();
    player2.render();
    ball.render();
    canvas.render();

    if (keyboard.keyboardState.Space) {
      orquestrer.start();
    }

    requestAnimationFrame(draw);
  };

  draw();
})();
