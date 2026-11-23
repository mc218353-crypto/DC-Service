/* =========================================================
   DC SERVICE — PANIER & OUTILS PARTAGÉS
   ========================================================= */

(() => {
  "use strict";

  const KEY = "dc_cart_v1";
  const DC = window.DC;

  /* ---------- Outils ---------- */

  DC.escapeHTML = (value) =>
    String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);

  DC.money = (value) =>
    `${new Intl.NumberFormat("fr-FR").format(Number(value) || 0)} FCFA`;

  DC.discount = (price, oldPrice) =>
    oldPrice && oldPrice > price
      ? Math.round((1 - price / oldPrice) * 100)
      : 0;

  DC.product = (id) => DC.PRODUCTS.find((item) => item.id === id) || null;

  DC.waLink = (message) =>
    `https://wa.me/${DC.CONFIG.phone}?text=${encodeURIComponent(message)}`;

  DC.stars = (rating) => {
    const full = Math.round(Number(rating) || 0);
    let html = '<span class="stars" aria-hidden="true">';
    for (let i = 1; i <= 5; i += 1) {
      html += `<i class="fa-${i <= full ? "solid" : "regular"} fa-star"></i>`;
    }
    return `${html}</span>`;
  };

  DC.icon = (name) => `<i class="fa-solid fa-${name}" aria-hidden="true"></i>`;

  /* ---------- Toast ---------- */

  let toastTimer = null;

  DC.toast = (message) => {
    let el = document.getElementById("toast");

    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.className = "toast";
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      document.body.appendChild(el);
    }

    el.innerHTML = `${DC.icon("circle-check")}<span>${DC.escapeHTML(message)}</span>`;
    el.classList.add("is-visible");

    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      el.classList.remove("is-visible");
    }, 2600);
  };

  /* ---------- Panier ---------- */

  const read = () => {
    try {
      const raw = JSON.parse(window.localStorage.getItem(KEY));
      if (!Array.isArray(raw)) return [];

      return raw
        .filter((item) => item && typeof item.id === "string")
        .map((item) => ({
          id: item.id,
          qty: Math.min(20, Math.max(1, Number(item.qty) || 1))
        }))
        .filter((item) => DC.product(item.id));
    } catch (error) {
      return [];
    }
  };

  const write = (items) => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch (error) {
      /* stockage indisponible : le panier reste en mémoire */
    }
    refreshBadges();
    document.dispatchEvent(new CustomEvent("dc:cart", { detail: { items } }));
  };

  const refreshBadges = () => {
    const count = cart.count();
    document.querySelectorAll("[data-cart-count]").forEach((el) => {
      el.textContent = String(count);
      el.hidden = count === 0;
    });
  };

  const cart = {
    items: () => read(),

    detailed: () =>
      read()
        .map((item) => {
          const product = DC.product(item.id);
          if (!product) return null;
          return {
            ...item,
            product,
            lineTotal: product.price * item.qty
          };
        })
        .filter(Boolean),

    count: () => read().reduce((total, item) => total + item.qty, 0),

    subtotal: () =>
      read().reduce((total, item) => {
        const product = DC.product(item.id);
        return product ? total + product.price * item.qty : total;
      }, 0),

    add: (id, qty = 1) => {
      const product = DC.product(id);
      if (!product) return;

      const items = read();
      const existing = items.find((item) => item.id === id);

      if (existing) {
        existing.qty = Math.min(20, existing.qty + Number(qty || 1));
      } else {
        items.push({ id, qty: Math.min(20, Math.max(1, Number(qty) || 1)) });
      }

      write(items);
    },

    setQty: (id, qty) => {
      const quantity = Math.max(0, Math.min(20, Number(qty) || 0));
      let items = read();

      if (quantity === 0) {
        items = items.filter((item) => item.id !== id);
      } else {
        const item = items.find((entry) => entry.id === id);
        if (item) item.qty = quantity;
      }

      write(items);
    },

    remove: (id) => {
      write(read().filter((item) => item.id !== id));
    },

    clear: () => write([])
  };

  DC.cart = cart;

  /* ---------- Carte produit ---------- */

  DC.productCard = (product) => {
    const discount = DC.discount(product.price, product.oldPrice);
    const badge = product.badge
      ? `<span class="badge badge--${product.badgeType || "best"}">${DC.escapeHTML(product.badge)}</span>`
      : "";

    return `
      <article class="product-card reveal">
        <div class="product-card__media">
          <a class="product-card__link" href="produit.html?id=${encodeURIComponent(product.id)}">
            <img src="${product.image}" alt="${DC.escapeHTML(product.name)}" loading="lazy" decoding="async">
          </a>
          ${badge}
          <button class="quick-add" type="button"
                  data-add-to-cart="${product.id}"
                  aria-label="Ajouter ${DC.escapeHTML(product.name)} au panier">
            <i class="fa-solid fa-plus" aria-hidden="true"></i>
          </button>
        </div>
        <div class="product-card__body">
          <span class="product-brand">${DC.BRANDS[product.brand] || "DC Service"}</span>
          <h3 class="product-title">
            <a href="produit.html?id=${encodeURIComponent(product.id)}">${DC.escapeHTML(product.name)}</a>
          </h3>
          <span class="product-rating">
            ${DC.stars(product.rating)}
            <b>${product.rating.toFixed(1)}</b>
            <span>(${product.reviews})</span>
          </span>
          <div class="product-price">
            <strong>${DC.money(product.price)}</strong>
            ${product.oldPrice ? `<s>${DC.money(product.oldPrice)}</s>` : ""}
            ${discount ? `<em>-${discount}%</em>` : ""}
          </div>
        </div>
      </article>`;
  };

  DC.renderProducts = (products, container) => {
    if (!container) return;

    if (!products.length) {
      container.innerHTML = `
        <div class="empty-state">
          ${DC.icon("magnifying-glass")}
          <h3>Aucun produit trouvé</h3>
          <p>Essayez une autre recherche ou une autre catégorie.</p>
          <a class="btn btn--primary" href="boutique.html">Voir toute la boutique</a>
        </div>`;
      return;
    }

    container.innerHTML = products.map(DC.productCard).join("");
    DC.observeReveals(container);
  };

  /* ---------- Commande ---------- */

  DC.orderMessage = (detailed, total) => {
    const lines = detailed.map(
      (item) =>
        `• ${item.product.name} × ${item.qty} — ${DC.money(item.lineTotal)}`
    );

    return [
      "Bonjour DC Service, je souhaite passer commande :",
      "",
      ...lines,
      "",
      `Total : ${DC.money(total)}`,
      `Livraison : gratuite à Bamako`
    ].join("\n");
  };

  /* ---------- Apparition au défilement ---------- */

  DC.observeReveals = (root = document) => {
    const elements = [...root.querySelectorAll(".reveal:not(.is-in)")];
    if (!elements.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
  };

  /* ---------- Démarrage ---------- */

  refreshBadges();
  document.addEventListener("DOMContentLoaded", refreshBadges);
  window.addEventListener("storage", (event) => {
    if (event.key === KEY) refreshBadges();
  });
})();
