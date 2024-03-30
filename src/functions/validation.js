import { string } from 'yup';
import i18next from 'i18next';
import render from './readAndRender';

const validator = () => {
  const form = document.querySelector('#urls');
  const input = document.querySelector('#url-input');
  input.focus();
  const status = document.querySelector('.feedback');
  const state = {
    addedUrl: [],
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    string().url().nullable().validate(input.value.trim())
      .then((url) => {
        if (!state.addedUrl.includes(url)) {
          input.setAttribute('class', 'form-control w-100');
          status.setAttribute('class', 'feedback m-9 position-absolute small text-success');
          render(url);
          input.value = '';
          input.focus();
          status.innerHTML = i18next.t('succeses');
          state.addedUrl.push(url);
        } else {
          throw new Error();
        }
      })
      .catch((e) => {
        input.setAttribute('class', 'form-control w-100 is-invalid');
        status.setAttribute('class', 'feedback m-9 position-absolute small text-danger');
        status.innerHTML = i18next.t([`error.${e.name}`, 'error.unspecific']);
        input.focus();
      });
  });
};

export default validator;
