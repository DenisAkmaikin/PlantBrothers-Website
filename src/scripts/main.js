import {
  artificialPlantInfo,
  blogPosts,
  businessBenefits,
  categories,
  comparisonPoints,
  faqs,
  featuredProducts,
  shippingPolicy,
  returnPolicy,
  serviceHighlights,
  testimonials,
  trustLogos,
  uspItems,
  why4EverPlants,
} from "../data/site.js?v=20260503";
import {
  clearCart,
  formatPrice,
  getCart,
  getCartCount,
  updateQuantity,
  addToCart,
} from "./cart-store.js?v=20260503";
import {
  createBlogCard,
  createCategoryCard,
  createFaqItem,
  createProductCard,
  createTestimonialCard,
} from "../components/cards.js?v=20260503";
import { createProductImageComponent } from "../components/product-image.js?v=20260503";
import { renderFooter, renderHeader, renderNewsletter, renderFloaters, renderUspStrip, renderFeaturesSection, renderProductUSPs } from "../components/layout.js?v=20260503";
import { applyTranslations, getCurrentLanguage, setCurrentLanguage, t } from "../data/translations.js?v=20260503";

function mountLayout() {
  const headerRoot = document.querySelector("[data-header-root]");
  const newsletterRoot = document.querySelector("[data-newsletter-root]");
  const footerRoot = document.querySelector("[data-footer-root]");
  const popupRoot = document.querySelector("[data-popup-root]");
  const uspStripRoot = document.getElementById("usp-strip-root");
  const featuresRoot = document.getElementById("features-root");

  if (headerRoot) headerRoot.innerHTML = renderHeader();
  if (newsletterRoot) newsletterRoot.innerHTML = renderNewsletter();
  if (footerRoot) footerRoot.innerHTML = renderFooter();
  if (popupRoot) popupRoot.innerHTML = renderFloaters();
  if (uspStripRoot) uspStripRoot.innerHTML = renderUspStrip();
  if (featuresRoot) featuresRoot.innerHTML = renderFeaturesSection();
}

function markActiveNav() {
  const path = window.location.pathname.replace(/\/$/, "") || "/index.html";
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    const target = new URL(link.href, window.location.origin).pathname.replace(/\/$/, "");
    if (path === target || (path === "" && target === "/index.html")) {
      link.classList.add("is-active");
    }
  });
}

function getCutoffStatus() {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();
  
  // Cutoff is 16:00
  if (hour < 16 && day >= 1 && day <= 5) {
    return t("Ordered before 16:00, delivered tomorrow");
  } else {
    return t("Fast delivery in 1-2 working days");
  }
}

function initMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  const links = document.querySelectorAll("[data-mobile-menu] a");
  const submenuToggle = document.querySelector("[data-mobile-submenu-toggle]");
  const submenu = document.querySelector("[data-mobile-submenu]");

  if (toggle && menu) {
    const closeMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    };

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      menu.classList.toggle("is-open", !expanded);
      document.body.classList.toggle("menu-open", !expanded);
    });

    links.forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) closeMenu();
    });
  }

  if (submenuToggle && submenu) {
    submenuToggle.addEventListener("click", () => {
      const expanded = submenuToggle.getAttribute("aria-expanded") === "true";
      submenuToggle.setAttribute("aria-expanded", String(!expanded));
      submenu.classList.toggle("is-open", !expanded);
    });
  }
}

function initShopMenu() {
  const navItem = document.querySelector("[data-shop-nav]");
  const trigger = document.querySelector("[data-shop-trigger]");
  const menu = document.querySelector("[data-shop-menu]");
  if (!navItem || !trigger || !menu) return;

  const categoryTriggers = menu.querySelectorAll("[data-shop-category-trigger]");
  const panels = menu.querySelectorAll("[data-shop-panel]");

  const setActiveCategory = (categoryId) => {
    categoryTriggers.forEach((button) => {
      const isActive = button.dataset.shopCategory === categoryId;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.shopPanel === categoryId);
    });
  };

  const openMenu = () => {
    navItem.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    navItem.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
  };

  navItem.addEventListener("mouseenter", openMenu);
  navItem.addEventListener("mouseleave", closeMenu);
  trigger.addEventListener("focus", openMenu);
  navItem.addEventListener("focusout", (event) => {
    if (!navItem.contains(event.relatedTarget)) closeMenu();
  });
  trigger.addEventListener("click", () => {
    const expanded = trigger.getAttribute("aria-expanded") === "true";
    if (expanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  document.addEventListener("click", (event) => {
    if (!navItem.contains(event.target)) closeMenu();
  });

  categoryTriggers.forEach((button) => {
    button.addEventListener("mouseenter", () => setActiveCategory(button.dataset.shopCategory));
    button.addEventListener("focus", () => setActiveCategory(button.dataset.shopCategory));
    button.addEventListener("click", () => setActiveCategory(button.dataset.shopCategory));
  });

  if (categoryTriggers[0]) {
    setActiveCategory(categoryTriggers[0].dataset.shopCategory);
  }
}

function initStickyHeader() {
  const updateHeader = () => {
    const header = document.querySelector("[data-site-header]");
    if (!header) return;
    const isScrolled = window.scrollY > 20;
    header.classList.toggle("is-scrolled", isScrolled);
  };

  window.removeEventListener("scroll", window._headerScrollHandler);
  window._headerScrollHandler = updateHeader;
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
}

function initLanguageSwitcher() {
  const container = document.querySelector("[data-language-dropdown]");
  const btn = document.querySelector("[data-language-btn]");
  const menu = document.querySelector("[data-language-menu]");
  const options = document.querySelectorAll("[data-lang-code]");
  
  if (!container || !btn || !menu) return;

  const closeMenu = () => {
    btn.setAttribute("aria-expanded", "false");
    menu.hidden = true;
  };

  const toggleMenu = () => {
    const isExpanded = btn.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeMenu();
    } else {
      btn.setAttribute("aria-expanded", "true");
      menu.hidden = false;
    }
  };

  btn.addEventListener("click", toggleMenu);

  document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) {
      closeMenu();
    }
  });

  options.forEach((option) => {
    option.addEventListener("click", async () => {
      const lang = option.dataset.langCode;
      
      await setCurrentLanguage(lang);
      closeMenu();
    });
  });
}

