import 'modern-normalize';
import DOM from './js/navigation';
import * as handlers from './js/header-handlers';

DOM.favoritesButton.addEventListener('click', handlers.handleFavore);
DOM.favoritiesList.addEventListener('click', handlers.CheckEventClick);
DOM.searchButton.addEventListener('click', handlers.searchCity);

handlers.renderFavorites();
