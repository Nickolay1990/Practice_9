import DOM from './navigation';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import icon from '../img/symbol-defs.svg';
import { initCitySwiper } from './swiper';
import { getWeather } from './api-service';

export function renderFavorites() {
	const cities = JSON.parse(localStorage.getItem('cities'));

	initialNavButtons(cities);

	if (!cities || cities.length === 0) {
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
                                <use href="${icon}#close"></use>
                            </svg>
                        </button>
                     </li>`;
		})
		.join('');
}

export function handleFavore() {
	const inputValue = DOM.cityInput.value.trim();
	if (!inputValue) {
		return;
	}

	const capCity = capitalizeFirst(inputValue);

	setCityStorage(capCity);

	DOM.cityInput.value = '';
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

	getSuccssesMessage();
	renderFavorites();
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

export async function searchCity() {
	const inputValue = DOM.cityInput.value.trim();
	if (!inputValue) {
		return;
	}

	try {
		const respons = await getWeather(inputValue);
		setDataWeather(respons.data);
	} catch {
		console.log('1');
	}
}

function setDataWeather(data) {
	renderTemp(data.current.temp_c);
	renderLocation(data.location);
}

function renderTemp(temp) {
	DOM.curentTemp.innerHTML = temp;
}

function renderLocation({ name, country }) {
	DOM.currentLocation.innerHTML = `${name}, ${country}`;
}
