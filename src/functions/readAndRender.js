import axios from 'axios';
import i18next from 'i18next';
import _ from 'lodash';
import Render from './render';

const btnFunction = () => {

};

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

    this.ul = document.createElement('ul');
    this.ul.setAttribute('class', 'list-group border-0 rounded-0');

    this.feeds = document.querySelector('.feeds');
    this.posts = document.querySelector('.posts');
    this.input = document.querySelector('#url-input');
    this.status = document.querySelector('.feedback');
  }

  render(url, states) {
    const href = new URL('/', url).href;
  
    axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
      .then((d) => {
        const parser = new DOMParser();
        const data = parser.parseFromString(d.data.contents, 'text/html');
        const items = data.querySelectorAll('item');
        if (items.length <= 0) {
          throw new Error();
        }

        const feedId = this.state.feeds.length;
        const title = data.querySelector('title').innerHTML.replace(this.regexF, '');
        const description = data.querySelector('description').innerHTML.replace(this.regexF, '');
        this.state.feeds.push({
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
          
          this.state.posts.push({
            title: title.replace(this.regexL, ''),
            href: href,
            description: description.replace(this.regexL, ''),
            date: date,
            id: this.state.posts.length,
            fId: feedId,
            added: false,
          });
        });

        this.renderF.start(this.state, true, true);
        states.addedUrl.push(url);
      })
      .catch((e) => {
        console.log(e)
        this.renderF.start(this.state, false, false);
    });
  };
};

export default ReadAndRender;
