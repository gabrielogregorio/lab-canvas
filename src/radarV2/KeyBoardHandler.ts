export type keyboardStateType = {
  top: boolean;
  left: boolean;
  bottom: boolean;
  right: boolean;
  KeyQ: boolean;
};

export class KeyBoardHandler {
  keyboardState: keyboardStateType;
  constructor() {
    this.keyboardState = {
      top: false,
      left: false,
      bottom: false,
      right: false,
      KeyQ: false
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

      KeyQ: (newValue) => {
        this.keyboardState.KeyQ = newValue;
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
