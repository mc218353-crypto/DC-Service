/* =========================================================
   DC SERVICE — ACCUEIL
   ========================================================= */

(() => {
  "use strict";

  const DC = window.DC;

  const pad = (value) => String(value).padStart(2, "0");

  const initials = (name) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");

  document.addEventListener("DOMContentLoaded", () => {
    /* Produits vedettes */
    const featuredGrid = document.getElementById("featuredGrid");
    const featuredIds = ["iphone-noir", "iphone-objectif", "samsung-s23", "pack-duo"];

    if (featuredGrid) {
      const products = featuredIds
        .map((id) => DC.product(id))
        .filter(Boolean);

      featuredGrid.innerHTML = products.map(DC.productCard).join("");
      DC.observeReveals(featuredGrid);
    }

    /* Avis clients */
    const reviewGrid = document.getElementById("reviewGrid");

    if (reviewGrid) {
      reviewGrid.innerHTML = DC.REVIEWS.slice(0, 3)
        .map(
          (review) => `
          <article class="review-card reveal">
            ${DC.stars(review.rating)}
            <blockquote>“${DC.escapeHTML(review.text)}”</blockquote>
            <div class="review-author">
              <span class="avatar">${initials(review.name)}</span>
              <span>
                <b>${DC.escapeHTML(review.name)}</b>
                <small>${DC.escapeHTML(review.city)}</small>
              </span>
            </div>
          </article>`
        )
        .join("");

      DC.observeReveals(reviewGrid);
    }

    /* Compte à rebours */
    const countdown = document.querySelector("[data-countdown]");

    if (countdown) {
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
    }
  });
})();
