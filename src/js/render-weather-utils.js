import DOM from './navigation';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export function capitalizeFirst(word) {
	return `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;
}

export function setDataWeather(data) {
	console.log('data>>>>>', data);

	renderTemp(data.current.temp_c);
	renderLocation(data.location);
	renderCloudy(data);
	renderMaxTemp(data.forecast.forecastday);
	renderMinTemp(data.forecast.forecastday);
	renderSunRise(data.forecast.forecastday[0].astro.sunrise);
	renderSunSet(data.forecast.forecastday[0].astro.sunset);
	DOM.sunBlock.style.display = 'flex';
}

function renderTemp(temp) {
	DOM.curentTemp.innerHTML = temp;
}

function renderLocation({ name, country }) {
	DOM.currentLocation.innerHTML = `${name}, ${country}`;
	DOM.threeCurrentLocation.innerHTML = `${name}, ${country}`;
}

function renderCloudy(data) {
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

function renderMaxTemp(temp) {
	DOM.maxTempText.textContent = `${temp[0].day.maxtemp_c}°`;
	DOM.threeDaysElementsForMaxTemp.forEach((element, index) => {
		element.textContent = `${temp[index].day.maxtemp_c}°`;
	});
}

function renderMinTemp(temp) {
	DOM.minTempText.textContent = `${temp[0].day.mintemp_c}°`;
	DOM.threeDaysElementsForMinTemp.forEach((element, index) => {
		element.textContent = `${temp[index].day.mintemp_c}°`;
	});
}

function renderSunRise(time) {
	DOM.sunRise.textContent = time.split(' ')[0];
}

function renderSunSet(time) {
	DOM.sunSet.textContent = time.split(' ')[0];
}

function delImage() {
	const oldImages = document.querySelectorAll('.days-cloudy');

	if (oldImages.length > 0) {
		oldImages.forEach(img => img.remove());
	}
}

export function setDate() {
	const day = new Date();
	setDay(day);
	setWeekDay(day.getDay());
	setMonth(day.getMonth());
	setInterval(() => {
		setTime(new Date());
	}, 1000);
}

function setDay(date) {
	const suffix =
		date % 10 === 1 && date !== 11
			? 'st'
			: date % 10 === 2 && date !== 12
			? 'nd'
			: date % 10 === 3 && date !== 13
			? 'rd'
			: 'th';

	DOM.currentDate.innerHTML = `${date.getDate()}<sup>${suffix}</sup>`;
	DOM.threeDaysDate.forEach((day, index) => {
		const nextDays = new Date(date);
		nextDays.setDate(date.getDate() + index);

		day.textContent = `${nextDays.getDate()} ${MONTHS[
			nextDays.getMonth()
		].slice(0, 3)}`;
	});
}

function setWeekDay(day) {
	DOM.currentDay.textContent = WEEKDAYS[day];
	DOM.threeDaysCityWeekday.forEach((weekday, index) => {
		const futureDay = day + index;

		if (futureDay >= 7) {
			weekday.textContent = WEEKDAYS[futureDay === 7 ? 0 : 1];
			return;
		}

		weekday.textContent = WEEKDAYS[futureDay];
	});
}

function setMonth(month) {
	DOM.currentMonth.textContent = MONTHS[month];
}

function setTime(date) {
	const time = date.toLocaleTimeString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
	});
	DOM.currentTime.textContent = time;
}

export function renderMoreInfo(data) {
	renderMoreCloudy(data.forecast.forecastday);
	renderMoreCurrentTemp(data.forecast.forecastday);
	renderPressure(data.forecast.forecastday);
	renderHumidity(data.forecast.forecastday);
	renderWind(data.forecast.forecastday);
}

function renderMoreCloudy(data) {
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

function renderMoreCurrentTemp(data) {
	DOM.moreInfoCurrentTemp.forEach((item, index) => {
		item.textContent = `${data[index].day.avgtemp_c}°`;
	});
}

function renderPressure(data) {
	const hour = new Date().getHours();
	DOM.moreInfoPressure.forEach((item, index) => {
		item.textContent = `${Math.floor(
			data[index].hour[hour].pressure_in * 25.5
		)} mm`;
	});
}

function renderHumidity(data) {
	DOM.moreInfoHumidity.forEach((item, index) => {
		item.textContent = `${data[index].day.avghumidity}%`;
	});
}

function renderWind(data) {
	console.log(data);
	DOM.moreInfoWind.forEach((item, index) => {
		item.textContent = `${(
			(data[index].day.maxwind_kph * 1000) /
			60 /
			60
		).toFixed(1)} m/s`;
	});
}

function delMoreCloudyImg() {
	const images = document.querySelectorAll('[data-days=three]');
	if (images.length === 0) {
		return;
	}
	images.forEach(item => item.remove());
}
