import images from "./images.js";

const main = document.querySelector("main.container");
images.forEach((imageName) => {
  const img = document.createElement("img");
  img.src = `images/${imageName}`;
  main.appendChild(img);
});
