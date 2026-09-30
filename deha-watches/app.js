/* DEHA Watches — catalogue, rendu des montres et panier */

const COLLECTIONS = [
  { id: "chrono", name: "Chronographes sport", tag: "Précision" },
  { id: "classic", name: "Classiques du quotidien", tag: "Intemporel" },
  { id: "exception", name: "Pièces d'exception", tag: "Édition limitée" },
  { id: "sportchic", name: "Silhouettes sport-chic", tag: "Polyvalent" },
  { id: "square", name: "Lignes carrées iconiques", tag: "Caractère" },
  { id: "gmt", name: "Double fuseau horaire", tag: "Voyage" },
];

/*
 * Pour utiliser vos propres photos : déposez-les dans images/ en les nommant
 * comme l'id du produit (ex. images/atlas-chrono-noir.jpg). Si le fichier
 * n'existe pas, un cadran dessiné en SVG est affiché à la place.
 */
const PRODUCTS = [
  { id: "atlas-chrono-noir", name: "Atlas Chrono", coll: "chrono", price: 189, old: 249, badge: "Best-seller", shape: "round", style: "chrono", dial: "#141414", accent: "#c9a96e", metal: "#d9d9d9" },
  { id: "atlas-chrono-panda", name: "Atlas Panda", coll: "chrono", price: 199, shape: "round", style: "chrono", dial: "#f3f1ec", accent: "#141414", metal: "#d9d9d9" },
  { id: "racer-chrono-bleu", name: "Racer Bleu", coll: "chrono", price: 179, badge: "Nouveau", shape: "round", style: "chrono", dial: "#1d3a6b", accent: "#ffffff", metal: "#cfcfcf" },
  { id: "eclat-classique-blanc", name: "Éclat", coll: "classic", price: 129, shape: "round", style: "classic", dial: "#f7f4ee", accent: "#1a1a1a", metal: "#d6b77a" },
  { id: "eclat-classique-noir", name: "Éclat Nuit", coll: "classic", price: 129, shape: "round", style: "classic", dial: "#161616", accent: "#d6b77a", metal: "#d6b77a" },
  { id: "horizon-vert", name: "Horizon Vert", coll: "classic", price: 149, old: 179, shape: "round", style: "classic", dial: "#1f4a3a", accent: "#e8e2d4", metal: "#d9d9d9" },
  { id: "prestige-or", name: "Prestige Or", coll: "exception", price: 239, badge: "Édition limitée", shape: "round", style: "diver", dial: "#1a1a1a", accent: "#e2c07e", metal: "#d6b77a" },
  { id: "prestige-bleu-nuit", name: "Prestige Bleu Nuit", coll: "exception", price: 245, shape: "round", style: "diver", dial: "#0f2244", accent: "#e2c07e", metal: "#d6b77a" },
  { id: "oceane-bleu", name: "Océane", coll: "sportchic", price: 169, badge: "Best-seller", shape: "octa", style: "sport", dial: "#1c3f73", accent: "#ffffff", metal: "#d9d9d9" },
  { id: "oceane-vert", name: "Océane Émeraude", coll: "sportchic", price: 169, shape: "octa", style: "sport", dial: "#1d5040", accent: "#ffffff", metal: "#d9d9d9" },
  { id: "oceane-saumon", name: "Océane Saumon", coll: "sportchic", price: 179, old: 219, shape: "octa", style: "sport", dial: "#e0a58c", accent: "#1a1a1a", metal: "#d9d9d9" },
  { id: "cube-noir", name: "Cube Noir", coll: "square", price: 149, shape: "square", style: "classic", dial: "#141414", accent: "#c9a96e", metal: "#d9d9d9" },
  { id: "cube-argent", name: "Cube Argent", coll: "square", price: 149, badge: "Nouveau", shape: "square", style: "classic", dial: "#e9e9e9", accent: "#1a1a1a", metal: "#d9d9d9" },
  { id: "cube-or", name: "Cube Or", coll: "square", price: 159, shape: "square", style: "classic", dial: "#f3e7c9", accent: "#1a1a1a", metal: "#d6b77a" },
  { id: "voyager-pepsi", name: "Voyager Pepsi", coll: "gmt", price: 219, badge: "Best-seller", shape: "round", style: "gmt", dial: "#141414", accent: "#ffffff", metal: "#d9d9d9", bezel: ["#b3272d", "#1f3f8a"] },
  { id: "voyager-batman", name: "Voyager Batman", coll: "gmt", price: 219, shape: "round", style: "gmt", dial: "#141414", accent: "#ffffff", metal: "#d9d9d9", bezel: ["#1f3f8a", "#111111"] },
];

