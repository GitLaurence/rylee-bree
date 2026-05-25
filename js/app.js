/* ─────────────────────────────────────────────────────
   Rylee & Bree — Bedtime Stories  |  app.js
───────────────────────────────────────────────────── */

const CHARS = {
  rylee:     { label: 'Rylee',    color: '#8B44F0' },
  brielle:   { label: 'Bree',     color: '#FF3E9D' },
  'mary-joy':{ label: 'Mary Joy', color: '#FF6B35' },
  astley:    { label: 'Astley',   color: '#00B4D8' },
};

const SCENE_GRADIENTS = {
  stars:        'radial-gradient(ellipse at 50% 30%, #1a2a8e 0%, #080f30 60%, #020408 100%)',
  bedroom:      'linear-gradient(160deg, #08091f 0%, #141a4a 55%, #1e2a6a 100%)',
  garden:       'linear-gradient(180deg, #7ecef4 0%, #87ceeb 50%, #5cb85c 50%, #2d7d2d 100%)',
  kitchen:      'linear-gradient(180deg, #ffe082 0%, #ff9800 40%, #fffde7 40%, #fffde7 100%)',
  'living-room':'linear-gradient(160deg, #fff3e0 0%, #ffe0b2 60%, #ffcc80 100%)',
  forest:       'linear-gradient(180deg, #1a5c1a 0%, #2d8b2d 40%, #1a3d00 40%, #0d2200 100%)',
  dream:        'radial-gradient(ellipse at 40% 40%, #5c0a8f 0%, #2d0050 50%, #0d0020 100%)',
  beach:        'linear-gradient(180deg, #87ceeb 0%, #4fc3f7 45%, #ffe082 45%, #ffd54f 100%)',
  snow:         'linear-gradient(180deg, #b3e5fc 0%, #e1f5fe 50%, #e0f7fa 50%, #b2ebf2 100%)',
  bath:         'linear-gradient(160deg, #e1f5fe 0%, #b3e5fc 50%, #81d4fa 100%)',
};

