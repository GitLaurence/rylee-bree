/* ─────────────────────────────────────────────────────
   Rylee & Bree — Bedtime Stories  |  app.js
───────────────────────────────────────────────────── */

const CHARS = {
  rylee:      { label: 'Rylee',    color: '#8B44F0' },
  brielle:    { label: 'Bree',     color: '#FF3E9D' },
  'mary-joy': { label: 'Mary Joy', color: '#FF6B35' },
  astley:     { label: 'Astley',   color: '#00B4D8' },
};

/* ── Pixar Character Art ──────────────────────────── */
/* All characters: feet anchored at (0,0) in local coords.
   Head center ≈ y=-155, r=33. Total height ≈ 200 units. */

function charArt(char, cx, cy, sc, uid) {
  const id = uid || (char.replace('-','') + Math.random().toString(36).slice(2,5));
  switch (char) {
    case 'rylee':     return ryleeArt(cx, cy, sc||1, id);
    case 'brielle':   return brielleArt(cx, cy, sc||1, id);
    case 'mary-joy':  return maryJoyArt(cx, cy, sc||1, id);
    case 'astley':    return astleyArt(cx, cy, sc||1, id);
    default: return '';
  }
}

function ryleeArt(cx, cy, sc, id) {
  return `
<defs>
  <radialGradient id="${id}sk" cx="45%" cy="35%" r="60%">
    <stop offset="0%" stop-color="#FFE0CC"/><stop offset="100%" stop-color="#E8A882"/>
  </radialGradient>
  <radialGradient id="${id}fc" cx="48%" cy="38%" r="56%">
    <stop offset="0%" stop-color="#FFEADC"/><stop offset="100%" stop-color="#F0B090"/>
  </radialGradient>
  <linearGradient id="${id}dr" x1="0" y1="0" x2="0.2" y2="1">
    <stop offset="0%" stop-color="#B078FF"/><stop offset="100%" stop-color="#5A10CC"/>
  </linearGradient>
  <linearGradient id="${id}hr" x1="0" y1="0" x2="0.15" y2="1">
    <stop offset="0%" stop-color="#5A3200"/><stop offset="60%" stop-color="#2E1600"/><stop offset="100%" stop-color="#1A0A00"/>
  </linearGradient>
  <radialGradient id="${id}ir" cx="38%" cy="30%" r="62%">
    <stop offset="0%" stop-color="#B088F0"/><stop offset="55%" stop-color="#7040C0"/><stop offset="100%" stop-color="#3010A0"/>
  </radialGradient>
</defs>
<g transform="translate(${cx},${cy}) scale(${sc})">
  <ellipse cx="0" cy="4" rx="34" ry="7" fill="#000" opacity=".16"/>
  <!-- Legs (tapered) -->
  <path d="M-14,-72 Q-15,-32 -13,0 L-3,0 Q-2,-32 -2,-72Z" fill="url(#${id}sk)"/>
  <path d="M 2,-72  Q 2,-32  3,0  L 13,0  Q 15,-32 14,-72Z" fill="url(#${id}sk)"/>
  <!-- Shoes (rounded) -->
  <path d="M-19,-3 Q-19,-9 -9,-9 Q1,-9 2,-3 Q1,2 -9,2 Q-18,2 -19,-3Z" fill="#7030D0"/>
  <path d="M 19,-3 Q 19,-9  9,-9 Q-1,-9 -2,-3 Q-1,2  9,2 Q 18,2 19,-3Z" fill="#7030D0"/>
  <path d="M-19,-3 Q-19,-9 -9,-9 Q1,-9 2,-3" fill="none" stroke="#A060FF" stroke-width="1.6" opacity=".5"/>
  <path d="M 19,-3 Q 19,-9  9,-9 Q-1,-9 -2,-3" fill="none" stroke="#A060FF" stroke-width="1.6" opacity=".5"/>
  <!-- Neck bridge (chin to collar, removes seam) -->
  <path d="M-9,-127 Q0,-122 9,-127 L9,-110 Q0,-106 -9,-110 Z" fill="url(#${id}sk)"/>
  <!-- A-line dress -->
  <path d="M-17,-117 C-24,-90 -33,-34 -38,1 L 38,1 C 33,-34 24,-90 17,-117
           C 10,-121 -10,-121 -17,-117 Z" fill="url(#${id}dr)"/>
  <!-- Fabric fold highlight + shadow -->
  <path d="M-12,-110 C-19,-80 -28,-30 -32,0" stroke="#fff" stroke-width="2.2" fill="none" opacity=".16" stroke-linecap="round"/>
  <path d="M 14,-108 C 20,-78  27,-28  31,0" stroke="#3A0A80" stroke-width="2.4" fill="none" opacity=".16" stroke-linecap="round"/>
  <!-- Hem ribbon -->
  <path d="M-36,-6 Q0,2 36,-6" stroke="#FFD700" stroke-width="2.4" fill="none" opacity=".4" stroke-linecap="round"/>
  <!-- Sparkles on dress -->
  <circle cx="-12" cy="-58" r="2.2" fill="#FFD700" opacity=".75"/>
  <circle cx="9"   cy="-38" r="1.6" fill="#FFD700" opacity=".65"/>
  <circle cx="16"  cy="-72" r="1.9" fill="#FFD700" opacity=".7"/>
  <!-- Shoulder puffs -->
  <ellipse cx="-19" cy="-112" rx="10" ry="12" fill="url(#${id}dr)"/>
  <ellipse cx=" 19" cy="-112" rx="10" ry="12" fill="url(#${id}dr)"/>
  <ellipse cx="-19" cy="-116" rx="6.5" ry="6" fill="#fff" opacity=".18"/>
  <ellipse cx=" 19" cy="-116" rx="6.5" ry="6" fill="#fff" opacity=".18"/>
  <!-- Arms -->
  <path d="M-21,-109 Q-39,-94 -38,-72" stroke="url(#${id}sk)" stroke-width="12" fill="none" stroke-linecap="round"/>
  <path d="M 21,-109 Q  39,-94  38,-72" stroke="url(#${id}sk)" stroke-width="12" fill="none" stroke-linecap="round"/>
  <circle cx="-38" cy="-70" r="8" fill="#F8C8A8"/>
  <circle cx=" 38" cy="-70" r="8" fill="#F8C8A8"/>
  <circle cx="-40" cy="-72" r="3" fill="#fff" opacity=".3"/>
  <circle cx=" 36" cy="-72" r="3" fill="#fff" opacity=".3"/>
  <!-- Hair back -->
  <ellipse cx="0" cy="-156" rx="34" ry="34" fill="url(#${id}hr)"/>
  <ellipse cx="-30" cy="-149" rx="10" ry="22" fill="#2E1600"/>
  <ellipse cx=" 30" cy="-149" rx="10" ry="22" fill="#2E1600"/>
  <!-- Head -->
  <circle cx="0" cy="-156" r="33" fill="url(#${id}fc)"/>
  <ellipse cx="-4" cy="-171" rx="13" ry="9" fill="#fff" opacity=".17"/>
  <ellipse cx="0" cy="-130" rx="13" ry="5" fill="#C88060" opacity=".22"/>
  <!-- Hair front -->
  <path d="M-32,-156 Q-26,-183 0,-187 Q26,-183 32,-156" fill="#3A1E00"/>
  <ellipse cx="0" cy="-183" rx="26" ry="10" fill="#3A1E00"/>
  <path d="M-33,-149 Q-38,-135 -32,-123" stroke="#2E1600" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M 33,-149 Q  38,-135  32,-123" stroke="#2E1600" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M-6,-185 Q4,-193 14,-181" stroke="#7B4A00" stroke-width="3" fill="none" stroke-linecap="round" opacity=".5"/>
  <!-- Ponytail -->
  <path d="M24,-173 Q38,-189 32,-203 Q26,-215 20,-201 Q26,-187 20,-173" fill="#3A1E00"/>
  <circle cx="24" cy="-173" r="5" fill="#FF3E9D"/>
  <circle cx="24" cy="-173" r="3" fill="#FF80C0"/>
  <!-- Left eye -->
  <ellipse cx="-11" cy="-157" rx="11" ry="10" fill="#C07050" opacity=".18"/>
  <ellipse cx="-11" cy="-158"  rx="9.5" ry="9" fill="white"/>
  <path d="M-20.5,-158 Q-11,-168 -1.5,-158" fill="#2A1800" opacity=".88"/>
  <circle cx="-11" cy="-157" r="6.5" fill="url(#${id}ir)"/>
  <circle cx="-11" cy="-157" r="6.5" fill="none" stroke="#C090FF" stroke-width="1" opacity=".4"/>
  <circle cx="-11" cy="-157" r="3.2" fill="#080015"/>
  <circle cx="-8.5" cy="-160" r="2.2" fill="white"/>
  <circle cx="-13.5" cy="-154" r="1"   fill="white" opacity=".6"/>
  <path d="M-20.5,-158 Q-11,-150 -1.5,-158" fill="none" stroke="#C08060" stroke-width=".8" opacity=".4"/>
  <!-- Right eye -->
  <ellipse cx="11" cy="-157" rx="11" ry="10" fill="#C07050" opacity=".18"/>
  <ellipse cx="11" cy="-158"  rx="9.5" ry="9" fill="white"/>
  <path d="M1.5,-158 Q11,-168 20.5,-158" fill="#2A1800" opacity=".88"/>
  <circle cx="11" cy="-157" r="6.5" fill="url(#${id}ir)"/>
  <circle cx="11" cy="-157" r="6.5" fill="none" stroke="#C090FF" stroke-width="1" opacity=".4"/>
  <circle cx="11" cy="-157" r="3.2" fill="#080015"/>
  <circle cx="13.5" cy="-160" r="2.2" fill="white"/>
  <circle cx=" 8.5" cy="-154" r="1"   fill="white" opacity=".6"/>
  <path d="M1.5,-158 Q11,-150 20.5,-158" fill="none" stroke="#C08060" stroke-width=".8" opacity=".4"/>
  <!-- Eyebrows -->
  <path d="M-21,-169 Q-11,-174 -2,-169" stroke="#2A1800" stroke-width="2.8" fill="none" stroke-linecap="round"/>
  <path d="M 2,-169 Q  11,-174 21,-169" stroke="#2A1800" stroke-width="2.8" fill="none" stroke-linecap="round"/>
  <!-- Nose -->
  <path d="M-3,-141 Q0,-137 3,-141" stroke="#C88060" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <!-- Cheeks -->
  <ellipse cx="-21" cy="-147" rx="7.5" ry="4.5" fill="#FF8080" opacity=".3"/>
  <ellipse cx=" 21" cy="-147" rx="7.5" ry="4.5" fill="#FF8080" opacity=".3"/>
  <!-- Mouth – big confident smile -->
  <path d="M-9,-131 Q0,-122 9,-131" stroke="#C05040" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <path d="M-9,-131 Q0,-122 9,-131 Q5,-127 0,-125 Q-5,-127 -9,-131Z" fill="#E07060" opacity=".55"/>
</g>`;
}

function brielleArt(cx, cy, sc, id) {
  return `
<defs>
  <radialGradient id="${id}sk" cx="45%" cy="35%" r="60%">
    <stop offset="0%" stop-color="#FFE5C8"/><stop offset="100%" stop-color="#F0B888"/>
  </radialGradient>
  <radialGradient id="${id}fc" cx="48%" cy="38%" r="56%">
    <stop offset="0%" stop-color="#FFEDD8"/><stop offset="100%" stop-color="#F5C09A"/>
  </radialGradient>
  <linearGradient id="${id}dr" x1="0.15" y1="0" x2="0.5" y2="1">
    <stop offset="0%" stop-color="#FF9DD0"/><stop offset="45%" stop-color="#FF5DAA"/><stop offset="100%" stop-color="#C2006E"/>
  </linearGradient>
  <linearGradient id="${id}hr" x1="0" y1="0" x2="0.15" y2="1">
    <stop offset="0%" stop-color="#7A4500"/><stop offset="60%" stop-color="#4A2800"/><stop offset="100%" stop-color="#2A1400"/>
  </linearGradient>
  <radialGradient id="${id}ir" cx="38%" cy="30%" r="62%">
    <stop offset="0%" stop-color="#F090C0"/><stop offset="55%" stop-color="#C04080"/><stop offset="100%" stop-color="#800040"/>
  </radialGradient>
</defs>
<g transform="translate(${cx},${cy}) scale(${sc * 0.88})">
  <ellipse cx="0" cy="4" rx="26" ry="6" fill="#000" opacity=".15"/>
  <!-- Legs (path-based, tapered) -->
  <path d="M-12,-60 Q-13,-28 -11,0 L-3,0 Q-2,-28 -2,-60Z" fill="url(#${id}sk)"/>
  <path d="M 2,-60  Q 2,-28  3,0  L 11,0  Q 13,-28 12,-60Z" fill="url(#${id}sk)"/>
  <!-- Shoes (path-based, rounded) -->
  <path d="M-15,-3 Q-15,-8 -7,-8 Q1,-8 2,-3 Q1,1 -7,1 Q-14,1 -15,-3Z" fill="#E0007A"/>
  <path d="M 15,-3 Q 15,-8  7,-8 Q-1,-8 -2,-3 Q-1,1  7,1 Q 14,1 15,-3Z" fill="#E0007A"/>
  <path d="M-15,-3 Q-15,-8 -7,-8 Q1,-8 2,-3" fill="none" stroke="#FF80C8" stroke-width="1.4" opacity=".5"/>
  <path d="M 15,-3 Q 15,-8  7,-8 Q-1,-8 -2,-3" fill="none" stroke="#FF80C8" stroke-width="1.4" opacity=".5"/>
  <!-- Neck bridges chin to collar -->
  <path d="M-7,-113 Q0,-109 7,-113 L7,-96 Q0,-93 -7,-96 Z" fill="url(#${id}sk)"/>
  <!-- A-line ruffled dress -->
  <path d="M-14,-99 C-18,-74 -23,-28 -21,3 L 21,3 C 23,-28 18,-74 14,-99
           C 8,-103 -8,-103 -14,-99 Z" fill="url(#${id}dr)"/>
  <!-- Ruffle hem -->
  <path d="M-21,-1 Q-13,7 -5,-1 Q3,7 11,-1 Q19,7 21,-1" stroke="#FFC0E0" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  <!-- Fabric fold + heart -->
  <path d="M-10,-90 C-14,-64 -17,-28 -16,-2" stroke="#fff" stroke-width="2" fill="none" opacity=".18" stroke-linecap="round"/>
  <path d="M-4,-46 Q0,-52 4,-46 Q6,-42 0,-38 Q-6,-42 -4,-46Z" fill="#fff" opacity=".28"/>
  <!-- Shoulder puffs -->
  <ellipse cx="-15" cy="-94" rx="8" ry="9.5" fill="url(#${id}dr)"/>
  <ellipse cx=" 15" cy="-94" rx="8" ry="9.5" fill="url(#${id}dr)"/>
  <ellipse cx="-15" cy="-97" rx="5.5" ry="5" fill="#fff" opacity=".18"/>
  <ellipse cx=" 15" cy="-97" rx="5.5" ry="5" fill="#fff" opacity=".18"/>
  <!-- Arms -->
  <path d="M-17,-91 Q-29,-81 -28,-64" stroke="url(#${id}sk)" stroke-width="11" fill="none" stroke-linecap="round"/>
  <path d="M 17,-91 Q  29,-81  28,-64" stroke="url(#${id}sk)" stroke-width="11" fill="none" stroke-linecap="round"/>
  <circle cx="-28" cy="-62" r="7" fill="#F5C898"/>
  <circle cx=" 28" cy="-62" r="7" fill="#F5C898"/>
  <!-- Hair back -->
  <ellipse cx="0" cy="-140" rx="32" ry="30" fill="url(#${id}hr)"/>
  <ellipse cx="-28" cy="-132" rx="10" ry="20" fill="#4A2800"/>
  <ellipse cx=" 28" cy="-132" rx="10" ry="20" fill="#4A2800"/>
  <!-- Head -->
  <circle cx="0" cy="-140" r="31" fill="url(#${id}fc)"/>
  <ellipse cx="-4" cy="-153" rx="12" ry="8" fill="#fff" opacity=".18"/>
  <ellipse cx="0" cy="-114" rx="13" ry="5" fill="#C88060" opacity=".2"/>
  <!-- Hair front -->
  <path d="M-30,-140 Q-24,-166 0,-170 Q24,-166 30,-140" fill="#5A3400"/>
  <ellipse cx="0" cy="-166" rx="24" ry="10" fill="#5A3400"/>
  <path d="M-8,-167 Q0,-174 10,-163" stroke="#8B5500" stroke-width="3" fill="none" stroke-linecap="round" opacity=".5"/>
  <!-- Pigtails -->
  <path d="M-28,-158 Q-42,-168 -36,-182 Q-30,-190 -26,-178 Q-30,-166 -24,-158" fill="#4A2800"/>
  <circle cx="-28" cy="-158" r="5" fill="#FF3E9D"/>
  <path d="M 28,-158 Q  42,-168  36,-182 Q  30,-190  26,-178 Q  30,-166  24,-158" fill="#4A2800"/>
  <circle cx=" 28" cy="-158" r="5" fill="#FF3E9D"/>
  <!-- Left eye (bigger – she's curious, wide-eyed) -->
  <ellipse cx="-11" cy="-141" rx="11.5" ry="11" fill="#C07050" opacity=".18"/>
  <ellipse cx="-11" cy="-142" rx="10" ry="9.5" fill="white"/>
  <path d="M-21,-142 Q-11,-153 -1,-142" fill="#2A1800" opacity=".88"/>
  <circle cx="-11" cy="-141" r="7" fill="url(#${id}ir)"/>
  <circle cx="-11" cy="-141" r="3.5" fill="#06000F"/>
  <circle cx="-8.5" cy="-144" r="2.4" fill="white"/>
  <circle cx="-13.5" cy="-138" r="1.1" fill="white" opacity=".55"/>
  <!-- Right eye -->
  <ellipse cx="11" cy="-141" rx="11.5" ry="11" fill="#C07050" opacity=".18"/>
  <ellipse cx="11" cy="-142" rx="10" ry="9.5" fill="white"/>
  <path d="M1,-142 Q11,-153 21,-142" fill="#2A1800" opacity=".88"/>
  <circle cx="11" cy="-141" r="7" fill="url(#${id}ir)"/>
  <circle cx="11" cy="-141" r="3.5" fill="#06000F"/>
  <circle cx="13.5" cy="-144" r="2.4" fill="white"/>
  <circle cx=" 8.5" cy="-138" r="1.1" fill="white" opacity=".55"/>
  <!-- Eyebrows (high – curious expression) -->
  <path d="M-20,-155 Q-11,-160 -2,-156" stroke="#2A1800" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M 2,-156 Q  11,-160  20,-155" stroke="#2A1800" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <!-- Nose -->
  <path d="M-2.5,-127 Q0,-123 2.5,-127" stroke="#C08860" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <!-- Cheeks -->
  <ellipse cx="-20" cy="-132" rx="7" ry="4.5" fill="#FF9090" opacity=".32"/>
  <ellipse cx=" 20" cy="-132" rx="7" ry="4.5" fill="#FF9090" opacity=".32"/>
  <!-- Mouth – sweet little smile -->
  <path d="M-7,-117 Q0,-110 7,-117" stroke="#C05040" stroke-width="2.3" fill="none" stroke-linecap="round"/>
  <path d="M-7,-117 Q0,-110 7,-117 Q4,-113 0,-111 Q-4,-113 -7,-117Z" fill="#E07060" opacity=".5"/>
</g>`;
}

