#!/usr/bin/env python3
"""
Fetches recent posts from @mariaaajoy on Instagram and rewrites data/story.js.

Usage:
  INSTAGRAM_USERNAME=you INSTAGRAM_PASSWORD=secret python scripts/fetch_and_update.py

Requires: pip install instaloader
Secrets needed in GitHub: INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD
"""

import instaloader
import json
import os
import re
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT      = Path(__file__).resolve().parent.parent
STORY_JS  = ROOT / "data" / "story.js"
PHOTOS    = ROOT / "assets" / "photos"
TARGET    = "mariaaajoy"
MAX_POSTS = 12
SCENES    = ["morning", "backyard", "living-room", "bedroom"]


def parse_caption(caption: str):
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

    text = "\n".join(clean).strip()
    paragraphs = [p.strip() for p in re.split(r"\n{2,}|\n", text) if p.strip()]

    if not paragraphs:
        return "A Moment to Remember", []

    title = paragraphs[0]
    if len(title) > 60:
        title = title[:57].rstrip() + "…"

    body = paragraphs[1:6]
    return title, body


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
        print(f"  Warning: could not download photo for {shortcode}: {exc}")
        return None


def fetch_posts(username: str, password: str):
    L = instaloader.Instaloader(
        download_pictures=False,
        download_videos=False,
        save_metadata=False,
        quiet=True,
    )
    L.login(username, password)
    profile = instaloader.Profile.from_username(L.context, TARGET)
    posts = []
    for i, post in enumerate(profile.get_posts()):
        if i >= MAX_POSTS:
            break
        posts.append(post)
    return posts


def build_story(posts) -> list:
    pages = []

    # Cover (static)
    pages.append({
        "id": "cover",
        "scene": "cover",
        "layout": "cover",
        "title": "The Adventures of\nRylee & Bree",
        "subtitle": "A story about two sisters",
        "dedication": "Made with love for Maria, Rylee & Brielle ♥",
    })

    # Instagram posts
    for i, post in enumerate(posts):
        title, body = parse_caption(post.caption)
        date_str = post.date.strftime("%B %d, %Y")
        photo_path = download_photo(post.url, post.shortcode)

        page = {
            "id": f"post_{post.shortcode}",
            "scene": SCENES[i % len(SCENES)],
            "layout": "photo-story" if photo_path else "story",
            "title": title,
            "text": body if body else [date_str],
            "date": date_str,
        }
        if photo_path:
            page["photo"] = photo_path

        pages.append(page)

    # Ending (static)
    pages.append({
        "id": "end",
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


def main():
    username = os.environ.get("INSTAGRAM_USERNAME", "").strip()
    password = os.environ.get("INSTAGRAM_PASSWORD", "").strip()

    if not username or not password:
        print("Error: INSTAGRAM_USERNAME and INSTAGRAM_PASSWORD must be set.")
        sys.exit(1)

    print(f"Logging in as {username} and fetching @{TARGET}...")
    try:
        posts = fetch_posts(username, password)
    except Exception as exc:
        print(f"Error: {exc}")
        sys.exit(1)

    print(f"Fetched {len(posts)} posts.")
    story = build_story(posts)
    write_story_js(story)


if __name__ == "__main__":
    main()
