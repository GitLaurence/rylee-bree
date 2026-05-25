# The Adventures of Rylee & Bree

An interactive children's storybook web app dedicated to **Rylee** and **Brielle** — two sisters and their daily adventures — made with love for their mom **Maria**.

---

## How to Run

No installation required. Just open `index.html` in any web browser:

```
open index.html         # macOS
start index.html        # Windows
xdg-open index.html     # Linux
```

Or drag the file into Chrome, Firefox, Safari, or Edge. That's it.

---

## Navigating the Book

| Action | How |
|--------|-----|
| Next page | Click **›** button, press **→** or **Space** |
| Previous page | Click **‹** button, press **←** |
| Jump to page | Click any **dot** at the bottom |
| Swipe (mobile) | Swipe left/right on the book |

---

## The Story

| Page | Chapter |
|------|---------|
| 1 | **Cover** — The Adventures of Rylee & Bree |
| 2 | **Meet the Girls** — Rylee (bold, brave) and Brielle (curious) |
| 3 | **Morning Chaos** — Cereal in hair, missing shoes, and Mom laughing |
| 4 | **The Backyard Quest** — A jungle, a fortress, and a ladybug dragon |
| 5 | **The Big Fight (And the Bigger Hug)** — The blue crayon incident |
| 6 | **Bedtime** — Mom reading "one more story" |
| 7 | **The End** — Always, always each other |

---

## Auto-Updates from Instagram

A GitHub Action runs every 6 hours, fetches the latest posts from `@mariaaajoy`, downloads the photos, and updates `data/story.js` automatically — no manual steps needed after setup.

### One-time setup: add GitHub Secrets

1. Go to your repo on GitHub → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** and add both:

| Secret name | Value |
|---|---|
| `INSTAGRAM_USERNAME` | Your Instagram username (used to log in and fetch Maria's posts) |
| `INSTAGRAM_PASSWORD` | Your Instagram password |

> The Action runs on a schedule. You can also trigger it manually anytime from **Actions** → **Update Storybook from Instagram** → **Run workflow**.

### Run locally

```bash
pip install instaloader
INSTAGRAM_USERNAME=you INSTAGRAM_PASSWORD=secret python scripts/fetch_and_update.py
```

---

## Customizing the Story

### Edit story text
Open `data/story.js` and update the `text` arrays in each story object. No framework — just plain JavaScript.

### Add a new chapter
Append a new object to the `STORY` array in `data/story.js`:

```js
{
  id: "park",
  scene: "backyard",    // reuse an existing scene
  layout: "story",
  title: "The Park Day",
  text: [
    "On Saturday, Mom packed the picnic bag.",
    "Rylee ran straight for the swings. Brielle found a caterpillar.",
    "They stayed until the fireflies came out."
  ]
}
```

### Add real family photos (future)
Drop photos into the `assets/` folder and reference them as `<img>` tags in the story HTML inside `js/book.js`.

---

## File Structure

```
rylee-bree/
├── index.html          # App shell
├── css/
│   ├── styles.css      # Layout, colors, scene backgrounds
│   └── animations.css  # Page transitions and decorative animations
├── js/
│   └── book.js         # Navigation, SVG scene art, page rendering
├── data/
│   └── story.js        # All story content — edit here to change the narrative
├── assets/             # Drop family photos here for future use
└── README.md
```

---

## Made With Love

Dedicated to **Rylee**, **Brielle**, and their amazing mom **Maria**. This is your story. ♥
