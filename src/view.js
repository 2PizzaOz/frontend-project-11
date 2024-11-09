import * as yup from 'yup';
import { setLocale } from 'yup';
import i18next from "i18next";
import './i18n.js';
import onChange from 'on-change';
import axios from 'axios';

const formEl = document.querySelector('form');
const inputEl = document.querySelector('#url-input');
const butEl = document.querySelector('button');

const divElemF = document.createElement('div');
const h2ElemF = document.createElement('h2');
h2ElemF.textContent = 'Фиды';
const ulElemF = document.createElement('ul');
const liElemF = document.createElement('li');

const divElemFirst = document.createElement('div');
const ulElem = document.createElement('ul');
const divElemSecond = document.createElement('div');
const divElemLast = document.createElement('div');
const h2Elem = document.createElement('h2');
divElemFirst.setAttribute('class', 'col-md-10 col-lg-8 order-1 mx-auto posts');
divElemSecond.setAttribute('class', 'card-border-0');
divElemLast.setAttribute('class', 'card-body');
h2Elem.textContent = 'Посты';



const formData = {
  website: '', 
    posts: {
    title: [],
    descr: '',
    item: [],
    str: [],
    fid: []
 },
  validate: '',
}
// console.log('FORMAFORMA!!!!!!!',formData)

const watchedObj = onChange(formData, () => {});


setLocale({
  mixed: {
    required: ({ required }) => ({ key: inputEl.nextElementSibling.textContent = i18next.t('err.req') , values: { required } }),
  },
  string: {
    url: ({ url }) => ({ key: inputEl.nextElementSibling.textContent = i18next.t('err.url') , values: { url } }),
  },
});

let schema = yup.object().shape({
  website: yup.string().required().url().nullable().matches()
});

formEl.addEventListener('submit', async (even) => {
  even.preventDefault();
  formData.website = even.target[0].value;
  const isValid = await schema.isValid(formData);

  watchedObj.validate = isValid;
  watchedObj.website = inputEl.value;

  console.log('isValid',isValid);
  console.log('formData',formData);

  try {
    await schema.validate({website: watchedObj.website});
  } catch (err) {
  err.errors.map((err) => i18next.t(err.key));
  }
  if(isValid) requestRRS(formData)
  
})




