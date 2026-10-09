// ==========================================
// MIMI PHOTO ARCHIVE
// ==========================================


// ==========================================
// CAPTIONS
// ==========================================

const captions = [
  "Babies do not want to hear about babies; they like to be told of giants and castles.",
  "The world must look different from down there.",
  "I imagine I am a snail leaving magic everywhere I go.",
  "Everything is worth looking at twice.",
  "I am a child of wonder again.",
  "You find something extraordinary in everything ordinary.",
  "A sea beneath a cloudless sun.",
  "The smallest things hold your attention the longest.",
  "I wonder what the world looks like through your eyes.",
  "You make me curious about things I thought I already knew.",
  "There is a Smile of Love.",
  "Some feelings arrive before words do.",
  "A face that says everything and nothing.",
  "You have not learned to hide your feelings yet.",
  "Your laughter always arrives before I expect it.",
  "I wish happiness could always be this simple.",
  "A little face carrying a very big feeling.",
  "Sometimes I don't know what you're trying to tell me.",
  "I have learned to listen to your expressions.",
  "You, so slow to know what you know and don't know.",
  "You are growing faster than I can remember.",
  "Which childhood? The one from which you'll never escape?",
  "I wonder which moments you will remember.",
  "Every day, you become a little more yourself.",
  "You will never be this small again.",
  "One day, you won't need my hand to cross the street.",
  "I keep taking pictures as though I could slow down time.",
  "I am watching you grow while learning how to grow myself.",
  "The photographs whispered to each other from their frames in the hallway.",
  "I take photographs because I know I will forget.",
  "What is it in us that lives in the future and longs for the past?",
  "You won't remember this afternoon, but I will.",
  "One came the way that I came—and wore my past year's gown.",
  "A photograph is a way of asking a moment to stay.",
  "I wonder whether you will recognize yourself in these pictures.",
  "Is childhood, then, so all divine? Or, Memory, is the glory thine?",
  "Today is far from childhood.",
  "I once held my sister's hand the way you now hold mine.",
  "I used to be the one who needed looking after.",
  "Sometimes love feels like responsibility.",
  "I have managed to poem all my pain; tell me, what do you do with yours?",
  "There are things about growing up that I never learned to say.",
  "I see my sister in you, and sometimes I see myself.",
  "Somehow, caring for you has changed the way I remember being cared for.",
  "And what is the future, happy one?",
  "There is so much you have yet to discover.",
  "I wonder what kind of person you will become.",
  "One day, these photographs will belong to a version of you I haven't met.",
  "I hope the world stays gentle with you.",
  "You will outgrow my arms, but never these photographs.",
  "Perhaps this archive is as much about me as it is about you.",
  "For now, you are here. And I am looking."
];


// ==========================================
// EXACT PHOTO FILE NAMES
// ==========================================

const photoFiles = [
  "photo-01.jpg",
  "photo-02.JPG",
  "photo-03.jpg",
  "photo-04.jpg",
  "photo-05.JPG",
  "photo-06.JPG",
  "photo-07.JPG",
  "photo-08.JPG",
  "photo-09.JPG",
  "photo-10.jpg",
  "photo-11.JPG",
  "photo-12.JPG",
  "photo-13.JPG",
  "photo-14.JPG",
  "photo-15.JPG",
  "photo-16.jpg",
  "photo-17.JPG",
  "photo-18.JPG",
  "photo-19.JPG",
  "photo-20.JPG",
  "photo-21.JPG",
  "photo-22.JPG",
  "photo-23.JPG",
  "photo-24.JPG",
  "photo-25.JPG",
  "photo-26.JPG",
  "photo-27.JPG",
  "photo-28.JPG",
  "photo-29.JPG",
  "photo-30.JPG",
  "photo-31.jpg",
  "photo-32.JPG",
  "photo-33.jpg",
  "photo-34.jpg",
  "photo-35.jpg",
  "photo-36.JPG",
  "photo-37.JPG",
  "photo-38.JPG",
  "photo-39.JPG",
  "photo-40.JPG",
  "photo-41.jpg",
  "photo-42.jpg",
  "photo-43.jpg",
  "photo-44.jpg",
  "photo-45.JPG",
  "photo-46.JPG",
  "photo-47.JPG",
  "photo-48.jpg",
  "photo-49.JPG",
  "photo-50.JPG",
  "photo-51.JPG",
  "photo-52.JPG"
];


// ==========================================
// PHOTO DATA
// ==========================================

