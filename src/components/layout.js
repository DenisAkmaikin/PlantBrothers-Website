import { announcementItems, footerGroups, mainUSPs, navigation, shopCategories, siteConfig } from "../data/site.js?v=20260511_v1";
import { getCurrentLanguage, LANGUAGE_OPTIONS, t } from "../data/translations.js?v=20260511_v1";

function buildNavigationLinks(isMobile = false) {
  return navigation
    .filter((item) => isMobile ? !item.highlight : true)
    .map(
      (item) => `
        <li>
          <a class="nav-link ${item.highlight ? "nav-link-sale sale-badge" : ""}" data-nav-link href="${item.href}">
            ${t(item.label)}
            ${isMobile ? '<span class="material-symbols-outlined">chevron_right</span>' : ""}
          </a>
        </li>
      `,
    )
    .join("");
}

function buildShopCategoryButtons() {
  return shopCategories
    .map(
      (group, index) => `
        <button
          class="mega-menu-category-button ${index === 0 ? "is-active" : ""}"
          type="button"
          data-shop-category-trigger
          data-shop-category="${group.id}"
          aria-pressed="${index === 0 ? "true" : "false"}"
        >
          ${t(group.title)}
        </button>
      `,
    )
    .join("");
}

function buildShopPanels() {
  return shopCategories
    .map(
      (group, index) => `
        <div class="mega-menu-panel ${index === 0 ? "is-active" : ""}" data-shop-panel="${group.id}">
          <div class="mega-menu-product-grid">
            ${group.products
              .map(
                (product) => `
                  <a class="mega-menu-product-card" href="${product.href}">
                    <span class="mega-menu-product-image-wrap">
                      <img class="mega-menu-product-image" src="${product.image}" alt="${t(product.label)}" loading="lazy" />
                    </span>
                    <span class="mega-menu-product-name">${t(product.label)}</span>
                  </a>
                `,
              )
              .join("")}
          </div>
        </div>
      `,
    )
    .join("");
}

function buildMobileShopLinks() {
  return shopCategories
    .map(
      (group) => `
        <li class="mobile-submenu-group">
          <span class="mobile-submenu-heading">${t(group.title)}</span>
          <ul class="mobile-submenu-nested">
            ${group.links.map((link) => `<li><a class="mobile-submenu-link" href="${link.href}">${t(link.label)}</a></li>`).join("")}
          </ul>
        </li>
      `,
    )
    .join("");
}

