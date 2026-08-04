import emptyState from '../../images/empty-state/empty-state.jpg';

export function renderEmptyState(el) {
  el.innerHTML = `<li class="gallery__empty-state"><img class="gallery__empty-state__img" src="${emptyState}" alt="Empty collection"/></li>`;
}
