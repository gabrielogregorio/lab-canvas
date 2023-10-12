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
    let speed = 3;
    let mapPlayer = {
      top: false,
      left: false,
      bottom: false,
      right: false,
    };

    let drawPosX = 150;
    let drawPosY = 150;

    let timeInMsToUpdateSprite = 150;

    const moves = {
      w(newValue) {
        mapPlayer.top = newValue;
      },
      s(newValue) {
        mapPlayer.bottom = newValue;
      },
      a(newValue) {
        mapPlayer.left = newValue;
      },
      d(newValue) {
        mapPlayer.right = newValue;
      },
    };

    window.addEventListener("keydown", (event) => {
      moves[event.key]?.(true);
    });

    window.addEventListener("keyup", (event) => {
      moves[event.key]?.(false);
    });

    let spriteActive = 0;
    setInterval(() => {
      spriteActive += 1;

      if (spriteActive >= 4) {
        spriteActive = 0;
      }
    }, timeInMsToUpdateSprite);

    function draw() {
      drawPosX += mapPlayer.right ? speed : mapPlayer.left ? speed * -1 : 0;
      drawPosY += mapPlayer.top ? speed * -1 : mapPlayer.bottom ? speed : 0;

      canvasContext.clearRect(0, 0, 500, 500);

      createAntiTankSprite(antiTankSprite, canvasContext, {
        spriteStartRow: spriteActive,
        spriteStartCol: 0,
        drawPosX,
        drawPosY,
        drawWidth: 100,
        drawHeight: 100,
      });

      requestAnimationFrame(draw);
    }

    draw();
  });
})();
