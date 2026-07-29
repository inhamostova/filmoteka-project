import { fetchMovieById } from './services/movies-api';
import { createMovieModalMarkup } from './render/createMovieModalMarkup';
import {
  getMovies,
  saveMovies,
  addMovie,
  removeMovie,
  hasMovie,
} from './services/storage';

const WATCHED_MOVIES = 'watchedMovies';
const QUEUE_MOVIES = 'queueMovies';

const gallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');

gallery.addEventListener('click', onGalleryClick);

async function onGalleryClick(evt) {
  const watchedMovies = getMovies(WATCHED_MOVIES);
  const queueMovies = getMovies(QUEUE_MOVIES);

  const card = evt.target.closest('.gallery-list__item');
  if (!card) return;
  const id = Number(card.dataset.id);

  try {
    const movie = await fetchMovieById(id);
    modal.innerHTML = createMovieModalMarkup(movie);

    const btnClose = modal.querySelector('.modal__close-btn');
    const btnWatched = document.querySelector('[data-btn="watched"]');
    const btnQueue = document.querySelector('[data-btn="queue"]');

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
        saveMovies(QUEUE_MOVIES, queueMovies);
        btnQueue.textContent = 'add to queue';
        return;
      }
      btnQueue.textContent = 'Remove from queue';

      addMovie(queueMovies, movie);
      saveMovies(QUEUE_MOVIES, queueMovies);
    });

    btnWatched.addEventListener('click', () => {
      if (hasMovie(watchedMovies, id)) {
        removeMovie(watchedMovies, id);
        saveMovies(WATCHED_MOVIES, watchedMovies);
        btnWatched.textContent = 'add to watched';
        return;
      }
      btnWatched.textContent = 'Remove from watched';

      addMovie(watchedMovies, movie);
      saveMovies(WATCHED_MOVIES, watchedMovies);
    });
  } catch (error) {
    console.error(error.message);
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
