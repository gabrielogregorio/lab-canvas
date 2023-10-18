export class PulseColor {
  r: number;
  g: number;
  b: number;

  constructor() {
    this.r = 0;
    this.g = 0;
    this.b = 0;
  }

  toRgb(): string {
    return `rgb(${Math.floor(this.r)}, ${Math.floor(this.g)}, ${Math.floor(this.b)})`;
  }

  getColorByFactorFrequency(frequency: number): number {
    const minFrequency = 0;
    const maxFrequency = 100000;

    const minColor = 80;
    const maxColor = 120;

    if (frequency < minFrequency) {
      frequency = minFrequency;
    }

    if (frequency > maxFrequency) {
      frequency = maxFrequency;
    }

    return ((frequency - minFrequency) / (maxFrequency - minFrequency)) * (maxColor - minColor) + minColor;
  }

  generateRgbByFrequency(frequency: number): void {
    const color = this.getColorByFactorFrequency(frequency);

    this.r = color;
    this.g = color;
    this.b = color;
  }

  applyBlueShift(frequencyDiff: number): void {
    this.b += frequencyDiff / 300;
  }

  applyRedShift(frequencyDiff: number): void {
    this.r += frequencyDiff / 300;
  }
}
