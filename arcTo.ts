(function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  function draw() {
    context.beginPath();

    context.moveTo(0, 0);
    context.lineTo(200, 200);
    context.strokeStyle = "#f55";
    context.stroke();
    context.closePath();

    context.beginPath();
    context.strokeStyle = "#55f";
    context.moveTo(200, 200);
    const radius = 90;
    context.arcTo(250, 250, 500, 300, radius);

    context.stroke();
    context.closePath();

    requestAnimationFrame(draw);
  }

  draw();
})();
