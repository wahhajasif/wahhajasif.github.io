import images from "./images.js";

const addImages = () => {
  const imageURLs = images.map((imageFilename) => "images/" + imageFilename);

  const onImgLoad = (img) => {
    img.classList.remove("invisible");
  };

  const onAllImagesLoaded = () => {
    document.querySelectorAll(".loading-images-message").forEach((e) => {
      e.classList.toggle("invisible");
    });
  };

  loadNextImageAfterFirstImageLoaded(imageURLs, 0, {
    onAllImagesLoaded: onAllImagesLoaded,
    imgClassList: [],
    onImgLoad: onImgLoad,
  });
};

function loadNextImageAfterFirstImageLoaded(
  images = [],
  index = 0,
  props = {
    imgClassList: [""],
    onImgLoad: (img) => console.log(`${img} loaded`),
    onAllImagesLoaded: () => console.log("ALL images loaded"),
  }
) {
  const main = document.querySelector(".photos-container");
  const currentImg = document.createElement("img");

  currentImg.src = images[index];

  main.appendChild(currentImg);

  currentImg.onload = () => {
    props.onImgLoad(currentImg);

    if (images.length - 1 == index) {
      props.onAllImagesLoaded();
    } else {
      loadNextImageAfterFirstImageLoaded(images, index + 1, props);
    }
  };
  currentImg.onerror = currentImg.onload;
  currentImg.classList.add(...props.imgClassList);
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
