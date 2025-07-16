import { getSuccssesMessage } from './toaster-messages-utils';
import { renderFavorites } from './render-favorities-utils';

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
