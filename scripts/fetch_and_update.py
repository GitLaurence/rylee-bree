#!/usr/bin/env python3
"""
Fetches recent posts from @mariaaajoy using Instagram's internal API.
No instaloader — uses requests + sessionid cookie directly.

Secrets needed in GitHub:
  INSTAGRAM_SESSIONID  — sessionid cookie from instagram.com browser DevTools
  INSTAGRAM_USERNAME   — your Instagram username
"""

import json
import os
import re
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

import requests

ROOT      = Path(__file__).resolve().parent.parent
STORY_JS  = ROOT / "data" / "story.js"
PHOTOS    = ROOT / "assets" / "photos"
TARGET    = "mariaaajoy"
MAX_POSTS = 12
SCENES    = ["morning", "backyard", "living-room", "bedroom"]

_UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/120.0.0.0 Safari/537.36"
)
_HEADERS = {
    "User-Agent": _UA,
    "Accept": "*/*",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": "https://www.instagram.com/",
    "X-IG-App-ID": "936619743392459",
    "Origin": "https://www.instagram.com",
}


# ── Session ──────────────────────────────────────────────────

def make_session(session_id: str) -> requests.Session:
    sess = requests.Session()
    sess.headers.update(_HEADERS)
    sess.cookies.set("sessionid", session_id, domain=".instagram.com")
    # Grab csrftoken by visiting the homepage once
    try:
        sess.get("https://www.instagram.com/", timeout=15)
        csrf = sess.cookies.get("csrftoken", "")
        if csrf:
            sess.headers["X-CSRFToken"] = csrf
    except Exception:
        pass
    return sess


# ── Instagram API calls ──────────────────────────────────────

def get_user_id(sess: requests.Session) -> str:
    resp = sess.get(
        "https://www.instagram.com/api/v1/users/web_profile_info/",
        params={"username": TARGET},
        timeout=20,
    )
    resp.raise_for_status()
    return resp.json()["data"]["user"]["id"]


def fetch_items(sess: requests.Session, user_id: str) -> list:
    resp = sess.get(
        f"https://www.instagram.com/api/v1/feed/user/{user_id}/",
        params={"count": MAX_POSTS},
        timeout=20,
    )
    resp.raise_for_status()
    return resp.json().get("items", [])


# ── Post data extraction ─────────────────────────────────────

def get_image_url(item: dict) -> str | None:
    # Carousel posts: use first frame
    media = item.get("carousel_media") or [item]
    candidates = media[0].get("image_versions2", {}).get("candidates", [])
    return candidates[0]["url"] if candidates else None


def get_caption(item: dict) -> str:
    cap = item.get("caption")
    return cap.get("text", "") if isinstance(cap, dict) else ""


def get_date(item: dict) -> datetime:
    return datetime.fromtimestamp(item.get("taken_at", 0), tz=timezone.utc)


def get_shortcode(item: dict) -> str:
    return item.get("code") or item.get("shortcode") or str(item["id"])


# ── Caption parsing ──────────────────────────────────────────

def parse_caption(caption: str) -> tuple[str, list[str]]:
    if not caption:
        return "A Moment to Remember", []

    clean = []
    for line in caption.split("\n"):
        words = line.strip().split()
        if not words:
            clean.append("")
            continue
        if sum(1 for w in words if w.startswith("#")) / len(words) < 0.6:
            clean.append(line.strip())

    paragraphs = [p for p in re.split(r"\n{2,}|\n", "\n".join(clean)) if p.strip()]
    if not paragraphs:
        return "A Moment to Remember", []

    raw_title = paragraphs[0]
    title = raw_title[:57].rstrip() + ("…" if len(raw_title) > 60 else "")
    return title, paragraphs[1:6]


# ── Photo download ───────────────────────────────────────────

def download_photo(url: str, shortcode: str) -> str | None:
    PHOTOS.mkdir(parents=True, exist_ok=True)
    dest = PHOTOS / f"{shortcode}.jpg"
    if dest.exists():
        return f"assets/photos/{shortcode}.jpg"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": _UA})
        with urllib.request.urlopen(req, timeout=30) as resp:
            dest.write_bytes(resp.read())
        print(f"  Downloaded {shortcode}.jpg")
        return f"assets/photos/{shortcode}.jpg"
    except Exception as exc:
        print(f"  Warning: could not download {shortcode}: {exc}")
        return None


# ── Story builder ────────────────────────────────────────────

def build_story(items: list) -> list:
    pages = [{
        "id": "cover",
        "scene": "cover",
        "layout": "cover",
        "title": "The Adventures of\nRylee & Bree",
        "subtitle": "A story about two sisters",
        "dedication": "Made with love for Maria, Rylee & Brielle ♥",
    }]

    for i, item in enumerate(items[:MAX_POSTS]):
        shortcode   = get_shortcode(item)
        title, body = parse_caption(get_caption(item))
        date_str    = get_date(item).strftime("%B %d, %Y")
        img_url     = get_image_url(item)
        photo_path  = download_photo(img_url, shortcode) if img_url else None

        page = {
            "id":     f"post_{shortcode}",
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
    username   = os.environ.get("INSTAGRAM_USERNAME", "").strip()
    session_id = os.environ.get("INSTAGRAM_SESSIONID", "").strip()

    if not username or not session_id:
        print("Error: INSTAGRAM_USERNAME and INSTAGRAM_SESSIONID must be set.")
        sys.exit(1)

    sess = make_session(session_id)

    print(f"Fetching profile @{TARGET}…")
    try:
        user_id = get_user_id(sess)
        print(f"  User ID: {user_id}")
    except Exception as exc:
        print(f"Error fetching profile: {exc}")
        sys.exit(1)

    print("Fetching posts…")
    try:
        items = fetch_items(sess, user_id)
    except Exception as exc:
        print(f"Error fetching posts: {exc}")
        sys.exit(1)

    print(f"Fetched {len(items)} posts.")
    story = build_story(items)
    write_story_js(story)


if __name__ == "__main__":
    main()
