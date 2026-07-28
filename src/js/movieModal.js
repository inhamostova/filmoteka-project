import { fetchMovieById } from './services/movies-api';
import { createMovieModalMarkup } from './render/createMovieModalMarkup';

const gallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');

gallery.addEventListener('click', onGalleryClick);

async function onGalleryClick(evt) {
  if (evt.target.classList.contains('js-gallery')) {
    return;
  }

  const id = Number(evt.target.closest('li').dataset.id);

  try {
    const { data } = await fetchMovieById(id);
    // console.log(data);
    onModalOpen();
    modal.innerHTML = createMovieModalMarkup(data);
    const btnClose = document.querySelector('.modal__close-btn');
    document.addEventListener('keydown', onKeyDown);
    btnClose.addEventListener('click', onModalOpen);
    backdrop.addEventListener('click', onBackdropClick);
  } catch (error) {
    console.error(error.message);
  }
}

function onKeyDown(evt) {
  if (evt.code !== 'Escape') {
    return;
  }

  onModalOpen();
  document.removeEventListener('keydown', onKeyDown);
}

function onModalOpen() {
  backdrop.classList.toggle('is-hidden');
}

function onBackdropClick(evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }
  onModalOpen();
}