function renderServiceHighlights() {
  document.querySelectorAll("[data-service-grid]").forEach((root) => {
    root.innerHTML = serviceHighlights
      .map(
        (item) => `
          <article class="service-pill reveal">
            <span class="service-dot"></span>
            <p>${item}</p>
          </article>
        `,
      )
      .join("");
  });
}

function renderTrustLogos() {
  document.querySelectorAll("[data-logo-row]").forEach((root) => {
    root.innerHTML = trustLogos
      .map((logo) => `<span class="logo-chip reveal">${logo}</span>`)
      .join("");
  });
}

function renderComparison() {
  document.querySelectorAll("[data-comparison-grid]").forEach((root) => {
    root.innerHTML = comparisonPoints
      .map(
        (item, index) => `
          <article class="comparison-card reveal ${index === 1 ? "is-after" : ""}">
            <p class="eyebrow">${t(item.title)}</p>
            <h3>${index === 0 ? t("Een interieur zonder groen oogt sneller leeg") : t("Met artificial plants voelt de ruimte direct compleet")}</h3>
            <p>${t(item.text)}</p>
          </article>
        `,
      )
      .join("");
  });
}

function renderEducationBlock() {
  const root = document.querySelector("[data-education-grid]");
  if (!root) return;

  root.innerHTML = artificialPlantInfo
    .map(
      (item) => `
        <article class="info-card reveal">
          <p class="eyebrow">${t("Artificial plants")}</p>
          <h3>${t(item.title)}</h3>
          <p>${t(item.text)}</p>
        </article>
      `,
    )
    .join("");
}

