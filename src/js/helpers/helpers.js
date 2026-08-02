function hideEl(el) {
  el.classList.add('visually-hidden');
}

function showEl(el) {
  el.classList.remove('visually-hidden');
}

function trimDate(date) {
  return date.slice(0, 4);
}

function sliceEl(str) {
  return str.toString().slice(0, 3);
}

function renderEmptyState(el) {
  el.innerHTML =
    '<li class="gallery__empty-state"><img class="gallery__empty-state__img" src="https://i.pinimg.com/736x/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.jpg" alt="Empty collection"/></li>';
}

export { showEl, hideEl, trimDate, sliceEl, renderEmptyState };