/* ── Scene SVG Art ────────────────────────────────── */
function sceneArt(scene, w, h) {
  const s = w, t = h;
  switch (scene) {
    case 'stars': return `
      <svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
        ${stars(s,t)}
        <!-- Moon -->
        <circle cx="${s*.72}" cy="${t*.18}" r="${s*.13}" fill="#fff7c2" opacity=".95"/>
        <circle cx="${s*.78}" cy="${t*.14}" r="${s*.11}" fill="#1a2a8e"/>
        <!-- Big glowing star -->
        <circle cx="${s*.22}" cy="${t*.22}" r="4" fill="#fff" opacity=".9"/>
        <circle cx="${s*.22}" cy="${t*.22}" r="10" fill="#fff" opacity=".1"/>
        <!-- Two sisters silhouette -->
        ${girlsSilhouette(s, t, '#fff', .18)}
      </svg>`;

    case 'bedroom': return `
      <svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
        ${stars(s,t)}
        <!-- Window with moonlight -->
        <rect x="${s*.3}" y="${t*.08}" width="${s*.4}" height="${s*.32}" rx="4" fill="#0a1540" stroke="#4a6fa5" stroke-width="2"/>
        <circle cx="${s*.5}" cy="${t*.2}" r="${s*.1}" fill="#fff9d0" opacity=".7"/>
        <!-- Curtains -->
        <path d="M${s*.3},${t*.08} Q${s*.22},${t*.24} ${s*.3},${t*.4}" fill="#5c3d8f" opacity=".7"/>
        <path d="M${s*.7},${t*.08} Q${s*.78},${t*.24} ${s*.7},${t*.4}" fill="#5c3d8f" opacity=".7"/>
        <!-- Bed -->
        <rect x="${s*.08}" y="${t*.58}" width="${s*.84}" height="${t*.28}" rx="8" fill="#9b59b6"/>
        <rect x="${s*.08}" y="${t*.56}" width="${s*.84}" height="${t*.08}" rx="4" fill="#7d3c98"/>
        <!-- Pillows -->
        <rect x="${s*.13}" y="${t*.59}" width="${s*.28}" height="${t*.1}" rx="5" fill="#f8c8e0"/>
        <rect x="${s*.59}" y="${t*.59}" width="${s*.28}" height="${t*.1}" rx="5" fill="#d4a0f0"/>
        <!-- Blanket -->
        <rect x="${s*.08}" y="${t*.67}" width="${s*.84}" height="${t*.19}" rx="0 0 8 8" fill="#e8b4f8"/>
        <path d="M${s*.08},${t*.67} Q${s*.3},${t*.72} ${s*.5},${t*.67} Q${s*.7},${t*.62} ${s*.92},${t*.67}" stroke="#d488f5" stroke-width="2" fill="none"/>
        <!-- Stars on wall -->
        ${Array.from({length:6},(_,i)=>`<circle cx="${s*(.1+i*.15)}" cy="${t*.5}" r="2" fill="#fff" opacity="${.3+i*.08}"/>`).join('')}
      </svg>`;

    case 'garden': return `
      <svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
        <!-- Sky clouds -->
        <ellipse cx="${s*.2}" cy="${t*.18}" rx="${s*.14}" ry="${t*.07}" fill="#fff" opacity=".8"/>
        <ellipse cx="${s*.32}" cy="${t*.16}" rx="${s*.1}" ry="${t*.06}" fill="#fff" opacity=".8"/>
        <ellipse cx="${s*.75}" cy="${t*.22}" rx="${s*.12}" ry="${t*.06}" fill="#fff" opacity=".75"/>
        <!-- Sun -->
        <circle cx="${s*.85}" cy="${t*.12}" r="${s*.09}" fill="#ffd54f"/>
        ${sunRays(s*.85, t*.12, s*.09, s*.16)}
        <!-- Grass horizon already in bg -->
        <!-- Big tree left -->
        <rect x="${s*.08}" y="${t*.38}" width="${s*.07}" height="${t*.25}" fill="#6d4c41"/>
        <circle cx="${s*.115}" cy="${t*.3}" r="${s*.12}" fill="#43a047"/>
        <circle cx="${s*.07}" cy="${t*.35}" r="${s*.09}" fill="#388e3c"/>
        <!-- Flowers -->
        ${flowers(s, t)}
        <!-- Butterfly -->
        <ellipse cx="${s*.6}" cy="${t*.42}" rx="${s*.05}" ry="${t*.03}" fill="#ff80ab" opacity=".85" transform="rotate(-20,${s*.6},${t*.42})"/>
        <ellipse cx="${s*.68}" cy="${t*.42}" rx="${s*.05}" ry="${t*.03}" fill="#ff80ab" opacity=".85" transform="rotate(20,${s*.68},${t*.42})"/>
        <line x1="${s*.64}" y1="${t*.39}" x2="${s*.64}" y2="${t*.45}" stroke="#555" stroke-width="1.5"/>
      </svg>`;

    case 'kitchen': return `
      <svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
        <!-- Window -->
        <rect x="${s*.28}" y="${t*.04}" width="${s*.44}" height="${t*.3}" rx="4" fill="#b3e5fc" stroke="#90caf9" stroke-width="2"/>
        <line x1="${s*.5}" y1="${t*.04}" x2="${s*.5}" y2="${t*.34}" stroke="#90caf9" stroke-width="1.5"/>
        <line x1="${s*.28}" y1="${t*.19}" x2="${s*.72}" y2="${t*.19}" stroke="#90caf9" stroke-width="1.5"/>
        <!-- Countertop -->
        <rect x="0" y="${t*.52}" width="${s}" height="${t*.48}" fill="#fff8e1"/>
        <rect x="0" y="${t*.52}" width="${s}" height="${t*.04}" fill="#ffd54f"/>
        <!-- Cabinet -->
        <rect x="${s*.05}" y="${t*.52}" width="${s*.38}" height="${t*.46}" fill="#fff3e0" stroke="#ffcc80" stroke-width="1.5"/>
        <rect x="${s*.57}" y="${t*.52}" width="${s*.38}" height="${t*.46}" fill="#fff3e0" stroke="#ffcc80" stroke-width="1.5"/>
        <!-- Bowls of cereal -->
        <ellipse cx="${s*.35}" cy="${t*.56}" rx="${s*.12}" ry="${t*.05}" fill="#ffe082"/>
        <ellipse cx="${s*.35}" cy="${t*.54}" rx="${s*.1}" ry="${t*.04}" fill="#fff9c4"/>
        <ellipse cx="${s*.65}" cy="${t*.56}" rx="${s*.12}" ry="${t*.05}" fill="#ffccbc"/>
        <ellipse cx="${s*.65}" cy="${t*.54}" rx="${s*.1}" ry="${t*.04}" fill="#ffe0b2"/>
        <!-- Milk splash drops -->
        <circle cx="${s*.38}" cy="${t*.51}" r="3" fill="#fff" opacity=".8"/>
        <circle cx="${s*.42}" cy="${t*.49}" r="2" fill="#fff" opacity=".8"/>
        <!-- Colorful magnets on cabinet -->
        <circle cx="${s*.2}"  cy="${t*.63}" r="5" fill="#ef5350"/>
        <circle cx="${s*.3}"  cy="${t*.63}" r="5" fill="#42a5f5"/>
        <circle cx="${s*.25}" cy="${t*.71}" r="5" fill="#ffca28"/>
        <!-- Juice cups -->
        <rect x="${s*.73}" y="${t*.54}" width="${s*.08}" height="${t*.12}" rx="2" fill="#ff8a65" opacity=".85"/>
        <rect x="${s*.83}" y="${t*.54}" width="${s*.08}" height="${t*.12}" rx="2" fill="#aed581" opacity=".85"/>
      </svg>`;

    case 'living-room': return `
      <svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
        <!-- Rug -->
        <ellipse cx="${s*.5}" cy="${t*.82}" rx="${s*.42}" ry="${t*.1}" fill="#ef9a9a" opacity=".6"/>
        <!-- Couch -->
        <rect x="${s*.06}" y="${t*.5}" width="${s*.88}" height="${t*.32}" rx="10" fill="#7c4dff"/>
        <rect x="${s*.06}" y="${t*.48}" width="${s*.88}" height="${t*.08}" rx="8" fill="#651fff"/>
        <!-- Cushions -->
        <rect x="${s*.12}" y="${t*.52}" width="${s*.24}" height="${t*.2}" rx="6" fill="#e040fb"/>
        <rect x="${s*.62}" y="${t*.52}" width="${s*.24}" height="${t*.2}" rx="6" fill="#40c4ff"/>
        <!-- Lamp -->
        <rect x="${s*.82}" y="${t*.3}" width="${s*.04}" height="${t*.2}" fill="#a1887f"/>
        <polygon points="${s*.75},${t*.3} ${s*.93},${t*.3} ${s*.87},${t*.14} ${s*.81},${t*.14}" fill="#ffe082"/>
        <circle cx="${s*.84}" cy="${t*.3}" r="${s*.02}" fill="#fff9c4"/>
        <!-- Picture frame -->
        <rect x="${s*.3}" y="${t*.1}" width="${s*.4}" height="${t*.28}" rx="4" fill="#fff" stroke="#ffcc80" stroke-width="3"/>
        <!-- Rainbow in picture -->
        ${rainbow(s*.3+s*.04, t*.1+t*.04, s*.32, t*.2)}
        <!-- Crayon on floor -->
        <rect x="${s*.42}" y="${t*.88}" width="${s*.16}" height="${s*.04}" rx="2" fill="#2196f3" transform="rotate(-10,${s*.5},${t*.9})"/>
      </svg>`;

    case 'forest': return `
      <svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
        <!-- Sky through canopy -->
        <rect x="0" y="0" width="${s}" height="${t*.4}" fill="#1a5c1a"/>
        <!-- Tree trunks -->
        ${[.1,.25,.65,.8].map(x=>`<rect x="${s*x}" y="${t*.25}" width="${s*.06}" height="${t*.55}" fill="#5d4037"/>`).join('')}
        <!-- Tree crowns -->
        ${[.13,.28,.68,.83].map((x,i)=>`<circle cx="${s*x}" cy="${t*(.22-i*.02)}" r="${s*.13}" fill="${['#2e7d32','#388e3c','#1b5e20','#43a047'][i]}"/>`).join('')}
        <!-- Fireflies -->
        ${Array.from({length:8},(_,i)=>`<circle cx="${s*(.2+i*.08)}" cy="${t*(.45+Math.sin(i)*0.1)}" r="2.5" fill="#ffff8d" opacity="${.5+i*.06}" class="star-twinkle"/>`).join('')}
        <!-- Mushrooms -->
        <ellipse cx="${s*.42}" cy="${t*.72}" rx="${s*.06}" ry="${t*.03}" fill="#e53935"/>
        <rect x="${s*.44}" y="${t*.72}" width="${s*.04}" height="${t*.1}" fill="#f5f5f5"/>
        <ellipse cx="${s*.42}" cy="${t*.72}" rx="${s*.06}" ry="${t*.03}" fill="#e53935"/>
        <circle cx="${s*.4}"  cy="${t*.7}"  r="2" fill="#fff" opacity=".7"/>
        <circle cx="${s*.44}" cy="${t*.69}" r="1.5" fill="#fff" opacity=".7"/>
        <!-- Path -->
        <path d="M${s*.35},${t} Q${s*.45},${t*.8} ${s*.55},${t*.6} Q${s*.65},${t*.45} ${s*.6},${t*.35}" stroke="#8d6e63" stroke-width="14" fill="none" opacity=".4"/>
      </svg>`;

    case 'dream': return `
      <svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
        ${stars(s,t)}
        <!-- Dream bubbles -->
        ${Array.from({length:5},(_,i)=>`
          <circle cx="${s*(.15+i*.17)}" cy="${t*(.2+i*.08)}" r="${20+i*8}" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="2"/>
          <circle cx="${s*(.15+i*.17)}" cy="${t*(.2+i*.08)}" r="${10+i*4}" fill="rgba(255,255,255,.07)"/>
        `).join('')}
        <!-- Rainbow arc -->
        ${rainbowArc(s*.5, t*.6, s*.38)}
        <!-- Floating castle -->
        <rect x="${s*.32}" y="${t*.32}" width="${s*.36}" height="${t*.22}" fill="#ce93d8"/>
        <rect x="${s*.38}" y="${t*.24}" width="${s*.1}" height="${t*.1}" fill="#ba68c8"/>
        <rect x="${s*.52}" y="${t*.24}" width="${s*.1}" height="${t*.1}" fill="#ba68c8"/>
        <polygon points="${s*.38},${t*.24} ${s*.43},${t*.18} ${s*.48},${t*.24}" fill="#f48fb1"/>
        <polygon points="${s*.52},${t*.24} ${s*.57},${t*.18} ${s*.62},${t*.24}" fill="#f48fb1"/>
        <rect x="${s*.44}" y="${t*.4}" width="${s*.12}" height="${t*.14}" fill="#7b1fa2"/>
        <!-- Stars scattered -->
        ${Array.from({length:12},(_,i)=>`<polygon points="${starPoints(s*(.05+i*.08), t*(.08+i*.06), 5)}" fill="#fff9c4" opacity="${.4+i*.04}"/>`).join('')}
      </svg>`;

    case 'beach': return `
      <svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
        <!-- Sun high -->
        <circle cx="${s*.8}" cy="${t*.12}" r="${s*.1}" fill="#ffd54f"/>
        ${sunRays(s*.8, t*.12, s*.1, s*.18)}
        <!-- Waves -->
        <path d="M0,${t*.46} Q${s*.2},${t*.42} ${s*.4},${t*.46} Q${s*.6},${t*.5} ${s*.8},${t*.46} Q${s*.9},${t*.43} ${s},${t*.46} L${s},${t*.5} L0,${t*.5}Z" fill="#29b6f6" opacity=".8"/>
        <path d="M0,${t*.48} Q${s*.25},${t*.44} ${s*.5},${t*.48} Q${s*.75},${t*.52} ${s},${t*.48} L${s},${t*.55} L0,${t*.55}Z" fill="#0288d1" opacity=".6"/>
        <!-- Sand -->
        <rect x="0" y="${t*.5}" width="${s}" height="${t*.5}" fill="#ffd54f"/>
        <!-- Seashells -->
        <ellipse cx="${s*.2}" cy="${t*.72}" rx="${s*.05}" ry="${s*.025}" fill="#ffccbc" transform="rotate(-20,${s*.2},${t*.72})"/>
        <ellipse cx="${s*.45}" cy="${t*.82}" rx="${s*.04}" ry="${s*.02}" fill="#f48fb1"/>
        <ellipse cx="${s*.7}"  cy="${t*.68}" rx="${s*.05}" ry="${s*.025}" fill="#ffe082"/>
        <!-- Sandcastle -->
        <rect x="${s*.6}" y="${t*.58}" width="${s*.2}" height="${t*.14}" fill="#ffca28"/>
        <polygon points="${s*.6},${t*.58} ${s*.7},${t*.51} ${s*.8},${t*.58}" fill="#ffd54f"/>
        <!-- Bucket + shovel -->
        <rect x="${s*.15}" y="${t*.62}" width="${s*.1}" height="${t*.12}" rx="2" fill="#ef5350"/>
        <rect x="${s*.27}" y="${t*.6}" width="${s*.03}" height="${t*.16}" fill="#a1887f"/>
        <ellipse cx="${s*.285}" cy="${t*.6}" rx="${s*.03}" ry="${s*.015}" fill="#a1887f"/>
        <!-- Seagulls -->
        <path d="M${s*.3},${t*.18} Q${s*.33},${t*.15} ${s*.36},${t*.18}" stroke="#546e7a" stroke-width="1.5" fill="none"/>
        <path d="M${s*.42},${t*.14} Q${s*.45},${t*.11} ${s*.48},${t*.14}" stroke="#546e7a" stroke-width="1.5" fill="none"/>
      </svg>`;

    case 'snow': return `
      <svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
        <!-- Snowflakes -->
        ${Array.from({length:18},(_,i)=>snowflake(s*(i/18+.03), t*(.05+Math.random()*.35), 4+Math.random()*6, i)).join('')}
        <!-- Snowy ground hill -->
        <ellipse cx="${s*.5}" cy="${t*.56}" rx="${s*.6}" ry="${t*.14}" fill="#e0f7fa"/>
        <rect x="0" y="${t*.56}" width="${s}" height="${t*.44}" fill="#e0f7fa"/>
        <!-- Snowman -->
        <circle cx="${s*.5}" cy="${t*.72}" r="${s*.11}" fill="#fff" stroke="#b0bec5" stroke-width="1.5"/>
        <circle cx="${s*.5}" cy="${t*.56}" r="${s*.08}" fill="#fff" stroke="#b0bec5" stroke-width="1.5"/>
        <!-- Eyes & nose & buttons -->
        <circle cx="${s*.47}" cy="${t*.54}" r="2.5" fill="#37474f"/>
        <circle cx="${s*.53}" cy="${t*.54}" r="2.5" fill="#37474f"/>
        <polygon points="${s*.5},${t*.57} ${s*.52},${t*.6} ${s*.48},${t*.6}" fill="#ff8a65"/>
        <circle cx="${s*.5}"  cy="${t*.65}" r="2" fill="#37474f"/>
        <circle cx="${s*.5}"  cy="${t*.7}"  r="2" fill="#37474f"/>
        <!-- Scarf -->
        <path d="M${s*.42},${t*.63} Q${s*.5},${t*.67} ${s*.58},${t*.63}" stroke="#ef5350" stroke-width="5" fill="none" stroke-linecap="round"/>
        <!-- Arms (sticks) -->
        <line x1="${s*.39}" y1="${t*.68}" x2="${s*.25}" y2="${t*.6}" stroke="#5d4037" stroke-width="3" stroke-linecap="round"/>
        <line x1="${s*.61}" y1="${t*.68}" x2="${s*.75}" y2="${t*.6}" stroke="#5d4037" stroke-width="3" stroke-linecap="round"/>
        <!-- Hat -->
        <rect x="${s*.43}" y="${t*.46}" width="${s*.14}" height="${t*.1}" rx="2" fill="#1a237e"/>
        <rect x="${s*.4}" y="${t*.54}" width="${s*.2}" height="${t*.03}" rx="1" fill="#1a237e"/>
        <!-- Pine tree -->
        <polygon points="${s*.8},${t*.3} ${s*.72},${t*.55} ${s*.88},${t*.55}" fill="#2e7d32"/>
        <polygon points="${s*.8},${t*.2} ${s*.73},${t*.4} ${s*.87},${t*.4}" fill="#388e3c"/>
        <rect x="${s*.78}" y="${t*.55}" width="${s*.04}" height="${t*.08}" fill="#6d4c41"/>
      </svg>`;

    case 'bath': return `
      <svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
        <!-- Tiles -->
        ${Array.from({length:4},(_,row)=>Array.from({length:5},(_,col)=>`
          <rect x="${s*(col/5)+1}" y="${t*(row*.14)+1}" width="${s/5-2}" height="${t*.14-2}" rx="2"
            fill="${['#b3e5fc','#e1f5fe','#b3e5fc','#e1f5fe','#b3e5fc'][(col+row)%2]}" opacity=".7"/>
        `).join('')).join('')}
        <!-- Bathtub -->
        <path d="M${s*.06},${t*.52} Q${s*.06},${t*.92} ${s*.12},${t*.94} L${s*.88},${t*.94} Q${s*.94},${t*.92} ${s*.94},${t*.52}Z" fill="#fff" stroke="#b0bec5" stroke-width="2"/>
        <!-- Water (bubbles) -->
        <ellipse cx="${s*.5}" cy="${t*.7}" rx="${s*.38}" ry="${t*.16}" fill="#b3e5fc" opacity=".7"/>
        <!-- Bubbles -->
        ${Array.from({length:10},(_,i)=>`<circle cx="${s*(.15+i*.07)}" cy="${t*(.62-i*.015)}" r="${3+i*.5}" fill="#fff" opacity="${.4+i*.05}"/>`).join('')}
        <!-- Rubber duck -->
        <ellipse cx="${s*.7}" cy="${t*.66}" rx="${s*.07}" ry="${t*.05}" fill="#ffd54f"/>
        <circle  cx="${s*.73}" cy="${t*.61}" r="${s*.04}" fill="#ffd54f"/>
        <circle  cx="${s*.74}" cy="${t*.6}"  r="2.5" fill="#37474f"/>
        <polygon points="${s*.75},${t*.63} ${s*.79},${t*.62} ${s*.77},${t*.65}" fill="#ff8a65"/>
        <!-- Shampoo bottles -->
        <rect x="${s*.08}" y="${t*.44}" width="${s*.07}" height="${t*.12}" rx="3" fill="#f48fb1"/>
        <rect x="${s*.17}" y="${t*.46}" width="${s*.06}" height="${t*.1}" rx="3" fill="#80cbc4"/>
        <!-- Towel on side -->
        <rect x="${s*.86}" y="${t*.4}" width="${s*.1}" height="${t*.3}" rx="3" fill="#f8bbd0"/>
        <line x1="${s*.86}" y1="${t*.5}" x2="${s*.96}" y2="${t*.5}" stroke="#f48fb1" stroke-width="2"/>
        <line x1="${s*.86}" y1="${t*.58}" x2="${s*.96}" y2="${t*.58}" stroke="#f48fb1" stroke-width="2"/>
      </svg>`;

    default: return `<svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">${stars(s,t)}</svg>`;
  }
}

