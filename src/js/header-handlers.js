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
                                <use href="${icon}#close"></use>
                            </svg>
                        </button>
                     </li>`;
		})
		.join('');
}

export async function handleFavore() {
	const city = await searchCity();
	if (city) {
		setCityStorage(city);
	}
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
		messageColor: 'green',
	});
}

function getErrorMessage() {
	iziToast.error({
		message: 'City not found',
		maxWidth: '200px',
		position: 'topRight',
		messageSize: '10',
		icon: '',
		progressBar: false,
		timeout: 1000,
		backgroundColor: 'transparent',
		close: false,
		messageColor: 'red',
	});
}

export function CheckEventClick(event) {
	const clickTarget = event.target.closest('[data-city-del-button]')
		? event.target.closest('[data-city-del-button]')
		: event.target.closest('.header-favority-list-item-text');

	if (!clickTarget) {
		return;
	}

	if (clickTarget.tagName === 'BUTTON') {
		deleteCity(clickTarget);
		return;
	}
	DOM.cityInput.value = clickTarget.textContent;
	searchCity();
}

export function deleteCity(element) {
	const cityDel = element.dataset.cityDelButton;
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

	const capCity = capitalizeFirst(inputValue);

	try {
		const respons = await getWeather(capCity);
		setDataWeather(respons);
		return capCity;
	} catch {
		getErrorMessage();
		return false;
	} finally {
		DOM.cityInput.value = '';
	}
}

function setDataWeather(data) {
	renderTemp(data.current.temp_c);
	renderLocation(data.location);
	renderCloudy(data.current.cloud);
	renderMaxTemp(data.forecast.forecastday[0].day.maxtemp_c);
	renderMinTemp(data.forecast.forecastday[0].day.mintemp_c);
}

function renderTemp(temp) {
	DOM.curentTemp.innerHTML = temp;
}

function renderLocation({ name, country }) {
	DOM.currentLocation.innerHTML = `${name}, ${country}`;
}

function renderCloudy(cloud) {
	if (cloud >= 85) {
		fillImage('./cloudy.png', 'cloudy');
	} else if (cloud >= 30) {
		fillImage('./cloudy-sun.png', 'cloudy-sun');
	} else {
		fillImage('./sun.png', 'sun');
	}
}

function fillImage(src, alt) {
	delImage();

	const img = document.createElement('img');

	img.src = src;
	img.alt = alt;
	img.classList.add('days-cloudy');

	DOM.daysWrapper.prepend(img);
}

function delImage() {
	const oldImg = document.querySelector('.days-cloudy');

	if (oldImg) {
		oldImg.remove();
	}
}

function renderMaxTemp(temp) {
	DOM.maxTempText.textContent = `${temp}°`;
}

function renderMinTemp(temp) {
	DOM.minTempText.textContent = `${temp}°`;
}
