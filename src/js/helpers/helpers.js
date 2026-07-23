function hideEl(el) {
  el.classList.add('visually-hidden');
}

function showEl(el) {
  el.classList.remove('visually-hidden');
}

export { showEl, hideEl };
