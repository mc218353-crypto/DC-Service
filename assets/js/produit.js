/* =========================================================
   DC SERVICE — FICHE PRODUIT
   ========================================================= */

(() => {
  "use strict";

  const DC = window.DC;

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("productRoot");
    if (!root) return;

    const params = new URLSearchParams(window.location.search);
    const product =
      DC.product(params.get("id")) || DC.PRODUCTS[0];

    if (!product) {
      root.innerHTML = `
        <div class="empty-state">
          ${DC.icon("box-open")}
          <h3>Produit introuvable</h3>
          <p>Ce produit n'existe pas ou n'est plus disponible.</p>
          <a class="btn btn--primary" href="boutique.html">Voir la boutique</a>
        </div>`;
      return;
    }

    const discount = DC.discount(product.price, product.oldPrice);
    const gallery = (product.gallery && product.gallery.length
      ? product.gallery
      : [product.image]
    ).filter(Boolean);

    document.title = `${product.name} | DC Service`;

    const crumb = document.getElementById("crumbName");
    if (crumb) crumb.textContent = product.name;

    root.innerHTML = `
      <div class="product-layout">
        <div class="product-gallery">
          <div class="gallery-main">
            <img id="galleryMain" src="${gallery[0]}" alt="${DC.escapeHTML(product.name)}" fetchpriority="high">
          </div>
          <div class="gallery-thumbs" id="galleryThumbs" role="group" aria-label="Photos du produit">
            ${gallery
              .map(
                (src, index) => `
              <button type="button" class="${index === 0 ? "is-active" : ""}"
                      data-gallery-src="${src}" aria-label="Voir la photo ${index + 1}"
                      aria-pressed="${index === 0}">
                <img src="${src}" alt="" loading="lazy" decoding="async">
              </button>`
              )
              .join("")}
          </div>
        </div>

        <div class="product-info">
          <span class="product-brand">${DC.BRANDS[product.brand] || "DC Service"} · ${product.sku}</span>
          <h1>${DC.escapeHTML(product.name)}</h1>

          <div class="product-info__rating">
            ${DC.stars(product.rating)}
            <b>${product.rating.toFixed(1)}</b>
            <span>· ${product.reviews} avis vérifiés</span>
          </div>

          <div class="product-info__price">
            <strong>${DC.money(product.price)}</strong>
            ${product.oldPrice ? `<s>${DC.money(product.oldPrice)}</s>` : ""}
            ${discount ? `<span class="save">-${discount}%</span>` : ""}
          </div>

          <p class="product-info__desc">${DC.escapeHTML(product.description)}</p>

          <ul class="product-features">
            ${product.features
              .map(
                (feature) => `
              <li><i class="fa-solid fa-circle-check" aria-hidden="true"></i><span>${DC.escapeHTML(feature)}</span></li>`
              )
              .join("")}
          </ul>

          <div class="buy-row">
            <div class="qty" aria-label="Quantité">
              <button type="button" data-qty-minus aria-label="Diminuer la quantité">
                <i class="fa-solid fa-minus"></i>
              </button>
              <input id="qtyInput" type="number" value="1" min="1" max="20"
                     inputmode="numeric" aria-label="Quantité">
              <button type="button" data-qty-plus aria-label="Augmenter la quantité">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>

            <button class="btn btn--primary btn--lg" type="button" id="addToCart">
              <i class="fa-solid fa-bag-shopping"></i> Ajouter au panier
            </button>

            <a class="btn btn--wa btn--lg" id="waOrder" href="#" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-whatsapp"></i> Commander
            </a>
          </div>

          <div class="delivery-box">
            <i class="fa-solid fa-truck-fast" aria-hidden="true"></i>
            <div>
              <b>Livraison gratuite à Bamako</b>
              <p>Commandez avant 16h : livraison le jour même ou le lendemain. Paiement à la livraison, Orange Money ou Wave.</p>
            </div>
          </div>

          <div class="accordion">
            <details open>
              <summary>Compatibilité & modèle</summary>
              <p>Indiquez le modèle exact de votre téléphone (par exemple iPhone 13 Pro, Galaxy S23 Ultra ou Redmi Note 12) lors de la commande. Nous vérifions la compatibilité avant l'expédition.</p>
            </details>
            <details>
              <summary>Livraison & retours</summary>
              <p>Livraison offerte partout à Bamako. Échange possible sous 7 jours si le modèle ne convient pas, dans son état d'origine. Contactez-nous sur WhatsApp avec votre numéro de commande.</p>
            </details>
            <details>
              <summary>Paiement</summary>
              <p>Paiement à la livraison en espèces, ou par Orange Money et Wave. Après validation de votre commande, nous vous envoyons les instructions de paiement sur WhatsApp.</p>
            </details>
          </div>
        </div>
      </div>`;

    /* Galerie */
    const main = document.getElementById("galleryMain");
    const thumbs = [...document.querySelectorAll("[data-gallery-src]")];

    thumbs.forEach((button) => {
      button.addEventListener("click", () => {
        const src = button.dataset.gallerySrc;
        if (!src || !main) return;

        main.src = src;
        thumbs.forEach((item) => {
          const active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", String(active));
        });
      });
    });

    /* Quantité */
    const qtyInput = document.getElementById("qtyInput");

    const readQty = () =>
      Math.min(20, Math.max(1, Number(qtyInput && qtyInput.value) || 1));

    const writeQty = (value) => {
      if (!qtyInput) return;
      qtyInput.value = String(Math.min(20, Math.max(1, value)));
      updateWhatsApp();
    };

    document.querySelector("[data-qty-minus]")?.addEventListener("click", () => {
      writeQty(readQty() - 1);
    });

    document.querySelector("[data-qty-plus]")?.addEventListener("click", () => {
      writeQty(readQty() + 1);
    });

    qtyInput?.addEventListener("change", () => writeQty(readQty()));

    /* Ajout au panier */
    document.getElementById("addToCart")?.addEventListener("click", () => {
      DC.cart.add(product.id, readQty());
      DC.toast(`${product.name} ajouté au panier`);
    });

    /* Lien WhatsApp */
    const waOrder = document.getElementById("waOrder");

    function updateWhatsApp() {
      if (!waOrder) return;

      const qty = readQty();
      const message = [
        "Bonjour DC Service, je souhaite commander :",
        `• ${product.name} × ${qty} — ${DC.money(product.price * qty)}`,
        "",
        "Mon modèle de téléphone : ",
        "Livraison : gratuite à Bamako"
      ].join("\n");

      waOrder.href = DC.waLink(message);
    }

    updateWhatsApp();

    /* Produits associés */
    const relatedGrid = document.getElementById("relatedGrid");

    if (relatedGrid) {
      const related = DC.PRODUCTS.filter((item) => item.id !== product.id)
        .sort((a, b) => {
          const sameA = a.brand === product.brand ? 1 : 0;
          const sameB = b.brand === product.brand ? 1 : 0;
          return sameB - sameA;
        })
        .slice(0, 4);

      relatedGrid.innerHTML = related.map(DC.productCard).join("");
      DC.observeReveals(relatedGrid);
    }
  });
})();
