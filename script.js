// ==========================================
// PHOTO ARCHIVE
// ==========================================

const captions = [
  "An expression, a moment, a memory.",
  "The little things I never want to forget.",
  "A face that says more than words."
];


const photos = Array.from(
  { length: 52 },
  (_, i) => ({
    src: `images/photo-${String(i + 1).padStart(2, "0")}.jpg`,
    caption:
      captions[i] ??
      `Expression ${String(i + 1).padStart(2, "0")}`,
    alt:
      `Expression photograph ${i + 1}`
  })
);


// ==========================================
// ELEMENTS
// ==========================================

const grid =
  document.getElementById("photo-grid");

const featuredImage =
  document.getElementById("featured-image");

const featuredCaption =
  document.getElementById("featured-caption");

const loader =
  document.getElementById("loader");

const loaderPhotos =
  document.getElementById("loader-photos");

const loadingText =
  document.getElementById("loading-text");


// ==========================================
// GALLERY
// ==========================================

const columns = 8;

let selectedButton = null;
let selectedPhoto = photos[0];


function showPhoto(photo) {

  featuredImage.src = photo.src;

  featuredImage.alt = photo.alt;

  featuredCaption.textContent =
    photo.caption;

}


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


  button.classList.add(
    "selected"
  );

  button.setAttribute(
    "aria-pressed",
    "true"
  );


  showPhoto(photo);

}


// ==========================================
// GRID WAVE
// ==========================================

function createWave() {

  const tiles = [
    ...document.querySelectorAll(
      ".tile:not(.blank)"
    )
  ];


  const gridRect =
    grid.getBoundingClientRect();


  tiles.forEach((tile) => {

    const rect =
      tile.getBoundingClientRect();

    const horizontalPosition =
      rect.left -
      gridRect.left;

    const delay =
      horizontalPosition * 1.2;


    tile.classList.remove(
      "wave"
    );

    void tile.offsetWidth;


    tile.style.animationDelay =
      `${delay}ms`;

    tile.classList.add(
      "wave"
    );


    setTimeout(
      () => {

        tile.classList.remove(
          "wave"
        );

        tile.style.animationDelay =
          "";

      },

      delay + 1000
    );

  });

}


// ==========================================
// CREATE CHECKERBOARD
// ==========================================

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

    // BLANK CHECKERBOARD SPACE

    if ((row + col) % 2 !== 0) {

      const blank =
        document.createElement("div");

      blank.className =
        "tile blank";

      blank.setAttribute(
        "aria-hidden",
        "true"
      );

      grid.appendChild(blank);

      continue;

    }


    // PHOTO

    const photo =
      photos[photoIndex];


    if (!photo) {
      break;
    }


    const currentNumber =
      String(
        photoIndex + 1
      ).padStart(2, "0");


    photoIndex++;


    const button =
      document.createElement(
        "button"
      );


    button.className =
      "tile";

    button.type =
      "button";


    button.setAttribute(
      "aria-label",
      `View photograph ${currentNumber}`
    );


    button.setAttribute(
      "aria-pressed",
      "false"
    );


    // IMAGE

    const image =
      document.createElement(
        "img"
      );


    image.src =
      photo.src;

    image.alt =
      "";

    image.loading =
      photoIndex > 12
        ? "lazy"
        : "eager";


    // NUMBER

    const number =
      document.createElement(
        "span"
      );


    number.className =
      "photo-number";

    number.textContent =
      currentNumber;


    button.appendChild(
      image
    );

    button.appendChild(
      number
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


    // FIRST PHOTO SELECTED

    if (photoIndex === 1) {

      selectPhoto(
        photo,
        button
      );

    }

  }

}


// ==========================================
// STITCH SCROLLBAR
// ==========================================

const archiveSection =
  document.querySelector(
    ".archive"
  );

const stitchTrack =
  document.querySelector(
    ".stitch-scroll"
  );

const stitchLine =
  document.querySelector(
    ".stitch-line"
  );


