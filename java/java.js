function animateText() {
  const textArea = document.getElementById('textExample');
  if (!textArea) return; // Salir si el textarea no existe

  let text = textArea.value;
  let to = text.length;
  let from = 0;
  let startTime = null;
  let animationRunning = false;

  if (animationRunning) return;
  animationRunning = true;

  textArea.value = "";  // Limpiar el textarea al iniciar

  function animate(currentTime) {
    if (startTime === null) {
      startTime = currentTime;
    }
    const timeElapsed = currentTime - startTime;
    let progress = Math.min(timeElapsed / 5000, 1);  // Asegúrate que no pase de 1

    // Aplicar el efecto de rebote
    let easedProgress = bounce(progress);

    // Calcular el número de caracteres a mostrar
    let result = Math.floor((to - from) * easedProgress + from);
    textArea.value = text.slice(0, result);  // Mostrar los primeros caracteres

    if (progress < 1) {
      requestAnimationFrame(animate);  // Continuar la animación
    } else {
      animationRunning = false;
    }
  }

  // Efecto de rebote
  function bounce(timeFraction) {
    for (let a = 0, b = 1; 1; a += b, b /= 2) {
      if (timeFraction >= (7 - 4 * a) / 11) {
        return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
      }
    }
  }

  requestAnimationFrame(animate);  // Iniciar la animación
}

document.addEventListener('DOMContentLoaded', function() {
  // *** Código para el desplazamiento suave ***
  const enlacesMenu = document.querySelectorAll('nav a');

  enlacesMenu.forEach(enlace => {
    enlace.addEventListener('click', function(event) {
      event.preventDefault();

      const idSeccion = this.getAttribute('href');
      const seccionObjetivo = document.querySelector(idSeccion);

      if (seccionObjetivo) {
        const barraNav = document.querySelector('nav');
        const alturaBarraNav = barraNav ? barraNav.offsetHeight : 0;
        const posicionTop = seccionObjetivo.getBoundingClientRect().top + window.scrollY;
        const alturaVentana = window.innerHeight;
        const alturaSeccion = seccionObjetivo.offsetHeight;
        const desplazamiento = posicionTop - (alturaVentana / 2) + (alturaSeccion / 2) - alturaBarraNav;

        window.scrollTo({
          top: desplazamiento,
          behavior: 'smooth'
        });
      }
    });
  });

  // *** Llamada a animateText() dentro de DOMContentLoaded ***
  const botonAnimar = document.getElementById('botonAnimar');
  if (botonAnimar) { // Verifica que el botón exista
    botonAnimar.addEventListener('click', animateText);
  }
});
