/* ── State ──────────────────────────────────────────────── */
let currentPage = 0;
let isAnimating  = false;
let touchStartX  = 0;

/* ── Scene Art ──────────────────────────────────────────── */
function sceneCover() {
  return `<svg viewBox="0 0 400 540" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <!-- Stars -->
    ${starField([
      [35,28,1.8],[80,18,1.2],[55,65,1],[120,30,2],[160,15,1.5],[200,42,1],[240,22,1.8],
      [290,35,1.2],[330,18,2],[370,44,1],[40,90,1.5],[100,75,2],[150,88,1],[200,72,1.8],
      [260,80,1.2],[310,65,1.8],[360,90,1],[380,20,1.5],[22,130,1],[70,140,2],
      [130,120,1.5],[190,135,1],[250,115,2],[320,130,1.5],[375,120,1]
    ])}
    <!-- Moon glow -->
    <circle cx="300" cy="88" r="58" fill="white" opacity="0.06"/>
    <circle cx="300" cy="88" r="42" fill="#fff8e0" opacity="0.12"/>
    <!-- Crescent -->
    <circle cx="300" cy="88" r="36" fill="#fff5a0"/>
    <circle cx="320" cy="78" r="31" fill="#0d0520"/>
    <!-- Ground silhouette -->
    <path d="M0 430 Q80 410 180 425 Q280 408 400 420 L400 540 L0 540 Z" fill="#0a0320"/>
    <!-- Grass tufts -->
    <path d="M60 430 Q65 415 70 430" stroke="#1a0a40" stroke-width="4" fill="none"/>
    <path d="M110 425 Q115 412 120 425" stroke="#1a0a40" stroke-width="4" fill="none"/>
    <path d="M330 418 Q335 405 340 418" stroke="#1a0a40" stroke-width="4" fill="none"/>
    <path d="M370 422 Q375 410 380 422" stroke="#1a0a40" stroke-width="4" fill="none"/>
    <!-- Rylee silhouette (left, taller) -->
    <circle cx="158" cy="370" r="22" fill="#0a0320"/>
    <!-- ponytail -->
    <ellipse cx="175" cy="356" rx="7" ry="14" fill="#0a0320"/>
    <rect x="144" y="390" width="28" height="46" rx="11" fill="#0a0320"/>
    <rect x="145" y="432" width="12" height="32" rx="6" fill="#0a0320"/>
    <rect x="161" y="432" width="12" height="32" rx="6" fill="#0a0320"/>
    <!-- Rylee arm stretched right -->
    <path d="M172 405 Q190 408 205 414" stroke="#0a0320" stroke-width="10" stroke-linecap="round" fill="none"/>
    <!-- Brielle silhouette (right, shorter) -->
    <circle cx="232" cy="382" r="18" fill="#0a0320"/>
    <!-- curly hair bumps -->
    <circle cx="218" cy="372" r="10" fill="#0a0320"/>
    <circle cx="232" cy="366" r="11" fill="#0a0320"/>
    <circle cx="246" cy="372" r="10" fill="#0a0320"/>
    <rect x="218" y="398" width="28" height="38" rx="10" fill="#0a0320"/>
    <rect x="219" y="432" width="11" height="28" rx="5.5" fill="#0a0320"/>
    <rect x="234" y="432" width="11" height="28" rx="5.5" fill="#0a0320"/>
    <!-- Brielle arm stretched left -->
    <path d="M218 410 Q203 414 185 415" stroke="#0a0320" stroke-width="9" stroke-linecap="round" fill="none"/>
  </svg>`;
}

