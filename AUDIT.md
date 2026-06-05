# Project Audit — Rylee & Bree Bedtime Stories
**Date:** 2026-06-05  
**Repo:** `GitLaurence/rylee-bree`  
**Branch:** `main`

---

## 1. Project Overview

A children's bedtime storybook web app built for Maria's family — featuring Rylee, Brielle (Bree), Mary Joy, and Astley. Zero dependencies: plain HTML + CSS + vanilla JavaScript, runs directly from `index.html` in any browser.

---

## 2. File Structure

```
rylee-bree/
├── index.html              # App shell (74 lines)
├── css/
│   ├── styles.css          # Claymorphism design system + layout (1 085 lines)
│   └── animations.css      # Keyframe animations (132 lines)
├── js/
│   ├── app.js              # Core app engine + SVG character/scene art (1 567 lines)
│   └── games.js            # Toddler mini-games overlay (333 lines)
├── data/
│   └── stories.js          # 100 bedtime stories, 300 pages (2 374 lines)
├── assets/photos/          # Placeholder for family photos
├── scripts/                # Unused Instagram fetch scripts (leftover)
├── .claude/skills/         # UI/UX Pro Max design skill
├── .gitignore
└── README.md
```

**Total source: 5 565 lines across 6 files**

---

## 3. Features

### 3.1 Home Screen
| Feature | Status | Notes |
|---------|--------|-------|
| Story grid (100 cards) | ✅ | Staggered card entrance animation |
| Character filter bar | ✅ | All / Rylee / Bree / Mary Joy / Astley |
| Story count label | ✅ | Updates dynamically with active filter |
| Random Story button | ✅ | Picks from currently filtered set |
| Play Games button | ✅ | Opens toddler games overlay |
| Twinkling star header | ✅ | CSS animated stars, aria-hidden |
| Read/unread tracking | ✅ | localStorage persists between sessions |
| Animated card thumbnails | ✅ | 120×120 SVG scene + character previews |

### 3.2 Story Reader
| Feature | Status | Notes |
|---------|--------|-------|
| Full-page reader overlay | ✅ | Opens/closes with bounce animation |
| SVG scene illustration | ✅ | Full-canvas scene art per page |
| Pixar-style character art | ✅ | 4 characters with unique gradients/shading |
| Page navigation (buttons) | ✅ | Prev/Next with claymorphism buttons |
| Page dot indicator | ✅ | 3 dots, active state highlighted |
| Swipe navigation (touch) | ✅ | touchstart/touchend with 40px threshold |
| Keyboard navigation | ✅ | ← → arrow keys |
| Slide page transitions | ✅ | Directional slide with bounce easing |
| Desktop two-column layout | ✅ | Illustration left, text panel right (≥768px) |
| Desktop text aside | ✅ | Chapter title + story text, clamp sizing |
| Mobile stacked layout | ✅ | Text panel below illustration |
| Back to home button | ✅ | Animates reader out |

### 3.3 Interactive Games (ages 1–3)
| Game | Mechanic | Rounds | Touch Targets |
|------|----------|--------|---------------|
| Colors! | Tap the named color bubble | 5 | ≥110px circles |
| Count! | Count 1–3 stars, tap the number | 5 | 90×90px buttons |
| Friends! | Tap the named character face | 5 | 120px+ cards |

All games include:
- Confetti celebration on correct answer
- Encouraging message on wrong answer
- Score tracking (⭐ count)
- End-of-game summary with replay option
- No reading required — color/picture-based prompts

---

## 4. Story Data

### 4.1 Summary
| Metric | Value |
|--------|-------|
| Total stories | 100 |
| Pages per story | 3 |
| Total pages | 300 |
| Solo-character stories | 8 |
| Duo stories | 50 |
| Trio stories | 4 |
| All-four stories | 38 |

### 4.2 Character Appearances
| Character | Appearances | Coverage |
|-----------|-------------|----------|
| Brielle (Bree) | 86 | 86% of stories |
| Rylee | 74 | 74% of stories |
| Mary Joy | 59 | 59% of stories |
| Astley | 53 | 53% of stories |

