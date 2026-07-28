export function makeGenresListInModal(genres) {
  return genres.map(({ name }) => name).join(', ');
}
