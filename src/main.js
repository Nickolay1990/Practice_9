import 'modern-normalize';
import DOM from './js/navigation';
import * as handlers from './js/handlers';
import { renderFavorites } from './js/render-favorities-utils';
import { setDate } from './js/render-weather-utils';
import { initMoreInfoSwiper } from './js/swiper';

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

// for more
initMoreInfoSwiper();
