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


const inner = document.getElementById("card-inner");
const input = document.getElementById("terminal-input");
const button = document.getElementById("run-btn");

const validCommands = ["show", "open", "hello"];

function flipCard() {
  inner.classList.add("flipped");
}

function handleCommand() {
  const value = input.value.trim().toLowerCase();

  if (validCommands.includes(value)) {
    input.value = "";
    input.placeholder = "running command...";

    setTimeout(() => {
      flipCard();
    }, 400);

  } else {
    input.value = "";
    input.placeholder = "command not found...";
  }
}

// Button click
button.addEventListener("click", handleCommand);

// Enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleCommand();
  }
});




document.addEventListener("DOMContentLoaded", () => {

  function setupFilter(sectionId, cardClass, options = {}) {
    const section = document.querySelector(sectionId);
    if (!section) return;

    const buttons = section.querySelectorAll('.filter-btn');
    const cards = section.querySelectorAll(cardClass);

    const runExtra = options.onFilter || (() => {});

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {

        // reset buttons
        buttons.forEach(b => {
          b.classList.remove(
            'bg-gradient-to-r',
            'from-blue-600',
            'to-cyan-400',
            'text-white'
          );
          b.classList.add('text-slate-500');
        });

        // activate button
        btn.classList.add(
          'bg-gradient-to-r',
          'from-blue-600',
          'to-cyan-400',
          'text-white'
        );
        btn.classList.remove('text-slate-500');

        const category = btn.getAttribute('data-filter');

        cards.forEach(card => {
          const cardCat = card.getAttribute('data-category');

          if (category === 'all' || cardCat.includes(category)) {

            card.classList.remove('hidden');

            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);

          } else {

            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';

            setTimeout(() => {
              card.classList.add('hidden');
            }, 300);
          }
        });

        runExtra(); // for skills
      });
    });
  }


  //  SKILLS SETUP
  

  const skillsSection = document.querySelector('#skills');
  const bars = skillsSection.querySelectorAll('.progress-bar');

  const runSkillAnimations = () => {
    bars.forEach(bar => {
      const card = bar.closest('.skill-card');

      if (!card.classList.contains('hidden')) {
        const targetWidth = bar.getAttribute('data-target');

        bar.style.transition = 'none';
        bar.style.width = '0%';

        setTimeout(() => {
          bar.style.transition = 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1)';
          bar.style.width = targetWidth;
        }, 50);
      }
    });
  };

  // intersection observer for skills
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      runSkillAnimations();
      observer.disconnect();
    }
  }, { threshold: 0.1 });

  observer.observe(skillsSection);

  // INIT BOTH SECTIONS

  setupFilter('#skills', '.skill-card', {
    onFilter: runSkillAnimations
  });

  setupFilter('#projects', '.project-card');

});


