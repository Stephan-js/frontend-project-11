import axios from "axios";

const parser = (url) => {
  axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
    .then((d) => {
      const parser = new DOMParser();
      console.log(parser.parseFromString(d.data.contents, 'text/html'));
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export default parser;
