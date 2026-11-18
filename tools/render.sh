#!/bin/sh
# Renderar delningsbilden och hemskärmsikonen med Chrome headless.
set -e
cd "$(dirname "$0")"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --screenshot="$PWD/../site/og.png" "file://$PWD/og.html"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=180,180 --screenshot="$PWD/../site/apple-touch-icon.png" "file://$PWD/icon.html"
