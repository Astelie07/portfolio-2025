/*------------------------------------SCROLL--------------------------------*/

    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    let alertShown = false;
    let alertCount = 0;

    window.addEventListener("scroll", function () {
      if (alertShown) return;

      let now = Date.now();
      let deltaTime = now - lastTime;
      let deltaY = window.scrollY - lastScrollY;
      let speed = deltaY / deltaTime;

      if (window.innerWidth > 768 && speed > 3 && deltaY > 150) {
        alertShown = true;
        if (alertCount == 3) {
          showWarning();
        } else if(alertCount < 3) {
          showAlert();
        }
      }

      lastScrollY = window.scrollY;
      lastTime = now;
    });

    function showAlert() {
      alertCount++;
      document.getElementById("alertBox").style.display = "block";
      document.getElementById("overlay").style.display = "block";
      document.body.style.overflow = "hidden";
    }

    function closeAlert() {
      document.getElementById("alertBox").style.display = "none";
      document.getElementById("overlay").style.display = "none";
      document.body.style.overflow = "auto";
      setTimeout(() => alertShown = false, 1500);
    }

    function showWarning() {
      document.getElementById("warningBox").style.display = "block";
      document.getElementById("overlay").style.display = "block";
      document.body.style.overflow = "hidden";

      // 🔥 Active le glitch et les flashs
      document.body.classList.add("glitch", "flash");

      // Forcer le scroll vers le haut avec un effet de "bug"
      let scrollInterval = setInterval(() => {
        window.scrollTo({ top: window.scrollY - 20 + (Math.random() * 10 - 5), behavior: "smooth" });
      }, 100);
    }

    function closeWarning() {
      document.getElementById("warningBox").style.display = "none";
      document.getElementById("overlay").style.display = "none";
      document.body.style.overflow = "auto";
      alertCount ++;
      setTimeout(() => alertShown = false, 2000);

      // ❌ Supprime les effets glitch et flash
      document.body.classList.remove("glitch", "flash");
    }

/*------------------------------------DEBUT THEMES--------------------------------*/

function toggleTheme() {

  /*Theme changer*/

  let theme = document.getElementById('theme');
  //let opvideo = document.getElementById('first-video');
  let video = document.getElementById('second-video');
  let logo = document.getElementById('light-logo');

  if (theme.getAttribute('href') == 'assets/css/style.css') {
      theme.setAttribute('href', 'assets/css/dark-style.css');
      //opvideo.setAttribute('src', 'assets/video/dark-opening.mp4');
      // video.setAttribute('src', 'assets/video/dark-iddle.mp4');
      video.setAttribute('src', 'assets/img/ocs-d.png');
      logo.setAttribute('src', 'assets/img/titre_dark.png');
  } else {
      theme.setAttribute('href', 'assets/css/style.css');
      //opvideo.setAttribute('src', 'assets/video/light-opening.mp4');
      //video.setAttribute('src', 'assets/video/light-iddle.mp4');
      video.setAttribute('src', 'assets/img/ocs.png');
      logo.setAttribute('src', 'assets/img/titre_.png');
  }

  localStorage.setItem("theme", theme.getAttribute('href'));
}  

/*------------------------------------LOADER--------------------------------*/