function maryJoyArt(cx, cy, sc, id) {
  return `
<defs>
  <radialGradient id="${id}sk" cx="45%" cy="35%" r="60%">
    <stop offset="0%" stop-color="#FDD8B8"/><stop offset="100%" stop-color="#E09870"/>
  </radialGradient>
  <radialGradient id="${id}fc" cx="48%" cy="38%" r="56%">
    <stop offset="0%" stop-color="#FEE2C2"/><stop offset="100%" stop-color="#EAA878"/>
  </radialGradient>
  <linearGradient id="${id}dr" x1="0.15" y1="0" x2="0.5" y2="1">
    <stop offset="0%" stop-color="#FFAA76"/><stop offset="45%" stop-color="#FF7430"/><stop offset="100%" stop-color="#C03800"/>
  </linearGradient>
  <linearGradient id="${id}hr" x1="0" y1="0" x2="0.12" y2="1">
    <stop offset="0%" stop-color="#2E1600"/><stop offset="60%" stop-color="#180A00"/><stop offset="100%" stop-color="#0A0400"/>
  </linearGradient>
  <radialGradient id="${id}ir" cx="38%" cy="30%" r="62%">
    <stop offset="0%" stop-color="#C08840"/><stop offset="55%" stop-color="#7B4A1A"/><stop offset="100%" stop-color="#3A1800"/>
  </radialGradient>
</defs>
<g transform="translate(${cx},${cy}) scale(${sc})">
  <ellipse cx="0" cy="4" rx="32" ry="7" fill="#000" opacity=".16"/>
  <!-- Legs (path-based) -->
  <path d="M-13,-80 Q-14,-36 -12,0 L-3,0 Q-2,-36 -2,-80Z" fill="url(#${id}sk)"/>
  <path d="M 2,-80  Q 2,-36  3,0  L 12,0  Q 14,-36 13,-80Z" fill="url(#${id}sk)"/>
  <!-- Shoes (path-based) -->
  <path d="M-18,-3 Q-18,-8 -9,-8 Q1,-8 2,-3 Q1,1 -9,1 Q-17,1 -18,-3Z" fill="#C04010"/>
  <path d="M 18,-3 Q 18,-8  9,-8 Q-1,-8 -2,-3 Q-1,1  9,1 Q 17,1 18,-3Z" fill="#C04010"/>
  <path d="M-18,-3 Q-18,-8 -9,-8 Q1,-8 2,-3" fill="none" stroke="#FF6030" stroke-width="1.6" opacity=".5"/>
  <path d="M 18,-3 Q 18,-8  9,-8 Q-1,-8 -2,-3" fill="none" stroke="#FF6030" stroke-width="1.6" opacity=".5"/>
  <!-- Neck bridges chin to collar -->
  <path d="M-9,-137 Q0,-132 9,-137 L9,-119 Q0,-116 -9,-119 Z" fill="url(#${id}sk)"/>
  <!-- A-line dress -->
  <path d="M-16,-119 C-24,-90 -34,-30 -27,4 L 27,4 C 34,-30 24,-90 16,-119
           C 10,-123 -10,-123 -16,-119 Z" fill="url(#${id}dr)"/>
  <!-- Floral detail -->
  <circle cx="7"  cy="-50" r="5"  fill="#FFD54F" opacity=".55"/>
  <circle cx="-9" cy="-66" r="4"  fill="#FFD54F" opacity=".5"/>
  <circle cx="13" cy="-78" r="3.5" fill="#FFD54F" opacity=".45"/>
  <!-- Soft curved sash belt -->
  <path d="M-22,-99 Q0,-104 22,-99 L22,-94 Q0,-99 -22,-94 Z" fill="#9A2800" opacity=".4"/>
  <path d="M-22,-99 Q0,-104 22,-99" stroke="#FFB070" stroke-width="1.2" fill="none" opacity=".35"/>
  <!-- Fabric fold highlight -->
  <path d="M-11,-110 C-17,-78 -24,-30 -19,2" stroke="#fff" stroke-width="2.4" fill="none" opacity=".15" stroke-linecap="round"/>
  <!-- Shoulder anchors -->
  <ellipse cx="-17" cy="-117" rx="9.5" ry="11.5" fill="url(#${id}dr)"/>
  <ellipse cx=" 17" cy="-117" rx="9.5" ry="11.5" fill="url(#${id}dr)"/>
  <ellipse cx="-17" cy="-121" rx="6" ry="5.5" fill="#fff" opacity=".15"/>
  <ellipse cx=" 17" cy="-121" rx="6" ry="5.5" fill="#fff" opacity=".15"/>
  <!-- Arms -->
  <path d="M-21,-114 Q-38,-101 -36,-80" stroke="url(#${id}sk)" stroke-width="13" fill="none" stroke-linecap="round"/>
  <path d="M 21,-114 Q  38,-101  36,-80" stroke="url(#${id}sk)" stroke-width="13" fill="none" stroke-linecap="round"/>
  <circle cx="-36" cy="-78" r="9" fill="#EDB898"/>
  <circle cx=" 36" cy="-78" r="9" fill="#EDB898"/>
  <!-- Hair back + long waves -->
  <ellipse cx="0" cy="-168" rx="36" ry="36" fill="url(#${id}hr)"/>
  <path d="M-36,-158 Q-44,-120 -34,-90" stroke="#180A00" stroke-width="14" fill="none" stroke-linecap="round"/>
  <path d="M 36,-158 Q  44,-120  34,-90" stroke="#180A00" stroke-width="14" fill="none" stroke-linecap="round"/>
  <!-- Head -->
  <circle cx="0" cy="-168" r="35" fill="url(#${id}fc)"/>
  <ellipse cx="-4" cy="-183" rx="14" ry="9" fill="#fff" opacity=".17"/>
  <ellipse cx="0" cy="-135" rx="15" ry="5" fill="#C88060" opacity=".2"/>
  <!-- Hair front -->
  <path d="M-34,-168 Q-28,-196 0,-200 Q28,-196 34,-168" fill="#200E00"/>
  <ellipse cx="0" cy="-196" rx="28" ry="10" fill="#200E00"/>
  <!-- Hair highlight -->
  <path d="M-4,-198 Q6,-206 16,-194" stroke="#4A2800" stroke-width="3" fill="none" stroke-linecap="round" opacity=".5"/>
  <!-- Flower clip -->
  <circle cx="28" cy="-182" r="7" fill="#FF6B35"/>
  <circle cx="28" cy="-182" r="4" fill="#FFD700"/>
  <circle cx="28" cy="-182" r="2" fill="#FF8040"/>
  <!-- Earrings -->
  <circle cx="-37" cy="-162" r="4.5" fill="#FFD700"/>
  <circle cx=" 37" cy="-162" r="4.5" fill="#FFD700"/>
  <!-- Left eye (warm, caring) -->
  <ellipse cx="-12" cy="-168" rx="12" ry="11" fill="#C07840" opacity=".2"/>
  <ellipse cx="-12" cy="-169"  rx="10.5" ry="9.5" fill="white"/>
  <path d="M-22.5,-169 Q-12,-180 -1.5,-169" fill="#1E0E00" opacity=".88"/>
  <circle cx="-12" cy="-168" r="7" fill="url(#${id}ir)"/>
  <circle cx="-12" cy="-168" r="3.5" fill="#0A0500"/>
  <circle cx="-9.5" cy="-171" r="2.4" fill="white"/>
  <circle cx="-14.5" cy="-165" r="1.1" fill="white" opacity=".55"/>
  <path d="M-22.5,-169 Q-12,-160 -1.5,-169" fill="none" stroke="#C08840" stroke-width=".9" opacity=".4"/>
  <!-- Right eye -->
  <ellipse cx="12" cy="-168" rx="12" ry="11" fill="#C07840" opacity=".2"/>
  <ellipse cx="12" cy="-169"  rx="10.5" ry="9.5" fill="white"/>
  <path d="M1.5,-169 Q12,-180 22.5,-169" fill="#1E0E00" opacity=".88"/>
  <circle cx="12" cy="-168" r="7" fill="url(#${id}ir)"/>
  <circle cx="12" cy="-168" r="3.5" fill="#0A0500"/>
  <circle cx="14.5" cy="-171" r="2.4" fill="white"/>
  <circle cx=" 9.5" cy="-165" r="1.1" fill="white" opacity=".55"/>
  <path d="M1.5,-169 Q12,-160 22.5,-169" fill="none" stroke="#C08840" stroke-width=".9" opacity=".4"/>
  <!-- Eyebrows (gentle arch) -->
  <path d="M-23,-181 Q-12,-186 -1,-181" stroke="#1E0E00" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M 1,-181 Q  12,-186  23,-181" stroke="#1E0E00" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- Nose -->
  <path d="M-3,-152 Q0,-147 3,-152" stroke="#C08850" stroke-width="2" fill="none" stroke-linecap="round"/>
  <!-- Cheeks -->
  <ellipse cx="-22" cy="-158" rx="8" ry="5" fill="#FF9070" opacity=".28"/>
  <ellipse cx=" 22" cy="-158" rx="8" ry="5" fill="#FF9070" opacity=".28"/>
  <!-- Mouth – warm full smile -->
  <path d="M-10,-141 Q0,-132 10,-141" stroke="#B04030" stroke-width="2.8" fill="none" stroke-linecap="round"/>
  <path d="M-10,-141 Q0,-132 10,-141 Q6,-137 0,-135 Q-6,-137 -10,-141Z" fill="#D86050" opacity=".6"/>
</g>`;
}

function astleyArt(cx, cy, sc, id) {
  return `
<defs>
  <radialGradient id="${id}sk" cx="45%" cy="35%" r="60%">
    <stop offset="0%" stop-color="#FFE0C0"/><stop offset="100%" stop-color="#EAAA78"/>
  </radialGradient>
  <radialGradient id="${id}fc" cx="48%" cy="38%" r="56%">
    <stop offset="0%" stop-color="#FFECD8"/><stop offset="100%" stop-color="#F2B888"/>
  </radialGradient>
  <linearGradient id="${id}sh" x1="0.15" y1="0" x2="0.5" y2="1">
    <stop offset="0%" stop-color="#5BDCFA"/><stop offset="45%" stop-color="#1AB8E0"/><stop offset="100%" stop-color="#007898"/>
  </linearGradient>
  <linearGradient id="${id}hr" x1="0" y1="0" x2="0.15" y2="1">
    <stop offset="0%" stop-color="#3E2200"/><stop offset="60%" stop-color="#201000"/><stop offset="100%" stop-color="#100800"/>
  </linearGradient>
  <radialGradient id="${id}ir" cx="38%" cy="30%" r="62%">
    <stop offset="0%" stop-color="#60A8F0"/><stop offset="55%" stop-color="#2060B0"/><stop offset="100%" stop-color="#0A2880"/>
  </radialGradient>
</defs>
<g transform="translate(${cx},${cy}) scale(${sc})">
  <ellipse cx="0" cy="4" rx="30" ry="7" fill="#000" opacity=".16"/>
  <!-- Legs -->
  <path d="M-13,-72 Q-14,-32 -12,0 L-3,0 Q-2,-32 -2,-72Z" fill="url(#${id}sk)"/>
  <path d="M 2,-72  Q 2,-32  3,0  L 12,0  Q 14,-32 13,-72Z" fill="url(#${id}sk)"/>
  <!-- Sneakers (path-based) -->
  <path d="M-17,-3 Q-17,-8 -8,-8 Q1,-8 2,-3 Q1,1 -8,1 Q-16,1 -17,-3Z" fill="#00B4D8"/>
  <path d="M 17,-3 Q 17,-8  8,-8 Q-1,-8 -2,-3 Q-1,1  8,1 Q 16,1 17,-3Z" fill="#00B4D8"/>
  <path d="M-17,-3 Q-17,-8 -8,-8 Q1,-8 2,-3" fill="none" stroke="#fff" stroke-width="1.6" opacity=".4"/>
  <path d="M 17,-3 Q 17,-8  8,-8 Q-1,-8 -2,-3" fill="none" stroke="#fff" stroke-width="1.6" opacity=".4"/>
  <!-- Shorts -->
  <path d="M-19,-80 Q-19,-86 -13,-86 L13,-86 Q19,-86 19,-80 L19,-60 Q19,-56 14,-56
           L 4,-56 Q 0,-60  0,-64  Q 0,-60 -4,-56 L-14,-56 Q-19,-56 -19,-60 Z" fill="#006090"/>
  <path d="M-19,-80 Q-19,-86 -13,-86 L13,-86 Q19,-86 19,-80" fill="none" stroke="#40C0E8" stroke-width="1.6" opacity=".4"/>
  <!-- Neck bridges chin to collar -->
  <path d="M-8,-126 Q0,-122 8,-126 L8,-111 Q0,-108 -8,-111 Z" fill="url(#${id}sk)"/>
  <!-- T-shirt -->
  <path d="M-17,-114 C-21,-101 -23,-89 -19,-78 L 19,-78 C 23,-89 21,-101 17,-114
           C 10,-118 -10,-118 -17,-114 Z" fill="url(#${id}sh)"/>
  <!-- Shirt stripe + fold highlight -->
  <path d="M-18,-98 Q0,-94 18,-98" stroke="#BFF3FF" stroke-width="3.4" fill="none" opacity=".4"/>
  <path d="M-11,-110 C-14,-100 -15,-90 -12,-80" stroke="#fff" stroke-width="2" fill="none" opacity=".18" stroke-linecap="round"/>
  <!-- Shoulder anchors -->
  <ellipse cx="-17" cy="-110" rx="8.5" ry="10" fill="url(#${id}sh)"/>
  <ellipse cx=" 17" cy="-110" rx="8.5" ry="10" fill="url(#${id}sh)"/>
  <ellipse cx="-17" cy="-113" rx="5.5" ry="5" fill="#fff" opacity=".22"/>
  <ellipse cx=" 17" cy="-113" rx="5.5" ry="5" fill="#fff" opacity=".22"/>
  <!-- Arms -->
  <path d="M-19,-107 Q-34,-95 -33,-76" stroke="url(#${id}sk)" stroke-width="13" fill="none" stroke-linecap="round"/>
  <path d="M 19,-107 Q  34,-95  33,-76" stroke="url(#${id}sk)" stroke-width="13" fill="none" stroke-linecap="round"/>
  <circle cx="-33" cy="-74" r="8" fill="#EEC898"/>
  <circle cx=" 33" cy="-74" r="8" fill="#EEC898"/>
  <!-- Hair back (short, boy-cut) -->
  <ellipse cx="0" cy="-155" rx="34" ry="30" fill="url(#${id}hr)"/>
  <!-- Head -->
  <circle cx="0" cy="-155" r="33" fill="url(#${id}fc)"/>
  <ellipse cx="-4" cy="-170" rx="13" ry="8" fill="#fff" opacity=".17"/>
  <ellipse cx="0" cy="-124" rx="14" ry="5" fill="#C88060" opacity=".2"/>
  <!-- Hair front (textured short hair) -->
  <path d="M-32,-155 Q-26,-180 0,-183 Q26,-180 32,-155" fill="#2E1800"/>
  <ellipse cx="0" cy="-179" rx="25" ry="8" fill="#2E1800"/>
  <!-- Side swept part -->
  <path d="M-28,-165 Q-12,-178 8,-166" stroke="#1A0C00" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>
  <path d="M-14,-178 Q0,-186 14,-178" stroke="#4A2C00" stroke-width="3" fill="none" stroke-linecap="round" opacity=".4"/>
  <!-- Left eye -->
  <ellipse cx="-11" cy="-156" rx="11" ry="10" fill="#C07840" opacity=".18"/>
  <ellipse cx="-11" cy="-157"  rx="9.5" ry="9" fill="white"/>
  <path d="M-20.5,-157 Q-11,-167 -1.5,-157" fill="#1A0E00" opacity=".88"/>
  <circle cx="-11" cy="-156" r="6.5" fill="url(#${id}ir)"/>
  <circle cx="-11" cy="-156" r="3.2" fill="#030A1A"/>
  <circle cx="-8.5" cy="-159" r="2.2" fill="white"/>
  <circle cx="-13.5" cy="-153" r="1"   fill="white" opacity=".55"/>
  <!-- Right eye -->
  <ellipse cx="11" cy="-156" rx="11" ry="10" fill="#C07840" opacity=".18"/>
  <ellipse cx="11" cy="-157"  rx="9.5" ry="9" fill="white"/>
  <path d="M1.5,-157 Q11,-167 20.5,-157" fill="#1A0E00" opacity=".88"/>
  <circle cx="11" cy="-156" r="6.5" fill="url(#${id}ir)"/>
  <circle cx="11" cy="-156" r="3.2" fill="#030A1A"/>
  <circle cx="13.5" cy="-159" r="2.2" fill="white"/>
  <circle cx=" 8.5" cy="-153" r="1"   fill="white" opacity=".55"/>
  <!-- Eyebrows (relaxed/friendly) -->
  <path d="M-20,-167 Q-11,-171 -2,-168" stroke="#1A0E00" stroke-width="2.8" fill="none" stroke-linecap="round"/>
  <path d="M 2,-168 Q  11,-171  20,-167" stroke="#1A0E00" stroke-width="2.8" fill="none" stroke-linecap="round"/>
  <!-- Nose -->
  <path d="M-3,-140 Q0,-136 3,-140" stroke="#C08850" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <!-- Cheeks -->
  <ellipse cx="-20" cy="-146" rx="7" ry="4" fill="#FF9060" opacity=".25"/>
  <ellipse cx=" 20" cy="-146" rx="7" ry="4" fill="#FF9060" opacity=".25"/>
  <!-- Mouth – wide friendly grin -->
  <path d="M-10,-130 Q0,-120 10,-130" stroke="#B04030" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <path d="M-10,-130 Q0,-120 10,-130 Q6,-126 0,-124 Q-6,-126 -10,-130Z" fill="#D86050" opacity=".55"/>
  <!-- Teeth hint -->
  <path d="M-7,-130 Q0,-124 7,-130" fill="white" opacity=".35"/>
</g>`;
}

