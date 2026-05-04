export const siteConfig = {
  brand: "4EverPlants",
  phone: "+31 (0)26 123 45 67",
  email: "info@4everplants.nl",
  address: "Eimerssingel-oost 25C, 6834CX Arnhem",
  ctaPrimary: {
    label: "Shop nu",
    href: "/collectie.html",
  },
  ctaSecondary: {
    label: "Shop met korting",
    href: "/collectie.html#sale",
  },
  announcement: "Premium artificial plants voor thuis, hospitality en zakelijke ruimtes",
  reviewSummary: {
    score: "4,8/5",
    count: "2000+ reviews",
    text: "Klanten waarderen vooral de realistische uitstraling, snelle levering en hoogwaardige afwerking.",
  },
};

export const announcementItems = [
  "Ordered before 16:00, delivered tomorrow",
  "Free shipping from €100",
];

export const shippingPolicy = {
  freeThreshold: 100,
  nl: {
    freeFrom: 100,
    cost: 6.95,
    deliveryTime: "1-2 working days"
  },
  be_de: {
    freeFrom: 100,
    cost: 8.95,
    deliveryTime: "2-3 working days"
  },
  eu: {
    freeFrom: 150,
    cost: 12.95,
    deliveryTime: "3-5 working days"
  },
  intl: {
    cost: 25,
    deliveryTime: "5-10 working days",
    note: "Customs and import costs for customer"
  },
  cutoffTime: 16 // 16:00
};

export const returnPolicy = {
  warranty: "1-year manufacturer's warranty",
  warrantyPoints: [
    "Warranty against manufacturing defects",
    "Warranty against construction (e.g., loose parts)",
    "Solution via replacement or repair"
  ],
  coolingOffPeriod: 14,
  returnWindow: 14,
  conditions: [
    "Product in original condition and packaging",
    "Only unpacked for inspection",
    "Not used or damaged"
  ],
  returnCostNote: "At your own expense, unless the product is damaged or incorrectly delivered.",
  refundWindow: 14
};

export const navigation = [
  { label: "Why Us", href: "/waarom-4everplants.html" },
  { label: "Business", href: "/zakelijk.html" },
  { label: "About Us", href: "/over-ons.html" },
  { label: "Contact", href: "/contact.html" },
  { label: "Sale", href: "/collectie.html#sale", highlight: true },
];

export const shopCategories = [
  {
    id: "artificial-plants",
    title: "Artificial plants",
    products: [
      {
        label: "Monstera",
        href: "/product-detail.html?slug=faux-monstera-plant",
        image: "/assets/images/product-images/monstera-studio.png",
      },
      {
        label: "Ficus",
        href: "/product-detail.html?slug=ficus-plant",
        image: "/assets/images/product-images/ficus_180cm_studio.jpg",
      },
      {
        label: "Bougainvillea",
        href: "/product-detail.html?slug=artificial-bougainvillea-tree",
        image: "/assets/images/product-images/RozeboomStudio.png",
      },
      {
        label: "Bamboo",
        href: "/product-detail.html?slug=bamboeplant",
        image: "/assets/images/product-images/bamboe_150cm_studio.jpg",
      },
      {
        label: "Strelitzia",
        href: "/product-detail.html?slug=strelitzia-plant",
        image: "/assets/images/product-images/strelitzia_150cm_studio.jpg",
      },
      {
        label: "Kunstpalm",
        href: "/product-detail.html?slug=kunstpalm",
        image: "/assets/images/product-images/kunstpalm_180cm_studio.jpg",
      },
      {
        label: "Banana Plant",
        href: "/product-detail.html?slug=banana-plant",
        image: "/assets/images/product-images/bananenplant_180cm_studio.jpg",
      },
      {
        label: "Column Cactus",
        href: "/product-detail.html?slug=column-cactus",
        image: "/assets/images/product-images/column-cactus-studio.png",
      },
    ],
    links: [
      { label: "Monstera", href: "/product-detail.html?slug=faux-monstera-plant" },
      { label: "Ficus", href: "/product-detail.html?slug=ficus-plant" },
      { label: "Bougainvillea", href: "/product-detail.html?slug=artificial-bougainvillea-tree" },
      { label: "Bamboo", href: "/product-detail.html?slug=bamboeplant" },
      { label: "Strelitzia", href: "/product-detail.html?slug=strelitzia-plant" },
      { label: "Kunstpalm", href: "/product-detail.html?slug=kunstpalm" },
      { label: "Banana Plant", href: "/product-detail.html?slug=banana-plant" },
      { label: "Column Cactus", href: "/product-detail.html?slug=column-cactus" },
    ],
  },
  {
    id: "artificial-trees",
    title: "Artificial trees",
    products: [
      {
        label: "Olive Tree",
        href: "/product-detail.html?slug=faux-olive-tree",
        image: "/assets/images/product-images/artificial-olivetree-studio.png",
      },
      {
        label: "Lemon Tree",
        href: "/product-detail.html?slug=artificial-lemon-tree",
        image: "/assets/images/product-images/citroenboom_180cm_studio.jpg?v=2",
      },
      {
        label: "Orange Plant",
        href: "/product-detail.html?slug=sinaasappelplant",
        image: "/assets/images/product-images/sinaasappelboom_180cm_studio.jpg",
      },
      {
        label: "Tree Geranium",
        href: "/product-detail.html?slug=artificial-tree-geranium",
        image: "/assets/images/product-geranium.svg",
      },
    ],
    links: [
      { label: "Olive Tree", href: "/product-detail.html?slug=faux-olive-tree" },
      { label: "Lemon Tree", href: "/product-detail.html?slug=artificial-lemon-tree" },
      { label: "Orange Plant", href: "/product-detail.html?slug=sinaasappelplant" },
      { label: "Tree Geranium", href: "/product-detail.html?slug=artificial-tree-geranium" },
    ],
  },
  {
    id: "artificial-hedge",
    title: "Artificial hedge",
    products: [
      {
        label: "Artificial hedge panel",
        href: "/collectie.html",
        image: "/assets/images/category-hanging.svg",
      },
      {
        label: "Olive artificial hedge",
        href: "/collectie.html",
        image: "/assets/images/business-space.svg",
      },
    ],
    links: [
      { label: "Artificial hedge panel", href: "/collectie.html" },
      { label: "Olive artificial hedge", href: "/collectie.html" },
    ],
  },
  {
    id: "vases",
    title: "Vases",
    products: [
      {
        label: "Stylish vase 1",
        href: "/collectie.html#potten-en-styling",
        image: "/assets/images/category-styling.svg",
      },
      {
        label: "Stylish vase 2",
        href: "/collectie.html#potten-en-styling",
        image: "/assets/images/story-studio.svg",
      },
    ],
    links: [
      { label: "Stylish vase 1", href: "/collectie.html#potten-en-styling" },
      { label: "Stylish vase 2", href: "/collectie.html#potten-en-styling" },
    ],
  },
];

