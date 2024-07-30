// Lib
import i18next from 'i18next';
import { string } from 'yup';
import axios from 'axios';

// Custom stuff
import { eng, esp, rus } from './lang';

const allElements = {
  autoUpdateSwitchT: document.querySelector('.text-switch'),
  site: document.querySelector('html'),

  form: document.querySelector('#urls'),
  input: document.querySelector('#url-input'),
  selector: document.querySelector('#floatingSelect'),

  status: document.querySelector('.feedback'),
  textB: document.querySelector('.text-btn'),
  textN: document.querySelector('.text-name'),
  textD: document.querySelector('.text-discription'),
  textUrl: document.querySelector('.text-url'),
  textEx: document.querySelector('.text-expamle'),
  textF: document.querySelector('.text-feed'),
  textP: document.querySelector('.text-post'),
  logo: document.querySelector('title'),
  autoUpdateSwitch: document.querySelector('.text-switch'),

  // Feeds and Posts
  feeds: document.querySelector('.feeds'),
  posts: document.querySelector('.posts'),

  // Add buttons
  fullTextBtn: document.querySelector('.full-text'),
  moreDetBtn: document.querySelector('.text-moreDet'),
};

const app = () => {
  // Elements
  const {
    form,
    input,
    status,
    textB,
    feeds,
    posts,
    logo,
    textN,
    textD,
    textUrl,
    textEx,
    fullTextBtn,
    moreDetBtn,
    autoUpdateSwitchT,
    selector,
    site,
  } = allElements;

  // innit lang selector
  i18next.init({
    lng: 'en',
    resources: {
      en: eng,
      sp: esp,
      ru: rus,
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

  // Feeds and Pust Ul
  const feedsUl = document.createElement('ul');
  const postsUl = document.createElement('ul');
  feedsUl.setAttribute('class', 'list-group border-0 rounded-0');
  postsUl.setAttribute('class', 'list-group border-0 rounded-0');

  //         --------  FUNCTION PART  --------

  // Fix artefact from parser
  const fixText = (text) => text
    .replace(/^(<|&lt;)!-*\[CDATA\[/g, '')
    .replace(/\]\]-*(>|&gt;)$/g, '');

  // Add function for button (more)
  const addFToBtn = (post, btn, states) => {
    // Other Buttons
    const closeBtn = document.querySelector('.btn-close');

    // All text and background
    const mTitle = document.querySelector('.modal-title');
    const mDesc = document.querySelector('.modal-body');
    const mHref = document.querySelector('.full-text');
    const body = document.querySelector('body');
    const alert = document.querySelector('#modal');
    const backGroudn = document.querySelector('.modal-backdrop');

    const moreLessBtnF = (e) => {
      const statuss = e.target.getAttribute('data-btn-status');

      if (statuss === 'less') {
        const data = [];
        data.push(`<p><b>${i18next.t('desc')}</b>: ${post.description}</p>`);
        data.push(`<p><b>${i18next.t('date')}</b>: 
        ${new Intl.DateTimeFormat(navigator.language).format(post.date)}</p>`);
        data.push(`<p><b>${i18next.t('feed')}</b>: ${states.feeds[post.fId].titleF}</p>`);
        data.push(`<p><b>${i18next.t('cate')}</b>: ${post.category}.</p>`);
        data.push(`<p><b>${i18next.t('lng')}</b>: ${states.feeds[post.fId].lng}.</p>`);
        data.push(`<p><b>ID</b>: ${post.id}</p>`);
        data.push(`<p><b>URL</b>: <a href="${post.hrefP}">${post.hrefP}</a></p>`);

        mDesc.innerHTML = data.join('');

        moreDetBtn.innerHTML = i18next.t('less-det');
        moreDetBtn.setAttribute('data-btn-status', 'more');
      } else {
        mDesc.innerHTML = post.description;

        moreDetBtn.innerHTML = i18next.t('more-det');
        moreDetBtn.setAttribute('data-btn-status', 'less');
      }
    };

    // Close function
    const closeBtnF = () => {
      // Show cool animation
      alert.setAttribute('class', 'modal fade');
      backGroudn.setAttribute('class', 'modal-backdrop fade');

      // Make not cool changes
      window.setTimeout(() => {
        body.removeAttribute('style');
        alert.setAttribute('style', ' display: none;');
        backGroudn.setAttribute('style', 'display: none;');
        moreDetBtn.innerHTML = i18next.t('more-det');
        moreDetBtn.setAttribute('data-btn-status', 'less');
        closeBtn.removeEventListener('click', closeBtnF);
        moreDetBtn.removeEventListener('click', moreLessBtnF);
      }, 100);
    };

    // "More" btn function
    btn.addEventListener('click', () => {
      // Set all data
      const postHtml = document.querySelector(`a[data-id="${post.id}"]`);
      const { description } = post;
      const { title } = post;
      const href = post.hrefP;

      // Set values
      mTitle.innerHTML = title;
      mDesc.innerHTML = description;
      mHref.setAttribute('href', href);
      postHtml.setAttribute('class', 'fw-normal text-body-secondary');

      // Open alert

      // Make not cool changes
      backGroudn.removeAttribute('style');
      alert.setAttribute('style', ' display: block;');
      body.setAttribute('style', 'overflow: hidden; padding-right: 0px;');

      // Show cool animation
      window.setTimeout(() => {
        alert.setAttribute('class', 'modal fade show');
        backGroudn.setAttribute('class', 'modal-backdrop fade show');
      });

      // Add events to buttons in alert
      closeBtn.addEventListener('click', closeBtnF);
      moreDetBtn.addEventListener('click', moreLessBtnF);
    });
  };

  //         --------  RENDER PART  --------

  // Render Page
  const renderP = () => {
    const buttons = document.querySelectorAll('.btn-sm');
    const textF = document.querySelector('.text-feed');
    const textP = document.querySelector('.text-post');

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
    autoUpdateSwitchT.innerHTML = i18next.t('auto-upt');

    // Change values if text Feeds and Posts was added
    if (textF && textP && buttons) {
      textF.innerHTML = i18next.t('feeds');
      textP.innerHTML = i18next.t('posts');
      buttons.forEach((btn) => {
        const button = btn;
        button.innerHTML = i18next.t('btn-text');
      });
    }
  };

  // Render added RSS
  const render = (stat, data, addF = false) => {
    // If stat === false => Error text
    if (!stat) {
      // Show Error
      input.setAttribute('class', 'form-control w-100 is-invalid');
      status.setAttribute('class', 'feedback m-9 position-absolute small text-danger');
      status.innerHTML = i18next.t(`error.${data}`);

      // Enable btn and input
      input.removeAttribute('disabled');
      textB.removeAttribute('disabled');
      return;
    }

    // If need add feed logo
    if (addF) {
      // Select feeds, what need add
      const feedNeedAdd = data.feeds.filter((el) => !el.added).reverse();
      // Add all feeds, what need to be added
      feedNeedAdd.forEach((feed) => {
        // Create all elements
        const li = document.createElement('li');
        li.setAttribute('class', 'list-group-item border-0 border-end-0');

        const h3 = document.createElement('h3');
        h3.setAttribute('class', 'h6 m-0');
        h3.innerText = feed.titleF;

        const p = document.createElement('p');
        p.setAttribute('class', 'm-0 small text-black-50');
        p.innerText = feed.descriptionF;

        // Add they for list
        li.append(h3);
        li.append(p);
        // Confirm what it was added
        const data2 = data;
        data2.feeds[feed.id].added = true;

        feedsUl.prepend(li);
      });

      // Add feeds to real DOM
      feeds.innerHTML = '';
      feeds.append(feedsUl);

      // Add logo (Feeds)
      const logoDiv = document.createElement('div');
      const logoH2 = document.createElement('h2');
      logoDiv.setAttribute('class', 'card border-0');
      logoH2.setAttribute('class', 'card-title h4 text-feed');
      logoH2.innerHTML = i18next.t('feeds');

      logoDiv.append(logoH2);
      feeds.prepend(logoDiv);
    }

    // Make same stuff for posts
    const postNeedAdd = data.posts.filter((el) => !el.added).reverse();
    postNeedAdd.forEach((post) => {
      const li = document.createElement('li');
      li.setAttribute(
        'class',
        'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0',
      );

      const a = document.createElement('a');
      a.setAttribute('href', post.hrefP);
      a.setAttribute('class', 'fw-bold');
      a.setAttribute('data-id', post.id);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
      a.innerText = post.title;

      const btn = document.createElement('button');
      btn.setAttribute('type', 'button');
      btn.setAttribute('class', 'btn btn-outline-primary btn-sm');
      btn.setAttribute('data-id', post.id);
      btn.setAttribute('data-bs-toggle', 'modal');
      btn.setAttribute('data-bs-target', '#modal');
      btn.innerHTML = i18next.t('btn-text');
      addFToBtn(post, btn, data);

      li.append(a);
      li.append(btn);

      const data2 = data;
      data2.posts[post.id].added = true;

      postsUl.prepend(li);
    });

    // Add posts
    posts.innerHTML = '';
    posts.append(postsUl);

    // Add logo (Posts)
    const logoPosts = document.createElement('div');
    const logoHPosts = document.createElement('h2');
    logoPosts.setAttribute('class', 'card border-0');
    logoHPosts.setAttribute('class', 'card-title h4 text-post');
    logoHPosts.innerHTML = i18next.t('posts');
    logoPosts.append(logoHPosts);
    posts.prepend(logoPosts);

    input.setAttribute('class', 'form-control w-100');
    status.setAttribute('class', 'feedback m-9 position-absolute small text-success');
    input.value = '';
    input.focus();
    status.innerHTML = i18next.t('succeses');

    // Enable input and btn
    input.removeAttribute('disabled');
    textB.removeAttribute('disabled');
  };

  //        ----- SELECTOR PART -----

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
    // validate data
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
              // select all data
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
                lng: (lang) ? lang.innerHTML : 'Unknown',
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
                    category: (category.length === 0) ? 'Unknown' : category.join(', '),
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

  //         --------  LANGUGE PART  --------

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
  const avlLng = ['en', 'sp', 'ru'];

  // Select broweser languge if we haven't cookie data and this languge available

  if (document.cookie === '' && !avlLng.includes(browserL)) {
    site.setAttribute('lang', browserL);
    i18next.changeLanguage(browserL);
    selector.querySelector(`option[value="${browserL}"]`).setAttribute('selected', '');
    // Select defualt languge - eng
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
