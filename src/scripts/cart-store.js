import { getCurrentLanguage } from "../data/translations.js?v=20260511_v1";

const CART_KEY = "4everplants-cart";

function canUseStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

export function formatPrice(value) {
  const lang = getCurrentLanguage() === "en" ? "en-GB" : getCurrentLanguage();
  return new Intl.NumberFormat(lang, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(value);
}

export function getCart() {
  if (!canUseStorage()) return [];

  try {
    const raw = window.localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent("cart:updated", { detail: cart }));
}

export function getCartCount() {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}

export function addToCart(product, quantity = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.slug === product.slug);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity,
    });
  }

  saveCart(cart);
}

export function updateQuantity(slug, quantity) {
  const cart = getCart()
    .map((item) => (item.slug === slug ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0);

  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}
