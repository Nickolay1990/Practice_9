import DOM from './navigation';
import {
	setCityStorage,
	deleteCity,
	setStorageLastCity,
} from './local-storage-api/local-storage-utils.js';
import { capitalizeFirst } from './render-weather/render-weather-utils.js';
import { getWeather, RESPONSE_WEATHER } from './api-service.js';
import {
	setDataWeather,
	renderMoreInfo,
} from './render-weather/render-weather.js';
import { getErrorMessage } from './toaster-messages-utils.js';
import { initMoreInfoSwiper } from './swiper.js';

let IS_OPEN_MORE_INFO = false;

export async function handleFavore() {
	const city = await searchCity();
	if (city) {
		setCityStorage(city);
	}
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

export async function searchCity() {
	const inputValue = DOM.cityInput.value.trim();

	if (!inputValue) {
		return;
	}

	const capCity = capitalizeFirst(inputValue);

	try {
		const response = await getWeather(capCity);

		setDataWeather(response);
		setStorageLastCity(capCity);

		if (IS_OPEN_MORE_INFO) {
			showMoreInfo(RESPONSE_WEATHER);
		}

		return capCity;
	} catch {
		getErrorMessage();
		return false;
	} finally {
		DOM.cityInput.value = '';
	}
}

export function switchThreeDays() {
	DOM.daysWrapper.style.display = 'none';
	DOM.homeSection.classList.add('home-three');
	DOM.switchOneDay.classList.remove('is-active');
	DOM.switchThreeDays.classList.add('is-active');
	DOM.citeBlock.style.display = 'none';
	DOM.dateBlock.style.display = 'none';
	DOM.threeDayContainer.style.display = 'block';
	DOM.chartButton.style.display = 'flex';
}

export function switchOneDay() {
	DOM.daysWrapper.style.display = 'block';
	DOM.homeSection.classList.remove('home-three');
	DOM.switchOneDay.classList.add('is-active');
	DOM.switchThreeDays.classList.remove('is-active');
	DOM.citeBlock.style.display = 'block';
	DOM.dateBlock.style.display = 'block';
	DOM.threeDayContainer.style.display = 'none';
	DOM.chartButton.style.display = 'none';
}

export function showMoreInfo() {
	DOM.moreInfoButtons.forEach(button => (button.style.display = 'none'));
	DOM.hideInfoButtons.forEach(button => (button.style.display = 'block'));
	IS_OPEN_MORE_INFO = true;
	renderMoreInfo(RESPONSE_WEATHER);
	initMoreInfoSwiper();
	DOM.moreInfoBlock.style.display = 'block';
}

export function hideMoreInfo() {
	DOM.hideInfoButtons.forEach(button => (button.style.display = 'none'));
	DOM.moreInfoButtons.forEach(button => (button.style.display = 'block'));
	IS_OPEN_MORE_INFO = false;
	DOM.moreInfoBlock.style.display = 'none';
}

export function showChartInfo(event) {
	DOM.chartContainer.style.display = 'block';
	event.currentTarget.style.display = 'none';
}

export function hideChartInfo() {
	DOM.chartContainer.style.display = 'none';
	DOM.chartButton.style.display = 'flex';
}