/* ── Character SVG Art ────────────────────────────── */
function charArt(char, cx, cy, scale) {
  const sc = scale || 1;
  const sz = 60 * sc;
  const x = cx - sz/2, y = cy - sz;

  switch (char) {
    case 'rylee': return `
      <g transform="translate(${cx},${cy}) scale(${sc})">
        <!-- Body purple dress -->
        <ellipse cx="0" cy="10" rx="18" ry="22" fill="#8B44F0"/>
        <path d="M-18,10 Q-22,32 -14,38 L14,38 Q22,32 18,10Z" fill="#7B34E0"/>
        <!-- Sparkle on dress -->
        <polygon points="0,5 2,11 8,11 3,15 5,21 0,17 -5,21 -3,15 -8,11 -2,11" fill="#FFD700" opacity=".7" transform="scale(.5) translate(20,-10)"/>
        <!-- Neck + Head -->
        <rect x="-6" y="-12" width="12" height="8" rx="4" fill="#FDBCB4"/>
        <circle cx="0" cy="-24" r="20" fill="#FDBCB4"/>
        <!-- Bold hair (dark brown, high ponytail) -->
        <ellipse cx="0" cy="-38" rx="12" ry="8" fill="#3e1f00"/>
        <rect x="-10" y="-42" width="20" height="20" rx="10" fill="#3e1f00"/>
        <ellipse cx="0" cy="-26" rx="20" ry="10" fill="#3e1f00"/>
        <ellipse cx="14" cy="-24" rx="7" ry="14" fill="#3e1f00"/>
        <ellipse cx="-14" cy="-24" rx="7" ry="14" fill="#3e1f00"/>
        <!-- Ponytail up -->
        <path d="M0,-42 Q10,-56 4,-62" stroke="#3e1f00" stroke-width="8" fill="none" stroke-linecap="round"/>
        <circle cx="4" cy="-62" r="6" fill="#FF3E9D"/>
        <!-- Face -->
        <circle cx="-7" cy="-26" r="3" fill="#3e1f00"/>
        <circle cx="7" cy="-26" r="3" fill="#3e1f00"/>
        <circle cx="-6" cy="-25" r="1" fill="#fff"/>
        <circle cx="8" cy="-25" r="1" fill="#fff"/>
        <path d="M-5,-16 Q0,-12 5,-16" stroke="#c0392b" stroke-width="2" fill="none" stroke-linecap="round"/>
        <!-- Blush -->
        <ellipse cx="-11" cy="-20" rx="4" ry="2.5" fill="#ffb3ba" opacity=".5"/>
        <ellipse cx="11" cy="-20" rx="4" ry="2.5" fill="#ffb3ba" opacity=".5"/>
        <!-- Arms -->
        <path d="M-18,6 Q-30,14 -24,24" stroke="#FDBCB4" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="M18,6 Q30,14 24,24" stroke="#FDBCB4" stroke-width="8" fill="none" stroke-linecap="round"/>
        <!-- Legs -->
        <rect x="-12" y="34" width="8" height="18" rx="4" fill="#FDBCB4"/>
        <rect x="4" y="34" width="8" height="18" rx="4" fill="#FDBCB4"/>
        <!-- Shoes -->
        <ellipse cx="-8" cy="52" rx="8" ry="5" fill="#8B44F0"/>
        <ellipse cx="8" cy="52" rx="8" ry="5" fill="#8B44F0"/>
      </g>`;

    case 'brielle': return `
      <g transform="translate(${cx},${cy}) scale(${sc * .88})">
        <!-- Body pink dress with ruffles -->
        <ellipse cx="0" cy="10" rx="16" ry="20" fill="#FF3E9D"/>
        <path d="M-16,10 Q-20,30 -12,36 L12,36 Q20,30 16,10Z" fill="#E0188D"/>
        <!-- Ruffle -->
        ${Array.from({length:5},(_,i)=>`<ellipse cx="${-10+i*5}" cy="26" rx="5" ry="4" fill="#FF69BB"/>`).join('')}
        <!-- Neck + Head (smaller — younger) -->
        <rect x="-5" y="-10" width="10" height="7" rx="4" fill="#FDDBB4"/>
        <circle cx="0" cy="-22" r="18" fill="#FDDBB4"/>
        <!-- Curly hair (lighter brown) -->
        <ellipse cx="0" cy="-30" rx="18" ry="10" fill="#6b3500"/>
        <ellipse cx="12" cy="-22" rx="8" ry="12" fill="#6b3500"/>
        <ellipse cx="-12" cy="-22" rx="8" ry="12" fill="#6b3500"/>
        <!-- Curls hint -->
        <path d="M14,-12 Q18,-8 14,-4" stroke="#8B4513" stroke-width="4" fill="none"/>
        <path d="M-14,-12 Q-18,-8 -14,-4" stroke="#8B4513" stroke-width="4" fill="none"/>
        <!-- Pigtails -->
        <path d="M-16,-28 Q-28,-36 -22,-46" stroke="#6b3500" stroke-width="9" fill="none" stroke-linecap="round"/>
        <circle cx="-22" cy="-46" r="5" fill="#FF3E9D"/>
        <path d="M16,-28 Q28,-36 22,-46" stroke="#6b3500" stroke-width="9" fill="none" stroke-linecap="round"/>
        <circle cx="22" cy="-46" r="5" fill="#FF3E9D"/>
        <!-- Face -->
        <circle cx="-6" cy="-24" r="3" fill="#3e1f00"/>
        <circle cx="6" cy="-24" r="3" fill="#3e1f00"/>
        <circle cx="-5" cy="-23" r="1" fill="#fff"/>
        <circle cx="7" cy="-23" r="1" fill="#fff"/>
        <path d="M-4,-15 Q0,-10 4,-15" stroke="#c0392b" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <ellipse cx="-10" cy="-18" rx="4" ry="2.5" fill="#ffb3ba" opacity=".5"/>
        <ellipse cx="10" cy="-18" rx="4" ry="2.5" fill="#ffb3ba" opacity=".5"/>
        <!-- Arms -->
        <path d="M-16,4 Q-26,12 -22,20" stroke="#FDDBB4" stroke-width="7" fill="none" stroke-linecap="round"/>
        <path d="M16,4 Q26,12 22,20" stroke="#FDDBB4" stroke-width="7" fill="none" stroke-linecap="round"/>
        <!-- Legs -->
        <rect x="-10" y="32" width="7" height="16" rx="4" fill="#FDDBB4"/>
        <rect x="3" y="32" width="7" height="16" rx="4" fill="#FDDBB4"/>
        <!-- Shoes -->
        <ellipse cx="-6" cy="48" rx="7" ry="4" fill="#FF3E9D"/>
        <ellipse cx="6" cy="48" rx="7" ry="4" fill="#FF3E9D"/>
      </g>`;

    case 'mary-joy': return `
      <g transform="translate(${cx},${cy}) scale(${sc})">
        <!-- Body coral/orange dress -->
        <ellipse cx="0" cy="8" rx="20" ry="26" fill="#FF6B35"/>
        <path d="M-20,8 Q-24,36 -16,42 L16,42 Q24,36 20,8Z" fill="#E55A24"/>
        <!-- Flower pattern on dress -->
        <circle cx="-6" cy="18" r="4" fill="#FFD54F" opacity=".6"/>
        <circle cx="6" cy="8"  r="3" fill="#FFD54F" opacity=".5"/>
        <circle cx="10" cy="24" r="3.5" fill="#FFD54F" opacity=".55"/>
        <!-- Neck + Head (taller, mom) -->
        <rect x="-7" y="-14" width="14" height="10" rx="5" fill="#FDBCB4"/>
        <circle cx="0" cy="-28" r="22" fill="#FDBCB4"/>
        <!-- Hair (shoulder-length, dark) -->
        <ellipse cx="0" cy="-36" rx="22" ry="10" fill="#1c0a00"/>
        <ellipse cx="16" cy="-26" rx="9" ry="18" fill="#1c0a00"/>
        <ellipse cx="-16" cy="-26" rx="9" ry="18" fill="#1c0a00"/>
        <rect x="-22" y="-36" width="44" height="20" rx="0" fill="#1c0a00"/>
        <!-- Hair flow down sides -->
        <path d="M-22,-30 Q-28,0 -20,6" stroke="#1c0a00" stroke-width="10" fill="none"/>
        <path d="M22,-30 Q28,0 20,6" stroke="#1c0a00" stroke-width="10" fill="none"/>
        <!-- Hair bun / flower clip -->
        <circle cx="16" cy="-42" r="7" fill="#FF6B35"/>
        <circle cx="16" cy="-42" r="3" fill="#FFD700"/>
        <!-- Face -->
        <circle cx="-8" cy="-30" r="3.5" fill="#3e1f00"/>
        <circle cx="8" cy="-30" r="3.5" fill="#3e1f00"/>
        <circle cx="-7" cy="-29" r="1.2" fill="#fff"/>
        <circle cx="9" cy="-29" r="1.2" fill="#fff"/>
        <path d="M-6,-19 Q0,-14 6,-19" stroke="#c0392b" stroke-width="2.5" fill="#ff8a80" stroke-linecap="round"/>
        <!-- Earrings -->
        <circle cx="-22" cy="-24" r="3" fill="#FFD700"/>
        <circle cx="22" cy="-24" r="3" fill="#FFD700"/>
        <!-- Blush -->
        <ellipse cx="-13" cy="-22" rx="5" ry="3" fill="#ffb3ba" opacity=".45"/>
        <ellipse cx="13" cy="-22" rx="5" ry="3" fill="#ffb3ba" opacity=".45"/>
        <!-- Arms -->
        <path d="M-20,4 Q-34,12 -28,26" stroke="#FDBCB4" stroke-width="9" fill="none" stroke-linecap="round"/>
        <path d="M20,4 Q34,12 28,26" stroke="#FDBCB4" stroke-width="9" fill="none" stroke-linecap="round"/>
        <!-- Legs -->
        <rect x="-13" y="38" width="10" height="20" rx="5" fill="#FDBCB4"/>
        <rect x="3" y="38" width="10" height="20" rx="5" fill="#FDBCB4"/>
        <!-- Shoes -->
        <ellipse cx="-8" cy="58" rx="9" ry="5" fill="#FF6B35"/>
        <ellipse cx="8" cy="58" rx="9" ry="5" fill="#FF6B35"/>
      </g>`;

    case 'astley': return `
      <g transform="translate(${cx},${cy}) scale(${sc})">
        <!-- Body blue shirt + shorts -->
        <ellipse cx="0" cy="4" rx="18" ry="16" fill="#00B4D8"/>
        <rect x="-16" y="18" width="32" height="14" rx="4" fill="#0077b6"/>
        <!-- Shirt stripe -->
        <rect x="-18" y="8" width="36" height="4" rx="2" fill="#0096c7"/>
        <!-- Neck + Head -->
        <rect x="-6" y="-10" width="12" height="8" rx="4" fill="#FDBCB4"/>
        <circle cx="0" cy="-24" r="20" fill="#FDBCB4"/>
        <!-- Short hair (dark, boy style) -->
        <ellipse cx="0" cy="-34" rx="20" ry="10" fill="#2c1500"/>
        <rect x="-20" y="-38" width="40" height="16" rx="8" fill="#2c1500"/>
        <!-- Side part -->
        <path d="M-18,-28 Q-8,-36 4,-30" stroke="#3e1f00" stroke-width="3" fill="none" opacity=".5"/>
        <!-- Face -->
        <circle cx="-7" cy="-26" r="3" fill="#3e1f00"/>
        <circle cx="7" cy="-26" r="3" fill="#3e1f00"/>
        <circle cx="-6" cy="-25" r="1" fill="#fff"/>
        <circle cx="8" cy="-25" r="1" fill="#fff"/>
        <path d="M-5,-16 Q0,-11 5,-16" stroke="#c0392b" stroke-width="2" fill="none" stroke-linecap="round"/>
        <!-- Blush -->
        <ellipse cx="-11" cy="-20" rx="4" ry="2.5" fill="#ffb3ba" opacity=".4"/>
        <ellipse cx="11" cy="-20" rx="4" ry="2.5" fill="#ffb3ba" opacity=".4"/>
        <!-- Arms -->
        <path d="M-18,2 Q-30,10 -26,20" stroke="#FDBCB4" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="M18,2 Q30,10 26,20" stroke="#FDBCB4" stroke-width="8" fill="none" stroke-linecap="round"/>
        <!-- Legs -->
        <rect x="-12" y="30" width="9" height="18" rx="4" fill="#FDBCB4"/>
        <rect x="3" y="30" width="9" height="18" rx="4" fill="#FDBCB4"/>
        <!-- Shoes (sneakers) -->
        <ellipse cx="-8" cy="48" rx="9" ry="5" fill="#00B4D8"/>
        <ellipse cx="7" cy="48" rx="9" ry="5" fill="#00B4D8"/>
        <ellipse cx="-8" cy="46" rx="7" ry="3" fill="#fff" opacity=".4"/>
        <ellipse cx="7" cy="46" rx="7" ry="3" fill="#fff" opacity=".4"/>
      </g>`;
  }
  return '';
}