export const promoTickerItems = [
  "Voor 16:00 besteld, morgen in huis",
  "Gratis levering vanaf €100",
  "Wij scoren een 4.8 op 2000+ reviews",
];

export const mainUSPs = [
  {
    id: "effortless",
    icon: "auto_awesome",
    title: "Timeless Perfection, Without Effort",
    description: "Experience the beauty of nature without the need for watering, sunlight, or maintenance."
  },
  {
    id: "realistic",
    icon: "eco",
    title: "Unrivaled Realistic Finish",
    description: "Meticulously crafted with high-end materials to be indistinguishable from the real thing."
  },
  {
    id: "atmosphere",
    icon: "home",
    title: "Instant Luxurious Atmosphere",
    description: "Elevate your interior instantly with botanical statements that bring calm and character."
  },
  {
    id: "premium",
    icon: "diamond",
    title: "High-Quality Premium Materials",
    description: "Sustainable investment with durable, color-fast materials that last for years."
  }
];

export const serviceHighlights = mainUSPs.map(usp => usp.title);

export const trustLogos = [
  "Maison Nord",
  "Studio Aster",
  "Hotel Rivage",
  "Bureau Forma",
  "Atelier 58",
];

export const categories = [
  {
    name: "Large artificial plants",
    description: "Statement pieces for entrances, living rooms and reception areas.",
    image: "/assets/images/product-images/bananenplant_180cm_lifestyle.jpg",
    link: "/collectie.html#grote-kunstplanten",
    count: "18 models",
  },
  {
    name: "Small artificial plants",
    description: "Refined accents for shelves, tables and stylish corners.",
    image: "/assets/images/product-images/column-cactus-livingroom.png",
    link: "/collectie.html#kleine-kunstplanten",
    count: "12 models",
  },
  {
    name: "Artificial trees",
    description: "Architectural shapes with a calm, luxurious appearance.",
    image: "/assets/images/product-images/artificial-olivetree.png",
    link: "/collectie.html#kunstbomen",
    count: "9 models",
  },
  {
    name: "Artificial hanging plants",
    description: "Soft layering for hospitality, retail and residential interiors.",
    image: "/assets/images/category-hanging.svg",
    link: "/collectie.html#kunsthangplanten",
    count: "7 models",
  },
  {
    name: "Pots and styling",
    description: "Finished in earth tones, stone looks and modern interior materials.",
    image: "/assets/images/category-styling.svg",
    link: "/collectie.html#potten-en-styling",
    count: "14 models",
  },
];

