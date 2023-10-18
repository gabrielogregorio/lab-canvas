export const calculateNewFrequency = (targetVelocity: number, baseFrequency: number, speedWave: number): number => {
  return baseFrequency * (speedWave / (speedWave + targetVelocity));
};
