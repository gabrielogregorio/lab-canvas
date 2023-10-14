(function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const contextCanvas = canvas.getContext("2d");

  contextCanvas.shadowColor = "rgba(255, 255, 255, 0.4)";
  contextCanvas.shadowOffsetX = 10;
  contextCanvas.shadowOffsetY = 10;
  contextCanvas.shadowBlur = 20;

  contextCanvas.fillStyle = "#22ff42";
  contextCanvas.fillRect(100, 100, 100, 100);

  contextCanvas.shadowColor = "rgba(214,0,255, 0.8)";
  contextCanvas.shadowOffsetX = 20;
  contextCanvas.shadowOffsetY = 20;
  contextCanvas.shadowBlur = 30;

  contextCanvas.fillStyle = "rgb(214,0,255)";
  contextCanvas.fillRect(300, 300, 10, 100);

  contextCanvas.fillRect(310, 300, 100, 10);
})();
