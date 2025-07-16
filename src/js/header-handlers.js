import DOM from './navigation';
import { searchCity } from './render-weather-utils';
import { setCityStorage } from './local-storage-utils';
import { deleteCity } from './local-storage-utils';

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

export function switchThreeDays() {
	DOM.daysWrapper.style.display = 'none';
	DOM.homeSection.classList.add('home-three');
	DOM.switchOneDay.classList.remove('is-active');
	DOM.switchThreeDays.classList.add('is-active');
	DOM.citeBlock.style.display = 'none';
	DOM.dateBlock.style.display = 'none';
	DOM.threeDayContainer.style.display = 'block';
}

export function switchOneDay() {
	DOM.daysWrapper.style.display = 'block';
	DOM.homeSection.classList.remove('home-three');
	DOM.switchOneDay.classList.add('is-active');
	DOM.switchThreeDays.classList.remove('is-active');
	DOM.citeBlock.style.display = 'block';
	DOM.dateBlock.style.display = 'block';
	DOM.threeDayContainer.style.display = 'none';
}