const photos = photoFiles.map((filename, index) => ({
  src: `images/${filename}`,

  caption:
    captions[index] ??
    `Expression ${String(index + 1).padStart(2, "0")}`,

  alt:
    `Expression photograph ${index + 1}`
}));


// ==========================================
// PAGE ELEMENTS
// ==========================================

const grid =
  document.getElementById("photo-grid");

const featuredImage =
  document.getElementById("featured-image");

const featuredCaption =
  document.getElementById("featured-caption");

const archiveSection =
  document.querySelector(".archive");

const stitchTrack =
  document.querySelector(".stitch-scroll");

const stitchLine =
  document.querySelector(".stitch-line");

const loader =
  document.getElementById("loader");

const loaderPhotos =
  document.getElementById("loader-photos");

const loadingText =
  document.getElementById("loading-text");


// ==========================================
// SETTINGS
// ==========================================

const columns = 8;

let selectedPhoto = photos[0];
let selectedButton = null;


// ==========================================
// SHOW PHOTO ON RIGHT
// ==========================================

function showPhoto(photo) {

  if (!photo) return;

  if (featuredImage) {
    featuredImage.src = photo.src;
    featuredImage.alt = photo.alt;
  }

  if (featuredCaption) {
    featuredCaption.textContent =
      photo.caption;
  }
}


// ==========================================
// SELECT PHOTO
// ==========================================

function selectPhoto(photo, button) {

  if (selectedButton) {

    selectedButton.classList.remove(
      "selected"
    );

    selectedButton.setAttribute(
      "aria-pressed",
      "false"
    );
  }

  selectedPhoto = photo;
  selectedButton = button;

  if (button) {

    button.classList.add(
      "selected"
    );

    button.setAttribute(
      "aria-pressed",
      "true"
    );
  }

  showPhoto(photo);
}


// ==========================================
// CLICK WAVE
// ==========================================

function createWave() {

  if (!grid) return;

  const tiles =
    grid.querySelectorAll(
      ".photo-tile"
    );

  tiles.forEach(
    (tile, index) => {

      tile.classList.remove(
        "wave"
      );

      void tile.offsetWidth;

      const column =
        index % columns;

      tile.style.animationDelay =
        `${column * 45}ms`;

      tile.classList.add(
        "wave"
      );

      setTimeout(() => {

        tile.classList.remove(
          "wave"
        );

        tile.style.animationDelay =
          "";

      }, 1200);

    }
  );
}


// ==========================================
// BUILD CHECKERBOARD
// ==========================================

function buildGrid() {

  if (!grid) return;

  grid.innerHTML = "";

  let photoIndex = 0;


  for (
    let row = 0;
    photoIndex < photos.length;
    row++
  ) {

    for (
      let col = 0;
      col < columns;
      col++
    ) {


      // ====================================
      // WHITE TILE
      // ====================================

      if ((row + col) % 2 !== 0) {

        const blank =
          document.createElement(
            "div"
          );

        blank.className =
          "tile blank interactive-blank";


        // FLIP CARD

        const card =
          document.createElement(
            "div"
          );

        card.className =
          "flip-card";


        // WHITE FRONT

        const front =
          document.createElement(
            "div"
          );

        front.className =
          "flip-face flip-white";


        // IMAGE BACK

        const back =
          document.createElement(
            "div"
          );

        back.className =
          "flip-face flip-image";


        const backImage =
          document.createElement(
            "img"
          );

        // Temporary image.
        // This gets changed when
        // scrolling down.

        backImage.src =
          photos[0].src;

        backImage.alt = "";


        back.appendChild(
          backImage
        );

        card.appendChild(
          front
        );

        card.appendChild(
          back
        );

        blank.appendChild(
          card
        );


        // Makes the flip travel
        // vertically down the grid.

        blank.style.setProperty(
          "--flip-delay",
          `${row * 35}ms`
        );


        grid.appendChild(
          blank
        );

        continue;
      }


      // ====================================
      // NORMAL PHOTO TILE
      // ====================================

      const photo =
        photos[photoIndex];

      if (!photo) {
        break;
      }


      const number =
        String(photoIndex + 1)
          .padStart(2, "0");


      photoIndex++;


      const button =
        document.createElement(
          "button"
        );

      button.className =
        "tile photo-tile";

      button.type =
        "button";

      button.setAttribute(
        "aria-label",
        `View photograph ${number}`
      );

      button.setAttribute(
        "aria-pressed",
        "false"
      );


      const image =
        document.createElement(
          "img"
        );

      image.src =
        photo.src;

      image.alt = "";

      image.loading =
        photoIndex > 12
          ? "lazy"
          : "eager";


      const numberLabel =
        document.createElement(
          "span"
        );

      numberLabel.className =
        "photo-number";

      numberLabel.textContent =
        number;


      button.appendChild(
        image
      );

      button.appendChild(
        numberLabel
      );


      // HOVER

      button.addEventListener(
        "mouseenter",
        () => {

          showPhoto(photo);

        }
      );


      button.addEventListener(
        "mouseleave",
        () => {

          showPhoto(
            selectedPhoto
          );

        }
      );


      // CLICK

      button.addEventListener(
        "click",
        () => {

          selectPhoto(
            photo,
            button
          );

          createWave();

        }
      );


      grid.appendChild(
        button
      );


      if (photoIndex === 1) {

        selectPhoto(
          photo,
          button
        );
      }
    }
  }
}


