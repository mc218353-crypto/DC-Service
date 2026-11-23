/* =========================================================
   DC SERVICE — CONTACT
   ========================================================= */

(() => {
  "use strict";

  const DC = window.DC;

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const errorBox = document.getElementById("contactError");

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

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      clearError();

      const nameField = document.getElementById("cName");
      const phoneField = document.getElementById("cPhone");
      const subjectField = document.getElementById("cSubject");
      const messageField = document.getElementById("cMessage");

      const name = nameField.value.trim();
      const phone = phoneField.value.trim();
      const subject = subjectField.value;
      const message = messageField.value.trim();

      const phoneDigits = phone.replace(/\D/g, "");

      const invalid = [];
      if (name.length < 2) invalid.push(nameField);
      if (phoneDigits.length < 8) invalid.push(phoneField);
      if (message.length < 5) invalid.push(messageField);

      [nameField, phoneField, messageField].forEach((field) => {
        field.setAttribute("aria-invalid", String(invalid.includes(field)));
      });

      if (invalid.length) {
        showError("Merci de renseigner votre nom, un téléphone valide et votre message.");
        invalid[0].focus();
        return;
      }

      const text = [
        "Bonjour DC Service,",
        "",
        `Sujet : ${subject}`,
        `Nom : ${name}`,
        `Téléphone : ${phone}`,
        "",
        message
      ].join("\n");

      window.open(DC.waLink(text), "_blank", "noopener,noreferrer");

      DC.toast("Message prêt, envoyez-le sur WhatsApp");
      form.reset();
    });
  });
})();
