import { fetchMovieById } from './services/movies-api';
import { createMovieModalMarkup } from './render/createMovieModalMarkup';
import {
  removeFromWatched,
  addToWatched,
  saveWatchedMovies,
  getWatchedMovies,
  isMovieInWatched,
  removeFromQueue,
  addToQueue,
  saveQueueMovies,
  getQueueMovies,
  isMovieInQueue,
} from './services/storage';

const gallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');

// const watchedMovies = getWatchedMovies() ?? [];
// const queueMovies = getQueueMovies() ?? [];

gallery.addEventListener('click', onGalleryClick);

async function onGalleryClick(evt) {
  const watchedMovies = getWatchedMovies();
  const queueMovies = getQueueMovies();

  const card = evt.target.closest('.gallery-list__item');
  if (!card) return;
  const id = Number(card.dataset.id);

  try {
    const movie = await fetchMovieById(id);
    modal.innerHTML = createMovieModalMarkup(movie);

    const btnClose = modal.querySelector('.modal__close-btn');
    const btnWatched = document.querySelector('[data-btn="watched"]');
    const btnQueue = document.querySelector('[data-btn="queue"]');

    if (isMovieInWatched(watchedMovies, id)) {
      btnWatched.textContent = 'Remove from watched';
    }

    if (isMovieInQueue(queueMovies, id)) {
      btnQueue.textContent = 'Remove from queue';
    }

    onModalToggle();
    document.addEventListener('keydown', onKeyDown);
    btnClose.addEventListener('click', onModalToggle);
    backdrop.addEventListener('click', onBackdropClick);

    btnQueue.addEventListener('click', () => {
      if (isMovieInQueue(queueMovies, id)) {
        removeFromQueue(queueMovies, id);
        saveQueueMovies(queueMovies);
        btnQueue.textContent = 'add to queue';
        return;
      }
      btnQueue.textContent = 'Remove from queue';

      addToQueue(queueMovies, movie);
      saveQueueMovies(queueMovies);
    });

    btnWatched.addEventListener('click', () => {
      //   btnWatched.textContent = 'Remove from watched';
      if (isMovieInWatched(watchedMovies, id)) {
        removeFromWatched(watchedMovies, id);
        saveWatchedMovies(watchedMovies);
        btnWatched.textContent = 'add to watched';
        return;
      }
      btnWatched.textContent = 'Remove from watched';

      addToWatched(watchedMovies, movie);
      saveWatchedMovies(watchedMovies);
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
