import { getMovies } from './services/storage';
import { createMovieCardsMarkup } from './render/movieCardsMarkup';
import { fetchGenres } from './services/movies-api';

const WATCHED_MOVIES = 'watchedMovies';
const QUEUE_MOVIES = 'queueMovies';

const btnWatched = document.querySelector('[data-btn="watched"]');
const btnQueue = document.querySelector('[data-btn="queue"]');
const gallery = document.querySelector('.js-gallery');

let genresList = [];

libraryInit();

async function libraryInit() {
  genresList = await fetchGenres();
  gallery.innerHTML = createMovieCardsMarkup(
    getMovies(WATCHED_MOVIES),
    genresList
  );
}

btnQueue.addEventListener('click', onBtnQueueClick);
btnWatched.addEventListener('click', onBtnWatchedClick);

function onBtnQueueClick() {
  updateActiveButton('queue');
  gallery.innerHTML = createMovieCardsMarkup(
    getMovies(QUEUE_MOVIES),
    genresList
  );
}

function onBtnWatchedClick() {
  updateActiveButton('watched');
  gallery.innerHTML = createMovieCardsMarkup(
    getMovies(WATCHED_MOVIES),
    genresList
  );
}

function updateActiveButton(type) {
  btnWatched.classList.toggle('btn--active', type === 'watched');

  btnQueue.classList.toggle('btn--active', type === 'queue');
}
