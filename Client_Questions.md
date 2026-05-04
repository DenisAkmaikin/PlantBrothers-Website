# Client Information Request

The following features and sections have been implemented using placeholder data to demonstrate the "Verdant Space" design system. Please provide the actual details to finalize the production version.

> [!IMPORTANT]
> To ensure the website is fully functional for launch, we need the following specific data points.

---

## 1. Core Contact & Business Info
These details appear in the header, footer, and contact pages.
- **WhatsApp**: Current: `+31 6 12 34 56 78`. Need: *Actual Business Number*.
- **Phone**: Current: `+31 (0)26 123 45 67`. Need: *Official Office Number*.
- **Email**: Current: `info@4everplants.nl`. Need: *Official Support Email*.
- **Address**: Current: `Eimerssingel-oost 25C, 6834CX Arnhem`. Need: *Physical office or showroom address*.
- **Showroom**: Current: "Showroom (op afspraak)". Is this correct? Should we list specific opening hours or appointment instructions?
- **Legal**: Need: *KVK Number* and *BTW (VAT) Number* for the footer.

## 2. E-commerce & Logistics
Crucial for the "Cart" and "Product Detail" experience.
- **Pricing**: Current prices are placeholders (e.g., €79, €229). Need: *Final Price List* per product.
- **Shipping Rates**: Currently says "Free above €100". Need: 
  - Exact threshold for free shipping.
  - Standard shipping cost for orders below threshold.
  - International shipping costs if applicable.
- **Delivery Times**: Currently says "Ordered before 16:00, delivered tomorrow". Need: *Actual fulfillment SLA*.
- **Stock Status**: Current labels like "Direct leverbaar" are static. Need: *Initial stock levels* or confirmation of drop-shipping lead times.

## 3. Digital Marketing & Integrations
Where should user data and payments go?
- **Stripe API**: Need: *Stripe Public/Secret Keys* (or access to the dashboard) to enable real payments.
- **Newsletter**: Currently just shows a success message. Need: *Integration choice* (Mailchimp, Klaviyo, Brevo, or just a custom email notification?).
- **Contact Form**: Need: *Recipient email* for project and general inquiries.
- **Google Analytics**: Need: *GA4 Measurement ID* (G-XXXXXXXXXX) to track visitors.
- **Social Media**: Need: *Links* to Instagram, Facebook, LinkedIn, Pinterest.

## 4. Trust & Social Proof
- **Client Logos**: Current: `Maison Nord`, `Studio Aster`, `Hotel Rivage`. Need: *Actual partner/client logos* or names to highlight.
- **Testimonials**: We currently have 3 mock reviews. Need: *Real customer quotes and names* to build trust.
- **Review Score**: Currently says "4.8/5 based on 2000+ reviews". Need: *Actual review platform link* (Trustpilot, Google) and current score.

## 5. Page-Specific Content
- **Zakelijk (Business)**: 
  - We list benefits like "Efficiency & Sfeer". Are there specific business USPs (e.g., "Leasing options", "Large volume discounts") we should add?
  - Need: *Specific project examples or case studies* if available.
- **Legal Pages**: We have placeholder links for:
  - *Algemene voorwaarden* (Terms of Service)
  - *Privacybeleid* (Privacy policy)
  - *Verzending & retourneren* (Shipping & returns)
  - Need: *Text content* or PDF documents for these pages.
- **Blog Content**: The "Inspiration" section uses 3 placeholder posts. Need: *Actual blog titles and short introductions*.

## 6. Multi-language Strategy
Currently supporting **Dutch (NL)**, **English (EN)**, and **German (DE)**.
- **Translations**: Are the current automated translations in `src/data/translations.js` acceptable, or should we refine them with the client's internal copywriters?
- **Default Language**: Confirm if Dutch should remain the default landing language.

---

> [!TIP]
> Providing this information in a single batch (e.g., a shared Google Doc or Excel sheet) will allow us to update the entire site in one go and prepare for the final deployment.
