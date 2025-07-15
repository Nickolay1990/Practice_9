import axios from 'axios';

const key = '7aa569d556494f818ff173014251206';

export async function getWeather(city, days) {
	const res = await axios.get(
		`https://api.weatherapi.com/v1/forecast.json?days=${days}`,
		{
			params: { key: key, q: city },
		}
	);

	return res.data;
}
