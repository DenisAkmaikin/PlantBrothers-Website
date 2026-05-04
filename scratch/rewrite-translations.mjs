import fs from 'fs';

const content = `
import i18next from "https://cdn.jsdelivr.net/npm/i18next@23.10.1/+esm";
import HttpBackend from "https://cdn.jsdelivr.net/npm/i18next-http-backend@2.5.0/+esm";

export const DEFAULT_LANGUAGE = "en";
const STORAGE_KEY = "plantbrothers-language";
const TRANSLATABLE_ATTRIBUTES = ["placeholder", "aria-label", "title", "content"];
const textSourceMap = new WeakMap();
const attributeSourceMap = new WeakMap();

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

export function getCurrentLanguage() {
  return currentLanguage;
}

export function setCurrentLanguage(language) {
  if (typeof window === "undefined") return;
  if (LANGUAGE_OPTIONS.some((item) => item.code === language)) {
    currentLanguage = language;
    window.localStorage.setItem(STORAGE_KEY, language);
  }
}

function normalizeText(value) {
  return String(value || "").replace(/\\s+/g, " ").trim();
}

function preserveWhitespace(source, translated) {
  const leading = source.match(/^\\s*/)?.[0] || "";
  const trailing = source.match(/\\s*$/)?.[0] || "";
  return \`\${leading}\${translated}\${trailing}\`;
}

function shouldSkipNode(node) {
  const parent = node.parentElement;
  if (!parent) return true;
  if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) return true;
  return Boolean(parent.closest("[data-no-translate]"));
}

export async function initTranslations() {
  await i18next.use(HttpBackend).init({
    lng: currentLanguage,
    fallbackLng: "en",
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    }
  });
  isI18nInitialized = true;
}

export function t(value) {
  if (!isI18nInitialized || !value) return value;
  const normalized = normalizeText(value);
  if (!normalized) return value;
  
  // Use exact match as key. In i18next, spaces and dots can be problematic,
  // but if we disable keySeparator and nsSeparator it works.
  // Actually, we can just use the translation.json directly if we bypass i18next's nested dot notation.
  // We didn't configure i18next to ignore dots. Let's just use getResource.
  const translated = i18next.getResource(currentLanguage, 'translation', normalized);
  return translated || value;
}

export async function applyTranslations(root = document.documentElement, language = currentLanguage) {
  if (!isI18nInitialized) {
    await initTranslations();
  }
  if (currentLanguage !== language) {
    setCurrentLanguage(language);
    await i18next.changeLanguage(language);
  }

  const targetRoot = root === document ? document.documentElement : root;
  if (!targetRoot) return;

  document.documentElement.lang = language;

  const walker = document.createTreeWalker(targetRoot, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return shouldSkipNode(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    },
  });

  let textNode = walker.nextNode();
  while (textNode) {
    const sourceText = textSourceMap.get(textNode) ?? textNode.textContent;
    if (!textSourceMap.has(textNode)) {
      textSourceMap.set(textNode, sourceText);
    }

    const translated = t(sourceText);
    if (translated !== sourceText) {
      textNode.textContent = preserveWhitespace(sourceText, translated);
    } else {
      textNode.textContent = sourceText;
    }

    textNode = walker.nextNode();
  }

  targetRoot.querySelectorAll("*").forEach((element) => {
    if (element.closest("[data-no-translate]")) return;

    let sourceAttributes = attributeSourceMap.get(element);
    if (!sourceAttributes) {
      sourceAttributes = {};
      attributeSourceMap.set(element, sourceAttributes);
    }

    TRANSLATABLE_ATTRIBUTES.forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;

      if (!(attribute in sourceAttributes)) {
        sourceAttributes[attribute] = element.getAttribute(attribute);
      }

      const sourceValue = sourceAttributes[attribute];
      const translated = t(sourceValue);
      element.setAttribute(attribute, translated);
    });
  });
}
`;

fs.writeFileSync('src/data/translations.js', content);
