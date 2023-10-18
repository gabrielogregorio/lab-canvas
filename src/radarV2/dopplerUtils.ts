// DOPPLER
// f' = f * (v + k)
//          (v + x)
//
// k = radar = 0
// f' = f *   v
//          (v + x)
//
// MULTIPLY BY (v + x)
//
// f' * (v+x) = f * v
//
// f'v + f'x = f * v
//
// f'x = (f * v) - f'v
//
//f' = f + fΔ
//
// (f+fΔ)x = fv - (f + fΔ)v
//
// (f+fΔ)x = fv - fv + fΔv
//
// (f+fΔ)x = fΔv
//
// x =  fΔv
//     (f+fΔ)
//
// frequencyChange = fΔ = f' - f
// x =  (frequencyChange *  speedWave) / (baseFrequency + frequencyChange)
//

export const calculateTargetVelocity = (observedFrequency: number, baseFrequency: number, speedWave: number): number => {
  const frequencyChange = observedFrequency - baseFrequency;
  const velocity = (frequencyChange * speedWave) / (baseFrequency + frequencyChange);
  return velocity;
};

// DOPPLER
// f' = f * (v + k)
//          (v + x)
//
export const calculateNewFrequency = (targetVelocity: number, baseFrequency: number, speedWave: number): number => {
  return baseFrequency * (speedWave / (speedWave + targetVelocity));
};

// to calculate new frequency
export const calculateRadialVelocity = (radarPosition: { x: number; y: number }, objectPosition: { x: number; y: number }, objectVelocity: { x: number; y: number }) => {
  const directionalVectorX = objectPosition.x - radarPosition.x;
  const directionVectorY = objectPosition.y - radarPosition.y;

  const magnitude = Math.sqrt(directionalVectorX ** 2 + directionVectorY ** 2);

  const normalizedDirectionalVectorX = directionalVectorX / magnitude;
  const normalizedDirectionVectorY = directionVectorY / magnitude;

  return objectVelocity.x * normalizedDirectionalVectorX + objectVelocity.y * normalizedDirectionVectorY;
};
