export function getGenresByIds(ids, genres) {
  if (!genres.length) {
    return "There isn't any genre";
  }

  const genreNames = genres
    .filter(({ id }) => ids.includes(id))
    .map(({ name }) => name);

  if (genreNames.length > 2) {
    return `${genreNames.slice(0, 2).join(', ')}, Other`;
  }
  return genreNames.join(', ');
}
