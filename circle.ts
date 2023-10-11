(function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  function angleToRadians(angle: number) {
    return (Math.PI / 180) * angle;
  }

  function draw() {
    let radius = 50;
    const startAngle = angleToRadians(180);
    const endAngle = angleToRadians(45);
    const counterclockwise = false;

    context.beginPath();
    context.fillStyle = "#0aa";
    context.arc(200, 200, radius, startAngle, endAngle, counterclockwise);
    context.fill();
    context.closePath();

    context.beginPath();
    context.fillStyle = "#faa";
    context.arc(200, 200, radius, startAngle, endAngle, !counterclockwise);
    context.fill();
    context.closePath();
  }

  draw();
})();
