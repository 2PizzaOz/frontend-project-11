import i18next from "i18next";
// import ru from '../locales/ru.json'



i18next.init({
//   debug: true,
  fallbackLng: 'en',
  resources: {
    en:{
        translation: require('../locales/ru.json')
            
            
        
    }
  }
})

// document.querySelector('h1').textContent = i18next.t('main.h1')
// console.log(i18next.t('main.h'))

// document.querySelector('h1').textContent = i18next.t('main.h1');
// console.log('18n', i18next.t('main.h1'))
// console.log('H1',document.querySelector('h1'))