/* ── Scene SVG Art ────────────────────────────────── */
function sceneArt(scene, w, h) {
  const s = w, t = h;
  switch (scene) {

    case 'stars': return `
<svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="stNeb" cx="55%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#2a3a9e" stop-opacity=".5"/>
      <stop offset="100%" stop-color="#080f30" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="stMoon" cx="38%" cy="32%" r="60%">
      <stop offset="0%" stop-color="#fffde0"/><stop offset="100%" stop-color="#f0d060"/>
    </radialGradient>
    <radialGradient id="stGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff" stop-opacity=".25"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- Nebula clouds -->
  <ellipse cx="${s*.55}" cy="${t*.35}" rx="${s*.38}" ry="${t*.22}" fill="url(#stNeb)"/>
  <ellipse cx="${s*.2}"  cy="${t*.5}"  rx="${s*.28}" ry="${t*.18}" fill="url(#stNeb)" opacity=".6"/>
  <!-- Stars (varied sizes) -->
  ${Array.from({length:55},(_,i)=>{
    const sx=(Math.random()*s).toFixed(1), sy=(Math.random()*t*.7).toFixed(1);
    const r=(.5+Math.random()*3).toFixed(1), op=(.3+Math.random()*.7).toFixed(2);
    const cls = i%5===0 ? ' class="star-twinkle"' : i%3===0 ? ' class="star-twinkle" style="animation-delay:'+(.5+Math.random()*2).toFixed(1)+'s"' : '';
    return `<circle cx="${sx}" cy="${sy}" r="${r}" fill="#fff" opacity="${op}"${cls}/>`;
  }).join('')}
  <!-- Comet streak -->
  <path d="M${s*.1},${t*.12} Q${s*.25},${t*.08} ${s*.38},${t*.15}" stroke="rgba(255,255,220,.6)" stroke-width="2" fill="none" stroke-linecap="round"/>
  <circle cx="${s*.1}" cy="${t*.12}" r="3" fill="#fffde0" opacity=".9"/>
  <!-- Moon -->
  <circle cx="${s*.75}" cy="${t*.16}" r="${s*.13}" fill="url(#stMoon)"/>
  <circle cx="${s*.81}" cy="${t*.12}" r="${s*.11}" fill="#080f30"/>
  <!-- Moon glow -->
  <circle cx="${s*.75}" cy="${t*.16}" r="${s*.2}" fill="url(#stGlow)"/>
  <!-- Big star cross sparkle -->
  <line x1="${s*.22}" y1="${t*.2}" x2="${s*.22}" y2="${t*.28}" stroke="#fff" stroke-width="1.5" opacity=".6"/>
  <line x1="${s*.18}" y1="${t*.24}" x2="${s*.26}" y2="${t*.24}" stroke="#fff" stroke-width="1.5" opacity=".6"/>
  <!-- Girls silhouette -->
  <g opacity=".22" fill="#fff">
    <circle cx="${s*.38}" cy="${t*.76}" r="${s*.06}"/>
    <path d="M${s*.32},${t*.83} Q${s*.38},${t*.96} ${s*.44},${t*.83}Z"/>
    <circle cx="${s*.56}" cy="${t*.78}" r="${s*.05}"/>
    <path d="M${s*.51},${t*.84} Q${s*.56},${t*.96} ${s*.61},${t*.84}Z"/>
  </g>
</svg>`;

    case 'bedroom': return `
<svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bdLamp" cx="85%" cy="35%" r="55%">
      <stop offset="0%" stop-color="#FFE090" stop-opacity=".55"/>
      <stop offset="100%" stop-color="#FFB000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bdMoon" cx="38%" cy="32%" r="60%">
      <stop offset="0%" stop-color="#fffde0"/><stop offset="100%" stop-color="#f0d060"/>
    </radialGradient>
  </defs>
  <!-- Night-sky wall + warm wood floor -->
  <rect width="${s}" height="${t}" fill="#14102a"/>
  <rect x="0" y="${t*.78}" width="${s}" height="${t*.22}" fill="#2d1a0e"/>
  <rect x="0" y="${t*.78}" width="${s}" height="${t*.025}" fill="#4a2c14"/>
  <!-- Lamp glow on wall -->
  <ellipse cx="${s*.85}" cy="${t*.3}" rx="${s*.5}" ry="${t*.35}" fill="url(#bdLamp)"/>
  <!-- Window -->
  <rect x="${s*.3}" y="${t*.06}" width="${s*.4}" height="${t*.3}" rx="5" fill="#0a1540" stroke="#4a6fa5" stroke-width="2.5"/>
  <line x1="${s*.5}"  y1="${t*.06}" x2="${s*.5}"  y2="${t*.36}" stroke="#4a6fa5" stroke-width="1.5"/>
  <line x1="${s*.3}"  y1="${t*.21}" x2="${s*.7}"  y2="${t*.21}" stroke="#4a6fa5" stroke-width="1.5"/>
  <!-- Moon through window -->
  <circle cx="${s*.58}" cy="${t*.16}" r="${s*.08}" fill="url(#bdMoon)" opacity=".9"/>
  <circle cx="${s*.62}" cy="${t*.13}" r="${s*.07}" fill="#0a1540"/>
  <!-- Stars through window -->
  ${Array.from({length:8},()=>`<circle cx="${(s*(.32+Math.random()*.36)).toFixed(1)}" cy="${(t*(.07+Math.random()*.28)).toFixed(1)}" r="${(.5+Math.random()*1.5).toFixed(1)}" fill="#fff" opacity="${(.3+Math.random()*.7).toFixed(2)}" class="star-twinkle"/>`).join('')}
  <!-- Curtains -->
  <path d="M${s*.3},${t*.06} Q${s*.2},${t*.22} ${s*.3},${t*.36}" fill="#5c3d8f" opacity=".8"/>
  <path d="M${s*.7},${t*.06} Q${s*.8},${t*.22} ${s*.7},${t*.36}" fill="#5c3d8f" opacity=".8"/>
  <!-- Bookshelf -->
  <rect x="${s*.04}" y="${t*.38}" width="${s*.18}" height="${t*.22}" fill="#6d4c41" rx="2"/>
  ${Array.from({length:5},(_,i)=>`<rect x="${s*(.05+i*.034)}" y="${t*.39}" width="${s*.028}" height="${t*.2}" rx="1" fill="${['#e53935','#1565c0','#2e7d32','#f57f17','#6a1b9a'][i]}"/>`).join('')}
  <!-- Bed -->
  <rect x="${s*.06}" y="${t*.58}" width="${s*.88}" height="${t*.3}" rx="10" fill="#9b59b6"/>
  <rect x="${s*.06}" y="${t*.56}" width="${s*.88}" height="${t*.08}" rx="5" fill="#7d3c98"/>
  <!-- Fluffy blanket with gradient -->
  <rect x="${s*.06}" y="${t*.65}" width="${s*.88}" height="${t*.22}" rx="0 0 10 10" fill="#e8b4f8"/>
  <path d="M${s*.06},${t*.65} Q${s*.28},${t*.7} ${s*.5},${t*.65} Q${s*.72},${t*.6} ${s*.94},${t*.65}" stroke="#d488f5" stroke-width="2.5" fill="none"/>
  <!-- Pillows -->
  <rect x="${s*.1}" y="${t*.57}" width="${s*.3}" height="${t*.12}" rx="6" fill="#f8c8e0"/>
  <ellipse cx="${s*.25}" cy="${t*.6}" rx="${s*.1}" ry="${t*.03}" fill="#fff" opacity=".25"/>
  <rect x="${s*.6}" y="${t*.57}" width="${s*.3}" height="${t*.12}" rx="6" fill="#d4a0f0"/>
  <ellipse cx="${s*.75}" cy="${t*.6}" rx="${s*.1}" ry="${t*.03}" fill="#fff" opacity=".25"/>
  <!-- Stuffed bear on pillow -->
  <circle cx="${s*.26}" cy="${t*.6}" r="${s*.05}" fill="#DEB887"/>
  <circle cx="${s*.26}" cy="${t*.53}" r="${s*.04}" fill="#DEB887"/>
  <circle cx="${s*.22}" cy="${t*.5}" r="${s*.02}" fill="#D2691E"/>
  <circle cx="${s*.3}"  cy="${t*.5}" r="${s*.02}" fill="#D2691E"/>
  <circle cx="${s*.22}" cy="${t*.55}" r="2" fill="#333"/>
  <circle cx="${s*.3}"  cy="${t*.55}" r="2" fill="#333"/>
  <path d="M${s*.23},${t*.58} Q${s*.26},${t*.6} ${s*.29},${t*.58}" stroke="#8B4513" stroke-width="1.5" fill="none"/>
  <!-- Star wallpaper dots -->
  ${Array.from({length:8},(_,i)=>`<circle cx="${s*(.05+i*.13)}" cy="${t*.52}" r="2.5" fill="#fff" opacity="${.15+i*.03}"/>`).join('')}
  <!-- Lamp stand -->
  <rect x="${s*.82}" y="${t*.32}" width="${s*.04}" height="${t*.26}" fill="#a1887f"/>
  <polygon points="${s*.76},${t*.32} ${s*.94},${t*.32} ${s*.9},${t*.16} ${s*.8},${t*.16}" fill="#ffe082"/>
  <circle cx="${s*.85}" cy="${t*.32}" r="${s*.025}" fill="#fff9c4"/>
</svg>`;

    case 'garden': return `
<svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gdSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#87CEEB"/><stop offset="100%" stop-color="#B0E0FF"/>
    </linearGradient>
    <radialGradient id="gdSun" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF176"/><stop offset="100%" stop-color="#FFD600"/>
    </radialGradient>
  </defs>
  <!-- Sky gradient fill -->
  <rect width="${s}" height="${t*.52}" fill="url(#gdSky)"/>
  <!-- Clouds -->
  <ellipse cx="${s*.18}" cy="${t*.14}" rx="${s*.14}" ry="${t*.07}" fill="white" opacity=".9"/>
  <ellipse cx="${s*.28}" cy="${t*.12}" rx="${s*.1}"  ry="${t*.06}" fill="white" opacity=".9"/>
  <ellipse cx="${s*.22}" cy="${t*.1}"  rx="${s*.08}" ry="${t*.05}" fill="white" opacity=".95"/>
  <ellipse cx="${s*.72}" cy="${t*.17}" rx="${s*.12}" ry="${t*.06}" fill="white" opacity=".85"/>
  <ellipse cx="${s*.8}"  cy="${t*.15}" rx="${s*.09}" ry="${t*.05}" fill="white" opacity=".85"/>
  <!-- Sun -->
  <circle cx="${s*.88}" cy="${t*.11}" r="${s*.09}" fill="url(#gdSun)"/>
  ${sunRays(s*.88, t*.11, s*.09, s*.17)}
  <!-- Sunbeams (Pixar god rays) -->
  <path d="M${s*.88},${t*.11} L${s*.55},${t*.5}" stroke="rgba(255,240,100,.12)" stroke-width="22" fill="none"/>
  <path d="M${s*.88},${t*.11} L${s*.75},${t*.5}" stroke="rgba(255,240,100,.1)"  stroke-width="16" fill="none"/>
  <path d="M${s*.88},${t*.11} L${s*.92},${t*.5}" stroke="rgba(255,240,100,.08)" stroke-width="14" fill="none"/>
  <!-- Far grass (lighter) -->
  <rect x="0" y="${t*.48}" width="${s}" height="${t*.1}" fill="#90C060" opacity=".7"/>
  <!-- Mid trees -->
  <rect x="${s*.06}" y="${t*.3}" width="${s*.07}" height="${t*.25}" fill="#6d4c41"/>
  <circle cx="${s*.1}"  cy="${t*.24}" r="${s*.12}" fill="#4CAF50"/>
  <circle cx="${s*.06}" cy="${t*.29}" r="${s*.09}" fill="#388E3C"/>
  <rect x="${s*.82}" y="${t*.32}" width="${s*.06}" height="${t*.22}" fill="#6d4c41"/>
  <circle cx="${s*.85}" cy="${t*.27}" r="${s*.1}"  fill="#43A047"/>
  <!-- Near grass -->
  <rect x="0" y="${t*.52}" width="${s}" height="${t*.48}" fill="#5CB85C"/>
  <ellipse cx="${s*.5}"  cy="${t*.52}" rx="${s*.7}" ry="${t*.06}" fill="#3d8b3d"/>
  <!-- Flowers (Pixar bright) -->
  ${flowers(s, t)}
  <!-- Butterfly -->
  <ellipse cx="${s*.58}" cy="${t*.42}" rx="${s*.05}" ry="${t*.03}" fill="#FF80AB" opacity=".9" transform="rotate(-18,${s*.58},${t*.42})"/>
  <ellipse cx="${s*.66}" cy="${t*.42}" rx="${s*.05}" ry="${t*.03}" fill="#FF80AB" opacity=".9" transform="rotate(18,${s*.66},${t*.42})"/>
  <ellipse cx="${s*.58}" cy="${t*.44}" rx="${s*.03}" ry="${t*.02}" fill="#E040FB" opacity=".7" transform="rotate(-18,${s*.58},${t*.44})"/>
  <ellipse cx="${s*.66}" cy="${t*.44}" rx="${s*.03}" ry="${t*.02}" fill="#E040FB" opacity=".7" transform="rotate(18,${s*.66},${t*.44})"/>
  <line x1="${s*.62}" y1="${t*.41}" x2="${s*.62}" y2="${t*.46}" stroke="#555" stroke-width="1.5"/>
  <!-- Bee -->
  <ellipse cx="${s*.42}" cy="${t*.38}" rx="${s*.025}" ry="${s*.016}" fill="#FFD600"/>
  <line x1="${s*.4}" y1="${t*.38}" x2="${s*.44}" y2="${t*.38}" stroke="#333" stroke-width="1.5"/>
  <ellipse cx="${s*.42}" cy="${t*.376}" rx="${s*.018}" ry="${s*.014}" fill="white" opacity=".6" transform="rotate(-30,${s*.42},${t*.376})"/>
</svg>`;

    case 'kitchen': return `
<svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ktWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFF9C4"/><stop offset="100%" stop-color="#FFECB3"/>
    </linearGradient>
  </defs>
  <rect width="${s}" height="${t*.5}" fill="url(#ktWall)"/>
  <!-- Window -->
  <rect x="${s*.28}" y="${t*.04}" width="${s*.44}" height="${t*.3}" rx="5" fill="#B3E5FC" stroke="#90CAF9" stroke-width="2.5"/>
  <line x1="${s*.5}"  y1="${t*.04}" x2="${s*.5}"  y2="${t*.34}" stroke="#90CAF9" stroke-width="1.5"/>
  <line x1="${s*.28}" y1="${t*.19}" x2="${s*.72}" y2="${t*.19}" stroke="#90CAF9" stroke-width="1.5"/>
  <!-- Sunbeams through window -->
  <path d="M${s*.5},${t*.04} L${s*.25},${t*.5}" stroke="rgba(255,240,100,.18)" stroke-width="18" fill="none"/>
  <path d="M${s*.5},${t*.04} L${s*.5},${t*.5}"  stroke="rgba(255,240,100,.14)" stroke-width="14" fill="none"/>
  <path d="M${s*.5},${t*.04} L${s*.72},${t*.5}" stroke="rgba(255,240,100,.12)" stroke-width="12" fill="none"/>
  <!-- Countertop -->
  <rect x="0" y="${t*.5}" width="${s}" height="${t*.5}" fill="#FFF8E1"/>
  <rect x="0" y="${t*.5}" width="${s}" height="${t*.04}" fill="#FFD54F"/>
  <!-- Cabinets -->
  <rect x="${s*.04}" y="${t*.52}" width="${s*.4}"  height="${t*.46}" fill="#FFF3E0" stroke="#FFCC80" stroke-width="1.5"/>
  <rect x="${s*.56}" y="${t*.52}" width="${s*.4}"  height="${t*.46}" fill="#FFF3E0" stroke="#FFCC80" stroke-width="1.5"/>
  <circle cx="${s*.14}" cy="${t*.75}" r="3" fill="#FFB300"/>
  <circle cx="${s*.84}" cy="${t*.75}" r="3" fill="#FFB300"/>
  <!-- Bowls -->
  <ellipse cx="${s*.33}" cy="${t*.57}" rx="${s*.12}" ry="${t*.05}" fill="#FFE082"/>
  <ellipse cx="${s*.33}" cy="${t*.55}" rx="${s*.1}"  ry="${t*.04}" fill="#FFF9C4"/>
  <ellipse cx="${s*.67}" cy="${t*.57}" rx="${s*.12}" ry="${t*.05}" fill="#FFCCBC"/>
  <ellipse cx="${s*.67}" cy="${t*.55}" rx="${s*.1}"  ry="${t*.04}" fill="#FFE0B2"/>
  <!-- Cereal in bowls -->
  ${Array.from({length:6},(_,i)=>`<circle cx="${(s*(.26+i*.013)).toFixed(1)}" cy="${(t*.55).toFixed(1)}" r="2.5" fill="#FF8F00" opacity=".7"/>`).join('')}
  ${Array.from({length:6},(_,i)=>`<circle cx="${(s*(.60+i*.013)).toFixed(1)}" cy="${(t*.55).toFixed(1)}" r="2.5" fill="#FF5722" opacity=".7"/>`).join('')}
  <!-- Steam wisps -->
  <path d="M${s*.33},${t*.52} Q${s*.31},${t*.46} ${s*.33},${t*.4}"  stroke="rgba(200,200,200,.5)" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M${s*.36},${t*.51} Q${s*.38},${t*.45} ${s*.36},${t*.39}" stroke="rgba(200,200,200,.4)" stroke-width="2" fill="none" stroke-linecap="round"/>
  <!-- Fridge magnets -->
  <circle cx="${s*.16}" cy="${t*.62}" r="5.5" fill="#EF5350"/>
  <circle cx="${s*.26}" cy="${t*.62}" r="5.5" fill="#42A5F5"/>
  <circle cx="${s*.21}" cy="${t*.7}"  r="5.5" fill="#FFCA28"/>
  <!-- Juice cups -->
  <rect x="${s*.74}" y="${t*.54}" width="${s*.08}" height="${t*.12}" rx="2" fill="#FF8A65" opacity=".9"/>
  <rect x="${s*.84}" y="${t*.54}" width="${s*.08}" height="${t*.12}" rx="2" fill="#AED581" opacity=".9"/>
  <ellipse cx="${s*.78}" cy="${t*.54}" rx="${s*.04}" ry="${t*.015}" fill="#FF5722" opacity=".5"/>
  <ellipse cx="${s*.88}" cy="${t*.54}" rx="${s*.04}" ry="${t*.015}" fill="#8BC34A" opacity=".5"/>
</svg>`;

    case 'living-room': return `
<svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="lrLamp" cx="88%" cy="32%" r="60%">
      <stop offset="0%" stop-color="#FFE090" stop-opacity=".5"/>
      <stop offset="100%" stop-color="#FFB000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="lrWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFF3E0"/><stop offset="100%" stop-color="#FFE0B2"/>
    </linearGradient>
  </defs>
  <rect width="${s}" height="${t}" fill="url(#lrWall)"/>
  <!-- Lamp glow -->
  <ellipse cx="${s*.88}" cy="${t*.28}" rx="${s*.45}" ry="${t*.38}" fill="url(#lrLamp)"/>
  <!-- Picture frames on wall -->
  <rect x="${s*.08}" y="${t*.06}" width="${s*.26}" height="${t*.22}" rx="3" fill="white" stroke="#FFCC80" stroke-width="2.5"/>
  ${rainbow(s*.1, t*.08, s*.22, t*.18)}
  <rect x="${s*.38}" y="${t*.06}" width="${s*.24}" height="${t*.22}" rx="3" fill="white" stroke="#FFCC80" stroke-width="2.5"/>
  <!-- Family photo in frame -->
  <rect x="${s*.4}" y="${t*.08}" width="${s*.2}" height="${t*.18}" rx="2" fill="#E8F4FD"/>
  <circle cx="${s*.5}" cy="${t*.14}" r="${s*.04}" fill="#FDBCB4"/>
  <ellipse cx="${s*.5}" cy="${t*.2}" rx="${s*.06}" ry="${s*.04}" fill="#FF6B35" opacity=".7"/>
  <rect x="${s*.68}" y="${t*.06}" width="${s*.24}" height="${t*.22}" rx="3" fill="white" stroke="#FFCC80" stroke-width="2.5"/>
  <rect x="${s*.7}" y="${t*.08}" width="${s*.2}" height="${t*.18}" rx="2" fill="#E8FCE8"/>
  <!-- Rug -->
  <ellipse cx="${s*.5}" cy="${t*.86}" rx="${s*.44}" ry="${t*.1}" fill="#EF9A9A" opacity=".55"/>
  <ellipse cx="${s*.5}" cy="${t*.86}" rx="${s*.36}" ry="${t*.07}" fill="none" stroke="#E57373" stroke-width="2" opacity=".4"/>
  <!-- Couch -->
  <rect x="${s*.04}" y="${t*.52}" width="${s*.92}" height="${t*.34}" rx="12" fill="#7C4DFF"/>
  <rect x="${s*.04}" y="${t*.5}"  width="${s*.92}" height="${t*.08}" rx="9"  fill="#651FFF"/>
  <!-- Couch highlight -->
  <path d="M${s*.06},${t*.52} Q${s*.5},${t*.48} ${s*.94},${t*.52}" stroke="rgba(255,255,255,.2)" stroke-width="2" fill="none"/>
  <!-- Cushions -->
  <rect x="${s*.1}"  y="${t*.54}" width="${s*.26}" height="${t*.22}" rx="7" fill="#E040FB"/>
  <ellipse cx="${s*.23}" cy="${t*.58}" rx="${s*.1}" ry="${t*.04}" fill="#fff" opacity=".2"/>
  <rect x="${s*.64}" y="${t*.54}" width="${s*.26}" height="${t*.22}" rx="7" fill="#40C4FF"/>
  <ellipse cx="${s*.77}" cy="${t*.58}" rx="${s*.1}" ry="${t*.04}" fill="#fff" opacity=".2"/>
  <!-- Lamp stand -->
  <rect x="${s*.83}" y="${t*.28}" width="${s*.04}" height="${t*.24}" fill="#A1887F"/>
  <polygon points="${s*.77},${t*.28} ${s*.95},${t*.28} ${s*.91},${t*.12} ${s*.81},${t*.12}" fill="#FFE082"/>
  <ellipse cx="${s*.86}" cy="${t*.28}" rx="${s*.04}" ry="${t*.02}" fill="#FFF9C4" opacity=".8"/>
  <!-- Crayon on floor -->
  <rect x="${s*.38}" y="${t*.88}" width="${s*.18}" height="${s*.04}" rx="2" fill="#2196F3" transform="rotate(-8,${s*.5},${t*.9})"/>
</svg>`;

    case 'forest': return `
<svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="frSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0d2200"/><stop offset="100%" stop-color="#1a5c1a"/>
    </linearGradient>
  </defs>
  <rect width="${s}" height="${t}" fill="url(#frSky)"/>
  <!-- God rays -->
  <path d="M${s*.5},0 L${s*.15},${t*.6}" stroke="rgba(200,255,150,.08)" stroke-width="40" fill="none"/>
  <path d="M${s*.5},0 L${s*.45},${t*.6}" stroke="rgba(200,255,150,.06)" stroke-width="30" fill="none"/>
  <path d="M${s*.5},0 L${s*.7},${t*.6}"  stroke="rgba(200,255,150,.06)" stroke-width="28" fill="none"/>
  <!-- Tree trunks -->
  ${[.08,.22,.64,.78].map(x=>`<rect x="${s*x}" y="${t*.22}" width="${s*.07}" height="${t*.58}" rx="3" fill="#5D4037"/>`).join('')}
  <!-- Tree crowns -->
  <circle cx="${s*.12}" cy="${t*.18}" r="${s*.14}" fill="#1B5E20"/>
  <circle cx="${s*.12}" cy="${t*.14}" r="${s*.11}" fill="#2E7D32"/>
  <circle cx="${s*.26}" cy="${t*.2}"  r="${s*.13}" fill="#388E3C"/>
  <circle cx="${s*.68}" cy="${t*.17}" r="${s*.14}" fill="#1B5E20"/>
  <circle cx="${s*.82}" cy="${t*.19}" r="${s*.13}" fill="#2E7D32"/>
  <!-- Moonlight patch -->
  <ellipse cx="${s*.5}" cy="${t*.45}" rx="${s*.25}" ry="${t*.2}" fill="rgba(200,255,180,.07)"/>
  <!-- Ground -->
  <ellipse cx="${s*.5}" cy="${t*.78}" rx="${s*.6}" ry="${t*.14}" fill="#0d2200"/>
  <rect x="0" y="${t*.78}" width="${s}" height="${t*.22}" fill="#0d2200"/>
  <!-- Fireflies -->
  ${Array.from({length:10},(_,i)=>`<circle cx="${(s*(.15+i*.07)).toFixed(1)}" cy="${(t*(.48+Math.sin(i)*.08)).toFixed(1)}" r="2.8" fill="#CCFF00" opacity="${(.4+i*.05).toFixed(2)}" class="star-twinkle" style="animation-delay:${(i*.3).toFixed(1)}s"/>`).join('')}
  <!-- Mushroom cluster -->
  <rect x="${s*.42}" y="${t*.72}" width="${s*.04}" height="${t*.09}" fill="#F5F5F5"/>
  <ellipse cx="${s*.44}" cy="${t*.72}" rx="${s*.07}" ry="${t*.04}" fill="#E53935"/>
  <circle cx="${s*.42}" cy="${t*.7}"  r="2.5" fill="#fff" opacity=".7"/>
  <circle cx="${s*.47}" cy="${t*.69}" r="2"   fill="#fff" opacity=".65"/>
  <!-- Owl eyes in tree hollow -->
  <ellipse cx="${s*.67}" cy="${t*.42}" rx="${s*.05}" ry="${t*.06}" fill="#2E1600" opacity=".8"/>
  <circle cx="${s*.65}" cy="${t*.42}" r="${s*.016}" fill="#FFD600" opacity=".9"/>
  <circle cx="${s*.69}" cy="${t*.42}" r="${s*.016}" fill="#FFD600" opacity=".9"/>
  <circle cx="${s*.65}" cy="${t*.42}" r="${s*.008}" fill="#000"/>
  <circle cx="${s*.69}" cy="${t*.42}" r="${s*.008}" fill="#000"/>
  <!-- Path -->
  <path d="M${s*.35},${t} Q${s*.45},${t*.82} ${s*.55},${t*.62} Q${s*.65},${t*.46} ${s*.6},${t*.36}" stroke="#3E2700" stroke-width="16" fill="none" opacity=".45"/>
</svg>`;

    case 'dream': return `
<svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="drBg" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#4a0a80"/><stop offset="100%" stop-color="#0a0020"/>
    </radialGradient>
    <radialGradient id="drMoon" cx="38%" cy="32%" r="60%">
      <stop offset="0%" stop-color="#fffde0"/><stop offset="100%" stop-color="#f0d060"/>
    </radialGradient>
    <radialGradient id="drGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff" stop-opacity=".3"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${s}" height="${t}" fill="url(#drBg)"/>
  ${Array.from({length:40},(_,i)=>`<circle cx="${(Math.random()*s).toFixed(1)}" cy="${(Math.random()*t*.6).toFixed(1)}" r="${(.5+Math.random()*2.5).toFixed(1)}" fill="#fff" opacity="${(.2+Math.random()*.8).toFixed(2)}" class="star-twinkle" style="animation-delay:${(Math.random()*4).toFixed(1)}s"/>`).join('')}
  <!-- Large glowing moon -->
  <circle cx="${s*.72}" cy="${t*.16}" r="${s*.16}" fill="url(#drMoon)"/>
  <circle cx="${s*.79}" cy="${t*.12}" r="${s*.14}" fill="#0a0020"/>
  <circle cx="${s*.72}" cy="${t*.16}" r="${s*.26}" fill="url(#drGlow)"/>
  <!-- Dream cloud islands -->
  <ellipse cx="${s*.2}"  cy="${t*.38}" rx="${s*.18}" ry="${t*.06}" fill="rgba(200,150,255,.35)"/>
  <ellipse cx="${s*.2}"  cy="${t*.36}" rx="${s*.14}" ry="${t*.04}" fill="rgba(220,180,255,.3)"/>
  <ellipse cx="${s*.75}" cy="${t*.32}" rx="${s*.16}" ry="${t*.05}" fill="rgba(180,130,255,.3)"/>
  <!-- Floating castle on cloud -->
  <rect x="${s*.3}" y="${t*.28}" width="${s*.4}" height="${t*.24}" rx="3" fill="#CE93D8" opacity=".9"/>
  <!-- Castle towers -->
  <rect x="${s*.32}" y="${t*.2}"  width="${s*.1}"  height="${t*.1}" fill="#BA68C8"/>
  <rect x="${s*.58}" y="${t*.2}"  width="${s*.1}"  height="${t*.1}" fill="#BA68C8"/>
  <polygon points="${s*.32},${t*.2} ${s*.37},${t*.14} ${s*.42},${t*.2}" fill="#F48FB1"/>
  <polygon points="${s*.58},${t*.2} ${s*.63},${t*.14} ${s*.68},${t*.2}" fill="#F48FB1"/>
  <!-- Castle door -->
  <rect x="${s*.44}" y="${t*.38}" width="${s*.12}" height="${t*.14}" rx="4" fill="#7B1FA2"/>
  <!-- Castle windows -->
  <circle cx="${s*.38}" cy="${t*.32}" r="${s*.025}" fill="#FFF9C4" opacity=".8"/>
  <circle cx="${s*.62}" cy="${t*.32}" r="${s*.025}" fill="#FFF9C4" opacity=".8"/>
  <!-- Rainbow arc -->
  ${rainbowArc(s*.5, t*.62, s*.36)}
  <!-- Shooting stars -->
  <path d="M${s*.1},${t*.08} L${s*.22},${t*.18}" stroke="#fffde0" stroke-width="2" opacity=".7" stroke-linecap="round"/>
  <circle cx="${s*.1}" cy="${t*.08}" r="3" fill="#fffde0" opacity=".9"/>
  <path d="M${s*.8},${t*.22} L${s*.92},${t*.3}" stroke="#fffde0" stroke-width="1.5" opacity=".6" stroke-linecap="round"/>
</svg>`;

    case 'beach': return `
<svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bcSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#29B6F6"/><stop offset="100%" stop-color="#81D4FA"/>
    </linearGradient>
    <radialGradient id="bcSun" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF176"/><stop offset="100%" stop-color="#FFD600"/>
    </radialGradient>
  </defs>
  <rect width="${s}" height="${t*.52}" fill="url(#bcSky)"/>
  <!-- Sun -->
  <circle cx="${s*.82}" cy="${t*.1}" r="${s*.1}" fill="url(#bcSun)"/>
  ${sunRays(s*.82, t*.1, s*.1, s*.18)}
  <!-- Clouds -->
  <ellipse cx="${s*.2}"  cy="${t*.14}" rx="${s*.12}" ry="${t*.05}" fill="white" opacity=".85"/>
  <ellipse cx="${s*.3}"  cy="${t*.12}" rx="${s*.08}" ry="${t*.04}" fill="white" opacity=".85"/>
  <ellipse cx="${s*.55}" cy="${t*.18}" rx="${s*.1}"  ry="${t*.05}" fill="white" opacity=".75"/>
  <!-- Layered waves -->
  <path d="M0,${t*.44} Q${s*.12},${t*.4} ${s*.25},${t*.44} Q${s*.38},${t*.48} ${s*.5},${t*.44} Q${s*.62},${t*.4} ${s*.75},${t*.44} Q${s*.88},${t*.48} ${s},${t*.44} L${s},${t*.52} L0,${t*.52}Z" fill="#29B6F6" opacity=".8"/>
  <path d="M0,${t*.46} Q${s*.15},${t*.42} ${s*.3},${t*.46} Q${s*.45},${t*.5} ${s*.6},${t*.46} Q${s*.75},${t*.42} ${s},${t*.46} L${s},${t*.55} L0,${t*.55}Z" fill="#0288D1" opacity=".7"/>
  <!-- Wave foam -->
  <path d="M${s*.04},${t*.52} Q${s*.12},${t*.5} ${s*.2},${t*.52}" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".7"/>
  <path d="M${s*.4},${t*.5} Q${s*.5},${t*.48} ${s*.6},${t*.5}" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" opacity=".6"/>
  <!-- Sand -->
  <rect x="0" y="${t*.52}" width="${s}" height="${t*.48}" fill="#FDD835"/>
  <ellipse cx="${s*.5}" cy="${t*.52}" rx="${s*.6}" ry="${t*.04}" fill="#F9A825" opacity=".5"/>
  <!-- Footprints -->
  ${Array.from({length:5},(_,i)=>`<ellipse cx="${(s*(.2+i*.06)).toFixed(1)}" cy="${(t*(.6+i*.03)).toFixed(1)}" rx="3" ry="4.5" fill="#F9A825" opacity=".45" transform="rotate(${i%2===0?'-10':'10'},${(s*(.2+i*.06)).toFixed(1)},${(t*(.6+i*.03)).toFixed(1)})"/>`).join('')}
  <!-- Seashells -->
  <ellipse cx="${s*.18}" cy="${t*.72}" rx="${s*.05}" ry="${s*.025}" fill="#FFCCBC" transform="rotate(-20,${s*.18},${t*.72})"/>
  <ellipse cx="${s*.7}"  cy="${t*.68}" rx="${s*.045}" ry="${s*.022}" fill="#FFE082" transform="rotate(15,${s*.7},${t*.68})"/>
  <!-- Palm tree -->
  <path d="M${s*.12},${t*.52} Q${s*.14},${t*.34} ${s*.16},${t*.22}" stroke="#5D4037" stroke-width="8" fill="none" stroke-linecap="round"/>
  <ellipse cx="${s*.1}"  cy="${t*.21}" rx="${s*.1}"  ry="${t*.05}" fill="#388E3C" transform="rotate(-30,${s*.1},${t*.21})"/>
  <ellipse cx="${s*.19}" cy="${t*.19}" rx="${s*.1}"  ry="${t*.05}" fill="#43A047" transform="rotate(20,${s*.19},${t*.19})"/>
  <ellipse cx="${s*.16}" cy="${t*.16}" rx="${s*.09}" ry="${t*.04}" fill="#2E7D32" transform="rotate(-5,${s*.16},${t*.16})"/>
  <!-- Sandcastle -->
  <rect x="${s*.6}" y="${t*.6}"  width="${s*.22}" height="${t*.16}" fill="#F9A825"/>
  <rect x="${s*.64}" y="${t*.54}" width="${s*.06}" height="${t*.08}" fill="#FFC107"/>
  <rect x="${s*.76}" y="${t*.54}" width="${s*.06}" height="${t*.08}" fill="#FFC107"/>
  <polygon points="${s*.64},${t*.54} ${s*.67},${t*.49} ${s*.7},${t*.54}" fill="#FFD54F"/>
  <polygon points="${s*.76},${t*.54} ${s*.79},${t*.49} ${s*.82},${t*.54}" fill="#FFD54F"/>
  <!-- Beach umbrella -->
  <line x1="${s*.46}" y1="${t*.42}" x2="${s*.48}" y2="${t*.82}" stroke="#795548" stroke-width="3"/>
  <!-- Dome canopy -->
  <path d="M${s*.34},${t*.54} Q${s*.34},${t*.36} ${s*.46},${t*.34} Q${s*.58},${t*.36} ${s*.58},${t*.54} Z" fill="#E53935" opacity=".92"/>
  <!-- Coloured stripe panels -->
  <path d="M${s*.46},${t*.34} Q${s*.49},${t*.36} ${s*.52},${t*.42} L${s*.46},${t*.54} Z" fill="#FFEB3B" opacity=".85"/>
  <path d="M${s*.46},${t*.34} Q${s*.43},${t*.36} ${s*.40},${t*.42} L${s*.46},${t*.54} Z" fill="#FFEB3B" opacity=".85"/>
  <!-- Scalloped canopy edge -->
  <path d="M${s*.34},${t*.54} Q${s*.37},${t*.57} ${s*.40},${t*.54} Q${s*.43},${t*.57} ${s*.46},${t*.54} Q${s*.49},${t*.57} ${s*.52},${t*.54} Q${s*.55},${t*.57} ${s*.58},${t*.54}" stroke="#C62828" stroke-width="2" fill="none" opacity=".9"/>
</svg>`;

    case 'snow': return `
<svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="snSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#B3E5FC"/><stop offset="100%" stop-color="#E1F5FE"/>
    </linearGradient>
    <radialGradient id="snCabin" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFE090" stop-opacity=".7"/>
      <stop offset="100%" stop-color="#FFB000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${s}" height="${t*.56}" fill="url(#snSky)"/>
  <!-- Snowflakes (varied) -->
  ${Array.from({length:22},(_,i)=>snowflake((Math.random()*s), (Math.random()*t*.5), 3+Math.random()*7, i)).join('')}
  <!-- Distant cabin with glow -->
  <ellipse cx="${s*.18}" cy="${t*.52}" rx="${s*.16}" ry="${t*.06}" fill="url(#snCabin)"/>
  <rect x="${s*.09}" y="${t*.42}" width="${s*.18}" height="${t*.12}" fill="#5D4037" opacity=".85"/>
  <polygon points="${s*.06},${t*.42} ${s*.18},${t*.32} ${s*.3},${t*.42}" fill="#4E342E" opacity=".85"/>
  <rect x="${s*.14}" y="${t*.46}" width="${s*.05}" height="${t*.08}" fill="#FFD600" opacity=".7"/>
  <rect x="${s*.21}" y="${t*.46}" width="${s*.04}" height="${t*.06}" fill="#FFD600" opacity=".7"/>
  <!-- Snow-laden pine trees -->
  <polygon points="${s*.72},${t*.28} ${s*.62},${t*.52} ${s*.82},${t*.52}" fill="#2E7D32"/>
  <polygon points="${s*.72},${t*.18} ${s*.63},${t*.38} ${s*.81},${t*.38}" fill="#388E3C"/>
  <polygon points="${s*.72},${t*.1} ${s*.65},${t*.26} ${s*.79},${t*.26}" fill="#43A047"/>
  <path d="M${s*.63},${t*.52} Q${s*.72},${t*.48} ${s*.81},${t*.52}" stroke="white" stroke-width="5" fill="none" opacity=".8"/>
  <path d="M${s*.64},${t*.38} Q${s*.72},${t*.34} ${s*.8},${t*.38}"  stroke="white" stroke-width="4" fill="none" opacity=".75"/>
  <rect x="${s*.7}" y="${t*.52}" width="${s*.04}" height="${t*.08}" fill="#5D4037"/>
  <!-- Snow ground -->
  <ellipse cx="${s*.5}" cy="${t*.56}" rx="${s*.65}" ry="${t*.1}" fill="#E1F5FE"/>
  <rect x="0" y="${t*.56}" width="${s}" height="${t*.44}" fill="#E0F7FA"/>
  <!-- Snowman -->
  <circle cx="${s*.5}" cy="${t*.73}" r="${s*.11}" fill="white" stroke="#B0BEC5" stroke-width="1.5"/>
  <circle cx="${s*.5}" cy="${t*.59}" r="${s*.08}" fill="white" stroke="#B0BEC5" stroke-width="1.5"/>
  <!-- Snowman face -->
  <circle cx="${s*.47}" cy="${t*.57}" r="2.5" fill="#37474F"/>
  <circle cx="${s*.53}" cy="${t*.57}" r="2.5" fill="#37474F"/>
  <circle cx="${s*.47}" cy="${t*.56}" r="1"   fill="white" opacity=".6"/>
  <circle cx="${s*.53}" cy="${t*.56}" r="1"   fill="white" opacity=".6"/>
  <polygon points="${s*.5},${t*.59} ${s*.52},${t*.62} ${s*.48},${t*.62}" fill="#FF8A65"/>
  <!-- Snowman body buttons -->
  <circle cx="${s*.5}" cy="${t*.66}" r="2.2" fill="#37474F"/>
  <circle cx="${s*.5}" cy="${t*.71}" r="2.2" fill="#37474F"/>
  <!-- Scarf -->
  <path d="M${s*.42},${t*.64} Q${s*.5},${t*.67} ${s*.58},${t*.64}" stroke="#EF5350" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M${s*.58},${t*.64} L${s*.62},${t*.72}" stroke="#EF5350" stroke-width="4" fill="none"/>
  <!-- Arms -->
  <line x1="${s*.39}" y1="${t*.7}" x2="${s*.25}" y2="${t*.62}" stroke="#5D4037" stroke-width="3" stroke-linecap="round"/>
  <line x1="${s*.61}" y1="${t*.7}" x2="${s*.75}" y2="${t*.62}" stroke="#5D4037" stroke-width="3" stroke-linecap="round"/>
  <!-- Hat -->
  <rect x="${s*.43}" y="${t*.49}" width="${s*.14}" height="${t*.1}"  rx="2" fill="#1A237E"/>
  <rect x="${s*.4}"  y="${t*.57}" width="${s*.2}"  height="${t*.03}" rx="1" fill="#1A237E"/>
</svg>`;

    case 'bath': return `
<svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="btTile" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#B3E5FC"/><stop offset="100%" stop-color="#E1F5FE"/>
    </linearGradient>
    <radialGradient id="btBub" cx="35%" cy="30%" r="60%">
      <stop offset="0%" stop-color="rgba(255,255,255,.9)"/><stop offset="100%" stop-color="rgba(180,230,255,.3)"/>
    </radialGradient>
  </defs>
  <!-- Tiles -->
  ${Array.from({length:4},(_,row)=>Array.from({length:5},(_,col)=>`<rect x="${s*(col/5)+1}" y="${t*(row*.14)+1}" width="${s/5-2}" height="${t*.14-2}" rx="3" fill="${(col+row)%2===0?'#B3E5FC':'#E1F5FE'}" opacity=".75"/>`).join('')).join('')}
  <!-- Grout lines -->
  ${Array.from({length:5},(_,i)=>`<line x1="${s*i*.2}" y1="0" x2="${s*i*.2}" y2="${t*.6}" stroke="#B0BEC5" stroke-width="1" opacity=".4"/>`).join('')}
  ${Array.from({length:4},(_,i)=>`<line x1="0" y1="${t*(i+1)*.14}" x2="${s}" y2="${t*(i+1)*.14}" stroke="#B0BEC5" stroke-width="1" opacity=".4"/>`).join('')}
  <!-- Bathtub -->
  <path d="M${s*.06},${t*.5} Q${s*.06},${t*.93} ${s*.12},${t*.95} L${s*.88},${t*.95} Q${s*.94},${t*.93} ${s*.94},${t*.5}Z" fill="white" stroke="#B0BEC5" stroke-width="2"/>
  <!-- Tub highlight -->
  <path d="M${s*.08},${t*.5} Q${s*.08},${t*.88} ${s*.13},${t*.9}" stroke="rgba(255,255,255,.6)" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- Water -->
  <ellipse cx="${s*.5}" cy="${t*.7}" rx="${s*.38}" ry="${t*.17}" fill="#B3E5FC" opacity=".75"/>
  <!-- Bubbles (iridescent) -->
  ${Array.from({length:12},(_,i)=>{
    const bx=(s*(.14+i*.06)).toFixed(1), by=(t*(.62-i*.01)).toFixed(1), br=(3+i*.5).toFixed(1);
    const nbx=+bx, nby=+by, nbr=+br;
    return `<circle cx="${bx}" cy="${by}" r="${br}" fill="url(#btBub)" opacity=".8"/>
<path d="M${(nbx-nbr*.5).toFixed(1)},${(nby-nbr*.6).toFixed(1)} Q${bx},${(nby-nbr).toFixed(1)} ${(nbx+nbr*.5).toFixed(1)},${(nby-nbr*.6).toFixed(1)}" stroke="rgba(255,255,255,.7)" stroke-width=".9" fill="none"/>`;
  }).join('')}
  <!-- Steam wisps -->
  <path d="M${s*.35},${t*.5} Q${s*.33},${t*.42} ${s*.35},${t*.34}" stroke="rgba(180,220,240,.6)" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M${s*.5},${t*.5}  Q${s*.52},${t*.41} ${s*.5},${t*.33}"  stroke="rgba(180,220,240,.5)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M${s*.65},${t*.5} Q${s*.67},${t*.42} ${s*.65},${t*.35}" stroke="rgba(180,220,240,.5)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <!-- Rubber duck -->
  <ellipse cx="${s*.72}" cy="${t*.68}" rx="${s*.07}" ry="${t*.05}" fill="#FFD600"/>
  <circle  cx="${s*.75}" cy="${t*.63}" r="${s*.04}"  fill="#FFD600"/>
  <circle  cx="${s*.762}" cy="${t*.62}" r="2.5" fill="#333"/>
  <circle  cx="${s*.76}"  cy="${t*.618}" r="1" fill="white" opacity=".6"/>
  <polygon points="${s*.77},${t*.64} ${s*.81},${t*.63} ${s*.79},${t*.65}" fill="#FF8A65"/>
  <!-- Shampoo bottles -->
  <rect x="${s*.08}" y="${t*.43}" width="${s*.08}" height="${t*.13}" rx="4" fill="#F48FB1"/>
  <rect x="${s*.18}" y="${t*.45}" width="${s*.07}" height="${t*.11}" rx="4" fill="#80CBC4"/>
  <ellipse cx="${s*.12}" cy="${t*.43}" rx="${s*.03}" ry="${t*.015}" fill="#E91E63" opacity=".6"/>
  <ellipse cx="${s*.215}" cy="${t*.45}" rx="${s*.025}" ry="${t*.012}" fill="#009688" opacity=".6"/>
  <!-- Towel -->
  <rect x="${s*.87}" y="${t*.38}" width="${s*.1}" height="${t*.32}" rx="4" fill="#F8BBD0"/>
  <line x1="${s*.87}" y1="${t*.48}" x2="${s*.97}" y2="${t*.48}" stroke="#F48FB1" stroke-width="2"/>
  <line x1="${s*.87}" y1="${t*.56}" x2="${s*.97}" y2="${t*.56}" stroke="#F48FB1" stroke-width="2"/>
  <line x1="${s*.87}" y1="${t*.64}" x2="${s*.97}" y2="${t*.64}" stroke="#F48FB1" stroke-width="2"/>
</svg>`;

    case 'park': return `
<svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pkSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#5bbde4"/><stop offset="100%" stop-color="#a8dff5"/>
    </linearGradient>
    <radialGradient id="pkSun" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF176"/><stop offset="100%" stop-color="#FFD600"/>
    </radialGradient>
  </defs>
  <!-- Sky -->
  <rect width="${s}" height="${t*.52}" fill="url(#pkSky)"/>
  <!-- Grass -->
  <rect x="0" y="${t*.52}" width="${s}" height="${t*.48}" fill="#5cb85c"/>
  <ellipse cx="${s*.5}" cy="${t*.52}" rx="${s*.7}" ry="${t*.05}" fill="#3d8b3d"/>
  <!-- Puffy clouds -->
  <ellipse cx="${s*.18}" cy="${t*.13}" rx="${s*.13}" ry="${t*.065}" fill="white" opacity=".93"/>
  <ellipse cx="${s*.27}" cy="${t*.11}" rx="${s*.09}" ry="${t*.055}" fill="white" opacity=".93"/>
  <ellipse cx="${s*.22}" cy="${t*.09}" rx="${s*.07}" ry="${t*.045}" fill="white" opacity=".97"/>
  <ellipse cx="${s*.6}"  cy="${t*.16}" rx="${s*.11}" ry="${t*.055}" fill="white" opacity=".88"/>
  <ellipse cx="${s*.69}" cy="${t*.14}" rx="${s*.08}" ry="${t*.05}"  fill="white" opacity=".88"/>
  <ellipse cx="${s*.64}" cy="${t*.12}" rx="${s*.065}" ry="${t*.04}" fill="white" opacity=".92"/>
  <!-- Sun top-right -->
  <circle cx="${s*.88}" cy="${t*.1}" r="${s*.09}" fill="url(#pkSun)"/>
  ${sunRays(s*.88, t*.1, s*.09, s*.17)}
  <!-- Tree (left side) -->
  <rect x="${s*.08}" y="${t*.34}" width="${s*.05}" height="${t*.22}" rx="3" fill="#6d4c41"/>
  <circle cx="${s*.105}" cy="${t*.28}" r="${s*.11}" fill="#388E3C"/>
  <circle cx="${s*.085}" cy="${t*.33}" r="${s*.085}" fill="#2E7D32"/>
  <circle cx="${s*.13}"  cy="${t*.32}" r="${s*.08}"  fill="#43A047"/>
  <!-- Slide structure -->
  <!-- Slide frame/ladder side -->
  <rect x="${s*.52}" y="${t*.36}" width="${s*.03}" height="${t*.2}" rx="2" fill="#e65100"/>
  <rect x="${s*.68}" y="${t*.36}" width="${s*.03}" height="${t*.2}" rx="2" fill="#e65100"/>
  <!-- Top platform of slide -->
  <rect x="${s*.5}" y="${t*.34}" width="${s*.23}" height="${t*.04}" rx="2" fill="#ff7043"/>
  <!-- Slide body (angled path) -->
  <path d="M${s*.71},${t*.38} Q${s*.78},${t*.46} ${s*.82},${t*.56}" stroke="#ff5722" stroke-width="${s*.045}" fill="none" stroke-linecap="round"/>
  <!-- Ladder rungs -->
  <line x1="${s*.52}" y1="${t*.43}" x2="${s*.71}" y2="${t*.43}" stroke="#bf360c" stroke-width="2.5"/>
  <line x1="${s*.52}" y1="${t*.49}" x2="${s*.71}" y2="${t*.49}" stroke="#bf360c" stroke-width="2.5"/>
  <!-- Swing set horizontal bar -->
  <rect x="${s*.28}" y="${t*.32}" width="${s*.2}"  height="${t*.025}" rx="2" fill="#5D4037"/>
  <rect x="${s*.27}" y="${t*.3}"  width="${s*.03}" height="${t*.08}"  rx="2" fill="#5D4037"/>
  <rect x="${s*.46}" y="${t*.3}"  width="${s*.03}" height="${t*.08}"  rx="2" fill="#5D4037"/>
  <!-- Swing 1 ropes + seat -->
  <rect x="${s*.305}" y="${t*.34}" width="${s*.007}" height="${t*.14}" fill="#8D6E63"/>
  <rect x="${s*.325}" y="${t*.34}" width="${s*.007}" height="${t*.14}" fill="#8D6E63"/>
  <ellipse cx="${s*.319}" cy="${t*.495}" rx="${s*.025}" ry="${t*.018}" fill="#ff7043"/>
  <!-- Swing 2 ropes + seat -->
  <rect x="${s*.395}" y="${t*.34}" width="${s*.007}" height="${t*.14}" fill="#8D6E63"/>
  <rect x="${s*.415}" y="${t*.34}" width="${s*.007}" height="${t*.14}" fill="#8D6E63"/>
  <ellipse cx="${s*.409}" cy="${t*.495}" rx="${s*.025}" ry="${t*.018}" fill="#42a5f5"/>
  <!-- Small birds (v-shape) in sky -->
  <path d="M${s*.35},${t*.22} Q${s*.37},${t*.2} ${s*.39},${t*.22}" stroke="#555" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <path d="M${s*.44},${t*.18} Q${s*.46},${t*.16} ${s*.48},${t*.18}" stroke="#555" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <path d="M${s*.5},${ t*.24} Q${s*.52},${t*.22} ${s*.54},${t*.24}" stroke="#555" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <!-- Flowers in grass -->
  ${flowers(s, t)}
</svg>`;

    case 'castle': return `
<svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="csSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0f0c29"/><stop offset="55%" stop-color="#302b63"/><stop offset="100%" stop-color="#24243e"/>
    </linearGradient>
    <radialGradient id="csMoon" cx="38%" cy="32%" r="60%">
      <stop offset="0%" stop-color="#fffde0"/><stop offset="100%" stop-color="#f0d060"/>
    </radialGradient>
    <radialGradient id="csGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff" stop-opacity=".22"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="csWin" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF9C4" stop-opacity=".95"/>
      <stop offset="100%" stop-color="#FFD600" stop-opacity=".4"/>
    </radialGradient>
  </defs>
  <!-- Deep twilight sky -->
  <rect width="${s}" height="${t}" fill="url(#csSky)"/>
  <!-- Stars -->
  ${Array.from({length:45},(_,i)=>{
    const sx=(Math.random()*s).toFixed(1), sy=(Math.random()*t*.65).toFixed(1);
    const r=(.4+Math.random()*2.2).toFixed(1), op=(.25+Math.random()*.75).toFixed(2);
    const cls=i%4===0?' class="star-twinkle"':'';
    return `<circle cx="${sx}" cy="${sy}" r="${r}" fill="#fff" opacity="${op}"${cls}/>`;
  }).join('')}
  <!-- Moon -->
  <circle cx="${s*.82}" cy="${t*.12}" r="${s*.1}" fill="url(#csMoon)"/>
  <circle cx="${s*.87}" cy="${t*.09}" r="${s*.088}" fill="#0f0c29"/>
  <circle cx="${s*.82}" cy="${t*.12}" r="${s*.17}" fill="url(#csGlow)"/>
  <!-- Rolling hills silhouette at base -->
  <ellipse cx="${s*.2}"  cy="${t*.85}" rx="${s*.35}" ry="${t*.12}" fill="#4a3d8f"/>
  <ellipse cx="${s*.78}" cy="${t*.88}" rx="${s*.3}"  ry="${t*.1}"  fill="#3d3175"/>
  <rect x="0" y="${t*.88}" width="${s}" height="${t*.12}" fill="#4a3d8f"/>
  <!-- Castle wide base -->
  <rect x="${s*.2}" y="${t*.52}" width="${s*.6}" height="${t*.36}" rx="2" fill="#c5c8f5"/>
  <!-- Castle shadow side -->
  <rect x="${s*.58}" y="${t*.52}" width="${s*.22}" height="${t*.36}" rx="0 2 2 0" fill="#a8acec"/>
  <!-- Left side tower -->
  <rect x="${s*.14}" y="${t*.44}" width="${s*.18}" height="${t*.44}" rx="2" fill="#c5c8f5"/>
  <rect x="${s*.24}" y="${t*.44}" width="${s*.08}" height="${t*.44}" rx="0 2 2 0" fill="#a8acec"/>
  <!-- Right side tower -->
  <rect x="${s*.68}" y="${t*.44}" width="${s*.18}" height="${t*.44}" rx="2" fill="#c5c8f5"/>
  <rect x="${s*.76}" y="${t*.44}" width="${s*.1}"  height="${t*.44}" rx="0 2 2 0" fill="#a8acec"/>
  <!-- Center (taller) tower -->
  <rect x="${s*.37}" y="${t*.32}" width="${s*.26}" height="${t*.56}" rx="2" fill="#c5c8f5"/>
  <rect x="${s*.51}" y="${t*.32}" width="${s*.12}" height="${t*.56}" rx="0 2 2 0" fill="#a8acec"/>
  <!-- Tower roofs: triangles in pink/magenta -->
  <polygon points="${s*.14},${t*.44} ${s*.23},${t*.32} ${s*.32},${t*.44}" fill="#e040fb"/>
  <polygon points="${s*.68},${t*.44} ${s*.77},${t*.32} ${s*.86},${t*.44}" fill="#e040fb"/>
  <polygon points="${s*.37},${t*.32} ${s*.5},${t*.18}  ${s*.63},${t*.32}" fill="#ce93d8"/>
  <!-- Flags on each tower -->
  <line x1="${s*.23}" y1="${t*.32}" x2="${s*.23}" y2="${t*.24}" stroke="#8B6914" stroke-width="2"/>
  <polygon points="${s*.23},${t*.24} ${s*.3},${t*.27} ${s*.23},${t*.3}" fill="#e53935"/>
  <line x1="${s*.77}" y1="${t*.32}" x2="${s*.77}" y2="${t*.24}" stroke="#8B6914" stroke-width="2"/>
  <polygon points="${s*.77},${t*.24} ${s*.84},${t*.27} ${s*.77},${t*.3}" fill="#1565c0"/>
  <line x1="${s*.5}"  y1="${t*.18}" x2="${s*.5}"  y2="${t*.09}" stroke="#8B6914" stroke-width="2"/>
  <polygon points="${s*.5},${t*.09} ${s*.58},${t*.13} ${s*.5},${t*.17}" fill="#f9a825"/>
  <!-- Arched gate at base -->
  <path d="M${s*.42},${t*.88} L${s*.42},${t*.72} Q${s*.5},${t*.66} ${s*.58},${t*.72} L${s*.58},${t*.88}Z" fill="#7b1fa2"/>
  <!-- Lit windows (glowing yellow ellipses) -->
  <ellipse cx="${s*.2}"  cy="${t*.56}" rx="${s*.028}" ry="${t*.035}" fill="url(#csWin)"/>
  <ellipse cx="${s*.26}" cy="${t*.56}" rx="${s*.028}" ry="${t*.035}" fill="url(#csWin)"/>
  <ellipse cx="${s*.72}" cy="${t*.56}" rx="${s*.028}" ry="${t*.035}" fill="url(#csWin)"/>
  <ellipse cx="${s*.78}" cy="${t*.56}" rx="${s*.028}" ry="${t*.035}" fill="url(#csWin)"/>
  <ellipse cx="${s*.44}" cy="${t*.44}" rx="${s*.025}" ry="${t*.03}"  fill="url(#csWin)"/>
  <ellipse cx="${s*.56}" cy="${t*.44}" rx="${s*.025}" ry="${t*.03}"  fill="url(#csWin)"/>
  <!-- Floating sparkles around castle -->
  ${Array.from({length:12},(_,i)=>{
    const sx=(s*(.1+Math.random()*.8)).toFixed(1), sy=(t*(.2+Math.random()*.5)).toFixed(1);
    return `<circle cx="${sx}" cy="${sy}" r="${(1+Math.random()*2.5).toFixed(1)}" fill="#fffde0" opacity="${(.3+Math.random()*.7).toFixed(2)}" class="star-twinkle" style="animation-delay:${(Math.random()*3).toFixed(1)}s"/>`;
  }).join('')}
</svg>`;

    case 'underwater': return `
<svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="uwBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0077b6"/><stop offset="100%" stop-color="#03045e"/>
    </linearGradient>
    <radialGradient id="uwBub" cx="35%" cy="30%" r="60%">
      <stop offset="0%" stop-color="rgba(255,255,255,.85)"/><stop offset="100%" stop-color="rgba(180,230,255,.2)"/>
    </radialGradient>
  </defs>
  <!-- Deep ocean background -->
  <rect width="${s}" height="${t}" fill="url(#uwBg)"/>
  <!-- Light rays from top -->
  <path d="M${s*.3},0 L${s*.08},${t*.75}" stroke="rgba(100,200,255,.10)" stroke-width="38" fill="none" stroke-linecap="round"/>
  <path d="M${s*.45},0 L${s*.3}, ${t*.8}"  stroke="rgba(100,200,255,.08)" stroke-width="28" fill="none" stroke-linecap="round"/>
  <path d="M${s*.55},0 L${s*.6}, ${t*.8}"  stroke="rgba(100,200,255,.08)" stroke-width="28" fill="none" stroke-linecap="round"/>
  <path d="M${s*.68},0 L${s*.88},${t*.72}" stroke="rgba(100,200,255,.09)" stroke-width="32" fill="none" stroke-linecap="round"/>
  <path d="M${s*.5}, 0 L${s*.5}, ${t*.85}" stroke="rgba(100,200,255,.06)" stroke-width="20" fill="none" stroke-linecap="round"/>
  <!-- Sandy floor -->
  <rect x="0" y="${t*.75}" width="${s}" height="${t*.25}" fill="#c9a84c"/>
  <ellipse cx="${s*.5}" cy="${t*.75}" rx="${s*.7}" ry="${t*.04}" fill="#b8922a"/>
  <!-- Coral formations -->
  <circle cx="${s*.08}" cy="${t*.72}" r="${s*.05}"  fill="#ff6b6b"/>
  <circle cx="${s*.11}" cy="${t*.67}" r="${s*.04}"  fill="#ff8e53"/>
  <circle cx="${s*.06}" cy="${t*.67}" r="${s*.032}" fill="#ff6b6b"/>
  <circle cx="${s*.14}" cy="${t*.63}" r="${s*.028}" fill="#ff5252"/>
  <line x1="${s*.08}" y1="${t*.75}" x2="${s*.08}" y2="${t*.67}" stroke="#ff6b6b" stroke-width="4"/>
  <line x1="${s*.11}" y1="${t*.75}" x2="${s*.11}" y2="${t*.63}" stroke="#ff8e53" stroke-width="3"/>
  <circle cx="${s*.84}" cy="${t*.73}" r="${s*.042}" fill="#f06292"/>
  <circle cx="${s*.88}" cy="${t*.68}" r="${s*.034}" fill="#ff80ab"/>
  <circle cx="${s*.81}" cy="${t*.68}" r="${s*.028}" fill="#f48fb1"/>
  <line x1="${s*.84}" y1="${t*.75}" x2="${s*.84}" y2="${t*.69}" stroke="#f06292" stroke-width="4"/>
  <line x1="${s*.88}" y1="${t*.75}" x2="${s*.88}" y2="${t*.65}" stroke="#ff80ab" stroke-width="3"/>
  <!-- Seaweed stalks (wavy) -->
  <path d="M${s*.25},${t*.75} Q${s*.22},${t*.64} ${s*.26},${t*.56} Q${s*.3},${t*.48} ${s*.27},${t*.4}" stroke="#2d6a4f" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M${s*.3}, ${t*.75} Q${s*.33},${t*.65} ${s*.29},${t*.57} Q${s*.25},${t*.5} ${s*.3},${t*.44}" stroke="#40916c" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M${s*.6}, ${t*.75} Q${s*.63},${t*.64} ${s*.59},${t*.55} Q${s*.55},${t*.47} ${s*.6},${t*.4}" stroke="#52b788" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M${s*.65},${t*.75} Q${s*.68},${t*.65} ${s*.64},${t*.56} Q${s*.6},${t*.49} ${s*.65},${t*.43}" stroke="#2d6a4f" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- Fish 1 (orange/yellow) -->
  <ellipse cx="${s*.45}" cy="${t*.3}" rx="${s*.075}" ry="${t*.045}" fill="#ff9f1c"/>
  <polygon points="${s*.375},${t*.3} ${s*.34},${t*.26} ${s*.34},${t*.34}" fill="#ffbf69"/>
  <circle cx="${s*.49}" cy="${t*.29}" r="${s*.012}" fill="#000"/>
  <circle cx="${s*.492}" cy="${t*.288}" r="${s*.005}" fill="#fff" opacity=".7"/>
  <line x1="${s*.42}" y1="${t*.3}" x2="${s*.47}" y2="${t*.3}" stroke="#e07b00" stroke-width="1.2" opacity=".5"/>
  <!-- Fish 2 (blue/teal) -->
  <ellipse cx="${s*.7}"  cy="${t*.45}" rx="${s*.065}" ry="${t*.04}"  fill="#00b4d8"/>
  <polygon points="${s*.635},${t*.45} ${s*.605},${t*.41} ${s*.605},${t*.49}" fill="#90e0ef"/>
  <circle cx="${s*.74}" cy="${t*.44}" r="${s*.011}" fill="#000"/>
  <circle cx="${s*.742}" cy="${t*.438}" r="${s*.005}" fill="#fff" opacity=".7"/>
  <!-- Fish 3 (pink/magenta) -->
  <ellipse cx="${s*.2}"  cy="${t*.5}"  rx="${s*.06}"  ry="${t*.035}" fill="#f72585"/>
  <polygon points="${s*.14},${t*.5} ${s*.11},${t*.47} ${s*.11},${t*.53}" fill="#ff85c2"/>
  <circle cx="${s*.235}" cy="${t*.495}" r="${s*.01}" fill="#000"/>
  <!-- Fish 4 (green) -->
  <ellipse cx="${s*.55}" cy="${t*.62}" rx="${s*.055}" ry="${t*.032}" fill="#06d6a0"/>
  <polygon points="${s*.495},${t*.62} ${s*.465},${t*.59} ${s*.465},${t*.65}" fill="#80ffdb"/>
  <circle cx="${s*.585}" cy="${t*.615}" r="${s*.01}" fill="#000"/>
  <!-- Starfish on sand -->
  <polygon points="${starPoints(s*.48, t*.8, s*.045)}" fill="#e76f51"/>
  <circle cx="${s*.48}" cy="${t*.8}" r="${s*.015}" fill="#f4a261"/>
  <!-- Treasure chest -->
  <rect x="${s*.72}" y="${t*.78}" width="${s*.12}" height="${t*.09}" rx="2" fill="#b8860b"/>
  <rect x="${s*.72}" y="${t*.78}" width="${s*.12}" height="${t*.04}" rx="2 2 0 0" fill="#daa520"/>
  <path d="M${s*.72},${t*.82} Q${s*.78},${t*.8} ${s*.84},${t*.82}" stroke="#ffd700" stroke-width="2" fill="none"/>
  <rect x="${s*.775}" y="${t*.8}" width="${s*.025}" height="${t*.03}" rx="1" fill="#ffd700"/>
  <!-- Bubbles rising -->
  ${Array.from({length:14},(_,i)=>{
    const bx=(s*(.12+Math.random()*.76)).toFixed(1), by=(t*(.1+Math.random()*.6)).toFixed(1);
    const br=(2+Math.random()*5).toFixed(1), op=(.15+Math.random()*.55).toFixed(2);
    const cls=i%3===0?' class="star-twinkle"':'';
    return `<circle cx="${bx}" cy="${by}" r="${br}" fill="white" opacity="${op}"${cls}/>`;
  }).join('')}
</svg>`;

    case 'library': return `
<svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="lbWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fdf3e3"/><stop offset="100%" stop-color="#f5deb3"/>
    </linearGradient>
    <radialGradient id="lbLamp" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffe57a" stop-opacity=".7"/>
      <stop offset="100%" stop-color="#ff9800" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- Warm cream wall -->
  <rect width="${s}" height="${t}" fill="url(#lbWall)"/>
  <!-- Warm wood floor -->
  <rect x="0" y="${t*.7}" width="${s}" height="${t*.3}" fill="#8B6914"/>
  <line x1="0" y1="${t*.72}" x2="${s}" y2="${t*.72}" stroke="#7a5c0f" stroke-width="1.5" opacity=".5"/>
  <line x1="0" y1="${t*.79}" x2="${s}" y2="${t*.79}" stroke="#7a5c0f" stroke-width="1.5" opacity=".5"/>
  <line x1="0" y1="${t*.86}" x2="${s}" y2="${t*.86}" stroke="#7a5c0f" stroke-width="1.5" opacity=".5"/>
  <line x1="0" y1="${t*.93}" x2="${s}" y2="${t*.93}" stroke="#7a5c0f" stroke-width="1.5" opacity=".5"/>
  <!-- Left bookshelf frame -->
  <rect x="0" y="${t*.05}" width="${s*.2}" height="${t*.65}" fill="#5c3a1e"/>
  <rect x="${s*.01}" y="${t*.07}" width="${s*.18}" height="${t*.61}" fill="#6d4c2a"/>
  <!-- Shelf dividers -->
  <rect x="0" y="${t*.28}" width="${s*.2}" height="${t*.03}" fill="#5c3a1e"/>
  <rect x="0" y="${t*.49}" width="${s*.2}" height="${t*.03}" fill="#5c3a1e"/>
  <!-- Books on left shelf top row -->
  ${['#e53935','#1565c0','#2e7d32','#f57f17','#6a1b9a','#00838f','#ad1457','#558b2f'].map((c,i)=>`<rect x="${s*(.015+i*.022)}" y="${t*.1}" width="${s*.018}" height="${t*.16}" rx="1" fill="${c}"/>`).join('')}
  <!-- Books on left shelf mid row -->
  ${['#c62828','#283593','#1b5e20','#e65100','#4a148c','#006064','#880e4f'].map((c,i)=>`<rect x="${s*(.015+i*.025)}" y="${t*.31}" width="${s*.02}" height="${t*.15}" rx="1" fill="${c}"/>`).join('')}
  <!-- Books on left shelf lower row -->
  ${['#b71c1c','#0d47a1','#33691e','#bf360c','#311b92'].map((c,i)=>`<rect x="${s*(.015+i*.035)}" y="${t*.52}" width="${s*.028}" height="${t*.13}" rx="1" fill="${c}"/>`).join('')}
  <!-- Right bookshelf frame -->
  <rect x="${s*.8}"  y="${t*.05}" width="${s*.2}" height="${t*.65}" fill="#5c3a1e"/>
  <rect x="${s*.81}" y="${t*.07}" width="${s*.18}" height="${t*.61}" fill="#6d4c2a"/>
  <!-- Shelf dividers right -->
  <rect x="${s*.8}" y="${t*.28}" width="${s*.2}" height="${t*.03}" fill="#5c3a1e"/>
  <rect x="${s*.8}" y="${t*.49}" width="${s*.2}" height="${t*.03}" fill="#5c3a1e"/>
  <!-- Books on right shelf top row -->
  ${['#ff6f00','#00695c','#4527a0','#c62828','#1565c0','#2e7d32','#ad1457','#37474f'].map((c,i)=>`<rect x="${s*(.815+i*.022)}" y="${t*.1}" width="${s*.018}" height="${t*.16}" rx="1" fill="${c}"/>`).join('')}
  <!-- Books on right shelf mid row -->
  ${['#e91e63','#3949ab','#43a047','#fb8c00','#8e24aa','#0097a7','#e64a19'].map((c,i)=>`<rect x="${s*(.815+i*.025)}" y="${t*.31}" width="${s*.02}" height="${t*.15}" rx="1" fill="${c}"/>`).join('')}
  <!-- Books on right shelf lower row -->
  ${['#880e4f','#1a237e','#1b5e20','#e65100','#512da8'].map((c,i)=>`<rect x="${s*(.815+i*.035)}" y="${t*.52}" width="${s*.028}" height="${t*.13}" rx="1" fill="${c}"/>`).join('')}
  <!-- Window with daylight -->
  <rect x="${s*.37}" y="${t*.05}" width="${s*.26}" height="${t*.22}" rx="4" fill="#ddeeff" stroke="#b0c4de" stroke-width="2.5"/>
  <line x1="${s*.5}"  y1="${t*.05}" x2="${s*.5}"  y2="${t*.27}" stroke="#b0c4de" stroke-width="1.5"/>
  <line x1="${s*.37}" y1="${t*.16}" x2="${s*.63}" y2="${t*.16}" stroke="#b0c4de" stroke-width="1.5"/>
  <!-- Soft daylight rays -->
  <path d="M${s*.5},${t*.05} L${s*.3},${t*.4}" stroke="rgba(255,240,180,.15)" stroke-width="22" fill="none"/>
  <path d="M${s*.5},${t*.05} L${s*.5},${t*.4}" stroke="rgba(255,240,180,.12)" stroke-width="16" fill="none"/>
  <path d="M${s*.5},${t*.05} L${s*.7},${t*.4}" stroke="rgba(255,240,180,.13)" stroke-width="18" fill="none"/>
  <!-- Framed picture on wall -->
  <rect x="${s*.23}" y="${t*.1}" width="${s*.12}" height="${t*.14}" rx="2" fill="#fff" stroke="#a0522d" stroke-width="2.5"/>
  <rect x="${s*.24}" y="${t*.11}" width="${s*.1}" height="${t*.12}" rx="1" fill="#e8f4fd"/>
  <!-- Simple art inside frame -->
  ${rainbowArc(s*.29, t*.23, s*.05)}
  <!-- Round reading rug -->
  <ellipse cx="${s*.5}"  cy="${t*.82}" rx="${s*.22}" ry="${t*.1}"  fill="#8b0000" opacity=".75"/>
  <ellipse cx="${s*.5}"  cy="${t*.82}" rx="${s*.17}" ry="${t*.075}" fill="none" stroke="#c62828" stroke-width="3" opacity=".5"/>
  <ellipse cx="${s*.5}"  cy="${t*.82}" rx="${s*.11}" ry="${t*.05}"  fill="none" stroke="#ef5350" stroke-width="2" opacity=".4"/>
  <!-- Cozy armchair (mustard yellow) -->
  <rect x="${s*.35}" y="${t*.63}" width="${s*.3}" height="${t*.2}" rx="6" fill="#f9a825"/>
  <rect x="${s*.33}" y="${t*.56}" width="${s*.34}" height="${t*.1}" rx="5" fill="#f57f17"/>
  <rect x="${s*.33}" y="${t*.63}" width="${s*.04}" height="${t*.2}" rx="3" fill="#e65100"/>
  <rect x="${s*.63}" y="${t*.63}" width="${s*.04}" height="${t*.2}" rx="3" fill="#e65100"/>
  <ellipse cx="${s*.5}"  cy="${t*.62}" rx="${s*.13}" ry="${t*.03}" fill="#fff" opacity=".18"/>
  <!-- Reading lamp (left of chair) -->
  <rect x="${s*.29}" y="${t*.45}" width="${s*.015}" height="${t*.25}" fill="#8d6e63"/>
  <circle cx="${s*.297}" cy="${t*.7}"  r="${s*.02}" fill="#5d4037"/>
  <!-- Lamp shade cone -->
  <path d="M${s*.27},${t*.38} L${s*.32},${t*.46} L${s*.28},${t*.46}Z" fill="#ffe082"/>
  <path d="M${s*.27},${t*.38} L${s*.24},${t*.38} L${s*.28},${t*.46}Z" fill="#ffd54f"/>
  <!-- Lamp warm glow -->
  <ellipse cx="${s*.3}" cy="${t*.47}" rx="${s*.1}" ry="${t*.08}" fill="url(#lbLamp)"/>
  <!-- Dust motes -->
  ${Array.from({length:7},()=>{
    const mx=(s*(.25+Math.random()*.5)).toFixed(1), my=(t*(.1+Math.random()*.55)).toFixed(1);
    return `<circle cx="${mx}" cy="${my}" r="${(1.2+Math.random()*2).toFixed(1)}" fill="#d4a017" opacity="${(.15+Math.random()*.3).toFixed(2)}" class="star-twinkle" style="animation-delay:${(Math.random()*4).toFixed(1)}s"/>`;
  }).join('')}
</svg>`;

    case 'treehouse': return `
<svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="thSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#87ceeb"/><stop offset="100%" stop-color="#c9e8f5"/>
    </linearGradient>
  </defs>
  <!-- Daytime sky -->
  <rect width="${s}" height="${t}" fill="url(#thSky)"/>
  <!-- Soft clouds -->
  <ellipse cx="${s*.14}" cy="${t*.12}" rx="${s*.13}" ry="${t*.06}"  fill="white" opacity=".88"/>
  <ellipse cx="${s*.23}" cy="${t*.1}"  rx="${s*.09}" ry="${t*.05}"  fill="white" opacity=".88"/>
  <ellipse cx="${s*.19}" cy="${t*.08}" rx="${s*.07}" ry="${t*.042}" fill="white" opacity=".93"/>
  <ellipse cx="${s*.7}"  cy="${t*.16}" rx="${s*.12}" ry="${t*.055}" fill="white" opacity=".82"/>
  <ellipse cx="${s*.79}" cy="${t*.14}" rx="${s*.09}" ry="${t*.05}"  fill="white" opacity=".82"/>
  <ellipse cx="${s*.75}" cy="${t*.12}" rx="${s*.07}" ry="${t*.04}"  fill="white" opacity=".87"/>
  <!-- Massive tree trunk -->
  <rect x="${s*.42}" y="${t*.35}" width="${s*.16}" height="${t*.65}" rx="6" fill="#5d4037"/>
  <rect x="${s*.45}" y="${t*.35}" width="${s*.04}" height="${t*.65}" rx="4" fill="#4e342e" opacity=".5"/>
  <!-- Wide leafy canopy - back layers -->
  <circle cx="${s*.5}"  cy="${t*.28}" r="${s*.32}" fill="#1b5e20"/>
  <circle cx="${s*.32}" cy="${t*.35}" r="${s*.22}" fill="#2e7d32"/>
  <circle cx="${s*.68}" cy="${t*.35}" r="${s*.22}" fill="#1b5e20"/>
  <!-- Mid canopy layers -->
  <circle cx="${s*.5}"  cy="${t*.2}"  r="${s*.26}" fill="#2e7d32"/>
  <circle cx="${s*.36}" cy="${t*.26}" r="${s*.2}"  fill="#388e3c"/>
  <circle cx="${s*.64}" cy="${t*.26}" r="${s*.19}" fill="#2e7d32"/>
  <!-- Front canopy -->
  <circle cx="${s*.5}"  cy="${t*.14}" r="${s*.2}"  fill="#43a047"/>
  <circle cx="${s*.4}"  cy="${t*.2}"  r="${s*.15}" fill="#4caf50"/>
  <circle cx="${s*.6}"  cy="${t*.19}" r="${s*.15}" fill="#388e3c"/>
  <!-- Wooden platform -->
  <rect x="${s*.24}" y="${t*.52}" width="${s*.52}" height="${t*.06}" rx="3" fill="#8d6e63"/>
  <line x1="${s*.26}" y1="${t*.52}" x2="${s*.26}" y2="${t*.58}" stroke="#6d4c41" stroke-width="3"/>
  <line x1="${s*.36}" y1="${t*.52}" x2="${s*.36}" y2="${t*.58}" stroke="#6d4c41" stroke-width="3"/>
  <line x1="${s*.46}" y1="${t*.52}" x2="${s*.46}" y2="${t*.58}" stroke="#6d4c41" stroke-width="3"/>
  <line x1="${s*.56}" y1="${t*.52}" x2="${s*.56}" y2="${t*.58}" stroke="#6d4c41" stroke-width="3"/>
  <line x1="${s*.66}" y1="${t*.52}" x2="${s*.66}" y2="${t*.58}" stroke="#6d4c41" stroke-width="3"/>
  <!-- Railing -->
  <line x1="${s*.24}" y1="${t*.52}" x2="${s*.24}" y2="${t*.47}" stroke="#a1887f" stroke-width="2.5"/>
  <line x1="${s*.76}" y1="${t*.52}" x2="${s*.76}" y2="${t*.47}" stroke="#a1887f" stroke-width="2.5"/>
  <line x1="${s*.24}" y1="${t*.47}" x2="${s*.76}" y2="${t*.47}" stroke="#a1887f" stroke-width="2"/>
  <!-- Cabin walls -->
  <rect x="${s*.32}" y="${t*.38}" width="${s*.36}" height="${t*.14}" rx="2" fill="#a1887f"/>
  <rect x="${s*.38}" y="${t*.38}" width="${s*.16}" height="${t*.14}" rx="0 0 0 0" fill="#8d7569" opacity=".5"/>
  <!-- Cabin roof (triangle) -->
  <polygon points="${s*.3},${t*.38} ${s*.5},${t*.28} ${s*.7},${t*.38}" fill="#6d4c41"/>
  <polygon points="${s*.32},${t*.38} ${s*.5},${t*.29} ${s*.68},${t*.38}" fill="#795548"/>
  <!-- Cabin door -->
  <rect x="${s*.46}" y="${t*.44}" width="${s*.08}" height="${t*.08}" rx="2" fill="#4e342e"/>
  <circle cx="${s*.536}" cy="${t*.48}" r="${s*.008}" fill="#ffd700"/>
  <!-- Cabin window -->
  <rect x="${s*.34}" y="${t*.41}" width="${s*.07}" height="${t*.06}" rx="2" fill="#b3e5fc" stroke="#78909c" stroke-width="1.5"/>
  <line x1="${s*.375}" y1="${t*.41}" x2="${s*.375}" y2="${t*.47}" stroke="#78909c" stroke-width="1"/>
  <line x1="${s*.34}"  y1="${t*.44}" x2="${s*.41}"  y2="${t*.44}" stroke="#78909c" stroke-width="1"/>
  <!-- Rope ladder (right side) -->
  <line x1="${s*.68}" y1="${t*.58}" x2="${s*.68}" y2="${t*.92}" stroke="#8d6e63" stroke-width="2.5"/>
  <line x1="${s*.76}" y1="${t*.58}" x2="${s*.76}" y2="${t*.92}" stroke="#8d6e63" stroke-width="2.5"/>
  <line x1="${s*.68}" y1="${t*.64}" x2="${s*.76}" y2="${t*.64}" stroke="#6d4c41" stroke-width="2.5"/>
  <line x1="${s*.68}" y1="${t*.71}" x2="${s*.76}" y2="${t*.71}" stroke="#6d4c41" stroke-width="2.5"/>
  <line x1="${s*.68}" y1="${t*.78}" x2="${s*.76}" y2="${t*.78}" stroke="#6d4c41" stroke-width="2.5"/>
  <line x1="${s*.68}" y1="${t*.85}" x2="${s*.76}" y2="${t*.85}" stroke="#6d4c41" stroke-width="2.5"/>
  <!-- String lights along roof edge -->
  ${Array.from({length:10},(_,i)=>{
    const lx=(s*(.3+i*.04)).toFixed(1), ly=(t*(.38+Math.sin(i*.8)*.015)).toFixed(1);
    const col=['#ffeb3b','#ff7043','#42a5f5','#66bb6a','#ef5350','#ab47bc','#26c6da','#ff7043','#ffee58','#4caf50'][i];
    return `<circle cx="${lx}" cy="${ly}" r="${s*.013}" fill="${col}" opacity=".9"/>`;
  }).join('')}
  <path d="M${s*.3},${t*.38} ${Array.from({length:9},(_,i)=>`L${(s*(.34+i*.04)).toFixed(1)},${(t*(.4+Math.sin(i*.8)*.018)).toFixed(1)}`).join(' ')} L${s*.7},${t*.38}" stroke="#555" stroke-width="1" fill="none" opacity=".4"/>
  <!-- Flower boxes on railing -->
  <rect x="${s*.24}" y="${t*.46}" width="${s*.09}" height="${t*.028}" rx="2" fill="#8d6e63"/>
  <circle cx="${s*.26}" cy="${t*.455}" r="${s*.012}" fill="#ff80ab"/>
  <circle cx="${s*.29}" cy="${t*.452}" r="${s*.012}" fill="#ff4081"/>
  <circle cx="${s*.32}" cy="${t*.455}" r="${s*.012}" fill="#ffcc00"/>
  <rect x="${s*.67}" y="${t*.46}" width="${s*.09}" height="${t*.028}" rx="2" fill="#8d6e63"/>
  <circle cx="${s*.69}" cy="${t*.455}" r="${s*.012}" fill="#ff80ab"/>
  <circle cx="${s*.72}" cy="${t*.452}" r="${s*.012}" fill="#b39ddb"/>
  <circle cx="${s*.75}" cy="${t*.455}" r="${s*.012}" fill="#80cbc4"/>
  <!-- Butterfly nearby -->
  <ellipse cx="${s*.2}"  cy="${t*.36}" rx="${s*.045}" ry="${t*.028}" fill="#ce93d8" opacity=".9" transform="rotate(-20,${s*.2},${t*.36})"/>
  <ellipse cx="${s*.26}" cy="${t*.36}" rx="${s*.045}" ry="${t*.028}" fill="#ce93d8" opacity=".9" transform="rotate(20,${s*.26},${t*.36})"/>
  <ellipse cx="${s*.2}"  cy="${t*.375}" rx="${s*.028}" ry="${t*.018}" fill="#ab47bc" opacity=".7" transform="rotate(-20,${s*.2},${t*.375})"/>
  <ellipse cx="${s*.26}" cy="${t*.375}" rx="${s*.028}" ry="${t*.018}" fill="#ab47bc" opacity=".7" transform="rotate(20,${s*.26},${t*.375})"/>
  <line x1="${s*.23}" y1="${t*.35}" x2="${s*.23}" y2="${t*.395}" stroke="#555" stroke-width="1.5"/>
</svg>`;

    default: return `<svg viewBox="0 0 ${s} ${t}" xmlns="http://www.w3.org/2000/svg">${Array.from({length:40},()=>`<circle cx="${(Math.random()*s).toFixed(1)}" cy="${(Math.random()*t*.7).toFixed(1)}" r="${(.8+Math.random()*2.5).toFixed(1)}" fill="#fff" opacity="${(.3+Math.random()*.7).toFixed(2)}" class="star-twinkle"/>`).join('')}</svg>`;
  }
}

