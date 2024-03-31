import i18next from 'i18next';
import renderP from './renderLng';

const languageSelector = () => {
  i18next.init({
    lng: 'en',
    resources: {
      en: {
        translation: {
          "succeses": "RSS aproved!",
          "name": "RSS aggregator",
          "discription": "Start reading RSS today! It's easy, it's nicely.",
          "textUrl": "RSS url",
          "button": "Add",
          "feed": "Feeds",
          "post": "Posts",
          "btn-text": "More",
          "example": "Example: https://justinpot.com/feed",
          "error": {
            "loading": "Sorry, we've problem with loading this RSS.",
            "unspecific": "Oops, something went wrong!",
            "ValidationError": "This must be a valid URL.",
            "Error": "Sorry, but You can't add two same pades.",
          },
        } 
      },
      sp: {
        translation: {
          "succeses": "RSS aprobado!",
          "name": "Agregador RSS",
          "discription": "¡Empiece a leer RSS hoy! Es fácil, es bien.",
          "textUrl": "url RSS",
          "button": "Agregar",
          "feed": "Alimenta",
          "post": "Publicaciones",
          "btn-text": "Más",
          "example": "Ejemplo: https://justinpot.com/feed",
          "error": {
            "unspecific": "¡Huy! Algo salió mal!",
            "ValidationError": "Por favor ingrese un enlace válido.",
            "Error": "Lo sentimos, pero no puedes agregar dos páginas iguales.",
          },
        }
      },
      ru: {
        translation: {
          "succeses": "RSS принят!",
          "name": "RSS агрегатор",
          "discription": "Начните читать RSS сегодня! Это легко, это удобно.",
          "textUrl": "Ссылка RSS",
          "button": "Добавить",
          "feed": "Источники",
          "post": "Посты",
          "btn-text": "Подробнее",
          "example": "Пример: https://justinpot.com/feed",
          "error": {
            "unspecific": "Упс, что-то пошло не так!",
            "ValidationError": "Введите корректную ссылку.",
            "Error": "Извините, но Вы не можите добавть два одинковых сайта.",
          },
        }
      },
    }
  });

  const selector = document.querySelector('#floatingSelect');
  const browserL = navigator.language.slice(0, 2);
  const avlLng = ['en', 'sp'];
  if (document.cookie === '' && avlLng.includes(browserL)) {
    i18next.changeLanguage(browserL);
    selector.querySelector(`option[value="${browserL}"]`).setAttribute('selected', '');
  } else if (document.cookie === '') {
    selector.querySelector(`option[value="en"]`).setAttribute('selected', '');
  } else {
    const lng = document.cookie.split('=')[1];
    i18next.changeLanguage(lng);
    selector.querySelector(`option[value="${lng}"]`).setAttribute('selected', '');
  }
  renderP();

  selector.addEventListener('change', (e) => {
    const lang = e.target.value;
    i18next.changeLanguage(lang);
    document.cookie = `lng=${lang}; SameSite=Lax`;
    renderP();
  });
};

export default languageSelector;
