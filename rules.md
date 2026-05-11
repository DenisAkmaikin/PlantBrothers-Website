# 4EverPlants Website - Development Rules & Structure

This document serves as the "ground truth" for the 4EverPlants website project. It outlines the architecture, design patterns, and development guidelines to ensure consistency and maintainability over the long term.

## 🏗 Project Architecture

### 1. Technology Stack
- **Core**: Vanilla HTML5, Vanilla CSS3, Vanilla JavaScript (ES Modules).
- **Build System**: None. The project uses standard web technologies that run directly in the browser.
- **State Management**: Custom `cart-store.js` using `localStorage` and custom events (`cart:updated`).
- **I18n**: Custom translation system in `src/data/translations.js`.

### 2. Directory Structure
```text
/
├── assets/             # Static assets (images, icons, videos)
├── src/
│   ├── components/     # JS-based UI fragments (template literals)
│   ├── data/           # Content data (site.js, translations.js)
│   ├── scripts/        # Logic (main.js, cart-store.js)
│   └── styles/         # Global and component styles (main.css)
├── *.html              # Page views (index, collectie, cart, etc.)
└── rules.md            # This document
```

### 3. Execution Flow
1. **HTML Loading**: The browser loads the static HTML file.
2. **Script Initialization**: `src/scripts/main.js` is loaded as a module.
3. **Data Injection**: `main.js` imports data from `src/data/site.js`.
4. **Component Mounting**: 
   - `main.js` identifies "root" elements using `data-*` attributes (e.g., `data-header-root`).
   - It calls render functions from `src/components/` (e.g., `renderHeader()`).
   - The returned HTML strings are injected into the DOM.
5. **Hydration**: `main.js` initializes event listeners, animations (`IntersectionObserver`), and interactive components.

---

## 🎨 Design System & Aesthetics

### 1. Color Palette
- **Primary**: Forest Green (`--color-forest-900: #163126`, `--color-forest-700: #2e5c49`)
- **Accent**: Sage (`#7f9c8d`), Moss (`#b9c8bb`)
- **Backgrounds**: Off-white (`#f7f3ec`), Paper (`#fffdf8`), Sand (`#dccfbf`)
- **Text**: Ink (`#1d241f`), Muted (`#5f695f`)

### 2. Typography
- **Headings (h1, h2, h3)**: `Iowan Old Style`, Serif. Weight: 600. Letter-spacing: -0.03em.
- **Body & Controls**: `Avenir Next`, Sans-serif. Line-height: 1.6.

### 3. UI Elements
- **Border Radius**: XL: 36px, LG: 28px, MD: 22px, SM: 16px.
- **Shadows**: Soft and deep (`--shadow-card`, `--shadow-hero`).
- **Transitions**: Smooth, using `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Reveal Animations**: Use the `.reveal` class on elements to trigger a fade-up animation when they enter the viewport.

---

## 🛠 Development Guidelines

### 1. Component Creation
- Components should be functions that return template literals (HTML strings).
- Use `data-*` attributes for DOM selection instead of classes where possible for JS hooks.
- Keep styles in `src/styles/main.css` using BEM-like naming conventions or semantic class names.

### 2. Data Management
- Content should be decoupled from logic. Add new products, FAQs, or testimonials to `src/data/site.js`.
- Always provide translations in `src/data/translations.js` for any new UI text.

### 3. Shopping Cart & Stripe
- The cart state is global and stored in `localStorage` via `cart-store.js`.
- **Future Stripe Integration**: Payment logic should be integrated into the `cart.html` logic flow. Checkout sessions will likely be handled via a serverless function or a simple backend that interacts with the `cart-store` data.

### 4. Code Quality
- **Semantic HTML**: Always use correct tags (`<article>`, `<section>`, `<nav>`).
- **Vanilla Only**: Avoid adding heavy libraries (React, Vue, jQuery) unless absolutely necessary. Maintain the current performance-first, dependency-free approach.
- **Dutch First**: The primary language of the codebase comments and internal logic is English, but the default UI language is Dutch (`nl`).
- **Content Integrity**: NEVER remove existing information, products, or descriptions unless explicitly requested. All changes must preserve factual accuracy and existing assets.

### 5. Brand Assets
- **Logo Preservation**: Brand logos and wordmarks must remain consistent. Always use the paths defined in `src/components/layout.js` (`/assets/images/4EverPlantsTextLogo.png`).
- **Factual Accuracy**: Ensure that any changes to section headers or USPs do not conflict with the existing brand identity or factual details about the products.

## 📦 Business & Shipping Logistics

### 1. Company Information
- **KvK:** 99813742
- **BTW:** NL003787431B61
- **Address:** Eimerssingel-oost 25C, 6834CX, Arnhem
- **Contact:** info@4everplants.nl / +31 (0)26 123 45 67 - replace by real one.

### 2. Shipping Policy
- **NL (Core Market):** Free shipping over €100. Shipping cost €6.95 for orders under €100. Delivery time: 1-2 business days.
- **Belgium & Germany:** Free shipping over €100. Shipping cost €8.95 for orders under €100. Delivery time: 2-3 business days.
- **Other EU Countries:** Free shipping over €150. Shipping cost €12.95 - €19.95. Delivery time: 3-5 business days.
- **Outside EU:** Shipping cost from €25. Customs and import duties are for the customer. Delivery time: 5-10 business days.
- **Store Policies:** 
  - Show "Gratis verzending vanaf €100" on Banners and Product Pages.
  - Cart indicator: "Nog €X tot gratis verzending".
  - USP: "Voor 16:00 besteld is morgen in huis".

### 3. Warranty, Returns & Cooling-off Period
- **Warranty:** Standard 1-year manufacturer warranty on all artificial plants (covers manufacturing defects, structural looseness). Solution through replacement or repair.
- **Cooling-off Period:** 14 days right of withdrawal without reasoning. After cancellation, another 14 days to return the product.
- **Return Conditions:** Item in original condition and packaging. Only unpacked for inspection. Not used or damaged.
- **Return Costs:** Covered by the customer, unless the product is damaged or incorrectly delivered.
- **Refunds:** Within 14 days after return notification, via the original payment method.
- **Damaged Goods:** Customer must directly email a photo. We ensure quick replacement or solution.
- **Exchanges:** Place a new order and return the old product for a refund.

---

## 🤖 AI Assistant Protocol

### 1. Verification & Browser Usage
- **DO NOT** use browser tools (Chrome, screenshots, browser subagents, etc.) for verification.
- All verification of UI, layout, and logic is performed manually by the USER.
- Trust the code changes and rely on the USER's feedback for validation.
- Focus on code quality and implementation details within the workspace.

---

## 📈 Long-term Goals
- **SEO Optimization**: Maintain high accessibility scores and meta tags.
- **Performance**: Keep the "no build step" simplicity while ensuring assets are optimized.
- **Visual Consistency**: Any new section must match the "Premium Nature" aesthetic established in `main.css`.
