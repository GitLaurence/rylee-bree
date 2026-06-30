/* ══════════════════════════════════════════════════
   Toddler Games — Rylee & Bree Bedtime Stories
   Three mini-games for ages 1-3:
   1. Color Pop  — tap the matching color bubble
   2. Star Count — count 1-3 stars and tap the number
   3. Find Friend — tap the right character face
   ══════════════════════════════════════════════════ */

/* ── Constants ──────────────────────────────────── */
const GAME_SHAPES = [
  { name: 'Circle',   color: '#FF4757', svg: '<circle cx="40" cy="40" r="34" fill="white" opacity=".92"/>' },
  { name: 'Square',   color: '#FFD700', svg: '<rect x="8" y="8" width="64" height="64" rx="10" fill="white" opacity=".92"/>' },
  { name: 'Triangle', color: '#4CAF50', svg: '<polygon points="40,8 72,72 8,72" fill="white" opacity=".92"/>' },
  { name: 'Star',     color: '#8B44F0', svg: '<polygon points="40,4 47,29 75,29 53,46 61,72 40,54 19,72 27,46 5,29 33,29" fill="white" opacity=".92"/>' },
  { name: 'Heart',    color: '#FF3E9D', svg: '<path d="M40,68 C40,68 8,48 8,26 A16,16 0 0,1 40,20 A16,16 0 0,1 72,26 C72,48 40,68 40,68Z" fill="white" opacity=".92"/>' },
];

const GAME_COLORS = [
  { name: 'Red',    value: '#FF4757', emoji: '❤️' },
  { name: 'Yellow', value: '#FFD700', emoji: '⭐' },
  { name: 'Blue',   value: '#00B4D8', emoji: '💧' },
  { name: 'Pink',   value: '#FF6B9D', emoji: '🌸' },
  { name: 'Green',  value: '#4CAF50', emoji: '🍀' },
  { name: 'Purple', value: '#8B44F0', emoji: '🔮' },
  { name: 'Orange', value: '#FF6B35', emoji: '🍊' },
];

const FRIENDS = [
  { id: 'rylee',    name: 'Rylee',    color: '#8B44F0', emoji: '🟣' },
  { id: 'brielle', name: 'Bree',     color: '#FF3E9D', emoji: '🩷' },
  { id: 'mary-joy',name: 'Mary Joy', color: '#FF6B35', emoji: '🌸' },
  { id: 'astley',  name: 'Astley',   color: '#00B4D8', emoji: '💙' },
];

const CHEERS = ['Yay! 🎉', 'Great job! ⭐', 'Woohoo! 🎊', 'Amazing! 🌟', 'So smart! 💕', 'You did it! 🎈'];
const OOPS   = ['Try again! 🌈', 'Almost! 💫', 'Keep going! 🌟'];

let gameState = {
  current: null,  // 'color-pop' | 'star-count' | 'find-friend'
  score: 0,
  round: 0,
  maxRounds: 5,
  target: null,
  answering: false,
};

/* ── Helpers ─────────────────────────────────────── */
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function cheer() { return pick(CHEERS); }

function celebrateEffect(el) {
  el.classList.add('game-correct-flash');
  setTimeout(() => el.classList.remove('game-correct-flash'), 600);
}

function spawnConfetti(container) {
  const colors = ['#FFD700','#FF6B9D','#8B44F0','#00B4D8','#FF6B35','#4CAF50'];
  for (let i = 0; i < 18; i++) {
    const dot = document.createElement('div');
    dot.className = 'confetti-dot';
    dot.style.cssText = `
      left: ${10 + Math.random() * 80}%;
      background: ${pick(colors)};
      animation-delay: ${Math.random() * 0.4}s;
      width: ${8 + Math.random() * 10}px;
      height: ${8 + Math.random() * 10}px;
    `;
    container.appendChild(dot);
    setTimeout(() => dot.remove(), 1400);
  }
}

function showFeedback(correct, container) {
  if (typeof SFX !== 'undefined') correct ? SFX.correct() : SFX.wrong();
  const fb = document.getElementById('game-feedback');
  fb.textContent = correct ? cheer() : pick(OOPS);
  fb.className = 'game-feedback ' + (correct ? 'correct' : 'wrong');
  fb.style.opacity = '1';
  if (correct) spawnConfetti(container);
  setTimeout(() => { fb.style.opacity = '0'; }, 900);
}

