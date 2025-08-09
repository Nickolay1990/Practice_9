import axios from 'axios';

const key = '7aa569d556494f818ff173014251206';
export let RESPONSE_WEATHER;

export async function getWeather(city) {
	const res = await axios.get(
		`https://api.weatherapi.com/v1/forecast.json?days=3`,
		{
			params: { key: key, q: city },
		}
	);

	RESPONSE_WEATHER = res.data;

	return res.data;
}
