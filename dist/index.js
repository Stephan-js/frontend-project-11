import './scss/style.scss';

import validator from './functions/validation.js';
import languageSelector from './functions/language.js';

document.querySelector('main').removeAttribute('style');
languageSelector();
window.setTimeout(() => validator());
