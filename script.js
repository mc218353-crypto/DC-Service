// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', () => {

    // Données des produits DC Service
    const products = [
        {
            id: 1,
            name: "Coque Magnétique Samsung Verte",
            brand: "samsung",
            price: "10000 FCFA",
            img: "samsung-verte.png"
        },
        {
            id: 2,
            name: "Coque Magnétique Samsung Noire",
            brand: "samsung",
            price: "10000 FCFA",
            img: "samsung-noire.png"
        },
        {
            id: 3,
            name: "Coque Samsung S23 Ultra",
            brand: "samsung",
            price: "10000 FCFA",
            img: "samsung-s23-ultra.jpg"
        },
        {
            id: 4,
            name: "Protège-Objectif iPhone",
            brand: "iphone",
            price: "10000 FCFA",
            img: "iphone-protege-objectif.png",
            compatibility: "Compatible iPhone 11 à 17 Pro Max"
        },
        {
            id: 5,
            name: "Coque iPhone Transparente Deux Faces",
            brand: "iphone",
            price: "10000 FCFA",
            img: "iphone-transparente.png",
            compatibility: "Compatible iPhone 11 à 17 Pro Max"
        },
        {
            id: 6,
            name: "Coque Magnétique iPhone Dorée",
            brand: "iphone",
            price: "10000 FCFA",
            img: "iphone-doree.png",
            compatibility: "Compatible iPhone 11 à 17 Pro Max"
        },
        {
            id: 7,
            name: "Coque Magnétique iPhone Argentée",
            brand: "iphone",
            price: "10000 FCFA",
            img: "iphone-argentee.png",
            compatibility: "Compatible iPhone 11 à 17 Pro Max"
        },
        {
            id: 8,
            name: "Coque Magnétique iPhone Noire",
            brand: "iphone",
            price: "10000 FCFA",
            img: "iphone-noire.png",
            compatibility: "Compatible iPhone 11 à 17 Pro Max"
        },
        {
            id: 9,
            name: "Coque iPhone - Modèle 1",
            brand: "iphone",
            price: "10000 FCFA",
            img: "iphone-produit1.jpg",
            compatibility: "Compatible iPhone 11 à 17 Pro Max"
        },
        {
            id: 10,
            name: "Coque iPhone - Modèle 2",
            brand: "iphone",
            price: "10000 FCFA",
            img: "iphone-produit2.jpg",
            compatibility: "Compatible iPhone 11 à 17 Pro Max"
        },
        {
            id: 11,
            name: "Coque iPhone - Modèle 3",
            brand: "iphone",
            price: "10000 FCFA",
            img: "iphone-produit3.jpg",
            compatibility: "Compatible iPhone 11 à 17 Pro Max"
        },
        {
            id: 12,
            name: "Coque Magnétique Redmi",
            brand: "redmi",
            price: "10000 FCFA",
            img: "redmi.jpg"
        }
    ];

    // Sélection des éléments du DOM
    const productGrid = document.getElementById('productGrid');
    const modal = document.getElementById('orderModal');
    const closeModal = document.querySelector('.close-btn');
    const searchInput = document.getElementById('searchInput');
    const orderForm = document.getElementById('orderForm');
    const brandButtons = document.querySelectorAll('.brand-card');

    // Numéro WhatsApp DC Service
    const PHONE_NUMBER = "22394125711";

    // Fonction d'affichage des produits
    function renderProducts(items) {
        if (!productGrid) return;

        productGrid.innerHTML = '';

        if (items.length === 0) {
            productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 20px;">Aucun produit trouvé pour ce modèle.</p>';
            return;
        }

        items.forEach(product => {
            const waMessage = encodeURIComponent(`Bonjour DC Service, je souhaite commander la ${product.name} à ${product.price}.`);
            const waLink = `https://wa.me/${PHONE_NUMBER}?text=${waMessage}`;
            const compatibilityHtml = product.compatibility
                ? `<p class="product-compat">${product.compatibility}</p>`
                : '';

            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <div>
                  <h3 class="product-title">${product.name}</h3>
                  ${compatibilityHtml}
                  <p class="product-price">${product.price}</p>
                </div>
                <div class="btn-group">
                  <button class="btn-buy" data-name="${product.name}">Acheter Directement</button>
                  <a href="${waLink}" target="_blank" class="btn-wa">
                    <i class="fa-brands fa-whatsapp"></i> Via WhatsApp
                  </a>
                </div>
            `;

            // Écouteur d'événement sur le bouton "Acheter Directement"
            const buyBtn = card.querySelector('.btn-buy');
            if (buyBtn) {
                buyBtn.addEventListener('click', () => {
                    openOrderModal(product.name);
                });
            }

            productGrid.appendChild(card);
        });
    }

    // Filtrage par marque
    brandButtons.forEach(button => {
        button.addEventListener('click', () => {
            brandButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');

            const brand = button.getAttribute('data-brand');
            if (brand === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.brand === brand);
                renderProducts(filtered);
            }
        });
    });

    // Barre de recherche dynamique
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filtered = products.filter(p => p.name.toLowerCase().includes(query));
            renderProducts(filtered);
        });
    }

    // Gestion de la boîte modale
    function openOrderModal(productName) {
        if (!modal) return;
        const modalProductName = document.getElementById('modalProductName');
        const selectedProductInput = document.getElementById('selectedProduct');

        if (modalProductName) modalProductName.textContent = productName;
        if (selectedProductInput) selectedProductInput.value = productName;

        modal.style.display = 'flex';
    }

    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Soumission du formulaire de commande
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const product = document.getElementById('selectedProduct')?.value || '';
            const name = document.getElementById('clientName')?.value || '';
            const phone = document.getElementById('clientPhone')?.value || '';
            const location = document.getElementById('clientLocation')?.value || '';

            const msg = `*NOUVELLE COMMANDE DC SERVICE*\n\n` +
                        `------------------------------\n` +
                        `*Produit :* ${product}\n` +
                        `*Nom du client :* ${name}\n` +
                        `*Téléphone :* ${phone}\n` +
                        `*Lieu de livraison :* ${location}\n` +
                        `------------------------------`;

            window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');

            if (modal) modal.style.display = 'none';
            orderForm.reset();
        });
    }

    // Initialisation au chargement
    renderProducts(products);
});
