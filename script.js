:root {
  --bg: #f3f0e8;
  --bg-alt: #e8e2d5;
  --surface: #fbf8f1;
  --text: #111111;
  --muted: #5f5a52;
  --border: #1b1b1b;
  --rule: rgba(17, 17, 17, 0.18);
  --accent: #c61f1f;
  --accent-soft: rgba(198, 31, 31, 0.12);
  --shadow: 0 18px 50px rgba(17, 17, 17, 0.08);
  --font-sans: "Archivo", "Arial Narrow", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;
  --max-width: 1360px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  color: var(--text);
  background:
    linear-gradient(rgba(17, 17, 17, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(17, 17, 17, 0.035) 1px, transparent 1px),
    var(--bg);
  background-size: 32px 32px, 32px 32px, auto;
  font-family: var(--font-sans);
  text-rendering: optimizeLegibility;
}

img {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
}

p,
li {
  font-size: 1rem;
  line-height: 1.7;
}

ul {
  margin: 0;
  padding-left: 1.1rem;
}

.page-frame {
  position: fixed;
  inset: 18px;
  border: 1px solid rgba(17, 17, 17, 0.15);
  pointer-events: none;
  z-index: 20;
}

.container {
  width: min(var(--max-width), calc(100% - 48px));
  margin: 0 auto;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 30;
  backdrop-filter: blur(14px);
  background: rgba(243, 240, 232, 0.88);
  border-bottom: 1px solid var(--rule);
}

.topbar {
  min-height: 78px;
  display: grid;
  grid-template-columns: 1.2fr auto 1.6fr auto;
  gap: 16px;
  align-items: center;
  width: min(var(--max-width), calc(100% - 48px));
  margin: 0 auto;
}

.brand,
.menu a,
.availability,
.menu-toggle,
.eyebrow,
.section-index,
.hero-kicker,
.hero-index,
.project-meta,
.tagline,
.resource-type,
.contact-row span:first-child,
.meta-line {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.brand {
  text-decoration: none;
  font-weight: 500;
}

.menu {
  display: flex;
  justify-content: center;
  gap: 22px;
}

.menu a {
  text-decoration: none;
  position: relative;
}

.menu a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 100%;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 180ms ease;
}

.menu a:hover::after,
.menu a.is-active::after {
  transform: scaleX(1);
}

.availability {
  padding: 8px 0 8px 18px;
  border-left: 1px solid var(--rule);
  color: var(--accent);
}

.menu-toggle {
  display: none;
  border: 1px solid var(--border);
  background: transparent;
  padding: 10px 12px;
}

.hero {
  padding: 48px 0 72px;
}

.hero-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  align-items: end;
  min-height: calc(100vh - 126px);
}

.hero-kicker {
  grid-column: 1 / span 3;
  align-self: start;
  padding-top: 40px;
}

.hero-title-block {
  grid-column: 1 / span 7;
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 20px;
  align-items: start;
}

.hero-title-block h1,
.section-heading h2,
.contact-intro h3,
.project-copy h3,
.profile-card p,
.education-card h3,
.link-panel h3 {
  margin: 0;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.hero-title-block h1 {
  font-size: clamp(3.8rem, 10vw, 9rem);
  line-height: 0.92;
  text-transform: uppercase;
}

.hero-index {
  margin: 18px 0 0;
  color: var(--accent);
}

.hero-summary {
  grid-column: 8 / span 5;
  align-self: center;
  padding: 32px 0 0;
}

.lead {
  font-size: 1.35rem;
  line-height: 1.4;
  margin-top: 0;
  margin-bottom: 18px;
}

.hero-actions,
.gallery-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 28px;
}

.button {
  border: 1px solid var(--border);
  padding: 14px 18px;
  text-decoration: none;
  text-transform: uppercase;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  letter-spacing: 0.08em;
  background: transparent;
  transition: background 180ms ease, color 180ms ease, transform 180ms ease;
}

.button:hover,
.button:focus-visible,
.text-link:hover,
.resource-link:hover {
  transform: translateY(-2px);
}

.button-solid {
  background: var(--text);
  color: var(--surface);
}

.button:hover,
.button:focus-visible {
  background: var(--accent-soft);
}

.button-solid:hover,
.button-solid:focus-visible {
  background: var(--accent);
  color: #fff;
}

