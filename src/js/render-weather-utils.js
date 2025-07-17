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
	renderMaxTemp(data.forecast.forecastday[0].day.maxtemp_c);
	renderMinTemp(data.forecast.forecastday[0].day.mintemp_c);
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
	DOM.maxTempText.textContent = `${temp}°`;
}

function renderMinTemp(temp) {
	DOM.minTempText.textContent = `${temp}°`;
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
		console.log();

		day.textContent = `${nextDays.getDate()} ${MONTHS[
			nextDays.getMonth()
		].slice(0, 3)}`;
	});
}

function setWeekDay(day) {
	DOM.currentDay.textContent = WEEKDAYS[day];
	DOM.threeDaysCityWeekday.forEach((weekday, index) => {
		weekday.textContent = WEEKDAYS[day + index];
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
