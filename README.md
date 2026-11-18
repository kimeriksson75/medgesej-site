# medgesej.se

Webbplatsen för appstudion Medges Ej. Repot äger domänen medgesej.se och bygger hela sajten med GitHub Pages.

| Sökväg | Kommer från |
| --- | --- |
| `/` | `site/index.html`, studiohubben |
| `/support/` | `site/support/index.html` |
| `/nasta-tag/` | webbappen i [kimeriksson75/nasta-tag](https://github.com/kimeriksson75/nasta-tag), hämtas vid bygget |
| `/nasta-tag/integritet.html` | `integritet.html` i nasta-tag |

`/support/` och `/nasta-tag/integritet.html` är angivna i App Store Connect och får inte flyttas.

## Bygga lokalt

```sh
git clone https://github.com/kimeriksson75/nasta-tag _nasta-tag
scripts/build.sh
python3 -m http.server 8765 -d _site
```

## Ombygge när Nästa tåg ändras

`.github/workflows/pages.yml` körs vid push till main, manuellt och vid `repository_dispatch` av typen `nasta-tag-updated`, som nasta-tag skickar efter en push till sin main.

## Delningsbilden

`site/og.png` och `site/apple-touch-icon.png` renderas från `tools/og.html` och `tools/icon.html` med `tools/render.sh` (Chrome headless).
