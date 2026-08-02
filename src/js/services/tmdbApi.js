import axios from 'axios';

const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTdiNGRiMmFiZTcwNGY0Njk1NjdhNmZjZTM4NzA5NyIsIm5iZiI6MTY3MTEzNTI3NC4yNDEsInN1YiI6IjYzOWI4MDJhY2I5ZjRiMDBiMWQ3MDU0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QzbVo_qbZnszsGvllQ67Bu45o2b6F5lCxocbnK73Lck';

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export default tmdbApi;