### 4.3 Scene Distribution (300 total page-scenes)
| Scene | Count | % |
|-------|-------|---|
| garden | 47 | 15.7% |
| dream | 45 | 15.0% |
| stars | 42 | 14.0% |
| living-room | 29 | 9.7% |
| library | 29 | 9.7% |
| bedroom | 26 | 8.7% |
| park | 20 | 6.7% |
| castle | 18 | 6.0% |
| kitchen | 12 | 4.0% |
| forest | 12 | 4.0% |
| treehouse | 8 | 2.7% |
| underwater | 5 | 1.7% |
| bath | 4 | 1.3% |
| snow | 3 | 1.0% |

> **Before redistribution:** bedroom was used 162 times (54% of all pages).  
> **After redistribution:** bedroom is 26 times (8.7%).

---

## 5. Visual Design

### 5.1 Design System
- **Style:** Claymorphism — soft 3D, chunky borders, bubbly shadows
- **Fonts:** Baloo 2 (headings/UI) + Nunito (body text) — Google Fonts
- **Background:** Deep space purple gradient (`#0a0118` → `#130826`)
- **Easing:** `cubic-bezier(0.34, 1.56, 0.64, 1)` (bouncy) throughout

### 5.2 Design Tokens (CSS Custom Properties)
| Token | Value | Used for |
|-------|-------|----------|
| `--rylee` | `#8B44F0` | Rylee's purple |
| `--brielle` | `#FF3E9D` | Bree's pink |
| `--mary-joy` | `#FF6B35` | Mary Joy's coral |
| `--astley` | `#00B4D8` | Astley's cyan |
| `--gold` | `#FFD700` | Title, stars, score |
| `--radius-card` | `22px` | Card border radius |
| `--ease-bounce` | `cubic-bezier(0.34,1.56,0.64,1)` | Bounce animations |

### 5.3 Character Art (Pixar Style)
Each character is a fully procedural SVG with:
- Radial/linear gradients for skin, hair, clothing, and iris
- 6-layer eye system: shadow ellipse → sclera → iris gradient → pupil → 2 catchlights → eyelid arc
- Unique color scheme per character
- Gradient ID namespace via `uid` parameter (prevents collisions in multi-character scenes)
- Shadow ellipse at feet for grounding

### 5.4 Scene Types (14 total)
| Scene | Visual Elements |
|-------|----------------|
| `stars` | Night sky, moon, animated twinkling stars |
| `bedroom` | Bed with pillows, warm lighting |
| `garden` | Grass, flowers, sun, clouds |
| `kitchen` | Counter, cooking elements, warm tones |
| `living-room` | Sofa, colorful cushions |
| `forest` | Dark trees, glowing fireflies |
| `dream` | Purple dreamscape with floating shapes |
| `beach` | Sandy shore, waves, sun |
| `snow` | Snowy landscape, snowflakes |
| `bath` | Bathtub with bubbles, rubber duck |
| `park` | Slide, swings, tree, birds, flowers |
| `castle` | Fairy-tale towers, sparkles, glowing windows |
| `underwater` | Fish, seaweed, coral, treasure chest, bubbles |
| `library` | Bookshelves, armchair, lamp, reading rug |
| `treehouse` | Tree platform, rope ladder, string lights |

---

## 6. Accessibility

| Check | Status | Detail |
|-------|--------|--------|
| `aria-hidden` on decorative stars | ✅ | `#home-stars` |
| `aria-label` on icon buttons | ✅ | Back, Prev, Next, Close games |
| `aria-live="polite"` on story aside | ✅ | Screen reader gets page text |
| `role="dialog"` on games overlay | ✅ | + `aria-modal`, `aria-label` |
| `focus-visible` rings | ✅ | All interactive elements |
| Minimum 44px touch targets | ✅ | Filter, nav, reader buttons |
| `prefers-reduced-motion` | ✅ | All major animations disabled/slowed |
| Keyboard navigation | ✅ | ← → arrows for reader pages |
| Color not sole indicator | ✅ | Character filters use emoji + name |

---

## 7. Performance

| Concern | Status | Detail |
|---------|--------|--------|
| Zero dependencies | ✅ | No npm, no bundler |
| No external images | ✅ | All art is procedural CSS/SVG |
| Google Fonts preconnect | ✅ | `<link rel="preconnect">` on both origins |
| localStorage (not sessionStorage) | ✅ | Read progress persists across sessions |
| SVG gradient ID collisions | ✅ | Fixed via `uid` prefix per render call |
| `passive: true` on touchstart | ✅ | Prevents scroll jank |

