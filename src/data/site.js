export const siteConfig = {
  brand: "PlantBrothers",
  phone: "+31 (0)20 123 45 67",
  email: "hallo@plantbrothers.nl",
  address: "Keizersgracht 214, 1016 DZ Amsterdam",
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
  "Voor 16:00 besteld is morgen in huis",
  "Gratis verzending boven 100 euro",
  "4.8/5 klantbeoordeling",
  "90 dagen bedenktijd",
];

export const navigation = [
  { label: "Inspiratie", href: "/index.html#blog-inspiratie" },
  { label: "Over ons", href: "/over-ons.html" },
  { label: "Contact", href: "/contact.html" },
  { label: "Sale", href: "/collectie.html#sale", highlight: true },
];

export const shopCategories = [
  {
    id: "kunstplanten",
    title: "Kunstplanten",
    products: [
      {
        label: "Monstera",
        href: "/product-detail.html?slug=faux-monstera-plant",
        image: "/assets/images/monstera-studio.png",
      },
      {
        label: "Column Cactus",
        href: "/product-detail.html?slug=column-cactus",
        image: "/assets/images/column-cactus-studio.png",
      },
      {
        label: "Bougainvillea",
        href: "/product-detail.html?slug=artificial-bougainvillea-tree",
        image: "/assets/images/RozeboomStudio.png",
      },
    ],
    links: [
      { label: "Monstera", href: "/product-detail.html?slug=faux-monstera-plant" },
      { label: "Column Cactus", href: "/product-detail.html?slug=column-cactus" },
      { label: "Bougainvillea", href: "/product-detail.html?slug=artificial-bougainvillea-tree" },
    ],
  },
  {
    id: "kunstbomen",
    title: "Kunstbomen",
    products: [
      {
        label: "Olijfboom",
        href: "/product-detail.html?slug=faux-olive-tree",
        image: "/assets/images/artificial-olivetree-studio.png",
      },
      {
        label: "Lemon Tree",
        href: "/product-detail.html?slug=artificial-lemon-tree",
        image: "/assets/images/product-lemon.svg",
      },
      {
        label: "Tree Geranium",
        href: "/product-detail.html?slug=artificial-tree-geranium",
        image: "/assets/images/product-geranium.svg",
      },
    ],
    links: [
      { label: "Olijfboom", href: "/product-detail.html?slug=faux-olive-tree" },
      { label: "Lemon Tree", href: "/product-detail.html?slug=artificial-lemon-tree" },
      { label: "Tree Geranium", href: "/product-detail.html?slug=artificial-tree-geranium" },
    ],
  },
  {
    id: "kunsthaag",
    title: "Kunsthaag",
    products: [
      {
        label: "Kunsthaag paneel",
        href: "/collectie.html",
        image: "/assets/images/category-hanging.svg",
      },
      {
        label: "Olijf kunsthaag",
        href: "/collectie.html",
        image: "/assets/images/business-space.svg",
      },
    ],
    links: [
      { label: "Kunsthaag paneel", href: "/collectie.html" },
      { label: "Olijf kunsthaag", href: "/collectie.html" },
    ],
  },
  {
    id: "vazen",
    title: "Vazen",
    products: [
      {
        label: "Stijlvolle vaas 1",
        href: "/collectie.html#potten-en-styling",
        image: "/assets/images/category-styling.svg",
      },
      {
        label: "Stijlvolle vaas 2",
        href: "/collectie.html#potten-en-styling",
        image: "/assets/images/story-studio.svg",
      },
    ],
    links: [
      { label: "Stijlvolle vaas 1", href: "/collectie.html#potten-en-styling" },
      { label: "Stijlvolle vaas 2", href: "/collectie.html#potten-en-styling" },
    ],
  },
];

export const promoTickerItems = [
  "Voor 16:00 besteld, morgen in huis",
  "Gratis levering vanaf €100",
  "Wij scoren een 4.8 op 2000+ reviews",
];

export const serviceHighlights = [
  "Nauwelijks van echt te onderscheiden",
  "Geen water, zonlicht of onderhoud nodig",
  "Stijlvol voor thuis, kantoor en hospitality",
  "Snelle levering en persoonlijk stylingadvies",
];

