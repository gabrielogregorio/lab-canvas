import { keyboardStateType } from "./types";

export class KeyBoardHandler {
  keyboardState: keyboardStateType;
  constructor() {
    this.keyboardState = {
      KeyW: false,
      KeyA: false,
      KeyS: false,
      KeyD: false,
      Space: false,
      ShiftLeft: false,
      Numpad0: false,
      ArrowUp: false,
      ArrowLeft: false,
      ArrowRight: false,
      ArrowDown: false,
    };

    const moves = {
      KeyW: (newValue) => {
        this.keyboardState.KeyW = newValue;
      },
      KeyS: (newValue) => {
        this.keyboardState.KeyS = newValue;
      },
      KeyA: (newValue) => {
        this.keyboardState.KeyA = newValue;
      },
      KeyD: (newValue) => {
        this.keyboardState.KeyD = newValue;
      },
      ShiftLeft: (newValue) => {
        this.keyboardState.ShiftLeft = newValue;
      },

      Space: (newValue) => {
        this.keyboardState.Space = newValue;
      },

      Numpad0: (newValue) => {
        this.keyboardState.Numpad0 = newValue;
      },
      ArrowUp: (newValue) => {
        this.keyboardState.ArrowUp = newValue;
      },
      ArrowLeft: (newValue) => {
        this.keyboardState.ArrowLeft = newValue;
      },
      ArrowRight: (newValue) => {
        this.keyboardState.ArrowRight = newValue;
      },
      ArrowDown: (newValue) => {
        this.keyboardState.ArrowDown = newValue;
      },
    };

    window.addEventListener("keydown", (event) => {
      console.log(event.code);
      moves[event.code]?.(true);
    });

    window.addEventListener("keyup", (event) => {
      moves[event.code]?.(false);
    });
  }
}
