import tmdbApi from './tmdbApi';

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
