import i18next from 'i18next';
import allElements from './elements';

const {
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
} = allElements;

// Feeds and Pust Ul
const feedsUl = document.createElement('ul');
const postsUl = document.createElement('ul');
feedsUl.setAttribute('class', 'list-group border-0 rounded-0');
postsUl.setAttribute('class', 'list-group border-0 rounded-0');

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
      if (post.category) data.push(`<p><b>${i18next.t('cate')}</b>: ${post.category}.</p>`);
      if (states.feeds[post.fId].lng) {
        data.push(`<p><b>${i18next.t('lng')}</b>: ${states.feeds[post.fId].lng}.</p>`);
      }
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
  status.innerHTML = i18next.t(status.dataset.text);
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
    status.dataset.text = `error.${data}`;

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
  status.innerHTML = i18next.t('success');
  status.dataset.text = 'success';

  // Enable input and btn
  input.removeAttribute('disabled');
  textB.removeAttribute('disabled');
};

export { render, renderP };
