// Replace these sample captions with the writing that belongs to each image.
const captions = [
  'An expression, a moment, a memory.',
  'The little things I never want to forget.',
  'A face that says more than words.'
];

// Put your own images in the images folder, named photo-01.jpg ... photo-52.jpg.
const photos = Array.from({ length: 52 }, (_, i) => ({
  src:S `images/photo-${String(i + 1).padStart(2, '0')}.jpg`,
  caption: captions[i] ?? `Expression ${String(i + 1).padStart(2, '0')}`,
  alt: `Expression photograph ${i + 1}`
}));

const grid = document.getElementById('photo-grid');
const featuredImage = document.getElementById('featured-image');
const featuredCaption = document.getElementById('featured-caption');
const columns = 8;
let selectedButton;

function selectPhoto(photo, button) {
  if (selectedButton) selectedButton.setAttribute('aria-pressed', 'false');
  selectedButton = button;
  button.setAttribute('aria-pressed', 'true');
  featuredImage.src = photo.src;
  featuredImage.alt = photo.alt;
  featuredCaption.textContent = photo.caption;
}

// 8 columns, alternating filled/empty cells. 52 photographs = 13 rows.
let photoIndex = 0;
for (let row = 0; photoIndex < photos.length; row++) {
  for (let col = 0; col < columns; col++) {
    if ((row + col) % 2 !== 0) {
      const blank = document.createElement('div');
      blank.className = 'tile blank';
      blank.setAttribute('aria-hidden', 'true');
      grid.appendChild(blank);
      continue;
    }
    const photo = photos[photoIndex++];
    if (!photo) break;
    const button = document.createElement('button');
    button.className = 'tile';
    button.type = 'button';
    button.setAttribute('aria-label', `View photograph ${photoIndex}`);
    button.setAttribute('aria-pressed', 'false');
    const image = document.createElement('img');
    image.src = photo.src;
    image.alt = '';
    image.loading = photoIndex > 12 ? 'lazy' : 'eager';
    button.appendChild(image);
    button.addEventListener('click', () => selectPhoto(photo, button));
    grid.appendChild(button);
    if (photoIndex === 1) selectPhoto(photo, button);
  }
}