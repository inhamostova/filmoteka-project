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
const footer = document.querySelector('footer').firstElementChild;

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

  hideEl(gallery);
  hideEl(container);
  hideEl(footer);
  showLoader();

  try {
    genresCache = genresCache.length ? genresCache : await fetchGenres();

    if (currentQuery === '') {
      const data = await fetchTrendingMovies(page);
      showEl(gallery);
      showEl(container);

      if (!pagination) {
        initPagination(data.total_results);
      } else {
        pagination.setTotalItems(data.total_results);
      }

      gallery.innerHTML = createMovieCardsMarkup(data.results, genresCache);
    } else {
      footer.classList.remove('footer--empty-state');
      const data = await fetchMoviesByQuery(currentQuery, page);
      showEl(gallery);
      showEl(container);

      // Recreate pagination only when starting a new search.
      if (page === 1) {
        initPagination(data.total_results);
      }

      if (!data.results.length) {
        showEl(errorMessage);
        hideEl(gallery);
        hideEl(container);
        footer.classList.add('footer--empty-state');
        return;
      }
      pagination.setTotalItems(data.total_results);
      gallery.innerHTML = createMovieCardsMarkup(data.results, genresCache);
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    hideLoader();
    showEl(footer);
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
