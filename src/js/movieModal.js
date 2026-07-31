import { fetchGenres, fetchMovieById } from './services/movies-api';
import { createMovieModalMarkup } from './render/createMovieModalMarkup';
import {
  getMovies,
  saveMovies,
  addMovie,
  removeMovie,
  hasMovie,
  STORAGE_KEYS,
} from './services/storage';
import { hideLoader, showLoader } from './helpers/loader';
import { createMovieCardsMarkup } from './render/movieCardsMarkup';
import { getActivePage } from './state';

const gallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');

let genresCache = [];

gallery.addEventListener('click', onGalleryClick);

export async function onGalleryClick(evt) {
  const watchedMovies = getMovies(STORAGE_KEYS.WATCHED);
  const queueMovies = getMovies(STORAGE_KEYS.QUEUE);

  const card = evt.target.closest('.gallery-list__item');
  if (!card) return;
  const id = Number(card.dataset.id);

  showLoader();

  try {
    const movie = await fetchMovieById(id);
    genresCache = await fetchGenres();

    modal.innerHTML = createMovieModalMarkup(movie);

    const btnClose = modal.querySelector('.modal__close-btn');
    const btnWatched = modal.querySelector('[data-btn="watched"]');
    const btnQueue = modal.querySelector('[data-btn="queue"]');

    if (hasMovie(watchedMovies, id)) {
      btnWatched.textContent = 'Remove from watched';
    }

    if (hasMovie(queueMovies, id)) {
      btnQueue.textContent = 'Remove from queue';
    }

    onModalToggle();
    document.addEventListener('keydown', onKeyDown);
    btnClose.addEventListener('click', onModalToggle);
    backdrop.addEventListener('click', onBackdropClick);

    btnQueue.addEventListener('click', () => {
      if (hasMovie(queueMovies, id)) {
        removeMovie(queueMovies, id);
        saveMovies(STORAGE_KEYS.QUEUE, queueMovies);
        btnQueue.textContent = 'add to queue';
        if (getActivePage() === 'library') {
          gallery.innerHTML = createMovieCardsMarkup(
            getMovies(STORAGE_KEYS.QUEUE),
            genresCache
          );
        }
        return;
      }
      btnQueue.textContent = 'Remove from queue';

      addMovie(queueMovies, movie);
      saveMovies(STORAGE_KEYS.QUEUE, queueMovies);
      if (getActivePage() === 'library') {
        gallery.innerHTML = createMovieCardsMarkup(
          getMovies(STORAGE_KEYS.QUEUE),
          genresCache
        );
      }
    });

    btnWatched.addEventListener('click', () => {
      if (hasMovie(watchedMovies, id)) {
        removeMovie(watchedMovies, id);
        saveMovies(STORAGE_KEYS.WATCHED, watchedMovies);
        btnWatched.textContent = 'add to watched';

        if (getActivePage() === 'library') {
          gallery.innerHTML = createMovieCardsMarkup(
            getMovies(STORAGE_KEYS.WATCHED),
            genresCache
          );
        }
        return;
      }
      btnWatched.textContent = 'Remove from watched';

      addMovie(watchedMovies, movie);
      saveMovies(STORAGE_KEYS.WATCHED, watchedMovies);
      if (getActivePage() === 'library') {
        gallery.innerHTML = createMovieCardsMarkup(
          getMovies(STORAGE_KEYS.WATCHED),
          genresCache
        );
      }
    });
  } catch (error) {
    console.error(error.message);
  } finally {
    hideLoader();
  }
}

function onKeyDown(evt) {
  if (evt.code !== 'Escape') {
    return;
  }

  onModalToggle();
}

function onModalToggle() {
  backdrop.classList.toggle('is-hidden');
  document.removeEventListener('keydown', onKeyDown);
  backdrop.removeEventListener('click', onBackdropClick);
}

function onBackdropClick(evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }
  onModalToggle();
}
