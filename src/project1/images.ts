import { KeyBoardHandler } from "./KeyBoardHandler";
import { Person } from "./Person";

(async function () {
  const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
  const canvasContext = canvasElement.getContext("2d") as CanvasRenderingContext2D;

  const keyboard = new KeyBoardHandler();
  const person = new Person(canvasContext, keyboard.keyboardState);

  await person.loadFiles();

  const draw = () => {
    canvasContext.clearRect(0, 0, 500, 500);

    person.render();

    requestAnimationFrame(draw);
  };

  draw();
})();
