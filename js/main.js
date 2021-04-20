import images from "./images.js";

const addImages = () => {
  // images.forEach((imageName) => {
  //   `images/${imageName}`;
  // });
  const imageURLs = images.map((imageFilename) => "images/" + imageFilename);

  const onAllImagesLoaded = () => {
    document.querySelectorAll(".loading-images-message").forEach((e) => {
      e.classList.toggle("invisible");
    });
  };

  loadNextImageAfterFirstImageLoaded(imageURLs, 0, onAllImagesLoaded);

  // element argument can be a selector string
  //   for an individual element
  // var msnry = new Masonry(main);
};

function loadNextImageAfterFirstImageLoaded(
  images = [],
  index = 0,
  onAllImagesLoaded = () => console.log("ALL images loaded")
) {
  const main = document.querySelector(".photos-container");
  const img = document.createElement("img");
  img.loading = "lazy";
  img.src = images[index];
  main.appendChild(img);

  img.onload = () => {
    if (images.length - 1 == index) {
      onAllImagesLoaded();
    } else
      loadNextImageAfterFirstImageLoaded(images, index + 1, onAllImagesLoaded);
  };
  img.onerror = img.onload;
}

const navSlide = () => {
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  burger.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active");
  });
};

window.onload = () => {
  navSlide();
  addImages();
};
