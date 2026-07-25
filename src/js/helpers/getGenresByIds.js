export function getGenresById(ids, genres) {
  if (!genres) {
    return "There isn't any genre";
  }

  const genreNames = genres
    .filter(({ id }) => ids.includes(Number(id)))
    .map(({ name }) => name);

  if (genreNames.length > 2) {
    return `${genreNames.slice(0, 2).join(', ')}, Other`;
  }
  return genreNames.join(', ');
}
