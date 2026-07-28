const WATCHED_MOVIES = 'watchedMovies';
const QUEUE_MOVIES = 'queueMovies';

export function removeFromWatched(arr, id) {
  const idxMovieToDelete = arr.findIndex(({ id: movieId }) => movieId === id);

  if (idxMovieToDelete === -1) return;

  arr.splice(idxMovieToDelete, 1);
}

export function addToWatched(arr, movie) {
  if (arr.some(({ id }) => id === movie.id)) {
    return;
  }
  arr.push(movie);
}

export function saveWatchedMovies(arr) {
  localStorage.setItem(WATCHED_MOVIES, JSON.stringify(arr));
}

export function getWatchedMovies() {
  return JSON.parse(localStorage.getItem(WATCHED_MOVIES)) ?? [];
}

export function isMovieInWatched(arr, id) {
  return arr.some(({ id: movieId }) => movieId === id);
}

export function removeFromQueue(arr, id) {
  const idxMovieToDelete = arr.findIndex(({ id: movieId }) => movieId === id);
  if (idxMovieToDelete === -1) return;
  arr.splice(idxMovieToDelete, 1);
}

export function addToQueue(arr, movie) {
  if (arr.some(({ id }) => id === movie.id)) {
    return;
  }
  arr.push(movie);
}

export function saveQueueMovies(arr) {
  localStorage.setItem(QUEUE_MOVIES, JSON.stringify(arr));
}

export function getQueueMovies() {
  return JSON.parse(localStorage.getItem(QUEUE_MOVIES)) ?? [];
}

export function isMovieInQueue(arr, id) {
  return arr.some(({ id: movieId }) => movieId === id);
}
