import { hideEl, showEl } from './helpers/helpers';
import { goToFirstPage } from './services/loadMovies';
import { getCurrentQuery, setCurrentQuery } from './state';

const searchForm = document.querySelector('.search-form');
const errorMessage = document.querySelector('.search-form__error');

searchForm.addEventListener('submit', onSearchSubmit);

async function onSearchSubmit(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;
  const query = form.elements.searchQuery.value.trim();

  if (!query) {
    showEl(errorMessage);
    return;
  }

  if (getCurrentQuery() === query) {
    return;
  }

  setCurrentQuery(query);

  try {
    hideEl(errorMessage);
    goToFirstPage();

    form.reset();
  } catch (error) {
    console.error(error.message);
  }
}