/* ── SVG Helpers ──────────────────────────────────── */
function sunRays(cx, cy, innerR, outerR, count=12) {
  return Array.from({length:count},(_,i)=>{
    const a=(i/count)*Math.PI*2;
    const x1=(cx+Math.cos(a)*innerR*1.25).toFixed(1), y1=(cy+Math.sin(a)*innerR*1.25).toFixed(1);
    const x2=(cx+Math.cos(a)*outerR).toFixed(1),      y2=(cy+Math.sin(a)*outerR).toFixed(1);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FFD54F" stroke-width="2.5" opacity=".55"/>`;
  }).join('');
}

function flowers(w, h) {
  const positions=[[.5,.7],[.6,.75],[.35,.72],[.72,.7],[.25,.78],[.82,.73]];
  const colors=['#FF80AB','#FF4081','#FFCC00','#B39DDB','#80CBC4','#FF6090'];
  return positions.map(([px,py],i)=>{
    const x=w*px, y=h*py, r=w*.024;
    const stemBot = h*Math.min(py+0.1, 0.97);
    const stem = `<line x1="${x.toFixed(1)}" y1="${(y+r).toFixed(1)}" x2="${x.toFixed(1)}" y2="${stemBot.toFixed(1)}" stroke="#66BB6A" stroke-width="2.5"/>`;
    const petals=Array.from({length:6},(_,j)=>{
      const a=(j/6)*Math.PI*2, ex=x+Math.cos(a)*r*1.6, ey=y+Math.sin(a)*r*1.6;
      return `<ellipse cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" rx="${(r*.9).toFixed(1)}" ry="${(r*.5).toFixed(1)}" fill="${colors[i]}" transform="rotate(${(j/6*360).toFixed(0)},${ex.toFixed(1)},${ey.toFixed(1)})"/>`;
    }).join('');
    return stem+petals+`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#FFF176"/>`;
  }).join('');
}