function populateLists() {
  const categoryGrid = document.querySelector("[data-category-grid]");
  const featuredGrid = document.querySelector("[data-featured-grid]");
  const collectionGrid = document.querySelector("[data-collection-grid]");
  const testimonialGrid = document.querySelector("[data-testimonial-grid]");
  const faqGrid = document.querySelectorAll("[data-faq-grid]");
  const blogGrid = document.querySelector("[data-blog-grid]");
  const uspGrid = document.querySelector("[data-usp-grid]");
  const whyList = document.querySelector("[data-why-list]");
  const businessList = document.querySelector("[data-business-list]");
  const productDetailRoot = document.querySelector("[data-product-detail]");
  const relatedProductsRoot = document.querySelector("[data-related-products]");

  if (categoryGrid) {
    categoryGrid.innerHTML = categories.map(createCategoryCard).join("");
  }

  if (featuredGrid) {
    featuredGrid.innerHTML = featuredProducts
      .slice(0, 4)
      .map((product) => createProductCard(product, { variant: "featured" }))
      .join("");
  }

  if (collectionGrid) {
    collectionGrid.innerHTML = featuredProducts.map(createProductCard).join("");
  }

  if (testimonialGrid) {
    testimonialGrid.innerHTML = testimonials.map(createTestimonialCard).join("");
  }

  faqGrid.forEach((root) => {
    root.innerHTML = faqs.map(createFaqItem).join("");
  });

  if (blogGrid) {
    blogGrid.innerHTML = blogPosts.map(createBlogCard).join("");
  }

  if (uspGrid) {
    uspGrid.innerHTML = uspItems
      .map(
        (item) => `
          <article class="usp-card reveal">
            <h3>${t(item.title)}</h3>
            <p>${t(item.text)}</p>
          </article>
        `,
      )
      .join("");
  }

  if (whyList) {
    whyList.innerHTML = why4EverPlants.map((item) => `<li class="icon-list-item reveal">${t(item)}</li>`).join("");
  }

  if (businessList) {
    businessList.innerHTML = businessBenefits.map((item) => `<li class="icon-list-item reveal">${t(item)}</li>`).join("");
  }

  if (productDetailRoot) {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");
    const product = featuredProducts.find((item) => item.slug === slug) || featuredProducts[0];

    document.title = `${product.name} | 4EverPlants`;

    productDetailRoot.innerHTML = `
      ${buildBreadcrumbs(product)}
      <div class="product-detail-shell">
        <div class="product-detail-media reveal">
          <div class="detail-gallery-grid" data-product-gallery>
            ${product.gallery
              .map(
                (image, index) =>
                  `<img class="detail-thumb ${index === 0 ? "is-active" : ""}" src="${image}" alt="${product.name} detail ${index + 1}" data-gallery-thumb="${image}" />`,
              )
              .join("")}
          </div>
          <div class="detail-image-wrap">
            <img class="detail-image ${product.imageMode === "contain" ? "detail-image-contain" : ""}" 
                 src="${product.gallery[0]}" 
                 alt="${product.name}" 
                 data-main-image />
          </div>
        </div>
        <div class="product-detail-content reveal">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
            <div class="rating-row" aria-label="${product.rating} ${t("out of 5 stars")}" style="margin: 0;">
              <span class="stars">★★★★★</span>
              <span style="font-weight: 600; font-size: 0.875rem;">4.9/5</span>
            </div>
            ${product.stockLabel ? `<span class="badge" style="background: var(--color-secondary-container); color: var(--color-on-secondary-container); border: none; font-weight: 700; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; padding: 0.4rem 0.8rem;">${t(product.stockLabel)}</span>` : ""}
          </div>
          <h1 style="margin-top: 0.5rem; margin-bottom: 0.5rem;">${t(product.name)}</h1>
          <p class="lead" style="font-style: italic; font-size: 1.125rem; color: var(--color-on-surface-variant); margin-bottom: 2rem;">
            &quot;${t("Natural beauty. Perfected.")}&quot;
          </p>
          
          <div class="price-stack" style="margin: 0 0 2rem 0; border-bottom: 1px solid var(--color-outline-variant); padding-bottom: 1.5rem;">
            <p class="detail-price" style="font-size: 3rem;">${formatPrice(product.price)}</p>
            ${product.compareAtPrice ? `<p class="old-price">${t("Normally")} ${formatPrice(product.compareAtPrice)}</p>` : ""}
          </div>

          <form class="purchase-box" data-add-to-cart-form data-product-slug="${product.slug}">
            <div class="field">
              <label style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.75rem; display: block; font-weight: 800; color: var(--color-on-surface-variant);">${t("Select Quantity")}</label>
              <div class="quantity-selector" data-qty-container style="background: var(--color-surface-container-low); padding: 0.5rem; border-radius: var(--radius-lg);">
                <button type="button" class="qty-btn" data-qty-minus aria-label="${t("Decrease quantity")}">
                  <span class="material-symbols-outlined">remove</span>
                </button>
                <input type="number" name="quantity" value="1" min="1" max="99" class="qty-input" data-qty-input readonly style="background: transparent;" />
                <button type="button" class="qty-btn" data-qty-plus aria-label="${t("Increase quantity")}">
                  <span class="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>
            <button class="btn-buy-premium" type="submit">
               ${t("Add to Cart")} — ${formatPrice(product.price)}
            </button>
            <div class="trust-row">
              <div class="trust-row-item">
                <span class="material-symbols-outlined">shield</span>
                <span>${t("Secure Checkout")}</span>
              </div>
              <div class="trust-row-item">
                <span class="material-symbols-outlined">local_shipping</span>
                <span>${t("Fast EU Delivery")}</span>
              </div>
            </div>
            <p class="form-feedback" data-form-feedback aria-live="polite"></p>
          </form>

          <div class="quick-usps-row" style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--color-outline-variant); display: flex; flex-wrap: wrap; gap: 0.75rem 1.5rem;">
            ${[
              "Botanically accurate",
              "Maintenance free",
              "High-quality material"
            ].map(tick => `
              <div class="quick-usp-item" style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.7rem; font-weight: 700; white-space: nowrap; text-transform: uppercase; letter-spacing: 0.03em; color: var(--color-on-surface-variant);">
                <span class="material-symbols-outlined" style="color: #2e7d32; font-size: 14px;">check_circle</span>
                <span>${t(tick)}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <div class="product-lower-section container reveal" style="margin-top: 8rem; border-top: 1px solid var(--color-outline-variant); padding-top: 8rem;">
        <div class="section-intro" style="margin-bottom: 6rem;">
          <h2 style="font-size: 3.5rem; font-weight: 800; margin-bottom: 2.5rem; letter-spacing: -0.02em;">${t("Botanical Excellence")}</h2>
          <p class="lead" style="font-size: 1.35rem; line-height: 1.8; color: var(--color-on-surface-variant); max-width: 1000px;">${t(product.description)}</p>
        </div>

        <div class="detail-modular-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 3rem; margin-bottom: 3rem;">
          <!-- Technical Specs Card -->
          <div style="background: var(--color-surface-container-low); padding: 4rem; border-radius: var(--radius-3xl); border: 1px solid var(--color-outline-variant);">
            <h3 style="font-size: 1.75rem; font-weight: 800; margin-bottom: 2.5rem; border-bottom: 2px solid var(--color-outline-variant); padding-bottom: 1.5rem;">${t("Technical Specifications")}</h3>
            <div class="space-y-4">
              ${product.specs
                .map(
                  (spec) => `
                    <div style="display: flex; justify-content: space-between; padding-bottom: 1.25rem; border-bottom: 1px solid var(--color-outline-variant);">
                      <span style="font-size: 1rem; color: var(--color-on-surface-variant); font-weight: 500;">${t(spec.label)}</span>
                      <strong style="font-size: 1rem; font-weight: 700;">${t(spec.value)}</strong>
                    </div>
                  `,
                )
                .join("")}
              <div style="display: flex; justify-content: space-between; padding-top: 0.5rem;">
                <span style="font-size: 1rem; color: var(--color-on-surface-variant); font-weight: 500;">${t("Warranty")}</span>
                <strong style="font-size: 1rem; font-weight: 700;">${t("2 Years UV Resistance")}</strong>
              </div>
            </div>
          </div>

          <!-- Material & Features Card -->
          <div style="background: var(--color-surface-container-low); padding: 4rem; border-radius: var(--radius-3xl); border: 1px solid var(--color-outline-variant);">
            <h3 style="font-size: 1.75rem; font-weight: 800; margin-bottom: 2.5rem; border-bottom: 2px solid var(--color-outline-variant); padding-bottom: 1.5rem;">${t("Details & Material")}</h3>
            <div class="space-y-8">
              <div>
                <span style="display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--color-primary); font-weight: 900; margin-bottom: 1rem;">${t("Material Composition")}</span>
                <p style="font-size: 1.125rem; line-height: 1.7; color: var(--color-on-surface); font-weight: 500;">${t(product.material)}</p>
              </div>
              <ul class="icon-list" style="gap: 1.5rem;">
                ${product.features.map((feature) => `<li class="icon-list-item" style="font-size: 1rem; color: var(--color-on-surface-variant);">${t(feature)}</li>`).join("")}
              </ul>
            </div>
          </div>
        </div>

        <!-- Safety & Placement Banner -->
        <div style="background: var(--color-surface-container-lowest); padding: 4rem; border-radius: var(--radius-3xl); border: 1px solid var(--color-outline-variant); margin-bottom: 3rem;">
          <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 3rem; display: flex; align-items: center; gap: 1rem;">
            <span class="material-symbols-outlined" style="color: var(--color-primary); font-size: 28px;">verified_user</span>
            ${t("Ideal Placement & Safety")}
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 4rem;">
            <div class="space-y-3">
              <div style="display: flex; align-items: center; gap: 0.75rem; color: #2e7d32; font-weight: 800; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.1em;">
                <span class="material-symbols-outlined" style="font-size: 20px;">pets</span>
                ${t("Pet Safe")}
              </div>
              <p style="font-size: 1rem; color: var(--color-on-surface-variant); line-height: 1.6;">${t("100% non-toxic and hypoallergenic materials.")}</p>
            </div>
            <div class="space-y-3">
              <div style="display: flex; align-items: center; gap: 0.75rem; color: #2e7d32; font-weight: 800; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.1em;">
                <span class="material-symbols-outlined" style="font-size: 20px;">dark_mode</span>
                ${t("Zero Light")}
              </div>
              <p style="font-size: 1rem; color: var(--color-on-surface-variant); line-height: 1.6;">${t("Perfect for dark hallways, bathrooms, or offices.")}</p>
            </div>
            <div class="space-y-3">
              <div style="display: flex; align-items: center; gap: 0.75rem; color: #2e7d32; font-weight: 800; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.1em;">
                <span class="material-symbols-outlined" style="font-size: 20px;">health_and_safety</span>
                ${t("Anti-Allergy")}
              </div>
              <p style="font-size: 1rem; color: var(--color-on-surface-variant); line-height: 1.6;">${t("Zero pollen — ideal for sensitive environments.")}</p>
            </div>
          </div>
        </div>

        <!-- Guarantee & Shipping -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 3rem; margin-bottom: 3rem;">
          <div style="padding: 4rem; border-radius: var(--radius-3xl); border: 2px solid #2e7d3220; background: var(--color-surface);">
            <h4 class="font-bold text-2xl flex items-center gap-3" style="color: #2e7d32; margin-bottom: 2rem;">
              <span class="material-symbols-outlined">verified</span> ${t("Our Guarantee")}
            </h4>
            <p style="font-size: 1rem; color: var(--color-on-surface-variant); line-height: 1.8;">
              ${t("Every plant 4EverPlants sells is backed by a 30-Day Money Back Guarantee. If the plant is defective or breaks under normal use, we will replace it or refund you — no questions asked.")}
            </p>
          </div>
          <div style="padding: 4rem; border-radius: var(--radius-3xl); border: 1px solid var(--color-outline-variant); background: var(--color-surface-container-low);">
            <h4 class="font-bold text-2xl flex items-center gap-3" style="margin-bottom: 2rem;">
              <span class="material-symbols-outlined">local_shipping</span> ${t("Shipping & Delivery")}
            </h4>
            <p style="font-size: 1rem; color: var(--color-on-surface-variant); line-height: 1.8;">
              ${t("We ship from the Netherlands, with average delivery times of 1-3 business days within the NL and 3-7 days across Europe.")}
            </p>
          </div>
        </div>

        <!-- How to Use -->
        <div style="background: var(--color-surface-container-low); padding: 5rem; border-radius: var(--radius-3xl); border: 1px solid var(--color-outline-variant);">
          <h3 style="font-size: 2rem; font-weight: 800; margin-bottom: 4rem;">${t("How to Use")}</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 5rem;">
            <div style="display: flex; gap: 2rem; align-items: flex-start;">
              <span style="font-size: 2.5rem; font-weight: 800; color: var(--color-primary); opacity: 0.3; line-height: 1;">01</span>
              <div>
                <strong style="display: block; font-size: 1.25rem; margin-bottom: 1rem;">${t("Unpack")}</strong>
                <p style="font-size: 1rem; color: var(--color-on-surface-variant); line-height: 1.7;">${t("Carefully remove your plant from the packaging.")}</p>
              </div>
            </div>
            <div style="display: flex; gap: 2rem; align-items: flex-start;">
              <span style="font-size: 2.5rem; font-weight: 800; color: var(--color-primary); opacity: 0.3; line-height: 1;">02</span>
              <div>
                <strong style="display: block; font-size: 1.25rem; margin-bottom: 1rem;">${t("Style")}</strong>
                <p style="font-size: 1rem; color: var(--color-on-surface-variant); line-height: 1.7;">${t("Gently fan out the branches to achieve the desired volume.")}</p>
              </div>
            </div>
            <div style="display: flex; gap: 2rem; align-items: flex-start;">
              <span style="font-size: 2.5rem; font-weight: 800; color: var(--color-primary); opacity: 0.3; line-height: 1;">03</span>
              <div>
                <strong style="display: block; font-size: 1.25rem; margin-bottom: 1rem;">${t("Place")}</strong>
                <p style="font-size: 1rem; color: var(--color-on-surface-variant); line-height: 1.7;">${t("Place in your favorite decorative pot and enjoy the transformation.")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mobile-buy-bar">
         <div>
            <span class="price">${formatPrice(product.price)}</span>
            <span class="product-name">${t(product.name)}</span>
         </div>
         <button class="btn-mobile-buy" data-mobile-buy>${t("Buy Now")}</button>
      </div>

      <div class="container">
        <section class="product-review-panel" style="margin-top: 8rem; padding-top: 8rem; border-top: 2px solid var(--color-outline-variant);">
          <div class="section-header" style="margin-bottom: 4rem;">
            <h2 style="font-size: 3rem; font-weight: 800;">${t("Customer Reviews")}</h2>
            <div class="rating-row" style="background: var(--color-surface-container-low); padding: 1rem 2rem; border-radius: 3rem;">
              <span class="stars" style="font-size: 1.5rem;">★★★★★</span>
              <strong style="font-size: 1.5rem;">4.8 / 5</strong>
            </div>
          </div>
          <div class="product-review-grid">
            ${product.reviews
              .map(
                (review) => `
                  <article class="premium-review" style="padding: 3rem; box-shadow: 0 10px 40px rgba(0,0,0,0.03);">
                    <div class="review-header" style="margin-bottom: 2rem;">
                      <div class="stars" style="font-size: 1.25rem;">★★★★★</div>
                      <span class="review-date" style="font-weight: 500; opacity: 0.6;">${t("2 weeks ago")}</span>
                    </div>
                    <p class="review-quote" style="font-size: 1.5rem; line-height: 1.6; margin-bottom: 2rem;">“${t(review.quote)}”</p>
                    <div class="review-footer">
                      <strong style="font-size: 1.125rem;">${review.author}</strong>
                      <span class="verified-badge"><span class="material-symbols-outlined">verified</span> ${t("Verified Buyer")}</span>
                    </div>
                  </article>
                `,
              )
              .join("")}
          </div>
        </section>
      </div>
    `;

    // Add mobile buy bar listener
    const mobileBuyBtn = productDetailRoot.querySelector("[data-mobile-buy]");
    if (mobileBuyBtn) {
      mobileBuyBtn.addEventListener("click", () => {
        const form = productDetailRoot.querySelector("[data-add-to-cart-form]");
        if (form) form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
      });
    }

    if (relatedProductsRoot) {
      relatedProductsRoot.innerHTML = featuredProducts
        .filter((item) => item.slug !== product.slug)
        .slice(0, 3)
        .map(createProductCard)
        .join("");
    }
  }
  reveal();
}

function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      el.classList.add("is-visible");
    }
  });
}

function initRevealAnimations() {
  window.addEventListener("scroll", reveal);
  reveal(); // Initial check
}

function setFeedback(form, message, isSuccess) {
  const feedback = form.querySelector("[data-form-feedback]");
  if (!feedback) return;
  feedback.textContent = message;
  feedback.classList.toggle("is-success", isSuccess);
  feedback.classList.toggle("is-error", !isSuccess);
  applyTranslations(form, getCurrentLanguage());
}

function initNewsletterForm() {
  const form = document.querySelector("[data-newsletter-form]");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = form.elements.email.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFeedback(form, t("Please enter a valid email address."), false);
      return;
    }

    const btn = form.querySelector("button[type='submit']");
    const originalText = btn.textContent;
    btn.textContent = "Sending...";
    btn.disabled = true;

    try {
      // TODO: Replace with actual Formspree/Mailchimp endpoint
      const response = await fetch("https://formspree.io/f/YOUR_NEWSLETTER_FORM_ID", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: email })
      });
      
      form.reset();
      setFeedback(form, t("Thank you. You will receive inspiration and promotions from 4EverPlants shortly."), true);
    } catch (error) {
      console.warn("Newsletter submission mocked since endpoint is not set up.");
      form.reset();
      setFeedback(form, t("Thank you. You will receive inspiration and promotions from 4EverPlants shortly."), true);
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
}

function initFloaters() {
  const popup = document.querySelector("[data-discount-popup]");
  const closeBtn = document.querySelector("[data-popup-close]");
  const form = document.querySelector("[data-popup-form]");
  if (!popup || !closeBtn || !form) return;

  const POPUP_SHOWN_KEY = "4everplants_popup_shown_10";
  const urlParams = new URLSearchParams(window.location.search);
  const forceShow = urlParams.get("forcePopup") === "true" || urlParams.get("test") === "true";
  
  if (!localStorage.getItem(POPUP_SHOWN_KEY) || forceShow) {
    setTimeout(() => {
      popup.classList.add("is-visible");
      document.body.classList.add("menu-open");
    }, forceShow ? 1000 : 4000);
  }

  const closePopup = () => {
    popup.classList.remove("is-visible");
    document.body.classList.remove("menu-open");
    localStorage.setItem(POPUP_SHOWN_KEY, "true");
  };

  // For testing purposes
  window.resetPopup = () => {
    localStorage.removeItem(POPUP_SHOWN_KEY);
    console.log("Popup reset! Refresh the page to see it again.");
  };

  closeBtn.addEventListener("click", closePopup);
  popup.addEventListener("click", (e) => {
    if (e.target === popup) closePopup();
  });
  
  // Custom interaction for Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popup.classList.contains("is-visible")) {
      closePopup();
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.elements.email.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFeedback(form, t("Please enter a valid email address."), false);
      return;
    }
    const btn = form.querySelector("button[type='submit']");
    const originalText = btn.textContent;
    btn.textContent = "Sending...";
    btn.disabled = true;

    // Simulate API call for discount
    setTimeout(() => {
      setFeedback(form, t("Thank you! Use code WELCOME10 at checkout."), true);
      setTimeout(closePopup, 3500);
      btn.textContent = originalText;
      btn.disabled = false;
    }, 800);
  });
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      setFeedback(form, t("Please enter name, email and message to send your request."), false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFeedback(form, t("Please check the email address and try again."), false);
      return;
    }

    const btn = form.querySelector("button[type='submit']");
    const originalText = btn.textContent;
    btn.textContent = "Sending...";
    btn.disabled = true;

    try {
      // TODO: Replace with actual Formspree endpoint
      const response = await fetch("https://formspree.io/f/YOUR_CONTACT_FORM_ID", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      
      form.reset();
      setFeedback(form, t("Thank you for your message. We will contact you as soon as possible."), true);
    } catch (error) {
      console.warn("Contact form submission mocked since endpoint is not set up.");
      form.reset();
      setFeedback(form, t("Thank you for your message. We will contact you as soon as possible."), true);
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
}

function initCookieBanner() {
  const banner = document.querySelector("[data-cookie-banner]");
  const acceptBtn = document.querySelector("[data-cookie-accept]");
  const declineBtn = document.querySelector("[data-cookie-decline]");
  
  if (!banner || !acceptBtn || !declineBtn) return;

  const COOKIE_CONSENT_KEY = "4everplants_cookie_consent";
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);

  if (!consent) {
    setTimeout(() => {
      banner.hidden = false;
    }, 2000);
  }

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    banner.hidden = true;
  });

  declineBtn.addEventListener("click", () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    banner.hidden = true;
  });
}

function initCollectionFilters() {
  const chips = Array.from(document.querySelectorAll("[data-filter]"));
  const products = Array.from(document.querySelectorAll("[data-product-category]"));
  const emptyState = document.querySelector("[data-empty-state]");
  if (!chips.length || !products.length) return;

  const applyFilter = (filter) => {
    chips.forEach((chip) => chip.classList.toggle("is-active", chip.dataset.filter === filter));
    products.forEach((product) => {
      const visible = filter === "all" || product.dataset.productCategory === filter;
      product.hidden = !visible;
    });

    if (emptyState) {
      emptyState.hidden = products.some((product) => !product.hidden);
    }
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", (event) => {
      event.preventDefault();
      const filter = chip.dataset.filter || "all";
      history.replaceState(null, "", filter === "all" ? "#producten" : `#${filter}`);
      applyFilter(filter);
    });
  });

  const initialHash = window.location.hash.replace("#", "");
  const initialFilter = chips.some((chip) => chip.dataset.filter === initialHash) ? initialHash : "all";
  applyFilter(initialFilter);
}

