// Navigation Active State
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

const updateActiveLink = () => {
  let current = "home";
  const scrollY = window.pageYOffset;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollY + windowHeight >= documentHeight - 50) {
    current = "contact";
  } else {
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 200;
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
};

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);

// Scroll Animations
const animateElements = document.querySelectorAll(
  ".about-box, .experience-card, .skill-card, .contact-card, .section-title"
);

const modernObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

animateElements.forEach((el) => {
  el.classList.add("animate-on-scroll");
  modernObserver.observe(el);
});

// Project Cards Animation
const projectCards = document.querySelectorAll(".project-card");

const projectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("animate-in");
        }, index * 150);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
);

projectCards.forEach((card) => {
  card.classList.add("animate-ready");
  projectObserver.observe(card);
});

// Code Rain Effect
const canvas = document.getElementById("codeRain");
if (canvas) {
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = document.getElementById("projects").offsetHeight;

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789</>{}[]()".split("");
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function drawCodeRain() {
    ctx.fillStyle = "rgba(10, 14, 26, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#3b82f6";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(drawCodeRain, 50);

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = document.getElementById("projects").offsetHeight;
  });
}

// Glitch Effect on Hover
projectCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.classList.add("glitch");
    setTimeout(() => this.classList.remove("glitch"), 500);
  });
});

// Floating Scroll Particles
function createParticle(x, y) {
  const particle = document.createElement("div");
  particle.className = "scroll-particle";
  particle.style.left = x + "px";
  particle.style.top = y + "px";
  document.body.appendChild(particle);

  setTimeout(() => particle.remove(), 1000);
}

let lastScroll = 0;
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (Math.abs(currentScroll - lastScroll) > 50) {
    createParticle(
      Math.random() * window.innerWidth,
      currentScroll + Math.random() * window.innerHeight
    );
    lastScroll = currentScroll;
  }
});