/* ── SVG Helpers ──────────────────────────────────── */
function stars(w, h, count=40) {
  return Array.from({length: count}, (_,i) => {
    const sx = Math.random()*w, sy = Math.random()*h*.6;
    const r  = .8 + Math.random()*2.5;
    const op = .4 + Math.random()*.6;
    return `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${r.toFixed(1)}" fill="#fff" opacity="${op.toFixed(2)}" class="star-twinkle"/>`;
  }).join('');
}

function sunRays(cx, cy, innerR, outerR, count=12) {
  const rays = [];
  for (let i=0; i<count; i++) {
    const a = (i/count)*Math.PI*2;
    const x1 = cx + Math.cos(a)*innerR*1.2, y1 = cy + Math.sin(a)*innerR*1.2;
    const x2 = cx + Math.cos(a)*outerR,     y2 = cy + Math.sin(a)*outerR;
    rays.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#ffd54f" stroke-width="2.5" opacity=".6"/>`);
  }
  return rays.join('');
}

function flowers(w, h) {
  const positions = [[.5,.7],[.6,.75],[.35,.72],[.72,.7],[.25,.78]];
  const colors    = ['#ff80ab','#ff4081','#ffcc00','#b39ddb','#80cbc4'];
  return positions.map(([px,py],i) => {
    const x=w*px, y=h*py, r=w*.025;
    const petals = Array.from({length:6},(_,j)=>{
      const a=(j/6)*Math.PI*2, ex=x+Math.cos(a)*r*1.6, ey=y+Math.sin(a)*r*1.6;
      return `<ellipse cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" rx="${(r*.9).toFixed(1)}" ry="${(r*.55).toFixed(1)}" fill="${colors[i]}" transform="rotate(${(j/6*360).toFixed(0)},${ex.toFixed(1)},${ey.toFixed(1)})"/>`;
    }).join('');
    return petals + `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#fff176"/>`;
  }).join('');
}

