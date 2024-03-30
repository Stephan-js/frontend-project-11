import i18next from 'i18next';

const renderP = () => {
  const status = document.querySelector('.feedback');
  const textB = document.querySelector('.text-btn');
  const textN = document.querySelector('.text-name');
  const textD = document.querySelector('.text-discription');
  const textUrl = document.querySelector('.text-url');
  const textEx = document.querySelector('.text-expamle');
  const textF = document.querySelector('.text-feed');
  const textP = document.querySelector('.text-post');
  console.log(textF)
  
  textN.innerHTML = i18next.t('name');
  textD.innerHTML = i18next.t('discription');
  textUrl.innerHTML = i18next.t('textUrl');
  textB.innerHTML = i18next.t('button');
  textEx.innerHTML = i18next.t('example');
  status.innerHTML = '';
  if (textF && textP) {
    textF.innerHTML = i18next.t('feed');
    textP.innerHTML = i18next.t('post');
  }
};

export default renderP;
 