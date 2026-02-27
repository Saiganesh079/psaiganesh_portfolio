'use strict';

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ══════════════════════════════════════════
   MOBILE NAV
══════════════════════════════════════════ */
const burger = $('#burger');
const navLinks = $('#nav-links');

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
});

navLinks.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
});

/* ══════════════════════════════════════════
   CUSTOM CURSOR  (desktop / hover devices only)
══════════════════════════════════════════ */
if (window.matchMedia('(hover: hover)').matches) {
  const cur = $('#cursor');
  const dot = $('#cursor-dot');

  document.addEventListener('mousemove', e => {
    cur.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    dot.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
  }, { passive: true });

  $$('a, button, .gi, .qcard, .tcell, .sktag').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('hov'),    { passive: true });
    el.addEventListener('mouseleave', () => cur.classList.remove('hov'), { passive: true });
  });
}

/* ══════════════════════════════════════════
   INTERSECTION OBSERVER
   — scroll reveal  +  stat-bar animation
══════════════════════════════════════════ */
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // Reveal element
      entry.target.classList.add('in');

      // Animate any stat bars inside this element
      entry.target.querySelectorAll('.csr-fill').forEach(bar => {
        // Read target width from inline CSS custom property  e.g. style="--w:0.95"
        const w = bar.style.getPropertyValue('--w') || '1';
        bar.style.transform = `scaleX(${w})`;
      });

      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  $$('.rv').forEach(el => io.observe(el));
}

/* ══════════════════════════════════════════
   THROTTLED SCROLL — NAV ACTIVE STATE
══════════════════════════════════════════ */
{
  const sections = $$('section[id]');
  let pending = false;

  window.addEventListener('scroll', () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      sections.forEach(s => {
        const link = $$(`.nav-links a[href="#${s.id}"]`)[0];
        if (link) {
          link.classList.toggle(
            'active',
            y >= s.offsetTop - 100 && y < s.offsetTop + s.offsetHeight - 100
          );
        }
      });
      pending = false;
    });
  }, { passive: true });
}

