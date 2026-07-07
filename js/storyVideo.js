/* ══════════════════════════════════════════════════
   Story Videos — animated video versions of select
   bedtime stories (rendered with Remotion, see /video)
   ══════════════════════════════════════════════════ */

/* Story IDs that have a matching video in assets/videos/.
   Add an entry here once a new story is rendered. */
const STORY_VIDEOS = {
  S011: 'assets/videos/S011.mp4',
  S031: 'assets/videos/S031.mp4',
  S045: 'assets/videos/S045.mp4',
  S017: 'assets/videos/S017.mp4',
};

function hasStoryVideo(storyId) {
  return Object.prototype.hasOwnProperty.call(STORY_VIDEOS, storyId);
}

let _videoTrigger = null;
let _videoOpenTimer = null;
let _videoCloseTimer = null;

function openStoryVideo(story) {
  const src = STORY_VIDEOS[story.id];
  if (!src) return;
  if (typeof SFX !== 'undefined') SFX.open();

  clearTimeout(_videoCloseTimer);
  _videoTrigger = document.activeElement;
  const overlay = document.getElementById('video-overlay');
  const player  = document.getElementById('video-player');
  const title   = document.getElementById('video-title');

  title.textContent = `🎬 ${story.title}`;
  // Lazy: only point the <video> at its file once the overlay is opened.
  if (player.getAttribute('src') !== src) {
    player.setAttribute('src', src);
    player.load();
  }

  overlay.classList.remove('hidden', 'closing');
  overlay.classList.add('opening');
  clearTimeout(_videoOpenTimer);
  _videoOpenTimer = setTimeout(() => {
    overlay.classList.remove('opening');
    const closeBtn = document.getElementById('video-close');
    if (closeBtn) closeBtn.focus();
  }, 50);

  player.play().catch(() => {/* autoplay may be blocked — controls remain available */});
}

function closeStoryVideo() {
  const overlay = document.getElementById('video-overlay');
  const player  = document.getElementById('video-player');
  player.pause();
  clearTimeout(_videoOpenTimer);
  overlay.classList.add('closing');
  overlay.classList.remove('opening');
  clearTimeout(_videoCloseTimer);
  _videoCloseTimer = setTimeout(() => {
    overlay.classList.add('hidden');
    overlay.classList.remove('closing');
    if (_videoTrigger) { _videoTrigger.focus(); _videoTrigger = null; }
  }, 260);
}

/* ── Focus trap (mirrors games.js pattern) ──────────── */
function _videoFocusable(container) {
  return [...container.querySelectorAll(
    'button, [href], input, select, textarea, video, [tabindex]:not([tabindex="-1"])'
  )].filter(el => !el.disabled && el.offsetParent !== null);
}

function _trapVideoFocus(e) {
  const overlay = document.getElementById('video-overlay');
  if (!overlay || overlay.classList.contains('hidden')) return;
  if (e.key === 'Escape') { closeStoryVideo(); return; }
  if (e.key !== 'Tab') return;
  const focusable = _videoFocusable(overlay);
  if (!focusable.length) return;
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];
  if (e.shiftKey) {
    if (document.activeElement === first) { e.preventDefault(); last.focus(); }
  } else {
    if (document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const overlay  = document.getElementById('video-overlay');
  const closeBtn = document.getElementById('video-close');
  if (closeBtn) closeBtn.addEventListener('click', closeStoryVideo);
  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target === e.currentTarget) closeStoryVideo();
    });
  }
  document.addEventListener('keydown', _trapVideoFocus);
});
