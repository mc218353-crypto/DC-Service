/* =========================================================
   DC SERVICE — DONNÉES BOUTIQUE
   Modifiez uniquement ce fichier pour mettre à jour le catalogue.
   ========================================================= */

window.DC = window.DC || {};

DC.CONFIG = {
  brand: "DC Service",
  tagline: "Digital Commerce",
  phone: "22394125711",
  phoneLabel: "+223 94 12 57 11",
  city: "Bamako, Mali",
  currency: "FCFA",
  delivery: "Livraison gratuite à Bamako",
  promoEnds: "2026-12-31T23:59:59",
  hours: [
    { day: "Lundi — Vendredi", time: "08h00 — 20h00" },
    { day: "Samedi", time: "09h00 — 19h00" },
    { day: "Dimanche", time: "Sur WhatsApp" }
  ]
};

DC.BRANDS = {
  iphone: "iPhone",
  samsung: "Samsung",
  redmi: "Redmi",
  pack: "Packs"
};

DC.PRODUCTS = [
  {
    id: "iphone-noir",
    name: "Coque Magnétique iPhone — Noir Mat",
    brand: "iphone",
    price: 10000,
    oldPrice: null,
    image: "images/iphone-noire.png",
    gallery: [
      "images/iphone-noire.png",
      "images/iphone-produit3.jpg",
      "images/iphone-produit2.jpg"
    ],
    badge: "Best-seller",
    badgeType: "best",
    rating: 4.9,
    reviews: 42,
    sku: "DC-IP-NOIR",
    short: "La finition la plus sobre de la collection, en protection double face.",
    description:
      "Une coque magnétique double face à la finition noire mate. Le cadre métallique protège l'écran et le dos de votre iPhone, tandis que la fermeture magnétique garde l'ensemble parfaitement ajusté. Un design discret, pensé pour durer.",
    features: [
      "Protection avant et arrière",
      "Fermeture magnétique renforcée",
      "Protection dédiée aux objectifs",
      "Ouvertures précises pour les commandes",
      "Compatible charge sans fil"
    ]
  },
  {
    id: "iphone-dore",
    name: "Coque Magnétique iPhone — Doré",
    brand: "iphone",
    price: 10000,
    oldPrice: null,
    image: "images/iphone-doree.png",
    gallery: [
      "images/iphone-doree.png",
      "images/iphone-produit2.jpg",
      "images/iphone-produit3.jpg"
    ],
    badge: null,
    badgeType: null,
    rating: 4.8,
    reviews: 31,
    sku: "DC-IP-DORE",
    short: "Un cadre doré lumineux pour un rendu premium au quotidien.",
    description:
      "La coque magnétique double face en finition dorée sublime votre iPhone sans le masquer. Le cadre métallique fin et brillant protège les tranches, l'écran et le dos, avec une fermeture magnétique précise et rassurante.",
    features: [
      "Finition dorée premium",
      "Protection double face intégrale",
      "Fermeture magnétique",
      "Zone caméra protégée",
      "Design fin et léger"
    ]
  },
  {
    id: "iphone-argent",
    name: "Coque Magnétique iPhone — Argenté",
    brand: "iphone",
    price: 10000,
    oldPrice: null,
    image: "images/iphone-argentee.png",
    gallery: [
      "images/iphone-argentee.png",
      "images/iphone-produit1.jpg",
      "images/iphone-produit2.jpg"
    ],
    badge: null,
    badgeType: null,
    rating: 4.8,
    reviews: 26,
    sku: "DC-IP-ARG",
    short: "L'élégance du métal argenté, sans compromis sur la protection.",
    description:
      "Un cadre argenté au rendu miroir qui met en valeur le design de votre iPhone. La structure double face protège l'avant comme l'arrière, et les finitions précises laissent chaque bouton et chaque connecteur accessible.",
    features: [
      "Cadre métallique argenté",
      "Protection avant et arrière",
      "Fermeture magnétique",
      "Accès précis aux boutons",
      "Compatible charge sans fil"
    ]
  },
  {
    id: "iphone-transparente",
    name: "Coque Magnétique iPhone — Transparente",
    brand: "iphone",
    price: 8500,
    oldPrice: 10000,
    image: "images/iphone-transparente-clean.png",
    gallery: [
      "images/iphone-transparente-clean.png",
      "images/iphone-produit3.jpg",
      "images/iphone-produit2.jpg"
    ],
    badge: "Promo",
    badgeType: "promo",
    rating: 4.9,
    reviews: 18,
    sku: "DC-IP-CLEAR",
    short: "La transparence totale pour laisser parler votre téléphone.",
    description:
      "La coque transparente double face révèle le design original de votre iPhone tout en le protégeant intégralement. Un choix minimaliste, idéal pour celles et ceux qui veulent protéger sans cacher.",
    features: [
      "Transparence intégrale",
      "Protection double face",
      "Fermeture magnétique",
      "Anti-jaunissement",
      "Zone caméra surélevée"
    ]
  },
  {
    id: "iphone-objectif",
    name: "Coque Magnétique iPhone — Protection Objectifs",
    brand: "iphone",
    price: 10000,
    oldPrice: null,
    image: "images/iphone-protege-objectif-clean.png",
    gallery: [
      "images/iphone-protege-objectif-clean.png",
      "images/iphone-produit2.jpg",
      "images/iphone-produit3.jpg"
    ],
    badge: "Protection caméra",
    badgeType: "new",
    rating: 4.9,
    reviews: 37,
    sku: "DC-IP-CAM",
    short: "Un verre dédié qui protège les objectifs sans dégrader les photos.",
    description:
      "Pensée pour les utilisateurs exigeants, cette version ajoute une protection dédiée aux objectifs. Le verre traité protège des rayures et des chocs, tout en préservant la netteté de vos photos et vidéos.",
    features: [
      "Verre de protection des objectifs",
      "Protection double face complète",
      "Fermeture magnétique",
      "Rendu photo préservé",
      "Cadre métallique renforcé"
    ]
  },
  {
    id: "samsung-noir",
    name: "Coque Magnétique Samsung — Noir Profond",
    brand: "samsung",
    price: 10000,
    oldPrice: null,
    image: "images/samsung-noire.png",
    gallery: [
      "images/samsung-noire.png",
      "images/samsung-s23-ultra.jpg",
      "images/samsung-verte-clean.png"
    ],
    badge: null,
    badgeType: null,
    rating: 4.8,
    reviews: 24,
    sku: "DC-SM-NOIR",
    short: "Une protection double face au fini noir profond pour Galaxy.",
    description:
      "Conçue pour les Galaxy, cette coque magnétique double face associe un cadre noir profond à une protection intégrale. Le maintien est ferme, les commandes restent accessibles et la caméra est protégée.",
    features: [
      "Compatible Samsung Galaxy",
      "Protection avant et arrière",
      "Fermeture magnétique",
      "Zone caméra protégée",
      "Finition anti-traces"
    ]
  },
  {
    id: "samsung-vert",
    name: "Coque Magnétique Samsung — Vert Sauge",
    brand: "samsung",
    price: 10000,
    oldPrice: null,
    image: "images/samsung-verte-clean.png",
    gallery: [
      "images/samsung-verte-clean.png",
      "images/samsung-noire.png",
      "images/samsung-s23-ultra.jpg"
    ],
    badge: "Nouveau",
    badgeType: "new",
    rating: 4.7,
    reviews: 15,
    sku: "DC-SM-VERT",
    short: "La teinte vert sauge, douce et distinctive, pour votre Galaxy.",
    description:
      "Un vert sauge subtil qui change des coques habituelles. La structure magnétique double face protège l'écran, le dos et les objectifs, avec un rendu mat agréable au toucher.",
    features: [
      "Teinte vert sauge exclusive",
      "Protection double face",
      "Fermeture magnétique",
      "Verre caméra intégré",
      "Prise en main antidérapante"
    ]
  },
  {
    id: "samsung-s23",
    name: "Coque Magnétique Galaxy S23 Ultra",
    brand: "samsung",
    price: 10000,
    oldPrice: null,
    image: "images/samsung-s23-ultra.jpg",
    gallery: [
      "images/samsung-s23-ultra.jpg",
      "images/samsung-noire.png",
      "images/samsung-verte-clean.png"
    ],
    badge: null,
    badgeType: null,
    rating: 4.9,
    reviews: 21,
    sku: "DC-SM-S23U",
    short: "Découpe exacte et protection renforcée pour le S23 Ultra.",
    description:
      "Une coque ajustée au millimètre pour le Galaxy S23 Ultra. Les ouvertures respectent les cinq objectifs et le S Pen, tandis que la structure double face protège l'ensemble des surfaces.",
    features: [
      "Découpe exacte S23 Ultra",
      "Protection des 5 objectifs",
      "Accès au S Pen",
      "Fermeture magnétique",
      "Cadre renforcé anti-choc"
    ]
  },
  {
    id: "redmi",
    name: "Coque Magnétique Redmi / Xiaomi",
    brand: "redmi",
    price: 8500,
    oldPrice: 10000,
    image: "images/redmi.jpg",
    gallery: [
      "images/redmi.jpg",
      "images/iphone-produit1.jpg",
      "images/iphone-produit2.jpg"
    ],
    badge: "Promo",
    badgeType: "promo",
    rating: 4.7,
    reviews: 19,
    sku: "DC-RD-01",
    short: "La protection double face adaptée aux Redmi et Xiaomi.",
    description:
      "Une coque transparente et magnétique pensée pour les Redmi et Xiaomi. Elle protège l'écran et le dos, avec une découpe dédiée au bloc caméra et un maintien magnétique fiable.",
    features: [
      "Compatible Redmi / Xiaomi",
      "Protection double face",
      "Fermeture magnétique",
      "Découpe caméra dédiée",
      "Transparence durable"
    ]
  },
  {
    id: "pack-duo",
    name: "Pack Duo — Deux Coques Magnétiques",
    brand: "pack",
    price: 18000,
    oldPrice: 20000,
    image: "images/iphone-produit1.jpg",
    gallery: [
      "images/iphone-produit1.jpg",
      "images/iphone-produit2.jpg",
      "images/iphone-produit3.jpg"
    ],
    badge: "Bon plan",
    badgeType: "promo",
    rating: 4.9,
    reviews: 12,
    sku: "DC-PACK-2",
    short: "Deux coques au choix pour varier les styles et économiser.",
    description:
      "Choisissez deux coques magnétiques double face et bénéficiez d'un tarif préférentiel. Idéal pour alterner les finitions, ou pour équiper deux téléphones de la maison. Précisez vos deux modèles lors de la commande.",
    features: [
      "2 coques au choix",
      "Économie de 2 000 FCFA",
      "Protection double face",
      "Modèles iPhone, Samsung ou Redmi",
      "Livraison gratuite à Bamako"
    ]
  }
];