function scenePortraits() {
  return `<svg viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <!-- Split background -->
    <rect x="0"   y="0" width="200" height="480" fill="#ead6f8"/>
    <rect x="200" y="0" width="200" height="480" fill="#fce8f2"/>
    <!-- Center divider -->
    <rect x="196" y="0" width="8" height="480" fill="white" opacity="0.5"/>

    <!-- === RYLEE (left side) === -->
    <!-- Legs -->
    <rect x="84" y="330" width="18" height="62" rx="9" fill="#c9a8e0"/>
    <rect x="107" y="330" width="18" height="62" rx="9" fill="#c9a8e0"/>
    <!-- Shoes -->
    <ellipse cx="93"  cy="394" rx="16" ry="8" fill="#3d1a5e"/>
    <ellipse cx="116" cy="394" rx="16" ry="8" fill="#3d1a5e"/>
    <!-- Dress body -->
    <rect x="74" y="246" width="62" height="90" rx="22" fill="#9b59b6"/>
    <!-- Dress skirt flare -->
    <ellipse cx="105" cy="334" rx="38" ry="12" fill="#b06ed8"/>
    <!-- Left arm -->
    <rect x="32"  y="252" width="48" height="18" rx="9" fill="#9b59b6" transform="rotate(18 56 261)"/>
    <!-- Right arm -->
    <rect x="128" y="252" width="48" height="18" rx="9" fill="#9b59b6" transform="rotate(-18 152 261)"/>
    <!-- Neck -->
    <rect x="97" y="234" width="16" height="18" fill="#eecfff"/>
    <!-- Head -->
    <circle cx="105" cy="200" r="44" fill="#f0d8ff"/>
    <!-- Hair back -->
    <ellipse cx="105" cy="168" rx="42" ry="18" fill="#3d1a5e"/>
    <circle  cx="105" cy="164" rx="34" ry="34" fill="#3d1a5e"/>
    <!-- Ponytail -->
    <rect x="140" y="162" width="13" height="36" rx="6.5" fill="#3d1a5e"/>
    <!-- Hair sides covering ears -->
    <ellipse cx="64"  cy="196" rx="14" ry="22" fill="#3d1a5e"/>
    <ellipse cx="146" cy="196" rx="14" ry="22" fill="#3d1a5e"/>
    <!-- Ears -->
    <circle cx="61"  cy="200" r="9" fill="#f0d8ff"/>
    <circle cx="149" cy="200" r="9" fill="#f0d8ff"/>
    <!-- Eyes whites -->
    <circle cx="91"  cy="198" r="7" fill="white"/>
    <circle cx="119" cy="198" r="7" fill="white"/>
    <!-- Pupils -->
    <circle cx="92"  cy="198" r="3.5" fill="#2c1654"/>
    <circle cx="120" cy="198" r="3.5" fill="#2c1654"/>
    <!-- Eye shine -->
    <circle cx="94"  cy="196" r="1.5" fill="white"/>
    <circle cx="122" cy="196" r="1.5" fill="white"/>
    <!-- Smile -->
    <path d="M 89 214 Q 105 226 121 214" stroke="#7b3fa0" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Cheeks -->
    <circle cx="82"  cy="208" r="9" fill="#e09bd8" opacity="0.45"/>
    <circle cx="128" cy="208" r="9" fill="#e09bd8" opacity="0.45"/>

    <!-- === BRIELLE (right side) === -->
    <!-- Legs -->
    <rect x="284" y="348" width="16" height="54" rx="8" fill="#f9c4d8"/>
    <rect x="305" y="348" width="16" height="54" rx="8" fill="#f9c4d8"/>
    <!-- Shoes -->
    <ellipse cx="292" cy="404" rx="14" ry="7" fill="#8b0038"/>
    <ellipse cx="313" cy="404" rx="14" ry="7" fill="#8b0038"/>
    <!-- Dress -->
    <ellipse cx="305" cy="310" rx="36" ry="44" fill="#f06292"/>
    <!-- Dress skirt -->
    <ellipse cx="305" cy="348" rx="40" ry="13" fill="#f48fb1"/>
    <!-- Left arm -->
    <rect x="258" y="288" width="40" height="16" rx="8" fill="#f06292" transform="rotate(22 278 296)"/>
    <!-- Right arm -->
    <rect x="336" y="288" width="40" height="16" rx="8" fill="#f06292" transform="rotate(-22 356 296)"/>
    <!-- Neck -->
    <rect x="298" y="270" width="14" height="14" fill="#fce4ec"/>
    <!-- Head -->
    <circle cx="305" cy="244" r="38" fill="#fce4ec"/>
    <!-- Curly hair (back layer) -->
    <circle cx="282" cy="230" r="20" fill="#ad1457"/>
    <circle cx="305" cy="220" r="22" fill="#ad1457"/>
    <circle cx="328" cy="230" r="20" fill="#ad1457"/>
    <!-- Face re-cover (hair overlap) -->
    <circle cx="305" cy="248" r="36" fill="#fce4ec"/>
    <!-- Curly hair (front bumps) -->
    <circle cx="283" cy="226" r="14" fill="#c2185b"/>
    <circle cx="305" cy="216" r="16" fill="#c2185b"/>
    <circle cx="327" cy="226" r="14" fill="#c2185b"/>
    <!-- Hair sides -->
    <ellipse cx="267" cy="246" rx="12" ry="18" fill="#c2185b"/>
    <ellipse cx="343" cy="246" rx="12" ry="18" fill="#c2185b"/>
    <!-- Ears -->
    <circle cx="267" cy="246" r="8" fill="#fce4ec"/>
    <circle cx="343" cy="246" r="8" fill="#fce4ec"/>
    <!-- Eyes whites -->
    <circle cx="294" cy="244" r="6" fill="white"/>
    <circle cx="316" cy="244" r="6" fill="white"/>
    <!-- Pupils -->
    <circle cx="295" cy="244" r="3" fill="#6d0025"/>
    <circle cx="317" cy="244" r="3" fill="#6d0025"/>
    <!-- Eye shine -->
    <circle cx="297" cy="242" r="1.2" fill="white"/>
    <circle cx="319" cy="242" r="1.2" fill="white"/>
    <!-- Smile -->
    <path d="M 292 258 Q 305 270 318 258" stroke="#ad1457" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <!-- Cheeks -->
    <circle cx="286" cy="254" r="8" fill="#f48fb1" opacity="0.5"/>
    <circle cx="324" cy="254" r="8" fill="#f48fb1" opacity="0.5"/>
  </svg>`;
}

