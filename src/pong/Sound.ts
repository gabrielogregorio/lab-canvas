export class Sound {
  music: HTMLAudioElement;

  constructor() {
    this.music = document.getElementById("audio") as HTMLAudioElement;
  }

  play() {
    this.music.play();
  }
}
