import 'modern-normalize';
import DOM from './js/navigation';
import * as handlers from './js/handlers';
import { setDate } from './js/set-date/set-date.js';
import { renderFavorites } from './js/render-favorities/render-favorities.js';
import { renderLoadPage } from './js/render-weather/render-weather.js';

DOM.favoritesButton.addEventListener('click', handlers.handleFavore);
DOM.favoritiesList.addEventListener('click', handlers.CheckEventClick);
DOM.searchButton.addEventListener('click', handlers.searchCity);
DOM.switchThreeDays.addEventListener('click', handlers.switchThreeDays);
DOM.switchOneDay.addEventListener('click', handlers.switchOneDay);
DOM.moreInfoButtons.forEach(button =>
	button.addEventListener('click', handlers.showMoreInfo)
);

renderFavorites();
setDate();
renderLoadPage();
