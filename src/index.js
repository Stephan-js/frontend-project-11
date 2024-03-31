import './scss/style.scss';
import validator from './functions/validation';
import languageSelector from './functions/language';


languageSelector();
window.setTimeout(() => validator());
