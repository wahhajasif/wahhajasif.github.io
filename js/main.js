import imageURLs from "./images.js";

const imageURLsByTabName = new Map();
const addImages = () => {
  const tabsList = new Set();

  imageURLs.forEach((element) => {
    const imageURL = element;
    const imageTab = element.split("/")[1];
    tabsList.add(imageTab);

    if (imageURLsByTabName[imageTab] == null) {
      imageURLsByTabName[imageTab] = [imageURL];
    } else {
      imageURLsByTabName[imageTab].push(imageURL);
    }
  });
  console.log(imageURLsByTabName);
  const tabsNavBar = document.querySelector(".tabs-bar");

  Object.entries(imageURLsByTabName).forEach((entry, index) => {
    const tabDiv = document.createElement("div");

    const tabName = entry[0];
    const imageURLs = entry[1];

    tabDiv.classList.add("tab");
    tabDiv.innerText = tabName;
    tabDiv.setAttribute("data-tabname", tabName);

    // make the first tab selected
    if (index == 0) tabDiv.classList.add("selected");

    tabsNavBar.appendChild(tabDiv);

    const main = document.querySelector("main");
    const tabContent = document.createElement("div");
    tabContent.classList.add("photos-container");
    tabContent.setAttribute("data-tabname", tabName);
    if (index != 0) tabContent.style.display = "none";

    imageURLs.forEach((imageURL) => {
      console.log(`adding image ${imageURL}}`);
      const img = document.createElement("img");
      img.src = imageURL;
      tabContent.appendChild(img);
    });

    main.appendChild(tabContent);
  });

  // const onImgLoad = (img) => {
  //   img.classList.remove("invisible");
  // };

  // const onAllImagesLoaded = () => {
  //   document.querySelectorAll(".loading-images-message").forEach((e) => {
  //     e.classList.toggle("invisible");
  //   });
  // };

  // loadNextImageAfterFirstImageLoaded(imageURLs, 0, {
  //   onAllImagesLoaded: onAllImagesLoaded,
  //   imgClassList: [],
  //   onImgLoad: onImgLoad,
  // });
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
  if (images.length == 0) {
    props.onAllImagesLoaded();
    return;
  }
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

const initializeTabsBarHandler = () => {
  const mainTabBar = document.querySelector("div.tabs-bar");
  const allTabs = mainTabBar.querySelectorAll(".tab");

  Object.keys(imageURLsByTabName).forEach((tabName, index) => {
    const tabDiv = mainTabBar.querySelector(
      `div.tab[data-tabname="${tabName}"]`
    );

    tabDiv.addEventListener("click", (e) => {
      allTabs.forEach((itab) => {
        itab.classList.remove("selected");

        Object.keys(imageURLsByTabName).forEach((tabName, index) => {
          document.querySelector(
            `.photos-container[data-tabname="${tabName}"]`
          ).style.display = "none";
        });
      });

      tabDiv.classList.toggle("selected");

      document.querySelector(
        `.photos-container[data-tabname="${tabName}"]`
      ).style.display = "";
    });
  });

  allTabs.forEach((tab) => {});
};

window.onload = () => {
  navSlide();
  addImages();
  initializeTabsBarHandler();
};