document.addEventListener("DOMContentLoaded", function() {

  /*Detect local theme preference*/

  let theme = document.getElementById('theme');
  //let firstVideo = document.getElementById("first-video");
  let secondVideo = document.getElementById("second-video");
  let l_logo = document.getElementById('light-logo');

  // 🔹 Vérifier s'il y a un thème enregistré dans localStorage
  let savedTheme = localStorage.getItem("theme");
  console.log(savedTheme);

  if (savedTheme) {
      theme.setAttribute('href', savedTheme);
      if (savedTheme.includes("dark")) {
          theme.setAttribute('href', 'assets/css/dark-style.css');
          //firstVideo.setAttribute('src', 'assets/video/dark-opening.mp4');
          secondVideo.setAttribute('src', 'assets/img/ocs-d.png');
          l_logo.setAttribute('src', 'assets/img/titre_dark.png');
      } else {
          theme.setAttribute('href', 'assets/css/style.css');
          //firstVideo.setAttribute('src', 'assets/video/light-opening.mp4');
          secondVideo.setAttribute('src', 'assets/img/ocs.png');
          l_logo.setAttribute('src', 'assets/img/titre_.png');
      }
  } else {
      // 🔹 Si aucun thème stocké, suivre la préférence système
      const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDarkMode) {
          theme.setAttribute('href', 'assets/css/dark-style.css');
          //firstVideo.setAttribute('src', 'assets/video/dark-opening.mp4');
          secondVideo.setAttribute('src', 'assets/img/ocs-d.png');
          l_logo.setAttribute('src', 'assets/img/titre_dark.png');
      } else {
          theme.setAttribute('href', 'assets/css/style.css');
          //firstVideo.setAttribute('src', 'assets/video/light-opening.mp4');
          secondVideo.setAttribute('src', 'assets/img/ocs.png');
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

  secondVideo.style.opacity = "1";
  secondVideo.style.transition = "opacity 0.5s ease";

  //firstVideo.pause(); // S'assurer que la première vidéo est mise en pause au départ

  // Masquer le loader après la transition
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
      content.style.display = "block";

      //firstVideo.style.display = "none";
      secondVideo.style.display = "block";

      console.log("Site chargé");
        // firstVideo.play().catch(error => {
        //   console.error("Erreur lors de la lecture de la vidéo : ", error);
        // });
    }, 500); // Transition du loader
  }, 500); // Délai de 0.5s pour commencer la transition du loader

  // Quand la première vidéo est terminée, afficher la deuxième vidéo et faire apparaître le logo
  // firstVideo.addEventListener("ended", function() {
  //   // Masquer la première vidéo et afficher la deuxième
  //   firstVideo.style.display = "none";
  //   secondVideo.style.display = "block";

  //   // Ajouter la classe "show" pour déclencher le fondu du logo
  //   logo.classList.add("show");

  //   // Lancer la deuxième vidéo dès qu'elle est visible
  //   secondVideo.play().catch(error => {
  //     console.error("Erreur lors de la lecture de la deuxième vidéo : ", error);
  //   });
  // });

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
    const isMobile = window.innerWidth < 768; 

    function showProject(index) {
        if (isMobile) {
            // Sur mobile, afficher tous les projets
            projects.forEach(project => project.classList.add("active"));
            tabs.forEach(tab => tab.classList.add("active"));
        } else {
            // Comportement sur pc : un projet actif
            projects.forEach((project, i) => {
                project.classList.remove("active");
                tabs[i].classList.remove("active");
                if (i === index) {
                    project.classList.add("active");
                    tabs[i].classList.add("active");
                }
            });
        }
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", function () {
            userClicked = true;
            activeIndex = index;
            showProject(activeIndex);
        });
    });

    function autoScroll() {
        if (!userClicked && !isMobile) {
            activeIndex = (activeIndex + 1) % projects.length;
            showProject(activeIndex);
        }
    }

    showProject(activeIndex);
    if (!isMobile) setInterval(autoScroll, 60000); 
});

// ---------------------------------------------------- FORMULAIRE

$(document).ready(function() {
  $('#contact-form').on('submit', function(e) {
    e.preventDefault(); // Empêche l'envoi classique

    const $form = $(this);
    const $button = $('#submit');
    const $icon = $('#send-icon');

    $button.prop('disabled', true); // Désactive le bouton
    $icon.removeClass('fa-check').addClass('fa-spinner fa-spin'); // Animation loading

    $.ajax({
      type: 'POST',
      url: $form.attr('action'),
      data: $form.serialize(),
      success: function(response) {
        // Animation succès
        $icon.removeClass('fa-spinner fa-spin').addClass('fa-check');
        $button.removeClass('btn-primary').addClass('btn-success').text('Message envoyé !');

        // Reset du formulaire après 2s
        setTimeout(function() {
          $form.trigger('reset');
          $button.prop('disabled', false)
                 .removeClass('btn-success')
                 .addClass('btn-primary')
                 .html('Envoyer <i class="fa-solid fa-check" id="send-icon"></i>');
        }, 2000);
      },
      error: function() {
        // Animation erreur
        $icon.removeClass('fa-spinner fa-spin').addClass('fa-xmark');
        $button.removeClass('btn-primary').addClass('btn-danger').text('Erreur...');

        // Retour à la normale après 2s
        setTimeout(function() {
          $button.prop('disabled', false)
                 .removeClass('btn-danger')
                 .addClass('btn-primary')
                 .html('Envoyer <i class="fa-solid fa-check" id="send-icon"></i>');
        }, 2000);
      }
    });
  });
});

