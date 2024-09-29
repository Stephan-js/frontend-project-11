// Lib
import i18next from 'i18next';
import { string } from 'yup';
import axios from 'axios';

// Custom stuff
import { eng, esp, ger } from './lang';
import allElements from './elements';

// Import render
import { render, renderP } from './render';

const app = () => {
  // Elements
  const {
    form,
    input,
    textB,
    selector,
    site,
  } = allElements;

  // innit lang selector
  i18next.init({
    lng: 'en',
    resources: {
      en: eng,
      sp: esp,
      gr: ger,
    },
  });

  // Parser and state (for sumbit event)
  const parser = new DOMParser();
  const state = {
    addedUrl: [],
    posts: [],
    feeds: [],
    logos: false,
  };

  // Fix artefact from parser
  const fixText = (text) => text
    .replace(/^(<|&lt;)!-*\[CDATA\[/g, '')
    .replace(/\]\]-*(>|&gt;)$/g, '');

  // auto Upadate function
  const autoUpdate = (url, lastUpdate, feedId) => {
    const autoUpdateSwitch = document.querySelector('#flexSwitchCheckDefault');

    // Check if autoUpdate on or off
    if (!autoUpdateSwitch.checked) {
      window.setTimeout(() => autoUpdate(url, lastUpdate, feedId), 5000);
      return;
    }

    // Make request
    const proxy = new URL('https://allorigins.hexlet.app/get');
    proxy.search = `url=${encodeURIComponent(url)}&disableCache=true`;
    axios.get(proxy)
      .then((d) => {
        let changes = false;
        const data = parser.parseFromString(d.data.contents, 'text/html');
        const items = data.querySelectorAll('item');

        items.forEach((item) => {
          // Get date publicaion
          const date = new Date(item.querySelector('pubDate').innerHTML);

          // Check via date if we need to add this post
          if (date.valueOf() > lastUpdate.valueOf()) {
            const href = item.querySelector('link').nextSibling.data.trim();
            const title = fixText(item.querySelector('title').innerHTML);
            const description = fixText(item.querySelector('description').innerHTML);

            // Get category
            const categoryD = Array.from(item.querySelectorAll('category'));
            const category = categoryD.map((el) => fixText(el.innerHTML));

            // Add to Array
            state.posts.push({
              title,
              href,
              description,
              date,
              id: state.posts.length,
              fId: feedId,
              added: false,
              category: (category.length === 0) ? 'Unknown' : category.join(', '),
            });

            changes = true;
          }
        });

        // Render all changes
        if (changes) {
          render(true, state);
        }

        // Get currect time (last update time)
        const time = Date.now();
        // Add next Timeout
        setTimeout(() => autoUpdate(url, time, feedId), 5000);
      })
      .catch((err) => {
        render(false, err.name);
      });
  };

  // Add event on submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Disable input
    input.setAttribute('disabled', '');
    textB.setAttribute('disabled', '');

    // Validate data
    string().url().required().validate(input.value.trim())
      .then((url) => {
        const { href } = new URL('/', url);
        const proxy = new URL('https://allorigins.hexlet.app/get');
        proxy.search = `url=${encodeURIComponent(url)}&disableCache=true`;
        if (!state.addedUrl.includes(href)) {
          axios.get(proxy)
            .then((d) => {
            // Use parser to data
              const data = parser.parseFromString(d.data.contents, 'text/html');
              // Select all data
              const items = data.querySelectorAll('item');

              // Throw Error if, it'a empty
              if (items.length <= 0) {
                render(false, 'not-rss');
                return;
              }

              // Get feed data
              const lang = data.querySelector('language');
              const feedId = state.feeds.length;
              const titleF = fixText(data.querySelector('title').innerHTML);
              const descriptionF = fixText(data.querySelector('description').innerHTML);

              // Add feed data
              state.feeds.push({
                lng: (lang) ? lang.innerHTML : undefined,
                titleF,
                href,
                descriptionF,
                id: feedId,
                added: false,
              });
              try {
                // Add each post
                items.forEach((item) => {
                // Get post data
                  const hrefP = item.querySelector('link').nextSibling.data.trim();
                  const title = fixText(item.querySelector('title').innerHTML);
                  const description = fixText(item.querySelector('description').innerHTML);
                  const date = item.querySelector('pubDate').innerHTML;

                  // Get category
                  const categoryD = Array.from(item.querySelectorAll('category'));
                  const category = categoryD.map((el) => fixText(el.innerHTML));

                  // Add post data
                  state.posts.push({
                    title,
                    hrefP,
                    description,
                    date: new Date(date),
                    id: state.posts.length,
                    fId: feedId,
                    added: false,
                    category: (category.length === 0) ? undefined : category.join(', '),
                  });
                });
              } catch {
                render(false, 'not-rss');
                return;
              }

              // Start render
              render(true, state, true);
              // Add this href (href not url) to added list
              state.addedUrl.push(href);

              // Get now time
              const time = Date.now();
              // Start autoUpdate
              window.setTimeout(() => autoUpdate(url, time, feedId), 5000);
            })
            .catch(() => {
              render(false, 'loading');
            });
        } else {
          render(false, 'exist');
        }
      })
      .catch((err) => {
        render(false, err.name);
      });
  });

  // Languge selctor (event)
  selector.addEventListener('change', (e) => {
    const lang = e.target.value;
    site.setAttribute('lang', lang);
    i18next.changeLanguage(lang);
    // Add this languge to Cookie
    document.cookie = `lng=${lang}; SameSite=Lax`;
    renderP();
  });

  // Get broweser languge
  const browserL = navigator.language.slice(0, 2);
  // Array of available languges
  const avlLng = ['en', 'sp', 'gr'];

  // Select broweser languge if we haven't cookie data and this languge available
  if (document.cookie === '' && !avlLng.includes(browserL)) {
    site.setAttribute('lang', browserL);
    i18next.changeLanguage(browserL);
    selector.querySelector(`option[value="${browserL}"]`).setAttribute('selected', '');
    // Select default languge (English)
  } else if (document.cookie === '') {
    site.setAttribute('lang', 'en');
    i18next.changeLanguage('en');
    selector.querySelector('option[value="en"]').setAttribute('selected', '');
  } else {
    // Select languge what was in cookie
    const lng = document.cookie.split('=')[1];
    site.setAttribute('lang', lng);
    i18next.changeLanguage(lng);
    selector.querySelector(`option[value="${lng}"]`).setAttribute('selected', '');
  }

  // Last prepare and... Done!
  renderP();
  document.querySelector('main').removeAttribute('style');
  input.focus();
};

export default app;
