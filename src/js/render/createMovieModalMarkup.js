import { makeGenresListInModal } from '../helpers/makeGenresInModal';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

export function createMovieModalMarkup(movie) {
  const {
    poster_path,
    title,
    genres,
    original_title,
    popularity,
    vote_average,
    vote_count,
    overview,
  } = movie;

  return `<button class="modal__close-btn" type="button"></button>
<div class="modal__left-side"><img class="modal__poster" src="${BASE_IMG_URL}${poster_path}" alt="${original_title}"/></div>
<div class="modal__right-side">
    <h2 class="modal__title">${title}</h2>
    <p class="modal__info"><span class="modal__info__data">Vote / Votes</span><span class="modal__info__value">${vote_average} / ${vote_count}</span></p>
    <p class="modal__info"><span class="modal__info__data popularity">Popularity</span><span class="modal__info__value">${popularity}</span></p>
    <p class="modal__info"><span class="modal__info__data">Original Title</span><span class="modal__info__value">${original_title}</span></p>
    <p class="modal__info last"><span class="modal__info__data genre">Genre</span><span class="modal__info__value">${makeGenresListInModal(genres)}</span></p>
    <h3 class="modal__about">About </h3>
    <p class="modal__descr">${overview}</p>
    <ul class="modal-btn-list">
      <li class="modal-btn-list__item"><button class="modal__btn primary" type="button">add to Watched</button></li>
      <li class="modal-btn-list__item"><button class="modal__btn secondary" type="button">add to queue</button></li>
    </ul>
</div>`;
}
