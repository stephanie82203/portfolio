/* =========================================================
   render.js — builds the page from the files in data/.

   Each HTML page says what it is with <body data-page="...">:
     home       → index.html
     project    → project.html#<project id>
     education  → education.html#<education id>
     post       → post.html#<plan or post id>

   Contents
   1. Helpers (icons, chips, text blocks, dates)
   2. Shared parts (icons, nav, footer)
   3. Home page sections
   4. Detail pages
   ========================================================= */
(() => {
  "use strict";

  const page = document.body.dataset.page || "home";
  const isHome = page === "home";
  const $ = (sel) => document.querySelector(sel);
  const fill = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };

  /* ---------- 1. Helpers ---------- */
  const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const esc = (s) => String(s).replace(/&(?!amp;|lt;|gt;|#)/g, "&amp;").replace(/</g, "&lt;");
  const paras = (list = []) => list.map((p) => `<p>${p}</p>`).join("");
  const chip = (text, strong = false) => `<li class="chip${strong ? " strong" : ""}">${esc(text)}</li>`;
  const chips = (main = [], other = [], label = "") =>
    `<ul class="chips"${label ? ` aria-label="${label}"` : ""}>${main.map((t) => chip(t, true)).join("")}${other.map((t) => chip(t)).join("")}</ul>`;

  const blocks = (list = []) => list.map((b) => {
    if (typeof b === "string") return `<p>${b}</p>`;
    if (b.heading) return `<h3>${b.heading}</h3>`;
    if (b.list) return `<ul>${b.list.map((i) => `<li>${i}</li>`).join("")}</ul>`;
    // a step ending in [DONE] gets a tick
    if (b.steps) return `<ol class="steps">${b.steps.map((i) => /\[DONE\]\s*$/i.test(i)
      ? `<li class="done">${i.replace(/\s*\[DONE\]\s*$/i, "")}<span class="done-tag">Done</span></li>`
      : `<li>${i}</li>`).join("")}</ol>`;
    if (b.quote) return `<blockquote>${b.quote}</blockquote>`;
    if (b.callout) return `<div class="callout"><p class="k">${b.callout.label}</p><p>${b.callout.text}</p></div>`;
    if (b.kpis) return `<ul class="kpis">${b.kpis.map(([v, k]) => `<li><strong>${v}</strong><span>${k}</span></li>`).join("")}</ul>`;
    if (b.chips) return chips([], b.chips);
    if (b.image) return `<figure class="inline-figure"><img src="${b.image}" alt="${b.alt || ""}" loading="lazy">${b.caption ? `<figcaption>${b.caption}</figcaption>` : ""}</figure>`;
    if (b.chart) {
      const c = b.chart;
      const max = Math.max(...c.rows.map((r) => r[1]));
      const rows = c.rows.map(([name, v, shown]) =>
        `<li><span>${name}</span><span class="track"><i style="--v:${((v / max) * 100).toFixed(0)}%"></i></span><span class="val">${shown ?? v}</span></li>`).join("");
      return `<figure class="mini-chart" data-reveal><p class="title">${c.title}</p>${c.sub ? `<p class="sub">${c.sub}</p>` : ""}<ul class="bars">${rows}</ul>${c.note ? `<p class="chart-note">${c.note}</p>` : ""}</figure>`;
    }
    if (b.links) return linkList(b.links);
    if (b.pdf) return `<figure class="pdf-embed"><iframe src="${b.pdf}" title="${b.title || "PDF report"}" loading="lazy"></iframe>
      <figcaption><a href="${b.pdf}" target="_blank" rel="noopener">Open the PDF in a new tab ${icon("external")}</a></figcaption></figure>`;
    return "";
  }).join("");

  const linkList = (links = []) => `<ul class="link-list">${links.map((l) =>
    `<li><a href="${l.url}" target="_blank" rel="noopener">${l.label} <span>${l.hint || ""}</span>${icon("external")}</a></li>`).join("")}</ul>`;

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const parseYM = (s) => {
    if (!s || String(s).toLowerCase() === "present") {
      const now = new Date();
      return { y: now.getFullYear(), m: now.getMonth() + 1, present: true };
    }
    const [y, m] = String(s).split("-").map(Number);
    return { y, m: m || 1, present: false };
  };
  const fmtYM = (d) => (d.present ? "Present" : `${MONTHS[d.m - 1]} ${d.y}`);
  const lengthOf = (a, b) => {
    const months = (b.y - a.y) * 12 + (b.m - a.m) + 1;
    const y = Math.floor(months / 12), m = months % 12;
    const parts = [];
    if (y) parts.push(`${y} yr${y > 1 ? "s" : ""}`);
    if (m) parts.push(`${m} mo${m > 1 ? "s" : ""}`);
    return parts.join(" ") || "1 mo";
  };

  /* ---------- 2. Shared parts ---------- */
  if (typeof ICONS !== "undefined") document.body.insertAdjacentHTML("afterbegin", ICONS);

  const SECTIONS = [
    ["experiences", "Experiences"],
    ["skills", "Skills"],
    ["projects", "Projects"],
    ["education", "Education"],
    ["plans-blog", "Plans &amp; Blog"],
    ["about-site", "About this site"],
  ];
  const BACK = {
    project: ["projects", "Back to projects"],
    education: ["education", "Back to education"],
    post: ["plans-blog", "Back to plans &amp; blog"],
  };

  const nav = $(".nav");
  if (nav) {
    const back = BACK[page];
    const links = SECTIONS.map(([id, label]) =>
      `<li><a class="nav-link${back && back[0] === id ? " is-active" : ""}" href="${isHome ? "" : "index.html"}#${id}"><span class="label" data-label="${label}">${label}</span></a></li>`).join("");
    nav.innerHTML = `
      <div class="container nav-inner${back ? " has-back" : ""}">
        ${back ? `<a class="nav-back" href="index.html#${back[0]}">${icon("arrow-left")}<span>${back[1]}</span></a>` : ""}
        <button class="nav-toggle" type="button" aria-label="Menu" aria-expanded="false" aria-controls="nav-links"><span></span><span></span><span></span></button>
        <nav aria-label="Main"><ul class="nav-links" id="nav-links">${links}</ul></nav>
      </div>
      <div class="scroll-progress" aria-hidden="true"></div>`;
  }

  const footer = $(".footer");
  if (footer && typeof PROFILE !== "undefined") {
    const P = PROFILE;
    footer.innerHTML = `
      <div class="container">
        <div class="footer-top reveal">
          <ul class="footer-links">
            <li><a class="btn btn-sm" href="${P.links.linkedin}" target="_blank" rel="noopener">${icon("linkedin")}LinkedIn</a></li>
            <li><a class="btn btn-sm" href="${P.links.github}" target="_blank" rel="noopener">${icon("github")}GitHub</a></li>
          </ul>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Stephanie CKH</span>
          <a class="to-top" href="#hero">Back to top ${icon("arrow-up")}</a>
        </div>
      </div>`;
  }

  // Section intro text: <p class="lead" data-intro="EXPERIENCES"></p>
  document.querySelectorAll("[data-intro]").forEach((el) => {
    try { el.innerHTML = eval(el.dataset.intro).intro || ""; } catch (e) { /* data file not loaded */ }
  });

  /* ---------- 3. Home page sections ---------- */
  if (isHome) {
    // Landing
    if (typeof PROFILE !== "undefined") {
      const P = PROFILE;
      fill("#hero", `
        <div class="hero-content">
          <h1 class="hero-title hero-anim" style="--d:200ms">${P.name}</h1>
          <div class="hero-text hero-anim" style="--d:420ms">${paras(P.intro)}</div>
          <div class="hero-actions hero-anim" style="--d:540ms">
            <a class="btn btn-primary" href="${P.links.linkedin}" target="_blank" rel="noopener">${icon("linkedin")}LinkedIn</a>
            <a class="btn" href="${P.links.resume}" target="_blank" rel="noopener">${icon("download")}Résumé (PDF)</a>
          </div>
          <ul class="hero-stats hero-anim" style="--d:660ms">
            ${P.stats.map((s) => `<li><strong>${s.value}</strong><span>${s.label}</span></li>`).join("")}
          </ul>
        </div>
        <figure class="hero-photo hero-anim" style="--d:350ms">
          <div class="frame"><img src="${P.photo}" width="800" height="1000" alt="Portrait of ${P.name}"></div>
          <figcaption><span class="live-dot" aria-hidden="true"></span>${P.photoCaption}</figcaption>
        </figure>`);

      // About this site
      const A = P.about;
      fill("#about-photo", `<img src="${A.photo}" width="1200" height="900" alt="${A.photoAlt}" loading="lazy">`);
      fill("#about-text", A.paragraphs.map((p) => `<p class="reveal">${p}</p>`).join(""));
      fill("#about-colophon", A.colophon);
    }

    // Experiences
    if (typeof EXPERIENCES !== "undefined") {
      const items = EXPERIENCES.items.map((x, i) => {
        const a = parseYM(x.start), b = parseYM(x.end);
        const n = i + 1;
        const expander = (kind, label, hint, ic, body) => `
          <div class="expander" data-kind="${kind}">
            <button class="expander-btn" type="button" aria-expanded="false" aria-controls="exp${n}-${kind}">
              <span class="kind-icon" aria-hidden="true">${icon(ic)}</span>
              <span>${label} <span class="hint">— ${hint}</span></span>
              <span class="toggle" aria-hidden="true"></span>
            </button>
            <div class="expander-panel" id="exp${n}-${kind}" role="region"><div class="inner"><div>${body}</div></div></div>
          </div>`;
        return `
          <li class="tl-item">
            <div class="tl-date"><strong>${fmtYM(a)} – ${fmtYM(b)}</strong><span>${lengthOf(a, b)}</span></div>
            <span class="tl-dot" aria-hidden="true"></span>
            <article class="tl-card">
              <header class="tl-head">
                ${x.logo ? `<img class="org-logo" src="${x.logo}" width="48" height="48" alt="">` : ""}
                <div>
                  <h3 class="tl-role">${x.role}</h3>
                  <p class="tl-org">${x.company}${x.location ? `<span class="sep">·</span><span class="loc">${x.location}</span>` : ""}</p>
                </div>
              </header>
              <div class="tl-desc">${paras(x.description)}</div>
              ${x.tools && x.tools.length ? chips([], x.tools, "Tools") : ""}
              <div class="expanders">
                ${x.initiative && x.initiative.length ? expander("initiative", "Initiative", "assess issues independently and take action", "bulb", paras(x.initiative) + (x.impact ? `<span class="impact">${x.impact}</span>` : "")) : ""}
                ${x.journey && x.journey.length ? expander("journey", "Work Journey", "learning path", "route", paras(x.journey)) : ""}
              </div>
            </article>
          </li>`;
      }).join("");
      fill("#experience-list", `<li class="timeline-track" aria-hidden="true"></li><li class="timeline-progress" aria-hidden="true"></li>${items}`);
    }

    // Skills
    if (typeof SKILLS !== "undefined") {
      fill("#skills-grid", SKILLS.items.map((s) => {
        let body = "";
        if (s.groups) {
          body = `<div class="tool-groups">${s.groups.map((g) =>
            `<div class="tool-group"><h4>${g.name}</h4>${chips(g.main, g.other)}</div>`).join("")}</div>`;
        } else if (s.languages) {
          body = `<ul class="meters">${s.languages.map((l) =>
            `<li><div class="meter-row"><span>${l.name}</span><span>${l.level}</span></div><div class="meter"><i style="--v:${l.value}%"></i></div></li>`).join("")}</ul>`;
        } else {
          body = chips(s.main, s.other);
        }

        const count = s.groups
          ? s.groups.reduce((n, g) => n + (g.main || []).length + (g.other || []).length, 0)
          : (s.main || []).length + (s.other || []).length;
        const size = s.groups ? " size-xl" : count >= 8 ? " size-wide" : "";
        return `
          <li class="reveal${size}">
            <article class="skill-card${s.groups ? " featured" : ""}">
              ${s.tag ? `<div class="top"><span class="tag">${s.tag}</span></div>` : ""}
              <h3>${s.title}</h3>
              ${s.text ? `<p>${s.text}</p>` : ""}
              ${body}
            </article>
          </li>`;
      }).join(""));

      const grid = $("#skills-grid");
      const fit = (li) => { li.style.gridRowEnd = `span ${Math.ceil(li.firstElementChild.offsetHeight + 18)}`; };
      const ro = new ResizeObserver((entries) => entries.forEach((e) => fit(e.target.parentElement)));
      grid.querySelectorAll(":scope > li > .skill-card").forEach((card) => ro.observe(card));
    }

    // Projects
    if (typeof PROJECTS !== "undefined") {
      fill("#project-list", PROJECTS.items.map((p) => {
        // Only projects with a `report` get a details page; `image` and `pdf` are optional.
        // A project with a pdf but no report opens the PDF straight from the card.
        const href = p.report ? `project.html#${p.id}` : p.pdf || "";
        const newTab = !p.report && p.pdf ? ' target="_blank" rel="noopener"' : "";
        const img = p.image ? `<img src="${p.image}" width="1200" height="750" alt="" loading="lazy">` : "";
        const thumb = !img ? "" : href
          ? `<a class="project-thumb" href="${href}"${newTab} tabindex="-1" aria-hidden="true">${img}</a>`
          : `<div class="project-thumb">${img}</div>`;
        return `
          <li class="reveal-left">
            <article class="project${img ? "" : " no-image"}">
              ${thumb}
              <div class="project-body">
                <p class="project-meta"><span class="tag">${p.type}</span> · ${p.year}</p>
                <h3>${p.title}</h3>
                <p>${p.summary}</p>
                ${chips([], p.tools, "Tools")}
                ${href || p.github ? `<div class="project-actions">
                  ${href ? `<a class="btn btn-primary btn-sm" href="${href}"${newTab}>${icon("file")}Read the report${newTab ? " (PDF)" : ""}</a>` : ""}
                  ${p.report && p.pdf ? `<a class="btn btn-sm" href="${p.pdf}" target="_blank" rel="noopener">${icon("download")}PDF</a>` : ""}
                  ${p.github ? `<a class="btn btn-sm" href="${p.github}" target="_blank" rel="noopener">${icon("github")}View on GitHub</a>` : ""}
                </div>` : ""}
              </div>
            </article>
          </li>`;
      }).join(""));
    }

    // Education
    if (typeof EDUCATION !== "undefined") {
      fill("#edu-grid", EDUCATION.items.map((e) => `
        <li class="reveal">
          <article class="edu-card">
            <span class="badge badge-${e.kind === "degree" ? "degree" : "cert"}">${e.kind === "degree" ? "Degree" : "Certification"}</span>
            <h3>${e.title}</h3>
            <p class="inst">${e.institution}</p>
            <p class="when">${e.when}</p>
            <p>${e.summary}</p>
            <a class="text-link" href="education.html#${e.id}">View details ${icon("arrow-right")}</a>
          </article>
        </li>`).join(""));
    }

    // Plans & Blog
    if (typeof BLOG !== "undefined") {
      fill("#post-grid", BLOG.items.map((b) => {
        const isPlan = b.type === "plan";
        const right = isPlan
          ? `<span class="status${/progress/i.test(b.status || "") ? " now" : ""}">${b.status || ""}</span>`
          : `<span>${b.date || ""}${b.readTime ? ` · ${b.readTime}` : ""}</span>`;
        return `
          <li class="reveal" data-type="${isPlan ? "plan" : "post"}">
            <article class="post-card" data-type="${isPlan ? "plan" : "post"}">
              ${b.image ? `<img class="post-cover" src="${b.image}" width="1200" height="630" alt="" loading="lazy">` : ""}
              <div class="post-body">
                <div class="row"><span class="type">${isPlan ? "PLAN" : "POST"}</span>${right}</div>
                <h3>${b.title}</h3>
                <p>${b.summary}</p>
                ${isPlan && b.progress != null ? `<div class="plan-bar" aria-label="${b.progress}% complete"><i style="--v:${b.progress}%"></i></div>` : ""}
                <a class="text-link" href="post.html#${b.id}">${isPlan ? "See the plan" : "Read post"} ${icon("arrow-right")}</a>
              </div>
            </article>
          </li>`;
      }).join(""));
    }
    return;
  }

  /* ---------- 4. Detail pages ---------- */
  window.addEventListener("hashchange", () => location.reload());

  const id = decodeURIComponent(location.hash.slice(1));
  const main = $("#main");
  const SOURCES = { project: "PROJECTS", education: "EDUCATION", post: "BLOG" };
  let data = null;
  try { data = eval(SOURCES[page]); } catch (e) { /* data file missing */ }
  const items = (data ? data.items : []).filter((x) => page !== "project" || x.report);
  const index = items.findIndex((x) => x.id === id);

  if (index < 0) {
    const back = BACK[page] || ["", "Back"];
    main.innerHTML = `
      <section class="page-hero"><div class="container">
        <h1 class="page-title">Page not found</h1>
        <p class="page-summary">This link doesn't match anything on the site.</p>
        <div class="page-actions"><a class="btn btn-primary btn-sm" href="index.html#${back[0]}">${icon("arrow-left")}${back[1]}</a></div>
      </div></section>`;
    return;
  }

  const item = items[index];
  const next = items[(index + 1) % items.length];
  const name = typeof PROFILE !== "undefined" ? PROFILE.name : "";
  document.title = `${item.title.replace(/<[^>]+>/g, "")}${name ? ` — ${name}` : ""}`;

  const hero = ({ bg, kicker, title, intro, facts, actions = "", cover = "" }) => `
    <section class="page-hero">
      <div class="section-bg" aria-hidden="true"><img src="assets/bg/${bg}.jpg" width="1600" height="1000" alt=""></div>
      <div class="container">
        <p class="eyebrow reveal">${kicker}</p>
        <h1 class="page-title reveal">${title}</h1>
        ${intro ? `<p class="page-summary reveal">${intro}</p>` : ""}
        <ul class="facts reveal">${facts.filter((f) => f[1]).map(([k, v]) => `<li><span class="k">${k}</span><span class="v">${v}</span></li>`).join("")}</ul>
        ${actions ? `<div class="page-actions reveal">${actions}</div>` : ""}
        ${cover ? `<figure class="cover reveal"><img src="${cover}" width="1200" height="750" alt=""></figure>` : ""}
      </div>
    </section>`;

  const numbered = (sections) => sections.filter(([, , body]) => body).map(([sid, label, body], i) => `
    <section id="${sid}" class="reveal">
      <h2><span class="n">${String(i + 1).padStart(2, "0")}</span>${label}</h2>
      ${body}
    </section>`).join("");

  const nextCard = (href, label) => items.length < 2 ? "" : `
    <section class="next-up"><div class="container">
      <a class="next-card reveal" href="${href}">
        <div><p class="k">${label}</p><h3>${next.title}</h3></div>${icon("arrow-right")}
      </a>
    </div></section>`;

  if (page === "project") {
    // Each report lists its own sections: { title, subtitle, body: [...] }
    const rep = item.report;
    const SECTIONS_R = (rep.sections || []).map((s, i) => [
      `s${i + 1}`,
      s.title,
      (s.subtitle ? `<p class="section-sub">${s.subtitle}</p>` : "") + blocks(s.body),
    ]);
    main.innerHTML = hero({
      bg: "projects",
      kicker: rep.kicker || "Project report",
      title: rep.title || item.title,
      intro: rep.intro,
      facts: rep.facts || [["Type", item.type], ["Year", item.year], ["Role", rep.role], ["Tools", (item.tools || []).join(" · ")]],
      actions: (item.github ? `<a class="btn btn-primary btn-sm" href="${item.github}" target="_blank" rel="noopener">${icon("github")}View on GitHub</a>` : "")
        + (item.pdf ? `<a class="btn btn-sm" href="${item.pdf}" target="_blank" rel="noopener">${icon("download")}Full report (PDF)</a>` : ""),
      cover: rep.cover === false ? "" : rep.cover || item.image,
    }) + `
      <div class="container doc">
        <aside class="toc reveal" aria-label="On this page">
          <p class="toc-title">On this page</p>
          <ol>${SECTIONS_R.map(([sid, label]) => `<li><a href="#" data-target="${sid}">${label}</a></li>`).join("")}</ol>
        </aside>
        <article class="prose">${numbered(SECTIONS_R)}</article>
      </div>` + nextCard(`project.html#${next.id}`, "Next project");
  }

  if (page === "education") {
    const p = item.page || {};
    const isDegree = item.kind === "degree";
    let sections;

    if (isDegree) {
      const groups = [];
      (p.courses || []).forEach((c) => {
        let g = groups.find((x) => x.field === c.field);
        if (!g) groups.push(g = { field: c.field, names: [] });
        g.names.push(c.name);
      });
      const shown = p.fieldsShown || 2;
      const courseHtml = groups.length ? `
        <div class="course-groups" id="course-groups">
          ${groups.map((g, i) => `
            <div class="course-group${i >= shown ? " more" : ""}">
              <h3>${/elective/i.test(g.field) ? g.field : `${g.field} courses`}</h3>
              ${chips([], g.names)}
            </div>`).join("")}
        </div>
        ${groups.length > shown ? `<button type="button" class="btn btn-sm course-toggle" aria-controls="course-groups" aria-expanded="false" data-more="See all courses" data-less="Show fewer">See all courses</button>` : ""}` : "";

      sections = [
        ["why-major", "Why I picked my major", blocks(p.whyMajor)],
        ["outside-class", "Outside of class", blocks(p.outsideClass)],
        ["courses", "Courses", courseHtml],
      ];
    } else {
      // Certification
      const cert = p.certificate || {};
      const linkedin = typeof PROFILE !== "undefined" && PROFILE.links ? PROFILE.links.linkedin : "";
      const certHtml = cert.url
        ? `<p>${cert.text || "Here's my certificate:"}</p>
           <p><a class="btn btn-primary btn-sm" href="${cert.url}" target="_blank" rel="noopener">${icon("linkedin")}View certificate on LinkedIn</a></p>`
        : `<div class="callout"><p class="k">Not posted yet</p><p>${cert.note || "Once I pass the exam, I'll post the certificate on LinkedIn and link it here."}</p></div>
           ${linkedin ? `<p><a class="btn btn-sm" href="${linkedin}" target="_blank" rel="noopener">${icon("linkedin")}Follow along on LinkedIn</a></p>` : ""}`;

      sections = [
        ["why", p.whyHeading || "Why I'm doing this", blocks(p.why)],
        ["why-first", p.whyFirstHeading || "Why this one first", blocks(p.whyFirst)],
        ["studying", "How I'm studying", blocks(p.howStudying)],
        ["certificate", "Certificate", certHtml],
      ];
    }

    main.innerHTML = hero({
      bg: "education",
      kicker: isDegree ? "Degree" : "Certification",
      title: item.title,
      intro: p.intro,
      facts: p.facts || [],
    }) + `
      <div class="article">
        <article class="prose">${numbered(sections)}</article>
      </div>` + nextCard(`education.html#${next.id}`, "Next");

    // "See all courses" button
    const toggle = $(".course-toggle");
    if (toggle) toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      $("#course-groups").classList.toggle("open", open);
      toggle.textContent = open ? toggle.dataset.less : toggle.dataset.more;
    });
  }

  if (page === "post") {
    const isPlan = item.type === "plan";
    main.innerHTML = hero({
      bg: "plans-blog",
      kicker: isPlan ? `Plan · ${item.status || ""}` : `Post · ${item.date || ""}`,
      title: item.title,
      intro: item.intro || item.summary,
      facts: isPlan
        ? [["Status", `${item.status || ""}${item.progress != null ? ` · ${item.progress}%` : ""}`], ["Started", item.started], ["Target", item.target]]
        : [["Published", item.date], ["Reading time", item.readTime], ["Tags", item.tags]],
      actions: item.github ? `<a class="btn btn-primary btn-sm" href="${item.github}" target="_blank" rel="noopener">${icon("github")}View on GitHub</a>` : "",
      cover: item.image,
    }) + `
      <div class="article">
        <article class="prose reveal">${blocks(item.body)}</article>
      </div>` + nextCard(`post.html#${next.id}`, "Read next");
  }
})();
