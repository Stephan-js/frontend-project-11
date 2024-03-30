import axios from 'axios';
import i18next from 'i18next';

const render = (url) => {
  axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
    .then((d) => {
      const parser = new DOMParser();
      const data = parser.parseFromString(d.data.contents, 'text/html');
      const items = data.querySelectorAll('item');
      const feeds = document.querySelector('.feeds');
      const posts = document.querySelector('.posts');
      console.log(items)
    })
    .catch(() => {
      throw new Error();
  });
};

export default render;