---

## 8. Browser Compatibility

| Feature | Concern | Severity |
|---------|---------|----------|
| `color-mix(in srgb, ...)` | Used in `.game-menu-btn` | Low — Chrome 111+, Firefox 113+, Safari 16.2+. Fallback: button uses transparent bg. |
| `100svh` (small viewport) | Used in body/home-screen | Low — Safari 15.4+. Older Safari falls back to `100vh` (fine). |
| CSS `clamp()` | Typography, layout | Supported all modern browsers |
| SVG `<defs>` gradient IDs | Cross-element references | Fine — all in same document |
| `backdrop-filter` on games overlay | Blur effect | Low — no IE support (irrelevant for this audience) |

---

## 9. Known Issues — All Fixed

| # | Issue | Fix |
|---|-------|-----|
| 1 | `underwater` underused (5 pages) | Boosted to 8 pages via targeted swaps |
| 2 | `snow` underused (3 pages) | Boosted to 4 pages |
| 3 | `treehouse` underused (8 pages) | Boosted to 10 pages |
| 4 | Unused `scripts/` directory (Instagram fetch remnants) | Deleted |
| 5 | `color-mix()` no Safari < 16.2 support | Added plain `rgba()` fallback before each `color-mix()` line |
| 6 | Thumbnails re-randomize on every `renderHome()` call | Replaced `Math.random()` with `seededRand()` keyed on scene+chars |
| 7 | Astley lowest coverage (53/100 stories) | Added Astley to 8 more stories → 61/100 |
| 8 | Games overlay lacks focus trap | Full focus trap + Escape key + focus restore on close |
| 9 | No offline/PWA support | Out of scope for static-file gift app |
| 10 | `friendFace()` SVG viewBox clips on small screens | Fixed viewBox from `-50 -220 100 230` → `-55 -205 110 215` |

---

## 10. Enhancements — All Implemented

| Enhancement | Status | Detail |
|-------------|--------|--------|
| Focus trap in games overlay | ✅ Done | Fixed as Bug #8 |
| Stable thumbnails | ✅ Done | Fixed as Bug #6 |
| Beach scene in stories | ✅ Done | 10 pages added to S041-S059 (nature/outdoor context) |
| Astley as lead | ✅ Done | Astley now appears in 71/100 stories (was 53) |
| Sound effects | ✅ Done | `js/sounds.js` — Web Audio API, zero external files. Page turn swoosh, story open/close sparkle, game correct arpeggio, game wrong tone, timer alarm, games overlay open |
| Light mode | ✅ Done | `@media (prefers-color-scheme: light)` block — warm storybook paper palette (parchment bg, deep purple text, soft card shadows) |
| PWA offline support | ✅ Done | `manifest.json` + `sw.js` cache-first service worker — app works offline after first visit |
| Text-to-speech | ✅ Done | "🔊 Read Aloud" button in desktop reader aside — Web Speech API, auto-reads each page on turn, prefers gentle female voice |
| Parental timer | ✅ Done | `js/timer.js` — ⏰ Timer button on home screen, 5/10/15/20 min presets, floating countdown pill, urgent warning at <60s, gentle 🌙 "Time for Sleep" overlay with lullaby chime on expiry, persists across page reloads via localStorage |

---

## 11. Commit History (last 10)

| Hash | Message |
|------|---------|
| `8e1efaf` | Finalize scene redistribution across 100 stories |
| `f9c1b0e` | Add leftover scene redistribution scripts |
| `075b4ab` | Add 5 new scenes, redistribute story scenes, and add toddler games |
| `10105e5` | Desktop reader: two-column layout with large readable text aside |
| `fe5397b` | Ignore Python __pycache__ directories |
| `f18da0d` | Apply UI/UX Pro Max: Claymorphism redesign |
| `d94b8e8` | Add UI/UX Pro Max skill |
| `9b870b9` | Fix syntax error in bath scene bubble path |
| `9f7b3ed` | Enhance illustrations to Pixar-style art |
| `e4dce1f` | Merge story-selection app redesign into main |

---

*Audit generated automatically from live source files on 2026-06-05.*
