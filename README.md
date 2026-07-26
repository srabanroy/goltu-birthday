# Goltu babai's Birthday Site

A quiet, cozy little birthday website — cats, plants, and a blue Stitch buddy included.

Live files: `index.html`, `style.css`, `script.js`, `photos.json`.

The site currently shows **placeholder cards** in the photo and video sections. Follow the steps below to swap those for real photos and videos. No coding needed.

---

## 1. Put a GitHub repo online (one-time, ~5 min)

You said you already have GitHub, so:

1. Go to github.com → **New repository** → name it something like `goltu-birthday`.
2. Keep it **Public** (required for free GitHub Pages) — or private if you're on a paid plan that supports Pages on private repos.
3. Upload these four files to the repo (drag-and-drop on the repo's "Add file → Upload files" page): `index.html`, `style.css`, `script.js`, `photos.json`.
4. Go to repo **Settings → Pages** → under "Build and deployment", set Source = **Deploy from a branch**, Branch = `main` / `root`. Save.
5. GitHub gives you a live URL in a minute or two, like `https://yourusername.github.io/goltu-birthday/`. That's the link you share.

If you have `gh` (GitHub CLI) set up, this is just as fast from a terminal:
```
gh repo create goltu-birthday --public --source=. --push
gh api repos/:owner/goltu-birthday/pages -X POST -f source[branch]=main -f source[path]=/
```

---

## 2. Add real photos and videos via Cloudinary (free)

Cloudinary hosts your media (handles video properly, unlike GitHub) and gives you a URL for each file.

1. Create a free account at cloudinary.com (25GB storage/bandwidth free — plenty for this).
2. In the Cloudinary dashboard, click **Media Library → Upload** and drag in your photos/videos.
3. Click any uploaded file → **Copy URL** (the "secure URL" ending in .jpg/.mp4 etc).
4. Open `photos.json` in this repo (edit directly on GitHub — click the file, then the pencil/edit icon) and replace or add entries like this:

```json
[
  { "type": "photo", "src": "https://res.cloudinary.com/.../your-photo.jpg", "caption": "her and the cat, unimpressed" },
  { "type": "video", "src": "https://res.cloudinary.com/.../your-clip.mp4", "caption": "the stitch plushie cameo" }
]
```

   - `"type"` must be `"photo"` or `"video"`.
   - Delete the `"type": "placeholder"` entries once you have real ones (or just leave a couple in — they look fine either way).
5. Commit the change on GitHub. The live site updates automatically within a minute — no redeploy step needed.

That's the entire "upload" workflow going forward: upload to Cloudinary → copy URL → paste one line into `photos.json` → commit. No rebuilding, no tools, no touching HTML/CSS.

---

## 3. Personalizing further

- The birthday letter text lives directly in `index.html` inside the `<section id="letter">` block — edit freely.
- The hidden surprise button is the small blue mascot circle, bottom-left corner — clicking it triggers a soft confetti/petal burst. Feel free to tell people about it or leave it as a secret.
- Colors are defined once at the top of `style.css` under `:root` if you want to adjust the palette.

---

## Notes

- Keep individual videos under ~50-100MB on the free Cloudinary tier for smooth playback; compress with something like HandBrake if needed.
- The site is fully static — nothing to "run," it just needs to be hosted (GitHub Pages) and read `photos.json` for content.