/* ── Overlay open/close ──────────────────────────── */
let _gamesTrigger = null;

function openGames() {
  if (typeof SFX !== 'undefined') SFX.gamesOpen();
  _gamesTrigger = document.activeElement;
  const overlay = document.getElementById('games-overlay');
  overlay.classList.remove('hidden');
  overlay.classList.add('opening');
  setTimeout(() => {
    overlay.classList.remove('opening');
    const first = getFocusable(overlay)[0];
    if (first) first.focus();
  }, 50);
  renderGameMenu();
}

function closeGames() {
  const overlay = document.getElementById('games-overlay');
  overlay.classList.add('closing');
  setTimeout(() => {
    overlay.classList.add('hidden');
    overlay.classList.remove('closing');
    gameState.current = null;
    if (_gamesTrigger) { _gamesTrigger.focus(); _gamesTrigger = null; }
  }, 260);
}

function renderGameMenu() {
  const content = document.getElementById('games-content');
  content.innerHTML = `
    <h2 class="game-title">Let's Play! 🎮</h2>
    <p class="game-subtitle">Pick a game</p>
    <div class="game-menu">
      <button class="game-menu-btn" data-game="color-pop" style="--gc:#FF4757">
        <span class="game-menu-icon">🎨</span>
        <span class="game-menu-name">Colors!</span>
      </button>
      <button class="game-menu-btn" data-game="star-count" style="--gc:#FFD700">
        <span class="game-menu-icon">⭐</span>
        <span class="game-menu-name">Count!</span>
      </button>
      <button class="game-menu-btn" data-game="find-friend" style="--gc:#8B44F0">
        <span class="game-menu-icon">👧</span>
        <span class="game-menu-name">Friends!</span>
      </button>
      <button class="game-menu-btn" data-game="shape-match" style="--gc:#FF3E9D">
        <span class="game-menu-icon">🔷</span>
        <span class="game-menu-name">Shapes!</span>
      </button>
    </div>
  `;
  content.querySelectorAll('.game-menu-btn').forEach(btn => {
    btn.addEventListener('click', () => startGame(btn.dataset.game));
  });
}

/* ── Game start ──────────────────────────────────── */
function startGame(gameId) {
  gameState.current  = gameId;
  gameState.score    = 0;
  gameState.round    = 0;
  gameState.answering = false;
  nextRound();
}

function nextRound() {
  gameState.round++;
  gameState.answering = false;
  if (gameState.round > gameState.maxRounds) {
    showGameOver();
    return;
  }
  switch (gameState.current) {
    case 'color-pop':   renderColorPop();   break;
    case 'star-count':  renderStarCount();  break;
    case 'find-friend': renderFindFriend(); break;
    case 'shape-match': renderShapeMatch(); break;
  }
}

function showGameOver() {
  const content = document.getElementById('games-content');
  const stars   = gameState.score >= 4 ? '⭐⭐⭐' : gameState.score >= 2 ? '⭐⭐' : '⭐';
  const msg     = gameState.score >= 4 ? 'Amazing!' : gameState.score >= 2 ? 'Great job!' : 'Good try!';
  content.innerHTML = `
    <div class="game-over">
      <div class="game-over-stars">${stars}</div>
      <h2 class="game-title">${msg}</h2>
      <p class="game-subtitle">You got ${gameState.score} out of ${gameState.maxRounds}!</p>
      <div class="game-over-btns">
        <button class="game-action-btn" id="game-play-again">Play Again 🎉</button>
        <button class="game-action-btn game-secondary" id="game-menu-btn">More Games 🎮</button>
      </div>
    </div>
  `;
  spawnConfetti(content);
  document.getElementById('game-play-again').addEventListener('click', () => startGame(gameState.current));
  document.getElementById('game-menu-btn').addEventListener('click', renderGameMenu);
}

