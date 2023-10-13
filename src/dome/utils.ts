export function generateRgbCss() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

export const randomizeWindSpeed = (windSpeed: number): number => {
  let newWindSpeed = windSpeed + Math.random() * 10;

  if (newWindSpeed > 50) {
    return 50;
  }

  if (newWindSpeed < -50) {
    return -50;
  }

  return newWindSpeed;
};


const GRAVITY = 9.81;
const FACTOR_TO_SHOW_INSIDE_CANVAS = 20;

export const calculateEllipseHostileArtifact = (elapsedTime: number, horizontalSpeedInitial: number, verticalSpeedInitial: number, windSpeed: number)  => {
  let horizontalSpeedCorrected = horizontalSpeedInitial + windSpeed;

  let x = horizontalSpeedCorrected * elapsedTime;
  let y = verticalSpeedInitial * elapsedTime - 0.5 * GRAVITY * elapsedTime * elapsedTime;

  return {
    x: Math.floor(x / FACTOR_TO_SHOW_INSIDE_CANVAS),
    y: Math.floor(y / FACTOR_TO_SHOW_INSIDE_CANVAS),
  };
}
