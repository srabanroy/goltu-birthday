// ---------------------------------------------
// Birthday site logic: petals, gallery/video render, surprise interaction
// Media comes from photos.json so photos/videos can be added without
// touching this file. See README.md for how to add real media.
// ---------------------------------------------

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- floating petals ---------- */
(function initPetals() {
  const field = document.getElementById('petalField');
  const symbols = ['🌸', '🌿', '🍃', '🌼'];
  const count = window.innerWidth < 600 ? 10 : 18;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'petal';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + 'vw';
    const duration = 10 + Math.random() * 12;
    el.style.animationDuration = duration + 's, ' + (duration / 2) + 's';
    el.style.animationDelay = (-Math.random() * duration) + 's, 0s';
    el.style.fontSize = (1 + Math.random() * 1.2) + 'rem';
    field.appendChild(el);
  }
})();

/* ---------- gallery / video rendering ---------- */
async function loadMedia() {
  const galleryGrid = document.getElementById('galleryGrid');
  const videoGrid = document.getElementById('videoGrid');

  let items = [];
  try {
    const res = await fetch('photos.json');
    items = await res.json();
  } catch (e) {
    console.warn('Could not load photos.json, showing empty state.', e);
  }

  if (!items.length) {
    galleryGrid.innerHTML = '<p>No photos yet — add some in photos.json!</p>';
    return;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'gallery-item';

    if (item.type === 'placeholder') {
      card.classList.add('placeholder');
      card.innerHTML = `
        <span class="ph-emoji">${item.emoji || '📷'}</span>
        <span class="ph-caption">${item.caption || ''}</span>
      `;
      galleryGrid.appendChild(card);
      return;
    }

    if (item.type === 'photo') {
      card.innerHTML = `
        <img src="${item.src}" alt="${item.caption || ''}" loading="lazy">
        ${item.caption ? `<span class="caption">${item.caption}</span>` : ''}
      `;
      galleryGrid.appendChild(card);
      return;
    }

    if (item.type === 'video') {
      card.innerHTML = `
        <video src="${item.src}" controls preload="metadata"></video>
        ${item.caption ? `<span class="caption">${item.caption}</span>` : ''}
      `;
      videoGrid.appendChild(card);
      return;
    }
  });

  // if no real videos were added yet, keep video section from looking broken
  if (!videoGrid.children.length) {
    videoGrid.innerHTML = `
      <div class="gallery-item placeholder">
        <span class="ph-emoji">🎬</span>
        <span class="ph-caption">Add a video clip in photos.json (type: "video")</span>
      </div>`;
  }
}

loadMedia();

/* ---------- surprise interaction ---------- */
const surpriseTrigger = document.getElementById('surpriseTrigger');
const surpriseOverlay = document.getElementById('surpriseOverlay');

function launchConfetti() {
  const colors = ['#8fac8b', '#f2c9d1', '#6fb3d9', '#d98fa0', '#fdf8f0'];
  const shapes = ['🌸', '🐾', '🌿'];
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement('span');
    const useEmoji = Math.random() > 0.5;
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.animationDuration = (2 + Math.random() * 2) + 's';
    piece.style.animationDelay = (Math.random() * 0.5) + 's';

    if (useEmoji) {
      piece.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      piece.style.fontSize = (1 + Math.random()) + 'rem';
    } else {
      piece.style.width = '8px';
      piece.style.height = '14px';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.display = 'inline-block';
      piece.style.borderRadius = '2px';
    }
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4500);
  }
}

surpriseTrigger.addEventListener('click', () => {
  surpriseOverlay.classList.add('show');
  launchConfetti();
});

surpriseOverlay.addEventListener('click', () => {
  surpriseOverlay.classList.remove('show');
});
