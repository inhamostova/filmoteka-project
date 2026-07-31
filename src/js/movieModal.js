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
import { getActivePage, getCurrentLibraryBtn } from './state';

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
    genresCache = genresCache.length ? genresCache : await fetchGenres();

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
        if (
          getActivePage() === 'library' &&
          getCurrentLibraryBtn() === 'queue'
        ) {
          renderLibrary(STORAGE_KEYS.QUEUE);
          onModalToggle();
        }
        return;
      }
      btnQueue.textContent = 'Remove from queue';

      addMovie(queueMovies, movie);
      saveMovies(STORAGE_KEYS.QUEUE, queueMovies);
      if (getActivePage() === 'library' && getCurrentLibraryBtn() === 'queue') {
        renderLibrary(STORAGE_KEYS.QUEUE);
      }
    });

    btnWatched.addEventListener('click', () => {
      if (hasMovie(watchedMovies, id)) {
        removeMovie(watchedMovies, id);
        saveMovies(STORAGE_KEYS.WATCHED, watchedMovies);
        btnWatched.textContent = 'add to watched';

        if (
          getActivePage() === 'library' &&
          getCurrentLibraryBtn() === 'watched'
        ) {
          renderLibrary(STORAGE_KEYS.WATCHED);
          onModalToggle();
        }
        return;
      }
      btnWatched.textContent = 'Remove from watched';

      addMovie(watchedMovies, movie);
      saveMovies(STORAGE_KEYS.WATCHED, watchedMovies);
      if (
        getActivePage() === 'library' &&
        getCurrentLibraryBtn() === 'watched'
      ) {
        // gallery.innerHTML = createMovieCardsMarkup(
        //   getMovies(STORAGE_KEYS.WATCHED),
        //   genresCache
        // );
        renderLibrary(STORAGE_KEYS.WATCHED);
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

function renderLibrary(storageKey) {
  gallery.innerHTML = createMovieCardsMarkup(
    getMovies(storageKey),
    genresCache
  );
}
