const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

const sections = document.querySelectorAll("section[id]");
const navLinkEls = document.querySelectorAll(".nav-link");

function setActiveLink() {
  let scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 90;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinkEls.forEach((link) => link.classList.remove("active"));
      const activeLink = document.querySelector('.nav-link[href="#' + id + '"]');
      if (activeLink) activeLink.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);

const themeToggle = document.querySelector(".theme-toggle");
const body = document.body;

const savedTheme = localStorage.getItem("neeraj-theme");
if (savedTheme === "dark") {
  body.classList.add("dark");
  if (themeToggle) themeToggle.textContent = "☀️";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("neeraj-theme", isDark ? "dark" : "light");
  });
}

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealElements.forEach((el) => observer.observe(el));

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function showError(input, message) {
  const formGroup = input.parentElement;
  const errorMsg = formGroup.querySelector(".error-msg");
  if (errorMsg) errorMsg.textContent = message;
  input.classList.add("input-error");
}

function clearError(input) {
  const formGroup = input.parentElement;
  const errorMsg = formGroup.querySelector(".error-msg");
  if (errorMsg) errorMsg.textContent = "";
  input.classList.remove("input-error");
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    let isValid = true;

    if (!nameInput.value.trim()) {
      showError(nameInput, "Name is required.");
      isValid = false;
    } else {
      clearError(nameInput);
    }

    if (!emailInput.value.trim()) {
      showError(emailInput, "Email is required.");
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, "Please enter a valid email.");
      isValid = false;
    } else {
      clearError(emailInput);
    }

    if (!messageInput.value.trim()) {
      showError(messageInput, "Message is required.");
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, "Message should be at least 10 characters.");
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (!isValid) {
      if (formStatus) {
        formStatus.textContent = "Please fix the errors above.";
        formStatus.style.color = "#ef4444";
      }
      return;
    }

    if (formStatus) {
      formStatus.textContent =
        "Thank you! Your message is ready to be sent (demo only – backend not connected).";
      formStatus.style.color = "#22c55e";
    }

    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
  });
}