/* ──────────────────────────────────────────────────────────
   A hand-picked sample of bedtime stories for video rendering.
   Source of truth: data/stories.js (100 stories, 300 pages).
   ────────────────────────────────────────────────────────── */

export type StoryPage = { scene: string; text: string };
export type Story = { id: string; title: string; chars: string[]; scene: string; pages: StoryPage[] };

export const STORIES: Story[] = [
  {
    "id": "S011",
    "title": "Teeth & Giggles",
    "chars": [
      "rylee",
      "brielle"
    ],
    "scene": "bath",
    "pages": [
      {
        "scene": "bath",
        "text": "Rylee and Brielle stood at the sink making the most ridiculous toothbrush faces at each other."
      },
      {
        "scene": "bath",
        "text": "Brielle sneezed toothpaste foam onto the mirror. Rylee laughed so hard she fell into the towel rack."
      },
      {
        "scene": "library",
        "text": "They went to bed with sparkly clean teeth and sore cheeks from smiling — the very best way to end a day."
      }
    ]
  },
  {
    "id": "S031",
    "title": "The Sleepy Bunny",
    "chars": [
      "astley",
      "brielle",
      "rylee"
    ],
    "scene": "garden",
    "pages": [
      {
        "scene": "garden",
        "text": "In the garden there was a very round, very fluffy bunny who fell asleep in the middle of eating a dandelion."
      },
      {
        "scene": "garden",
        "text": "Rylee and Brielle sat and watched it breathe. \"It looks like a small cloud that decided to nap,\" Brielle said."
      },
      {
        "scene": "park",
        "text": "They tiptoed away so they wouldn't wake it — and then went to sleep themselves, warm from watching something so peaceful."
      }
    ]
  },
  {
    "id": "S045",
    "title": "The Rain Lullaby",
    "chars": [
      "rylee",
      "brielle",
      "mary-joy",
      "astley"
    ],
    "scene": "garden",
    "pages": [
      {
        "scene": "garden",
        "text": "Rain tapped on the windows in a steady, soft rhythm — the best kind of night music there is."
      },
      {
        "scene": "living-room",
        "text": "They turned off all the lights and just listened, all four of them, until someone yawned first (Astley) and then everyone yawned."
      },
      {
        "scene": "beach",
        "text": "They went to bed to the sound of rain and woke up to sunshine — and for a moment, everything was perfect."
      }
    ]
  },
  {
    "id": "S017",
    "title": "The Goodnight Kiss",
    "chars": [
      "rylee",
      "brielle",
      "mary-joy",
      "astley"
    ],
    "scene": "library",
    "pages": [
      {
        "scene": "library",
        "text": "Every night, four kisses — one from Mary Joy's soft lips, one from Astley's scratchy cheek, two from each sister."
      },
      {
        "scene": "library",
        "text": "Brielle counted them every night: \"One, two, three, four — that's a lot of love,\" she said every time."
      },
      {
        "scene": "stars",
        "text": "It was. It really, really was."
      }
    ]
  }
];
