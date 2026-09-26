(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  $("[data-year]").textContent = new Date().getFullYear();

  /* ───────────── Split hero first name into letters ───────────── */
  $$(".split").forEach((el) => {
    const text = el.textContent;
    el.innerHTML = [...text]
      .map((c, i) => `<span class="char" style="transition-delay:${0.15 + i * 0.06}s">${c}</span>`)
      .join("");
  });

  /* ───────────── BUT progress ───────────── */
  $$(".edu__progress").forEach((el) => {
    const start = new Date(el.dataset.start).getTime();
    const end = new Date(el.dataset.end).getTime();
    const pct = Math.round(Math.min(1, Math.max(0, (Date.now() - start) / (end - start))) * 100);
    el.style.setProperty("--pct", pct + "%");
    $(".edu__pct", el).textContent = `${pct} % du parcours`;
  });

  /* ───────────── Loader ───────────── */
  const loader = $(".loader");
  const bar = $(".loader__bar i");
  const count = $(".loader__count");
  const finish = () => {
    loader.classList.add("is-done");
    document.body.classList.remove("is-loading");
    requestAnimationFrame(() => document.body.classList.add("is-ready"));
    startRotator();
  };
  if (reduceMotion) {
    finish();
  } else {
    let pct = 0;
    const tick = setInterval(() => {
      pct = Math.min(100, pct + Math.ceil(Math.random() * 12));
      bar.style.width = pct + "%";
      count.textContent = pct;
      if (pct >= 100) {
        clearInterval(tick);
        setTimeout(finish, 250);
      }
    }, 55);
  }

  /* ───────────── Typing rotator ───────────── */
  function startRotator() {
    const el = $("[data-roles]");
    const roles = el.dataset.roles.split("|");
    if (reduceMotion) {
      el.textContent = roles[0];
      return;
    }
    el.innerHTML = '<span class="txt"></span><span class="caret"></span>';
    const txt = $(".txt", el);
    let r = 0, i = 0, deleting = false;
    const step = () => {
      const word = roles[r];
      txt.textContent = word.slice(0, i);
      if (!deleting && i === word.length) {
        deleting = true;
        return setTimeout(step, 1900);
      }
      if (deleting && i === 0) {
        deleting = false;
        r = (r + 1) % roles.length;
      }
      i += deleting ? -1 : 1;
      setTimeout(step, deleting ? 35 : 75);
    };
    setTimeout(step, 1200);
  }

  /* ───────────── Scroll reveal & counters ───────────── */
  const fmt = new Intl.NumberFormat("fr-FR");
  const countUp = (el) => {
    const target = +el.dataset.count;
    if (reduceMotion) return (el.textContent = fmt.format(target));
    const start = performance.now();
    const dur = 1800;
    const frame = (t) => {
      const p = Math.min(1, (t - start) / dur);
      el.textContent = fmt.format(Math.round(target * (1 - Math.pow(1 - p, 4))));
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        $$("[data-count]", e.target).forEach(countUp);
        io.unobserve(e.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  $$(".reveal").forEach((el) => io.observe(el));

  /* ───────────── Scroll: progress, nav, timeline ───────────── */
  const progress = $(".progress");
  const nav = $(".nav");
  const menu = $(".menu");
  const tlLine = $(".timeline__line i");
  const timeline = $(".timeline");
  const sections = $$("main section[id]");
  const navLinks = $$(".nav__links a");
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle("is-hidden", y > lastY && y > 400 && !menu.classList.contains("is-open"));
    lastY = y;

    const r = timeline.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
    tlLine.style.height = p * 100 + "%";

    let current = "";
    sections.forEach((s) => {
      if (s.getBoundingClientRect().top < innerHeight * 0.4) current = s.id;
    });
    navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + current));
  };
  let ticking = false;
  addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
    },
    { passive: true }
  );
  onScroll();

  /* ───────────── Mobile menu ───────────── */
  const burger = $(".nav__burger");
  const toggleMenu = (open) => {
    menu.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open);
    menu.setAttribute("aria-hidden", !open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => toggleMenu(!menu.classList.contains("is-open")));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => toggleMenu(false)));

  /* ───────────── Toast + copy email ───────────── */
  const toast = $(".toast");
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("is-on");
    clearTimeout(showToast.t);
    showToast.t = setTimeout(() => toast.classList.remove("is-on"), 2200);
  };
  const emailBtn = $("[data-email]");
  emailBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(emailBtn.dataset.email);
      showToast("Adresse e-mail copiée ✓");
    } catch {
      location.href = `mailto:${emailBtn.dataset.email}`;
    }
  });

  /* ───────────── Project filters ───────────── */
  const filters = $$(".filter");
  const projects = $$(".project");
  filters.forEach((btn) =>
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      filters.forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", b === btn);
      });
      projects.forEach((p) => {
        const show = f === "all" || p.dataset.cat === f;
        p.classList.toggle("is-filtered", !show);
      });
    })
  );

  /* ───────────── Lightbox ───────────── */
  const lb = $(".lb");
  const lbContent = $(".lb__content");
  let lastFocus = null;
  const openLb = (card) => {
    const tpl = $(".project__detail", card);
    if (!tpl) return;
    lastFocus = card;
    lbContent.innerHTML = "";
    lbContent.appendChild(tpl.content.cloneNode(true));
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => lb.classList.add("is-open"));
    $(".lb__close", lb).focus();
    $(".lb__panel", lb).scrollTop = 0;
  };
  const closeLb = () => {
    lb.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(() => (lb.hidden = true), reduceMotion ? 0 : 450);
    lastFocus?.focus();
  };
  projects.forEach((card) => {
    card.addEventListener("click", () => openLb(card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLb(card);
      }
    });
  });
  $$("[data-close]", lb).forEach((el) => el.addEventListener("click", closeLb));
  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lb.hidden) closeLb();
    if (e.key === "Escape" && menu.classList.contains("is-open")) toggleMenu(false);
  });
  // Click an image inside the lightbox to zoom it
  lbContent.addEventListener("click", (e) => {
    const img = e.target.closest(".lb__gallery img");
    if (img) img.classList.toggle("is-zoomed");
  });

  /* ───────────── Pointer effects ───────────── */
  $$(".card, .passion").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  if (finePointer && !reduceMotion) {
    const cursor = $(".cursor");
    const dot = $(".cursor__dot");
    const ring = $(".cursor__ring");
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener("pointermove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });
    (function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener("pointerover", (e) => {
      cursor.classList.toggle("is-hover", !!e.target.closest("a, button, [data-tilt], .passion"));
    });

    $$("[data-magnetic]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      });
      el.addEventListener("pointerleave", () => {
        el.style.transition = "transform .6s cubic-bezier(.22,1,.36,1)";
        el.style.transform = "";
        setTimeout(() => (el.style.transition = ""), 600);
      });
    });

    $$("[data-tilt]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(1100px) rotateX(${-py * 5}deg) rotateY(${px * 6}deg)`;
      });
      el.addEventListener("pointerleave", () => (el.style.transform = ""));
    });
  }

  /* ───────────── Hero constellation ───────────── */
  const canvas = $(".hero__canvas");
  const ctx = canvas.getContext("2d");
  const hero = $(".hero");
  let W = 0, H = 0, pts = [], visible = true;
  const mouse = { x: -9999, y: -9999 };

  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = hero.clientWidth;
    H = hero.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(110, (W * H) / 14000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.4,
    }));
  };
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  hero.addEventListener("pointerleave", () => (mouse.x = mouse.y = -9999));
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(hero);

  const LINK = 130;
  const draw = () => {
    if (visible) {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
        if (d < 200 && d > 0) {
          p.vx += (dx / d) * 0.012;
          p.vy += (dy / d) * 0.012;
        }
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx + (Math.random() - 0.5) * 0.05;
        p.y += p.vy + (Math.random() - 0.5) * 0.05;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      ctx.lineWidth = 0.6;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(156,195,255,${(1 - d / LINK) * 0.22})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < 180) {
          ctx.strokeStyle = `rgba(230,198,135,${(1 - md / 180) * 0.35})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        ctx.fillStyle = "rgba(210,226,255,0.8)";
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  };
  resize();
  addEventListener("resize", () => {
    clearTimeout(resize.t);
    resize.t = setTimeout(resize, 150);
  });
  draw();
})();
