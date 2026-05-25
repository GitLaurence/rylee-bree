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

### One-time setup using GitHub Codespaces (no local install needed)

Instagram blocks logins from unknown servers. The fix is a **session file** — log in once from a trusted environment and store the session as a GitHub Secret. You can do this entirely in your browser using Codespaces.

**Step 1 — open this repo in Codespaces:**

On the repo page → click the green **Code** button → **Codespaces** tab → **Create codespace on main**.  
Wait about 60 seconds for it to load. You'll get a full VS Code environment with a terminal.

**Step 2 — get your Instagram session cookie (no password needed):**

In a **new browser tab**, open [instagram.com](https://instagram.com) and make sure you're logged in.  
Then open **DevTools** (`F12` or right-click → Inspect) and go to:

```
Application tab → Cookies → https://www.instagram.com
```

Find the row named **`sessionid`** and copy its Value (a long string of letters and numbers).

Come back to the Codespaces terminal and run:

```bash
pip install instaloader
python scripts/save_session.py
```

Paste the sessionid when prompted. The script will verify it works against `@mariaaajoy` and print the two secrets you need.

> **Note:** `@mariaaajoy` is a private account. The Instagram account whose cookie you use must already **follow** `@mariaaajoy`.

**Step 3 — add GitHub Secrets:**

Go to your repo → **Settings → Secrets and variables → Actions** → **New repository secret**:

| Secret name | Value |
|---|---|
| `INSTAGRAM_SESSIONID` | The sessionid cookie value |
| `INSTAGRAM_USERNAME` | Your Instagram username |

**Step 4 — trigger the first run:**

Go to **Actions → Update Storybook from Instagram → Run workflow → Run workflow**.  
The story will be populated with Maria's posts within a minute.

After this, the Action runs automatically every 6 hours — no further steps needed.

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
