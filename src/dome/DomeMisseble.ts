import { Canvas } from "./Canvas";

const velocidade = 0.04;

export class DomeMissible {
  estaPreparado: boolean;
  explodiu: boolean;
  emVoo: boolean;
  canvas: Canvas;
  target: { x: number; y: number };
  x: number;
  y: number;
  finalizado: boolean;
  id: number
  constructor(canvas) {
    this.canvas = canvas;
    this.estaPreparado = true;
    this.finalizado = false;
    this.target = {
      x: 0,
      y: 0,
    };
    this.explodiu = false;
    this.x = 0;
    this.y = 0;
    this.id = new Date().getTime()
  }

  launch() {
    this.emVoo = true;
  }

  explode() {
    const targetX = Math.abs(this.target.x - this.x);
    const targetY = Math.abs(this.target.y - this.y);

    if (targetX + targetY <= 10) {
      this.explodiu = true;
    }
  }

  render() {
    if (this.finalizado) {
      return;
    }

    if (this.explodiu) {
      this.canvas.contextCanvas.beginPath();
      this.canvas.contextCanvas.fillStyle = "#ff7722";
      this.canvas.contextCanvas.fillRect(this.x, this.y, 50, 50);
      this.canvas.contextCanvas.closePath();

      setTimeout(() => {
        this.finalizado = true;
      }, 2000);
      return;
    }

    if (!this.emVoo) {
      return;
    }

    const diferenceX = this.target.x - this.x;
    const diferenceY = (this.target.y = this.y);

    if (diferenceX > 0) {
      this.x += velocidade;
    } else if (diferenceX < 0) {
      this.x -= velocidade;
    }

    if (diferenceY > 0) {
      this.y += velocidade;
    } else if (diferenceY < 0) {
      this.y -= velocidade;
    }

    this.canvas.contextCanvas.beginPath();
    this.canvas.contextCanvas.fillStyle = "#ddff33";
    this.canvas.contextCanvas.fillRect(this.x, this.canvas.height - this.y, 10, 10);
    this.canvas.contextCanvas.closePath();

    this.explode();
  }
}
