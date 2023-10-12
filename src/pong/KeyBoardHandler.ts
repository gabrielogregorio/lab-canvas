import { keyboardStateType } from "./types";

export class KeyBoardHandler {
  keyboardState: keyboardStateType;
  constructor() {
    this.keyboardState = {
      top: false,
      left: false,
      bottom: false,
      right: false,
      space: false,
    };

    const moves = {
      KeyW: (newValue) => {
        this.keyboardState.top = newValue;
      },
      KeyS: (newValue) => {
        this.keyboardState.bottom = newValue;
      },
      KeyA: (newValue) => {
        this.keyboardState.left = newValue;
      },
      KeyD: (newValue) => {
        this.keyboardState.right = newValue;
      },
      Space: (newValue) => {
        this.keyboardState.space = newValue;
      },
    };

    window.addEventListener("keydown", (event) => {
      moves[event.code]?.(true);
    });

    window.addEventListener("keyup", (event) => {
      moves[event.code]?.(false);
    });
  }
}
