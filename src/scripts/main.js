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
} from "../data/site.js?v=20260511_v1";
import {
  clearCart,
  formatPrice,
  getCart,
  getCartCount,
  updateQuantity,
  addToCart,
} from "./cart-store.js?v=20260511_v1";
import {
  createBlogCard,
  createCategoryCard,
  createFaqItem,
  createProductCard,
  createTestimonialCard,
} from "../components/cards.js?v=20260511_v1";
import { createProductImageComponent } from "../components/product-image.js?v=20260511_v1";
import { renderFooter, renderHeader, renderNewsletter, renderFloaters, renderUspStrip, renderFeaturesSection, renderProductUSPs } from "../components/layout.js?v=20260511_v1";
import { applyTranslations, getCurrentLanguage, setCurrentLanguage, t } from "../data/translations.js?v=20260511_v1";

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

function initCartToast() {
  const overlay = document.querySelector("[data-cart-toast]");
  const closeBtn = document.querySelector("[data-cart-toast-close]");
  if (!overlay || !closeBtn) return;

  const closeToast = () => {
    overlay.setAttribute("aria-hidden", "true");
  };

  closeBtn.addEventListener("click", closeToast);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeToast();
  });
}

let toastTimeout = null;

function showCartToast(product, quantity) {
  const overlay = document.querySelector("[data-cart-toast]");
  const content = document.querySelector("[data-cart-toast-content]");
  const countToast = document.querySelector("[data-cart-count-toast]");
  if (!overlay || !content) return;

  if (toastTimeout) clearTimeout(toastTimeout);

  content.innerHTML = `
    <img src="${product.image}" alt="${t(product.name)}" class="cart-toast-image" />
    <div class="cart-toast-info">
      <h3>${t(product.name)}</h3>
      <p>${t("4EverPlants collectie")}</p>
      <p>${t("Aantal")}: ${quantity}</p>
      <div class="cart-toast-price">${formatPrice(product.price * quantity)}</div>
    </div>
  `;

  if (countToast) countToast.textContent = String(getCartCount());
  
  // Toggle visibility to ensure animation re-triggers if already visible
  overlay.setAttribute("aria-hidden", "true");
  void overlay.offsetWidth; // Force reflow
  overlay.setAttribute("aria-hidden", "false");

  toastTimeout = setTimeout(() => {
    overlay.setAttribute("aria-hidden", "true");
  }, 6000);
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

          <form class="purchase-box" data-add-to-cart-form data-product-slug="${product.slug}" data-unit-price="${product.price}">
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
    btn.textContent = t("Sending...");
    btn.disabled = true;

    try {
      const response = await fetch("https://xolbpncjwbplwqtlkygt.supabase.co/functions/v1/subscribe", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'newsletter' })
      });
      
      if (!response.ok) throw new Error("Subscription failed");
      
      form.reset();
      setFeedback(form, t("Thank you. You will receive inspiration and promotions from 4EverPlants shortly."), true);
    } catch (error) {
      console.error("Newsletter error:", error);
      setFeedback(form, t("Sorry, something went wrong. Please try again later."), false);
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

  form.addEventListener("submit", async (e) => {
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

    try {
      const response = await fetch("https://xolbpncjwbplwqtlkygt.supabase.co/functions/v1/subscribe", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'discount' })
      });
      
      if (!response.ok) throw new Error("Submission failed");
      const data = await response.json();
      
      if (data.status === 'exists') {
        setFeedback(form, t("You are already subscribed to our newsletter!"), false);
      } else {
        setFeedback(form, t("Success! Your unique 10% discount code has been sent to your email."), true);
        localStorage.setItem(POPUP_SHOWN_KEY, "true");
        setTimeout(closePopup, 4000);
      }
    } catch (error) {
      console.error("Popup submission error:", error);
      setFeedback(form, t("Sorry, something went wrong. Please try again later."), false);
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
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
      const response = await fetch("https://formspree.io/f/mzdokwkn", {
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
  const filterRow = document.querySelector(".filter-row");
  const emptyState = document.querySelector("[data-empty-state]");
  if (!filterRow) return;

  const applyFilter = (filter) => {
    const chips = filterRow.querySelectorAll("[data-filter]");
    const products = document.querySelectorAll("[data-product-category]");
    
    // Update active button UI
    chips.forEach((chip) => chip.classList.toggle("active", chip.dataset.filter === filter));
    
    // Filter products
    products.forEach((product) => {
      const visible = filter === "all" || product.dataset.productCategory === filter;
      product.hidden = !visible;
      product.style.display = visible ? "" : "none";
      // Also handle reveal animation class to ensure filtered items are visible
      if (visible) product.classList.add("is-visible");
    });

    if (emptyState) {
      const hasVisible = Array.from(products).some((p) => !p.hidden);
      emptyState.hidden = hasVisible;
    }
  };

  // Event delegation for chips
  filterRow.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-filter]");
    if (!chip) return;
    
    event.preventDefault();
    const filter = chip.dataset.filter || "all";
    history.replaceState(null, "", filter === "all" ? "#producten" : `#${filter}`);
    applyFilter(filter);
  });

  // Initial filter based on URL hash
  const initialHash = window.location.hash.replace("#", "");
  const chips = filterRow.querySelectorAll("[data-filter]");
  const initialFilter = Array.from(chips).some((chip) => chip.dataset.filter === initialHash) ? initialHash : "all";
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

    const updatePrice = () => {
      const form = container.closest("[data-add-to-cart-form]");
      if (!form) return;
      const unitPrice = parseFloat(form.dataset.unitPrice);
      const qty = parseInt(input.value) || 1;
      const buyBtn = form.querySelector(".btn-buy-premium");
      if (buyBtn && unitPrice) {
        buyBtn.innerHTML = `${t("Add to Cart")} — ${formatPrice(unitPrice * qty)}`;
      }
      const mobilePrice = document.querySelector(".mobile-buy-bar .price");
      if (mobilePrice && unitPrice) {
        mobilePrice.textContent = formatPrice(unitPrice * qty);
      }
    };

    newMinus.addEventListener("click", () => {
      const val = parseInt(input.value) || 1;
      if (val > 1) {
        input.value = val - 1;
        updatePrice();
      }
    });

    newPlus.addEventListener("click", () => {
      const val = parseInt(input.value) || 1;
      if (val < 99) {
        input.value = val + 1;
        updatePrice();
      }
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
  document.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-add-to-cart-form]");
    if (!form) return;

    event.preventDefault();
    const slug = form.dataset.productSlug;
    const quantity = Number(form.elements.quantity?.value || 1);
    const product = featuredProducts.find((item) => item.slug === slug);
    if (!product) return;

    addToCart(product, quantity);
    syncCartCount();
    showCartToast(product, quantity);
  });
}

