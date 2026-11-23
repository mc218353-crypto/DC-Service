# DC Service — Boutique en ligne

Site vitrine et boutique de coques magnétiques double face, pensé pour Bamako.
Design « Tech Luxury » (bleu nuit, bleu électrique, blanc, gris clair), 100 % statique,
sans dépendance serveur.

## Pages

| Fichier | Rôle |
| --- | --- |
| `index.html` | Accueil : hero, produits vedettes, promotions, avantages, avis |
| `boutique.html` | Catalogue, filtres par marque, recherche, tri |
| `produit.html` | Fiche produit dynamique (`produit.html?id=...`), galerie, achat |
| `panier.html` | Panier dynamique, quantités, récapitulatif |
| `commande.html` | Formulaire de commande, paiement OM / Wave / à la livraison |
| `contact.html` | WhatsApp, téléphone, formulaire de contact |
| `promotions.html` | Offres en cours, prix barrés, compte à rebours |
| `confiance.html` | Livraison, retours, CGV, FAQ |

## Structure

```
assets/
  css/styles.css      → design system complet + responsive
  js/data.js          → CONFIG, produits, avis, FAQ (À MODIFIER EN PRIORITÉ)
  js/store.js         → panier (localStorage), helpers, carte produit
  js/main.js          → header, menu mobile, ajout au panier global
  js/home.js          → accueil (vedettes, avis, compte à rebours)
  js/boutique.js      → recherche, filtres, tri, URL synchronisée
  js/produit.js       → fiche produit, galerie, quantité, WhatsApp
  js/panier.js        → rendu et actions du panier
  js/commande.js      → validation, paiement, confirmation, WhatsApp
  js/contact.js       → formulaire de contact vers WhatsApp
  js/promotions.js    → produits en promo + compte à rebours
images/               → photos produits
_backup-v1/           → ancienne version du site (sauvegarde)
```

## Modifier le catalogue

Tout se passe dans `assets/js/data.js` :

- `DC.CONFIG` : téléphone WhatsApp, ville, date de fin des promos, horaires.
- `DC.PRODUCTS` : un objet par produit (`id`, `name`, `brand`, `price`, `oldPrice`,
  `image`, `gallery`, `badge`, `rating`, `reviews`, `features`, `description`).
- `DC.REVIEWS` : témoignages affichés sur l'accueil.
- `DC.FAQS` : questions/réponses.

Le numéro WhatsApp est aussi présent dans les liens `wa.me` des pages HTML.
Pour le changer partout, recherchez `22394125711` et remplacez-le.

## Fonctionnement du panier

Le panier est stocké dans le navigateur (`localStorage`, clé `dc_cart_v1`).
Il est partagé entre toutes les pages, avec un compteur dans le header.
Aucune donnée n'est envoyée à un serveur tant que le client n'envoie pas sa
commande sur WhatsApp.

## Paiement

Le site ne réalise aucune transaction. Le client choisit Orange Money, Wave ou
le paiement à la livraison ; la commande est ensuite confirmée sur WhatsApp avec
la référence, les articles et les coordonnées. Les instructions de paiement
mobile sont transmises par l'équipe.

## Lancer en local

```bash
python -m http.server 5500
```

Puis ouvrir `http://127.0.0.1:5500/index.html`.

Un simple double-clic sur `index.html` fonctionne aussi, mais un serveur local
est préférable (chemins relatifs, `localStorage`, polices).

## Mettre en ligne (GitHub Pages)

1. Pousser le contenu du dossier sur la branche `main`.
2. Dans GitHub : **Settings → Pages → Deploy from a branch → main / root**.
3. Le site est publié à l'adresse `https://<utilisateur>.github.io/<depot>/`.

Aucun build n'est nécessaire : tout est en HTML/CSS/JS natif.

## Points de personnalisation rapides

- **Photos** : remplacer les fichiers dans `images/` en conservant les noms, ou
  mettre à jour les chemins dans `data.js`.
- **Couleurs** : variables `--navy`, `--blue`, `--gray` dans `assets/css/styles.css`.
- **Textes légaux** : section CGV de `confiance.html`.
- **Livraison** : délais et zones dans `confiance.html` et `data.js`.

## Compatibilité

Navigateurs modernes (Chrome, Edge, Safari, Firefox). Le site est responsive
(mobile, tablette, desktop) et respecte `prefers-reduced-motion`.
