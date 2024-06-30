import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export const supportedLngs = ["ko", "en"] as const;
export const supportedLngNames: Record<typeof supportedLngs[number], string> = {
  en: "🇬🇧 English",
  ko: "🇰🇷 한국어",
  // de: "🇩🇪 Deutsch"
};

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs,
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
