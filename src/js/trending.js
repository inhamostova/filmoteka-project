import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import { fetchTrendingMovies, fetchGenres } from './services/movies-api';
import { createMovieCardsMarkup } from './render/movieCardsMarkup';
import { loadMovies } from './services/loadMovies';
// const gallery = document.querySelector('.js-gallery');
// const container = document.querySelector('#tui-pagination-container');

// let genresCache = [];
// let currentQuery = '';
// let currentPage = 1;
loadMovies(1);

// const pagination = new Pagination(container, {
//   totalItems: 1000,
//   visiblePages: 5,
// });

// pagination.on('afterMove', event => {
//   currentPage = event.page;
//   loadTrendingMovies(currentPage);
//   // window.scrollTo({ top: 0, behavior: 'smooth' });
// });

// async function loadTrendingMovies(page) {
//   try {
//     const data = await fetchTrendingMovies(page);
//     console.log(data);

//     pagination.setTotalItems(data.total_results);
//     genresCache = genresCache.length ? genresCache : await fetchGenres();

//     gallery.innerHTML = createMovieCardsMarkup(data.results, genresCache);
//   } catch (error) {
//     console.error(error);
//   }
// }

// loadTrendingMovies(currentPage);
