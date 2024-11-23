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

// <!-- --------------------------------------------------------------- -->

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
    var ty = ((tp - 50)/2) * -1;
    var tx = ((lp - 50)/1.5) * .5;
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