function initQuantitySelectors() {
  document.querySelectorAll("[data-qty-container]").forEach((container) => {
    const input = container.querySelector("[data-qty-input]");
    const minus = container.querySelector("[data-qty-minus]");
    const plus = container.querySelector("[data-qty-plus]");

    if (!input || !minus || !plus) return;

    // Remove existing listeners if any (simple approach)
    const newMinus = minus.cloneNode(true);
    const newPlus = plus.cloneNode(true);
    minus.parentNode.replaceChild(newMinus, minus);
    plus.parentNode.replaceChild(newPlus, plus);

    newMinus.addEventListener("click", () => {
      const val = parseInt(input.value) || 1;
      if (val > 1) input.value = val - 1;
    });

    newPlus.addEventListener("click", () => {
      const val = parseInt(input.value) || 1;
      if (val < 99) input.value = val + 1;
    });
  });
}

function initProductGallery() {
  const mainImg = document.querySelector("[data-main-image]");
  const thumbs = document.querySelectorAll("[data-gallery-thumb]");
  
  if (!mainImg || !thumbs.length) return;
  
  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      mainImg.src = thumb.dataset.galleryThumb;
      thumbs.forEach(t => t.classList.remove("is-active"));
      thumb.classList.add("is-active");
    });
  });
}

