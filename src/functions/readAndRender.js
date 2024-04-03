import axios from 'axios';
import Render from './render/render.js';

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
    this.autoUpdateSwitch = document.querySelector('#flexSwitchCheckDefault');
  }

  fixText(text) {
    return text
      .replace(this.regexF, '')
      .replace(this.regexL, '');
  }

  autoUpdate(url, lastUpdate, feedId) {
    if (!this.autoUpdateSwitch.checked) {
      window.setTimeout(() => this.autoUpdate(url, lastUpdate, feedId), 5000);
      return;
    }
  
    axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}&disableCache=true`)
      .then((d) => {
        const parser = new DOMParser();
        const data = parser.parseFromString(d.data.contents, 'text/html');
        const items = data.querySelectorAll('item');

        items.forEach((item) => {
          const date = new Date(item.querySelector('pubDate').innerHTML);

          if (date.valueOf() > lastUpdate.valueOf()) {
            const href = item.querySelector('link').nextSibling.data.trim();
            const title = this.fixText(item.querySelector('title').innerHTML);
            const description = this.fixText(item.querySelector('description').innerHTML);

            // Get category
            const categoryD = Array.from(item.querySelectorAll('category'));
            const category = categoryD.map((el) => this.fixText(el.innerHTML));

            this.state.posts.push({
              title: title,
              href: href,
              description: description,
              date: date,
              id: this.state.posts.length,
              fId: feedId,
              added: false,
              category: (category.length === 0) ? 'Unknown' : category.join(', '),
            });
          }
        });

        const time = Date.now();
        this.renderF.start(this.state, true, true);
        setTimeout(() => this.autoUpdate(url, time, feedId), 5000);
      })
      .catch();
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
        const title = this.fixText(data.querySelector('title').innerHTML);
        const description = this.fixText(data.querySelector('description').innerHTML);

        this.state.feeds.push({
          lng: (lang) ? lang.innerHTML : 'Unknown',
          title: title,
          href: href,
          description: description,
          id: feedId,
          added: false,
        });

        items.forEach((item) => {
          const href = item.querySelector('link').nextSibling.data.trim();
          const title = this.fixText(item.querySelector('title').innerHTML);
          const description = this.fixText(item.querySelector('description').innerHTML);
          const date = item.querySelector('pubDate').innerHTML;

          // Get category
          const categoryD = Array.from(item.querySelectorAll('category'));
          const category = categoryD.map((el) => el.innerHTML
          .replace(this.regexF, '')
          .replace(this.regexL, '')
          );

          this.state.posts.push({
            title: title,
            href: href,
            description: description,
            date: new Date(date),
            id: this.state.posts.length,
            fId: feedId,
            added: false,
            category: (category.length === 0) ? 'Unknown' : category.join(', '),
          });
        });

        this.renderF.start(this.state, true, true);
        states.addedUrl.push(href);
        const time = Date.now();

        window.setTimeout(() => this.autoUpdate(url, time, feedId), 5000);
      })
      .catch((e) => {
        console.error(e);
        this.renderF.start(this.state, false, false);
    });
  };
};

export default ReadAndRender;
