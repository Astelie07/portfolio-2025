/*------------------------------------DEBUT THEMES--------------------------------*/

function toggleTheme() {
  // Select the <link> element
  let theme = document.getElementById('theme');
  let video = document.getElementById('second-video');
  let logo = document.getElementById('light-logo');

  if (theme.getAttribute('href') == 'assets/css/style.css') {
      theme.setAttribute('href', 'assets/css/dark-style.css');
      video.setAttribute('src', 'assets/video/dark-iddle.mp4');
      logo.setAttribute('src', 'assets/img/titre_dark.png');
  } else {
      theme.setAttribute('href', 'assets/css/style.css');
      video.setAttribute('src', 'assets/video/light-iddle.mp4');
      logo.setAttribute('src', 'assets/img/titre_.png');
  }
}

/*------------------------------------FIN THEMES--------------------------------*/

document.addEventListener("DOMContentLoaded", function() {
  const loader = document.getElementById("loader_div");
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

//------------------------portfolio scroll test

const container = document.querySelector('.cards-wrapper');
let isDown = false;
let startX;
let scrollLeft;

// Drag avec la souris
container.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
});
container.addEventListener('mouseleave', () => isDown = false);
container.addEventListener('mouseup', () => isDown = false);
container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
});

// Effet de boucle au scroll
container.addEventListener('scroll', () => {
    if (container.scrollLeft <= 0) {
        container.scrollLeft = container.scrollWidth / 2; // Revient à la fin
    } else if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 1; // Revient au début
    }
});



// -------------------------------------------------------------- PROJETS --------------------------------------------------------

$(document).ready(function () {
  // Lorsque vous cliquez sur un hexagone
  $('.clipped-border').on('click', function () {
      var targetId = $(this).data('target'); // Récupérer l'ID de la description à afficher
      var projectDiv = $('#projets'); // Sélectionner la div #projets avec jQuery
      var targetDescription = $(targetId); // Trouver la description correspondante
      var hexagonOffset = $(this).offset(); // Position de l'hexagone

      // Si la description est déjà active, la fermer
      if (targetDescription.hasClass('active')) {
          targetDescription.removeClass('active');
          // Réduire la taille de #projets à sa taille d'origine avec transition
          projectDiv.css('height', 'auto');
      } else {
          // Fermer toutes les autres descriptions
          $('.description').removeClass('active');
          projectDiv.css('height', 'auto'); 

          // Afficher la description correspondante avec la transition
          targetDescription.addClass('active');

          // Mettre à jour la position de la description sous l'hexagone
          targetDescription.css({
              top: hexagonOffset.top + $(this).outerHeight(), // Placer sous l'hexagone
          });

          // Calculer la nouvelle hauteur pour #projets, juste un peu plus grande que la description
          var descriptionHeight = targetDescription.outerHeight(); // Hauteur de la description affichée
          var padding = 40; // Un petit espace autour de la description
          var newHeight = descriptionHeight + padding; // Calculer la nouvelle hauteur de #projets

          // Ne pas étirer #projets au-delà de la hauteur nécessaire
          var currentHeight = projectDiv.outerHeight();
          if (newHeight > currentHeight) {
              // Appliquer une transition fluide pour ajuster la hauteur de #projets
              setTimeout(function() {
                  projectDiv.css('height', newHeight + 'px'); // Ajuster la hauteur de #projets
              }, 10); // Attendre un court instant avant de modifier la hauteur pour que la transition prenne effet
          }
      }
  });

  // Fermer toutes les descriptions si l'on clique en dehors
  $(document).on('click', function (event) {
      if (!$(event.target).closest('.clipped-border').length && !$(event.target).closest('.description').length) {
          $('.description').removeClass('active');
          $('#projets').css('height', 'auto'); // Réduire la taille de #projets à sa taille d'origine
      }
  });

});



