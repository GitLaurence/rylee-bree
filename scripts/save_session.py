#!/usr/bin/env python3
"""
Extracts your Instagram session cookie and verifies it works.
Run this in GitHub Codespaces — no password required.

Steps:
  1. Open instagram.com in your browser and make sure you're logged in.
  2. Open DevTools  →  Application tab  →  Cookies  →  https://www.instagram.com
  3. Find the row named  sessionid  and copy its Value.
  4. Come back to this terminal and paste it when prompted.
"""

import instaloader
import sys

username   = input("Your Instagram username: ").strip()
session_id = input("Paste your Instagram sessionid cookie value: ").strip()

if not session_id:
    print("No session ID entered. Exiting.")
    sys.exit(1)

print("Verifying session…")
L = instaloader.Instaloader(quiet=True)
L.context._session.cookies.set("sessionid", session_id, domain=".instagram.com")
L.context.username = username

try:
    profile = instaloader.Profile.from_username(L.context, "mariaaajoy")
    print(f"✓ Session works! Found @mariaaajoy ({profile.mediacount} posts).")
except Exception as exc:
    print(f"✗ Session check failed: {exc}")
    print("Make sure you're logged in at instagram.com and copied the right cookie.")
    sys.exit(1)

print("\nAdd these two GitHub Secrets (Settings → Secrets and variables → Actions):\n")
print(f"  INSTAGRAM_SESSIONID = {session_id}")
print(f"  INSTAGRAM_USERNAME  = {username}")
