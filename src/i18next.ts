import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './Locales/en.json';
import ar from './Locales/ar.json';

i18next
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            ar: { translation: ar }
        },
        lng: 'en',
        fallbackLng: 'en',
        supportedLngs: ['en', 'ar'],

        interpolation: {
            escapeValue: false
        }
    });
i18next.on('languageChanged', (lng) => {
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.classList.toggle("rtl", lng === "ar");
});



export default i18next;