import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import fs from "fs";

i18next.use(HttpBackend).init({
  lng: "en",
  fallbackLng: "en",
  keySeparator: false,
  nsSeparator: false,
  backend: {
    loadPath: 'locales/{{lng}}/translation.json',
    request: (options, url, payload, callback) => {
      try {
        const data = fs.readFileSync(url, 'utf8');
        callback(null, { status: 200, data });
      } catch (e) {
        callback(e, { status: 500, data: null });
      }
    }
  }
}).then(() => {
  console.log("Translation of 'Business':", i18next.t("Business"));
  console.log("Translation of 'About Us':", i18next.t("About Us"));
  console.log("Translation of 'Natuurlijke schoonheid':", i18next.t("Natuurlijke schoonheid"));
});
