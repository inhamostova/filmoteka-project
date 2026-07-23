import { fetchTrendingMovies } from './services/movies-api';

async function loadTrendingMovies() {
  try {
    const data = await fetchTrendingMovies();
    console.log(data.results);
  } catch (error) {
    console.error(error.message);
  }
}

loadTrendingMovies();