const euro = (n) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
const $ = (s, root = document) => root.querySelector(s);

/* ---------- Dessin SVG d'une montre ---------- */
let uid = 0;
function watchSVG(p) {
  const id = "w" + uid++;
  const { dial, accent, metal, shape, style } = p;
  const cx = 100, cy = 120;
  const parts = [];

  parts.push(`<defs>
    <linearGradient id="${id}m" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".45" stop-color="${metal}"/><stop offset="1" stop-color="#6b6b6b"/></linearGradient>
    <radialGradient id="${id}d" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="${dial}" stop-opacity=".75"/><stop offset=".55" stop-color="${dial}"/><stop offset="1" stop-color="#000" stop-opacity=".9"/></radialGradient>
    <linearGradient id="${id}g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient>
  </defs>`);

  // Bracelet
  const band = [];
  for (let i = 0; i < 4; i++) {
    band.push(`<rect x="70" y="${-4 + i * 13}" width="60" height="11" rx="2" fill="url(#${id}m)"/>`);
    band.push(`<rect x="70" y="${178 + i * 13}" width="60" height="11" rx="2" fill="url(#${id}m)"/>`);
  }
  parts.push(`<g opacity=".95">${band.join("")}</g>`);
  parts.push(`<path d="M66 44 L134 44 L128 62 L72 62Z M66 196 L134 196 L128 178 L72 178Z" fill="url(#${id}m)"/>`);

  // Boîtier + cadran
  let clip;
  if (shape === "square") {
    parts.push(`<rect x="36" y="56" width="128" height="128" rx="22" fill="url(#${id}m)"/>`);
    parts.push(`<rect x="46" y="66" width="108" height="108" rx="14" fill="url(#${id}d)"/>`);
    clip = `<rect x="46" y="66" width="108" height="108" rx="14"/>`;
  } else if (shape === "octa") {
    const oct = (r) => Array.from({ length: 8 }, (_, i) => {
      const a = (Math.PI / 8) + i * Math.PI / 4;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
    parts.push(`<circle cx="${cx}" cy="${cy}" r="70" fill="url(#${id}m)"/>`);
    parts.push(`<polygon points="${oct(62)}" fill="url(#${id}m)" stroke="#8a8a8a" stroke-width=".8"/>`);
    parts.push(`<circle cx="${cx}" cy="${cy}" r="48" fill="url(#${id}d)"/>`);
    // Motif tapisserie
    const grid = [];
    for (let x = -48; x <= 48; x += 6) grid.push(`<path d="M${cx + x} ${cy - 48}V${cy + 48}M${cx - 48} ${cy + x}H${cx + 48}" stroke="#000" stroke-opacity=".18" stroke-width=".7"/>`);
    parts.push(`<g clip-path="url(#${id}c)">${grid.join("")}</g>`);
    clip = `<circle cx="${cx}" cy="${cy}" r="48"/>`;
  } else {
    parts.push(`<circle cx="${cx}" cy="${cy}" r="70" fill="url(#${id}m)"/>`);
    if (style === "gmt" || style === "diver") {
      const [a, b] = p.bezel || [p.dial === "#0f2244" ? "#0b1a36" : "#111", p.dial === "#0f2244" ? "#0b1a36" : "#111"];
      parts.push(`<path d="M${cx} ${cy - 64} A64 64 0 0 1 ${cx} ${cy + 64}Z" fill="${a}"/><path d="M${cx} ${cy + 64} A64 64 0 0 1 ${cx} ${cy - 64}Z" fill="${b}"/>`);
      const ticks = [];
      for (let i = 0; i < 12; i++) {
        const ang = i * 30 * Math.PI / 180;
        ticks.push(`<circle cx="${(cx + 58 * Math.sin(ang)).toFixed(1)}" cy="${(cy - 58 * Math.cos(ang)).toFixed(1)}" r="${i === 0 ? 3 : 1.6}" fill="${i === 0 ? accent : "#e8e8e8"}"/>`);
      }
      parts.push(ticks.join(""));
      parts.push(`<circle cx="${cx}" cy="${cy}" r="51" fill="url(#${id}d)"/>`);
      clip = `<circle cx="${cx}" cy="${cy}" r="51"/>`;
    } else {
      parts.push(`<circle cx="${cx}" cy="${cy}" r="60" fill="#9a9a9a" opacity=".35"/>`);
      parts.push(`<circle cx="${cx}" cy="${cy}" r="57" fill="url(#${id}d)"/>`);
      clip = `<circle cx="${cx}" cy="${cy}" r="57"/>`;
    }
  }
  parts[0] = parts[0].replace("</defs>", `<clipPath id="${id}c">${clip}</clipPath></defs>`);

  // Couronne + poussoirs
  const right = shape === "square" ? 164 : 170;
  parts.push(`<rect x="${right - 2}" y="${cy - 7}" width="10" height="14" rx="3" fill="url(#${id}m)"/>`);
  if (style === "chrono") {
    parts.push(`<rect x="${right - 8}" y="${cy - 40}" width="9" height="10" rx="2" fill="url(#${id}m)" transform="rotate(35 ${right - 4} ${cy - 35})"/>`);
    parts.push(`<rect x="${right - 8}" y="${cy + 30}" width="9" height="10" rx="2" fill="url(#${id}m)" transform="rotate(-35 ${right - 4} ${cy + 35})"/>`);
  }

  // Index
  const r = shape === "square" ? 44 : style === "gmt" || style === "diver" ? 44 : shape === "octa" ? 41 : 49;
  const idx = [];
  for (let i = 0; i < 12; i++) {
    const ang = i * 30 * Math.PI / 180;
    const x1 = cx + r * Math.sin(ang), y1 = cy - r * Math.cos(ang);
    const x2 = cx + (r - (i % 3 === 0 ? 10 : 6)) * Math.sin(ang), y2 = cy - (r - (i % 3 === 0 ? 10 : 6)) * Math.cos(ang);
    idx.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${accent}" stroke-width="${i % 3 === 0 ? 3.2 : 1.6}" stroke-linecap="round"/>`);
  }
  parts.push(idx.join(""));

  // Compteurs chrono
  if (style === "chrono") {
    const sub = accent === "#141414" ? "#141414" : dial === "#f3f1ec" ? "#141414" : "#000";
    [[cx - 20, cy], [cx + 20, cy], [cx, cy + 22]].forEach(([x, y]) => {
      parts.push(`<circle cx="${x}" cy="${y}" r="11" fill="${sub}" fill-opacity="${dial === "#f3f1ec" ? 1 : .35}" stroke="${accent}" stroke-opacity=".6" stroke-width=".8"/><line x1="${x}" y1="${y}" x2="${x + 5}" y2="${y - 7}" stroke="${dial === "#f3f1ec" ? "#fff" : accent}" stroke-width="1.2"/>`);
    });
  }
  if (style === "classic" || style === "sport") {
    parts.push(`<rect x="${cx + 22}" y="${cy - 6}" width="16" height="12" rx="1.5" fill="#fff"/><text x="${cx + 30}" y="${cy + 3.5}" font-size="8.5" text-anchor="middle" font-family="Inter,sans-serif" fill="#111">24</text>`);
  }

  // Logo
  parts.push(`<text x="${cx}" y="${cy - 20}" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="11" font-weight="600" letter-spacing="2.5" fill="${accent}">DEHA</text>`);

  // Aiguilles (10:10)
  const hand = (deg, len, w, color) => {
    const a = deg * Math.PI / 180;
    return `<line x1="${cx}" y1="${cy}" x2="${(cx + len * Math.sin(a)).toFixed(1)}" y2="${(cy - len * Math.cos(a)).toFixed(1)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
  };
  parts.push(hand(305, r - 20, 4, accent));
  parts.push(hand(60, r - 8, 3, accent));
  if (style === "gmt") parts.push(hand(150, r - 6, 1.6, (p.bezel || ["#c9a96e"])[0]));
  parts.push(hand(200, r - 4, 1, style === "chrono" || style === "diver" ? "#c9a96e" : "#b3272d"));
  parts.push(`<circle cx="${cx}" cy="${cy}" r="3.5" fill="${accent}"/>`);

  // Reflet verre
  parts.push(`<g clip-path="url(#${id}c)"><path d="M20 40 L180 40 L60 200Z" fill="url(#${id}g)"/></g>`);

  return `<svg viewBox="0 0 200 240" role="img" aria-label="Montre ${p.name}">${parts.join("")}</svg>`;
}

/* Image produit : photo si présente dans images/, sinon SVG */
function mediaHTML(p) {
  return `<img src="images/${p.id}.jpg" alt="Montre ${p.name}" loading="lazy" data-fallback="${p.id}" />`;
}
function applyFallbacks(root = document) {
  root.querySelectorAll("img[data-fallback]").forEach((img) => {
    const swap = () => {
      const p = PRODUCTS.find((x) => x.id === img.dataset.fallback);
      if (p) img.outerHTML = watchSVG(p);
    };
    if (img.complete && img.naturalWidth === 0) swap();
    else img.addEventListener("error", swap, { once: true });
  });
}

/* ---------- Rendu ---------- */
function renderHero() {
  $("[data-watch=hero]").innerHTML = watchSVG(PRODUCTS[0]);
  $("[data-watch=banner]").innerHTML = watchSVG(PRODUCTS[6]);
}

function renderCollections() {
  $("[data-collections]").innerHTML = COLLECTIONS.map((c) => {
    const p = PRODUCTS.find((x) => x.coll === c.id);
    const count = PRODUCTS.filter((x) => x.coll === c.id).length;
    return `<button class="collection reveal" data-go="${c.id}">
      <div class="collection__art">${mediaHTML(p)}</div>
      <div><span>${c.tag} · ${count} modèles</span><h3>${c.name}</h3></div>
    </button>`;
  }).join("");
  document.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => {
    setFilter(b.dataset.go);
    $("#boutique").scrollIntoView();
  }));
}

let currentFilter = "all";
function renderFilters() {
  const all = [{ id: "all", name: "Toutes" }, ...COLLECTIONS];
  $("[data-filters]").innerHTML = all.map((c) =>
    `<button class="filter${c.id === currentFilter ? " is-active" : ""}" role="tab" aria-selected="${c.id === currentFilter}" data-filter="${c.id}">${c.name}</button>`
  ).join("");
  document.querySelectorAll("[data-filter]").forEach((b) => b.addEventListener("click", () => setFilter(b.dataset.filter)));
}
function setFilter(id) {
  currentFilter = id;
  renderFilters();
  renderProducts();
}

function renderProducts() {
  const list = currentFilter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.coll === currentFilter);
  const box = $("[data-products]");
  box.innerHTML = list.map((p) => {
    const coll = COLLECTIONS.find((c) => c.id === p.coll).name;
    const badge = p.old ? `<span class="product__badge product__badge--sale">-${Math.round((1 - p.price / p.old) * 100)} %</span>` : p.badge ? `<span class="product__badge">${p.badge}</span>` : "";
    return `<article class="product reveal">
      <div class="product__media">${badge}${mediaHTML(p)}
        <button class="btn btn--dark product__add" data-add="${p.id}">Ajouter au panier</button>
      </div>
      <div class="product__info">
        <div class="product__coll">${coll}</div>
        <h3 class="product__name">${p.name}</h3>
        <div class="product__price">${euro(p.price)}${p.old ? `<s>${euro(p.old)}</s>` : ""}</div>
        <div class="product__swatches"><i style="background:${p.dial}"></i><i style="background:${p.metal}"></i></div>
      </div>
    </article>`;
  }).join("");
  applyFallbacks(box);
  box.querySelectorAll("[data-add]").forEach((b) => b.addEventListener("click", () => addToCart(b.dataset.add)));
  observeReveal();
}

/* ---------- Panier ---------- */
const FREE_SHIPPING = 99;
let cart = [];
try { cart = JSON.parse(localStorage.getItem("deha-cart")) || []; } catch { cart = []; }
const saveCart = () => { try { localStorage.setItem("deha-cart", JSON.stringify(cart)); } catch {} };

function addToCart(id) {
  const line = cart.find((l) => l.id === id);
  if (line) line.qty++;
  else cart.push({ id, qty: 1 });
  saveCart();
  renderCart();
  toast(`${PRODUCTS.find((p) => p.id === id).name} ajoutée au panier`);
  openCart();
}
function changeQty(id, delta) {
  const line = cart.find((l) => l.id === id);
  if (!line) return;
  line.qty += delta;
  if (line.qty <= 0) cart = cart.filter((l) => l.id !== id);
  saveCart();
  renderCart();
}
function renderCart() {
  const count = cart.reduce((s, l) => s + l.qty, 0);
  const total = cart.reduce((s, l) => s + l.qty * PRODUCTS.find((p) => p.id === l.id).price, 0);
  const badge = $(".cart-count");
  badge.textContent = count;
  badge.dataset.count = count;

  const body = $("[data-cart-items]");
  if (!cart.length) {
    body.innerHTML = `<p class="drawer__empty">Votre panier est vide.</p>`;
  } else {
    body.innerHTML = cart.map((l) => {
      const p = PRODUCTS.find((x) => x.id === l.id);
      return `<div class="line">
        <div class="line__img">${mediaHTML(p)}</div>
        <div>
          <div class="line__name">${p.name}</div>
          <div class="line__qty"><button data-q="-1" data-id="${p.id}" aria-label="Retirer un">−</button><span>${l.qty}</span><button data-q="1" data-id="${p.id}" aria-label="Ajouter un">+</button></div>
        </div>
        <div class="line__price">${euro(p.price * l.qty)}</div>
      </div>`;
    }).join("");
    applyFallbacks(body);
    body.querySelectorAll("[data-q]").forEach((b) => b.addEventListener("click", () => changeQty(b.dataset.id, +b.dataset.q)));
  }
  $("[data-cart-total]").textContent = euro(total);
  $("[data-cart-note]").textContent = !cart.length ? "" :
    total >= FREE_SHIPPING ? "Livraison offerte ✓" : `Plus que ${euro(FREE_SHIPPING - total)} pour la livraison offerte`;
}
const openCart = () => { document.body.classList.add("cart-open"); $(".drawer").setAttribute("aria-hidden", "false"); };
const closeCart = () => { document.body.classList.remove("cart-open"); $(".drawer").setAttribute("aria-hidden", "true"); };

/* ---------- Divers ---------- */
let toastTimer;
function toast(msg) {
  const t = $(".toast");
  t.textContent = msg;
  t.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("is-visible"), 2400);
}

const io = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
}, { threshold: 0.12 }) : null;
function observeReveal() {
  document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => io ? io.observe(el) : el.classList.add("is-in"));
}

document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderCollections();
  applyFallbacks($("[data-collections]"));
  renderFilters();
  renderProducts();
  renderCart();
  document.querySelectorAll(".review, .trust__item").forEach((el) => el.classList.add("reveal"));
  observeReveal();

  $(".cart-btn").addEventListener("click", openCart);
  $("[data-close]").addEventListener("click", closeCart);
  $("[data-overlay]").addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCart(); });
  $("[data-checkout]").addEventListener("click", () => toast(cart.length ? "Le paiement sera bientôt disponible." : "Votre panier est vide."));

  const header = $(".header");
  const toggle = $(".menu-toggle");
  toggle.addEventListener("click", () => {
    const open = header.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", open);
  });
  document.querySelectorAll(".mobile-nav a").forEach((a) => a.addEventListener("click", () => header.classList.remove("menu-open")));

  $("[data-newsletter]").addEventListener("submit", (e) => {
    e.preventDefault();
    $(".newsletter__msg").textContent = "Merci ! Votre code -10 % arrive par e-mail.";
    e.target.reset();
  });

  $("[data-year]").textContent = new Date().getFullYear();
});