function buildBreadcrumbs(product) {
  return `
    <nav class="breadcrumbs" aria-label="${t("Breadcrumbs")}">
      <a href="/index.html">${t("Home")}</a>
      <span class="breadcrumb-separator">/</span>
      <a href="/collectie.html">${t("Shop")}</a>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-current">${t(product.name)}</span>
    </nav>
  `;
}

function syncCartCount() {
  const count = String(getCartCount());
  document.querySelectorAll("[data-cart-count]").forEach((node) => {
    node.textContent = count;
  });
}

function initAddToCartForms() {
  document.querySelectorAll("[data-add-to-cart-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const slug = form.dataset.productSlug;
      const quantity = Number(form.elements.quantity.value || 1);
      const product = featuredProducts.find((item) => item.slug === slug);
      if (!product) return;

      addToCart(product, quantity);
      syncCartCount();
      setFeedback(form, t("Added to your cart."), true);
    });
  });
}

function renderCartPage() {
  const root = document.querySelector("[data-cart-root]");
  if (!root) return;

  const cart = getCart();
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (!cart.length) {
    root.innerHTML = `
      <div class="cart-empty content-surface reveal">
        <p class="eyebrow">${t("Winkelwagen")}</p>
        <h2>${t("Je winkelwagen is nog leeg")}</h2>
        <p>${t("Bekijk de collectie en voeg je favoriete artificial plants toe om verder te gaan.")}</p>
        <a class="btn btn-primary" href="/collectie.html">${t("Naar collectie")}</a>
      </div>
    `;
    applyTranslations(root, getCurrentLanguage());
    return;
  }

  root.innerHTML = `
    <div class="cart-layout">
      <section class="cart-items">
        ${cart
          .map(
            (item) => `
              <article class="cart-item reveal">
                <img src="${item.image}" alt="${t(item.name)}" />
                <div>
                  <p class="eyebrow uppercase-spaced">${t("4EverPlants collectie")}</p>
                  <h2>${t(item.name)}</h2>
                  <p>${formatPrice(item.price)} ${t("per stuk")}</p>
                </div>
                <div class="cart-item-controls">
                  <label for="qty-${item.slug}" class="sr-only">${t("Aantal")} ${t(item.name)}</label>
                  <select id="qty-${item.slug}" data-cart-quantity data-slug="${item.slug}">
                    ${[0, 1, 2, 3, 4].map((value) => `<option value="${value}"${item.quantity === value ? " selected" : ""}>${value}</option>`).join("")}
                  </select>
                  <strong>${formatPrice(item.price * item.quantity)}</strong>
                </div>
              </article>
            `,
          )
          .join("")}
      </section>
      <aside class="cart-summary content-surface reveal">
        <p class="eyebrow uppercase-spaced" data-i18n="Summary">Summary</p>
        <h2 data-i18n="Order Overview">Order Overview</h2>
        
        ${
          subtotal < shippingPolicy.freeThreshold
            ? `
            <div class="shipping-progress" style="margin-bottom: 1.5rem; padding: 1rem; background: var(--color-secondary-container); color: var(--color-on-secondary-container); border-radius: var(--radius-md); font-size: 0.875rem;">
              <p style="margin: 0;">${t("Only <strong>{{amount}}</strong> remaining until free shipping!", { amount: formatPrice(shippingPolicy.freeThreshold - subtotal) })}</p>
              <div style="height: 4px; background: rgba(0,0,0,0.1); border-radius: 2px; margin-top: 0.5rem; overflow: hidden;">
                <div style="height: 100%; width: ${(subtotal / shippingPolicy.freeThreshold) * 100}%; background: var(--color-on-secondary-container);"></div>
              </div>
            </div>
            `
            : `
            <div class="shipping-progress" style="margin-bottom: 1.5rem; padding: 1rem; background: #e8f5e9; color: #2e7d32; border-radius: var(--radius-md); font-size: 0.875rem; display: flex; align-items: center; gap: 0.5rem;">
              <span class="material-symbols-outlined">check_circle</span>
              <p style="margin: 0;">${t("Your order qualifies for <strong>Free Shipping</strong>!")}</p>
            </div>
            `
        }

        <div class="spec-row">
          <span data-i18n="Subtotal">Subtotal</span>
          <strong>${formatPrice(subtotal)}</strong>
        </div>
        <div class="spec-row" style="margin: 1rem 0; padding: 1rem 0; border-top: 1px solid var(--color-outline-variant); border-bottom: 1px solid var(--color-outline-variant);">
          <span data-i18n="Shipping">Shipping</span>
          <strong>${subtotal >= shippingPolicy.freeThreshold ? t("Free") : formatPrice(shippingPolicy.nl.cost)}</strong>
        </div>
        <div class="spec-row" style="margin-bottom: 2rem;">
          <span style="font-weight: 600;" data-i18n="Total">Total</span>
          <strong style="font-size: 1.25rem;">${formatPrice(subtotal + (subtotal >= shippingPolicy.freeThreshold ? 0 : shippingPolicy.nl.cost))}</strong>
        </div>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <a class="btn btn-primary" href="/contact.html" data-i18n="Proceed to request">Proceed to request</a>
          <button class="btn btn-secondary" type="button" data-clear-cart data-i18n="Empty cart">Empty cart</button>
        </div>
      </aside>
    </div>
  `;

  root.querySelectorAll("[data-cart-quantity]").forEach((select) => {
    select.addEventListener("change", () => {
      updateQuantity(select.dataset.slug, Number(select.value));
      syncCartCount();
      renderCartPage();
    });
  });

  const clearButton = root.querySelector("[data-clear-cart]");
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      clearCart();
      syncCartCount();
      renderCartPage();
    });
  }

  applyTranslations(root, getCurrentLanguage());
}

