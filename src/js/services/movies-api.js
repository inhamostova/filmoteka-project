import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTdiNGRiMmFiZTcwNGY0Njk1NjdhNmZjZTM4NzA5NyIsIm5iZiI6MTY3MTEzNTI3NC4yNDEsInN1YiI6IjYzOWI4MDJhY2I5ZjRiMDBiMWQ3MDU0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QzbVo_qbZnszsGvllQ67Bu45o2b6F5lCxocbnK73Lck';

export async function fetchTrendingMovies() {
  const { data } = await axios.get(`${BASE_URL}/trending/movie/day`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    params: {
      language: 'en-US',
    },
  });
  return data;
}

export async function fetchGenres() {
  const { data } = await axios.get(`${BASE_URL}/genre/movie/list`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    params: {
      language: 'en-US',
    },
  });
  return data.genres;
}

export async function fetchMoviesByQuery(query) {
  const { data } = await axios.get(`${BASE_URL}/search/movie`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    params: {
      query,
      language: 'en-US',
    },
  });
  return data.results;
}

export async function fetchMovieById(movieId) {
  const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    params: {
      language: 'en-US',
    },
  });
  return res;
}