function sceneMorning() {
  return `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <!-- Sun glow -->
    <circle cx="340" cy="-20" r="90" fill="#ffe082" opacity="0.5"/>
    <!-- Sun rays (group for rotation) -->
    <g class="sun-rays" style="transform-origin:340px 30px">
      ${sunRays(340, 30, 10, 28, 50)}
    </g>
    <circle cx="340" cy="30" r="38" fill="#ffee58"/>
    <circle cx="340" cy="30" r="28" fill="#fff176"/>
    <!-- Birds -->
    <path d="M 80 55 Q 88 48 96 55" stroke="#5d4037" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M 110 42 Q 118 35 126 42" stroke="#5d4037" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M 60 78 Q 66 72 72 78" stroke="#5d4037" stroke-width="2" fill="none" stroke-linecap="round"/>
    <!-- House window frame -->
    <rect x="20" y="60" width="80" height="70" rx="4" fill="#fff9c4" opacity="0.9"/>
    <rect x="20" y="60" width="80" height="70" rx="4" fill="none" stroke="#f57f17" stroke-width="4"/>
    <rect x="58" y="60" width="4" height="70" fill="#f57f17"/>
    <rect x="20" y="93" width="80" height="4" fill="#f57f17"/>
    <!-- Window curtains -->
    <path d="M20 60 Q30 78 20 94" fill="#ef9a9a" opacity="0.7"/>
    <path d="M100 60 Q90 78 100 94" fill="#ef9a9a" opacity="0.7"/>
    <!-- Kitchen counter suggestion -->
    <rect x="140" y="200" width="260" height="60" rx="4" fill="#ffe0b2"/>
    <rect x="140" y="196" width="260" height="10" rx="3" fill="#ffcc80"/>
    <!-- Coffee cup -->
    <rect x="200" y="168" width="32" height="32" rx="6" fill="white" opacity="0.9"/>
    <path d="M232 178 Q244 178 244 188 Q244 198 232 198" stroke="#bcaaa4" stroke-width="3" fill="none"/>
    <!-- Steam lines -->
    <path d="M210 162 Q213 154 210 146" stroke="white" stroke-width="2" opacity="0.7" fill="none" stroke-linecap="round"/>
    <path d="M220 158 Q223 150 220 142" stroke="white" stroke-width="2" opacity="0.7" fill="none" stroke-linecap="round"/>
    <!-- Cereal bowl -->
    <ellipse cx="290" cy="198" rx="28" ry="10" fill="white" opacity="0.9"/>
    <path d="M262 198 Q290 220 318 198" fill="white" opacity="0.9"/>
  </svg>`;
}

