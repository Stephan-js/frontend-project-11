import _ from 'lodash';
import { object, string, InferType } from 'yup';
import './scss/style.scss';

const app = () => {
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
        status.setAttribute('class', 'feedback m-9 position-absolute small text-success');
        status.innerHTML = 'RSS aproved!';
        state.addedUrl.push(d);
      } else {
        throw new Error('Sorry, but you cant add one url two times!');
      }
    })
    .catch((e) => {
      status.setAttribute('class', 'feedback m-9 position-absolute small text-danger');
      status.innerHTML = e;
    });
  });
};
app();