function renderCartPage(isUpdate = false) {
  const root = document.querySelector("[data-cart-root]");
  if (!root) return;

  const cart = getCart();
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (!cart.length) {
    root.innerHTML = `
      <div class="cart-empty content-surface ${isUpdate ? "" : "reveal"}">
        <p class="eyebrow">${t("Winkelwagen")}</p>
        <h2>${t("Je winkelwagen is nog leeg")}</h2>
        <p>${t("Bekijk de collectie en voeg je favoriete artificial plants toe om verder te gaan.")}</p>
        <a class="btn btn-primary" href="/collectie.html">${t("Naar collectie")}</a>
      </div>
    `;
    return;
  }

  // Use t() synchronously in the template instead of data-i18n where possible to avoid flickering
  root.innerHTML = `
    <div class="cart-layout">
      <section class="cart-items">
        ${cart
          .map(
            (item) => `
              <article class="cart-item ${isUpdate ? "" : "reveal"}">
                <div class="cart-item-image-wrap">
                  <img src="${item.image}" alt="${t(item.name)}" />
                </div>
                <div class="cart-item-details">
                  <div class="cart-item-header">
                    <div class="cart-item-name-group">
                      <p class="eyebrow uppercase-spaced" style="font-size: 0.65rem; margin-bottom: 0.25rem;">4EverPlants collectie</p>
                      <h2 class="cart-item-title">${t(item.name)}</h2>
                    </div>
                    <div class="cart-item-price-main">
                      ${formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                  
                  <div class="cart-item-meta">
                    <p>${formatPrice(item.price)} ${t("per stuk")}</p>
                  </div>

                  <div class="cart-item-actions">
                    <div class="qty-toggle">
                      <button type="button" class="qty-btn" data-qty-change="-1" data-slug="${item.slug}">−</button>
                      <span class="qty-val">${item.quantity}</span>
                      <button type="button" class="qty-btn" data-qty-change="1" data-slug="${item.slug}">+</button>
                    </div>
                    <button type="button" class="btn-trash-nike" data-qty-remove data-slug="${item.slug}" aria-label="${t("Verwijderen")}">
                      <span class="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              </article>
            `,
          )
          .join("")}
      </section>
      
      <aside class="cart-summary content-surface ${isUpdate ? "" : "reveal"}">
        <p class="eyebrow uppercase-spaced">${t("Summary")}</p>
        <h2 style="margin-bottom: 1.5rem;">${t("Order Overview")}</h2>
        
        ${
          subtotal < shippingPolicy.freeThreshold
            ? `
            <div class="shipping-progress" style="margin-bottom: 1.5rem; padding: 1rem; background: var(--color-surface-container); border-radius: var(--radius-md); font-size: 0.8125rem;">
              <p style="margin: 0; color: var(--color-on-surface-variant);">${t("Winkel nog voor")} <strong>${formatPrice(shippingPolicy.freeThreshold - subtotal)}</strong> ${t("om in aanmerking te komen voor gratis verzending!")}</p>
            </div>
            `
            : `
            <div class="shipping-progress" style="margin-bottom: 1.5rem; padding: 0.75rem 1rem; background: #edf7ed; color: #1b4332; border-radius: var(--radius-md); font-size: 0.8125rem; display: flex; align-items: center; gap: 0.5rem;">
              <span class="material-symbols-outlined" style="font-size: 18px;">check_circle</span>
              <p style="margin: 0; font-weight: 600;">${t("Gratis verzending toegepast")}</p>
            </div>
            `
        }

        <div class="spec-row" style="margin-bottom: 0.75rem;">
          <span>${t("Subtotal")}</span>
          <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="spec-row" style="margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--color-outline-variant);">
          <span>${t("Shipping")}</span>
          <span>${subtotal >= shippingPolicy.freeThreshold ? t("Free") : formatPrice(shippingPolicy.nl.cost)}</span>
        </div>
        <div class="spec-row" style="margin-bottom: 2rem;">
          <span style="font-weight: 700; font-size: 1.125rem;">${t("Total")}</span>
          <strong style="font-size: 1.25rem;">${formatPrice(subtotal + (subtotal >= shippingPolicy.freeThreshold ? 0 : shippingPolicy.nl.cost))}</strong>
        </div>
        
        <button class="btn btn-primary btn-full" type="button" data-checkout-btn>${t("cart.checkout")}</button>
      </aside>
    </div>
  `;

  // Quantity Change Logic
  root.querySelectorAll("[data-qty-change]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const slug = btn.dataset.slug;
      const change = parseInt(btn.dataset.qtyChange);
      const item = cart.find(i => i.slug === slug);
      if (item) {
        updateQuantity(slug, Math.max(0, item.quantity + change));
        syncCartCount();
        renderCartPage(true); // Fast update
      }
    });
  });

  // Remove Logic
  root.querySelectorAll("[data-qty-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      updateQuantity(btn.dataset.slug, 0);
      syncCartCount();
      renderCartPage(true); // Fast update
    });
  });

  const checkoutBtn = root.querySelector("[data-checkout-btn]");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", async () => {
      const originalText = checkoutBtn.textContent;
      checkoutBtn.textContent = t("Processing...");
      checkoutBtn.disabled = true;
      try {
        await startCheckout(cart);
      } catch (err) {
        console.error("Checkout failed:", err);
        alert(`Checkout Error: ${err.message}`);
      } finally {
        checkoutBtn.textContent = originalText;
        checkoutBtn.disabled = false;
      }
    });
  }
}


