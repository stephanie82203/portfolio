/* =========================================================
   Portfolio interactions:
   1. Page position (detail pages open at the top, #links jump instantly)
   2. Navigation (scrolled state, mobile menu, scroll-spy, progress bar)
   3. Reveal on scroll (+ one-by-one experience timeline)
   4. Timeline progress line
   5. Expanders (Initiative / Work Journey)
   6. Plans & Blog filter
   7. Table of contents scroll-spy (detail pages)
   8. Hero: floating data points
   9. Colour shimmer (WebGL, whole page)
   ========================================================= */
(() => {
  "use strict";

  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const raf2 = (fn) => requestAnimationFrame(() => requestAnimationFrame(fn));

  /* One rAF-throttled scroll/resize loop shared by every feature */
  const scrollTasks = [];
  let ticking = false;
  const requestTick = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      scrollTasks.forEach((fn) => fn());
    });
  };
  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", requestTick, { passive: true });

  /* ---------- 1. Page position ---------- */
  const isDetail = (document.body.dataset.page || "home") !== "home";
  if (isDetail) {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    window.addEventListener("pageshow", () => window.scrollTo(0, 0));
  }

  // Opening index.html#projects: jump straight to the section, with no animation on the way.
  const jumpTarget = !isDetail && location.hash.length > 1 ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
  let userMoved = false;
  ["wheel", "touchstart", "keydown", "pointerdown"].forEach((ev) =>
    window.addEventListener(ev, () => { userMoved = true; }, { passive: true, once: true })
  );
  const alignToTarget = () => { if (jumpTarget && !userMoved) jumpTarget.scrollIntoView({ block: "start" }); };
  if (jumpTarget) {
    alignToTarget();
    // fonts and images can shift the layout; re-align once they're in
    document.fonts && document.fonts.ready.then(alignToTarget);
    window.addEventListener("load", alignToTarget, { once: true });
  }
  const finishJump = () => {
    // wait for the reveal observer to mark on-screen items visible, then turn animations back on
    raf2(() => setTimeout(() => {
      root.classList.remove("jumping");
      if (!reduceMotion) root.classList.add("smooth");
    }, 120));
  };

  /* ---------- 2. Navigation ---------- */
  const nav = $(".nav");
  if (nav) {
    const toggle = $(".nav-toggle", nav);
    const progress = $(".scroll-progress", nav);

    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      if (toggle) toggle.setAttribute("aria-expanded", String(open));
    };
    if (toggle) toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    $$(".nav-link", nav).forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });

    scrollTasks.push(() => {
      const y = window.scrollY;
      nav.classList.toggle("is-scrolled", y > 12);
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      }
    });

    const spyLinks = $$('.nav-link[href^="#"]', nav);
    const sections = spyLinks.map((a) => document.getElementById(a.getAttribute("href").slice(1))).filter(Boolean);
    if (sections.length && "IntersectionObserver" in window) {
      const spy = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          spyLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${entry.target.id}`));
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      sections.forEach((s) => spy.observe(s));
      const hero = $(".hero");
      if (hero) {
        new IntersectionObserver(([e]) => {
          if (e.isIntersecting) spyLinks.forEach((a) => a.classList.remove("is-active"));
        }, { rootMargin: "-45% 0px -50% 0px" }).observe(hero);
      }
    }
  }

  /* ---------- 3. Reveal on scroll ---------- */
  $$("[data-stagger]").forEach((group) => {
    const step = Number(group.dataset.stagger) || 90;
    $$(":scope > .reveal, :scope > .reveal-left", group).forEach((el, i) => {
      el.style.setProperty("--d", `${Math.min(i * step, 600)}ms`);
    });
  });

  const observe = (els, rootMargin) => {
    if (!els.length) return;
    if (!("IntersectionObserver" in window) || reduceMotion) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin, threshold: 0 });
    els.forEach((el) => io.observe(el));
  };
  observe($$(".reveal, .reveal-left, [data-reveal]"), "0px 0px -8% 0px");
  observe($$(".tl-item"), "0px 0px -28% 0px");

  if (root.classList.contains("jumping")) finishJump();
  else if (!reduceMotion) window.addEventListener("load", () => root.classList.add("smooth"), { once: true });

  /* ---------- 4. Timeline progress line ---------- */
  const timeline = $(".timeline");
  if (timeline) {
    const bar = $(".timeline-progress", timeline);
    scrollTasks.push(() => {
      const r = timeline.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      const p = (vh * 0.6 - r.top) / r.height;
      bar.style.setProperty("--progress", Math.max(0, Math.min(1, p)).toFixed(4));
    });
  }

  /* ---------- 5. Expanders ---------- */
  $$(".expander").forEach((exp) => {
    const btn = $(".expander-btn", exp);
    if (!btn) return;
    btn.addEventListener("click", () => {
      const open = !exp.classList.contains("is-open");
      exp.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------- 6. Plans & Blog filter ---------- */
  $$("[data-filter]").forEach((filter) => {
    const buttons = $$("button", filter);
    const pill = $(".pill", filter);
    const grid = document.getElementById(filter.dataset.filter);
    if (!grid) return;
    const items = $$(":scope > li", grid);
    const activeBtn = () => buttons.find((b) => b.getAttribute("aria-pressed") === "true") || buttons[0];

    const movePill = (btn) => {
      if (!pill || !btn) return;
      pill.style.width = `${btn.offsetWidth}px`;
      pill.style.transform = `translateX(${btn.offsetLeft}px)`;
    };

    const apply = (btn) => {
      const type = btn.dataset.value;
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      movePill(btn);
      let i = 0;
      items.forEach((li) => {
        const show = type === "all" || li.dataset.type === type;
        li.classList.remove("is-entering");
        li.classList.toggle("is-hidden", !show);
        if (show) {
          li.style.setProperty("--d", `${i++ * 60}ms`);
          void li.offsetWidth; // restart the entrance animation
          li.classList.add("is-entering");
        }
      });
    };

    buttons.forEach((b) => b.addEventListener("click", () => apply(b)));
    if (pill) {
      pill.style.transition = "none";
      movePill(activeBtn());
      requestAnimationFrame(() => { pill.style.transition = ""; });
    }
    window.addEventListener("resize", () => movePill(activeBtn()), { passive: true });
    document.fonts && document.fonts.ready.then(() => movePill(activeBtn()));
  });

  /* ---------- 7. Table of contents scroll-spy (project reports) ---------- */
  const toc = $(".toc");
  if (toc && "IntersectionObserver" in window) {
    const links = $$("[data-target]", toc);
    const targets = links.map((a) => document.getElementById(a.dataset.target)).filter(Boolean);
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("is-active", a.dataset.target === entry.target.id));
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    targets.forEach((t) => spy.observe(t));
    links.forEach((a) => a.addEventListener("click", (e) => {
      e.preventDefault();
      const t = document.getElementById(a.dataset.target);
      if (t) t.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }));
  }

  /* ---------- 8. Hero: floating data points ----------
     Points drift slowly and link up when they're close, like a network
     or a living scatter plot. They lean toward the cursor on desktop. */
  const canvas = $(".hero-canvas");
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");
    const hero = canvas.parentElement;
    const LINK_DIST = 140;
    const MOUSE_DIST = 190;
    const colors = {
      dot: "91, 63, 242",
      accent: "255, 106, 61",
      warm: "16, 179, 163",
      line: "91, 63, 242",
    };
    let w = 0, h = 0, dpr = 1, points = [], running = false, inView = true, rafId = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    const build = () => {
      const rect = hero.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(110, Math.max(28, (w * h) / 13000)));
      points = Array.from({ length: count }, (_, i) => {
        const speed = 0.12 + Math.random() * 0.22;
        const angle = Math.random() * Math.PI * 2;
        const kind = i % 9 === 0 ? "warm" : i % 4 === 0 ? "accent" : "dot";
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: kind === "dot" ? 1.3 + Math.random() * 1.2 : 2 + Math.random() * 1.6,
          kind,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;
        if (mouse.active) {
          const dx = mouse.x - p.x, dy = mouse.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_DIST * MOUSE_DIST && d2 > 1) {
            const f = 0.012 * (1 - Math.sqrt(d2) / MOUSE_DIST);
            p.x += dx * f;
            p.y += dy * f;
          }
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.28;
            const c = a.kind === "accent" || b.kind === "accent" ? colors.accent : colors.line;
            ctx.strokeStyle = `rgba(${c}, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        if (mouse.active) {
          const dx = a.x - mouse.x, dy = a.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_DIST * MOUSE_DIST) {
            const alpha = (1 - Math.sqrt(d2) / MOUSE_DIST) * 0.5;
            ctx.strokeStyle = `rgba(${colors.dot}, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      for (const p of points) {
        const pulse = p.kind === "dot" ? 0.55 : 0.8 + Math.sin(t * 0.002 + p.phase) * 0.2;
        ctx.fillStyle = `rgba(${colors[p.kind]}, ${pulse.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        if (p.kind !== "dot") {
          ctx.fillStyle = `rgba(${colors[p.kind]}, 0.1)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (t) => { draw(t); rafId = requestAnimationFrame(loop); };
    const start = () => {
      if (running || reduceMotion || !inView || document.hidden) return;
      running = true;
      rafId = requestAnimationFrame(loop);
    };
    const stop = () => { running = false; cancelAnimationFrame(rafId); };

    build();
    if (reduceMotion) draw(0); else start();

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => { inView = e.isIntersecting; inView ? start() : stop(); }).observe(hero);
    }
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

    let resizeTimer = 0, lastWidth = window.innerWidth;
    window.addEventListener("resize", () => {
      if (Math.abs(window.innerWidth - lastWidth) < 2 && Math.abs(hero.offsetHeight - h) < 120) return; // mobile address bar
      lastWidth = window.innerWidth;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { build(); if (reduceMotion) draw(0); }, 150);
    }, { passive: true });

    hero.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = true;
    }, { passive: true });
    hero.addEventListener("pointerleave", () => { mouse.active = false; });
  }

  /* ---------- 9. Colour shimmer (whole page) ----------
     A WebGL layer fixed over the page backgrounds */
  const SHIMMER = {
    colors: ["#9f8bff", "#ff9ec4", "#7fdcff"], // palette the colour moves through (1–3 colours)
    speed: 0.35,      // how fast the colours drift
    scale: 0.8,       // size of the colour fields: lower = bigger, softer
    intensity: 0.38,  // how strong the colour is (0–1)
    fps: 30,
    resolution: 0.5,  // render scale (0.5 = half resolution)
  };
  const sh = $(".shimmer");
  const gl = sh && (sh.getContext("webgl", { premultipliedAlpha: true, antialias: false }) || sh.getContext("experimental-webgl"));
  if (gl) {
    const vert = "attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }";
    const frag = `
      precision mediump float;
      uniform vec2 uRes; uniform float uTime; uniform float uScale; uniform float uIntensity;
      uniform vec3 uC1; uniform vec3 uC2; uniform vec3 uC3;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p){
        vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }
      float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; } return v; }
      void main(){
        vec2 uv = gl_FragCoord.xy / uRes;
        vec2 p = uv * vec2(uRes.x / uRes.y, 1.0) * uScale;
        float t = uTime;
        // two layers of slowly moving soft noise, one warping the other
        vec2 q = vec2(fbm(p + vec2(t * 0.05, -t * 0.03)), fbm(p + vec2(-t * 0.04, t * 0.05) + 5.2));
        float f = fbm(p * 0.9 + q * 1.6 + vec2(t * 0.02));
        // colour drifts through the palette over time and space
        float h = fract(f * 1.3 + uv.x * 0.2 + t * 0.04);
        vec3 col = h < 0.5 ? mix(uC1, uC2, h * 2.0) : mix(uC2, uC3, (h - 0.5) * 2.0);
        float a = uIntensity * smoothstep(0.2, 0.8, f);
        gl_FragColor = vec4(col * a, a); // premultiplied alpha
      }`;
    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = compile(gl.VERTEX_SHADER, vert);
    const fs = compile(gl.FRAGMENT_SHADER, frag);
    const prog = vs && fs && gl.createProgram();
    if (prog) {
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
    }
    if (prog && gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      gl.useProgram(prog);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, "p");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      const U = (n) => gl.getUniformLocation(prog, n);
      const uRes = U("uRes"), uTime = U("uTime");
      const hex = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16) / 255);
      const pal = SHIMMER.colors.length === 1 ? [SHIMMER.colors[0], SHIMMER.colors[0], SHIMMER.colors[0]]
        : SHIMMER.colors.length === 2 ? [SHIMMER.colors[0], SHIMMER.colors[1], SHIMMER.colors[0]] : SHIMMER.colors;
      gl.uniform3fv(U("uC1"), hex(pal[0]));
      gl.uniform3fv(U("uC2"), hex(pal[1]));
      gl.uniform3fv(U("uC3"), hex(pal[2]));
      gl.uniform1f(U("uScale"), SHIMMER.scale);
      gl.uniform1f(U("uIntensity"), SHIMMER.intensity);

      const size = () => {
        const s = SHIMMER.resolution;
        sh.width = Math.max(1, Math.round(window.innerWidth * s));
        sh.height = Math.max(1, Math.round(window.innerHeight * s));
        gl.viewport(0, 0, sh.width, sh.height);
        gl.uniform2f(uRes, sh.width, sh.height);
      };
      size();
      window.addEventListener("resize", size, { passive: true });

      const t0 = performance.now();
      const frameGap = 1000 / SHIMMER.fps;
      let last = 0, shRaf = 0, lastScroll = -1e9;
      // pause while the page is scrolling so scrolling stays smooth; the drift is too slow to notice the pause
      window.addEventListener("scroll", () => { lastScroll = performance.now(); }, { passive: true });
      const render = (now) => {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(uTime, ((now - t0) / 1000) * SHIMMER.speed);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };
      const tick = (now) => {
        shRaf = requestAnimationFrame(tick);
        if (now - last < frameGap || now - lastScroll < 200) return;
        last = now;
        render(now);
      };
      if (reduceMotion) render(t0 + 4000);
      else shRaf = requestAnimationFrame(tick);
      document.addEventListener("visibilitychange", () => {
        cancelAnimationFrame(shRaf);
        if (!document.hidden && !reduceMotion) shRaf = requestAnimationFrame(tick);
      });
    } else {
      sh.remove();
    }
  } else if (sh) {
    sh.remove();
  }

  requestTick();
})();
