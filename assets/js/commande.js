/* =========================================================
   DC SERVICE — COMMANDE
   ========================================================= */

(() => {
  "use strict";

  const DC = window.DC;

  const PAYMENTS = {
    om: {
      label: "Orange Money",
      note: "Après validation, nous vous envoyons le numéro marchand et les instructions Orange Money sur WhatsApp. La commande est préparée dès confirmation du paiement."
    },
    wave: {
      label: "Wave",
      note: "Après validation, nous vous envoyons le lien et les instructions Wave sur WhatsApp. La commande est préparée dès confirmation du paiement."
    },
    cash: {
      label: "Paiement à la livraison",
      note: "Vous payez en espèces au livreur, à la réception de votre colis. Aucun prépaiement n'est nécessaire."
    }
  };

  const QUARTIERS = [
    "Badalabougou",
    "Hamdallaye ACI",
    "Sotuba",
    "Kalaban Coura",
    "Lafiabougou",
    "Sabalibougou",
    "Magnambougou",
    "Faladié",
    "Djicoroni",
    "Niamakoro",
    "Banankabougou",
    "Autre quartier de Bamako"
  ];

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("checkoutRoot");
    if (!root) return;

    const items = DC.cart.detailed();

    if (!items.length) {
      root.innerHTML = `
        <div class="empty-state">
          ${DC.icon("bag-shopping")}
          <h3>Votre panier est vide</h3>
          <p>Ajoutez au moins une coque à votre panier pour passer commande.</p>
          <a class="btn btn--primary" href="boutique.html">
            Découvrir la boutique <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>`;
      return;
    }

    const total = DC.cart.subtotal();

    root.innerHTML = `
      <div class="checkout-layout" id="checkoutLayout">
        <form id="orderForm" novalidate>
          <div class="panel">
            <div class="panel-head">
              <span class="step-num">1</span>
              <h2>Vos coordonnées</h2>
            </div>

            <div class="field-grid">
              <div class="field field--full">
                <label for="fullName">Nom complet <span class="req">*</span></label>
                <input id="fullName" name="fullName" type="text" placeholder="Ex. Aminata Traoré"
                       autocomplete="name" required>
              </div>

              <div class="field">
                <label for="phone">Téléphone / WhatsApp <span class="req">*</span></label>
                <input id="phone" name="phone" type="tel" placeholder="Ex. 76 12 34 56"
                       autocomplete="tel" inputmode="tel" required>
                <span class="hint">Nous vous appelons pour confirmer.</span>
              </div>

              <div class="field">
                <label for="quartier">Quartier <span class="req">*</span></label>
                <select id="quartier" name="quartier" required>
                  <option value="">Choisir un quartier</option>
                  ${QUARTIERS.map((q) => `<option value="${q}">${q}</option>`).join("")}
                </select>
              </div>

              <div class="field field--full">
                <label for="address">Adresse / repère <span class="req">*</span></label>
                <input id="address" name="address" type="text"
                       placeholder="Ex. Rue 312, près de la pharmacie"
                       autocomplete="street-address" required>
              </div>

              <div class="field field--full">
                <label for="model">Modèle de téléphone</label>
                <input id="model" name="model" type="text"
                       placeholder="Ex. iPhone 13 Pro, Galaxy S23 Ultra, Redmi Note 12">
                <span class="hint">Indispensable pour vérifier la compatibilité de la coque.</span>
              </div>

              <div class="field field--full">
                <label for="notes">Notes (facultatif)</label>
                <textarea id="notes" name="notes"
                          placeholder="Heure de livraison souhaitée, précisions…"></textarea>
              </div>
            </div>
          </div>

          <div class="panel">
            <div class="panel-head">
              <span class="step-num">2</span>
              <h2>Moyen de paiement</h2>
            </div>

            <div class="pay-options" role="radiogroup" aria-label="Moyen de paiement">
              <label class="pay-option">
                <input type="radio" name="payment" value="om">
                <span class="pay-option__check" aria-hidden="true"></span>
                <span class="pay-option__icon pay-option__icon--om"><i class="fa-solid fa-mobile-screen"></i></span>
                <span>
                  <b>Orange Money</b>
                  <small>Paiement mobile, instructions sur WhatsApp</small>
                </span>
              </label>

              <label class="pay-option">
                <input type="radio" name="payment" value="wave">
                <span class="pay-option__check" aria-hidden="true"></span>
                <span class="pay-option__icon pay-option__icon--wave"><i class="fa-solid fa-water"></i></span>
                <span>
                  <b>Wave</b>
                  <small>Paiement mobile, instructions sur WhatsApp</small>
                </span>
              </label>

              <label class="pay-option">
                <input type="radio" name="payment" value="cash" checked>
                <span class="pay-option__check" aria-hidden="true"></span>
                <span class="pay-option__icon pay-option__icon--cash"><i class="fa-solid fa-money-bill-wave"></i></span>
                <span>
                  <b>Paiement à la livraison</b>
                  <small>En espèces, à la réception du colis</small>
                </span>
              </label>
            </div>

            <p class="pay-note is-visible" id="payNote">${PAYMENTS.cash.note}</p>

            <div class="checkout-actions">
              <button class="btn btn--primary btn--lg" type="submit" id="submitOrder">
                <i class="fa-solid fa-check"></i> Confirmer la commande
              </button>
              <small>En confirmant, vous serez redirigé vers WhatsApp pour finaliser.</small>
            </div>

            <div class="form-error" id="formError" role="alert"></div>
          </div>
        </form>

        <aside class="summary" aria-label="Récapitulatif">
          <h2>Votre commande</h2>

          ${items
            .map(
              (item) => `
            <div class="mini-item">
              <span class="mini-item__img">
                <img src="${item.product.image}" alt="${DC.escapeHTML(item.product.name)}" loading="lazy">
                <span>${item.qty}</span>
              </span>
              <span class="mini-item__info">
                <b>${DC.escapeHTML(item.product.name)}</b>
                <small>${DC.BRANDS[item.product.brand] || "DC Service"}</small>
              </span>
              <span class="mini-item__price">${DC.money(item.lineTotal)}</span>
            </div>`
            )
            .join("")}

          <div class="summary-row" style="margin-top:10px">
            <span>Sous-total</span>
            <strong>${DC.money(total)}</strong>
          </div>
          <div class="summary-row summary-row--free">
            <span>Livraison à Bamako</span>
            <strong>Gratuite</strong>
          </div>

          <div class="summary-total">
            <span>Total à payer</span>
            <strong>${DC.money(total)}</strong>
          </div>

          <div class="summary-note">
            <i class="fa-solid fa-lock" aria-hidden="true"></i>
            <span>Aucun paiement n'est effectué sur ce site. La transaction se finalise avec notre équipe sur WhatsApp.</span>
          </div>

          <a class="link-arrow" href="panier.html" style="margin-top:16px;font-size:12.5px">
            <i class="fa-solid fa-arrow-left"></i> Modifier le panier
          </a>
        </aside>
      </div>

      <div class="order-confirm" id="orderConfirm"></div>`;

    /* Note de paiement */
    const form = document.getElementById("orderForm");
    const errorBox = document.getElementById("formError");

    form.addEventListener("change", (event) => {
      if (event.target.name !== "payment") return;

      const value = event.target.value;
      const note = document.getElementById("payNote");

      if (note && PAYMENTS[value]) {
        note.textContent = PAYMENTS[value].note;
        note.classList.add("is-visible");
      }
    });

    /* Validation */
    const setInvalid = (field, invalid) => {
      if (!field) return;
      field.setAttribute("aria-invalid", String(Boolean(invalid)));
    };

    const showError = (message) => {
      if (!errorBox) return;
      errorBox.textContent = message;
      errorBox.classList.add("is-visible");
    };

    const clearError = () => {
      if (!errorBox) return;
      errorBox.textContent = "";
      errorBox.classList.remove("is-visible");
    };

    const phoneDigits = (value) => String(value || "").replace(/\D/g, "");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      clearError();

      const nameField = document.getElementById("fullName");
      const phoneField = document.getElementById("phone");
      const quartierField = document.getElementById("quartier");
      const addressField = document.getElementById("address");
      const modelField = document.getElementById("model");
      const notesField = document.getElementById("notes");

      const name = nameField.value.trim();
      const phone = phoneField.value.trim();
      const quartier = quartierField.value;
      const address = addressField.value.trim();
      const model = modelField ? modelField.value.trim() : "";
      const notes = notesField ? notesField.value.trim() : "";

      const paymentInput = form.querySelector('input[name="payment"]:checked');
      const payment = paymentInput ? paymentInput.value : "cash";

      let firstInvalid = null;

      const check = (field, valid) => {
        setInvalid(field, !valid);
        if (!valid && !firstInvalid) firstInvalid = field;
        return valid;
      };

      const validName = check(nameField, name.length >= 2);
      const validPhone = check(phoneField, phoneDigits(phone).length >= 8);
      const validQuartier = check(quartierField, Boolean(quartier));
      const validAddress = check(addressField, address.length >= 4);

      if (!validName || !validPhone || !validQuartier || !validAddress) {
        showError("Merci de renseigner correctement votre nom, votre téléphone, votre quartier et votre adresse.");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (!model) {
        showError("Indiquez le modèle de votre téléphone pour que nous vérifions la compatibilité de la coque.");
        if (modelField) modelField.focus();
        return;
      }

      /* Référence de commande */
      const ref = `DC-${Date.now().toString(36).toUpperCase().slice(-6)}`;

      const lines = items.map(
        (item) => `• ${item.product.name} × ${item.qty} — ${DC.money(item.lineTotal)}`
      );

      const message = [
        "Bonjour DC Service, je confirme ma commande :",
        "",
        `Référence : ${ref}`,
        "",
        "Articles :",
        ...lines,
        "",
        `Total : ${DC.money(total)}`,
        "Livraison : gratuite à Bamako",
        "",
        `Nom : ${name}`,
        `Téléphone : ${phone}`,
        `Quartier : ${quartier}`,
        `Adresse : ${address}`,
        `Modèle : ${model}`,
        notes ? `Notes : ${notes}` : "",
        `Paiement : ${PAYMENTS[payment].label}`
      ]
        .filter((line) => line !== "")
        .join("\n");

      const waUrl = DC.waLink(message);

      /* Confirmation */
      const layout = document.getElementById("checkoutLayout");
      const confirm = document.getElementById("orderConfirm");

      if (layout) layout.style.display = "none";

      if (confirm) {
        confirm.innerHTML = `
          <div class="order-confirm__icon"><i class="fa-solid fa-check"></i></div>
          <h2>Commande enregistrée</h2>
          <p>
            Merci ${DC.escapeHTML(name)}. Votre commande a bien été préparée.
            Cliquez sur le bouton WhatsApp pour l'envoyer à notre équipe et
            recevoir la confirmation de livraison.
          </p>
          <div class="order-ref">
            <i class="fa-solid fa-receipt"></i> ${ref}
          </div>
          <div class="order-confirm__actions">
            <a class="btn btn--wa btn--lg" href="${waUrl}" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-whatsapp"></i> Envoyer sur WhatsApp
            </a>
            <a class="btn btn--ghost" href="boutique.html">Continuer mes achats</a>
          </div>
          <p style="margin-top:18px;font-size:12px;color:var(--muted)">
            Paiement choisi : <strong>${PAYMENTS[payment].label}</strong> ·
            Livraison gratuite à Bamako
          </p>`;

        confirm.classList.add("is-visible");
        confirm.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      DC.cart.clear();
      window.open(waUrl, "_blank", "noopener,noreferrer");
    });
  });
})();
