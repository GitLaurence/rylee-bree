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

### One-time setup (do this on your own machine)

Instagram blocks logins from unknown servers (like GitHub Actions). The fix is a **session file** — you log in once from your own computer and upload the session as a secret.

**Step 1 — generate the session on your machine:**
```bash
pip install instaloader
python scripts/save_session.py
# Enter your Instagram username + password when prompted.
# Copy the long base64 string that's printed.
```

**Step 2 — add GitHub Secrets:**

Go to your repo on GitHub → **Settings → Secrets and variables → Actions**, then add:

| Secret name | Value |
|---|---|
| `INSTAGRAM_SESSION` | The base64 string from step 1 |
| `INSTAGRAM_USERNAME` | Your Instagram username |

> The Action runs every 6 hours automatically. You can also trigger it manually anytime from **Actions → Update Storybook from Instagram → Run workflow**.

### Run locally

```bash
pip install instaloader
python scripts/save_session.py          # one-time: generates INSTAGRAM_SESSION value
INSTAGRAM_SESSION=<base64> INSTAGRAM_USERNAME=you python scripts/fetch_and_update.py
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