.hero-facts {
  grid-column: 8 / span 5;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.fact-card,
.profile-card,
.skills-panel,
.discipline-card,
.link-panel,
.resource-link,
.project-card,
.education-card,
.contact-row,
.tool-cell {
  background: rgba(251, 248, 241, 0.82);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.fact-card {
  padding: 18px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.fact-number {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
}

.fact-label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  text-transform: uppercase;
}

.section {
  padding: 84px 0;
}

.section-alt {
  background: linear-gradient(180deg, rgba(232, 226, 213, 0.65), rgba(251, 248, 241, 0.4));
}

.section-heading {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 20px;
  align-items: start;
  margin-bottom: 34px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--rule);
}

.section-index {
  margin: 4px 0 0;
  color: var(--accent);
}

.section-heading h2 {
  font-size: clamp(2.25rem, 4vw, 4.6rem);
  text-transform: uppercase;
  line-height: 0.95;
}

.about-layout,
.link-layout,
.timeline-layout,
.contact-layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

.profile-card {
  grid-column: 1 / span 3;
  padding: 24px;
}

.bio-block {
  grid-column: 4 / span 5;
  padding: 8px 0;
}

.skills-panel {
  grid-column: 9 / span 4;
  padding: 24px;
}

.discipline-grid {
  grid-column: 4 / span 9;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

.discipline-card {
  padding: 22px;
}

.discipline-card h3,
.resource-link strong,
.link-panel h3,
.project-copy h3,
.education-card h3,
.contact-intro h3 {
  font-size: 1.45rem;
  line-height: 1.1;
  margin-bottom: 12px;
}

.skill-stat + .skill-stat {
  margin-top: 18px;
}

.skill-stat-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  text-transform: uppercase;
}

.skill-bar {
  height: 14px;
  border: 1px solid var(--border);
  background: rgba(17, 17, 17, 0.06);
  overflow: hidden;
}

.skill-bar span {
  display: block;
  width: var(--skill-width);
  height: 100%;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 800ms ease;
}

.reveal.is-visible .skill-bar span {
  transform: scaleX(1);
}

.link-panel {
  grid-column: 1 / span 4;
  padding: 24px;
}

.link-list {
  grid-column: 5 / span 8;
  display: grid;
  gap: 14px;
}

.resource-link {
  display: block;
  text-decoration: none;
  padding: 24px;
}

.resource-type {
  display: block;
  margin-bottom: 8px;
  color: var(--accent);
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 18px;
}

.project-card {
  grid-column: span 12;
  padding: 22px;
}

.project-card.featured {
  display: grid;
  grid-template-columns: minmax(280px, 420px) 1fr;
  gap: 24px;
}

.project-card.compact {
  grid-column: 9 / span 4;
}

.project-media img {
  width: 100%;
  height: 100%;
  min-height: 300px;
  object-fit: cover;
  border: 1px solid var(--rule);
}

.project-meta,
.tagline,
.organization {
  color: var(--muted);
}

.project-copy p:first-of-type + h3 {
  margin-top: 8px;
}

.text-link {
  display: inline-block;
  margin-top: 18px;
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.gallery-item {
  margin: 0;
  background: rgba(251, 248, 241, 0.82);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.gallery-item img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
}

.gallery-item figcaption {
  padding: 16px 18px 18px;
  font-size: 1.1rem;
  font-weight: 700;
}

.gallery-item figcaption span {
  display: block;
  margin-bottom: 8px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--accent);
  text-transform: uppercase;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border: 1px solid var(--border);
}

.tool-cell {
  min-height: 168px;
  padding: 24px;
  display: grid;
  place-items: center;
  gap: 16px;
  text-align: center;
  box-shadow: none;
  border: 0;
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.tool-cell:nth-child(4n) {
  border-right: 0;
}

.tool-cell img {
  width: 54px;
  height: 54px;
  object-fit: contain;
}

.tool-cell span {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  text-transform: uppercase;
}

.timeline-block {
  grid-column: 1 / span 7;
}

.education-block {
  grid-column: 9 / span 4;
}

.timeline-item,
.education-card {
  padding: 24px;
}

.timeline-item {
  border-left: 2px solid var(--accent);
  background: rgba(251, 248, 241, 0.45);
  padding-left: 22px;
}

.education-card + .education-card {
  margin-top: 16px;
}

.contact-intro {
  grid-column: 1 / span 5;
}

.contact-list {
  grid-column: 6 / span 7;
  display: grid;
  gap: 12px;
}

.contact-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 18px;
  padding: 16px 18px;
}

.site-footer {
  padding: 22px 0 36px;
  border-top: 1px solid var(--rule);
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  text-transform: uppercase;
}

.reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 700ms ease, transform 700ms ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1080px) {
  .topbar {
    grid-template-columns: 1fr auto auto;
  }

  .availability {
    display: none;
  }

  .menu-toggle {
    display: inline-block;
  }

  .menu {
    position: absolute;
    left: 24px;
    right: 24px;
    top: calc(100% + 10px);
    display: none;
    flex-direction: column;
    gap: 0;
    padding: 14px;
    background: var(--surface);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
  }

  .menu.is-open {
    display: flex;
  }

  .menu a {
    padding: 12px 8px;
  }

  .hero-grid,
  .about-layout,
  .link-layout,
  .project-grid,
  .timeline-layout,
  .contact-layout {
    grid-template-columns: 1fr;
  }

  .hero-kicker,
  .hero-title-block,
  .hero-summary,
  .hero-facts,
  .profile-card,
  .bio-block,
  .skills-panel,
  .discipline-grid,
  .link-panel,
  .link-list,
  .project-card.compact,
  .timeline-block,
  .education-block,
  .contact-intro,
  .contact-list {
    grid-column: auto;
  }

  .hero-facts,
  .discipline-grid,
  .gallery-grid,
  .tool-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .project-card.featured {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .page-frame {
    inset: 10px;
  }

  .container,
  .topbar {
    width: min(var(--max-width), calc(100% - 24px));
  }

  .hero {
    padding-top: 20px;
  }

  .hero-title-block,
  .section-heading {
    grid-template-columns: 1fr;
  }

  .hero-facts,
  .discipline-grid,
  .gallery-grid,
  .tool-grid {
    grid-template-columns: 1fr;
  }

  .contact-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .footer-inner {
    flex-direction: column;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .reveal,
  .button,
  .text-link,
  .resource-link,
  .menu a::after,
  .skill-bar span {
    transition: none;
  }

  .reveal {
    opacity: 1;
    transform: none;
  }

  .button:hover,
  .button:focus-visible,
  .text-link:hover,
  .resource-link:hover {
    transform: none;
  }
}
