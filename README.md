# 4EverPlants

Premium, responsive merkwebsite voor hoogwaardige kunstplanten. De site is opgebouwd met semantische HTML, modulaire JavaScript-bestanden, herbruikbare componenten en een centrale dataset als basis voor latere webshopuitbreiding.

De huidige versie bevat ook:
- productdetailpagina's met reviews en `in winkelwagen`-actie
- een lokale winkelwagen op basis van `localStorage`
- servicebars, trust-signalen en reviewgedreven productpresentatie

## Projectstructuur

```text
.
|-- assets/
|   `-- images/
|-- src/
|   |-- components/
|   |-- data/
|   |-- scripts/
|   `-- styles/
|-- index.html
|-- over-ons.html
|-- collectie.html
|-- zakelijk.html
|-- contact.html
|-- product-detail.html
`-- README.md
```

## Lokaal starten

Omdat het project ES-modules gebruikt, start je het via een lokale server.

```bash
python3 -m http.server 4173
```

Open daarna:

```text
http://localhost:4173
```

## Wat je makkelijk kunt aanpassen

- Teksten, contactgegevens, categorieën, USP's, reviews en productdata:
  `src/data/site.js`
- Winkelwagenlogica en prijsformattering:
  `src/scripts/cart-store.js`
- Gedeelde header, footer en nieuwsbrief:
  `src/components/layout.js`
- Kaartcomponenten voor categorieën, producten en testimonials:
  `src/components/cards.js`
- Styling, kleuren, typografie en responsive gedrag:
  `src/styles/main.css`
- Pagina-opbouw en sectievolgorde:
  `index.html`, `over-ons.html`, `collectie.html`, `zakelijk.html`, `contact.html`
- Placeholder-afbeeldingen:
  `assets/images/`
  Let op: vervang deze door eigen of gelicenseerde fotografie. Gebruik geen beelden van andere webshops zonder toestemming.

## Voorbereid op uitbreiding

- `product-detail.html` is een basis voor toekomstige productpagina's.
- `cart.html` is een basis voor een latere checkout-flow.
- Productdata staat centraal in `src/data/site.js`, zodat een latere winkelmand- of CMS-koppeling logisch blijft.
- De collectiepagina heeft al categorie-filters en productcards die eenvoudig uit te breiden zijn.