/* ── Game 1: Color Pop ───────────────────────────── */
function renderColorPop() {
  const target   = pick(GAME_COLORS);
  gameState.target = target.value;
  const choices  = shuffle([target, ...shuffle(GAME_COLORS.filter(c => c.value !== target.value)).slice(0, 3)]);

  const content = document.getElementById('games-content');
  content.innerHTML = `
    <div class="game-round-bar">
      <span class="game-round">Round ${gameState.round}/${gameState.maxRounds}</span>
      <span class="game-score">⭐ ${gameState.score}</span>
    </div>
    <h2 class="game-prompt">Tap the <strong style="color:${target.value}">${target.name}</strong> bubble!</h2>
    <div class="color-pop-grid" id="color-pop-grid">
      ${choices.map(c => `
        <button class="color-bubble" data-color="${c.value}"
          style="background:${c.value}; box-shadow: inset -3px -4px 10px rgba(0,0,0,.2), 0 8px 20px ${c.value}88;">
          <span class="color-bubble-shine"></span>
        </button>
      `).join('')}
    </div>
    <div class="game-feedback" id="game-feedback"></div>
  `;

  content.querySelectorAll('.color-bubble').forEach(btn => {
    btn.addEventListener('click', () => {
      if (gameState.answering) return;
      gameState.answering = true;
      const correct = btn.dataset.color === gameState.target;
      if (correct) { gameState.score++; celebrateEffect(btn); }
      showFeedback(correct, content);
      setTimeout(nextRound, 1100);
    });
  });
}

/* ── Game 2: Star Count ──────────────────────────── */
function renderStarCount() {
  const count   = 1 + Math.floor(Math.random() * 3); // 1, 2, or 3
  gameState.target = count;
  const choices = shuffle([1, 2, 3]);

  const content = document.getElementById('games-content');
  const starRow = Array.from({length: count}, () => `<span class="count-star">⭐</span>`).join('');
  content.innerHTML = `
    <div class="game-round-bar">
      <span class="game-round">Round ${gameState.round}/${gameState.maxRounds}</span>
      <span class="game-score">⭐ ${gameState.score}</span>
    </div>
    <h2 class="game-prompt">How many stars?</h2>
    <div class="star-display" id="star-display">${starRow}</div>
    <div class="number-grid">
      ${choices.map(n => `
        <button class="number-btn" data-num="${n}"
          style="background: linear-gradient(135deg,#FFD700,#FF9800);">
          ${n}
        </button>
      `).join('')}
    </div>
    <div class="game-feedback" id="game-feedback"></div>
  `;

  content.querySelectorAll('.number-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (gameState.answering) return;
      gameState.answering = true;
      const correct = parseInt(btn.dataset.num) === gameState.target;
      if (correct) { gameState.score++; celebrateEffect(btn); }
      showFeedback(correct, content);
      setTimeout(nextRound, 1100);
    });
  });
}

/* ── Game 3: Find the Friend ─────────────────────── */
function renderFindFriend() {
  const target  = pick(FRIENDS);
  gameState.target = target.id;
  const choices = shuffle(FRIENDS);

  const content = document.getElementById('games-content');
  content.innerHTML = `
    <div class="game-round-bar">
      <span class="game-round">Round ${gameState.round}/${gameState.maxRounds}</span>
      <span class="game-score">⭐ ${gameState.score}</span>
    </div>
    <h2 class="game-prompt">Find <strong style="color:${target.color}">${target.name}</strong>!</h2>
    <div class="friend-grid" id="friend-grid">
      ${choices.map(f => `
        <button class="friend-btn" data-friend="${f.id}"
          style="--fcolor:${f.color}; border-color:${f.color};">
          <svg viewBox="-55 -205 110 215" width="80" height="80" aria-hidden="true">
            <defs>
              <radialGradient id="fg-body-${f.id}" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stop-color="${lighten(f.color)}"/>
                <stop offset="100%" stop-color="${f.color}"/>
              </radialGradient>
            </defs>
            ${friendFace(f)}
          </svg>
          <span class="friend-name">${f.name}</span>
        </button>
      `).join('')}
    </div>
    <div class="game-feedback" id="game-feedback"></div>
  `;

  content.querySelectorAll('.friend-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (gameState.answering) return;
      gameState.answering = true;
      const correct = btn.dataset.friend === gameState.target;
      if (correct) { gameState.score++; celebrateEffect(btn); }
      showFeedback(correct, content);
      setTimeout(nextRound, 1100);
    });
  });
}