mountLayout();
renderServiceHighlights();
renderTrustLogos();
renderComparison();
renderEducationBlock();
populateLists();
renderCartPage();
markActiveNav();
initMenu();
initShopMenu();
initStickyHeader();
initNewsletterForm();
initFloaters();
initCookieBanner();
initContactForm();
initCollectionFilters();
initAddToCartForms();
initQuantitySelectors();
initProductGallery();
syncCartCount();
initLanguageSwitcher();
applyTranslations(document.documentElement, getCurrentLanguage());
window.addEventListener("cart:updated", syncCartCount);
document.addEventListener("lang:changed", async (e) => {
  const lang = e.detail.lang;
  console.log(`[I18n] Language changed to: ${lang}`);
  
  try {
    // Re-render components
    mountLayout();
    renderServiceHighlights();
    renderTrustLogos();
    renderComparison();
    renderEducationBlock();
    populateLists();
    renderCartPage();
    
    // Re-init interactivity
    markActiveNav();
    initMenu();
    initShopMenu();
    initLanguageSwitcher();
    initAddToCartForms();
    initQuantitySelectors();
    initProductGallery();
    syncCartCount();
    
    // Translate the whole DOM asynchronously
    await applyTranslations(document.documentElement, lang);
    
    // Re-trigger reveal animations for newly injected elements
    reveal();
    
    console.log("Translations applied successfully");
  } catch (err) {
    console.error("Error during language switch re-render:", err);
  }
});

if (document.readyState === "complete") {
  initRevealAnimations();
} else {
  window.addEventListener("load", initRevealAnimations);
}
