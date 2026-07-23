import { hideEl, showEl } from './helpers/helpers';

const searchForm = document.querySelector('.search-form');
const errorMessage = document.querySelector('.search-form__error');

searchForm.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;
  const query = form.elements.searchQuery.value.trim();

  if (!query) {
    showEl(errorMessage);
    form.reset();
    return;
  }

  hideEl(errorMessage);
  console.log(query);
  form.reset();
}
