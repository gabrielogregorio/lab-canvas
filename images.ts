type spriteConfig = {
  spriteStartRow: number;
  spriteStartCol: number;
  drawPosX: number;
  drawPosY: number;

  drawWidth: number;
  drawHeight: number;
};

const createAntiTankSprite = (
  antiTankSprite: HTMLImageElement,
  canvasContext: CanvasRenderingContext2D,
  { spriteStartCol, spriteStartRow, drawPosX, drawPosY, drawHeight, drawWidth }: spriteConfig
) => {
  const totalSpriteRows = 4;
  const totalSpriteCols = 4;

  const spriteWidth = antiTankSprite.width / totalSpriteRows;
  const spriteHeight = antiTankSprite.height / totalSpriteCols;

  canvasContext.drawImage(antiTankSprite, spriteStartRow * spriteWidth, spriteStartCol * spriteHeight, spriteWidth, spriteHeight, drawPosX, drawPosY, drawWidth, drawHeight);
};

(function () {
  const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
  const canvasContext = canvasElement.getContext("2d") as CanvasRenderingContext2D;

  let antiTankSprite = new Image();
  antiTankSprite.src = "http://localhost:8080/sprites.jpg";

  antiTankSprite.addEventListener("load", () => {
    let spriteActive = 0;
    setInterval(() => {
      spriteActive += 1;

      if (spriteActive >= 4) {
        spriteActive = 0;
      }

      canvasContext.clearRect(0, 0, 500, 500);
      createAntiTankSprite(antiTankSprite, canvasContext, {
        spriteStartRow: spriteActive,
        spriteStartCol: 0,
        drawPosX: 150,
        drawPosY: 150,
        drawWidth: 100,
        drawHeight: 100,
      });
    }, 200);
  });
})();