export const featuredProducts = [
  {
    slug: "column-cactus",
    name: "Column Cactus",
    category: "Small artificial plant",
    filter: "kleine-kunstplanten",
    price: 79,
    compareAtPrice: 95,
    height: "95 cm",
    potSize: "Ø 20 cm",
    stockLabel: "Directly available",
    image: "/assets/images/product-images/column-cactus-studio.png",
    gallery: ["/assets/images/product-images/column-cactus-studio.png", "/assets/images/product-images/column-cactus-livingroom.png"],
    media: {
      primarySrc: "/assets/images/product-images/column-cactus-studio.png",
      primaryAlt: "Column Cactus studiofoto op lichte achtergrond",
      hoverSrc: "/assets/images/product-images/column-cactus-livingroom.png",
      hoverAlt: "Column Cactus in een moderne woonkamer",
      aspectRatio: "4 / 5",
      primaryFit: "cover",
      hoverFit: "cover",
      primaryPosition: "center 36%",
      hoverPosition: "center 42%",
    },
    description: "Een slanke sculpturale cactus voor moderne interieurs, balies en stylinghoeken die rust en karakter mogen krijgen.",
    badges: ["Strakke vorm", "Maintenance free"],
    rating: 4.7,
    reviewCount: 28,
    material: "Matte cactushuid met subtiele ribstructuur en verzwaarde potbasis",
    features: [
      "Minimalistische vorm voor niches, kasten en kleinere ruimtes",
      "Mooie combinatie met travertin, beige en donker hout",
      "Sterk visueel accent zonder onderhoudsvraag",
    ],
    specs: [
      { label: "Hoogte", value: "95 cm" },
      { label: "Potmaat", value: "Ø 20 cm" },
      { label: "Materiaal", value: "PE en textielmix" },
      { label: "Toepassing", value: "Binnengebruik" },
    ],
    reviews: [
      {
        author: "Nina Vos",
        role: "Interieurstylist",
        quote: "Perfect als grafisch accent. De cactusvorm is strak en toch niet goedkoop in uitstraling.",
      },
      {
        author: "Bart Evers",
        role: "Woninginrichting",
        quote: "Mooie hoogte voor een lege hoek zonder dat het te aanwezig wordt.",
      },
    ],
  },
  {
    slug: "faux-olive-tree",
    name: "Faux Olive Tree",
    category: "Artificial tree",
    filter: "kunstbomen",
    price: 89.99,
    compareAtPrice: 119.99,
    height: "150 cm",
    potSize: "Ø 36 cm",
    stockLabel: "Popular choice",
    image: "/assets/images/product-images/artificial-olivetree-studio.png",
    gallery: ["/assets/images/product-images/artificial-olivetree-studio.png", "/assets/images/product-images/artificial-olivetree.png"],
    media: {
      primarySrc: "/assets/images/product-images/artificial-olivetree-studio.png",
      primaryAlt: "Faux Olive Tree studiofoto op witte achtergrond",
      hoverSrc: "/assets/images/product-images/artificial-olivetree.png",
      hoverAlt: "Faux Olive Tree in een stijlvolle woonkamer",
      aspectRatio: "4 / 5",
      primaryFit: "contain",
      hoverFit: "cover",
    },
    description: "Zachte mediterrane elegantie voor woonkamers, horeca en ontvangstruimtes met een rustige designeruitstraling.",
    badges: ["Business favoriet", "Realistische stamstructuur"],
    rating: 4.8,
    reviewCount: 61,
    material: "Fijne olijfbladeren, houten stamlook en luxe potbasis",
    features: [
      "Subtiele hoogtewerking voor open ruimtes en lobby's",
      "Past goed in aardetinten, naturel stoffen en minimalistische interieurs",
      "Blijft jaarrond representatief zonder water of snoeiwerk",
    ],
    specs: [
      { label: "Hoogte", value: "150 cm" },
      { label: "Potmaat", value: "Ø 36 cm" },
      { label: "Materiaal", value: "PE bladeren en composiet stam" },
      { label: "Toepassing", value: "Binnengebruik" },
    ],
    reviews: [
      {
        author: "Lisa van Dijk",
        role: "Boutique hotel",
        quote: "Geeft meteen een zachtere, luxe sfeer aan onze lounge zonder extra onderhoud op de operatie.",
      },
      {
        author: "Tobias Meijer",
        role: "Retail concept store",
        quote: "De stam en de vertakking zijn sterk uitgevoerd. Van een afstand is hij echt overtuigend.",
      },
    ],
  },
  {
    slug: "faux-monstera-plant",
    name: "Faux Monstera Plant",
    category: "Large artificial plant",
    filter: "grote-kunstplanten",
    price: 119.99,
    compareAtPrice: 149.99,
    height: "160 cm",
    potSize: "Ø 28 cm",
    stockLabel: "Fast delivery",
    image: "/assets/images/product-images/monstera-studio.png",
    gallery: ["/assets/images/product-images/monstera-studio.png", "/assets/images/product-images/monstera-livingroom.png"],
    media: {
      primarySrc: "/assets/images/product-images/monstera-studio.png",
      primaryAlt: "Faux Monstera Plant studiofoto op lichte achtergrond",
      hoverSrc: "/assets/images/product-images/monstera-livingroom.png",
      hoverAlt: "Faux Monstera Plant in een stijlvolle woonkamer",
      aspectRatio: "4 / 5",
      primaryFit: "cover",
      hoverFit: "cover",
      primaryPosition: "center 34%",
      hoverPosition: "center 35%",
    },
    description: "Een tropische favoriet met grote, open bladeren voor woonkamers, salons en hospitality settings die zachtheid nodig hebben.",
    badges: ["Tropische uitstraling", "Instant atmosphere"],
    rating: 4.8,
    reviewCount: 54,
    material: "Volle monstera-bladeren met natuurlijke glans en stevige stelen",
    features: [
      "Iconische bladvorm voor een direct herkenbare premium look",
      "Mooie balans tussen volume en luchtigheid",
      "Sterk toepasbaar in woon- en projectinterieurs",
    ],
    specs: [
      { label: "Hoogte", value: "160 cm" },
      { label: "Potmaat", value: "Ø 28 cm" },
      { label: "Materiaal", value: "Textielblad en PE steel" },
      { label: "Toepassing", value: "Binnengebruik" },
    ],
    reviews: [
      {
        author: "Mila de Graaf",
        role: "Woonproject Amsterdam",
        quote: "Het blad heeft precies de juiste tropische uitstraling. Werkt heel goed in onze lichte woonkamer.",
      },
      {
        author: "Rick Smit",
        role: "Salon eigenaar",
        quote: "Geeft direct een vollere sfeer aan de ruimte zonder dat we onderhoud hoeven te regelen.",
      },
    ],
  },
  {
    slug: "artificial-bougainvillea-tree",
    name: "Artificial Bougainvillea Tree",
    category: "Artificial tree",
    filter: "kunstbomen",
    price: 239,
    compareAtPrice: 279,
    height: "185 cm",
    potSize: "Ø 34 cm",
    stockLabel: "New favorite",
    image: "/assets/images/product-images/RozeboomStudio.png",
    gallery: ["/assets/images/product-images/RozeboomStudio.png", "/assets/images/product-images/RozeboomWoon.png"],
    media: {
      primarySrc: "/assets/images/product-images/RozeboomStudio.png",
      primaryAlt: "Artificial Bougainvillea Tree studiofoto op lichte achtergrond",
      hoverSrc: "/assets/images/product-images/RozeboomWoon.png",
      hoverAlt: "Artificial Bougainvillea Tree in een stijlvolle woonkamer",
      aspectRatio: "4 / 5",
      primaryFit: "cover",
      hoverFit: "cover",
      primaryPosition: "center 40%",
      hoverPosition: "center 42%",
    },
    description: "Een expressieve kunstboom met een zonnige, luxe uitstraling voor hospitality, terrasthema's en lichte interieurs.",
    badges: ["Kleuraccent", "Statement tree"],
    rating: 4.8,
    reviewCount: 19,
    material: "Gelaagde bloei, houtlook stam en volle vertakking",
    features: [
      "Brengt direct kleur zonder seizoensafhankelijk onderhoud",
      "Mooi voor hospitality, serres en lifestyle settings",
      "Combineert sterk met zandtinten en mediterraan interieur",
    ],
    specs: [
      { label: "Hoogte", value: "185 cm" },
      { label: "Potmaat", value: "Ø 34 cm" },
      { label: "Materiaal", value: "Textielbloei en PE blad" },
      { label: "Toepassing", value: "Binnengebruik" },
    ],
    reviews: [
      {
        author: "Noor van Leeuwen",
        role: "Boutique salon",
        quote: "Geeft precies dat warme kleuraccent waar onze ruimte om vroeg, zonder dat het te druk wordt.",
      },
      {
        author: "Eva Bos",
        role: "Interieurproject",
        quote: "Een opvallende boom, maar nog steeds stijlvol. Heel sterk voor hospitality-sfeer.",
      },
    ],
  },
  {
    slug: "artificial-tree-geranium",
    name: "Artificial Tree Geranium",
    category: "Artificial tree",
    filter: "kunstbomen",
    price: 219,
    compareAtPrice: 249,
    height: "170 cm",
    potSize: "Ø 30 cm",
    stockLabel: "Project selection",
    image: "/assets/images/product-geranium.svg",
    gallery: ["/assets/images/product-geranium.svg", "/assets/images/story-studio.svg"],
    description: "Een elegante bloeiende kunstboom voor verfijnde ontvangstruimtes, salons en high-end interieurs met zachte kleurtonen.",
    badges: ["Bloeiende boom", "Luxe uitstraling"],
    rating: 4.7,
    reviewCount: 17,
    material: "Fijne bloei, groene kroon en stevige vertakking",
    features: [
      "Voegt kleur en zachtheid toe zonder onderhoudslast",
      "Geschikt voor boutiques, entrees en hospitality",
      "Combineert goed met stone, beige en warm hout",
    ],
    specs: [
      { label: "Hoogte", value: "170 cm" },
      { label: "Potmaat", value: "Ø 30 cm" },
      { label: "Materiaal", value: "Textielbloei en PE blad" },
      { label: "Toepassing", value: "Binnengebruik" },
    ],
    reviews: [
      {
        author: "Sara Koning",
        role: "Showroomstyling",
        quote: "Heel fijn alternatief als je iets bloemigs wilt zonder dat het schreeuwerig wordt.",
      },
      {
        author: "Koen Visser",
        role: "Reception area",
        quote: "De boom maakt de ruimte zachter en gastvrijer zonder dat hij onderhoud vraagt.",
      },
    ],
  },
  {
    slug: "banana-plant",
    name: "Banana Plant",
    category: "Large artificial plant",
    filter: "grote-kunstplanten",
    price: 119.99,
    compareAtPrice: 149.99,
    height: "180 cm",
    potSize: "Ø 32 cm",
    stockLabel: "Full tropical look",
    image: "/assets/images/product-images/bananenplant_180cm_studio.jpg",
    gallery: ["/assets/images/product-images/bananenplant_180cm_studio.jpg", "/assets/images/product-images/bananenplant_180cm_lifestyle.jpg"],
    imageMode: "cover",
    description: "Een krachtige tropische kunstplant met brede bladeren voor woonkamers, lobby's en stijlvolle projectruimtes.",
    badges: ["Grote bladeren", "Statement plant"],
    rating: 4.9,
    reviewCount: 37,
    material: "Brede textielbladeren met natuurgetrouw kleurverloop",
    features: [
      "Geeft direct hoogte en tropisch volume aan de ruimte",
      "Sterk in hospitality, woonkamers en ontvangstruimtes",
      "Mooie vervanger voor onderhoudsgevoelige echte bananenplanten",
    ],
    specs: [
      { label: "Hoogte", value: "180 cm" },
      { label: "Potmaat", value: "Ø 32 cm" },
      { label: "Materiaal", value: "Textielblad en PE kern" },
      { label: "Toepassing", value: "Binnengebruik" },
    ],
    reviews: [
      {
        author: "Daan Peters",
        role: "Hotel lounge",
        quote: "Geeft direct een luxere en warmere sfeer aan de zithoek. Heel sterk als statement.",
      },
      {
        author: "Fleur Smits",
        role: "Woonstyling",
        quote: "De bladgrootte maakt echt impact. Dat zochten we precies.",
      },
    ],
  },
  {
    slug: "artificial-lemon-tree",
    name: "Artificial Lemon Tree",
    category: "Artificial tree",
    filter: "kunstbomen",
    price: 94.99,
    compareAtPrice: 129.99,
    height: "120 cm",
    potSize: "Ø 22 cm",
    stockLabel: "Seasonal favorite",
    image: "/assets/images/product-images/citroenboom_180cm_studio.jpg?v=2",
    gallery: ["/assets/images/product-images/citroenboom_180cm_studio.jpg?v=2", "/assets/images/product-images/citroenboom_180cm_lifestyle.jpg?v=2"],
    description: "Een mediterrane kunstboom met frisse, stijlvolle uitstraling voor keukens, horeca en zonnige interieurs.",
    badges: ["Mediterrane sfeer", "Design favoriet"],
    rating: 4.8,
    reviewCount: 23,
    material: "Fijn blad, citroenaccenten en natuurlijke vertakking",
    features: [
      "Geeft een verfijnd, fris kleuraccent zonder te overheersen",
      "Ideaal voor horeca, woonkeukens en lichte ontvangstruimtes",
      "Perfect voor een mediterraan of boutique interieurgevoel",
    ],
    specs: [
      { label: "Hoogte", value: "120 cm" },
      { label: "Potmaat", value: "Ø 22 cm" },
      { label: "Materiaal", value: "PE blad, textielaccenten en composiet stam" },
      { label: "Toepassing", value: "Binnengebruik" },
    ],
    reviews: [
      {
        author: "Lotte de Boer",
        role: "Restaurant owner",
        quote: "De citroenboom maakt de ruimte meteen lichter en uitnodigender. Precies de mediterrane touch die we wilden.",
      },
      {
        author: "Martijn Hoek",
        role: "Interieurproject Haarlem",
        quote: "Mooie boom met luxe uitstraling. Heel geschikt voor open woonkeukens.",
      },
    ],
  },
  {
    slug: "ficus-plant",
    name: "Ficus Plant",
    category: "Large artificial plant",
    filter: "grote-kunstplanten",
    price: 74.99,
    compareAtPrice: 89.99,
    height: "150 cm",
    potSize: "Ø 24 cm",
    stockLabel: "Fast delivery",
    image: "/assets/images/product-images/ficus_180cm_studio.jpg",
    gallery: ["/assets/images/product-images/ficus_180cm_studio.jpg", "/assets/images/product-images/ficus_180cm_lifestyle.jpg"],
    media: {
      primarySrc: "/assets/images/product-images/ficus_180cm_studio.jpg",
      primaryAlt: "Ficus studiofoto",
      hoverSrc: "/assets/images/product-images/ficus_180cm_lifestyle.jpg",
      hoverAlt: "Ficus in interieur",
      aspectRatio: "4 / 5",
      primaryFit: "cover",
      hoverFit: "cover",
    },
    description: "Een levensechte Ficus die elke ruimte voorziet van een stevige, groene basis. Ideaal voor zowel woonkamers als zakelijke projecten.",
    badges: ["Diepgroene bladeren", "Veelzijdige stijl"],
    rating: 4.8,
    reviewCount: 42,
    material: "Natuurgetrouw groen PE blad met gedetailleerde nerf",
    features: [
      "Brengt direct textuur en structuur in het interieur",
      "Sterk in hospitality, woningen en ontvangstruimtes",
      "Blijft jarenlang mooi zonder dat het bladeren verliest"
    ],
    specs: [
      { label: "Hoogte", value: "150 cm" },
      { label: "Potmaat", value: "Ø 24 cm" },
      { label: "Materiaal", value: "Premium PE mix" },
      { label: "Toepassing", value: "Binnengebruik" }
    ],
    reviews: []
  },
  {
    slug: "strelitzia-plant",
    name: "Strelitzia",
    category: "Large artificial plant",
    filter: "grote-kunstplanten",
    price: 99.99,
    compareAtPrice: 129.99,
    height: "160 cm",
    potSize: "Ø 26 cm",
    stockLabel: "Popular choice",
    image: "/assets/images/product-images/strelitzia_150cm_studio.jpg",
    gallery: ["/assets/images/product-images/strelitzia_150cm_studio.jpg", "/assets/images/product-images/strelitzia_150cm_lifestyle.jpg"],
    media: {
      primarySrc: "/assets/images/product-images/strelitzia_150cm_studio.jpg",
      primaryAlt: "Strelitzia studiofoto",
      hoverSrc: "/assets/images/product-images/strelitzia_150cm_lifestyle.jpg",
      hoverAlt: "Strelitzia in interieur",
      aspectRatio: "4 / 5",
      primaryFit: "cover",
      hoverFit: "cover",
    },
    description: "Een opvallende Strelitzia met grote, elegante bladeren. Perfect om een exotisch accent aan de ruimte toe te voegen.",
    badges: ["Exotisch effect", "Grote bladeren"],
    rating: 4.9,
    reviewCount: 56,
    material: "Grote textielbladeren met natuurgetrouwe nerven",
    features: [
      "Voegt een statig en tropisch karakter toe",
      "Zeer geschikt voor minimalistische interieurs",
      "Maintenance free"
    ],
    specs: [
      { label: "Hoogte", value: "160 cm" },
      { label: "Potmaat", value: "Ø 26 cm" },
      { label: "Materiaal", value: "Textiel en PE" },
      { label: "Toepassing", value: "Binnengebruik" }
    ],
    reviews: []
  },
  {
    slug: "kunstpalm",
    name: "Kunstpalm",
    category: "Large artificial plant",
    filter: "grote-kunstplanten",
    price: 104.99,
    compareAtPrice: 139.99,
    height: "150 cm",
    potSize: "Ø 26 cm",
    stockLabel: "Fast delivery",
    image: "/assets/images/product-images/kunstpalm_180cm_studio.jpg",
    gallery: ["/assets/images/product-images/kunstpalm_180cm_studio.jpg", "/assets/images/product-images/kunstpalm_180cm_lifestyle.jpg"],
    media: {
      primarySrc: "/assets/images/product-images/kunstpalm_180cm_studio.jpg",
      primaryAlt: "Kunstpalm studiofoto",
      hoverSrc: "/assets/images/product-images/kunstpalm_180cm_lifestyle.jpg",
      hoverAlt: "Kunstpalm in interieur",
      aspectRatio: "4 / 5",
      primaryFit: "cover",
      hoverFit: "cover",
    },
    description: "Creëer een oase van rust met deze volumineuze Kunstpalm.",
    badges: ["Volumineuze kroon", "Zomerse sfeer"],
    rating: 4.7,
    reviewCount: 31,
    material: "Fijn waaiervormig blad",
    features: [
      "Ideaal als groene afscheiding",
      "Premium afwerking voor een realistische look"
    ],
    specs: [
      { label: "Hoogte", value: "150 cm" },
      { label: "Potmaat", value: "Ø 26 cm" },
      { label: "Materiaal", value: "PE mix" },
      { label: "Toepassing", value: "Binnengebruik" }
    ],
    reviews: []
  },
  {
    slug: "sinaasappelplant",
    name: "Orange Plant",
    category: "Artificial tree",
    filter: "kunstbomen",
    price: 89.99,
    compareAtPrice: 119.99,
    height: "120 cm",
    potSize: "Ø 22 cm",
    stockLabel: "Mediterranean style",
    image: "/assets/images/product-images/sinaasappelboom_180cm_studio.jpg",
    gallery: ["/assets/images/product-images/sinaasappelboom_180cm_studio.jpg", "/assets/images/product-images/sinaasappelboom_180cm_lifestyle.jpg"],
    media: {
      primarySrc: "/assets/images/product-images/sinaasappelboom_180cm_studio.jpg",
      primaryAlt: "Orange Plant studiofoto",
      hoverSrc: "/assets/images/product-images/sinaasappelboom_180cm_lifestyle.jpg",
      hoverAlt: "Orange Plant in interieur",
      aspectRatio: "4 / 5",
      primaryFit: "cover",
      hoverFit: "cover",
    },
    description: "Breng mediterrane warmte in huis met deze Orange Plant.",
    badges: ["Kleurig detail", "Frisse look"],
    rating: 4.8,
    reviewCount: 20,
    material: "Detailrijke vruchten",
    features: [
      "Voegt warmte toe",
      "Constante kwaliteit"
    ],
    specs: [
      { label: "Hoogte", value: "120 cm" },
      { label: "Potmaat", value: "Ø 22 cm" },
      { label: "Materiaal", value: "PE en textiel" },
      { label: "Toepassing", value: "Binnengebruik" }
    ],
    reviews: []
  },
  {
    slug: "bamboeplant",
    name: "Bambooplant",
    category: "Large artificial plant",
    filter: "grote-kunstplanten",
    price: 89.99,
    compareAtPrice: 115.99,
    height: "150 cm",
    potSize: "Ø 24 cm",
    stockLabel: "Oriental tranquility",
    image: "/assets/images/product-images/bamboe_150cm_studio.jpg",
    gallery: ["/assets/images/product-images/bamboe_150cm_studio.jpg", "/assets/images/product-images/bamboe_150cm_lifestyle.jpg"],
    media: {
      primarySrc: "/assets/images/product-images/bamboe_150cm_studio.jpg",
      primaryAlt: "Bambooplant studiofoto",
      hoverSrc: "/assets/images/product-images/bamboe_150cm_lifestyle.jpg",
      hoverAlt: "Bambooplant in interieur",
      aspectRatio: "4 / 5",
      primaryFit: "cover",
      hoverFit: "cover",
    },
    description: "Een volle Bambooplant met een hoge stengeldichtheid.",
    badges: ["Bamboohout", "Fijne stengels"],
    rating: 4.8,
    reviewCount: 33,
    material: "Natuurlijke bamboestengels",
    features: [
      "Licht, open karakter",
      "Direct rust"
    ],
    specs: [
      { label: "Hoogte", value: "150 cm" },
      { label: "Potmaat", value: "Ø 24 cm" },
      { label: "Materiaal", value: "Natuurlijke stammen" },
      { label: "Toepassing", value: "Binnengebruik" }
    ],
    reviews: []
  }
];

