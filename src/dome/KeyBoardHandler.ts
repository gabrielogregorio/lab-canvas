import { keyboardStateType } from "./types";

export class KeyBoardHandler {
  keyboardState: keyboardStateType;

  constructor() {
    this.keyboardState = {
      Space: false,
      KeyA: false,
      KeyD: false,
      KeyS: false,
      KeyW: false,
      ShiftLeft: false,
      KeyE: false,
      KeyF: false,
      KeyQ: false,
      KeyX: false,
    };

    // REFACTOR ME
    const moves: { [key in keyof keyboardStateType]: (newValue: boolean) => void } = {
      Space: (newValue) => {
        this.keyboardState.Space = newValue;
      },
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
      KeyE: (newValue) => {
        this.keyboardState.KeyE = newValue;
      },
      KeyQ: (newValue) => {
        this.keyboardState.KeyQ = newValue;
      },
      KeyF: (newValue) => {
        this.keyboardState.KeyF = newValue;
      },
      KeyX: (newValue) => {
        this.keyboardState.KeyX = newValue;
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
