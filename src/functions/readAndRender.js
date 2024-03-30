import axios from 'axios';
import i18next from 'i18next';
import _ from 'lodash';

const render = (url) => {
  axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
    .then((d) => {
      const parser = new DOMParser();
      const data = parser.parseFromString(d.data.contents, 'text/html');
      const items = data.querySelectorAll('item');
      const feeds = document.querySelector('.feeds');
      const posts = document.querySelector('.posts');
      const state = {
        posts: [],
      };

      const ul = document.createElement('ul');
      ul.setAttribute('class', 'list-group border-0 rounded-0');

      const logoPosts = document.createElement('div');
      const logoHPosts = document.createElement('h2');
      logoPosts.setAttribute('class', 'card border-0');
      logoHPosts.setAttribute('class', 'card-title h4 text-post');
      logoHPosts.innerHTML = i18next.t('post');
      logoPosts.append(logoHPosts);

      posts.append(logoPosts);
      posts.append(ul);
      const postsUl = posts.querySelector('ul');

      items.forEach((item) => {
        const id = _.uniqueId();
        const href = item.querySelector('link').nextSibling.data.trim();
        const title = item.querySelector('title').innerHTML;
        const description = item.querySelector('description').innerHTML;
        const date = item.querySelector('pubDate').innerHTML;

        state.posts.push({
          title: title,
          description: description,
          date: date,
          id: id,
        });

        const li = document.createElement('li');
        li.setAttribute('class',
        'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0');
        
        const a = document.createElement('a');
        a.setAttribute('href', href)
        a.setAttribute('class', 'fw-bold');
        a.setAttribute('data-postId', id);
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer')
        a.innerHTML = title;

        const btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.setAttribute('class', 'btn btn-outline-primary btn-sm');
        btn.setAttribute('data-postId', id);
        btn.setAttribute('data-bs-toggle', 'modal');
        btn.setAttribute('data-bs-target', '#modal')
        btn.innerHTML = i18next.t('btn-text');

        li.append(a);
        li.append(btn);

        postsUl.append(li);
      });
    })
    .catch(() => {
      throw new Error();
  });
};

export default render;
