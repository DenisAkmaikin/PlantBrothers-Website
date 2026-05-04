# 4EverPlants - Website Ontbrekende Informatie & Checklist

Na een volledige scan van de huidige website (naast de Stripe/Checkout integratie), is hier een gedetailleerd overzicht van alle ontbrekende informatie, tijdelijke (dummy) teksten en benodigde integraties die de klant nog moet aanleveren of die nog gebouwd moeten worden.

## 1. Bedrijfs- & Contactgegevens (Momenteel dummy data)
De volgende gegevens bevatten momenteel tijdelijke waarden of spreken elkaar tegen. Dit moet worden aangevuld met de echte bedrijfsgegevens:
- **E-mailadres:** Staat momenteel op `info@4everplants.nl` (in site config) en `info@4everplants.nl` (in Privacy Policy).
- **Telefoonnummer:** Staat momenteel op `+31 (0)26 123 45 67`.
- **Adres:** `Eimerssingel-oost 25C, 6834CX Arnhem` (terwijl Privacy Policy "Arnhem, Nederland" zegt). Dit moet uniform en correct zijn.
- **KVK Nummer:** In Privacy Policy staat `99813742` (Verifiëren of dit de echte is).
- **BTW Nummer:** In Privacy Policy staat `NL003787431B61` (Verifiëren of dit de echte is).
- **Social Media Links:** Er zijn momenteel geen links naar Instagram, Facebook, LinkedIn, of Pinterest geïntegreerd.

## 2. Ontbrekende Pagina's (Legal & E-commerce Standaard)
In de footer staan links naar pagina's die nog niet fysiek bestaan en momenteel doorverwijzen naar `/contact.html`:
- **Algemene Voorwaarden (Terms & Conditions):** Absoluut noodzakelijk voor een webshop. 
- **Verzending & Retourneren:** Ontbreekt. Hierin moeten verzendkosten, levertijden en het 14-dagen retourbeleid gedetailleerd worden beschreven.
- **Veelgestelde Vragen (FAQ):** Hoewel er een FAQ sectie op de contactpagina staat, linkt de footer naar een FAQ pagina die niet apart bestaat. (Aan te raden om hier een aparte `/faq.html` van te maken of de footer correct te laten scrollen/linken).
- **Blog Pagina / Artikelen:** De links naar 'Blog' (in de footer en de artikelen op de homepage) verwijzen momenteel allemaal naar `/contact.html`. Als er een blog komt, moeten deze pagina's ontworpen en gevuld worden met echte content.

## 3. Ontbrekende Functionaliteiten & Backend Gekoppelde Zaken
De visuele formulieren zijn aanwezig, maar missen de "achterkant" om daadwerkelijk te functioneren:
- **Contactformulier:** Werkt momenteel alleen visueel (geeft een succesmelding in Javascript). Dit moet nog gekoppeld worden aan een e-mail dienst (bijv. Formspree of vergelijkbaar).
- **Nieuwsbrief aanmelding (Footer):** Werkt alleen visueel. Moet gekoppeld worden aan een e-mail marketing platform (bijv. Mailchimp of Klaviyo).
- **Kortings-Popup Formulier:** Zelfde als hierboven. De couponcode verzending gebeurt niet echt naar een e-mail, het formulier vangt momenteel geen e-mailadressen op in een database.
- **Cookie Banner (AVG/GDPR):** Ontbreekt. De privacy policy vermeldt dat de website analytische cookies gebruikt, maar er is geen verplichte cookie toestemmings pop-up / banner aanwezig.
- **Sitemap.xml & Robots.txt:** Niet aanwezig. Noodzakelijk voor goede Google SEO indexatie.

## 4. Content & Marketing Claim Verificatie
Er staat momenteel veel placeholder content op de website die prachtig is voor het design, maar vervangen moet worden door reële data als de webshop live gaat:
- **Klantbeoordelingen / Reviews:** De website claimt "4.8/5 sterren gebaseerd op 2000+ reviews" en toont geschreven reviews van "Sanne Vermeer", "Mila de Graaf", "Bart Evers", etc. *Let op: Als dit een net gestart bedrijf is, kunnen deze claims juridisch problematisch zijn als ze als dummy-data blijven staan.* 
- **Bekende Klanten / Trust Logos:** De logo band met namen als "Maison Nord", "Studio Aster", "Hotel Rivage". Dit moeten uiteraard de echte B2B klanten worden.
- **Product Details & Prijzen:** Check of de specificaties (bijv. "Ø 20 cm", "Hoogte 150cm", materiaal "PE en textielmix") en de doorgehaalde ("Compare at") prijzen kloppen in de `site.js` file met de uiteindelijke werkelijkheid van de Prijzen PDF.
- **Afbeeldingen:** Bevestiging nodig of alle geplaatste afbeeldingen (in `/assets/images/product-images/`) van de werkelijke producten zijn, zodat de klant het juiste verwachtingspatroon krijgt.

---
**Actiepunt voor de klant:** Breng deze informatie in kaart (kopieer de benodigde teksten en echte e-mailadressen/links) zodat deze geïmplementeerd kunnen worden.
