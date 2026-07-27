import { fetchMovieById } from '../services/movies-api';

const gallery = document.querySelector('.js-gallery');

gallery.addEventListener('click', onGalleryClick);

async function onGalleryClick(evt) {
  if (evt.target.classList.contains('js-gallery')) {
    return;
  }

  const id = Number(evt.target.closest('li').dataset.id);

  try {
    const { data } = await fetchMovieById(id);
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
}
