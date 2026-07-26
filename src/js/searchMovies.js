import { hideEl, showEl } from './helpers/helpers';
import { fetchMoviesByQuery, fetchGenres } from './services/movies-api';
import { createMovieCardsMarkup } from './render/movieCardsMarkup';

const searchForm = document.querySelector('.search-form');
const errorMessage = document.querySelector('.search-form__error');
const gallery = document.querySelector('.js-gallery');
let currentQuery = '';
let genresCache = [];

searchForm.addEventListener('submit', onSearchSubmit);

async function onSearchSubmit(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;
  const query = form.elements.searchQuery.value.trim();

  if (!query) {
    showEl(errorMessage);
    // form.reset();
    return;
  }

  if (currentQuery === query) {
    return;
  }

  gallery.innerHTML = '';

  currentQuery = query;

  try {
    hideEl(errorMessage);
    const data = await fetchMoviesByQuery(query);
    genresCache = genresCache.length ? genresCache : await fetchGenres();

    if (!data.length) {
      showEl(errorMessage);
      // form.reset();
      return;
    }
    gallery.innerHTML = createMovieCardsMarkup(data, genresCache);
    form.reset();
  } catch (error) {
    console.error(error.message);
  }
}
