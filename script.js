
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Numéro WhatsApp DC Service, au format international sans +
  const PHONE_NUMBER = "22394125711";
  const PRICE = 10000;

  // Remplace les chemins des images par les noms exacts de tes fichiers.
  const products = [
    {
      id: 1,
      name: "Coque magnétique Samsung verte",
      brand: "samsung",
      image: "images/samsung verte.png",
      compatibility: "Modèle Samsung à confirmer"
    },
    {
      id: 2,
      name: "Coque magnétique Samsung noire",
      brand: "samsung",
      image: "images/samsung-noire.png",
      compatibility: "Modèle Samsung à confirmer"
    },
    {
      id: 3,
      name: "Coque magnétique Samsung S23 Ultra",
      brand: "samsung",
      image: "images/samsung-s23-ultra.jpg",
      compatibility: "Samsung Galaxy S23 Ultra"
    },
    {
      id: 4,
      name: "Coque magnétique iPhone noire",
      brand: "iphone",
      image: "images/iphone-noire.png",
      compatibility: "iPhone : modèle exact à confirmer"
    },
    {
      id: 5,
      name: "Coque magnétique iPhone dorée",
      brand: "iphone",
      image: "images/iphone-doree.png",
      compatibility: "iPhone : modèle exact à confirmer"
    },
    {
      id: 6,
      name: "Coque magnétique iPhone argentée",
      brand: "iphone",
      image: "images/iphone-argentee.png",
      compatibility: "iPhone : modèle exact à confirmer"
    },
    {
      id: 7,
      name: "Coque magnétique iPhone transparente",
      brand: "iphone",
      image: "images/iphone-transparente.png",
      compatibility: "iPhone : modèle exact à confirmer"
    },
    {
      id: 8,
      name: "Coque magnétique Redmi",
      brand: "redmi",
      image: "images/redmi.jpg",
      compatibility: "Redmi / Xiaomi : modèle à confirmer"
    }
  ];

  const productGrid = document.getElementById("productGrid");
  const searchInput = document.getElementById("searchInput");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav-links");

  let selectedBrand = "all";

  // Sécurise les textes insérés dans le HTML.
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function formatPrice(price) {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
  }

  function createWhatsAppLink(product) {
    const message =
      `Bonjour DC Service ! Je souhaite commander : ${product.name}.\n` +
      `Prix : ${formatPrice(PRICE)}.\n` +
      `Livraison à Bamako : gratuite.\n` +
      `Mon modèle exact de téléphone est : [à préciser].\n` +
      `Merci de confirmer la disponibilité.`;

    return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function renderProducts() {
    if (!productGrid) return;

    const query = searchInput
      ? searchInput.value.trim().toLocaleLowerCase("fr")
      : "";

    const filteredProducts = products.filter(product => {
      const matchesBrand =
        selectedBrand === "all" || product.brand === selectedBrand;

      const searchableText =
        `${product.name} ${product.brand} ${product.compatibility}`
          .toLocaleLowerCase("fr");

      return matchesBrand && searchableText.includes(query);
    });

    productGrid.innerHTML = "";

    if (filteredProducts.length === 0) {
      productGrid.innerHTML = `
        <div class="no-results">
          <i class="fa-solid fa-magnifying-glass"></i>
          <p>Aucun produit trouvé.</p>
          <p>Contactez-nous sur WhatsApp pour vérifier votre modèle.</p>
        </div>
      `;
      return;
    }

    filteredProducts.forEach(product => {
      const card = document.createElement("article");
      card.className = "product-card";

      const safeName = escapeHTML(product.name);
      const safeBrand = escapeHTML(product.brand);
      const safeCompatibility = escapeHTML(product.compatibility);
      const safeImage = escapeHTML(product.image);
      const whatsappLink = createWhatsAppLink(product);

      card.innerHTML = `
        <div class="product-image">
          <img
            src="${safeImage}"
            alt="${safeName}"
            loading="lazy"
          >
        </div>

        <div class="product-info">
          <span class="product-brand">${safeBrand}</span>
          <h3 class="product-title">${safeName}</h3>
          <p class="product-compat">${safeCompatibility}</p>

          <p class="product-price">
            ${formatPrice(PRICE)}
          </p>

          <div class="product-actions">
            <a
              class="btn btn-product-wa"
              href="${whatsappLink}"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fa-brands fa-whatsapp"></i>
              Commander
            </a>

            <a
              class="btn btn-outline"
              href="${whatsappLink}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vérifier mon modèle
            </a>
          </div>
        </div>
      `;

      const image = card.querySelector("img");
      const imageContainer = card.querySelector(".product-image");

      image.addEventListener("error", () => {
        image.remove();
        imageContainer.classList.add("image-missing");
        imageContainer.innerHTML =
          '<i class="fa-solid fa-mobile-screen-button" aria-label="Image indisponible"></i>';
      }, { once: true });

      productGrid.appendChild(card);
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      selectedBrand = button.dataset.brand || "all";

      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      renderProducts();
    });

    button.setAttribute(
      "aria-pressed",
      String(button.classList.contains("active"))
    );
  });

  if (searchInput) {
    searchInput.addEventListener("input", renderProducts);
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fermer le menu" : "Ouvrir le menu"
      );

      menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Ouvrir le menu");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  renderProducts();
});