const requestRRS = (obj) => {
  console.log('obj.website AXIOS',obj.website)
  axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(obj.website)}`)
  .then(function (response) {
    console.log('response',response)
    parsingRRS(response)
  })
  .catch(function (error) {
    console.log('ошибка аксису',error);
  })
}

const parsingRRS = (response) => {
  const parser = new DOMParser();
  const domElem = parser.parseFromString(response.data.contents, "image/svg+xml");
  // console.log('ПАРСИМ TITLE', domElem.querySelector('title'))//ul li h3 
  // console.log('ПАРСИМ description', domElem.querySelector('description')) //p

  watchedObj.posts.title = domElem.querySelector('title');
  watchedObj.posts.descr = domElem.querySelector('description');
  watchedObj.posts.item = domElem.querySelectorAll('item');
  filterDom(formData)
  // fidElem(formData);
  
}

const filterDom = (formData) => {
  
  
  const titleElem = formData.posts.title;
  // console.log('PROVERKA', titleElem)
  const itemElem = formData.posts.item;
  if(formData.posts.str.length === 0) {
    postElem(formData)
    fidElem(formData) 
  } else {
    itemElem.forEach(element => {
      const titleE = element.querySelector('title');
      const test =  formData.posts.str
      if (test.includes(titleE.textContent)) {
        return
      } else {
        postElem(formData)
        fidElem(formData)
      }
    })
  }
  
  
}




const fidElem = (formData) => {
  

  
  const titleElem = formData.posts.title;
  const descrElem = formData.posts.descr;
  
  
  const h3ElemF = document.createElement('h3');
  h3ElemF.textContent = titleElem.textContent;
  const pElemF = document.createElement('p');
  pElemF.textContent = descrElem.textContent;
  ulElemF.append(liElemF);
  liElemF.append(h3ElemF);
  liElemF.append(pElemF);
  divElemF.append(h2ElemF);
  divElemF.append(ulElemF);
  const fidE = document.querySelector('#rowFid');

  watchedObj.posts.fid.push(titleElem.textContent)
 
  fidE.append(divElemF);
}



const postElem = (formData) => {
  const itemElem = formData.posts.item;

  const rowURLDiv = document.querySelector('#rowURL');

  divElemLast.append(h2Elem);
  divElemSecond.append(divElemLast);
  divElemSecond.append(ulElem);
  divElemFirst.append(divElemSecond);
  rowURLDiv.append(divElemFirst);

    itemElem.forEach(element => {
      const linkE = element.querySelector('link');
      const titleE = element.querySelector('title');

      const aE = document.createElement("a");
      const liE = document.createElement("li");

      aE.setAttribute("href", linkE.textContent);
      aE.textContent = titleE.textContent;

      watchedObj.posts.str.push(titleE.textContent)

      liE.append(aE);
      ulElem.append(liE);
    })
    
}




// const postElem = (formData) => {
//   const itemElem = formData.posts.item;

//   const rowURLDiv = document.querySelector('#rowURL');

//   divElemLast.append(h2Elem);
//   divElemSecond.append(divElemLast);
//   divElemSecond.append(ulElem);
//   divElemFirst.append(divElemSecond);
//   rowURLDiv.append(divElemFirst);

//   if(formData.posts.str.length === 0) {

//     itemElem.forEach(element => {
//       const linkE = element.querySelector('link');
//       const titleE = element.querySelector('title');

//       const aE = document.createElement("a");
//       const liE = document.createElement("li");

//       aE.setAttribute("href", linkE.textContent);
//       aE.textContent = titleE.textContent;

//       watchedObj.posts.str.push(titleE.textContent)

//       liE.append(aE);
//       ulElem.append(liE);
//     })
//   } else
//   {
//     itemElem.forEach(element => {
//       const linkE = element.querySelector('link');
//       const titleE = element.querySelector('title');
//       const test =  formData.posts.str

//       if (test.includes(titleE.textContent)) {
//         return
//       } else {
//         const aE = document.createElement("a");
//         const liE = document.createElement("li");
  
//         aE.setAttribute("href", linkE.textContent);
//         aE.textContent = titleE.textContent;
  
//         watchedObj.posts.str.push(titleE.textContent);
//         liE.append(aE);
//         ulElem.append(liE);
//       }
//     })
//   }
// }
  
// const postElem = (formData) => {
//   const itemElem = formData.posts.item;

//   const rowURLDiv = document.querySelector('#rowURL');

//   divElemLast.append(h2Elem);
//   divElemSecond.append(divElemLast);
//   divElemSecond.append(ulElem);
//   divElemFirst.append(divElemSecond);
//   rowURLDiv.append(divElemFirst);

//     itemElem.forEach(element => {
//       const linkE = element.querySelector('link');
//       const titleE = element.querySelector('title');

//       const aE = document.createElement("a");
//       const liE = document.createElement("li");

//       aE.setAttribute("href", linkE.textContent);
//       aE.textContent = titleE.textContent;

//       watchedObj.posts.str.push(titleE.textContent)

//       liE.append(aE);
//       ulElem.append(liE);
//     })
// }
  
  


  










//______________________________________________________________________________Общая функция читения и вывода
// const rrsE = document.querySelector('#rowURL')
// const ulE = document.createElement('ul')
// ulE.setAttribute("id", 'podURL')
// rrsE.append(ulE)




// const zapros = (obj) => {
//     axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(watchedObj.website)}`)
//     .then(function (response) {
     
//       const parser = new DOMParser();
//       const domElem = parser.parseFromString(response.data.contents, "image/svg+xml");
//       console.log('domElem',domElem.querySelectorAll('item'))
      
//       const itemE = domElem.querySelectorAll('item')
//       itemE.forEach(element => {
//         const linkE = element.querySelector('link')
//         const titleE = element.querySelector('title')

//         console.log('titleE FOREACH', titleE)
//         console.log('etest FOREACH',linkE.textContent)
//         console.log('element FOREACH',element)
        
//         const aE = document.createElement("a")

//         aE.setAttribute("href", linkE.textContent)
//         aE.textContent = titleE.textContent
        
//         const liE = document.createElement("li")
        
//         liE.append(aE)