export const uspItems = [
  {
    title: "Nauwelijks van echt te onderscheiden",
    text: "Fijne bladstructuren, natuurlijke kleurnuances en een luxe afwerking zorgen voor een levensechte uitstraling.",
  },
  {
    title: "Geen water of zonlicht nodig",
    text: "Onze artificial plants blijven mooi zonder daglicht, onderhoudsschema's of seizoensgevoelige verzorging.",
  },
  {
    title: "Altijd een verzorgde uitstraling",
    text: "Creëer direct rust, sfeer en representativiteit in woon- en werkruimtes zonder terugkerend onderhoud.",
  },
  {
    title: "Geschikt voor thuis en zakelijk gebruik",
    text: "Van woonkamer tot showroom: de collectie sluit aan op premium interieurs en professionele omgevingen.",
  },
];

export const why4EverPlants = [
  "Geselecteerd op realisme, vormgevoel en materiaalbeleving.",
  "Premium collectie die rust en verfijning toevoegt aan elke ruimte.",
  "Maintenance freee oplossingen voor thuis, hospitality en kantoor.",
  "Persoonlijk advies voor styling, formaat en toepassing.",
];

export const testimonials = [
  {
    quote: "De planten geven meteen sfeer aan onze ontvangstruimte. Bezoekers vragen regelmatig of ze echt zijn.",
    name: "Sanne Vermeer",
    role: "Studio-eigenaar, Utrecht",
    rating: 5,
  },
  {
    quote: "We wilden wel groen, maar geen gedoe. 4EverPlants leverde precies die rustige premium uitstraling die we zochten.",
    name: "David van Loon",
    role: "Operations Manager, boutique hotel",
    rating: 5,
  },
  {
    quote: "Ook dichtbij zien de bladeren en stammen er overtuigend uit. Het tilt het interieur echt naar een hoger niveau.",
    name: "Mila de Graaf",
    role: "Interieurliefhebber, Amsterdam",
    rating: 5,
  },
];

