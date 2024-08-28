window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  loader.classList.add("loader-hidden"); // Add class to hide the loader

  loader.addEventListener("transitionend", () => {
    // Check if the loader is still a child of document.body before removing it
    if (loader && loader.parentNode) {
      document.body.removeChild(loader);
    }
  });
});

// Reveal Scroll Animations
window.addEventListener("scroll", reveal);
function reveal() {
  let reveals = document.querySelectorAll(".reveal");
  for (let i = 0; i < reveals.length; i++) {
    let windowheight = window.innerHeight;
    let revealTop = reveals[i].getBoundingClientRect().top;
    let revealPoint = 150;
    if (revealTop < windowheight - revealPoint) {
      reveals[i].classList.add("show");
    } else {
      reveals[i].classList.remove("show");
    }
  }
}

let icon = document.getElementById("light-mode-icon");

icon.onclick = function () {
  document.body.classList.toggle("light-mode-colors");

  if (document.body.classList.contains("light-mode-colors")) {
    icon.className = "fas fa-moon";
  } else {
    icon.className = "fas fa-sun";
  }
};

let slideImages = document.querySelectorAll(".slides img");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let dots = document.querySelectorAll(".dot");
let counter = 0;

// Function to update the slides and dots
function updateSlide(index) {
  slideImages.forEach((img, i) => {
    img.classList.remove("active");
    dots[i].classList.remove("active");

    if (i === index) {
      img.classList.add("active");
      dots[i].classList.add("active");
    }
  });
}

// Next button event listener
next.addEventListener("click", () => {
  counter = (counter + 1) % slideImages.length;
  updateSlide(counter);
});

// Previous button event listener
prev.addEventListener("click", () => {
  counter = (counter - 1 + slideImages.length) % slideImages.length;
  updateSlide(counter);
});

// Dot click event listeners
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    counter = index;
    updateSlide(counter);
  });
});
