/* DEHA Watches — les 3 montres, fiche produit et panier */

/*
 * Modifiez ici les noms, prix et caractéristiques.
 * Vérifiez les caractéristiques techniques auprès de votre fournisseur.
 */
const PRODUCTS = [
  {
    id: "chrono-panda",
    name: "Chrono Panda",
    tag: "Chronographe sport",
    price: 229,
    old: 299,
    badge: "Best-seller",
    img: "images/chrono-panda.webp",
    short: "Cadran blanc, compteurs noirs, lunette tachymètre noire.",
    desc: "Le contraste qui ne passe jamais inaperçu. Cadran blanc laqué, trois compteurs noirs et lunette tachymètre : une montre sportive et élégante, aussi à l'aise sur un circuit qu'en soirée.",
    highlights: ["Lunette tachymètre noire", "3 compteurs contrastés", "Bracelet acier trois rangs"],
    specs: { Boîtier: "Acier 316L, 40 mm", Cadran: "Blanc, compteurs noirs", Lunette: "Tachymètre noire", Verre: "Anti-rayures", Bracelet: "Acier 316L, fermoir déployant", Étanchéité: "5 ATM" },
  },
  {
    id: "riviera-blanc",
    name: "Riviera Blanc",
    tag: "Sport-chic",
    price: 189,
    old: 239,
    img: "images/riviera-blanc.webp",
    variant: "riviera",
    color: "#e9e9e6",
    short: "Cadran blanc strié, boîtier coussin, guichet date.",
    desc: "La discrétion comme signature. Son cadran blanc strié horizontalement capte la lumière avec subtilité, et son boîtier coussin aux flancs polis s'intègre au bracelet dans une seule ligne fluide.",
    highlights: ["Cadran strié horizontal", "Boîtier coussin intégré", "Date à 3 h"],
    specs: { Boîtier: "Acier 316L, 40 mm", Cadran: "Blanc strié", Mouvement: "Automatique", Verre: "Anti-rayures", Bracelet: "Acier 316L intégré", Étanchéité: "5 ATM" },
  },
  {
    id: "riviera-bleu",
    name: "Riviera Bleu",
    tag: "Sport-chic",
    price: 189,
    old: 239,
    badge: "Nouveau",
    img: "images/riviera-bleu.webp",
    variant: "riviera",
    color: "#1e3f7a",
    short: "Cadran bleu dégradé strié, index luminescents.",
    desc: "Un bleu profond qui s'éclaircit vers le centre et change selon la lumière. Index luminescents, date à 3 h et bracelet intégré : la plus remarquée des trois.",
    highlights: ["Cadran bleu dégradé", "Index luminescents", "Date à 3 h"],
    specs: { Boîtier: "Acier 316L, 40 mm", Cadran: "Bleu dégradé strié", Mouvement: "Automatique", Verre: "Anti-rayures", Bracelet: "Acier 316L intégré", Étanchéité: "5 ATM" },
  },
];

const euro = (n) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const byId = (id) => PRODUCTS.find((p) => p.id === id);
const priceHTML = (p) => `${euro(p.price)}${p.old ? ` <s>${euro(p.old)}</s> <span class="save">-${Math.round((1 - p.price / p.old) * 100)} %</span>` : ""}`;

/* ---------- Rendu ---------- */
function renderHero() {
  const order = ["riviera-blanc", "chrono-panda", "riviera-bleu"].map(byId);
  $("[data-hero]").innerHTML = order.map((p, i) =>
    `<button class="hero__watch hero__watch--${i}" data-open="${p.id}" aria-label="Voir ${p.name}"><img src="${p.img}" alt="Montre DEHA ${p.name}" /></button>`
  ).join("");
}

function renderCards() {
  $("[data-cards]").innerHTML = PRODUCTS.map((p) => `
    <article class="card reveal">
      <button class="card__media" data-open="${p.id}" aria-label="Voir ${p.name}">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
        <img src="${p.img}" alt="Montre DEHA ${p.name}" loading="lazy" />
      </button>
      <div class="card__info">
        <p class="card__tag">${p.tag}</p>
        <h3>${p.name}</h3>
        <p class="card__short">${p.short}</p>
        <div class="price">${priceHTML(p)}</div>
        <div class="card__actions">
          <button class="btn btn--dark" data-add="${p.id}">Ajouter au panier</button>
          <button class="btn btn--line" data-open="${p.id}">Détails</button>
        </div>
      </div>
    </article>`).join("");
}

