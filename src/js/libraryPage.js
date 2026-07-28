import { getWatchedMovies, getQueueMovies } from './services/storage';
import { createMovieCardsMarkup } from './render/movieCardsMarkup';
import { fetchGenres } from './services/movies-api';
import { addActiveBtnClass, removeActiveBtnClass } from './helpers/helpers';

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
  addActiveBtnClass(btnQueue);
  removeActiveBtnClass(btnWatched);
  gallery.innerHTML = createMovieCardsMarkup(getQueueMovies(), genresList);
}

function onBtnWatchedClick() {
  addActiveBtnClass(btnWatched);
  removeActiveBtnClass(btnQueue);
  gallery.innerHTML = createMovieCardsMarkup(getWatchedMovies(), genresList);
}
