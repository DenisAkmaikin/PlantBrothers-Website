import {
  artificialPlantInfo,
  blogPosts,
  businessBenefits,
  categories,
  comparisonPoints,
  faqs,
  featuredProducts,
  serviceHighlights,
  testimonials,
  trustLogos,
  uspItems,
  whyPlantBrothers,
} from "../data/site.js?v=20260317c";
import {
  clearCart,
  formatPrice,
  getCart,
  getCartCount,
  updateQuantity,
  addToCart,
} from "./cart-store.js?v=20260312a";
import {
  createBlogCard,
  createCategoryCard,
  createFaqItem,
  createProductCard,
  createTestimonialCard,
} from "../components/cards.js?v=20260317c";
import { createProductImageComponent } from "../components/product-image.js?v=20260317c";
import { renderFooter, renderHeader, renderNewsletter } from "../components/layout.js?v=20260317c";
import { applyTranslations, getCurrentLanguage, setCurrentLanguage } from "../data/translations.js?v=20260317c";

function mountLayout() {
  const headerRoot = document.querySelector("[data-header-root]");
  const newsletterRoot = document.querySelector("[data-newsletter-root]");
  const footerRoot = document.querySelector("[data-footer-root]");

  if (headerRoot) headerRoot.innerHTML = renderHeader();
  if (newsletterRoot) newsletterRoot.innerHTML = renderNewsletter();
  if (footerRoot) footerRoot.innerHTML = renderFooter();
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
  const header = document.querySelector("[data-site-header]");
  if (!header) return;

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

function initLanguageSwitcher() {
  const select = document.querySelector("[data-language-select]");
  if (!select) return;

  select.value = getCurrentLanguage();
  select.addEventListener("change", () => {
    setCurrentLanguage(select.value);
    applyTranslations(document.documentElement, select.value);
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
            <p class="eyebrow">${item.title}</p>
            <h3>${index === 0 ? "Een interieur zonder groen oogt sneller leeg" : "Met artificial plants voelt de ruimte direct compleet"}</h3>
            <p>${item.text}</p>
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
          <p class="eyebrow">Artificial plants</p>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
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
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </article>
        `,
      )
      .join("");
  }

  if (whyList) {
    whyList.innerHTML = whyPlantBrothers.map((item) => `<li class="icon-list-item reveal">${item}</li>`).join("");
  }

  if (businessList) {
    businessList.innerHTML = businessBenefits.map((item) => `<li class="icon-list-item reveal">${item}</li>`).join("");
  }

  if (productDetailRoot) {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");
    const product = featuredProducts.find((item) => item.slug === slug) || featuredProducts[0];

    document.title = `${product.name} | PlantBrothers`;

    productDetailRoot.innerHTML = `
      <div class="product-detail-shell">
        <div class="product-detail-media reveal">
          ${
            product.media
              ? createProductImageComponent({
                  ...product.media,
                  className: "product-image-switch--detail",
                })
              : `<img class="${product.imageMode === "contain" ? "detail-image detail-image-contain" : "detail-image"}" src="${product.gallery[0]}" alt="${product.name}" />`
          }
          <div class="detail-gallery-grid">
            ${product.gallery
              .map(
                (image, index) =>
                  `<img class="${product.imageMode === "contain" ? "detail-thumb detail-image-contain" : "detail-thumb"}" src="${image}" alt="${product.name} detail ${index + 1}" />`,
              )
              .join("")}
          </div>
        </div>
        <div class="product-detail-content reveal">
          <div class="rating-row" aria-label="${product.rating} van 5 sterren">
            <span class="stars">★★★★★</span>
            <span>${product.rating.toFixed(1)} uit ${product.reviewCount} beoordelingen</span>
          </div>
          <p class="eyebrow">${product.category}</p>
          <h1>${product.name}</h1>
          <p class="lead">${product.description}</p>
          <div class="detail-meta">
            <span class="badge">${product.height}</span>
            <span class="badge">${product.potSize}</span>
            <span class="badge">${product.stockLabel}</span>
          </div>
          <div class="price-stack">
            <p class="detail-price">${formatPrice(product.price)}</p>
            <p class="old-price">Normaal ${formatPrice(product.compareAtPrice)}</p>
          </div>
          <p>${product.material}</p>
          <ul class="icon-list compact-list">
            ${product.features.map((feature) => `<li class="icon-list-item">${feature}</li>`).join("")}
          </ul>
          <form class="purchase-box" data-add-to-cart-form data-product-slug="${product.slug}">
            <div class="field">
              <label for="quantity">Aantal</label>
              <select id="quantity" name="quantity">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <button class="button button-primary" type="submit">In winkelwagen</button>
            <a class="button button-offer" href="/collectie.html#sale">Shop met korting</a>
            <p class="form-feedback" data-form-feedback aria-live="polite"></p>
          </form>
          <div class="detail-specs">
            ${product.specs
              .map(
                (spec) => `
                  <div class="spec-row">
                    <span>${spec.label}</span>
                    <strong>${spec.value}</strong>
                  </div>
                `,
              )
              .join("")}
          </div>
          <section class="product-review-panel">
            <h2>Klantbeoordelingen</h2>
            <div class="product-review-grid">
              ${product.reviews
                .map(
                  (review) => `
                    <article class="mini-review">
                      <div class="rating-row">
                        <span class="stars">★★★★★</span>
                        <span>5.0</span>
                      </div>
                      <p>“${review.quote}”</p>
                      <strong>${review.author}</strong>
                      <span>${review.role}</span>
                    </article>
                  `,
                )
                .join("")}
            </div>
          </section>
        </div>
      </div>
    `;

    if (relatedProductsRoot) {
      relatedProductsRoot.innerHTML = featuredProducts
        .filter((item) => item.slug !== product.slug)
        .slice(0, 3)
        .map(createProductCard)
        .join("");
    }
  }
}

function initRevealAnimations() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  items.forEach((item) => observer.observe(item));
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

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = form.elements.email.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFeedback(form, "Vul een geldig e-mailadres in.", false);
      return;
    }

    form.reset();
    setFeedback(form, "Bedankt. Je ontvangt binnenkort inspiratie en acties van PlantBrothers.", true);
  });
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      setFeedback(form, "Vul naam, e-mail en bericht in om je aanvraag te versturen.", false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFeedback(form, "Controleer het e-mailadres en probeer het opnieuw.", false);
      return;
    }

    form.reset();
    setFeedback(form, "Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op.", true);
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
      setFeedback(form, "Toegevoegd aan je winkelwagen.", true);
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
        <p class="eyebrow">Winkelwagen</p>
        <h2>Je winkelwagen is nog leeg</h2>
        <p>Bekijk de collectie en voeg je favoriete artificial plants toe om verder te gaan.</p>
        <a class="button button-primary" href="/collectie.html">Naar collectie</a>
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
                <img src="${item.image}" alt="${item.name}" />
                <div>
                  <p class="eyebrow">PlantBrothers collectie</p>
                  <h2>${item.name}</h2>
                  <p>${formatPrice(item.price)} per stuk</p>
                </div>
                <div class="cart-item-controls">
                  <label for="qty-${item.slug}" class="sr-only">Aantal ${item.name}</label>
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
        <p class="eyebrow">Samenvatting</p>
        <h2>Besteloverzicht</h2>
        <div class="spec-row">
          <span>Subtotaal</span>
          <strong>${formatPrice(subtotal)}</strong>
        </div>
        <div class="spec-row">
          <span>Verzending</span>
          <strong>Gratis vanaf €100</strong>
        </div>
        <div class="spec-row">
          <span>Projectadvies</span>
          <strong>Beschikbaar</strong>
        </div>
        <a class="button button-primary" href="/contact.html">Ga verder met aanvraag</a>
        <button class="button button-secondary" type="button" data-clear-cart>Leeg winkelwagen</button>
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
initContactForm();
initCollectionFilters();
initAddToCartForms();
syncCartCount();
initLanguageSwitcher();
applyTranslations(document.documentElement, getCurrentLanguage());
window.addEventListener("cart:updated", syncCartCount);
window.addEventListener("load", initRevealAnimations);
