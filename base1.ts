(function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  context.fillStyle = "#00f";
  context.fillRect(0, 0, 100, 100);

  context.fillStyle = "rgba(100, 100, 0, 0.5)";
  context.fillRect(50, 50, 100, 100);

  context.fillStyle = "#0ff";
  context.rect(100, 100, 100, 100);
  context.fill(); // ELE VAI FAZER ISSO

  context.fillStyle = "#f2f"; // FILL STYLE DE CIMA SERA REMOVIDO
  context.rect(300, 300, 50, 50);
  context.fill(); // MAS DEPOIS VAI SOBRESCREVER COM ISSO, FILL APLICA TODAS AS MUDANÇAS DOS DE DCIMA,

  context.clearRect(150, 150, 30, 30); // LIMPA UMA REGIAO QUALQUER
})();
