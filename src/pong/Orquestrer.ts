export class Orquestrer {
  isPlaying: boolean;
  player1Points: number;
  player2Points: number;

  constructor() {
    this.isPlaying = false;
    this.player1Points = 0;
    this.player2Points = 0;
  }

  reset() {
    this.isPlaying = false;
    this.player1Points = 0;
    this.player2Points = 0;
  }

  start() {
    this.isPlaying = true;
  }

  stop() {
    this.isPlaying = false;
  }

  getPlacar() {
    return { player1Points: this.player1Points, player2Points: this.player2Points };
  }
}
