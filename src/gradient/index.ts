(function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const contextCanvas = canvas.getContext("2d");

  contextCanvas.beginPath();
  // on move rect, gradiant mantains position
  let x0 = 500;
  let y0 = 0;
  let x1 = 600;
  let y1 = 100;
  let gradient = contextCanvas.createLinearGradient(x0, y0, x1, y1);
  gradient.addColorStop(0, "#ff0000");
  gradient.addColorStop(1, "#0000ff");
  contextCanvas.fillStyle = gradient;
  contextCanvas.fillRect(x0, y0, 100, 100);
  contextCanvas.closePath();

  contextCanvas.beginPath();
  let sphere1 = {
    x: 30,
    y: 30,
    radio: 20,
  };

  let sphere2 = {
    x: 100,
    y: 100,
    radio: 300,
  };

  let gradient2 = contextCanvas.createRadialGradient(sphere1.x, sphere1.y, sphere1.radio, sphere2.x, sphere2.y, sphere2.radio);
  gradient2.addColorStop(0, "#ff0000");
  gradient2.addColorStop(1, "#00ff22");
  contextCanvas.fillStyle = gradient2;
  contextCanvas.fillRect(0, 0, 300, 300);
  contextCanvas.closePath();
})();
