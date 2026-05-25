#!/usr/bin/env python3
"""
Optional helper: verifies your sessionid cookie can access @mariaaajoy.

You can skip this entirely and just add the cookie to GitHub Secrets directly.
This script only confirms it works before you commit it as a secret.
"""

import sys
import requests

TARGET = "mariaaajoy"

username   = input("Your Instagram username: ").strip()
session_id = input("Paste your sessionid cookie value: ").strip()

if not session_id:
    print("No value entered.")
    sys.exit(1)

sess = requests.Session()
sess.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "X-IG-App-ID": "936619743392459",
    "Referer": "https://www.instagram.com/",
})
sess.cookies.set("sessionid", session_id, domain=".instagram.com")

print("Verifying…")
try:
    resp = sess.get(
        "https://www.instagram.com/api/v1/users/web_profile_info/",
        params={"username": TARGET},
        timeout=15,
    )
    resp.raise_for_status()
    user = resp.json()["data"]["user"]
    count = user.get("edge_owner_to_timeline_media", {}).get("count", "?")
    print(f"✓ Works! Found @{TARGET} ({count} posts).")
except Exception as exc:
    print(f"✗ Failed: {exc}")
    print("Make sure you're logged in and your account follows @mariaaajoy.")
    sys.exit(1)

print("\nAdd these two GitHub Secrets:\n")
print(f"  INSTAGRAM_SESSIONID = {session_id}")
print(f"  INSTAGRAM_USERNAME  = {username}")
