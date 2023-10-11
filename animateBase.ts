(function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  let speedMove = 8;
  let positionX = 0;
  let positionY = 50;

  let directionX = 1 * speedMove;
  let directionY = 1 * speedMove;

  const widthCanvas = 500;
  const heightCanvas = 500;
  const widthObject = 50;
  const heightObject = 50;

  function draw() {
    context.clearRect(0, 0, 500, 500); // limpa o desenho

    // desenha novamente
    context.fillStyle = "#0f0";
    context.fillRect(positionX, positionY, widthObject, heightObject);

    context.lineWidth = 5;
    context.strokeStyle = "#000";
    context.strokeRect(positionX, positionY, widthObject, heightObject);

    // atualiza posição
    positionX += directionX;
    positionY += directionY;

    const invertObjectOnTouchRight = positionX + widthObject >= widthCanvas;
    const invertObjectOnTouchLeft = positionX <= 0;
    if (invertObjectOnTouchRight || invertObjectOnTouchLeft) {
      directionX = directionX * -1;
    }

    const invertObjectOnTouchBottom = positionY + heightObject >= heightCanvas;
    const invertObjectOnTouchTop = positionY <= 0;
    if (invertObjectOnTouchBottom || invertObjectOnTouchTop) {
      directionY = directionY * -1;
    }

    requestAnimationFrame(draw);
  }

  draw();
})();
