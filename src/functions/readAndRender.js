import axios from 'axios';
import Render from './render/render.js';

class ReadAndRender {
  // Some stuff, what I won't change
  constructor() {
    this.state = {
      posts: [],
      feeds: [],
    };
    this.regexF = /^(<|&lt;)!-*\[CDATA\[/g;
    this.regexL = /\]\]-*(>|&gt;)$/g;

    this.logos = false;
    this.parser = new DOMParser();
    this.renderF = new Render();
    this.input = document.querySelector('#url-input');
    this.btn = document.querySelector('.text-btn');
    this.autoUpdateSwitch = document.querySelector('#flexSwitchCheckDefault');
  }

  // Delete all artifacts from output
  fixText(text) {
    return text
      .replace(this.regexF, '')
      .replace(this.regexL, '');
  }

  autoUpdate(url, lastUpdate, feedId) {
    // Cheack if autoUpdate on or off
    if (!this.autoUpdateSwitch.checked) {
      window.setTimeout(() => this.autoUpdate(url, lastUpdate, feedId), 5000);
      return;
    }

    // Make request
    axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}&disableCache=true`)
      .then((d) => {
        let changes = false;
        const data = this.parser.parseFromString(d.data.contents, 'text/html');
        const items = data.querySelectorAll('item');

        items.forEach((item) => {
          // Get date publicaion
          const date = new Date(item.querySelector('pubDate').innerHTML);

          // Check via date if we need to add thi post
          if (date.valueOf() > lastUpdate.valueOf()) {
            const href = item.querySelector('link').nextSibling.data.trim();
            const title = this.fixText(item.querySelector('title').innerHTML);
            const description = this.fixText(item.querySelector('description').innerHTML);

            // Get category
            const categoryD = Array.from(item.querySelectorAll('category'));
            const category = categoryD.map((el) => this.fixText(el.innerHTML));

            // Add to Array
            this.state.posts.push({
              title,
              href,
              description,
              date,
              id: this.state.posts.length,
              fId: feedId,
              added: false,
              category: (category.length === 0) ? 'Unknown' : category.join(', '),
            });

            changes = true;
          }
        });

        // Get currect time (last update time)
        const time = Date.now();
        // Render all changes
        if (changes) {
          this.renderF.start(this.state,false, true);
        }
        // Add next Timeout
        setTimeout(() => this.autoUpdate(url, time, feedId), 5000);
      })
      .catch();
  }

  // Render Function (do not make real render)
  render(url, states) {
    const { href } = new URL('/', url);
    // Off btn and input
    this.input.setAttribute('disabled', '');
    this.btn.setAttribute('disabled', '');

    // Make request
    axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}&disableCache=true`)
      .then((d) => {
        // Use parser to data
        const data = this.parser.parseFromString(d.data.contents, 'text/html');
        // select all data
        const items = data.querySelectorAll('item');

        // Throw Error if, it'a empty
        if (items.length <= 0) {
          throw new Error('not-rss');
        }

        // Get feed data
        const lang = data.querySelector('language');
        const feedId = this.state.feeds.length;
        const titleF = this.fixText(data.querySelector('title').innerHTML);
        const descriptionF = this.fixText(data.querySelector('description').innerHTML);

        // Add feed data
        this.state.feeds.push({
          lng: (lang) ? lang.innerHTML : 'Unknown',
          titleF,
          href,
          descriptionF,
          id: feedId,
          added: false,
        });

        // Add each post
        items.forEach((item) => {
          // Get post data
          const hrefP = item.querySelector('link').nextSibling.data.trim();
          const title = this.fixText(item.querySelector('title').innerHTML);
          const description = this.fixText(item.querySelector('description').innerHTML);
          const date = item.querySelector('pubDate').innerHTML;

          // Get category
          const categoryD = Array.from(item.querySelectorAll('category'));
          const category = categoryD.map((el) => this.fixText(el.innerHTML));

          // Add post data
          this.state.posts.push({
            title,
            hrefP,
            description,
            date: new Date(date),
            id: this.state.posts.length,
            fId: feedId,
            added: false,
            category: (category.length === 0) ? 'Unknown' : category.join(', '),
          });
        });

        // Start render
        this.renderF.start(this.state, true, true);
        // Add this href (href not url) to added list
        states.addedUrl.push(href);
        // Get now time
        const time = Date.now();

        // Start autoUpdate
        window.setTimeout(() => this.autoUpdate(url, time, feedId), 5000);
      })
      .catch((err) => {
        this.renderF.start(this.state, false, false, err);
      });
  }
}

export default ReadAndRender;
