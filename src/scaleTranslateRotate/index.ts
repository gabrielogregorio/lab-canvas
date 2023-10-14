const angleToRadians = (angle0360: number) => {
  return angle0360 * (Math.PI / 180);
};

(function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  ctx.beginPath();

  ctx.fillStyle = "#790700";
  ctx.fillRect(0, 0, 200, 200);

  ctx.translate(300, 300); // MOVE FULL CANVAS AND X, Y REFERENCES ONLY NEW OBJECTS

  ctx.fillStyle = "#7b4100";
  ctx.fillRect(0, 0, 200, 200);

  ctx.scale(2, 2); // SCALE FULL CANVAS ONLY NEW OBJECTS

  ctx.fillStyle = "#724f00";
  ctx.fillRect(100, 100, 200, 200);

  ctx.rotate(angleToRadians(-45)); // ROTATE FULL CANVAS ONLY NEW OBJECTS

  ctx.fillStyle = "#6a6d00";
  ctx.fillRect(100, 100, 200, 200);

  ctx.closePath();
})();