function sceneBackyard() {
  return `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <!-- Sun -->
    <circle cx="60" cy="48" r="38" fill="#fff176"/>
    <g class="sun-rays" style="transform-origin:60px 48px">
      ${sunRays(60, 48, 10, 22, 42)}
    </g>
    <circle cx="60" cy="48" r="28" fill="#ffee58"/>
    <!-- Clouds -->
    <g class="cloud-drift">
      <circle cx="180" cy="52" r="26" fill="white" opacity="0.9"/>
      <circle cx="210" cy="44" r="30" fill="white" opacity="0.9"/>
      <circle cx="240" cy="52" r="24" fill="white" opacity="0.9"/>
      <rect   x="180" y="52" width="84" height="20" fill="white" opacity="0.9"/>
    </g>
    <g class="cloud-drift-slow">
      <circle cx="310" cy="35" r="20" fill="white" opacity="0.75"/>
      <circle cx="336" cy="28" r="24" fill="white" opacity="0.75"/>
      <circle cx="360" cy="35" r="18" fill="white" opacity="0.75"/>
      <rect   x="310" y="35" width="68" height="16" fill="white" opacity="0.75"/>
    </g>
    <!-- Big tree trunk -->
    <rect x="318" y="100" width="24" height="160" rx="6" fill="#795548"/>
    <!-- Tree canopy (layers) -->
    <circle cx="330" cy="82" r="52" fill="#388e3c"/>
    <circle cx="310" cy="92" r="38" fill="#43a047"/>
    <circle cx="350" cy="88" r="36" fill="#2e7d32"/>
    <circle cx="330" cy="60" r="34" fill="#4caf50"/>
    <!-- Swing ropes from tree -->
    <line x1="312" y1="94" x2="288" y2="190" stroke="#a1887f" stroke-width="3"/>
    <line x1="348" y1="94" x2="324" y2="190" stroke="#a1887f" stroke-width="3"/>
    <!-- Swing seat -->
    <rect x="284" y="188" width="44" height="10" rx="4" fill="#8d6e63"/>
    <!-- Flowers -->
    ${flower(50,  240, '#ff80ab', '#fff176')}
    ${flower(90,  248, '#ce93d8', '#fff176')}
    ${flower(130, 243, '#ef9a9a', '#fff176')}
    ${flower(160, 250, '#80cbc4', '#fff176')}
    ${flower(200, 244, '#ff80ab', '#fff59d')}
    ${flower(240, 252, '#90caf9', '#fff176')}
    <!-- Ladybug -->
    <circle cx="170" cy="220" r="10" fill="#e53935"/>
    <circle cx="170" cy="220" r="10" fill="none" stroke="#1a0000" stroke-width="1.5"/>
    <line x1="170" y1="210" x2="170" y2="230" stroke="#1a0000" stroke-width="1.5"/>
    <circle cx="165" cy="216" r="3" fill="#1a0000"/>
    <circle cx="175" cy="216" r="3" fill="#1a0000"/>
    <circle cx="166" cy="224" r="2.5" fill="#1a0000"/>
    <circle cx="174" cy="224" r="2.5" fill="#1a0000"/>
  </svg>`;
}

