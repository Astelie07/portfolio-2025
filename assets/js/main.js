document.addEventListener("DOMContentLoaded", function() {
    // Loader animation
    const loader = document.getElementById("loader");
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => loader.style.display = "none", 500);
    }, 2000); // Loader disparaît après 2 secondes
  
    // Menu Burger Toggle
    const burgerMenu = document.getElementById("burger-menu");
    const navLinks = document.getElementById("nav-links");
    burgerMenu.addEventListener("click", function() {
      navLinks.classList.toggle("hidden");
    });
  
    // Toggle Dark Mode
    const toggleButton = document.getElementById("toggle-theme");
    toggleButton.addEventListener("click", toggleTheme);
    
    function toggleTheme() {
      document.body.classList.toggle("dark-theme");
    }
  
    // Logo apparition lors du scroll
    const logo = document.getElementById("logo");
    const introSection = document.getElementById("intro");
    
    window.addEventListener("scroll", function() {
      if (window.scrollY > introSection.offsetHeight - 50) {
        logo.classList.add("visible");
      } else {
        logo.classList.remove("visible");
      }
    });
  
    // Effet de levitation pour les cartes du portfolio
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px)";
        card.style.boxShadow = "0px 10px 15px rgba(0, 0, 0, 0.2)";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "none";
      });
    });
  
    // Gestion de l'arbre de compétences
    const skillIcons = document.querySelectorAll("#skill-tree .skill-icon");
    skillIcons.forEach(icon => {
      icon.addEventListener("mouseenter", () => {
        icon.style.opacity = "1";
        icon.classList.add("highlighted");
      });
      icon.addEventListener("mouseleave", () => {
        icon.style.opacity = "0.2";
        icon.classList.remove("highlighted");
      });
    });
  
    // Barre d’action rapide pour les projets avec tooltip
    const quickbarItems = document.querySelectorAll(".quickbar-item");
    const projectDetails = document.getElementById("project-details");
    
    quickbarItems.forEach(item => {
      item.addEventListener("mouseenter", () => {
        const tooltip = document.createElement("div");
        tooltip.classList.add("tooltip");
        tooltip.textContent = item.getAttribute("data-tooltip");
        item.appendChild(tooltip);
      });
      
      item.addEventListener("mouseleave", () => {
        const tooltip = item.querySelector(".tooltip");
        if (tooltip) tooltip.remove();
      });
  
      // Au clic, afficher les détails du projet
      item.addEventListener("click", () => {
        projectDetails.innerHTML = `<h3>${item.getAttribute("data-tooltip")}</h3><p>Description détaillée ici...</p>`;
        projectDetails.classList.add("visible");
      });
    });
  
    // Émission de fumée ou paillettes lors du changement de personnage dans l’arbre de compétences
    function createPuffEffect(x, y) {
      const puff = document.createElement("div");
      puff.classList.add("puff");
      puff.style.left = `${x}px`;
      puff.style.top = `${y}px`;
      document.body.appendChild(puff);
  
      setTimeout(() => puff.remove(), 1000); // Retire l'effet après 1 seconde
    }
  
    // Appliquer l'effet "puff" au changement de personnage dans l’arbre de compétences
    skillIcons.forEach(icon => {
      icon.addEventListener("mouseenter", (e) => {
        createPuffEffect(e.pageX, e.pageY);
      });
    });
  });

  function toggleTheme() {
    document.body.classList.toggle("dark-theme");
  
    // Enregistrer la préférence de thème dans le localStorage
    if (document.body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }
  
  // Appliquer le thème sauvegardé lorsque la page est chargée
  window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
    }
  });
  
  