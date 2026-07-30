import { getMovies, STORAGE_KEYS } from './services/storage';
import { createMovieCardsMarkup } from './render/movieCardsMarkup';
import { fetchGenres } from './services/movies-api';
import { hideLoader, showLoader } from './helpers/loader';

const btnWatched = document.querySelector('[data-btn="watched"]');
const btnQueue = document.querySelector('[data-btn="queue"]');
const gallery = document.querySelector('.js-gallery');

let genresList = [];

libraryInit();

async function libraryInit() {
  showLoader();
  try {
    genresList = await fetchGenres();
    gallery.innerHTML = createMovieCardsMarkup(
      getMovies(STORAGE_KEYS.WATCHED),
      genresList
    );
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
  gallery.innerHTML = createMovieCardsMarkup(
    getMovies(STORAGE_KEYS.QUEUE),
    genresList
  );
}

function onBtnWatchedClick() {
  updateActiveButton('watched');
  gallery.innerHTML = createMovieCardsMarkup(
    getMovies(STORAGE_KEYS.WATCHED),
    genresList
  );
}

function updateActiveButton(type) {
  btnWatched.classList.toggle('btn--active', type === 'watched');

  btnQueue.classList.toggle('btn--active', type === 'queue');
}
