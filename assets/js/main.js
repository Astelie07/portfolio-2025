/*------------------------------------DEBUT THEMES--------------------------------*/

function toggleTheme() {

  /*Theme changer*/

  let theme = document.getElementById('theme');
  let opvideo = document.getElementById('first-video');
  let video = document.getElementById('second-video');
  let logo = document.getElementById('light-logo');

  if (theme.getAttribute('href') == 'assets/css/style.css') {
      theme.setAttribute('href', 'assets/css/dark-style.css');
      opvideo.setAttribute('src', 'assets/video/dark-opening.mp4');
      video.setAttribute('src', 'assets/video/dark-iddle.mp4');
      logo.setAttribute('src', 'assets/img/titre_dark.png');
  } else {
      theme.setAttribute('href', 'assets/css/style.css');
      opvideo.setAttribute('src', 'assets/video/light-opening.mp4');
      video.setAttribute('src', 'assets/video/light-iddle.mp4');
      logo.setAttribute('src', 'assets/img/titre_.png');
  }

  localStorage.setItem("theme", theme.getAttribute('href'));
}  

/*------------------------------------LOADER--------------------------------*/

document.addEventListener("DOMContentLoaded", function() {

  /*Detect local theme preference*/

  let theme = document.getElementById('theme');
  let firstVideo = document.getElementById("first-video");
  let secondVideo = document.getElementById("second-video");
  let l_logo = document.getElementById('light-logo');

  // 🔹 Vérifier s'il y a un thème enregistré dans localStorage
  let savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
      theme.setAttribute('href', savedTheme);
      if (savedTheme.includes("dark")) {
          firstVideo.setAttribute('src', 'assets/video/dark-opening.mp4');
          secondVideo.setAttribute('src', 'assets/video/dark-iddle.mp4');
          l_logo.setAttribute('src', 'assets/img/titre_dark.png');
      } else {
          firstVideo.setAttribute('src', 'assets/video/light-opening.mp4');
          secondVideo.setAttribute('src', 'assets/video/light-iddle.mp4');
          l_logo.setAttribute('src', 'assets/img/titre_.png');
      }
  } else {
      // 🔹 Si aucun thème stocké, suivre la préférence système
      const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDarkMode) {
          theme.setAttribute('href', 'assets/css/dark-style.css');
          firstVideo.setAttribute('src', 'assets/video/dark-opening.mp4');
          secondVideo.setAttribute('src', 'assets/video/dark-iddle.mp4');
          l_logo.setAttribute('src', 'assets/img/titre_dark.png');
      } else {
          theme.setAttribute('href', 'assets/css/style.css');
          firstVideo.setAttribute('src', 'assets/video/light-opening.mp4');
          secondVideo.setAttribute('src', 'assets/video/light-iddle.mp4');
          l_logo.setAttribute('src', 'assets/img/titre_.png');
      }
  }

  /*Fin detection theme*/
  
  const loader = document.getElementById("loader_div");
  const content = document.getElementById("content");
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

});

//-------------------------------------------------------SKILLS-----------------------------------

//=======DRAG AND DROP================
const items = document.querySelectorAll(".item__container");
const itemContainers = document.querySelectorAll(".items__container");

items.forEach((item) => {
  item.addEventListener("dragstart", dragStart);
});

itemContainers.forEach((square) => {
  square.addEventListener("dragover", dragOver);
  square.addEventListener("drop", dragDrop);
});

let beingDragged;

function dragStart(e) {
  beingDragged = e.target;

  let img = new Image();
  img.src =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
  e.dataTransfer.setDragImage(img, 0, 0);
}

function dragDrop(e) {
  if (e.target.tagName === "IMG") {
    return;
  }

  e.target.append(beingDragged);
}

function dragOver(e) {
  e.preventDefault();
}

//-------------------------------------------------SKILLS TEL-----------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll("h3");

  categories.forEach((category) => {
    category.addEventListener("click", () => {
      const list = category.nextElementSibling;

      if (list.classList.contains("hidden")) {
        list.classList.remove("hidden");
      } else {
        list.classList.add("hidden");
      }

      // Ajuster le margin-bottom des h3 pour garder de l'espace entre eux
      categories.forEach((h3) => {
        const siblingList = h3.nextElementSibling;
        h3.style.marginBottom = siblingList.classList.contains("hidden") ? "30px" : "10px";
      });
    });
  });
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

  document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.elements.name.value = '';
    e.target.elements.email.value = '';
    e.target.elements.message.value = '';
  });
  
  document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        let filter = button.getAttribute('data-filter');
        document.querySelectorAll('.card:not(.clone)').forEach(card => { // Exclut les clones
            if (filter === 'all' || card.classList.contains(filter)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
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