function rainbow(x, y, w, h) {
  const colors = ['#f44336','#ff9800','#ffeb3b','#4caf50','#2196f3','#9c27b0'];
  return colors.map((c,i) => {
    const rw = w*(1-i*.12), cx = x + w/2, cy = y + h;
    return `<path d="M${cx-rw},${cy} Q${cx},${cy-h*(1-i*.12)} ${cx+rw},${cy}" stroke="${c}" stroke-width="5" fill="none" opacity=".75"/>`;
  }).join('');
}

function rainbowArc(cx, cy, r) {
  const colors = ['#f44336','#ff9800','#ffeb3b','#4caf50','#2196f3','#9c27b0'];
  return colors.map((c,i) => {
    const ri = r - i*10;
    return `<path d="M${cx-ri},${cy} Q${cx},${cy-ri} ${cx+ri},${cy}" stroke="${c}" stroke-width="7" fill="none" opacity=".6"/>`;
  }).join('');
}

function starPoints(cx, cy, size) {
  const pts = [];
  for (let i=0;i<10;i++) {
    const a=(i/10)*Math.PI*2-Math.PI/2;
    const r = i%2===0 ? size : size*.4;
    pts.push(`${(cx+Math.cos(a)*r).toFixed(1)},${(cy+Math.sin(a)*r).toFixed(1)}`);
  }
  return pts.join(' ');
}

