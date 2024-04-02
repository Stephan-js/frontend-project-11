import i18next from 'i18next';

const addFToBtn = (post, btn, state) => {
  // Set all part for DOM

  // Other Buttons
  const closeBtn = document.querySelector('.btn-close');
  const moreDetBtn = document.querySelector('.text-moreDet');

  // All text and background
  const mTitle = document.querySelector('.modal-title');
  const mDesc = document.querySelector('.modal-body');
  const mHref = document.querySelector('.full-text');
  const body = document.querySelector('body');
  const alert = document.querySelector('#modal');
  const backGroudn = document.querySelector('.modal-backdrop');

  const moreLessBtnF = (e) => {
    const status = e.target.getAttribute('data-btn-status');
  
    if (status === 'less') {
      const data = [];
      data.push(`<p><b>Description</b>: ${post.description}</p>`);
      data.push(`<p><b>Date Published</b>: 
      ${new Intl.DateTimeFormat(navigator.language).format(post.date)}</p>`);
      data.push(`<p><b>Feed</b>: ${state.feeds[post.fId].title}</p>`);
      data.push(`<p><b>Language</b>: ${state.feeds[post.fId].lng}</p>`);
      data.push(`<p><b>Id</b>: ${post.id}</p>`);
      data.push(`<p><b>URL</b>: <a href="${post.href}">${post.href}</a></p>`);
  
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
    moreDetBtn.innerHTML = i18next.t('more-det');
    moreDetBtn.setAttribute('data-btn-status', 'less');

    // Show cool animation
    alert.setAttribute('class', 'modal fade');
    backGroudn.setAttribute('class', 'modal-backdrop fade');

    // Make not cool changes
    window.setTimeout(() => {
      body.removeAttribute('style');
      alert.setAttribute('style',' display: none;');
      backGroudn.setAttribute('style', 'display: none;');
      closeBtn.removeEventListener('click', closeBtnF);
      moreDetBtn.removeEventListener('click', moreLessBtnF);
    }, 100);
  };

  // "More" btn function
  btn.addEventListener('click', () => {
    // Set all data
    const description = post.description;
    const title = post.title;
    const href = post.href;
    
    // Set values
    mTitle.innerHTML = title;
    mDesc.innerHTML = description;
    mHref.setAttribute('href', href);

    // Open alert

    // Make not cool changes
    backGroudn.removeAttribute('style');
    alert.setAttribute('style',' display: block;');
    body.setAttribute('style', 'overflow: hidden; padding-right: 0px;');

    // Show cool animation
    window.setTimeout(() => {
      alert.setAttribute('class', 'modal fade show');
      backGroudn.setAttribute('class', 'modal-backdrop fade show');
    });

    
    closeBtn.addEventListener('click', closeBtnF);
    moreDetBtn.addEventListener('click', moreLessBtnF);
  });
};

export default addFToBtn;
