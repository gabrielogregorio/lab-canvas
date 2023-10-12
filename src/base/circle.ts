(function () {
  function angleToRadians(angle: number) {
    return (Math.PI / 180) * angle;
  }

  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  const widthCanvas = 500;

  const renderRandomCircle = (widthCanvas: number) => {
    context.beginPath();
    context.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    const positionX = Math.random() * widthCanvas;
    const positionY = Math.random() * widthCanvas;
    const radius = Math.random() * 100;
    const startAngle = angleToRadians(0);
    const endAngle = angleToRadians(360);
    const counterclockwise = true;

    context.arc(positionX, positionY, radius, startAngle, endAngle, counterclockwise);
    context.fill();
    context.closePath();
  };

  const renderAnimateCircle = (endAngleControl: number) => {
    const startAngle = angleToRadians(180);
    const counterclockwise = false;

    let radius = 50;
    const endAngle = angleToRadians(endAngleControl);

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
  };

  const quantitySpheres = 50;

  let endAngleControl = 0;
  function draw() {
    setTimeout(() => {
      context.clearRect(0, 0, 500, 500);

      for (let index = 0; index < quantitySpheres; index += 1) {
        renderRandomCircle(widthCanvas);
      }

      renderAnimateCircle(endAngleControl);
      endAngleControl += 1;
      if (endAngleControl > 360) {
        endAngleControl = 0;
      }

      requestAnimationFrame(draw);
    }, 800);
  }

  draw();
})();