function renderShowcases() {
  $("[data-showcases]").innerHTML = PRODUCTS.map((p, i) => `
    <section class="showcase ${i % 2 ? "showcase--rev" : ""} ${i === 2 ? "showcase--dark" : ""}" id="${p.id}">
      <div class="container showcase__inner">
        <div class="showcase__media reveal"><img src="${p.img}" alt="Montre DEHA ${p.name}" loading="lazy" /></div>
        <div class="showcase__text reveal">
          <p class="eyebrow">${String(i + 1).padStart(2, "0")} · ${p.tag}</p>
          <h2>${p.name}</h2>
          <p>${p.desc}</p>
          <ul class="checks">${p.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>
          <div class="price price--lg">${priceHTML(p)}</div>
          <div class="card__actions">
            <button class="btn ${i === 2 ? "btn--gold" : "btn--dark"}" data-add="${p.id}">Ajouter au panier</button>
            <button class="btn ${i === 2 ? "btn--ghost" : "btn--line"}" data-open="${p.id}">Voir la fiche</button>
          </div>
        </div>
      </div>
    </section>`).join("");
}

function renderCompare() {
  const keys = [...new Set(PRODUCTS.flatMap((p) => Object.keys(p.specs)))];
  $("[data-compare]").innerHTML = `<table>
    <thead><tr><th></th>${PRODUCTS.map((p) => `<th><img src="${p.img}" alt="" loading="lazy" /><span>${p.name}</span></th>`).join("")}</tr></thead>
    <tbody>
      <tr><th>Prix</th>${PRODUCTS.map((p) => `<td><strong>${euro(p.price)}</strong></td>`).join("")}</tr>
      ${keys.map((k) => `<tr><th>${k}</th>${PRODUCTS.map((p) => `<td>${p.specs[k] || "—"}</td>`).join("")}</tr>`).join("")}
      <tr><th></th>${PRODUCTS.map((p) => `<td><button class="btn btn--dark btn--sm" data-add="${p.id}">Ajouter</button></td>`).join("")}</tr>
    </tbody>
  </table>`;
}

function renderFooterLinks() {
  $("[data-footer-links]").innerHTML = PRODUCTS.map((p) => `<a href="#${p.id}">${p.name}</a>`).join("");
}

/* ---------- Fiche produit ---------- */
let modalProduct = null;
let modalQty = 1;
function openModal(id) {
  const p = byId(id);
  modalProduct = p;
  modalQty = 1;
  const img = $("[data-modal-img]");
  img.src = p.img;
  img.alt = `Montre DEHA ${p.name}`;
  $("[data-modal-tag]").textContent = p.tag;
  $("[data-modal-name]").textContent = p.name;
  $("[data-modal-price]").innerHTML = priceHTML(p);
  $("[data-modal-desc]").textContent = p.desc;
  $("[data-modal-qty]").textContent = modalQty;
  $("[data-modal-specs]").innerHTML = Object.entries(p.specs).map(([k, v]) => `<li><span>${k}</span><span>${v}</span></li>`).join("");
  const siblings = p.variant ? PRODUCTS.filter((x) => x.variant === p.variant) : [];
  $("[data-modal-variants]").innerHTML = siblings.length > 1
    ? `<span>Cadran :</span>${siblings.map((s) => `<button class="swatch${s.id === p.id ? " is-active" : ""}" style="--c:${s.color}" data-variant="${s.id}" aria-label="${s.name}" title="${s.name}"></button>`).join("")}`
    : "";
  $$("[data-variant]").forEach((b) => b.addEventListener("click", () => openModal(b.dataset.variant)));
  const modal = $(".modal");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  $("[data-modal-close]").focus();
}
function closeModal() {
  const modal = $(".modal");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  if (!document.body.classList.contains("cart-open")) document.body.classList.remove("no-scroll");
}

/* ---------- Panier ---------- */
let cart = [];
try { cart = JSON.parse(localStorage.getItem("deha-cart")) || []; } catch { cart = []; }
cart = cart.filter((l) => byId(l.id));
const saveCart = () => { try { localStorage.setItem("deha-cart", JSON.stringify(cart)); } catch {} };

