let currentQuery = '';

export function setCurrentQuery(query) {
  currentQuery = query;
}

export function getCurrentQuery() {
  return currentQuery;
}

let activePage = '';

export function setActivePage(page) {
  activePage = page;
}

export function getActivePage() {
  return activePage;
}