function rainbow(x, y, w, h) {
  const colors=['#f44336','#ff9800','#ffeb3b','#4caf50','#2196f3','#9c27b0'];
  return colors.map((c,i)=>{
    const rw=w*(1-i*.12), cx=x+w/2, cy=y+h;
    return `<path d="M${cx-rw},${cy} Q${cx},${cy-h*(1-i*.12)} ${cx+rw},${cy}" stroke="${c}" stroke-width="5" fill="none" opacity=".7"/>`;
  }).join('');
}

function rainbowArc(cx, cy, r) {
  const colors=['#f44336','#ff9800','#ffeb3b','#4caf50','#2196f3','#9c27b0'];
  const step = r / (colors.length + 0.5);
  return colors.map((c,i)=>{
    const ri = r - i * step;
    const sw = (step * 1.2).toFixed(1);
    return `<path d="M${cx-ri},${cy} Q${cx},${cy-ri} ${cx+ri},${cy}" stroke="${c}" stroke-width="${sw}" fill="none" opacity=".6"/>`;
  }).join('');
}

function snowflake(cx, cy, r, seed) {
  return Array.from({length:6},(_,i)=>{
    const a=(i/6)*Math.PI*2;
    const ex=(cx+Math.cos(a)*r).toFixed(1), ey=(cy+Math.sin(a)*r).toFixed(1);
    return `<line x1="${cx.toFixed(1)}" y1="${cy.toFixed(1)}" x2="${ex}" y2="${ey}" stroke="#fff" stroke-width="1.5" opacity=".65"/>`;
  }).join('')+`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="2" fill="#fff" opacity=".8"/>`;
}

