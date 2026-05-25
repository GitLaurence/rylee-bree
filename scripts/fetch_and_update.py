#!/usr/bin/env python3
"""
Fetches recent posts from @mariaaajoy on Instagram and rewrites data/story.js.

Authentication (in order of preference):
  1. INSTAGRAM_SESSION env var — base64-encoded instaloader session file (recommended)
  2. INSTAGRAM_USERNAME + INSTAGRAM_PASSWORD env vars — direct login (may hit checkpoint)

Generate a session file on your own machine (one-time setup):
  pip install instaloader
  python scripts/save_session.py          # prompts for username + password
  # Then add the printed base64 string as INSTAGRAM_SESSION in GitHub Secrets.

Requires: pip install instaloader
"""

import base64
import instaloader
import json
import os
import re
import sys
import tempfile
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT      = Path(__file__).resolve().parent.parent
STORY_JS  = ROOT / "data" / "story.js"
PHOTOS    = ROOT / "assets" / "photos"
TARGET    = "mariaaajoy"
MAX_POSTS = 12
SCENES    = ["morning", "backyard", "living-room", "bedroom"]


# ── Auth ────────────────────────────────────────────────────

def build_loader() -> tuple[instaloader.Instaloader, str]:
    """Return (Instaloader instance already authenticated, username)."""
    L = instaloader.Instaloader(
        download_pictures=False,
        download_videos=False,
        save_metadata=False,
        quiet=True,
    )

    session_b64 = os.environ.get("INSTAGRAM_SESSION", "").strip()
    username    = os.environ.get("INSTAGRAM_USERNAME", "").strip()
    password    = os.environ.get("INSTAGRAM_PASSWORD", "").strip()

    if session_b64:
        if not username:
            print("Error: INSTAGRAM_USERNAME is required alongside INSTAGRAM_SESSION.")
            sys.exit(1)
        # Write the session file to a temp location and load it
        with tempfile.NamedTemporaryFile(delete=False, suffix=".session") as tf:
            tf.write(base64.b64decode(session_b64))
            tmp_path = tf.name
        try:
            L.load_session_from_file(username, filename=tmp_path)
            print(f"Loaded session for {username}.")
        finally:
            os.unlink(tmp_path)

    elif username and password:
        print(f"Logging in as {username} with password...")
        L.login(username, password)

    else:
        print(
            "Error: provide either INSTAGRAM_SESSION (recommended) "
            "or INSTAGRAM_USERNAME + INSTAGRAM_PASSWORD."
        )
        sys.exit(1)

    return L, username


# ── Fetch ────────────────────────────────────────────────────

def fetch_posts(L: instaloader.Instaloader) -> list:
    profile = instaloader.Profile.from_username(L.context, TARGET)
    posts = []
    for i, post in enumerate(profile.get_posts()):
        if i >= MAX_POSTS:
            break
        posts.append(post)
    return posts


# ── Caption parsing ──────────────────────────────────────────

def parse_caption(caption: str) -> tuple[str, list[str]]:
    """Return (title, [paragraph, ...]) stripped of hashtag blocks."""
    if not caption:
        return "A Moment to Remember", []

    lines = caption.split("\n")
    clean = []
    for line in lines:
        words = line.strip().split()
        if not words:
            clean.append("")
            continue
        hashtag_ratio = sum(1 for w in words if w.startswith("#")) / len(words)
        if hashtag_ratio < 0.6:
            clean.append(line.strip())

    text       = "\n".join(clean).strip()
    paragraphs = [p.strip() for p in re.split(r"\n{2,}|\n", text) if p.strip()]

    if not paragraphs:
        return "A Moment to Remember", []

    title = paragraphs[0]
    if len(title) > 60:
        title = title[:57].rstrip() + "…"

    return title, paragraphs[1:6]


# ── Photo download ───────────────────────────────────────────

def download_photo(url: str, shortcode: str) -> str | None:
    PHOTOS.mkdir(parents=True, exist_ok=True)
    dest = PHOTOS / f"{shortcode}.jpg"
    if dest.exists():
        return f"assets/photos/{shortcode}.jpg"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            dest.write_bytes(resp.read())
        print(f"  Downloaded {shortcode}.jpg")
        return f"assets/photos/{shortcode}.jpg"
    except Exception as exc:
        print(f"  Warning: could not download {shortcode}: {exc}")
        return None


# ── Story builder ────────────────────────────────────────────

def build_story(posts: list) -> list:
    pages = [{
        "id": "cover",
        "scene": "cover",
        "layout": "cover",
        "title": "The Adventures of\nRylee & Bree",
        "subtitle": "A story about two sisters",
        "dedication": "Made with love for Maria, Rylee & Brielle ♥",
    }]

    for i, post in enumerate(posts):
        title, body  = parse_caption(post.caption)
        date_str     = post.date.strftime("%B %d, %Y")
        photo_path   = download_photo(post.url, post.shortcode)

        page = {
            "id":     f"post_{post.shortcode}",
            "scene":  SCENES[i % len(SCENES)],
            "layout": "photo-story" if photo_path else "story",
            "title":  title,
            "text":   body if body else [date_str],
            "date":   date_str,
        }
        if photo_path:
            page["photo"] = photo_path

        pages.append(page)

    pages.append({
        "id":    "end",
        "scene": "stars",
        "layout": "ending",
        "title": "The End",
        "text": [
            "Every single day, Rylee and Brielle find something new to discover, "
            "something to laugh about, and always — always — each other."
        ],
        "dedication": "For Rylee, Brielle, and their amazing mom Maria.\nThis is your story. ♥",
    })

    return pages


def write_story_js(story: list):
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    content = (
        f"// Auto-generated from @{TARGET} — last updated {ts}\n"
        "// Do not edit manually; run scripts/fetch_and_update.py to refresh.\n\n"
        f"const STORY = {json.dumps(story, indent=2, ensure_ascii=False)};\n"
    )
    STORY_JS.write_text(content, encoding="utf-8")
    print(f"Wrote {len(story)} pages to {STORY_JS}")


# ── Entry point ──────────────────────────────────────────────

def main():
    L, _ = build_loader()

    print(f"Fetching posts from @{TARGET}...")
    try:
        posts = fetch_posts(L)
    except Exception as exc:
        print(f"Error fetching posts: {exc}")
        sys.exit(1)

    print(f"Fetched {len(posts)} posts.")
    story = build_story(posts)
    write_story_js(story)


if __name__ == "__main__":
    main()
