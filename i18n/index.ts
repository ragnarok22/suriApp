import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './locales/en.json';
import es from './locales/es.json';

const resources = {
  'en-US': { translation: en },
  'es': { translation: es },
  // pt: { translation: pt },
};

const initI18n = async () => {
  const language = Localization.locale;
  console.log('language', language);

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: language,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
}

initI18n();

export default i18n;
