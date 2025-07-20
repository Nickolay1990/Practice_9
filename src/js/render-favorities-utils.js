import DOM from './navigation';
import { initCitySwiper, initMoreInfoSwiper } from './swiper';

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

function initialNavButtons(cities) {
	if (!cities || cities.length < 3) {
		DOM.swiperNavButtons.forEach(button => (button.style.display = 'none'));
		return;
	}
	DOM.swiperNavButtons.forEach(button => (button.style.display = 'block'));
}

function createMarkup(cities) {
	return cities
		.map(city => {
			return `<li class="header-favority-list-item swiper-slide">
                        <span class="header-favority-list-item-text">${city}</span>
                        <button type="button" class="header-favority-list-item-button" data-city-del-button="${city}">
                            <svg>
                                <use href="./symbol-defs.svg#close"></use>
                            </svg>
                        </button>
                     </li>`;
		})
		.join('');
}
