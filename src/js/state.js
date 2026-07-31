let currentQuery = '';
let activePage = '';
let currentLibraryBtn = '';

export function setCurrentQuery(query) {
  currentQuery = query;
}

export function getCurrentQuery() {
  return currentQuery;
}

export function setActivePage(page) {
  activePage = page;
}

export function getActivePage() {
  return activePage;
}

export function setCurrentLibraryBtn(activeBtn) {
  currentLibraryBtn = activeBtn;
}

export function getCurrentLibraryBtn() {
  return currentLibraryBtn;
}
