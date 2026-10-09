(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  $("[data-year]").textContent = new Date().getFullYear();
  const EN = document.documentElement.lang === "en";

  /* ───────────── Split hero first name into letters ───────────── */
  $$(".split").forEach((el) => {
    const text = el.textContent;
    el.innerHTML = [...text]
      .map((c, i) => `<span class="char" style="transition-delay:${0.15 + i * 0.06}s">${c}</span>`)
      .join("");
  });

  /* ───────────── Split words (headings + manifesto) ───────────── */
  const splitWords = (root, wrapInner) => {
    const words = [];
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) return frag.appendChild(document.createTextNode(part));
            const w = document.createElement("span");
            w.className = "w";
            if (wrapInner) {
              const inner = document.createElement("span");
              inner.textContent = part;
              w.appendChild(inner);
            } else w.textContent = part;
            words.push(w);
            frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(root);
    return words;
  };
  $$("[data-words]").forEach((el) => splitWords(el, true).forEach((w, i) => w.style.setProperty("--i", i)));
  const scrubEl = $("[data-scrub]");
  const scrubWords = scrubEl ? splitWords(scrubEl, false) : [];

  /* ───────────── BUT progress ───────────── */
  $$(".edu__progress").forEach((el) => {
    const start = new Date(el.dataset.start).getTime();
    const end = new Date(el.dataset.end).getTime();
    const pct = Math.round(Math.min(1, Math.max(0, (Date.now() - start) / (end - start))) * 100);
    el.style.setProperty("--pct", pct + "%");
    $(".edu__pct", el).textContent = EN ? `${pct}% completed` : `${pct} % du parcours`;
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
  const fmt = new Intl.NumberFormat(EN ? "en-GB" : "fr-FR");
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
  const heroLines = $$(".hero__title .line");
  const heroContent = $(".hero__content");
  const passions = $$(".passion");
  const bigname = $("[data-fill]");
  const footer = $(".footer");
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

    // Hero: name lines drift apart, content fades as you leave
    if (y < innerHeight * 1.2) {
      const k = Math.min(1, y / innerHeight);
      heroLines[0].style.transform = `translateX(${-k * 14}vw)`;
      heroLines[1].style.transform = `translateX(${k * 10}vw)`;
      heroContent.style.opacity = 1 - k * 1.1;
      heroContent.style.transform = `translateY(${k * 90}px)`;
      heroContent.style.filter = k > 0.02 ? `blur(${k * 6}px)` : "";
    }

    // Manifesto: words light up progressively
    if (scrubEl) {
      const mr = scrubEl.getBoundingClientRect();
      const mp = (innerHeight * 0.85 - mr.top) / (mr.height + innerHeight * 0.35);
      const lit = Math.floor(mp * scrubWords.length * 1.05);
      scrubWords.forEach((w, i) => w.classList.toggle("on", i < lit));
    }

    // Passions: images drift inside their frames
    passions.forEach((el) => {
      const pr = el.getBoundingClientRect();
      if (pr.bottom < 0 || pr.top > innerHeight) return;
      const c = (pr.top + pr.height / 2 - innerHeight / 2) / innerHeight;
      el.style.setProperty("--py", `${c * -40}px`);
    });

    // Giant name fills with colour as the page ends
    const br = bigname.getBoundingClientRect();
    const bp = Math.min(1, Math.max(0, (innerHeight - br.top) / (br.height + footer.offsetHeight)));
    bigname.style.setProperty("--fill", `${bp * 100}%`);
    bigname.style.setProperty("--rise", `${(1 - bp) * 30}%`);

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

  /* ───────────── Smooth scroll (Lenis, optional) ───────────── */
  let lenis = null;
  if (window.Lenis && !reduceMotion) {
    lenis = new window.Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    const raf = (t) => {
      lenis.raf(t);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    $$('a[href^="#"]').forEach((a) =>
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        const target = id === "#top" ? 0 : $(id);
        if (target === null) return;
        e.preventDefault();
        lenis.scrollTo(target, { duration: 1.6 });
      })
    );
  }
  const lockScroll = (on) => {
    document.body.style.overflow = on ? "hidden" : "";
    if (lenis) on ? lenis.stop() : lenis.start();
  };

  /* ───────────── Marquee reacts to scroll speed ───────────── */
  const track = $(".marquee__track");
  if (track && !reduceMotion) {
    track.classList.add("is-js");
    let x = 0, dir = 1, lastSY = scrollY, boost = 0;
    const items = $$(".marquee__item", track);
    const loop = () => {
      const sy = scrollY, dv = sy - lastSY;
      lastSY = sy;
      if (dv !== 0) dir = dv > 0 ? 1 : -1;
      boost += (Math.min(40, Math.abs(dv)) - boost) * 0.1;
      x -= (0.6 + boost * 0.35) * dir;
      const half = track.scrollWidth / 2;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      track.style.transform = `translate3d(${x}px,0,0)`;
      const skew = Math.max(-8, Math.min(8, boost * 0.35 * dir));
      items.forEach((it) => (it.style.transform = `skewX(${-skew}deg)`));
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ───────────── Mobile menu ───────────── */
  const burger = $(".nav__burger");
  const toggleMenu = (open) => {
    menu.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open);
    menu.setAttribute("aria-hidden", !open);
    lockScroll(open);
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
      showToast(EN ? "Email address copied ✓" : "Adresse e-mail copiée ✓");
    } catch {
      location.href = `mailto:${emailBtn.dataset.email}`;
    }
  });

  /* ───────────── CV download ─────────────
     On a normal host the plain download link works. Inside the Claude
     artifact viewer, files must go through its downloads capability. */
  let downloads = null;
  window.claude?.use?.("downloads").then((d) => (downloads = d), () => {});
  $$("a[download]").forEach((a) =>
    a.addEventListener("click", async (e) => {
      if (!downloads) return;
      e.preventDefault();
      try {
        const blob = await (await fetch(a.href)).blob();
        await downloads.save({ filename: a.href.split("/").pop(), data: blob });
      } catch (err) {
        if (err?.code !== "declined") window.open(a.href, "_blank", "noopener");
      }
    })
  );

  /* ───────────── Video CV ───────────── */
  const vframe = $("[data-video]");
  if (vframe) {
    const video = $("video", vframe);
    const play = () => {
      vframe.classList.add("is-playing");
      video.controls = true;
      video.play().catch(() => vframe.classList.remove("is-playing"));
    };
    $(".videocv__play", vframe).addEventListener("click", play);
    video.addEventListener("play", () => vframe.classList.add("is-playing"));
    video.addEventListener("ended", () => vframe.classList.remove("is-playing"));
    // The hero button scrolls to the player, then starts it
    $$("[data-play-video]").forEach((btn) =>
      btn.addEventListener("click", () => setTimeout(play, lenis ? 1400 : 600))
    );
  }

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
    lockScroll(true);
    requestAnimationFrame(() => lb.classList.add("is-open"));
    $(".lb__close", lb).focus();
    $(".lb__panel", lb).scrollTop = 0;
  };
  const closeLb = () => {
    lb.classList.remove("is-open");
    lockScroll(false);
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
    const label = $(".cursor__label");
    document.addEventListener("pointerover", (e) => {
      const labelled = e.target.closest("[data-cursor]");
      cursor.classList.toggle("has-label", !!labelled && lb.hidden);
      if (labelled) label.textContent = labelled.dataset.cursor;
      cursor.classList.toggle("is-hover", !labelled && !!e.target.closest("a, button, [data-tilt], .passion"));
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

  /* ───────────── Hero starfield ───────────── */
  const hero = $(".hero");
  const canvas = $(".hero__stars");
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0, stars = [], meteors = [], visible = true, nextMeteor = 0;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

  // Stars drift slightly with the pointer: near ones (bigger) move more than far ones
  if (finePointer && !reduceMotion) {
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      pointer.tx = (e.clientX - r.left) / r.width - 0.5;
      pointer.ty = (e.clientY - r.top) / r.height - 0.5;
    });
    hero.addEventListener("pointerleave", () => (pointer.tx = pointer.ty = 0));
  }
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(hero);

  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = hero.clientWidth;
    H = hero.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(380, (W * H) / 3600));
    stars = Array.from({ length: n }, () => {
      const z = Math.random(); // depth: 0 far, 1 near
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        z,
        r: 0.35 + z * z * 1.7,
        base: 0.4 + Math.random() * 0.6,
        tw: 0.6 + Math.random() * 2.2, // twinkle speed
        p: Math.random() * Math.PI * 2,
        hue: Math.random() < 0.12 ? "255,232,200" : Math.random() < 0.3 ? "190,212,255" : "235,242,255",
      };
    });
  };

  const spawnMeteor = (t) => {
    const fromTop = Math.random() < 0.6;
    meteors.push({
      x: fromTop ? W * (0.35 + Math.random() * 0.6) : W + 20,
      y: fromTop ? -20 : H * Math.random() * 0.4,
      vx: -(6 + Math.random() * 4),
      vy: 2.4 + Math.random() * 2,
      life: 0,
      max: 60 + Math.random() * 40,
    });
    nextMeteor = t + 2500 + Math.random() * 4500;
  };

  const draw = (t) => {
    if (visible) {
      ctx.clearRect(0, 0, W, H);
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      for (const s of stars) {
        const a = Math.min(1, s.base * (0.7 + 0.3 * Math.sin((t / 1000) * s.tw + s.p)));
        const x = s.x - pointer.x * 40 * s.z;
        const y = s.y - pointer.y * 30 * s.z;
        ctx.fillStyle = `rgba(${s.hue},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.r > 1.4 && a > 0.6) {
          // soft glow on the brightest stars
          ctx.fillStyle = `rgba(${s.hue},${(a * 0.12).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, s.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (!reduceMotion && t > nextMeteor) spawnMeteor(t);
      meteors = meteors.filter((m) => m.life < m.max);
      for (const m of meteors) {
        m.life++;
        m.x += m.vx;
        m.y += m.vy;
        const k = m.life / m.max;
        const alpha = k < 0.2 ? k / 0.2 : 1 - (k - 0.2) / 0.8;
        const tail = 14;
        const g = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * tail, m.y - m.vy * tail);
        g.addColorStop(0, `rgba(255,255,255,${(alpha * 0.95).toFixed(3)})`);
        g.addColorStop(1, "rgba(156,195,255,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * tail, m.y - m.vy * tail);
        ctx.stroke();
      }
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  };
  resize();
  addEventListener("resize", () => {
    clearTimeout(resize.t);
    resize.t = setTimeout(resize, 150);
  });
  nextMeteor = performance.now() + 1800;
  requestAnimationFrame(draw);
})();
