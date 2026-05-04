import i18next from "https://cdn.jsdelivr.net/npm/i18next@23.10.1/+esm";
import HttpBackend from "https://cdn.jsdelivr.net/npm/i18next-http-backend@2.5.0/+esm";

const STORAGE_KEY = "lang";
export const DEFAULT_LANGUAGE = "nl";

export const LANGUAGE_OPTIONS = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "nl", flag: "🇳🇱", label: "Nederlands" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
];

let isI18nInitialized = false;
let currentLanguage = DEFAULT_LANGUAGE;

if (typeof window !== "undefined") {
  currentLanguage = window.localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;
  if (!LANGUAGE_OPTIONS.some(l => l.code === currentLanguage)) {
    currentLanguage = DEFAULT_LANGUAGE;
  }
}

const textSourceMap = new WeakMap();
const attributeSourceMap = new WeakMap();

export function getCurrentLanguage() {
  return currentLanguage;
}

export async function initTranslations() {
  if (isI18nInitialized) return;
  
  await i18next.use(HttpBackend).init({
    lng: currentLanguage,
    fallbackLng: "en",
    keySeparator: false,
    nsSeparator: false,
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    },
    interpolation: {
      escapeValue: false
    }
  });
  isI18nInitialized = true;
}

export async function setCurrentLanguage(language) {
  if (typeof window === "undefined") return;
  
  if (LANGUAGE_OPTIONS.some((item) => item.code === language)) {
    if (!isI18nInitialized) await initTranslations();
    
    // Set the language in i18next and wait for it to load
    await i18next.changeLanguage(language);
    
    currentLanguage = language;
    window.localStorage.setItem(STORAGE_KEY, language);
    
    // Dispatch event to notify the app to re-render
    document.dispatchEvent(new CustomEvent('lang:changed', { detail: { lang: language } }));
  }
}

function normalizeText(value) {
  if (typeof value !== 'string') return value;
  return value.replace(/\s+/g, " ").trim();
}

export function t(value, options = {}) {
  if (!isI18nInitialized || !value) return value;
  
  const normalized = normalizeText(value);
  if (!normalized || typeof normalized !== 'string') return value;

  // We use i18next.t which will use the current global language (set by changeLanguage)
  return i18next.t(normalized, options);
}

function shouldSkipNode(node) {
  const parent = node.parentElement;
  if (!parent) return true;
  if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) return true;
  if (parent.closest("[data-no-translate]")) return true;
  if (parent.closest("[data-i18n]")) return true;
  return false;
}

export async function applyTranslations(root = document.documentElement, language = currentLanguage) {
  if (!isI18nInitialized) await initTranslations();
  
  if (i18next.language !== language) {
    await i18next.changeLanguage(language);
    currentLanguage = language;
    window.localStorage.setItem(STORAGE_KEY, language);
  }

  document.documentElement.lang = language;

  // 1. Collect all nodes that need translation
  const textNodes = [];
  const targetRoot = root === document ? document.documentElement : root;
  const walker = document.createTreeWalker(targetRoot, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return shouldSkipNode(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    },
  });

  let node;
  while (node = walker.nextNode()) {
    if (node.textContent.trim()) textNodes.push(node);
  }

  // 2. Translate text nodes
  textNodes.forEach(textNode => {
    const sourceText = textSourceMap.get(textNode) ?? textNode.textContent;
    if (!textSourceMap.has(textNode)) {
      textSourceMap.set(textNode, sourceText);
    }
    
    const translated = t(sourceText);
    // Preserve whitespace
    const leading = sourceText.match(/^\s*/)?.[0] || "";
    const trailing = sourceText.match(/\s*$/)?.[0] || "";
    textNode.textContent = `${leading}${translated}${trailing}`;
  });

  // 3. Translate attributes and data-i18n
  const elements = targetRoot.querySelectorAll("*");
  const attributesToTranslate = ["placeholder", "aria-label", "title", "alt"];

  elements.forEach(element => {
    if (element.closest("[data-no-translate]")) return;

    // Attributes
    attributesToTranslate.forEach(attr => {
      if (element.hasAttribute(attr)) {
        let sources = attributeSourceMap.get(element);
        if (!sources) {
          sources = {};
          attributeSourceMap.set(element, sources);
        }
        
        const currentVal = element.getAttribute(attr);
        if (!sources[attr]) {
          sources[attr] = currentVal;
        }
        
        const translated = t(sources[attr]);
        element.setAttribute(attr, translated);
      }
    });

    // data-i18n
    if (element.hasAttribute('data-i18n')) {
      const key = element.getAttribute('data-i18n');
      const translatedHTML = i18next.t(key);
      element.innerHTML = translatedHTML;
    }

    // data-i18n-src (image swapping)
    if (element.hasAttribute('data-i18n-src')) {
      const key = element.getAttribute('data-i18n-src');
      const translatedSrc = i18next.t(key);
      element.setAttribute('src', translatedSrc);
    }
  });
}
