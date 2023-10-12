import { Person } from "./Person";
import { keyboardStateType } from "./types";

(async function () {
  const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
  const canvasContext = canvasElement.getContext("2d") as CanvasRenderingContext2D;

  let keyboardState: keyboardStateType = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  const person = new Person(canvasContext, keyboardState);

  await person.loadFiles();

  const moves = {
    w(newValue) {
      keyboardState.top = newValue;
    },
    s(newValue) {
      keyboardState.bottom = newValue;
    },
    a(newValue) {
      keyboardState.left = newValue;
    },
    d(newValue) {
      keyboardState.right = newValue;
    },
  };

  window.addEventListener("keydown", (event) => {
    moves[event.key]?.(true);
  });

  window.addEventListener("keyup", (event) => {
    moves[event.key]?.(false);
  });

  const draw = () => {
    canvasContext.clearRect(0, 0, 500, 500);

    person.render();

    requestAnimationFrame(draw);
  };

  draw();
})();
