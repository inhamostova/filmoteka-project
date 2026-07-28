import { fetchTrendingMovies, fetchGenres } from './services/movies-api';
import { createMovieCardsMarkup } from './render/movieCardsMarkup';

const gallery = document.querySelector('.js-gallery');

async function loadTrendingMovies() {
  try {
    const data = await fetchTrendingMovies();
    const genres = await fetchGenres();

    gallery.innerHTML = createMovieCardsMarkup(data.results, genres);
  } catch (error) {
    console.error(error);
  }
}

loadTrendingMovies();
