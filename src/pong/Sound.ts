import audio from "./ping.wav";

export class Sound {
  music: HTMLAudioElement;

  constructor() {
    this.music = new Audio();
    this.music.src = audio;
  }

  play() {
    this.music.play();
  }
}
