import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';

import {
  fetchTrendingMovies,
  fetchGenres,
  fetchMoviesByQuery,
} from './movies-api';
import { createMovieCardsMarkup } from '../render/movieCardsMarkup';
import { getCurrentQuery } from '../state';
import { showEl } from '../helpers/helpers';

const gallery = document.querySelector('.js-gallery');
const container = document.querySelector('#tui-pagination-container');
const errorMessage = document.querySelector('.search-form__error');

let genresCache = [];

const pagination = new Pagination(container, {
  totalItems: 1000,
  itemsPerPage: 20,
  visiblePages: 5,
});

export function goToFirstPage() {
  if (pagination.getCurrentPage() === 1) {
    loadMovies(1);
    return;
  }

  pagination.movePageTo(1);
}

pagination.on('afterMove', ({ page }) => {
  loadMovies(page);
  // window.scrollTo({ top: 0, behavior: 'smooth' });
});

export async function loadMovies(page) {
  const currentQuery = getCurrentQuery();
  try {
    genresCache = genresCache.length ? genresCache : await fetchGenres();

    if (currentQuery === '') {
      const data = await fetchTrendingMovies(page);

      pagination.setTotalItems(data.total_results);
      gallery.innerHTML = createMovieCardsMarkup(data.results, genresCache);
    } else {
      const data = await fetchMoviesByQuery(currentQuery, page);

      if (!data.results.length) {
        showEl(errorMessage);
        return;
      }
      pagination.setTotalItems(data.total_results);
      gallery.innerHTML = createMovieCardsMarkup(data.results, genresCache);
    }
  } catch (error) {
    console.error(error.message);
  }
}
