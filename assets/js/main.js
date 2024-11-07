// Masquer le loader, afficher le contenu principal et lancer la première vidéo une fois la page chargée
window.addEventListener("load", function() {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");
  const firstVideo = document.getElementById("first-video");
  const secondVideo = document.getElementById("second-video");
  const logo = document.getElementById("logo");

  // Masque le loader avec une transition en douceur
  loader.style.opacity = "1";
  loader.style.transition = "opacity 0.5s ease";

  // Masquer le loader après la transition
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
      content.style.display = "block";

      // Démarre la première vidéo une fois le loader disparu
      firstVideo.play();
    }, 500); // Délai de 0.5s pour la transition
  }, 500); // Commence la transition immédiatement

  // Quand la première vidéo est terminée, afficher la deuxième vidéo et faire apparaître le logo
  firstVideo.addEventListener("ended", function() {
    // Masquer la première vidéo et afficher la deuxième
    firstVideo.style.display = "none";
    secondVideo.style.display = "block";

    // Ajouter la classe "show" pour déclencher le fondu du logo
    logo.classList.add("show");
  });

  // Assurez-vous que la deuxième vidéo commence à jouer dès qu'elle est visible
  secondVideo.play();
});

// Cibler les éléments du DOM pour le menu burger
const burgerIcon = document.querySelector(".menu-burger");
const navLinks = document.getElementById("nav-links");

// Basculer la classe "show" pour afficher ou masquer le menu
burgerIcon.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Fermer le menu lorsqu'un lien est cliqué
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

// Fonction pour changer le thème
function toggleTheme() {
  // Récupérer le body
  const body = document.body;
  
  // Basculer entre le mode clair et sombre
  body.classList.toggle("dark-mode");

  // Sauvegarder l'état du thème dans le localStorage pour qu'il persiste lors du rechargement de la page
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

// Vérifier si un thème a été sauvegardé et l'appliquer
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
});
