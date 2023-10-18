export const calculateTargetVelocity = (observedFrequency: number, baseFrequency: number, speedWave: number): number => {
  const frequencyChange = observedFrequency - baseFrequency;
  const velocity = (frequencyChange * speedWave) / (baseFrequency + frequencyChange);
  return velocity;
};
