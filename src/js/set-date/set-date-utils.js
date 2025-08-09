import DOM from '../navigation.js';
import { WEEKDAYS, MONTHS } from '../constants.js';

export function setDay(date) {
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

export function setWeekDay(day) {
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

export function setMonth(month) {
	DOM.currentMonth.textContent = MONTHS[month];
}

export function setTime(date) {
	const time = date.toLocaleTimeString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
	});
	DOM.currentTime.textContent = time;
}
