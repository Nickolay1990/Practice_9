import DOM from '../navigation.js';
import {
	renderTemp,
	renderCloudy,
	renderLocation,
	renderMaxTemp,
	renderMinTemp,
	renderSunRise,
	renderSunSet,
} from './render-weather-utils.js';
import {
	renderMoreCloudy,
	renderMoreCurrentTemp,
	renderPressure,
	renderHumidity,
	renderWind,
} from './render-more-info-utils.js';
import { getStorageLastCity } from '../local-storage-api/local-storage-utils.js';
import { getWeather } from '../api-service.js';
import { getErrorMessage } from '../toaster-messages-utils.js';

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

export function renderMoreInfo(data) {
	renderMoreCloudy(data.forecast.forecastday);
	renderMoreCurrentTemp(data.forecast.forecastday);
	renderPressure(data.forecast.forecastday);
	renderHumidity(data.forecast.forecastday);
	renderWind(data.forecast.forecastday);
}

export async function renderLoadPage() {
	const city = getStorageLastCity();

	if (!city) {
		return;
	}

	try {
		const data = await getWeather(city);
		setDataWeather(data);
	} catch {
		getErrorMessage();
	}
}
