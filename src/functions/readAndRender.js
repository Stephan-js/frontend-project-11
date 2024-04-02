import axios from 'axios';
import Render from './render/render.js';
import { concat } from 'lodash';

class ReadAndRender {
  constructor() {
    this.state = {
      posts: [],
      feeds: [],
    };
    this.regexF = /^(<|&lt;)!-*\[CDATA\[/g;
    this.regexL = /\]\]-*(>|&gt;)$/g;

    this.logos = false;
    this.renderF = new Render();
    this.input = document.querySelector('#url-input');
    this.btn = document.querySelector('.text-btn');
  }

  render(url, states) {
    const href = new URL('/', url).href;
    this.input.setAttribute('disabled', '');
    this.btn.setAttribute('disabled', '');
  
    axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}&disableCache=true`)
      .then((d) => {
        const parser = new DOMParser();
        const data = parser.parseFromString(d.data.contents, 'text/html');
        const items = data.querySelectorAll('item');
        if (items.length <= 0) {
          throw new Error();
        }

        const lang = data.querySelector('language');
        const feedId = this.state.feeds.length;
        const title = data.querySelector('title').innerHTML.replace(this.regexF, '');
        const description = data.querySelector('description').innerHTML.replace(this.regexF, '');
        this.state.feeds.push({
          lng: (lang) ? lang.innerHTML : 'Unknown',
          title: title.replace(this.regexL, ''),
          href: href,
          description: description.replace(this.regexL, ''),
          id: feedId,
          added: false,
        });

        items.forEach((item) => {
          const href = item.querySelector('link').nextSibling.data.trim();
          const title = item.querySelector('title').innerHTML.replace(this.regexF, '');
          const description = item.querySelector('description').innerHTML.replace(this.regexF, '');
          const date = item.querySelector('pubDate').innerHTML;

          // Get category
          const categoryD = Array.from(item.querySelectorAll('category'));
          const category = categoryD.map((el) => el.innerHTML
          .replace(this.regexF, '')
          .replace(this.regexL, '')
          );

          this.state.posts.push({
            title: title.replace(this.regexL, ''),
            href: href,
            description: description.replace(this.regexL, ''),
            date: new Date(date),
            id: this.state.posts.length,
            fId: feedId,
            added: false,
            category: (category.length === 0) ? 'Unknown' : category.join(', '),
          });
        });

        this.renderF.start(this.state, true, true);
        states.addedUrl.push(href);
      })
      .catch((e) => {
        console.error(e);
        this.renderF.start(this.state, false, false);
    });
  };
};

export default ReadAndRender;