buildGrid();


// ==========================================
// GET ALL WHITE TILES
// ==========================================

const whiteTiles =
  grid
    ? [
        ...grid.querySelectorAll(
          ".interactive-blank"
        )
      ]
    : [];


// ==========================================
// FLIP STATE
// ==========================================

let showingImages = false;


// Remember the previous photo so we
// don't immediately choose it again.

let previousRandomIndex = -1;


// ==========================================
// CHOOSE ONE RANDOM PHOTO
// ==========================================

function chooseRandomPhoto() {

  let randomIndex;


  do {

    randomIndex =
      Math.floor(
        Math.random() *
        photos.length
      );

  } while (
    randomIndex ===
      previousRandomIndex &&
    photos.length > 1
  );


  previousRandomIndex =
    randomIndex;


  return photos[randomIndex];
}


// ==========================================
// SCROLL DOWN
// ONE PHOTO → EVERY WHITE TILE
// ==========================================

function showHiddenImages() {

  // Don't change the image while
  // it is already visible.

  if (showingImages) {
    return;
  }


  // Choose ONE photo.

  const chosenPhoto =
    chooseRandomPhoto();


  // Put EXACTLY THE SAME PHOTO
  // inside EVERY white tile.

  whiteTiles.forEach(
    (tile) => {

      const image =
        tile.querySelector(
          ".flip-image img"
        );


      if (image) {

        image.src =
          chosenPhoto.src;

      }

    }
  );


  // Flip all white tiles.

  requestAnimationFrame(
    () => {

      whiteTiles.forEach(
        (tile) => {

          tile.classList.add(
            "show-image"
          );

        }
      );

    }
  );


  showingImages = true;
}


// ==========================================
// SCROLL UP
// IMAGE → WHITE
// ==========================================

function showWhiteTiles() {

  if (!showingImages) {
    return;
  }


  whiteTiles.forEach(
    (tile) => {

      tile.classList.remove(
        "show-image"
      );

    }
  );


  showingImages = false;
}


// ==========================================
// SCROLL DIRECTION
// ==========================================

let lastScrollTop =
  archiveSection
    ? archiveSection.scrollTop
    : 0;


// We require a little movement before
// changing state. This prevents a
// sensitive trackpad from flickering.

let accumulatedScroll = 0;

let lastDirection = null;

const flipThreshold = 30;


// ==========================================
// HANDLE SCROLL
// ==========================================

function handleFlipScroll() {

  if (!archiveSection) {
    return;
  }


  const currentScrollTop =
    archiveSection.scrollTop;


  const difference =
    currentScrollTop -
    lastScrollTop;


  // No movement.

  if (difference === 0) {
    return;
  }


  const direction =
    difference > 0
      ? "down"
      : "up";


  // If user changes direction,
  // reset the movement counter.

  if (
    direction !==
    lastDirection
  ) {

    accumulatedScroll = 0;

    lastDirection =
      direction;
  }


  accumulatedScroll +=
    Math.abs(difference);


  // Wait until user has actually
  // moved enough.

  if (
    accumulatedScroll >=
    flipThreshold
  ) {


    // DOWN
    // Choose a new image.

    if (
      direction === "down" &&
      !showingImages
    ) {

      showHiddenImages();

    }


    // UP
    // Return to white.

    else if (
      direction === "up" &&
      showingImages
    ) {

      showWhiteTiles();

    }


    accumulatedScroll = 0;
  }


  lastScrollTop =
    currentScrollTop;
}


// ==========================================
// STITCH SCROLL
// ==========================================

