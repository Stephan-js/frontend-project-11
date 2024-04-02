import "./css/style.css";
import "./css/bootstrap.min.css";

import validator from './functions/validation';
import languageSelector from './functions/language';

document.querySelector('main').removeAttribute('style');
languageSelector();
window.setTimeout(() => validator());
