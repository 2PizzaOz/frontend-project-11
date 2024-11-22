import * as yup from 'yup';
import { setLocale } from 'yup';
import i18next from 'i18next';
import './i18n.js';
import onChange from 'on-change';
import axios from 'axios';

const formEl = document.querySelector('form');
const inputEl = document.querySelector('#url-input');
const pEleemFeedback = document.querySelector('.feedback');

const divElemF = document.createElement('div');
divElemF.setAttribute('class', 'card border-0');

const divElemSecondF = document.createElement('div');
divElemSecondF.setAttribute('class', 'card-body');

const h2ElemF = document.createElement('h2');
h2ElemF.setAttribute('class', 'card-title h4');
h2ElemF.textContent = 'Фиды';

const ulElemF = document.createElement('ul');
ulElemF.setAttribute('class', 'list-group border-0 rounded-0');

const liElemF = document.createElement('li');
liElemF.setAttribute('class', 'list-group-item border-0 border-end-0');

const ulElem = document.createElement('ul');

ulElem.setAttribute('class', 'list-group border-0 rounded-0');

const divElemFirst = document.createElement('div');
const divElemSecond = document.createElement('div');
const divElemLast = document.createElement('div');

divElemFirst.setAttribute('class', 'card border-0');
divElemSecond.setAttribute('class', 'card-body');
divElemLast.setAttribute('class', 'card-body');

const h2Elem = document.createElement('h2');
h2Elem.setAttribute('class', 'card-title h4');
h2Elem.textContent = 'Посты';

const feedbackErr = (formData) => {
  if (formData.err) {
    pEleemFeedback.setAttribute('class', 'feedback m-0 position-absolute small text-success');
  } else {
    pEleemFeedback.setAttribute('class', 'feedback m-0 position-absolute smail text-danger');
  }
};

const formData = {
  website: '',
  posts: {
    title: [],
    descr: '',
    item: [],
    str: [],
    fid: [],
    flowWebsite: [],
    itemDescription: [],
  },
  validate: '',
  err: '',
  modal: [],
  dubl: [],
};

const watchedObj = onChange(formData, () => {});
/* eslint-disable */
setLocale({
  mixed: {
    required: ({ required }) => ({ key: pEleemFeedback.textContent = i18next.t('err.req'), values: { required } }),
    notOneOf: ({ notOneOf }) => ({ key: pEleemFeedback.textContent = i18next.t('err.ebb'), values: { notOneOf } }),
  },
  string: {
    url: ({ url }) => ({ key: pEleemFeedback.textContent = i18next.t('err.url'), values: { url } }),
  },
});
/* eslint-enable */
const parsingRRS = (response) => {
  const parser = new DOMParser();
  const domElem = parser.parseFromString(response.data.contents, 'image/svg+xml');

  watchedObj.posts.title = domElem.querySelector('title');
  watchedObj.posts.descr = domElem.querySelector('description');
  watchedObj.posts.item = domElem.querySelectorAll('item');
  watchedObj.posts.itemDescription = domElem.querySelectorAll('item description');

  watchedObj.posts.flowWebsite.push(formData.website);
  filterDom(formData);
};

const fidElem = (obj) => {
  const testProw = obj.posts.fid;
  const titleElem = obj.posts.title;
  const descrElem = obj.posts.descr;
  if (testProw.includes(titleElem.textContent)) {
    return;
  }
  const h3ElemF = document.createElement('h3');
  h3ElemF.textContent = titleElem.textContent;
  h3ElemF.setAttribute('class', 'h6 m-0');

  const pElemF = document.createElement('p');
  pElemF.setAttribute('class', 'm-0 small text-black-50');
  pElemF.textContent = descrElem.textContent;

  ulElemF.append(liElemF);
  liElemF.append(h3ElemF);
  liElemF.append(pElemF);
  divElemSecondF.append(h2ElemF);
  divElemF.append(divElemSecondF);
  divElemF.append(ulElemF);
  const fidE = document.querySelector('#rowFid');

  fidE.append(divElemF);
  watchedObj.posts.fid.push(titleElem.textContent);
  flowCheck(obj.posts.flowWebsite);
};

let idIndex = -1;

