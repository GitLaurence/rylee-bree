/* ══════════════════════════════════════════════════
   Bedtime Timer — parental reading time control
   ══════════════════════════════════════════════════ */

const TIMER = (() => {
  const PRESETS = [5, 10, 15, 20]; // minutes
  let remaining = 0;    // seconds
  let interval  = null;
  let state     = 'idle'; // idle | running | expired

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

  let _lastAnnounceMinute = null;
  let _lastRenderedState = null;

  function _announce(msg) {
    const el = document.getElementById('timer-announce');
    if (el) el.textContent = msg;
  }

  function _buildPillContent(pill, urgent) {
    pill.innerHTML = `
      <span class="timer-icon">${urgent ? '⚠️' : '⏰'}</span>
      <span class="timer-time ${urgent ? 'timer-urgent' : ''}" id="timer-time-text">${_fmt(remaining)}</span>
      <button class="timer-stop-btn" aria-label="Stop timer">✕</button>
    `;
    pill.querySelector('.timer-stop-btn').addEventListener('click', e => {
      e.stopPropagation();
      TIMER.stop();
    });
  }

  function _render() {
    const pill = document.getElementById('timer-pill');
    if (!pill) return;
    if (state === 'idle') {
      pill.classList.add('hidden');
      _lastRenderedState = state;
      return;
    }
    pill.classList.remove('hidden');
    if (state === 'expired') {
      pill.innerHTML = `<span class="timer-icon">🌙</span><span class="timer-time">Bedtime!</span>`;
      pill.classList.add('timer-expired');
      if (_lastRenderedState !== 'expired') _announce('Time for sleep! Reading time is up.');
      _lastRenderedState = state;
      return;
    }
    pill.classList.remove('timer-expired');
    const urgent = remaining <= 60;
    // Only rebuild the whole pill (which would drop keyboard focus from the
    // stop button) when the structure actually needs to change; otherwise
    // just update the time text in place every tick.
    const timeEl = pill.querySelector('#timer-time-text');
    if (_lastRenderedState !== 'running' || !timeEl) {
      _buildPillContent(pill, urgent);
    } else {
      timeEl.textContent = _fmt(remaining);
      timeEl.classList.toggle('timer-urgent', urgent);
      pill.querySelector('.timer-icon').textContent = urgent ? '⚠️' : '⏰';
    }
    _lastRenderedState = state;

    // Announce sparingly (once per minute, and once when crossing into the
    // final minute) instead of every second, so screen readers aren't
    // flooded with the ticking countdown.
    const minuteMark = Math.ceil(remaining / 60);
    if (remaining > 0 && remaining % 60 === 0 && _lastAnnounceMinute !== minuteMark) {
      _announce(`${minuteMark} minute${minuteMark === 1 ? '' : 's'} left`);
      _lastAnnounceMinute = minuteMark;
    } else if (urgent && _lastAnnounceMinute !== 0) {
      _announce('Less than a minute left');
      _lastAnnounceMinute = 0;
    }
  }

  let _expiredTrigger = null;

  function _showExpiredOverlay() {
    const el = document.getElementById('timer-expired-overlay');
    if (!el) return;
    _expiredTrigger = document.activeElement;
    el.classList.remove('hidden');
    el.classList.add('opening');
    setTimeout(() => {
      el.classList.remove('opening');
      const dismissBtn = document.getElementById('timer-dismiss');
      if (dismissBtn) dismissBtn.focus();
    }, 400);
  }

  function _expiredFocusable(container) {
    return [...container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )].filter(el => !el.disabled && el.offsetParent !== null);
  }

  function _trapExpiredFocus(e) {
    const el = document.getElementById('timer-expired-overlay');
    if (!el || el.classList.contains('hidden')) return;
    if (e.key === 'Escape') { TIMER.dismissExpiry(); return; }
    if (e.key !== 'Tab') return;
    const focusable = _expiredFocusable(el);
    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
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
      _lastRenderedState = null;
      _lastAnnounceMinute = null;
      save();
      _start();
      const popover = document.getElementById('timer-popover');
      if (popover) popover.classList.add('hidden');
    },

    stop() {
      clearInterval(interval);
      remaining = 0;
      state     = 'idle';
      _lastRenderedState = null;
      _lastAnnounceMinute = null;
      try { localStorage.removeItem('timer-state'); } catch {}
      _render();
    },

    dismissExpiry() {
      const el = document.getElementById('timer-expired-overlay');
      if (el) el.classList.add('hidden');
      if (_expiredTrigger) { _expiredTrigger.focus(); _expiredTrigger = null; }
      TIMER.stop();
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

      // Focus trap + Escape-to-dismiss for the expired overlay
      document.addEventListener('keydown', _trapExpiredFocus);

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
