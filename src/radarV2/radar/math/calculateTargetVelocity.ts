export const calculateTargetVelocity = (observedFrequency: number, baseFrequency: number, speedWave: number): number => {
  const frequencyChange = observedFrequency - baseFrequency;
  return (frequencyChange * speedWave) / (baseFrequency + frequencyChange);
};
