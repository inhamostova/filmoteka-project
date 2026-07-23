import { trimDate, sliceEl } from '../helpers/helpers';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

export function createMovieCardsMarkup(movies) {
  return movies
    .map(
      ({
        title,
        poster_path,
        genre_ids,
        release_date,
        vote_average,
      }) => `<li class="gallery-list__item">
      <img class="movie-poster" src="${BASE_IMG_URL}${poster_path}" alt="${title}" />
      <h2 class="movie-title">${title}</h2>
<div class="movie-info">
      <p class="movie-genres">${genre_ids.join(', ')}</p>
      <p class="movie-date">${trimDate(release_date)}</p>
      <p class="movie-rating">${sliceEl(vote_average)}</p>
</div>
    </li>`
    )
    .join('');
}
