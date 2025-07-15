import DOM from './navigation';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { initCitySwiper } from './swiper';
import { getWeather } from './api-service';

export let DAYS_COUNT = 1;
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
                                <use href="./symbol-defs.svg#close"></use>
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
		const response = await getWeather(capCity, DAYS_COUNT);
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

export function setDate() {
	const day = new Date();
	setDay(day.getDate());
	setWeekDay(day.getDay());
	setMonth(day.getMonth());
	setInterval(() => {
		setTime(new Date());
	}, 1000);
}

function renderTemp(temp) {
	DOM.curentTemp.innerHTML = temp;
}

function renderLocation({ name, country }) {
	DOM.currentLocation.innerHTML = `${name}, ${country}`;
	DOM.currentLocationFive.innerHTML = `${name}, ${country}`;
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
	DOM.fiveDaysCityWeekday.forEach((weekday, index) => {
		weekday.textContent = WEEKDAYS[day + index];
	});
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

function renderSunRise(time) {
	DOM.sunRise.textContent = time.split(' ')[0];
}

function renderSunSet(time) {
	DOM.sunSet.textContent = time.split(' ')[0];
}

export function switchFiveDays() {
	DOM.daysWrapper.style.display = 'none';
	DOM.homeSection.classList.add('home-five');
	DOM.switchOneDay.classList.remove('is-active');
	DOM.switchFiveDays.classList.add('is-active');
	DOM.citeBlock.style.display = 'none';
	DOM.dateBlock.style.display = 'none';
	DOM.fiveDayContainer.style.display = 'block';

	DAYS_COUNT = 3;
}

export function switchOneDay() {
	DOM.daysWrapper.style.display = 'block';
	DOM.homeSection.classList.remove('home-five');
	DOM.switchOneDay.classList.add('is-active');
	DOM.switchFiveDays.classList.remove('is-active');
	DOM.citeBlock.style.display = 'block';
	DOM.dateBlock.style.display = 'block';
	DOM.fiveDayContainer.style.display = 'none';
	DAYS_COUNT = 1;
}
