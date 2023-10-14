import { Canvas } from "./Canvas";
import { KeyBoardHandler } from "./KeyBoardHandler";
import { Ui } from "./Ui";
import { keyboardStateType } from "./types";

export class InteractionHandler {
  canvas: Canvas;
  keyboardState: keyboardStateType;
  keyBoardHandler: KeyBoardHandler;
  ui: Ui;
  lastXClick: number;
  lastYClick: number;

  constructor(canvas: Canvas, keyBoardHandler: KeyBoardHandler) {
    this.canvas = canvas;
    this.keyBoardHandler = keyBoardHandler;
    this.keyboardState = keyBoardHandler.keyboardState;

    this.lastXClick = 0;
    this.lastYClick = 0;

    canvas.canvas.addEventListener("touchstart", (event) => this.handleTouchStart(event), false);
    canvas.canvas.addEventListener("mousedown", (event) => this.handleMouseDown(event), false);
  }

  handleTouchStart(event) {
    this.getCanvasCoordinates(event);
    console.log(`Touch started at x: ${this.lastXClick}, y: ${this.lastYClick}`);
  }

  handleMouseDown(event) {
    this.getCanvasCoordinates(event);
    console.log(`Mouse down at x: ${this.lastXClick}, y: ${this.lastYClick}`);
  }

  setUi(ui: Ui) {
    this.ui = ui;
  }

  resetClick() {
    this.lastXClick = 0;
    this.lastYClick = 0;
  }

  getCanvasCoordinates(event) {
    const rect = this.canvas.canvas.getBoundingClientRect();
    if (event.touches) {
      this.lastXClick = event.touches[0].clientX - rect.left;
      this.lastYClick = event.touches[0].clientY - rect.top;
    } else {
      this.lastXClick = event.clientX - rect.left;
      this.lastYClick = event.clientY - rect.top;
    }
  }

  hasCollision(keyName: keyof keyboardStateType): boolean {
    const insideXPosition = this.lastXClick >= this.ui.positions[keyName].x && this.lastXClick <= this.ui.positions[keyName].x + this.ui.positions[keyName].width;
    const insideYPosition = this.lastYClick >= this.ui.positions[keyName].y && this.lastYClick <= this.ui.positions[keyName].y + this.ui.positions[keyName].height;
    return insideXPosition && insideYPosition;
  }
  render() {
    let newKeyBoardState = { ...this.keyBoardHandler.keyboardState };

    if (this.lastXClick && this.lastYClick) {
      // REFACTOR ME
      if (this.hasCollision("KeyA")) {
        newKeyBoardState.KeyA = true;
      }

      if (this.hasCollision("KeyW")) {
        newKeyBoardState.KeyW = true;
      }

      if (this.hasCollision("KeyD")) {
        newKeyBoardState.KeyD = true;
      }

      if (this.hasCollision("KeyS")) {
        newKeyBoardState.KeyS = true;
      }

      if (this.hasCollision("KeyF")) {
        newKeyBoardState.KeyF = true;
      }

      if (this.hasCollision("KeyQ")) {
        newKeyBoardState.KeyQ = true;
      }

      if (this.hasCollision("KeyE")) {
        newKeyBoardState.KeyE = true;
      }

      if (this.hasCollision("KeyX")) {
        newKeyBoardState.KeyX = true;
      }
    }

    this.resetClick();

    this.keyboardState = newKeyBoardState;
  }
}
