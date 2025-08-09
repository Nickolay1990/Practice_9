import { setDay, setWeekDay, setMonth, setTime } from './set-date-utils.js';

export function setDate() {
	const day = new Date();
	setDay(day);
	setWeekDay(day.getDay());
	setMonth(day.getMonth());
	setInterval(() => {
		setTime(new Date());
	}, 1000);
}
