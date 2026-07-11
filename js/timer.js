/* ══════════════════════════════════════════════════
   Bedtime Timer — parental reading time control
   ══════════════════════════════════════════════════ */

const TIMER = (() => {
  const PRESETS = [5, 10, 15, 20]; // minutes
  let remaining = 0;    // seconds
  let interval  = null;
  let state     = 'idle'; // idle | running | expired
  let _expiredTrigger = null;

  /* ── Persist across page reloads ────────────────── */
  function save() {
    try { localStorage.setItem('timer-state', JSON.stringify({ remaining, state, savedAt: Date.now() })); } catch {}
  }

  function restore() {
    try {
      const d = JSON.parse(localStorage.getItem('timer-state') || 'null');
      if (!d || d.state !== 'running') return;
      const elapsed = Math.floor((Date.now() - d.savedAt) / 1000);
      remaining = Math.max(0, d.remaining - elapsed);
      if (remaining > 0) { state = 'running'; _start(); }
      else               { state = 'expired'; _onExpire(); }
    } catch {}
  }

  /* ── Internal ─────────────────────────────────────── */
  function _start() {
    clearInterval(interval);
    interval = setInterval(() => {
      remaining = Math.max(0, remaining - 1);
      if (remaining % 60 === 0 && remaining > 0 && typeof SFX !== 'undefined') SFX.tick();
      _render();
      save();
      if (remaining <= 0) { clearInterval(interval); state = 'expired'; _onExpire(); save(); }
    }, 1000);
    _render();
  }

  function _onExpire() {
    _render();
    _showExpiredOverlay();
    if (typeof SFX !== 'undefined') setTimeout(() => SFX.alarm(), 200);
  }

  function _fmt(secs) {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  function _render() {
    const pill = document.getElementById('timer-pill');
    if (!pill) return;
    if (state === 'idle') {
      pill.classList.add('hidden');
      return;
    }
    pill.classList.remove('hidden');
    if (state === 'expired') {
      pill.innerHTML = `<span class="timer-icon">🌙</span><span class="timer-time">Bedtime!</span>`;
      pill.classList.add('timer-expired');
      return;
    }
    pill.classList.remove('timer-expired');
    const urgent = remaining <= 60;
    pill.innerHTML = `
      <span class="timer-icon">${urgent ? '⚠️' : '⏰'}</span>
      <span class="timer-time ${urgent ? 'timer-urgent' : ''}">${_fmt(remaining)}</span>
      <button class="timer-stop-btn" aria-label="Stop timer">✕</button>
    `;
    pill.querySelector('.timer-stop-btn').addEventListener('click', e => {
      e.stopPropagation();
      TIMER.stop();
    });
  }

  function _showExpiredOverlay() {
    const el = document.getElementById('timer-expired-overlay');
    if (!el) return;
    _expiredTrigger = document.activeElement;
    el.classList.remove('hidden');
    el.classList.add('opening');
    setTimeout(() => el.classList.remove('opening'), 400);
    const dismissBtn = document.getElementById('timer-dismiss');
    if (dismissBtn) dismissBtn.focus();
  }

  function _trapExpiredFocus(e) {
    const el = document.getElementById('timer-expired-overlay');
    if (!el || el.classList.contains('hidden')) return;
    if (e.key === 'Tab') {
      // Only one focusable control in this dialog — keep focus locked on it.
      e.preventDefault();
      document.getElementById('timer-dismiss')?.focus();
    } else if (e.key === 'Escape') {
      TIMER.dismissExpiry();
    }
  }

  function _showSettings() {
    const popover = document.getElementById('timer-popover');
    if (!popover) return;
    popover.classList.toggle('hidden');
  }

  /* ── Public API ──────────────────────────────────── */
  return {
    get state()     { return state; },
    get remaining() { return remaining; },

    start(minutes) {
      remaining = minutes * 60;
      state     = 'running';
      save();
      _start();
      const popover = document.getElementById('timer-popover');
      if (popover) popover.classList.add('hidden');
    },

    stop() {
      clearInterval(interval);
      remaining = 0;
      state     = 'idle';
      try { localStorage.removeItem('timer-state'); } catch {}
      _render();
    },

    dismissExpiry() {
      const el = document.getElementById('timer-expired-overlay');
      if (el) el.classList.add('hidden');
      TIMER.stop();
      if (_expiredTrigger) { _expiredTrigger.focus(); _expiredTrigger = null; }
    },

    init() {
      // Pill click → show settings (if idle)
      const pill = document.getElementById('timer-pill');
      if (pill) pill.addEventListener('click', () => { if (state === 'idle') _showSettings(); });

      // Timer button → show/hide settings
      const btn = document.getElementById('timer-btn');
      if (btn) btn.addEventListener('click', _showSettings);

      // Preset buttons
      document.querySelectorAll('.timer-preset').forEach(b => {
        b.addEventListener('click', () => TIMER.start(parseInt(b.dataset.min)));
      });

      // Dismiss expired overlay
      const dismissBtn = document.getElementById('timer-dismiss');
      if (dismissBtn) dismissBtn.addEventListener('click', () => TIMER.dismissExpiry());
      document.addEventListener('keydown', _trapExpiredFocus);

      // Close popover on outside click
      document.addEventListener('click', e => {
        const pop = document.getElementById('timer-popover');
        const btn = document.getElementById('timer-btn');
        if (pop && !pop.contains(e.target) && e.target !== btn) {
          pop.classList.add('hidden');
        }
      });

      // SFX mute toggle
      const sfxToggle = document.getElementById('sfx-toggle');
      if (sfxToggle) {
        const updateSfxBtn = () => {
          const m = typeof SFX !== 'undefined' && SFX.muted;
          sfxToggle.textContent = m ? '🔇 Sound Off' : '🔊 Sound On';
        };
        updateSfxBtn();
        sfxToggle.addEventListener('click', () => {
          if (typeof SFX !== 'undefined') { SFX.toggleMute(); updateSfxBtn(); }
        });
      }

      // Restore state if page was reloaded mid-timer
      restore();

      // Render timer-expired-overlay stars
      const starsEl = document.getElementById('timer-stars');
      if (starsEl) {
        for (let i = 0; i < 24; i++) {
          const s = document.createElement('div');
          s.className = 'expired-star';
          s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*3}s;`;
          starsEl.appendChild(s);
        }
      }
    },
  };
})();

document.addEventListener('DOMContentLoaded', () => TIMER.init());
