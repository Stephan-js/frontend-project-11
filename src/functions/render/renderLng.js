import i18next from 'i18next';

const renderP = () => {
  // Select all part on the page with text
  const status = document.querySelector('.feedback');
  const textB = document.querySelector('.text-btn');
  const textN = document.querySelector('.text-name');
  const textD = document.querySelector('.text-discription');
  const textUrl = document.querySelector('.text-url');
  const textEx = document.querySelector('.text-expamle');
  const textF = document.querySelector('.text-feed');
  const textP = document.querySelector('.text-post');
  const logo = document.querySelector('title');
  const autoUpdateSwitch = document.querySelector('.text-switch');

  // Add buttons
  const buttons = document.querySelectorAll('.btn-sm');
  const fullTextBtn = document.querySelector('.full-text');
  const moreDetBtn = document.querySelector('.text-moreDet');
  
  // Change values
  logo.innerHTML = i18next.t('name');
  textN.innerHTML = i18next.t('name');
  textD.innerHTML = i18next.t('description');
  textUrl.innerHTML = i18next.t('textUrl');
  textB.innerHTML = i18next.t('button');
  textEx.innerHTML = i18next.t('example');
  status.innerHTML = '';
  fullTextBtn.innerHTML = i18next.t('full-text');
  moreDetBtn.innerHTML = i18next.t('more-det');
  autoUpdateSwitch.innerHTML = i18next.t('auto-upt');

  // Change values if text Feeds and Posts was added
  if (textF && textP && buttons) {
    textF.innerHTML = i18next.t('feeds');
    textP.innerHTML = i18next.t('posts');
    buttons.forEach((btn) => {
      btn.innerHTML = i18next.t('btn-text');
    });
  }
};

export default renderP;
 