function addToCart(id, qty = 1) {
  const line = cart.find((l) => l.id === id);
  if (line) line.qty += qty;
  else cart.push({ id, qty });
  saveCart();
  renderCart();
  toast(`${byId(id).name} ajoutée au panier`);
  closeModal();
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
  const total = cart.reduce((s, l) => s + l.qty * byId(l.id).price, 0);
  const badge = $(".cart-count");
  badge.textContent = count;
  badge.dataset.count = count;

  const body = $("[data-cart-items]");
  body.innerHTML = !cart.length ? `<p class="drawer__empty">Votre panier est vide.</p>` : cart.map((l) => {
    const p = byId(l.id);
    return `<div class="line">
      <div class="line__img"><img src="${p.img}" alt="" /></div>
      <div>
        <div class="line__name">${p.name}</div>
        <div class="qty qty--sm"><button data-q="-1" data-id="${p.id}" aria-label="Retirer un">−</button><span>${l.qty}</span><button data-q="1" data-id="${p.id}" aria-label="Ajouter un">+</button></div>
      </div>
      <div class="line__price">${euro(p.price * l.qty)}</div>
    </div>`;
  }).join("");
  $$("[data-q]", body).forEach((b) => b.addEventListener("click", () => changeQty(b.dataset.id, +b.dataset.q)));

  // Suggestion : une montre que le client n'a pas encore
  const missing = PRODUCTS.filter((p) => !cart.some((l) => l.id === p.id));
  const up = $("[data-upsell]");
  if (cart.length && missing.length) {
    const p = missing[0];
    up.innerHTML = `<p>Complétez votre collection</p><div class="line line--upsell">
      <div class="line__img"><img src="${p.img}" alt="" /></div>
      <div><div class="line__name">${p.name}</div><div class="line__sub">${euro(p.price)}</div></div>
      <button class="btn btn--line btn--sm" data-add="${p.id}">Ajouter</button></div>`;
  } else up.innerHTML = "";

  $("[data-cart-total]").textContent = euro(total);
}
const openCart = () => { document.body.classList.add("cart-open", "no-scroll"); $(".drawer").setAttribute("aria-hidden", "false"); };
const closeCart = () => { document.body.classList.remove("cart-open", "no-scroll"); $(".drawer").setAttribute("aria-hidden", "true"); };

/* ---------- Barre d'achat mobile ---------- */
function setupSticky() {
  const bar = $("[data-sticky]");
  let current = PRODUCTS[0];
  const show = (p) => {
    current = p;
    $("[data-sticky-img]").src = p.img;
    $("[data-sticky-name]").textContent = p.name;
    $("[data-sticky-price]").textContent = euro(p.price);
  };
  show(current);
  $("[data-sticky-add]").addEventListener("click", () => addToCart(current.id));
  // Visible une fois le hero dépassé, jusqu'au pied de page
  const onScroll = () => {
    const past = window.scrollY > $(".hero").offsetHeight;
    const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - $(".footer").offsetHeight;
    bar.classList.toggle("is-visible", past && !nearEnd);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  // Suit la montre présentée à l'écran
  if (!("IntersectionObserver" in window)) return;
  const watchIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) show(byId(e.target.id)); });
  }, { threshold: 0.5 });
  PRODUCTS.forEach((p) => watchIO.observe(document.getElementById(p.id)));
}

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
const observeReveal = () => $$(".reveal:not(.is-in)").forEach((el) => io ? io.observe(el) : el.classList.add("is-in"));

document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderCards();
  renderShowcases();
  renderCompare();
  renderFooterLinks();
  renderCart();
  $$(".review, .trust__item").forEach((el) => el.classList.add("reveal"));
  observeReveal();
  setupSticky();

  // Délégation : boutons « ajouter » et « voir »
  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) return addToCart(add.dataset.add);
    const open = e.target.closest("[data-open]");
    if (open) return openModal(open.dataset.open);
  });

  $$("[data-mq]").forEach((b) => b.addEventListener("click", () => {
    modalQty = Math.max(1, Math.min(9, modalQty + +b.dataset.mq));
    $("[data-modal-qty]").textContent = modalQty;
  }));
  $("[data-modal-add]").addEventListener("click", () => addToCart(modalProduct.id, modalQty));
  $("[data-modal-close]").addEventListener("click", closeModal);
  $(".modal").addEventListener("click", (e) => { if (e.target.classList.contains("modal")) closeModal(); });

  $(".cart-btn").addEventListener("click", openCart);
  $("[data-close]").addEventListener("click", closeCart);
  $("[data-overlay]").addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeModal(); closeCart(); } });
  $("[data-checkout]").addEventListener("click", () => toast(cart.length ? "Le paiement sera bientôt disponible." : "Votre panier est vide."));

  const header = $(".header");
  const toggle = $(".menu-toggle");
  toggle.addEventListener("click", () => {
    const open = header.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", open);
  });
  $$(".mobile-nav a").forEach((a) => a.addEventListener("click", () => header.classList.remove("menu-open")));

  $("[data-newsletter]").addEventListener("submit", (e) => {
    e.preventDefault();
    $(".newsletter__msg").textContent = "Merci ! Votre code -10 % arrive par e-mail.";
    e.target.reset();
  });

  $("[data-year]").textContent = new Date().getFullYear();
});
