export function getMovies(type) {
  return JSON.parse(localStorage.getItem(type)) ?? [];
}

export function saveMovies(type, arr) {
  localStorage.setItem(type, JSON.stringify(arr));
}

export function addMovie(arr, movie) {
  if (arr.some(({ id }) => id === movie.id)) {
    return;
  }
  arr.push(movie);
}

export function removeMovie(arr, id) {
  const idxMovieToDelete = arr.findIndex(({ id: movieId }) => movieId === id);

  if (idxMovieToDelete === -1) return;

  arr.splice(idxMovieToDelete, 1);
}

export function hasMovie(arr, id) {
  return arr.some(({ id: movieId }) => movieId === id);
}
