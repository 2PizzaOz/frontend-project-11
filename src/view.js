import * as yup from 'yup';
import { setLocale } from 'yup';
import i18next from "i18next";
import './i18n.js';
import onChange from 'on-change';
import axios from 'axios';

const formEl = document.querySelector('form');
const inputEl = document.querySelector('#url-input');
// const butEl = document.querySelector('button');
const pEleemFeedback = document.querySelector('.feedback')



const divElemF = document.createElement('div');
const h2ElemF = document.createElement('h2');
h2ElemF.textContent = 'Фиды';
const ulElemF = document.createElement('ul');
const liElemF = document.createElement('li');


const divElemFirst = document.createElement('div');
const ulElem = document.createElement('ul');

ulElem.setAttribute('class', 'list-group border-0 rounded-0')

const divElemSecond = document.createElement('div');
const divElemLast = document.createElement('div');
const h2Elem = document.createElement('h2');
divElemFirst.setAttribute('class', 'col-md-10 col-lg-8 order-1 mx-auto posts');
divElemSecond.setAttribute('class', 'card-border-0');
divElemLast.setAttribute('class', 'card-body');
h2Elem.textContent = 'Посты';

// Как можно исправить?___________________________________________________________________
const feedbackErr = (formData) => {
  if (formData.err) {
    pEleemFeedback.setAttribute('class', 'feedback m-0 position-absolute small text-success')
  } else {
    pEleemFeedback.setAttribute('class', 'feedback m-0 position-absolute smail text-danger')
  }
  
}
// Как можно исправить?____________________________________________________________________


const formData = {
  website: '', 
    posts: {
    title: [],
    descr: '',
    item: [],
    str: [],
    fid: [],
    flowWebsite:[],
    itemDescription: []
 },
  validate: '',
  err: '',
  modal: [],
  dubl: []
}


const watchedObj = onChange(formData, () => {});


setLocale({
  mixed: {
    required: ({ required }) => ({ key: pEleemFeedback.textContent = i18next.t('err.req') , values: { required } }),
    notOneOf: ({ notOneOf }) => ({ key: pEleemFeedback.textContent = i18next.t('err.ebb') , values: { notOneOf } }),
  },
  string: {
    url: ({ url }) => ({ key: pEleemFeedback.textContent = i18next.t('err.url') , values: { url } }),
  },
});





formEl.addEventListener('submit', async (even) => {
  even.preventDefault();

  let schema = yup.object().shape({
    website: yup.string().required().url().nullable().matches().notOneOf(formData.dubl)
  });
  formData.website = even.target[0].value;
  
  const isValid = await schema.isValid(formData);

  watchedObj.validate = isValid;
  watchedObj.website = inputEl.value;



  watchedObj.dubl.push(formData.website)
  
  

  
  


  console.log('isValid',isValid);
  console.log('formData',formData);

  try {
    await schema.validate({website: watchedObj.website});
  } catch (err) {
    
  err.errors.map((err) => i18next.t(err.key));
  watchedObj.err = false // Как можно исправить?
  feedbackErr(formData) // Как можно исправить?
  }
  if(isValid) {
    requestRRS(formData.website)
    pEleemFeedback.textContent = i18next.t('err.add')
    watchedObj.err = true // Как можно исправить?
    formEl.reset()
    feedbackErr(formData) // Как можно исправить?

  }
})






