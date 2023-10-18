const targetFrames = 60;

export class Performance {
  render(callback: () => void) {
    let lastTime = performance.now();
    const frameDuration = 1000 / targetFrames;

    const bootstrap = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      if (deltaTime >= frameDuration) {
        callback();

        lastTime = currentTime;
      }

      requestAnimationFrame(bootstrap);
    };

    requestAnimationFrame(bootstrap);
  }
}
