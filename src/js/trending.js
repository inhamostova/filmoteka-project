import { fetchTrendingMovies } from './services/movies-api';
import { createMovieCardsMarkup } from './render/movieCardsMarkup.js';

const gallery = document.querySelector('.js-gallery');

async function loadTrendingMovies() {
  try {
    const data = await fetchTrendingMovies();
    gallery.innerHTML = createMovieCardsMarkup(data.results);
  } catch (error) {
    console.error(error.message);
  }
}

loadTrendingMovies();