DC.REVIEWS = [
  {
    name: "Aminata T.",
    city: "Hamdallaye ACI, Bamako",
    rating: 5,
    text: "La coque est vraiment solide et le rendu est superbe. J'ai reçu ma commande le jour même, avec la livraison gratuite. Je recommande sans hésiter."
  },
  {
    name: "Ibrahim K.",
    city: "Badalabougou, Bamako",
    rating: 5,
    text: "Je cherchais une protection pour les objectifs de mon iPhone. Celle-ci fait exactement le travail, et le contact WhatsApp est très réactif."
  },
  {
    name: "Mariam S.",
    city: "Sotuba, Bamako",
    rating: 5,
    text: "Très bonne finition, la fermeture magnétique tient bien. Le paiement à la livraison m'a rassurée pour ma première commande."
  },
  {
    name: "Oumar D.",
    city: "Kalaban Coura, Bamako",
    rating: 4,
    text: "La coque transparente est parfaite, mon téléphone garde son design. Petit conseil : confirmez bien le modèle avant de commander."
  },
  {
    name: "Fatoumata C.",
    city: "Lafiabougou, Bamako",
    rating: 5,
    text: "Le pack duo est un très bon rapport qualité-prix. Les deux coques sont bien emballées et conformes aux photos."
  },
  {
    name: "Seydou B.",
    city: "Sabalibougou, Bamako",
    rating: 5,
    text: "Commande passée sur WhatsApp, livraison rapide et coque de très bonne qualité. Le service client est au top."
  }
];

