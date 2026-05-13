# Implementation Plan & Checklist

Based on the client requests and the `rules.md` guidelines (Vanilla HTML/CSS/JS, no build step), here is the plan of action and current status:

## 1. Navigation / Header
*   [x] Update `src/data/site.js` navigation array to: Business, About Us, Contact, Sale, Shop.
*   [x] Style the `Sale` menu item to have a green background and white text in `src/styles/main.css` (Confirmed already exists in original codebase).
*   [x] Update the Mega Dropdown categories in `src/data/site.js` to match: Artificial plants, Artificial trees, Artificial hedge, Vases.
*   [x] Enhance visual preview logic in `src/scripts/main.js` and `src/components/layout.js` so hovering over categories displays the specific products (Image, Name) on the right (Confirmed logic already present).
*   [x] Make products in preview clickable linking directly to the product page.

## 2. Homepage (Hero section)
*   [x] Redesign the top hero section in `index.html` from a single static visual to a multi-image section (e.g., a dynamic grid or a CSS-based slider).
*   [x] Add text overlays per image indicating category or a USP.
*   [x] Ensure every image/overlay is an anchor tag (`<a>`) linking to the corresponding category or product to drive immediate conversion.

## 3. Chat function
*   [x] Integrate a floating bottom-right chat widget. (Will use a standard WhatsApp floating button script or a placeholder for Tawk.to/Tidio based on prior project context, making it simple and quick).
*   [x] Ensure it is visually clean and non-obtrusive.

## 4. Pop-up (10% discount)
*   [x] Create a new UI component for the popup in `src/components/layout.js` (or inject via `index.html`).
*   [x] Text: "Sign up for 10% discount" (or Dutch equivalent if context requires).
*   [x] Input field for email and a "Receive discount" CTA button.
*   [x] Implement logic in `src/scripts/main.js` to trigger the popup after 4 seconds using `setTimeout`, and track `localStorage` so it doesn't repeatedly annoy the user.

## 5. General Polish & Rules Compliance
*   [x] Maintain the sleek, modern, premium aesthetic matching the Forest Green / Sage / Off-white palette.
*   [x] Verify mobile responsiveness for the new mega-menu and the new hero gallery.
*   [x] Check that interactive elements (like the chat and popup) are easy to close and user-friendly.

---

### Progress Status
- **Current Phase**: Final QA & Deployment Prep
- **Completed**: Navigation, Hero, Chat, Popup, Localization, and MailerLite Marketing Automation.
- **Next Up**: Domain verification and Production launch.

### 6. Future Enhancements (Roadmap)
*   [ ] **Pot Pairing Recommendations**: Add a "Style it with" section for each product.
*   [ ] **Comparison Table**: "Real Plant vs. 4EverPlants" table.
*   [ ] **Abandoned Cart Recovery**: Enable MailerLite automation (sync logic is ready).
*   [ ] **Styling Guide Carousel**: High-res placement ideas.