export const comparisonPoints = [
  {
    title: "Voor 4EverPlants",
    text: "Een ruimte zonder groen voelt sneller vlak, minder warm en minder verzorgd aan.",
  },
  {
    title: "Na 4EverPlants",
    text: "Met hoogwaardige artificial plants ontstaat direct meer rust, karakter en een verzorgde premium uitstraling.",
  },
];

export const businessBenefits = [
  "Representative spaces without maintenance costs or loss of planting.",
  "Ideal for offices, catering, salons, showrooms and waiting areas.",
  "Consistent atmosphere in rooms with little daylight or fluctuating temperatures.",
  "Customized advice for size, styling, placement and combination with pots.",
];

export const artificialPlantInfo = [
  {
    title: "Style without effort",
    text: "Artificial plants immediately give a room warmth and balance, without you having to take into account water, daylight or seasonal changes.",
  },
  {
    title: "Sustainably beautiful in use",
    text: "Artificial plants are a smart choice for busy households, hospitality and offices: they continue to look well-cared for and require hardly any maintenance.",
  },
  {
    title: "Always stylable to suit",
    text: "From a subtle corner plant to a large statement tree: you easily create a premium atmosphere that fits your interior concept.",
  },
];

export const faqs = [
  {
    question: "How do I best maintain artificial plants?",
    answer: "A soft cloth or duster is usually sufficient. For a more thorough freshening up, you can wipe the leaves with a slightly damp cloth.",
  },
  {
    question: "How long do artificial plants stay beautiful?",
    answer: "With normal indoor use, high-quality artificial plants remain stylish for years. Avoid prolonged direct sun to limit discoloration.",
  },
  {
    question: "Are the artificial plants suitable for the office or catering industry?",
    answer: "Yes. They are particularly popular in business spaces because they always remain representative without daily care or failure.",
  },
  {
    question: "How are the plants delivered?",
    answer: "Our plants are delivered carefully packaged. Many models are ready to be placed directly in a decorative pot or styling arrangement.",
  },
  {
    question: "Can I get advice on size and styling?",
    answer: "Certainly. We are happy to help with the right scale, placement and combination with pots for a calm and high-quality appearance.",
  },
];

