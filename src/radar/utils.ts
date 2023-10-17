type BoxType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const isColliding = (box1: BoxType, box2: BoxType): boolean => {
  const box2NotCollideRight = box2.x > box1.x + box1.width;
  const box1NotColliedRight = box1.x > box2.x + box2.width;
  const box2NotColliedBottom = box2.y > box1.y + box1.height;
  const box1NotColliedBottom = box1.y > box2.y + box2.height;

  return !(box2NotCollideRight || box1NotColliedRight || box2NotColliedBottom || box1NotColliedBottom);
};

const degreesToRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

export const calculatePositionXYTarget = (radarOriginX: number, radarOriginY: number, distanceFromRadarHypotenuse: number, angleInDegrees: number) => {
  let angleInRadians = degreesToRadians(angleInDegrees);

  let adjacentLeg = distanceFromRadarHypotenuse * Math.cos(angleInRadians);
  let oppositeLeg = distanceFromRadarHypotenuse * Math.sin(angleInRadians);

  let targetX = radarOriginX + adjacentLeg;
  let targetY = radarOriginY + oppositeLeg;

  return {
    targetX,
    targetY,
  };
};

export function normalizeToClosestThousand(value: number): number {
  return Math.round(value / 1000) * 1000;
}
