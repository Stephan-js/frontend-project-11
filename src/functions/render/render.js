import i18next from 'i18next';
import addFToBtn from '../btnFucntion.js';

class Render {
  constructor() {
    this.feedsUl = document.createElement('ul');
    this.postsUl = document.createElement('ul');
    this.feedsUl.setAttribute('class', 'list-group border-0 rounded-0');
    this.postsUl.setAttribute('class', 'list-group border-0 rounded-0');
    
    this.btn = document.querySelector('.text-btn');
    this.feeds = document.querySelector('.feeds');
    this.posts = document.querySelector('.posts');
    this.input = document.querySelector('#url-input');
    this.status = document.querySelector('.feedback');
  }

  start(data, addLogos, status) {
    if (!status) {
      this.input.setAttribute('class', 'form-control w-100 is-invalid');
      this.status.setAttribute('class', 'feedback m-9 position-absolute small text-danger');
      this.status.innerHTML = i18next.t('error.loading');

      this.input.removeAttribute('disabled');
      this.btn.removeAttribute('disabled');
      return;
    }

    if (addLogos) { 
      const feedNeedAdd = data.feeds.filter((el) => !el.added).reverse();
      feedNeedAdd.forEach((feed) => {
        const li = document.createElement('li');
        li.setAttribute('class', 'list-group-item border-0 border-end-0');

        const h3 = document.createElement('h3');
        h3.setAttribute('class', 'h6 m-0');
        h3.innerHTML = feed.title;

        const p = document.createElement('p');
        p.setAttribute('class', 'm-0 small text-black-50');
        p.innerHTML = feed.description;

        li.append(h3);
        li.append(p);
        data.feeds[feed.id].added = true;

        this.feedsUl.prepend(li);
      });

      this.feeds.innerHTML = '';
      this.feeds.append(this.feedsUl);

      const logoDiv = document.createElement('div');
      const logoH2 = document.createElement('h2');
      logoDiv.setAttribute('class', 'card border-0');
      logoH2.setAttribute('class', 'card-title h4 text-feed');
      logoH2.innerHTML = i18next.t('feed');

      logoDiv.append(logoH2);
      this.feeds.prepend(logoDiv);
    }
    
    const postNeedAdd = data.posts.filter((el) => !el.added).reverse();
    postNeedAdd.forEach((post) => {
      const li = document.createElement('li');
      li.setAttribute('class',
      'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0');
          
      const a = document.createElement('a');
      a.setAttribute('href', post.href)
      a.setAttribute('class', 'fw-bold');
      a.setAttribute('data-id', post.id);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer')
      a.innerHTML = post.title;
  
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
      data.posts[post.id].added = true;
  
      this.postsUl.prepend(li);
    });

    this.posts.innerHTML = '';
    this.posts.append(this.postsUl);
    const logoPosts = document.createElement('div');
    const logoHPosts = document.createElement('h2');
    logoPosts.setAttribute('class', 'card border-0');
    logoHPosts.setAttribute('class', 'card-title h4 text-post');
    logoHPosts.innerHTML = i18next.t('post');
    logoPosts.append(logoHPosts); 
    this.posts.prepend(logoPosts);

    this.input.setAttribute('class', 'form-control w-100');
    this.status.setAttribute('class', 'feedback m-9 position-absolute small text-success');
    this.input.value = '';
    this.input.focus();
    this.status.innerHTML = i18next.t('succeses');

    this.input.removeAttribute('disabled');
    this.btn.removeAttribute('disabled');
  };
}

export default Render;
