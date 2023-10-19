import { RadarScreen } from "./radarScreen/index";
import { KeyBoardHandler, keyboardStateType } from "./KeyBoardHandler";
import { Ui } from "./Ui";
import { Canvas } from "./scenario/index";
import { UiCanvas } from "./UiMainCanvas";

export class InteractionHandler {
  canvas: RadarScreen | Canvas;
  keyboardState: keyboardStateType;
  keyBoardHandler: KeyBoardHandler;
  ui: Ui | UiCanvas;
  lastXClick: number;
  lastYClick: number;

  constructor(canvas: RadarScreen | Canvas, keyBoardHandler: KeyBoardHandler) {
    this.canvas = canvas;
    this.keyBoardHandler = keyBoardHandler;
    this.keyboardState = keyBoardHandler.keyboardState;

    this.lastXClick = 0;
    this.lastYClick = 0;

    this.canvas.element.addEventListener("touchstart", (event) => this.handleTouchStart(event), false);
    this.canvas.element.addEventListener("mousedown", (event) => this.handleMouseDown(event), false);
  }

  handleTouchStart(event) {
    this.getCanvasCoordinates(event);
    console.log(`Touch started at x: ${this.lastXClick}, y: ${this.lastYClick}`);
  }

  handleMouseDown(event) {
    this.getCanvasCoordinates(event);
    console.log(`Mouse down at x: ${this.lastXClick}, y: ${this.lastYClick}`);
  }

  setUi(ui: Ui | UiCanvas) {
    this.ui = ui;
  }

  resetClick() {
    this.lastXClick = 0;
    this.lastYClick = 0;
  }

  getCanvasCoordinates(event) {
    const rect = this.canvas.element.getBoundingClientRect();
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
      if (this.hasCollision("KeyQ")) {
        newKeyBoardState.KeyQ = true;
      }

      if (this.hasCollision("KeyE")) {
        newKeyBoardState.KeyE = true;
      }

      if (this.hasCollision("top")) {
        newKeyBoardState.top = true;
      }

      if (this.hasCollision("left")) {
        newKeyBoardState.left = true;
      }

      if (this.hasCollision("right")) {
        newKeyBoardState.right = true;
      }

      if (this.hasCollision("bottom")) {
        newKeyBoardState.bottom = true;
      }
    }

    this.resetClick();

    this.keyboardState = newKeyBoardState;
  }
}
