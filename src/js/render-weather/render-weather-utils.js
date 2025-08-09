import DOM from '../navigation.js';

export function capitalizeFirst(word) {
	return `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;
}

export function renderTemp(temp) {
	DOM.curentTemp.innerHTML = temp;
}

export function renderLocation({ name, country }) {
	DOM.currentLocation.innerHTML = `${name}, ${country}`;
	DOM.threeCurrentLocation.innerHTML = `${name}, ${country}`;
}

export function renderCloudy(data) {
	delImage();

	const img = document.createElement('img');

	img.src = data.current.condition.icon;
	img.alt = 'conditions';
	img.classList.add('days-cloudy');

	DOM.daysWrapper.prepend(img);
	DOM.threeDaysElemetsForImage.forEach((item, index) => {
		const img = document.createElement('img');

		img.src = data.forecast.forecastday[index].day.condition.icon;
		img.classList.add('days-cloudy');
		img.alt = 'conditions';

		item.append(img);
	});
}

function delImage() {
	const oldImages = document.querySelectorAll('.days-cloudy');

	if (oldImages.length > 0) {
		oldImages.forEach(img => img.remove());
	}
}

export function renderMaxTemp(temp) {
	DOM.maxTempText.textContent = `${temp[0].day.maxtemp_c}°`;
	DOM.threeDaysElementsForMaxTemp.forEach((element, index) => {
		element.textContent = `${temp[index].day.maxtemp_c}°`;
	});
}

export function renderMinTemp(temp) {
	DOM.minTempText.textContent = `${temp[0].day.mintemp_c}°`;
	DOM.threeDaysElementsForMinTemp.forEach((element, index) => {
		element.textContent = `${temp[index].day.mintemp_c}°`;
	});
}

export function renderSunRise(time) {
	DOM.sunRise.textContent = time.split(' ')[0];
}

export function renderSunSet(time) {
	DOM.sunSet.textContent = time.split(' ')[0];
}
