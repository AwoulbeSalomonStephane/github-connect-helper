import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en';
import fr from './locales/fr';
import es from './locales/es';
import ar from './locales/ar';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧', dir: 'ltr' as const },
  { code: 'fr', label: 'Français', flag: '🇫🇷', dir: 'ltr' as const },
  { code: 'es', label: 'Español', flag: '🇪🇸', dir: 'ltr' as const },
  { code: 'ar', label: 'العربية', flag: '🇸🇦', dir: 'rtl' as const },
];

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        fr: { translation: fr },
        es: { translation: es },
        ar: { translation: ar },
      },
      fallbackLng: 'en',
      supportedLngs: ['en', 'fr', 'es', 'ar'],
      interpolation: { escapeValue: false },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupLocalStorage: 'vibecam.lang',
      },
    });

  if (typeof document !== 'undefined') {
    const apply = (lng: string) => {
      const meta = SUPPORTED_LANGUAGES.find((l) => l.code === lng);
      document.documentElement.lang = lng;
      document.documentElement.dir = meta?.dir ?? 'ltr';
    };
    apply(i18n.language);
    i18n.on('languageChanged', apply);
  }
}

export default i18n;