//         const ulE = document.createElement('ul')
//         ulE.append(liE)
//         rrsE.append(ulE)

//       });
//     })
//     .catch(function (error) {
//       console.log('ошибка аксису',error);
//     })
//   }

//_____________________________________________________________________Общая функция читения и вывода



//______________________РАБОЧАЯ______________________________________________________________________

// import * as yup from 'yup';
// import onChange from 'on-change';


// const formEl = document.querySelector('form');
// const inputEl = document.querySelector('#url-input');
// const butEl = document.querySelector('button');


// const formData = {
//   website: '',
//   validForm: ''
// }

// const userSchema = yup.object().shape({
//   website: yup.string().required().min(30).url().nullable().matches(),
// })




// formEl.addEventListener('submit', async (even) => {
//   even.preventDefault();
//   formData.website = even.target[0].value
//   const isValid = await userSchema.isValid(formData)
  
//   watchedObj.validForm = isValid
//   watchedObj.website = inputEl.value

//   checkFormValidation(watchedObj)
//   })

// const watchedObj = onChange(formData, () => {

// });

// const checkFormValidation = (watchedObj) => {
//   if(!watchedObj.validForm) {
//     watchedObj.website === ''? console.log('ПУСТАЯ СТРОКА') : console.log('НЕПРАВИЛЬНЫЙ УРЛ')
//   } else {console.log('ФОРМА ОТПРАВЛЕНА')}
// }

// console.log(formData)

//____________________________РАЬОЧАЯ_______________________________________________________^^^^



//______________________________________________________________________________________

// import * as yup from 'yup';
// import onChange from 'on-change';


// const formEl = document.querySelector('form');
// const inputEl = document.querySelector('#url-input');
// const butEl = document.querySelector('button');

// const formData = {
//   website: '',
//   validForm: ''
// }

// const userSchema = yup.object().shape({
//   website: yup.string().url().nullable().required(),
// })

// formEl.addEventListener('submit', async (even) => {
//   even.preventDefault();
//   formData.website = even.target[0].value
//   const isValid = await userSchema.isValid(formData)
  
//   watchedObj.validForm = isValid
  
//   // watchedObj.website = inputEl.value
  
//   // console.log(watchedObj.website)
// })

// butEl.addEventListener('click', () => {
//   chekForm(formData)
//  })

// const chekForm = (formData) => {
//   watchedObj.website = inputEl.value
//   console.log('eee',formData)
//   if (!formData.validForm){
//     formData.website === ''? console.log('ЗАБЫЛИ ВПИСАТЬ') : console.log('Неправильный УРЛ')
    
//   } else {console.log('PROSLO')}
// }

// const watchedObj = onChange(formData, (value) => {
//  console.log('eee', value)
// });


 



//________________________________________________________________________________________________




// Простой вариант валидации не асинхроный вариант ________________________________________

// const formEl = document.querySelector('form');
// const inputEl = formEl.querySelector('#url-input');
// const butEl = formEl.querySelector('button');
// const regExpUrl = /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/;

// const validateElement = (inputEl) => {
//   if (inputEl.name === 'URL') {
//     if (!regExpUrl.test(inputEl.value)) {
//       inputEl.nextElementSibling.textContent = 'Не правильный URL'
//     } else {
//       inputEl.nextElementSibling.textContent = 'RRS успешно загрушен'
//       console.log(inputEl.value)
//     }
//   }
// }

// butEl.addEventListener('click', () => {
//   validateElement(inputEl)
// })

// formEl.addEventListener('submit', (even) => {
//   even.preventDefault();
//   if (inputEl.value === '') {
//     inputEl.nextElementSibling.textContent = 'Вы пропусти это поле'
//   } 
// })

//______________________________________________________________________________________________














// import onChange from "on-change";

//   const state = {
//     value: ''
//   }

// const watchedObj = onChange(state,(value) => {

// })



// const formEl = document.querySelector('form')
// const inputEl = formEl.querySelector('#url-input');
// const butEl = formEl.querySelector('button')

// console.log(formEl)


// inputEl.addEventListener('keyup', (event) => {
//     const { target } = event;
//     if (!target.value.includes('http:')) {
//         target.style.borderColor = 'red';
//     } else {
//         target.style.borderColor = 'black';
//     }
// })