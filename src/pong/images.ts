import { Ai } from "./Ai";
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
  const person = new Pad(canvas, keyboard.keyboardState, orquestrer);
  const ai = new Ai(canvas, orquestrer);
  const sound = new Sound();
  const ball = new Ball(canvas, person, ai, sound, orquestrer);

  ai.setBall(ball);

  const draw = () => {
    canvas.canvasContext.clearRect(canvas.x, canvas.y, canvas.width, canvas.height);

    person.render();
    ai.render();
    ball.render();
    canvas.render();

    if (keyboard.keyboardState.space) {
      orquestrer.start();
    }

    requestAnimationFrame(draw);
  };

  draw();
})();