export const trustLogos = [
  "Maison Nord",
  "Studio Aster",
  "Hotel Rivage",
  "Bureau Forma",
  "Atelier 58",
];

export const categories = [
  {
    name: "Grote kunstplanten",
    description: "Statement pieces voor entrees, woonkamers en ontvangstruimtes.",
    image: "/assets/images/category-large.svg",
    link: "/collectie.html#grote-kunstplanten",
    count: "18 modellen",
  },
  {
    name: "Kleine kunstplanten",
    description: "Verfijnde accenten voor planken, tafels en stijlvolle hoekjes.",
    image: "/assets/images/category-small.svg",
    link: "/collectie.html#kleine-kunstplanten",
    count: "12 modellen",
  },
  {
    name: "Kunstbomen",
    description: "Architecturale vormen met een rustige, luxe uitstraling.",
    image: "/assets/images/category-trees.svg",
    link: "/collectie.html#kunstbomen",
    count: "9 modellen",
  },
  {
    name: "Kunsthangplanten",
    description: "Zachte gelaagdheid voor hospitality, retail en wooninterieurs.",
    image: "/assets/images/category-hanging.svg",
    link: "/collectie.html#kunsthangplanten",
    count: "7 modellen",
  },
  {
    name: "Potten en styling",
    description: "Afwerking in aardetinten, steenlook en moderne interieurmaterialen.",
    image: "/assets/images/category-styling.svg",
    link: "/collectie.html#potten-en-styling",
    count: "14 combinaties",
  },
];