async function startCheckout(items) {
  // Determine site URL for callback
  const siteUrl = window.location.origin;

  const res = await fetch("https://xolbpncjwbplwqtlkygt.supabase.co/functions/v1/create-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      items: items.map(i => ({ 
        slug: i.slug,
        name: i.name, 
        price: i.price, 
        quantity: i.quantity 
      })),
      SITE_URL: siteUrl
    })
  });

  if (!res.ok) {
    let errorMessage = "Network error";
    try {
      const errData = await res.json();
      errorMessage = errData.error || errorMessage;
    } catch (e) {
      errorMessage = res.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  const { clientSecret } = await res.json();
  if (clientSecret) {
    // Initialize Stripe with the provided publishable key
    const stripe = Stripe('pk_test_51TT3in3aKa7tzuJSB6eQEFle4Bv5x99iF6vbHLs3W5SUr3rPMOOQK1uWxXbpeXEEQXzsqFDEVU8XAzHOSibZLC4t00y7ByMOfo');
    
    const subtotal = items.reduce((total, i) => total + (i.price * 100) * i.quantity, 0);

    const checkout = await stripe.initEmbeddedCheckout({
      clientSecret,
    });

    // Hide standard cart UI, show checkout container
    const cartRoot = document.querySelector("[data-cart-root]");
    const checkoutContainer = document.getElementById("checkout-container");
    
    if (cartRoot && checkoutContainer) {
      cartRoot.style.display = "none";
      checkoutContainer.style.display = "block";
      
      // Mount Stripe Checkout
      checkout.mount('#stripe-checkout-mount');
      
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
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
initCartToast();
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
    initCollectionFilters();
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

// Clear cart on success page
if (window.location.pathname.includes("success.html")) {
  clearCart();
  syncCartCount();
}

function initFooterAccordions() {
  if (window.innerWidth > 768) return;
  
  const footerHeadings = document.querySelectorAll('.footer-grid h3');
  footerHeadings.forEach(heading => {
    heading.addEventListener('click', () => {
      const list = heading.nextElementSibling;
      if (list && list.classList.contains('footer-list')) {
        const isActive = list.classList.toggle('is-active');
        heading.style.setProperty('--icon-content', isActive ? '"-"' : '"+"');
      }
    });
  });
}

// Update the CSS to handle the accordion icon change
document.addEventListener('DOMContentLoaded', () => {
  initFooterAccordions();
});