function starPoints(cx, cy, size) {
  return Array.from({length:10},(_,i)=>{
    const a=(i/10)*Math.PI*2-Math.PI/2, r=i%2===0?size:size*.4;
    return `${(cx+Math.cos(a)*r).toFixed(1)},${(cy+Math.sin(a)*r).toFixed(1)}`;
  }).join(' ');
}

/* ── Card Thumbnails ──────────────────────────────── */
const CARD_BG = {
  stars:        ['#060818','#1a2a8e','#0d0530'],
  bedroom:      ['#08091f','#1e1e6e','#3a2a80'],
  garden:       ['#87ceeb','#5cb85c','#2d7d2d'],
  kitchen:      ['#ffe082','#ff9800','#fff9c4'],
  'living-room':['#fff3e0','#ffcc80','#ff9800'],
  forest:       ['#0d2200','#1a5c1a','#2d8b2d'],
  dream:        ['#0a0020','#2d0050','#5c0a8f'],
  beach:        ['#29b6f6','#ffe082','#fdd835'],
  snow:         ['#b3e5fc','#e0f7fa','#fff'],
  bath:         ['#b3e5fc','#81d4fa','#4fc3f7'],
  park:         ['#87ceeb','#5cb85c','#2d7d2d'],
  castle:       ['#1a1a4e','#4a3d8f','#c5c8f5'],
  underwater:   ['#03045e','#0077b6','#00b4d8'],
  library:      ['#5c3a1e','#8B6914','#fff3cd'],
  treehouse:    ['#87ceeb','#5d4037','#2e7d32'],
};