function snowflake(cx, cy, r, seed) {
  const arms = 6;
  const lines = [];
  for (let i=0;i<arms;i++) {
    const a=(i/arms)*Math.PI*2;
    const ex=cx+Math.cos(a)*r, ey=cy+Math.sin(a)*r;
    lines.push(`<line x1="${cx.toFixed(1)}" y1="${cy.toFixed(1)}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="#fff" stroke-width="1.5" opacity=".7"/>`);
  }
  return lines.join('') + `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="2" fill="#fff" opacity=".8"/>`;
}

function girlsSilhouette(w, h, color, opacity) {
  return `
    <g opacity="${opacity}" fill="${color}">
      <!-- Rylee silhouette -->
      <circle cx="${w*.38}" cy="${h*.72}" r="${w*.06}"/>
      <path d="M${w*.32},${h*.8} Q${w*.38},${h*.95} ${w*.44},${h*.8}Z"/>
      <!-- Brielle silhouette (slightly smaller) -->
      <circle cx="${w*.58}" cy="${h*.74}" r="${w*.05}"/>
      <path d="M${w*.53},${h*.81} Q${w*.58},${h*.95} ${w*.63},${h*.81}Z"/>
    </g>`;
}

/* ── Card art thumbnails per scene ───────────────── */
const CARD_GRADIENTS = {
  stars:        ['#0d0b4a','#1a1a8e','#4a2a8a'],
  bedroom:      ['#0d0b30','#1e1e6e','#3a2a80'],
  garden:       ['#7ecef4','#5cb85c','#2d7d2d'],
  kitchen:      ['#ffe082','#ff9800','#fff9c4'],
  'living-room':['#fff3e0','#ffcc80','#ff9800'],
  forest:       ['#0d2200','#1a5c1a','#2d8b2d'],
  dream:        ['#2d0050','#5c0a8f','#8b00c0'],
  beach:        ['#4fc3f7','#ffe082','#ffd54f'],
  snow:         ['#b3e5fc','#e0f7fa','#fff'],
  bath:         ['#b3e5fc','#81d4fa','#4fc3f7'],
};