const postElem = (obj) => {
  const itemElem = obj.posts.item;
  const rowURLDiv = document.querySelector('#rowURL');

  divElemSecond.append(h2Elem);
  divElemFirst.append(divElemSecond);
  divElemFirst.append(ulElem);
  rowURLDiv.append(divElemFirst);

  itemElem.forEach((element) => {
    const linkE = element.querySelector('link');
    const titleE = element.querySelector('title');
    const dickE = element.querySelector('description');

    if (obj.posts.str.includes(titleE.textContent)) {
      return;
    }

    idIndex += 1;
    const aE = document.createElement('a');
    const liE = document.createElement('li');
    const butE = document.createElement('button');

    liE.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0');
    butE.setAttribute('type', 'button');
    butE.setAttribute('class', 'btn btn-outline-primary btn-sm');
    butE.setAttribute('data-bs-toggle', 'modal');
    butE.setAttribute('data-bs-target', '#modal');
    butE.setAttribute('data-id', idIndex);
    butE.textContent = 'Просмотр';

    aE.setAttribute('href', linkE.textContent);
    aE.setAttribute('class', 'fw-bold');
    aE.setAttribute('target', '_blank');
    aE.setAttribute('rel', 'noopener noreferrer');
    aE.setAttribute('data-id', idIndex);

    aE.addEventListener('click', () => {
      aE.classList.remove('fw-bold');
      aE.classList.add('fw-normal', 'link-secondary');
    });
    aE.textContent = titleE.textContent;

    watchedObj.posts.str.push(titleE.textContent);
    liE.append(aE);
    ulElem.append(liE);
    liE.append(butE);

    watchedObj.modal.push({
      id: idIndex,
      link: linkE.textContent,
      title: titleE.textContent,
      dick: dickE.textContent,
      aElementClass: aE,
    });
  });
};

const requestRRS = (website) => {
  axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(website)}`)
    .then((response) => {
      parsingRRS(response);
    })
    .catch((error) => {
      console.log('ошибка аксису', error);
    });
};

formEl.addEventListener('submit', async (even) => {
  even.preventDefault();

  const schema = yup.object().shape({
    website: yup.string()
      .required()
      .url()
      .nullable()
      .notOneOf(formData.dubl),
  });
  formData.website = even.target[0].value;

  const isValid = await schema.isValid(formData);

  watchedObj.validate = isValid;
  watchedObj.website = inputEl.value;

  try {
    await schema.validate({ website: watchedObj.website });
    watchedObj.dubl.push(formData.website);
    requestRRS(formData.website);
    pEleemFeedback.textContent = i18next.t('err.add');
    watchedObj.err = true;
    formEl.reset();
    feedbackErr(formData);
  } catch (errs) {
    errs.errors.map((err) => i18next.t(err.key));
    watchedObj.err = false;
    feedbackErr(formData);
  }
});

const flowCheck = (flows) => {
  flows.forEach((flow) => {
    requestRRS(flow);
  });
  setTimeout(flowCheck, 5000, formData.posts.flowWebsite);
};

const filterDom = (obj) => {
  const testProw = obj.posts.fid;

  const itemElem = obj.posts.item;
  if (testProw.length === 0) {
    postElem(obj);
    fidElem(obj);
  } else {
    itemElem.forEach((element) => {
      const titleE = element.querySelector('title');
      const test = obj.posts.str;
      if (test.includes(titleE.textContent)) {
        return;
      }
      postElem(obj);
      fidElem(obj);
    });
  }
};

const modale = (obj) => {
  const exampleModal = document.getElementById('modal');
  if (exampleModal) {
    exampleModal.addEventListener('show.bs.modal', (event) => {
      const button = event.relatedTarget;

      const recipient = button.getAttribute('data-id');
      const modalTitle = exampleModal.querySelector('.modal-title');
      const modalBodyInput = exampleModal.querySelector('.modal-body');
      const modalbuten = exampleModal.querySelector('.btn');

      const modal = obj.modal[recipient];

      const aElem = modal.aElementClass;
      aElem.classList.remove('fw-bold');
      aElem.classList.add('fw-normal', 'link-secondary');

      modalTitle.textContent = modal.title;
      modalbuten.setAttribute('href', modal.link);
      modalBodyInput.textContent = modal.dick;
    });
  }
};
modale(formData);
