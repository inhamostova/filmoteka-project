import axios from 'axios';
import tmdbApi from './tmdbApi';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTdiNGRiMmFiZTcwNGY0Njk1NjdhNmZjZTM4NzA5NyIsIm5iZiI6MTY3MTEzNTI3NC4yNDEsInN1YiI6IjYzOWI4MDJhY2I5ZjRiMDBiMWQ3MDU0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QzbVo_qbZnszsGvllQ67Bu45o2b6F5lCxocbnK73Lck';

export async function fetchTrendingMovies(page = 1) {
  const { data } = await tmdbApi.get('/trending/movie/day', {
    params: {
      language: 'en-US',
      page,
    },
  });
  return data;
}

export async function fetchGenres() {
  const { data } = await tmdbApi.get('/genre/movie/list', {
    params: {
      language: 'en-US',
    },
  });
  return data.genres;
}

export async function fetchMoviesByQuery(query, page = 1) {
  const { data } = await tmdbApi.get(`/search/movie`, {
    params: {
      query,
      language: 'en-US',
      page,
    },
  });
  return data;
}

export async function fetchMovieById(movieId) {
  const res = await tmdbApi.get(`/movie/${movieId}`, {
    params: {
      language: 'en-US',
    },
  });
  return res.data;
}
