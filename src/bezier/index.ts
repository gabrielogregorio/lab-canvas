(function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const contextCanvas = canvas.getContext("2d");

  contextCanvas.beginPath();
  contextCanvas.strokeStyle = "#ff1122";
  contextCanvas.lineTo(0, 100);
  const x = 100;
  const y = 100;

  const controlPointX = 50;
  const controlPointY = 200;
  contextCanvas.quadraticCurveTo(controlPointX, controlPointY, x, y);
  contextCanvas.quadraticCurveTo(150, 0, 200, 100);
  contextCanvas.quadraticCurveTo(250, 0, 300, 100);
  contextCanvas.quadraticCurveTo(250, 250, 200, 250);
  contextCanvas.quadraticCurveTo(100, 200, 100, 100);
  contextCanvas.stroke();
  contextCanvas.closePath();

  contextCanvas.beginPath();
  contextCanvas.closePath();

  contextCanvas.beginPath();
  let start = { x: 500, y: 500 };
  let end = { x: 800, y: 500 };

  let cp1 = { x: 600, y: 700 };
  let cp2 = { x: 700, y: 100 };

  contextCanvas.moveTo(start.x, start.y);
  contextCanvas.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);

  contextCanvas.stroke();
  contextCanvas.closePath();
})();
