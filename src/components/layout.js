import { announcementItems, footerGroups, navigation, shopCategories, siteConfig } from "../data/site.js?v=20260317c";
import { getCurrentLanguage, LANGUAGE_OPTIONS } from "../data/translations.js?v=20260317c";

function buildNavigationLinks() {
  return navigation
    .map(
      (item) => `
        <li>
          <a class="nav-link ${item.highlight ? "nav-link-sale sale-badge" : ""}" data-nav-link href="${item.href}">${item.label}</a>
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
          ${group.title}
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
                      <img class="mega-menu-product-image" src="${product.image}" alt="${product.label}" loading="lazy" />
                    </span>
                    <span class="mega-menu-product-name">${product.label}</span>
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
          <span class="mobile-submenu-heading">${group.title}</span>
          <ul class="mobile-submenu-nested">
            ${group.links.map((link) => `<li><a class="mobile-submenu-link" href="${link.href}">${link.label}</a></li>`).join("")}
          </ul>
        </li>
      `,
    )
    .join("");
}

function buildAnnouncementBar() {
  const content = announcementItems
    .map((item, index) => `<span class="announcement-item" style="--announcement-index: ${index};">${item}</span>`)
    .join("");

  return `
    <section class="usp-announcement-bar" aria-label="Belangrijkste voordelen">
      <div class="usp-announcement-bar__viewport">
        <p class="usp-announcement-bar__static">Onderhoudsvrije planten</p>
        <div class="usp-announcement-bar__rotator" aria-live="polite">${content}</div>
      </div>
    </section>
  `;
}

export function renderHeader() {
  const currentLanguage = getCurrentLanguage();

  return `
    ${buildAnnouncementBar()}
    <header class="site-header" data-site-header>
      <div class="container header-inner">
        <a class="brand-mark brand-wordmark" href="/index.html" aria-label="${siteConfig.brand} home">
          <span class="brand-wordmark-plant">Plant</span><span class="brand-wordmark-brothers">Brothers</span>
        </a>
        <nav class="desktop-nav" aria-label="Hoofdnavigatie">
          <ul>
            <li class="nav-item-mega" data-shop-nav>
              <button class="nav-link nav-link-button" type="button" aria-expanded="false" data-shop-trigger>
                Shop
              </button>
              <div class="mega-menu" data-shop-menu>
                <div class="mega-menu-header">
                  <div>
                    <p class="eyebrow">Shop</p>
                    <h2>Ontdek onze artificial collectie</h2>
                  </div>
                  <a class="text-link" href="/collectie.html">Bekijk alles</a>
                </div>
                <div class="mega-menu-layout">
                  <div class="mega-menu-category-list" aria-label="Shop categorieën">
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
        </nav>
        <div class="header-actions">
          <div class="language-switcher" data-language-switcher data-no-translate>
            <label class="sr-only" for="language-select">Selecteer taal</label>
            <select id="language-select" class="language-switcher__select" data-language-select aria-label="Selecteer taal">
              ${LANGUAGE_OPTIONS.map(
                (language) =>
                  `<option value="${language.code}"${language.code === currentLanguage ? " selected" : ""}>${language.flag} ${language.label}</option>`,
              ).join("")}
            </select>
          </div>
          <a class="header-icon-button" href="/collectie.html" aria-label="Zoeken">
            <span class="search-icon" aria-hidden="true"></span>
          </a>
          <a class="header-icon-button" href="/contact.html" aria-label="Account">
            <span class="account-icon" aria-hidden="true"></span>
          </a>
          <a class="header-icon-button header-icon-button--cart" href="/cart.html" aria-label="Winkelwagen">
            <span class="cart-icon" aria-hidden="true"></span>
            <span class="cart-count" data-cart-count>0</span>
          </a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle>
            <span></span>
            <span></span>
            <span></span>
            <span class="sr-only">Open menu</span>
          </button>
        </div>
      </div>
      <div class="mobile-menu" id="mobile-menu" data-mobile-menu>
        <nav aria-label="Mobiele navigatie">
          <ul>
            <li class="mobile-submenu-item">
              <button class="mobile-submenu-toggle" type="button" aria-expanded="false" data-mobile-submenu-toggle>
                Shop
              </button>
              <ul class="mobile-submenu" data-mobile-submenu>
                ${buildMobileShopLinks()}
              </ul>
            </li>
            ${buildNavigationLinks()}
          </ul>
        </nav>
        <div class="mobile-utility-row">
          <a class="header-icon-button" href="/collectie.html" aria-label="Zoeken">
            <span class="search-icon" aria-hidden="true"></span>
          </a>
          <a class="header-icon-button" href="/contact.html" aria-label="Account">
            <span class="account-icon" aria-hidden="true"></span>
          </a>
          <a class="header-icon-button header-icon-button--cart" href="/cart.html" aria-label="Winkelwagen">
            <span class="cart-icon" aria-hidden="true"></span>
            <span class="cart-count" data-cart-count>0</span>
          </a>
        </div>
      </div>
    </header>
  `;
}

export function renderNewsletter() {
  return `
    <section class="newsletter-section section">
      <div class="container newsletter-shell reveal">
        <div>
          <p class="eyebrow">Nieuwsbrief</p>
          <h2>Ontvang stylinginspiratie, nieuwe collecties en exclusieve acties</h2>
          <p>Schrijf je in voor premium interieurinspiratie, praktische tips en aanbiedingen op zorgvuldig geselecteerde artificial plants.</p>
        </div>
        <form class="newsletter-form" data-newsletter-form novalidate>
          <label class="sr-only" for="newsletter-email">E-mailadres</label>
          <input id="newsletter-email" name="email" type="email" placeholder="E-mailadres" required />
          <button class="button button-primary" type="submit">Inschrijven</button>
          <p class="form-feedback" data-form-feedback aria-live="polite"></p>
        </form>
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
          <a class="brand-mark footer-brand" href="/index.html">
            <img class="brand-logo brand-logo-footer" src="/assets/images/PlantBrothersTextLogo.png" alt="${siteConfig.brand}" />
          </a>
          <p class="footer-copy">Premium artificial plants die onmogelijk echt lijken. Gemaakt voor mensen die sfeer willen zonder onderhoud.</p>
        </div>
        ${footerGroups
          .map(
            (group) => `
              <div>
                <h3>${group.title}</h3>
                <ul class="footer-list">
                  ${group.links.map((link) => `<li><a href="${link.href}">${link.label}</a></li>`).join("")}
                </ul>
              </div>
            `,
          )
          .join("")}
      </div>
      <div class="container footer-bottom">
        <p>&copy; ${year} ${siteConfig.brand}. Alle rechten voorbehouden.</p>
      </div>
    </footer>
  `;
}