function sceneLivingRoom() {
  return `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <!-- Warm light from right window -->
    <radialGradient id="winLight" cx="85%" cy="30%" r="60%">
      <stop offset="0%"  stop-color="#fff8e1" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <rect x="0" y="0" width="400" height="260" fill="url(#winLight)"/>
    <!-- Window on right -->
    <rect x="298" y="30" width="88" height="120" rx="6" fill="#fff8e1" opacity="0.9"/>
    <rect x="298" y="30" width="88" height="120" rx="6" fill="none" stroke="#e65100" stroke-width="5"/>
    <rect x="340" y="30" width="5" height="120" fill="#e65100"/>
    <rect x="298" y="88" width="88" height="5" fill="#e65100"/>
    <!-- Window frame top arc -->
    <path d="M298 36 Q342 10 386 36" fill="#fff8e1" opacity="0.9"/>
    <!-- Sun shaft from window -->
    <polygon points="340,30 400,10 400,160 340,150" fill="#fff9c4" opacity="0.3"/>
    <!-- Bookshelf -->
    <rect x="20" y="60" width="70" height="130" rx="4" fill="#a1887f"/>
    <rect x="24" y="64" width="62" height="38" rx="2" fill="#8d6e63"/>
    <rect x="24" y="106" width="62" height="38" rx="2" fill="#8d6e63"/>
    <rect x="24" y="148" width="62" height="38" rx="2" fill="#8d6e63"/>
    <!-- Books (colorful spines) -->
    ${bookSpine(30,  70, 10, 30, '#e53935')}
    ${bookSpine(42,  70, 10, 30, '#1565c0')}
    ${bookSpine(54,  70, 10, 30, '#2e7d32')}
    ${bookSpine(66,  70,  8, 30, '#f57f17')}
    ${bookSpine(76,  70,  8, 30, '#6a1b9a')}
    ${bookSpine(30, 112,  8, 30, '#0277bd')}
    ${bookSpine(40, 112, 12, 30, '#c62828')}
    ${bookSpine(54, 112, 10, 30, '#558b2f')}
    ${bookSpine(66, 112, 10, 30, '#e65100')}
    <!-- Couch (big, in the middle-right) -->
    <rect x="130" y="162" width="220" height="80" rx="18" fill="#ff8a65"/>
    <rect x="130" y="152" width="220" height="32" rx="14" fill="#ff7043"/>
    <!-- Couch arms -->
    <rect x="122" y="152" width="24" height="90" rx="12" fill="#ff7043"/>
    <rect x="338" y="152" width="24" height="90" rx="12" fill="#ff7043"/>
    <!-- Couch cushions -->
    <ellipse cx="200" cy="165" rx="44" ry="10" fill="#ffab91" opacity="0.6"/>
    <ellipse cx="290" cy="165" rx="44" ry="10" fill="#ffab91" opacity="0.6"/>
    <!-- Small figures on couch: Rylee (left) -->
    <circle cx="192" cy="138" r="14" fill="#f0d8ff"/>
    <ellipse cx="192" cy="126" rx="12" ry="6" fill="#3d1a5e"/>
    <rect x="180" y="150" width="24" height="22" rx="8" fill="#9b59b6"/>
    <!-- Brielle (right) -->
    <circle cx="268" cy="142" r="12" fill="#fce4ec"/>
    <circle cx="258" cy="133" r="9" fill="#c2185b"/>
    <circle cx="268" cy="130" r="10" fill="#c2185b"/>
    <circle cx="278" cy="133" r="9" fill="#c2185b"/>
    <circle cx="268" cy="140" r="11" fill="#fce4ec"/>
    <rect x="258" y="153" width="20" height="18" rx="7" fill="#f06292"/>
    <!-- Crayon box on floor -->
    <rect x="232" y="230" width="50" height="22" rx="4" fill="#ffd54f"/>
    <rect x="232" y="230" width="50" height="8" rx="4" fill="#ffca28"/>
    <circle cx="250" cy="219" r="3" fill="#e53935"/>
    <circle cx="262" cy="217" r="3" fill="#1565c0"/>
    <circle cx="274" cy="220" r="3" fill="#9b59b6"/>
    <rect x="248" y="208" width="5" height="18" rx="2.5" fill="#e53935" transform="rotate(-12 250 217)"/>
    <rect x="261" y="206" width="5" height="18" rx="2.5" fill="#1565c0" transform="rotate(8 263 215)"/>
  </svg>`;
}

