import { getMovies, STORAGE_KEYS } from './services/storage';
import { createMovieCardsMarkup } from './render/movieCardsMarkup';
import { fetchGenres } from './services/movies-api';
import { hideLoader, showLoader } from './helpers/loader';
import { onGalleryClick } from './movieModal';
import { setActivePage, setCurrentLibraryBtn } from './state';
import { renderEmptyState } from './helpers/helpers';

const btnWatched = document.querySelector('[data-btn="watched"]');
const btnQueue = document.querySelector('[data-btn="queue"]');
const gallery = document.querySelector('.js-gallery');

gallery.addEventListener('click', onGalleryClick);

let genresList = [];

libraryInit();

async function libraryInit() {
  const watchedMovies = getMovies(STORAGE_KEYS.WATCHED);
  setActivePage('library');
  setCurrentLibraryBtn('watched');
  showLoader();
  try {
    genresList = await fetchGenres();

    if (!watchedMovies.length) {
      renderEmptyState(gallery);
    } else {
      gallery.innerHTML = createMovieCardsMarkup(watchedMovies, genresList);
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    hideLoader();
  }
}

btnQueue.addEventListener('click', onBtnQueueClick);
btnWatched.addEventListener('click', onBtnWatchedClick);

function onBtnQueueClick() {
  const queueMovies = getMovies(STORAGE_KEYS.QUEUE);
  updateActiveButton('queue');
  setCurrentLibraryBtn('queue');

  if (!queueMovies.length) {
    renderEmptyState(gallery);
  } else {
    gallery.innerHTML = createMovieCardsMarkup(queueMovies, genresList);
  }
}

function onBtnWatchedClick() {
  const watchedMovies = getMovies(STORAGE_KEYS.WATCHED);
  updateActiveButton('watched');
  setCurrentLibraryBtn('watched');

  if (!watchedMovies.length) {
    renderEmptyState(gallery);
  } else {
    gallery.innerHTML = createMovieCardsMarkup(watchedMovies, genresList);
  }
}

function updateActiveButton(type) {
  btnWatched.classList.toggle('btn--active', type === 'watched');

  btnQueue.classList.toggle('btn--active', type === 'queue');
}
