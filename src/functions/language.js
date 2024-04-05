import i18next from 'i18next';
import renderP from './render/renderLng.js';

const languageSelector = () => {
  // init language model
  i18next.init({
    lng: 'en',
    resources: {
      en: {
        translation: {
          succeses: 'RSS aproved!',
          name: 'RSS aggregator',
          'auto-upt': 'Auto update',
          'full-text': 'See full',
          desc: 'Description',
          date: 'Date Published',
          feed: 'Feed',
          lng: 'Language',
          cate: 'Category',
          description: "Start reading RSS today! It's easy, it's nicely.",
          textUrl: 'RSS url',
          button: 'Add',
          feeds: 'Feeds',
          posts: 'Posts',
          'btn-text': 'More',
          'more-det': 'More Details',
          'less-det': 'Less Details',
          example: 'Example: https://justinpot.com/feed',
          error: {
            loading: "Sorry, we've problem with loading this RSS.",
            'not-rss': "Sorry, this url haven't any RSS.",
            unspecific: 'Oops, something went wrong!',
            ValidationError: 'This must be a valid URL.',
            Error: "Sorry, but You can't add two same pades.",
          },
        },
      },
      sp: {
        translation: {
          succeses: 'RSS aprobado!',
          name: 'Agregador RSS',
          'auto-upt': 'Actualización automática',
          'full-text': 'Ver completo',
          desc: 'Descripción',
          date: 'Fecha de publicación',
          feed: 'Feed',
          lng: 'Idioma',
          cate: 'Categoría',
          description: '¡Empiece a leer RSS hoy! Es fácil, es bien.',
          textUrl: 'url RSS',
          button: 'Agregar',
          feeds: 'Alimenta',
          posts: 'Publicaciones',
          'btn-text': 'Más',
          'more-det': 'Más detalles',
          'less-det': 'Menos detalles',
          example: 'Ejemplo: https://justinpot.com/feed',
          error: {
            unspecific: '¡Huy! Algo salió mal!',
            ValidationError: 'Por favor ingrese un enlace válido.',
            Error: 'Lo sentimos, pero no puedes agregar dos páginas iguales.',
          },
        },
      },
      ru: {
        translation: {
          succeses: 'RSS успешно загружен',
          name: 'RSS агрегатор',
          'auto-upt': 'Авто обновление',
          'full-text': 'Смотреть всё',
          desc: 'Описание',
          date: 'Дата публикации',
          feed: 'Источник',
          lng: 'Язык',
          cate: 'Категория',
          description: 'Начните читать RSS сегодня! Это легко, это удобно.',
          textUrl: 'Ссылка RSS',
          button: 'Добавить',
          feeds: 'Источники',
          posts: 'Посты',
          'btn-text': 'Просмотр',
          'more-det': 'Развернуть',
          'less-det': 'Сложить',
          example: 'Пример: https://justinpot.com/feed',
          error: {
            loading: "Ошибка сети",
            'not-rss': "Ресурс не содержит валидный RSS",
            unspecific: 'Упс, что-то пошло не так!',
            ValidationError: 'Ссылка должна быть валидным URL',
            Error: 'RSS уже существует',
          },
        },
      },
    },
  });

  // Select "Languge Selector"
  const selector = document.querySelector('#floatingSelect');
  const site = document.querySelector('html');
  // Get broweser languge
  const browserL = navigator.language.slice(0, 2);
  // Array of available languges
  const avlLng = ['en', 'sp'];

  // Select broweser languge if we haven't cookie data and this languge available
  if (document.cookie === '' && !avlLng.includes(browserL)) {
    site.setAttribute('lang', browserL);
    i18next.changeLanguage(browserL);
    selector.querySelector(`option[value="${browserL}"]`).setAttribute('selected', '');
    // Select defualt languge - eng
  } else if (document.cookie === '') {
    site.setAttribute('lang', 'ru');
    i18next.changeLanguage('ru');
    // selector.querySelector('option[value="ru"]').setAttribute('selected', '');
  } else {
    // Select languge what was in cookie
    const lng = document.cookie.split('=')[1];
    site.setAttribute('lang', lng);
    i18next.changeLanguage(lng);
    selector.querySelector(`option[value="${lng}"]`).setAttribute('selected', '');
  }

  // Render Page
  renderP();

  // Add action on change languge
  selector.addEventListener('change', (e) => {
    const lang = e.target.value;
    site.setAttribute('lang', lang);
    i18next.changeLanguage(lang);
    // Add this languge to Cookie
    document.cookie = `lng=${lang}; SameSite=Lax`;
    renderP();
  });
};

export default languageSelector;