function cardThumbSVG(scene, chars) {
  const g = CARD_GRADIENTS[scene] || CARD_GRADIENTS.stars;
  const id = `g${Math.random().toString(36).slice(2,6)}`;
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${g[0]}"/>
        <stop offset="55%" stop-color="${g[1]}"/>
        <stop offset="100%" stop-color="${g[2]}"/>
      </linearGradient>
    </defs>
    <rect width="120" height="120" fill="url(#${id})"/>
    ${thumbScene(scene)}
    ${thumbChars(chars)}
  </svg>`;
}

function thumbScene(scene) {
  switch(scene) {
    case 'stars': case 'dream':
      return Array.from({length:15},()=>`<circle cx="${(Math.random()*120).toFixed(0)}" cy="${(Math.random()*70).toFixed(0)}" r="${(.5+Math.random()*2).toFixed(1)}" fill="#fff" opacity="${(.4+Math.random()*.6).toFixed(2)}"/>`).join('')
        + `<circle cx="90" cy="18" r="14" fill="#fff7c2" opacity=".9"/><circle cx="96" cy="14" r="12" fill="${scene==='dream'?'#2d0050':'#1a2a8e'}"/>`;
    case 'bedroom':
      return `<rect x="20" y="58" width="80" height="40" rx="8" fill="#9b59b6"/><rect x="26" y="62" width="28" height="14" rx="4" fill="#f8c8e0"/><rect x="66" y="62" width="28" height="14" rx="4" fill="#d4a0f0"/><rect x="20" y="56" width="80" height="8" rx="4" fill="#7d3c98"/>`;
    case 'garden': case 'forest':
      return `<ellipse cx="60" cy="80" rx="60" ry="20" fill="${scene==='forest'?'#1a3d00':'#5cb85c'}"/>` + (scene==='garden' ? `<circle cx="95" cy="16" r="12" fill="#ffd54f"/>` : `<polygon points="60,30 40,70 80,70" fill="#2e7d32"/><polygon points="60,18 42,52 78,52" fill="#388e3c"/>`);
    case 'kitchen':
      return `<rect x="0" y="55" width="120" height="65" fill="#fff8e1"/><rect x="0" y="55" width="120" height="5" fill="#ffd54f"/><ellipse cx="42" cy="62" rx="16" ry="7" fill="#ffe082"/><ellipse cx="78" cy="62" rx="16" ry="7" fill="#ffccbc"/>`;
    case 'living-room':
      return `<rect x="8" y="56" width="104" height="40" rx="10" fill="#7c4dff"/><rect x="8" y="54" width="104" height="9" rx="8" fill="#651fff"/><rect x="14" y="58" width="30" height="26" rx="6" fill="#e040fb"/><rect x="76" y="58" width="30" height="26" rx="6" fill="#40c4ff"/>`;
    case 'beach':
      return `<rect x="0" y="50" width="120" height="70" fill="#ffd54f"/><path d="M0,48 Q30,42 60,48 Q90,54 120,48 L120,55 L0,55Z" fill="#29b6f6"/><circle cx="96" cy="16" r="14" fill="#ffd54f"/>`;
    case 'snow':
      return `<rect x="0" y="56" width="120" height="64" fill="#e0f7fa"/><ellipse cx="60" cy="56" rx="70" ry="16" fill="#e1f5fe"/>`
        + Array.from({length:8},()=>`<circle cx="${(Math.random()*120).toFixed(0)}" cy="${(Math.random()*50).toFixed(0)}" r="${(1+Math.random()*3).toFixed(1)}" fill="#fff" opacity=".8"/>`).join('');
    case 'bath':
      return `<path d="M10,56 Q10,100 16,102 L104,102 Q110,100 110,56Z" fill="#fff" opacity=".9"/><ellipse cx="60" cy="78" rx="44" ry="18" fill="#b3e5fc" opacity=".7"/>`;
    default:
      return '';
  }
}

function thumbChars(chars) {
  if (!chars || !chars.length) return '';
  const total = chars.length;
  return chars.slice(0,3).map((c,i) => {
    const x = total===1 ? 60 : 35 + i*(total===2?50:25);
    const sc = total===1 ? .55 : total===2 ? .5 : .42;
    return charArt(c, x, 118, sc);
  }).join('');
}

/* ── State ────────────────────────────────────────── */
let currentFilter = 'all';
let currentStory  = null;
let currentPage   = 0;
let readStories   = new Set(JSON.parse(localStorage.getItem('readStories') || '[]'));

/* ── Home Screen ──────────────────────────────────── */
function getFilteredStories() {
  if (currentFilter === 'all') return STORIES;
  return STORIES.filter(s => s.chars.includes(currentFilter));
}

function renderHome() {
  const filtered = getFilteredStories();
  document.getElementById('story-count-label').textContent = `${filtered.length} stories`;

  const grid = document.getElementById('story-grid');
  grid.innerHTML = '';

  filtered.forEach((story, idx) => {
    const card = document.createElement('div');
    card.className = 'story-card';
    card.style.setProperty('--card-i', idx);

    const isRead = readStories.has(story.id);
    card.innerHTML = `
      <div class="card-art">${cardThumbSVG(story.scene, story.chars)}</div>
      <div class="card-body">
        ${isRead ? '<span class="read-badge">⭐</span>' : ''}
        <div class="card-title">${story.title}</div>
        <div class="card-chars">
          ${story.chars.map(c => `<span class="char-dot" style="background:${CHARS[c]?.color||'#ccc'}" title="${CHARS[c]?.label||c}"></span>`).join('')}
        </div>
      </div>`;

    card.addEventListener('click', () => openStory(story));
    grid.appendChild(card);
  });
}

function renderStars() {
  const container = document.getElementById('home-stars');
  if (!container) return;
  for (let i=0; i<60; i++) {
    const s = document.createElement('div');
    s.className = 'star-dot';
    const size = .5 + Math.random()*3;
    s.style.cssText = `
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      width:${size}px; height:${size}px;
      --dur:${2+Math.random()*3}s;
      --delay:${Math.random()*4}s;
    `;
    container.appendChild(s);
  }
}

/* ── Reader ───────────────────────────────────────── */
function openStory(story) {
  currentStory = story;
  currentPage  = 0;
  const reader = document.getElementById('reader');
  reader.classList.remove('hidden', 'closing');
  reader.classList.add('opening');
  renderPage(false);
  renderDots();
  document.getElementById('home-screen').style.display = 'none';
}

function closeReader() {
  const reader = document.getElementById('reader');
  reader.classList.add('closing');
  reader.classList.remove('opening');
  setTimeout(() => {
    reader.classList.add('hidden');
    reader.classList.remove('closing');
    document.getElementById('home-screen').style.display = '';
    renderHome();
  }, 220);
}

function renderPage(animate, direction='right') {
  if (!currentStory) return;
  const pageEl = document.getElementById('page');
  const pg = currentStory.pages[currentPage];

  const animClass = direction === 'right' ? 'slide-in-right' : 'slide-in-left';

  const scene = pg.scene || currentStory.scene || 'stars';
  const w = 400, h = 490;

  const charsOnPage = pg.chars || currentStory.chars || [];
  const charSVGs = charsOnPage.map((c, i) => {
    const total = charsOnPage.length;
    const x = total === 1 ? w*.5 : total === 2 ? [w*.3, w*.7][i] : [w*.22, w*.5, w*.78][i] || w*.5;
    const sc = total <= 2 ? .8 : .65;
    return charArt(c, x, h*.62, sc);
  }).join('');

  pageEl.className = `page scene-${scene} ${animate ? animClass : ''}`;
  pageEl.innerHTML = `
    <div class="scene-art">
      ${sceneArt(scene, w, h)}
    </div>
    <svg class="scene-art" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="z-index:2; pointer-events:none;">
      ${charSVGs}
    </svg>
    <div class="story-panel" style="height:${pg.text.length > 100 ? '46%' : '40%'}">
      <div class="story-chapter">${currentStory.title}</div>
      <div class="story-text">${pg.text}</div>
    </div>`;

  if (animate) {
    pageEl.addEventListener('animationend', () => pageEl.classList.remove(animClass), {once:true});
  }

  document.getElementById('prev-btn').disabled = currentPage === 0;
  document.getElementById('next-btn').disabled = currentPage === currentStory.pages.length - 1;

  if (currentPage === currentStory.pages.length - 1) {
    readStories.add(currentStory.id);
    localStorage.setItem('readStories', JSON.stringify([...readStories]));
  }
}

function renderDots() {
  const dots = document.getElementById('dots');
  dots.innerHTML = '';
  currentStory.pages.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === currentPage ? ' active' : '');
    d.addEventListener('click', () => goToPage(i));
    dots.appendChild(d);
  });
}

function goToPage(n) {
  if (!currentStory || n < 0 || n >= currentStory.pages.length || n === currentPage) return;
  const dir = n > currentPage ? 'right' : 'left';
  currentPage = n;
  renderPage(true, dir);
  renderDots();
}

function nextPage() { goToPage(currentPage + 1); }
function prevPage() { goToPage(currentPage - 1); }

/* ── Keyboard ─────────────────────────────────────── */
document.addEventListener('keydown', e => {
  const readerOpen = !document.getElementById('reader').classList.contains('hidden');
  if (!readerOpen) return;
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextPage(); }
  if (e.key === 'ArrowLeft')  { e.preventDefault(); prevPage(); }
  if (e.key === 'Escape')     closeReader();
});

/* ── Touch/Swipe ──────────────────────────────────── */
let touchStartX = 0;
const book = document.getElementById('book');
book.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, {passive:true});
book.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) { dx < 0 ? nextPage() : prevPage(); }
});

/* ── Nav buttons ──────────────────────────────────── */
document.getElementById('next-btn').addEventListener('click', nextPage);
document.getElementById('prev-btn').addEventListener('click', prevPage);
document.getElementById('reader-back').addEventListener('click', closeReader);

/* ── Filter buttons ───────────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.char;
    renderHome();
  });
});

/* ── Random button ────────────────────────────────── */
document.getElementById('random-btn').addEventListener('click', () => {
  const pool = getFilteredStories();
  openStory(pool[Math.floor(Math.random() * pool.length)]);
});

/* ── Init ─────────────────────────────────────────── */
renderStars();
renderHome();
