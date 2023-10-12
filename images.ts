(function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  let antiTankClass = new Image();
  antiTankClass.src = "http://localhost:8080/sprites.jpg";

  antiTankClass.addEventListener("load", () => {
    const spriteRow = 0;
    const spriteCol = 0;
    const numLines = 4;
    const numCols = 4;

    const widthOneSprite = antiTankClass.width / numLines;
    const heightOneSprite = antiTankClass.height / numCols;

    const widthDrawImage = 200;
    const heightDrawImage = 200;
    const positionXDrawImage = 0;
    const positionTDrawImage = 0;

    context.drawImage(
      antiTankClass,
      spriteRow * widthOneSprite,
      spriteCol * heightOneSprite,
      widthOneSprite,
      heightOneSprite,
      positionXDrawImage,
      positionTDrawImage,
      widthDrawImage,
      heightDrawImage
    );
  });
})();