export const blogPosts = [
  {
    title: "Waarom artificial plants perfect passen in een premium interieur",
    category: "Inspiratie",
    excerpt: "Ontdek hoe hoogwaardige kunstplanten rust, volume en een verzorgde sfeer toevoegen zonder onderhoud of concessies.",
    image: "/assets/images/hero-plant-atrium.svg",
    href: "#",
    meta: "4 min leestijd",
  },
  {
    title: "Zo style je kunstplanten stijlvol in woonkamer of kantoor",
    category: "Stylingtips",
    excerpt: "Van schaalverhouding tot potkeuze: met een paar slimme keuzes oogt een ruimte direct zachter en luxer.",
    image: "/assets/images/story-studio.svg",
    href: "#",
    meta: "5 min leestijd",
  },
  {
    title: "Schoonmaken en fris houden: eenvoudige onderhoudstips",
    category: "Onderhoud",
    excerpt: "Met minimale inspanning houd je artificial plants stofvrij en representatief, zowel thuis als in zakelijke settings.",
    image: "/assets/images/business-space.svg",
    href: "#",
    meta: "3 min leestijd",
  },
];

export const footerGroups = [
  {
    title: "Shop",
    links: [
      { label: "Small plants", href: "/collectie.html#kleine-kunstplanten" },
      { label: "Large plants", href: "/collectie.html#grote-kunstplanten" },
      { label: "Trees", href: "/collectie.html#kunstbomen" },
      { label: "Hanging plants", href: "/collectie.html#kunsthangplanten" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/over-ons.html" },
      { label: "Contact", href: "/contact.html" },
      { label: "Blog", href: "#" },
      { label: "Business", href: "/zakelijk.html" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { label: "Shipping & Returns", href: "/verzending-retour.html" },
      { label: "Frequently Asked Questions", href: "/contact.html#faq" },
      { label: "Privacy Policy", href: "/privacy-policy.html" },
      { label: "Terms of Service", href: "/terms.html" },
    ],
  },
];