function updateStitchScroll() {

  if (
    !archiveSection ||
    !stitchTrack ||
    !stitchLine
  ) {

    return;

  }


  const maxScroll =
    archiveSection.scrollHeight -
    archiveSection.clientHeight;


  if (maxScroll <= 0) {

    stitchLine.style.top =
      "0px";

    return;

  }


  const progress =
    archiveSection.scrollTop /
    maxScroll;


  const maxMovement =
    stitchTrack.clientHeight -
    stitchLine.offsetHeight;


  stitchLine.style.top =
    `${progress * maxMovement}px`;

}


archiveSection.addEventListener(
  "scroll",
  updateStitchScroll
);


window.addEventListener(
  "resize",
  updateStitchScroll
);


updateStitchScroll();


// ==========================================
// LOADING ANIMATION
// ==========================================

const loaderPhotoCount = 44;

const introImages = [];


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

  image.alt =
    "";

  image.className =
    "loader-photo";


  loaderPhotos.appendChild(
    image
  );


  introImages.push(
    image
  );

}


// ==========================================
// MESSY PILE POSITIONS
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
  [0,0],[4,0],
  [0,1],[1,1],[3,1],[4,1],
  [0,2],[2,2],[4,2],
  [0,3],[4,3],
  [0,4],[4,4],

  // I
  [6,0],
  [6,1],
  [6,2],
  [6,3],
  [6,4],

  // M
  [8,0],[12,0],
  [8,1],[9,1],[11,1],[12,1],
  [8,2],[10,2],[12,2],
  [8,3],[12,3],
  [8,4],[12,4],

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

  const columns = 15;

  const rows = 5;


  const wordWidth =
    columns *
    tileWidth;


  const wordHeight =
    rows *
    tileHeight;


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
        index;


      image.style.transform =
        `
        translate(-50%, -50%)
        scale(.4)
        `;

    }
  );

}


// ==========================================
// BUILD PILE
// ==========================================

function buildPile() {

  loadingText.textContent =
    "LOADING ARCHIVE";


  introImages.forEach(
    (image, index) => {

      const p =
        pilePositions[index];


      if (!p) {
        return;
      }


      setTimeout(
        () => {

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

          image.style.transform =
            `
            translate(-50%, -50%)
            rotate(${p.r}deg)
            scale(1)
            `;


          image.style.zIndex =
            String(
              1 +
              ((index * 7) % 30)
            );

        },

        index * 32
      );

    }
  );

}


// ==========================================
// FORM MIMI
// ==========================================

function formMimi() {

  loadingText.textContent =
    "ORGANIZING";


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
        `
        translate(0, 0)
        rotate(0deg)
        scale(1)
        `;

    }
  );

}


// ==========================================
// BREAK APART
// ==========================================

function breakApart() {

  loadingText.textContent =
    "52 MOMENTS";


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
          Math.random() * 35
        );


      const y =
        10 +
        Math.random() * 80;


      const rotation =
        -20 +
        Math.random() * 40;


      image.style.left =
        `${x}%`;

      image.style.top =
        `${y}%`;


      image.style.transform =
        `
        translate(-50%, -50%)
        rotate(${rotation}deg)
        scale(.65)
        `;


      image.style.opacity =
        "0";

    }
  );

}


// ==========================================
// FINISH LOADER
// ==========================================

function finishLoader() {

  loader.classList.add(
    "finished"
  );

}


// ==========================================
// RUN LOADER
// ==========================================

function runLoader() {

  prepareLoader();


  setTimeout(
    buildPile,
    300
  );


  setTimeout(
    formMimi,
    2500
  );

  setTimeout(
    breakApart,
    4800
  );


  setTimeout(
    finishLoader,
    6200
  );

}


// ==========================================
// START
// ==========================================

window.addEventListener(
  "load",
  runLoader
);
function runLoader() {

  prepareLoader();

  // messy pile
  setTimeout(
    buildPile,
    300
  );

  // form MIMI
  setTimeout(
    formMimi,
    2200
  );

  // quickly break away
  setTimeout(
    breakApart,
    3500
  );

  // reveal main page
  setTimeout(
    finishLoader,
    4100
  );

}