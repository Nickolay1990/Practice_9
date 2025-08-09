import DOM from '../navigation.js';

export function renderMoreCloudy(data) {
	delMoreCloudyImg();
	DOM.moreInfoListItems.forEach((item, index) => {
		const img = document.createElement('img');
		img.src = data[index].hour[0].condition.icon;
		img.alt = 'condition';
		img.classList.add('days-cloudy');
		img.dataset.days = 'three';
		item.append(img);
	});
}

function delMoreCloudyImg() {
	const images = document.querySelectorAll('[data-days=three]');
	if (images.length === 0) {
		return;
	}
	images.forEach(item => item.remove());
}

export function renderMoreCurrentTemp(data) {
	DOM.moreInfoCurrentTemp.forEach((item, index) => {
		item.textContent = `${data[index].day.avgtemp_c}°`;
	});
}

export function renderPressure(data) {
	const hour = new Date().getHours();
	DOM.moreInfoPressure.forEach((item, index) => {
		item.textContent = `${Math.floor(
			data[index].hour[hour].pressure_in * 25.5
		)} mm`;
	});
}

export function renderHumidity(data) {
	DOM.moreInfoHumidity.forEach((item, index) => {
		item.textContent = `${data[index].day.avghumidity}%`;
	});
}

export function renderWind(data) {
	DOM.moreInfoWind.forEach((item, index) => {
		item.textContent = `${(
			(data[index].day.maxwind_kph * 1000) /
			60 /
			60
		).toFixed(1)} m/s`;
	});
}
