(function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  context.moveTo(0, 0);
  context.lineTo(250, 250), context.lineTo(500, 0);

  context.moveTo(200, 300);
  context.lineTo(300, 300);
  context.lineTo(250, 350);
  context.lineTo(200, 300);

  context.stroke();
})();
