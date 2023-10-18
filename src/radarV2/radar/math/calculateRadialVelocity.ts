type positionItems = {
  x: number;
  y: number;
};

export const calculateRadialVelocity = (radarPosition: positionItems, objectPosition: positionItems, objectVelocity: positionItems): number => {
  const directionalVectorX = objectPosition.x - radarPosition.x;
  const directionVectorY = objectPosition.y - radarPosition.y;

  const magnitude = Math.sqrt(directionalVectorX ** 2 + directionVectorY ** 2);

  const normalizedDirectionalVectorX = directionalVectorX / magnitude;
  const normalizedDirectionVectorY = directionVectorY / magnitude;

  return objectVelocity.x * normalizedDirectionalVectorX + objectVelocity.y * normalizedDirectionVectorY;
};
