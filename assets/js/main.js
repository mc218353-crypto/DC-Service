/* =========================================================
   DC SERVICE — INTERACTIONS GLOBALES
   ========================================================= */

(() => {
  "use strict";

  const DC = window.DC;

  document.addEventListener("DOMContentLoaded", () => {
    /* Année automatique */
    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });

    /* Ombre du header au défilement */
    const header = document.querySelector(".header");
    if (header) {
      const onScroll = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 8);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* Menu mobile */
    const burger = document.getElementById("burger");
    const nav = document.getElementById("mainNav");

    if (burger && nav) {
      const closeNav = () => {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Ouvrir le menu");
        burger.innerHTML = '<i class="fa-solid fa-bars"></i>';
      };

      burger.addEventListener("click", () => {
        const open = nav.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", String(open));
        burger.setAttribute(
          "aria-label",
          open ? "Fermer le menu" : "Ouvrir le menu"
        );
        burger.innerHTML = open
          ? '<i class="fa-solid fa-xmark"></i>'
          : '<i class="fa-solid fa-bars"></i>';
      });

      nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeNav);
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeNav();
      });

      document.addEventListener("click", (event) => {
        if (!nav.contains(event.target) && !burger.contains(event.target)) {
          closeNav();
        }
      });
    }

    /* Lien de navigation actif */
    const current = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav a").forEach((link) => {
      const href = link.getAttribute("href") || "";
      const target = href.split("#")[0];
      link.classList.toggle("is-active", target === current);
    });

    /* Ajout au panier (délégation globale) */
    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-add-to-cart]");
      if (!button) return;

      event.preventDefault();

      const id = button.dataset.addToCart;
      const qty = Number(button.dataset.qty || 1);

      DC.cart.add(id, qty);
      DC.toast("Produit ajouté au panier");

      if (button.classList.contains("quick-add")) {
        button.innerHTML = '<i class="fa-solid fa-check"></i>';
        window.setTimeout(() => {
          button.innerHTML = '<i class="fa-solid fa-plus"></i>';
        }, 1400);
      }
    });

    /* Apparition douce */
    DC.observeReveals(document);
  });
})();