DC.FAQS = [
  {
    q: "La livraison est-elle vraiment gratuite ?",
    a: "Oui. La livraison est offerte pour toute commande à Bamako, sans minimum d'achat. Nous vous contactons sur WhatsApp pour convenir du lieu et de l'heure."
  },
  {
    q: "Comment savoir si la coque est compatible avec mon téléphone ?",
    a: "Indiquez-nous le modèle exact de votre téléphone (par exemple iPhone 13 Pro ou Galaxy S23 Ultra) lors de la commande. Notre équipe vérifie la compatibilité avant l'expédition."
  },
  {
    q: "Quels moyens de paiement acceptez-vous ?",
    a: "Vous pouvez payer à la livraison en espèces, ou par Orange Money et Wave. Après validation de votre commande, nous vous envoyons les instructions de paiement sur WhatsApp."
  },
  {
    q: "Puis-je échanger une coque si le modèle ne convient pas ?",
    a: "Oui. Vous disposez de 7 jours après réception pour demander un échange, à condition que la coque soit dans son état d'origine. Contactez-nous sur WhatsApp avec votre numéro de commande."
  },
  {
    q: "Combien de temps prend la livraison ?",
    a: "À Bamako, la livraison est généralement effectuée dans la journée ou le lendemain, selon votre quartier et l'heure de la commande. Nous confirmons le délai par WhatsApp."
  },
  {
    q: "La coque protège-t-elle vraiment l'écran ?",
    a: "Oui. La conception double face couvre l'avant et l'arrière du téléphone. Le verre trempé intégré protège l'écran des rayures et des chocs du quotidien."
  }
];