const requestRRS = (website) => {
  console.log('obj.website AXIOS',website)
  axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(website)}`)
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
  watchedObj.posts.itemDescription = domElem.querySelectorAll('item description')




  watchedObj.posts.flowWebsite.push(formData.website)
  filterDom(formData)
  // fidElem(formData);
  // postElem(formData)
}

const filterDom = (formData) => {
  const testProw = formData.posts.fid

  console.log('ЧТО В ИНДЕКСЕ',testProw[0])
  const titleElem = formData.posts.title;
  // console.log('PROVERKA', formData.posts.item)
  const itemElem = formData.posts.item;
  if(testProw.length === 0) {
    postElem(formData)
    fidElem(formData)
    
    
  } 
  


  else {
    
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
  const testProw = formData.posts.fid
  const titleElem = formData.posts.title;
  const descrElem = formData.posts.descr;
  if (testProw.includes(titleElem.textContent)) {

    return
  }
  
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
  
  
 
  fidE.append(divElemF);
  watchedObj.posts.fid.push(titleElem.textContent)
  flowCheck(formData.posts.flowWebsite)
}
let idIndex = -1;


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
      const dickE = element.querySelector('description');
      
      
      
      
      
      if (formData.posts.str.includes(titleE.textContent)) {
        return
      }
      
      idIndex += 1;
      const aE = document.createElement("a");
      const liE = document.createElement("li");
      const butE = document.createElement('button')
      
      liE.setAttribute("class", "list-group-item d-flex justify-content-between align-items-start border-0 border-end-0")

      butE.setAttribute("type", "button")
      butE.setAttribute("class", "btn btn-outline-primary btn-sm")
      butE.setAttribute("data-bs-toggle", "modal")
      butE.setAttribute("data-bs-target", "#modal")
      butE.setAttribute("data-id", idIndex)
      butE.textContent = "Просмотр"
      



      
      // console.log('modal сылка',linkE.textContent)
      // console.log('modal индекс', idIndex)
      // console.log('modal заголовок',titleE.textContent)
      // watchedObj.modal.push({id: idIndex, link: linkE.textContent, title: titleE.textContent, dick: dickE.textContent})
      
      aE.setAttribute("href", linkE.textContent);
      aE.setAttribute("class", "fw-bold")
      aE.setAttribute("target", "_blank")
      aE.setAttribute("rel", "noopener noreferrer")
      aE.setAttribute("data-id", idIndex)
      
      aE.addEventListener('click', () => {
        aE.classList.remove("fw-bold")
        aE.classList.add("fw-normal", "link-secondary")
      })
      
      aE.textContent = titleE.textContent;
//___________________________________________________________modal
// butE.addEventListener('click', (t) => {
//   if (t.getAttribute("data-id") === 1) {
//     console.log("EBAAATTTATATATATTATATAT")

//   }
// })
      // console.log('KNOPKA', butE.getAttribute("data-id"))

      // const modalh5Title = document.querySelector(".modal-title")
      // modalh5Title.textContent = titleE.textContent

      // const modalHref = document.querySelector(".btn")
      // modalHref.setAttribute("href", linkE.textContent)

      // const modalID = document.querySelector(".modal")
      // modalID.setAttribute("id", idIndex)

      
//___________________________________________________________
      watchedObj.posts.str.push(titleE.textContent)
      liE.append(aE);
      ulElem.append(liE);
      liE.append(butE)
      
      watchedObj.modal.push({id: idIndex, link: linkE.textContent, title: titleE.textContent, dick: dickE.textContent, aElementClass: aE})

      
    })
}








const modal = (formData) => {
  const exampleModal = document.getElementById('modal')
  if (exampleModal) {
    
    exampleModal.addEventListener('show.bs.modal', event => {
      
      const button = event.relatedTarget
      
      
     
      
      const recipient = button.getAttribute('data-id')
      const modalTitle = exampleModal.querySelector('.modal-title')
      const modalBodyInput = exampleModal.querySelector('.modal-body')
      const modalbuten = exampleModal.querySelector(".btn")


      

      const modal = formData.modal[recipient]

     
      const aElem = modal.aElementClass
      aElem.classList.remove("fw-bold")
      aElem.classList.add("fw-normal", "link-secondary")


      modalTitle.textContent = modal.title
      modalbuten.setAttribute("href", modal.link)
      modalBodyInput.textContent = modal.dick
      
    })
  }
  }
  modal(formData)
  
  


const flowCheck = (flows) => {
  
  // console.log('ЧТО ТУТ flowsflows ПРОИСХОДИТ!!!',flows)
  flows.forEach(flow => {
    console.log('ЧТО ТУТ flowsflows ПРОИСХОДИТ!!!',flow)
    requestRRS(flow)
  })


setTimeout(flowCheck, 5000, formData.posts.flowWebsite)
}







// const proba = document.querySelector(".modal")
// console.log('ЧТО ТУТУ МЕНЯ ',proba)


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