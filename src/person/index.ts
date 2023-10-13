import { Canvas } from "./Canvas";
import { KeyBoardHandler } from "./KeyBoardHandler";
import { Person } from "./Person";

(async function () {
  const canvas = new Canvas();
  const keyboard = new KeyBoardHandler();
  const person = new Person(canvas, keyboard.keyboardState);

  await person.loadFiles();

  const draw = () => {
    canvas.canvasContext.clearRect(canvas.x, canvas.y, canvas.width, canvas.height);

    person.render();

    requestAnimationFrame(draw);
  };

  draw();
})();
