import { getWatchedMovies, getQueueMovies } from './services/storage';
import { createMovieCardsMarkup } from './render/movieCardsMarkup';
import { fetchGenres } from './services/movies-api';

const btnWatched = document.querySelector('[data-btn="watched"]');
const btnQueue = document.querySelector('[data-btn="queue"]');
const gallery = document.querySelector('.js-gallery');

let genresList = [];

libraryInit();

async function libraryInit() {
  genresList = await fetchGenres();
  gallery.innerHTML = createMovieCardsMarkup(getWatchedMovies(), genresList);
}

btnQueue.addEventListener('click', onBtnQueueClick);
btnWatched.addEventListener('click', onBtnWatchedClick);

function onBtnQueueClick() {
  updateActiveButton('queue');
  gallery.innerHTML = createMovieCardsMarkup(getQueueMovies(), genresList);
}

function onBtnWatchedClick() {
  updateActiveButton('watched');
  gallery.innerHTML = createMovieCardsMarkup(getWatchedMovies(), genresList);
}

function updateActiveButton(type) {
  btnWatched.classList.toggle('btn--active', type === 'watched');

  btnQueue.classList.toggle('btn--active', type === 'queue');
}
