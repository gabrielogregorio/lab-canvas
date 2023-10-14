import box from "./box.webp";

(function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const contextCanvas = canvas.getContext("2d");

  const pattern1 = new Image();
  pattern1.src = box;

  pattern1.onload = () => {
    contextCanvas.beginPath();
    let pattern1Image = contextCanvas.createPattern(pattern1, "repeat");
    const widthRect = 300;
    const height = 300;
    const widthImage = pattern1.width;

    const svgMatrix: SVGMatrix = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();

    pattern1Image.setTransform(svgMatrix.scale(widthRect / widthImage));

    contextCanvas.fillStyle = pattern1Image;
    contextCanvas.fillRect(0, 0, widthRect, height);
    contextCanvas.closePath();
  };
})();
