import { fetchMovieById } from './services/movies-api';
import { createMovieModalMarkup } from './render/createMovieModalMarkup';

const gallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');

gallery.addEventListener('click', onGalleryClick);

async function onGalleryClick(evt) {
  const card = evt.target.closest('.gallery-list__item');
  if (!card) return;
  const id = Number(card.dataset.id);

  try {
    const movie = await fetchMovieById(id);
    modal.innerHTML = createMovieModalMarkup(movie);
    const btnClose = document.querySelector('.modal__close-btn');
    onModalToggle();
    document.addEventListener('keydown', onKeyDown);
    btnClose.addEventListener('click', onModalToggle);
    backdrop.addEventListener('click', onBackdropClick);
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
