Update icon assets

```sh
npx pwa-asset-generator logo.svg ./public --manifest ./public/manifest.json --index ./public/index.html --opaque false --icon-only --favicon --type png
npx pwa-asset-generator logo.svg ./public --manifest ./public/manifest.json --index ./public/index.html --background "#D9D9D9" --icon-only
npx pwa-asset-generator logo-dark-mode.svg ./public --manifest ./public/manifest.json --index ./public/index.html --dark-mode --background "#2A2B2E" --splash-only
```

The pwa-asset-generator doesn't provide a proper size for favicon-196.png when padding is zero, so better generate it manually here https://cloudconvert.com/svg-to-png
