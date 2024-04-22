import './scss/style.scss';

import validator from './src/validation.js';
import languageSelector from './src/language.js';

document.querySelector('main').removeAttribute('style');
languageSelector();
window.setTimeout(() => validator());
