/* =========================================================
   DC SERVICE — BOUTIQUE
   ========================================================= */

(() => {
  "use strict";

  const DC = window.DC;

  const params = new URLSearchParams(window.location.search);

  const state = {
    brand: params.get("marque") || "all",
    query: params.get("q") || "",
    sort: params.get("tri") || "featured"
  };

  document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("shopGrid");
    if (!grid) return;

    const chips = [...document.querySelectorAll("[data-brand]")];
    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");
    const resultCount = document.getElementById("resultCount");
    const resetButton = document.getElementById("resetFilters");

    if (searchInput) searchInput.value = state.query;
    if (sortSelect) sortSelect.value = state.sort;

    const normalize = (value) =>
      String(value || "")
        .toLocaleLowerCase("fr")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const matches = (product) => {
      if (state.brand !== "all" && product.brand !== state.brand) {
        return false;
      }

      if (!state.query) return true;

      const haystack = normalize(
        `${product.name} ${DC.BRANDS[product.brand]} ${product.sku} ${product.short}`
      );

      return state.query
        .split(/\s+/)
        .filter(Boolean)
        .every((term) => haystack.includes(normalize(term)));
    };

    const sortProducts = (products) => {
      const list = [...products];

      switch (state.sort) {
        case "price-asc":
          return list.sort((a, b) => a.price - b.price);
        case "price-desc":
          return list.sort((a, b) => b.price - a.price);
        case "rating":
          return list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        case "new":
          return list.sort(
            (a, b) =>
              Number(b.badgeType === "new") - Number(a.badgeType === "new") ||
              b.reviews - a.reviews
          );
        default:
          return list;
      }
    };

    const syncUrl = () => {
      const next = new URLSearchParams();

      if (state.brand !== "all") next.set("marque", state.brand);
      if (state.query) next.set("q", state.query);
      if (state.sort !== "featured") next.set("tri", state.sort);

      const search = next.toString();
      const url = `${window.location.pathname}${search ? `?${search}` : ""}`;
      window.history.replaceState(null, "", url);
    };

    const render = () => {
      const products = sortProducts(DC.PRODUCTS.filter(matches));

      chips.forEach((chip) => {
        const active = chip.dataset.brand === state.brand;
        chip.classList.toggle("is-active", active);
        chip.setAttribute("aria-pressed", String(active));
      });

      if (resultCount) {
        resultCount.innerHTML = `<strong>${products.length}</strong> produit${products.length > 1 ? "s" : ""}`;
      }

      if (resetButton) {
        resetButton.style.visibility =
          state.brand === "all" && !state.query && state.sort === "featured"
            ? "hidden"
            : "visible";
      }

      if (!products.length) {
        grid.innerHTML = `
          <div class="empty-state">
            ${DC.icon("magnifying-glass")}
            <h3>Aucun produit ne correspond</h3>
            <p>Essayez un autre modèle, une autre marque, ou revenez à toute la collection.</p>
            <button class="btn btn--primary" type="button" data-reset>Tout afficher</button>
          </div>`;
        return;
      }

      grid.innerHTML = products.map(DC.productCard).join("");
      DC.observeReveals(grid);
    };

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        state.brand = chip.dataset.brand || "all";
        syncUrl();
        render();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        state.query = searchInput.value.trim();
        syncUrl();
        render();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        state.sort = sortSelect.value;
        syncUrl();
        render();
      });
    }

    if (resetButton) {
      resetButton.addEventListener("click", () => {
        state.brand = "all";
        state.query = "";
        state.sort = "featured";

        if (searchInput) searchInput.value = "";
        if (sortSelect) sortSelect.value = "featured";

        syncUrl();
        render();
      });
    }

    grid.addEventListener("click", (event) => {
      if (!event.target.closest("[data-reset]")) return;

      state.brand = "all";
      state.query = "";
      state.sort = "featured";

      if (searchInput) searchInput.value = "";
      if (sortSelect) sortSelect.value = "featured";

      syncUrl();
      render();
    });

    /* Focus de la recherche depuis le header */
    if (searchInput && (window.location.hash === "#recherche" || state.query)) {
      window.setTimeout(() => {
        searchInput.focus({ preventScroll: true });
      }, 250);
    }

    window.addEventListener("hashchange", () => {
      if (window.location.hash === "#recherche" && searchInput) {
        searchInput.focus({ preventScroll: true });
      }
    });

    render();
  });
})();
