(function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const contextCanvas = canvas.getContext("2d");

  contextCanvas.beginPath();

  contextCanvas.fillStyle = "#00aaff";
  contextCanvas.fillRect(100, 100, 200, 200);

  contextCanvas.globalAlpha = 0.2;

  contextCanvas.fillStyle = "#ffaaaa";
  contextCanvas.fillRect(450, 100, 200, 200);

  contextCanvas.globalAlpha = 1;

  contextCanvas.fillStyle = "#00ffaa";
  contextCanvas.fillRect(450, 400, 200, 200);

  contextCanvas.closePath();
})();