function sceneBedroom() {
  return `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <!-- Window with moon -->
    <rect x="148" y="16" width="104" height="100" rx="8" fill="#0d2545" opacity="0.8"/>
    <rect x="148" y="16" width="104" height="100" rx="8" fill="none" stroke="#1e3a6e" stroke-width="5"/>
    <rect x="198" y="16" width="5" height="100" fill="#1e3a6e"/>
    <rect x="148" y="64" width="104" height="5" fill="#1e3a6e"/>
    <!-- Moon in window -->
    <circle cx="220" cy="50" r="24" fill="#fff9c4"/>
    <circle cx="234" cy="43" r="20" fill="#0d2545"/>
    <!-- Stars visible through window -->
    ${starField([[168,28,1.5],[240,22,1],[260,40,1.5],[158,72,1],[174,82,1.2],[242,76,1.8],[254,88,1]])}
    <!-- Wall stars -->
    ${starField([[30,30,1.2],[370,25,1.5],[350,70,1],[20,80,1.8],[390,90,1.2],[15,140,1],[380,150,1.5]])}
    <!-- Night light glow (soft) -->
    <circle cx="40" cy="200" r="30" fill="#fff9c4" opacity="0.15"/>
    <circle cx="40" cy="200" r="18" fill="#fff9c4" opacity="0.2"/>
    <rect x="30" y="200" width="20" height="28" rx="6" fill="#fff9c4" opacity="0.6"/>
    <!-- Left bed (Rylee) -->
    <rect x="10"  y="180" width="160" height="70" rx="8" fill="#9c6dd8"/>
    <rect x="10"  y="175" width="58"  height="24" rx="8" fill="#b06ed8"/>
    <!-- Blanket lumps suggesting sleeping Rylee -->
    <ellipse cx="100" cy="180" rx="60" ry="14" fill="#c39aee"/>
    <!-- Head on pillow -->
    <circle cx="40" cy="182" r="14" fill="#f0d8ff"/>
    <ellipse cx="42" cy="172" rx="12" ry="6" fill="#3d1a5e"/>
    <!-- Right bed (Brielle) -->
    <rect x="230" y="184" width="160" height="70" rx="8" fill="#f06292"/>
    <rect x="332" y="178" width="58"  height="24" rx="8" fill="#f48fb1"/>
    <!-- Blanket lumps -->
    <ellipse cx="300" cy="185" rx="55" ry="13" fill="#f8bbd0"/>
    <!-- Head on pillow -->
    <circle cx="362" cy="185" r="12" fill="#fce4ec"/>
    <circle cx="352" cy="177" r="9"  fill="#c2185b"/>
    <circle cx="362" cy="174" r="10" fill="#c2185b"/>
    <circle cx="372" cy="177" r="9"  fill="#c2185b"/>
    <circle cx="362" cy="183" r="11" fill="#fce4ec"/>
    <!-- Mom (center, reading) -->
    <circle cx="205" cy="185" r="18" fill="#f5cba7"/>
    <ellipse cx="205" cy="170" rx="18" ry="9" fill="#5d4037"/>
    <rect x="188" y="200" width="34" height="44" rx="10" fill="#ff8a65"/>
    <!-- Open book in Mom's hands -->
    <rect x="182" y="224" width="46" height="30" rx="4" fill="white" opacity="0.9"/>
    <line x1="205" y1="224" x2="205" y2="254" stroke="#bbb" stroke-width="1.5"/>
    <!-- Tiny text lines on book -->
    <rect x="187" y="230" width="15" height="2" rx="1" fill="#ccc"/>
    <rect x="187" y="235" width="13" height="2" rx="1" fill="#ccc"/>
    <rect x="187" y="240" width="15" height="2" rx="1" fill="#ccc"/>
    <rect x="209" y="230" width="15" height="2" rx="1" fill="#ccc"/>
    <rect x="209" y="235" width="13" height="2" rx="1" fill="#ccc"/>
    <rect x="209" y="240" width="14" height="2" rx="1" fill="#ccc"/>
  </svg>`;
}

