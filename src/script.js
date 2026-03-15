document.addEventListener("DOMContentLoaded", () => {

  // Main elements
  const menuButton = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const navbar = document.getElementById("navbar");


  // Toggle mobile menu
  menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("hidden");

    // Switch icon
    if (mobileMenu.classList.contains("hidden")) {

      // Menu closed → hamburger
      menuIcon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");

    } else {

      // Menu open  X icon
      menuIcon.setAttribute("d", "M6 18L18 6M6 6l12 12");

    }

  });


  // Close menu when a link is clicked
  mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

      mobileMenu.classList.add("hidden");

      // Reset icon
      menuIcon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");

    });

  });


  // Add shadow + border on scroll
  window.addEventListener("scroll", () => {

    if (window.scrollY > 10) {

      navbar.classList.add("border-gray-200", "shadow-sm");
      navbar.classList.remove("border-transparent");

    } else {

      navbar.classList.add("border-transparent");
      navbar.classList.remove("border-gray-200", "shadow-sm");

    }

  });

});

const roles = ["A Frontend Developer", "A UI Designer", " A Problem Solver"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeTarget = document.getElementById('typewriter');

function typeEffect() {
  const currentRole = roles[roleIndex];
  
  // Add or remove letters
  if (isDeleting) {
    typeTarget.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeTarget.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  // How fast to type or delete
  let typeSpeed = isDeleting ? 40 : 100;

  // Pause or switch words
  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000; // Wait at the end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500; // Small pause before next word
  }

  setTimeout(typeEffect, typeSpeed);
}

// Start typing after 1 second
setTimeout(typeEffect, 1000);