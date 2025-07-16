import DOM from './navigation';
import { getWeather } from './api-service';
import { getErrorMessage } from './toaster-messages-utils';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export async function searchCity() {
	const inputValue = DOM.cityInput.value.trim();

	if (!inputValue) {
		return;
	}

	const capCity = capitalizeFirst(inputValue);
	console.log('1');

	try {
		const response = await getWeather(capCity);
		console.log(response);

		setDataWeather(response);

		return capCity;
	} catch {
		getErrorMessage();
		return false;
	} finally {
		DOM.cityInput.value = '';
	}
}

function capitalizeFirst(word) {
	return `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;
}

function setDataWeather(data) {
	renderTemp(data.current.temp_c);
	renderLocation(data.location);
	renderCloudy(data.current.cloud);
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

function renderCloudy(cloud) {
	if (cloud >= 85) {
		fillImage('./cloudy.png', 'cloudy');
	} else if (cloud >= 30) {
		fillImage('./cloudy-sun.png', 'cloudy-sun');
	} else {
		fillImage('./sun.png', 'sun');
	}
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

export function setDate() {
	const day = new Date();
	setDay(day.getDate());
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

	DOM.currentDate.innerHTML = `${date}<sup>${suffix}</sup>`;
}

function setWeekDay(day) {
	DOM.currentDay.textContent = WEEKDAYS[day];
	DOM.threeDaysCityWeekday.forEach((weekday, index) => {
		weekday.textContent = WEEKDAYS[day + index];
	});
	console.log(DOM.threeDaysCityWeekday);
}

function setMonth(month) {
	const months = [
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
	DOM.currentMonth.textContent = months[month];
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
