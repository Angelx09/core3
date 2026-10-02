// CAPTIONS
const captions = [
  'An expression, a moment, a memory.',
  'The little things I never want to forget.',
  'A face that says more than words.'
];

// 52 IMAGES
const photos = Array.from({ length: 52 }, (_, i) => ({
  src: `images/photo-${String(i + 1).padStart(2, '0')}.jpg`,
  caption: captions[i] ?? `Expression ${String(i + 1).padStart(2, '0')}`,
  alt: `Expression photograph ${i + 1}`
}));

const grid = document.getElementById('photo-grid');
const featuredImage = document.getElementById('featured-image');
const featuredCaption = document.getElementById('featured-caption');

const columns = 8;

let selectedButton = null;
let selectedPhoto = photos[0];


// -------------------------
// SHOW IMAGE ON RIGHT
// -------------------------

function showPhoto(photo) {
  featuredImage.src = photo.src;
  featuredImage.alt = photo.alt;
  featuredCaption.textContent = photo.caption;
}


// -------------------------
// CLICK = LOCK IMAGE
// -------------------------

function selectPhoto(photo, button) {

  // Remove previous selected state
  if (selectedButton) {
    selectedButton.classList.remove('selected');
    selectedButton.setAttribute('aria-pressed', 'false');
  }

  selectedPhoto = photo;
  selectedButton = button;

  button.classList.add('selected');
  button.setAttribute('aria-pressed', 'true');

  showPhoto(photo);
}


// -------------------------
// CREATE GRID
// -------------------------

let photoIndex = 0;

for (let row = 0; photoIndex < photos.length; row++) {

  for (let col = 0; col < columns; col++) {

    // Create blank checkerboard spaces
    if ((row + col) % 2 !== 0) {

      const blank = document.createElement('div');

      blank.className = 'tile blank';
      blank.setAttribute('aria-hidden', 'true');

      grid.appendChild(blank);

      continue;
    }


    const photo = photos[photoIndex];

    if (!photo) break;

    const currentNumber =
      String(photoIndex + 1).padStart(2, '0');

    photoIndex++;


    // BUTTON
    const button = document.createElement('button');

    button.className = 'tile';
    button.type = 'button';

    button.setAttribute(
      'aria-label',
      `View photograph ${currentNumber}`
    );

    button.setAttribute(
      'aria-pressed',
      'false'
    );


    // IMAGE
    const image =
      document.createElement('img');

    image.src = photo.src;
    image.alt = '';

    image.loading =
      photoIndex > 12 ? 'lazy' : 'eager';


    // NUMBER
    const number =
      document.createElement('span');

    number.className = 'photo-number';

    number.textContent =
      currentNumber;


    button.appendChild(image);
    button.appendChild(number);


    // -------------------------
    // HOVER = PREVIEW
    // -------------------------

    button.addEventListener(
      'mouseenter',
      () => {
        showPhoto(photo);
      }
    );


    // -------------------------
    // LEAVE = RETURN TO
    // LAST CLICKED IMAGE
    // -------------------------

    button.addEventListener(
      'mouseleave',
      () => {
        showPhoto(selectedPhoto);
      }
    );


    // -------------------------
    // CLICK = LOCK
    // -------------------------

    button.addEventListener(
      'click',
      () => {
        selectPhoto(photo, button);
      }
    );


    grid.appendChild(button);


    // Select first photo initially
    if (photoIndex === 1) {
      selectPhoto(photo, button);
    }

  }
}