function updateStitchScroll() {

  if (!archiveSection) return;

  const stitchGroups =
    document.querySelectorAll(".stitch-group");

  if (stitchGroups.length !== 2) return;

  const maxScroll =
    archiveSection.scrollHeight -
    archiveSection.clientHeight;

  const progress =
    maxScroll > 0
      ? archiveSection.scrollTop / maxScroll
      : 0;

  // First half = first group active
  // Second half = second group active

  const activeIndex =
    progress < 0.5 ? 0 : 1;

  stitchGroups.forEach((group, index) => {

    group.classList.toggle(
      "active",
      index === activeIndex
    );

  });
}

// ==========================================
// ONE SCROLL LISTENER
// ==========================================

if (archiveSection) {

  archiveSection.addEventListener(
    "scroll",
    () => {

      handleFlipScroll();

      updateStitchScroll();

    },
    {
      passive: true
    }
  );
}


window.addEventListener(
  "resize",
  updateStitchScroll
);


updateStitchScroll();


// ==========================================
// LOADER
// ==========================================

const loaderPhotoCount =
  Math.min(
    44,
    photos.length
  );


const introImages = [];


// ==========================================
// CREATE LOADER PHOTOS
// ==========================================

if (loaderPhotos) {

  for (
    let i = 0;
    i < loaderPhotoCount;
    i++
  ) {

    const image =
      document.createElement(
        "img"
      );


    image.src =
      photos[i].src;

    image.alt = "";

    image.className =
      "loader-photo";


    loaderPhotos.appendChild(
      image
    );


    introImages.push(
      image
    );
  }
}


// ==========================================
// PILE POSITIONS
// ==========================================

const pilePositions = [

  {x:34,y:35,w:85,h:105,r:-8},
  {x:40,y:30,w:55,h:72,r:5},
  {x:45,y:35,w:110,h:135,r:-3},
  {x:52,y:27,w:68,h:88,r:7},
  {x:58,y:34,w:95,h:120,r:-6},
  {x:64,y:31,w:52,h:68,r:4},

  {x:30,y:44,w:60,h:80,r:6},
  {x:36,y:45,w:105,h:128,r:-4},
  {x:43,y:44,w:62,h:82,r:8},
  {x:49,y:43,w:82,h:105,r:-7},
  {x:55,y:45,w:120,h:145,r:3},
  {x:62,y:43,w:72,h:94,r:-3},
  {x:68,y:46,w:100,h:125,r:6},

  {x:27,y:54,w:90,h:112,r:-5},
  {x:34,y:55,w:58,h:76,r:7},
  {x:40,y:54,w:115,h:140,r:-2},
  {x:47,y:53,w:70,h:92,r:5},
  {x:53,y:54,w:92,h:116,r:-8},
  {x:60,y:54,w:55,h:74,r:4},
  {x:67,y:55,w:108,h:132,r:-4},
  {x:72,y:52,w:65,h:84,r:7},

  {x:31,y:64,w:55,h:72,r:5},
  {x:37,y:64,w:98,h:122,r:-7},
  {x:44,y:64,w:75,h:96,r:4},
  {x:50,y:63,w:125,h:150,r:-3},
  {x:57,y:64,w:62,h:80,r:8},
  {x:63,y:63,w:90,h:112,r:-5},
  {x:69,y:64,w:52,h:70,r:6},

  {x:35,y:73,w:82,h:102,r:-4},
  {x:42,y:73,w:55,h:72,r:7},
  {x:48,y:72,w:105,h:130,r:-6},
  {x:55,y:73,w:70,h:90,r:5},
  {x:62,y:72,w:100,h:125,r:-3},

  {x:40,y:80,w:60,h:78,r:5},
  {x:47,y:79,w:92,h:115,r:-5},
  {x:54,y:80,w:55,h:72,r:7},
  {x:60,y:79,w:82,h:105,r:-4},

  {x:38,y:40,w:48,h:64,r:9},
  {x:46,y:48,w:50,h:66,r:-9},
  {x:57,y:39,w:48,h:64,r:8},
  {x:65,y:49,w:50,h:66,r:-7},

  {x:42,y:59,w:48,h:64,r:8},
  {x:58,y:59,w:50,h:66,r:-9},
  {x:51,y:69,w:48,h:64,r:7}

];


// ==========================================
// MIMI PATTERN
// ==========================================

