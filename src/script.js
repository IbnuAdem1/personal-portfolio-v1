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
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.skill-card');
  const bars = document.querySelectorAll('.progress-bar');

  // animate visible progress bars
  const runAnimations = () => {
    bars.forEach(bar => {
      const card = bar.closest('.skill-card');

      if (card.style.display !== 'none') {
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

  // trigger once when #skills enters view
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      runAnimations();
      observer.disconnect();
    }
  }, { threshold: 0.1 });

  observer.observe(document.querySelector('#skills'));

  // filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

      // reset buttons
      filterBtns.forEach(b => {
        b.classList.remove(
          'bg-gradient-to-r',
          'from-blue-600',
          'to-cyan-400',
          'text-white',
          'shadow-[0_10px_20px_-5px_rgba(37,99,235,0.3)]'
        );
        b.classList.add('text-slate-500');
        b.classList.remove('active');
      });

      // activate current button
      btn.classList.add(
        'bg-gradient-to-r',
        'from-blue-600',
        'to-cyan-400',
        'text-white',
        'shadow-[0_10px_20px_-5px_rgba(37,99,235,0.3)]'
      );
      btn.classList.remove('text-slate-500');
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      // filter cards
      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');

        if (category === 'all' || cardCat === category) {
          card.style.display = 'block';

          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';

          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });

      runAnimations();
    });
  });
});