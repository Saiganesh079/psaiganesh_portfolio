# Saiganesh Penta — Multi-Page Portfolio Structure

## Portfolio map

```text
HOME
│
├── Selected Work
│   ├── ChiefPulse
│   ├── Game Analytics Dashboard
│   ├── Souls-Like Combat Prototype
│   ├── Undead and Unknown
│   ├── Quantum Void
│   └── Digital / Motion work
│
├── 3D
│   ├── Dure Helicopter
│   ├── Ethereal Guardian
│   ├── Ancient Weapon
│   └── Toxic Flame Thrower
│
├── UI/UX
│   ├── ChiefPulse Product Experience
│   ├── Quantum Void Interface
│   └── UI / Product samples
│
├── Game Level Design
│   └── Updating Soon board
│
├── Digital Design
│   ├── ChiefPulse
│   ├── Game Analytics Dashboard
│   ├── Portfolio System
│   └── Motion / Brand / Campaign work
│
├── About
│   ├── Email / profile
│   ├── Capabilities
│   ├── Experience
│   └── Education
│
└── Project pages
    └── project.html?id=<project-id>
```

## Single source of truth

Normal portfolio content now lives in one file:

```text
data/portfolio.js
```

The older duplicate `projects.js` and `content.js` files were removed so future updates do not create conflicting data sources.

### Add a project

```js
{
  id: "new-project",
  title: "New Project",
  section: "Digital Design",
  type: "Product / Web",
  year: "2026",
  role: "Designer",
  accent: "blue",
  summary: "Short description.",
  details: "Longer project description for the case-study page.",
  tools: ["Figma", "Photoshop"],
  image: "assets/images/new-project.jpg",
  links: [
    ["View project", "https://example.com"]
  ]
}
```

The project will appear in the relevant work listing and can be opened with:

```text
project.html?id=new-project
```

### Add 3D work

Add a row to `art3d`:

```js
['New Asset', 'Character', 'assets/images/new-asset.jpg']
```

### Add UI/UX work

Add a row to `uiux`:

```js
['New Interface', 'Product Design', '2026', 'Short description.', 'blue', 'https://example.com/']
```

### Add experience / education

Add a row to `timeline`:

```js
['Experience', '2027', 'Job Title', 'Company', 'Short description.']
```

## Theme system

The site has a persistent Light / Dark button in the header on every page.

- User selection is saved in `localStorage`.
- First visit follows the operating-system color preference.
- CSS variables switch the complete interface between themes.
- The control is keyboard accessible and exposes `aria-pressed` and a descriptive label.

## Responsive system

The layout is designed around three practical ranges:

```text
Desktop       > 1120px
Tablet        701–1120px
Mobile        <= 700px
Small mobile  <= 420px
```

Responsive behavior includes:

- Desktop navigation → mobile navigation
- 12-column editorial grid → single-column mobile layout
- 4-column 3D archive → 2-column tablet → 1-column mobile
- Two-column project grids → one-column mobile
- Reduced typography on smaller screens
- Larger touch targets
- Keyboard focus states
- Reduced-motion support
- Mobile-safe email wrapping
- No horizontal overflow from the main layout

## Code responsibilities

```text
index.html / page HTML
    Structure only

assets/css/style.css
    Design system, responsive layout, theme variables

assets/js/app.js
    Theme, mobile menu, reveal animation, rendering and project routing

data/portfolio.js
    Portfolio content
```

## Recommended future case-study structure

When a project becomes important enough for a full case study, expand its data object with:

```js
hero
problem
process
designDecisions
gallery
video
outcomes
metrics
prototype
```

The reusable `project.html` template can then render those fields without creating a separate HTML template for every project.

## Design direction

The visual system keeps the editorial qualities requested from the hooman.com reference:

- large typography
- restrained palette
- blue accent
- thin rules
- monospace metadata
- asymmetrical grid
- large artwork
- minimal navigation
- generous whitespace

It is an original implementation, not a copy of hooman.com's source code.