// -------------------- Badges

let imageChosen = false;  // Si image choisie

        // Affiche la lightbox quand on atteint le bas
        window.addEventListener('scroll', function () {
          // Si une image a déjà été choisie, on ne réaffiche pas la lightbox
          if (imageChosen) return;
        
          const scrollPosition = window.innerHeight + window.scrollY;
          const documentHeight = document.documentElement.scrollHeight;
          const jingle = document.getElementById('AppearSound');
          jingle.volume = 0.5;
            
          if (scrollPosition >= documentHeight) {
            jingle.currentTime = 0;
            jingle.play();
            const lightbox = document.getElementById('lightbox');
            lightbox.style.display = 'flex';
          }
        });
        
        // Gère le clic sur une image
        document.querySelectorAll('.selectable-img').forEach(img => {

          img.addEventListener('click', function () {
            // Si une image a déjà été choisie, on arrête la fonction
            if (imageChosen) return;
        
            const lightbox = document.getElementById('lightbox');
            const chosenContainer = document.getElementById('chosenImageContainer');
            
            // Nettoie les anciennes images dans chosenContainer
            chosenContainer.innerHTML = '';
        
            // Jouer le son
            const sound = document.getElementById('clickSound');
            sound.volume = 0.5;
            sound.currentTime = 0;
            sound.play();
        
            // Animation de rétrécissement sur l'image sélectionnée dans la lightbox
            this.classList.add('clicked');
        
            // Après l'animation, cacher la lightbox
            setTimeout(() => {
              lightbox.style.display = 'none';
              
              // Créer l'image flottante pour la placer en bas à droite

              const floatingImg = document.createElement('img');
              floatingImg.src = this.src;
              floatingImg.className = 'floating-image';
              document.body.appendChild(floatingImg);
        
              // Positionner l'image flottante en bas à droite
              floatingImg.style.position = 'fixed';
              floatingImg.style.top = '20px';
              floatingImg.style.right = '20px';
              floatingImg.style.zIndex = 1001;

              //Adaptation thème
              let theme = document.getElementById('theme');

              if (theme.getAttribute('href') == 'assets/css/style.css') {
                floatingImg.className = 'floating-image light-img';
              }else{
                floatingImg.className = 'floating-image dark-img';
              }
        
              // Appliquer l'animation de scale à l'image flottante
              setTimeout(() => {
                floatingImg.classList.add('clicked');
              }, 10); // Décalage de 10ms pour garantir que l'image soit visible avant l'animation
        
              // Gérer le clic sur l'image flottante
              floatingImg.addEventListener('click', function () {
                // Son
                const sound = document.getElementById('clickSound');
                sound.currentTime = 0;
                sound.play();
        
                // Si l'image flottante n'a pas encore l'animation de rétrécissement, appliquer l'animation
                if (!floatingImg.classList.contains('clicked')) {
                  // Animation de rétrécissement de l'image flottante
                  floatingImg.classList.add('clicked');
        
                  // Supprimer l'image après l'animation
                  setTimeout(() => {
                    floatingImg.remove();
                  }, 500); // doit correspondre à la durée de l'animation
                }
              });
              
              // Marque l'image comme choisie
              imageChosen = true;
            }, 500); // durée de l'animation de la lightbox
          });
        });




