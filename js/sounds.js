/* ══════════════════════════════════════════════════
   SFX — Web Audio API, zero external files
   All sounds generated programmatically.
   ══════════════════════════════════════════════════ */

const SFX = (() => {
  let ctx = null;
  let muted = JSON.parse(localStorage.getItem('sfx-muted') || 'false');

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone(freq, dur, type = 'sine', vol = 0.28, start = 0) {
    if (muted) return;
    const c = getCtx();
    const osc  = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime + start);
    gain.gain.setValueAtTime(0, c.currentTime + start);
    gain.gain.linearRampToValueAtTime(vol, c.currentTime + start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + start + dur);
    osc.start(c.currentTime + start);
    osc.stop(c.currentTime + start + dur + 0.02);
  }

  function noise(dur, vol = 0.06, start = 0) {
    if (muted) return;
    const c = getCtx();
    const buf    = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
    const data   = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src    = c.createBufferSource();
    const filter = c.createBiquadFilter();
    const gain   = c.createGain();
    src.buffer = buf;
    filter.type = 'bandpass';
    filter.frequency.value = 1200;
    filter.Q.value = 0.5;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(c.destination);
    gain.gain.setValueAtTime(vol, c.currentTime + start);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + start + dur);
    src.start(c.currentTime + start);
  }

  return {
    get muted() { return muted; },

    toggleMute() {
      muted = !muted;
      localStorage.setItem('sfx-muted', JSON.stringify(muted));
      return muted;
    },

    // Bright ascending arpeggio — game correct answer
    correct() {
      [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.22, 'sine', 0.28, i * 0.09));
    },

    // Gentle descending — game wrong answer
    wrong() {
      tone(320, 0.18, 'sine', 0.22, 0);
      tone(240, 0.25, 'sine', 0.18, 0.12);
    },

    // Soft whoosh + pitch — page turn
    pageTurn(dir = 'right') {
      noise(0.12, 0.05);
      tone(dir === 'right' ? 700 : 500, 0.1, 'sine', 0.1, 0.02);
      tone(dir === 'right' ? 950 : 350, 0.08, 'sine', 0.07, 0.08);
    },

    // Magical sparkle — open story
    open() {
      [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, 0.18, 'sine', 0.22, i * 0.07));
    },

    // Descending close
    close() {
      [1047, 784, 659, 523].forEach((f, i) => tone(f, 0.16, 'sine', 0.18, i * 0.07));
    },

    // Soft tick — timer countdown
    tick() {
      tone(1200, 0.04, 'square', 0.06);
    },

    // Lullaby chime — bedtime alarm
    alarm() {
      const melody = [659, 784, 1047, 784, 659, 523, 659];
      melody.forEach((f, i) => tone(f, 0.3, 'sine', 0.25, i * 0.32));
    },

    // Cheerful open — games overlay
    gamesOpen() {
      [523, 784, 1047].forEach((f, i) => tone(f, 0.16, 'triangle', 0.22, i * 0.08));
    },

    // Animal sound — playful bleat for animal-sounds game
    animalSound() {
      tone(440, 0.12, 'sawtooth', 0.15, 0);
      tone(520, 0.15, 'sawtooth', 0.12, 0.08);
      tone(440, 0.1, 'sawtooth', 0.1, 0.18);
    },
  };
})();
