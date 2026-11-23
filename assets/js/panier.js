/* =========================================================
   DC SERVICE — PANIER
   ========================================================= */

(() => {
  "use strict";

  const DC = window.DC;

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("cartRoot");
    if (!root) return;

    const render = () => {
      const items = DC.cart.detailed();

      if (!items.length) {
        root.innerHTML = `
          <div class="empty-state">
            ${DC.icon("bag-shopping")}
            <h3>Votre panier est vide</h3>
            <p>Découvrez nos coques magnétiques double face et ajoutez votre modèle préféré.</p>
            <a class="btn btn--primary" href="boutique.html">
              Découvrir la boutique <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>`;
        return;
      }

      const subtotal = DC.cart.subtotal();
      const totalItems = DC.cart.count();

      root.innerHTML = `
        <div class="cart-layout">
          <div>
            <div class="cart-list">
              ${items
                .map(
                  (item) => `
                <article class="cart-item" data-id="${item.id}">
                  <a class="cart-item__img" href="produit.html?id=${encodeURIComponent(item.id)}" aria-label="Voir ${DC.escapeHTML(item.product.name)}">
                    <img src="${item.product.image}" alt="${DC.escapeHTML(item.product.name)}" loading="lazy" decoding="async">
                  </a>

                  <div class="cart-item__info">
                    <span class="cart-item__brand">${DC.BRANDS[item.product.brand] || "DC Service"}</span>
                    <h2 class="cart-item__title">
                      <a href="produit.html?id=${encodeURIComponent(item.id)}">${DC.escapeHTML(item.product.name)}</a>
                    </h2>

                    <div class="cart-item__meta">
                      <div class="qty" aria-label="Quantité pour ${DC.escapeHTML(item.product.name)}">
                        <button type="button" data-cart-minus aria-label="Diminuer la quantité">
                          <i class="fa-solid fa-minus"></i>
                        </button>
                        <input type="number" value="${item.qty}" min="1" max="20"
                               data-cart-qty inputmode="numeric"
                               aria-label="Quantité">
                        <button type="button" data-cart-plus aria-label="Augmenter la quantité">
                          <i class="fa-solid fa-plus"></i>
                        </button>
                      </div>

                      <span class="cart-item__price">${DC.money(item.product.price)}</span>

                      <button class="cart-item__remove" type="button" data-cart-remove>
                        Retirer
                      </button>
                    </div>
                  </div>

                  <div class="cart-item__total">${DC.money(item.lineTotal)}</div>
                </article>`
                )
                .join("")}
            </div>

            <div style="display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap;margin-top:18px">
              <a class="link-arrow" href="boutique.html">
                <i class="fa-solid fa-arrow-left"></i> Continuer mes achats
              </a>
              <button class="cart-item__remove" type="button" id="clearCart">
                Vider le panier
              </button>
            </div>
          </div>

          <aside class="summary" aria-label="Récapitulatif de la commande">
            <h2>Récapitulatif</h2>

            <div class="summary-row">
              <span>Articles (${totalItems})</span>
              <strong>${DC.money(subtotal)}</strong>
            </div>
            <div class="summary-row summary-row--free">
              <span>Livraison à Bamako</span>
              <strong>Gratuite</strong>
            </div>
            <div class="summary-row">
              <span>Paiement</span>
              <strong>À la livraison, OM ou Wave</strong>
            </div>

            <div class="summary-total">
              <span>Total</span>
              <strong>${DC.money(subtotal)}</strong>
            </div>

            <a class="btn btn--primary btn--block btn--lg" href="commande.html">
              Passer commande <i class="fa-solid fa-arrow-right"></i>
            </a>

            <a class="btn btn--ghost btn--block" id="waCart" href="#" target="_blank" rel="noopener noreferrer" style="margin-top:10px">
              <i class="fa-brands fa-whatsapp"></i> Commander sur WhatsApp
            </a>

            <div class="summary-note">
              <i class="fa-solid fa-shield-halved" aria-hidden="true"></i>
              <span>Paiement sécurisé à la réception. Aucun prépaiement obligatoire.</span>
            </div>
          </aside>
        </div>`;

      const wa = document.getElementById("waCart");
      if (wa) {
        wa.href = DC.waLink(DC.orderMessage(items, subtotal));
      }
    };

    /* Actions */
    root.addEventListener("click", (event) => {
      const item = event.target.closest("[data-id]");
      const id = item ? item.dataset.id : null;
      if (!id) {
        if (event.target.closest("#clearCart")) {
          DC.cart.clear();
          DC.toast("Panier vidé");
          render();
        }
        return;
      }

      const current = DC.cart.items().find((entry) => entry.id === id);
      const qty = current ? current.qty : 1;

      if (event.target.closest("[data-cart-plus]")) {
        DC.cart.setQty(id, qty + 1);
        render();
        return;
      }

      if (event.target.closest("[data-cart-minus]")) {
        DC.cart.setQty(id, qty - 1);
        render();
        return;
      }

      if (event.target.closest("[data-cart-remove]")) {
        DC.cart.remove(id);
        DC.toast("Article retiré du panier");
        render();
      }
    });

    root.addEventListener("change", (event) => {
      const input = event.target.closest("[data-cart-qty]");
      if (!input) return;

      const item = input.closest("[data-id]");
      if (!item) return;

      const value = Math.min(20, Math.max(1, Number(input.value) || 1));
      DC.cart.setQty(item.dataset.id, value);
      render();
    });

    document.addEventListener("dc:cart", render);
    render();
  });
})();
