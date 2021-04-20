import images from "./images.js";

const addImages = () => {
  const main = document.querySelector(".photos-container");
  images.forEach((imageName) => {
    const img = document.createElement("img");
    img.src = `images/${imageName}`;
    img.loading = "lazy";
    main.appendChild(img);
  });

  // element argument can be a selector string
  //   for an individual element
  // var msnry = new Masonry(main);
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
