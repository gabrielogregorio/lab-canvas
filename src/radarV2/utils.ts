type BoxType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const isColliding = (box1: BoxType, box2: BoxType): boolean => {
  const box2NotCollideRight = box2.x > box1.x + box1.width;
  const box1NotColliedRight = box1.x > box2.x + box2.width;
  const box2NotColliedBottom = box2.y > box1.y + box1.height;
  const box1NotColliedBottom = box1.y > box2.y + box2.height;

  return !(box2NotCollideRight || box1NotColliedRight || box2NotColliedBottom || box1NotColliedBottom);
};

export const degreesToRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

export function normalizeToClosestThousand(value: number): number {
  return Math.round(value / 1000) * 1000;
}

export const loadImageCanvas = (src: string, onLoad: (imageLoaded: HTMLImageElement) => void) => {
  const image = new Image();
  image.src = src;

  image.onload = () => {
    onLoad(image);
  };
};

export const renderAndRotateImage = (ctx: CanvasRenderingContext2D, image: HTMLImageElement, degrees: number, x: number, y: number, w: number, h: number) => {
  ctx.beginPath();

  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  ctx.rotate((degrees * Math.PI) / 180.0);
  ctx.translate(-x - w / 2, -y - h / 2);

  ctx.drawImage(image, x, y, w, h);

  ctx.restore();

  ctx.closePath();
};
