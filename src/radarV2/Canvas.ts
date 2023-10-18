import MapImage from "./example_of_map.png";
// IMAGE FROM https://github.com/le-chartreux/pyprocgen IN 10/18/2023

export class Canvas {
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;

  imageMap: HTMLImageElement;
  imageMapIsLoaded: boolean;

  constructor() {
    this.element = document.getElementById("canvas") as HTMLCanvasElement;
    this.ctx = this.element.getContext("2d") as CanvasRenderingContext2D;

    this.x = 0;
    this.y = 0;
    this.width = 1000;
    this.height = 500;

    this.imageMap = new Image();

    this.imageMap.src = MapImage;

    this.imageMap.onload = () => {
      this.imageMapIsLoaded = true;
    };
  }

  render() {
    if (!this.imageMapIsLoaded) {
      return;
    }

    this.ctx.beginPath();
    let pattern1Image = this.ctx.createPattern(this.imageMap, "repeat");
    const widthRect = 2339;
    const height = 1370;
    const widthImage = this.imageMap.width;

    const svgMatrix: SVGMatrix = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();

    pattern1Image.setTransform(svgMatrix.scale(widthRect / widthImage));

    this.ctx.fillStyle = pattern1Image;
    this.ctx.fillRect(0, 0, widthRect, height);
    this.ctx.closePath();
  }
}
