import i18next from 'i18next';

const languageSelector = () => {
  i18next.init({
    lng: navigator.language.slice(0, 2),
    resources: {
      en: {
        translation: {
          "succeses": "RSS aproved!",
          "name": "RSS aggregator",
          "discription": "Start reading RSS today! It's easy, it's beautiful.",
          "textUrl": "RSS url",
          "example": "Example: https://justinpot.com/feed",
          "error": {
            "unspecific": "Oops, something went wrong!",
            "ValidationError": "This must be a valid URL.",
            "Error": "Sorry, but you can't add two same pades.",
          },
        } 
      },
      sp: {
        translation: {
          "succeses": "RSS aprobado!",
          "name": "Agregador RSS",
          "discription": "¡Empiece a leer RSS hoy! Es fácil, es hermoso.",
          "textUrl": "url RSS",
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
          "discription": "Начните читать RSS сегодня! Это легко, это красиво.",
          "textUrl": "Ссылка RSS",
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
  const textN = document.querySelector('#text-name');
  const textD = document.querySelector('#text-discription');
  const textUrl = document.querySelector('#text-url');
  const textEx = document.querySelector('#text-expamle');

  selector.addEventListener('change', (e) => {
    i18next.changeLanguage(e.target.value);
    console.log(i18next.t('name'))
    textN.innerHTML = i18next.t('name');
    textD.innerHTML = i18next.t('discription');
    textUrl.innerHTML = i18next.t('textUrl');
    textEx.innerHTML = i18next.t('example');
  });
};

export default languageSelector;
