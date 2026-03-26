export const DEFAULT_LANGUAGE = "nl";
const STORAGE_KEY = "plantbrothers-language";
const TRANSLATABLE_ATTRIBUTES = ["placeholder", "aria-label", "title", "content"];
const textSourceMap = new WeakMap();
const attributeSourceMap = new WeakMap();

export const LANGUAGE_OPTIONS = [
  { code: "nl", flag: "🇳🇱", label: "Nederlands" },
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
];

const translations = {
  nl: {
    "Premium artificial plants": "Premium kunstplanten",
    "Our Collection": "Onze collectie",
    "Handpicked Favourites": "Met zorg geselecteerde favorieten",
    "Why Us": "Waarom wij",
    "Inspiration": "Inspiratie",
    "About us": "Over ons",
    "Sale": "Aanbiedingen",
    "Company": "Bedrijf",
    "Support": "Klantenservice",
    "Small Plants": "Kleine planten",
    "Big Plants": "Grote planten",
    "Trees": "Bomen",
    "Wall Plants": "Wandplanten",
    "Shipping & Returns": "Verzending & retourneren",
    "Privacy Policy": "Privacybeleid",
    "Terms of Service": "Algemene voorwaarden",
    "FAQ": "Veelgestelde vragen",
    "Column Cactus": "Zuilcactus",
    "Faux Olive Tree": "Kunst olijfboom",
    "Faux Monstera Plant": "Kunst monstera",
    "Artificial Bougainvillea Tree": "Kunst bougainvilleaboom",
    "Artificial Tree Geranium": "Kunst geraniumboom",
    "Banana Plant": "Bananenplant",
    "Artificial Lemon Tree": "Kunst citroenboom",
    "Lemon Tree": "Citroenboom",
    "Tree Geranium": "Geraniumboom",
    "Monstera": "Monstera",
    "Bougainvillea": "Bougainvillea",
    "Klantbeoordelingen": "Klantbeoordelingen",
  },
  en: {
    "PlantBrothers | Premium artificial plants voor een stijlvolle ruimte": "PlantBrothers | Premium artificial plants for a stylish space",
    "Ontdek premium artificial plants van PlantBrothers voor thuis, kantoor en hospitality. Nauwelijks van echt te onderscheiden, onderhoudsvrij en direct sfeerbepalend.":
      "Discover premium artificial plants from PlantBrothers for home, office and hospitality. Nearly indistinguishable from real plants, maintenance-free and instantly atmosphere-enhancing.",
    "Stijlvolle artificial plants met luxe uitstraling, snelle levering en een premium webshopervaring.":
      "Stylish artificial plants with a luxurious look, fast delivery and a premium webshop experience.",
    "Stijlvolle woonkamer met premium artificial plants": "Stylish living room with premium artificial plants",
    "Premium artificial plants": "Premium artificial plants",
    "Natuurlijke schoonheid": "Natural beauty",
    "zonder onderhoud": "without maintenance",
    "Hyperrealistische artificial plants voor mensen en bedrijven die een stijlvolle ruimte willen zonder water, uitval of gedoe.":
      "Hyper-realistic artificial plants for people and businesses who want a stylish space without watering, plant loss or hassle.",
    "Bekijk collectie": "View collection",
    "Ons verhaal": "Our story",
    "Our Collection": "Our Collection",
    "Handpicked Favourites": "Handpicked Favourites",
    "Elke plant is zorgvuldig geselecteerd om de schoonheid van groen naar jouw interieur te brengen, zonder concessies op realisme.":
      "Each plant is carefully selected to bring the beauty of greenery into your interior, without compromising on realism.",
    "Waarom kiezen": "Why choose us",
    "Artificial plants die rust, luxe en gemak samenbrengen": "Artificial plants that bring together calm, luxury and convenience",
    "Artificial plants uitgelegd": "Artificial plants explained",
    "Een slimme keuze voor interieurs die altijd verzorgd moeten aanvoelen": "A smart choice for interiors that should always feel polished",
    "Artificial plants zijn ideaal voor wie wel de zachtheid en luxe van groen wil, maar niet de onvoorspelbaarheid van onderhoud. Ze blijven consistent mooi, werken in vrijwel iedere ruimte en geven direct meer gelaagdheid aan het interieur.":
      "Artificial plants are ideal for anyone who wants the softness and luxury of greenery without the unpredictability of maintenance. They stay consistently beautiful, work in almost any space and instantly add more depth to the interior.",
    "Van woonkamers tot ontvangstruimtes en van retail tot hospitality: met hoogwaardige artificial plants voeg je op een onderhoudsvriendelijke manier warmte, volume en representativiteit toe.":
      "From living rooms to reception areas and from retail to hospitality: with high-quality artificial plants you add warmth, volume and a polished look in a maintenance-friendly way.",
    "Categorieën": "Categories",
    "Ontdek de collectie die past bij jouw stijl en ruimte": "Discover the collection that matches your style and space",
    "Volledige collectie bekijken": "View full collection",
    "Why Us": "Why Us",
    "Gekozen door interieurliefhebbers, merken en representatieve ruimtes": "Chosen by interior lovers, brands and polished spaces",
    "Waarom PlantBrothers": "Why PlantBrothers",
    "Geselecteerd op uitstraling, kwaliteit en lange visuele levensduur": "Selected for appearance, quality and long visual lifespan",
    "Onze collectie is samengesteld voor klanten die meer willen dan zomaar een decoratief product. De juiste artificial plant moet rust brengen, volume toevoegen en geloofwaardig ogen binnen een verzorgd interieur.":
      "Our collection is curated for customers who want more than just a decorative product. The right artificial plant should bring calm, add volume and look convincing in a refined interior.",
    "Kwaliteitsbeeld": "Quality focus",
    "Nauwelijks van echt te onderscheiden": "Nearly indistinguishable from real plants",
    "Van bladnerven en kleurnuances tot de vertakking en stamopbouw: ieder detail is ontworpen om overtuigend, rustig en premium over te komen.":
      "From leaf veins and colour nuances to branching and trunk structure: every detail is designed to look convincing, calm and premium.",
    "Studiofoto van premium Faux Olive Tree": "Studio image of premium faux olive tree",
    "Sfeertransformatie": "Atmosphere transformation",
    "Het verschil tussen een kale ruimte en een interieur met karakter": "The difference between an empty room and an interior with character",
    "Klantbeoordelingen": "Customer reviews",
    "Waarom klanten PlantBrothers beoordelen als stijlvol en betrouwbaar": "Why customers rate PlantBrothers as stylish and reliable",
    "Zakelijke toepassingen": "Business applications",
    "Representatief groen voor kantoren, horeca, salons en retail": "Refined greenery for offices, hospitality, salons and retail",
    "Creëer direct een verzorgde, rustige en gastvrije uitstraling in ontvangstruimtes, vergaderkamers, showrooms en hospitalityconcepten zonder dagelijkse onderhoudslast.":
      "Instantly create a polished, calm and welcoming look in reception areas, meeting rooms, showrooms and hospitality concepts without daily maintenance.",
    "Bekijk zakelijke mogelijkheden": "View business options",
    "Zakelijke ruimte gestyled met premium artificial plants": "Business space styled with premium artificial plants",
    "Veelgestelde vragen": "Frequently asked questions",
    "Antwoorden op praktische vragen over artificial plants": "Answers to practical questions about artificial plants",
    "Blog & inspiratie": "Blog & inspiration",
    "Advies, stylingtips en inspiratie voor een verzorgde groene sfeer": "Advice, styling tips and inspiration for a polished green atmosphere",
    "Meer over PlantBrothers": "More about PlantBrothers",
    "Laatste stap": "Final step",
    "Breng vandaag nog meer rust en uitstraling in je ruimte": "Bring more calm and style to your space today",
    "Shop direct uit de collectie of neem contact op voor advies over hoogte, toepassing en styling binnen jouw interieur of project.":
      "Shop directly from the collection or contact us for advice on size, application and styling within your interior or project.",
    "Shop nu": "Shop now",
    "Shop met korting": "Shop with discount",
    "Over ons | PlantBrothers": "About us | PlantBrothers",
    "Lees het verhaal van PlantBrothers en ontdek onze visie op sfeer, interieur, hoogwaardige kunstplanten en persoonlijke service.":
      "Read the PlantBrothers story and discover our vision on atmosphere, interior design, premium artificial plants and personal service.",
    "PlantBrothers gelooft in stijlvolle, onderhoudsvrije groenbeleving voor thuis en zakelijke interieurs.":
      "PlantBrothers believes in stylish, maintenance-free greenery for homes and business interiors.",
    "Over PlantBrothers": "About PlantBrothers",
    "Een merk voor interieurs die groen willen, zonder concessies": "A brand for interiors that want greenery without compromise",
    "Wij geloven dat een ruimte rustiger, warmer en sterker aanvoelt met goed gekozen groen. Daarom focussen we op kunstplanten die overtuigen in uitstraling, kwaliteit en afwerking.":
      "We believe a space feels calmer, warmer and stronger with well-chosen greenery. That is why we focus on artificial plants that convince in look, quality and finish.",
    "Ons verhaal": "Our story",
    "Geboren uit liefde voor sfeer en interieurkwaliteit": "Born from a love of atmosphere and interior quality",
    "PlantBrothers is ontstaan vanuit een eenvoudige observatie: veel mensen willen de uitstraling van echte planten, maar niet het onderhoud, de uitval of de beperkingen van licht en verzorging.":
      "PlantBrothers started from a simple observation: many people want the look of real plants, but not the maintenance, plant loss or the limitations of light and care.",
    "Daarom bouwen we aan een collectie hoogwaardige kunstplanten die passen bij een modern, warm en professioneel interieur. Geen massale goedkope look, maar een rustige premium uitstraling die klopt in detail.":
      "That is why we are building a collection of premium artificial plants that fit a modern, warm and professional interior. Not a cheap mass look, but a calm premium appearance with the right details.",
    "PlantBrothers studio en premium plantpresentatie": "PlantBrothers studio and premium plant presentation",
    "Onze visie": "Our vision",
    "Sfeer creëren moet eenvoudig en duurzaam mooi zijn": "Creating atmosphere should be easy and beautifully lasting",
    "Een sterk interieur draait niet alleen om meubels of verlichting, maar ook om balans. Groen verzacht lijnen, brengt leven in de ruimte en geeft direct een verzorgde indruk.":
      "A strong interior is not just about furniture or lighting, but also about balance. Greenery softens lines, brings life into a space and instantly gives a polished impression.",
    "Met hoogwaardige kunstplanten maak je die sfeer toegankelijk, voorspelbaar en onderhoudsvriendelijk. Dat is slim voor thuis, maar ook voor zakelijke omgevingen waarin continu representativiteit telt.":
      "With premium artificial plants, you make that atmosphere accessible, predictable and maintenance-friendly. That is smart for home, but also for business environments where a polished appearance matters continuously.",
    "Waarom kunstplanten": "Why artificial plants",
    "Een slimme keuze voor wie uitstraling belangrijk vindt": "A smart choice for those who value appearance",
    "Altijd consistent mooi, ongeacht lichtinval of seizoen.": "Always consistently beautiful, regardless of light or season.",
    "Geen water, snoeiwerk of specialistische verzorging nodig.": "No watering, pruning or specialist care required.",
    "Perfect voor moeilijk bereikbare of intensief gebruikte ruimtes.": "Perfect for hard-to-reach or heavily used spaces.",
    "Gemakkelijk te combineren met luxe potten en interieurstyling.": "Easy to combine with luxury pots and interior styling.",
    "Service": "Service",
    "Persoonlijk advies, zorgvuldig geselecteerde collectie": "Personal advice, carefully selected collection",
    "We helpen je graag bij het kiezen van de juiste maat, vorm en styling voor jouw woning, kantoor of project.":
      "We are happy to help you choose the right size, shape and styling for your home, office or project.",
    "Neem contact op": "Contact us",
    "Collectie | PlantBrothers": "Collection | PlantBrothers",
    "Bekijk de premium collectie kunstplanten van PlantBrothers: grote kunstplanten, kleine modellen, kunstbomen, hangplanten en styling.":
      "Browse PlantBrothers' premium collection of artificial plants: large plants, small models, artificial trees, hanging plants and styling.",
    "Premium gepresenteerde kunstplanten voor stijlvolle woon- en zakelijke ruimtes.":
      "Premium presented artificial plants for stylish living and business spaces.",
    "Collectie": "Collection",
    "Een zorgvuldig samengestelde collectie premium kunstplanten": "A carefully curated collection of premium artificial plants",
    "Ontdek modellen die geselecteerd zijn op realistische uitstraling, hoogwaardige materialen en een rustige luxe presentatie. Klaar om later uit te breiden met volledige webshopfunctionaliteit.":
      "Discover models selected for realistic appearance, premium materials and a calm luxurious presentation. Ready to expand later with full webshop functionality.",
    "Alles": "All",
    "Grote kunstplanten": "Large artificial plants",
    "Kleine kunstplanten": "Small artificial plants",
    "Kunstbomen": "Artificial trees",
    "Kunsthangplanten": "Hanging plants",
    "Potten en styling": "Pots and styling",
    "Assortiment": "Assortment",
    "Uitgelichte producten": "Featured products",
    "Voor deze categorie voegen we binnenkort voorbeeldproducten toe. Neem contact op voor maatwerk of stylingadvies.":
      "We will add sample products for this category soon. Contact us for custom solutions or styling advice.",
    "Maatwerk": "Custom work",
    "Hulp nodig bij selectie of styling?": "Need help with selection or styling?",
    "We adviseren graag over formaat, toepassing, materiaalbeleving en een passende combinatie met potten of zakelijke inrichting.":
      "We are happy to advise on size, application, material feel and a fitting combination with pots or business interiors.",
    "Vraag advies aan": "Request advice",
    "Voor zakelijke projecten": "For business projects",
    "Zakelijk | PlantBrothers": "Business | PlantBrothers",
    "Zakelijke kunstplanten voor kantoren, horeca, winkels en ontvangstruimtes. Onderhoudsvrije groene sfeer met premium uitstraling.":
      "Business artificial plants for offices, hospitality, shops and reception areas. Maintenance-free green atmosphere with a premium look.",
    "Maatwerk en premium kunstplanten voor representatieve zakelijke interieurs.":
      "Custom solutions and premium artificial plants for polished business interiors.",
    "Zakelijk": "Business",
    "Stijlvol groen voor ruimtes die altijd representatief moeten zijn": "Stylish greenery for spaces that must always look polished",
    "Voor kantoren, horeca, winkels, salons, showrooms en ontvangstruimtes levert PlantBrothers kunstplanten met een luxe uitstraling en minimale operationele belasting.":
      "For offices, hospitality, shops, salons, showrooms and reception areas, PlantBrothers supplies artificial plants with a luxurious look and minimal operational burden.",
    "Voordelen": "Benefits",
    "Waarom kunstplanten zakelijk zo effectief zijn": "Why artificial plants are so effective for business",
    "Representatieve zakelijke ruimte met hoogwaardige kunstplanten": "Representative business space with premium artificial plants",
    "Toepassingen": "Applications",
    "Van ontvangstbalie tot hospitality concept": "From reception desk to hospitality concept",
    "Kunstplanten maken ruimtes zachter, warmer en professioneler. Ze werken bijzonder goed in gebieden met weinig daglicht, piekbelasting of wisselende temperaturen, waar echte planten vaak niet stabiel blijven.":
      "Artificial plants make spaces softer, warmer and more professional. They work especially well in areas with little daylight, heavy use or changing temperatures, where real plants often do not remain stable.",
    "Denk aan entrees, lounges, vergaderruimtes, restaurants, retailpresentaties en wachtruimtes waarin sfeer en verzorgde uitstraling direct bijdragen aan de beleving.":
      "Think of entrances, lounges, meeting rooms, restaurants, retail displays and waiting areas where atmosphere and a polished look directly contribute to the experience.",
    "Advies op formaat, stijl en plaatsing": "Advice on size, style and placement",
    "We denken mee over aantallen, combinaties, potafwerking en de juiste schaal per ruimte. Zo ontstaat een groenconcept dat aansluit op de routing, branding en interieurtaal van je locatie.":
      "We think along about quantities, combinations, pot finishing and the right scale for each space. This creates a green concept that matches the routing, branding and interior language of your location.",
    "Plan een aanvraag": "Plan a request",
    "Bespreek jouw zakelijke project": "Discuss your business project",
    "Vraag een voorstel aan voor een enkele ruimte of een complete zakelijke inrichting met premium kunstplanten.":
      "Request a proposal for a single space or a complete business interior with premium artificial plants.",
    "Contactformulier": "Contact form",
    "Mail direct": "Email directly",
    "Contact | PlantBrothers": "Contact | PlantBrothers",
    "Neem contact op met PlantBrothers voor advies over hoogwaardige kunstplanten voor thuis, kantoor en zakelijke projecten.":
      "Contact PlantBrothers for advice on premium artificial plants for home, office and business projects.",
    "Vraag advies of een maatwerkvoorstel aan voor premium kunstplanten.": "Request advice or a custom proposal for premium artificial plants.",
    "Contact": "Contact",
    "Vertel ons welke sfeer je wilt neerzetten": "Tell us what atmosphere you want to create",
    "We helpen je graag met advies over formaat, toepassing, stijl en een passende selectie kunstplanten voor thuis of zakelijk gebruik.":
      "We are happy to help with advice on size, application, style and a suitable selection of artificial plants for home or business use.",
    "Stuur een bericht": "Send a message",
    "We denken graag met je mee": "We are happy to think along with you",
    "Naam": "Name",
    "E-mailadres": "Email address",
    "Bedrijf of projectnaam": "Company or project name",
    "Waar ben je naar op zoek?": "What are you looking for?",
    "Advies voor thuis": "Advice for home",
    "Zakelijke aanvraag": "Business request",
    "Styling en potten": "Styling and pots",
    "Algemene vraag": "General question",
    "Bericht": "Message",
    "Vertel kort iets over de ruimte, stijl of gewenste toepassing.": "Briefly tell us about the space, style or intended application.",
    "Verstuur aanvraag": "Send request",
    "Direct contact": "Direct contact",
    "Contactgegevens": "Contact details",
    "Veelvoorkomende vragen": "Common questions",
    "Winkelwagen | PlantBrothers": "Cart | PlantBrothers",
    "Bekijk de winkelwagen van PlantBrothers en ga verder met je aanvraag of bestelling van premium kunstplanten.":
      "View the PlantBrothers cart and continue with your request or order for premium artificial plants.",
    "Overzicht van geselecteerde premium kunstplanten van PlantBrothers.":
      "Overview of selected premium artificial plants from PlantBrothers.",
    "Winkelwagen": "Cart",
    "Je selectie premium kunstplanten": "Your selection of premium artificial plants",
    "Controleer je gekozen planten en ga verder naar contact of projectadvies. Deze flow is opgezet als basis voor een latere volledige checkout.":
      "Review your selected plants and continue to contact or project advice. This flow has been set up as a basis for a later full checkout.",
    "Productdetail | PlantBrothers": "Product details | PlantBrothers",
    "Premium productdetailpagina van PlantBrothers met galerij, reviews en winkelwagenfunctionaliteit voor artificial plants.":
      "Premium product detail page from PlantBrothers with gallery, reviews and cart functionality for artificial plants.",
    "Premium productpagina voor artificial plants met reviews, specificaties en winkelwagen.":
      "Premium product page for artificial plants with reviews, specifications and cart.",
    "Productdetail": "Product details",
    "Bekijk de details van jouw geselecteerde artificial plant": "View the details of your selected artificial plant",
    "Ontdek hoogwaardige productbeelden, specificaties, reviews en voeg direct jouw favoriet toe aan de winkelwagen.":
      "Discover premium product images, specifications, reviews and add your favourite directly to the cart.",
    "Gerelateerde planten": "Related plants",
    "Past goed bij dezelfde stijl en ruimte": "Fits well with the same style and space",
    "Onderhoudsvrije planten": "Maintenance-free plants",
    "Voor 16:00 besteld is morgen in huis": "Ordered before 4:00 PM, delivered tomorrow",
    "Gratis verzending boven 100 euro": "Free shipping over 100 euros",
    "4.8/5 klantbeoordeling": "4.8/5 customer rating",
    "90 dagen bedenktijd": "90-day return period",
    "Shop": "Shop",
    "Inspiratie": "Inspiration",
    "Over ons": "About us",
    "Aanbiedingen": "Sale",
    "Bedrijf": "Company",
    "Klantenservice": "Support",
    "Kleine planten": "Small plants",
    "Grote planten": "Large plants",
    "Bomen": "Trees",
    "Wandplanten": "Wall plants",
    "Verzending & retourneren": "Shipping & returns",
    "Privacybeleid": "Privacy policy",
    "Algemene voorwaarden": "Terms of service",
    "Blog": "Blog",
    "Zakelijk": "Business",
    "Ontdek onze artificial collectie": "Discover our artificial collection",
    "Bekijk alles": "View all",
    "Shop categorieën": "Shop categories",
    "Kunstplanten": "Artificial plants",
    "Kunsthaag": "Artificial hedge",
    "Vazen": "Vases",
    "Olijfboom": "Olive tree",
    "Kunsthaag paneel": "Artificial hedge panel",
    "Olijf kunsthaag": "Olive hedge",
    "Stijlvolle vaas 1": "Stylish vase 1",
    "Stijlvolle vaas 2": "Stylish vase 2",
    "Zoeken": "Search",
    "Account": "Account",
    "Winkelwagen": "Cart",
    "Mobiele navigatie": "Mobile navigation",
    "Open menu": "Open menu",
    "Nieuwsbrief": "Newsletter",
    "Ontvang stylinginspiratie, nieuwe collecties en exclusieve acties": "Receive styling inspiration, new collections and exclusive offers",
    "Schrijf je in voor premium interieurinspiratie, praktische tips en aanbiedingen op zorgvuldig geselecteerde artificial plants.":
      "Sign up for premium interior inspiration, practical tips and offers on carefully selected artificial plants.",
    "Inschrijven": "Subscribe",
    "Premium artificial plants die onmogelijk echt lijken. Gemaakt voor mensen die sfeer willen zonder onderhoud.":
      "Premium artificial plants that look impossibly real. Made for people who want atmosphere without maintenance.",
    "Alle rechten voorbehouden.": "All rights reserved.",
    "Kleine kunstplant": "Small artificial plant",
    "Grote kunstplant": "Large artificial plant",
    "Kunstboom": "Artificial tree",
    "Direct leverbaar": "Available immediately",
    "Populair in projecten": "Popular in projects",
    "Snelle levering": "Fast delivery",
    "Nieuwe favoriet": "New favourite",
    "Projectselectie": "Project selection",
    "Volle tropische look": "Full tropical look",
    "Seizoensfavoriet": "Seasonal favourite",
    "Strakke vorm": "Clean shape",
    "Onderhoudsvrij": "Maintenance-free",
    "Zakelijk favoriet": "Business favourite",
    "Realistische stamstructuur": "Realistic trunk structure",
    "Tropische uitstraling": "Tropical look",
    "Direct sfeer": "Instant atmosphere",
    "Kleuraccent": "Colour accent",
    "Statement tree": "Statement tree",
    "Bloeiende boom": "Flowering tree",
    "Luxe uitstraling": "Luxurious look",
    "Grote bladeren": "Large leaves",
    "Statement plant": "Statement plant",
    "Mediterrane sfeer": "Mediterranean atmosphere",
    "Design favoriet": "Design favourite",
    "Hoogte": "Height",
    "Potmaat": "Pot size",
    "Materiaal": "Material",
    "Toepassing": "Application",
    "Binnengebruik": "Indoor use",
    "Collectie": "Collection",
    "Bekijk categorie": "View category",
    "Bekijk details": "View details",
    "Bekijk product": "View product",
    "Meer details": "More details",
    "Lees meer": "Read more",
    "Vul een geldig e-mailadres in.": "Please enter a valid email address.",
    "Bedankt. Je ontvangt binnenkort inspiratie en acties van PlantBrothers.": "Thank you. You will receive inspiration and offers from PlantBrothers soon.",
    "Vul naam, e-mail en bericht in om je aanvraag te versturen.": "Enter your name, email and message to send your request.",
    "Controleer het e-mailadres en probeer het opnieuw.": "Check the email address and try again.",
    "Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op.": "Thank you for your message. We will contact you as soon as possible.",
    "Toegevoegd aan je winkelwagen.": "Added to your cart.",
    "Je winkelwagen is nog leeg": "Your cart is still empty",
    "Bekijk de collectie en voeg je favoriete artificial plants toe om verder te gaan.": "Browse the collection and add your favourite artificial plants to continue.",
    "Naar collectie": "Go to collection",
    "PlantBrothers collectie": "PlantBrothers collection",
    "Samenvatting": "Summary",
    "Besteloverzicht": "Order overview",
    "Subtotaal": "Subtotal",
    "Verzending": "Shipping",
    "Gratis vanaf €100": "Free from €100",
    "Projectadvies": "Project advice",
    "Beschikbaar": "Available",
    "Ga verder met aanvraag": "Continue with request",
    "Leeg winkelwagen": "Empty cart",
    "Aantal": "Quantity",
    "In winkelwagen": "Add to cart",
    "Normaal": "Regular",
    "beoordelingen": "reviews",
    "uit": "out of",
    "Artificial plants": "Artificial plants",
    "Nauwelijks van echt te onderscheiden": "Nearly indistinguishable from real plants",
    "Geen water of zonlicht nodig": "No water or sunlight needed",
    "Altijd een verzorgde uitstraling": "Always a polished appearance",
    "Geschikt voor thuis en zakelijk gebruik": "Suitable for home and business use",
    "Fijne bladstructuren, natuurlijke kleurnuances en een luxe afwerking zorgen voor een levensechte uitstraling.":
      "Fine leaf structures, natural colour nuances and a luxurious finish create a lifelike appearance.",
    "Onze artificial plants blijven mooi zonder daglicht, onderhoudsschema's of seizoensgevoelige verzorging.":
      "Our artificial plants stay beautiful without daylight, maintenance schedules or seasonal care.",
    "Creëer direct rust, sfeer en representativiteit in woon- en werkruimtes zonder terugkerend onderhoud.":
      "Instantly create calm, atmosphere and a polished feel in living and working spaces without recurring maintenance.",
    "Van woonkamer tot showroom: de collectie sluit aan op premium interieurs en professionele omgevingen.":
      "From living room to showroom: the collection fits premium interiors and professional environments.",
    "Geselecteerd op realisme, vormgevoel en materiaalbeleving.": "Selected for realism, sense of form and material quality.",
    "Premium collectie die rust en verfijning toevoegt aan elke ruimte.": "Premium collection that adds calm and refinement to any space.",
    "Onderhoudsvrije oplossingen voor thuis, hospitality en kantoor.": "Maintenance-free solutions for home, hospitality and office.",
    "Persoonlijk advies voor styling, formaat en toepassing.": "Personal advice for styling, size and application.",
    "De planten geven meteen sfeer aan onze ontvangstruimte. Bezoekers vragen regelmatig of ze echt zijn.": "The plants instantly add atmosphere to our reception area. Visitors regularly ask if they are real.",
    "Studio-eigenaar, Utrecht": "Studio owner, Utrecht",
    "We wilden wel groen, maar geen gedoe. PlantBrothers leverde precies die rustige premium uitstraling die we zochten.":
      "We wanted greenery, but no hassle. PlantBrothers delivered exactly the calm premium look we were looking for.",
    "Ook dichtbij zien de bladeren en stammen er overtuigend uit. Het tilt het interieur echt naar een hoger niveau.":
      "Even up close the leaves and trunks look convincing. It really takes the interior to a higher level.",
    "Interieurliefhebber, Amsterdam": "Interior enthusiast, Amsterdam",
    "Voor PlantBrothers": "Before PlantBrothers",
    "Na PlantBrothers": "After PlantBrothers",
    "Een ruimte zonder groen voelt sneller vlak, minder warm en minder verzorgd aan.": "A space without greenery quickly feels flatter, less warm and less polished.",
    "Met hoogwaardige artificial plants ontstaat direct meer rust, karakter en een verzorgde premium uitstraling.":
      "With premium artificial plants, a space immediately gains more calm, character and a polished premium appearance.",
    "Representatieve ruimtes zonder onderhoudskosten of uitval van beplanting.": "Representative spaces without maintenance costs or plant loss.",
    "Ideaal voor kantoren, horeca, salons, showrooms en wachtruimtes.": "Ideal for offices, hospitality, salons, showrooms and waiting rooms.",
    "Consistente sfeer in ruimtes met weinig daglicht of wisselende temperaturen.": "Consistent atmosphere in spaces with little daylight or changing temperatures.",
    "Maatwerkadvies voor formaat, styling, plaatsing en combinatie met potten.": "Custom advice on size, styling, placement and combination with pots.",
    "Stijl zonder inspanning": "Style without effort",
    "Artificial plants geven een ruimte direct warmte en balans, zonder dat je rekening hoeft te houden met water, daglicht of seizoenswisselingen.":
      "Artificial plants instantly give a space warmth and balance, without having to think about water, daylight or seasonal changes.",
    "Duurzaam mooi in gebruik": "Durably beautiful in use",
    "Voor drukke huishoudens, hospitality en kantoren zijn kunstplanten een slimme keuze: ze blijven verzorgd ogen en vragen nauwelijks onderhoud.":
      "For busy households, hospitality and offices, artificial plants are a smart choice: they keep looking polished and require hardly any maintenance.",
    "Altijd passend te stylen": "Always easy to style",
    "Van een subtiele hoekplant tot een grote statementboom: je creëert eenvoudig een premium sfeer die past bij jouw interieurconcept.":
      "From a subtle corner plant to a large statement tree: you can easily create a premium atmosphere that matches your interior concept.",
    "Hoe onderhoud ik artificial plants het beste?": "How do I best maintain artificial plants?",
    "Een zachte doek of plumeau is meestal voldoende. Voor een grondigere opfrisbeurt kun je de bladeren afnemen met een licht vochtige doek.":
      "A soft cloth or duster is usually enough. For a deeper refresh, you can wipe the leaves with a slightly damp cloth.",
    "Hoe lang blijven kunstplanten mooi?": "How long do artificial plants stay beautiful?",
    "Bij normaal binnengebruik blijven hoogwaardige artificial plants jarenlang stijlvol. Vermijd langdurige directe zon om verkleuring te beperken.":
      "With normal indoor use, high-quality artificial plants remain stylish for years. Avoid prolonged direct sun to reduce discolouration.",
    "Zijn de kunstplanten geschikt voor kantoor of horeca?": "Are the artificial plants suitable for offices or hospitality?",
    "Ja. Juist in zakelijke ruimtes zijn ze populair omdat ze altijd representatief blijven zonder dagelijkse verzorging of uitval.":
      "Yes. They are particularly popular in business spaces because they always remain presentable without daily care or plant loss.",
    "Hoe worden de planten geleverd?": "How are the plants delivered?",
    "Onze planten worden zorgvuldig verpakt geleverd. Veel modellen zijn direct klaar om in een sierpot of stylingopstelling te plaatsen.":
      "Our plants are delivered carefully packed. Many models are ready to place directly in a decorative pot or styling setup.",
    "Kan ik advies krijgen over formaat en styling?": "Can I get advice on size and styling?",
    "Zeker. We helpen graag bij de juiste schaal, plaatsing en combinatie met potten voor een rustige en hoogwaardige uitstraling.":
      "Certainly. We are happy to help with the right scale, placement and combination with pots for a calm and high-end appearance.",
    "Waarom artificial plants perfect passen in een premium interieur": "Why artificial plants fit perfectly in a premium interior",
    "Inspiratie": "Inspiration",
    "Ontdek hoe hoogwaardige kunstplanten rust, volume en een verzorgde sfeer toevoegen zonder onderhoud of concessies.":
      "Discover how premium artificial plants add calm, volume and a polished atmosphere without maintenance or compromises.",
    "4 min leestijd": "4 min read",
    "Zo style je kunstplanten stijlvol in woonkamer of kantoor": "How to style artificial plants elegantly in a living room or office",
    "Stylingtips": "Styling tips",
    "Van schaalverhouding tot potkeuze: met een paar slimme keuzes oogt een ruimte direct zachter en luxer.":
      "From proportions to pot choice: with a few smart choices, a space instantly looks softer and more luxurious.",
    "5 min leestijd": "5 min read",
    "Schoonmaken en fris houden: eenvoudige onderhoudstips": "Cleaning and keeping fresh: simple care tips",
    "Onderhoud": "Maintenance",
    "Met minimale inspanning houd je artificial plants stofvrij en representatief, zowel thuis als in zakelijke settings.":
      "With minimal effort, you keep artificial plants dust-free and presentable, both at home and in business settings.",
    "3 min leestijd": "3 min read",
  },
  de: {
    "PlantBrothers | Premium artificial plants voor een stijlvolle ruimte": "PlantBrothers | Premium Kunstpflanzen für einen stilvollen Raum",
    "Ontdek premium artificial plants van PlantBrothers voor thuis, kantoor en hospitality. Nauwelijks van echt te onderscheiden, onderhoudsvrij en direct sfeerbepalend.":
      "Entdecken Sie Premium-Kunstpflanzen von PlantBrothers für Zuhause, Büro und Hospitality. Kaum von echten Pflanzen zu unterscheiden, pflegefrei und sofort stimmungsprägend.",
    "Stijlvolle artificial plants met luxe uitstraling, snelle levering en een premium webshopervaring.":
      "Stilvolle Kunstpflanzen mit luxuriöser Ausstrahlung, schneller Lieferung und einem Premium-Shop-Erlebnis.",
    "Stijlvolle woonkamer met premium artificial plants": "Stilvolles Wohnzimmer mit Premium-Kunstpflanzen",
    "Premium artificial plants": "Premium-Kunstpflanzen",
    "Natuurlijke schoonheid": "Natürliche Schönheit",
    "zonder onderhoud": "ohne Pflege",
    "Hyperrealistische artificial plants voor mensen en bedrijven die een stijlvolle ruimte willen zonder water, uitval of gedoe.":
      "Hyperrealistische Kunstpflanzen für Menschen und Unternehmen, die einen stilvollen Raum ohne Gießen, Ausfall oder Aufwand möchten.",
    "Bekijk collectie": "Kollektion ansehen",
    "Ons verhaal": "Unsere Geschichte",
    "Our Collection": "Unsere Kollektion",
    "Handpicked Favourites": "Sorgfältig ausgewählte Favoriten",
    "Elke plant is zorgvuldig geselecteerd om de schoonheid van groen naar jouw interieur te brengen, zonder concessies op realisme.":
      "Jede Pflanze wurde sorgfältig ausgewählt, um die Schönheit von Grün in Ihr Interieur zu bringen, ohne Kompromisse beim Realismus.",
    "Waarom kiezen": "Warum wählen",
    "Artificial plants die rust, luxe en gemak samenbrengen": "Kunstpflanzen, die Ruhe, Luxus und Komfort vereinen",
    "Artificial plants uitgelegd": "Kunstpflanzen erklärt",
    "Een slimme keuze voor interieurs die altijd verzorgd moeten aanvoelen": "Eine kluge Wahl für Innenräume, die immer gepflegt wirken sollen",
    "Categorieën": "Kategorien",
    "Ontdek de collectie die past bij jouw stijl en ruimte": "Entdecken Sie die Kollektion, die zu Ihrem Stil und Raum passt",
    "Volledige collectie bekijken": "Gesamte Kollektion ansehen",
    "Why Us": "Warum wir",
    "Gekozen door interieurliefhebbers, merken en representatieve ruimtes": "Gewählt von Interieurliebhabern, Marken und repräsentativen Räumen",
    "Waarom PlantBrothers": "Warum PlantBrothers",
    "Geselecteerd op uitstraling, kwaliteit en lange visuele levensduur": "Ausgewählt nach Ausstrahlung, Qualität und langer visueller Lebensdauer",
    "Kwaliteitsbeeld": "Qualitätsfokus",
    "Nauwelijks van echt te onderscheiden": "Kaum von echt zu unterscheiden",
    "Sfeertransformatie": "Atmosphärenwandel",
    "Het verschil tussen een kale ruimte en een interieur met karakter": "Der Unterschied zwischen einem leeren Raum und einem Interieur mit Charakter",
    "Klantbeoordelingen": "Kundenbewertungen",
    "Waarom klanten PlantBrothers beoordelen als stijlvol en betrouwbaar": "Warum Kunden PlantBrothers als stilvoll und zuverlässig bewerten",
    "Zakelijke toepassingen": "Geschäftliche Anwendungen",
    "Representatief groen voor kantoren, horeca, salons en retail": "Repräsentatives Grün für Büros, Gastronomie, Salons und Einzelhandel",
    "Bekijk zakelijke mogelijkheden": "Geschäftliche Möglichkeiten ansehen",
    "Veelgestelde vragen": "Häufig gestellte Fragen",
    "Antwoorden op praktische vragen over artificial plants": "Antworten auf praktische Fragen zu Kunstpflanzen",
    "Blog & inspiratie": "Blog & Inspiration",
    "Advies, stylingtips en inspiratie voor een verzorgde groene sfeer": "Beratung, Stylingtipps und Inspiration für eine gepflegte grüne Atmosphäre",
    "Meer over PlantBrothers": "Mehr über PlantBrothers",
    "Laatste stap": "Letzter Schritt",
    "Breng vandaag nog meer rust en uitstraling in je ruimte": "Bringen Sie noch heute mehr Ruhe und Ausstrahlung in Ihren Raum",
    "Shop nu": "Jetzt einkaufen",
    "Shop met korting": "Mit Rabatt einkaufen",
    "Over ons": "Über uns",
    "Contact": "Kontakt",
    "Inspiratie": "Inspiration",
    "Aanbiedingen": "Angebote",
    "Bedrijf": "Unternehmen",
    "Klantenservice": "Kundenservice",
    "Kleine planten": "Kleine Pflanzen",
    "Grote planten": "Große Pflanzen",
    "Bomen": "Bäume",
    "Wandplanten": "Wandpflanzen",
    "Verzending & retourneren": "Versand & Rückgabe",
    "Privacybeleid": "Datenschutzrichtlinie",
    "Algemene voorwaarden": "Allgemeine Geschäftsbedingungen",
    "Blog": "Blog",
    "Nieuwsbrief": "Newsletter",
    "Inschrijven": "Anmelden",
    "Winkelwagen": "Warenkorb",
    "Kunstplanten": "Kunstpflanzen",
    "Kunstbomen": "Kunstbäume",
    "Kunsthaag": "Kunsthecke",
    "Vazen": "Vasen",
    "Zoeken": "Suchen",
    "Account": "Konto",
    "Shop": "Shop",
    "Ontdek onze artificial collectie": "Entdecken Sie unsere Kunstkollektion",
    "Bekijk alles": "Alles ansehen",
    "Shop categorieën": "Shop-Kategorien",
    "Onderhoudsvrije planten": "Pflegefreie Pflanzen",
    "Voor 16:00 besteld is morgen in huis": "Vor 16:00 Uhr bestellt, morgen geliefert",
    "Gratis verzending boven 100 euro": "Kostenloser Versand ab 100 Euro",
    "4.8/5 klantbeoordeling": "4,8/5 Kundenbewertung",
    "90 dagen bedenktijd": "90 Tage Bedenkzeit",
    "Naam": "Name",
    "E-mailadres": "E-Mail-Adresse",
    "Bedrijf of projectnaam": "Firma oder Projektname",
    "Waar ben je naar op zoek?": "Wonach suchen Sie?",
    "Advies voor thuis": "Beratung für Zuhause",
    "Zakelijke aanvraag": "Geschäftsanfrage",
    "Styling en potten": "Styling und Töpfe",
    "Algemene vraag": "Allgemeine Frage",
    "Bericht": "Nachricht",
    "Verstuur aanvraag": "Anfrage senden",
    "Direct contact": "Direkter Kontakt",
    "Contactgegevens": "Kontaktdaten",
    "Veelvoorkomende vragen": "Häufige Fragen",
    "In winkelwagen": "In den Warenkorb",
    "Meer details": "Mehr Details",
    "Bekijk details": "Details ansehen",
    "Lees meer": "Mehr lesen",
    "Aantal": "Anzahl",
    "Samenvatting": "Zusammenfassung",
    "Besteloverzicht": "Bestellübersicht",
    "Subtotaal": "Zwischensumme",
    "Verzending": "Versand",
    "Gratis vanaf €100": "Kostenlos ab €100",
    "Leeg winkelwagen": "Warenkorb leeren",
    "Toegevoegd aan je winkelwagen.": "Zum Warenkorb hinzugefügt.",
    "Vul een geldig e-mailadres in.": "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    "Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op.": "Vielen Dank für Ihre Nachricht. Wir melden uns so schnell wie möglich bei Ihnen.",
    "Bedankt. Je ontvangt binnenkort inspiratie en acties van PlantBrothers.": "Vielen Dank. Sie erhalten bald Inspirationen und Angebote von PlantBrothers.",
  },
};

