import { keyboardStateType } from "./types";

export class KeyBoardHandler {
  keyboardState: keyboardStateType;
  constructor() {
    this.keyboardState = {
      top: false,
      left: false,
      bottom: false,
      right: false,
    };

    const moves = {
      w: (newValue) => {
        this.keyboardState.top = newValue;
      },
      s: (newValue) => {
        this.keyboardState.bottom = newValue;
      },
      a: (newValue) => {
        this.keyboardState.left = newValue;
      },
      d: (newValue) => {
        this.keyboardState.right = newValue;
      },
    };

    window.addEventListener("keydown", (event) => {
      moves[event.key]?.(true);
    });

    window.addEventListener("keyup", (event) => {
      moves[event.key]?.(false);
    });
  }
}
