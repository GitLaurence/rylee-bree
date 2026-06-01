const fs = require('fs');
let content = fs.readFileSync('data/stories.js', 'utf8');

// The file is now in pretty-printed JSON format
// Pattern: "scene": "bedroom",
// We need to replace specific occurrences by targeting surrounding text

// Each replacement: [searchString, replacementString]
// Use enough surrounding context for uniqueness

const replacements = [
  // S006 - Stars & Moon - replace bedroom with dream
  [
    `"scene": "bedroom",
        "text": "Brielle reached across and held her sister's hand. \\"I'll always be your star,\\" she said`,
    `"scene": "dream",
        "text": "Brielle reached across and held her sister's hand. \\"I'll always be your star,\\" she said`
  ],
  // S007 page[0] - replace bedroom with stars
  [
    `"scene": "bedroom",
        "text": "A moonbeam slipped through the curtain`,
    `"scene": "stars",
        "text": "A moonbeam slipped through the curtain`
  ],
  // S013 - Bedtime Rituals - replace bedroom pages
  // S013 has scene:'bedroom' as the story-level scene too - keep that
  // Page texts:
  [
    `"scene": "bedroom",
        "text": "Brielle couldn't sleep. \\"Mr. Bear is missing!\\"`,
    `"scene": "library",
        "text": "Brielle couldn't sleep. \\"Mr. Bear is missing!\\"`,
  ],
  [
    `"scene": "bedroom",
        "text": "Rylee got up without a word and found him tucked behind the bookshelf`,
    `"scene": "library",
        "text": "Rylee got up without a word and found him tucked behind the bookshelf`
  ],
  [
    `"scene": "bedroom",
        "text": "\\"You're the best sister,\\" Brielle said, squeezing Mr. Bear so tight he almost popped.`,
    `"scene": "library",
        "text": "\\"You're the best sister,\\" Brielle said, squeezing Mr. Bear so tight he almost popped.`
  ],
  // S014 - One More Story - all bedroom pages -> library for last two
  [
    `"scene": "bedroom",
        "text": "\\"One more story,\\" said Rylee.`,
    `"scene": "library",
        "text": "\\"One more story,\\" said Rylee.`
  ],
  [
    `"scene": "bedroom",
        "text": "They read one more.`,
    `"scene": "library",
        "text": "They read one more.`
  ],
  [
    `"scene": "bedroom",
        "text": "By the end, everyone was asleep — including Astley, still holding the book`,
    `"scene": "library",
        "text": "By the end, everyone was asleep — including Astley, still holding the book`
  ],
  // S017 - The Goodnight Kiss - pages 0 and 1 -> library
  [
    `"scene": "bedroom",
        "text": "Every night, four kisses — one from Mary Joy's soft lips`,
    `"scene": "library",
        "text": "Every night, four kisses — one from Mary Joy's soft lips`
  ],
  [
    `"scene": "bedroom",
        "text": "Brielle counted them every night: \\"One, two, three, four`,
    `"scene": "library",
        "text": "Brielle counted them every night: \\"One, two, three, four`
  ],
  // S018 - The Softest Blanket - replace page[2]
  [
    `"scene": "bedroom",
        "text": "Mary Joy had a blanket so soft`,
    `"scene": "library",
        "text": "Mary Joy had a blanket so soft`
  ],
  [
    `"scene": "bedroom",
        "text": "On hard nights, Mary Joy would wrap`,
    `"scene": "library",
        "text": "On hard nights, Mary Joy would wrap`
  ],
  [
    `"scene": "bedroom",
        "text": "The Cloud was magic, Brielle decided.`,
    `"scene": "library",
        "text": "The Cloud was magic, Brielle decided.`
  ],
  // S019 - The Night Light - pages 0 and 1 -> library
  [
    `"scene": "bedroom",
        "text": "\\"I'm a little scared of the dark,\\" Brielle admitted`,
    `"scene": "library",
        "text": "\\"I'm a little scared of the dark,\\" Brielle admitted`
  ],
  [
    `"scene": "bedroom",
        "text": "\\"Me too, sometimes,\\" Astley said. He plugged in the tiny star-shaped light.`,
    `"scene": "library",
        "text": "\\"Me too, sometimes,\\" Astley said. He plugged in the tiny star-shaped light.`
  ],
  // S020 - Last Sip of Water - page[0] -> library
  [
    `"scene": "bedroom",
        "text": "Brielle appeared in the doorway. \\"I need water.\\"`,
    `"scene": "library",
        "text": "Brielle appeared in the doorway. \\"I need water.\\"`,
  ],
  // S025 - The Rainbow Slide - page[2] still bedroom (first run didn't get this one)
  [
    `"scene": "bedroom",
        "text": "They all woke up the next morning wanting to do it again — the best thing about dream slides`,
    `"scene": "castle",
        "text": "They all woke up the next morning wanting to do it again — the best thing about dream slides`
  ],
  // S031 - The Sleepy Bunny - page[2] -> park
  [
    `"scene": "bedroom",
        "text": "They tiptoed away so they wouldn't wake it`,
    `"scene": "park",
        "text": "They tiptoed away so they wouldn't wake it`
  ],
  // S036 - The Cricket's Song - page[2] -> park
  [
    `"scene": "bedroom",
        "text": "Brielle listened to Gerald all the way to sleep.`,
    `"scene": "park",
        "text": "Brielle listened to Gerald all the way to sleep.`
  ],
  // S043 - Summer Night Stars - page[2] -> park
  [
    `"scene": "bedroom",
        "text": "Mary Joy finally called them in at nine. They went without complaining`,
    `"scene": "park",
        "text": "Mary Joy finally called them in at nine. They went without complaining`
  ],
  // S045 - The Rain Lullaby - page[0] still bedroom
  [
    `"scene": "bedroom",
        "text": "Rain tapped on the windows in a steady, soft rhythm`,
    `"scene": "garden",
        "text": "Rain tapped on the windows in a steady, soft rhythm`
  ],
  // S050 - The Midnight Garden - page[2] -> garden
  [
    `"scene": "bedroom",
        "text": "They stood in the midnight garden together until Brielle felt sleepy`,
    `"scene": "garden",
        "text": "They stood in the midnight garden together until Brielle felt sleepy`
  ],
  // S052 - Mama's Magic Words - all 3 pages bedroom. Replace 1 with park
  [
    `"scene": "bedroom",
        "text": "Brielle couldn't quite fall asleep. Her brain kept running`,
    `"scene": "park",
        "text": "Brielle couldn't quite fall asleep. Her brain kept running`
  ],
  [
    `"scene": "bedroom",
        "text": "Mary Joy leaned down and whispered something in her ear`,
    `"scene": "park",
        "text": "Mary Joy leaned down and whispered something in her ear`
  ],
  [
    `"scene": "bedroom",
        "text": "It worked immediately. It always did.`,
    `"scene": "park",
        "text": "It worked immediately. It always did.`
  ],
  // S063 - Pillow Castle - page[2] -> treehouse
  [
    `"scene": "bedroom",
        "text": "They fell asleep inside it and didn't notice when it collapsed gently`,
    `"scene": "treehouse",
        "text": "They fell asleep inside it and didn't notice when it collapsed gently`
  ],
  // S065 - The Invisible Crown - page[2] -> castle
  [
    `"scene": "bedroom",
        "text": "Mr. Bear agreed. The kingdom was in very good hands.`,
    `"scene": "castle",
        "text": "Mr. Bear agreed. The kingdom was in very good hands.`
  ],
  // S067 - The Knight's Rest - all 3 pages bedroom. Replace page[2] with castle
  [
    `"scene": "bedroom",
        "text": "\\"Promise?\\" said Rylee.`,
    `"scene": "castle",
        "text": "\\"Promise?\\" said Rylee.`
  ],
  // S077 - If Toys Could Talk - page[2] -> castle
  [
    `"scene": "bedroom",
        "text": "She fell asleep surrounded by her silent, listening, beloved things`,
    `"scene": "castle",
        "text": "She fell asleep surrounded by her silent, listening, beloved things`
  ],
  // S081-S090 Sweet Dreams - KEEP bedroom - no changes
  // But let's check: S081 has 2 bedroom pages, S082 has 3, S083 has 3, S084 has 3, S085 has 2, S086 has 1, S088 has 3, S089 has 2, S090 has 2
  // Per rules we keep all bedroom for S081-S090. Current count of bedroom for these: let's check.
  // S086 has 1 bedroom page that's fine.
  // For now keep all S081-S090 as bedroom.

  // S092 - First Night Home - keep all bedroom (appropriate story)

  // S094 - The Night I Was Brave - page[2] -> castle
  [
    `"scene": "bedroom",
        "text": "She did it. It went fine. She told Astley the next day.`,
    `"scene": "castle",
        "text": "She did it. It went fine. She told Astley the next day.`
  ],
  // S095 - The Best Bedtime Ever - keep all bedroom (appropriate)
];

let changes = 0;
let failures = [];

for (const [oldStr, newStr] of replacements) {
  if (content.includes(oldStr)) {
    content = content.replace(oldStr, newStr);
    changes++;
  } else {
    failures.push(oldStr.substring(0, 80));
  }
}

fs.writeFileSync('data/stories.js', content);
console.log(`Applied ${changes} replacements`);
if (failures.length > 0) {
  console.log(`FAILED to find ${failures.length} strings:`);
  failures.forEach(f => console.log('  -', f));
}
console.log('Done');
