#!/bin/sh
# Bygger hela medgesej.se i _site/.
#   site/        hubben och /support/ (det här repot)
#   NASTA_TAG    en utcheckning av kimeriksson75/nasta-tag, läggs under /nasta-tag/
set -e
cd "$(dirname "$0")/.."
NASTA_TAG="${NASTA_TAG:-_nasta-tag}"

rm -rf _site
mkdir -p _site/nasta-tag
cp -R site/. _site/

# Samma filer som nasta-tag själv publicerade under /nasta-tag/ tidigare.
( cd "$NASTA_TAG" && cp -R index.html sw.js style.css manifest.webmanifest icon.svg icon-180.png icon-512.png integritet.html "Nästa tåg.shortcut" src data vendor "$OLDPWD/_site/nasta-tag/" )

# Adresserna som App Store Connect pekar på får aldrig försvinna.
for f in index.html support/index.html nasta-tag/index.html nasta-tag/integritet.html flytta-bilen/integritet/index.html og.png; do
  test -s "_site/$f" || { echo "Saknas: $f" >&2; exit 1; }
done
echo "Byggt: $(find _site -type f | wc -l | tr -d ' ') filer i _site/"
