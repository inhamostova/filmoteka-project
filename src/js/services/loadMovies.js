import Pagination from 'tui-pagination';

import {
  fetchTrendingMovies,
  fetchGenres,
  fetchMoviesByQuery,
} from './movies-api';
import { createMovieCardsMarkup } from '../render/movieCardsMarkup';
import { getCurrentQuery } from '../state';
import { hideEl, showEl } from '../helpers/helpers';
import { hideLoader, showLoader } from '../helpers/loader';

const gallery = document.querySelector('.js-gallery');
const container = document.querySelector('#tui-pagination-container');
const errorMessage = document.querySelector('.search-form__error');

let genresCache = [];
let pagination = null;

export function goToFirstPage() {
  if (!pagination || pagination.getCurrentPage() === 1) {
    loadMovies(1);
    return;
  }

  pagination.movePageTo(1);
}

export async function loadMovies(page) {
  const currentQuery = getCurrentQuery();
  gallery.innerHTML = '';
  showLoader();

  try {
    genresCache = genresCache.length ? genresCache : await fetchGenres();

    if (currentQuery === '') {
      const data = await fetchTrendingMovies(page);

      if (!pagination) {
        initPagination(data.total_results);
      } else {
        pagination.setTotalItems(data.total_results);
      }

      gallery.innerHTML = createMovieCardsMarkup(data.results, genresCache);
    } else {
      const data = await fetchMoviesByQuery(currentQuery, page);

      // Recreate pagination only when starting a new search.
      if (page === 1) {
        initPagination(data.total_results);
      }

      if (!data.results.length) {
        showEl(errorMessage);
        return;
      }
      pagination.setTotalItems(data.total_results);
      gallery.innerHTML = createMovieCardsMarkup(data.results, genresCache);
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    hideLoader();
  }
}

function initPagination(totalItems) {
  pagination = new Pagination(container, {
    totalItems,
    itemsPerPage: 20,
    visiblePages: 5,
  });

  pagination.on('afterMove', ({ page }) => {
    loadMovies(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
