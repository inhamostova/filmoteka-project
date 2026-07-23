import { fetchTrendingMovies } from './services/movies-api';
import { createMovieCardsMarkup } from './render/renderTrending';

const gallery = document.querySelector('.js-gallery');

async function loadTrendingMovies() {
  try {
    const data = await fetchTrendingMovies();
    console.log(data.results);
    gallery.innerHTML = createMovieCardsMarkup(data.results);
  } catch (error) {
    console.error(error.message);
  }
}

loadTrendingMovies();