function buildAnnouncementBar() {
  const content = announcementItems
    .map((item) => `<span class="announcement-item">${t(item)}</span>`)
    .join("");

  return `
    <section class="usp-announcement-bar" aria-label="${t("Key benefits")}">
      <div class="usp-announcement-bar__viewport">
        <p class="usp-announcement-bar__static">${t("Free shipping from €100")}</p>
        <div class="usp-announcement-bar__rotator-wrap">
          <div class="usp-announcement-bar__rotator">
            ${content}
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderHeader() {
  const currentLanguage = getCurrentLanguage();

  return `
    <header class="glass-nav" data-site-header>
      ${buildAnnouncementBar()}
      <nav class="container nav-container">
        <div class="nav-left">
          <a class="nav-brand" href="/index.html" aria-label="${siteConfig.brand} home">
            <img class="brand-logo" src="/assets/images/4EverPlantsTextLogo.png" alt="4EverPlants" style="height: 32px; width: auto;" />
          </a>
          <div class="desktop-nav" aria-label="Hoofdnavigatie">
            <ul>
              <li class="nav-item-mega" data-shop-nav>
                <button class="nav-link" type="button" aria-expanded="false" data-shop-trigger>
                  ${t("Shop")}
                </button>
                <div class="mega-menu" data-shop-menu>
                  <div class="mega-menu-header">
                    <div>
                      <p class="eyebrow">${t("Shop")}</p>
                      <h2 class="text-xl">${t("Discover our artificial collection")}</h2>
                    </div>
                    <a class="text-link" href="/collectie.html">${t("View all")}</a>
                  </div>
                  <div class="mega-menu-layout">
                    <div class="mega-menu-category-list" aria-label="${t("Shop categories")}">
                      ${buildShopCategoryButtons()}
                    </div>
                    <div class="mega-menu-preview-pane">
                      ${buildShopPanels()}
                    </div>
                  </div>
                </div>
              </li>
              ${buildNavigationLinks()}
            </ul>
          </div>
        </div>

        <div class="nav-actions">
          <div class="language-switcher-custom hidden-mobile" data-language-dropdown data-no-translate>
            <button type="button" class="language-switcher-btn" data-language-btn aria-haspopup="true" aria-expanded="false">
              <span class="lang-flag">${LANGUAGE_OPTIONS.find(l => l.code === currentLanguage)?.flag || '🇬🇧'}</span>
              <span class="lang-code">${currentLanguage.toUpperCase()}</span>
              <span class="material-symbols-outlined" style="font-size: 16px;">expand_more</span>
            </button>
            <div class="language-switcher-menu" data-language-menu hidden>
              ${LANGUAGE_OPTIONS.map((language) => `
                <button type="button" class="language-switcher-option ${language.code === currentLanguage ? 'is-active' : ''}" data-lang-code="${language.code}">
                  <span class="lang-flag">${language.flag}</span>
                  <span class="lang-label">${language.label}</span>
                  ${language.code === currentLanguage ? '<span class="material-symbols-outlined lang-check">check</span>' : ''}
                </button>
              `).join("")}
            </div>
          </div>
          <a class="nav-icon-btn hidden-mobile" href="/support.html" aria-label="${t("Support")}">
            <span class="material-symbols-outlined nav-icon" aria-hidden="true">support_agent</span>
          </a>
          <a class="nav-icon-btn nav-icon-btn--cart" href="/cart.html" aria-label="${t("Cart")}">
            <span class="material-symbols-outlined nav-icon" aria-hidden="true">shopping_cart</span>
            <span class="cart-badge" data-cart-count>0</span>
          </a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle>
            <span></span>
            <span></span>
            <span></span>
            <span class="sr-only">${t("Open menu")}</span>
          </button>
        </div>
      </nav>

      <div class="mobile-menu" id="mobile-menu" data-mobile-menu>
        <nav aria-label="Mobiele navigatie">
          <ul>
            <li><a class="nav-link nav-link--sale" href="/sale.html" style="color: #1b4332 !important; font-weight: 600 !important;">${t("Sale")}<span class="material-symbols-outlined">chevron_right</span></a></li>
            ${buildNavigationLinks(true)}
            <li class="mobile-menu-divider"></li>
            <li><a class="nav-link" href="/support.html">${t("Support Center")}<span class="material-symbols-outlined">chevron_right</span></a></li>
            <li class="mobile-menu-languages">
              <p class="mobile-submenu-heading">${t("Language")}</p>
              <div class="mobile-language-grid">
                ${LANGUAGE_OPTIONS.map((language) => `
                  <button type="button" class="mobile-lang-btn ${language.code === currentLanguage ? 'is-active' : ''}" data-lang-code="${language.code}">
                    <span class="lang-flag">${language.flag}</span>
                    <span class="lang-label">${language.label}</span>
                  </button>
                `).join("")}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `;
}

export function renderNewsletter() {
  return `
    <section class="newsletter-section section">
      <div class="container">
        <div class="newsletter-bento reveal">
          <div class="newsletter-content-inner">
            <p class="eyebrow uppercase-spaced">${t("The Green Journal")}</p>
            <h2>${t("Receive styling inspiration and exclusive offers")}</h2>
            <p>${t("Sign up for premium interior inspiration and enjoy special member benefits and styling tips.")}</p>
            <form class="newsletter-form" data-newsletter-form novalidate>
              <label class="sr-only" for="newsletter-email">${t("Email address")}</label>
              <input id="newsletter-email" name="email" type="email" placeholder="${t("Email address")}" required />
              <button class="btn btn-primary" type="submit">${t("Sign up")}</button>
              <p class="form-feedback" data-form-feedback aria-live="polite"></p>
            </form>
          </div>
          <div>
            <img class="newsletter-image" src="/assets/images/product-images/artificial-olivetree-studio.png" alt="${t("Botanical Texture")}" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderFooter() {
  const year = new Date().getFullYear();

  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand-col">
          <a class="footer-brand" href="/index.html" aria-label="${siteConfig.brand} ${t("home")}">
            <img class="brand-logo" src="/assets/images/4EverPlantsTextLogo.png" alt="4EverPlants" style="height: 32px; width: auto;" />
          </a>
          <p class="footer-copy" style="color: var(--color-on-surface-variant); margin-top: 1rem;">${t("Premium botanical reproductions. Created for people who seek atmosphere without maintenance and complexity.")}</p>
        </div>
        ${footerGroups
          .map(
            (group) => `
              <div>
                <h3 style="font-size: 1rem; margin-bottom: 1rem;">${t(group.title)}</h3>
                <ul class="footer-list">
                  ${group.links.map((link) => `<li><a href="${link.href}" style="color: var(--color-on-surface-variant);">${t(link.label)}</a></li>`).join("")}
                </ul>
              </div>
            `,
          )
          .join("")}
      </div>
      <div class="container footer-bottom">
        <p>&copy; ${year} ${siteConfig.brand}. ${t("All rights reserved.")}</p>
      </div>
    </footer>
  `;
}

export function renderFloaters() {
  return `
    <!-- Floating WhatsApp Button -->
    <a href="https://wa.me/31612345678" class="whatsapp-fab" target="_blank" rel="noopener noreferrer" aria-label="Chat met ons via WhatsApp">
      <svg viewBox="0 0 24 24" fill="currentColor" style="width: 32px; height: 32px;">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
    
    <!-- Cart Toast (Nike style) -->
    <div class="cart-toast-overlay" data-cart-toast aria-hidden="true">
      <div class="cart-toast">
        <div class="cart-toast-header">
          <div class="cart-toast-title">
            <span class="material-symbols-outlined cart-toast-check">check_circle</span>
            <span data-i18n="Added to Cart">Toegevoegd aan winkelwagen</span>
          </div>
          <button type="button" class="cart-toast-close" data-cart-toast-close aria-label="${t("Close")}">✕</button>
        </div>
        
        <div class="cart-toast-body" data-cart-toast-content>
          <!-- Dynamic Content -->
        </div>

        <div class="cart-toast-footer">
          <a href="/cart.html" class="btn btn-secondary btn-full">${t("View Cart")} (<span data-cart-count-toast>0</span>)</a>
          <a href="/cart.html" class="btn btn-primary btn-full">${t("Checkout")}</a>
        </div>
      </div>
    </div>

    <!-- Discount Popup -->
    <div class="discount-popup-overlay" data-discount-popup aria-hidden="true" role="dialog">
      <div class="discount-popup-card">
        <button type="button" aria-label="${t("Close popup")}" class="popup-close-btn" data-popup-close>✕</button>
        
        <div class="popup-content-side">
          <div class="popup-logo-wrap">
             <img src="/assets/images/4EverPlantsTextLogo.png" alt="4EverPlants" class="popup-brand-logo" />
          </div>
          <h2 class="popup-title">${t("You have 10% off!")}</h2>
          
          <form class="popup-form" data-popup-form novalidate>
            <div class="form-field">
              <label class="sr-only" for="popup-email">${t("Email address")}</label>
              <input id="popup-email" type="email" name="email" placeholder="${t("Email")}" required />
            </div>
            
            <p class="popup-disclaimer">${t("No spam, only the best deals. Unsubscribe anytime.")}</p>
            
            <button type="submit" class="btn btn-primary popup-submit-btn">${t("Claim discount")}</button>
            <p class="form-feedback" data-form-feedback aria-live="polite"></p>
            
            <button type="button" class="popup-no-thanks" data-popup-close>${t("No, I don't want a discount")}</button>
          </form>
        </div>

        <div class="popup-image-side"></div>
      </div>
    </div>
    
    <!-- Cookie Consent Banner -->
    <div class="cookie-banner-wrap" data-cookie-banner hidden>
      <div class="container">
        <div class="cookie-banner-card content-surface">
          <div class="cookie-content">
            <span class="material-symbols-outlined cookie-icon">cookie</span>
            <p>${t("We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.")} <a href="/privacy-policy.html">${t("Learn more")}</a></p>
          </div>
          <div class="cookie-actions">
            <button type="button" class="btn btn-secondary btn-sm" data-cookie-decline>${t("Decline")}</button>
            <button type="button" class="btn btn-primary btn-sm" data-cookie-accept>${t("Accept")}</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderUspStrip() {
  return `
    <div class="usp-strip">
      <div class="container usp-strip-grid">
        ${mainUSPs
          .map(
            (usp) => `
          <div class="usp-strip-item">
            <span class="material-symbols-outlined usp-icon">${usp.icon}</span>
            <span class="usp-label">${t(usp.title)}</span>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `;
}

export function renderFeaturesSection() {
  // Top 3 USPs for storytelling
  const top3 = mainUSPs.slice(0, 3);
  
  return `
    <section class="section features-section">
      <div class="container">
        <div class="features-grid">
          ${top3
            .map(
              (usp, index) => `
            <div class="feature-card reveal ${index > 0 ? `delay-${index}` : ""}">
              <div class="feature-icon-wrap">
                <span class="material-symbols-outlined">${usp.icon}</span>
              </div>
              <h3>${t(usp.title)}</h3>
              <p>${t(usp.description)}</p>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

export function renderProductUSPs() {
  return `
    <div class="product-usp-grid">
      ${mainUSPs
        .map(
          (usp) => `
        <div class="product-usp-item">
          <span class="material-symbols-outlined">${usp.icon}</span>
          <span>${t(usp.title)}</span>
        </div>
      `,
        )
        .join("")}
    </div>
  `;
}