/* ══════════════════════════════════════════
   THREE.JS  — initialise after full page load
   (Three.js is loaded with `defer` so it's
    guaranteed to be ready at window.load)
══════════════════════════════════════════ */
window.addEventListener('load', () => {
  if (!window.THREE) return;

  const {
    WebGLRenderer, Scene, PerspectiveCamera,
    BufferGeometry, BufferAttribute, PointsMaterial, Points, Color,
    MeshBasicMaterial, MeshPhongMaterial,
    OctahedronGeometry, IcosahedronGeometry, CylinderGeometry,
    BoxGeometry, SphereGeometry, TorusKnotGeometry,
    Mesh, Group,
    AmbientLight, DirectionalLight,
    GridHelper, Clock,
  } = THREE;

  /* ─────────────────────────────────────────
     HERO PARTICLE FIELD
  ───────────────────────────────────────── */
  (() => {
    const canvas = $('#hero-canvas');
    if (!canvas) return;

    const W = window.innerWidth, H = window.innerHeight;
    const renderer = new WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setSize(W, H);
    renderer.setClearColor(0, 0);

    const scene  = new Scene();
    const cam    = new PerspectiveCamera(60, W / H, 0.1, 2000);
    cam.position.z = 800;

    // Particles
    const COUNT = W < 768 ? 1200 : 3000;
    const geo   = new BufferGeometry();
    const pos   = new Float32Array(COUNT * 3);
    const col   = new Float32Array(COUNT * 3);
    const c1 = new Color(0xff6b00);
    const c2 = new Color(0x00d4ff);
    const c3 = new Color(0xffffff);

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 2000;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1000;
      const c = Math.random() < 0.7 ? c1 : Math.random() < 0.5 ? c2 : c3;
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    geo.setAttribute('position', new BufferAttribute(pos, 3));
    geo.setAttribute('color',    new BufferAttribute(col, 3));

    const pts = new Points(geo, new PointsMaterial({
      size: 2, vertexColors: true, transparent: true, opacity: 0.7,
    }));
    scene.add(pts);

    // Wireframe deco meshes
    const wf1 = new Mesh(
      new OctahedronGeometry(180, 2),
      new MeshBasicMaterial({ color: 0xff6b00, wireframe: true, transparent: true, opacity: 0.08 })
    );
    wf1.position.set(300, 0, -200);
    scene.add(wf1);

    const wf2 = new Mesh(
      new IcosahedronGeometry(90, 1),
      new MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.12 })
    );
    wf2.position.set(-200, 150, -100);
    scene.add(wf2);

    // Mouse parallax
    let mx = 0, my = 0;
    window.addEventListener('mousemove', e => {
      mx = (e.clientX / innerWidth  - 0.5) * 0.5;
      my = (e.clientY / innerHeight - 0.5) * 0.5;
    }, { passive: true });

    // Debounced resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const W = innerWidth, H = innerHeight;
        cam.aspect = W / H;
        cam.updateProjectionMatrix();
        renderer.setSize(W, H);
      }, 200);
    });

    // Render loop
    const clk = new Clock();
    const tick = () => {
      requestAnimationFrame(tick);
      const t = clk.getElapsedTime();
      pts.rotation.y = t * 0.02;
      pts.rotation.x = t * 0.01;
      wf1.rotation.x = t * 0.3;
      wf1.rotation.y = t * 0.5;
      wf2.rotation.y = -t * 0.4;
      wf2.rotation.z =  t * 0.2;
      cam.position.x += (mx * 100 - cam.position.x) * 0.05;
      cam.position.y += (-my * 80 - cam.position.y) * 0.05;
      cam.lookAt(scene.position);
      renderer.render(scene, cam);
    };
    tick();
  })();

  /* ─────────────────────────────────────────
     3D MODEL VIEWER
  ───────────────────────────────────────── */
  (() => {
    const canvas = $('#mc');
    const wrap   = $('#mwrap');
    if (!canvas || !wrap) return;

    const renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);
    renderer.setClearColor(0x10101c, 1);

    const scene = new Scene();
    const cam   = new PerspectiveCamera(45, wrap.clientWidth / wrap.clientHeight, 0.1, 100);
    cam.position.set(0, 2, 6);
    cam.lookAt(0, 0, 0);

    // Lights
    scene.add(new AmbientLight(0x404060, 0.5));
    const kl = new DirectionalLight(0xff6b00, 2); kl.position.set(5, 5, 5);   scene.add(kl);
    const fl = new DirectionalLight(0x00d4ff, 1); fl.position.set(-5, 3, -5); scene.add(fl);
    const rl = new DirectionalLight(0xffffff, .5); rl.position.set(0, -5, -5); scene.add(rl);

    // Ground grid
    const grid = new GridHelper(20, 20, 0xff6b00, 0x222240);
    grid.material.opacity    = 0.3;
    grid.material.transparent = true;
    grid.position.y = -2;
    scene.add(grid);

    // Shared materials — one GPU upload, reused across models
    const mSteel = new MeshPhongMaterial({ color: 0x334455, shininess: 80 });
    const mBlue  = new MeshPhongMaterial({ color: 0x667788, shininess: 120 });
    const mChar  = new MeshPhongMaterial({ color: 0x8899aa, shininess: 50 });
    const mGlow  = new MeshBasicMaterial({ color: 0xff6b00 });
    const mEye   = new MeshBasicMaterial({ color: 0x00d4ff });
    const mWf    = new MeshBasicMaterial({ color: 0xff6b00, wireframe: true, transparent: true, opacity: 0.15 });

    // Model definitions — swap build() with GLTFLoader calls for your own models
    const defs = [
      {
        info: 'POLY COUNT: ~8K\nFORMAT: GLB\nCATEGORY: VEHICLE',
        build() {
          const g = new Group();
          const body = new Mesh(new CylinderGeometry(0.3, 0.6, 2.5, 8), mSteel);
          body.rotation.z = Math.PI / 2;
          g.add(body);
          const wing1 = new Mesh(new BoxGeometry(0.1, 1.8, 2), new MeshPhongMaterial({ color: 0x445566, shininess: 60 }));
          wing1.position.y = 0.5;
          g.add(wing1);
          const wing2 = wing1.clone(); wing2.position.y = -0.5; g.add(wing2);
          const glow  = new Mesh(new SphereGeometry(0.3, 8, 8), mGlow); glow.position.x = -1.5; g.add(glow);
          const wf    = new Mesh(new CylinderGeometry(0.32, 0.62, 2.55, 8), mWf); wf.rotation.z = Math.PI / 2; g.add(wf);
          return g;
        },
      },
      {
        info: 'POLY COUNT: ~4K\nFORMAT: GLB\nCATEGORY: WEAPON',
        build() {
          const g = new Group();
          const blade = new Mesh(new BoxGeometry(0.08, 3, 0.06), mBlue); blade.position.y = 1; g.add(blade);
          g.add(new Mesh(new BoxGeometry(1, 0.12, 0.12), new MeshPhongMaterial({ color: 0x996622, shininess: 80 })));
          const handle = new Mesh(new CylinderGeometry(0.06, 0.06, 0.8, 8), new MeshPhongMaterial({ color: 0x443322, shininess: 20 }));
          handle.position.y = -0.5; g.add(handle);
          const jewel = new Mesh(new OctahedronGeometry(0.12), new MeshBasicMaterial({ color: 0xff3b00 }));
          jewel.position.set(0, 2.5, 0); g.add(jewel);
          g.rotation.z = 0.3;
          return g;
        },
      },
      {
        info: 'POLY COUNT: ~2K\nFORMAT: GLB\nCATEGORY: CHARACTER',
        build() {
          const g = new Group();
          const head = new Mesh(new BoxGeometry(0.7, 0.7, 0.7), mChar); head.position.y = 1.5; g.add(head);
          const body = new Mesh(new BoxGeometry(0.8, 1, 0.4),   mChar); body.position.y = 0.7; g.add(body);
          const lA   = new Mesh(new BoxGeometry(0.25, 1, 0.25), mChar); lA.position.set(-0.6, 0.7, 0); g.add(lA);
          const rA   = lA.clone(); rA.position.x = 0.6; g.add(rA);
          const lL   = new Mesh(new BoxGeometry(0.3, 1.1, 0.3), mChar); lL.position.set(-0.2, -0.35, 0); g.add(lL);
          const rL   = lL.clone(); rL.position.x = 0.2; g.add(rL);
          const e1   = new Mesh(new BoxGeometry(0.12, 0.08, 0.1), mEye); e1.position.set(-0.2, 1.55, 0.36); g.add(e1);
          const e2   = e1.clone(); e2.position.x = 0.2; g.add(e2);
          return g;
        },
      },
      {
        // ── Replace this build() with your own GLTFLoader call ──
        // Example:
        //   const loader = new THREE.GLTFLoader();
        //   loader.load('./models/my-model.glb', gltf => {
        //     scene.add(gltf.scene);
        //   });
        info: 'YOUR MODEL\nFORMAT: .GLB/.GLTF\nSEE INSTRUCTIONS',
        build() {
          const g = new Group();
          g.add(new Mesh(
            new TorusKnotGeometry(1, 0.3, 64, 8),
            new MeshPhongMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.4 })
          ));
          return g;
        },
      },
    ];

    let current = null;
    const infoEl = $('#minfo');

    function loadModel(i) {
      if (current) {
        scene.remove(current);
        current.traverse(c => { if (c.isMesh) c.geometry.dispose(); });
      }
      current = defs[i].build();
      scene.add(current);
      if (infoEl) infoEl.textContent = defs[i].info;
    }
    loadModel(0);

    // Model selector buttons
    $$('.mbtn').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        $$('.mbtn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        loadModel(i);
      });
    });

    // Unified mouse + touch orbit controls
    let drag = false, px = 0, py = 0, rotX = 0, rotY = 0, zoom = 6;

    const getXY = e => e.touches
      ? [e.touches[0].clientX, e.touches[0].clientY]
      : [e.clientX, e.clientY];

    wrap.addEventListener('mousedown',  e => { drag = true; [px, py] = getXY(e); });
    wrap.addEventListener('touchstart', e => { drag = true; [px, py] = getXY(e); }, { passive: true });
    window.addEventListener('mouseup',  () => drag = false);
    window.addEventListener('touchend', () => drag = false);

    window.addEventListener('mousemove', e => {
      if (!drag) return;
      const [cx, cy] = getXY(e);
      rotY += (cx - px) * 0.01;
      rotX += (cy - py) * 0.01;
      px = cx; py = cy;
    }, { passive: true });

    window.addEventListener('touchmove', e => {
      if (!drag) return;
      const [cx, cy] = getXY(e);
      rotY += (cx - px) * 0.01;
      rotX += (cy - py) * 0.01;
      px = cx; py = cy;
    }, { passive: true });

    wrap.addEventListener('wheel', e => {
      zoom = Math.max(2, Math.min(12, zoom + e.deltaY * 0.01));
      e.preventDefault();
    }, { passive: false });

    // Responsive — ResizeObserver keeps canvas sharp if layout shifts
    new ResizeObserver(() => {
      const W = wrap.clientWidth, H = wrap.clientHeight;
      cam.aspect = W / H;
      cam.updateProjectionMatrix();
      renderer.setSize(W, H);
    }).observe(wrap);

    // Render loop
    const clk = new Clock();
    const tick = () => {
      requestAnimationFrame(tick);
      const t = clk.getElapsedTime();
      if (current) {
        current.rotation.y  = rotY + t * 0.4;
        current.rotation.x  = rotX;
        current.position.y  = Math.sin(t * 0.8) * 0.15;
      }
      cam.position.z = zoom;
      renderer.render(scene, cam);
    };
    tick();
  })();
});
