function animateText() {
    const textArea = document.getElementById('textExample');
    let text = textArea.value;
    let to = text.length;
    let from = 0;
    let startTime = null;
  
    function animate(currentTime) {
      if (startTime === null) {
        startTime = currentTime;
      }
      const timeElapsed = currentTime - startTime;
      let progress = Math.min(timeElapsed / 5000, 1); // Duración de 5 segundos
  
      // Usamos la función de rebote que ya tienes
      let easedProgress = bounce(progress);
  
      let result = (to - from) * easedProgress + from;
      textArea.value = text.slice(0, Math.ceil(result));
  
      if (progress < 1) {
        requestAnimationFrame(animate);
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