function normalizeText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function getTranslationMap(language) {
  return translations[language] || {};
}

function translateExact(value, language) {
  if (!value) return value;
  const normalized = normalizeText(value);
  if (!normalized) return value;
  const translated = getTranslationMap(language)[normalized];
  return translated || value;
}

function preserveWhitespace(source, translated) {
  const leading = source.match(/^\s*/)?.[0] || "";
  const trailing = source.match(/\s*$/)?.[0] || "";
  return `${leading}${translated}${trailing}`;
}

function shouldSkipNode(node) {
  const parent = node.parentElement;
  if (!parent) return true;
  if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) return true;
  return Boolean(parent.closest("[data-no-translate]"));
}

export function getCurrentLanguage() {
  const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
  return LANGUAGE_OPTIONS.some((item) => item.code === stored) ? stored : DEFAULT_LANGUAGE;
}

export function setCurrentLanguage(language) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, LANGUAGE_OPTIONS.some((item) => item.code === language) ? language : DEFAULT_LANGUAGE);
}

export function t(value, language = getCurrentLanguage()) {
  return translateExact(value, language);
}

export function applyTranslations(root = document.documentElement, language = getCurrentLanguage()) {
  const targetRoot = root === document ? document.documentElement : root;
  if (!targetRoot) return;

  document.documentElement.lang = language;

  const walker = document.createTreeWalker(targetRoot, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return shouldSkipNode(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    },
  });

  let textNode = walker.nextNode();
  while (textNode) {
    const sourceText = textSourceMap.get(textNode) ?? textNode.textContent;
    if (!textSourceMap.has(textNode)) {
      textSourceMap.set(textNode, sourceText);
    }

    const translated = translateExact(sourceText, language);
    if (translated !== sourceText) {
      textNode.textContent = preserveWhitespace(sourceText, translated);
    } else {
      textNode.textContent = sourceText;
    }

    textNode = walker.nextNode();
  }

  targetRoot.querySelectorAll("*").forEach((element) => {
    if (element.closest("[data-no-translate]")) return;

    let sourceAttributes = attributeSourceMap.get(element);
    if (!sourceAttributes) {
      sourceAttributes = {};
      attributeSourceMap.set(element, sourceAttributes);
    }

    TRANSLATABLE_ATTRIBUTES.forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;

      if (!(attribute in sourceAttributes)) {
        sourceAttributes[attribute] = element.getAttribute(attribute);
      }

      const sourceValue = sourceAttributes[attribute];
      const translated = translateExact(sourceValue, language);
      element.setAttribute(attribute, translated);
    });
  });
}
