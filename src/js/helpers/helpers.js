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

export { showEl, hideEl, trimDate, sliceEl };
