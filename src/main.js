import 'modern-normalize';
import DOM from './js/navigation';
import * as handlers from './js/header-handlers';

DOM.favoritesButton.addEventListener('click', handlers.handleFavore);
DOM.favoritiesList.addEventListener('click', handlers.CheckEventClick);
DOM.searchButton.addEventListener('click', handlers.searchCity);
DOM.switchFiveDays.addEventListener('click', handlers.switchFiveDays);
DOM.switchOneDay.addEventListener('click', handlers.switchOneDay);

handlers.renderFavorites();
handlers.setDate();
