import { string } from 'yup';
import i18next from 'i18next';
import ReadAndRender from './readAndRender';

const validator = () => {
  // Get all usefull data
  const render = new ReadAndRender();
  const form = document.querySelector('#urls');
  const input = document.querySelector('#url-input');
  input.focus();
  const status = document.querySelector('.feedback');
  const state = {
    addedUrl: [],
  };

  // Add event on form
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // validate data
    string().url().required().validate(input.value.trim())
      .then((d) => {
        // Get href (href not url)
        const href = new URL('/', d).href;
        // Check on includes
        if (!state.addedUrl.includes(href)) {
          render.render(d, state, false);
          // If Yes, throw Error
        } else {
          throw new Error();
        }
      })
      .catch((e) => {
        // Error stuff.
        console.error(e);
        input.setAttribute('class', 'form-control w-100 is-invalid');
        status.setAttribute('class', 'feedback m-9 position-absolute small text-danger');
        status.innerHTML = i18next.t([`error.${e.name}`, 'error.unspecific']);
        input.focus();
      });
  });
};

export default validator;
