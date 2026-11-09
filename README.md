# Aurelion Mining: concept prototype (stage 1)

Frontend-only. No backend, no real funds, all figures simulated.

    npm install
    npm run dev       # local
    npm run build     # production build into dist/

## Deploy on Render
Push to GitHub, then New > Blueprint (uses render.yaml) or New > Static Site:
build command `npm install && npm run build`, publish directory `dist`,
and add a Rewrite rule `/*` to `/index.html` for client-side routing.

## Photos
Add licensed images to `public/images/`: hero.jpg, facility-1..3.jpg, machine-1..5.jpg.
Until then, labelled placeholders show.

## Settings
Brand name: `src/data/brand.js`. Illustrative rates: `src/data/packages.js`.
