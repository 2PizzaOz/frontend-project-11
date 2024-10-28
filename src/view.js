import * as yup from 'yup';
import onChange from 'on-change';


const formEl = document.querySelector('form');
const inputEl = document.querySelector('#url-input');
const butEl = document.querySelector('button');


const formData = {
  website: '',
  validForm: ''
}

const userSchema = yup.object().shape({
  website: yup.string().required().url().nullable().matches(),
})

formEl.addEventListener('submit', async (even) => {
  even.preventDefault();
  formData.website = even.target[0].value
  const isValid = await userSchema.isValid(formData)
  
  watchedObj.validForm = isValid
  watchedObj.website = inputEl.value

  checkFormValidation(watchedObj)
  })

const watchedObj = onChange(formData, () => {

});

const checkFormValidation = (watchedObj) => {
  if(!watchedObj.validForm) {
    watchedObj.website === ''? console.log('ПУСТАЯ СТРОКА') : console.log('НЕПРАВИЛЬНЫЙ УРЛ')
  } else {console.log('ФОРМА ОТПРАВЛЕНА')}
}

console.log(formData)





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