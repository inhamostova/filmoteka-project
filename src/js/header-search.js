import { hideEl, showEl } from './helpers/helpers';

const searchForm = document.querySelector('.search-form');
const errMsg = document.querySelector('.search-form__error');

searchForm.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(evt) {
  evt.preventDefault();

  let {
    searchQuery: { value: query },
  } = evt.target.elements;

  query = query.trim();

  if (!query) {
    showEl(errMsg);
    evt.target.reset();
    return;
  }

  console.log(query);
  hideEl(errMsg);
  evt.target.reset();
}
