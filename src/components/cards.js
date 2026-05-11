import { createProductImageComponent } from "./product-image.js?v=20260511_v1";
import { t } from "../data/translations.js?v=20260511_v1";
import { formatPrice } from "../scripts/cart-store.js?v=20260511_v1";

export function createCategoryCard(category, index) {
  const isMiddle = index === 1;
  const mtClass = isMiddle ? " bento-card--offset" : "";
  
  return `
    <article class="bento-card reveal${mtClass}">
      <img class="bento-image" src="${category.image}" alt="${t(category.name)}" loading="lazy" />
      <div class="bento-overlay">
        <h3>${t(category.name)}</h3>
        <p>${t(category.description)}</p>
        <a class="bento-button" href="${category.link}" aria-label="${t("View")} ${t(category.name)}">
          <span class="material-symbols-outlined">north_east</span>
        </a>
      </div>
    </article>
  `;
}

export function createProductCard(product, options = {}) {
  const isFeatured = options.variant === "featured";
  const badges = product.badges.map((badge) => `<span class="badge">${t(badge)}</span>`).join("");
  const stars = "★★★★★";
  const imageSrc = product.media ? product.media.primarySrc : product.image;
  const imageClass = product.imageMode === "cover" ? "card-image card-image--cover" : "card-image";
  const imageMarkup = `<img class="${imageClass}" src="${imageSrc}" alt="${product.name}" loading="lazy" />`;

  const descriptionHtml = `<p class="product-description">${t(product.description)}</p>`;

  return `
    <article class="product-card reveal ${isFeatured ? "product-card--featured" : ""}" data-product-category="${product.filter}">
      <a class="product-image-wrap" href="/product-detail.html?slug=${product.slug}" aria-label="${t(product.name)}">
        ${imageMarkup}
      </a>
      <div class="product-card-body">
        <div class="product-meta">
          <p class="eyebrow uppercase-spaced">${t(product.category)}</p>
          <span class="product-height">${product.height}</span>
        </div>
        <h3>${t(product.name)}</h3>
        <div class="rating-row" aria-label="${product.rating} ${t("out of 5 stars")}">
          <span class="stars">${stars}</span>
          <span>${product.rating.toFixed(1)} (${product.reviewCount})</span>
        </div>
        <div class="product-card-badges">${badges}</div>
        ${descriptionHtml}
        <div class="product-footer">
          <div class="price-stack">
            <span class="current-price">${formatPrice(product.price)}</span>
            <span class="old-price">${formatPrice(product.compareAtPrice)}</span>
          </div>
          <a class="btn btn-secondary btn-sm" href="/product-detail.html?slug=${product.slug}">${t("Details")}</a>
        </div>
      </div>
    </article>
  `;
}

export function createTestimonialCard(item) {
  const stars = "★★★★★";

  return `
    <article class="testimonial-card reveal">
      <div class="rating-row">
        <span class="stars">${stars}</span>
        <span>${item.rating}.0</span>
      </div>
      <p class="testimonial-quote">“${t(item.quote)}”</p>
      <p class="testimonial-name">${t(item.name)}</p>
      <p class="testimonial-role">${t(item.role)}</p>
    </article>
  `;
}

export function createFaqItem(item, index) {
  return `
    <details class="faq-item reveal"${index === 0 ? " open" : ""}>
      <summary>${t(item.question)}</summary>
      <p>${t(item.answer)}</p>
    </details>
  `;
}

export function createBlogCard(post) {
  return `
    <article class="card blog-card reveal">
      <a class="blog-link" href="${post.href}" aria-label="${t(post.title)}">
        <div class="card-media-wrap">
          <img class="card-image" src="${post.image}" alt="${t(post.title)}" loading="lazy" />
        </div>
        <div class="card-body">
          <div class="blog-meta">
            <span class="badge">${t(post.category)}</span>
            <span>${t(post.meta)}</span>
          </div>
          <h3>${t(post.title)}</h3>
          <p>${t(post.excerpt)}</p>
          <span class="text-link">${t("Read more")}</span>
        </div>
      </a>
    </article>
  `;
}
