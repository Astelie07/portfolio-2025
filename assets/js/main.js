/*------------------------------------DEBUT THEMES--------------------------------*/

function toggleTheme() {
  // Select the <link> element
  let theme = document.getElementById('theme');
  let dark_video = document.getElementById('dark_video');
  let light_video = document.getElementById('light_video');

  if (theme.getAttribute('href') == 'assets/css/style.css') {
      theme.setAttribute('href', 'assets/css/dark-style.css');
      light_video.style.display="none";
      dark_video.style.display="block";
  } else {
      theme.setAttribute('href', 'assets/css/style.css');
      dark_video.style.display="none";
      light_video.style.display="block";
  }
}

/*------------------------------------FIN THEMES--------------------------------*/

document.addEventListener("DOMContentLoaded", function() {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");
  const firstVideo = document.getElementById("first-video");
  const secondVideo = document.getElementById("second-video");
  const logo = document.getElementById("logo");
  
  // Vérifier si l'élément content existe
  if (!content) {
    console.error("L'élément content n'a pas été trouvé.");
    return;
  }

  // Masquer le loader avec une transition en douceur
  loader.style.opacity = "1";
  loader.style.transition = "opacity 0.5s ease";

  firstVideo.pause(); // S'assurer que la première vidéo est mise en pause au départ

  // Masquer le loader après la transition
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
      content.style.display = "block";

        firstVideo.play().catch(error => {
          console.error("Erreur lors de la lecture de la vidéo : ", error);
        });
    }, 500); // Transition du loader
  }, 500); // Délai de 0.5s pour commencer la transition du loader

  // Quand la première vidéo est terminée, afficher la deuxième vidéo et faire apparaître le logo
  firstVideo.addEventListener("ended", function() {
    // Masquer la première vidéo et afficher la deuxième
    firstVideo.style.display = "none";
    secondVideo.style.display = "block";

    // Ajouter la classe "show" pour déclencher le fondu du logo
    logo.classList.add("show");

    // Lancer la deuxième vidéo dès qu'elle est visible
    secondVideo.play().catch(error => {
      console.error("Erreur lors de la lecture de la deuxième vidéo : ", error);
    });
  });

  // Menu burger
  const burgerIcon = document.querySelector(".menu-burger");
  const navLinks = document.getElementById("nav-links");

  burgerIcon.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });

// Vérifier si un thème a été sauvegardé et l'appliquer lors du chargement de la page
window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme');
  const themeLink = document.getElementById('theme-link');
  
  // Appliquer le thème sauvegardé
  if (savedTheme === 'dark') {
    themeLink.setAttribute('href', 'assets/css/dark.css');
  } else {
    themeLink.setAttribute('href', 'assets/css/light.css');
  }
});



});