/* ── Game 4: Shape Match ─────────────────────────── */
function renderShapeMatch() {
  const target  = pick(GAME_SHAPES);
  gameState.target = target.name;
  const choices = shuffle([target, ...shuffle(GAME_SHAPES.filter(s => s.name !== target.name)).slice(0, 3)]);

  const content = document.getElementById('games-content');
  content.innerHTML = `
    <div class="game-round-bar">
      <span class="game-round">Round ${gameState.round}/${gameState.maxRounds}</span>
      <span class="game-score">⭐ ${gameState.score}</span>
    </div>
    <h2 class="game-prompt">Tap the <strong style="color:${target.color}">${target.name}</strong>!</h2>
    <div class="color-pop-grid" id="shape-grid">
      ${choices.map(s => `
        <button class="color-bubble shape-bubble" data-shape="${s.name}"
          style="background:${s.color}; box-shadow: inset -3px -4px 10px rgba(0,0,0,.2), 0 8px 20px ${s.color}88;">
          <svg viewBox="0 0 80 80" width="62" height="62" aria-hidden="true">${s.svg}</svg>
        </button>
      `).join('')}
    </div>
    <div class="game-feedback" id="game-feedback"></div>
  `;

  content.querySelectorAll('.shape-bubble').forEach(btn => {
    btn.addEventListener('click', () => {
      if (gameState.answering) return;
      gameState.answering = true;
      const correct = btn.dataset.shape === gameState.target;
      if (correct) { gameState.score++; celebrateEffect(btn); }
      showFeedback(correct, content);
      setTimeout(nextRound, 1100);
    });
  });
}

function lighten(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  const lr = Math.min(255, r + 60);
  const lg = Math.min(255, g + 60);
  const lb = Math.min(255, b + 60);
  return `rgb(${lr},${lg},${lb})`;
}

function friendFace(f) {
  const faceColors = {
    'rylee':     { skin: '#FFD5B0', hair: '#7B3F00', dress: '#8B44F0', irisC: '#8B44F0' },
    'brielle':   { skin: '#FFDAC1', hair: '#A0522D', dress: '#FF3E9D', irisC: '#CC2277' },
    'mary-joy':  { skin: '#FFDAAA', hair: '#5C3317', dress: '#FF6B35', irisC: '#B35A00' },
    'astley':    { skin: '#FFD5B0', hair: '#3B2305', dress: '#00B4D8', irisC: '#0077A8' },
  };
  const c = faceColors[f.id];
  return `
    <!-- Body -->
    <ellipse cx="0" cy="-60" rx="22" ry="28" fill="${c.dress}"/>
    <!-- Head -->
    <circle cx="0" cy="-155" r="38" fill="${c.skin}"/>
    <!-- Hair -->
    <ellipse cx="0" cy="-185" rx="30" ry="16" fill="${c.hair}"/>
    <!-- Eyes -->
    <circle cx="-11" cy="-157" r="7" fill="white"/>
    <circle cx="11" cy="-157" r="7" fill="white"/>
    <circle cx="-11" cy="-157" r="4.5" fill="${c.irisC}"/>
    <circle cx="11" cy="-157" r="4.5" fill="${c.irisC}"/>
    <circle cx="-9" cy="-159" r="1.5" fill="white"/>
    <circle cx="13" cy="-159" r="1.5" fill="white"/>
    <!-- Smile -->
    <path d="M-9,-144 Q0,-138 9,-144" stroke="#CC6644" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <!-- Cheeks -->
    <ellipse cx="-18" cy="-148" rx="6" ry="4" fill="${f.color}" opacity=".35"/>
    <ellipse cx="18" cy="-148" rx="6" ry="4" fill="${f.color}" opacity=".35"/>
  `;
}

/* ── Focus trap ──────────────────────────────────── */
function getFocusable(container) {
  return [...container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )].filter(el => !el.disabled && el.offsetParent !== null);
}

function trapFocus(e) {
  const overlay = document.getElementById('games-overlay');
  if (overlay.classList.contains('hidden')) return;
  const focusable = getFocusable(overlay);
  if (!focusable.length) return;
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];
  if (e.key === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  }
  if (e.key === 'Escape') closeGames();
}

/* ── Init ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const gamesBtn = document.getElementById('games-btn');
  const gamesClose = document.getElementById('games-close');

  if (gamesBtn)   gamesBtn.addEventListener('click', openGames);
  if (gamesClose) gamesClose.addEventListener('click', closeGames);

  // Close on overlay backdrop click
  document.getElementById('games-overlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeGames();
  });

  // Focus trap
  document.addEventListener('keydown', trapFocus);
});
