#!/usr/bin/env python3
"""
Run this ONCE on your own machine to generate a session file.
The printed base64 string goes into INSTAGRAM_SESSION in GitHub Secrets.

Usage:
  pip install instaloader
  python scripts/save_session.py
"""

import base64
import getpass
import instaloader
import tempfile
from pathlib import Path

username = input("Your Instagram username: ").strip()
password = getpass.getpass("Your Instagram password: ")

L = instaloader.Instaloader(quiet=True)
print("Logging in (you may need to confirm a notification in the Instagram app)...")

try:
    L.login(username, password)
except instaloader.exceptions.TwoFactorAuthRequiredException:
    code = input("Two-factor code: ").strip()
    L.two_factor_login(code)

with tempfile.NamedTemporaryFile(delete=False, suffix=".session") as tf:
    tmp = tf.name

L.save_session_to_file(filename=tmp)
encoded = base64.b64encode(Path(tmp).read_bytes()).decode()
Path(tmp).unlink()

print("\n✓ Session saved. Copy the line below into GitHub Secrets as INSTAGRAM_SESSION:\n")
print(encoded)
print(f"\nAlso add INSTAGRAM_USERNAME = {username} as a secret.")
