import { string } from 'yup';
import i18next from 'i18next';
import parser from './parser';

const validator = () => {
  const form = document.querySelector('#urls');
  const status = document.querySelector('.feedback');
  const state = {
    addedUrl: [],
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    string().url().nullable().validate(input.value)
      .then((d) => {
        if (!state.addedUrl.includes(d)) {
          input.setAttribute('class', 'form-control w-100');
          status.setAttribute('class', 'feedback m-9 position-absolute small text-success');
          status.innerHTML = i18next.t('succeses');
          state.addedUrl.push(d);
          parser(input.value);
        } else {
          throw new Error();
        }
      })
      .catch((e) => {
        input.setAttribute('class', 'form-control w-100 is-invalid');
        status.setAttribute('class', 'feedback m-9 position-absolute small text-danger');
        status.innerHTML = i18next.t([`error.${e.name}`, 'error.unspecific']);
      });
  });
};

export default validator;
