export function removeFromWatched(arr, id) {
  const idxMovieToDelete = arr.findIndex(({ id: movieId }) => movieId === id);

  if (idxMovieToDelete === -1) return;

  arr.splice(idxMovieToDelete, 1);
}

export function addToWatched(arr, movie) {
  arr.push(movie);
}

export function saveWatchedMovies(arr) {
  localStorage.setItem('watchedMovies', JSON.stringify(arr));
}

export function getWatchedMovies() {
  return JSON.parse(localStorage.getItem('watchedMovies')) ?? [];
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
  arr.push(movie);
}

export function saveQueueMovies(arr) {
  localStorage.setItem('queueMovies', JSON.stringify(arr));
}

export function getQueueMovies() {
  return JSON.parse(localStorage.getItem('queueMovies')) ?? [];
}

export function isMovieInQueue(arr, id) {
  return arr.some(({ id: movieId }) => movieId === id);
}
