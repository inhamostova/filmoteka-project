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

  return `<button class="close-btn" type="button">X</button>
    <img src="${BASE_IMG_URL}${poster_path}" alt="${original_title}" width="300"/>
    <h2>${title}</h2>
    <p><span>Vote / Votes</span><span>${vote_average} / ${vote_count}</span></p>
    <p><span>Popularity</span><span>${popularity}</span></p>
    <p><span>Original Title</span><span>${original_title}</span></p>
    <p><span>Genre</span><span>${makeGenresListInModal(genres)}</span></p>
    <h3>About </h3>
    <p>${overview}</p>
    <ul>
      <li><button type="button">add to Watched</button></li>
      <li><button type="button">add to queue</button></li>
    </ul>`;
}
