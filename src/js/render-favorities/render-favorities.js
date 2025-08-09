import { initCitySwiper } from '../swiper.js';
import { initialNavButtons, createMarkup } from './render-favorities-utils.js';
import DOM from '../navigation.js';

export function renderFavorites() {
	const cities = JSON.parse(localStorage.getItem('cities'));

	initialNavButtons(cities);

	if (!cities || cities.length === 0) {
		DOM.favoritiesList.innerHTML = '';
		return;
	}

	DOM.favoritiesList.innerHTML = createMarkup(cities);
	initCitySwiper();
}
