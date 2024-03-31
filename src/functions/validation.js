import { string } from 'yup';
import i18next from 'i18next';
import ReadAndRender from './readAndRender';

const validator = () => {
  const render = new ReadAndRender();
  const form = document.querySelector('#urls');
  const input = document.querySelector('#url-input');
  input.focus();
  const status = document.querySelector('.feedback');
  const state = {
    addedUrl: [],
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    string().url().required().validate(input.value.trim())
      .then((d) => {
        const href = new URL('/', d).href;
        if (!state.addedUrl.includes(href)) {
          render.render(d, state);
        } else {
          throw new Error();
        }
      })
      .catch((e) => {
        console.error(e);
        input.setAttribute('class', 'form-control w-100 is-invalid');
        status.setAttribute('class', 'feedback m-9 position-absolute small text-danger');
        status.innerHTML = i18next.t([`error.${e.name}`, 'error.unspecific']);
        input.focus();
      });
  });
};

export default validator;
