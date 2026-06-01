const fs = require('fs');
let content = fs.readFileSync('data/stories.js', 'utf8');

const replacements = [
  // S001 - S010 (Stars & Moon): replace bedroom with dream/stars
  [
    `{scene:'bedroom',     text:'"They watch over us all night," said Brielle, pulling her blanket up. "They deserve a little rest too."'}`,
    `{scene:'dream',       text:'"They watch over us all night," said Brielle, pulling her blanket up. "They deserve a little rest too."'}`
  ],
  [
    `{scene:'bedroom',     text:'Brielle fell asleep still smiling back — and the moon kept its grin all the way until morning.'}`,
    `{scene:'dream',       text:'Brielle fell asleep still smiling back — and the moon kept its grin all the way until morning.'}`
  ],
  [
    `{scene:'bedroom',     text:'Rylee fell asleep with a number on her lips, wrapped in the warm feeling of a sky too big to count.'}`,
    `{scene:'stars',       text:'Rylee fell asleep with a number on her lips, wrapped in the warm feeling of a sky too big to count.'}`
  ],
  [
    `{scene:'bedroom',     text:'She set the jar on her sill. It blinked twice — goodnight — and she was asleep before the third blink.'}`,
    `{scene:'dream',       text:'She set the jar on her sill. It blinked twice — goodnight — and she was asleep before the third blink.'}`
  ],
  [
    `{scene:'bedroom',     text:'No one said what they wished for. But the smiles at breakfast the next morning told the whole story.'}`,
    `{scene:'stars',       text:'No one said what they wished for. But the smiles at breakfast the next morning told the whole story.'}`
  ],
  [
    `{scene:'bedroom',     text:'Brielle reached across and held her sister\\'s hand. "I\\'ll always be your star," she said — and they both fell asleep.'}`,
    `{scene:'dream',       text:'Brielle reached across and held her sister\\'s hand. "I\\'ll always be your star," she said — and they both fell asleep.'}`
  ],
  // S007 page[0] and page[1]
  [
    `{scene:'bedroom',     text:'A moonbeam slipped through the curtain and landed right on Brielle\\'s pillow, glowing warm and gold.'}`,
    `{scene:'stars',       text:'A moonbeam slipped through the curtain and landed right on Brielle\\'s pillow, glowing warm and gold.'}`
  ],
  [
    `{scene:'bedroom',     text:'Mary Joy sat on the edge of the bed. "The moon is sending you a goodnight kiss," she whispered.'}`,
    `{scene:'dream',       text:'Mary Joy sat on the edge of the bed. "The moon is sending you a goodnight kiss," she whispered.'}`
  ],
  // S008
  [
    `{scene:'bedroom',     text:'Rylee went inside feeling held by a sky full of love — and slept the deepest sleep of her life.'}`,
    `{scene:'dream',       text:'Rylee went inside feeling held by a sky full of love — and slept the deepest sleep of her life.'}`
  ],
  // S009
  [
    `{scene:'bedroom',     text:'Rylee said nothing — she was already dreaming of a brush and a jar of starlight.'}`,
    `{scene:'stars',       text:'Rylee said nothing — she was already dreaming of a brush and a jar of starlight.'}`
  ],
  // S010
  [
    `{scene:'bedroom',     text:'They all went to bed warm and giggling — and the moon glowed a little brighter, because it felt included.'}`,
    `{scene:'dream',       text:'They all went to bed warm and giggling — and the moon glowed a little brighter, because it felt included.'}`
  ],

  // S011-S020 (Bedtime Rituals): replace bedroom with library
  [
    `{scene:'bedroom',     text:'They went to bed with sparkly clean teeth and sore cheeks from smiling — the very best way to end a day.'}`,
    `{scene:'library',     text:'They went to bed with sparkly clean teeth and sore cheeks from smiling — the very best way to end a day.'}`
  ],
  [
    `{scene:'bedroom',     text:'Clean and giggly and wrapped in her fluffiest towel, Brielle was asleep before her head touched the pillow.'}`,
    `{scene:'library',     text:'Clean and giggly and wrapped in her fluffiest towel, Brielle was asleep before her head touched the pillow.'}`
  ],
  // S013 page[2]
  [
    `{scene:'bedroom',     text:'"You\\'re the best sister," Brielle said, squeezing Mr. Bear so tight he almost popped. Then she was fast asleep.'}`,
    `{scene:'library',     text:'"You\\'re the best sister," Brielle said, squeezing Mr. Bear so tight he almost popped. Then she was fast asleep.'}`
  ],
  // S014 page[2]
  [
    `{scene:'bedroom',     text:'By the end, everyone was asleep — including Astley, still holding the book, snoring softly at the foot of the bed.'}`,
    `{scene:'library',     text:'By the end, everyone was asleep — including Astley, still holding the book, snoring softly at the foot of the bed.'}`
  ],
  // S015
  [
    `{scene:'bedroom',     text:'Brielle padded back to bed on soft feet, full of warm milk and even warmer love — and slept like a dream.'}`,
    `{scene:'library',     text:'Brielle padded back to bed on soft feet, full of warm milk and even warmer love — and slept like a dream.'}`
  ],
  // S016
  [
    `{scene:'bedroom',     text:'The parade always ended the same way: a pile of laughing people on the couch, too cozy to move.'}`,
    `{scene:'library',     text:'The parade always ended the same way: a pile of laughing people on the couch, too cozy to move.'}`
  ],
  // S017 page[0] and page[1]
  [
    `{scene:'bedroom',     text:'Every night, four kisses — one from Mary Joy\\'s soft lips, one from Astley\\'s scratchy cheek, two from each sister.'}`,
    `{scene:'library',     text:'Every night, four kisses — one from Mary Joy\\'s soft lips, one from Astley\\'s scratchy cheek, two from each sister.'}`
  ],
  [
    `{scene:'bedroom',     text:'Brielle counted them every night: "One, two, three, four — that\\'s a lot of love," she said every time.'}`,
    `{scene:'library',     text:'Brielle counted them every night: "One, two, three, four — that\\'s a lot of love," she said every time.'}`
  ],
  // S018 page[2]
  [
    `{scene:'bedroom',     text:'The Cloud was magic, Brielle decided. But mostly, it was just Mama.'}`,
    `{scene:'library',     text:'The Cloud was magic, Brielle decided. But mostly, it was just Mama.'}`
  ],
  // S019 page[0] and page[1]
  [
    `{scene:'bedroom',     text:'"I\\'m a little scared of the dark," Brielle admitted to Astley, very quietly, as if the dark might hear.'}`,
    `{scene:'library',     text:'"I\\'m a little scared of the dark," Brielle admitted to Astley, very quietly, as if the dark might hear.'}`
  ],
  [
    `{scene:'bedroom',     text:'"Me too, sometimes," Astley said. He plugged in the tiny star-shaped light. It glowed gold and steady.'}`,
    `{scene:'library',     text:'"Me too, sometimes," Astley said. He plugged in the tiny star-shaped light. It glowed gold and steady.'}`
  ],
  // S020 page[0]
  [
    `{scene:'bedroom',     text:'Brielle appeared in the doorway. "I need water." Rylee sighed. She\\'d already gotten up twice.'}`,
    `{scene:'library',     text:'Brielle appeared in the doorway. "I need water." Rylee sighed. She\\'d already gotten up twice.'}`
  ],

  // S021-S030 (Dream Adventures): replace bedroom with castle/dream
  // S021
  [
    `{scene:'bedroom',     text:'That night they both went to sleep hoping, very hard, to find the same cloud.'}`,
    `{scene:'dream',       text:'That night they both went to sleep hoping, very hard, to find the same cloud.'}`
  ],
  // S023
  [
    `{scene:'bedroom',     text:'Rylee woke up sure she could still smell the sparkle — and maybe, just maybe, she could.'}`,
    `{scene:'dream',       text:'Rylee woke up sure she could still smell the sparkle — and maybe, just maybe, she could.'}`
  ],
  // S024
  [
    `{scene:'bedroom',     text:'They both woke up at the same moment and looked at each other. "Fish," said Rylee. Brielle nodded. "Pajamas."'}`,
    `{scene:'dream',       text:'They both woke up at the same moment and looked at each other. "Fish," said Rylee. Brielle nodded. "Pajamas."'}`
  ],
  // S025
  [
    `{scene:'bedroom',     text:'They all woke up the next morning wanting to do it again — the best thing about dream slides is they\\'re always there.'}`,
    `{scene:'castle',      text:'They all woke up the next morning wanting to do it again — the best thing about dream slides is they\\'re always there.'}`
  ],
  // S026
  [
    `{scene:'bedroom',     text:'Mary Joy and Rylee woke up wanting to read — which, Mary Joy thought, was the very best reason for a dream.'}`,
    `{scene:'castle',      text:'Mary Joy and Rylee woke up wanting to read — which, Mary Joy thought, was the very best reason for a dream.'}`
  ],
  // S027
  [
    `{scene:'bedroom',     text:'Brielle woke up and squeezed Mr. Bear extra tight. "Good job, your majesty," she whispered. He said nothing, but she knew.'}`,
    `{scene:'dream',       text:'Brielle woke up and squeezed Mr. Bear extra tight. "Good job, your majesty," she whispered. He said nothing, but she knew.'}`
  ],
  // S028
  [
    `{scene:'bedroom',     text:'The music played all night in their sleep — soft and sweet — and they all woke humming the same tune.'}`,
    `{scene:'castle',      text:'The music played all night in their sleep — soft and sweet — and they all woke humming the same tune.'}`
  ],
  // S029
  [
    `{scene:'bedroom',     text:'Rylee woke up gripping the sheet like a treasure map and decided she would be a pirate when she grew up. Or maybe a baker.'}`,
    `{scene:'dream',       text:'Rylee woke up gripping the sheet like a treasure map and decided she would be a pirate when she grew up. Or maybe a baker.'}`
  ],
  // S030
  [
    `{scene:'bedroom',     text:'Mary Joy found Brielle smiling in her sleep and leaned down to kiss her forehead — right where the fairy had left her gift.'}`,
    `{scene:'dream',       text:'Mary Joy found Brielle smiling in her sleep and leaned down to kiss her forehead — right where the fairy had left her gift.'}`
  ],

  // S031-S040 (Animal Friends): replace bedroom with park/forest
  // S031
  [
    `{scene:'bedroom',     text:'They tiptoed away so they wouldn\\'t wake it — and then went to sleep themselves, warm from watching something so peaceful.'}`,
    `{scene:'park',        text:'They tiptoed away so they wouldn\\'t wake it — and then went to sleep themselves, warm from watching something so peaceful.'}`
  ],
  // S032
  [
    `{scene:'bedroom',     text:'The whole family went to bed early that night and agreed it was the best advice any of them had ever received.'}`,
    `{scene:'forest',      text:'The whole family went to bed early that night and agreed it was the best advice any of them had ever received.'}`
  ],
  // S033
  [
    `{scene:'bedroom',     text:'They walked home through the warm dark, everyone glowing a little — from the fireflies, and from the love.'}`,
    `{scene:'forest',      text:'They walked home through the warm dark, everyone glowing a little — from the fireflies, and from the love.'}`
  ],
  // S034
  [
    `{scene:'bedroom',     text:'Brielle thought about the bear as she fell asleep and decided to hum too, just in case anyone nearby needed to know.'}`,
    `{scene:'forest',      text:'Brielle thought about the bear as she fell asleep and decided to hum too, just in case anyone nearby needed to know.'}`
  ],
  // S035
  [
    `{scene:'bedroom',     text:'She sent the letter by leaving it on the windowsill. The next morning it was gone. She never questioned why.'}`,
    `{scene:'park',        text:'She sent the letter by leaving it on the windowsill. The next morning it was gone. She never questioned why.'}`
  ],
  // S036
  [
    `{scene:'bedroom',     text:'Brielle listened to Gerald all the way to sleep. It was, she decided, the best lullaby she\\'d ever heard.'}`,
    `{scene:'park',        text:'Brielle listened to Gerald all the way to sleep. It was, she decided, the best lullaby she\\'d ever heard.'}`
  ],
  // S037
  [
    `{scene:'bedroom',     text:'They all woke up a little lighter — because sometimes you only need to know that everyone else gets tired too.'}`,
    `{scene:'park',        text:'They all woke up a little lighter — because sometimes you only need to know that everyone else gets tired too.'}`
  ],
  // S038
  [
    `{scene:'bedroom',     text:'Brielle watched him sleep and decided dreaming was the same for everyone — exciting, strange, and better with someone nearby.'}`,
    `{scene:'park',        text:'Brielle watched him sleep and decided dreaming was the same for everyone — exciting, strange, and better with someone nearby.'}`
  ],
  // S039
  [
    `{scene:'bedroom',     text:'Rylee went to bed that night with music somewhere behind her ribs — and it was still there when she woke up.'}`,
    `{scene:'park',        text:'Rylee went to bed that night with music somewhere behind her ribs — and it was still there when she woke up.'}`
  ],
  // S040
  [
    `{scene:'bedroom',     text:'Brielle went to sleep thinking about that. Maybe everyone is going exactly as fast as they need to. Even her.'}`,
    `{scene:'park',        text:'Brielle went to sleep thinking about that. Maybe everyone is going exactly as fast as they need to. Even her.'}`
  ],

  // S041-S050 (Nature & Seasons)
  // S041 (snow) -> snow
  [
    `{scene:'bedroom',     text:'They came in pink-cheeked and cold-nosed and snuggled under every blanket they owned — and the snow kept falling softly.'}`,
    `{scene:'snow',        text:'They came in pink-cheeked and cold-nosed and snuggled under every blanket they owned — and the snow kept falling softly.'}`
  ],
  // S042
  [
    `{scene:'bedroom',     text:'They went to bed with leaves still in their hair, smelling like cold earth and the very best part of autumn.'}`,
    `{scene:'garden',      text:'They went to bed with leaves still in their hair, smelling like cold earth and the very best part of autumn.'}`
  ],
  // S043
  [
    `{scene:'bedroom',     text:'Mary Joy finally called them in at nine. They went without complaining — you can\\'t argue with a sky like that.'}`,
    `{scene:'park',        text:'Mary Joy finally called them in at nine. They went without complaining — you can\\'t argue with a sky like that.'}`
  ],
  // S044
  [
    `{scene:'bedroom',     text:'That night Brielle decided she was like that flower — small sometimes, but always working her way toward the light.'}`,
    `{scene:'garden',      text:'That night Brielle decided she was like that flower — small sometimes, but always working her way toward the light.'}`
  ],
  // S045 page[0] and page[2]
  [
    `{scene:'bedroom',     text:'Rain tapped on the windows in a steady, soft rhythm — the best kind of night music there is.'}`,
    `{scene:'garden',      text:'Rain tapped on the windows in a steady, soft rhythm — the best kind of night music there is.'}`
  ],
  [
    `{scene:'bedroom',     text:'They went to bed to the sound of rain and woke up to sunshine — and for a moment, everything was perfect.'}`,
    `{scene:'garden',      text:'They went to bed to the sound of rain and woke up to sunshine — and for a moment, everything was perfect.'}`
  ],
  // S046
  [
    `{scene:'bedroom',     text:'Rylee thought about the door all the way to sleep — and in her dream, she found out where it led. It was, in fact, really good.'}`,
    `{scene:'garden',      text:'Rylee thought about the door all the way to sleep — and in her dream, she found out where it led. It was, in fact, really good.'}`
  ],
  // S047
  [
    `{scene:'bedroom',     text:'They all went to bed glowing silver, like small moons themselves — each carrying their own quiet light.'}`,
    `{scene:'stars',       text:'They all went to bed glowing silver, like small moons themselves — each carrying their own quiet light.'}`
  ],
  // S048
  [
    `{scene:'bedroom',     text:'Rylee went inside and got into bed. She could still hear the wind through the wall, keeping its promise.'}`,
    `{scene:'garden',      text:'Rylee went inside and got into bed. She could still hear the wind through the wall, keeping its promise.'}`
  ],
  // S049
  [
    `{scene:'bedroom',     text:'That night the whole family slept better than usual — held by the season, by the pie, and by each other.'}`,
    `{scene:'garden',      text:'That night the whole family slept better than usual — held by the season, by the pie, and by each other.'}`
  ],
  // S050
  [
    `{scene:'bedroom',     text:'They stood in the midnight garden together until Brielle felt sleepy again — which didn\\'t take long at all.'}`,
    `{scene:'garden',      text:'They stood in the midnight garden together until Brielle felt sleepy again — which didn\\'t take long at all.'}`
  ],

  // S051-S060 (Family Moments): replace bedroom with park
  // S051
  [
    `{scene:'bedroom',     text:'Brielle got one just before bed and went to sleep wrapped in warmth that had nothing to do with blankets.'}`,
    `{scene:'park',        text:'Brielle got one just before bed and went to sleep wrapped in warmth that had nothing to do with blankets.'}`
  ],
  // S052 page[2]
  [
    `{scene:'bedroom',     text:'It worked immediately. It always did. Some words are magic, and mamas know all of them.'}`,
    `{scene:'park',        text:'It worked immediately. It always did. Some words are magic, and mamas know all of them.'}`
  ],
  // S053
  [
    `{scene:'bedroom',     text:'Eventually they migrated like one warm, sleepy creature to the beds — and slept the deep sleep of the perfectly happy.'}`,
    `{scene:'park',        text:'Eventually they migrated like one warm, sleepy creature to the beds — and slept the deep sleep of the perfectly happy.'}`
  ],
  // S054
  [
    `{scene:'bedroom',     text:'That night, going to sleep, they were all still a little sticky and completely, thoroughly happy.'}`,
    `{scene:'park',        text:'That night, going to sleep, they were all still a little sticky and completely, thoroughly happy.'}`
  ],
  // S055
  [
    `{scene:'bedroom',     text:'They fell asleep smiling at the same memory — the best kind of night, when a story puts you right to sleep.'}`,
    `{scene:'park',        text:'They fell asleep smiling at the same memory — the best kind of night, when a story puts you right to sleep.'}`
  ],
  // S056
  [
    `{scene:'bedroom',     text:'They went to bed warm-chested and slightly out of breath — music still playing somewhere behind their hearts.'}`,
    `{scene:'park',        text:'They went to bed warm-chested and slightly out of breath — music still playing somewhere behind their hearts.'}`
  ],
  // S057
  [
    `{scene:'bedroom',     text:'Rylee went to sleep practicing it under the covers — because some things are too important to forget.'}`,
    `{scene:'park',        text:'Rylee went to sleep practicing it under the covers — because some things are too important to forget.'}`
  ],
  // S058
  [
    `{scene:'bedroom',     text:'Brielle finished every drop, felt better immediately, and slept twelve whole hours — held by soup and by the hands that made it.'}`,
    `{scene:'park',        text:'Brielle finished every drop, felt better immediately, and slept twelve whole hours — held by soup and by the hands that made it.'}`
  ],
  // S059
  [
    `{scene:'bedroom',     text:'They all went to bed that night squished-shaped, in the very best way.'}`,
    `{scene:'park',        text:'They all went to bed that night squished-shaped, in the very best way.'}`
  ],
  // S060
  [
    `{scene:'bedroom',     text:'The hippo-butterfly was delicious. That night they all slept the sweet sleep of Sunday, which is the best sleep of the week.'}`,
    `{scene:'park',        text:'The hippo-butterfly was delicious. That night they all slept the sweet sleep of Sunday, which is the best sleep of the week.'}`
  ],

  // S061-S070 (Adventure Wind-Downs): replace bedroom with treehouse/castle
  // S061
  [
    `{scene:'bedroom',     text:'Rylee fell asleep thinking about that — and the next morning she found two more clues she\\'d missed, just because she looked harder.'}`,
    `{scene:'treehouse',   text:'Rylee fell asleep thinking about that — and the next morning she found two more clues she\\'d missed, just because she looked harder.'}`
  ],
  // S062
  [
    `{scene:'bedroom',     text:'The mystery went in a jar by her bed. It was probably a beetle. But explorers don\\'t say "probably." They say "to be continued."'}`,
    `{scene:'treehouse',   text:'The mystery went in a jar by her bed. It was probably a beetle. But explorers don\\'t say "probably." They say "to be continued."'}`
  ],
  // S063 page[2] only
  [
    `{scene:'bedroom',     text:'They fell asleep inside it and didn\\'t notice when it collapsed gently around them — still kings of the warmest kingdom.'}`,
    `{scene:'treehouse',   text:'They fell asleep inside it and didn\\'t notice when it collapsed gently around them — still kings of the warmest kingdom.'}`
  ],
  // S064
  [
    `{scene:'bedroom',     text:'They woke up reaching for brushes that weren\\'t there — but the pictures stayed, somewhere behind their eyes.'}`,
    `{scene:'castle',      text:'They woke up reaching for brushes that weren\\'t there — but the pictures stayed, somewhere behind their eyes.'}`
  ],
  // S065 page[2] only
  [
    `{scene:'bedroom',     text:'Mr. Bear agreed. The kingdom was in very good hands.'}`,
    `{scene:'castle',      text:'Mr. Bear agreed. The kingdom was in very good hands.'}`
  ],
  // S066
  [
    `{scene:'bedroom',     text:'Rylee lay in bed facing the window, where the last of the light still glowed. Now she understood.'}`,
    `{scene:'treehouse',   text:'Rylee lay in bed facing the window, where the last of the light still glowed. Now she understood.'}`
  ],
  // S067 page[2]
  [
    `{scene:'bedroom',     text:'"Promise?" said Rylee. "Absolutely," he said. She was asleep before he finished saying it.'}`,
    `{scene:'castle',      text:'"Promise?" said Rylee. "Absolutely," he said. She was asleep before he finished saying it.'}`
  ],
  // S068
  [
    `{scene:'bedroom',     text:'At home, they went straight to bed — still carrying the quiet of the trees, which is the best thing to carry to sleep.'}`,
    `{scene:'treehouse',   text:'At home, they went straight to bed — still carrying the quiet of the trees, which is the best thing to carry to sleep.'}`
  ],
  // S069
  [
    `{scene:'bedroom',     text:'They came home with muddy knees and excellent stories and didn\\'t need to be told twice to go to bed.'}`,
    `{scene:'treehouse',   text:'They came home with muddy knees and excellent stories and didn\\'t need to be told twice to go to bed.'}`
  ],
  // S070
  [
    `{scene:'bedroom',     text:'That night they each went to sleep knowing exactly where they were — which is the most comfortable place to be.'}`,
    `{scene:'treehouse',   text:'That night they each went to sleep knowing exactly where they were — which is the most comfortable place to be.'}`
  ],

  // S071-S080 (Imagination): replace bedroom with castle/underwater/dream
  // S071
  [
    `{scene:'bedroom',     text:'That night Brielle dreamed she had wings — light as paper and strong as anything — and she flew all the way to the top.'}`,
    `{scene:'dream',       text:'That night Brielle dreamed she had wings — light as paper and strong as anything — and she flew all the way to the top.'}`
  ],
  // S072
  [
    `{scene:'bedroom',     text:'She went to bed thinking about the tiny creatures living their tiny lives out there — and feeling suddenly, wonderfully big.'}`,
    `{scene:'underwater',  text:'She went to bed thinking about the tiny creatures living their tiny lives out there — and feeling suddenly, wonderfully big.'}`
  ],
  // S073
  [
    `{scene:'bedroom',     text:'The clouds drifted until dark. The dragons turned into horses turned into nothing — and everyone fell asleep watching.'}`,
    `{scene:'castle',      text:'The clouds drifted until dark. The dragons turned into horses turned into nothing — and everyone fell asleep watching.'}`
  ],
  // S074
  [
    `{scene:'bedroom',     text:'Brielle knew Pip wasn\\'t quite real — but she also knew that love you make up is still love, and that counts.'}`,
    `{scene:'dream',       text:'Brielle knew Pip wasn\\'t quite real — but she also knew that love you make up is still love, and that counts.'}`
  ],
  // S075
  [
    `{scene:'bedroom',     text:'"I think they\\'d say all of those things," she decided — and she felt seen, okay, and very ready to sleep.'}`,
    `{scene:'dream',       text:'"I think they\\'d say all of those things," she decided — and she felt seen, okay, and very ready to sleep.'}`
  ],
  // S076
  [
    `{scene:'bedroom',     text:'They sang the whole rainbow quietly before bed, ending on Brielle\\'s purple — long, slow, very important — and were asleep before the last note.'}`,
    `{scene:'underwater',  text:'They sang the whole rainbow quietly before bed, ending on Brielle\\'s purple — long, slow, very important — and were asleep before the last note.'}`
  ],
  // S077 page[2] only
  [
    `{scene:'bedroom',     text:'She fell asleep surrounded by her silent, listening, beloved things — and if any of them smiled, no one saw.'}`,
    `{scene:'castle',      text:'She fell asleep surrounded by her silent, listening, beloved things — and if any of them smiled, no one saw.'}`
  ],
  // S078
  [
    `{scene:'bedroom',     text:'Rylee woke up thinking about belief — how sometimes you have to step before you\\'re certain — and she felt braver for knowing.'}`,
    `{scene:'dream',       text:'Rylee woke up thinking about belief — how sometimes you have to step before you\\'re certain — and she felt braver for knowing.'}`
  ],
  // S079
  [
    `{scene:'bedroom',     text:'Sometimes the thing behind the secret door is the same as what\\'s in front of it — and that\\'s not disappointing at all.'}`,
    `{scene:'dream',       text:'Sometimes the thing behind the secret door is the same as what\\'s in front of it — and that\\'s not disappointing at all.'}`
  ],
  // S080
  [
    `{scene:'bedroom',     text:'Mary Joy smiled. "Good," she said. "That means they know you\\'re listening." Rylee went to sleep very carefully, so as not to disturb them.'}`,
    `{scene:'underwater',  text:'Mary Joy smiled. "Good," she said. "That means they know you\\'re listening." Rylee went to sleep very carefully, so as not to disturb them.'}`
  ],

  // S081-S090 (Sweet Dreams): KEEP bedroom - no changes

  // S091-S100 (Special Stories): replace bedroom with library/castle
  // S091
  [
    `{scene:'bedroom',     text:'The hidden part was always the same, in every story, even when it was different words: you are loved. Full stop.'}`,
    `{scene:'library',     text:'The hidden part was always the same, in every story, even when it was different words: you are loved. Full stop.'}`
  ],
  // S092: keep bedroom (first night home)
  // S093
  [
    `{scene:'bedroom',     text:'Brielle went to sleep satisfied with that answer — and woke up the same size, which was, she decided, exactly right.'}`,
    `{scene:'library',     text:'Brielle went to sleep satisfied with that answer — and woke up the same size, which was, she decided, exactly right.'}`
  ],
  // S094 page[2]
  [
    `{scene:'bedroom',     text:'She did it. It went fine. She told Astley the next day. He said, "I know." She asked how. "Because you\\'re you," he said.'}`,
    `{scene:'castle',      text:'She did it. It went fine. She told Astley the next day. He said, "I know." She asked how. "Because you\\'re you," he said.'}`
  ],
  // S095: keep bedroom (best bedtime ever)
  // S096
  [
    `{scene:'bedroom',     text:'They went to sleep holding the promise like something small and warm between them — the kind of thing that doesn\\'t break.'}`,
    `{scene:'library',     text:'They went to sleep holding the promise like something small and warm between them — the kind of thing that doesn\\'t break.'}`
  ],
  // S097
  [
    `{scene:'bedroom',     text:'That night they all slept easily, deeply, completely — the way you do when you\\'ve been well and truly held.'}`,
    `{scene:'library',     text:'That night they all slept easily, deeply, completely — the way you do when you\\'ve been well and truly held.'}`
  ],
  // S098
  [
    `{scene:'bedroom',     text:'They went inside satisfied — their stars were neighbors, which made perfect sense, because so were they.'}`,
    `{scene:'library',     text:'They went inside satisfied — their stars were neighbors, which made perfect sense, because so were they.'}`
  ],
  // S099
  [
    `{scene:'bedroom',     text:'They went to sleep holding that — still in the story, still on a page that hadn\\'t been written yet. Still going.'}`,
    `{scene:'library',     text:'They went to sleep holding that — still in the story, still on a page that hadn\\'t been written yet. Still going.'}`
  ],
  // S100 page[1]
  [
    `{scene:'bedroom',     text:'Goodnight, Rylee. Goodnight, Brielle. Goodnight, Mary Joy. Goodnight, Astley. Goodnight, Mr. Bear and Pip and all the rest.'}`,
    `{scene:'library',     text:'Goodnight, Rylee. Goodnight, Brielle. Goodnight, Mary Joy. Goodnight, Astley. Goodnight, Mr. Bear and Pip and all the rest.'}`
  ],
];

let changes = 0;
let failures = [];

for (const [oldStr, newStr] of replacements) {
  if (content.includes(oldStr)) {
    content = content.replace(oldStr, newStr);
    changes++;
  } else {
    failures.push(oldStr.substring(0, 90));
  }
}

fs.writeFileSync('data/stories.js', content);
console.log(`Applied ${changes} replacements`);
if (failures.length > 0) {
  console.log(`FAILED to find ${failures.length} strings:`);
  failures.forEach(f => console.log('  -', f));
}
console.log('Done');