function sceneStars() {
  const starData = [
    [30,20,2.5],[70,45,1.8],[110,18,1.2],[155,38,2],[195,15,1.5],[240,42,2.2],[275,20,1.5],
    [315,38,2],[355,15,1.8],[390,44,1.2],[20,75,1.5],[60,90,2],[95,68,1.2],[140,82,1.8],
    [180,60,2.5],[220,80,1.5],[260,65,2],[298,82,1.2],[340,58,2],[378,78,1.5],[15,130,2],
    [50,145,1.5],[88,120,1.8],[130,138,2.2],[168,115,1.5],[210,132,1.8],[248,118,2],[288,140,1.5],
    [328,122,2],[370,136,1.2],[40,180,1.5],[80,195,2],[118,175,1.2],[160,190,1.8],[200,170,2.2],
    [240,188,1.5],[280,175,1.8],[320,192,2],[360,170,1.2],[395,185,1.5],[25,230,1.8],[65,248,2],
    [105,225,1.5],[145,242,1.8],[185,220,2.2],[228,238,1.5],[268,222,1.8],[308,245,2],[348,228,1.5],
    [385,240,1.2]
  ];
  return `<svg viewBox="0 0 400 540" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <!-- Stars with twinkle class -->
    ${starData.map(([x,y,r],i) =>
      `<circle class="star-twinkle" cx="${x}" cy="${y}" r="${r}" fill="white" opacity="${(0.5 + Math.random()*0.5).toFixed(2)}"/>`
    ).join('\n    ')}
    <!-- Large crescent moon -->
    <circle cx="200" cy="140" r="70" fill="#fff9c4" opacity="0.12"/>
    <circle cx="200" cy="140" r="52" fill="#fff5a0" opacity="0.18"/>
    <circle cx="200" cy="140" r="40" fill="#fff59d"/>
    <circle cx="222" cy="128" r="34" fill="#050a15"/>
    <!-- Heart constellation -->
    <circle cx="120" cy="300" r="3" fill="#ff8a80"/>
    <circle cx="140" cy="288" r="3" fill="#ff8a80"/>
    <circle cx="160" cy="288" r="3" fill="#ff8a80"/>
    <circle cx="180" cy="300" r="3" fill="#ff8a80"/>
    <circle cx="168" cy="316" r="3" fill="#ff8a80"/>
    <circle cx="150" cy="330" r="3" fill="#ff8a80"/>
    <circle cx="132" cy="316" r="3" fill="#ff8a80"/>
    <line x1="120" y1="300" x2="140" y2="288" stroke="#ff8a80" stroke-width="1" opacity="0.5"/>
    <line x1="140" y1="288" x2="160" y2="288" stroke="#ff8a80" stroke-width="1" opacity="0.5"/>
    <line x1="160" y1="288" x2="180" y2="300" stroke="#ff8a80" stroke-width="1" opacity="0.5"/>
    <line x1="180" y1="300" x2="168" y2="316" stroke="#ff8a80" stroke-width="1" opacity="0.5"/>
    <line x1="168" y1="316" x2="150" y2="330" stroke="#ff8a80" stroke-width="1" opacity="0.5"/>
    <line x1="150" y1="330" x2="132" y2="316" stroke="#ff8a80" stroke-width="1" opacity="0.5"/>
    <line x1="132" y1="316" x2="120" y2="300" stroke="#ff8a80" stroke-width="1" opacity="0.5"/>
  </svg>`;
}

/* ── SVG Helper Functions ───────────────────────────────── */
function starField(stars) {
  return stars.map(([x, y, r]) =>
    `<circle class="star-twinkle" cx="${x}" cy="${y}" r="${r}" fill="white" opacity="0.85"/>`
  ).join('\n    ');
}

function sunRays(cx, cy, count, inner, outer) {
  const rays = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * 2 * Math.PI;
    const x1 = cx + Math.cos(angle) * inner;
    const y1 = cy + Math.sin(angle) * inner;
    const x2 = cx + Math.cos(angle) * outer;
    const y2 = cy + Math.sin(angle) * outer;
    rays.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#ffca28" stroke-width="3" stroke-linecap="round" opacity="0.7"/>`);
  }
  return rays.join('\n      ');
}

function flower(cx, cy, petalColor, centerColor) {
  const petals = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * 2 * Math.PI;
    const px = cx + Math.cos(angle) * 9;
    const py = cy + Math.sin(angle) * 9;
    petals.push(`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="6" fill="${petalColor}"/>`);
  }
  return petals.join('') + `<circle cx="${cx}" cy="${cy}" r="5" fill="${centerColor}"/>`;
}

function bookSpine(x, y, w, h, color) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${color}" opacity="0.9"/>`;
}

/* ── Layout Renderers ───────────────────────────────────── */
function renderCover(data) {
  return `
    <div class="scene-art">${sceneCover()}</div>
    <div class="page-inner">
      <div class="cover-body">
        <h1 class="cover-title float">${data.title.replace(/\n/g, '<br>')}</h1>
        <p class="cover-subtitle">${data.subtitle}</p>
      </div>
      <p class="cover-dedication">${data.dedication}</p>
    </div>`;
}

function renderPortraits(data) {
  return `
    <div class="scene-art">${scenePortraits()}</div>
    <div class="page-inner" style="pointer-events:none">
      <h2 class="portraits-title" style="padding-top:6px">${data.title}</h2>
      <div class="portraits-names">
        <div class="portrait-label rylee">
          <span class="name">${data.left.name}</span>
          <span class="tagline">${data.left.tagline}</span>
        </div>
        <div class="portrait-label brielle">
          <span class="name">${data.right.name}</span>
          <span class="tagline">${data.right.tagline}</span>
        </div>
      </div>
    </div>`;
}

