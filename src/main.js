import 'modern-normalize';
import DOM from './js/navigation';
import * as handlers from './js/header-handlers';
import { renderFavorites } from './js/render-favorities-utils';
import { searchCity, setDate } from './js/render-weather-utils';

DOM.favoritesButton.addEventListener('click', handlers.handleFavore);
DOM.favoritiesList.addEventListener('click', handlers.CheckEventClick);
DOM.searchButton.addEventListener('click', searchCity);
DOM.switchThreeDays.addEventListener('click', handlers.switchThreeDays);
DOM.switchOneDay.addEventListener('click', handlers.switchOneDay);

renderFavorites();
setDate();