const mimiPattern = [

  // M
  [0,0],
  [4,0],
  [0,1],
  [1,1],
  [3,1],
  [4,1],
  [0,2],
  [2,2],
  [4,2],
  [0,3],
  [4,3],
  [0,4],
  [4,4],

  // I
  [6,0],
  [6,1],
  [6,2],
  [6,3],
  [6,4],

  // M
  [8,0],
  [12,0],
  [8,1],
  [9,1],
  [11,1],
  [12,1],
  [8,2],
  [10,2],
  [12,2],
  [8,3],
  [12,3],
  [8,4],
  [12,4],

  // I
  [14,0],
  [14,1],
  [14,2],
  [14,3],
  [14,4]

];


// ==========================================
// MIMI POSITIONS
// ==========================================

function getMimiPositions() {

  const tileWidth = 48;
  const tileHeight = 62;

  const wordWidth =
    15 * tileWidth;

  const wordHeight =
    5 * tileHeight;


  const startX =
    (
      window.innerWidth -
      wordWidth
    ) / 2;


  const startY =
    (
      window.innerHeight -
      wordHeight
    ) / 2;


  return mimiPattern.map(
    ([column, row]) => ({

      x:
        startX +
        column *
        tileWidth,

      y:
        startY +
        row *
        tileHeight,

      w:
        tileWidth,

      h:
        tileHeight

    })
  );
}


// ==========================================
// PREPARE LOADER
// ==========================================

function prepareLoader() {

  introImages.forEach(
    (image, index) => {

      image.style.left =
        "50%";

      image.style.top =
        "50%";

      image.style.width =
        "30px";

      image.style.height =
        "40px";

      image.style.opacity =
        "0";

      image.style.zIndex =
        String(index);

      image.style.transform =
        "translate(-50%, -50%) scale(.4)";
    }
  );
}


// ==========================================
// BUILD PILE
// ==========================================

function buildPile() {

  if (loadingText) {

    loadingText.textContent =
      "LOADING ARCHIVE";
  }


  introImages.forEach(
    (image, index) => {

      const p =
        pilePositions[index];

      if (!p) return;


      setTimeout(() => {

        image.style.left =
          `${p.x}%`;

        image.style.top =
          `${p.y}%`;

        image.style.width =
          `${p.w}px`;

        image.style.height =
          `${p.h}px`;

        image.style.opacity =
          "1";

        image.style.zIndex =
          String(
            1 +
            ((index * 7) % 30)
          );

        image.style.transform =
          `translate(-50%, -50%) rotate(${p.r}deg) scale(1)`;

      }, index * 32);

    }
  );
}


// ==========================================
// FORM MIMI
// ==========================================

function formMimi() {

  if (loadingText) {

    loadingText.textContent =
      "ORGANIZING";
  }


  const positions =
    getMimiPositions();


  introImages.forEach(
    (image, index) => {

      const p =
        positions[index];


      if (!p) {

        image.style.opacity =
          "0";

        return;
      }


      image.style.left =
        `${p.x}px`;

      image.style.top =
        `${p.y}px`;

      image.style.width =
        `${p.w + 1}px`;

      image.style.height =
        `${p.h + 1}px`;

      image.style.opacity =
        "1";

      image.style.zIndex =
        "1";

      image.style.transform =
        "translate(0, 0) rotate(0deg) scale(1)";
    }
  );
}


// ==========================================
// BREAK APART
// ==========================================

function breakApart() {

  if (loadingText) {

    loadingText.textContent =
      "52 MOMENTS";
  }


  introImages.forEach(
    (image, index) => {

      const side =
        index % 2 === 0
          ? -1
          : 1;


      const x =
        50 +
        side *
        (
          30 +
          Math.random() *
          35
        );


      const y =
        10 +
        Math.random() *
        80;


      const rotation =
        -20 +
        Math.random() *
        40;


      image.style.left =
        `${x}%`;

      image.style.top =
        `${y}%`;

      image.style.opacity =
        "0";

      image.style.transform =
        `translate(-50%, -50%) rotate(${rotation}deg) scale(.65)`;
    }
  );
}


// ==========================================
// FINISH LOADER
// ==========================================

function finishLoader() {

  if (!loader) return;

  loader.classList.add(
    "finished"
  );
}


// ==========================================
// RUN LOADER
// ==========================================

function runLoader() {

  if (
    !loader ||
    !loaderPhotos
  ) {
    return;
  }


  prepareLoader();

  setTimeout(
    buildPile,
    300
  );

  setTimeout(
    formMimi,
    2200
  );

  setTimeout(
    breakApart,
    3500
  );

  setTimeout(
    finishLoader,
    4100
  );
}


// ==========================================
// START
// ==========================================

window.addEventListener(
  "load",
  runLoader
);