import { getSuccssesMessage } from '../toaster-messages-utils.js';
import { renderFavorites } from '../render-favorities/render-favorities.js';

export function setCityStorage(city) {
	const storedCities = JSON.parse(localStorage.getItem('cities')) || [];

	if (storedCities.includes(city)) {
		return;
	}

	storedCities.push(city);
	localStorage.setItem('cities', JSON.stringify(storedCities));

	getSuccssesMessage();
	renderFavorites();
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

export function setStorageLastCity(city) {
	localStorage.setItem('lastCity', JSON.stringify(city));
}

export function getStorageLastCity() {
	return JSON.parse(localStorage.getItem('lastCity'));
}
