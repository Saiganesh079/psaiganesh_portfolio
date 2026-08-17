# Saiganesh Penta — Multi-Page Portfolio

A responsive, editorial portfolio for Game Design, 3D, UI/UX and Digital Design.

## Pages

- `index.html` — landing page + selected work
- `3d.html` — 3D archive
- `uiux.html` — UI/UX and product design
- `level-design.html` — Game Level Design / Updating Soon
- `digital-design.html` — ChiefPulse, analytics, web, brand and motion work
- `about.html` — profile, capabilities, experience and education
- `project.html?id=...` — reusable project case-study page

## Main content file

Edit only this file for normal portfolio updates:

```text
data/portfolio.js
```

## Run locally

From the portfolio folder:

```bash
python3 -m http.server 8080
```

Open:

```text
http://localhost:8080
```

## Recent improvements

- Persistent Light / Dark mode toggle
- System-theme detection on first visit
- Theme preference saved locally
- Email shown first on the landing page and About page
- Shared header and navigation across all pages
- Responsive desktop / tablet / mobile layouts
- Accessible focus states and button labels
- Keyboard-friendly mobile navigation
- Reduced-motion support
- Async/deferred-friendly image loading via `loading="lazy"` and `decoding="async"`
- Removed duplicate content databases
- One portfolio data source for easier maintenance
