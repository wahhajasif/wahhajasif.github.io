import images from "./images.js";

const addImages = () => {
  const main = document.querySelector("main.container");
  images.forEach((imageName) => {
    const img = document.createElement("img");
    img.src = `images/${imageName}`;
    main.appendChild(img);
  });
};

const navSlide = () => {
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  burger.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active");
  });
};

navSlide();
addImages();