function renderStory(data, sceneHtml) {
  const paragraphs = data.text.map(t => `<p>${t}</p>`).join('');
  return `
    <div class="scene-art">${sceneHtml}</div>
    <div class="story-body">
      <h2 class="chapter-title">${data.title.replace(/\n/g, '<br>')}</h2>
      <div class="story-text">${paragraphs}</div>
    </div>`;
}

function renderPhotoStory(data) {
  const paragraphs = data.text.map(t => `<p>${t}</p>`).join('');
  const dateHtml   = data.date ? `<span class="post-date">${data.date}</span>` : '';
  return `
    <div class="photo-area">
      <img src="${data.photo}" alt="${data.title}" loading="lazy"
           onerror="this.closest('.photo-area').classList.add('photo-missing')">
    </div>
    <div class="story-body">
      ${dateHtml}
      <h2 class="chapter-title">${data.title.replace(/\n/g, '<br>')}</h2>
      <div class="story-text">${paragraphs}</div>
    </div>`;
}

function renderEnding(data) {
  const paragraphs = data.text.map(t => `<p class="ending-text">${t}</p>`).join('');
  return `
    <div class="scene-art">${sceneStars()}</div>
    <div class="page-inner">
      <div class="ending-body">
        <h2 class="ending-title">${data.title}</h2>
        ${paragraphs}
        <p class="ending-dedication">${data.dedication.replace(/\n/g, '<br>')}</p>
      </div>
    </div>`;
}

/* ── Scene Art Router ───────────────────────────────────── */
const SCENE_MAP = {
  morning:       sceneMorning,
  backyard:      sceneBackyard,
  'living-room': sceneLivingRoom,
  bedroom:       sceneBedroom
};

/* ── Core Rendering ─────────────────────────────────────── */
function renderCurrentPage() {
  const data   = STORY[currentPage];
  const page   = document.getElementById('page');
  page.className = `page scene-${data.scene} layout-${data.layout}`;

  let html;
  switch (data.layout) {
    case 'cover':     html = renderCover(data);                          break;
    case 'portraits': html = renderPortraits(data);                      break;
    case 'story':       html = renderStory(data, SCENE_MAP[data.scene]()); break;
    case 'photo-story': html = renderPhotoStory(data);                    break;
    case 'ending':      html = renderEnding(data);                        break;
  }

  page.innerHTML = html;
  updateNav();
  updateDots();
}

function updateNav() {
  document.getElementById('prev-btn').disabled = currentPage === 0;
  document.getElementById('next-btn').disabled = currentPage === STORY.length - 1;
}

function updateDots() {
  document.getElementById('dots').innerHTML = STORY.map((_, i) =>
    `<span class="dot${i === currentPage ? ' active' : ''}" onclick="goToPage(${i})"></span>`
  ).join('');
}

/* ── Navigation ─────────────────────────────────────────── */
function goToPage(newIndex, dir) {
  if (isAnimating || newIndex === currentPage) return;
  if (newIndex < 0 || newIndex >= STORY.length)  return;

  isAnimating = true;
  const direction = dir || (newIndex > currentPage ? 'next' : 'prev');
  const page      = document.getElementById('page');
  const outClass  = direction === 'next' ? 'slide-out-left'  : 'slide-out-right';
  const inClass   = direction === 'next' ? 'slide-in-right'  : 'slide-in-left';

  page.classList.add(outClass);

  setTimeout(() => {
    page.classList.remove(outClass);
    currentPage = newIndex;
    renderCurrentPage();
    void page.offsetHeight; // force reflow
    page.classList.add(inClass);

    setTimeout(() => {
      page.classList.remove(inClass);
      isAnimating = false;
    }, 340);
  }, 290);
}

function nextPage() { goToPage(currentPage + 1, 'next'); }
function prevPage() { goToPage(currentPage - 1, 'prev'); }

/* ── Input Bindings ─────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextPage(); }
  if (e.key === 'ArrowLeft')                   { e.preventDefault(); prevPage(); }
});

document.getElementById('prev-btn').addEventListener('click', prevPage);
document.getElementById('next-btn').addEventListener('click', nextPage);

document.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

document.addEventListener('touchend', e => {
  const dx = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(dx) > 48) { dx > 0 ? nextPage() : prevPage(); }
}, { passive: true });

/* ── Boot ───────────────────────────────────────────────── */
renderCurrentPage();
