import { getMovies, STORAGE_KEYS } from './services/storage';
import { createMovieCardsMarkup } from './render/movieCardsMarkup';
import { fetchGenres } from './services/movies-api';
import { hideLoader, showLoader } from './helpers/loader';
import { onGalleryClick } from './movieModal';
import { setActivePage, setCurrentLibraryBtn } from './state';
import { hideEl, showEl } from './helpers/helpers';
import { renderEmptyState } from './render/renderEmptyState';

const btnWatched = document.querySelector('[data-btn="watched"]');
const btnQueue = document.querySelector('[data-btn="queue"]');
const gallery = document.querySelector('.js-gallery');
const footer = document.querySelector('footer').firstElementChild;

gallery.addEventListener('click', onGalleryClick);

let genresList = [];

libraryInit();

async function libraryInit() {
  setActivePage('library');
  setCurrentLibraryBtn('watched');
  showLoader();
  try {
    genresList = await fetchGenres();

    renderLibraryMovies(getMovies(STORAGE_KEYS.WATCHED));
  } catch (error) {
    console.error(error.message);
  } finally {
    hideLoader();
  }
}

btnQueue.addEventListener('click', onBtnQueueClick);
btnWatched.addEventListener('click', onBtnWatchedClick);

function onBtnQueueClick() {
  updateActiveButton('queue');
  setCurrentLibraryBtn('queue');

  renderLibraryMovies(getMovies(STORAGE_KEYS.QUEUE));
}

function onBtnWatchedClick() {
  updateActiveButton('watched');
  setCurrentLibraryBtn('watched');

  renderLibraryMovies(getMovies(STORAGE_KEYS.WATCHED));
}

function updateActiveButton(type) {
  btnWatched.classList.toggle('btn--active', type === 'watched');

  btnQueue.classList.toggle('btn--active', type === 'queue');
}

function renderLibraryMovies(movies) {
  hideEl(footer);

  if (!movies.length) {
    renderEmptyState(gallery);
  } else {
    gallery.innerHTML = createMovieCardsMarkup(movies, genresList);
  }

  requestAnimationFrame(() => {
    showEl(footer);
  });
}
