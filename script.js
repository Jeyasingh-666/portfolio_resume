const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");
const typingText = document.getElementById("typingText");
const currentYear = document.getElementById("currentYear");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
  });
});

// Light/dark theme toggle
themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light-theme");
  themeIcon.textContent = isLight ? "☾" : "☀";
  themeText.textContent = isLight ? "Dark Mode" : "Light Mode";
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  try { localStorage.setItem("portfolio-theme", isLight ? "light" : "dark"); } catch (error) {}
});

try {
  if (localStorage.getItem("portfolio-theme") === "light") {
    document.body.classList.add("light-theme");
    themeIcon.textContent = "☾";
    themeText.textContent = "Dark Mode";
    themeToggle.setAttribute("aria-label", "Switch to dark theme");
  }
} catch (error) {}

// Typing effect for the hero title
const roles = ["Web Developer", "UI Designer", "Creative Learner"];
let roleIndex = 0;
let letterIndex = roles[0].length;
let deleting = true;

function typeRole() {
  if (!typingText) return;
  const currentRole = roles[roleIndex];
  if (deleting) {
    letterIndex--;
    typingText.textContent = currentRole.slice(0, Math.max(0, letterIndex));
    if (letterIndex <= 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 350);
      return;
    }
    setTimeout(typeRole, 45);
  } else {
    const nextRole = roles[roleIndex];
    letterIndex++;
    typingText.textContent = nextRole.slice(0, letterIndex);
    if (letterIndex >= nextRole.length) {
      deleting = true;
      setTimeout(typeRole, 1500);
      return;
    }
    setTimeout(typeRole, 75);
  }
}
setTimeout(typeRole, 1800);

// Project category filters
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    projectCards.forEach(card => {
      card.classList.toggle("is-hidden", filter !== "all" && card.dataset.category !== filter);
    });
  });
});

// Expand/collapse project learning details
document.querySelectorAll(".details-btn").forEach(button => {
  button.addEventListener("click", () => {
    const details = button.nextElementSibling;
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    details.hidden = expanded;
    button.querySelector("span").textContent = expanded ? "＋" : "−";
  });
});

// Demonstration contact form validation (does not send data)
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("visitorName").value.trim();
  const email = document.getElementById("visitorEmail").value.trim();
  const message = document.getElementById("visitorMessage").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  formMessage.className = "form-message";
  if (!name || !email || !message) {
    formMessage.textContent = "Please fill in all three fields.";
    formMessage.classList.add("error");
  } else if (!emailPattern.test(email)) {
    formMessage.textContent = "Please enter a valid email address.";
    formMessage.classList.add("error");
  } else {
    formMessage.textContent = `Thanks, ${name}! The form is valid, but this demo does not send messages.`;
    formMessage.classList.add("success");
    contactForm.reset();
  }
});

// Current year in footer
currentYear.textContent = new Date().getFullYear();

// Highlight the navigation item for the visible section
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(anchor => {
          anchor.classList.toggle("active", anchor.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => observer.observe(section));
}
