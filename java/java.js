function animateText() {
  const textArea = document.getElementById('textExample');
  let text = textArea.value;
  let to = text.length;
  let from = 0;
  let startTime = null;
  let animationRunning = false; // Variable para controlar si la animación está en curso

  if (animationRunning) return; // Si ya está en curso, no hace nada
  animationRunning = true; // Marca la animación como en curso

  textArea.value = ""; // Limpia el textarea antes de empezar la animación

  function animate(currentTime) {
      if (startTime === null) {
          startTime = currentTime;
      }
      const timeElapsed = currentTime - startTime;
      let progress = Math.min(timeElapsed / 5000, 1);

      let easedProgress = bounce(progress);

      let result = (to - from) * easedProgress + from;
      textArea.value = text.slice(0, Math.ceil(result));

      if (progress < 1) {
          requestAnimationFrame(animate);
      } else {
          animationRunning = false; // Marca la animación como finalizada
      }
  }

  function bounce(timeFraction) {
      for (let a = 0, b = 1; 1; a += b, b /= 2) {
          if (timeFraction >= (7 - 4 * a) / 11) {
              return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
          }
      }
  }

  requestAnimationFrame(animate);
}