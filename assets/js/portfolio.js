/*------------------------------------DEBUT THEMES--------------------------------*/

function toggleTheme() {

  /*Theme changer*/

  let theme = document.getElementById('theme');

  if (theme.getAttribute('href') == 'assets/css/style.css') {
      theme.setAttribute('href', 'assets/css/dark-style.css');
  } else {
      theme.setAttribute('href', 'assets/css/style.css');
  }

  localStorage.setItem("theme", theme.getAttribute('href'));
}  

/*------------------------------------LOADER--------------------------------*/

document.addEventListener("DOMContentLoaded", function() {

  /*Detect local theme preference*/
  let theme = document.getElementById('theme');
  
  // 🔹 Vérifier s'il y a un thème enregistré dans localStorage
  let savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
      theme.setAttribute('href', savedTheme);
  } else {
      // 🔹 Si aucun thème stocké, suivre la préférence système
      const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDarkMode) {
          theme.setAttribute('href', 'assets/css/dark-style.css');
      } else {
          theme.setAttribute('href', 'assets/css/style.css');
      }
  }

  /*Fin detection theme*/
  
  const loader = document.getElementById("loader_div");
  const content = document.getElementById("content");
  
  // Vérifier si l'élément content existe
  if (!content) {
    console.error("L'élément content n'a pas été trouvé.");
    return;
  }

  // Masquer le loader avec une transition en douceur
  loader.style.opacity = "1";
  loader.style.transition = "opacity 0.5s ease";

});

// <!-- ---------------------------------CARDS -------------------------------------------- -->

  var x;
  var $cards = $(".card");
  var $style = $(".hover");

  $cards
  .on("mousemove touchmove", function(e) { 
    // normalise touch/mouse
    var pos = [e.offsetX,e.offsetY];
    e.preventDefault();
    if ( e.type === "touchmove" ) {
      pos = [ e.touches[0].clientX, e.touches[0].clientY ];
    }
    var $card = $(this);
    // math for mouse position
    var l = pos[0];
    var t = pos[1];
    var h = $card.height();
    var w = $card.width();
    var px = Math.abs(Math.floor(100 / w * l)-100);
    var py = Math.abs(Math.floor(100 / h * t)-100);
    var pa = (50-px)+(50-py);
    // math for gradient / background positions
    var lp = (50+(px - 50)/1.5);
    var tp = (50+(py - 50)/1.5);
    var px_spark = (50+(px - 50)/7);
    var py_spark = (50+(py - 50)/7);
    var p_opc = 20+(Math.abs(pa)*1.5);
    var ty = ((tp - 50) / 4) * -1;
    var tx = ((lp - 50) / 3) * 0.5;

    // css to apply for active card
    var grad_pos = `background-position: ${lp}% ${tp}%;`
    var sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`
    var opc = `opacity: ${p_opc/100};`
    var tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`
    // need to use a <style> tag for psuedo elements
    var style = `
      .card:hover:before { ${grad_pos} }  /* gradient */
      .card:hover:after { ${sprk_pos} ${opc} }   /* sparkles */ 
    `
    // set / apply css class and style
    $cards.removeClass("active");
    $card.removeClass("animated");
    $card.attr( "style", tf );
    $style.html(style);
    if ( e.type === "touchmove" ) {
      return false; 
    }
    clearTimeout(x);
  }).on("mouseout touchend touchcancel", function() {
    // remove css, apply custom animation on end
    var $card = $(this);
    $style.html("");
    $card.removeAttr("style");
    x = setTimeout(function() {
      $card.addClass("animated");
    },2500);
  });

//------------------------portfolio horizontal scroll

  const container = document.querySelector('.cards-wrapper');

  let isDragging = false;
  let lastX = 0;
  let velocity = 0;
  let rafId;

  const updateScroll = () => {
      container.scrollLeft -= velocity;
      velocity *= 0.95; // Ajoute une inertie pour un effet smooth
      if (Math.abs(velocity) > 0.1) {
          rafId = requestAnimationFrame(updateScroll);
      } else {
          cancelAnimationFrame(rafId);
      }
  };

  container.addEventListener('mousedown', (e) => {
      isDragging = true;
      lastX = e.clientX;
      velocity = 0;
      cancelAnimationFrame(rafId); // Stoppe l'inertie quand on clique
  });

  container.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      
      let delta = e.clientX - lastX;
      lastX = e.clientX;
      
      container.scrollLeft -= delta; // Déplace instantanément
      velocity = delta; // Stocke la vitesse pour l’inertie
  });

  container.addEventListener('mouseup', () => {
      isDragging = false;
      rafId = requestAnimationFrame(updateScroll); // Lance l'inertie
  });

  container.addEventListener('mouseleave', () => {
      isDragging = false;
      rafId = requestAnimationFrame(updateScroll);
  });

// -------------------------------------------------------------- PROJETS --------------------------------------------------------

  document.addEventListener("DOMContentLoaded", function () {
      const tabs = document.querySelectorAll(".project-tab");
      const projects = document.querySelectorAll(".project-details");

      tabs.forEach(tab => {
          tab.addEventListener("click", function () {
              const projectId = this.getAttribute("data-project");

              // Supprime la classe active de tous les onglets
              tabs.forEach(t => t.classList.remove("active"));
              this.classList.add("active");

              // Cache tous les projets
              projects.forEach(project => project.classList.add("hidden"));

              // Affiche le projet sélectionné
              document.getElementById(`project-${projectId}`).classList.remove("hidden");
          });
      });
  });

  document.addEventListener("DOMContentLoaded", function () {
      const tabs = document.querySelectorAll(".project-tab");
      const projects = document.querySelectorAll(".project-details");
      let activeIndex = 0;
      let userClicked = false;

      function showProject(index) {
          projects.forEach((project, i) => {
              project.classList.remove("active");
              tabs[i].classList.remove("active");
              if (i === index) {
                  project.classList.add("active");
                  tabs[i].classList.add("active");
              }
          });
      }

      tabs.forEach((tab, index) => {
          tab.addEventListener("click", function () {
              userClicked = true; // L'utilisateur a cliqué, on arrête le défilement automatique
              activeIndex = index;
              showProject(activeIndex);
          });
      });

      // Défilement automatique toutes les minutes (si l'utilisateur n'a pas cliqué)
      function autoScroll() {
          if (!userClicked) {
              activeIndex = (activeIndex + 1) % projects.length;
              showProject(activeIndex);
          }
      }

      // Lancer le premier affichage
      showProject(activeIndex);
      setInterval(autoScroll, 60000); // Change de projet toutes les 60 secondes
  });






