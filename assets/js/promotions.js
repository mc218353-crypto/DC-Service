/* =========================================================
   DC SERVICE — PROMOTIONS
   ========================================================= */

(() => {
  "use strict";

  const DC = window.DC;

  const pad = (value) => String(value).padStart(2, "0");

  document.addEventListener("DOMContentLoaded", () => {
    /* Produits en promotion */
    const grid = document.getElementById("promoGrid");

    if (grid) {
      const promos = DC.PRODUCTS.filter(
        (product) => product.oldPrice && product.oldPrice > product.price
      );

      if (promos.length) {
        grid.innerHTML = promos.map(DC.productCard).join("");
        DC.observeReveals(grid);
      } else {
        grid.innerHTML = `
          <div class="empty-state">
            ${DC.icon("tag")}
            <h3>Aucune promotion en cours</h3>
            <p>Revenez bientôt : de nouvelles offres arrivent régulièrement.</p>
            <a class="btn btn--primary" href="boutique.html">Voir la boutique</a>
          </div>`;
      }
    }

    /* Compte à rebours */
    const countdown = document.querySelector("[data-countdown]");
    if (!countdown) return;

    const target = new Date(DC.CONFIG.promoEnds).getTime();

    const update = () => {
      const diff = Math.max(0, target - Date.now());
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      countdown.querySelector("[data-cd-days]").textContent = pad(days);
      countdown.querySelector("[data-cd-hours]").textContent = pad(hours);
      countdown.querySelector("[data-cd-minutes]").textContent = pad(minutes);
      countdown.querySelector("[data-cd-seconds]").textContent = pad(seconds);
    };

    update();
    window.setInterval(update, 1000);
  });
})();
