import { fetchMovieById } from './services/movies-api';
import { createMovieModalMarkup } from './render/createMovieModalMarkup';

const gallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');

// function toggleModal() {
//   backdrop.classList.toggle('is-hidden');
// }

gallery.addEventListener('click', onGalleryClick);

async function onGalleryClick(evt) {
  if (evt.target.classList.contains('js-gallery')) {
    return;
  }

  const id = Number(evt.target.closest('li').dataset.id);

  try {
    const { data } = await fetchMovieById(id);
    console.log(data);
    backdrop.classList.remove('is-hidden');
    modal.innerHTML = createMovieModalMarkup(data);
  } catch (error) {
    console.error(error.message);
  }
}
