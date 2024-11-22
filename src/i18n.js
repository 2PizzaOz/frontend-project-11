import i18next from 'i18next';

i18next.init({
  fallbackLng: 'en',
  resources: {
    en: {
/* eslint-disable */
      translation: require('../locales/ru.json'),
      /* eslint-enable */
    },
  },
});
