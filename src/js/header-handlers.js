import DOM from './navigation';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import icon from '../img/symbol-defs.svg';
import { initCitySwiper } from './swiper';

export function handleFavore() {
	if (!DOM.cityInput.value.trim()) {
		return;
	}

	const capCity = capitalizeFirst(DOM.cityInput.value.trim());

	setCityStorage(capCity);

	DOM.cityInput.value = '';
	getSuccssesMessage();
	renderFavorites();
}

function capitalizeFirst(word) {
	return `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;
}

function setCityStorage(city) {
	const storedCities = JSON.parse(localStorage.getItem('cities')) || [];

	if (storedCities.includes(city)) {
		return;
	}

	storedCities.push(city);
	localStorage.setItem('cities', JSON.stringify(storedCities));
}

function getSuccssesMessage() {
	iziToast.success({
		message: 'City added to favorites',
		maxWidth: '200px',
		position: 'topRight',
		messageSize: '10',
		icon: '',
		progressBar: false,
		timeout: 1000,
		backgroundColor: 'transparent',
		close: false,
	});
}

export function renderFavorites() {
	const cities = JSON.parse(localStorage.getItem('cities'));
	if (!cities) {
		return;
	}

	const markup = createMarkup(cities);
	renderMarkup(markup);
	initCitySwiper();
}

function createMarkup(cities) {
	return cities
		.map(city => {
			return `<li class="header-favority-list-item swiper-slide">
                        <span class="header-favority-list-item-text">${city}</span>
                        <button type="button" class="header-favority-list-item-button" data-city-del-button="${city}">
                            <svg>
                                <use href="${icon}#close"></use>
                            </svg>
                        </button>
                     </li>`;
		})
		.join('');
}

function renderMarkup(markup) {
	DOM.favoritiesList.innerHTML = markup;
}

export function deleteCity(event) {
	const button = event.target.closest('[data-city-del-button]');
	if (!button) {
		return;
	}
	const cityDel = button.dataset.cityDelButton;
	const cities = JSON.parse(localStorage.getItem('cities'));
	localStorage.setItem(
		'cities',
		JSON.stringify(cities.filter(city => city !== cityDel))
	);
	renderFavorites();
}
