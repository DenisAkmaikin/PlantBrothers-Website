import { createProductImageComponent } from "./product-image.js?v=20260317c";

export function createCategoryCard(category) {
  return `
    <article class="card category-card reveal">
      <div class="card-media-wrap">
        <img class="card-image" src="${category.image}" alt="${category.name}" loading="lazy" />
      </div>
      <div class="card-body">
        <p class="eyebrow">Collectie</p>
        <h3>${category.name}</h3>
        <p>${category.description}</p>
        <p class="card-kicker">${category.count}</p>
        <a class="text-link" href="${category.link}">Bekijk categorie</a>
      </div>
    </article>
  `;
}

export function createProductCard(product, options = {}) {
  const { variant = "default" } = options;
  const isFeatured = variant === "featured";
  const badges = product.badges.map((badge) => `<span class="badge">${badge}</span>`).join("");
  const stars = "★★★★★";
  const imageMarkup = product.media
    ? createProductImageComponent({
        ...product.media,
        className: `product-image-switch--card${isFeatured ? " product-image-switch--featured" : ""}`,
      })
    : `<img class="${product.imageMode === "contain" ? "card-image card-image-contain" : "card-image"}" src="${product.image}" alt="${product.name}" loading="lazy" />`;

  if (isFeatured) {
    const badgeLabel = product.badges[0] || "Featured";
    return `
      <article class="card product-card product-card--featured reveal" data-product-category="${product.filter}">
        <a class="product-image-wrap" href="/product-detail.html?slug=${product.slug}" aria-label="${product.name}">
          <div class="card-media-wrap">
            ${imageMarkup}
            <span class="featured-card-badge">${badgeLabel}</span>
          </div>
        </a>
        <div class="card-body card-body--compact">
          <h3>${product.name}</h3>
          <div class="product-footer product-footer--featured">
            <strong>${new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(product.price)}</strong>
            <a class="featured-card-link" href="/product-detail.html?slug=${product.slug}">Bekijk details</a>
          </div>
        </div>
      </article>
    `;
  }

  return `
    <article class="card product-card reveal" data-product-category="${product.filter}">
      <a class="product-image-wrap" href="/product-detail.html?slug=${product.slug}" aria-label="${product.name}">
        <div class="card-media-wrap">
          ${imageMarkup}
          <span class="product-hover-badge">Bekijk product</span>
        </div>
      </a>
      <div class="card-body">
        <div class="rating-row" aria-label="${product.rating} van 5 sterren">
          <span class="stars">${stars}</span>
          <span>${product.rating.toFixed(1)} (${product.reviewCount})</span>
        </div>
        <div class="product-meta">
          <p class="eyebrow">${product.category}</p>
          <p class="product-height">${product.height}</p>
        </div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="badge-row">${badges}</div>
        <div class="product-footer">
          <div>
            <strong>${new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(product.price)}</strong>
            <p class="old-price">voorheen ${new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(product.compareAtPrice)}</p>
          </div>
          <a class="text-link" href="/product-detail.html?slug=${product.slug}">Meer details</a>
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
      <p class="testimonial-quote">“${item.quote}”</p>
      <p class="testimonial-name">${item.name}</p>
      <p class="testimonial-role">${item.role}</p>
    </article>
  `;
}

export function createFaqItem(item, index) {
  return `
    <details class="faq-item reveal"${index === 0 ? " open" : ""}>
      <summary>${item.question}</summary>
      <p>${item.answer}</p>
    </details>
  `;
}

export function createBlogCard(post) {
  return `
    <article class="card blog-card reveal">
      <a class="blog-link" href="${post.href}" aria-label="${post.title}">
        <div class="card-media-wrap">
          <img class="card-image" src="${post.image}" alt="${post.title}" loading="lazy" />
        </div>
        <div class="card-body">
          <div class="blog-meta">
            <span class="badge">${post.category}</span>
            <span>${post.meta}</span>
          </div>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <span class="text-link">Lees meer</span>
        </div>
      </a>
    </article>
  `;
}
