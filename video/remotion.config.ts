import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

// Web-friendly output: rendered at half the composition's resolution
// (540×675 — plenty for an in-app player) with higher compression, so
// the videos are small enough to ship inside the gift app's repo.
Config.setScale(0.5);
Config.setCrf(30);

// Use the Chromium headless shell already installed for Playwright in this
// sandbox — the network policy blocks Remotion's own browser download.
Config.setBrowserExecutable(
  '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
);