/* seeded pseudo-random: stable thumbnails across re-renders */
function seededRand(seed) {
  let s = seed;
  return function() {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function cardThumbSVG(scene, chars) {
  const g=CARD_BG[scene]||CARD_BG.stars;
  const key=scene+(chars||[]).join('');
  const gid=`g${key.split('').reduce((a,c)=>((a<<5)-a+c.charCodeAt(0))|0,0).toString(36).replace('-','n')}`;
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${g[0]}"/>
      <stop offset="55%" stop-color="${g[1]}"/>
      <stop offset="100%" stop-color="${g[2]}"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" fill="url(#${gid})"/>
  ${thumbScene(scene, key)}
  ${thumbChars(chars, key)}
</svg>`;
}

function thumbScene(scene, seed) {
  const rng = seededRand((seed||scene).split('').reduce((a,c)=>a+c.charCodeAt(0),0));
  switch(scene){
    case 'stars': case 'dream':
      return Array.from({length:14},()=>`<circle cx="${(rng()*120).toFixed(0)}" cy="${(rng()*70).toFixed(0)}" r="${(.5+rng()*2.2).toFixed(1)}" fill="#fff" opacity="${(.3+rng()*.7).toFixed(2)}"/>`).join('')
        +`<circle cx="88" cy="18" r="16" fill="#fff7c2" opacity=".9"/><circle cx="94" cy="14" r="14" fill="${scene==='dream'?'#0a0020':'#080f30'}"/><circle cx="88" cy="18" r="24" fill="rgba(255,255,200,.1)"/>`;
    case 'bedroom':
      return `<rect x="20" y="58" width="80" height="42" rx="8" fill="#9b59b6"/><rect x="20" y="56" width="80" height="9" rx="5" fill="#7d3c98"/><rect x="24" y="60" width="30" height="14" rx="5" fill="#f8c8e0"/><rect x="66" y="60" width="30" height="14" rx="5" fill="#d4a0f0"/><rect x="20" y="68" width="80" height="32" rx="8" fill="#e8b4f8"/>`;
    case 'garden':
      return `<rect x="0" y="54" width="120" height="66" fill="#5CB85C"/><ellipse cx="60" cy="54" rx="70" ry="10" fill="#388E3C"/><circle cx="96" cy="14" r="13" fill="#FFF176"/>${sunRays(96,14,13,22,8)}<ellipse cx="20" cy="20" rx="15" ry="8" fill="white" opacity=".85"/>`;
    case 'kitchen':
      return `<rect x="0" y="56" width="120" height="64" fill="#FFF8E1"/><rect x="0" y="56" width="120" height="5" fill="#FFD54F"/><ellipse cx="38" cy="64" rx="18" ry="8" fill="#FFE082"/><ellipse cx="82" cy="64" rx="18" ry="8" fill="#FFCCBC"/>`;
    case 'living-room':
      return `<rect x="6" y="56" width="108" height="44" rx="10" fill="#7C4DFF"/><rect x="6" y="54" width="108" height="9" rx="8" fill="#651FFF"/><rect x="12" y="58" width="32" height="28" rx="7" fill="#E040FB"/><rect x="76" y="58" width="32" height="28" rx="7" fill="#40C4FF"/>`;
    case 'forest':
      return `<rect x="0" y="52" width="120" height="68" fill="#0d2200"/><ellipse cx="60" cy="52" rx="70" ry="14" fill="#1a3d00"/>${Array.from({length:8},()=>`<circle cx="${(rng()*120).toFixed(0)}" cy="${(30+rng()*30).toFixed(0)}" r="2.5" fill="#CCFF00" opacity="${(.3+rng()*.7).toFixed(2)}"/>`).join('')}`;
    case 'beach':
      return `<rect x="0" y="52" width="120" height="68" fill="#FDD835"/><path d="M0,50 Q30,44 60,50 Q90,56 120,50 L120,58 L0,58Z" fill="#29B6F6" opacity=".9"/><circle cx="96" cy="14" r="14" fill="#FFF176"/>${sunRays(96,14,14,22,8)}`;
    case 'snow':
      return `<rect x="0" y="56" width="120" height="64" fill="#E0F7FA"/><ellipse cx="60" cy="56" rx="70" ry="14" fill="#E1F5FE"/>${Array.from({length:10},()=>`<circle cx="${(rng()*120).toFixed(0)}" cy="${(rng()*50).toFixed(0)}" r="${(1+rng()*3).toFixed(1)}" fill="#fff" opacity=".75"/>`).join('')}`;
    case 'bath':
      return `<path d="M8,56 Q8,104 14,106 L106,106 Q112,104 112,56Z" fill="white" opacity=".9"/><ellipse cx="60" cy="80" rx="46" ry="20" fill="#B3E5FC" opacity=".8"/>`;
    case 'park':
      return `<rect x="0" y="54" width="120" height="66" fill="#5CB85C"/><ellipse cx="60" cy="54" rx="70" ry="9" fill="#388E3C"/><circle cx="96" cy="13" r="12" fill="#FFF176"/>${sunRays(96,13,12,20,8)}<ellipse cx="20" cy="22" rx="14" ry="7" fill="white" opacity=".88"/><rect x="18" y="32" width="4" height="22" rx="2" fill="#6d4c41"/><circle cx="20" cy="28" r="12" fill="#388E3C"/>`;
    case 'castle':
      return `${Array.from({length:10},()=>`<circle cx="${(rng()*120).toFixed(0)}" cy="${(rng()*55).toFixed(0)}" r="${(.4+rng()*1.8).toFixed(1)}" fill="#fff" opacity="${(.3+rng()*.7).toFixed(2)}"/>`).join('')}<rect x="28" y="50" width="64" height="44" rx="2" fill="#c5c8f5"/><rect x="20" y="42" width="20" height="52" rx="2" fill="#c5c8f5"/><rect x="80" y="42" width="20" height="52" rx="2" fill="#c5c8f5"/><rect x="44" y="32" width="32" height="62" rx="2" fill="#c5c8f5"/><polygon points="20,42 30,28 40,42" fill="#e040fb"/><polygon points="80,42 90,28 100,42" fill="#e040fb"/><polygon points="44,32 60,16 76,32" fill="#ce93d8"/><ellipse cx="56" cy="60" rx="5" ry="6" fill="#ffe082" opacity=".9"/><ellipse cx="68" cy="60" rx="5" ry="6" fill="#ffe082" opacity=".9"/>`;
    case 'underwater':
      return `<rect x="0" y="72" width="120" height="48" fill="#c9a84c"/><ellipse cx="60" cy="72" rx="70" ry="7" fill="#b8922a"/><ellipse cx="36" cy="45" rx="14" ry="9" fill="#00b4d8"/><polygon points="22,45 16,40 16,50" fill="#90e0ef"/><ellipse cx="84" cy="30" rx="12" ry="8" fill="#ff9f1c"/><polygon points="72,30 66,25 66,35" fill="#ffbf69"/><ellipse cx="60" cy="62" rx="10" ry="9" fill="#f72585"/><polygon points="50,62 44,57 44,67" fill="#ff85c2"/><path d="M24,72 Q22,57 25,46 Q28,38 24,30" stroke="#2d6a4f" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M96,72 Q98,57 95,46 Q92,38 96,30" stroke="#40916c" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    case 'library':
      return `<rect x="0" y="0" width="24" height="86" fill="#5c3a1e"/>${['#e53935','#1565c0','#2e7d32','#f57f17','#6a1b9a','#00838f'].map((c,i)=>`<rect x="${2+i*3.5}" y="4" width="3" height="24" rx="1" fill="${c}"/>`).join('')}${['#c62828','#283593','#1b5e20','#e65100','#4a148c','#006064'].map((c,i)=>`<rect x="${2+i*3.5}" y="34" width="3" height="20" rx="1" fill="${c}"/>`).join('')}<rect x="96" y="0" width="24" height="86" fill="#5c3a1e"/>${['#ff6f00','#00695c','#4527a0','#c62828','#1565c0','#2e7d32'].map((c,i)=>`<rect x="${98+i*3.5}" y="4" width="3" height="24" rx="1" fill="${c}"/>`).join('')}<rect x="0" y="86" width="120" height="34" fill="#8B6914"/><rect x="26" y="64" width="68" height="30" rx="6" fill="#f9a825"/><rect x="24" y="56" width="72" height="12" rx="5" fill="#f57f17"/><ellipse cx="60" cy="94" rx="26" ry="12" fill="#8b0000" opacity=".7"/>`;
    case 'treehouse':
      return `<circle cx="60" cy="30" r="36" fill="#2e7d32"/><circle cx="42" cy="38" r="24" fill="#388e3c"/><circle cx="78" cy="38" r="24" fill="#1b5e20"/><rect x="50" y="42" width="20" height="58" rx="5" fill="#5d4037"/><rect x="28" y="62" width="64" height="8" rx="3" fill="#8d6e63"/><rect x="36" y="50" width="48" height="12" rx="2" fill="#a1887f"/><polygon points="34,50 60,38 86,50" fill="#6d4c41"/><line x1="80" y1="70" x2="80" y2="100" stroke="#8d6e63" stroke-width="2"/><line x1="88" y1="70" x2="88" y2="100" stroke="#8d6e63" stroke-width="2"/><line x1="80" y1="78" x2="88" y2="78" stroke="#6d4c41" stroke-width="2"/><line x1="80" y1="87" x2="88" y2="87" stroke="#6d4c41" stroke-width="2"/><line x1="80" y1="96" x2="88" y2="96" stroke="#6d4c41" stroke-width="2"/>`;
    default: return '';
  }
}

function thumbChars(chars, seed) {
  if(!chars||!chars.length) return '';
  const total=chars.length;
  const uid=`th${(seed||chars.join('')).split('').reduce((a,c)=>a+c.charCodeAt(0),0).toString(36)}`;
  return chars.slice(0,3).map((c,i)=>{
    const x=total===1?60:total===2?[35,85][i]:[28,60,92][i]||60;
    const sc=total===1?.46:total===2?.4:.34;
    return charArt(c,x,120,sc,`${uid}${i}`);
  }).join('');
}

/* ── State ────────────────────────────────────────── */
function readStorageSet(key) {
  try { return new Set(JSON.parse(localStorage.getItem(key) || '[]')); }
  catch { return new Set(); }
}
function writeStorageSet(key, set) {
  try { localStorage.setItem(key, JSON.stringify([...set])); } catch {}
}

let currentFilter='all';
let currentStory=null;
let currentPage=0;
let readStories=readStorageSet('readStories');
let favouriteStories=readStorageSet('favouriteStories');

/* ── Favourites ───────────────────────────────────── */
function toggleFavourite(storyId, e) {
  e && e.stopPropagation();
  if (favouriteStories.has(storyId)) {
    favouriteStories.delete(storyId);
  } else {
    favouriteStories.add(storyId);
  }
  writeStorageSet('favouriteStories', favouriteStories);
  if (currentFilter === 'favorites') {
    // Card membership in this filtered grid just changed — needs a full rebuild.
    renderHome();
    return;
  }
  const btn = document.querySelector(`.fav-btn[data-id="${storyId}"]`);
  if (btn) {
    const isFav = favouriteStories.has(storyId);
    btn.textContent = isFav ? '❤️' : '🤍';
    btn.setAttribute('aria-label', isFav ? 'Remove from favourites' : 'Add to favourites');
  }
}

/* ── Home Screen ──────────────────────────────────── */
function getFilteredStories(){
  if(currentFilter==='all') return STORIES;
  if(currentFilter==='favorites') return STORIES.filter(s=>favouriteStories.has(s.id));
  return STORIES.filter(s=>s.chars.includes(currentFilter));
}

function renderProgress() {
  const fill  = document.getElementById('progress-fill');
  const label = document.getElementById('progress-label');
  if (!fill || !label) return;
  const total = STORIES.length;
  const done  = readStories.size;
  fill.style.width = total > 0 ? (done / total * 100).toFixed(1) + '%' : '0%';
  label.textContent = `${done} of ${total} stories read`;
}

function showCompletionToast() {
  const existing = document.querySelector('.story-complete-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'story-complete-toast';
  toast.textContent = '🎉 Story complete!';
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hiding');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }, 2200);
}

function renderHome(){
  const filtered=getFilteredStories();
  document.getElementById('story-count-label').textContent=`${filtered.length} ${filtered.length===1?'story':'stories'}`;
  renderProgress();
  const grid=document.getElementById('story-grid');
  grid.innerHTML='';

  if(filtered.length===0 && currentFilter==='favorites'){
    grid.innerHTML=`<div class="empty-favourites"><div style="font-size:3rem;margin-bottom:12px">❤️</div><p>Tap the ❤️ on any story to save your favourites here!</p></div>`;
    return;
  }

  filtered.forEach((story,idx)=>{
    const card=document.createElement('div');
    card.className='story-card';
    card.style.setProperty('--card-i',idx);
    const isRead=readStories.has(story.id);
    const isFav=favouriteStories.has(story.id);
    const hasVideo = typeof hasStoryVideo==='function' && hasStoryVideo(story.id);
    card.innerHTML=`
      <div class="card-art">${cardThumbSVG(story.scene,story.chars)}</div>
      <div class="card-body">
        ${isRead?'<span class="read-badge">⭐</span>':''}
        ${hasVideo?'<button class="watch-badge" aria-label="Watch the animated video for '+story.title+'">🎬 Watch</button>':''}
        <div class="card-title">${story.title}</div>
        <div class="card-bottom">
          <div class="card-chars">
            ${story.chars.map(c=>`<span class="char-dot" style="background:${CHARS[c]?.color||'#ccc'}" title="${CHARS[c]?.label||c}"></span>`).join('')}
          </div>
          <button class="fav-btn" aria-label="${isFav?'Remove from favourites':'Add to favourites'}" data-id="${story.id}">${isFav?'❤️':'🤍'}</button>
        </div>
      </div>`;
    card.addEventListener('click',()=>openStory(story));
    if(hasVideo){
      const watchBtn=card.querySelector('.watch-badge');
      watchBtn.addEventListener('click',e=>{ e.stopPropagation(); openStoryVideo(story); });
    }
    card.querySelector('.fav-btn').addEventListener('click',e=>toggleFavourite(story.id,e));
    grid.appendChild(card);
  });
}

function renderStars(){
  const container=document.getElementById('home-stars');
  if(!container) return;
  for(let i=0;i<60;i++){
    const s=document.createElement('div');
    s.className='star-dot';
    const size=.5+Math.random()*3;
    s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;width:${size}px;height:${size}px;--dur:${2+Math.random()*3}s;--delay:${Math.random()*4}s;`;
    container.appendChild(s);
  }
}

/* ── Text-to-Speech ───────────────────────────────── */
let ttsEnabled = false;
let _gentleVoice = null;

function _pickGentleVoice(voices) {
  return voices.find(v => /female|girl|samantha|karen|moira|tessa|victoria|fiona/i.test(v.name)) || null;
}

if ('speechSynthesis' in window) {
  // Most browsers load voices asynchronously — getVoices() returns [] until
  // this fires once, so an immediate lookup on first read-aloud usually misses.
  _gentleVoice = _pickGentleVoice(window.speechSynthesis.getVoices());
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    _gentleVoice = _pickGentleVoice(window.speechSynthesis.getVoices());
  });
}

function ttsSpeak(text) {
  if (!ttsEnabled || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate  = 0.82;
  utter.pitch = 1.1;
  utter.volume = 1;
  if (_gentleVoice) utter.voice = _gentleVoice;
  window.speechSynthesis.speak(utter);
}

function ttsStop() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

function ttsToggle() {
  ttsEnabled = !ttsEnabled;
  const btn = document.getElementById('tts-btn');
  if (btn) {
    btn.textContent = ttsEnabled ? '🔇 Stop Reading' : '🔊 Read Aloud';
    btn.classList.toggle('tts-active', ttsEnabled);
  }
  if (ttsEnabled && currentStory) {
    ttsSpeak(currentStory.pages[currentPage].text);
  } else {
    ttsStop();
  }
}

/* ── Reader ───────────────────────────────────────── */
let _readerTrigger=null;
let _readerCloseTimer=null;
let _pageAnimEl=null;
let _pageAnimHandler=null;

function openStory(story){
  if(!story) return;
  currentStory=story; currentPage=0;
  if(typeof SFX !== 'undefined') SFX.open();
  clearTimeout(_readerCloseTimer);
  _readerTrigger=document.activeElement;
  const reader=document.getElementById('reader');
  reader.classList.remove('hidden','closing');
  reader.classList.add('opening');
  renderPage(false);
  renderDots();
  document.getElementById('home-screen').style.display='none';
}

function closeReader(){
  ttsStop();
  ttsEnabled = false;
  const ttsBtn = document.getElementById('tts-btn');
  if (ttsBtn) { ttsBtn.textContent = '🔊 Read Aloud'; ttsBtn.classList.remove('tts-active'); }
  if(typeof SFX !== 'undefined') SFX.close();
  const reader=document.getElementById('reader');
  reader.classList.add('closing');
  reader.classList.remove('opening');
  clearTimeout(_readerCloseTimer);
  _readerCloseTimer=setTimeout(()=>{
    reader.classList.add('hidden');
    reader.classList.remove('closing');
    document.getElementById('home-screen').style.display='';
    renderHome();
    if(_readerTrigger){ _readerTrigger.focus(); _readerTrigger=null; }
  },220);
}

function renderPage(animate,direction='right'){
  if(!currentStory) return;
  const pageEl=document.getElementById('page');
  const pg=currentStory.pages[currentPage];
  const animClass=direction==='right'?'slide-in-right':'slide-in-left';
  const scene=pg.scene||currentStory.scene||'stars';
  const w=400, h=490;
  const charsOnPage=pg.chars||currentStory.chars||[];
  const charSVGs=charsOnPage.map((c,i)=>{
    const total=charsOnPage.length;
    const x=total===1?w*.5:total===2?[w*.3,w*.7][i]:[w*.22,w*.5,w*.78][i]||w*.5;
    const sc=total<=2?.72:.58;
    return charArt(c,x,h*.66,sc,`pg${currentPage}${i}`);
  }).join('');
  const panelH=pg.text.length>110?'48%':'42%';
  pageEl.className=`page scene-${scene}${animate?' '+animClass:''}`;
  pageEl.innerHTML=`
    <div class="scene-art">${sceneArt(scene,w,h)}</div>
    <svg class="scene-art" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="z-index:2;pointer-events:none;">${charSVGs}</svg>
    <div class="story-panel" style="height:${panelH}">
      <div class="story-chapter">${currentStory.title}</div>
      <div class="story-text">${pg.text}</div>
    </div>`;
  if(_pageAnimEl && _pageAnimHandler){
    _pageAnimEl.removeEventListener('animationend',_pageAnimHandler);
    _pageAnimEl.removeEventListener('animationcancel',_pageAnimHandler);
    _pageAnimHandler=null;
  }
  if(animate){
    _pageAnimHandler=()=>{
      pageEl.classList.remove(animClass);
      pageEl.removeEventListener('animationend',_pageAnimHandler);
      pageEl.removeEventListener('animationcancel',_pageAnimHandler);
      _pageAnimHandler=null;
    };
    _pageAnimEl=pageEl;
    pageEl.addEventListener('animationend',_pageAnimHandler);
    pageEl.addEventListener('animationcancel',_pageAnimHandler);
  }

  // Desktop aside text panel
  const aside=document.getElementById('story-aside');
  if(aside){
    const hasVideo = typeof hasStoryVideo==='function' && hasStoryVideo(currentStory.id);
    aside.innerHTML=`
      <div class="aside-label">Page ${currentPage+1} of ${currentStory.pages.length}</div>
      <h2 class="aside-chapter">${currentStory.title}</h2>
      <p class="aside-text">${pg.text}</p>
      <div class="aside-chars">
        ${(pg.chars||currentStory.chars||[]).map(c=>`<span class="aside-char-dot" style="background:${CHARS[c]?.color||'#ccc'}" title="${CHARS[c]?.label||c}"></span><span class="aside-char-name">${CHARS[c]?.label||c}</span>`).join('')}
      </div>
      <div class="aside-actions">
        <button class="tts-btn${ttsEnabled?' tts-active':''}" id="tts-btn" aria-label="Read page aloud">
          ${ttsEnabled?'🔇 Stop Reading':'🔊 Read Aloud'}
        </button>
        ${hasVideo?'<button class="watch-btn" id="watch-btn" aria-label="Watch the animated video for '+currentStory.title+'">🎬 Watch Animated Video</button>':''}
      </div>`;
    aside.querySelector('#tts-btn').addEventListener('click', ttsToggle);
    if(hasVideo) aside.querySelector('#watch-btn').addEventListener('click', () => openStoryVideo(currentStory));
  }
  // Auto-read aloud if TTS is on
  if(ttsEnabled) ttsSpeak(pg.text);

  document.getElementById('prev-btn').disabled=currentPage===0;
  document.getElementById('next-btn').disabled=currentPage===currentStory.pages.length-1;
  if(currentPage===currentStory.pages.length-1){
    const alreadyRead = readStories.has(currentStory.id);
    readStories.add(currentStory.id);
    writeStorageSet('readStories', readStories);
    if(!alreadyRead) showCompletionToast();
  }
}

function renderDots(){
  const dots=document.getElementById('dots');
  dots.innerHTML='';
  currentStory.pages.forEach((_,i)=>{
    const d=document.createElement('button');
    d.type='button';
    d.className='dot'+(i===currentPage?' active':'');
    d.setAttribute('aria-label',`Go to page ${i+1}`);
    if(i===currentPage) d.setAttribute('aria-current','true');
    d.addEventListener('click',()=>goToPage(i));
    dots.appendChild(d);
  });
}

function goToPage(n){
  if(!currentStory||n<0||n>=currentStory.pages.length||n===currentPage) return;
  const dir=n>currentPage?'right':'left';
  currentPage=n;
  if(typeof SFX !== 'undefined') SFX.pageTurn(dir);
  renderPage(true,dir);
  renderDots();
}

function nextPage(){ goToPage(currentPage+1); }
function prevPage(){ goToPage(currentPage-1); }

/* ── Keyboard ─────────────────────────────────────── */
document.addEventListener('keydown',e=>{
  if(document.getElementById('reader').classList.contains('hidden')) return;
  const videoOverlay=document.getElementById('video-overlay');
  if(videoOverlay && !videoOverlay.classList.contains('hidden')) return;
  const timerOverlay=document.getElementById('timer-expired-overlay');
  if(timerOverlay && !timerOverlay.classList.contains('hidden')) return;
  if(e.key==='ArrowRight'||e.key===' '){ e.preventDefault(); nextPage(); }
  if(e.key==='ArrowLeft'){ e.preventDefault(); prevPage(); }
  if(e.key==='Escape') closeReader();
});

/* ── Touch ────────────────────────────────────────── */
let touchStartX=0;
const book=document.getElementById('book');
book.addEventListener('touchstart',e=>{ touchStartX=e.touches[0].clientX; },{passive:true});
book.addEventListener('touchend',e=>{ const dx=e.changedTouches[0].clientX-touchStartX; if(Math.abs(dx)>40){ dx<0?nextPage():prevPage(); } });

/* ── Buttons ──────────────────────────────────────── */
document.getElementById('next-btn').addEventListener('click',nextPage);
document.getElementById('prev-btn').addEventListener('click',prevPage);
document.getElementById('reader-back').addEventListener('click',closeReader);

document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>{
      b.classList.remove('active');
      b.setAttribute('aria-pressed','false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed','true');
    currentFilter=btn.dataset.char;
    renderHome();
  });
});

document.getElementById('random-btn').addEventListener('click',()=>{
  const pool=getFilteredStories();
  if(!pool.length) return;
  openStory(pool[Math.floor(Math.random()*pool.length)]);
});

/* ── Init ─────────────────────────────────────────── */
renderStars();
renderHome();
renderProgress();
