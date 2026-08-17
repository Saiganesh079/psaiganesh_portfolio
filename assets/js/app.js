(() => {
  'use strict';

  const D = window.PORTFOLIO || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;'
  }[char]));

  /* Theme ----------------------------------------------------- */
  const themeButton = $('#theme-toggle');
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('portfolio-theme');
  const preferredTheme = window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const setTheme = theme => {
    root.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
    if (themeButton) {
      themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
      themeButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      themeButton.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      const label = $('.theme-label', themeButton);
      if (label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
      const icon = $('.theme-icon', themeButton);
      if (icon) icon.textContent = theme === 'dark' ? '☼' : '◐';
    }
  };

  setTheme(storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : preferredTheme);
  themeButton?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  /* Mobile navigation ---------------------------------------- */
  const menuButton = $('#menu-toggle');
  const mobileNav = $('#mobile-nav');
  const closeMenu = () => {
    mobileNav?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  };
  menuButton?.addEventListener('click', () => {
    const open = mobileNav?.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(Boolean(open)));
  });
  $$('#mobile-nav a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  /* Scroll reveal --------------------------------------------- */
  const revealItems = $$('.reveal');
  if (!('IntersectionObserver' in window) || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    revealItems.forEach(item => item.classList.add('show'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: '0px 0px -24px' });
    revealItems.forEach(item => observer.observe(item));
  }

  /* Render helpers -------------------------------------------- */
  const visual = project => project.image
    ? `<div class="visual"><img src="${esc(project.image)}" alt="${esc(project.title)}" loading="lazy" decoding="async"></div>`
    : `<div class="visual placeholder ${project.accent === 'blue' ? 'blue' : ''}"><strong>${esc(project.title)}</strong><span class="mono">${esc(project.type)}</span></div>`;

  const external = url => url ? ` target="_blank" rel="noopener noreferrer"` : '';

  /* Home / selected work -------------------------------------- */
  const workGrid = $('#work-grid');
  const filters = $('#work-filters');
  if (workGrid) {
    const categories = ['All', ...new Set((D.projects || []).map(project => project.section))];
    const render = active => {
      const list = active === 'All' ? D.projects : D.projects.filter(project => project.section === active);
      workGrid.innerHTML = list.map((project, index) => `
        <article class="work ${index === 0 ? 'featured' : ''} reveal">
          <a href="project.html?id=${encodeURIComponent(project.id)}">
            ${visual(project)}
            <div class="work-meta"><div><span class="mono">${esc(project.section)} · ${esc(project.year)}</span><h3>${esc(project.title)}</h3></div><span aria-hidden="true">↗</span></div>
            <p>${esc(project.summary)}</p>
          </a>
        </article>`).join('');
      workGrid.querySelectorAll('.reveal').forEach(item => item.classList.add('show'));
    };
    filters.innerHTML = categories.map(category => `<button class="filter" type="button" data-filter="${esc(category)}" aria-pressed="${category === 'All'}">${esc(category)}</button>`).join('');
    $$('.filter', filters).forEach(button => button.addEventListener('click', () => {
      $$('.filter', filters).forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      render(button.dataset.filter);
    }));
    $('.filter', filters)?.classList.add('active');
    render('All');
  }

  /* 3D archive ----------------------------------------------- */
  const artGrid = $('#art-grid');
  if (artGrid) {
    artGrid.innerHTML = (D.art3d || []).map(item => `
      <a class="art reveal" href="${esc(item[2])}" target="_blank" rel="noopener noreferrer">
        <div><img src="${esc(item[2])}" alt="${esc(item[0])}" loading="lazy" decoding="async"></div>
        <span class="mono">${esc(item[1])}</span><strong>${esc(item[0])} ↗</strong>
      </a>`).join('');
    artGrid.querySelectorAll('.reveal').forEach(item => item.classList.add('show'));
  }

  /* UI/UX ------------------------------------------------------ */
  const uiGrid = $('#ui-grid');
  if (uiGrid) {
    uiGrid.innerHTML = (D.uiux || []).map((item, index) => `
      <article class="ui reveal ${index === 0 ? 'wide' : ''}">
        <a href="${esc(item[5])}"${external(item[5])}>
          <div class="visual placeholder ${item[4] === 'blue' ? 'blue' : ''}"><strong>${esc(item[0])}</strong><span class="mono">${esc(item[1])}</span></div>
          <div><span class="mono">${esc(item[1])} · ${esc(item[2])}</span><h3>${esc(item[0])}</h3><p>${esc(item[3])}</p></div>
        </a>
      </article>`).join('');
    uiGrid.querySelectorAll('.reveal').forEach(item => item.classList.add('show'));
  }

  /* Timeline -------------------------------------------------- */
  const timeline = $('#timeline');
  if (timeline) {
    timeline.innerHTML = (D.timeline || []).map(item => `
      <article class="timeline reveal"><span class="mono">${esc(item[1])}</span><div><span class="mono blue">${esc(item[0])}</span><h3>${esc(item[2])}</h3><p class="org">${esc(item[3])}</p><p>${esc(item[4])}</p></div></article>`).join('');
    timeline.querySelectorAll('.reveal').forEach(item => item.classList.add('show'));
  }

  /* Digital design -------------------------------------------- */
  const digitalGrid = $('#digital-work');
  if (digitalGrid) {
    const list = (D.projects || []).filter(project => project.section === 'Digital Design');
    digitalGrid.innerHTML = list.map((project, index) => `
      <article class="work ${index === 0 ? 'featured' : ''} reveal">
        <a href="project.html?id=${encodeURIComponent(project.id)}">
          ${visual(project)}
          <div class="work-meta"><div><span class="mono">${esc(project.type)} · ${esc(project.year)}</span><h3>${esc(project.title)}</h3></div><span aria-hidden="true">↗</span></div>
          <p>${esc(project.summary)}</p>
        </a>
      </article>`).join('');
    digitalGrid.querySelectorAll('.reveal').forEach(item => item.classList.add('show'));
  }

  /* Project detail -------------------------------------------- */
  const detail = $('#project-detail');
  if (detail && D.projects?.length) {
    const id = new URLSearchParams(location.search).get('id');
    const project = D.projects.find(item => item.id === id) || D.projects[0];
    document.title = `${project.title} — Saiganesh Penta`;
    detail.innerHTML = `
      <section class="case-hero">
        <div class="case-copy reveal"><span class="mono blue">${esc(project.section)} · ${esc(project.year)}</span><h1>${esc(project.title)}</h1><p>${esc(project.summary)}</p></div>
        <div class="case-visual reveal">${visual(project)}</div>
      </section>
      <section class="case-body">
        <aside class="case-side reveal">
          <div><span class="mono">Role</span><strong>${esc(project.role)}</strong></div>
          <div><span class="mono">Type</span><strong>${esc(project.type)}</strong></div>
          <div><span class="mono">Tools</span><strong>${project.tools.map(esc).join(' · ')}</strong></div>
        </aside>
        <div class="case-content reveal"><span class="mono blue">Overview</span><p class="case-lead">${esc(project.details)}</p>${project.links?.length ? `<div class="actions">${project.links.map(link => `<a class="button button-dark" href="${esc(link[1])}"${external(link[1])}>${esc(link[0])} ↗</a>`).join('')}</div>` : ''}</div>
      </section>`;
    const index = D.projects.indexOf(project);
    const next = D.projects[(index + 1) % D.projects.length];
    const nextLink = $('#next-project');
    if (nextLink) {
      nextLink.href = `project.html?id=${encodeURIComponent(next.id)}`;
      nextLink.innerHTML = `<span class="mono">Next project</span><strong>${esc(next.title)} ↗</strong>`;
    }
  }

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* Inject the email from the data source so it stays consistent. */
  if (D.email) {
    $$('[data-email]').forEach(element => {
      element.textContent = D.email;
      if (element.tagName === 'A') element.href = `mailto:${D.email}`;
    });
  }
})();