export const featuredProducts = [
  {
    slug: "column-cactus",
    name: "Column Cactus",
    category: "Kleine kunstplant",
    filter: "kleine-kunstplanten",
    price: 79,
    compareAtPrice: 95,
    height: "95 cm",
    potSize: "Ø 20 cm",
    stockLabel: "Direct leverbaar",
    image: "/assets/images/column-cactus-studio.png",
    gallery: ["/assets/images/column-cactus-studio.png", "/assets/images/column-cactus-livingroom.png"],
    media: {
      primarySrc: "/assets/images/column-cactus-studio.png",
      primaryAlt: "Column Cactus studiofoto op lichte achtergrond",
      hoverSrc: "/assets/images/column-cactus-livingroom.png",
      hoverAlt: "Column Cactus in een moderne woonkamer",
      aspectRatio: "4 / 5",
      primaryFit: "cover",
      hoverFit: "cover",
      primaryPosition: "center 36%",
      hoverPosition: "center 42%",
    },
    description: "Een slanke sculpturale cactus voor moderne interieurs, balies en stylinghoeken die rust en karakter mogen krijgen.",
    badges: ["Strakke vorm", "Onderhoudsvrij"],
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
    category: "Kunstboom",
    filter: "kunstbomen",
    price: 229,
    compareAtPrice: 259,
    height: "190 cm",
    potSize: "Ø 36 cm",
    stockLabel: "Populair in projecten",
    image: "/assets/images/artificial-olivetree-studio.png",
    gallery: ["/assets/images/artificial-olivetree-studio.png", "/assets/images/artificial-olivetree.png"],
    media: {
      primarySrc: "/assets/images/artificial-olivetree-studio.png",
      primaryAlt: "Faux Olive Tree studiofoto op witte achtergrond",
      hoverSrc: "/assets/images/artificial-olivetree.png",
      hoverAlt: "Faux Olive Tree in een stijlvolle woonkamer",
      aspectRatio: "4 / 5",
      primaryFit: "contain",
      hoverFit: "cover",
    },
    description: "Zachte mediterrane elegantie voor woonkamers, horeca en ontvangstruimtes met een rustige designeruitstraling.",
    badges: ["Zakelijk favoriet", "Realistische stamstructuur"],
    rating: 4.8,
    reviewCount: 61,
    material: "Fijne olijfbladeren, houten stamlook en luxe potbasis",
    features: [
      "Subtiele hoogtewerking voor open ruimtes en lobby's",
      "Past goed in aardetinten, naturel stoffen en minimalistische interieurs",
      "Blijft jaarrond representatief zonder water of snoeiwerk",
    ],
    specs: [
      { label: "Hoogte", value: "190 cm" },
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
    category: "Grote kunstplant",
    filter: "grote-kunstplanten",
    price: 169,
    compareAtPrice: 199,
    height: "155 cm",
    potSize: "Ø 28 cm",
    stockLabel: "Snelle levering",
    image: "/assets/images/monstera-studio.png",
    gallery: ["/assets/images/monstera-studio.png", "/assets/images/monstera-livingroom.png"],
    media: {
      primarySrc: "/assets/images/monstera-studio.png",
      primaryAlt: "Faux Monstera Plant studiofoto op lichte achtergrond",
      hoverSrc: "/assets/images/monstera-livingroom.png",
      hoverAlt: "Faux Monstera Plant in een stijlvolle woonkamer",
      aspectRatio: "4 / 5",
      primaryFit: "cover",
      hoverFit: "cover",
      primaryPosition: "center 34%",
      hoverPosition: "center 35%",
    },
    description: "Een tropische favoriet met grote, open bladeren voor woonkamers, salons en hospitality settings die zachtheid nodig hebben.",
    badges: ["Tropische uitstraling", "Direct sfeer"],
    rating: 4.8,
    reviewCount: 54,
    material: "Volle monstera-bladeren met natuurlijke glans en stevige stelen",
    features: [
      "Iconische bladvorm voor een direct herkenbare premium look",
      "Mooie balans tussen volume en luchtigheid",
      "Sterk toepasbaar in woon- en projectinterieurs",
    ],
    specs: [
      { label: "Hoogte", value: "155 cm" },
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
    category: "Kunstboom",
    filter: "kunstbomen",
    price: 239,
    compareAtPrice: 279,
    height: "185 cm",
    potSize: "Ø 34 cm",
    stockLabel: "Nieuwe favoriet",
    image: "/assets/images/RozeboomStudio.png",
    gallery: ["/assets/images/RozeboomStudio.png", "/assets/images/RozeboomWoon.png"],
    media: {
      primarySrc: "/assets/images/RozeboomStudio.png",
      primaryAlt: "Artificial Bougainvillea Tree studiofoto op lichte achtergrond",
      hoverSrc: "/assets/images/RozeboomWoon.png",
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
    category: "Kunstboom",
    filter: "kunstbomen",
    price: 219,
    compareAtPrice: 249,
    height: "170 cm",
    potSize: "Ø 30 cm",
    stockLabel: "Projectselectie",
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
    category: "Grote kunstplant",
    filter: "grote-kunstplanten",
    price: 199,
    compareAtPrice: 229,
    height: "185 cm",
    potSize: "Ø 32 cm",
    stockLabel: "Volle tropische look",
    image: "/assets/images/banana-plant.png",
    gallery: ["/assets/images/banana-plant.png", "/assets/images/hero-lounge.svg"],
    imageMode: "contain",
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
      { label: "Hoogte", value: "185 cm" },
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
    category: "Kunstboom",
    filter: "kunstbomen",
    price: 249,
    compareAtPrice: 289,
    height: "180 cm",
    potSize: "Ø 34 cm",
    stockLabel: "Seizoensfavoriet",
    image: "/assets/images/product-lemon.svg",
    gallery: ["/assets/images/product-lemon.svg", "/assets/images/business-space.svg"],
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
      { label: "Hoogte", value: "180 cm" },
      { label: "Potmaat", value: "Ø 34 cm" },
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

export const whyPlantBrothers = [
  "Geselecteerd op realisme, vormgevoel en materiaalbeleving.",
  "Premium collectie die rust en verfijning toevoegt aan elke ruimte.",
  "Onderhoudsvrije oplossingen voor thuis, hospitality en kantoor.",
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
    quote: "We wilden wel groen, maar geen gedoe. PlantBrothers leverde precies die rustige premium uitstraling die we zochten.",
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
    title: "Voor PlantBrothers",
    text: "Een ruimte zonder groen voelt sneller vlak, minder warm en minder verzorgd aan.",
  },
  {
    title: "Na PlantBrothers",
    text: "Met hoogwaardige artificial plants ontstaat direct meer rust, karakter en een verzorgde premium uitstraling.",
  },
];

export const businessBenefits = [
  "Representatieve ruimtes zonder onderhoudskosten of uitval van beplanting.",
  "Ideaal voor kantoren, horeca, salons, showrooms en wachtruimtes.",
  "Consistente sfeer in ruimtes met weinig daglicht of wisselende temperaturen.",
  "Maatwerkadvies voor formaat, styling, plaatsing en combinatie met potten.",
];

export const artificialPlantInfo = [
  {
    title: "Stijl zonder inspanning",
    text: "Artificial plants geven een ruimte direct warmte en balans, zonder dat je rekening hoeft te houden met water, daglicht of seizoenswisselingen.",
  },
  {
    title: "Duurzaam mooi in gebruik",
    text: "Voor drukke huishoudens, hospitality en kantoren zijn kunstplanten een slimme keuze: ze blijven verzorgd ogen en vragen nauwelijks onderhoud.",
  },
  {
    title: "Altijd passend te stylen",
    text: "Van een subtiele hoekplant tot een grote statementboom: je creëert eenvoudig een premium sfeer die past bij jouw interieurconcept.",
  },
];

export const faqs = [
  {
    question: "Hoe onderhoud ik artificial plants het beste?",
    answer: "Een zachte doek of plumeau is meestal voldoende. Voor een grondigere opfrisbeurt kun je de bladeren afnemen met een licht vochtige doek.",
  },
  {
    question: "Hoe lang blijven kunstplanten mooi?",
    answer: "Bij normaal binnengebruik blijven hoogwaardige artificial plants jarenlang stijlvol. Vermijd langdurige directe zon om verkleuring te beperken.",
  },
  {
    question: "Zijn de kunstplanten geschikt voor kantoor of horeca?",
    answer: "Ja. Juist in zakelijke ruimtes zijn ze populair omdat ze altijd representatief blijven zonder dagelijkse verzorging of uitval.",
  },
  {
    question: "Hoe worden de planten geleverd?",
    answer: "Onze planten worden zorgvuldig verpakt geleverd. Veel modellen zijn direct klaar om in een sierpot of stylingopstelling te plaatsen.",
  },
  {
    question: "Kan ik advies krijgen over formaat en styling?",
    answer: "Zeker. We helpen graag bij de juiste schaal, plaatsing en combinatie met potten voor een rustige en hoogwaardige uitstraling.",
  },
];

export const blogPosts = [
  {
    title: "Waarom artificial plants perfect passen in een premium interieur",
    category: "Inspiratie",
    excerpt: "Ontdek hoe hoogwaardige kunstplanten rust, volume en een verzorgde sfeer toevoegen zonder onderhoud of concessies.",
    image: "/assets/images/hero-plant-atrium.svg",
    href: "/contact.html",
    meta: "4 min leestijd",
  },
  {
    title: "Zo style je kunstplanten stijlvol in woonkamer of kantoor",
    category: "Stylingtips",
    excerpt: "Van schaalverhouding tot potkeuze: met een paar slimme keuzes oogt een ruimte direct zachter en luxer.",
    image: "/assets/images/story-studio.svg",
    href: "/contact.html",
    meta: "5 min leestijd",
  },
  {
    title: "Schoonmaken en fris houden: eenvoudige onderhoudstips",
    category: "Onderhoud",
    excerpt: "Met minimale inspanning houd je artificial plants stofvrij en representatief, zowel thuis als in zakelijke settings.",
    image: "/assets/images/business-space.svg",
    href: "/contact.html",
    meta: "3 min leestijd",
  },
];

export const footerGroups = [
  {
    title: "Shop",
    links: [
      { label: "Kleine planten", href: "/collectie.html#kleine-kunstplanten" },
      { label: "Grote planten", href: "/collectie.html#grote-kunstplanten" },
      { label: "Bomen", href: "/collectie.html#kunstbomen" },
      { label: "Wandplanten", href: "/collectie.html#kunsthangplanten" },
    ],
  },
  {
    title: "Bedrijf",
    links: [
      { label: "Over ons", href: "/over-ons.html" },
      { label: "Contact", href: "/contact.html" },
      { label: "Blog", href: "/contact.html" },
      { label: "Zakelijk", href: "/zakelijk.html" },
    ],
  },
  {
    title: "Klantenservice",
    links: [
      { label: "Verzending & retourneren", href: "/contact.html" },
      { label: "Veelgestelde vragen", href: "/contact.html" },
      { label: "Privacybeleid", href: "/contact.html" },
      { label: "Algemene voorwaarden", href: "/contact.html" },
    ],
  },
];
