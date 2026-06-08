# Bedtime Story Videos

Animated video versions of stories from the **Rylee & Bree Bedtime Stories**
app, built with [Remotion](https://www.remotion.dev) (React + video rendering).

This is a separate sub-project from the main static-site app (which stays
zero-dependency, plain HTML/CSS/JS). It reuses the *exact same* procedural
SVG illustrations as the web reader so the videos match the app's look.

## What it makes

For each selected story, a portrait (1080×1350) video with:

1. **Title card** — story title + character badges, twinkling starfield
2. **One scene per page** — the same `sceneArt` / `charArt` SVG illustrations
   as the web reader, with a gentle Ken Burns drift and a claymorphism text
   panel that reveals the page's words at a calm read-aloud pace
3. **End card** — "The End · Sweet dreams 🌙"

Scenes crossfade into each other. Duration is calculated per-story from each
page's word count (`calculateMetadata` in `src/StoryVideo.tsx`), so longer
pages get more time on screen.

## Project layout

```
video/
├── src/
│   ├── index.ts           # Remotion entry point
│   ├── Root.tsx           # registers one composition per selected story
│   ├── StoryVideo.tsx     # main composition: title → pages → end, with transitions
│   ├── stories.ts         # hand-picked story data (subset of data/stories.js)
│   ├── svgArt.ts          # scene + character SVG generators, ported from js/app.js
│   └── components/
│       ├── IllustrationLayer.tsx  # renders sceneArt/charArt SVG into the frame
│       ├── PageScene.tsx          # one story page: art + Ken Burns + text reveal
│       ├── TitleCard.tsx          # opening card
│       ├── EndCard.tsx            # closing card
│       └── Twinkles.tsx           # shared twinkling star-field background
└── out/                   # rendered output (gitignored)
```

## Selected stories

| ID | Title | Cast | Scenes |
|----|-------|------|--------|
| S011 | Teeth & Giggles | Rylee, Bree | bath → bath → library |
| S031 | The Sleepy Bunny | Astley, Bree, Rylee | garden → garden → park |
| S045 | The Rain Lullaby | all four | garden → living-room → beach |
| S017 | The Goodnight Kiss | all four | library → library → stars |

To add another story, add its entry to `STORIES` in `src/stories.ts` (id,
title, chars, scene, pages — same shape as `data/stories.js`); a new
composition appears automatically in `Root.tsx`.

## Commands

```bash
cd video
npm install

# Open the Remotion Studio (live preview + scrubbing)
npm start

# Render a story to MP4
npx remotion render src/index.ts Story-S011 out/stories/S011.mp4

# Render a single still frame (for quick previews)
npx remotion still src/index.ts Story-S011 out/stills/title.png --frame=40
```

> **Sandboxed environments:** Remotion needs a Chromium build to render.
> If the network policy blocks its own download, point
> `Config.setBrowserExecutable(...)` in `remotion.config.ts` at any
> Chromium/headless-shell binary already available on the machine.

## Notes

- No external image/audio assets — illustrations are procedural SVG (ported
  from `js/app.js`), matching the "zero dependencies" spirit of the main app
  even though Remotion itself is a Node/React toolchain.
- Currently silent (no narration/music) — the web app's TTS reader and sound
  effects rely on browser APIs (`speechSynthesis`, `AudioContext`) that don't
  run inside Remotion's render pipeline. Adding voiceover would mean
  pre-generating audio clips per page and wiring them up with `<Audio>`.
